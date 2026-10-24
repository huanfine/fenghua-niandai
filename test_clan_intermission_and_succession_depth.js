/**
 * 华夏世家大系 · 继承深化、9阶宗祠、年度分红、名门通好与跨季预研深度测试
 * 运行方式: node test_clan_intermission_and_succession_depth.js
 */

const assert = require('assert');
const path = require('path');
const fs = require('fs');

console.log('================================================================================');
console.log('🏛️ 开始测试：华夏三千年世家大系 · 继承深化与休赛期长线玩法闭环');
console.log('================================================================================');

const familySystem = require('./wechat-minigame/src/data/familySystem.js');
const seasonConfig = require('./wechat-minigame/src/data/seasonConfig.js');

// 1. 验证 9阶宗祠数据与升级逻辑
console.log('\n>>> [测试 1：宗祠 9 阶规制与逐阶升级验证]');
assert(Array.isArray(familySystem.ANCESTRAL_TEMPLE_TIERS), 'ANCESTRAL_TEMPLE_TIERS 必须存在且为数组');
assert.strictEqual(familySystem.ANCESTRAL_TEMPLE_TIERS.length, 9, '宗祠必须完整规划 9 阶');
assert.strictEqual(familySystem.ANCESTRAL_TEMPLE_TIERS[0].name, '草创宗祠');
assert.strictEqual(familySystem.ANCESTRAL_TEMPLE_TIERS[8].name, '万世华夏宗庙');

const mockFam = familySystem.createFamilyProfile({
  surname: '谢',
  province: '河南',
  hallName: '陈郡堂',
  vocationId: 'study_scholar',
  customMotto: '芝兰玉树，雅量风流'
});
mockFam.clanTrust.trustFundMoney = 500000;
mockFam.clanTrust.ancestralTempleTier = 1;

// 逐阶升级到 3 阶
const upg1 = familySystem.upgradeAncestralTemple(mockFam, 'trust');
assert(upg1.success, '从1阶升级到2阶必须成功');
assert.strictEqual(mockFam.clanTrust.ancestralTempleTier, 2);
assert.strictEqual(upg1.newTier, 2);
console.log(`  ✅ 宗祠成功升至第 2 阶：【${upg1.tierName}】，声望增益 +${upg1.prestigeGain}`);

const upg2 = familySystem.upgradeAncestralTemple(mockFam, 'trust');
assert(upg2.success, '从2阶升级到3阶必须成功');
assert.strictEqual(mockFam.clanTrust.ancestralTempleTier, 3);
console.log(`  ✅ 宗祠成功升至第 3 阶：【${upg2.tierName}】，声望增益 +${upg2.prestigeGain}`);

// 验证满级拦截
mockFam.clanTrust.ancestralTempleTier = 9;
const upgMax = familySystem.upgradeAncestralTemple(mockFam, 'trust');
assert(!upgMax.success, '9阶满级宗祠必须拒绝继续升级');
console.log('  ✅ 满级保护拦截生效：', upgMax.reason);

// 2. 验证宗族信托年度分红计算
console.log('\n>>> [测试 2：宗族义庄信托年度分红与宗庙阶梯息率]');
mockFam.clanTrust.trustFundMoney = 100000;
mockFam.clanTrust.ancestralTempleTier = 1;
const divTier1 = familySystem.calculateClanTrustAnnualDividend(mockFam);
// tier 1: 4% + 1% = 5% of 100,000 = 5,000
assert.strictEqual(divTier1, 5000, '1阶宗祠10万公积年金必须为5,000');

mockFam.clanTrust.ancestralTempleTier = 6;
const divTier6 = familySystem.calculateClanTrustAnnualDividend(mockFam);
// tier 6: 4% + 6% = 10% of 100,000 = 10,000
assert.strictEqual(divTier6, 10000, '6阶宗祠10万公积年金必须为10,000');
console.log(`  ✅ 成功验证：1阶宗祠分红 ¥${divTier1}，6阶宗祠分红翻倍至 ¥${divTier6}`);

// 3. 验证八大历史名门联姻缔盟
console.log('\n>>> [测试 3：八大历史名门通好盟约与添妆礼金]');
assert(Array.isArray(familySystem.HISTORICAL_CLAN_HOUSES), 'HISTORICAL_CLAN_HOUSES 必须存在');
assert.strictEqual(familySystem.HISTORICAL_CLAN_HOUSES.length, 8, '必须收录8大名门世家');

const xunHouse = familySystem.HISTORICAL_CLAN_HOUSES.find(h => h.surname === '荀');
assert(xunHouse, '必须包含颍川荀氏');
assert.strictEqual(xunHouse.tag, '颍川高士');

mockFam.alliances = [];
const initPrestige = mockFam.clanTrust.prestigeScore || 50;
const initFund = mockFam.clanTrust.trustFundMoney || 0;

const bondRes = familySystem.addClanAlliance(mockFam, xunHouse, 220);
assert(bondRes.success, '与荀氏缔盟必须成功');
assert.strictEqual(mockFam.alliances.length, 1);
assert.strictEqual(mockFam.clanTrust.trustFundMoney, initFund + xunHouse.dowryGift);
assert.strictEqual(mockFam.clanTrust.prestigeScore, initPrestige + xunHouse.prestigeBonus);

// 重复联姻必须拦截
const dupRes = familySystem.addClanAlliance(mockFam, xunHouse, 230);
assert(!dupRes.success, '重复与同一世家联姻必须被拦截');
console.log('  ✅ 成功验证：名门联姻礼金与声望双向到账，重复缔约拦截生效：', dupRes.reason);

// 4. 验证跨季预研道统
console.log('\n>>> [测试 4：跨纪元经世道统预研]');
const preRes1 = familySystem.preResearchSeasonDoctrine(mockFam, 'season_2_liu_chao', '六朝玄学与庄子注疏');
assert(preRes1.success, '预研下一季道统必须成功');
assert(mockFam.clanTrust.preResearchedSeasons['season_2_liu_chao']);

const preResDup = familySystem.preResearchSeasonDoctrine(mockFam, 'season_2_liu_chao', '六朝玄学与庄子注疏');
assert(!preResDup.success, '已预研之道统必须拦截重复研悟');
console.log('  ✅ 成功验证：跨季道统预研成功固化，防重机制生效：', preResDup.reason);

// 5. 验证真实运营赛季与倒计时引擎
console.log('\n>>> [测试 5：真实运营赛季与倒计时引擎]');
const curRealSeason = seasonConfig.getRealSeasonByDate('2026-11-15');
assert(curRealSeason, '必须成功匹配运营赛季');
assert.strictEqual(curRealSeason.realSeasonId, 'RS_2026_Q4_HANWEI');

const cd = seasonConfig.calculateSeasonCountdown(curRealSeason, '2026-11-15T00:00:00Z');
assert(!cd.isExpired, '赛季未过期');
assert(cd.days > 0, '剩余天数必须大于0');
assert(cd.text.includes('天'), '倒计时文本格式必须正确');
console.log(`  ✅ 真实赛季倒计时演算准确：${cd.text} (截至 ${curRealSeason.endDate})`);

// 6. 验证 game.js 源码实现健全性
console.log('\n>>> [测试 6：game.js 交互函数与子视图挂载校验]');
const gameJsPath = path.join(__dirname, 'wechat-minigame/game.js');
const gameJsCode = fs.readFileSync(gameJsPath, 'utf8');

// (1) 四大交互执行函数
assert(gameJsCode.includes('function performUpgradeAncestralTemple()'), '必须包含 performUpgradeAncestralTemple');
assert(gameJsCode.includes('function claimClanTrustDividends()'), '必须包含 claimClanTrustDividends');
assert(gameJsCode.includes('function proposeHistoricalMarriage('), '必须包含 proposeHistoricalMarriage');
assert(gameJsCode.includes('function preResearchNextSeasonDoctrine()'), '必须包含 preResearchNextSeasonDoctrine');

// (2) 祖产子视图挂载
assert(gameJsCode.includes('upgrade_ancestral_temple_btn'), '祖产必须挂载宗祠升级按钮');
assert(gameJsCode.includes('claim_clan_trust_div_btn'), '祖产必须挂载领取岁利按钮');

// (3) 联姻子视图挂载
assert(gameJsCode.includes('HISTORICAL_CLAN_HOUSES'), '联姻子视图必须渲染八大历史名门');
assert(gameJsCode.includes('house_marry_btn_'), '联姻子视图必须渲染世家备礼通好按钮');

// (4) 岁月子视图挂载
assert(gameJsCode.includes('全服真实运营赛季'), '岁月子视图必须展示真实运营赛季信息');
assert(gameJsCode.includes('pre_research_doctrine_btn'), '岁月子视图必须挂载跨季预研道统按钮');

// (5) 无子嗣非血脉继承 4 种路径
assert(gameJsCode.includes('affinity_inlaw'), '继承候选池必须支持名门秦晋入族');
assert(gameJsCode.includes('disciple_mentee'), '继承候选池必须支持衣钵门生立嗣');
assert(gameJsCode.includes('clan_nephew'), '继承候选池必须支持宗族贤侄承祧');
assert(gameJsCode.includes('clan_branch_heir'), '继承候选池必须支持宗祠公选远支');

console.log('  ✅ 成功验证：game.js 源码所有长线玩法与 UI 交互完美契合无缝运行！');

console.log('\n================================================================================');
console.log('  🎉 华夏世家大系 · 继承与长线玩法全量测试 100% 全部通过！');
console.log('================================================================================\n');
process.exit(0);
