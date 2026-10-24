/**
 * 专项测试：纪元插槽化与现代剧情解耦架构 (Epoch Pack Architecture)
 * 验证目标：
 * 1. 验证 IEraContentProvider 契约与 EraRegistry 注册中心；
 * 2. 验证 S1 汉魏标准包与 S10 现代标准包独立完整，互不穿线；
 * 3. 验证年份路由自动挂载机制；
 * 4. 验证现代模式代码资产成功沉淀封装在 S10 纪元包中待命。
 */

const assert = require('assert');
const { eraRegistry } = require('./wechat-minigame/src/era/EraRegistry');

console.log('====================================================');
console.log('🏛️  启动测试：纪元插槽架构与双纪元包隔离解耦验证');
console.log('====================================================');

// 1. 验证 S1 汉魏纪元包
console.log('\n--- 1. 验证第一赛季 S1 汉魏纪元包特性 ---');
const s1Pack = eraRegistry.getPackById('season_1_han_wei');
assert.ok(s1Pack, '必须成功获取 S1 汉魏纪元包');
assert.strictEqual(s1Pack.getInitialCapital(), 5000, '汉魏初始资金为 5000 五铢钱');
assert.strictEqual(s1Pack.getDefaultTrack(), 'official', '汉魏默认仕途赛道为 official');
assert.strictEqual(s1Pack.isFeatureEnabled('gaokao'), false, '汉魏严禁开启高考');
assert.strictEqual(s1Pack.isFeatureEnabled('dockWallBuild'), true, '汉魏必须支持坞壁筑基');
assert.strictEqual(s1Pack.isFeatureEnabled('nineRankOfficial'), true, '汉魏必须支持九品官人法');
assert.strictEqual(s1Pack.getCurrencyName(), '五铢钱', '汉魏货币必须为五铢钱');
console.log('✅ S1 汉魏包验证无误：察举九品与坞壁筑基就绪，高考与现代房市被严格隔离');

// 2. 验证 S10 现代纪元包
console.log('\n--- 2. 验证第十赛季 S10 现代弄潮纪元包特性 ---');
const s10Pack = eraRegistry.getPackById('season_10_modern');
assert.ok(s10Pack, '必须成功获取 S10 现代纪元包');
assert.strictEqual(s10Pack.getInitialCapital(), 24000, '现代初始资金为 24000 元');
assert.strictEqual(s10Pack.getDefaultTrack(), 'gov', '现代默认赛道为 gov');
assert.strictEqual(s10Pack.isFeatureEnabled('gaokao'), true, '现代必须支持高考机制');
assert.strictEqual(s10Pack.isFeatureEnabled('houseMarket'), true, '现代必须支持商品房买卖');
assert.strictEqual(s10Pack.isFeatureEnabled('dockWallBuild'), false, '现代不开启古式坞壁');
console.log('✅ S10 现代包验证无误：高考、商品房与大国工匠赛道完整沉淀待命');

// 3. 验证年份路由与动态决议
console.log('\n--- 3. 验证年份自动路由决议 ---');
const packYear180 = eraRegistry.resolvePackByYear(180);
assert.strictEqual(packYear180.getId(), 'season_1_han_wei', '公元180年必须自动路由至汉魏包');

const packYear2026 = eraRegistry.resolvePackByYear(2026);
assert.strictEqual(packYear2026.getId(), 'season_10_modern', '公元2026年必须自动路由至现代包');

assert.strictEqual(eraRegistry.isFeatureEnabled('gaokao', 180), false, '180年查询高考返回 false');
assert.strictEqual(eraRegistry.isFeatureEnabled('gaokao', 2026), true, '2026年查询高考返回 true');
console.log('✅ 年份路由决议正确：180年(汉魏)与2026年(现代)特性查询无缝分流');

console.log('\n====================================================');
console.log('🎉 纪元插槽架构与双纪元包解耦测试 100% 全部通过！');
console.log('====================================================');
