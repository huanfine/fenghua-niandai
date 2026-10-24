/**
 * 专项测试：统一权威时间服务 (TimeAuthorityService) 与篇章编年闭合映射
 * 验证目标：
 * 1. 验证篇章边界与周次年份严丝合缝闭合，消除浮点除法端点偏差 (第16周直达280年太康一统)；
 * 2. 验证本地时钟回拨/篡改检测机制；
 * 3. 验证单调非递减时钟保障。
 */

const assert = require('assert');
const { TimeAuthorityService, timeAuthority } = require('./wechat-minigame/src/core/TimeAuthorityService');
const { SEASON_CHAPTERS, getSeasonTimelineProgress, SEASON_CONFIG } = require('./wechat-minigame/src/data/seasonChronoPipeline');

console.log('====================================================');
console.log('⏳ 启动测试：统一权威时间服务与宏观编年闭合映射');
console.log('====================================================');

// 1. 验证四大篇章与周次年份精准闭合咬合
console.log('\n--- 1. 验证四大卷轴篇章周次与年份映射 ---');

const expectedCheckpoints = [
  { week: 1, expectedYear: 100, desc: '卷一第1周 (东汉中兴起点)' },
  { week: 4, expectedYear: 145, desc: '卷一第4周 (卷一闭合终点)' },
  { week: 5, expectedYear: 146, desc: '卷二第5周 (党锢黄巾起点)' },
  { week: 8, expectedYear: 190, desc: '卷二第8周 (卷二闭合终点)' },
  { week: 9, expectedYear: 191, desc: '卷三第9周 (三国鼎立起点)' },
  { week: 12, expectedYear: 235, desc: '卷三第12周 (卷三闭合终点)' },
  { week: 13, expectedYear: 236, desc: '卷四第13周 (魏晋擅变起点)' },
  { week: 16, expectedYear: 280, desc: '卷四第16周 (太康一统终局)' }
];

expectedCheckpoints.forEach(cp => {
  const year = TimeAuthorityService.calculateChronoYear(
    cp.week,
    SEASON_CHAPTERS,
    SEASON_CONFIG.historicalStartYear,
    SEASON_CONFIG.historicalEndYear,
    SEASON_CONFIG.totalSeasonWeeks
  );
  assert.strictEqual(year, cp.expectedYear, `${cp.desc} 年份映射不符合预期：实际 ${year} vs 预期 ${cp.expectedYear}`);
  console.log(`✅ ${cp.desc}: 第 ${cp.week} 周 -> 公元 ${year} 年 (精准匹配)`);
});

// 2. 验证通过时间戳推导的宏观赛季推进管线
console.log('\n--- 2. 验证真实时间戳推进与第16周太康一统 ---');

const startMs = SEASON_CONFIG.fallbackStartTimeMs;
// 第16周末尾时间
const week16Ms = startMs + (15.5 * SEASON_CONFIG.msPerWeek);
const progressWeek16 = getSeasonTimelineProgress(week16Ms, startMs);

assert.strictEqual(progressWeek16.currentWeek, 16, '第16周计算周数必须为16');
assert.strictEqual(progressWeek16.worldCurrentYear, 280, '第16周世界年份必须达到公元280年太康一统！');
assert.strictEqual(progressWeek16.chapter.chapterIndex, 4, '第16周必须属于卷四');
console.log(`✅ 第16周宏观世界推进状态正确：当前第 ${progressWeek16.currentWeek} 周，世界年份 ${progressWeek16.worldCurrentYear} 年，所属【${progressWeek16.chapter.title}】`);

// 3. 验证时间权威服务抗回拨与篡改检测
console.log('\n--- 3. 验证时钟抗篡改与单调时钟保障 ---');

const svc = new TimeAuthorityService();
const baseTime = Date.now();
svc.syncWithServer(baseTime);

const t1 = svc.getAuthoritativeNow();
assert.ok(t1 >= baseTime, '权威时钟初始时间正常');

// 模拟时钟被违规回拨 1000 秒
svc._lastCalculatedTime = t1 + 50000;
// 下一次读取被人为篡改倒流的时间
svc._serverTimeOrigin = t1 - 100000;
const t2 = svc.getAuthoritativeNow();

assert.strictEqual(svc.isTamperDetected(), true, '时钟倒流必须被标记为篡改检测！');
assert.ok(t2 >= t1 + 50000, '受篡改保护的时钟必须保持单调非递减！');
console.log('✅ 时钟倒流篡改成功被捕获并激活单调非递减保护');

console.log('\n====================================================');
console.log('🎉 权威时间服务与宏观编年闭合映射测试 100% 通过！');
console.log('====================================================');
