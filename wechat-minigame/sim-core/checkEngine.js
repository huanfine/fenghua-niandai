/**
 * sim-core/checkEngine.js
 * 算筹检定引擎 (Counting Rods Check Engine)
 * 落实 v3 方案：以汉代史实算筹落盘代替骰子占卜，心力加注区间，暴击/错乱大失手，局内 3 次「重筹」机会
 */

const { RESOURCES_CAP, WILLPOWER_DIMENSIONS, CHECK_TIERS } = require('./rules.js');

class CheckEngine {
  /**
   * @param {import('./prng')} prng
   */
  constructor(prng) {
    this.prng = prng;
    // 局内 3 次「重筹」机会 (原改命签)
    this.rodRerollsRemaining = RESOURCES_CAP.MAX_COUNTING_ROD_REROLLS || 3;
    this.rerollSignsRemaining = this.rodRerollsRemaining; // 兼容老代码
    this.history = [];
  }

  /**
   * 验证议事心力分配 (严格总计 3 点)
   */
  validateAllocation(allocation = {}) {
    let sum = 0;
    const sanitized = {};

    for (const dim of WILLPOWER_DIMENSIONS) {
      const val = Math.max(0, Math.floor(Number(allocation[dim]) || 0));
      sanitized[dim] = val;
      sum += val;
    }

    if (sum !== RESOURCES_CAP.MAX_WILLPOWER_PER_ROUND) {
      if (sum === 0) {
        sanitized.cultivation = 3;
      } else {
        sanitized.cultivation += (RESOURCES_CAP.MAX_WILLPOWER_PER_ROUND - sum);
        if (sanitized.cultivation < 0) sanitized.cultivation = 0;
      }
    }

    return sanitized;
  }

  /**
   * 计算算筹胜率区间
   * @param {Object} params
   * @param {number} params.difficulty 基础难度 (20~90)
   * @param {string} params.dimension 事务赛道 (officialdom, management, military, cultivation, defence)
   * @param {number} params.meterValue 对应四维基础值 (0~100)
   * @param {number} params.willpowerInvested 投入心力 (0~3)
   * @param {number} params.kinsmanBonus 族人特长协助加成 (0~0.35)
   * @param {number} params.teachingBonus 家学技能加成
   */
  calculateWinRates({
    difficulty = 50,
    dimension = 'cultivation',
    meterValue = 50,
    willpowerInvested = 0,
    kinsmanBonus = 0,
    teachingBonus = 0,
    skillBonus = 0
  }) {
    const baseRate = 0.45;
    const meterDelta = (meterValue - difficulty) * 0.005;
    const willpowerBuff = willpowerInvested * 0.12;
    const totalBonus = kinsmanBonus + teachingBonus + skillBonus;

    let successChance = baseRate + meterDelta + willpowerBuff + totalBonus;
    successChance = Math.min(0.95, Math.max(0.08, successChance));

    // 暴击 (算筹齐聚) 与错乱 (算筹散乱)
    const critChance = Math.min(0.20, Math.max(0.05, 0.05 + (willpowerInvested * 0.04) + (kinsmanBonus * 0.1)));
    const fumbleChance = Math.min(0.18, Math.max(0.03, (1 - successChance) * 0.15));

    return {
      successChance,
      critChance,
      fumbleChance,
      displayPercent: Math.round(successChance * 100)
    };
  }

  /**
   * 算筹落盘检定 (Counting Rods Cast)
   */
  castCountingRods(checkConfig) {
    const rates = this.calculateWinRates(checkConfig);
    const rodScore = this.prng.nextInt(1, 100); // 算筹合点 1~100

    let outcome;
    const successThreshold = Math.round(rates.successChance * 100);
    const critThreshold = Math.round(rates.critChance * 100);
    const fumbleThreshold = 100 - Math.round(rates.fumbleChance * 100);

    if (rodScore <= critThreshold) {
      outcome = CHECK_TIERS.CRITICAL_SUCCESS; // 算筹大吉 / 暴击
    } else if (rodScore <= successThreshold) {
      outcome = CHECK_TIERS.SUCCESS;
    } else if (rodScore > fumbleThreshold) {
      outcome = CHECK_TIERS.FUMBLE; // 算筹散落 / 大失手
    } else if (rodScore <= successThreshold + 10) {
      outcome = CHECK_TIERS.PARTIAL; // 险胜涉过
    } else {
      outcome = CHECK_TIERS.FAILURE;
    }

    const checkRecord = {
      timestamp: Date.now(),
      rodScore,
      d100: rodScore, // 兼容
      rates,
      outcome,
      checkConfig,
      canReroll: this.rodRerollsRemaining > 0 && outcome !== CHECK_TIERS.CRITICAL_SUCCESS
    };

    this.history.push(checkRecord);
    return checkRecord;
  }

  // 兼容老调用
  rollCheck(checkConfig) {
    return this.castCountingRods(checkConfig);
  }

  /**
   * 局内消耗一次「重筹」机会重新布筹
   */
  rerollWithCountingRods(checkConfig) {
    if (this.rodRerollsRemaining <= 0) {
      return { success: false, reason: '重筹机会已耗尽 (每局上限3次)' };
    }

    this.rodRerollsRemaining--;
    this.rerollSignsRemaining = this.rodRerollsRemaining;

    const newRoll = this.castCountingRods(checkConfig);
    newRoll.isReroll = true;
    newRoll.signsLeft = this.rodRerollsRemaining;

    return {
      success: true,
      result: newRoll,
      signsLeft: this.rodRerollsRemaining
    };
  }

  // 兼容老调用
  rerollWithDestinySign(checkConfig) {
    return this.rerollWithCountingRods(checkConfig);
  }
}

module.exports = CheckEngine;
