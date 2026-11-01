/**
 * sim-core/prng.js
 * 纯逻辑确定性伪随机数生成器 (Mulberry32)
 * 支持种子设定、状态导出与恢复，保证客户端决策与服务端重放 100% 一致。
 */

class PRNG {
  constructor(seed = 123456789) {
    this.initialSeed = typeof seed === 'number' ? seed : PRNG.hashString(String(seed));
    this.state = this.initialSeed >>> 0;
  }

  static hashString(str) {
    let hash = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 0x01000193);
    }
    return hash >>> 0;
  }

  /**
   * 产出 [0, 1) 的确定性浮点数
   */
  next() {
    let t = (this.state += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  /**
   * 产出 [min, max] 的整数
   */
  nextInt(min, max) {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * 数组洗牌 (Fisher-Yates)
   */
  shuffle(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /**
   * 加权随机选择一项
   * @param {Array<{weight: number, [key: string]: any}>} items
   */
  weightedPick(items) {
    if (!items || items.length === 0) return null;
    let total = 0;
    for (let i = 0; i < items.length; i++) {
      total += Math.max(0, items[i].weight || 1);
    }
    if (total <= 0) return items[0];

    const roll = this.next() * total;
    let acc = 0;
    for (let i = 0; i < items.length; i++) {
      acc += Math.max(0, items[i].weight || 1);
      if (roll < acc) {
        return items[i];
      }
    }
    return items[items.length - 1];
  }

  /**
   * 导出当前状态
   */
  saveState() {
    return {
      initialSeed: this.initialSeed,
      state: this.state
    };
  }

  /**
   * 恢复状态
   */
  restoreState(saved) {
    if (saved && typeof saved.state === 'number') {
      this.initialSeed = saved.initialSeed;
      this.state = saved.state >>> 0;
    }
  }
}

module.exports = PRNG;
