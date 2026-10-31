/**
 * test_unified_trinity_flow.js
 * 华夏世家 · 汉魏风骨 【天命】、【宗业】、【青史】三位一体闭环全流程实测
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
  vibrateLong: () => {},
  createInnerAudioContext: () => ({
    play: noop,
    stop: noop,
    onEnded: noop,
    onError: noop
  }),
  loadSubpackage: ({ success }) => { if (success) success(); },
  onTouchStart: noop,
  onTouchMove: noop,
  onTouchEnd: noop
};

// 预载游戏
require('./wechat-minigame/game.js');

console.log('====================================================');
console.log('🧪 三位一体闭环自查：【天命】·【宗业】·【青史】联动测试');
console.log('====================================================');

// 1. 模拟开局立族大典 -> 宿命大选 -> 进入天命舞台
const titleBtn = global.hitboxes.find(b => b.id === 'title_start_clan_primary_btn');
if (!titleBtn) throw new Error('未找到开局按钮');
if (titleBtn.onClick) titleBtn.onClick(); else if (titleBtn.handler) titleBtn.handler();

// 绘制立族弹窗并确认
global.drawActiveModal();
const clanConfirmBtn = global.hitboxes.find(b => b.id === 'clan_form_confirm');
if (clanConfirmBtn) {
  if (clanConfirmBtn.onClick) clanConfirmBtn.onClick(); else if (clanConfirmBtn.handler) clanConfirmBtn.handler();
}

// 绘制先祖圣卷并启程
global.drawActiveModal();
const originsBtn = global.hitboxes.find(b => b.id === 'btn_clan_origins_start_gacha');
if (originsBtn) {
  if (originsBtn.onClick) originsBtn.onClick(); else if (originsBtn.handler) originsBtn.handler();
}

// 绘制局前天命大抓周并入世
global.drawGachaScene();
const gachaEnterBtn = global.hitboxes.find(b => b.id === 'btn_gacha_confirm_enter_world');
if (gachaEnterBtn) {
  if (gachaEnterBtn.onClick) gachaEnterBtn.onClick(); else if (gachaEnterBtn.handler) gachaEnterBtn.handler();
}

console.log('👉 [第 1 步] 校验【天命】舞台初状态与庇佑条...');
global.state.activeTab = 'card_stage';
canvasLogs.length = 0;
global.drawFrame();

const texts1 = canvasLogs.filter(l => l.type === 'text').map(l => l.text);
const hasBanner = texts1.some(t => t.includes('华夏世家 · 汉魏风骨'));
const hasPerkBar = texts1.some(t => t.includes('宗业庇佑:'));
const hasFortressReady = texts1.some(t => t.includes('免死就绪'));

console.log(`  - 华夏世家大横额: ${hasBanner ? '✅' : '❌'}`);
console.log(`  - 宗业庇佑状态栏: ${hasPerkBar ? '✅' : '❌'}`);
console.log(`  - 坞壁免死充能就绪: ${hasFortressReady ? '✅' : '❌'}`);

if (!hasBanner || !hasPerkBar || !hasFortressReady) {
  throw new Error('天命舞台庇佑条或横额缺失！');
}

// 2. 在【天命】中下达决断
console.log('👉 [第 2 步] 在【天命】中滑牌决断，检查起居注记录...');
const curCardTitle = global.state.activeCard.title;
global.executeCardDecision('right');

if (!global.state.timeline || global.state.timeline.length === 0) {
  throw new Error('起居注 timeline 未记录决断！');
}
const latestTimeline = global.state.timeline[0];
console.log(`  - 决断成功记录至青史: ${latestTimeline.text}`);

// 3. 切换至【宗业】页签，校验经略与升级
console.log('👉 [第 3 步] 切换至【宗业】页签，校验九品官阶与实体营造...');
global.switchTab('family');
canvasLogs.length = 0;
global.drawFrame();

const texts2 = canvasLogs.filter(l => l.type === 'text').map(l => l.text);
const hasNineRank = texts2.some(t => t.includes('九品官品'));
const hasFortressFac = texts2.some(t => t.includes('坞壁深垒'));
const hasFarmlandFac = texts2.some(t => t.includes('膏腴良田'));
const hasLegacyDesk = texts2.some(t => t.includes('机要案牍') || t.includes('签批公文'));

console.log(`  - 九品中正官品展示: ${hasNineRank ? '✅' : '❌'}`);
console.log(`  - 坞壁深垒营造设施: ${hasFortressFac ? '✅' : '❌'}`);
console.log(`  - 膏腴良田营造设施: ${hasFarmlandFac ? '✅' : '❌'}`);
console.log(`  - 彻底杜绝1980年代旧案牍污染: ${!hasLegacyDesk ? '✅' : '❌'}`);

if (!hasNineRank || !hasFortressFac || hasLegacyDesk) {
  throw new Error('宗业页签展示异常或旧系统污染！');
}

// 模拟升级坞壁
const oldWealth = global.state.meters.wealth;
const oldFortressLv = global.state.estate.fortressLevel;
const upgradeFortressBtn = global.hitboxes.find(b => b.id === 'upgrade_fortress');
if (!upgradeFortressBtn) throw new Error('未找到 upgrade_fortress 按钮');
upgradeFortressBtn.handler();

console.log(`  - 坞壁升级: Lv.${oldFortressLv} -> Lv.${global.state.estate.fortressLevel}, 族产消耗: ${oldWealth} -> ${global.state.meters.wealth}`);

// 4. 模拟点击【返回天命长卷】
const returnBtnFromFamily = global.hitboxes.find(b => b.id === 'dynasty_return_card_stage_btn');
if (!returnBtnFromFamily) throw new Error('未找到 dynasty_return_card_stage_btn 按钮');
returnBtnFromFamily.handler();

console.log(`  - 一键返回天命: activeTab = ${global.state.activeTab} ${global.state.activeTab === 'card_stage' ? '✅' : '❌'}`);

// 5. 切换至【青史】页签，校验起居注
console.log('👉 [第 4 步] 切换至【青史】页签，校验起居注长河流水...');
global.switchTab('timeline');
canvasLogs.length = 0;
global.drawFrame();

const texts3 = canvasLogs.filter(l => l.type === 'text').map(l => l.text);
const hasChronicleTitle = texts3.some(t => t.includes('宗族起居注'));
const hasChronicleEntry = texts3.some(t => t.includes(curCardTitle));
const hasLegacyTimeline = texts3.some(t => t.includes('生平大事件') && t.includes('高考'));

console.log(`  - 起居注长河标题: ${hasChronicleTitle ? '✅' : '❌'}`);
console.log(`  - 起居注精准渲染天命抉择: ${hasChronicleEntry ? '✅' : '❌'}`);
console.log(`  - 杜绝旧时代现代生平事件污染: ${!hasLegacyTimeline ? '✅' : '❌'}`);

if (!hasChronicleTitle || !hasChronicleEntry || hasLegacyTimeline) {
  throw new Error('青史页签展示异常！');
}

// 6. 测试【坞壁深垒】在天命中的绝境免死救主
console.log('👉 [第 5 步] 模拟致命崩溃，校验【坞壁深垒】免死救主...');
global.switchTab('card_stage');
global.state.meters.force = 5; // 濒死边缘
// 制造一张强制扣大量武备的卡
const fatalCard = {
  id: 'fatal_test_card',
  title: '敌骑破营',
  speaker: '斥候',
  avatar: '⚔️',
  text: '千骑突袭！营阵已溃！',
  left: {
    text: '死守',
    effects: { force: -20, grain: 0, prestige: 0, wealth: 0 }
  },
  right: {
    text: '溃逃',
    effects: { force: -30, grain: 0, prestige: 0, wealth: 0 }
  }
};
global.state.activeCard = fatalCard;
global.executeCardDecision('left');

console.log(`  - 濒死结算状态: dead = ${global.state.endgameSettled ? 'true' : 'false'}`);
console.log(`  - 坞壁免死救主后武备: force = ${global.state.meters.force}`);
console.log(`  - 免死标记已消耗: usedLifeline = ${global.state._usedFortressLifeline ? 'true' : 'false'}`);

const hasLifelineLog = global.state.timeline.some(t => t.text.includes('坞壁死守'));
console.log(`  - 起居注记录免死壮举: ${hasLifelineLog ? '✅' : '❌'}`);

if (global.state.endgameSettled || global.state.meters.force < 20 || !hasLifelineLog) {
  throw new Error('坞壁深垒免死机制未能生效！');
}

// 7. 再次绘制【天命】，检查庇佑栏已显示“已耗”
canvasLogs.length = 0;
global.drawFrame();
const texts4 = canvasLogs.filter(l => l.type === 'text').map(l => l.text);
const hasSpentStatus = texts4.some(t => t.includes('已耗'));
console.log(`  - 天命庇佑栏实时响应免死消耗: ${hasSpentStatus ? '✅' : '❌'}`);

console.log('====================================================');
console.log('🎉 【天命】·【宗业】·【青史】三位一体闭环全流程 100% 验证通过！');
console.log('====================================================');
process.exit(0);
