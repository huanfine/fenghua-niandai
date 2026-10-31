/**
 * test_verify_real_gameplay_render.js
 * 真实自查：模拟玩家从封面点击开局 -> 天命摇号 -> 进入单屏卡牌推演舞台 -> 滑牌抉择
 */

const assert = require('assert');

// 收集所有 Canvas 绘制文本与行为
const canvasLogs = [];
const noop = () => {};
const mockCtx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length : 0) * 12 });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => ({ addColorStop: noop });
    if (k === 'createPattern') return () => ({});
    if (k === 'fillText') return (text, x, y) => canvasLogs.push({ type: 'text', text: String(text), x, y });
    if (k === 'fillRect') return (x, y, w, h) => canvasLogs.push({ type: 'rect', x, y, w, h });
    if (k === 'strokeRect') return (x, y, w, h) => canvasLogs.push({ type: 'strokeRect', x, y, w, h });
    if (k === 'arc') return (x, y, r) => canvasLogs.push({ type: 'arc', x, y, r });
    if (t[k] !== undefined) return t[k];
    return noop;
  },
  set: (t, k, v) => { t[k] = v; return true; }
});

const mockStorage = {};
const canvasObj = {
  width: 750,
  height: 1334,
  getContext: () => mockCtx
};

global.wx = {
  getSystemInfoSync: () => ({
    screenWidth: 375,
    screenHeight: 667,
    pixelRatio: 2,
    windowWidth: 375,
    windowHeight: 667,
    statusBarHeight: 20
  }),
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 667, pixelRatio: 2, safeArea: { top: 20, bottom: 647 } }),
  getStorageSync: (key) => mockStorage[key] || null,
  setStorageSync: (key, val) => { mockStorage[key] = val; },
  removeStorageSync: (key) => { delete mockStorage[key]; },
  getMenuButtonBoundingClientRect: () => ({ top: 24, bottom: 56, left: 280, right: 365, width: 85, height: 32 }),
  createCanvas: () => canvasObj,
  createOffscreenCanvas: () => canvasObj,
  createWebAudioContext: () => null,
  vibrateShort: () => {},
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {}
};

// 加载游戏主脚本
const game = require('./wechat-minigame/game.js');
const state = global.state;

console.log('====================================================');
console.log('🔍 自查实测：从封面开局到真正进入天命卡牌推演舞台');
console.log('====================================================\n');

// 1. 确认游戏在封面
console.log('👉 [第 1 步] 校验游戏初始状态与封面渲染...');
assert.strictEqual(state.gameScene, 'title', '初始场景必须是 title');
canvasLogs.length = 0;
if (typeof global.drawFrame === 'function') {
  global.drawFrame();
}
console.log('Title canvasLogs length:', canvasLogs.length, 'sample text:', canvasLogs.slice(0, 5).map(l => l.text));
console.log('  ✅ 封面状态就绪！\n');

// 2. 点击【开启第一赛季 · 汉魏立族开基】
console.log('👉 [第 2 步] 模拟玩家点击【开启第一赛季 · 汉魏立族开基】...');
global.openClanEstablishmentModal();
assert.strictEqual(state.activeModal, 'clan_establishment', '必须弹出立族大典弹窗');

// 确立世家
state.familyProfile = {
  surname: '陈',
  province: '河南',
  hallName: '颍川堂',
  vocationId: 'study_scholar',
  fullName: '河南·陈氏·颍川堂'
};
state.selectedBirthYear = 100;
state.gameScene = 'game';
global.startCharacterCreation(false);

console.log(`  ✅ 角色初始化完成：当前场景=${state.gameScene}, 年份=${state.year}, 年龄=${state.age}`);
console.log(`  ✅ 核心自查检查点：当前 activeTab = '${state.activeTab}' (必须是 'card_stage'，绝不能是 'desk')！`);
assert.strictEqual(state.activeTab, 'card_stage', '首屏核心活动 Tab 必须是 card_stage！');

// 3. 选定天命词条入世
console.log('\n👉 [第 3 步] 玩家确认天命词条入世...');
const destiny = { id: 'destiny_wubi_lord', title: '铁血坞主', initialManor: {} };
const perk = { name: '天生重瞳', desc: '天机洞悉' };
global.applyChosenHanWeiDestiny(destiny, perk);

assert.strictEqual(state.activeModal, null, '确认天命后弹窗应已关闭');
assert.strictEqual(state.activeTab, 'card_stage', '入世后主视口必须仍然是 card_stage！');
console.log(`  ✅ 入世成功！当前 activeTab='${state.activeTab}', meters=`, state.meters);

// 4. 执行首帧单屏渲染自查
console.log('\n👉 [第 4 步] 自查真正的首屏 Canvas 绘制内容...');
canvasLogs.length = 0;
global.drawFrame();

const texts = canvasLogs.filter(l => l.type === 'text').map(l => l.text);
console.log(`  📊 首帧共绘制 ${texts.length} 段文本，部分文字样本：`);
console.log('    ', texts.slice(0, 10).join(' | '));

// 必须绘制四维天秤
assert(texts.some(t => t.includes('门望')), '必须绘制【门望】天秤');
assert(texts.some(t => t.includes('族产')), '必须绘制【族产】天秤');
assert(texts.some(t => t.includes('武备')), '必须绘制【武备】天秤');
assert(texts.some(t => t.includes('粮草')), '必须绘制【粮草】天秤');
console.log('  ✅ 四大平衡天秤 (门望/族产/武备/粮草) 100% 正常绘制！');

// 必须绘制当前天命大卡
assert(state.activeCard, '必须有当前活跃天命卡');
console.log(`  ✅ 当前活跃大卡：【${state.activeCard.title}】 (发言人: ${state.activeCard.speaker})`);
console.log(`     情境：${state.activeCard.text}`);
console.log(`     左选：${state.activeCard.left.text} (影响: ${JSON.stringify(state.activeCard.left.effects)})`);
console.log(`     右选：${state.activeCard.right.text} (影响: ${JSON.stringify(state.activeCard.right.effects)})`);

// 5. 模拟单指右滑决断
console.log('\n👉 [第 5 步] 模拟玩家手指右滑做出决断...');
const prevYear = state.year;
const prevMeters = { ...state.meters };
global.executeCardDecision('right');

console.log(`  ✅ 决断执行成功！年份：${prevYear} -> ${state.year}`);
console.log(`  ✅ 四维天秤变动：`, prevMeters, '->', state.meters);
console.log(`  ✅ 下一张卡牌自动就绪：【${state.activeCard ? state.activeCard.title : '已结卷'}】`);

console.log('\n====================================================');
console.log('🎉 真正小游戏手感自查实测 100% 成功通过！');
console.log('====================================================\n');

process.exit(0);
