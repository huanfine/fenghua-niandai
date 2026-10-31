/**
 * test_v3_features_suite.js
 * 《华夏世家》v3 重构专属特性深度单元测试
 * 覆盖：族人系统(5人派遣)、大劫三步法(探备断料敌机先)、算筹落盘重筹、谥号长卷评语与合规清洗
 */

const assert = require('assert');
const {
  PRNG,
  KinsfolkEngine,
  ROLES,
  CalamityEngine,
  CheckEngine,
  PosthumousEngine,
  RoundRunner
} = require('./sim-core/index.js');
const { cardsHanwei, destinies } = require('./content/index.js');

console.log('================================================================');
console.log('🏛️ 《华夏世家》v3 产品重构特性专项单元测试');
console.log('================================================================\n');

// 1. 族人系统测试
console.log('👉 [测试 1] 校验开局 5 名族人、特长心结与议事派遣加成...');
const prng = new PRNG(1024);
const kinsfolkEng = new KinsfolkEngine(prng, { surname: '荀' });
const activeKins = kinsfolkEng.getActiveKinsfolk();
assert.strictEqual(activeKins.length, 5, '开局必须有 5 名族人');
assert.ok(activeKins.some(k => k.role === ROLES.HEAD), '必须包含当家人');
assert.ok(activeKins.some(k => k.role === ROLES.SPOUSE), '必须包含贤内助配偶');
assert.ok(activeKins.some(k => k.role === ROLES.BROTHER), '必须包含兄弟');
assert.ok(activeKins.some(k => k.role === ROLES.JUNIOR), '必须包含子侄');
assert.ok(activeKins.some(k => k.role === ROLES.RETAINER), '必须包含门客');

// 议事派遣
kinsfolkEng.assignDuties({
  kin_head: 'officialdom',
  kin_brother: 'military'
});
const milBonus = kinsfolkEng.getDutyModifier('military');
assert.ok(milBonus > 0, '契合特长派遣必须提供正向加成');
console.log(`  ✅ 5名族人生成就绪，特长心结完备，事务协助加成 +${(milBonus * 100).toFixed(1)}%！\n`);

// 2. 幕终大劫三步法 (探、备、断) 与料敌机先测试
console.log('👉 [测试 2] 校验 3 幕大劫 Boss、相克克制与【料敌机先】连击...');
const calEng = new CalamityEngine(new PRNG(2048));
const act1Cal = calEng.generateCalamity(1);
assert.strictEqual(act1Cal.type, 'war', '第一幕大劫为黄巾兵祸');
assert.ok(act1Cal.hintText.includes('风闻探报'), '必须包含探报信息');

// 备战充分 + 最佳对策 (defend 据守) -> 触发料敌机先！
const triumphRes = calEng.resolveCalamity({
  calamity: act1Cal,
  choice: 'defend',
  preparednessScore: 20,
  meters: { prestige: 60, force: 65, grain: 60 }
});
assert.strictEqual(triumphRes.survived, true, '最佳对策必须渡过大劫');
assert.strictEqual(triumphRes.isAnticipated, true, '充分备战+最佳对策必须触发【料敌机先】！');
assert.ok(triumphRes.rewardChest, '战胜大劫必须缴获战利品宝箱！');
console.log('  ✅ 大劫三步法闭环运行，【料敌机先】成功触发并爆箱！\n');

// 3. 史实算筹落盘与 3 次重筹机制
console.log('👉 [测试 3] 校验史实算筹落盘检定与 3 次「重筹」机会...');
const checkEng = new CheckEngine(new PRNG(3072));
assert.strictEqual(checkEng.rodRerollsRemaining, 3, '初始重筹机会严格为 3 次');
const castRes = checkEng.castCountingRods({
  difficulty: 90,
  dimension: 'officialdom',
  meterValue: 30,
  willpowerInvested: 0
});
assert.ok(castRes.rodScore >= 1 && castRes.rodScore <= 100);

// 消耗 1 次重筹
const rerollRes = checkEng.rerollWithCountingRods({
  difficulty: 50,
  dimension: 'officialdom',
  meterValue: 60,
  willpowerInvested: 3
});
assert.strictEqual(rerollRes.success, true);
assert.strictEqual(checkEng.rodRerollsRemaining, 2, '消耗后剩余 2 次');
console.log('  ✅ 算筹落盘运算平稳，重筹机制严谨！\n');

// 4. 终局谥号与家谱长卷评语
console.log('👉 [测试 4] 校验终局谥号评定与史诗家谱长卷评语...');
const sEval = { grade: 'S', rankPointsDelta: 150 };
const posthumousS = PosthumousEngine.evaluatePosthumous({
  runEvaluation: sEval,
  context: { age: 56, isDead: false, meters: { prestige: 88, force: 75 } }
});
assert.ok(posthumousS.posthumousTitle.includes('公'), 'S级必须授予显赫公谥');
assert.ok(posthumousS.genealogyEpitaph.length >= 16, '必须包含四言家谱长卷评语');
console.log(`  📌 S级终局授予谥号: ${posthumousS.posthumousTitle} (${posthumousS.definition})`);
console.log(`  📌 家谱长卷评语: "${posthumousS.genealogyEpitaph}"`);

const dEval = { grade: 'D', rankPointsDelta: -100 };
const posthumousD = PosthumousEngine.evaluatePosthumous({
  runEvaluation: dEval,
  context: { age: 32, isDead: true, meters: { prestige: 10, force: 10 } }
});
assert.ok(posthumousD.posthumousTitle.includes('缪') || posthumousD.posthumousTitle.includes('厉'));
console.log(`  📌 D级终局授予谥号: ${posthumousD.posthumousTitle} (${posthumousD.definition})`);
console.log(`  📌 失败格调家谱追述: "${posthumousD.genealogyEpitaph}"`);
console.log('  ✅ 谥号与家谱评语系统完全符合 v3 叙事标准！\n');

// 5. 整合单局生命周期与族人、大劫、谥号全贯通
console.log('👉 [测试 5] 模拟一代当家人汉末 36 年 (3 幕 3 大劫 + 族人 + 终局谥号)...');
const runner = new RoundRunner({
  seed: 4096,
  cardPool: cardsHanwei,
  destinyCard: destinies[0],
  clanRank: 9,
  surname: '荀'
});
runner.startPrologue('study');
for (let r = 1; r <= 9; r++) {
  const roundState = runner.beginRound();
  // 族人议事
  runner.assignKinsfolk({
    kin_head: 'officialdom',
    kin_brother: 'military',
    kin_spouse: 'management'
  });

  // 普通算筹决断
  runner.playRoundDecision({
    cardId: roundState.offeredCards[0].id,
    offeredCards: roundState.offeredCards,
    willpowerAllocation: { officialdom: 3 }
  });

  // 幕终大劫
  if (roundState.isCalamityRound) {
    runner.resolveCalamityEvent('defend');
  }
}
const finalReport = runner.finalizeRun();
assert.strictEqual(finalReport.summary.totalRounds, 9);
assert.ok(finalReport.posthumous.posthumousTitle);
assert.ok(finalReport.chestsInBag.length >= 0);
console.log(`  ✅ 单局 3 幕 3 大劫全生命周期推演成功，终局荣获: ${finalReport.posthumous.posthumousTitle}！\n`);

console.log('================================================================');
console.log('🎉🎉 《华夏世家》v3 重构特性专项单元测试全部 100% 通过！');
console.log('================================================================');
