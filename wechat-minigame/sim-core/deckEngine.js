/**
 * sim-core/deckEngine.js
 * 牌库抽取引擎：支持标签化过滤、加权随机、固定主线占比上限、防重复抽取与背面未知牌机制
 */

const { DECK_RULES } = require('./rules.js');

class DeckEngine {
  /**
   * @param {Array<Object>} cardPool 全量牌库数据
   * @param {import('./prng')} prng 确定性随机数发生器
   */
  constructor(cardPool = [], prng) {
    this.allCards = cardPool;
    this.prng = prng;
    this.drawnCardIds = new Set();
    this.mainlineDrawnCount = 0;
    this.totalDrawnCount = 0;
    this.lingeringEchoes = []; // 余波池
  }

  /**
   * 重置单局抽牌状态
   */
  reset() {
    this.drawnCardIds.clear();
    this.mainlineDrawnCount = 0;
    this.totalDrawnCount = 0;
    this.lingeringEchoes = [];
  }

  /**
   * 检查卡牌前置条件是否满足
   */
  isCardEligible(card, context = {}) {
    if (this.drawnCardIds.has(card.id)) return false;

    // 纪元检查
    if (card.era && context.era && card.era !== context.era && card.era !== 'all') {
      return false;
    }

    // 回合/年份前置
    if (card.minRound && context.currentRound && context.currentRound < card.minRound) {
      return false;
    }
    if (card.maxRound && context.currentRound && context.currentRound > card.maxRound) {
      return false;
    }

    // 幕次检查 (若卡牌标注了 act，且当前上下文中包含 act，优先匹配同幕或通用卡)
    if (card.act && context.act && card.act !== context.act && card.act !== 'all') {
      // 若当前幕已有足够候选卡，过滤掉非本幕卡
      return false;
    }

    // 出身检查
    if (card.requiredBackground && context.destinyCard) {
      const bg = context.destinyCard.background || context.destinyCard.origin;
      if (bg && card.requiredBackground !== bg && card.requiredBackground !== 'any') {
        return false;
      }
    }

    // 属性前置检查
    if (card.conditions && context.meters) {
      for (const [meterKey, range] of Object.entries(card.conditions)) {
        const val = context.meters[meterKey];
        if (typeof val === 'number') {
          if (range.min !== undefined && val < range.min) return false;
          if (range.max !== undefined && val > range.max) return false;
        }
      }
    }

    return true;
  }

  /**
   * 从牌库中抽取 3 张机缘牌供玩家抉择
   * 确保固定主线占比不超过 40%
   * 随机包含未知牌 (Unknown Face-down)
   * @param {Object} context 局内上下文 (currentRound, meters, destinyCard, etc.)
   * @returns {Array<Object>} 3 张机缘牌
   */
  drawTrio(context = {}) {
    const eligibleCards = this.allCards.filter(c => this.isCardEligible(c, context));
    const mainlinePool = eligibleCards.filter(c => c.isMainline || c.tags?.includes('mainline'));
    const dynamicPool = eligibleCards.filter(c => !c.isMainline && !c.tags?.includes('mainline'));

    const offers = [];
    const chosenIds = new Set();

    // 判定本轮是否可出主线牌
    const maxMainlineAllowed = Math.floor((this.totalDrawnCount + 1) * DECK_RULES.MAX_MAINLINE_RATIO) + 1;
    const canOfferMainline = (this.mainlineDrawnCount < maxMainlineAllowed) && mainlinePool.length > 0;

    // 尝试放 1 张主线牌（若允许且有符合条件的主线牌）
    if (canOfferMainline && mainlinePool.length > 0) {
      const pickedMain = this.prng.weightedPick(mainlinePool);
      if (pickedMain) {
        offers.push(this._packageCard(pickedMain, context));
        chosenIds.add(pickedMain.id);
      }
    }

    // 从动态池或备选池中补齐至 3 张
    const availablePool = eligibleCards.filter(c => !chosenIds.has(c.id));
    while (offers.length < DECK_RULES.HAND_OFFER_COUNT && availablePool.length > 0) {
      const picked = this.prng.weightedPick(availablePool);
      if (!picked) break;

      offers.push(this._packageCard(picked, context));
      chosenIds.add(picked.id);

      const idx = availablePool.findIndex(c => c.id === picked.id);
      if (idx !== -1) availablePool.splice(idx, 1);
    }

    // 如果仍不足 3 张（极罕见牌库空），从通用保底库补
    while (offers.length < DECK_RULES.HAND_OFFER_COUNT) {
      const fallbackCard = this._createFallbackCard(offers.length, context);
      offers.push(this._packageCard(fallbackCard, context));
    }

    return offers;
  }

  /**
   * 包装卡牌：标记未知牌、附带展示属性
   */
  _packageCard(rawCard, context) {
    const card = { ...rawCard };

    // 判定是否为背面未知牌：
    // 1. 卡自身明确标记 isMystery
    // 2. 或有 25% 概率随机成为未知牌（如果是危机或奇遇牌，且非必明示主线）
    const isMainline = card.isMainline || card.tags?.includes('mainline');
    const mysteryChance = (card.type === 'crisis' || card.type === 'miracle' || card.rarity === 'rare') ? 0.35 : 0.15;
    const isMystery = !isMainline && (card.isMystery || (this.prng.next() < mysteryChance));

    return {
      ...card,
      isMystery: !!isMystery,
      revealed: !isMystery,
      surfaceHint: isMystery ? this._generateSurfaceHint(card) : null
    };
  }

  _generateSurfaceHint(card) {
    // 预告大方向（信息稀缺设计）
    const hints = {
      crisis: '【天象凶兆】暗伏凶险',
      miracle: '【祥云聚顶】福泽奇缘',
      caravan: '【西域胡铃】有利可图',
      rival: '【杀机暗伏】强敌搦战',
      opportunity: '【风云渐起】顺势可为'
    };
    return hints[card.type] || '【迷雾重重】吉凶未知';
  }

  _createFallbackCard(index, context) {
    return {
      id: `fallback_card_${context.currentRound || 1}_${index}_${this.prng.nextInt(100, 999)}`,
      name: '闭门修德',
      type: 'opportunity',
      category: 'cultivation',
      description: '岁月沉寂，当闭门读书，修养家风。',
      tags: ['fallback'],
      weight: 10,
      difficulty: 10,
      rewards: { prestige: 2, grain: 2 }
    };
  }

  /**
   * 玩家抉择打出某张牌
   * @param {string} cardId 被选中的牌
   * @param {Array<Object>} offeredCards 本轮提供的3张牌
   */
  resolveChoice(cardId, offeredCards = []) {
    const chosen = offeredCards.find(c => c.id === cardId) || offeredCards[0];
    if (chosen) {
      this.drawnCardIds.add(chosen.id);
      this.totalDrawnCount++;
      if (chosen.isMainline || chosen.tags?.includes('mainline')) {
        this.mainlineDrawnCount++;
      }

      // 弃置牌产生余波机制
      const unchosen = offeredCards.filter(c => c.id !== chosen.id);
      for (const disc of unchosen) {
        if (disc.echoEffect) {
          this.lingeringEchoes.push({
            fromCardId: disc.id,
            name: disc.name,
            effect: disc.echoEffect
          });
        }
      }
    }
    return chosen;
  }
}

module.exports = DeckEngine;
