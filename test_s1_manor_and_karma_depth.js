/**
 * test_s1_manor_and_karma_depth.js
 * 第一赛季《汉魏风骨 · 坞壁筑基》专属核心机制验证套件
 * 
 * 验证目标：
 * 1. 坞壁庄园初始化（不同家业底色起点平衡性）
 * 2. 坞壁良田水碓年度自给自足收益结算
 * 3. 兵灾战力（坞壁深垒+精壮部曲）防御判定
 * 4. 门阀世荫因果链继承（跳过白衣门生、子承父荫跳级出仕）
 * 5. 编年平年自动推进收益与时空连续性
 */

const assert = require('assert');
const {
  initManor,
  calculateManorYield,
  resolveManorCrisisDefense,
  createAncestralLegacyPackage,
  applyAncestralLegacyToDescendant,
  advancePeacefulYears
} = require('./wechat-minigame/src/data/epochOneEngine.js');

console.log('====================================================');
console.log('🏛️  第一赛季专属：坞壁庄园经营与四世祖荫因果链深度验证');
console.log('====================================================\n');

// 1. 验证不同家业底色的坞壁初始配置
console.log('👉 [测试 1] 校验四大世家家业底色的坞壁庄园初始化...');
const manorScholar = initManor('study_scholar');
const manorTrade = initManor('trade_craft');
const manorMilitary = initManor('military_honor');
const manorAgri = initManor('agri_land');

assert.strictEqual(manorScholar.libraryTiers, 2, '耕读传家应具备2层藏书台阁');
assert.strictEqual(manorTrade.watermills, 2, '通商惠工应具备2座龙门水碓');
assert.strictEqual(manorMilitary.armedRetainers, 60, '门阀军功应具备60名精锐部曲');
assert.strictEqual(manorAgri.farmlandAcres, 60, '积善齐家应具备60亩膏腴良田');
console.log('  ✅ 坞壁庄园初始化四大家业底色规格完全符合设定！');

// 2. 校验坞壁庄园收益模型
console.log('\n👉 [测试 2] 校验坞壁庄园产粮与水碓工坊收益结算...');
const yield1Year = calculateManorYield(manorScholar, 1);
assert.ok(yield1Year.netMoney > 0, '平年净收益五铢钱必须大于0');
assert.ok(yield1Year.grainProduced > 0, '良田必须产出粮食');
assert.ok(yield1Year.snippet.includes('庄园经略'), '收益简报文风必须契合古风');

const yield3Years = calculateManorYield(manorTrade, 3);
assert.ok(yield3Years.netMoney > yield1Year.netMoney, '三年连续推进收益应显著高于单年');
console.log('  ✅ 坞壁庄园经济产出公式运转正常，收支平衡！');

// 3. 校验兵灾与流寇攻防
console.log('\n👉 [测试 3] 校验黄巾/董卓之乱下的坞壁攻防判定...');
// 军功坞壁（高防御）
const strongManor = { ...manorMilitary, fortressLevel: 3, armedRetainers: 50 };
const defenseWin = resolveManorCrisisDefense(strongManor, 'rebel_siege');
assert.strictEqual(defenseWin.defended, true, '高深垒+充足部曲必须守御成功');
assert.strictEqual(defenseWin.lossMoney, 0, '守御大捷不应损失五铢钱');
assert.ok(defenseWin.reputationGain > 0, '守御大捷应提升门第声望');

// 薄弱坞壁（缺乏修筑）
const weakManor = { farmlandAcres: 50, fortressLevel: 1, armedRetainers: 10, granaryStoredGrain: 300 };
const defenseLose = resolveManorCrisisDefense(weakManor, 'rebel_siege');
assert.strictEqual(defenseLose.defended, false, '薄弱要塞应判定为守城受挫');
assert.ok(defenseLose.lossMoney > 0, '受挫应损失田庄资财');
console.log('  ✅ 坞壁防御检定逻辑严密，战力决定乱世存亡！');

// 4. 校验四世因果链：父辈官衔对子辈入仕的【祖荫辟举】
console.log('\n👉 [测试 4] 校验名臣父辈对子辈入仕的【祖荫跳级辟举】...');
const family = { surname: '荀' };
const fatherOfficial = {
  name: '淑',
  govLevel: 6,
  officialTitle: '汉故太常/侍中',
  track: 'official',
  clanPrestige: 90,
  capital: 25000,
  manor: strongManor,
  mottoTags: ['经林泰斗']
};

const legacyPkg = createAncestralLegacyPackage(family, fatherOfficial, [
  { eventYear: 168, chronicleSnippet: '抗章直言，辟举门生数十人' }
]);

assert.strictEqual(legacyPkg.fatherName, '荀淑');
assert.ok(legacyPkg.bequeathedMoney > 5000, '遗产必须有保底继承比例');

const son = { name: '彧', track: 'official' };
const applyRes = applyAncestralLegacyToDescendant(son, legacyPkg);

assert.strictEqual(son.rank, 2, '名门后裔受祖荫辟举，必须直接跳过白衣门生起步为郡丞功曹');
assert.strictEqual(son.rankName, '郡丞/功曹史');
assert.ok(applyRes.patronageStory.includes('门阀世荫'), '必须包含门阀世荫因果回响文案');
assert.ok(son.manor.farmlandAcres > 0, '必须顺畅继承父辈坞壁资产');
console.log('  ✅ 祖荫辟举与门阀因果链继承全部通过验证！');

// 5. 校验平年快速流转（岁月如流推进）
console.log('\n👉 [测试 5] 校验平年连续快进与岁月沉淀...');
const state = {
  year: 110,
  age: 20,
  careerTenureYears: 2,
  capital: 3000,
  clanPrestige: 50,
  manor: manorAgri
};

const advanceRes = advancePeacefulYears(state, 4);
assert.strictEqual(state.year, 114, '年份应精准增加4年');
assert.strictEqual(state.age, 24, '年龄应精准增加4岁');
assert.strictEqual(state.careerTenureYears, 6, '任期应同步递增');
assert.ok(state.capital > 3000, '平年必须自动结算庄园收益');
assert.ok(advanceRes.chronicleText.includes('公元114年'), '编年史必须准确记录跳进年份');
console.log('  ✅ 平年快速推进调度器验证完全通过！');

console.log('\n====================================================');
console.log('🎉 第一赛季专属系统深度测试 100% 全部通过！');
console.log('====================================================\n');
