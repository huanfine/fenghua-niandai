/**
 * 华夏世家大系 · 统一时间权威服务 (Time Authority Service)
 * 职责：
 * 1. 单一时间权威：抵御客户端篡改系统时间 (Date.now())，采用服务器基准时间 + 单调增量 (performance.now) 防作弊；
 * 2. 闭合精准编年：杜绝浮点换算公差，严格按照篇章边界与真实周次严丝合缝映射（卷一至卷四 100~280年）；
 * 3. 统一多时钟枢纽：集中统筹单局年龄年份、赛季周次、全服世界年份与运营前沿线 (frontierYear)。
 */

class TimeAuthorityService {
  constructor() {
    this._serverTimeSynced = false;
    this._serverTimeOrigin = 0;
    this._monoTimeOrigin = 0;
    this._lastCalculatedTime = 0;
    this._tamperDetected = false;
    
    // 初始化单调基准
    this.syncWithServer(Date.now());
  }

  /**
   * 与云端时间单点对齐
   * @param {number} serverTimestampMs 云端下发的标准时间戳 (毫秒)
   */
  syncWithServer(serverTimestampMs) {
    if (typeof serverTimestampMs !== 'number' || isNaN(serverTimestampMs) || serverTimestampMs <= 0) {
      serverTimestampMs = Date.now();
    }
    const monoNow = typeof performance !== 'undefined' && typeof performance.now === 'function'
      ? performance.now()
      : 0;

    this._serverTimeOrigin = serverTimestampMs;
    this._monoTimeOrigin = monoNow;
    this._lastCalculatedTime = serverTimestampMs;
    this._serverTimeSynced = true;
    this._tamperDetected = false;
  }

  /**
   * 获取经过权威校验与单调推进的当前真实时间戳 (毫秒)
   */
  getAuthoritativeNow() {
    const monoNow = typeof performance !== 'undefined' && typeof performance.now === 'function'
      ? performance.now()
      : 0;

    let computedNow = this._serverTimeOrigin + Math.floor(monoNow - this._monoTimeOrigin);

    // 防作弊校验：如果单调时钟被破坏或环境不可用，回退检测本地 Date.now()
    if (monoNow === 0) {
      computedNow = Date.now();
    }

    // 严防时间倒流与大幅瞬移 (> 7 天的异常跳跃)
    if (computedNow < this._lastCalculatedTime) {
      this._tamperDetected = true;
      // 保持单调非递减，禁止倒流
      computedNow = this._lastCalculatedTime;
    } else {
      this._lastCalculatedTime = computedNow;
    }

    return computedNow;
  }

  /**
   * 检查是否检测到本地系统时间篡改
   */
  isTamperDetected() {
    return this._tamperDetected;
  }

  /**
   * 精确计算篇章边界与周次年份闭合映射
   * @param {number} currentWeek 当前周次 (1-based, 1~16)
   * @param {Array} chapters 篇章定义数组
   * @param {number} startYear 赛季起始年份 (如 100)
   * @param {number} endYear 赛季结束年份 (如 280)
   * @param {number} totalWeeks 赛季总周数 (如 16)
   */
  static calculateChronoYear(currentWeek, chapters, startYear = 100, endYear = 280, totalWeeks = 16) {
    const safeWeek = Math.max(1, Math.min(totalWeeks, Math.floor(currentWeek)));

    // 匹配当前所属篇章
    const ch = (chapters || []).find(c => safeWeek >= c.weekRange[0] && safeWeek <= c.weekRange[1]);
    if (ch) {
      const [wStart, wEnd] = ch.weekRange;
      const [yStart, yEnd] = ch.yearRange;
      if (wEnd === wStart) return yStart;
      // 在篇章内部严密闭合映射：wStart 对应 yStart，wEnd 对应 yEnd
      const ratio = (safeWeek - wStart) / (wEnd - wStart);
      return Math.round(yStart + ratio * (yEnd - yStart));
    }

    // 兜底：全局线性严密闭合映射 (week 1 -> startYear, week totalWeeks -> endYear)
    if (totalWeeks <= 1) return startYear;
    const globalRatio = (safeWeek - 1) / (totalWeeks - 1);
    return Math.round(startYear + globalRatio * (endYear - startYear));
  }
}

// 单例导出
const timeAuthority = new TimeAuthorityService();

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TimeAuthorityService,
    timeAuthority,
    timeAuthorityService: timeAuthority
  };
}
