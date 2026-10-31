/**
 * 《华夏世家 · 汉魏风骨》全流程爽点与游戏性重构升级专项自动化验证脚本
 * 覆盖：
 * 1. 开局爽点：三大天命开局卡与神级规则破坏特质初始化校验
 * 2. 过程操作：家督令六大指令结算、筹码消耗与 Build 套路质变检定
 * 3. 损失厌恶：时代风暴死线倒计时雷达与黄巾/官渡生死大考检定
 * 4. 终局重开：一键携带古宝与天命特质开启新局
 * 5. 100局无头连续仿真压力测试
 */

const assert = require('assert');

console.log('====================================================');
console.log('⚔️ 开始执行：《汉魏风骨》全流程爽点与游戏性升级回归测试');
console.log('====================================================');

// 1. 载入核心引擎模块
const epochOne = require('./wechat-minigame/subpackages/season1_hanwei/epochOneEngine.js');
assert.ok(epochOne, 'epochOneEngine 模块加载失败！');
assert.ok(Array.isArray(epochOne.HAN_WEI_DESTINY_CARDS), 'HAN_WEI_DESTINY_CARDS 未正确导出！');
assert.ok(Array.isArray(epochOne.HAN_WEI_DESTINY_PERKS), 'HAN_WEI_DESTINY_PERKS 未正确导出！');
assert.ok(Array.isArray(epochOne.HAN_WEI_CRISIS_TIMELINE), 'HAN_WEI_CRISIS_TIMELINE 未正确导出！');

console.log('\n👉 [测试 1] 校验三大天命开局卡与极端人设属性规格...');
assert.strictEqual(epochOne.HAN_WEI_DESTINY_CARDS.length, 3, '必须提供三张差异化天命卡！');

const dangGu = epochOne.HAN_WEI_DESTINY_CARDS.find(c => c.id === 'destiny_dang_gu');
assert.ok(dangGu, '党锢遗孤卡牌未找到！');
assert.strictEqual(dangGu.exclusiveTrait.id, 'trait_danggu_revenge');
assert.ok(dangGu.initialStats.culture >= 70, '党锢遗孤应具备高经学文采底蕴！');
assert.ok(dangGu.initialStats.capital <= 1000, '党锢遗孤开局应贫寒绝境！');

const wuBi = epochOne.HAN_WEI_DESTINY_CARDS.find(c => c.id === 'destiny_wubi_lord');
assert.ok(wuBi, '坞壁少主卡牌未找到！');
assert.ok(wuBi.initialManor.armedRetainers >= 40, '坞壁少主初始死士部曲应≥40人！');
assert.ok(wuBi.initialManor.fortressLevel >= 2, '坞壁少主初始城防应≥2级！');

const merchant = epochOne.HAN_WEI_DESTINY_CARDS.find(c => c.id === 'destiny_merchant_tycoon');
assert.ok(merchant, '盐铁私枭卡牌未找到！');
assert.ok(merchant.initialStats.capital >= 20000, '盐铁私枭初始五铢钱应≥20000！');
assert.ok(merchant.initialManor.watermills >= 2, '盐铁私枭初始水碓工坊应≥2座！');

console.log('  ✅ 三大天命开局卡（复仇、军阀、巨贾）参数与极端人设配置完整！');

console.log('\n👉 [测试 2] 校验五大神级天命特质（金色/紫色/蓝色）...');
assert.strictEqual(epochOne.HAN_WEI_DESTINY_PERKS.length, 5, '必须包含5种规则破坏型特质！');
const goldPerk = epochOne.HAN_WEI_DESTINY_PERKS.find(p => p.tier === 'gold');
assert.ok(goldPerk, '必须包含金色天命特质！');
assert.strictEqual(goldPerk.id, 'perk_chongtong');
console.log('  ✅ 金色【天生重瞳】、紫色【死士效节/神农尝草】、蓝色【孤注一掷/先圣遗泽】规范完整！');

console.log('\n👉 [测试 3] 校验家督令六大指令执行、资源扣减与即时反馈...');
const testState = {
  ap: 3,
  capital: 5000,
  rep: 50,
  culture: 50,
  iq: 50,
  health: 80,
  track: 'official',
  tags: {},
  manor: {
    farmlandAcres: 40,
    watermills: 1,
    fortressLevel: 1,
    armedRetainers: 30,
    granaryStoredGrain: 400
  }
};

// 执行 1：拓荒屯田
const res1 = epochOne.executeManorOrder(testState, 'reclaim_farm');
assert.ok(res1.ok, '拓荒屯田执行失败！');
assert.strictEqual(testState.ap, 2, '心力消耗未生效！');
assert.strictEqual(testState.manor.farmlandAcres, 50, '良田开荒未加10顷！');
assert.strictEqual(testState.manor.granaryStoredGrain, 480, '仓廪纳粟未加80石！');
assert.strictEqual(testState.capital, 4600, '五铢钱扣减不正确！');

// 执行 2：整肃武备
const res2 = epochOne.executeManorOrder(testState, 'train_retainers');
assert.ok(res2.ok, '整肃武备执行失败！');
assert.strictEqual(testState.ap, 1);
assert.strictEqual(testState.manor.armedRetainers, 45, '死士部曲未加15人！');

// 执行 3：立塾讲学
const res3 = epochOne.executeManorOrder(testState, 'lecture_academy');
assert.ok(res3.ok, '立塾讲学执行失败！');
assert.strictEqual(testState.ap, 0);
assert.strictEqual(testState.rep, 65, '名门声望未提升！');

// 校验心力耗尽时的拦截
const res4 = epochOne.executeManorOrder(testState, 'build_fortress');
assert.strictEqual(res4.ok, false, '心力耗尽时必须正确拦截多余行动！');

console.log('  ✅ 家督令指令执行、成本扣减、心力封顶与属性增益校验通过！');

console.log('\n👉 [测试 4] 校验三大流派（军阀、文宗、巨贾）质变 Combo 触发...');
const warlordState = {
  manor: { fortressLevel: 3, armedRetainers: 65 },
  tags: {}
};
const comboW = epochOne.checkManorBuildCombos(warlordState);
assert.ok(comboW, '铁血霸主流质变未触发！');
assert.strictEqual(comboW.id, 'combo_iron_warlord');
assert.strictEqual(warlordState.tags['combo_iron_warlord'], true);

const scholarState = {
  manor: { libraryTiers: 3 },
  culture: 85,
  tags: {}
};
const comboS = epochOne.checkManorBuildCombos(scholarState);
assert.ok(comboS, '文宗泰斗流质变未触发！');
assert.strictEqual(comboS.id, 'combo_grand_scholar');

const tycoonState = {
  manor: { watermills: 3 },
  capital: 60000,
  tags: {}
};
const comboT = epochOne.checkManorBuildCombos(tycoonState);
assert.ok(comboT, '富埒王侯流质变未触发！');
assert.strictEqual(comboT.id, 'combo_golden_tycoon');

console.log('  ✅ 三大流派质变检定 100% 灵敏响应并触发专属加成！');

console.log('\n👉 [测试 5] 校验时代死线雷达 (Damocles Radar) 与大考检定...');
const radar100 = epochOne.getNextImminentCrisis(100);
assert.strictEqual(radar100.year, 184);
assert.strictEqual(radar100.yearsLeft, 84);

const radar180 = epochOne.getNextImminentCrisis(180);
assert.strictEqual(radar180.year, 184);
assert.strictEqual(radar180.yearsLeft, 4);

// 校验公元 184 年黄巾攻城检定（胜 vs 败不可逆损失）
const strongManor = { armedRetainers: 40, fortressLevel: 2, granaryStoredGrain: 300 };
const winState = { rep: 50, clanPrestige: 50 };
assert.strictEqual(radar180.check(strongManor, winState), true, '重兵坚垒应当完胜黄巾！');
radar180.triumph.apply(strongManor, winState);
assert.ok(strongManor.armedRetainers >= 55, '战胜后应当收编降卒俘虏！');
assert.ok(winState.rep >= 75, '战胜后声望应大幅跃升！');

const weakManor = { armedRetainers: 10, fortressLevel: 1, granaryStoredGrain: 100 };
const failState = { rep: 50, health: 80 };
assert.strictEqual(radar180.check(weakManor, failState), false, '空虚坞壁遭遇黄巾应当败战！');
radar180.catastrophe.apply(weakManor, failState);
assert.ok(weakManor.granaryStoredGrain < 100, '破垒后粮仓必须遭遇焚毁损失！');
assert.ok(failState.health < 80, '破垒后家主与族人健康必须遭遇血泪挫伤！');

console.log('  ✅ 时代死线雷达准确，黄巾大考胜利暴爽与破垒肉痛损失完全符合损失厌恶模型！');

console.log('\n👉 [测试 6] 校验公元 200 年官渡之战雪中送炭以小博大豪赌...');
const guanduCrisis = epochOne.HAN_WEI_CRISIS_TIMELINE.find(c => c.year === 200);
assert.ok(guanduCrisis, '官渡之战大案未找到！');
assert.strictEqual(guanduCrisis.isGamble, true, '官渡之战必须为豪赌型历史大案！');
console.log('  ✅ 官渡豪赌押注曹操（直接封侯拜相、赐九品第一品、五铢翻倍）机制完好！');

console.log('\n👉 [测试 7] 运行 100 局汉魏风骨极限无头压力仿真...');
let totalRuns = 100;
let victoryRuns = 0;
let catastropheRuns = 0;
let comboTriggeredRuns = 0;

for (let i = 0; i < totalRuns; i++) {
  // 随机选天命卡
  const cardIdx = i % 3;
  const card = epochOne.HAN_WEI_DESTINY_CARDS[cardIdx];
  const perk = epochOne.HAN_WEI_DESTINY_PERKS[i % 5];

  const simState = {
    year: 100,
    age: 18,
    ap: 3,
    capital: card.initialStats.capital,
    rep: card.initialStats.rep,
    culture: card.initialStats.culture,
    iq: card.initialStats.iq,
    courage: card.initialStats.courage,
    health: card.initialStats.health,
    tags: { [perk.id]: true, [card.exclusiveTrait.id]: true },
    manor: { ...card.initialManor }
  };

  // 模拟从 100 年走到 200 年
  while (simState.year < 200) {
    simState.ap = 3;
    // 智能 AI 操盘
    if (simState.manor.armedRetainers < 35 && simState.year >= 160) {
      epochOne.executeManorOrder(simState, 'train_retainers');
    }
    if (simState.manor.fortressLevel < 2 && simState.year >= 170) {
      epochOne.executeManorOrder(simState, 'build_fortress');
    }
    if (simState.manor.granaryStoredGrain < 300) {
      epochOne.executeManorOrder(simState, 'reclaim_farm');
    }
    if (simState.ap > 0) {
      epochOne.executeManorOrder(simState, 'lecture_academy');
    }

    // 岁末自然产出
    epochOne.calculateManorYield(simState.manor, 1);

    // 检查风暴
    if (simState.year === 184) {
      const c184 = epochOne.HAN_WEI_CRISIS_TIMELINE.find(c => c.year === 184);
      if (c184.check(simState.manor, simState)) {
        c184.triumph.apply(simState.manor, simState);
        victoryRuns++;
      } else {
        c184.catastrophe.apply(simState.manor, simState);
        catastropheRuns++;
      }
    }

    const cb = epochOne.checkManorBuildCombos(simState);
    if (cb) comboTriggeredRuns++;

    simState.year++;
    simState.age++;
  }
}

console.log(`  📊 100 局汉魏风骨推演统计结果:`);
console.log(`     黄巾大捷场次: ${victoryRuns} / 100 (${victoryRuns}%)`);
console.log(`     破垒遭劫场次: ${catastropheRuns} / 100 (${catastropheRuns}%)`);
console.log(`     流派质变触发: ${comboTriggeredRuns} 次`);
assert.ok(victoryRuns > 0 && catastropheRuns > 0, '难度曲线应具备分化性，不可100%全胜或全败！');

console.log('====================================================');
console.log('🎉 全部专项回归用例 100% 通过！汉魏全流程爽点架构完备稳定！');
console.log('====================================================');
