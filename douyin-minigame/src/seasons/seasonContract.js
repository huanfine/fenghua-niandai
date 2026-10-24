/**
 * 华夏世家大系 · 跨赛季统一架构契约规范 (Season Contract Schema)
 * 
 * 作用：
 * 1. 彻底解耦游戏引擎主循环与具体历史赛季；
 * 2. 规范后续新赛季（如第二赛季六朝烟雨、第三赛季隋唐盛世）的标准数据结构与接口契约；
 * 3. 杜绝不同历史时代代码互相污染（如现代词汇渗透进汉魏，或汉魏渗透进隋唐）。
 */

class BaseSeason {
  constructor(metadata) {
    if (!metadata || !metadata.id) {
      throw new Error('[SeasonContract] 赛季元数据必须包含有效 id！');
    }
    this.metadata = metadata;
  }

  // 1. 获取赛季基础信息
  getId() { return this.metadata.id; }
  getName() { return this.metadata.name; }
  getStartYear() { return this.metadata.historicalStartYear; }
  getEndYear() { return this.metadata.historicalEndYear; }
  getDurationWeeks() { return this.metadata.realDurationWeeks || 16; }
  getChapters() { return this.metadata.chapters || []; }

  // 2. 官制阶梯与仕途体系
  getOfficialLadders() {
    throw new Error(`[SeasonContract] 赛季 ${this.getId()} 未实现 getOfficialLadders()`);
  }

  // 3. 赛季专属年度随机遭遇池 (严格与时代契合，严禁串季)
  getAnnualEncounters(filter = {}) {
    throw new Error(`[SeasonContract] 赛季 ${this.getId()} 未实现 getAnnualEncounters()`);
  }

  // 4. 案头理政公文题库 (依照当时制度签批考核)
  getDeskDocuments(filter = {}) {
    throw new Error(`[SeasonContract] 赛季 ${this.getId()} 未实现 getDeskDocuments()`);
  }

  // 5. 重大历史关隘编年大案 (有正史卷次出处与时代大案)
  getCriticalChronoEvents(year = null) {
    throw new Error(`[SeasonContract] 赛季 ${this.getId()} 未实现 getCriticalChronoEvents()`);
  }

  // 6. 真实历史名宿谱系 (生卒传记、正史列传考据)
  getHistoricalFigures(year = null) {
    throw new Error(`[SeasonContract] 赛季 ${this.getId()} 未实现 getHistoricalFigures()`);
  }

  // 7. 门阀世家谱系 (郡望堂号、先祖源流、传世祖训)
  getProminentClans() {
    throw new Error(`[SeasonContract] 赛季 ${this.getId()} 未实现 getProminentClans()`);
  }

  // 8. 庄园/坞壁/经济体系配置
  getManorSystem() {
    throw new Error(`[SeasonContract] 赛季 ${this.getId()} 未实现 getManorSystem()`);
  }

  // 9. 赛季百科与制度典章 (供玩家查阅正史考据)
  getEncyclopedia() {
    return [];
  }

  // 10. 历史纯度校验器
  validatePurity(text) {
    if (typeof text !== 'string') return true;
    const forbidden = this.metadata.forbiddenKeywords || [];
    for (const kw of forbidden) {
      if (text.includes(kw)) {
        return { valid: false, keyword: kw };
      }
    }
    return { valid: true };
  }
}

module.exports = {
  BaseSeason
};
