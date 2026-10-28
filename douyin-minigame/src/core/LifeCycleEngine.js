/**
 * 华夏世家大系 · 回合生命周期引擎 (LifeCycleEngine)
 * 职责：
 * 1. 控制角色单局生命周期的年份与年龄步进（每年一回合）；
 * 2. 统筹属性增减限幅、核心健康衰减与寿命终点裁定；
 * 3. 行动力 (AP) 恢复与精力分配；
 * 4. 纯函数设计，便于单元测试与自动化高密度压测。
 */

class LifeCycleEngine {
  constructor() {}

  /**
   * 限制属性在合理合法区间 [-1000, 1000]
   */
  clampStats(state) {
    if (!state || typeof state !== 'object') return;
    const boundedKeys = ['health', 'iq', 'eq', 'courage', 'clean', 'rep', 'resilience'];
    boundedKeys.forEach(k => {
      if (typeof state[k] === 'number') {
        const maxCap = (k === 'iq' && state.clanIqCapBonus) ? (100 + state.clanIqCapBonus) : 100;
        state[k] = Math.max(0, Math.min(maxCap, Math.round(state[k])));
      }
    });
    if (typeof state.ap === 'number') {
      const maxAp = (state.maxAp || 100) + (state.bonusMaxAp || 0);
      state.ap = Math.max(0, Math.min(maxAp, state.ap));
    }
    if ((state.age || 0) < 18) {
      state.govLevel = 0;
      state.rankIndex = 0;
      state.lifetimeMaxRank = 0;
    } else if (typeof state.govLevel === 'number' || typeof state.rankIndex === 'number') {
      const lvl = Math.max(1, Math.min(5, Math.round(state.govLevel || state.rankIndex || 1)));
      state.govLevel = lvl;
      state.rankIndex = lvl;
      state.lifetimeMaxRank = Math.max(state.lifetimeMaxRank || 1, lvl);
    }
  }

  /**
   * 年度回合自然推进 (Advance One Year)
   * @param {object} state 当前人物状态
   * @returns {object} { isAlive: boolean, deathReason?: string, yearSummary: object }
   */
  advanceYear(state) {
    if (!state) return { isAlive: false, deathReason: 'INVALID_STATE' };

    state.age = (state.age || 0) + 1;
    state.year = (state.year || 100) + 1;

    // 行动力每年自然恢复满额
    const maxAp = (state.maxAp || 100) + (state.bonusMaxAp || 0);
    state.ap = maxAp;

    // 高龄生理衰退 (50岁以后每年前进健康轻微损耗)
    if (state.age >= 50) {
      const decay = state.age >= 70 ? 4 : (state.age >= 60 ? 3 : 2);
      state.health = Math.max(0, (state.health || 80) - decay);
    }

    // 属性安全裁剪
    this.clampStats(state);

    // 寿命检定
    const lifespanCeiling = state.lifespanCeiling || 75;
    if (state.age >= lifespanCeiling || state.health <= 0) {
      return {
        isAlive: false,
        deathReason: state.health <= 0 ? 'ILLNESS' : 'NATURAL_END',
        yearSummary: { age: state.age, year: state.year }
      };
    }

    return {
      isAlive: true,
      yearSummary: { age: state.age, year: state.year, health: state.health, ap: state.ap }
    };
  }
}

const lifeCycleEngine = new LifeCycleEngine();

module.exports = {
  LifeCycleEngine,
  lifeCycleEngine
};
