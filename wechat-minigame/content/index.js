/**
 * content/index.js
 * 纯数据内容包入口与 Schema 校验
 */

const ContentSchemaValidator = require('./schema.js');
const destinies = require('./destinies.json');
const skills = require('./skills.json');
const vows = require('./vows.json');
const cardsHanwei = require('./cards_hanwei.json');

function validateAllContent() {
  const errors = [];

  // 校验卡牌
  for (const card of cardsHanwei) {
    const res = ContentSchemaValidator.validateCard(card);
    if (!res.valid) errors.push(res.error);
  }

  // 校验宿命身份卡
  for (const dest of destinies) {
    const res = ContentSchemaValidator.validateDestiny(dest);
    if (!res.valid) errors.push(res.error);
  }

  // 校验技能卡
  for (const sk of skills) {
    const res = ContentSchemaValidator.validateSkill(sk);
    if (!res.valid) errors.push(res.error);
  }

  return {
    valid: errors.length === 0,
    errors,
    cardCount: cardsHanwei.length,
    destinyCount: destinies.length,
    skillCount: skills.length,
    vowCount: vows.length
  };
}

module.exports = {
  ContentSchemaValidator,
  destinies,
  skills,
  vows,
  cardsHanwei,
  validateAllContent
};
