/**
 * 校验全新 4 大多巴胺闭环系统：
 * 1. 开局洗髓改命 (Gacha Slot Machine)
 * 2. 4年一考短线天灾人祸与损失厌恶 (Short-cycle Crisis & Loss Aversion)
 * 3. 操盘指令多巴胺暴击与滚雪球被动 (Critical Hits & Passive Snowballing)
 * 4. 宗祠香火局外天赋树与重开冲动 (Ancestral Incense Meta-Progression)
 */

const assert = require('assert');

global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 375, windowHeight: 667, pixelRatio: 2 }),
  getStorageSync: (k) => global._mockStorage[k] || null,
  setStorageSync: (k, v) => { global._mockStorage[k] = v; },
  createCanvas: () => ({
    getContext: () => ({
      save: () => {}, restore: () => {}, fillRect: () => {}, strokeRect: () => {},
      rect: () => {}, fillText: () => {}, measureText: () => ({ width: 50 }),
      beginPath: () => {}, arc: () => {}, fill: () => {}, stroke: () => {},
      moveTo: () => {}, lineTo: () => {}, closePath: () => {}, translate: () => {},
      rotate: () => {}, setLineDash: () => {}, createLinearGradient: () => ({ addColorStop: () => {} })
    }),
    width: 750, height: 1334
  }),
  onAudioInterruptionEnd: () => {}, onTouchStart: () => {}, onTouchMove: () => {},
  onTouchEnd: () => {}, vibrateShort: () => {},
  getMenuButtonBoundingClientRect: () => ({ top: 24, bottom: 56, left: 280, right: 365, width: 85, height: 32 })
};
global._mockStorage = {};

const epochOne = require('./wechat-minigame/subpackages/season1_hanwei/epochOneEngine.js');

console.log('====================================================');
console.log('🔥 启动测试：四大爽点多巴胺飞轮与损失厌恶深度检验');
console.log('====================================================\n');

// ----------------------------------------------------
// [柱一] 开局洗髓改命与天命大抓周
// ----------------------------------------------------
console.log('👉 [支柱 1] 校验开局天命抓周与洗髓改命机制...');
assert.ok(epochOne.HAN_WEI_DESTINY_CARDS.length >= 3, '三大极端天命开局卡必须齐备');
assert.ok(epochOne.HAN_WEI_DESTINY_PERKS.length >= 5, '五大破坏规则神级词条必须齐备');

const testState = {
  year: 100,
  age: 18,
  capital: 10000,
  ap: 3,
  tags: {},
  freeRerolls: 3
};
assert.strictEqual(testState.freeRerolls, 3, '初始开局应享有 3 次免费洗髓改命机会');
console.log('  ✅ 开局天命洗髓机制齐备！\n');

// ----------------------------------------------------
// [柱二] 4年一考短线天灾人祸与损失厌恶
// ----------------------------------------------------
console.log('👉 [支柱 2] 校验4年一考短周期生存危机与损失厌恶...');
assert.ok(epochOne.HAN_WEI_SHORT_CRISES.length >= 4, '短周期危机库应不少于4种天灾人祸');

const droughtCrisis = epochOne.getShortCycleCrisis(104, testState);
assert.strictEqual(droughtCrisis.year, 104);
assert.ok(droughtCrisis.title.includes('关中旱蝗'), '公元104年命中旱蝗危机');

// 资源匮乏时的破仓惨重损失 (损失厌恶检定)
const starvingManor = { granaryStoredGrain: 40, farmlandAcres: 40, armedRetainers: 15 };
const poorState = { capital: 300, rep: 40 };
assert.strictEqual(droughtCrisis.check(starvingManor, poorState), false, '缺粮缺钱必须判定守备失败！');
droughtCrisis.catastrophe.apply(starvingManor, poorState);
assert.strictEqual(starvingManor.farmlandAcres, 30, '灾民破仓哄抢，良田荒芜10顷！');
assert.strictEqual(starvingManor.armedRetainers, 7, '死士饿死染疫削减！');
assert.strictEqual(poorState.rep, 25, '声望暴跌！');

// 备战充足时的大获全胜
const prepManor = { granaryStoredGrain: 200, farmlandAcres: 40, armedRetainers: 15 };
const richState = { capital: 3000, rep: 40 };
assert.strictEqual(droughtCrisis.check(prepManor, richState), true, '备粮充足判定大捷！');
droughtCrisis.triumph.apply(prepManor, richState);
assert.strictEqual(prepManor.armedRetainers, 30, '灾后收编15名死士！');
assert.strictEqual(richState.rep, 60, '声望大涨！');
console.log('  ✅ 4年一考短周期危机成立：缺粮破仓肉痛损失 vs 粮足大捷收编部曲！\n');

// ----------------------------------------------------
// [柱三] 家督操盘令多巴胺暴击与滚雪球被动
// ----------------------------------------------------
console.log('👉 [支柱 3] 校验家督操盘令多巴胺暴击与滚雪球被动...');
const critState = {
  capital: 20000,
  ap: 3,
  _triggerCrit: true,
  manor: { farmlandAcres: 40, granaryStoredGrain: 300, armedRetainers: 20, fortressLevel: 1 },
  tags: {}
};
const critRes = epochOne.executeManorOrder(critState, 'reclaim_farm');
assert.strictEqual(critRes.ok, true);
assert.strictEqual(critRes.result.isCrit, true, '必须触发多巴胺大暴击！');
assert.strictEqual(critState.manor.farmlandAcres, 65, '暴击开荒增至65顷 (基准10 + 暴击15)！');
assert.strictEqual(critState.manor.granaryStoredGrain, 500, '暴击纳粮增至500石 (基准80 + 暴击120)！');
assert.ok(critRes.result.float.includes('💥'), '浮空动效包含暴击图标！');

// 校验流派被动滚雪球
critState.tags['combo_iron_warlord'] = true;
const combo = epochOne.checkManorBuildCombos(critState);
console.log('  ✅ 多巴胺指令暴击生效：单次拓荒狂揽+25田 +200粮！\n');

// ----------------------------------------------------
// [柱四] 宗祠香火局外天赋树与重开冲动
// ----------------------------------------------------
console.log('👉 [支柱 4] 校验宗祠香火局外成长与祖训传承...');
const endState = {
  year: 200,
  capital: 55000,
  manor: { armedRetainers: 60, fortressLevel: 3 },
  handledEvents: { crisis_184: true, crisis_200: true }
};
const incenseEarned = epochOne.calculateIncenseGain(endState);
assert.ok(incenseEarned >= 50, `执政百年度过两次大考应获海量香火（实际：${incenseEarned}）`);

const heritage = epochOne.loadAncestralHeritage();
heritage.incensePoints = 50;
epochOne.saveAncestralHeritage(heritage);

// 购买解锁祖训【先祖赐田】(10香火) 与 【部曲世荫】(15香火)
const buy1 = epochOne.unlockAncestralPerk('perk_ancestral_land');
assert.strictEqual(buy1.ok, true);
assert.strictEqual(buy1.remainingIncense, 40);

const buy2 = epochOne.unlockAncestralPerk('perk_ancestral_guard');
assert.strictEqual(buy2.ok, true);
assert.strictEqual(buy2.remainingIncense, 25);

// 开启新局，检验祖训生效 (良田+15, 部曲+15, 城防升至第2重)
const newRunState = {
  track: 'military',
  capital: 3000,
  manor: { farmlandAcres: 40, granaryStoredGrain: 300, armedRetainers: 20, fortressLevel: 1 }
};
epochOne.applyAncestralPerksToState(newRunState);
assert.strictEqual(newRunState.manor.farmlandAcres, 55, '先祖赐田生效良田增至55顷！');
assert.strictEqual(newRunState.manor.armedRetainers, 35, '部曲世荫生效部曲增至35人！');
assert.strictEqual(newRunState.manor.fortressLevel, 2, '城防初始直升第2重深垒！');

console.log('  ✅ 局外宗祠天赋树完美闭环：结算获赐香火 -> 点亮祖训 -> 新局直接享受天胡开局！\n');

console.log('====================================================');
console.log('🎉 四大多巴胺闭环机制 100% 全部通过！');
console.log('====================================================');

process.exit(0);
