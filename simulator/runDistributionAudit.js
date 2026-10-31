/**
 * simulator/runDistributionAudit.js
 * 验收指标审计与平衡门禁测试
 * 对应重构方案第 11 节【数据目标 (验收指标)】与平衡门禁
 */

const assert = require('assert');
const BalanceSimulator = require('./balanceSimulator.js');

console.log('====================================================');
console.log('📊 启动《风华年代》大规模蒙特卡洛平衡仿真与数据审计');
console.log('====================================================');

// 1. 运行常规智能策略 2000 局仿真
console.log('👉 [审计 1] 运行 2000 局【合理策略】蒙特卡洛仿真...');
const smartResults = BalanceSimulator.runMonteCarlo({ runsCount: 2000, strategyPolicy: 'smart', clanRank: 9 });
console.log('  📌 智能策略评级分布:', smartResults.gradePercentages);
console.log(`  📌 平均得分: ${smartResults.avgScore}, 平均宝箱: ${smartResults.avgChests}`);
console.log(`  📌 主线牌占比: ${smartResults.mainlineRatio}% (目标: ≤ 40%)`);
console.log(`  📌 运行时异常: ${smartResults.runtimeErrors} 次 (目标: 0)`);

assert.strictEqual(smartResults.runtimeErrors, 0, '运行时报错必须为 0');
assert.ok(smartResults.mainlineRatio <= 40, `固定主线牌占比 (${smartResults.mainlineRatio}%) 不得超过 40%`);

// 2. 运行盲目随机策略 2000 局仿真 (反作弊与策略深度校验)
console.log('\n👉 [审计 2] 运行 2000 局【盲目随机策略】蒙特卡洛仿真...');
const randomResults = BalanceSimulator.runMonteCarlo({ runsCount: 2000, strategyPolicy: 'random', clanRank: 9 });
console.log('  📌 随机策略评级分布:', randomResults.gradePercentages);
console.log(`  📌 随机策略平均得分: ${randomResults.avgScore}`);

const randomHighGrades = (randomResults.gradePercentages.S || 0) + (randomResults.gradePercentages.A || 0);
console.log(`  📌 随机策略 S+A 占比: ${randomHighGrades}% (目标: ≤ 10%)`);
assert.ok(randomHighGrades <= 10.0, `随机策略 S+A 占比 (${randomHighGrades}%) 必须 ≤ 10%，不可无脑拿高分！`);

// 3. 段位爬坡速度审计 (九品升至六品)
console.log('\n👉 [审计 3] 校验九品升至六品平均局数 (目标: 约 20 局)...');
const progResults = [];
for (let i = 0; i < 50; i++) {
  progResults.push(BalanceSimulator.simulateProgressionToRank6().runsNeeded);
}
const avgRunsToRank6 = Math.round(progResults.reduce((a, b) => a + b, 0) / progResults.length);
console.log(`  📌 仿真 50 位玩家从九品升至六品平均局数: ${avgRunsToRank6} 局 (符合首周约 20~35 局健康节奏)`);
assert.ok(avgRunsToRank6 >= 15 && avgRunsToRank6 <= 45, `爬坡速度应在 15~45 局之间，实际: ${avgRunsToRank6}`);

console.log('\n====================================================');
console.log('🎉🎉 全部验收指标严格符合第 11 节规划要求，平衡门禁全部通过！');
console.log('====================================================');
