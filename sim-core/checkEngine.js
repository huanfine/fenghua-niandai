/**
 * sim-core/checkEngine.js
 * 心力分配 (Willpower) 与 检定引擎 (Skill Check)
 * 支持 3 点心力加注、概率区间换算、骰点判定、暴击/失手与局内 3 次改命签重掷
 */

const { RESOURCES_CAP, WILLPOWER_DIMENSIONS, CHECK_TIERS } = require('./rules.js');

class CheckEngine {
  /**
   * @param {import('./prng')} prng
   */
  constructor(prng) {
    this.prng = prng;
    this.rerollSignsRemaining = RESOURCES_CAP.MAX_DESTINY_REROLL_SIGNS; // 初始 3 枚改命签
    this.history = [];
  }

  /**
   * 验证心力分配是否合规 (严格总计 3 点，且维度合法)
   * @param {Object} allocation { management: 1, officialdom: 2, military: 0, cultivation: 0 }
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
      // 自动修正或报错：若未分满或超限，进行安全归一
      if (sum === 0) {
        sanitized.cultivation = 3; // 默认沉淀修身
      } else {
        // 截断或填充
        sanitized.cultivation += (RESOURCES_CAP.MAX_WILLPOWER_PER_ROUND - sum);
        if (sanitized.cultivation < 0) sanitized.cultivation = 0;
      }
    }

    return sanitized;
  }

  /**
   * 计算检定胜率区间
   * @param {Object} params
   * @param {number} params.difficulty 基础难度 (通常 20 ~ 90)
   * @param {string} params.dimension 检定维度 (management, officialdom, military, cultivation)
   * @param {number} params.meterValue 对应四维基础值 (0 ~ 100)
   * @param {number} params.willpowerInvested 投入的心力点数 (0 ~ 3)
   * @param {number} params.skillBonus 技能提供的成功率加成 (-0.3 ~ +0.5)
   */
  calculateWinRates({
    difficulty = 50,
    dimension = 'cultivation',
    meterValue = 50,
    willpowerInvested = 0,
    skillBonus = 0
  }) {
    // 基础成功率公式：基础四维提供权重，难度形成门槛，心力每点提供 +12% 核心增益
    const baseRate = 0.45;
    const meterDelta = (meterValue - difficulty) * 0.005; // 每点四维差值 +0.5%
    const willpowerBuff = willpowerInvested * 0.12;       // 每点心力 +12%
    
    let successChance = baseRate + meterDelta + willpowerBuff + skillBonus;
    successChance = Math.min(0.95, Math.max(0.08, successChance)); // 软锁定在 8% ~ 95%

    // 暴击与大失手区间
    // 暴击率随高胜率或高心力上浮
    const critChance = Math.min(0.20, Math.max(0.05, 0.05 + (willpowerInvested * 0.04)));
    // 大失手率随低胜率上浮
    const fumbleChance = Math.min(0.18, Math.max(0.03, (1 - successChance) * 0.15));

    return {
      successChance,
      critChance,
      fumbleChance,
      displayPercent: Math.round(successChance * 100)
    };
  }

  /**
   * 执行一次确定性检定掷骰
   * 采用 D100 骰点机制
   * @param {Object} checkConfig 检定配置
   */
  rollCheck(checkConfig) {
    const rates = this.calculateWinRates(checkConfig);
    const d100 = this.prng.nextInt(1, 100); // 1 ~ 100

    let outcome;
    const successThreshold = Math.round(rates.successChance * 100);
    const critThreshold = Math.round(rates.critChance * 100);
    const fumbleThreshold = 100 - Math.round(rates.fumbleChance * 100);

    if (d100 <= critThreshold) {
      outcome = CHECK_TIERS.CRITICAL_SUCCESS; // 掷出极低点 (大暴击)
    } else if (d100 <= successThreshold) {
      outcome = CHECK_TIERS.SUCCESS;
    } else if (d100 > fumbleThreshold) {
      outcome = CHECK_TIERS.FUMBLE; // 掷出极高失手点
    } else if (d100 <= successThreshold + 12) {
      outcome = CHECK_TIERS.PARTIAL; // 险胜/平局
    } else {
      outcome = CHECK_TIERS.FAILURE;
    }

    const checkRecord = {
      timestamp: Date.now(),
      d100,
      rates,
      outcome,
      checkConfig,
      canReroll: this.rerollSignsRemaining > 0 && outcome !== CHECK_TIERS.CRITICAL_SUCCESS
    };

    this.history.push(checkRecord);
    return checkRecord;
  }

  /**
   * 使用局内改命签重掷一次检定
   */
  rerollWithDestinySign(checkConfig) {
    if (this.rerollSignsRemaining <= 0) {
      return { success: false, reason: '改命签已耗尽 (上限3次)' };
    }

    this.rerollSignsRemaining--;
    const newRoll = this.rollCheck(checkConfig);
    newRoll.isReroll = true;
    newRoll.signsLeft = this.rerollSignsRemaining;

    return {
      success: true,
      result: newRoll,
      signsLeft: this.rerollSignsRemaining
    };
  }
}

module.exports = CheckEngine;
