/**
 * content/schema.js
 * 纯逻辑 JSON 数据模式校验器
 * 保证内容热更包在导入引擎前符合数据规范与平衡门禁
 */

class ContentSchemaValidator {
  /**
   * 校验事件牌格式
   */
  static validateCard(card) {
    const required = ['id', 'name', 'type', 'category', 'difficulty', 'weight'];
    for (const field of required) {
      if (card[field] === undefined) {
        return { valid: false, error: `Card ${card.id || 'unknown'} missing required field: ${field}` };
      }
    }
    const validTypes = ['opportunity', 'crisis', 'caravan', 'rival', 'miracle'];
    if (!validTypes.includes(card.type)) {
      return { valid: false, error: `Invalid card type: ${card.type}` };
    }
    return { valid: true };
  }

  /**
   * 校验宿命身份卡格式
   */
  static validateDestiny(destiny) {
    const required = ['id', 'name', 'quality', 'background', 'trait', 'flaw'];
    for (const field of required) {
      if (destiny[field] === undefined) {
        return { valid: false, error: `Destiny ${destiny.id || 'unknown'} missing field: ${field}` };
      }
    }
    const validQualities = ['common', 'fine', 'epic', 'legendary'];
    if (!validQualities.includes(destiny.quality)) {
      return { valid: false, error: `Invalid destiny quality: ${destiny.quality}` };
    }
    return { valid: true };
  }

  /**
   * 校验技能卡格式
   */
  static validateSkill(skill) {
    const required = ['id', 'name', 'faction', 'quality', 'cost', 'trigger'];
    for (const field of required) {
      if (skill[field] === undefined) {
        return { valid: false, error: `Skill ${skill.id || 'unknown'} missing field: ${field}` };
      }
    }
    const validFactions = ['military', 'officialdom', 'management', 'cultivation'];
    if (!validFactions.includes(skill.faction)) {
      return { valid: false, error: `Invalid skill faction: ${skill.faction}` };
    }
    if (skill.cost < 1 || skill.cost > 3) {
      return { valid: false, error: `Skill cost must be 1~3, got: ${skill.cost}` };
    }
    return { valid: true };
  }
}

module.exports = ContentSchemaValidator;
