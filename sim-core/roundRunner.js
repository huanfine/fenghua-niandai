/**
 * sim-core/roundRunner.js
 * 《华夏世家》岁月回合调度器 (v3 全面深化版)
 * 纯逻辑中枢：5名族人议事 -> 3幕9岁月回合+3次幕终大劫(探备断三步法) -> 算筹检定/家学连锁/爆箱 -> 择嗣传承 -> 终局谥号长卷评语
 */

const { RUN_RULES } = require('./rules.js');
const PRNG = require('./prng.js');
const DeckEngine = require('./deckEngine.js');
const CheckEngine = require('./checkEngine.js');
const SkillEngine = require('./skillEngine.js');
const BagEngine = require('./bagEngine.js');
const ClashEngine = require('./clashEngine.js');
const { CalamityEngine } = require('./calamityEngine.js');
const { KinsfolkEngine } = require('./kinsfolkEngine.js');
const SuccessionEngine = require('./successionEngine.js');
const RetreatEngine = require('./retreatEngine.js');
const ScoreEngine = require('./scoreEngine.js');
const PosthumousEngine = require('./posthumousEngine.js');

class RoundRunner {
  /**
   * @param {Object} options
   */
  constructor(options = {}) {
    const {
      seed = 20261031,
      cardPool = [],
      destinyCard = { id: 'destiny_default', name: '琅琊王氏 · 耕读传家', quality: 'common', origin: 'mortal' },
      equippedSkills = [],
      clanRank = 9,
      clanBuff = { prestige: 0, wealth: 0, force: 0, grain: 0 },
      vow = { id: 'vow_modest', name: '安享遐龄', riskLevel: 'low' },
      surname = '王'
    } = options;

    this.seed = seed;
    this.prng = new PRNG(seed);
    this.destinyCard = destinyCard;
    this.originCard = destinyCard; // v3 规范称呼: 出身卡
    this.clanRank = clanRank;
    this.clanBuff = clanBuff;
    this.vow = vow;
    this.surname = surname;

    // 子系统初始化
    this.deckEngine = new DeckEngine(cardPool, this.prng);
    this.checkEngine = new CheckEngine(this.prng);
    this.skillEngine = new SkillEngine({ maxSlots: 4, equippedSkills });
    this.bagEngine = new BagEngine();
    this.calamityEngine = new CalamityEngine(this.prng);
    this.clashEngine = new ClashEngine(this.prng); // 兼容
    this.kinsfolkEngine = new KinsfolkEngine(this.prng, { surname });

    // 运行态：3 幕体系
    this.currentAct = 1;
    this.actRound = 0;       // 1 ~ 3
    this.totalRoundsRun = 0; // 1 ~ 9
    this.currentAge = RUN_RULES.START_AGE;
    this.currentYear = RUN_RULES.START_YEAR;
    this.isCompleted = false;
    this.isDead = false;
    this.isRetired = false;
    this.deathReason = null;

    // 四维资源
    const baseMeters = destinyCard.initialMeters || { prestige: 45, wealth: 45, force: 45, grain: 45 };
    this.meters = {
      prestige: Math.round(baseMeters.prestige * (1 + Math.min(0.15, clanBuff.prestige || 0))),
      wealth: Math.round(baseMeters.wealth * (1 + Math.min(0.15, clanBuff.wealth || 0))),
      force: Math.round(baseMeters.force * (1 + Math.min(0.15, clanBuff.force || 0))),
      grain: Math.round(baseMeters.grain * (1 + Math.min(0.15, clanBuff.grain || 0)))
    };

    this.calamityResults = [];
    this.successionResult = null;
    this.vowProgress = { completed: false, count: 0 };
    this.decisionLogs = [];

    // 新循环：势印行囊 (兵印, 财印, 名印) 与每回合 3 点心力
    this.seals = { military: 0, wealth: 0, prestige: 0 };
    this.willpowerRemaining = 3;
    this.handledCardIdsInRound = new Set();
    this.currentOfferedCards = [];
    this.upcomingCalamity = this.calamityEngine.generateCalamity(this.currentAct);
  }

  get currentRound() {
    return this.totalRoundsRun;
  }

  /**
   * 序章：少年立志 (迅速切入核心)
   */
  startPrologue(choice = 'study') {
    const bonusMap = {
      study: { prestige: 6, grain: 2 },
      martial: { force: 8, grain: 2 },
      trade: { wealth: 8, prestige: 2 }
    };
    const bonus = bonusMap[choice] || bonusMap.study;
    this._applyMeterDelta(bonus);

    this.decisionLogs.push({
      action: 'prologue',
      choice,
      year: this.currentYear,
      meters: { ...this.meters }
    });

    return {
      status: 'prologue_completed',
      choice,
      meters: { ...this.meters }
    };
  }

  /**
   * 议事：指派族人事务
   */
  assignKinsfolk(assignments = {}) {
    return this.kinsfolkEngine.assignDuties(assignments);
  }

  /**
   * 开启下一岁月回合 (一局 12 回合，每 4 回合一次大劫)
   */
  beginRound() {
    if (this.isCompleted) {
      throw new Error('当局已收官，无法继续推进回合');
    }

    this.actRound++;
    this.totalRoundsRun++;
    this.currentAge += RUN_RULES.YEARS_PER_ROUND;
    this.currentYear += RUN_RULES.YEARS_PER_ROUND;

    // 每回合心力点数重置为 3 点，清空本回合处理记录
    this.willpowerRemaining = 3;
    this.handledCardIdsInRound = new Set();

    // 检查本回合是否为大劫节点 (每幕第 4 回合末触发大劫)
    const isCalamityRound = (this.actRound === 4 || this.totalRoundsRun === 4 || this.totalRoundsRun === 8 || this.totalRoundsRun === 12);
    const isSuccessionRound = (this.currentAct === 3 && this.actRound >= 3);
    const canRetreat = RetreatEngine.isRetreatAvailable(this.totalRoundsRun);

    // 族人岁月微变
    this.kinsfolkEngine.advanceRound({ disasterHappened: false });

    // 风闻与下一次大劫探报
    if (!this.upcomingCalamity || this.upcomingCalamity.act !== this.currentAct) {
      this.upcomingCalamity = this.calamityEngine.generateCalamity(this.currentAct);
    }
    const upcomingCalamity = this.upcomingCalamity;

    // 牌库抽取 3 张机缘牌
    const context = {
      act: this.currentAct,
      currentRound: this.totalRoundsRun,
      currentYear: this.currentYear,
      meters: { ...this.meters },
      destinyCard: this.destinyCard
    };
    const offeredCards = this.deckEngine.drawTrio(context);

    // 确保每张牌具备印章标签 (兵印, 财印, 名印) 与未处理扣损
    for (const c of offeredCards) {
      if (!c.sealTag) {
        if (c.category === 'military') c.sealTag = 'military';
        else if (c.category === 'management') c.sealTag = 'wealth';
        else c.sealTag = 'prestige';
      }
      if (!c.unattendedPenalty) {
        const dim = c.sealTag === 'military' ? 'force' : (c.sealTag === 'wealth' ? 'wealth' : 'prestige');
        c.unattendedPenalty = { [dim]: 6 };
      }
    }
    this.currentOfferedCards = offeredCards;

    return {
      act: this.currentAct,
      actRound: this.actRound,
      round: this.totalRoundsRun,
      age: this.currentAge,
      year: this.currentYear,
      meters: { ...this.meters },
      offeredCards,
      upcomingCalamity,
      isCalamityRound,
      isClashRound: isCalamityRound, // 兼容老代码字段
      isSuccessionRound,
      canRetreat,
      kinsfolk: this.kinsfolkEngine.getActiveKinsfolk(),
      bagStatus: this.bagEngine.getStatus(),
      willpower: this.willpowerRemaining,
      seals: { ...this.seals }
    };
  }

  /**
   * 特殊动作一：「探报」—— 消耗 1 点心力提前看清下一次大劫所需的两种印
   */
  scoutUpcomingCalamity() {
    if (this.willpowerRemaining < 1) {
      return { success: false, reason: '心力不足，无法探报 (需 1 点心力)' };
    }
    this.willpowerRemaining -= 1;
    const scoutData = this.calamityEngine.scoutCalamity(this.upcomingCalamity);
    this.decisionLogs.push({
      action: 'scout',
      round: this.totalRoundsRun,
      calamityId: this.upcomingCalamity.id,
      requiredSeals: this.upcomingCalamity.requiredSeals
    });
    return {
      success: true,
      willpowerRemaining: this.willpowerRemaining,
      scoutData,
      upcomingCalamity: this.upcomingCalamity
    };
  }

  /**
   * 特殊动作二：「经营」—— 消耗 2 点心力直接获得 1 枚指定的印 (战略深度来源，不能删)
   * @param {'military'|'wealth'|'prestige'} sealType
   */
  manageSeal(sealType = 'military') {
    if (this.willpowerRemaining < 2) {
      return { success: false, reason: '心力不足，无法经营 (需 2 点心力)' };
    }
    this.willpowerRemaining -= 2;
    this.seals[sealType] = (this.seals[sealType] || 0) + 1;
    this.decisionLogs.push({
      action: 'manage',
      round: this.totalRoundsRun,
      sealType,
      sealsAfter: { ...this.seals }
    });
    return {
      success: true,
      willpowerRemaining: this.willpowerRemaining,
      addedSeal: sealType,
      seals: { ...this.seals }
    };
  }

  /**
   * 玩家执行普通回合决断 (算筹检定与结算)
   */
  playRoundDecision(decision = {}) {
    const {
      cardId,
      willpowerAllocation = { cultivation: 3 },
      offeredCards = [],
      useDestinyReroll = false,
      useRodReroll = false
    } = decision;

    const chosenCard = this.deckEngine.resolveChoice(cardId, offeredCards);
    const validWillpower = this.checkEngine.validateAllocation(willpowerAllocation);

    // 家学连锁
    const preCheckSkills = this.skillEngine.resolveSkillTriggers('on_check_start', {
      card: chosenCard,
      meters: this.meters
    });

    // 族人协同加成
    const targetDim = chosenCard.category || 'cultivation';
    const kinsmanBonus = this.kinsfolkEngine.getDutyModifier(targetDim);

    const checkConfig = {
      difficulty: chosenCard.difficulty || 45,
      dimension: targetDim,
      meterValue: this.meters[this._mapDimensionToMeter(targetDim)] || 50,
      willpowerInvested: validWillpower[targetDim] || 0,
      kinsmanBonus,
      teachingBonus: preCheckSkills.hasTriggers ? 0.12 : 0
    };

    let checkResult = this.checkEngine.castCountingRods(checkConfig);

    // 重筹机制 (3次上限)
    let rerollUsed = false;
    const wantsReroll = useRodReroll || useDestinyReroll;
    if (wantsReroll && checkResult.outcome === 'failure' && this.checkEngine.rodRerollsRemaining > 0) {
      const rerollAttempt = this.checkEngine.rerollWithCountingRods(checkConfig);
      if (rerollAttempt.success) {
        checkResult = rerollAttempt.result;
        rerollUsed = true;
      }
    }

    // 消耗 1 点心力并记录已处理
    this.willpowerRemaining = Math.max(0, this.willpowerRemaining - 1);
    this.handledCardIdsInRound.add(chosenCard.id);

    // 备印机制：成功处理卡牌即获得 1 枚对应标签的「印」
    let gainedSeal = null;
    const isSuccess = (checkResult.outcome === 'success' || checkResult.outcome === 'critical_success');
    if (isSuccess) {
      const sealTag = chosenCard.sealTag || (chosenCard.category === 'military' ? 'military' : (chosenCard.category === 'management' ? 'wealth' : 'prestige'));
      this.seals[sealTag] = (this.seals[sealTag] || 0) + 1;
      gainedSeal = sealTag;
    }

    // 结算奖励与衰减
    const outcomeImpact = this._applyCardOutcome(chosenCard, checkResult, preCheckSkills.chainMultiplier);

    // 核心惩罚机制：不处理的牌立刻扣资源！
    const unattendedLosses = [];
    if (this.currentOfferedCards && this.currentOfferedCards.length > 0) {
      for (const card of this.currentOfferedCards) {
        if (!this.handledCardIdsInRound.has(card.id)) {
          const pen = card.unattendedPenalty || { [card.sealTag === 'military' ? 'force' : (card.sealTag === 'wealth' ? 'wealth' : 'prestige')]: 6 };
          this._applyMeterDelta(Object.fromEntries(Object.entries(pen).map(([k, v]) => [k, -Math.abs(v)])));
          unattendedLosses.push({ cardId: card.id, cardName: card.name, penalty: pen });
        }
      }
    }

    // 誓愿检查
    this._checkVowProgress(chosenCard, checkResult);

    // 濒死与家学死守
    this._checkSurvival();

    const stepLog = {
      round: this.totalRoundsRun,
      act: this.currentAct,
      year: this.currentYear,
      cardId: chosenCard.id,
      cardName: chosenCard.name,
      willpower: validWillpower,
      gainedSeal,
      seals: { ...this.seals },
      unattendedLosses,
      checkResult: {
        rodScore: checkResult.rodScore,
        outcome: checkResult.outcome,
        rerollUsed
      },
      metersAfter: { ...this.meters },
      isDead: this.isDead
    };
    this.decisionLogs.push(stepLog);

    return {
      round: this.totalRoundsRun,
      act: this.currentAct,
      chosenCard,
      checkResult,
      outcomeImpact,
      gainedSeal,
      seals: { ...this.seals },
      willpowerRemaining: this.willpowerRemaining,
      unattendedLosses,
      chronicleText: chosenCard.chronicleText || '世事如棋，岁月荏苒，宗族履历又添一笔。',
      historicalSource: chosenCard.historicalSource || null,
      meters: { ...this.meters },
      bagStatus: this.bagEngine.getStatus(),
      isDead: this.isDead,
      deathReason: this.deathReason
    };
  }

  /**
   * 执行大劫决断 (需交付两种印各 2 枚，付不起即全面崩溃)
   * @param {'defend'|'relocate'|'ally'|'disperse'|'evade'|'seals'} choice 玩家应对策略
   */
  resolveCalamityEvent(choice = 'defend') {
    const calamity = this.upcomingCalamity || this.calamityEngine.generateCalamity(this.currentAct);

    // 优先执行势印应对核验 (需两种印各 2 枚)
    let calamityResult = null;
    if (this.calamityEngine && typeof this.calamityEngine.resolveWithSeals === 'function') {
      calamityResult = this.calamityEngine.resolveWithSeals({
        calamity,
        seals: this.seals,
        meters: this.meters
      });
    }

    // 兼容传统对策分支
    if (!calamityResult) {
      const dutyMap = { war: 'military', slander: 'officialdom', plague: 'defence', famine: 'management', debt: 'management' };
      const dutyType = dutyMap[calamity.type] || 'military';
      const kinsmanDutyBonus = this.kinsfolkEngine.getDutyModifier(dutyType) * 100;
      const preparednessScore = Math.min(25, Math.round(kinsmanDutyBonus + (this.meters[this._mapDimensionToMeter(dutyType)] / 10)));
      calamityResult = this.calamityEngine.resolveCalamity({
        calamity,
        choice,
        preparednessScore,
        meters: this.meters
      });
    }

    this.calamityResults.push(calamityResult);

    // 应用大劫得失
    if (calamityResult.meterDelta) {
      this._applyMeterDelta(calamityResult.meterDelta);
    }

    // 爆箱直接飞入行囊
    let chestOutcome = null;
    if (calamityResult.survived && calamityResult.rewardChest) {
      chestOutcome = this.bagEngine.tryAddChest(calamityResult.rewardChest);
    }

    // 族人体魄损耗
    this.kinsfolkEngine.advanceRound({ disasterHappened: !calamityResult.survived });
    this._checkSurvival();

    // 幕次推进 (重置幕内回合)
    if (this.currentAct < RUN_RULES.TOTAL_ACTS) {
      this.currentAct++;
      this.actRound = 0;
      this.upcomingCalamity = this.calamityEngine.generateCalamity(this.currentAct);
    }

    this.decisionLogs.push({
      action: 'calamity',
      act: calamity.act,
      choice,
      survived: calamityResult.survived,
      isAnticipated: calamityResult.isAnticipated,
      sealsRemaining: { ...this.seals }
    });

    return {
      calamityResult,
      chestOutcome,
      meters: { ...this.meters },
      seals: { ...this.seals },
      bagStatus: this.bagEngine.getStatus()
    };
  }

  // 兼容老调用
  resolveClashEvent(tactic = 'strike') {
    const choiceMap = { strike: 'defend', defence: 'ally', disperse: 'disperse' };
    const choice = choiceMap[tactic] || 'defend';
    const calRes = this.resolveCalamityEvent(choice);
    return {
      clashResult: {
        won: calRes.calamityResult.survived,
        isCrushing: calRes.calamityResult.isTriumph,
        rewardChest: calRes.calamityResult.rewardChest,
        scoreContribution: calRes.calamityResult.scoreContribution
      },
      chestOutcome: calRes.chestOutcome,
      bagStatus: calRes.bagStatus
    };
  }

  /**
   * 执行第三幕择嗣传承
   * @param {string} successionType ('primogeniture'|'adoption'|'foster'|'retainer'|'worthy')
   */
  resolveSuccessionEvent(successionType) {
    this.successionResult = SuccessionEngine.resolveSuccession(successionType, {
      meters: this.meters,
      destinyCard: this.destinyCard
    });

    if (this.successionResult.meterBonus) {
      this._applyMeterDelta(this.successionResult.meterBonus);
    }

    this.decisionLogs.push({
      action: 'succession',
      type: successionType,
      estateScore: this.successionResult.estateScore
    });

    return this.successionResult;
  }

  /**
   * 急流勇退 (主动致仕)
   */
  retreatEarly() {
    if (!RetreatEngine.isRetreatAvailable(this.totalRoundsRun)) {
      return { retired: false, reason: '尚未达到致仕时机' };
    }

    const bagChests = this.bagEngine.getChestsForSettlement();
    const interimScore = this._calculateCurrentScoreBeforeSettlement();

    const retreatResult = RetreatEngine.executeRetreat({
      currentRawScore: interimScore,
      currentRound: this.totalRoundsRun,
      bagChests
    });

    if (retreatResult.retired) {
      this.isRetired = true;
      this.isCompleted = true;

      this.decisionLogs.push({
        action: 'retreat',
        round: this.totalRoundsRun,
        finalScore: retreatResult.finalScore
      });
    }

    return retreatResult;
  }

  /**
   * 终局收官结算：综合评分 + 授予谥号长卷 + 评语
   */
  finalizeRun() {
    this.isCompleted = true;

    // 大劫得分计算 (共 3 幕大劫，满分 25)
    let calamityScores = this.calamityResults.reduce((sum, c) => sum + (c.scoreContribution || 0), 0);
    if (this.calamityResults.length === 0) {
      // 兼容老 clash 记录
      calamityScores = this.clashEngine.clashHistory.reduce((sum, c) => sum + (c.scoreContribution || 0), 0);
    }
    const estateScore = this.successionResult ? this.successionResult.estateScore : 11;

    const evalInput = {
      age: this.currentAge,
      healthyRetirement: !this.isDead,
      meters: { ...this.meters },
      clashScore: calamityScores,
      estateScore,
      vowResult: { completed: this.vowProgress.completed, riskLevel: this.vow.riskLevel },
      destinyCard: this.destinyCard,
      clanRank: this.clanRank,
      isRetreat: this.isRetired
    };

    const evaluation = ScoreEngine.evaluateRun(evalInput);

    // 授予谥号与生成家谱评语
    const posthumousData = PosthumousEngine.evaluatePosthumous({
      runEvaluation: evaluation,
      context: {
        age: this.currentAge,
        isDead: this.isDead,
        isRetired: this.isRetired,
        meters: this.meters,
        calamityResults: this.calamityResults
      }
    });

    return {
      seed: this.seed,
      evaluation,
      posthumous: posthumousData, // v3 核心谥号与家谱长卷评语
      chestsInBag: this.bagEngine.getChestsForSettlement(),
      kinsfolk: this.kinsfolkEngine.kinsfolk,
      decisionLogs: this.decisionLogs,
      summary: {
        totalRounds: this.totalRoundsRun,
        actsCompleted: this.currentAct,
        finalAge: this.currentAge,
        isDead: this.isDead,
        isRetired: this.isRetired,
        vowCompleted: this.vowProgress.completed,
        posthumousTitle: posthumousData.posthumousTitle
      }
    };
  }

  // --- 内部辅助 ---

  _mapDimensionToMeter(dim) {
    const map = {
      officialdom: 'prestige',
      management: 'wealth',
      military: 'force',
      cultivation: 'grain',
      defence: 'force'
    };
    return map[dim] || 'prestige';
  }

  _applyMeterDelta(delta = {}) {
    for (const [k, v] of Object.entries(delta)) {
      if (this.meters[k] !== undefined) {
        this.meters[k] = Math.max(0, Math.min(100, this.meters[k] + v));
      }
    }
  }

  _applyCardOutcome(card, checkResult, chainMultiplier = 1.0) {
    let delta = {};
    if (checkResult.outcome === 'critical_success') {
      delta = this._scaleDelta(card.rewards || { prestige: 6, wealth: 6 }, 1.5 * chainMultiplier);
    } else if (checkResult.outcome === 'success') {
      delta = this._scaleDelta(card.rewards || { prestige: 4, grain: 4 }, 1.0 * chainMultiplier);
    } else if (checkResult.outcome === 'partial') {
      delta = { prestige: 1 };
    } else if (checkResult.outcome === 'fumble') {
      delta = card.penalties || { force: -12, wealth: -12 };
    } else {
      delta = card.penalties || { prestige: -5 };
    }

    this._applyMeterDelta(delta);
    return delta;
  }

  _scaleDelta(obj = {}, scale = 1.0) {
    const res = {};
    for (const [k, v] of Object.entries(obj)) {
      res[k] = Math.round(v * scale);
    }
    return res;
  }

  _checkVowProgress(card, checkResult) {
    if (this.vow.id === 'vow_peaceful_lifespan') {
      this.vowProgress.completed = (!this.isDead && this.currentAge >= 55);
    } else if (this.vow.id === 'vow_tri_clash_victory') {
      const calamityWins = this.calamityResults.filter(c => c.survived).length;
      this.vowProgress.completed = (calamityWins >= 2);
    } else if (this.vow.id === 'vow_supreme_clan') {
      const highMeter = this.meters.prestige >= 80 || this.meters.wealth >= 80;
      this.vowProgress.completed = highMeter;
    } else {
      if (checkResult.outcome === 'success' || checkResult.outcome === 'critical_success') {
        this.vowProgress.count++;
        if (this.vowProgress.count >= 5) {
          this.vowProgress.completed = true;
        }
      }
    }
  }

  _checkSurvival() {
    for (const [k, v] of Object.entries(this.meters)) {
      if (v <= 0) {
        const saveAttempt = this.skillEngine.resolveSkillTriggers('on_fatal_damage', {
          failedMeter: k,
          meters: this.meters
        });

        if (saveAttempt.hasTriggers) {
          this.meters[k] = 20;
          return;
        }

        this.isDead = true;
        this.deathReason = `四维基石【${k}】耗竭，家道中阻`;
        this.isCompleted = true;
        break;
      }
    }
  }

  _calculateCurrentScoreBeforeSettlement() {
    const meterValues = Object.values(this.meters);
    const avg = meterValues.reduce((a, b) => a + b, 0) / meterValues.length;
    return Math.min(100, Math.max(10, avg * 0.9));
  }
}

module.exports = RoundRunner;
