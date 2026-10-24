/**
 * 华夏世家大系 · 纪元包总控注册中心 (Era Registry)
 * 职责：
 * 1. 注册管理所有赛季的 EraPack 实例；
 * 2. 根据玩家当前所处年份 (year) 或赛季 (seasonIndex) 自动决议并切换当前活跃的纪元包；
 * 3. 对外统一暴露纪元能力查询接口，消灭所有业务层的手工三元判断。
 */

const { EraPackHanWei } = require('./s1_hanwei/EraPackHanWei');
const { EraPackModern } = require('./s10_modern/EraPackModern');

class EraRegistry {
  constructor() {
    this._packs = new Map();
    this._activePack = null;

    // 注册内置赛季包
    this.registerPack(new EraPackHanWei());
    this.registerPack(new EraPackModern());

    // 默认当前主运营赛季：S1 汉魏风骨
    this.setActivePack('season_1_han_wei');
  }

  registerPack(packInstance) {
    if (!packInstance || !packInstance.getId) return;
    this._packs.set(packInstance.getId(), packInstance);
  }

  getPackById(id) {
    return this._packs.get(id) || null;
  }

  getPackBySeasonIndex(seasonIndex) {
    for (const pack of this._packs.values()) {
      if (pack.getSeasonIndex() === seasonIndex) {
        return pack;
      }
    }
    return null;
  }

  /**
   * 根据当前游戏年份自动决议适用的纪元包
   * @param {number} year 年份 (如 100~300 汉魏, 1990~2035 现代)
   */
  resolvePackByYear(year) {
    if (typeof year !== 'number' || isNaN(year)) {
      return this._activePack;
    }
    for (const pack of this._packs.values()) {
      const [start, end] = pack.getTimeSpan();
      if (year >= start && year <= end) {
        return pack;
      }
    }
    // 年份在 300 之前默认汉魏，其他情况若未命中返回当前活跃包
    if (year <= 300) {
      return this.getPackById('season_1_han_wei');
    }
    return this._activePack;
  }

  setActivePack(id) {
    const pack = this.getPackById(id);
    if (pack) {
      this._activePack = pack;
      return true;
    }
    return false;
  }

  getActivePack() {
    return this._activePack;
  }

  /**
   * 快捷查询：当前纪元是否支持某特性
   * @param {string} feature 特性名 (如 'gaokao', 'dockWallBuild')
   * @param {number} optionalYear 可选年份
   */
  isFeatureEnabled(feature, optionalYear = null) {
    const pack = optionalYear !== null ? this.resolvePackByYear(optionalYear) : this._activePack;
    return pack ? pack.isFeatureEnabled(feature) : false;
  }
}

const eraRegistry = new EraRegistry();

module.exports = {
  EraRegistry,
  eraRegistry
};
