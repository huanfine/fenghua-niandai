/**
 * 华夏世家大系 · 第二赛季预留骨架 (Season 2 Liu-Chao: 六朝烟雨 公元300~500年)
 * 展示架构扩展性：只需继承 BaseSeason 并填入时代数据即可无缝上线新赛季！
 */

const { BaseSeason } = require('../seasonContract');

class SeasonTwoLiuChao extends BaseSeason {
  constructor() {
    super({
      id: 'season_2_liu_chao',
      name: '第二赛季 · 六朝烟雨',
      historicalStartYear: 300,
      historicalEndYear: 500,
      totalHistoricalYears: 200,
      realDurationWeeks: 16,
      dynastyName: '西晋晚期 · 东晋 · 宋 · 齐 · 梁',
      themeDescription: '衣冠南渡江左聚，王谢风流主中军。北地烽烟胡汉起，草庐深处筑庄园。'
    });
  }

  getOfficialLadders() { return {}; }
  getAnnualEncounters() { return []; }
  getDeskDocuments() { return []; }
  getCriticalChronoEvents() { return []; }
  getHistoricalFigures() { return []; }
  getProminentClans() { return []; }
  getManorSystem() { return { currencyName: '钱帛兼行' }; }
}

module.exports = new SeasonTwoLiuChao();
