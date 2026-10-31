/**
 * sim-core/rules.js
 * 《风华年代》核心玩法规则硬上限与常量配置
 * 严格依据《风华年代全局重构方案：稀缺·不确定·爽感》编写。
 */

module.exports = {
  // 单局岁月与节奏
  RUN_RULES: {
    TOTAL_ROUNDS: 12,              // 12个岁月回合
    YEARS_PER_ROUND: 5,            // 每回合跨越约5年 (从公元146年起)
    START_YEAR: 146,               // 初始年份
    START_AGE: 20,                 // 弱冠入局
    CLASH_INTERVAL: 3,             // 每3回合一次大考 (第3, 6, 9, 12回合)
    SUCCESSION_ROUND: 9,           // 第9回合进入传嗣阶段
    MIN_RETREAT_ROUND: 8,          // 第8回合起可主动急流勇退致仕
    RETREAT_SCORE_MULTIPLIER: 0.92 // 致仕折算当前评分 ×0.92
  },

  // 局内稀缺资源
  RESOURCES_CAP: {
    MAX_WILLPOWER_PER_ROUND: 3,    // 每回合心力点数严格为 3 点
    MAX_BAG_SLOTS: 4,              // 行囊严格为 4 格
    MAX_DESTINY_REROLL_SIGNS: 3,   // 改命签局内检定重掷上限 3 次
    FREE_GACHA_REROLLS: 2,         // 局前命盘免费重卜 2 次
    MAX_WASH_MARROW_TOKENS: 3,     // 局前洗髓令单局消耗上限 3 枚
    MAX_GOLD_CHEST_PER_RUN: 1,     // 一局至多带出 1 个绝品金宝箱
    MAX_RUN_CHEST_EXTRACTION: 4,   // 一局至多带出 4 个宝箱
    MAX_CLAN_RESOURCE_BUFF: 0.15   // 宗祠底蕴树总加成上限 +15%
  },

  // 技能卡装配规则
  SKILL_CONSTRAINTS: {
    MAX_TOTAL_COST: 6,             // 构筑消耗总和 ≤ 6 (金卡3, 紫2, 蓝/白1)
    MAX_SAME_FACTION: 2,           // 同流派至多 ≤ 2 张 (四流派: 兵权, 权术, 经营, 守护)
    MAX_SLOTS_HARD_CAP: 4,         // 技能槽位物理封顶 4 (随段位 2 -> 3 -> 4)
    MAX_IN_RUN_INSIGHTS: 2,        // 局内临时领悟技能至多 2 个 (满则替换)
    MAX_CHAIN_MULTIPLIER: 1.5      // 技能连锁伤害/收益倍率封顶 ×1.5
  },

  // 牌库与内容规则
  DECK_RULES: {
    MAX_MAINLINE_RATIO: 0.40,      // 固定主线牌占比 ≤ 40% (保证每局不同)
    HAND_OFFER_COUNT: 3            // 每回合机缘牌三选一
  },

  // 心力投注重心维度
  WILLPOWER_DIMENSIONS: ['management', 'officialdom', 'military', 'cultivation'], // 经营、仕进、武备、修身

  // 四维属性
  METERS: ['prestige', 'wealth', 'force', 'grain'], // 门望、族资、武备、粮谷

  // 检定暴击与失手区间
  CHECK_TIERS: {
    CRITICAL_SUCCESS: 'critical_success', // 暴击 (停顿80ms+震屏+金光)
    SUCCESS: 'success',                   // 成功
    PARTIAL: 'partial',                   // 险胜/平手
    FAILURE: 'failure',                   // 挫败
    FUMBLE: 'fumble'                      // 大失手
  },

  // 宝箱等级
  CHEST_TIERS: {
    COMMON: 'common',       // 凡品 (白)
    FINE: 'fine',           // 良品 (蓝)
    EPIC: 'epic',           // 极品 (紫)
    LEGENDARY: 'legendary'  // 绝品 (金)
  },

  // 传嗣五种接班方式
  SUCCESSION_TYPES: {
    PRIMOGENITURE: 'primogeniture', // 嫡长接棒 (正统门望加成，保守稳健)
    ADOPTION: 'adoption',           // 过继宗子 (权术平衡，化解内耗)
    FOSTER: 'foster',               // 收纳义子 (武备破格拔擢，但需弹压忠诚)
    RETAINER: 'retainer',           // 家臣代政 (经营能手，守业极佳)
    WORTHY: 'worthy'                // 贤能居之 (综合考评，天下瞩目)
  }
};
