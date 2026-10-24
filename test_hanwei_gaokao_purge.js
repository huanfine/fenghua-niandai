/**
 * 华夏世家大系 · 第一赛季汉魏风骨（公元100~300年）
 * 彻底净化高考/现代工业文本专用自动化验证套件
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
  createCanvas: () => canvasObj,
  createInnerAudioContext: () => ({ play: noop, stop: noop, pause: noop, destroy: noop, onEnded: noop, onError: noop }),
  vibrateShort: noop,
  vibrateLong: noop,
  getPerformance: () => ({ now: () => Date.now() }),
  triggerGC: noop,
  setPreferredFramesPerSecond: noop
};

global.canvas = canvasObj;

// 加载游戏主模块
const game = require('./wechat-minigame/game.js');
const state = game.state;

console.log('================================================================================');
console.log('  华夏世家大系 · 汉魏风骨（公元100~300年）彻底净化高考/现代工业文本验证');
console.log('================================================================================\n');

// 步骤 1：汉魏创角与初始状态检查
console.log('>>> [测试 1：汉魏公元100年创角重置与初始轨道]');
game.resetUserGameData();
assert.strictEqual(state.year, 100, `重置年份应为 100，实际: ${state.year}`);
assert.strictEqual(state.track, 'official', `汉魏默认轨道应为 official，实际: ${state.track}`);
assert.strictEqual(state.youthPath, 'scholar', `汉魏默认求学路径应为 scholar，实际: ${state.youthPath}`);
assert.strictEqual(state.strategicPillar, 'classics', `汉魏默认战略支柱应为 classics，实际: ${state.strategicPillar}`);
console.log('  ✅ 汉魏创角重置状态验证通过：track=official, youthPath=scholar, strategicPillar=classics\n');

// 步骤 2：童年里程碑（0~17岁）文案检查
console.log('>>> [测试 2：汉魏童年里程碑（0~17岁）文案无高考/现代污染]');
for (let age = 0; age <= 17; age++) {
  state.age = age;
  const milestone = game.getNextMilestoneInfo();
  assert.ok(milestone, `Age ${age} should have milestone info`);
  assert.ok(!milestone.title.includes('高考'), `Age ${age} milestone title contains 高考: ${milestone.title}`);
  assert.ok(!milestone.subTitle.includes('高考'), `Age ${age} milestone subTitle contains 高考: ${milestone.subTitle}`);
  assert.ok(!milestone.title.includes('大学'), `Age ${age} milestone title contains 大学: ${milestone.title}`);
  assert.ok(!milestone.subTitle.includes('大学'), `Age ${age} milestone subTitle contains 大学: ${milestone.subTitle}`);
  assert.ok(!milestone.title.includes('中专'), `Age ${age} milestone title contains 中专: ${milestone.title}`);
  assert.ok(!milestone.title.includes('进厂'), `Age ${age} milestone title contains 进厂: ${milestone.title}`);
}
console.log('  ✅ 0~17岁全年龄段里程碑文案纯净，无任何现代高考/进厂/大学字符！\n');

// 步骤 3：跳过童年直达及冠检查
console.log('>>> [测试 3：跳过童年直达及冠]');
state.age = 1;
state.birthYear = 100;
state.year = 101;
state.zhuazhouItem = 'wood_scroll';
game.skipChildhoodToAdulthood();
assert.strictEqual(state.age, 18, '跳过童年应到达 18 岁');
assert.strictEqual(state.lifeStage, 'adult', '跳过童年后人生阶段应为 adult');
assert.strictEqual(state.youthPath, 'scholar', '汉魏跳过童年后 youthPath 应保持 scholar');
assert.ok(state.activeModal === 'adult_ceremony_notice', `activeModal should be adult_ceremony_notice, got ${state.activeModal}`);
assert.ok(!state.noticeTitle.includes('高考'), `noticeTitle contains 高考: ${state.noticeTitle}`);
assert.ok(!state.noticeSubtitle.includes('高考'), `noticeSubtitle contains 高考: ${state.noticeSubtitle}`);
assert.ok(state.noticeTitle.includes('察 举') || state.noticeTitle.includes('试 策'), `noticeTitle should be Han-Wei: ${state.noticeTitle}`);
console.log(`  ✅ 成功触发弱冠及冠告示：${state.noticeTitle}（${state.noticeSubtitle}）\n`);

// 步骤 4：点击领受弱冠辟召告示按钮检查
console.log('>>> [测试 4：点击领受弱冠辟召，验证决断弹窗绝无高考]');
// 获取 gaokao_notice_accept_btn
game.drawGaokaoNoticeModal();
const acceptBtn = game.getHitboxes().find(b => b.id === 'gaokao_notice_accept_btn');
assert.ok(acceptBtn, 'Should have gaokao_notice_accept_btn');
// 点击领受
acceptBtn.handler();
assert.ok(state.activeModal === 'decision', 'Should open decision modal');
const decEvt = state.activeDecisionEvent;
assert.ok(decEvt, 'Should have activeDecisionEvent');
assert.strictEqual(decEvt.id, 'crucible_hanwei_adulthood', `Decision event ID should be crucible_hanwei_adulthood, got: ${decEvt.id}`);
assert.ok(!decEvt.title.includes('高考'), `Decision title contains 高考: ${decEvt.title}`);
assert.ok(!decEvt.desc.includes('高考'), `Decision desc contains 高考: ${decEvt.desc}`);
assert.ok(!decEvt.desc.includes('分数'), `Decision desc contains 分数: ${decEvt.desc}`);
assert.ok(decEvt.title.includes('弱冠成丁') || decEvt.title.includes('登明堂试策'), `Decision title should be Han-Wei: ${decEvt.title}`);
console.log(`  ✅ 决断弹窗无缝切换为汉魏对策：【${decEvt.title}】\n`);

// 步骤 5：终局结算生平评定无现代工业职称
console.log('>>> [测试 5：汉魏终局结算生平行当评定]');
state.age = 80;
state.year = 180;
state.rep = 90;
state.track = 'scholar';
game.drawEndgameModal();
// 检查 drawEndgameModal 中的文案
const hasHanWeiMotto = mockCanvasCalls.some(c => c.args && c.args.some(a => typeof a === 'string' && a.includes('儒宗硕望 · 著书立说冠盖洛阳')));
assert.ok(hasHanWeiMotto, 'Should render Han-Wei scholar career title');
console.log('  ✅ 汉魏终局结算行当精准呈现为：【儒宗硕望 · 著书立说冠盖洛阳】\n');

console.log('================================================================================');
console.log('  🎉 汉魏风骨（公元100~300年）全生命周期净化测试 100% 全部通过！彻底告别高考！');
console.log('================================================================================\n');
process.exit(0);
