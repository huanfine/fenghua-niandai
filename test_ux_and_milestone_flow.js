/**
 * test_ux_and_milestone_flow.js
 * 验证极简上手、阶段目标指引、大卡交互与正向反馈闭环
 */

const assert = require('assert');
const fs = require('fs');
const path = require('path');

// 注入微信小游戏模拟环境
global.wx = {
  getSystemInfoSync: () => ({ screenWidth: 375, screenHeight: 667, pixelRatio: 2 }),
  getStorageSync: () => null,
  setStorageSync: () => {},
  createCanvas: () => ({
    getContext: () => ({
      save: () => {},
      restore: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fill: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      clearRect: () => {},
      fillText: () => {},
      measureText: (txt) => ({ width: (txt || '').length * 10 }),
      createLinearGradient: () => ({ addColorStop: () => {} }),
      arc: () => {},
      arcTo: () => {},
      closePath: () => {}
    })
  })
};

console.log('====================================================');
console.log('🎯 启动测试：极简上手体验、阶段目标与多巴胺核心闭环');
console.log('====================================================\n');

const epochOne = require('./wechat-minigame/subpackages/season1_hanwei/epochOneEngine.js');

// 1. 测试阶段目标管线完整性
console.log('👉 [测试 1] 校验阶段目标管线 (HAN_WEI_MILESTONE_QUESTS)...');
assert(epochOne.HAN_WEI_MILESTONE_QUESTS.length >= 4, '必须有至少4个渐进阶段目标');
assert.strictEqual(epochOne.HAN_WEI_MILESTONE_QUESTS[0].id, 'quest_1_food');
assert.strictEqual(epochOne.HAN_WEI_MILESTONE_QUESTS[1].id, 'quest_2_force');
assert.strictEqual(epochOne.HAN_WEI_MILESTONE_QUESTS[2].id, 'quest_3_fortress');
assert.strictEqual(epochOne.HAN_WEI_MILESTONE_QUESTS[3].id, 'quest_4_crisis_184');
console.log('  ✅ 阶段目标分级严密（辟地拓粮 ➔ 编练部曲 ➔ 坞壁深垒 ➔ 决战黄巾）！');

// 2. 模拟新玩家建角入世盘面
console.log('\n👉 [测试 2] 模拟新玩家公元100年进入游戏...');
const testState = {
  year: 100,
  age: 18,
  selectedBirthYear: 100,
  rep: 50,
  capital: 5000,
  ap: 3,
  manor: epochOne.initManor('military', { farmlandAcres: 30, armedRetainers: 15, granaryStoredGrain: 240, fortressLevel: 1 })
};

// 检查第一阶段目标
let quest = epochOne.getCurrentMilestoneQuest(testState);
assert.strictEqual(quest.id, 'quest_1_food');
assert.strictEqual(quest.isCompleted, false, '初始存粮240石，未达300石');
assert.strictEqual(quest.recommendedOrder, 'reclaim_farm', '第一阶段首选策令为拓荒屯田');
console.log(`  ✅ 初始阶段目标准确: 【${quest.title}】 存粮: ${quest.current}/${quest.targetVal}${quest.unit} (进度: ${(quest.progress * 100).toFixed(0)}%)`);
console.log(`  ✅ 首选策令引导: 【${quest.hint}】`);

// 3. 执行首选策令：拓荒屯田
console.log('\n👉 [测试 3] 玩家点击【🌾 拓荒屯田】消耗1点心力...');
testState._enableOrderCrits = true;
const resOrder = epochOne.executeManorOrder(testState, 'reclaim_farm');
assert(resOrder.ok, '拓荒指令应成功执行');
assert.strictEqual(testState.ap, 2, '心力消耗1点，剩余2点');
console.log(`  ✅ 执行结果: ${resOrder.result.msg} (${resOrder.result.float})`);
console.log(`  ✅ 当前存粮达: ${testState.manor.granaryStoredGrain} 石`);

// 4. 再次拓荒直到目标达成
if (testState.manor.granaryStoredGrain < 300) {
  epochOne.executeManorOrder(testState, 'reclaim_farm');
}
quest = epochOne.getCurrentMilestoneQuest(testState);
assert(testState.manor.granaryStoredGrain >= 300, '存粮应已超过300石');
assert.strictEqual(quest.isCompleted, true, '第一阶段目标应达成');
console.log(`  ✅ 阶段目标达成！进度: ${(quest.progress * 100).toFixed(0)}%，状态: 🎉 目标达成！可领封赏`);

// 5. 领取阶段封赏
console.log('\n👉 [测试 4] 玩家点击【✦ 领封赏 ➔ 】...');
const oldCap = testState.capital;
const oldRep = testState.rep;
const claimRes = epochOne.checkAndClaimMilestoneQuest(testState);
assert(claimRes.claimed, '必须成功领取');
assert(testState.capital > oldCap, '资本应获得封赏增益');
assert(testState.rep > oldRep, '门望应获得封赏增益');
console.log(`  ✅ 封赏落袋：五铢 +${testState.capital - oldCap}，门望 +${testState.rep - oldRep}！`);

// 6. 验证无缝自动推进到第二阶段目标
const nextQuest = epochOne.getCurrentMilestoneQuest(testState);
assert.strictEqual(nextQuest.id, 'quest_2_force', '应自动切换至第二阶段【编练部曲】');
assert.strictEqual(nextQuest.recommendedOrder, 'train_retainers', '推荐策令应动态变为整肃部曲');
console.log(`  ✅ 下一阶段无缝解锁: 【${nextQuest.title}】 指标: ${nextQuest.targetLabel} ${nextQuest.current}/${nextQuest.targetVal}${nextQuest.unit}`);
console.log(`  ✅ 推荐策令即刻同步高亮: 【${nextQuest.recommendedOrder}】`);

console.log('\n====================================================');
console.log('🎉 极简上手与阶段目标自动化测试 100% 全部通过！');
console.log('====================================================\n');
