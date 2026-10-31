/**
 * sim-core/rules.js
 * 《华夏世家》核心玩法规则硬上限与常量配置 (v3 全面合规与历史化升级)
 * 严格落实：算筹落盘检定、3幕3大劫、择嗣荐书、举荐状、族人议事、家学上限与合规术语
 */

module.exports = {
  // 单局岁月与节奏 (一代当家人，汉末 36 年)
  RUN_RULES: {
    TOTAL_ACTS: 3,                 // 3 幕
    ROUNDS_PER_ACT: 3,             // 每幕 3 个岁月回合
    TOTAL_ROUNDS: 9,               // 共 9 个普通回合
    TOTAL_CALAMITIES: 3,           // 3 次幕终大劫 (共 12 个推进节点)
    YEARS_PER_ROUND: 4,            // 每回合跨越约 4 年 (公元 146 年至 182 年至 220 年鼎革)
    START_YEAR: 146,               // 初始年份 (汉桓帝建和元年)
    START_AGE: 20,                 // 弱冠入局
    SUCCESSION_ACT: 3,             // 第三幕 (第7~9回合) 开启终局择嗣
    MIN_RETREAT_ROUND: 8,          // 第 8 回合起可主动急流勇退致仕
    RETREAT_SCORE_MULTIPLIER: 0.92 // 致仕折算当前评分 ×0.92
  },

  // 局内稀缺资源 (v3 规范命名)
  RESOURCES_CAP: {
    MAX_WILLPOWER_PER_ROUND: 3,    // 每回合心力点数严格为 3 点 (派驻事务)
    MAX_BAG_SLOTS: 4,              // 行囊严格为 4 格
    MAX_COUNTING_ROD_REROLLS: 3,   // 局内算筹落盘重筹上限 3 次 (史实算筹，合规去博彩占卜)
    FREE_SUCCESSION_REROLLS: 2,    // 局前择嗣免费另选 2 次
    MAX_RECOMMENDATION_LETTERS: 3, // 局前荐书 (原洗髓令) 单局消耗上限 3 封
    MAX_GOLD_CHEST_PER_RUN: 1,     // 一局至多带出 1 个绝品金宝箱
    MAX_RUN_CHEST_EXTRACTION: 4,   // 一局至多带出 4 个宝箱
    MAX_CLAN_RESOURCE_BUFF: 0.15,  // 宗祠底蕴树总加成上限 +15%
    // 兼容历史命名
    MAX_DESTINY_REROLL_SIGNS: 3,
    FREE_GACHA_REROLLS: 2,
    MAX_WASH_MARROW_TOKENS: 3
  },

  // 家学 (原技能卡) 装配规则
  HERITAGE_TEACHING_CONSTRAINTS: {
    MAX_TOTAL_COST: 6,             // 家学构筑消耗总和 ≤ 6 (绝品3, 极品2, 凡/良1)
    MAX_SAME_FACTION: 2,           // 同流派至多 ≤ 2 张 (四家风: 兵权, 治国, 经商, 德操)
    MAX_SLOTS_HARD_CAP: 4,         // 家学槽位物理封顶 4 (随段位 2 -> 3 -> 4)
    MAX_IN_RUN_INSIGHTS: 2,        // 局内临时顿悟家学至多 2 个 (满则替换)
    MAX_CHAIN_MULTIPLIER: 1.5      // 家学连锁效益倍率封顶 ×1.5
  },

  // 牌库与内容规则
  DECK_RULES: {
    MAX_MAINLINE_RATIO: 0.40,      // 固定主线牌占比 ≤ 40% (保证每局不同)
    HAND_OFFER_COUNT: 3            // 每回合机缘牌三选一 (含背面未知牌)
  },

  // 议事派驻事务与检定维度 (对应仕、商、武、学、守)
  DUTY_DIMENSIONS: ['officialdom', 'management', 'military', 'cultivation', 'defence'],
  WILLPOWER_DIMENSIONS: ['officialdom', 'management', 'military', 'cultivation'],

  // 家族四维基石资源
  METERS: ['prestige', 'wealth', 'force', 'grain'], // 门望、族产、部曲、粮储

  // 算筹检定等阶 (Counting Rod Tiers)
  CHECK_TIERS: {
    CRITICAL_SUCCESS: 'critical_success', // 算筹大吉 / 暴击 (停顿80ms+微震屏+金色飞尘)
    SUCCESS: 'success',                   // 检定平顺
    PARTIAL: 'partial',                   // 艰难涉险
    FAILURE: 'failure',                   // 挫折不利
    FUMBLE: 'fumble'                      // 算筹错乱 / 大失手
  },

  // 宝箱品质 (合规古风体系)
  CHEST_TIERS: {
    COMMON: 'common',       // 素 (白)
    FINE: 'fine',           // 青 (蓝)
    EPIC: 'epic',           // 紫
    LEGENDARY: 'legendary'  // 金 (绝品)
  },

  // 传嗣五种接班方式
  SUCCESSION_TYPES: {
    PRIMOGENITURE: 'primogeniture', // 嫡长接棒 (正统门望加成，保守稳健)
    ADOPTION: 'adoption',           // 过继宗子 (权术平衡，化解内耗)
    FOSTER: 'foster',               // 收纳义子 (武备破格拔擢，但需弹压忠诚)
    RETAINER: 'retainer',           // 家臣代政 (经营能手，守业极佳)
    WORTHY: 'worthy'                // 贤能居之 (综合考评，天下瞩目)
  },

  // 兼容别名导出
  SKILL_CONSTRAINTS: {
    MAX_TOTAL_COST: 6,
    MAX_SAME_FACTION: 2,
    MAX_SLOTS_HARD_CAP: 4,
    MAX_IN_RUN_INSIGHTS: 2,
    MAX_CHAIN_MULTIPLIER: 1.5
  }
};
