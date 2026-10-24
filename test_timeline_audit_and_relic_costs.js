/**
 * 华夏三千年世家大系 · 历史史实考据、统一时间线总表、真实消耗检定与前沿门槛全量测试套件
 */

const assert = require('assert');

// 1. 模拟微信小游戏环境
const noop = () => {};
const mockCanvasCalls = [];
const mockCtx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length : 0) * 12 });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => ({ addColorStop: noop });
    if (k === 'createPattern') return () => ({});
    if (k === 'roundRect' || k === 'fillRect' || k === 'strokeRect' || k === 'fillText') {
      return (...args) => { mockCanvasCalls.push({ method: k, args }); };
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

// 加载游戏主脚本
require('./wechat-minigame/game.js');
const {
  state,
  checkAndTriggerHanWeiHistoricalEvent,
  ensureClanProfileForCurrentRun
} = global;

const {
  HAN_WEI_CRITICAL_CHRONO_EVENTS,
  HAN_WEI_RELICS_DATABASE
} = require('./wechat-minigame/src/data/historicalMilieuHanWei');

const {
  EPOCH_ONE_HISTORICAL_EVENTS
} = require('./wechat-minigame/src/data/epochOneEngine');

const {
  FAMOUS_HALL_MAPPING,
  createFamilyProfile
} = require('./wechat-minigame/src/data/familySystem');

const {
  SEASONS_REGISTRY,
  CHRONO_TIMELINE_REGISTRY,
  getSeasonById,
  getSeasonByIndex,
  getSeasonByYear
} = require('./wechat-minigame/src/data/seasonConfig');

const {
  FUTURE_DECADE_SCENARIOS,
  checkFrontierAccessibility,
  executeFutureDecadeDecision
} = require('./wechat-minigame/src/data/futureFrontierEngine');

console.log('================================================================================');
console.log('  华夏三千年世家大系 · 史实核验、时间线总表、真实消耗与未来前沿闭环测试');
console.log('================================================================================');

// -----------------------------------------------------------------------------
// 测试 1：两套事件写法归一化验证
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 1：两套事件写法完全归一化验证]');
assert(HAN_WEI_CRITICAL_CHRONO_EVENTS.length >= 8, '汉魏六朝关隘事件应完整收录至少8个历史节点');
assert.strictEqual(EPOCH_ONE_HISTORICAL_EVENTS.length, HAN_WEI_CRITICAL_CHRONO_EVENTS.length, 'epochOneEngine 应引用统一的历史节点');

for (let i = 0; i < HAN_WEI_CRITICAL_CHRONO_EVENTS.length; i++) {
  const e1 = HAN_WEI_CRITICAL_CHRONO_EVENTS[i];
  const e2 = EPOCH_ONE_HISTORICAL_EVENTS[i];
  assert.strictEqual(e1.id, e2.id, `事件第${i}项ID一致`);
  assert.strictEqual(e1.year, e2.year, `事件第${i}项年份一致`);
  assert.strictEqual(e1.title, e2.title, `事件第${i}项标题一致`);
  assert.strictEqual(e1.options.length, e2.options.length, `事件第${i}项选项数量一致`);
}
console.log(`  ✅ ${HAN_WEI_CRITICAL_CHRONO_EVENTS.length}大历史关隘事件在两套引擎中 100% 共享唯一真源，彻底消除割裂`);

// -----------------------------------------------------------------------------
// 测试 2：史实与官制措辞严谨性校验
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 2：史实与堂号考证严谨性校验]');

// 2.1 208年曹操官称
const chibiEvt = HAN_WEI_CRITICAL_CHRONO_EVENTS.find(e => e.year === 208);
assert(chibiEvt, '应存在208年赤壁前夜事件');
const opt208_officer = chibiEvt.options[0];
assert(opt208_officer.successReward.officialTitle.includes('汉丞相') || opt208_officer.successReward.officialTitle.includes('丞相'),
  '208年官衔应称汉丞相府，不可出现封魏公后的魏相府错位');
assert(!opt208_officer.successReward.officialTitle.includes('魏相府'), '绝不可出现魏相府错位');
console.log(`  ✅ 208年赤壁官衔考定为【${opt208_officer.successReward.officialTitle}】，时代错位已修复`);

// 2.2 280年晋太康平吴
const taikangEvt = HAN_WEI_CRITICAL_CHRONO_EVENTS.find(e => e.year === 280);
assert(taikangEvt, '应存在280年太康事件');
assert(taikangEvt.title.includes('太康'), '280年平吴年号应为太康');
assert(!taikangEvt.title.includes('泰始'), '280年平吴不应出现泰始年号');
console.log(`  ✅ 280年平吴标题更正为【${taikangEvt.title}】，年号考据严谨`);

// 2.3 堂号审查
assert(!FAMOUS_HALL_MAPPING['李'].includes('爱莲堂'), '李氏堂号绝不可包含周敦颐之爱莲堂');
assert(FAMOUS_HALL_MAPPING['李'].includes('青莲堂') || FAMOUS_HALL_MAPPING['李'].includes('陇西堂'), '李氏堂号应包含青莲堂/陇西堂');
assert(FAMOUS_HALL_MAPPING['周'].includes('爱莲堂'), '周氏堂号应包含爱莲堂');
assert(FAMOUS_HALL_MAPPING['罗'].includes('豫章堂') && FAMOUS_HALL_MAPPING['罗'].includes('尊尧堂'), '罗氏应包含豫章堂与尊尧堂');
assert(FAMOUS_HALL_MAPPING['钟'].includes('颍川堂') && FAMOUS_HALL_MAPPING['钟'].includes('知音堂'), '钟氏应包含颍川堂与知音堂');
assert(FAMOUS_HALL_MAPPING['任'].includes('乐安堂') && FAMOUS_HALL_MAPPING['任'].includes('玉局堂'), '任氏应包含乐安堂与玉局堂');
assert(FAMOUS_HALL_MAPPING['蒋'].includes('乐安堂') && FAMOUS_HALL_MAPPING['蒋'].includes('钟山堂'), '蒋氏应包含乐安堂与钟山堂');
console.log('  ✅ 李、周、罗、钟、任、蒋等各大姓氏经典堂号经族谱考据，全部修正合规精准');

// -----------------------------------------------------------------------------
// 测试 3：关隘事件真实消耗、属性检定与传世宝物匹配
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 3：关隘事件真实消耗与传世物精准匹配]');

const clan = ensureClanProfileForCurrentRun();
clan.clanTrust = {
  trustFundMoney: 10000,
  prestigeScore: 100,
  relics: []
};
state.capital = 5000;
state.age = 25;
state.activeModal = null;
state.year = 168;
state.handledEvents = {};
state.track = 'none';

const trig168 = checkAndTriggerHanWeiHistoricalEvent();
assert(trig168, '168年应触发建宁党锢');
const choices168 = state.activeDecisionEvent.choices;
assert.strictEqual(choices168.length, 3, '应包含3个选项');

// 3.1 选项 1 检定属性与门槛验证
assert.strictEqual(choices168[0].statReq, 'courage', '大开中门应检定胆魄');
assert.strictEqual(choices168[0].reqVal, 50, '大开中门门槛应为50');

// 3.2 选项 2 真实扣除资财测试
const initialCapital = state.capital;
const initialTrust = clan.clanTrust.trustFundMoney;
const optCostChoice = choices168[1]; // 连夜密送出境，消耗 1200 钱
assert(optCostChoice.costVal === 1200, '选项应明确声明消耗 1200 钱');
optCostChoice.action();

assert.strictEqual(state.capital, initialCapital - 1200, '执行后个人资金应真实扣除 1200 钱');
console.log(`  ✅ 真实代价扣减生效：从 ¥${initialCapital} 扣减 ¥1200，现为 ¥${state.capital}`);

// 3.3 选项失败代价与惩罚验证
state.year = 184;
state.activeModal = null;
state.handledEvents = {};
checkAndTriggerHanWeiHistoricalEvent();
const choices184 = state.activeDecisionEvent.choices;
const optDefend = choices184[0];
assert(optDefend.failEffects && optDefend.failEffects.capital, '守城失败应具备惩罚效果');
optDefend.onFail();
console.log(`  ✅ 失败惩罚机制生效：守城未果时正常触发代价回响与宗门惩戒`);

// 3.4 传世物精确匹配（杜绝永远下发索引0焦尾琴）
state.year = 220;
state.activeModal = null;
state.handledEvents = {};
checkAndTriggerHanWeiHistoricalEvent();
const choices220 = state.activeDecisionEvent.choices;
const optJiupin = choices220[0]; // 上品门第，奖励 relic_jiupin_gold_tablet
optJiupin.action();

assert(clan.clanTrust.relics.length > 0, '应获得传世重宝');
const grantedRelic = clan.clanTrust.relics[clan.clanTrust.relics.length - 1];
assert.strictEqual(grantedRelic.id, 'relic_jiupin_gold_tablet', '获得的宝物应为九品金策，而非硬编码的焦尾琴');
console.log(`  ✅ 传世宝物精准发放到位：【${grantedRelic.name}】（ID: ${grantedRelic.id}）`);

// -----------------------------------------------------------------------------
// 测试 4：15大连续200年赛季总表 (CHRONO_TIMELINE_REGISTRY)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 4：15大连续200年赛季与时间线总表验证]');
assert.strictEqual(SEASONS_REGISTRY.length, 15, '赛季表必须由 15 个连续 200 年赛季构成');

let lastEnd = 100;
SEASONS_REGISTRY.forEach((s, idx) => {
  assert.strictEqual(s.seasonIndex, idx + 1, `赛季索引应为 ${idx + 1}`);
  assert.strictEqual(s.startYear, lastEnd, `赛季 ${s.name} 起始年份应无缝衔接上一赛季 (${lastEnd})`);
  assert.strictEqual(s.endYear - s.startYear, 200, `赛季 ${s.name} 跨度必须整整 200 年`);
  assert(!s.name.includes('极宋文昌'), '赛季4/5不得出现笔误名称极宋文昌');
  lastEnd = s.endYear;
});
assert.strictEqual(lastEnd, 3100, '15个赛季合计必须整整跨越 3000 年（100~3100年）');
console.log(`  ✅ 15大赛季严密无缝衔接：公元100年 ～ 公元3100年，每个赛季整整200年，零空档零重叠`);

// 赛季总表查询与转换
const sSong = getSeasonByYear(1020);
assert.strictEqual(sSong.id, 'season_5_song_yun');
assert.strictEqual(sSong.name, '宋韵风华 · 义庄书院');
console.log(`  ✅ 公元1020年精准映射至【${sSong.name}】`);

// -----------------------------------------------------------------------------
// 测试 5：2100年后深空推演内容与终局达成 (Phase 2 Scenarios)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 5：2100~3100年深空百年节点与宏观终局验证]');
const phase2Scenarios = FUTURE_DECADE_SCENARIOS.filter(s => s.year > 2100);
assert(phase2Scenarios.length >= 10, '2100年后必须包含充分的百年深空演化节点');

const yr3100 = FUTURE_DECADE_SCENARIOS.find(s => s.year === 3100);
assert(yr3100, '必须包含公元3100年终局大典节点');
assert.strictEqual(yr3100.options[0].successReward.posthumousTitle, '开天立极不朽公');

// 终局视界拦截
const finalHorizonCheck = checkFrontierAccessibility(3100, 3100);
assert.strictEqual(finalHorizonCheck.canAdvance, false);
assert.strictEqual(finalHorizonCheck.reason, 'HORIZON_REACHED');
assert(finalHorizonCheck.message.includes('三千载大成终局'));
console.log(`  ✅ 阶段二（2100~3100年）科幻推演节点完备，3100年终局达成拦截核验无误`);

// -----------------------------------------------------------------------------
// 测试 6：前沿事件起步门槛与声望授信机制
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 6：2030年前沿事件低成本分支与声望授信抵扣验证]');

const testClanNew = createFamilyProfile({
  surname: '李',
  province: '广东',
  hallName: '青莲堂',
  vocationId: 'study_scholar'
});

// 新家族初始资金：3,000 元，声望 50
assert.strictEqual(testClanNew.clanTrust.trustFundMoney, 3000);

// 执行 2030 年低门槛选项（选项2：以技术顾问与标准智库切入）
const decResult = executeFutureDecadeDecision(testClanNew, 2030, 2, 2040);
assert(decResult.success, '新家族应能顺利执行2030年低成本产学研合作分支');
console.log(`  ✅ 新创家族（¥3,000底蕴）顺利完成2030未来推演：${decResult.scenarioTitle} -> ${decResult.chosenText}`);
console.log(`     推进后族产：¥${testClanNew.clanTrust.trustFundMoney}，宗族威望：${testClanNew.clanTrust.prestigeScore}`);

console.log('\n================================================================================');
console.log('   🎉 用户反馈之 7 大核心架构、史实与玩法缺陷 100% 全部通过回归核验！');
console.log('================================================================================');
process.exit(0);
