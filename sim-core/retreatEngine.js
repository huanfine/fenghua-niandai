/**
 * sim-core/retreatEngine.js
 * 急流勇退 (主动致仕) 机制引擎
 * 第8回合起可主动结算：锁定当前评分 ×0.92，保全已获得的所有行囊宝箱避险收官
 */

const { RUN_RULES } = require('./rules.js');

class RetreatEngine {
  /**
   * 检查当前回合是否允许主动致仕
   * @param {number} currentRound
   */
  static isRetreatAvailable(currentRound) {
    return currentRound >= RUN_RULES.MIN_RETREAT_ROUND && currentRound <= RUN_RULES.TOTAL_ROUNDS;
  }

  /**
   * 计算主动致仕的预估收益与风险
   * @param {Object} params
   * @param {number} params.currentRawScore 当前未折算评分 (0~100)
   * @param {number} params.currentRound 当前回合 (8~12)
   * @param {Array<Object>} params.bagChests 行囊中的宝箱
   */
  static calculateRetreatOffer({ currentRawScore, currentRound, bagChests = [] }) {
    if (!RetreatEngine.isRetreatAvailable(currentRound)) {
      return {
        available: false,
        reason: `尚未达到致仕时机 (须在第 ${RUN_RULES.MIN_RETREAT_ROUND} 回合及之后)`
      };
    }

    const lockedScore = Math.round(currentRawScore * RUN_RULES.RETREAT_SCORE_MULTIPLIER * 10) / 10;
    const penaltyRatio = Math.round((1 - RUN_RULES.RETREAT_SCORE_MULTIPLIER) * 100);

    return {
      available: true,
      currentRound,
      currentRawScore,
      lockedScore,
      discountText: `锁定评分 ×${RUN_RULES.RETREAT_SCORE_MULTIPLIER} (让利 ${penaltyRatio}%)`,
      securedChestsCount: bagChests.length,
      advise: '主动告老致仕可保全现有战利品并规避晚年暴毙清零风险。'
    };
  }

  /**
   * 执行致仕决断
   */
  static executeRetreat({ currentRawScore, currentRound, bagChests = [] }) {
    const offer = RetreatEngine.calculateRetreatOffer({ currentRawScore, currentRound, bagChests });
    if (!offer.available) {
      throw new Error(offer.reason);
    }

    return {
      retired: true,
      retreatRound: currentRound,
      finalScore: offer.lockedScore,
      preservedChests: [...bagChests],
      isPeacefulRetirement: true
    };
  }
}

module.exports = RetreatEngine;
