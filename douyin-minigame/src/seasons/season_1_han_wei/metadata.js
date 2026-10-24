/**
 * 华夏世家大系 · 第一赛季元数据定义
 * 赛季名称：汉魏风骨 (公元 100 ~ 280 年)
 */

module.exports = {
  id: 'season_1_han_wei',
  name: '第一赛季 · 汉魏风骨',
  historicalStartYear: 100,
  historicalEndYear: 280,
  totalHistoricalYears: 180,
  realDurationWeeks: 16, // 4个月 = 16周
  dynastyName: '东汉 · 曹魏 · 蜀汉 · 孙吴 · 西晋',
  themeDescription: '累世经学立宗祠，坞壁千重御乱世。两百载汉魏风骨，出将入相定九品。',
  chapters: [
    {
      chapterIndex: 1,
      title: '卷一 · 东汉中兴与安顺余晖',
      weekRange: [1, 4],
      yearRange: [100, 145],
      tagline: '邓太后临朝称制，张衡造地动仪，经学名阀辟地筑坞壁，家风初奠。',
      historicalBackground: '汉和帝荡平窦氏，邓绥太后临朝听政。天下称安，经学大兴，豪右世家借察举之阶，累世传经，广置田庄坞壁。'
    },
    {
      chapterIndex: 2,
      title: '卷二 · 外戚宦官与党锢黄巾',
      weekRange: [5, 8],
      yearRange: [146, 190],
      tagline: '梁冀跋扈，两度党锢士人蒙难，黄巾烽燧燃九州，世家部曲初试锋芒。',
      historicalBackground: '外戚宦官轮番擅权，桓灵之世卖官鬻爵。士林清议奋起抗争，两度陷于党锢之狱；张角太平道揭竿而起，乱世大幕轰然揭开。'
    },
    {
      chapterIndex: 3,
      title: '卷三 · 群雄并起与三国鼎立',
      weekRange: [9, 12],
      yearRange: [191, 235],
      tagline: '董卓焚洛阳废五铢，关东义军起，建安骨鲠，九品官人法奠定门阀之基。',
      historicalBackground: '董卓引兵乱京华，群雄逐鹿于中原。官渡定北方，赤壁分鼎立。曹魏立国，陈群创设九品中正制，上品无寒门，门阀政治臻于大成。'
    },
    {
      chapterIndex: 4,
      title: '卷四 · 魏晋擅变与天下一统',
      weekRange: [13, 16],
      yearRange: [236, 280],
      tagline: '正始玄谈，高平陵风云变色，司马代魏，楼船下益州灭吴一统。',
      historicalBackground: '正始之音空灵遗世，高平陵政变司马氏专政。淮南三叛烟消云散，西晋代魏建立。太康元年王濬楼船下江东，三国归晋，天下大定。'
    }
  ],
  // 严禁在第一赛季出现的越界与现代违规黑名单 (质量防线)
  forbiddenKeywords: [
    '保税', '冷链', '进出口', '航模', '无线电', '芯片', '算法', '高科技', '现代',
    '互联网', 'CTO', 'CEO', '创业团队', '红砖平房', '少年宫', '大院', '公社',
    '大队', '万元户', '下海', '知青', '高考', '考研', '博士', '硕士', '大学生',
    '科举', '状元', '探花', '榜眼', '进士', '举人', '秀才公', '内阁', '军机处'
  ]
};
