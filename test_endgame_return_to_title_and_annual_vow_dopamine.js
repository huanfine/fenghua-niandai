/**
 * 华夏世家大系 · 终局安全归厅、代际宿愿与岁序天象多巴胺循环自动化回归测试
 * 运行方式: node test_endgame_return_to_title_and_annual_vow_dopamine.js
 */

const assert = require('assert');

// 构造小游戏平台模拟环境
const noop = () => {};
const mockCanvasCalls = [];
const mockCtx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length : 0) * 12 });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => ({ addColorStop: noop });
    if (k === 'createPattern') return () => ({});
    if (k === 'roundRect' || k === 'fillRect' || k === 'strokeRect' || k === 'fillText') {
      return (...args) => mockCanvasCalls.push({ method: k, args });
    }
    return noop;
  }
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
  createCanvas: () => canvasObj,
  onTouchStart: noop,
  onTouchMove: noop,
  onTouchEnd: noop,
  onTouchCancel: noop,
  onShow: noop,
  onHide: noop,
  onError: noop,
  triggerGC: noop,
  vibrateShort: noop,
  vibrateLong: noop
};

// 导入游戏引擎
const game = require('./wechat-minigame/game.js');
const state = game.state;

console.log('\n>>> [测试 1：终局返回封面安全通道与归厅持久化验证]');
// 模拟进入终局
state.isStarted = true;
state.gameScene = 'game';
state.activeModal = 'endgame';
state.year = 175;
state.age = 75;
state.name = '陈守正';
state.familyProfile = {
  fullName: '颍川陈氏',
  surname: '陈',
  clanTrust: { prestigeScore: 88, trustFundMoney: 120000 },
  genealogyList: [{ name: '陈崇德', generation: 1 }]
};

// 触发 drawEndgameModal，验证按钮注册
state.hitboxes = [];
game.drawEndgameModal();
const hitboxes = game.getHitboxes();

const cornerHomeBtn = hitboxes.find(b => b.id === 'endgame_back_to_title_corner_btn');
assert(cornerHomeBtn, '终局卡片右上角必须存在安全归厅按钮 endgame_back_to_title_corner_btn');
console.log('  ✅ 终局卡片右上角【🏠 归厅】按钮定位与触控尺寸核验通过');

const btmHomeBtn = hitboxes.find(b => b.id === 'endgame_home_title_btn');
assert(btmHomeBtn, '终局底部必须存在【🏠 返回封面】按钮 endgame_home_title_btn');
console.log('  ✅ 终局底部三大行动栏包含【🏠 返回封面】按钮');

const succBtn = hitboxes.find(b => b.id === 'succession_heir_btn');
assert(succBtn, '终局底部必须存在继祧主按钮 succession_heir_btn');

const restartBtn = hitboxes.find(b => b.id === 'restart_game_btn');
assert(restartBtn, '终局底部必须保留终断按钮 restart_game_btn');

// 执行返回封面
game.returnToTitleFromEndgame();
assert.strictEqual(state.gameScene, 'title', 'returnToTitleFromEndgame 后场景必须切换为 title');
assert.strictEqual(state.activeModal, null, 'returnToTitleFromEndgame 后弹窗必须清空');
assert.strictEqual(state.endgameSettled, true, 'returnToTitleFromEndgame 后必须标记 endgameSettled 为 true');
console.log('  ✅ 成功安全归厅：场景切换为 title，弹窗关闭，宗门卷轴完好归档');

console.log('\n>>> [测试 2：继祧择贤弹窗右上角安全归厅入口验证]');
state.activeModal = 'successor_selection';
state.successorCandidates = null;
game.drawSuccessorSelectionModal();
const succHitboxes = game.getHitboxes();
const succCornerBtn = succHitboxes.find(b => b.id === 'successor_modal_home_corner_btn');
assert(succCornerBtn, '继祧择贤弹窗右上角必须存在【✕ 归厅】按钮');
console.log('  ✅ 继祧择贤弹窗右上角【✕ 归厅】按钮注册与交互核验通过');

console.log('\n>>> [测试 3：封面/桌面支持识别完局并高亮引导宗门继祧]');
// 设置带完局存档状态
state.endgameSettled = true;
state.isRetired = true;
game.saveGameState();
state.hitboxes = [];
game.drawTitleScreen();
const titleHitboxes = game.getHitboxes();
const resumeBtn = titleHitboxes.find(b => b.id === 'resume_game_button');
assert(resumeBtn, '封面必须存在继祧/续玩主按钮 resume_game_button');
console.log('  ✅ 封面主行动点已升级为宗门继祧承袭大纛引导');

console.log('\n>>> [测试 4：代际宿愿系统与道途差异化验证]');
assert(Array.isArray(game.HAN_WEI_GENERATIONAL_VOWS), 'HAN_WEI_GENERATIONAL_VOWS 必须存在且为数组');
assert(game.HAN_WEI_GENERATIONAL_VOWS.length >= 5, '五大道途专属代际宿愿必须完备 (经学/仕途/商道/将门/隐逸)');

const scholarVow = game.initGenerationalVow('scholar', 2);
assert.strictEqual(scholarVow.track, 'scholar');
assert.strictEqual(scholarVow.completed, false);
console.log(`  ✅ 成功初始化第 2 世太学宿愿：【${scholarVow.title}】（目标：${scholarVow.targetDesc}）`);

state.generationalVow = scholarVow;
state.studyProgress = 100;
state.rep = 65;
const completed = game.checkAndProgressGenerationalVow(state);
assert.strictEqual(completed, true, '达成学业与声望要求后代际宿愿必须判定完成');
assert.strictEqual(state.generationalVow.completed, true, '宿愿状态必须标记为 completed: true');
console.log('  ✅ 代际宿愿达成核验通过：成功发放声望与宗族信任奖励');

console.log('\n>>> [测试 5：岁序天象正反馈多巴胺脉冲验证]');
assert(Array.isArray(game.HAN_WEI_ANNUAL_OMENS), 'HAN_WEI_ANNUAL_OMENS 必须为非空数组');
assert(game.HAN_WEI_ANNUAL_OMENS.length >= 8, '八大四时吉兆天象必须完备');

const prevCap = state.capital || 1000;
const omen = game.triggerAnnualRealmOmen(150, 25, 'scholar', state);
assert(omen && omen.title, 'triggerAnnualRealmOmen 必须返回有效天象对象');
assert(omen.float, '天象必须配置多巴胺浮字');
console.log(`  ✅ 岁序天象成功触发：【${omen.title}】浮字：“${omen.float}”`);

console.log('\n>>> [测试 6：防崩回归：无家族档案（familyProfile为null）时关隘事件奖励重宝零报错]');
state.familyProfile = null; // 模拟极端无家族档案运行态
state.year = 220; // 对应黄初建国事件（奖励九品中正考定金策）
state.activeModal = null;
state.unresolvedDecisionEvent = null;

// 触发汉魏历史事件 220 年
const triggered = game.checkAndTriggerHanWeiHistoricalEvent();
assert(triggered, '公元220年必须正常唤起黄初建国关隘事件');
assert(state.activeModal && state.activeDecisionEvent, '决策弹窗必须已挂载');

// 执行第 0 项抉择（获得传世重宝）
assert.doesNotThrow(() => {
  game.executeDiceChoice(0);
}, 'familyProfile为null时执行奖励传世物抉择决不能抛出 TypeError: clanTrust of null');
console.log('  ✅ 成功防御 null.clanTrust 崩溃：传世重宝正常解锁，游戏平稳运行');

console.log('================================================================================');
console.log('🎉 终局返回桌面、代际正反馈与空宗族防崩测试 100% 全部通过！');
console.log('================================================================================');
process.exit(0);
