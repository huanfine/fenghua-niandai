/**
 * 华夏三千年世家 · 单局人生与宗祠大系双向闭环端到端验证脚本
 * 验证目标：
 * 1. 单局人生创角承袭世家姓氏、世系代数与祖荫信托启蒙金
 * 2. 单局人生结卷 (triggerEndgameModal) 真正实现墨印归宗，写入 genealogyList
 * 3. 产生动态考定谥号 (文肃公/通惠公/格致公等)、族产沉淀 (30%公积)、传世家训与宗族声望增益
 * 4. 宗族接棒 (successionToNextGeneration) 自动繁衍第 N+1 世子孙，承继祖荫信托金
 * 5. 跨两代连续生命周期模拟验证：两代先贤均在宗祠长卷中肃穆陈列，当代掌门接续家风
 */

const assert = require('assert');

// 模拟微信环境
const noop = () => {};
const mockCtx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length : 0) * 12 });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => ({ addColorStop: noop });
    if (k === 'createPattern') return () => ({});
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

console.log('================================================================================');
console.log('       华夏三千年世家 · 单局人生与宗祠大系双向闭环端到端验证测试');
console.log('================================================================================\n');

// 加载游戏主模块
require('./wechat-minigame/game.js');
const { state } = global;
const familySys = require('./wechat-minigame/src/data/familySystem.js');

// 步骤 1：确立华夏世家（河南·陈氏·颍川堂），完成汉末筑基第一代
console.log('>>> [步骤一：确立世家档案并建立初始宗祠]');
const initialProfile = familySys.createFamilyProfile('陈', '河南', '颍川堂', 'study_scholar');
initialProfile.clanTrust.trustFundMoney = 50000;
initialProfile.clanTrust.prestigeScore = 100;
global.saveClanProfile(initialProfile);
state.familyProfile = initialProfile;

assert.strictEqual(state.familyProfile.fullName, '河南·陈氏·颍川堂');
assert.strictEqual(state.familyProfile.surname, '陈');
console.log(`  ✅ 成功建立世家：【${state.familyProfile.fullName}】，初始族产信托：¥${state.familyProfile.clanTrust.trustFundMoney}，声望：${state.familyProfile.clanTrust.prestigeScore}分`);

// 步骤 2：第一世子孙入世创角
console.log('\n>>> [步骤二：第一局游戏创角 · 承袭世家姓氏与祖荫信托启蒙金]');
global.startCharacterCreation(false);

assert.strictEqual(state.birthProfile.surname, '陈', '身世姓氏必须锁定世家姓氏【陈】');
assert.strictEqual(state.dynasticGeneration, 1, '第一局人生为世家第 1 世');
assert.strictEqual(state.clanStarterGrant, 2500, '必须注入 5% 祖荫信托启蒙金 (2500)');
assert(state.capital >= 2500, '创角资财必须包含祖荫信托启蒙金');
console.log(`  ✅ 角色姓氏：${state.birthProfile.surname}，世系代数：第 ${state.dynasticGeneration} 世`);
console.log(`  ✅ 领受祖荫信托启蒙金 ¥${state.clanStarterGrant}，初始开局资金：¥${state.capital.toLocaleString()}`);

// 步骤 3：第一局人生履历推进与经世建功
console.log('\n>>> [步骤三：第一局人生履历推进与经世建功]');
state.name = '陈思敬';
state.age = 78;
state.year = 2024;
state.track = 'gov';
state.jobTitle = '省厅巡视员';
state.rankName = '正厅级巡视员';
state.capital = 650000;
state.rep = 92;

// 触发终局结算 (triggerEndgameModal)
global.triggerEndgameModal();

assert.strictEqual(state.activeModal, 'endgame', '必须激活终局结算模态');
assert(state.lastInscribedAncestor, '终局必须生成墨印归宗先祖记录');
assert.strictEqual(state.lastInscribedAncestor.fullName, '陈思敬');
assert.strictEqual(state.lastInscribedAncestor.posthumousTitle, '文肃公', '政界高声望S/A级应考定【文肃公】谥号');
assert.strictEqual(state.familyProfile.genealogyList.length, 1, '族谱长卷必须新增第 1 世先祖');

// 校验族产公积沉淀 (30% 注入宗族信托池)
const expectedBequest = Math.floor(650000 * 0.3);
const expectedTrust = 50000 + expectedBequest;
assert.strictEqual(state.familyProfile.clanTrust.trustFundMoney, expectedTrust, '族产信托池必须如实沉淀 30% 遗产');
assert(state.familyProfile.clanTrust.prestigeScore > 100, '宗族声望必须获得先祖功绩累加');
console.log(`  ✅ 第一局结卷墨印归宗成功！`);
console.log(`    • 载入族谱长卷：第 ${state.lastInscribedAncestor.generation} 世先贤【${state.lastInscribedAncestor.fullName}】`);
console.log(`    • 考定宗祠谥号：【${state.lastInscribedAncestor.posthumousTitle}】（享寿 ${state.age} 岁，${state.lastInscribedAncestor.officialTitle}）`);
console.log(`    • 族产公积沉淀：+¥${expectedBequest.toLocaleString()} 元 (宗族公积总池达 ¥${state.familyProfile.clanTrust.trustFundMoney.toLocaleString()})`);
console.log(`    • 宗族威望增进：现宗族总声望 ${state.familyProfile.clanTrust.prestigeScore} 分`);
console.log(`    • 传家家规墨印：“${state.lastInscribedAncestor.newMotto.text}”`);

// 步骤 4：宗族接棒 · 繁衍第二世子孙
console.log('\n>>> [步骤四：宗族接棒 · 续写家风至第 2 世]');
global.successionToNextGeneration();

assert.strictEqual(state.dynasticGeneration, 2, '第二局继承后代数必须自动跃迁为第 2 世');
assert.strictEqual(state.creation.surname, '陈', '第二世子孙姓氏必须为【陈】');
assert(state.dynasticInheritance.clanTrustGrant > 10000, '第二代必须从扩张后的宗族信托公积池中领受丰厚启蒙金');
console.log(`  ✅ 成功接棒开辟新世！`);
console.log(`    • 接棒宗主代数：第 ${state.dynasticGeneration} 世`);
console.log(`    • 继承宗族姓氏：【${state.creation.surname}】`);
console.log(`    • 承领祖荫公积启蒙金：¥${state.dynasticInheritance.clanTrustGrant.toLocaleString()}`);
console.log(`    • 承继总启动资产：¥${state.dynasticInheritance.capital.toLocaleString()}`);

// 步骤 5：第二世子孙经商兴家并在终局再次归宗
console.log('\n>>> [步骤五：第二世人生经商拓业 · 再次结卷入谱]');
state.name = '陈通海';
state.age = 82;
state.year = 2085;
state.track = 'biz';
state.jobTitle = '跨星系物流集团董事长';
state.rankName = '实业名宿';
state.capital = 3000000;
state.rep = 88;
state.endgameSettled = false; // 重置本局单局防重入标记

global.triggerEndgameModal();

assert.strictEqual(state.familyProfile.genealogyList.length, 2, '族谱长卷现在必须完整记录 2 代先祖');
const anc2 = state.familyProfile.genealogyList[1];
assert.strictEqual(anc2.fullName, '陈通海');
assert.strictEqual(anc2.generation, 2);
assert.strictEqual(anc2.posthumousTitle, '通惠公', '巨贾大商应考定【通惠公】谥号');
console.log(`  ✅ 第二局结卷墨印归宗成功！`);
console.log(`    • 载入族谱长卷：第 ${anc2.generation} 世先贤【${anc2.fullName}】`);
console.log(`    • 考定宗祠谥号：【${anc2.posthumousTitle}】（享寿 ${state.age} 岁）`);
console.log(`    • 宗族信托池最新总额：¥${state.familyProfile.clanTrust.trustFundMoney.toLocaleString()} 元`);
console.log(`    • 宗族总声望最新得分：${state.familyProfile.clanTrust.prestigeScore} 分`);

// 步骤 6：宗祠族谱长卷双向全景渲染与当代掌门对应测试
console.log('\n>>> [步骤六：宗祠世系图谱双向联动验证]');
const ancestors = state.familyProfile.genealogyList;
assert.strictEqual(ancestors[0].fullName, '陈思敬');
assert.strictEqual(ancestors[0].posthumousTitle, '文肃公');
assert.strictEqual(ancestors[1].fullName, '陈通海');
assert.strictEqual(ancestors[1].posthumousTitle, '通惠公');

console.log(`  ✅ 宗祠百代族谱长卷陈列核验无误：`);
ancestors.forEach((anc) => {
  console.log(`    🌲 第 ${anc.generation} 世 ·【${anc.eraName}】${anc.fullName} · 谥【${anc.posthumousTitle}】· ${anc.officialTitle}`);
});

console.log('\n================================================================================');
console.log('   🎉 单局人生与宗祠大系双向闭环 100% 全部通过！彻底告别割裂！');
console.log('================================================================================');

process.exit(0);
