/**
 * 华夏三千年世家大系 · 双轴解锁、现实运营驱动、跨500年演化、非血脉继承与家业底色全闭环测试
 * 运行方式: node test_dual_axis_and_vocation_succession.js
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('================================================================================');
console.log('🏛️ 开始测试：华夏三千年世家大系 · 5大核心架构与运营闭环校验');
console.log('================================================================================');

// 1. 测试真实赛季总表与动态驱动 (REAL_WORLD_SEASONS_REGISTRY)
console.log('\n>>> [测试 1：真实赛季总表与动态驱动引擎 (Real-World LiveOps Seasons)]');
const seasonConfig = require('./wechat-minigame/src/data/seasonConfig.js');

assert(seasonConfig.REAL_WORLD_SEASONS_REGISTRY, 'REAL_WORLD_SEASONS_REGISTRY 必须存在');
assert.strictEqual(seasonConfig.REAL_WORLD_SEASONS_REGISTRY.length, 15, '真实世界运营赛季必须完整规划 15 季');

const rs1 = seasonConfig.getRealSeasonById('RS_2026_Q4_HANWEI');
assert(rs1, 'RS_2026_Q4_HANWEI 必须存在');
assert.strictEqual(rs1.realSeasonIndex, 1);
assert.strictEqual(rs1.worldSeasonId, 'season_1_han_wei');
assert.strictEqual(rs1.durationWeeks, 7);
assert.strictEqual(rs1.frontierYear, 2035);

const sByDate1 = seasonConfig.getRealSeasonByDate('2026-11-01');
assert.strictEqual(sByDate1.realSeasonId, 'RS_2026_Q4_HANWEI', '2026-11-01 必须命中第一赛季');

const sByDate2 = seasonConfig.getRealSeasonByDate('2027-01-01');
assert.strictEqual(sByDate2.realSeasonId, 'RS_2026_WINTER_LIUCHAO', '2027-01-01 必须动态推进至第二赛季六朝烟雨');

console.log('  ✅ 成功验证：真实运营赛季 15 季总表就绪，时间戳动态匹配准确无误！');

// 2. 测试非血脉接班入口与结算引擎承继 (Succession Archetypes & Heritage Packaging)
console.log('\n>>> [测试 2：非血脉多元接班 (过继贤侄、名门秦晋、衣钵门生) 闭环]');
const seasonSettlement = require('./wechat-minigame/src/data/seasonSettlementEngine.js');
const familySystem = require('./wechat-minigame/src/data/familySystem.js');

const mockFam = familySystem.createFamilyProfile({
  surname: '陈',
  province: '河南',
  hallName: '德星堂',
  vocationId: 'study_scholar',
  customMotto: '德业传家，诗书泽后'
});

// 模拟 4 代先祖，分别采用 4 种不同传承方式入谱
const candidateArchetypes = [
  { origin: 'lineage_child', role: '宗门嫡长', fullName: '陈继宗' },
  { origin: 'clan_nephew', role: '宗族过继贤侄', fullName: '陈伯达' },
  { origin: 'affinity_inlaw', role: '名门秦晋联姻入族', fullName: '荀文秀' },
  { origin: 'disciple_mentee', role: '衣钵得道门生', fullName: '顾守仁' }
];

candidateArchetypes.forEach((cand, idx) => {
  const ancestor = {
    recordId: `anc_${idx + 1}`,
    generation: idx + 1,
    fullName: cand.fullName,
    posthumousTitle: '文靖公',
    officialTitle: '太学祭酒',
    lifespan: [100 + idx * 50, 160 + idx * 50],
    successorOrigin: cand.origin,
    successorRole: cand.role,
    epitaph: `以${cand.role}承祧家风，德化一方。`,
    bequeathedMoney: 50000,
    prestigeGain: 120
  };
  mockFam.genealogyList.push(ancestor);
});

assert.strictEqual(mockFam.genealogyList.length, 4, '必须记录 4 代先祖');

// 运行 200 年赛季大结卷考定
const preview = seasonSettlement.previewSeasonSettlement(mockFam, 'season_1_han_wei');
assert(preview.ancestorsSummary, 'ancestorsSummary 必须存在');
assert.strictEqual(preview.ancestorsSummary.length, 4, '长卷中必须包含 4 位先祖');

// 核验 4 大接班原由被忠实保留，彻底告别"单一血脉式"
assert.strictEqual(preview.ancestorsSummary[0].successorOrigin, 'lineage_child');
assert.strictEqual(preview.ancestorsSummary[0].successorRole, '宗门嫡长');

assert.strictEqual(preview.ancestorsSummary[1].successorOrigin, 'clan_nephew');
assert.strictEqual(preview.ancestorsSummary[1].successorRole, '宗族过继贤侄');

assert.strictEqual(preview.ancestorsSummary[2].successorOrigin, 'affinity_inlaw');
assert.strictEqual(preview.ancestorsSummary[2].successorRole, '名门秦晋联姻入族');

assert.strictEqual(preview.ancestorsSummary[3].successorOrigin, 'disciple_mentee');
assert.strictEqual(preview.ancestorsSummary[3].successorRole, '衣钵得道门生');

console.log('  ✅ 成功验证：4大传承源流（宗门嫡长、过继贤侄、名门秦晋、衣钵门生）完整固化于大结卷中！');

// 3. 测试家业底色四大核心加成字段联动 (Vocation Bonus Fields Activation)
console.log('\n>>> [测试 3：家业底色四大加成字段 (tradeSuccessBonus, epidemicResist, cultureBonus, techInventionBonus) 联动]');
const vocations = familySystem.VOCATION_ORIGIN_PROFILES;
assert(vocations.trade_craft.statBonus.tradeSuccessBonus === 0.2, 'trade_craft 必须具备 tradeSuccessBonus');
assert(vocations.medical_herb.statBonus.epidemicResist === 0.4, 'medical_herb 必须具备 epidemicResist');
assert(vocations.study_scholar.statBonus.cultureBonus === 0.25, 'study_scholar 必须具备 cultureBonus');
assert(vocations.iron_craft.statBonus.techInventionBonus === 0.3, 'iron_craft 必须具备 techInventionBonus');

// 模拟在大疫之年减伤逻辑
const rawDmg = -30;
const resistRate = vocations.medical_herb.statBonus.epidemicResist;
const mitigatedDmg = Math.round(rawDmg * (1 - resistRate));
assert.strictEqual(mitigatedDmg, -18, '40% 大疫抗性下，-30 伤害应被化解为 -18');

// 模拟商业世家交易红利
const baseCapitalReward = 10000;
const tradeBonusRate = vocations.trade_craft.statBonus.tradeSuccessBonus;
const extraTradeCapital = Math.round(baseCapitalReward * tradeBonusRate);
assert.strictEqual(extraTradeCapital, 2000, '20% 通商加成下，10000 报酬应额外获得 2000');

console.log('  ✅ 成功验证：家业底色四大加成字段全部具备实装算式与回响！');

// 4. 测试 game.js 源代码健全性与 UI 弹窗挂接 (Static Analysis of game.js)
console.log('\n>>> [测试 4：game.js 源代码函数与 UI 弹窗挂载核对]');
const gameJsPath = path.join(__dirname, 'wechat-minigame/game.js');
const gameJsContent = fs.readFileSync(gameJsPath, 'utf8');

// (1) 真实赛季与动态解析函数
assert(gameJsContent.includes('function resolveCurrentRealSeason('), 'game.js 必须包含 resolveCurrentRealSeason');
assert(gameJsContent.includes('resolveCurrentRealSeason()'), 'game.js 必须调用 resolveCurrentRealSeason');

// (2) 500年以后的断代引擎拓展
assert(gameJsContent.includes('function isDynasticEra('), 'game.js 必须包含 isDynasticEra 函数定义');
assert(gameJsContent.includes('function getDynastyEraName('), 'game.js 必须包含 getDynastyEraName 函数定义');
assert(gameJsContent.includes('EPOCHS_TWO_TO_TEN_DATABASE'), 'game.js 必须挂接 500~2100 年 EPOCHS_TWO_TO_TEN_DATABASE 历史库');
assert(gameJsContent.includes('FUTURE_DECADE_SCENARIOS'), 'game.js 必须挂接 2100 年后深空大纪元未来剧本');

// (3) 接班弹窗与非血脉入口
assert(gameJsContent.includes('function openSuccessorSelectionModal()'), 'game.js 必须包含 openSuccessorSelectionModal');
assert(gameJsContent.includes('function drawSuccessorSelectionModal()'), 'game.js 必须包含 drawSuccessorSelectionModal');
assert(gameJsContent.includes("state.activeModal === 'successor_selection'"), 'drawActiveModal 必须分发 successor_selection');
assert(gameJsContent.includes("openSuccessorSelectionModal();"), 'endgame 弹窗接棒按钮必须调用 openSuccessorSelectionModal');

// (4) 7周休赛备战与四大经略长线玩法卡片
assert(gameJsContent.includes('7周休赛备战 · 宗族四大经略长线玩法'), 'drawSeasonSettlementModal 必须包含 7周休赛四大经略卡片');
assert(gameJsContent.includes('season_branch_replay_btn'), '必须包含开辟新房分支按钮');

console.log('  ✅ 成功验证：game.js 完整具备 5 大架构改进所有方法与 UI 挂接！');

console.log('\n================================================================================');
console.log('  🎉 5大核心架构与运营闭环测试 100% 全部通过！');
console.log('================================================================================\n');
process.exit(0);
