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
   * 开启下一岁月回合 (每幕 3 回合)
   */
  beginRound() {
    if (this.isCompleted) {
      throw new Error('当局已收官，无法继续推进回合');
    }

    this.actRound++;
    this.totalRoundsRun++;
    this.currentAge += RUN_RULES.YEARS_PER_ROUND;
    this.currentYear += RUN_RULES.YEARS_PER_ROUND;

    // 检查本回合是否为大劫节点 (每幕第 3 回合末触发大劫)
    const isCalamityRound = (this.actRound === 3);
    const isSuccessionRound = (this.currentAct === 3 && this.actRound >= 2);
    const canRetreat = RetreatEngine.isRetreatAvailable(this.totalRoundsRun);

    // 族人岁月微变
    this.kinsfolkEngine.advanceRound({ disasterHappened: false });

    // 风闻与下一次大劫探报
    const upcomingCalamity = this.calamityEngine.generateCalamity(this.currentAct);

    // 牌库抽取 3 张机缘牌
    const context = {
      currentRound: this.totalRoundsRun,
      currentYear: this.currentYear,
      meters: { ...this.meters },
      destinyCard: this.destinyCard
    };
    const offeredCards = this.deckEngine.drawTrio(context);

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
      bagStatus: this.bagEngine.getStatus()
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

    // 结算奖励与衰减
    const outcomeImpact = this._applyCardOutcome(chosenCard, checkResult, preCheckSkills.chainMultiplier);

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
      meters: { ...this.meters },
      bagStatus: this.bagEngine.getStatus(),
      isDead: this.isDead,
      deathReason: this.deathReason
    };
  }

  /**
   * 执行大劫决断 (大劫 Boss 三步法之「断」)
   * @param {'defend'|'relocate'|'ally'|'disperse'|'evade'} choice 玩家应对策略
   */
  resolveCalamityEvent(choice = 'defend') {
    const calamity = this.calamityEngine.generateCalamity(this.currentAct);

    // 计算备战值 (族人派遣协同 + 四维充裕度)
    const dutyMap = { war: 'military', slander: 'officialdom', plague: 'defence', famine: 'management', debt: 'management' };
    const dutyType = dutyMap[calamity.type] || 'military';
    const kinsmanDutyBonus = this.kinsfolkEngine.getDutyModifier(dutyType) * 100;
    const preparednessScore = Math.min(25, Math.round(kinsmanDutyBonus + (this.meters[this._mapDimensionToMeter(dutyType)] / 10)));

    const calamityResult = this.calamityEngine.resolveCalamity({
      calamity,
      choice,
      preparednessScore,
      meters: this.meters
    });

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

    // 幕次推进
    if (this.currentAct < RUN_RULES.TOTAL_ACTS) {
      this.currentAct++;
      this.actRound = 0; // 重置幕内回合
    }

    this.decisionLogs.push({
      action: 'calamity',
      act: calamity.act,
      choice,
      survived: calamityResult.survived,
      isAnticipated: calamityResult.isAnticipated
    });

    return {
      calamityResult,
      chestOutcome,
      meters: { ...this.meters },
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
