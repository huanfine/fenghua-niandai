/**
 * 华夏世家大系 · 第十赛季【近代风雷 · 当代弄潮】纪元内容包 (EraPackModern)
 * 对应历史时空：公元 1900 年 ～ 2100 年 (涵盖1978改革开放、1992~2035当代激荡弄潮人生)
 * 说明：
 * 本包完整封装原工程积累的现代职业人生资产（大国工匠、铁血铸剑、高考博弈、商品房买卖、行业风口故事），
 * 作为后续赛季的核心标准扩展包待命，引擎底座不再对其做任何临时性特判分支。
 */

const { IEraContentProvider } = require('../IEraContentProvider');

class EraPackModern extends IEraContentProvider {
  constructor() {
    super({
      id: 'season_10_modern',
      seasonIndex: 10,
      name: '近代风雷 · 当代弄潮',
      timeSpan: [1900, 2100],
      currencyName: '元/万元'
    });
  }

  getInitialCapital() { return 24000; }
  getDefaultTrack() { return 'gov'; }
  getYouthPath() { return 'gaokao'; }
  getStrategicPillar() { return 'mfg'; }
  getDefaultParentClass() { return '工薪模范'; }

  getSupportedFeatures() {
    return {
      gaokao: true,             // 现代高考机制
      houseMarket: true,        // 商品房买卖与按揭
      stockMarket: true,        // 现代证券股票投资
      dockWallBuild: false,     // 现代无古式坞壁
      nineRankOfficial: false,  // 现代无九品中正
      manorEconomy: false,      // 现代无古代庄园水碓
      clanAncestralHall: true   // 现代家族数字信托与宗族祠堂延续
    };
  }

  getCareerTracks() {
    try {
      const { TRACK_CONFIGS } = require('../../data/tracks');
      return TRACK_CONFIGS || {};
    } catch (_) {
      return {};
    }
  }

  getProceduralDeck(playerState = {}) {
    try {
      const { MODULAR_STORY_DECK } = require('../../data/stories');
      return MODULAR_STORY_DECK || [];
    } catch (_) {
      return [];
    }
  }

  getDeskDocuments() {
    try {
      const { DESK_DOCUMENTS } = require('../../data/deskDocs');
      return DESK_DOCUMENTS || [];
    } catch (_) {
      return [];
    }
  }
}

module.exports = {
  EraPackModern
};
