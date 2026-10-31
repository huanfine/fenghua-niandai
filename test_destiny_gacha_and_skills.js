/**
 * test_destiny_gacha_and_skills.js
 * 单元测试：局前抽卡、直选特权与技能卡槽位上限校验
 */

const assert = require('assert');
const gachaMod = require('./wechat-minigame/src/data/destinyGachaAndSkills.js');

console.log('====================================================');
console.log('🧪 单元测试：局前宿命抽卡与技能卡配装系统');
console.log('====================================================');

// 1. 抽卡基础功能与重抽次数限制
console.log('👉 [测试 1] 校验局前抽卡会话与免费2次限制...');
const session = new gachaMod.DestinyGachaSession(2);
assert.strictEqual(session.currentCandidates.length, 3, '初始候选池必须为 3 张卡');
assert.strictEqual(session.freePicksUsed, 0, '初始已用免费次数为 0');

// 第 1 次重抽
const r1 = session.reroll(false);
assert.strictEqual(r1.success, true, '第1次免费重抽必须成功');
assert.strictEqual(r1.mode, 'free');
assert.strictEqual(session.freePicksUsed, 1);

// 第 2 次重抽
const r2 = session.reroll(false);
assert.strictEqual(r2.success, true, '第2次免费重抽必须成功');
assert.strictEqual(session.freePicksUsed, 2);

// 第 3 次无道具重抽：必须失败！
const r3 = session.reroll(false);
assert.strictEqual(r3.success, false, '免费次数耗尽且无道具时重抽必须被拒绝');

// 第 3 次有道具重抽：成功！
const r4 = session.reroll(true);
assert.strictEqual(r4.success, true, '消耗洗髓道具时重抽必须成功');
assert.strictEqual(r4.mode, 'item');
console.log('  ✅ 抽卡与重抽次数限制机制 100% 正确！');

// 2. 顶级卡直选特权
console.log('👉 [测试 2] 校验金色顶级卡直选免抽特权...');
const directCard = session.directSelectTopTier('destiny_golden_kirin');
assert.ok(directCard, '必须能够直接获取金色麒麟儿');
assert.strictEqual(directCard.quality, 'legendary', '品质必须为绝品');
assert.strictEqual(session.chosenCard.id, 'destiny_golden_kirin', '会话选定卡必须被直选覆盖');
console.log('  ✅ 顶级卡免抽直选机制检验通过！');

// 3. 技能卡装配槽位与段位限制
console.log('👉 [测试 3] 校验技能卡装配槽位硬上限 (2~4个)...');
const allSkillIds = gachaMod.CLAN_SKILL_CARDS.map(s => s.id);

// 低段位 (下三阶)：上限 2 个
const resLower = gachaMod.validateEquippedSkills(allSkillIds, 1);
assert.strictEqual(resLower.maxSlots, 2, '起步段位槽位上限必须为 2');
assert.strictEqual(resLower.equipped.length, 2, '超出槽位必须被严格截断');
assert.strictEqual(resLower.isOverLimit, true);

// 中段位 (中三阶)：上限 3 个
const resMid = gachaMod.validateEquippedSkills(allSkillIds, 5);
assert.strictEqual(resMid.maxSlots, 3, '中阶段位槽位上限必须为 3');
assert.strictEqual(resMid.equipped.length, 3, '截断至 3 个');

// 高段位 (上三阶)：上限 4 个
const resUpper = gachaMod.validateEquippedSkills(allSkillIds, 8);
assert.strictEqual(resUpper.maxSlots, 4, '终极段位槽位上限必须为 4');
assert.strictEqual(resUpper.equipped.length, 4, '容纳 4 个');
console.log('  ✅ 技能卡槽位硬上限控制机制 100% 严谨！');

console.log('====================================================');
console.log('🎉 宿命抽卡与技能卡配装系统单元测试 100% 全部通过！');
console.log('====================================================');
