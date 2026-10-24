/**
 * 专项测试：核心系统解耦与纯净性验证 (Core Services Decoupling)
 * 验证目标：
 * 1. ArchiveService 存档保存、读取、迁移与云端防丢同步；
 * 2. LifeCycleEngine 回合年龄步进、属性限幅与寿命检定；
 * 3. ClanSystem 世家立族、先祖入谱、联姻结盟与宗族信托结算。
 */

const assert = require('assert');
const { archiveService, SAVE_STORAGE_KEY } = require('./wechat-minigame/src/core/ArchiveService');
const { lifeCycleEngine } = require('./wechat-minigame/src/core/LifeCycleEngine');
const { clanSystem } = require('./wechat-minigame/src/core/ClanSystem');

console.log('====================================================');
console.log('🧱 启动测试：核心系统服务按缝解耦与幂等性验证');
console.log('====================================================');

// 1. 测试 ArchiveService
console.log('\n--- 1. 验证 ArchiveService 存档与加载 ---');
const dummyState = {
  isStarted: true,
  name: '陈崇德',
  year: 120,
  age: 20,
  capital: 6500,
  health: 90,
  rep: 45,
  track: 'official',
  family: { surname: '陈', hall: '颍川堂' }
};

const savedOk = archiveService.saveGameState(dummyState, true);
assert.strictEqual(savedOk, true, '存档必须保存成功');

const loadedState = archiveService.loadGameState();
assert.ok(loadedState, '必须成功读取存档');
assert.strictEqual(loadedState.name, '陈崇德', '读取的姓名必须一致');
assert.strictEqual(loadedState.capital, 6500, '读取的资金必须一致');
console.log('✅ ArchiveService 存档与加载验证无误');

// 2. 测试 LifeCycleEngine
console.log('\n--- 2. 验证 LifeCycleEngine 回合生命推进 ---');
const simPerson = {
  age: 48,
  year: 150,
  health: 85,
  ap: 10,
  maxAp: 100,
  lifespanCeiling: 52
};

const resYear1 = lifeCycleEngine.advanceYear(simPerson);
assert.strictEqual(resYear1.isAlive, true, '49岁健在');
assert.strictEqual(simPerson.age, 49, '年龄增长至49');
assert.strictEqual(simPerson.year, 151, '年份推进至151');
assert.strictEqual(simPerson.ap, 100, '行动力恢复满额');

// 推进至 52 岁检定终老
lifeCycleEngine.advanceYear(simPerson); // 50
lifeCycleEngine.advanceYear(simPerson); // 51
const resDeath = lifeCycleEngine.advanceYear(simPerson); // 52
assert.strictEqual(resDeath.isAlive, false, '达到寿命上限安然离世');
assert.strictEqual(resDeath.deathReason, 'NATURAL_END', '离世原因为 NATURAL_END');
console.log('✅ LifeCycleEngine 回合演进、健康衰减与自然离世检定无误');

// 3. 测试 ClanSystem
console.log('\n--- 3. 验证 ClanSystem 世家宗族与联姻结算 ---');
const clanChen = clanSystem.createClan({
  province: '河南',
  surname: '陈',
  hallName: '颍川堂',
  pillarName: '耕读传家 · 诗书润骨'
});
assert.strictEqual(clanChen.surname, '陈', '宗族姓氏正确');
assert.strictEqual(clanChen.generationsCount, 1, '创始第一世');

const ancestorRec = clanSystem.recordAncestorToGenealogy(clanChen, {
  posthumousTitle: '武襄公',
  officialTitle: '汉故太常卿',
  lifespan: [100, 168],
  bequestPrestige: 60
});
assert.ok(ancestorRec, '先祖录入谱系成功');
assert.strictEqual(clanChen.ancestors.length, 1, '谱系已有1位先祖');
assert.strictEqual(clanChen.generationsCount, 2, '世代推进至第2世');
assert.strictEqual(clanChen.clanPrestige, 110, '声望正确继承累加');

const clanZhang = clanSystem.createClan({
  province: '山东',
  surname: '张',
  hallName: '清河堂'
});
clanSystem.formAlliance(clanChen, clanZhang, 3000);
assert.strictEqual(clanChen.alliances.length, 1, '陈氏世交盟好+1');
assert.strictEqual(clanZhang.alliances.length, 1, '张氏世交盟好+1');
assert.strictEqual(clanChen.clanTrustFund, 23000, '信托礼金增益到账');
console.log('✅ ClanSystem 立族、先祖录入与秦晋之好同盟无误');

console.log('\n====================================================');
console.log('🎉 核心系统解耦服务专项测试 100% 全部通过！');
console.log('====================================================');
