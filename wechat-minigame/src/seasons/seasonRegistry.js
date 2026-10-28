/**
 * 华夏世家大系 · 赛季总控注册中心 (Season Registry)
 * 
 * 职责：
 * 1. 注册并按需实例化各赛季包；
 * 2. 对引擎主场景提供统一的数据与逻辑查询 API；
 * 3. 彻底阻断跨赛季数据污染，支持后续无缝挂载新赛季包。
 */

const { BaseSeason } = require('./seasonContract.js');
const seasonOne = require('./season_1_han_wei/index.js');
const seasonTwo = require('./season_2_liu_chao/index.js');

class SeasonRegistry {
  constructor() {
    this.seasons = new Map();
    this.defaultSeasonId = 'season_1_han_wei';
    // 自动挂载第一赛季与第二赛季
    this.registerSeason(seasonOne);
    this.registerSeason(seasonTwo);
  }

  /**
   * 注册一个赛季包
   * @param {BaseSeason} seasonInstance 
   */
  registerSeason(seasonInstance) {
    if (!seasonInstance || typeof seasonInstance.getId !== 'function') {
      throw new Error('[SeasonRegistry] 注册对象必须符合 BaseSeason 契约！');
    }
    const id = seasonInstance.getId();
    this.seasons.set(id, seasonInstance);
    // console.log(`[SeasonRegistry] 赛季【${seasonInstance.getName()}】(${id}) 注册就绪。`);
  }

  /**
   * 获取指定赛季实例
   * @param {string} seasonId 
   * @returns {BaseSeason}
   */
  getSeason(seasonId) {
    if (this.seasons.has(seasonId)) {
      return this.seasons.get(seasonId);
    }
    return this.seasons.get(this.defaultSeasonId);
  }

  /**
   * 依据当前游戏状态自动识别当前生效的赛季实例
   * @param {object} gameState 游戏当前上下文
   * @returns {BaseSeason}
   */
  getActiveSeason(gameState = {}) {
    // 1. 优先依据家族档案绑定的赛季 ID
    if (gameState.familyProfile && gameState.familyProfile.currentSeasonId) {
      const s = this.getSeason(gameState.familyProfile.currentSeasonId);
      if (s) return s;
    }

    // 2. 其次依据显式指定的赛季 ID
    if (gameState.currentSeasonId) {
      const s = this.getSeason(gameState.currentSeasonId);
      if (s) return s;
    }

    // 3. 依据当前出生/历史年份断代
    const yr = typeof gameState.selectedBirthYear === 'number' 
      ? gameState.selectedBirthYear 
      : (typeof gameState.year === 'number' ? gameState.year : 100);

    if (yr <= 300) {
      return this.getSeason('season_1_han_wei');
    } else if (yr <= 500) {
      return this.getSeason('season_2_liu_chao') || this.getSeason('season_1_han_wei');
    } else {
      return this.getSeason('season_3_sui_tang') || this.getSeason('season_1_han_wei');
    }
  }

  /**
   * 获取所有已注册赛季的元数据列表 (用于赛季选择界面、全服赛季巡览等)
   */
  getAllRegisteredSeasonsMetadata() {
    const list = [];
    for (const [id, s] of this.seasons.entries()) {
      list.push(s.metadata);
    }
    return list;
  }

  /**
   * 统一桥接：根据年份决议纪元包
   */
  resolvePackByYear(year) {
    try {
      const { eraRegistry } = require('../era/EraRegistry.js');
      if (eraRegistry && typeof eraRegistry.resolvePackByYear === 'function') {
        return eraRegistry.resolvePackByYear(year);
      }
    } catch (_) {}
    return this.getActiveSeason({ year });
  }
}

// 单例模式导出
const seasonRegistry = new SeasonRegistry();

module.exports = {
  seasonRegistry,
  SeasonRegistry
};
