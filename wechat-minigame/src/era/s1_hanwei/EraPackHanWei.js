/**
 * 华夏世家大系 · 第一赛季【汉魏风骨】纪元内容包 (EraPackHanWei)
 * 对应历史时空：公元 100 年 ～ 300 年 (东汉中兴至太康一统)
 */

const { IEraContentProvider } = require('../IEraContentProvider');

class EraPackHanWei extends IEraContentProvider {
  constructor() {
    super({
      id: 'season_1_han_wei',
      seasonIndex: 1,
      name: '汉魏风骨 · 坞壁筑基',
      timeSpan: [100, 300],
      currencyName: '五铢钱'
    });
  }

  getInitialCapital() { return 5000; }
  getDefaultTrack() { return 'official'; }
  getYouthPath() { return 'scholar'; }
  getStrategicPillar() { return 'classics'; }
  getDefaultParentClass() { return '经学冠冕'; }

  getSupportedFeatures() {
    return {
      gaokao: false,            // 汉魏无现代高考
      houseMarket: false,       // 汉魏无现代商品房市场
      stockMarket: false,       // 汉魏无现代股票证券
      dockWallBuild: true,      // 汉魏坞壁营建
      nineRankOfficial: true,   // 九品官人法与察举
      manorEconomy: true,       // 庄园水碓经济
      clanAncestralHall: true   // 汉魏宗祠立庙
    };
  }

  getOfficialLadders() {
    try {
      const { HAN_WEI_OFFICIAL_LADDERS } = require('../../data/historicalMilieuHanWei');
      return HAN_WEI_OFFICIAL_LADDERS || {};
    } catch (_) {
      return {};
    }
  }

  getHistoricalEvents(worldYear, context = {}) {
    try {
      const { HAN_WEI_CRITICAL_CHRONO_EVENTS } = require('../../data/historicalMilieuHanWei');
      if (!Array.isArray(HAN_WEI_CRITICAL_CHRONO_EVENTS)) return [];
      if (!worldYear) return HAN_WEI_CRITICAL_CHRONO_EVENTS;
      return HAN_WEI_CRITICAL_CHRONO_EVENTS.filter(evt => evt.year === worldYear);
    } catch (_) {
      return [];
    }
  }

  getDeskDocuments() {
    try {
      const { HAN_WEI_DESK_DOCUMENTS } = require('../../data/historicalMilieuHanWei');
      return HAN_WEI_DESK_DOCUMENTS || [];
    } catch (_) {
      return [];
    }
  }
}

module.exports = {
  EraPackHanWei
};
