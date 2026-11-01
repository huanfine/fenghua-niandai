/**
 * meta-service/destinyGacha.js
 * 《华夏世家》局前择嗣与举荐服务 (Succession & Recommendation Service)
 * 落实 v3 方案：择嗣三选一、免费另选2次、荐书上限3封、50%/33%/14%/3%概率表、8盘保底紫、30盘保底金、名册直选与举荐状3局冷却
 */

const { RESOURCES_CAP } = require('../sim-core/rules.js');
const PRNG = require('../sim-core/prng.js');

class DestinyGachaService {
  /**
   * @param {Object} options
   * @param {Array<Object>} options.destinyPool 出身身份库
   * @param {Object} options.clanState 家族全局持久态
   */
  constructor({ destinyPool = [], clanState = {} } = {}) {
    this.destinyPool = destinyPool;
    this.clanState = clanState;

    if (!this.clanState.gachaPity) {
      this.clanState.gachaPity = {
        sinceLastEpicOrHigher: 0,
        sinceLastLegendary: 0
      };
    }

    if (!this.clanState.unlockedRoster) {
      this.clanState.unlockedRoster = new Set();
    }
    if (!this.clanState.cardCooldowns) {
      this.clanState.cardCooldowns = {};
    }
  }

  /**
   * 开启开局择嗣会话
   */
  createSession(sessionSeed = Date.now()) {
    const prng = new PRNG(sessionSeed);
    const session = {
      seed: sessionSeed,
      freeRerollsLeft: RESOURCES_CAP.FREE_SUCCESSION_REROLLS || 2, // 免费另选 2 次
      recommendationLettersUsed: 0,                                // 荐书消耗
      maxRecommendationLetters: RESOURCES_CAP.MAX_RECOMMENDATION_LETTERS || 3, // 单局上限 3 封
      // 兼容历史命名
      washTokensUsed: 0,
      maxWashTokens: 3,
      currentTrio: [],
      chosenCard: null,
      isDirectSelected: false
    };

    session.currentTrio = this._rollTrio(prng);
    return { session, prng };
  }

  /**
   * 另选子弟 (整盘刷新)
   * @param {Object} session
   * @param {import('../sim-core/prng')} prng
   * @param {boolean} userAgreedUseLetter 用户是否确认消耗荐书
   */
  rerollBoard(session, prng, userAgreedUseLetter = false) {
    if (session.chosenCard) {
      return { success: false, reason: '已选定当家子弟，不可另选' };
    }

    // 免费 2 次另选
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

    // 消耗荐书 (上限 3 封)
    if (!userAgreedUseLetter) {
      return { success: false, reason: '免费另选机会已尽，须消耗家族荐书' };
    }

    if (session.recommendationLettersUsed >= session.maxRecommendationLetters) {
      return { success: false, reason: `当局荐书已达上限 (${session.maxRecommendationLetters} 封)` };
    }

    const availableLetters = (this.clanState.recommendationLetters !== undefined ?
      this.clanState.recommendationLetters : this.clanState.washMarrowTokens) || 0;

    if (availableLetters <= 0) {
      return { success: false, reason: '宗族公库中荐书不足' };
    }

    // 扣减荐书
    if (this.clanState.recommendationLetters !== undefined) {
      this.clanState.recommendationLetters--;
    } else {
      this.clanState.washMarrowTokens--;
    }
    session.recommendationLettersUsed++;
    session.washTokensUsed = session.recommendationLettersUsed; // 兼容
    session.currentTrio = this._rollTrio(prng);

    return {
      success: true,
      mode: 'token',
      recommendationLettersUsed: session.recommendationLettersUsed,
      currentTrio: session.currentTrio
    };
  }

  /**
   * 从当前盘中选定 1 人出世
   */
  selectCardFromBoard(session, cardId) {
    const card = session.currentTrio.find(c => c.id === cardId);
    if (!card) {
      return { success: false, reason: '所选子弟不在候选中' };
    }

    session.chosenCard = card;
    this._recordUnlock(card);
    return { success: true, chosenCard: card };
  }

  /**
   * 凭「举荐状」直接择选已解锁的名门子弟出世
   * @param {Object} session
   * @param {string} targetCardId
   */
  directSelectWithVoucher(session, targetCardId) {
    const vouchers = (this.clanState.recommendationDecrees !== undefined ?
      this.clanState.recommendationDecrees : this.clanState.directSelectVouchers) || 0;

    if (vouchers <= 0) {
      return { success: false, reason: '宗门举荐状不足' };
    }

    // 检查 3 局冷却
    const cd = this.clanState.cardCooldowns[targetCardId] || 0;
    if (cd > 0) {
      return { success: false, reason: `该神卡尚在休养中，还需等待 ${cd} 局` };
    }

    const targetCard = this.destinyPool.find(c => c.id === targetCardId);
    if (!targetCard) {
      return { success: false, reason: '未找到指定出身' };
    }

    if (this.clanState.recommendationDecrees !== undefined) {
      this.clanState.recommendationDecrees--;
    } else {
      this.clanState.directSelectVouchers--;
    }
    this.clanState.cardCooldowns[targetCardId] = 3; // 冷却 3 局

    session.chosenCard = targetCard;
    session.isDirectSelected = true;
    this._recordUnlock(targetCard);

    return {
      success: true,
      chosenCard: targetCard
    };
  }

  _rollTrio(prng) {
    const pity = this.clanState.gachaPity;
    pity.sinceLastEpicOrHigher++;
    pity.sinceLastLegendary++;

    const cards = [];
    const usedIds = new Set();

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
    const roll = prng.nextInt(1, 100);
    if (roll <= 3) return 'legendary'; // 绝品金 3%
    if (roll <= 17) return 'epic';      // 极品紫 14%
    if (roll <= 50) return 'fine';      // 良品青 33%
    return 'common';                    // 素品白 50%
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
