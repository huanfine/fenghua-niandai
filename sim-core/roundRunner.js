/**
 * sim-core/roundRunner.js
 * 岁月回合驱动器 (Round Runner)
 * 纯逻辑贯通：序章童年 -> 12个岁月回合 -> 大考/心力检定/爆箱 -> 传嗣 -> 致仕/寿终收官
 * 生成可重放决策日志 (Decision Action Log)，具备完全确定性。
 */

const { RUN_RULES } = require('./rules.js');
const PRNG = require('./prng.js');
const DeckEngine = require('./deckEngine.js');
const CheckEngine = require('./checkEngine.js');
const SkillEngine = require('./skillEngine.js');
const BagEngine = require('./bagEngine.js');
const ClashEngine = require('./clashEngine.js');
const SuccessionEngine = require('./successionEngine.js');
const RetreatEngine = require('./retreatEngine.js');
const ScoreEngine = require('./scoreEngine.js');

class RoundRunner {
  /**
   * @param {Object} options
   * @param {number|string} options.seed 确定性随机数种子
   * @param {Array<Object>} options.cardPool 牌库
   * @param {Object} options.destinyCard 局前抽得身份卡
   * @param {Array<Object>} options.equippedSkills 装配技能卡
   * @param {number} options.clanRank 当前家族品级 (9~1)
   * @param {Object} options.clanBuff 起始底蕴加成 (封顶15%)
   * @param {Object} options.vow 家训誓愿
   */
  constructor(options = {}) {
    const {
      seed = 20261031,
      cardPool = [],
      destinyCard = { id: 'destiny_default', name: '琅琊布衣', quality: 'common', origin: 'mortal' },
      equippedSkills = [],
      clanRank = 9,
      clanBuff = { prestige: 0, wealth: 0, force: 0, grain: 0 },
      vow = { id: 'vow_modest', name: '积善流芳', riskLevel: 'low' }
    } = options;

    this.seed = seed;
    this.prng = new PRNG(seed);
    this.destinyCard = destinyCard;
    this.clanRank = clanRank;
    this.clanBuff = clanBuff;
    this.vow = vow;

    // 子系统初始化
    this.deckEngine = new DeckEngine(cardPool, this.prng);
    this.checkEngine = new CheckEngine(this.prng);
    this.skillEngine = new SkillEngine({ maxSlots: 4, equippedSkills });
    this.bagEngine = new BagEngine();
    this.clashEngine = new ClashEngine(this.prng);

    // 局内运行态
    this.currentRound = 0;
    this.currentAge = RUN_RULES.START_AGE;
    this.currentYear = RUN_RULES.START_YEAR;
    this.isCompleted = false;
    this.isDead = false;
    this.isRetired = false;
    this.deathReason = null;

    // 四维初始值 (受身份卡与家族底蕴加成)
    const baseMeters = destinyCard.initialMeters || { prestige: 45, wealth: 45, force: 45, grain: 45 };
    this.meters = {
      prestige: Math.round(baseMeters.prestige * (1 + Math.min(0.15, clanBuff.prestige || 0))),
      wealth: Math.round(baseMeters.wealth * (1 + Math.min(0.15, clanBuff.wealth || 0))),
      force: Math.round(baseMeters.force * (1 + Math.min(0.15, clanBuff.force || 0))),
      grain: Math.round(baseMeters.grain * (1 + Math.min(0.15, clanBuff.grain || 0)))
    };

    // 传承与大考记录
    this.successionResult = null;
    this.vowProgress = { completed: false, count: 0 };
    this.decisionLogs = []; // 重放验算日志
  }

  /**
   * 序章：童年分流 (快速过场，确定初始倾向)
   * @param {string} childhoodChoice 'study' | 'martial' | 'trade'
   */
  startPrologue(childhoodChoice = 'study') {
    const bonusMap = {
      study: { prestige: 8, wealth: 2 },
      martial: { force: 10, grain: 2 },
      trade: { wealth: 10, prestige: 2 }
    };
    const bonus = bonusMap[childhoodChoice] || bonusMap.study;
    this._applyMeterDelta(bonus);

    this.decisionLogs.push({
      action: 'prologue',
      choice: childhoodChoice,
      year: this.currentYear,
      meters: { ...this.meters }
    });

    return {
      status: 'prologue_completed',
      choice: childhoodChoice,
      meters: { ...this.meters }
    };
  }

  /**
   * 进入下一岁月回合，生成 3 张候选机缘牌
   */
  beginRound() {
    if (this.isCompleted) {
      throw new Error('本局已终局收官，无法继续推进回合');
    }

    this.currentRound++;
    this.currentAge += RUN_RULES.YEARS_PER_ROUND;
    this.currentYear += RUN_RULES.YEARS_PER_ROUND;

    // 检查第9回合是否需要先进行传嗣
    const isSuccessionRound = (this.currentRound === RUN_RULES.SUCCESSION_ROUND);
    // 检查是否为大考回合 (3, 6, 9, 12)
    const isClashRound = (this.currentRound % RUN_RULES.CLASH_INTERVAL === 0);
    // 检查是否可急流勇退
    const canRetreat = RetreatEngine.isRetreatAvailable(this.currentRound);

    // 牌库抽 3 张
    const context = {
      currentRound: this.currentRound,
      currentYear: this.currentYear,
      meters: { ...this.meters },
      destinyCard: this.destinyCard
    };
    const offeredCards = this.deckEngine.drawTrio(context);

    return {
      round: this.currentRound,
      age: this.currentAge,
      year: this.currentYear,
      meters: { ...this.meters },
      offeredCards,
      isClashRound,
      isSuccessionRound,
      canRetreat,
      bagStatus: this.bagEngine.getStatus()
    };
  }

  /**
   * 玩家执行当回合决策
   * @param {Object} decision
   * @param {string} decision.cardId 选取的卡牌 ID
   * @param {Object} decision.willpowerAllocation 3 点心力分配
   * @param {Array<Object>} decision.offeredCards 本回合提供的候选牌
   * @param {boolean} decision.useDestinyReroll 若初检失败是否消耗改命签
   */
  playRoundDecision(decision = {}) {
    const {
      cardId,
      willpowerAllocation = { cultivation: 3 },
      offeredCards = [],
      useDestinyReroll = false
    } = decision;

    // 1. 记录选择卡牌并从牌库结算
    const chosenCard = this.deckEngine.resolveChoice(cardId, offeredCards);

    // 2. 校验与执行心力分配
    const validWillpower = this.checkEngine.validateAllocation(willpowerAllocation);

    // 3. 技能触发 (检定前)
    const preCheckSkills = this.skillEngine.resolveSkillTriggers('on_check_start', {
      card: chosenCard,
      meters: this.meters
    });

    // 4. 执行检定
    const targetDim = chosenCard.category || 'cultivation';
    const checkConfig = {
      difficulty: chosenCard.difficulty || 45,
      dimension: targetDim,
      meterValue: this.meters[this._mapDimensionToMeter(targetDim)] || 50,
      willpowerInvested: validWillpower[targetDim] || 0,
      skillBonus: preCheckSkills.hasTriggers ? 0.15 : 0
    };

    let checkResult = this.checkEngine.rollCheck(checkConfig);

    // 改命签机制：若失手且用户选择重掷
    let rerollUsed = false;
    if (useDestinyReroll && checkResult.outcome === 'failure' && this.checkEngine.rerollSignsRemaining > 0) {
      const rerollAttempt = this.checkEngine.rerollWithDestinySign(checkConfig);
      if (rerollAttempt.success) {
        checkResult = rerollAttempt.result;
        rerollUsed = true;
      }
    }

    // 5. 结算奖励与衰减
    const outcomeImpact = this._applyCardOutcome(chosenCard, checkResult, preCheckSkills.chainMultiplier);

    // 6. 誓愿检查
    this._checkVowProgress(chosenCard, checkResult);

    // 7. 濒死检查与技能死守
    this._checkSurvival();

    // 8. 记录决策日志
    const stepLog = {
      round: this.currentRound,
      year: this.currentYear,
      cardId: chosenCard.id,
      cardName: chosenCard.name,
      willpower: validWillpower,
      checkResult: {
        d100: checkResult.d100,
        outcome: checkResult.outcome,
        rerollUsed
      },
      metersAfter: { ...this.meters },
      isDead: this.isDead
    };
    this.decisionLogs.push(stepLog);

    return {
      round: this.currentRound,
      chosenCard,
      validWillpower,
      checkResult,
      outcomeImpact,
      meters: { ...this.meters },
      bagStatus: this.bagEngine.getStatus(),
      isDead: this.isDead,
      deathReason: this.deathReason
    };
  }

  /**
   * 执行大考决战
   * @param {string} playerTactic 'strike' | 'defence' | 'disperse'
   */
  resolveClashEvent(playerTactic = 'strike') {
    const trial = this.clashEngine.generateClashTrial(this.currentRound);
    trial.round = this.currentRound;

    const clashResult = this.clashEngine.resolveClash({
      trial,
      playerTactic,
      playerForce: this.meters.force,
      skillBonus: 5
    });

    // 爆箱直接飞入行囊，战败则承受兵荒损耗
    let chestOutcome = null;
    if (clashResult.won && clashResult.rewardChest) {
      chestOutcome = this.bagEngine.tryAddChest(clashResult.rewardChest);
    } else if (!clashResult.won) {
      // 大考战败受创
      this._applyMeterDelta({ force: -10, prestige: -8 });
      this._checkSurvival();
    }

    this.decisionLogs.push({
      action: 'clash',
      round: this.currentRound,
      tactic: playerTactic,
      won: clashResult.won,
      chestAdded: chestOutcome?.success
    });

    return {
      clashResult,
      chestOutcome,
      bagStatus: this.bagEngine.getStatus()
    };
  }

  /**
   * 执行第9回合传嗣决策
   * @param {string} successionType
   */
  resolveSuccessionEvent(successionType) {
    this.successionResult = SuccessionEngine.resolveSuccession(successionType, {
      meters: this.meters,
      destinyCard: this.destinyCard
    });

    // 应用继承属性加成
    if (this.successionResult.meterBonus) {
      this._applyMeterDelta(this.successionResult.meterBonus);
    }

    this.decisionLogs.push({
      action: 'succession',
      round: this.currentRound,
      type: successionType,
      estateScore: this.successionResult.estateScore
    });

    return this.successionResult;
  }

  /**
   * 玩家主动急流勇退致仕
   */
  retreatEarly() {
    const bagChests = this.bagEngine.getChestsForSettlement();
    const interimScore = this._calculateCurrentScoreBeforeSettlement();

    const retreatResult = RetreatEngine.executeRetreat({
      currentRawScore: interimScore,
      currentRound: this.currentRound,
      bagChests
    });

    this.isRetired = true;
    this.isCompleted = true;

    this.decisionLogs.push({
      action: 'retreat',
      round: this.currentRound,
      finalScore: retreatResult.finalScore
    });

    return retreatResult;
  }

  /**
   * 终局收官结算，生成评级、段位变化与近失提示
   */
  finalizeRun() {
    this.isCompleted = true;

    // 大考斩获合计
    const clashScores = this.clashEngine.clashHistory.reduce((sum, c) => sum + (c.scoreContribution || 0), 0);
    // 传嗣得分
    const estateScore = this.successionResult ? this.successionResult.estateScore : 10;

    let evalInput = {
      age: this.currentAge,
      healthyRetirement: !this.isDead,
      meters: { ...this.meters },
      clashScore: clashScores,
      estateScore,
      vowResult: { completed: this.vowProgress.completed, riskLevel: this.vow.riskLevel },
      destinyCard: this.destinyCard,
      clanRank: this.clanRank,
      isRetreat: this.isRetired
    };

    const evaluation = ScoreEngine.evaluateRun(evalInput);

    return {
      seed: this.seed,
      evaluation,
      chestsInBag: this.bagEngine.getChestsForSettlement(),
      decisionLogs: this.decisionLogs,
      summary: {
        totalRounds: this.currentRound,
        finalAge: this.currentAge,
        isDead: this.isDead,
        isRetired: this.isRetired,
        vowCompleted: this.vowProgress.completed
      }
    };
  }

  // --- 内部辅助方法 ---

  _mapDimensionToMeter(dim) {
    const map = {
      management: 'wealth',
      officialdom: 'prestige',
      military: 'force',
      cultivation: 'grain'
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
      // 暴击大胜：1.5倍收益
      delta = this._scaleDelta(card.rewards || { prestige: 6, wealth: 6 }, 1.5 * chainMultiplier);
    } else if (checkResult.outcome === 'success') {
      delta = this._scaleDelta(card.rewards || { prestige: 4, grain: 4 }, 1.0 * chainMultiplier);
    } else if (checkResult.outcome === 'partial') {
      delta = { prestige: 1 };
    } else if (checkResult.outcome === 'fumble') {
      // 大失手：重创
      delta = card.penalties || { force: -12, wealth: -12 };
    } else {
      // 失败
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
      this.vowProgress.completed = (!this.isDead && this.currentAge >= 60);
    } else if (this.vow.id === 'vow_tri_clash_victory') {
      const clashWins = this.clashEngine.clashHistory.filter(c => c.won).length;
      this.vowProgress.completed = (clashWins >= 3);
    } else if (this.vow.id === 'vow_supreme_clan') {
      const highMeter = this.meters.prestige >= 85 || this.meters.wealth >= 85;
      const worthySuccession = this.successionResult?.chosen?.type === 'worthy';
      this.vowProgress.completed = (highMeter && worthySuccession);
    } else {
      // 默认规则
      if (checkResult.outcome === 'success' || checkResult.outcome === 'critical_success') {
        this.vowProgress.count++;
        if (this.vowProgress.count >= 6) {
          this.vowProgress.completed = true;
        }
      }
    }
  }

  _checkSurvival() {
    for (const [k, v] of Object.entries(this.meters)) {
      if (v <= 0) {
        // 尝试触发死守免死技能
        const saveAttempt = this.skillEngine.resolveSkillTriggers('on_fatal_damage', {
          failedMeter: k,
          meters: this.meters
        });

        if (saveAttempt.hasTriggers) {
          this.meters[k] = 20; // 挽救回复
          return;
        }

        this.isDead = true;
        this.deathReason = `四维【${k}】归零覆亡`;
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
