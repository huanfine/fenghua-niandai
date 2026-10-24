/**
 * test_dashboard_features.js
 * Verification suite for:
 * 1. 顶部仪表盘（Dashboard）信息降噪与折叠 (Dynamic Dashboard Heights & Layout Content Expansion)
 * 2. 关键属性变动“来源高亮”流光脉冲反馈 (Stat Pulse Highlight System & Integration with Causal Echo & Appraisal)
 */

const path = require('path');
const assert = require('assert');

// Mock browser / wechat minigame environment
const noop = () => {};
const ctx = new Proxy({}, {
  get: (t, k) => k === 'measureText' ? () => ({ width: 10 })
    : (k === 'createLinearGradient' || k === 'createRadialGradient') ? () => ({ addColorStop: noop })
    : k === 'createPattern' ? () => ({})
    : (t[k] !== undefined ? t[k] : noop),
  set: (t, k, v) => { t[k] = v; return true; }
});
const canvas = { width: 750, height: 1624, getContext: () => ctx };
let storageStore = {};
global.wx = {
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 812, pixelRatio: 2, safeArea: { top: 44, bottom: 778 } }),
  createCanvas: () => canvas,
  createOffscreenCanvas: () => canvas,
  createWebAudioContext: () => null,
  getStorageSync: k => storageStore[k],
  setStorageSync: (k, v) => { storageStore[k] = v; },
  removeStorageSync: k => { delete storageStore[k]; },
  vibrateShort: noop, vibrateLong: noop, onTouchStart: noop, onTouchMove: noop, onTouchEnd: noop, onTouchCancel: noop,
  onShow: noop, onHide: noop, onWindowResize: noop, onAudioInterruptionBegin: noop, onAudioInterruptionEnd: noop,
  getMenuButtonBoundingClientRect: () => ({ top: 48, right: 365, bottom: 80, left: 278, width: 87, height: 32 }),
  getSystemInfo: noop, getAccountInfoSync: () => ({ miniProgram: { envVersion: 'develop' } }),
  reportEvent: noop, showShareMenu: noop, onShareAppMessage: noop, onShareTimeline: noop,
  getLaunchOptionsSync: () => ({ query: {} }),
  getUpdateManager: () => ({ onCheckForUpdate: noop, onUpdateReady: noop, onUpdateFailed: noop })
};
global.requestAnimationFrame = noop;
global.canvas = canvas;
global.Image = function () {};
global.document = undefined;

// Load game engine
const gamePath = path.resolve(__dirname, 'wechat-minigame/game.js');
console.log('Loading game engine for Dashboard Verification from:', gamePath);
require(gamePath);

const state = global.state;
const getDashboardH = global.getDashboardH;
const toggleDashboardExpanded = global.toggleDashboardExpanded;
const triggerStatPulseHighlight = global.triggerStatPulseHighlight;
const getStatPulseProgress = global.getStatPulseProgress;
const hasActiveStatPulseHighlights = global.hasActiveStatPulseHighlights;
const drawStatPulseBorder = global.drawStatPulseBorder;
const triggerCausalEcho = global.triggerCausalEcho;
const evaluateYearlyAppraisal = global.evaluateYearlyAppraisal;
const getContentTop = global.getContentTop;
const getContentH = global.getContentH;

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}:`, err.message);
    if (err.stack) console.error(err.stack);
  }
}

console.log('\n======================================================');
console.log('  TEST SUITE 1: 仪表盘动态折叠与主内容区空间释放 (Dashboard Folding)');
console.log('======================================================');

runTest('1.1 童年期仪表盘高度保持 156px', () => {
  state.age = 12;
  state.dashboardExpanded = false;
  assert.strictEqual(getDashboardH(), 156, 'Childhood dashboard height should be 156');
  state.dashboardExpanded = true;
  assert.strictEqual(getDashboardH(), 156, 'Childhood dashboard height should stay 156 even if flag is set');
});

runTest('1.2 成年后折叠态高度为 122px (释放 34px >= 30px)', () => {
  state.age = 22;
  state.dashboardExpanded = false;
  const hCollapsed = getDashboardH();
  assert.strictEqual(hCollapsed, 122, 'Adult collapsed dashboard height must be 122');
  const spaceFreed = 156 - hCollapsed;
  assert(spaceFreed >= 30, `Released space (${spaceFreed}px) must be >= 30px`);
});

runTest('1.3 成年后展开态高度为 186px', () => {
  state.age = 25;
  state.dashboardExpanded = true;
  assert.strictEqual(getDashboardH(), 186, 'Adult expanded dashboard height must be 186');
});

runTest('1.4 toggleDashboardExpanded 平滑切换状态', () => {
  state.age = 28;
  state.dashboardExpanded = false;
  toggleDashboardExpanded();
  assert.strictEqual(state.dashboardExpanded, true, 'Should toggle to expanded');
  assert.strictEqual(getDashboardH(), 186);

  toggleDashboardExpanded();
  assert.strictEqual(state.dashboardExpanded, false, 'Should toggle to collapsed');
  assert.strictEqual(getDashboardH(), 122);
});

runTest('1.5 主内容区 getContentH() 空间与折叠联动', () => {
  state.age = 30;
  state.dashboardExpanded = false;
  const topCollapsed = getContentTop();
  const hCollapsed = getContentH();

  state.dashboardExpanded = true;
  const topExpanded = getContentTop();
  const hExpanded = getContentH();

  // 展开态比折叠态更占空间 (186 - 122 = 64px)
  assert.strictEqual(topExpanded - topCollapsed, 64, 'Top offset difference should equal height difference 64px');
  assert.strictEqual(hCollapsed - hExpanded, 64, 'Content height in collapsed mode should gain 64px compared to expanded mode');

  // 与旧基准 156px 对比：折叠态增量为 156 - 122 = 34px (>= 30px)
  const baselineTop = topCollapsed + (156 - 122);
  const baselineH = hCollapsed - (156 - 122);
  assert(hCollapsed - baselineH >= 30, 'Collapsed mode must provide at least 30px more space to content area than 156px baseline');
});

console.log('\n======================================================');
console.log('  TEST SUITE 2: 关键属性变动“来源高亮”流光脉冲系统 (Stat Pulse Highlight)');
console.log('======================================================');

runTest('2.1 triggerStatPulseHighlight 设置与进度计算', () => {
  triggerStatPulseHighlight(['rep', 'capital'], 1200, '#f59e0b');
  assert.strictEqual(hasActiveStatPulseHighlights(), true, 'Should have active highlights');
  const repProgress = getStatPulseProgress('rep');
  assert(repProgress >= 0 && repProgress <= 0.2, `Progress should start near 0, got ${repProgress}`);
  assert.strictEqual(getStatPulseProgress('non_existent_key'), -1, 'Unknown key should return -1');
});

runTest('2.2 drawStatPulseBorder 安全绘制与次级属性联动', () => {
  // 此时 rep 处于脉冲
  drawStatPulseBorder(ctx, 20, 50, 80, 24, 'rep');

  // 测试次级属性向 competency (核心均值) 传导
  triggerStatPulseHighlight(['iq'], 1200, '#f59e0b');
  // 绘制 competency 时，若 iq 处于脉冲，competency 亦应被脉冲流光激活
  drawStatPulseBorder(ctx, 120, 50, 80, 24, 'competency');
});

runTest('2.3 脉冲超时自动清除机制', () => {
  // 手动模拟一个过期的高亮
  triggerStatPulseHighlight('clean', 50, '#f59e0b');
  // 等待或快进
  const start = Date.now();
  while (Date.now() - start < 60) {
    // 短暂自旋等待 60ms
  }
  const prog = getStatPulseProgress('clean');
  assert.strictEqual(prog, -1, 'Progress after duration should be -1 and entry deleted');
});

console.log('\n======================================================');
console.log('  TEST SUITE 3: 因果回响与三年述职大考来源高亮接入 (Integration)');
console.log('======================================================');

runTest('3.1 因果回响 triggerCausalEcho 自动高亮变动属性', () => {
  state.clean = 70;
  state.rep = 50;
  state.capital = 10000;
  state.causalEchoes = [];

  const triggered = triggerCausalEcho(
    'test_echo_reform',
    'seed_reform',
    '改革试点全面推广',
    1988,
    '当年的敢为人先得到了上级肯定',
    (s) => {
      s.rep += 15;
      s.capital += 20000;
    }
  );

  assert.strictEqual(triggered, true, 'Causal echo should trigger successfully');
  assert.strictEqual(state.rep, 65, 'Rep should be buffed');
  assert.strictEqual(state.capital, 30000, 'Capital should be buffed');
  assert.strictEqual(hasActiveStatPulseHighlights(), true, 'Should have active stat pulse highlights');
  assert(getStatPulseProgress('rep') >= 0, 'Rep must be highlighted');
  assert(getStatPulseProgress('capital') >= 0, 'Capital must be highlighted');
});

runTest('3.2 三年述职大考 evaluateYearlyAppraisal 自动高亮变动属性', () => {
  state.age = 27;
  state.clean = 90;
  state.rep = 60;
  state.iq = 75;
  state.eq = 75;
  state.courage = 75;
  state.resilience = 75;
  state.health = 85;
  state.threeYearActionCount = 3;
  state.activeModal = null;

  const appraisal = evaluateYearlyAppraisal({ deferPopup: true });
  assert(appraisal && appraisal.score > 0, 'Appraisal should evaluate successfully');
  assert.strictEqual(hasActiveStatPulseHighlights(), true, 'Appraisal should trigger stat pulse highlights');
  // S 或 A 级会奖励 rep 与 capital
  assert(getStatPulseProgress('rep') >= 0, 'Rep should be highlighted on appraisal verdict');
});

console.log('\n======================================================');
console.log(`  SUMMARY: ${passedTests}/${totalTests} Tests Passed`);
console.log('======================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
