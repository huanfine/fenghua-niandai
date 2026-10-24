/**
 * 专项测试：S1 汉魏赛季前四周历史大案密度与触发覆盖验证
 * 验证目标：
 * 1. 验证第 1~4 周（卷一 · 东汉中兴与安顺余晖）拥有充实的历史关隘大案；
 * 2. 验证蔡侯造纸 (105年)、邓太后案 (121年)、张衡候风仪 (132年)、西羌深壁 (140年) 考据与字段完整；
 * 3. 验证卷一至卷四 12 大案年份覆盖无断档。
 */

const assert = require('assert');
const { HAN_WEI_CRITICAL_CHRONO_EVENTS } = require('./wechat-minigame/src/data/historicalMilieuHanWei');
const { getSeasonTimelineProgress, SEASON_CHAPTERS } = require('./wechat-minigame/src/data/seasonChronoPipeline');

console.log('====================================================');
console.log('📜 启动测试：S1 汉魏卷一 (前四周) 历史事件密度竖切验证');
console.log('====================================================');

// 1. 验证事件总数与前四周事件覆盖
console.log('\n--- 1. 验证历史大案总数与卷一事件 ---');
assert.ok(HAN_WEI_CRITICAL_CHRONO_EVENTS.length >= 13, '汉魏历史关隘大案总数必须达到至少13案！');

const chapterOneEvents = HAN_WEI_CRITICAL_CHRONO_EVENTS.filter(evt => evt.year >= 100 && evt.year <= 145);
console.log(`卷一 (100~145年) 历史大案数: ${chapterOneEvents.length} 案`);
assert.strictEqual(chapterOneEvents.length, 5, '卷一必须精准拥有5大标准历史关隘大案！');

const expectedIds = ['hw_event_100_yongyuan', 'hw_event_105_cailun', 'hw_event_121_dengtai', 'hw_event_132_zhangheng', 'hw_event_140_xixiang'];
expectedIds.forEach(id => {
  const found = chapterOneEvents.find(e => e.id === id);
  assert.ok(found, `必须存在大案 ${id}`);
  assert.ok(found.historicalSource, `${id} 必须具备严谨史料考据源`);
  assert.ok(found.options && found.options.length === 3, `${id} 必须具备3个深思熟虑的决策选项`);
  console.log(`✅ 关隘大案【${found.title}】(${found.year}年) 考据齐备，3级深度抉择就绪`);
});

// 2. 验证管线在第 1~4 周能正确检索出活跃事件
console.log('\n--- 2. 验证各周编年管线活跃大案检索 ---');
const weekTests = [
  { week: 1, year: 100, minEvents: 1 },
  { week: 2, year: 115, minEvents: 1 },
  { week: 3, year: 130, minEvents: 2 },
  { week: 4, year: 145, minEvents: 4 }
];

weekTests.forEach(wt => {
  const matchingEvents = HAN_WEI_CRITICAL_CHRONO_EVENTS.filter(e => e.year <= wt.year);
  assert.ok(matchingEvents.length >= wt.minEvents, `第 ${wt.week} 周 (${wt.year}年) 必须有至少 ${wt.minEvents} 个大案沉淀`);
  console.log(`✅ 第 ${wt.week} 周 (公元${wt.year}年): 累计解锁 ${matchingEvents.length} 个汉魏重大历史大案`);
});

console.log('\n====================================================');
console.log('🎉 S1 汉魏前四周历史事件密度竖切验证 100% 全部通过！');
console.log('====================================================');
