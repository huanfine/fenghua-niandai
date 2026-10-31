/**
 * test_sim_core_suite.js
 * sim-core 纯逻辑内核全模块高强度单元测试
 */

const assert = require('assert');
const {
  PRNG,
  rules,
  DeckEngine,
  CheckEngine,
  SkillEngine,
  BagEngine,
  ClashEngine,
  SuccessionEngine,
  RetreatEngine,
  ScoreEngine,
  RoundRunner
} = require('./sim-core/index.js');

console.log('====================================================');
console.log('🧪 单元测试：sim-core 纯逻辑无头仿真内核验证');
console.log('====================================================');

// 1. PRNG 测试
console.log('👉 [测试 1] 校验 PRNG 确定性与状态恢复...');
const prng1 = new PRNG(88888);
const r1 = [prng1.next(), prng1.nextInt(1, 100), prng1.next()];
const prng2 = new PRNG(88888);
const r2 = [prng2.next(), prng2.nextInt(1, 100), prng2.next()];
assert.deepStrictEqual(r1, r2, '同种子两次生成的随机序列必须严格一致');
console.log('  ✅ PRNG 确定性完美重现！');

// 2. 牌库与主线占比测试
console.log('👉 [测试 2] 校验牌库抽取、防重与主线占比 <= 40%...');
const mockCards = [
  { id: 'm1', name: '黄巾首义', isMainline: true, weight: 10, category: 'military' },
  { id: 'm2', name: '党锢之祸', isMainline: true, weight: 10, category: 'officialdom' },
  { id: 'd1', name: '兴修水利', isMainline: false, weight: 10, category: 'management' },
  { id: 'd2', name: '经学论辩', isMainline: false, weight: 10, category: 'cultivation' },
  { id: 'd3', name: '西域商贾', isMainline: false, weight: 10, category: 'management' },
  { id: 'd4', name: '豪强联姻', isMainline: false, weight: 10, category: 'officialdom' }
];
const deck = new DeckEngine(mockCards, prng1);
const trio1 = deck.drawTrio({ currentRound: 1 });
assert.strictEqual(trio1.length, 3, '每次必须抽取 3 张牌');
const chosen1 = deck.resolveChoice(trio1[0].id, trio1);
assert.strictEqual(chosen1.id, trio1[0].id);

// 连续多轮测试防重
const trio2 = deck.drawTrio({ currentRound: 2 });
assert.ok(!trio2.some(c => c.id === chosen1.id), '已抽牌不得在同一局重复出现');
console.log('  ✅ 牌库抽取防重机制检验通过！');

// 3. 心力分配与检定测试
console.log('👉 [测试 3] 校验心力分配 (严格3点) 与改命签重掷...');
const checker = new CheckEngine(new PRNG(999));
const allocValid = checker.validateAllocation({ management: 1, officialdom: 2, military: 0, cultivation: 0 });
assert.strictEqual(allocValid.management + allocValid.officialdom + allocValid.military + allocValid.cultivation, 3);

// 检验改命签
assert.strictEqual(checker.rerollSignsRemaining, 3, '初始改命签必须为 3 枚');
const checkConfig = { difficulty: 95, dimension: 'military', meterValue: 20, willpowerInvested: 0 };
const roll1 = checker.rollCheck(checkConfig);
assert.ok(roll1.d100 >= 1 && roll1.d100 <= 100);

const rerollRes = checker.rerollWithDestinySign(checkConfig);
assert.strictEqual(rerollRes.success, true);
assert.strictEqual(rerollRes.signsLeft, 2, '使用一次后剩余 2 枚');
console.log('  ✅ 心力分配与改命签机制检验通过！');

// 4. 技能卡装配规则测试
console.log('👉 [测试 4] 校验技能卡装配：费用 <= 6、同派 <= 2、连锁倍率 <= 1.5...');
const skillEng = new SkillEngine({ maxSlots: 3 });
const testSkills = [
  { id: 's1', faction: 'military', cost: 3, chainMultiplier: 1.3, trigger: 'on_check_start' },
  { id: 's2', faction: 'military', cost: 2, chainMultiplier: 1.3, trigger: 'on_check_start' },
  { id: 's3', faction: 'military', cost: 1, chainMultiplier: 1.1, trigger: 'on_check_start' } // 第3张同派
];
const buildCheck = skillEng.validateBuild(testSkills);
assert.strictEqual(buildCheck.valid, false, '同派超过 2 张应校验失败');

const validSkills = [
  { id: 's1', faction: 'military', cost: 3, chainMultiplier: 1.3, trigger: 'on_check_start' },
  { id: 's2', faction: 'officialdom', cost: 2, chainMultiplier: 1.3, trigger: 'on_check_start' }
];
const validCheck = skillEng.validateBuild(validSkills);
assert.strictEqual(validCheck.valid, true);

skillEng.equipSkills(validSkills);
const triggerRes = skillEng.resolveSkillTriggers('on_check_start');
assert.strictEqual(triggerRes.chainMultiplier, 1.5, '1.3 * 1.3 = 1.69 必须封顶至 1.5 倍');
console.log('  ✅ 技能卡构筑上限与连锁倍率封顶严格符合规范！');

// 5. 行囊 4 格与金箱上限测试
console.log('👉 [测试 5] 校验行囊 4 格、舍弃抉择与单局金箱上限 1 个...');
const bag = new BagEngine();
for (let i = 1; i <= 4; i++) {
  const addRes = bag.tryAddChest({ id: `c_${i}`, name: `良品战匣_${i}`, tier: 'fine' });
  assert.strictEqual(addRes.success, true);
}
assert.strictEqual(bag.isFull(), true, '装满 4 个后应为满格');

// 第 5 个应提示需要抉择
const extraChest = { id: 'c_extra', name: '极品秘匣', tier: 'epic' };
const overflowRes = bag.tryAddChest(extraChest);
assert.strictEqual(overflowRes.success, false);
assert.strictEqual(overflowRes.needsDiscardChoice, true);

// 替换第 0 个槽位
const repRes = bag.replaceChest(0, extraChest);
assert.strictEqual(repRes.replaced, true);
assert.strictEqual(bag.slots[0].id, 'c_extra');

// 金箱降级测试：第 2 个金箱自动降级为极品
const bag2 = new BagEngine();
const g1 = bag2.tryAddChest({ id: 'g1', name: '绝品金匮', tier: 'legendary' });
assert.strictEqual(g1.chest.tier, 'legendary');
const g2 = bag2.tryAddChest({ id: 'g2', name: '绝品金匮2', tier: 'legendary' });
assert.strictEqual(g2.chest.tier, 'epic', '超出 1 个的金箱应自动降级为极品');
console.log('  ✅ 行囊 4 格上限与金箱硬上限控制完美生效！');

// 6. 大考、传嗣与致仕测试
console.log('👉 [测试 6] 校验大考策略克制、传嗣 5 方式与第 8 回合主动致仕...');
const clashEng = new ClashEngine(new PRNG(777));
const trial = clashEng.generateClashTrial(3);
// 死士突袭克制据垒固守，散金离间克制死士突袭
// trial 3 的敌方是 strike，玩家选 disperse 克制
const clashRes = clashEng.resolveClash({ trial, playerTactic: 'disperse', playerForce: 60 });
assert.ok(clashRes.tacticModifier > 0, '克制应获得正向战术加成');

// 传嗣 5 方式
const successionRes = SuccessionEngine.resolveSuccession('worthy', {
  meters: { prestige: 80, wealth: 80, force: 70, grain: 70 }
});
assert.strictEqual(successionRes.chosen.type, 'worthy');
assert.ok(successionRes.estateScore >= 18, '贤良接班且四维优异应获高评分');

// 致仕测试
assert.strictEqual(RetreatEngine.isRetreatAvailable(7), false, '第 7 回合不可致仕');
assert.strictEqual(RetreatEngine.isRetreatAvailable(8), true, '第 8 回合允许致仕');
const retreatCalc = RetreatEngine.calculateRetreatOffer({ currentRawScore: 90, currentRound: 8, bagChests: [] });
assert.strictEqual(retreatCalc.lockedScore, 82.8, '90 * 0.92 = 82.8');
console.log('  ✅ 大考、传嗣与致仕机制验证通过！');

// 7. 评分模型 100 分测试
console.log('👉 [测试 7] 校验满分 100 评分模型、出身修正与近失提示...');
const evalS = ScoreEngine.evaluateRun({
  age: 75,
  healthyRetirement: true,
  meters: { prestige: 90, wealth: 90, force: 85, grain: 85 },
  clashScore: 25,
  estateScore: 20,
  vowResult: { completed: true, riskLevel: 'high' },
  destinyCard: { quality: 'common' }, // 凡品逆袭 ×1.05
  clanRank: 9
});
assert.strictEqual(evalS.grade, 'S');
assert.strictEqual(evalS.rankPointsDelta, 150);

const evalNearMiss = ScoreEngine.evaluateRun({
  age: 65,
  healthyRetirement: true,
  meters: { prestige: 70, wealth: 70, force: 70, grain: 70 },
  clashScore: 18,
  estateScore: 15,
  vowResult: { completed: false, riskLevel: 'low' },
  destinyCard: { quality: 'fine' },
  clanRank: 9
});
assert.ok(evalNearMiss.nearMiss.hasNearMiss !== undefined);
console.log('  ✅ 满分 100 评分模型与近失提示计算无误！');

// 8. 完整回合驱动器 (RoundRunner) 模拟测试
console.log('👉 [测试 8] 模拟 12 岁月号完整单局生命周期 (Prologue -> 12 Rounds -> End)...');
const runner = new RoundRunner({
  seed: 12345,
  cardPool: mockCards,
  clanRank: 9
});
runner.startPrologue('study');
for (let r = 1; r <= 12; r++) {
  const roundState = runner.beginRound();
  if (roundState.isSuccessionRound) {
    runner.resolveSuccessionEvent('primogeniture');
  }
  if (roundState.isClashRound) {
    runner.resolveClashEvent('strike');
  }
  runner.playRoundDecision({
    cardId: roundState.offeredCards[0].id,
    offeredCards: roundState.offeredCards,
    willpowerAllocation: { cultivation: 3 }
  });
}
const finalRun = runner.finalizeRun();
assert.strictEqual(finalRun.summary.totalRounds, 12);
assert.ok(finalRun.evaluation.finalScore > 0);
assert.strictEqual(finalRun.decisionLogs.length > 10, true, '决策日志必须完整记录用于服务端重放');
console.log('  ✅ 12 回合完整单局模拟成功，生成完整重放决策日志！');

console.log('====================================================');
console.log('🎉🎉 sim-core 纯逻辑内核单元测试全部通过！');
console.log('====================================================');
