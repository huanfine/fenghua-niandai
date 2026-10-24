/**
 * 华夏世家大系 · 200年历史纪元赛季制（第一赛季：汉魏风骨 -> 第二赛季：六朝烟雨）
 * 全链路端到端自动化测试套件
 */

const assert = require('assert');

// 1. 模拟微信小游戏环境与 Canvas 上下文
const noop = () => {};
const mockCanvasCalls = [];
const mockCtx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length : 0) * 12 });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => ({ addColorStop: noop });
    if (k === 'createPattern') return () => ({});
    if (k === 'roundRect' || k === 'fillRect' || k === 'strokeRect' || k === 'fillText') {
      return (...args) => {
        mockCanvasCalls.push({ method: k, args });
      };
    }
    if (t[k] !== undefined) return t[k];
    return noop;
  },
  set: (t, k, v) => { t[k] = v; return true; }
});

const canvasObj = {
  width: 750,
  height: 1334,
  getContext: () => mockCtx
};

global._storage = {};
global.wx = {
  getStorageSync: (k) => global._storage[k] || null,
  setStorageSync: (k, v) => { global._storage[k] = v; },
  removeStorageSync: (k) => { delete global._storage[k]; },
  getSystemInfoSync: () => ({ screenWidth: 375, screenHeight: 667, pixelRatio: 2, windowWidth: 375, windowHeight: 667 }),
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 667, pixelRatio: 2, safeArea: { top: 20, bottom: 647 } }),
  getMenuButtonBoundingClientRect: () => ({ top: 24, bottom: 56, left: 280, right: 365, width: 85, height: 32 }),
  onTouchStart: noop,
  onTouchMove: noop,
  onTouchEnd: noop,
  onTouchCancel: noop,
  onShow: noop,
  onHide: noop,
  onError: noop,
  onWindowResize: noop,
  triggerGC: noop,
  createCanvas: () => canvasObj,
  createOffscreenCanvas: () => canvasObj,
  createWebAudioContext: () => null
};

// 2. 加载游戏主模块
require('./wechat-minigame/game.js');
const {
  state,
  openSeasonSettlementModal,
  drawSeasonSettlementModal,
  getHistoricalRankTitle,
  checkAndTriggerHanWeiHistoricalEvent,
  settleTwoHundredYearSeason,
  evaluateClanNobleTier,
  CLAN_NOBLE_TIERS,
  SEASONS_REGISTRY,
  HAN_WEI_OFFICIAL_LADDERS,
  HAN_WEI_HISTORICAL_FIGURES,
  HAN_WEI_CRITICAL_CHRONO_EVENTS,
  HAN_WEI_RELICS_DATABASE,
  ensureClanProfileForCurrentRun,
  inscribePlayerToClanGenealogy,
  successionToNextGeneration
} = global;

console.log('================================================================================');
console.log('  华夏世家大系 · 200年历史纪元赛季制（汉魏风骨 -> 六朝烟雨）端到端集成测试');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// 测试一：赛季总控与汉魏历史风情配置完整性
// -----------------------------------------------------------------------------
console.log('>>> [测试 1：赛季总控配置与汉魏历史知识库校验]');
assert(Array.isArray(SEASONS_REGISTRY) && SEASONS_REGISTRY.length >= 2, 'SEASONS_REGISTRY 应至少包含S1与S2');
const s1 = SEASONS_REGISTRY[0];
const s2 = SEASONS_REGISTRY[1];
assert.strictEqual(s1.id, 'season_1_han_wei', '第一赛季ID应为 season_1_han_wei');
assert.strictEqual(s1.startYear, 100, 'S1 起始年应为 100');
assert.strictEqual(s1.endYear, 300, 'S1 终结年应为 300');
assert.strictEqual(s2.id, 'season_2_liu_chao', '第二赛季ID应为 season_2_liu_chao');
assert.strictEqual(s2.startYear, 300, 'S2 起始年应为 300');
console.log(`  ✅ 赛季序列校验通过：【${s1.name} (${s1.startYear}~${s1.endYear})】➔【${s2.name} (${s2.startYear}~${s2.endYear})】`);

assert(HAN_WEI_OFFICIAL_LADDERS && HAN_WEI_OFFICIAL_LADDERS.official, '汉魏官阶阶梯配置存在');
assert(HAN_WEI_OFFICIAL_LADDERS.official.length >= 8, '察举仕途官阶层级完备');
assert(HAN_WEI_HISTORICAL_FIGURES && HAN_WEI_HISTORICAL_FIGURES.length >= 5, '汉魏历史名宿配置存在');
assert(HAN_WEI_CRITICAL_CHRONO_EVENTS && HAN_WEI_CRITICAL_CHRONO_EVENTS.length >= 4, '汉魏四大历史关隘存在');
assert(HAN_WEI_RELICS_DATABASE && HAN_WEI_RELICS_DATABASE.length >= 4, '汉魏传世重宝库存在');
console.log(`  ✅ 汉魏风骨知识库校验通过：官制、${HAN_WEI_HISTORICAL_FIGURES.length}位名宿、${HAN_WEI_CRITICAL_CHRONO_EVENTS.length}大历史关隘、${HAN_WEI_RELICS_DATABASE.length}尊传世重宝`);

// -----------------------------------------------------------------------------
// 测试二：汉魏官职职称映射 (getHistoricalRankTitle)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 2：第一赛季汉魏官职与立业职称映射测试]');
// 公元150年（第一赛季范围内）
const titleOfficial0 = getHistoricalRankTitle('gov', 0, 150);
const titleOfficial3 = getHistoricalRankTitle('official', 3, 150);
const titleOfficial8 = getHistoricalRankTitle('official', 8, 150);
assert.strictEqual(titleOfficial0.title, '白衣门生');
assert.strictEqual(titleOfficial3.title, '察举孝廉/茂才');
assert.strictEqual(titleOfficial8.title, '尚书令/三公太傅');

const titleMilitary5 = getHistoricalRankTitle('military', 5, 200);
assert.strictEqual(titleMilitary5.title, '车骑将军/封邑开国侯');

const titleScholar5 = getHistoricalRankTitle('tech', 5, 180);
assert.strictEqual(titleScholar5.title, '文宗泰斗');

const titleMerchant5 = getHistoricalRankTitle('biz', 5, 220);
assert.strictEqual(titleMerchant5.title, '富埒王侯');

const titleRecluse4 = getHistoricalRankTitle('med', 4, 250);
assert.strictEqual(titleRecluse4.title, '悬壶神仙客');

// 公元2000年（超出第一赛季范围，应返回null回退现代职称）
const titleModern = getHistoricalRankTitle('gov', 3, 2000);
assert.strictEqual(titleModern, null, '现代年份应返回 null 回退现代职称');
console.log('  ✅ 汉魏官制晋升阶梯多轨道映射全部核验精准');

// -----------------------------------------------------------------------------
// 测试三：汉魏四大历史危机事件触发与宗族造化 (checkAndTriggerHanWeiHistoricalEvent)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 3：汉魏宏大历史关隘动态触发与宗门造化]');
state.activeModal = null;
state.age = 35;
state.year = 168; // 建宁党锢爆发
state.handledEvents = {};

// 初始化世家档案
const clanProfile = ensureClanProfileForCurrentRun();
clanProfile.clanTrust = {
  trustFundMoney: 50000,
  prestigeScore: 300,
  relics: [],
  mottoList: [{ text: '忠孝传家，清修慎独' }]
};

const triggered168 = checkAndTriggerHanWeiHistoricalEvent();
assert.strictEqual(triggered168, true, '公元168年应触发建宁党锢事件');
assert(state.activeModal === 'decision', '应弹出历史关隘决策弹窗');
assert(state.activeDecisionEvent && state.activeDecisionEvent.choices.length > 0, '应存在历史抉择分支');

// 执行第一项抉择（大开中门，将名士藏匿于后山夹壁地窖）
const opt1 = state.activeDecisionEvent.choices[0];
opt1.action();
console.log(`  ✅ 公元168年【建宁党锢】成功触发，抉择已生效，声望结转后为：${clanProfile.clanTrust.prestigeScore}`);
state.activeModal = null;

// 测试公元220年：九品中正
state.year = 220;
const triggered220 = checkAndTriggerHanWeiHistoricalEvent();
assert.strictEqual(triggered220, true, '公元220年应触发九品中正制度确立事件');
const opt220 = state.activeDecisionEvent.choices[0];
opt220.action();
console.log(`  ✅ 公元220年【九品中正】成功触发，宗门品阶与声望跃升！当前声望：${clanProfile.clanTrust.prestigeScore}`);
state.activeModal = null;

// -----------------------------------------------------------------------------
// 测试四：两百年跨代繁衍与宗谱建制
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 4：汉魏两百年跨代人臣建功与宗谱建制]');
// 模拟历代掌门入宗谱：
// 第一代：东汉孝廉 · 汉末名臣
state.name = '陈平之';
state.age = 72;
state.year = 172;
state.money = 120000;
state.track = 'gov';
state.rank = '尚书郎/县令';
inscribePlayerToClanGenealogy();

// 第二代：三国大将 · 护族统帅
state.name = '陈仲武';
state.age = 68;
state.year = 240;
state.money = 350000;
state.track = 'military';
state.rank = '持节偏将军/都尉';
clanProfile.clanTrust.prestigeScore = 1200; // 积聚高望
inscribePlayerToClanGenealogy();

// 第三代：西晋名宿 · 经学文宗
state.name = '陈玄度';
state.age = 80;
state.year = 300;
state.money = 800000;
state.track = 'study';
state.rank = '尚书令/三公太傅';
clanProfile.clanTrust.prestigeScore = 2650; // 晋升顶级门阀
inscribePlayerToClanGenealogy();

assert.strictEqual(clanProfile.genealogyList.length, 3, '宗谱应有3代先贤铭刻');
console.log(`  ✅ 两百年三代宗主功勋盖棺入谱完毕，族谱成员数：${clanProfile.genealogyList.length}`);

// -----------------------------------------------------------------------------
// 测试五：门阀品第评价考定 (evaluateClanNobleTier)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 5：九品门阀品第考定算法验证]');
const tierLow = evaluateClanNobleTier(50);
assert.strictEqual(tierLow.name, '寒微小姓');

const tierMid = evaluateClanNobleTier(450);
assert.strictEqual(tierMid.name, '郡中名士');

const tierHigh = evaluateClanNobleTier(1200);
assert.strictEqual(tierHigh.name, '郡望著姓');

const tierApex = evaluateClanNobleTier(2800);
assert.strictEqual(tierApex.name, '顶级阀阅');
assert.strictEqual(tierApex.tier, 4);
assert.strictEqual(tierApex.seasonInheritBonus.capitalRate, 0.80);
console.log('  ✅ 寒微、名士、郡望、顶级阀阅四大品第考定精准无误');

// -----------------------------------------------------------------------------
// 测试六：200年赛季大结卷计算引擎 (settleTwoHundredYearSeason)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 6：200年赛季大结卷与资产跨纪元传承结算]');
clanProfile.clanTrust.trustFundMoney = 1000000; // 宗族信托公积 100 万
clanProfile.clanTrust.prestigeScore = 2650;   // 达顶级阀阅

const settlementResult = settleTwoHundredYearSeason(clanProfile, 'season_1_han_wei');

assert(settlementResult, '结算包必须生成');
assert.strictEqual(settlementResult.sourceSeasonId, 'season_1_han_wei');
assert.strictEqual(settlementResult.nobleTier.name, '顶级阀阅');
assert.strictEqual(settlementResult.ancestorsCount, 3);
// 80% 资金结转
assert.strictEqual(settlementResult.carryOverTrustFund, 800000, '顶级阀阅应结转80%信托金(80万)');
assert.strictEqual(clanProfile.clanTrust.trustFundMoney, 800000, '家族信托资金池应更新为结转金');
assert.strictEqual(clanProfile.currentSeasonId, 'season_2_liu_chao', '赛季应自动推进至六朝烟雨');
assert(clanProfile.seasonHistory && clanProfile.seasonHistory.length === 1, '赛季历史荣誉库应沉淀此记录');
console.log('  ✅ 赛季结算大包生成无误：');
console.log(`    • 评定门阀：【${settlementResult.nobleTier.name}】`);
console.log(`    • 结转信托公积：¥${settlementResult.carryOverTrustFund.toLocaleString()}（折算率 80%）`);
console.log(`    • 传世重宝结转：${settlementResult.relicsInherited.length} 尊`);
console.log(`    • 成功跨入新纪元：【${settlementResult.targetSeasonIndex} ➔ ${clanProfile.currentSeasonId}】`);

// -----------------------------------------------------------------------------
// 测试七：赛季大结卷交互弹窗与 Canvas 渲染验证 (drawSeasonSettlementModal)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 7：赛季大结卷界面交互与 Canvas 渲染验证]');
openSeasonSettlementModal('season_1_han_wei');
assert.strictEqual(state.activeModal, 'season_settlement', 'activeModal 应切换为 season_settlement');

mockCanvasCalls.length = 0;
drawSeasonSettlementModal();
assert(mockCanvasCalls.length >= 10, 'Canvas 渲染应产生系列绘制调用');
console.log(`  ✅ 赛季大结卷弹窗 Canvas 渲染成功触发，执行了 ${mockCanvasCalls.length} 次图形绘制指令`);

console.log('\n================================================================================');
console.log('  🎉 华夏世家大系 · 200年历史纪元赛季制 7大核心链路 100% 全部通过！');
console.log('================================================================================');

process.exit(0);
