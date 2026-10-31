/**
 * test_meta_service_suite.js
 * meta-service 家族服务与服务端权威层单元测试
 */

const assert = require('assert');
const {
  ClanRankLadder,
  DestinyGachaService,
  ChestUnboxingService,
  ClanTreasuryService,
  ReplayVerifier
} = require('./meta-service/index.js');
const { destinies } = require('./content/index.js');

console.log('====================================================');
console.log('🧪 单元测试：meta-service 家族服务与服务端权威重放验证');
console.log('====================================================');

// 1. 段位天梯、保级盾与晋品战
console.log('👉 [测试 1] 校验九品 27 阶晋升、保级盾抵消与晋品战...');
let clanRankState = ClanRankLadder.initRankProgress();
assert.strictEqual(clanRankState.rank, 9);
assert.strictEqual(clanRankState.subrank, 'lower');
assert.strictEqual(clanRankState.protectionShields, 2);

// S级单局：+150 门第点
const sEval = { grade: 'S', rankPointsDelta: 150 };
const r1 = ClanRankLadder.settleRunRank(clanRankState, sEval);
clanRankState = r1.updatedProgress;
assert.strictEqual(clanRankState.currentPoints, 150);

// 再来一次 S 级：满 300 点，晋升至九品中阶，并重获 2 枚盾
const r2 = ClanRankLadder.settleRunRank(clanRankState, sEval);
clanRankState = r2.updatedProgress;
assert.strictEqual(clanRankState.subrank, 'mid');
assert.strictEqual(r2.promoted, true);
assert.strictEqual(clanRankState.protectionShields, 2);

// D级扣分：有保级盾应抵消扣分，盾变为 1
const dEval = { grade: 'D', rankPointsDelta: -100 };
const rDemote = ClanRankLadder.settleRunRank(clanRankState, dEval);
clanRankState = rDemote.updatedProgress;
assert.strictEqual(rDemote.shieldUsed, true, '保级盾必须成功触发抵消');
assert.strictEqual(clanRankState.protectionShields, 1);
assert.strictEqual(clanRankState.currentPoints, 0, '点数不应被扣减');
console.log('  ✅ 段位升小阶与保级盾抵消扣分 100% 正确！');

// 2. 宿命抽卡、洗髓令与保底
console.log('👉 [测试 2] 校验局前命盘 3选1、洗髓令上限与直选名册...');
const clanGlobal = {
  washMarrowTokens: 5,
  directSelectVouchers: 1,
  gachaPity: { sinceLastEpicOrHigher: 7, sinceLastLegendary: 29 } // 马上触发双保底
};
const gachaService = new DestinyGachaService({ destinyPool: destinies, clanState: clanGlobal });
const { session, prng } = gachaService.createSession(1111);

// 此时触发保底，第 1 张必为绝品或极品
assert.strictEqual(session.currentTrio.length, 3);
assert.ok(session.currentTrio.some(c => c.quality === 'legendary' || c.quality === 'epic'));

// 重抽：免费 2 次
const reroll1 = gachaService.rerollBoard(session, prng, false);
assert.strictEqual(reroll1.mode, 'free');
const reroll2 = gachaService.rerollBoard(session, prng, false);
assert.strictEqual(reroll2.mode, 'free');

// 第 3 次需要消耗洗髓令
const reroll3 = gachaService.rerollBoard(session, prng, true);
assert.strictEqual(reroll3.mode, 'token');
assert.strictEqual(session.washTokensUsed, 1);

// 直选神卡
const directRes = gachaService.directSelectWithVoucher(session, 'destiny_golden_kirin');
assert.strictEqual(directRes.success, true);
assert.strictEqual(clanGlobal.cardCooldowns['destiny_golden_kirin'], 3, '使用后进入 3 局冷却');
console.log('  ✅ 局前抽卡、保底触发与天命直选券机制验证通过！');

// 3. 遗产宝箱评级带出与宗祠开箱
console.log('👉 [测试 3] 校验宝箱评级提现 (S/A/B/C/D) 与宗祠开箱保底...');
const mockBag = [
  { id: 'b1', name: '战匣1', tier: 'fine' },
  { id: 'b2', name: '战匣2', tier: 'epic' },
  { id: 'b3', name: '战匣3', tier: 'common' }
];

// S级：全部带出
const sExtract = ChestUnboxingService.resolveRunExtraction(mockBag, 'S');
assert.strictEqual(sExtract.extractedCount, 3);

// B级：全部没收，发放遗泽残页
const bExtract = ChestUnboxingService.resolveRunExtraction(mockBag, 'B');
assert.strictEqual(bExtract.extractedCount, 0);
assert.ok(bExtract.relicRemnants > 0, 'B级应获得遗泽残页作为保底进度');

// 宗祠开箱
const treasury = ClanTreasuryService.initTreasury();
const unboxRes = ChestUnboxingService.openChest(mockBag[0], treasury, 2222);
assert.ok(unboxRes.loot);
console.log('  ✅ 宝箱带出裁决与宗祠开箱机制验证通过！');

// 4. 宗族宝库技能卡碎片化与底蕴树加成封顶 15%
console.log('👉 [测试 4] 校验重复技能转碎片与底蕴树 +15% 封顶...');
const sk1 = { id: 'skill_test_1', name: '横扫', quality: 'epic', faction: 'military' };
const add1 = ClanTreasuryService.addSkillCard(treasury, sk1);
assert.strictEqual(add1.action, 'unlocked');
const add2 = ClanTreasuryService.addSkillCard(treasury, sk1); // 重复获得
assert.strictEqual(add2.action, 'converted_to_fragments');
assert.strictEqual(add2.fragmentsGained, 20);

// 底蕴树升级与封顶
treasury.ancestralScrolls = 10;
for (let i = 0; i < 7; i++) {
  ClanTreasuryService.upgradeHeritageTree(treasury, 'prestige');
}
assert.strictEqual(treasury.heritageBuffTree.prestige, 0.15, '底蕴树加成必须严格封顶至 +15%');
console.log('  ✅ 重复技能转碎片与底蕴加成 +15% 封顶控制完美！');

// 5. 服务端权威重放验算器
console.log('👉 [测试 5] 校验服务端 ReplayVerifier 权威重放与篡改拦截...');
const mockPayload = {
  seed: 998877,
  destinyCard: destinies[0],
  clanRank: 9,
  decisionLogs: [
    { action: 'prologue', choice: 'study' },
    { cardId: 'hw_opt_01_waterworks', willpower: { management: 3 } }
  ],
  claimedSummary: { claimedScore: 999.0 } // 恶意篡改的高分
};
const verifyFraud = ReplayVerifier.verifyAndSettle(mockPayload, { rankProgress: clanRankState });
assert.strictEqual(verifyFraud.verified, false, '篡改成绩必须被服务端识破并拦截');

// 正确上报
const correctPayload = {
  seed: 998877,
  destinyCard: destinies[0],
  clanRank: 9,
  decisionLogs: [
    { action: 'prologue', choice: 'study' },
    { cardId: 'hw_opt_01_waterworks', willpower: { management: 3 } }
  ]
};
const verifyLegit = ReplayVerifier.verifyAndSettle(correctPayload, { rankProgress: clanRankState });
assert.strictEqual(verifyLegit.verified, true, '合规日志服务端必须验算通过并权威发奖');
assert.ok(verifyLegit.authoritativeScore > 0);
console.log('  ✅ 服务端权威重放验算与反作弊机制检验通过！');

console.log('====================================================');
console.log('🎉🎉 meta-service 家族持久层与权威服务全部测试通过！');
console.log('====================================================');
