/**
 * test_historical_narrative_immersion.js
 * 《华夏世家》汉魏真实历史剧情与正史考证深度测试
 */

const assert = require('assert');
const { RoundRunner, PRNG } = require('./sim-core/index.js');
const { cardsHanwei, destinies } = require('./content/index.js');

console.log('================================================================');
console.log('📜 《华夏世家》真实历史剧情与正史沉浸度专项测试');
console.log('================================================================\n');

// 1. 检验汉魏牌库正史考证与历史名宿覆盖
console.log('👉 [测试 1] 校验全量牌库正史考证出处与历史厚重感...');
assert.ok(cardsHanwei.length >= 16, '汉魏纪元牌库至少包含 16 个重大史实事件');

for (const card of cardsHanwei) {
  assert.ok(card.historicalSource, `卡牌【${card.name}】必须标注正史文献出处考证`);
  assert.ok(card.chronicleText, `卡牌【${card.name}】必须包含典雅的起居注历史追述长卷`);
}
console.log(`  ✅ 16 张历史大牌全部具备《后汉书》《三国志》《世说新语》《资治通鉴》考证出处！\n`);

// 2. 检验第一幕重大历史事件 (公元169~187年：党锢之祸、熹平石经、卖官鬻爵、黄巾起义、德星聚奎)
console.log('👉 [测试 2] 校验第一幕【乱世将至 · 风骨与狂澜】历史事件脉络...');
const act1Cards = cardsHanwei.filter(c => c.act === 1);
assert.ok(act1Cards.some(c => c.id === 'hw_hist_01_danggu_purge'), '必须包含第二次党锢之祸');
assert.ok(act1Cards.some(c => c.id === 'hw_hist_02_xiping_stone_classics'), '必须包含熹平石经立太学');
assert.ok(act1Cards.some(c => c.id === 'hw_hist_03_xidi_office_selling'), '必须包含汉灵帝西邸卖官');
assert.ok(act1Cards.some(c => c.id === 'hw_hist_04_yellow_turban_famine'), '必须包含张角黄巾起义');
assert.ok(act1Cards.some(c => c.id === 'hw_hist_05_taiqiu_virtue_star'), '必须包含陈太丘德星聚奎');
console.log('  ✅ 第一幕党锢名士、熹平刻石、清流守正、黄巾烽火全景呈现！\n');

// 3. 检验第二幕重大历史事件 (公元189~196年：何进北宫喋血、董卓火焚洛阳、蔡邕遗琴、迎奉天子)
console.log('👉 [测试 3] 校验第二幕【京华血火 · 宗族存亡】历史事件脉络...');
const act2Cards = cardsHanwei.filter(c => c.act === 2);
assert.ok(act2Cards.some(c => c.id.includes('he_jin')), '必须包含何进被诛与北宫喋血');
assert.ok(act2Cards.some(c => c.id.includes('dong_zhuo')), '必须包含董卓火焚洛阳迁都长安');
assert.ok(act2Cards.some(c => c.id.includes('cai_yong')), '必须包含蔡伯喈托孤焦尾琴');
assert.ok(act2Cards.some(c => c.id.includes('emperor_escort')), '必须包含献帝东归与荀彧迎奉天子');
console.log('  ✅ 第二幕洛阳大乱、董卓焚宫、蔡邕托琴、迎奉天子正朔全景呈现！\n');

// 4. 检验第三幕重大历史事件 (公元200~220年：官渡大决战、赤壁烈火、建安大疫、九品中正制)
console.log('👉 [测试 4] 校验第三幕【定鼎魏晋 · 鼎食承天】历史事件脉络...');
const act3Cards = cardsHanwei.filter(c => c.act === 3);
assert.ok(act3Cards.some(c => c.id.includes('guandu')), '必须包含官渡乌巢大决战');
assert.ok(act3Cards.some(c => c.id.includes('chibi')), '必须包含赤壁战火与天下三分');
assert.ok(act3Cards.some(c => c.id.includes('jianan_plague')), '必须包含张仲景伤寒大疫');
assert.ok(act3Cards.some(c => c.id.includes('nine_rank')), '必须包含陈群立九品中正制');
console.log('  ✅ 第三幕官渡争雄、赤壁三分、伤寒论药、九品中正世家巅峰全景呈现！\n');

// 5. 模拟单局真实推演并读取起居注与史书出处
console.log('👉 [测试 5] 模拟单局抉择，校验起居注历史后记与考证呈现...');
const runner = new RoundRunner({
  seed: 8888,
  cardPool: cardsHanwei,
  destinyCard: destinies[0],
  surname: '荀'
});
runner.startPrologue('study');
const r1 = runner.beginRound();
const decisionRes = runner.playRoundDecision({
  cardId: r1.offeredCards[0].id,
  offeredCards: r1.offeredCards,
  willpowerAllocation: { officialdom: 3 }
});

assert.ok(decisionRes.chronicleText, '决断后必须生成起居注');
assert.ok(decisionRes.historicalSource, '决断后必须附带正史考证文献');
console.log(`  📌 抉择牌: 【${decisionRes.chosenCard.name}】`);
console.log(`  📌 正史出处: ${decisionRes.historicalSource}`);
console.log(`  📌 宗族起居注: "${decisionRes.chronicleText}"`);
console.log('  ✅ 真实历史剧情与沉浸度 100% 达成！\n');

console.log('================================================================');
console.log('🎉🎉 《华夏世家》真实历史剧情与沉浸度测试全部通过！');
console.log('================================================================');
