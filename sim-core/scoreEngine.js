/**
 * sim-core/scoreEngine.js
 * 局末评分模型 (满分100)、评级映射与近失提示 (Near-miss Feedback)
 * 严格落实 5 维度加权、出身修正 (凡品×1.05/绝品×0.95)、高段位门槛上浮与段位点换算
 */

class ScoreEngine {
  /**
   * 评级区间基准表 (五品以下起步线)
   */
  static get BASE_THRESHOLDS() {
    return {
      S: 90,
      A: 78,
      B_PLUS: 66,
      B: 55,
      C: 40
      // < 40 即为 D
    };
  }

  /**
   * 获取考虑段位上浮后的实际门槛
   * 五品起每升一大品，各档门槛 +2 分，最多 +10 (五品+2, 四品+4, 三品+6, 二品+8, 一品+10)
   * @param {number} clanRank 品级 (9 ~ 1, 9品最低, 1品最高)
   */
  static getAdjustedThresholds(clanRank = 9) {
    let offset = 0;
    if (clanRank <= 5) {
      offset = Math.min(10, (5 - clanRank + 1) * 2);
    }

    const base = ScoreEngine.BASE_THRESHOLDS;
    return {
      S: base.S + offset,
      A: base.A + offset,
      B_PLUS: base.B_PLUS + offset,
      B: base.B + offset,
      C: base.C + offset,
      offset
    };
  }

  /**
   * 计算单局满分 100 的评分明细
   * @param {Object} input
   * @param {number} input.age 终龄 (20~80)
   * @param {boolean} input.healthyRetirement 是否安享晚年/正常收官 (非暴毙)
   * @param {Object} input.meters 四维属性 { prestige, wealth, force, grain }
   * @param {number} input.clashScore 历史大考总斩获 (0~25)
   * @param {number} input.estateScore 传嗣与家业得分 (0~20)
   * @param {Object} input.vowResult 誓愿达成情况 { completed: boolean, riskLevel: 'low'|'mid'|'high' }
   * @param {Object} input.destinyCard 宿命身份卡
   * @param {number} input.clanRank 家族当前品级 (9~1)
   * @param {boolean} input.isRetreat 是否主动致仕 (如果是，已先打折)
   */
  static evaluateRun(input = {}) {
    const {
      age = 70,
      healthyRetirement = true,
      meters = { prestige: 50, wealth: 50, force: 50, grain: 50 },
      clashScore = 15,
      estateScore = 14,
      vowResult = { completed: false, riskLevel: 'low' },
      destinyCard = {},
      clanRank = 9,
      isRetreat = false
    } = input;

    // 1. 存续寿数 (满分 20)
    // 一代当家人汉末 36 年 (20岁及冠入世，至 56 岁)
    // 活满 36 年且健康收官得 14 分；若早夭中道崩殂按实际执掌年限折算
    const tenureYears = Math.max(0, age - 20);
    let lifespanScore = Math.min(10, (tenureYears / 36) * 10);
    if (healthyRetirement && tenureYears >= 30) {
      lifespanScore += 4;
    } else if (healthyRetirement) {
      lifespanScore += 2;
    }
    lifespanScore = Math.round(Math.min(20, Math.max(0, lifespanScore)) * 10) / 10;

    // 2. 门第官阶 / 四维综合 (满分 25)
    // 门槛梯级：平庸四维(45~55)得 8~10 分；优秀四维(70+)得 12~16 分；极盛(85+)得 18~22 分
    const meterValues = Object.values(meters);
    const avgMeter = meterValues.reduce((a, b) => a + b, 0) / Math.max(1, meterValues.length);
    let meterRankScore = 0;
    if (avgMeter >= 85) {
      meterRankScore = 18.5 + ((avgMeter - 85) / 15) * 6.5;
    } else if (avgMeter >= 70) {
      meterRankScore = 13 + ((avgMeter - 70) / 15) * 5.5;
    } else if (avgMeter >= 50) {
      meterRankScore = 7 + ((avgMeter - 50) / 20) * 6;
    } else {
      meterRankScore = Math.max(0, (avgMeter / 50) * 7);
    }
    meterRankScore = Math.round(Math.min(25, Math.max(0, meterRankScore)) * 10) / 10;

    // 3. 历史大考 / 幕终大劫 (满分 25)
    // 3 次大劫，全大胜得 21 分，极致料敌机先全胜可达 25 分
    const clashFinalScore = Math.min(25, Math.max(0, Math.round(clashScore * 10) / 10));

    // 4. 传嗣与家业 (满分 20)
    // 基础 8~10 分，家业丰饶时 12~15 分，盛世突破 18 分
    const successionScore = Math.min(20, Math.max(0, Math.round(estateScore * 10) / 10));

    // 5. 家训誓愿 (满分 10)
    let vowScore = 0;
    if (vowResult?.completed) {
      if (vowResult.riskLevel === 'high') vowScore = 10;
      else if (vowResult.riskLevel === 'mid') vowScore = 7;
      else vowScore = 4;
    }

    // 原始总分 (0~100)
    let rawTotal = lifespanScore + meterRankScore + clashFinalScore + successionScore + vowScore;

    // 出身修正：凡品卡 ×1.05 (逆袭补偿)，绝品卡 ×0.95
    let originModifier = 1.0;
    const quality = destinyCard?.quality || destinyCard?.tier || 'common';
    if (quality === 'common' || quality === 'mortal') {
      originModifier = 1.05;
    } else if (quality === 'legendary') {
      originModifier = 0.95;
    }

    let finalScore = Math.round((rawTotal * originModifier) * 10) / 10;
    finalScore = Math.min(100, Math.max(0, finalScore));

    // 映射评级与段位点
    const thresholds = ScoreEngine.getAdjustedThresholds(clanRank);
    let grade = 'D';
    let rankPointsDelta = -100;
    let multiplier = -1.0;

    if (finalScore >= thresholds.S) {
      grade = 'S';
      rankPointsDelta = 150;
      multiplier = 1.5;
    } else if (finalScore >= thresholds.A) {
      grade = 'A';
      rankPointsDelta = 100;
      multiplier = 1.0;
    } else if (finalScore >= thresholds.B_PLUS) {
      grade = 'B+';
      rankPointsDelta = 80;
      multiplier = 0.8;
    } else if (finalScore >= thresholds.B) {
      grade = 'B';
      rankPointsDelta = 0;
      multiplier = 0.0;
    } else if (finalScore >= thresholds.C) {
      grade = 'C';
      rankPointsDelta = -50;
      multiplier = -0.5;
    } else {
      grade = 'D';
      rankPointsDelta = -100;
      multiplier = -1.0;
    }

    // 生成近失提示 (Near-miss Feedback)
    const nearMiss = ScoreEngine._generateNearMissHint({
      grade,
      finalScore,
      thresholds,
      breakdown: { lifespanScore, meterRankScore, clashFinalScore, successionScore, vowScore }
    });

    return {
      finalScore,
      rawTotal,
      grade,
      rankPointsDelta,
      multiplier,
      originModifier,
      clanRank,
      thresholds,
      isRetreat,
      breakdown: {
        lifespanScore,
        meterRankScore,
        clashFinalScore,
        successionScore,
        vowScore
      },
      nearMiss
    };
  }

  /**
   * 生成近失提示
   */
  static _generateNearMissHint({ grade, finalScore, thresholds, breakdown }) {
    if (grade === 'S') {
      return {
        hasNearMiss: false,
        hint: '登峰造极，名垂华夏宗谱！'
      };
    }

    let targetGrade = 'S';
    let targetThreshold = thresholds.S;

    if (grade === 'A') {
      targetGrade = 'S';
      targetThreshold = thresholds.S;
    } else if (grade === 'B+') {
      targetGrade = 'A';
      targetThreshold = thresholds.A;
    } else if (grade === 'B') {
      targetGrade = 'B+';
      targetThreshold = thresholds.B_PLUS;
    } else {
      targetGrade = 'B';
      targetThreshold = thresholds.B;
    }

    const gap = Math.round((targetThreshold - finalScore) * 10) / 10;

    let suggestion = '提升四维与门第';
    if (breakdown.vowScore === 0) {
      suggestion = '若能笃行践行家训誓愿即可斩获关键加分';
    } else if (breakdown.clashFinalScore < 20) {
      suggestion = '若在大考中军令策略克制斩获大胜可补足微小差距';
    } else if (breakdown.lifespanScore < 16) {
      suggestion = '注重修身延寿，安享晚年即可反超';
    }

    return {
      hasNearMiss: gap <= 6.0,
      targetGrade,
      gap,
      hint: `距【${targetGrade}】级仅差 ${gap} 分！${suggestion}。`
    };
  }
}

module.exports = ScoreEngine;
