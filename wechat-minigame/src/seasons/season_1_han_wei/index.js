/**
 * 华夏世家大系 · 第一赛季总控入口 (Season 1 Han-Wei Pack)
 * 严格遵照 BaseSeason 规范契约实现
 */

const { BaseSeason } = require('../seasonContract.js');
const metadata = require('./metadata.js');
const milieu = require('../../data/historicalMilieuHanWei.js');
const { HAN_WEI_EXTENDED_STORY_ARCS } = require('./storyArcs.js');
const { HAN_WEI_EXPANDED_ENCOUNTERS } = require('./expandedEncounters.js');
const { HAN_WEI_FIGURE_THEATRE_EVENTS } = require('./figureEvents.js');
const emergentEngine = require('./emergentNarrativeEngine.js');

class SeasonOneHanWei extends BaseSeason {
  constructor() {
    super(metadata);
    this.milieu = milieu;
    this.storyArcs = HAN_WEI_EXTENDED_STORY_ARCS || [];
    this.expandedEncounters = HAN_WEI_EXPANDED_ENCOUNTERS || [];
    this.figureTheatreEvents = HAN_WEI_FIGURE_THEATRE_EVENTS || [];
    this.emergentEngine = emergentEngine;

    this.trackMapping = {
      'gov': 'official',
      'official': 'official',
      'biz': 'merchant',
      'merchant': 'merchant',
      'trade': 'merchant',
      'scholar': 'scholar',
      'tech': 'scholar',
      'industry': 'scholar',
      'art': 'scholar',
      'military': 'military',
      'recluse': 'recluse',
      'all': 'all'
    };
  }

  /**
   * 规范化赛道名称，彻底阻断老代码键名偏差
   */
  normalizeTrack(track) {
    if (!track) return 'official';
    return this.trackMapping[track] || 'official';
  }

  /**
   * 1. 获取汉魏官制晋升阶梯
   */
  getOfficialLadders() {
    return this.milieu.HAN_WEI_OFFICIAL_LADDERS || {};
  }

  /**
   * 2. 动态沙盒叙事涌现 (Dynamic Emergent Narrative)
   * 彻底废除固定年份剧本，按家族状态、地理郡望与因果印记即时演算！
   */
  generateEmergentStory(state) {
    if (this.emergentEngine && typeof this.emergentEngine.generateEmergentStory === 'function') {
      return this.emergentEngine.generateEmergentStory(state);
    }
    return null;
  }

  /**
   * 记录因果印记变动
   */
  applyKarmaChanges(choice, state) {
    if (this.emergentEngine && typeof this.emergentEngine.applyKarmaChanges === 'function') {
      this.emergentEngine.applyKarmaChanges(choice, state);
    }
  }

  /**
   * 3. 获取汉魏时代专属年度随机遭遇池
   */
  getAnnualEncounters(filter = {}) {
    const basePool = this.milieu.HAN_WEI_PROCEDURAL_ENCOUNTER_POOL || [];
    const fullPool = basePool.concat(this.expandedEncounters);

    const targetTrack = filter.track ? this.normalizeTrack(filter.track) : null;
    const year = typeof filter.year === 'number' ? filter.year : null;

    return fullPool.filter(evt => {
      if (targetTrack && evt.track !== 'all' && evt.track !== targetTrack) {
        return false;
      }
      if (year !== null) {
        if (typeof evt.minYear === 'number' && year < evt.minYear) return false;
        if (typeof evt.maxYear === 'number' && year > evt.maxYear) return false;
      }
      return true;
    });
  }

  /**
   * 4. 获取汉魏案头公文卷宗
   */
  getDeskDocuments(track = 'official', filter = {}) {
    const normTrack = this.normalizeTrack(track);
    const docsObj = this.milieu.HAN_WEI_DESK_DOCUMENTS || {};
    let list = docsObj[normTrack] || docsObj['official'] || [];

    const age = typeof filter.age === 'number' ? filter.age : null;
    if (age !== null) {
      list = list.filter(d => {
        if (typeof d.minAge === 'number' && age < d.minAge) return false;
        if (typeof d.maxAge === 'number' && age > d.maxAge) return false;
        return true;
      });
    }
    return list;
  }

  /**
   * 5. 真实历史名士深度交互剧场 (Figure Theatre Events)
   */
  getFigureTheatreEvents(year = null) {
    if (typeof year === 'number') {
      return this.figureTheatreEvents.filter(f => year >= f.minYear && year <= f.maxYear);
    }
    return this.figureTheatreEvents;
  }

  /**
   * 6. 重大历史关隘大案 (有正史出处)
   */
  getCriticalChronoEvents(year = null) {
    const events = this.milieu.HAN_WEI_CRITICAL_CHRONO_EVENTS || [];
    if (typeof year === 'number') {
      return events.filter(e => e.year === year);
    }
    return events;
  }

  /**
   * 7. 真实历史名宿谱系 (十六位名士)
   */
  getHistoricalFigures(year = null) {
    const figs = this.milieu.HAN_WEI_HISTORICAL_FIGURES || [];
    if (typeof year === 'number') {
      return figs.filter(f => year >= f.birthYear && year <= f.deathYear);
    }
    return figs;
  }

  /**
   * 8. 汉魏门阀世家谱系与祖训
   */
  getProminentClans() {
    return this.milieu.HAN_WEI_PROMINENT_CLANS || [];
  }

  /**
   * 9. 汉魏庄园经略系统配置
   */
  getManorSystem() {
    return {
      currencyName: '五铢钱',
      grainName: '石',
      farmlandUnit: '亩',
      facilityTypes: ['良田', '望楼坞堡', '水碓', '部曲营垒', '宗族义仓', '经学藏书阁']
    };
  }

  /**
   * 10. 汉魏制度典章与通鉴百科
   */
  getEncyclopedia() {
    return {
      institutions: this.milieu.HAN_WEI_INSTITUTIONAL_COMPENDIUM || [],
      chronicles: this.milieu.HAN_WEI_CHRONICLE_ENCYCLOPEDIA || []
    };
  }
}

module.exports = new SeasonOneHanWei();
