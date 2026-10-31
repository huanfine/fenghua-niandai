/**
 * 华夏世家 · 汉魏风骨（第一赛季）
 * 四个月（16周）宏观世界历史推进管线 (Season Chrono Pipeline)
 * 
 * 核心机制：
 * 1. 现实世界 4 个月为一个大赛季周期 (16 周，约 112~120 天)。
 * 2. 宏观世界历史时间从 公元 100 年 (汉和帝永元十二年) 稳步推进至 公元 280 年 (西晋太康元年灭吴一统)，总跨度 180 载。
 * 3. 现实中每周推进 11~12 年历史跨度。
 * 4. 划分为四大历史卷轴篇章 (每 4 周为一卷)：
 *    - 卷一 (第 1~4 周, 100~145年): 《东汉中兴与安顺余晖》
 *    - 卷二 (第 5~8 周, 146~190年): 《外戚宦官与党锢黄巾》
 *    - 卷三 (第 9~12 周, 191~235年): 《群雄并起与三国鼎立》
 *    - 卷四 (第 13~16 周, 236~280年): 《魏晋擅变与天下一统》
 * 5. 全服共振：全服处于同一宏观历史纪元；若玩家家族在乱世中不幸覆灭断绝，新开家族将从当前全服世界年份重新起步！
 */

const { HAN_WEI_CRITICAL_CHRONO_EVENTS } = require('./historicalMilieuHanWei');
let TimeAuthorityService = null;
let timeAuthority = null;
try {
  const taMod = require('../core/TimeAuthorityService');
  TimeAuthorityService = taMod.TimeAuthorityService;
  timeAuthority = taMod.timeAuthority;
} catch (_) {}

// 第一赛季宏观参数配置
const SEASON_CONFIG = {
  seasonId: 'season_1_han_wei',
  seasonName: '第一赛季 · 汉魏风骨',
  historicalStartYear: 100,
  historicalEndYear: 280,
  totalHistoricalYears: 180,
  totalSeasonWeeks: 16, // 4个月 = 16周
  msPerWeek: 7 * 24 * 60 * 60 * 1000,
  // 默认基准启动时间戳 (若未配置，默认使用2026年第4季度基准)
  fallbackStartTimeMs: new Date('2026-10-01T00:00:00+08:00').getTime()
};

// 四大篇章元数据
const SEASON_CHAPTERS = [
  {
    chapterIndex: 1,
    title: '卷一 · 东汉中兴与安顺余晖',
    weekRange: [1, 4],
    yearRange: [100, 145],
    tagline: '邓太后临朝称制，张衡造地动仪，经学名阀辟地筑坞壁，家风初奠。',
    historicalBackground: '汉和帝荡平窦氏，邓绥太后临朝听政。天下称安，经学大兴，豪右世家借察举之阶，累世传经，广置田庄坞壁。',
    keyFigureIds: ['zheng_xuan', 'cai_yong', 'chen_shi'],
    dangerLevel: '安稳平治，以筑基求学、经营坞壁、察举孝廉为主',
    eraAtmosphere: '东汉鼎盛余晖犹存，士人笃学尚德，坞壁初成，田庄井然。',
    weeklyDispatches: [
      '和帝扫平窦宪外戚之权，海内重修文德，郡县广求经明行修之士。',
      '邓太后临朝减膳纳谏，蔡伦奏上所造新纸，洛阳太学诸生手抄经传渐广。',
      '安帝崩，邓氏外戚遭连坐籍没，中朝宦官势力萌芽，世家大族纷纷固闭坞堡以防风潮。',
      '太史令张衡候风地动仪机发陇西，西羌小寇三辅，朝议移徙边民，关西豪强大修高垒。'
    ],
    clanRumors: [
      '听说北海郑公正在遍注群经，凡往受业者皆需通晓三礼之辨！',
      '蔡中郎近日得异木于灶下，斫为名琴，其音清绝，世人呼为焦尾。',
      '关陇坞堡皆用巨石筑基，墙厚丈余，纵有千骑亦难攻破。'
    ]
  },
  {
    chapterIndex: 2,
    title: '卷二 · 外戚宦官与党锢黄巾',
    weekRange: [5, 8],
    yearRange: [146, 190],
    tagline: '梁冀跋扈，两度党锢士人蒙难，黄巾烽燧燃九州，世家部曲初试锋芒。',
    historicalBackground: '外戚宦官轮番擅权，桓灵之世纲纪废弛。士林清议奋起抗争，两度陷于党锢之狱；张角太平道揭竿而起，乱世大幕轰然揭开。',
    keyFigureIds: ['cai_yong', 'chen_shi', 'zhang_zhongjing', 'hua_tuo'],
    dangerLevel: '风云骤变，面临清流站队、防御黄巾流寇、保护宗族大考验',
    eraAtmosphere: '外戚宦官轮番乱政，党锢之祸烈于刀兵，清流抗节，黄巾燎原。',
    weeklyDispatches: [
      '大将军梁冀专擅朝纲，威福自作，四方名士多杜门谢客以远嫌疑。',
      '宦官曹节等矫诏诛陈蕃窦武，收捕天下名士，天下大索党人，诸州豪门潜藏高士。',
      '朝政昏乱任人唯亲，海内清流愤懑，朝野道德沦落殆尽。',
      '张角黄巾之乱虽定，幽冀青徐余党复炽，刺史牧伯自专兵民，州郡割据之端倪已显。'
    ],
    clanRumors: [
      '梁上君子遇陈太丘亦感化向善，颍川陈氏门风真海内第一流也！',
      '洛阳西邸官爵明码标价，吾辈累世清白，安能以铜臭污祖德？',
      '中平初黄巾破县杀官，唯有壁垒森严、部曲精锐之大坞安然无恙。'
    ]
  },
  {
    chapterIndex: 3,
    title: '卷三 · 群雄并起与三国鼎立',
    weekRange: [9, 12],
    yearRange: [191, 235],
    tagline: '董卓焚洛阳废五铢，关东义军起，建安骨鲠，九品官人法奠定门阀之基。',
    historicalBackground: '董卓引兵乱京华，群雄逐鹿于中原。官渡定北方，赤壁分鼎立。曹魏立国，陈群创设九品中正制，上品无寒门，门阀政治臻于大成。',
    keyFigureIds: ['xun_yu', 'zhuge_liang', 'sima_yi'],
    dangerLevel: '天下大乱，通胀灾劫，战乱围庄，军政站队事关全族存亡',
    eraAtmosphere: '汉鼎倾颓群雄逐鹿，九品中正定品第，上品无寒门，门阀成大势。',
    weeklyDispatches: [
      '关东联军破董卓，董贼焚洛阳迁都长安，五铢废毁，谷帛代钱，天下饥谨大乱。',
      '曹孟德平定北方迎天子于许昌，荀令君主持选拔士人，天下贤俊争相归附。',
      '汉室终禅位曹魏，尚书仆射陈群定九品中正之制，州郡大小中正铨第门阀。',
      '诸葛武侯病卒五丈原，魏蜀吴三足鼎立，中原户口渐苏，占田荫客蔚然成风。'
    ],
    clanRumors: [
      '董相国所铸小钱薄如榆荚，市井买斗米竟需万钱，还是粟帛靠得住！',
      '荀令君所过处香风数日不绝，若得文若品藻一句，胜读十年诗书。',
      '九品中正既定，上品者累世通显，寒素之流难登台阁矣。'
    ]
  },
  {
    chapterIndex: 4,
    title: '卷四 · 魏晋擅变与天下一统',
    weekRange: [13, 16],
    yearRange: [236, 280],
    tagline: '正始玄谈，高平陵风云变色，司马代魏，楼船下益州灭吴一统。',
    historicalBackground: '正始之音空灵遗世，高平陵政变司马氏专政。淮南三叛烟消云散，西晋代魏建立。太康元年王濬楼船下江东，三国归晋，天下大定。',
    keyFigureIds: ['sima_yi', 'wang_bi', 'ji_kang', 'ruan_ji', 'wang_xiang', 'pei_xiu'],
    dangerLevel: '庙堂杀机四伏，政治站队最险，稍有不慎诛灭三族，安度者受封柱国',
    eraAtmosphere: '魏晋擅变风云莫测，名士避祸借酒托玄，晋武灭吴天下一统，繁华之下伏波澜。',
    weeklyDispatches: [
      '何晏、夏侯玄主盟中书，正始玄风盛行洛下，名士放浪形骸，研辨老庄有无。',
      '高平陵事发司马宣王扫灭曹爽，淮南诸葛诞起兵抗命，满朝公卿惴惴自危。',
      '晋受魏禅改元泰始，贾充裴秀位列台辅，武帝下诏求直言，立官品占田之制。',
      '王濬楼船顺流下江东，吴主孙皓面缚出降，西晋一统天下一扫百年分崩！'
    ],
    clanRumors: [
      '嵇中散东市绝弦，《广陵散》成广陵绝响，天下神交名士无不洒泪。',
      '阮步兵醉卧当街，见礼法之士作白眼，唯见知己方呈青眼。',
      '如今晋室既安，石崇王恺斗富于京洛，骄奢之风渐起，智者深忧之。'
    ]
  }
];

/**
 * 获取当前现实时间对应的宏观赛季编年推演状态
 * @param {number} currentTimestampMs 现实时间戳 (毫秒)
 * @param {number} seasonStartTimestampMs 赛季启动时间戳 (毫秒)
 * @returns {object} 宏观年代状态
 */
function getSeasonTimelineProgress(currentTimestampMs = null, seasonStartTimestampMs = null) {
  // 权威时间对齐：优先使用权威单调时钟防作弊，支持外部指定测试时间戳
  let currentMs = currentTimestampMs;
  if (currentMs === null || currentMs === undefined) {
    currentMs = (timeAuthority && typeof timeAuthority.getAuthoritativeNow === 'function')
      ? timeAuthority.getAuthoritativeNow()
      : Date.now();
  }

  const startMs = seasonStartTimestampMs || SEASON_CONFIG.fallbackStartTimeMs;
  const elapsedMs = Math.max(0, currentMs - startMs);

  // 计算当前处于第几周 (1-based, 封顶第 16 周)
  const currentWeek = Math.min(
    SEASON_CONFIG.totalSeasonWeeks,
    Math.max(1, Math.floor(elapsedMs / SEASON_CONFIG.msPerWeek) + 1)
  );

  // 严密闭合映射：匹配当前篇章边界，消除浮点除法公差，确保各周年份与四大篇章完全咬合
  let worldCurrentYear;
  if (TimeAuthorityService && typeof TimeAuthorityService.calculateChronoYear === 'function') {
    worldCurrentYear = TimeAuthorityService.calculateChronoYear(
      currentWeek,
      SEASON_CHAPTERS,
      SEASON_CONFIG.historicalStartYear,
      SEASON_CONFIG.historicalEndYear,
      SEASON_CONFIG.totalSeasonWeeks
    );
  } else {
    // 兜底双向闭合映射
    const globalRatio = (currentWeek - 1) / (SEASON_CONFIG.totalSeasonWeeks - 1);
    worldCurrentYear = Math.min(
      SEASON_CONFIG.historicalEndYear,
      Math.round(SEASON_CONFIG.historicalStartYear + globalRatio * (SEASON_CONFIG.historicalEndYear - SEASON_CONFIG.historicalStartYear))
    );
  }

  // 匹配当前所属历史篇章
  const currentChapter = SEASON_CHAPTERS.find(
    ch => currentWeek >= ch.weekRange[0] && currentWeek <= ch.weekRange[1]
  ) || SEASON_CHAPTERS[SEASON_CHAPTERS.length - 1];

  // 计算在当前篇章内的周偏移 (0-based) 与当周时局详报
  const weekOffsetInChapter = Math.max(0, currentWeek - currentChapter.weekRange[0]);
  const currentWeeklyDispatch = (currentChapter.weeklyDispatches && currentChapter.weeklyDispatches[weekOffsetInChapter])
    || (currentChapter.weeklyDispatches && currentChapter.weeklyDispatches[0])
    || currentChapter.tagline;

  // 筛选当周及之前活跃的重大历史关隘大案
  const allEvents = HAN_WEI_CRITICAL_CHRONO_EVENTS || [];
  const activeEvents = allEvents.filter(evt => {
    return evt.year <= worldCurrentYear && evt.year >= Math.max(100, worldCurrentYear - 25);
  });

  return {
    seasonId: SEASON_CONFIG.seasonId,
    seasonName: SEASON_CONFIG.seasonName,
    currentWeek: currentWeek,
    totalWeeks: SEASON_CONFIG.totalSeasonWeeks,
    progressPercentage: Math.round(((currentWeek) / SEASON_CONFIG.totalSeasonWeeks) * 100),
    worldCurrentYear: worldCurrentYear,
    historicalStartYear: SEASON_CONFIG.historicalStartYear,
    historicalEndYear: SEASON_CONFIG.historicalEndYear,
    chapter: currentChapter,
    currentWeeklyDispatch: currentWeeklyDispatch,
    clanRumors: currentChapter.clanRumors || [],
    eraAtmosphere: currentChapter.eraAtmosphere || '',
    activeEventsCount: activeEvents.length,
    activeEventsSample: activeEvents.slice(0, 3),
    // 供新建立家族或极端灭门后重生玩家参考的准入年份
    recommendedStartYear: Math.max(100, Math.min(270, worldCurrentYear))
  };
}

module.exports = {
  SEASON_CONFIG,
  SEASON_CHAPTERS,
  getSeasonTimelineProgress
};
