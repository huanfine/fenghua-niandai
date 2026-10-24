/**
 * 华夏世家大系 · 纪元内容提供者标准契约接口 (IEraContentProvider)
 * 职责：
 * 1. 规范化所有赛季/纪元的内容包契约，彻底消灭引擎核心中散落的硬编码三元判断；
 * 2. 隔离时代特有机制（如 S1 的察举/坞壁/经学 vs S10 的高考/大国工匠/商品房）；
 * 3. 使纪元可热插拔、可按赛季独立演进与封测。
 */

class IEraContentProvider {
  constructor(seasonMeta = {}) {
    this.meta = Object.assign({
      id: 'base_era',
      seasonIndex: 1,
      name: '基础纪元',
      timeSpan: [100, 300],
      currencyName: '文/钱'
    }, seasonMeta);
  }

  // 基础元数据
  getId() { return this.meta.id; }
  getSeasonIndex() { return this.meta.seasonIndex; }
  getName() { return this.meta.name; }
  getTimeSpan() { return this.meta.timeSpan; }
  getCurrencyName() { return this.meta.currencyName; }

  // 1. 初始数值与身世底色
  getInitialCapital() { return 5000; }
  getDefaultTrack() { return 'official'; }
  getYouthPath() { return 'scholar'; }
  getStrategicPillar() { return 'classics'; }
  getDefaultParentClass() { return '经学冠冕'; }
  getZhuazhouPool() { return []; }

  // 2. 赛道与官制
  getCareerTracks() { return []; }
  getOfficialLadders() { return {}; }

  // 3. 剧情、事件与案头文书
  getHistoricalEvents(worldYear, context = {}) { return []; }
  getProceduralDeck(playerState = {}) { return []; }
  getDeskDocuments() { return []; }

  // 4. 特性能力开关 (Feature Flags)
  isFeatureEnabled(featureName) {
    const supported = this.getSupportedFeatures();
    return !!supported[featureName];
  }

  getSupportedFeatures() {
    return {
      gaokao: false,
      houseMarket: false,
      dockWallBuild: true,      // 坞壁筑基
      nineRankOfficial: true,   // 九品官人法
      clanAncestralHall: true   // 宗族祠堂
    };
  }

  // 5. 代际传承结算
  settleSuccession(clanState, ancestorState) {
    return {
      posthumousTitle: '公',
      officialTitle: '名望先祖',
      bequestPrestige: 50
    };
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    IEraContentProvider
  };
}
