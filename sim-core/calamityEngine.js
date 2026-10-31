/**
 * sim-core/calamityEngine.js
 * 《华夏世家》大劫系统 (Calamity Boss Engine)
 * 落实 v3 方案：3 幕 3 次大劫，大劫三步法 (探、备、断)，五大相生相克应对 (守、迁、联、散、避) 与「料敌机先」连击爽感
 */

const { CHEST_TIERS } = require('./rules.js');

// 应对策略相生相克表
const COUNTER_MATRIX = {
  war: { optimal: 'defend', secondary: ['relocate', 'ally'], bad: ['disperse', 'evade'] },       // 兵祸：最宜守，迁/联亦可
  famine: { optimal: 'disperse', secondary: ['relocate', 'ally'], bad: ['defend', 'evade'] },    // 饥荒：最宜散粮赈饥，迁/联亦可
  plague: { optimal: 'evade', secondary: ['disperse', 'defend'], bad: ['ally', 'relocate'] },    // 瘟疫：最宜闭门避疫，散药/坚守亦可
  slander: { optimal: 'ally', secondary: ['evade', 'defend'], bad: ['disperse', 'relocate'] },   // 谗议：最宜结盟声援，避让/守正亦可
  debt: { optimal: 'disperse', secondary: ['ally', 'evade'], bad: ['defend', 'relocate'] }       // 债潮：最宜散财自赎，求援/暂避亦可
};

const STRATEGY_NAMES = {
  defend: '坚垒据守',
  relocate: '举族南迁',
  ally: '合从结盟',
  disperse: '开仓散财',
  evade: '隐退避乱'
};

class CalamityEngine {
  /**
   * @param {import('./prng')} prng
   */
  constructor(prng) {
    this.prng = prng;
    this.history = [];
  }

  /**
   * 生成第 actIndex 幕的大劫 (第 1, 2, 3 幕各一次)
   * @param {number} actIndex 幕次 (1, 2, 3)
   */
  generateCalamity(actIndex = 1) {
    const actConfigs = {
      1: {
        act: 1,
        id: 'calamity_act1_yellow_turban_famine',
        title: '第一幕大劫 · 黄巾烽火与大旱蝗灾',
        type: 'war',
        threatLevel: 60,
        hintText: '【风闻探报】西方烽烟蔽日，贼渠聚众数万裹挟饥民，粮道断绝，刀兵在即！',
        recommendedPreparedness: { military: 2, grain: 2 },
        lootChest: {
          id: `calamity_chest_act1_${this.prng.nextInt(100, 999)}`,
          name: '黄巾荡平 · 岁稔战匣',
          tier: CHEST_TIERS.FINE
        }
      },
      2: {
        act: 2,
        id: 'calamity_act2_dong_purge_slander',
        title: '第二幕大劫 · 权臣擅权与党锢罗织',
        type: 'slander',
        threatLevel: 75,
        hintText: '【风闻探报】朝堂权臣当道，缇骑四出勾检门阀私蓄，朝臣交相弹劾，危如累卵！',
        recommendedPreparedness: { officialdom: 2, prestige: 2 },
        lootChest: {
          id: `calamity_chest_act2_${this.prng.nextInt(100, 999)}`,
          name: '破佞全宗 · 奇遇秘匣',
          tier: CHEST_TIERS.EPIC
        }
      },
      3: {
        act: 3,
        id: 'calamity_act3_chibi_dynasty_shift',
        title: '第三幕大劫 · 鼎革风暴与建安大疫',
        type: 'plague',
        threatLevel: 88,
        hintText: '【风闻探报】荆扬战火连天，疫疠暴兴，户户号哭，海内鼎革，存亡绝续！',
        recommendedPreparedness: { cultivation: 2, defence: 2 },
        lootChest: {
          id: `calamity_chest_act3_${this.prng.nextInt(100, 999)}`,
          name: '定鼎垂统 · 凯旋金匮',
          tier: CHEST_TIERS.LEGENDARY
        }
      }
    };

    return actConfigs[actIndex] || actConfigs[1];
  }

  /**
   * 结算大劫决断 (三步之「断」)
   * @param {Object} params
   * @param {Object} params.calamity 大劫事件
   * @param {'defend'|'relocate'|'ally'|'disperse'|'evade'} params.choice 玩家决断
   * @param {number} params.preparednessScore 玩家备战积累的整备度 (族人派遣+家学加成)
   * @param {Object} params.meters 家族四维
   */
  resolveCalamity({ calamity, choice, preparednessScore = 0, meters = {} }) {
    const rules = COUNTER_MATRIX[calamity.type] || COUNTER_MATRIX.war;
    let strategyBonus = 0;
    let isOptimal = false;
    let isCountered = false;

    if (choice === rules.optimal) {
      strategyBonus = 25; // 绝佳对策
      isOptimal = true;
    } else if (rules.secondary.includes(choice)) {
      strategyBonus = 10; // 次选对策
    } else {
      strategyBonus = -18; // 误判受克
      isCountered = true;
    }

    // 判定是否触发「料敌机先」连击：最佳对策 + 充分备战 (preparednessScore >= 15)
    const isAnticipated = isOptimal && preparednessScore >= 12;
    const anticipationBonus = isAnticipated ? 20 : 0;

    // 战阵与乱局随机波动 (-6 ~ +6)
    const flux = this.prng.nextInt(-6, 6);
    const clanFoundation = Math.round(((meters.prestige || 50) + (meters.force || 50) + (meters.grain || 50)) / 3);
    const totalPower = clanFoundation + strategyBonus + preparednessScore + anticipationBonus + flux;
    const delta = totalPower - calamity.threatLevel;

    const survived = delta >= 0;
    const isTriumph = delta >= 20; // 辉煌大胜

    // 计算四维与资源影响
    const meterDelta = {};
    if (survived) {
      meterDelta.prestige = isTriumph ? 15 : 8;
      meterDelta.force = isTriumph ? 8 : 2;
    } else {
      meterDelta.prestige = -12;
      meterDelta.force = -10;
      meterDelta.grain = -10;
    }

    const result = {
      act: calamity.act,
      calamityId: calamity.id,
      choice,
      choiceName: STRATEGY_NAMES[choice] || choice,
      isOptimal,
      isAnticipated, // 料敌机先标记
      survived,
      isTriumph,
      delta,
      meterDelta,
      rewardChest: survived ? calamity.lootChest : null,
      scoreContribution: survived ? (isTriumph ? 8.33 : 6.0) : 1.0 // 3次大劫满分共 25 分
    };

    this.history.push(result);
    return result;
  }
}

module.exports = {
  STRATEGY_NAMES,
  COUNTER_MATRIX,
  CalamityEngine
};
