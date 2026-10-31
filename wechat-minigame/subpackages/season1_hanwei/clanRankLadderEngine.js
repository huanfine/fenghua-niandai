/**
 * clanRankLadderEngine.js
 * 《华夏世家》核心数理与段位引擎 (符合合规规范)
 * 涵盖：
 * 1. 华夏九品世家段位体系 (每品三阶，严格定义各段位特权与局内上限)
 * 2. 单局综合评分引擎 (百分制，结算为 S+/A/B+/B/C/D)
 * 3. 排位胜点升降模型 (S级+1.5倍, A级+1.0倍, B级平盘, C/D级掉段惩罚)
 * 4. 局内遗产宝箱提现/没收算法 (满级全带走，平盘/掉段全部没收)
 */

// 1. 华夏九品世家段位配置字典 (合规去官化：门第等第)
const CLAN_RANK_LADDER = [
  // 下三阶：寒素微末 (九品至七品)
  {
    rankId: 'rank_9_lower',
    order: 1,
    grade: '九品',
    tier: '下阶',
    title: '乡野寒门 · 下阶',
    desc: '耕读草庐，宗族初兴，未列名门',
    maxSkillSlots: 2,
    maxChestTier: 'common', // 只能掉落凡品(白)、良品(绿)
    maxHistoricalEpoch: 184, // 大考上限：公元184年黄巾
    pointsToNext: 100
  },
  {
    rankId: 'rank_9_mid',
    order: 2,
    grade: '九品',
    tier: '中阶',
    title: '乡野寒门 · 中阶',
    desc: '开塾课徒，积谷防饥，初具规模',
    maxSkillSlots: 2,
    maxChestTier: 'common',
    maxHistoricalEpoch: 184,
    pointsToNext: 100
  },
  {
    rankId: 'rank_8_upper',
    order: 3,
    grade: '八品',
    tier: '上阶',
    title: '乡野寒门 · 极阶',
    desc: '乡里宗长，声名渐起，初辟外财',
    maxSkillSlots: 2,
    maxChestTier: 'uncommon',
    maxHistoricalEpoch: 184,
    pointsToNext: 100
  },
  // 中三阶：郡国大姓 (七品至四品)
  {
    rankId: 'rank_7_lower',
    order: 4,
    grade: '七品',
    tier: '下阶',
    title: '州郡名宗 · 下阶',
    desc: '坞堡初筑，部曲百人，乡邦推戴',
    maxSkillSlots: 3, // 解锁第3技能槽
    maxChestTier: 'rare', // 解锁珍品(蓝)宝箱
    maxHistoricalEpoch: 200, // 大考上限：公元200年官渡
    pointsToNext: 120
  },
  {
    rankId: 'rank_6_mid',
    order: 5,
    grade: '六品',
    tier: '中阶',
    title: '州郡名宗 · 中阶',
    desc: '累代传经，门生遍野，良田千顷',
    maxSkillSlots: 3,
    maxChestTier: 'rare',
    maxHistoricalEpoch: 200,
    pointsToNext: 120
  },
  {
    rankId: 'rank_5_upper',
    order: 6,
    grade: '五品',
    tier: '上阶',
    title: '郡望大姓 · 雄宗',
    desc: '两千石世交，名震州郡，豪右归附',
    maxSkillSlots: 3,
    maxChestTier: 'epic', // 解锁极品(紫)宝箱
    maxHistoricalEpoch: 220, // 大考上限：公元220年魏受禅
    pointsToNext: 150
  },
  // 上三阶：海内高门与不朽鼎食 (三品至一品)
  {
    rankId: 'rank_4_lower',
    order: 7,
    grade: '四品',
    tier: '下阶',
    title: '海内望族 · 冠冕',
    desc: '名列九卿，清议领袖，执天下牛耳',
    maxSkillSlots: 4, // 终极解锁第4技能槽
    maxChestTier: 'epic',
    maxHistoricalEpoch: 249, // 大考上限：公元249年高平陵
    pointsToNext: 180
  },
  {
    rankId: 'rank_3_mid',
    order: 8,
    grade: '三品',
    tier: '中阶',
    title: '海内冠族 · 阀阅',
    desc: '累世公卿，王谢同风，四海景从',
    maxSkillSlots: 4,
    maxChestTier: 'legendary', // 解锁绝品(金)神话宝箱
    maxHistoricalEpoch: 300, // 全面解封两百年大极盛
    pointsToNext: 200
  },
  {
    rankId: 'rank_1_supreme',
    order: 9,
    grade: '一品',
    tier: '极阶',
    title: '不朽鼎食 · 千秋门阀',
    desc: '立德立言立功，千秋圣手，与国同休',
    maxSkillSlots: 4,
    maxChestTier: 'legendary',
    maxHistoricalEpoch: 300,
    pointsToNext: 99999 // 宗师段位，以胜点积累排位
  }
];

/**
 * 2. 计算单局综合评分 (百分制)
 */
function evaluateSingleRunScore(runStats) {
  const stats = runStats || {};
  const tenureYears = stats.careerTenureYears || 0;
  const survivedYears = Math.max(0, (stats.year || 100) - 100);
  const prestige = (stats.meters && stats.meters.prestige) || 50;
  const wealth = (stats.meters && stats.meters.wealth) || 50;
  const force = (stats.meters && stats.meters.force) || 50;
  const grain = (stats.meters && (stats.meters.grain !== undefined ? stats.meters.grain : stats.meters.culture)) || 50;
  const milestonesPassed = stats.milestonesPassed || 0; // 突破黄巾、官渡等大考次数
  const chestsCollected = (stats.chestInventory && stats.chestInventory.length) || 0;

  // 1. 存续年限与代际传承分 (满分25，活过30载即可获得大部分稳健基准)
  const scoreSurvival = Math.min(25, Math.round((Math.max(tenureYears, survivedYears) / 40) * 20) + (survivedYears >= 40 ? 5 : 0));

  // 2. 四维均衡与终极资产分 (满分30，四维均衡50分约得18分，80分得满分)
  const avgMeters = (prestige + wealth + force + grain) / 4;
  const scoreAssets = Math.min(30, Math.round((avgMeters / 80) * 30));

  // 3. 历史大考击破与立功分 (满分25，击破黄巾/官渡等重大关口)
  const scoreMilestones = Math.min(25, milestonesPassed * 10);

  // 4. 战备与宝箱收集分 (满分20，底蕴基础5分 + 每件宝箱3分)
  const scoreChests = Math.min(20, 5 + chestsCollected * 3);

  const rawScore = Math.min(100, Math.max(10, scoreSurvival + scoreAssets + scoreMilestones + scoreChests));

  // 确定评级等级
  let grade = 'B';
  let multiplier = 0.0;
  let summary = '平盘守成，未建殊勋，门风如常';

  if (rawScore >= 85) {
    grade = 'S';
    multiplier = 1.5;
    summary = '极盛国柱，扫平巨浪，光宗耀祖！';
  } else if (rawScore >= 70) {
    grade = 'A';
    multiplier = 1.0;
    summary = '显赫名门，威加一方，诸宗推戴。';
  } else if (rawScore >= 60) {
    grade = 'B+';
    multiplier = 0.5;
    summary = '中坚自保，微有余庆，略有开拓。';
  } else if (rawScore >= 45) {
    grade = 'B';
    multiplier = 0.0; // 平盘，段位不变
    summary = '勉强度日，波澜不惊，无功无过。';
  } else if (rawScore >= 30) {
    grade = 'C';
    multiplier = -0.8; // 倒扣
    summary = '宗支破败，家资耗散，家督获咎。';
  } else {
    grade = 'D';
    multiplier = -1.5; // 大幅倒扣/降段
    summary = '覆亡绝嗣，宗祠罹难，遗羞后嗣！';
  }

  return {
    rawScore,
    grade,
    multiplier,
    summary,
    breakdown: { scoreSurvival, scoreAssets, scoreMilestones, scoreChests }
  };
}

/**
 * 3. 结算家族段位排位胜点变动
 */
function settleClanRankProgress(clanProfile, runEvaluation) {
  clanProfile.rankProgress = clanProfile.rankProgress || {
    rankOrder: 1,
    currentPoints: 0,
    totalRuns: 0
  };

  const p = clanProfile.rankProgress;
  p.totalRuns = (p.totalRuns || 0) + 1;

  const currentRankCfg = CLAN_RANK_LADDER.find(r => r.order === p.rankOrder) || CLAN_RANK_LADDER[0];
  const mult = runEvaluation.multiplier;
  
  // 基准每次排位单局胜点为 40 点
  const basePointsDelta = Math.round(40 * mult);
  let newPoints = p.currentPoints + basePointsDelta;
  let rankOrder = p.rankOrder;
  let promoted = false;
  let demoted = false;

  // 升级判定
  if (newPoints >= currentRankCfg.pointsToNext && rankOrder < CLAN_RANK_LADDER.length) {
    newPoints -= currentRankCfg.pointsToNext;
    rankOrder += 1;
    promoted = true;
  } else if (newPoints < 0) {
    // 降级判定
    if (rankOrder > 1) {
      rankOrder -= 1;
      const prevRankCfg = CLAN_RANK_LADDER.find(r => r.order === rankOrder);
      newPoints = Math.max(0, (prevRankCfg.pointsToNext || 100) + newPoints);
      demoted = true;
    } else {
      newPoints = 0; // 最低段位不跌穿
    }
  }

  p.rankOrder = rankOrder;
  p.currentPoints = newPoints;
  const newRankCfg = CLAN_RANK_LADDER.find(r => r.order === rankOrder);

  return {
    promoted,
    demoted,
    basePointsDelta,
    currentPoints: p.currentPoints,
    rankOrder: p.rankOrder,
    rankCfg: newRankCfg
  };
}

/**
 * 4. 结算局内遗产宝箱提现规则
 * S级：100%全提现带走
 * A级：随机提取 60% (或三选二)
 * B+级：仅提取 1 件
 * B级(平盘)/C/D级：段位未提升，宝箱全部没收作废！
 */
function resolveChestExtraction(chestInventory, grade) {
  const inv = Array.isArray(chestInventory) ? [...chestInventory] : [];
  if (inv.length === 0) {
    return { extracted: [], discarded: [], reason: '局内未缴获任何宝箱' };
  }

  if (grade === 'S') {
    return {
      extracted: inv,
      discarded: [],
      reason: 'S级极盛功绩，所有遗产宝箱100%悉数解封纳库！'
    };
  } else if (grade === 'A') {
    const keepCount = Math.max(1, Math.ceil(inv.length * 0.6));
    const extracted = inv.slice(0, keepCount);
    const discarded = inv.slice(keepCount);
    return {
      extracted,
      discarded,
      reason: `A级显赫门望，成功提现抢救出 ${extracted.length} 件宝箱，其余散佚。`
    };
  } else if (grade === 'B+') {
    const extracted = [inv[0]];
    const discarded = inv.slice(1);
    return {
      extracted,
      discarded,
      reason: 'B+守成自保，仅能竭力抢运出 1 件宝箱，余者遗失。'
    };
  } else {
    // B / C / D 级：段位未提升或跌落，宝箱全部没收！
    return {
      extracted: [],
      discarded: inv,
      reason: '家族段位未获实质提升，局内所获遗产宝箱尽数被收缴散轶！'
    };
  }
}

/**
 * 5. 跨赛季段位平移衰减机制 (Soft Reset)
 */
function applySeasonSoftReset(clanProfile) {
  clanProfile.rankProgress = clanProfile.rankProgress || { rankOrder: 1, currentPoints: 0 };
  const currentOrder = clanProfile.rankProgress.rankOrder;

  let newOrder = 1;
  // 一品/二品 (8~9阶) -> 平降为 4阶 (七品州郡名宗)
  if (currentOrder >= 8) {
    newOrder = 4;
  } else if (currentOrder >= 5) {
    // 中坚世家 (5~7阶) -> 平降为 2~3阶
    newOrder = 2;
  } else {
    newOrder = 1;
  }

  clanProfile.rankProgress.rankOrder = newOrder;
  clanProfile.rankProgress.currentPoints = 0;
  return CLAN_RANK_LADDER.find(r => r.order === newOrder);
}

// 模块导出
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CLAN_RANK_LADDER,
    evaluateSingleRunScore,
    settleClanRankProgress,
    resolveChestExtraction,
    applySeasonSoftReset
  };
}
