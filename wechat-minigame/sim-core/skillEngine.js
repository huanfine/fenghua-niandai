/**
 * sim-core/skillEngine.js
 * 世家随身技能卡与连锁运算引擎
 * 严格落实 6 费总和上限、同派 <= 2、槽位 2~4 硬锁、临时领悟 <= 2、触发上限与连锁倍率封顶 ×1.5
 */

const { SKILL_CONSTRAINTS } = require('./rules.js');

class SkillEngine {
  /**
   * @param {Object} params
   * @param {number} params.maxSlots 槽位上限 (2, 3, 或 4)
   * @param {Array<Object>} params.equippedSkills 初始装配技能
   */
  constructor({ maxSlots = 2, equippedSkills = [] } = {}) {
    this.maxSlots = Math.min(SKILL_CONSTRAINTS.MAX_SLOTS_HARD_CAP, Math.max(2, maxSlots));
    this.equippedSkills = [];
    this.temporaryInsights = []; // 局内奇遇领悟技能 (上限 2 个)
    this.triggerCounts = new Map(); // 技能在当局中的已触发次数

    if (equippedSkills.length > 0) {
      this.equipSkills(equippedSkills);
    }
  }

  /**
   * 校验技能卡装配规则合规性
   * @param {Array<Object>} skills
   * @returns {{ valid: boolean, errors: string[] }}
   */
  validateBuild(skills = []) {
    const errors = [];

    // 1. 槽位检查
    if (skills.length > this.maxSlots) {
      errors.push(`装配技能数量 (${skills.length}) 超出当前槽位上限 (${this.maxSlots})`);
    }

    // 2. 构筑费用总和检查 (≤ 6)
    let totalCost = 0;
    for (const skill of skills) {
      totalCost += (skill.cost !== undefined ? skill.cost : 1);
    }
    if (totalCost > SKILL_CONSTRAINTS.MAX_TOTAL_COST) {
      errors.push(`构筑总消耗 (${totalCost}) 超出上限 (${SKILL_CONSTRAINTS.MAX_TOTAL_COST})`);
    }

    // 3. 同流派上限检查 (≤ 2 张)
    const factionCounts = {};
    for (const skill of skills) {
      const faction = skill.faction || 'neutral';
      factionCounts[faction] = (factionCounts[faction] || 0) + 1;
      if (faction !== 'neutral' && factionCounts[faction] > SKILL_CONSTRAINTS.MAX_SAME_FACTION) {
        errors.push(`流派【${faction}】装配超过 ${SKILL_CONSTRAINTS.MAX_SAME_FACTION} 张限制`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
      totalCost,
      slotsUsed: skills.length
    };
  }

  /**
   * 安全装备技能列表
   */
  equipSkills(skills = []) {
    // 裁剪与安全过滤
    const allowed = [];
    let curCost = 0;
    const factionMap = {};

    for (const s of skills) {
      if (allowed.length >= this.maxSlots) break;
      const cost = s.cost !== undefined ? s.cost : 1;
      if (curCost + cost > SKILL_CONSTRAINTS.MAX_TOTAL_COST) continue;
      const faction = s.faction || 'neutral';
      if (faction !== 'neutral' && (factionMap[faction] || 0) >= SKILL_CONSTRAINTS.MAX_SAME_FACTION) {
        continue;
      }

      allowed.push(s);
      curCost += cost;
      factionMap[faction] = (factionMap[faction] || 0) + 1;
    }

    this.equippedSkills = allowed;
    return this.equippedSkills;
  }

  /**
   * 局内临时领悟技能 (上限 2 个，溢出则替换最旧的一项)
   */
  learnTemporaryInsight(insightSkill) {
    if (this.temporaryInsights.length >= SKILL_CONSTRAINTS.MAX_IN_RUN_INSIGHTS) {
      this.temporaryInsights.shift(); // 淘汰先领悟的
    }
    this.temporaryInsights.push({
      ...insightSkill,
      isTemporary: true
    });
    return this.temporaryInsights;
  }

  /**
   * 获取当前全部可用技能 (常驻 + 临时领悟)
   */
  getAllActiveSkills() {
    return [...this.equippedSkills, ...this.temporaryInsights];
  }

  /**
   * 尝试触发技能，并计算连锁收益倍率
   * @param {string} triggerHook 触发时机 (如 'on_check_start', 'on_crisis', 'on_fumble', 'on_fatal_damage')
   * @param {Object} context 触发上下文
   */
  resolveSkillTriggers(triggerHook, context = {}) {
    const activeSkills = this.getAllActiveSkills();
    const triggeredList = [];
    let rawMultiplier = 1.0;
    let flatMeterBonus = { prestige: 0, wealth: 0, force: 0, grain: 0 };

    for (const skill of activeSkills) {
      if (skill.trigger !== triggerHook) continue;

      // 检查每局触发上限
      const curCount = this.triggerCounts.get(skill.id) || 0;
      if (skill.maxTriggersPerRun && curCount >= skill.maxTriggersPerRun) {
        continue;
      }

      // 条件检查
      if (skill.triggerCondition && !skill.triggerCondition(context)) {
        continue;
      }

      // 成功触发
      this.triggerCounts.set(skill.id, curCount + 1);
      triggeredList.push(skill);

      // 累加乘算与加算
      if (skill.chainMultiplier) {
        rawMultiplier *= skill.chainMultiplier;
      }
      if (skill.meterBonus) {
        for (const [k, v] of Object.entries(skill.meterBonus)) {
          flatMeterBonus[k] = (flatMeterBonus[k] || 0) + v;
        }
      }
    }

    // 封顶连锁倍率不超过 1.5 倍
    const clampedMultiplier = Math.min(SKILL_CONSTRAINTS.MAX_CHAIN_MULTIPLIER, rawMultiplier);

    return {
      triggeredList,
      hasTriggers: triggeredList.length > 0,
      chainMultiplier: clampedMultiplier,
      isCapped: rawMultiplier > SKILL_CONSTRAINTS.MAX_CHAIN_MULTIPLIER,
      flatMeterBonus
    };
  }
}

module.exports = SkillEngine;
