/**
 * test_historical_clans_and_macro_evolution.js
 * 华夏世家大系 · 第一赛季《汉魏风骨》（公元100~300年）
 * 真实氏族历史底座、郡望房支与宏观演进脉络深度校验测试套件
 */

const assert = require('assert');
const path = require('path');

console.log('====================================================');
console.log('🏛️  汉魏历史氏族真史底座、郡望房支与宏观演化闭环检验');
console.log('====================================================\n');

const milieu = require('./wechat-minigame/src/data/historicalMilieuHanWei');
const familySys = require('./wechat-minigame/src/data/familySystem');
const chrono = require('./wechat-minigame/src/data/seasonChronoPipeline');

// -----------------------------------------------------------------------------
// 1. 汉魏正史十二大氏族注册表 (HAN_WEI_HISTORICAL_CLANS_REGISTRY) 穿透核验
// -----------------------------------------------------------------------------
console.log('👉 [测试 1] 校验汉魏十二大核心名门望族正史注册表...');
const registry = milieu.HAN_WEI_HISTORICAL_CLANS_REGISTRY;
assert.ok(registry && typeof registry === 'object', '必须导出 HAN_WEI_HISTORICAL_CLANS_REGISTRY');

const expectedClans = [
  'chen_yingchuan',  // 颍川陈氏
  'xun_yingchuan',   // 颍川荀氏
  'yang_hongnong',   // 弘农杨氏
  'yuan_runan',      // 汝南袁氏
  'wang_langya',     // 琅琊王氏
  'wang_taiyuan',    // 太原王氏
  'sima_henei',      // 河内司马氏
  'cui_qinghe',      // 清河崔氏
  'lu_fanyang',      // 范阳卢氏
  'xie_chenjun',     // 陈郡谢氏
  'pei_hedong',      // 河东裴氏
  'wujun_four',      // 吴郡四姓
  'longxi_li'        // 陇西李氏
];

const canonicalSources = ['后汉书', '三国志', '晋书', '汉书', '世说新语'];

expectedClans.forEach(key => {
  const c = registry[key];
  assert.ok(c, `核心名门注册表必须包含氏族: ${key}`);
  assert.ok(c.surname, `${key} 必须包含姓氏`);
  assert.ok(c.choronym && c.choronym.length >= 4, `${key} 必须具备真实汉魏郡望县邑: ${c.choronym}`);
  assert.ok(c.founder, `${key} 必须标明正史始祖`);
  assert.ok(c.emblem, `${key} 必须具备门阀家徽`);
  assert.ok(c.historicalSource, `${key} 必须标明正史卷次出处`);
  assert.ok(canonicalSources.some(s => c.historicalSource.includes(s)), `${key} 史料出处必须来自《后汉书》《三国志》《晋书》等权威正史: ${c.historicalSource}`);
  assert.ok(c.classicsTradition && c.classicsTradition.length >= 10, `${key} 必须具备清晰的家学经术传统: ${c.classicsTradition}`);
  assert.ok(c.motto && c.motto.length >= 8, `${key} 必须具备古雅家训: ${c.motto}`);
  assert.ok(c.clanPerk && c.clanPerk.id && c.clanPerk.name && c.clanPerk.desc, `${key} 必须具备氏族专属特权 (clanPerk)`);
  assert.ok(Array.isArray(c.branchCadets) && c.branchCadets.length >= 3, `${key} 必须具备至少3个真实汉魏房支 Cadets`);

  // 严禁宋明宗祠堂号侵入汉魏氏族注册表
  const forbiddenSongHalls = ['三槐堂', '爱莲堂', '百忍堂', '义门堂', '青莲堂', '紫阳堂', '半部堂'];
  forbiddenSongHalls.forEach(h => {
    assert.ok(!c.choronym.includes(h), `${key} 郡望绝不可混入宋明堂号: ${h}`);
    c.branchCadets.forEach(b => {
      assert.ok(!b.includes(h), `${key} 房支绝不可混入宋明堂号: ${b}`);
    });
  });
});
console.log(`  ✅ 汉魏十二大名门（颍川陈氏/荀氏、弘农杨氏、汝南袁氏、琅琊王氏、河内司马氏等）共 ${expectedClans.length} 家正史谱系与房支校验通过！`);

// -----------------------------------------------------------------------------
// 2. 氏族建制档案生成 (getClanLineageDocket & createFamilyProfile) 校验
// -----------------------------------------------------------------------------
console.log('\n👉 [测试 2] 校验氏族建制档案获取与特权/郡望/房支自动注入...');

// 2.1 颍川陈氏建制
const docketChen = familySys.getClanLineageDocket('陈', null, '河南', '颍川长社房');
assert.strictEqual(docketChen.isProminentClan, true);
assert.strictEqual(docketChen.clanKey, 'chen_yingchuan');
assert.strictEqual(docketChen.choronym, '颍川郡长社县');
assert.strictEqual(docketChen.clanPerk.name, '九品法祖');
assert.ok(docketChen.branchCadets.includes('长房太丘公房'));
console.log(`  ✅ 颍川陈氏建制档案精准匹配：郡望【${docketChen.choronym}】，特权【${docketChen.clanPerk.name}】`);

// 2.2 弘农杨氏建制
const docketYang = familySys.getClanLineageDocket('杨', null, '陕西', '四知太尉房');
assert.strictEqual(docketYang.isProminentClan, true);
assert.strictEqual(docketYang.clanKey, 'yang_hongnong');
assert.strictEqual(docketYang.choronym, '弘农郡华阴县');
assert.strictEqual(docketYang.clanPerk.name, '四知清白');
console.log(`  ✅ 弘农杨氏建制档案精准匹配：郡望【${docketYang.choronym}】，特权【${docketYang.clanPerk.name}】`);

// 2.3 琅琊王氏建制
const docketWang = familySys.getClanLineageDocket('王', 'wang_langya', '山东', '睢陵太保房');
assert.strictEqual(docketWang.isProminentClan, true);
assert.strictEqual(docketWang.clanKey, 'wang_langya');
assert.strictEqual(docketWang.choronym, '琅琊国临沂县');
assert.strictEqual(docketWang.clanPerk.name, '孝友流芳');
console.log(`  ✅ 琅琊王氏建制档案精准匹配：郡望【${docketWang.choronym}】，特权【${docketWang.clanPerk.name}】`);

// 2.4 创建氏族Profile集成校验
const profile = familySys.createFamilyProfile({
  surname: '荀',
  province: '河南',
  hallName: '颍阴神君房',
  vocationId: 'study_scholar'
});
assert.strictEqual(profile.surname, '荀');
assert.strictEqual(profile.choronym, '颍川郡颍阴县');
assert.strictEqual(profile.branchCadet, '颍阴神君房');
assert.strictEqual(profile.clanPerk.name, '王佐之才');
assert.ok(profile.classicsTradition.includes('春秋左氏传'));
console.log(`  ✅ 家族 Profile 完整集成氏族特权与经学家学：【${profile.fullName}】特权【${profile.clanPerk.name}】`);

// -----------------------------------------------------------------------------
// 3. 宏观世界四大历史篇章与氏族生存脉络推进校验 (seasonChronoPipeline)
// -----------------------------------------------------------------------------
console.log('\n👉 [测试 3] 校验第一赛季四大历史篇章与氏族生存抉择脉络...');
const progressCh1 = chrono.getSeasonTimelineProgress(chrono.SEASON_CONFIG.fallbackStartTimeMs + 1 * 86400000);
assert.strictEqual(progressCh1.chapter.chapterIndex, 1);
assert.ok(progressCh1.chapter.title.includes('东汉中兴'));
assert.ok(progressCh1.worldCurrentYear >= 100 && progressCh1.worldCurrentYear <= 145);

const progressCh2 = chrono.getSeasonTimelineProgress(chrono.SEASON_CONFIG.fallbackStartTimeMs + 35 * 86400000);
assert.strictEqual(progressCh2.chapter.chapterIndex, 2);
assert.ok(progressCh2.chapter.title.includes('党锢黄巾'));
assert.ok(progressCh2.worldCurrentYear >= 146 && progressCh2.worldCurrentYear <= 190);

const progressCh3 = chrono.getSeasonTimelineProgress(chrono.SEASON_CONFIG.fallbackStartTimeMs + 65 * 86400000);
assert.strictEqual(progressCh3.chapter.chapterIndex, 3);
assert.ok(progressCh3.chapter.title.includes('三国鼎立') || progressCh3.chapter.title.includes('群雄并起'));
assert.ok(progressCh3.worldCurrentYear >= 191 && progressCh3.worldCurrentYear <= 235);

const progressCh4 = chrono.getSeasonTimelineProgress(chrono.SEASON_CONFIG.fallbackStartTimeMs + 95 * 86400000);
assert.strictEqual(progressCh4.chapter.chapterIndex, 4);
assert.ok(progressCh4.chapter.title.includes('天下一统') || progressCh4.chapter.title.includes('魏晋擅变'));
assert.ok(progressCh4.worldCurrentYear >= 236 && progressCh4.worldCurrentYear <= 280);

console.log('  ✅ 宏观四卷（卷一东汉中兴 ➔ 卷二党锢黄巾 ➔ 卷三群雄三国 ➔ 卷四魏晋一统）世界历史管线精准运转！');

console.log('\n====================================================');
console.log('🎉 汉魏正史名门底座与宏观演进脉络深度校验 100% 全部通过！');
console.log('====================================================\n');
