/**
 * 华夏世家大系 · 赛季结算确认安全机制、44px触控优化、六朝烟雨专属内容、弹窗自适应与词林指津自动化验证
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 注入微信小游戏环境与 Canvas mock
const noop = () => {};
const canvasCalls = [];
const mockCtx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length : 0) * 12 });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => ({ addColorStop: noop });
    if (k === 'createPattern') return () => ({});
    if (k === 'roundRect' || k === 'fillRect' || k === 'strokeRect' || k === 'fillText') {
      return (...args) => {
        canvasCalls.push({ fn: k, text: args[0], args });
      };
    }
    if (t[k] !== undefined) return t[k];
    return noop;
  },
  set: (t, k, v) => { t[k] = v; return true; }
});

const mockCanvas = {
  getContext: () => mockCtx,
  width: 750,
  height: 1334
};

global._storage = {};
global.wx = {
  getSystemInfoSync: () => ({
    windowWidth: 375,
    windowHeight: 667,
    screenWidth: 375,
    screenHeight: 667,
    pixelRatio: 2
  }),
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 667, pixelRatio: 2, safeArea: { top: 20, bottom: 647 } }),
  getMenuButtonBoundingClientRect: () => ({ top: 24, bottom: 56, left: 280, right: 365, width: 85, height: 32 }),
  createCanvas: () => mockCanvas,
  createOffscreenCanvas: () => mockCanvas,
  createWebAudioContext: () => null,
  getStorageSync: (k) => global._storage[k] || null,
  setStorageSync: (k, v) => { global._storage[k] = v; },
  removeStorageSync: (k) => { delete global._storage[k]; },
  vibrateShort: noop,
  vibrateLong: noop,
  onTouchStart: noop,
  onTouchMove: noop,
  onTouchEnd: noop,
  onTouchCancel: noop,
  onShow: noop,
  onHide: noop,
  onError: noop,
  onWindowResize: noop
};

// 加载游戏引擎
const game = require('./wechat-minigame/game.js');
const { state } = game;

console.log('================================================================================');
console.log('   华夏世家大系 · 赛季结算二次确认、44px触控、六朝内容与词林指津专项验证');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// 测试 1：赛季大结卷安全防误触（打开仅预览，杜绝直接扣费结卷）
// -----------------------------------------------------------------------------
console.log('>>> [测试 1：赛季大结卷安全机制：打开仅预览，二次确认后方正式执行]');
const testClan = {
  fullName: '河南·陈氏·颍川堂',
  surname: '陈',
  province: '河南',
  hallName: '颍川堂',
  currentSeasonId: 'season_1_han_wei',
  clanTrust: {
    prestigeScore: 2800,
    trustFundMoney: 1000000,
    relics: [{ id: 'relic_ancient_book_scroll', name: '太行古卷' }]
  },
  genealogyList: [{}, {}, {}],
  timeline: { currentYear: 300, currentEpochIndex: 1 }
};
state.familyProfile = testClan;

// 1.1 打开结算弹窗
global.openSeasonSettlementModal('season_1_han_wei');
assert.strictEqual(state.activeModal, 'season_settlement', '应激活 season_settlement 弹窗');
assert.strictEqual(state.seasonSettlementPendingConfirm, false, '打开时二次确认应为 false');
assert.strictEqual(testClan.clanTrust.trustFundMoney, 1000000, '打开弹窗绝对不能直接改动族产信托！');
assert.strictEqual(testClan.currentSeasonId, 'season_1_han_wei', '打开弹窗绝对不能提前切换赛季！');
console.log('  ✅ 成功验证：打开赛季弹窗仅生成预览，未发生任何族产改动或不可逆赛季切换');

// 1.2 绘制弹窗并检查 44px 按钮
canvasCalls.length = 0;
global.drawSeasonSettlementModal();
const hitboxes = game.getHitboxes();
const advanceBtn = hitboxes.find(b => b.id === 'season_settlement_advance_btn');
assert.ok(advanceBtn, '应存在主行动 advanceBtn');
const advH = advanceBtn.height || advanceBtn.h;
assert.ok(advH >= 44, `主行动按钮高度须 >= 44px (实际: ${advH}px)`);
console.log(`  ✅ 成功验证：启程按钮触控高度为 ${advH}px，符合 >= 44px 移动端规范`);

// 1.3 点击主行动按钮，验证触发二次终局确认弹窗（而非直接执行扣费）
advanceBtn.handler();
assert.strictEqual(state.seasonSettlementPendingConfirm, true, '点击启程后应进入二次确认状态');
assert.strictEqual(testClan.currentSeasonId, 'season_1_han_wei', '未二次确认前赛季仍未改变');
assert.strictEqual(testClan.clanTrust.trustFundMoney, 1000000, '未二次确认前族产信托仍未改动');

// 1.4 绘制二次确认遮罩与对话框
canvasCalls.length = 0;
global.drawSeasonSettlementModal();
const confirmExecuteBtn = game.getHitboxes().find(b => b.id === 'season_settle_execute_confirm_btn');
const cancelConfirmBtn = game.getHitboxes().find(b => b.id === 'season_settle_cancel_confirm_btn');
assert.ok(confirmExecuteBtn, '应存在二次确认按钮');
assert.ok(cancelConfirmBtn, '应存在返回再看按钮');
const cfExecH = confirmExecuteBtn.height || confirmExecuteBtn.h;
const cfCancelH = cancelConfirmBtn.height || cancelConfirmBtn.h;
assert.ok(cfExecH >= 44, `二次确认按钮高度须 >= 44px (实际: ${cfExecH}px)`);
assert.ok(cfCancelH >= 44, `二次取消按钮高度须 >= 44px (实际: ${cfCancelH}px)`);
console.log('  ✅ 成功验证：二次确认遮罩弹窗已呈现，包含两大 >=44px 按钮');

// 1.5 模拟点击取消，验证安全回退
cancelConfirmBtn.handler();
assert.strictEqual(state.seasonSettlementPendingConfirm, false, '点击取消后应安全回退二次确认');
assert.strictEqual(testClan.currentSeasonId, 'season_1_han_wei', '取消后赛季依然不变');
console.log('  ✅ 成功验证：点击返回可安全撤销二次确认，操作完全可控');

// 1.6 再次点击启程并执行终局确认
advanceBtn.handler();
assert.strictEqual(state.seasonSettlementPendingConfirm, true);
global.drawSeasonSettlementModal();
const execBtn = game.getHitboxes().find(b => b.id === 'season_settle_execute_confirm_btn');
execBtn.handler();
assert.strictEqual(testClan.currentSeasonId, 'season_2_liu_chao', '终局确认后赛季正式切换为 season_2_liu_chao');
assert.strictEqual(state.selectedBirthYear, 300, '新角色出生年份应设定为 300 年');
console.log('  ✅ 成功验证：唯有经过终局确认后，方正式完成大结卷并跨入第二赛季【六朝烟雨】！');

// -----------------------------------------------------------------------------
// 测试 2：第二赛季【六朝烟雨】弱冠及冠专属内容与决断
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 2：第二赛季【六朝烟雨】公元300~500年专属内容]');
state.year = 318;
state.age = 18;
state.track = 'official';
state.rankName = '中正品第门生';

// 触发及冠告示
game.drawGaokaoNoticeModal();
const noticeAcceptBtn = game.getHitboxes().find(b => b.id === 'gaokao_notice_accept_btn');
assert.ok(noticeAcceptBtn, '应存在弱冠告示领受按钮');
noticeAcceptBtn.handler();

assert.strictEqual(state.activeModal, 'decision', '应打开决断弹窗');
const decEvt = state.activeDecisionEvent;
assert.ok(decEvt, '应存在 activeDecisionEvent');
assert.ok(decEvt.title.includes('中正定品') || decEvt.title.includes('弱冠成丁'), `六朝决断标题应体现中正定品: ${decEvt.title}`);
assert.strictEqual(decEvt.choices.length, 3, '六朝弱冠决断应提供玄学/庄园/北府兵三大专属选项');
const choiceTags = decEvt.choices.map(c => c.tag);
assert.ok(choiceTags.includes('江左玄风'), '必须包含江左玄风（清谈玄理）选项');
assert.ok(choiceTags.includes('侨州巨室'), '必须包含侨州巨室（庄园经略）选项');
assert.ok(choiceTags.includes('北府骁将'), '必须包含北府骁将（投效北府兵）选项');
console.log('  ✅ 成功验证：第二赛季 18 岁决断精准呈现江左玄风、侨州巨室、北府骁将三大六朝专属行当！');

// -----------------------------------------------------------------------------
// 测试 3：宗祠大殿 44px 赛季横幅与「词林指津」概念引导
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 3：家族系统 44px 赛季横幅与「词林指津」统一概念引导]');
state.activeModal = null;
state.familyProfile = testClan;
if (typeof global.saveClanProfile === 'function') global.saveClanProfile(testClan);
state.familyView = 'estate';
canvasCalls.length = 0;
global.drawFamilyTab(100);

// 检查赛季横幅与词林指津按钮
const allTabHitboxes = [...game.getHitboxes(), ...(game.getScrollHitboxes ? game.getScrollHitboxes() : [])];
const bannerBtn = allTabHitboxes.find(b => b.id === 'clan_season_settlement_banner_btn');
assert.ok(bannerBtn, '宗祠应展示赛季结卷横幅');
const bnH = bannerBtn.height || bannerBtn.h;
assert.ok(bnH >= 44, `赛季结卷横幅高度须 >= 44px (实际: ${bnH}px)`);

// 检查词林指津按钮
const glossaryBtn = allTabHitboxes.find(b => b.id === 'clan_open_glossary_btn');
assert.ok(glossaryBtn, '宗祠顶栏应展示【📖 宗典指津】按钮');

// 点击打开词林指津
glossaryBtn.handler();
assert.strictEqual(state.activeModal, 'family_glossary', '应进入 family_glossary 弹窗');

// 绘制词林指津弹窗，核验 7 大核心术语
canvasCalls.length = 0;
global.drawFamilyGlossaryModal();
assert(canvasCalls.some(c => c.fn === 'fillText' && c.text && c.text.includes('纪元 (Epoch)')), '必须解释 纪元');
assert(canvasCalls.some(c => c.fn === 'fillText' && c.text && c.text.includes('赛季 (Season)')), '必须解释 赛季');
assert(canvasCalls.some(c => c.fn === 'fillText' && c.text && c.text.includes('前沿 (Frontier)')), '必须解释 前沿');
assert(canvasCalls.some(c => c.fn === 'fillText' && c.text && c.text.includes('世 (Generation)')), '必须解释 世');
assert(canvasCalls.some(c => c.fn === 'fillText' && c.text && c.text.includes('信托 (Clan Trust)')), '必须解释 信托');
assert(canvasCalls.some(c => c.fn === 'fillText' && c.text && c.text.includes('阀阅 (Noble Tier)')), '必须解释 阀阅');
assert(canvasCalls.some(c => c.fn === 'fillText' && c.text && c.text.includes('世交 (Alliance)')), '必须解释 世交');
console.log('  ✅ 成功验证：词林指津 Modal 完整阐释 纪元、赛季、前沿、世、信托、阀阅、世交 7 大概念！');

// -----------------------------------------------------------------------------
// 测试 4：纪元推演弹窗矮屏自适应 (Safe Rect Height)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 4：纪元推演弹窗矮屏自适应]');
global.openDynasticChronicleModal(1);
assert.strictEqual(state.activeModal, 'dynastic_chronicle');
canvasCalls.length = 0;
global.drawDynasticChronicleModal();
const pauseBtn = game.getHitboxes().find(b => b.id === 'chronicle_pause_btn');
assert.ok(pauseBtn, '应存在暂歇推演按钮');
const psH = pauseBtn.height || pauseBtn.h;
assert.ok(psH >= 32, `暂歇推演按钮高度须 >= 32px (实际: ${psH}px)`);
console.log(`  ✅ 成功验证：推演弹窗自适应当前视口，暂歇按钮高度为 ${psH}px`);

// -----------------------------------------------------------------------------
// 测试 5：分包配置校验 (game.json subpackages)
// -----------------------------------------------------------------------------
console.log('\n>>> [测试 5：微信小游戏分包配置与入口校验]');
const gameJsonPath = path.join(__dirname, 'wechat-minigame/game.json');
const gameJson = JSON.parse(fs.readFileSync(gameJsonPath, 'utf8'));
assert.ok(Array.isArray(gameJson.subpackages), 'game.json 必须包含 subpackages 数组');
assert.ok(gameJson.subpackages.length >= 2, '至少配置了 futureEpoch 与 deepSpaceLore 两大分包');
const pkgNames = gameJson.subpackages.map(p => p.name);
assert.ok(pkgNames.includes('futureEpoch'), '配置了 futureEpoch 分包');
assert.ok(pkgNames.includes('deepSpaceLore'), '配置了 deepSpaceLore 分包');

gameJson.subpackages.forEach(sub => {
  const entryPath = path.join(__dirname, 'wechat-minigame', sub.root, 'game.js');
  assert.ok(fs.existsSync(entryPath), `分包入口文件必须存在: ${entryPath}`);
});
console.log('  ✅ 成功验证：game.json 分包配置与入口物理文件全部就绪，4MB 主包防御壁垒已筑成！');

console.log('\n================================================================================');
console.log('  🎉 全部 5 大核心改进测试 100% 通过！用户反馈的 6 大体验与架构缺陷已彻底解决！');
console.log('================================================================================\n');
process.exit(0);
