/**
 * meta-service/clanRankLadder.js
 * 家族九品 27 阶段位天梯、保级盾、晋品战与赛季软重置
 * 严格落实九品至一品 27 阶结构、阶内门第点需求、保级盾(2枚)、晋品战(3局>=A)、掉阶规则与单局上限
 */

// 九品定义 (9品最低, 1品最高)
const RANK_CONFIGS = {
  9: { name: '九品寒门', tierCategory: 'lower', pointsPerSubrank: 300, maxSkillSlots: 2, maxChestTier: 'fine' },
  8: { name: '八品庶族', tierCategory: 'lower', pointsPerSubrank: 300, maxSkillSlots: 2, maxChestTier: 'fine' },
  7: { name: '七品郡望', tierCategory: 'lower', pointsPerSubrank: 300, maxSkillSlots: 2, maxChestTier: 'fine' },
  6: { name: '六品豪族', tierCategory: 'mid', pointsPerSubrank: 400, maxSkillSlots: 2, maxChestTier: 'fine' },
  5: { name: '五品名门', tierCategory: 'mid', pointsPerSubrank: 400, maxSkillSlots: 3, maxChestTier: 'epic' },
  4: { name: '四品郡国冠族', tierCategory: 'mid', pointsPerSubrank: 400, maxSkillSlots: 3, maxChestTier: 'epic' },
  3: { name: '三品门阀', tierCategory: 'high', pointsPerSubrank: 500, maxSkillSlots: 4, maxChestTier: 'legendary' },
  2: { name: '二品海内巨室', tierCategory: 'high', pointsPerSubrank: 500, maxSkillSlots: 4, maxChestTier: 'legendary' },
  1: { name: '一品世家至尊', tierCategory: 'high', pointsPerSubrank: 600, maxSkillSlots: 4, maxChestTier: 'legendary' }
};

const SUBRANKS = ['lower', 'mid', 'upper']; // 下、中、上 3 阶
const SUBRANK_NAMES = { lower: '下阶', mid: '中阶', upper: '上阶' };

class ClanRankLadder {
  /**
   * 初始化家族段位状态
   * 默认从九品下阶起步
   */
  static initRankProgress() {
    return {
      rank: 9,              // 9品
      subrank: 'lower',     // 下阶
      currentPoints: 0,     // 阶内门第点
      protectionShields: 2, // 初始 2 枚保级盾
      inPromotionSeries: false, // 是否正在晋品战中
      promotionSeries: {
        matchesPlayed: 0,
        qualifyingWins: 0,  // 需要 >= 1 场 A 级及以上
        maxMatches: 3
      },
      historyRuns: 0
    };
  }

  /**
   * 获取当前段位配置
   */
  static getRankMeta(rankProgress) {
    const rankInfo = RANK_CONFIGS[rankProgress.rank] || RANK_CONFIGS[9];
    const subrankIdx = SUBRANKS.indexOf(rankProgress.subrank);
    const ladderIndex = (9 - rankProgress.rank) * 3 + subrankIdx + 1; // 1 ~ 27

    return {
      rank: rankProgress.rank,
      subrank: rankProgress.subrank,
      rankTitle: `${rankInfo.name} · ${SUBRANK_NAMES[rankProgress.subrank]}`,
      ladderIndex, // 1~27
      totalRanks: 27,
      pointsNeeded: rankInfo.pointsPerSubrank,
      currentPoints: rankProgress.currentPoints,
      maxSkillSlots: rankInfo.maxSkillSlots,
      maxChestTier: rankInfo.maxChestTier,
      shields: rankProgress.protectionShields,
      inPromotionSeries: rankProgress.inPromotionSeries
    };
  }

  /**
   * 结算单局后的段位点与阶位升降
   * 严格遵循：
   * 1. 单局点数上限 +150 / -100 点，且最多跨一阶。
   * 2. 保级盾抵消 C/D 扣分。
   * 3. 掉段规则：九～六品阶内掉点不掉阶；五品及以上允许掉阶；掉品需在下阶0点且无盾时再扣分。
   * 4. 阶内点满触发晋阶或晋品战。
   * @param {Object} rankProgress 当前家族段位状态
   * @param {Object} runEvaluation sim-core 的局末评分结果
   */
  static settleRunRank(rankProgress, runEvaluation) {
    const current = { ...rankProgress };
    current.historyRuns++;

    const rawDelta = runEvaluation.rankPointsDelta; // +150, +100, +80, 0, -50, -100
    const grade = runEvaluation.grade;
    const isLoss = (grade === 'C' || grade === 'D');

    let delta = rawDelta;
    let shieldUsed = false;

    // 1. 保级盾判定：遭遇 C 或 D 级时，若有保级盾，抵消扣分并消耗 1 枚盾
    if (isLoss && current.protectionShields > 0) {
      current.protectionShields--;
      shieldUsed = true;
      delta = 0;
    }

    // 2. 晋品战进行中结算
    if (current.inPromotionSeries) {
      return ClanRankLadder._resolvePromotionSeriesMatch(current, grade, delta);
    }

    const rankInfo = RANK_CONFIGS[current.rank];
    const threshold = rankInfo.pointsPerSubrank;

    let pointsChanged = delta;
    let promoted = false;
    let demoted = false;
    let triggeredPromoSeries = false;
    let promoRewardChest = null;

    if (delta > 0) {
      // 加分逻辑 (单局最多 +150)
      current.currentPoints += delta;
      if (current.currentPoints >= threshold) {
        // 点数已满：判定是升小阶，还是触发晋品战
        if (current.subrank === 'lower') {
          current.subrank = 'mid';
          current.currentPoints = Math.min(threshold - 1, current.currentPoints - threshold);
          current.protectionShields = 2; // 晋入新阶获得 2 枚盾
          promoted = true;
        } else if (current.subrank === 'mid') {
          current.subrank = 'upper';
          current.currentPoints = Math.min(threshold - 1, current.currentPoints - threshold);
          current.protectionShields = 2; // 晋入新阶获得 2 枚盾
          promoted = true;
        } else if (current.subrank === 'upper') {
          // 上阶满点：若未到一品，触发晋品战！
          if (current.rank > 1) {
            current.inPromotionSeries = true;
            current.promotionSeries = { matchesPlayed: 0, qualifyingWins: 0, maxMatches: 3 };
            triggeredPromoSeries = true;
            current.currentPoints = threshold; // 锁在满点
          } else {
            // 一品上阶满分即至高殿堂
            current.currentPoints = threshold;
          }
        }
      }
    } else if (delta < 0) {
      // 扣分逻辑 (单局最多 -100)
      current.currentPoints += delta; // delta is negative

      if (current.currentPoints < 0) {
        // 九品至六品：只在阶内掉点，不掉阶 (保底为当前阶 0 点)
        if (current.rank >= 6) {
          current.currentPoints = 0;
        } else {
          // 五品及以上：允许掉阶
          if (current.subrank === 'upper') {
            current.subrank = 'mid';
            current.currentPoints = threshold + current.currentPoints; // 回退到中阶相应点
            demoted = true;
          } else if (current.subrank === 'mid') {
            current.subrank = 'lower';
            current.currentPoints = threshold + current.currentPoints;
            demoted = true;
          } else if (current.subrank === 'lower') {
            // 下阶 0 点且无盾，掉回下一大品的上阶
            if (current.rank < 9) {
              current.rank++;
              current.subrank = 'upper';
              const lowerRankInfo = RANK_CONFIGS[current.rank];
              current.currentPoints = Math.max(0, lowerRankInfo.pointsPerSubrank - 100);
              demoted = true;
            } else {
              current.currentPoints = 0;
            }
          }
        }
      }
    }

    return {
      updatedProgress: current,
      pointsChanged,
      shieldUsed,
      promoted,
      demoted,
      triggeredPromoSeries,
      promoRewardChest,
      meta: ClanRankLadder.getRankMeta(current)
    };
  }

  /**
   * 晋品战单局裁决 (3 局内任意 1 局 >= A 即晋品)
   */
  static _resolvePromotionSeriesMatch(current, grade, delta) {
    const series = current.promotionSeries;
    series.matchesPlayed++;
    const isQualifyingWin = (grade === 'S' || grade === 'A');

    if (isQualifyingWin) {
      series.qualifyingWins++;
    }

    let seriesConcluded = false;
    let promoSuccess = false;
    let promoRewardChest = null;

    if (series.qualifyingWins >= 1) {
      // 成功晋品！
      promoSuccess = true;
      seriesConcluded = true;
      current.rank--; // 晋升高一大品 (例如六品 -> 五品)
      current.subrank = 'lower';
      current.currentPoints = 0;
      current.protectionShields = 2; // 获得 2 枚盾
      current.inPromotionSeries = false;

      // 发放保底紫色以上的「晋品礼匣」
      promoRewardChest = {
        id: `promo_chest_rank_${current.rank}_${Date.now()}`,
        name: `【${RANK_CONFIGS[current.rank].name}】晋品大礼匣`,
        tier: current.rank <= 3 ? 'legendary' : 'epic'
      };
    } else if (series.matchesPlayed >= series.maxMatches) {
      // 3 局均失败：晋品失败，回退 20% 点数，不掉阶
      seriesConcluded = true;
      promoSuccess = false;
      current.inPromotionSeries = false;
      const threshold = RANK_CONFIGS[current.rank].pointsPerSubrank;
      current.currentPoints = Math.floor(threshold * 0.8); // 回退 20%
    }

    return {
      updatedProgress: current,
      inPromotionSeries: true,
      seriesConcluded,
      promoSuccess,
      promoRewardChest,
      seriesStatus: { ...series },
      meta: ClanRankLadder.getRankMeta(current)
    };
  }

  /**
   * 赛季末软重置 (Soft Reset)
   * 一品 -> 四品上
   * 二品 -> 五品中
   * 三品~四品 -> 六品
   * 五品以下回到七~九品起步线
   */
  static applySeasonSoftReset(rankProgress) {
    const curRank = rankProgress.rank;
    let newRank = 9;
    let newSubrank = 'lower';

    if (curRank === 1) {
      newRank = 4;
      newSubrank = 'upper';
    } else if (curRank === 2) {
      newRank = 5;
      newSubrank = 'mid';
    } else if (curRank <= 4) {
      newRank = 6;
      newSubrank = 'lower';
    } else {
      newRank = Math.min(9, curRank + 2);
      newSubrank = 'lower';
    }

    return {
      ...rankProgress,
      rank: newRank,
      subrank: newSubrank,
      currentPoints: 0,
      protectionShields: 2,
      inPromotionSeries: false
    };
  }
}

module.exports = {
  RANK_CONFIGS,
  SUBRANKS,
  ClanRankLadder
};
