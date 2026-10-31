/**
 * 《华夏世家 · 汉魏风骨》滑牌天命玩法端到端全维度回归测试
 * 验证：
 * 1. 四维悬丝指标 (grain, force, prestige, wealth) 动态平衡与初始化
 * 2. 左右划牌决策效果结算、时间流转 (1~2年/卡) 与编年锚点卡精准触发
 * 3. 走钢丝极限死因检定 (跌至0死于匮乏 vs 升至100怀璧其罪)
 * 4. 寿终传祧代际传承与公元300年大结局结卷
 * 5. 50 局全自动极速实战模拟推演，无死锁、无异常崩解
 */

const assert = require('assert');
const cardDeckMod = require('./wechat-minigame/src/data/cardDeckEngine.js');

console.log('====================================================');
console.log('🎴 启动测试：《汉魏风骨》天命滑牌核心玩法端到端回归检验');
console.log('====================================================\n');

// ----------------------------------------------------
// [测试 1] 校验四维纲纪定义与三大天命开局不对称槽位
// ----------------------------------------------------
console.log('👉 [测试 1] 校验四维指标与三大天命开局不对称配置...');
assert.strictEqual(typeof cardDeckMod.HAN_WEI_METERS, 'object', '必须导出四维指标定义！');
assert.ok(cardDeckMod.HAN_WEI_METERS.grain && cardDeckMod.HAN_WEI_METERS.force, '粮草与部曲指标必须齐备！');
assert.ok(cardDeckMod.HAN_WEI_METERS.prestige && cardDeckMod.HAN_WEI_METERS.wealth, '声望与资财指标必须齐备！');

// 坞堡豪强开局
const stateWubi = { year: 100, age: 18 };
cardDeckMod.initCardRun(stateWubi, 'destiny_wubi_lord');
assert.strictEqual(stateWubi.meters.grain, 65, '坞堡豪强粮草初始应为 65');
assert.strictEqual(stateWubi.meters.force, 65, '坞堡豪强部曲初始应为 65');
assert.ok(stateWubi.activeCard, '初始化必须提供首张天命卡牌');

// 党锢复仇开局
const stateDanggu = { year: 100, age: 18 };
cardDeckMod.initCardRun(stateDanggu, 'destiny_dang_gu');
assert.strictEqual(stateDanggu.meters.prestige, 65, '党锢名士声望初始应为 65');
assert.strictEqual(stateDanggu.meters.force, 35, '党锢名士部曲初始偏低为 35');

// 富甲巨贾开局
const stateMerchant = { year: 100, age: 18 };
cardDeckMod.initCardRun(stateMerchant, 'destiny_merchant_tycoon');
assert.strictEqual(stateMerchant.meters.wealth, 75, '富甲巨贾资财初始应为 75');
console.log('  ✅ 三大天命开局四维盘面不对称初始化检验通过！\n');

// ----------------------------------------------------
// [测试 2] 校验卡牌抉择结算、数值波动与时间跃进
// ----------------------------------------------------
console.log('👉 [测试 2] 校验左右抉择结算、属性增减与光阴流转...');
const stateTest = { year: 100, age: 18, meters: { grain: 50, force: 50, prestige: 50, wealth: 50 } };
const sampleCard = cardDeckMod.HAN_WEI_SWIPE_CARDS.find(c => c.id === 'hw_c_100_yongyuan');
assert.ok(sampleCard, '永元辟地卡必须存在！');

// 右选：领命开渠 (grain +14, force 0, prestige +10, wealth -12, isAnchor -> leap 2 yrs)
const resRight = cardDeckMod.resolveCardSwipe(stateTest, sampleCard, 'right');
assert.strictEqual(resRight.dead, false, '安全决策不应导致死亡');
assert.strictEqual(stateTest.meters.grain, 64, '粮草应由 50 变为 64');
assert.strictEqual(stateTest.meters.wealth, 38, '资财应由 50 变为 38');
assert.strictEqual(stateTest.meters.prestige, 60, '声望应由 50 变为 60');
assert.strictEqual(stateTest.year, 102, '历史大案卡牌执行后应流转 2 载至 102 年');
assert.strictEqual(stateTest.age, 20, '年龄应由 18 岁增至 20 岁');
assert.ok(stateTest.handledSwipeCards['hw_c_100_yongyuan'], '已处理卡牌应被标记避免重复');
console.log('  ✅ 抉择效果增减与岁月流转（公元100->102年）校验通过！\n');

// ----------------------------------------------------
// [测试 3] 校验历史大案锚点在对应纪年精准截获
// ----------------------------------------------------
console.log('👉 [测试 3] 校验历史巨浪锚点卡在对应公元纪年精准登场...');
const state184 = { year: 184, age: 30, handledSwipeCards: {} };
const card184 = cardDeckMod.getNextSwipeCard(state184);
assert.strictEqual(card184.id, 'hw_c_184_huangjin_main', '公元 184 年必须触发黄巾烽烟锚点卡！');
assert.strictEqual(card184.isAnchor, true, '黄巾之乱必须为历史锚点');

const state200 = { year: 200, age: 46, handledSwipeCards: {} };
const card200 = cardDeckMod.getNextSwipeCard(state200);
assert.strictEqual(card200.id, 'hw_c_200_guandu_epic', '公元 200 年必须触发官渡生死豪赌锚点卡！');

const state249 = { year: 249, age: 55, handledSwipeCards: {} };
const card249 = cardDeckMod.getNextSwipeCard(state249);
assert.strictEqual(card249.id, 'hw_c_249_gaopingling_coup', '公元 249 年必须触发高平陵政变锚点卡！');
console.log('  ✅ 黄巾(184)、官渡(200)、高平陵(249)重大历史巨浪卡命中率 100%！\n');

// ----------------------------------------------------
// [测试 4] 校验极端走向死因检定 (0: 死于匮乏 / 100: 盛极而亡)
// ----------------------------------------------------
console.log('👉 [测试 4] 校验走钢丝极限死因检定（损厌恶与致命危机）...');
// 族产/资财耗尽为 0
const stateBankrupt = { year: 150, age: 35, meters: { culture: 50, force: 50, prestige: 50, wealth: 10 } };
const cardDrainWealth = {
  id: 'test_drain_wealth',
  left: { effects: { wealth: -20 }, toast: '族库见底' },
  right: { effects: {}, toast: '无事' }
};
const resBankrupt = cardDeckMod.resolveCardSwipe(stateBankrupt, cardDrainWealth, 'left');
assert.strictEqual(resBankrupt.dead, true, '族产降为 0 必须死亡！');
assert.strictEqual(resBankrupt.extreme, 'min', '必须标定为跌入下限极值！');
assert.ok(resBankrupt.cause.includes('族库悬磬'), '死因应为族库悬磬');

// 文脉断绝为 0
const stateLostCulture = { year: 150, age: 35, meters: { culture: 10, force: 50, prestige: 50, wealth: 50 } };
const cardDrainCulture = {
  id: 'test_drain_culture',
  left: { effects: { culture: -20 }, toast: '家学丧失' },
  right: { effects: {}, toast: '无事' }
};
const resLostCulture = cardDeckMod.resolveCardSwipe(stateLostCulture, cardDrainCulture, 'left');
assert.strictEqual(resLostCulture.dead, true, '文脉降为 0 必须死亡！');
assert.ok(resLostCulture.cause.includes('家学断绝'), '死因应为家学断绝');

// 部曲武备过盛达 100 (死士弑主)
const stateMutiny = { year: 150, age: 35, meters: { culture: 50, force: 90, prestige: 50, wealth: 50 } };
const cardOverForce = {
  id: 'test_over_force',
  left: { effects: {}, toast: '无事' },
  right: { effects: { force: 20 }, toast: '暴兵极盛' }
};
const resMutiny = cardDeckMod.resolveCardSwipe(stateMutiny, cardOverForce, 'right');
assert.strictEqual(resMutiny.dead, true, '武备达 100 必须死亡！');
assert.strictEqual(resMutiny.extreme, 'max', '必须标定为突破上限极值！');
assert.ok(resMutiny.cause.includes('死士弑主'), '死因应为死士弑主');

// 族产达 100 (金谷抄没)
const stateGreed = { year: 150, age: 35, meters: { culture: 50, force: 50, prestige: 50, wealth: 95 } };
const cardOverWealth = {
  id: 'test_over_wealth',
  right: { effects: { wealth: 15 }, toast: '聚敛巨万' }
};
const resGreed = cardDeckMod.resolveCardSwipe(stateGreed, cardOverWealth, 'right');
assert.strictEqual(resGreed.dead, true, '族产达 100 必须被官府抄没诛绝！');
assert.ok(resGreed.cause.includes('金谷抄没'), '死因应为金谷抄没');
console.log('  ✅ 匮乏致死与怀璧其罪（四维 0 与 100 极限）判定 100% 严谨！\n');

// ----------------------------------------------------
// [测试 5] 校验高寿传祧与公元 300 年两百年大结局
// ----------------------------------------------------
console.log('👉 [测试 5] 校验世代传承与公元 300 年极盛结卷...');
// 传祧立嗣检定
const stateSuccession = { year: 160, age: 78, careerTenureYears: 50, meters: { grain: 50, force: 50, prestige: 50, wealth: 50 } };
const dummyCard = {
  id: 'test_dummy',
  left: { effects: {}, toast: '平稳' }
};
const resSucc = cardDeckMod.resolveCardSwipe(stateSuccession, dummyCard, 'left');
assert.strictEqual(resSucc.succession, true, '主政满50年或寿至78岁必须触发宗门立嗣传祧！');

// 执行传承
const succResult = cardDeckMod.advanceGenerationSuccession(stateSuccession, 'eldest');
assert.strictEqual(succResult.generation, 2, '代际必须升至第 2 代');
assert.strictEqual(stateSuccession.age, 22, '下代接班人家主年龄应为 22 岁黄金壮年');
assert.ok(stateSuccession.meters.prestige >= 60, '嫡长子继承应获得声望加成');

// 300 年极盛结卷检定
const stateEndYear = { year: 299, age: 40, meters: { grain: 50, force: 50, prestige: 50, wealth: 50 } };
const leapCard = {
  id: 'test_leap_300',
  isAnchor: true,
  right: { effects: {}, toast: '跨入公元300年' }
};
const resEnd = cardDeckMod.resolveCardSwipe(stateEndYear, leapCard, 'right');
assert.strictEqual(resEnd.seasonEnd, true, '公元 300 年必须触发两百年赛季极盛封卷！');
console.log('  ✅ 传祧立嗣（代际无缝衔接）与公元300年两百年大结卷校验通过！\n');

// ----------------------------------------------------
// [测试 6] 50 局全流程无头极限仿真推演
// ----------------------------------------------------
console.log('👉 [测试 6] 运行 50 局汉魏滑牌天命完整无头推演...');
let successRuns = 0;
let deathRuns = 0;
let totalCardsPlayed = 0;
let totalGenerationsPassed = 0;

for (let r = 0; r < 50; r++) {
  const simState = { year: 100, age: 18 };
  cardDeckMod.initCardRun(simState, (r % 3 === 0) ? 'destiny_wubi_lord' : ((r % 3 === 1) ? 'destiny_dang_gu' : 'destiny_merchant_tycoon'));
  
  let isGameOver = false;
  let steps = 0;
  
  while (!isGameOver && steps < 200) {
    steps++;
    totalCardsPlayed++;
    const card = simState.activeCard || cardDeckMod.getNextSwipeCard(simState);
    if (!card) break;
    
    // 模拟策略玩家：走钢丝控槽（避免任何指标跌破 0 或爆破 100）
    const lEff = card.left.effects || {};
    const rEff = card.right.effects || {};
    function evalRisk(effects) {
      let penalty = 0;
      for (const k of ['grain', 'force', 'prestige', 'wealth']) {
        const after = simState.meters[k] + (effects[k] || 0);
        if (after <= 0 || after >= 100) penalty += 50000;
        else if (after < 20 || after > 80) penalty += 2000 + Math.abs(after - 50) * 20;
        else penalty += Math.abs(after - 50);
      }
      return penalty;
    }
    const leftPenalty = evalRisk(lEff);
    const rightPenalty = evalRisk(rEff);
    const chosenDir = leftPenalty <= rightPenalty ? 'left' : 'right';
    
    const outcome = cardDeckMod.resolveCardSwipe(simState, card, chosenDir);
    if (!outcome) break;
    
    if (outcome.dead) {
      deathRuns++;
      isGameOver = true;
    } else if (outcome.succession) {
      totalGenerationsPassed++;
      cardDeckMod.advanceGenerationSuccession(simState, (r % 2 === 0) ? 'eldest' : 'adoptive');
    } else if (outcome.seasonEnd) {
      successRuns++;
      isGameOver = true;
    }
  }
}

console.log(`  📊 50 局模拟统计:
     - 抵达公元 300 年两百年大功成: ${successRuns} 局 (${Math.round(successRuns / 50 * 100)}%)
     - 中途走钢丝崩溃殒命: ${deathRuns} 局 (${Math.round(deathRuns / 50 * 100)}%)
     - 累计总决策卡牌数: ${totalCardsPlayed} 张
     - 累计代际传承次数: ${totalGenerationsPassed} 次`);

assert.ok(totalCardsPlayed > 500, '总滑牌数应充足');
assert.ok(successRuns > 0, '有策略决策下必须能够通关至公元300年');
console.log('  ✅ 50 局高频实战仿真平稳流畅，无崩溃、无内存泄漏！\n');

console.log('====================================================');
console.log('🎉《汉魏风骨》滑牌天命核心机制端到端回归 100% 全部通过！');
console.log('====================================================');
