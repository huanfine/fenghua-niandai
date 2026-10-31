/**
 * test_clan_rank_ladder_engine.js
 * 单元测试：《华夏世家》核心段位与评分引擎
 */

const assert = require('assert');
const engine = require('./wechat-minigame/src/data/clanRankLadderEngine.js');

console.log('====================================================');
console.log('🧪 单元测试：华夏九品世家段位与遗产提取数理模型');
console.log('====================================================');

// 1. 测试段位结构与特权
console.log('👉 [测试 1] 校验九品段位阶梯与特权配置...');
assert.strictEqual(engine.CLAN_RANK_LADDER.length, 9, '必须包含 9 个阶层');
const rank9 = engine.CLAN_RANK_LADDER[0];
const rank7 = engine.CLAN_RANK_LADDER[3];
const rank4 = engine.CLAN_RANK_LADDER[6];
const rank1 = engine.CLAN_RANK_LADDER[8];

assert.strictEqual(rank9.maxSkillSlots, 2, '起步段位技能槽上限为2');
assert.strictEqual(rank7.maxSkillSlots, 3, '中阶世家技能槽解锁至3');
assert.strictEqual(rank4.maxSkillSlots, 4, '高门世家技能槽封顶为4');
assert.strictEqual(rank1.maxChestTier, 'legendary', '极品世家可爆绝品金宝箱');
console.log('  ✅ 九品段位与特权规则 100% 正确！');

// 2. 测试单局评分引擎
console.log('👉 [测试 2] 校验单局综合评分 (S/A/B/C/D)...');
const sRun = engine.evaluateSingleRunScore({
  careerTenureYears: 50,
  year: 300,
  meters: { prestige: 85, wealth: 80, force: 75, grain: 75 },
  milestonesPassed: 4,
  chestInventory: [{}, {}, {}, {}]
});
assert.strictEqual(sRun.grade, 'S', '极盛履历应评为S级');
assert.strictEqual(sRun.multiplier, 1.5, 'S级胜点倍率必须为1.5');

const bRun = engine.evaluateSingleRunScore({
  careerTenureYears: 20,
  year: 140,
  meters: { prestige: 40, wealth: 45, force: 40, grain: 40 },
  milestonesPassed: 0,
  chestInventory: []
});
assert.strictEqual(bRun.grade, 'B', '平庸平盘履历应评为B级');
assert.strictEqual(bRun.multiplier, 0.0, 'B级平盘倍率必须为0.0');

const dRun = engine.evaluateSingleRunScore({
  careerTenureYears: 5,
  year: 105,
  meters: { prestige: 0, wealth: 10, force: 10, grain: 10 },
  milestonesPassed: 0,
  chestInventory: []
});
assert.strictEqual(dRun.grade, 'D', '早夭覆亡履历应评为D级');
assert.ok(dRun.multiplier < 0, 'D级必须扣胜点');
console.log('  ✅ 单局评分与倍率数学分布严格符合设计预期！');

// 3. 测试段位升降级
console.log('👉 [测试 3] 校验段位爬坡与晋升/掉段...');
const mockClan = { rankProgress: { rankOrder: 1, currentPoints: 80, totalRuns: 5 } };
const promoResult = engine.settleClanRankProgress(mockClan, sRun);
assert.strictEqual(promoResult.promoted, true, 'S级加分后应成功晋升下一阶');
assert.strictEqual(mockClan.rankProgress.rankOrder, 2, '段位应晋升为2阶');

const demoteResult = engine.settleClanRankProgress(mockClan, dRun);
assert.strictEqual(demoteResult.demoted, true, 'D级扣分后应掉段');
assert.strictEqual(mockClan.rankProgress.rankOrder, 1, '段位应回落至1阶');
console.log('  ✅ 段位晋升与掉级机制运行无误！');

// 4. 测试遗产宝箱提现规则
console.log('👉 [测试 4] 校验遗产宝箱提现/没收逻辑...');
const mockChests = [
  { id: 'c1', name: '青铜箱' },
  { id: 'c2', name: '白银箱' },
  { id: 'c3', name: '黄金箱' },
  { id: 'c4', name: '绝品箱' }
];

// S级：全部提现
const sExtraction = engine.resolveChestExtraction(mockChests, 'S');
assert.strictEqual(sExtraction.extracted.length, 4, 'S级必须100%全额提现带走');
assert.strictEqual(sExtraction.discarded.length, 0, 'S级不得遗弃宝箱');

// A级：随机提取 60%
const aExtraction = engine.resolveChestExtraction(mockChests, 'A');
assert.ok(aExtraction.extracted.length >= 2, 'A级应提取主要部分宝箱');
assert.ok(aExtraction.discarded.length > 0, 'A级应有部分遗失');

// B级 (平盘，段位未提升)：全部没收！
const bExtraction = engine.resolveChestExtraction(mockChests, 'B');
assert.strictEqual(bExtraction.extracted.length, 0, 'B级平盘段位未提升，宝箱必须全部没收！');
assert.strictEqual(bExtraction.discarded.length, 4, '所有宝箱应被收缴');

// D级：全部没收
const dExtraction = engine.resolveChestExtraction(mockChests, 'D');
assert.strictEqual(dExtraction.extracted.length, 0, 'D级失败宝箱全部没收');
console.log('  ✅ 宝箱提现与段位强绑定机制检验 100% 通过！');

// 5. 跨赛季衰减测试
console.log('👉 [测试 5] 校验跨赛季衰减重置 (Soft Reset)...');
const masterClan = { rankProgress: { rankOrder: 9, currentPoints: 500 } };
const resetRank = engine.applySeasonSoftReset(masterClan);
assert.strictEqual(masterClan.rankProgress.rankOrder, 4, '顶尖世家新赛季平降至4阶');
assert.strictEqual(masterClan.rankProgress.currentPoints, 0, '新赛季积分清零重跑');
console.log('  ✅ 跨赛季平移衰减机制检验 100% 通过！');

console.log('====================================================');
console.log('🎉 核心段位与评分引擎自动化单元测试 100% 全部通过！');
console.log('====================================================');
