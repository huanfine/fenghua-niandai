/**
 * 汉魏第一赛季：坞壁经略大本营主闭环与非电子书交互验证
 */

const assert = require('assert');

// 模拟小游戏基础环境
const mockCtx = {
  save: () => {},
  restore: () => {},
  fillRect: () => {},
  strokeRect: () => {},
  rect: () => {},
  fillText: () => {},
  measureText: (t) => ({ width: (t || '').length * 10 }),
  beginPath: () => {},
  arc: () => {},
  arcTo: () => {},
  fill: () => {},
  stroke: () => {},
  moveTo: () => {},
  lineTo: () => {},
  closePath: () => {},
  translate: () => {},
  rotate: () => {},
  setLineDash: () => {},
  createLinearGradient: () => ({ addColorStop: () => {} }),
};

global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 375, windowHeight: 667, pixelRatio: 2 }),
  getStorageSync: () => null,
  setStorageSync: () => {},
  createCanvas: () => ({
    getContext: () => mockCtx,
    width: 750,
    height: 1334
  }),
  onAudioInterruptionEnd: () => {},
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
  vibrateShort: () => {},
  getMenuButtonBoundingClientRect: () => ({ top: 24, bottom: 56, left: 280, right: 365, width: 85, height: 32 })
};

const epochOneMod = require('./wechat-minigame/subpackages/season1_hanwei/epochOneEngine.js');
const game = require('./wechat-minigame/game.js');

console.log('====================================================');
console.log('🏰 启动测试：《汉魏风骨》坞壁实业经略与非电子书主闭环验证');
console.log('====================================================\n');

// 1. 验证开局与 Dock 导航栏配置 (基业置顶，杜绝阅读理解)
console.log('👉 [测试 1] 校验汉魏开局默认 Tab 与 Dock 三大核心导航...');
const testState = {
  year: 100,
  age: 18,
  selectedBirthYear: 100,
  capital: 20000,
  rep: 50,
  ap: 3,
  tags: {},
  handledEvents: {}
};

assert.strictEqual(game.isTabUnlocked('card_stage', testState.age), true, '汉魏天命滑牌 Tab 必须立即可用！');
const tabs = game.getActiveDockTabs(testState.age);
assert.strictEqual(tabs[0].key, 'card_stage', '第一首选 Tab 必须是【天命】(单屏卡牌推演舞台)！');
assert.strictEqual(tabs[1].key, 'family', '第二 Tab 必须是【宗业】！');
assert.strictEqual(tabs[2].key, 'timeline', '第三 Tab 必须是【青史】！');
console.log('  ✅ 默认导航盘面验证通过：[命·天命] [宗·宗业] [史·青史]！\n');

// 2. 验证坞壁庄园初始化与家督三策令台执行
console.log('👉 [测试 2] 校验坞壁庄园初始实体资产与心力指令消耗...');
testState.manor = epochOneMod.initManor('agri_land');
const initAcres = testState.manor.farmlandAcres;
const initGrain = testState.manor.granaryStoredGrain;
assert.ok(initAcres >= 40, '初始良田应≥40顷');
assert.ok(initGrain >= 300, '初始存粮应≥300石');
assert.ok(testState.manor.armedRetainers >= 20, '初始部曲应≥20人');
assert.strictEqual(testState.ap, 3, '初始心力应为 3/3');

// 执行令一：拓荒屯田 (消耗400铢，良田+10顷，粮+80石，AP-1)
const res1 = epochOneMod.executeManorOrder(testState, 'reclaim_farm');
assert.strictEqual(res1.ok, true, '拓荒屯田执行成功');
assert.strictEqual(testState.ap, 2, '心力消耗至 2');
assert.strictEqual(testState.capital, 19600, '扣除400五铢');
assert.strictEqual(testState.manor.farmlandAcres, initAcres + 10, '良田增加10顷');
assert.strictEqual(testState.manor.granaryStoredGrain, initGrain + 80, '仓储粟米增加80石');

// 执行令二：整肃武备 (消耗500铢+80粮，部曲+15，AP-1)
const curRet = testState.manor.armedRetainers;
const res2 = epochOneMod.executeManorOrder(testState, 'train_retainers');
assert.strictEqual(res2.ok, true, '整肃武备执行成功');
assert.strictEqual(testState.ap, 1, '心力消耗至 1');
assert.strictEqual(testState.manor.armedRetainers, curRet + 15, '部曲增加15人');

// 执行令三：修缮坞壁 (消耗800铢+100粮，城防+1级，AP-1)
const res3 = epochOneMod.executeManorOrder(testState, 'build_fortress');
assert.strictEqual(res3.ok, true, '修缮坞壁执行成功');
assert.strictEqual(testState.ap, 0, '心力消耗完毕 (0/3)');
assert.strictEqual(testState.manor.fortressLevel, 2, '城防升至第2级深垒');

// 心力为0时再次执行应被阻断
const resFail = epochOneMod.executeManorOrder(testState, 'reclaim_farm');
assert.strictEqual(resFail.ok, false, '心力用尽必须阻断并提示度过此年');
console.log('  ✅ 家督令执行与资源流转严密准确：良田+10, 部曲+15, 城防升第2重！\n');

// 3. 验证达摩克利斯死线雷达检测与公元184年黄巾攻防检定
console.log('👉 [测试 3] 校验时代死线雷达 (公元184年黄巾之乱) 胜负判定与战利品结算...');
const crisis184 = epochOneMod.HAN_WEI_CRISIS_TIMELINE.find(c => c.year === 184);
assert.ok(crisis184, '必须存在公元184年死线大考');

// 当前防务已达标 (部曲 >= 35, 城防 >= 2, 存粮 >= 300)
const isDefenseWin = crisis184.check(testState.manor, testState);
assert.strictEqual(isDefenseWin, true, '坞壁整军经武后应从容大胜黄巾先锋！');

crisis184.triumph.apply(testState.manor, testState);
assert.ok(testState.manor.granaryStoredGrain >= 600, '大捷后缴获战利品纳粮+400石');
assert.ok(testState.rep >= 80, '大捷后声望暴涨');
console.log('  ✅ 生死大考胜利反馈完备：击溃流寇，缴获400石粟米，威震州郡！\n');

// 4. 验证年度岁末丰收正反馈 (calculateManorYield)
console.log('👉 [测试 4] 校验岁末秋实良田租赋产出结算...');
const yieldRes = epochOneMod.calculateManorYield(testState.manor, 1);
assert.ok(yieldRes.grainProduced >= 200, '良田年纳粮应≥200石');
assert.ok(yieldRes.netMoney > 0, '水碓庄园净租赋应为正数');
console.log(`  ✅ 岁末结算进账: 纳粮 +${yieldRes.grainProduced} 斛, 赋税入库 +${yieldRes.netMoney} 五铢！\n`);

console.log('====================================================');
console.log('🎉 汉魏坞壁实业经略全部核心机制 100% 验证通过！');
console.log('====================================================');

process.exit(0);
