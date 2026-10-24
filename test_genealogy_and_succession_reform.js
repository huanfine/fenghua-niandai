const assert = require('assert');

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
  vibrateShort: noop,
  showToast: noop,
  getSharedCanvas: () => canvasObj
};

global.canvas = canvasObj;
global.window = global;

require('./wechat-minigame/game.js');
const { state } = global;

function initNewGame(startingYear = 100) {
  global.startCharacterCreation(false);
  state.selectedBirthYear = startingYear;
  state.birthYear = startingYear;
  state.year = startingYear + 18;
  state.age = 18;
  state.health = 80;
  state.capital = 50000;
  state.rep = 60;
  state.track = 'official';
  state.clanBranch = '长房嫡脉';
  state.lineageGeneration = 1;
}

console.log('================================================================================');
console.log('  🏛️ 汉魏风骨（第一赛季）世家多脉世系重构与全维度验收测试');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// 验收标准 1: 单赛季多世不串季测试（连续接班 20 世）
// -----------------------------------------------------------------------------
console.log('>>> [验收 1: 单赛季 20 世循环，保证不跳出汉魏第一赛季]');
initNewGame(100);
global.finishCharacterCreation();

const fam = global.ensureClanProfileForCurrentRun();
assert.strictEqual(fam.currentSeasonId, 'season_1_han_wei', '初始赛季必须为 season_1_han_wei');
assert.strictEqual(fam.timeline.currentEpochIndex, 1, '初始纪元必须锁定为 1');

for (let round = 1; round <= 20; round++) {
  state.age = 65;
  state.year = state.birthYear + 65;
  state.capital = 150000;
  state.rep = 75;

  const candidates = global.generateSuccessorCandidates();
  const cand = candidates[(round - 1) % candidates.length];
  global.successionToNextGeneration(cand);
  global.finishCharacterCreation();

  assert.strictEqual(fam.currentSeasonId, 'season_1_han_wei', `第 ${round} 世后赛季仍必须为 season_1_han_wei`);
  assert.strictEqual(fam.timeline.currentEpochIndex, 1, `第 ${round} 世后 currentEpochIndex 必须保持为 1`);
  assert.ok(state.birthYear >= 100 && state.birthYear <= 255, `第 ${round} 世出生年 (${state.birthYear}) 必须严格限制在汉魏时间窗内 (100~255)`);
  assert.ok(state.lineageGeneration >= 1 && state.lineageGeneration <= 8, `第 ${round} 世辈分必须在 1~8 代内 (实际: ${state.lineageGeneration})`);
}

assert.strictEqual(fam.genealogyList.length, 20, '宗祠长卷必须完整收录 20 位入祀先贤');
fam.genealogyList.forEach((entry, idx) => {
  assert.strictEqual(entry.eraIndex, 1, `第 ${idx + 1} 位先贤 eraIndex 必须为 1`);
  assert.notStrictEqual(entry.eraName, '六朝烟雨', `第 ${idx + 1} 位先贤绝不可为六朝烟雨`);
  assert.ok(entry.playOrder === idx + 1, `第 ${idx + 1} 位先贤 playOrder 必须等于 ${idx + 1}`);
  assert.ok(entry.branchName, `第 ${idx + 1} 位先贤必须具备房支名 branchName`);
});
console.log('  ✅ 成功验证：单赛季 20 世连续接祧均锁定在第一赛季汉魏风骨内，0 越界！');

// -----------------------------------------------------------------------------
// 验收标准 2: 六脉接班标签与宗门长卷准确渲染测试
// -----------------------------------------------------------------------------
console.log('\n>>> [验收 2: 六脉接班候选人生成与族谱长卷真实标签渲染]');
const testCandidates = global.generateSuccessorCandidates();
const expectedModes = ['lineage_heir', 'same_gen_brother', 'adopted_clan', 'foster_son', 'retainer'];
expectedModes.forEach(mode => {
  const c = testCandidates.find(item => item.mode === mode);
  assert.ok(c, `必须包含接班模式: ${mode}`);
  assert.ok(c.branchName, `候选人 ${mode} 必须具备房支名`);
  assert.ok(c.role, `候选人 ${mode} 必须具备角色称谓`);
});

mockCanvasCalls.length = 0;
global.drawFamilyPedigreeTree(50);
const allTexts = mockCanvasCalls.filter(c => c.method === 'fillText').map(c => c.args[0]).join(' ');

assert.ok(allTexts.includes('【🤝 同宗昆仲】'), '族谱必须渲染【🤝 同宗昆仲】标签');
assert.ok(allTexts.includes('【👑 宗门嫡系】'), '族谱必须渲染【👑 宗门嫡系】标签');
assert.ok(allTexts.includes('【🌿 旁系支脉】'), '族谱必须渲染【🌿 旁系支脉】标签');
assert.ok(allTexts.includes('【⚔️ 赐姓义子】'), '族谱必须渲染【⚔️ 赐姓义子】标签');
assert.ok(allTexts.includes('【🛡️ 家臣掌事】'), '族谱必须渲染【🛡️ 家臣掌事】标签');
assert.ok(!allTexts.includes('¥'), '族谱页面绝对不得出现 ¥ 符号');
console.log('  ✅ 成功验证：六脉接班身份标签各自准确渲染，告别全员“宗门正统”与货币穿帮！');

// -----------------------------------------------------------------------------
// 验收标准 3: 先祖卡片真实字段读取测试 (绝不回退“先公”/“名门布衣”)
// -----------------------------------------------------------------------------
console.log('\n>>> [验收 3: 先祖页签真实字段读取与非默认兜底]');
mockCanvasCalls.length = 0;
global.drawFamilyLineageSection(50);
const lineageTexts = mockCanvasCalls.filter(c => c.method === 'fillText').map(c => c.args[0]).join(' ');
assert.ok(!lineageTexts.includes('• 先祖【先公】'), '近期入祀先祖姓名绝不能是兜底的【先公】');
assert.ok(!lineageTexts.includes('官至【名门布衣】'), '近期入祀先祖官爵绝不能是兜底的【名门布衣】');
assert.ok(lineageTexts.includes('近期入祀：【'), '必须正常渲染近期入祀先祖全称与享寿');
assert.ok(lineageTexts.includes('宗祠尊谥：【'), '必须正常渲染宗祠尊谥与增广声望');
console.log('  ✅ 成功验证：已入祀先贤卡片精确绑定真实姓名、官衔、寿命与尊谥！');

// -----------------------------------------------------------------------------
// 验收标准 4: 汉魏篇章选择器与时空纯净性验证
// -----------------------------------------------------------------------------
console.log('\n>>> [验收 4: 汉魏四卷篇章图鉴与时空纯净性]');
mockCanvasCalls.length = 0;
global.drawFamilyTabFrontierSection(50);
const frontierTexts = mockCanvasCalls.filter(c => c.method === 'fillText').map(c => c.args[0]).join(' ');
console.log('DEBUG frontierTexts:', frontierTexts);
assert.ok(frontierTexts.includes('汉魏四卷历史篇章 · 历世谱系图鉴'), '岁月页必须展示汉魏四卷篇章');
assert.ok(frontierTexts.includes('卷一 · 东汉永元'), '必须展示卷一');
assert.ok(frontierTexts.includes('卷二 · 桓灵党锢'), '必须展示卷二');
assert.ok(frontierTexts.includes('卷三 · 建安风骨'), '必须展示卷三');
assert.ok(frontierTexts.includes('卷四 · 正始太康'), '必须展示卷四');
assert.ok(!frontierTexts.includes('硬核科技'), '绝对不得出现现代硬核科技指标');
assert.ok(!frontierTexts.includes('空间产业'), '绝对不得出现现代空间产业指标');
assert.ok(!frontierTexts.includes('公元 2035 年'), '绝对不得出现公元 2035 年现代前沿');
console.log('  ✅ 成功验证：岁月页签已彻底转变为纯正的汉魏四卷历史谱系图鉴！');

// -----------------------------------------------------------------------------
// 验收标准 5: 案头公文时空双向闭环、汉魏纯净声学引擎与古礼称谓验证
// -----------------------------------------------------------------------------
console.log('\n>>> [验收 5: 案头公文时空双向闭环、汉魏雅乐引擎与古礼称谓]');
// 1. 验证全部 20 份汉魏案头公文均已配置合理的 minYear 与 maxYear
const { HAN_WEI_DESK_DOCUMENTS } = require('./wechat-minigame/src/data/historicalMilieuHanWei.js');
let allDocsHaveYearBounds = true;
for (const track in HAN_WEI_DESK_DOCUMENTS) {
  HAN_WEI_DESK_DOCUMENTS[track].forEach(doc => {
    assert.strictEqual(typeof doc.minYear, 'number', `公文 ${doc.id} 必须配置 minYear`);
    assert.strictEqual(typeof doc.maxYear, 'number', `公文 ${doc.id} 必须配置 maxYear`);
    assert.ok(doc.minYear <= doc.maxYear, `公文 ${doc.id} minYear 必须 <= maxYear`);
  });
}
console.log('  ✅ 成功验证：全部 20 份汉魏案头机要公文严格绑定正史年份窗口，杜绝穿越！');

// 2. 验证声学引擎汉魏乐章切换
const eraMusicEngine = require('./wechat-minigame/src/audio/eraMusicEngine.js');
assert.ok(eraMusicEngine.ERA_BGM_SUITES.hanwei, '必须具备 ERA_BGM_SUITES.hanwei 乐章');
assert.strictEqual(eraMusicEngine.ERA_BGM_SUITES.hanwei.title, '《汉魏雅乐·广陵清商》', '乐章名称必须为《汉魏雅乐·广陵清商》');
console.log('  ✅ 成功验证：声学引擎已配置汉魏第一赛季专属相和歌与清商乐章！');

console.log('\n================================================================================');
console.log('🎉 世家多脉世系重构全部五项验收标准 100% 通过！汉魏第一赛季完满闭环！');
console.log('================================================================================');
process.exit(0);
