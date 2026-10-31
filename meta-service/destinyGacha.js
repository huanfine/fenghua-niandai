/**
 * meta-service/destinyGacha.js
 * 局前宿命命盘抽卡与天命直选服务
 * 落实：3选1命盘、免费重卜2次、洗髓令上限3枚、50%/33%/14%/3%概率表、8抽保底紫、30抽保底金、直选名册与直选券3局冷却
 */

const { RESOURCES_CAP } = require('../sim-core/rules.js');
const PRNG = require('../sim-core/prng.js');

class DestinyGachaService {
  /**
   * @param {Object} options
   * @param {Array<Object>} options.destinyPool 身份卡库
   * @param {Object} options.clanState 家族全局状态 (保底计数器、名册、道具等)
   */
  constructor({ destinyPool = [], clanState = {} } = {}) {
    this.destinyPool = destinyPool;
    this.clanState = clanState;

    // 保底计数器存持久层
    if (!this.clanState.gachaPity) {
      this.clanState.gachaPity = {
        sinceLastEpicOrHigher: 0,   // 8 抽保底紫
        sinceLastLegendary: 0       // 30 抽保底金
      };
    }

    // 直选名册与冷却字典
    if (!this.clanState.unlockedRoster) {
      this.clanState.unlockedRoster = new Set();
    }
    if (!this.clanState.cardCooldowns) {
      this.clanState.cardCooldowns = {}; // cardId -> remainingRuns
    }
  }

  /**
   * 启动单局抽卡会话
   * @param {number|string} sessionSeed
   */
  createSession(sessionSeed = Date.now()) {
    const prng = new PRNG(sessionSeed);
    const session = {
      seed: sessionSeed,
      freeRerollsLeft: RESOURCES_CAP.FREE_GACHA_REROLLS, // 2 次
      washTokensUsed: 0,
      maxWashTokens: RESOURCES_CAP.MAX_WASH_MARROW_TOKENS, // 3 枚
      currentTrio: [],
      chosenCard: null,
      isDirectSelected: false
    };

    // 摇出初始第一盘
    session.currentTrio = this._rollTrio(prng);
    return { session, prng };
  }

  /**
   * 执行命盘重卜 (整盘刷新)
   * @param {Object} session
   * @param {import('../sim-core/prng')} prng
   * @param {boolean} userAgreedUseToken 用户是否同意在免费耗尽后消耗洗髓令
   */
  rerollBoard(session, prng, userAgreedUseToken = false) {
    if (session.chosenCard) {
      return { success: false, reason: '已选定命盘卡牌，不可重卜' };
    }

    if (session.freeRerollsLeft > 0) {
      session.freeRerollsLeft--;
      session.currentTrio = this._rollTrio(prng);
      return {
        success: true,
        mode: 'free',
        freeRerollsLeft: session.freeRerollsLeft,
        currentTrio: session.currentTrio
      };
    }

    // 消耗洗髓令
    if (!userAgreedUseToken) {
      return { success: false, reason: '免费重卜已用尽，需要确认消耗洗髓令' };
    }

    if (session.washTokensUsed >= session.maxWashTokens) {
      return { success: false, reason: `本局洗髓令已达上限 (${session.maxWashTokens} 枚)` };
    }

    const availableTokens = this.clanState.washMarrowTokens || 0;
    if (availableTokens <= 0) {
      return { success: false, reason: '宗族洗髓令库存不足' };
    }

    // 消耗 1 枚洗髓令
    this.clanState.washMarrowTokens--;
    session.washTokensUsed++;
    session.currentTrio = this._rollTrio(prng);

    return {
      success: true,
      mode: 'token',
      washTokensUsed: session.washTokensUsed,
      remainingClanTokens: this.clanState.washMarrowTokens,
      currentTrio: session.currentTrio
    };
  }

  /**
   * 玩家从当前命盘 3 张中选定 1 张入局
   */
  selectCardFromBoard(session, cardId) {
    const card = session.currentTrio.find(c => c.id === cardId);
    if (!card) {
      return { success: false, reason: '所选卡牌不在当前命盘中' };
    }

    session.chosenCard = card;
    this._recordUnlock(card);
    return { success: true, chosenCard: card };
  }

  /**
   * 使用天命直选券直接指定高阶身份卡入局
   * @param {Object} session
   * @param {string} targetCardId
   */
  directSelectWithVoucher(session, targetCardId) {
    const vouchers = this.clanState.directSelectVouchers || 0;
    if (vouchers <= 0) {
      return { success: false, reason: '天命直选券不足' };
    }

    // 检查冷却
    const cd = this.clanState.cardCooldowns[targetCardId] || 0;
    if (cd > 0) {
      return { success: false, reason: `该神卡尚在冷却休养中，还需等待 ${cd} 局` };
    }

    const targetCard = this.destinyPool.find(c => c.id === targetCardId);
    if (!targetCard) {
      return { success: false, reason: '未找到指定身份卡' };
    }

    // 消耗 1 张券，并赋予 3 局冷却
    this.clanState.directSelectVouchers--;
    this.clanState.cardCooldowns[targetCardId] = 3;

    session.chosenCard = targetCard;
    session.isDirectSelected = true;
    this._recordUnlock(targetCard);

    return {
      success: true,
      chosenCard: targetCard,
      remainingVouchers: this.clanState.directSelectVouchers
    };
  }

  /**
   * 每局结束后推进名册直选冷却
   */
  tickCooldownsAfterRun() {
    for (const [k, v] of Object.entries(this.clanState.cardCooldowns)) {
      if (v > 0) {
        this.clanState.cardCooldowns[k] = v - 1;
      }
    }
  }

  // --- 内部算法：加权随机与保底 ---

  _rollTrio(prng) {
    const pity = this.clanState.gachaPity;
    pity.sinceLastEpicOrHigher++;
    pity.sinceLastLegendary++;

    const cards = [];
    const usedIds = new Set();

    // 判定本盘是否有保底触发
    let forceLegendary = pity.sinceLastLegendary >= 30;
    let forceEpic = pity.sinceLastEpicOrHigher >= 8;

    for (let slot = 0; slot < 3; slot++) {
      let targetTier = null;
      if (slot === 0 && forceLegendary) {
        targetTier = 'legendary';
      } else if (slot === 0 && forceEpic) {
        targetTier = 'epic';
      } else {
        targetTier = this._rollQuality(prng);
      }

      // 从池中按指定品质随机挑 1 张未使用的卡
      let candidates = this.destinyPool.filter(c => c.quality === targetTier && !usedIds.has(c.id));
      if (candidates.length === 0) {
        candidates = this.destinyPool.filter(c => !usedIds.has(c.id));
      }
      const picked = candidates.length > 0 ? candidates[prng.nextInt(0, candidates.length - 1)] : this.destinyPool[0];

      usedIds.add(picked.id);
      cards.push(picked);

      if (picked.quality === 'legendary') {
        pity.sinceLastLegendary = 0;
        pity.sinceLastEpicOrHigher = 0;
      } else if (picked.quality === 'epic') {
        pity.sinceLastEpicOrHigher = 0;
      }
    }

    return cards;
  }

  _rollQuality(prng) {
    // 凡品 50%, 良品 33%, 极品 14%, 绝品 3%
    const roll = prng.nextInt(1, 100);
    if (roll <= 3) return 'legendary';
    if (roll <= 17) return 'epic';
    if (roll <= 50) return 'fine';
    return 'common';
  }

  _recordUnlock(card) {
    if (card.quality === 'legendary' || card.quality === 'epic') {
      if (this.clanState.unlockedRoster instanceof Set) {
        this.clanState.unlockedRoster.add(card.id);
      }
    }
  }
}

module.exports = DestinyGachaService;
