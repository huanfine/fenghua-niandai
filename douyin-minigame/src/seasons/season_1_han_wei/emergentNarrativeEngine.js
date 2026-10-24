/**
 * 华夏世家 · 汉魏风骨（第一赛季）
 * 动态叙事涌现引擎 (Emergent Narrative Engine)
 * 
 * 职责：
 * 1. 彻底打破固定剧本模式，按家族真实张力、地理风貌与因果历史即时演算；
 * 2. 管理家族命运印记 (Karma Tags Net) 与代际因果回响；
 * 3. 动态赋权计算，确保千人千面，每一局都是独一无二的世家大戏！
 */

const { HAN_WEI_DYNAMIC_EVENT_POOL } = require('./dynamicEventPool.js');

// 地理区域归属映射表
const PROVINCE_TO_REGION = {
  // 西北边塞丝路
  '陕西': 'northwest', '甘肃': 'northwest', '宁夏': 'northwest', '青海': 'northwest', '新疆': 'northwest',
  // 中原腹地台阁
  '河南': 'central_plains', '山东': 'central_plains', '河北': 'central_plains', '山西': 'central_plains', '安徽': 'central_plains',
  // 江南水乡江表
  '江苏': 'south_river', '浙江': 'south_river', '江西': 'south_river', '湖北': 'south_river', '湖南': 'south_river', '广东': 'south_river', '福建': 'south_river', '四川': 'south_river'
};

class EmergentNarrativeEngine {
  constructor() {
    this.events = HAN_WEI_DYNAMIC_EVENT_POOL || [];
  }

  /**
   * 提炼当前家族与局内的完整情境上下文 (Context Extraction)
   */
  extractContext(state) {
    const fam = state.familyProfile || {};
    const prov = fam.province || '河南';
    const region = PROVINCE_TO_REGION[prov] || 'central_plains';

    // 庄园资源
    const manor = state.manor || {};
    const grain = typeof manor.granaryStoredGrain === 'number' ? manor.granaryStoredGrain : 300;
    const retainers = typeof manor.armedRetainers === 'number' ? manor.armedRetainers : 20;
    const watermills = typeof manor.watermills === 'number' ? manor.watermills : 0;
    const farmlands = typeof manor.farmlandAcres === 'number' ? manor.farmlandAcres : 30;

    // 家族资本与声誉
    const capital = typeof state.capital === 'number' ? state.capital : (state.money || 5000);
    const rep = typeof state.rep === 'number' ? state.rep : 50;
    const clean = typeof state.clean === 'number' ? state.clean : 50;

    // 历史因果印记库 (Karma Tags)
    const karmaSet = new Set((fam.clanTrust && Array.isArray(fam.clanTrust.karmaTags)) ? fam.clanTrust.karmaTags : []);

    return {
      year: state.year || 100,
      age: state.age || 20,
      province: prov,
      region: region,
      grain: grain,
      retainers: retainers,
      watermills: watermills,
      farmlands: farmlands,
      capital: capital,
      rep: rep,
      clean: clean,
      karmaSet: karmaSet,
      handledEvents: state.handledEvents || {}
    };
  }

  /**
   * 计算事件对当前家族的张力匹配得分 (Tension Relevance Scoring)
   */
  scoreEvent(event, ctx) {
    // 已经历过的事件不重复触发
    if (ctx.handledEvents[`dyn_${event.id}`] || ctx.handledEvents[event.id]) {
      return -1;
    }

    let score = 20; // 基础分
    const trig = event.trigger || {};

    // 1. 因果回响优先匹配 (最高权重: +100分)
    if (trig.requiresKarma && Array.isArray(trig.requiresKarma)) {
      const matchKarma = trig.requiresKarma.some(k => ctx.karmaSet.has(k));
      if (!matchKarma) return -1; // 缺乏前置因果，绝对无法触发
      score += 100;
    }

    // 2. 地理省份与区域匹配 (不重复叠加)
    if (trig.provinces && Array.isArray(trig.provinces)) {
      if (trig.provinces.includes(ctx.province)) {
        score += 35;
      } else {
        return -1; // 指定省份不符
      }
    } else if (trig.regionTypes && Array.isArray(trig.regionTypes)) {
      if (trig.regionTypes.includes(ctx.region)) {
        score += 25;
      } else {
        return -1; // 大区不符
      }
    }

    // 3. 家族资源失衡张力评估 (危机存亡，赋予高权重)
    // 粮多兵少
    if (typeof trig.grainMin === 'number' && typeof trig.retainersMax === 'number') {
      if (ctx.grain >= trig.grainMin && ctx.retainers <= trig.retainersMax) {
        score += 65;
      } else {
        return -1;
      }
    }
    // 兵力极盛
    if (typeof trig.retainersMin === 'number') {
      if (ctx.retainers >= trig.retainersMin) {
        score += 55;
      } else {
        return -1;
      }
    }
    // 水碓资产
    if (typeof trig.watermillsMin === 'number') {
      if (ctx.watermills >= trig.watermillsMin) {
        score += 45;
      } else {
        return -1;
      }
    }
    // 声望高而资财困窘
    if (typeof trig.reputeMin === 'number' && typeof trig.capitalMax === 'number') {
      if (ctx.rep >= trig.reputeMin && ctx.capital <= trig.capitalMax) {
        score += 70;
      } else {
        return -1;
      }
    }

    return score;
  }

  /**
   * 依据当前状态动态涌现最契合的世家事件
   * @param {object} state 游戏主状态
   * @returns {object|null}
   */
  generateEmergentStory(state) {
    const ctx = this.extractContext(state);
    const candidates = [];

    for (const evt of this.events) {
      const s = this.scoreEvent(evt, ctx);
      if (s > 0) {
        candidates.push({ event: evt, score: s });
      }
    }

    if (candidates.length === 0) return null;

    // 按得分排序，若有高分因果回响直接优先选出
    candidates.sort((a, b) => b.score - a.score);
    const topScore = candidates[0].score;

    // 若有压倒性高分（如因果回响 >= 100 分），直接触发
    if (topScore >= 100) {
      return candidates[0].event;
    }

    // 否则在得分前 3 名中依权重加权抽取，保证变奏感与沙盒自由度
    const topN = candidates.slice(0, 3);
    const totalW = topN.reduce((sum, c) => sum + c.score, 0);
    let rand = Math.random() * totalW;

    for (const cand of topN) {
      rand -= cand.score;
      if (rand <= 0) {
        return cand.event;
      }
    }
    return topN[0].event;
  }

  /**
   * 玩家抉择后更新家族因果印记库
   */
  applyKarmaChanges(choice, state) {
    if (!choice || !state.familyProfile) return;
    const fam = state.familyProfile;
    fam.clanTrust = fam.clanTrust || {};
    fam.clanTrust.karmaTags = fam.clanTrust.karmaTags || [];

    const kSet = new Set(fam.clanTrust.karmaTags);

    if (Array.isArray(choice.addKarmaTags)) {
      choice.addKarmaTags.forEach(t => kSet.add(t));
    }
    if (Array.isArray(choice.removeKarmaTags)) {
      choice.removeKarmaTags.forEach(t => kSet.delete(t));
    }

    fam.clanTrust.karmaTags = Array.from(kSet);
  }
}

module.exports = new EmergentNarrativeEngine();
