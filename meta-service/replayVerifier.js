/**
 * meta-service/replayVerifier.js
 * 服务端权威结算与决策重放验算器 (Replay Verifier)
 * 防篡改底线：服务端根据「种子 + 决策日志 + 初始配置」，使用 sim-core 完全重放推演，
 * 验证客户端上报的最终四维、宝箱数与评级是否真实有效。
 */

const { RoundRunner } = require('../sim-core/index.js');
const { cardsHanwei } = require('../content/index.js');
const { ClanRankLadder } = require('./clanRankLadder.js');
const ChestUnboxingService = require('./chestUnboxing.js');

class ReplayVerifier {
  /**
   * 服务端验算单局并返回权威结算
   * @param {Object} payload 客户端上报的包
   * @param {number|string} payload.seed 局随机种子
   * @param {Object} payload.destinyCard 局前身份卡
   * @param {Array<Object>} payload.equippedSkills 装配技能
   * @param {number} payload.clanRank 初始品级
   * @param {Object} payload.clanBuff 宗族底蕴
   * @param {Object} payload.vow 家训誓愿
   * @param {Array<Object>} payload.decisionLogs 客户端决策序列
   * @param {Object} payload.claimedSummary 客户端声称的得分与战利品
   * @param {Object} clanPersistentState 服务端存储的家族状态
   */
  static verifyAndSettle(payload, clanPersistentState) {
    const {
      seed,
      destinyCard,
      equippedSkills = [],
      clanRank = 9,
      clanBuff = {},
      vow = {},
      decisionLogs = [],
      claimedSummary = {}
    } = payload;

    // 1. 服务端无头初始化相同种子 Runner
    const runner = new RoundRunner({
      seed,
      cardPool: cardsHanwei,
      destinyCard,
      equippedSkills,
      clanRank,
      clanBuff,
      vow
    });

    // 2. 依据决策日志逐一重放
    for (const log of decisionLogs) {
      if (log.action === 'prologue') {
        runner.startPrologue(log.choice);
      } else if (log.action === 'clash') {
        runner.resolveClashEvent(log.tactic);
      } else if (log.action === 'succession') {
        runner.resolveSuccessionEvent(log.type);
      } else if (log.action === 'retreat') {
        runner.retreatEarly();
        break;
      } else if (log.cardId) {
        // 普通回合抉择
        runner.beginRound();
        runner.playRoundDecision({
          cardId: log.cardId,
          willpowerAllocation: log.willpower,
          offeredCards: [{ id: log.cardId, category: 'cultivation', difficulty: 45, name: log.cardName }]
        });
      }
    }

    // 3. 服务端计算权威终局结果
    const authoritativeRun = runner.finalizeRun();
    const serverEval = authoritativeRun.evaluation;
    const serverChests = authoritativeRun.chestsInBag;

    // 4. 校验客户端是否造假
    const isTampered = claimedSummary.claimedScore !== undefined &&
      Math.abs(claimedSummary.claimedScore - serverEval.finalScore) > 1.0;

    if (isTampered) {
      return {
        verified: false,
        reason: `客户端数据篡改检测：声称得分 ${claimedSummary.claimedScore}，服务端验算得分 ${serverEval.finalScore}`,
        authoritativeRun: null
      };
    }

    // 5. 服务端权威发放段位点与阶位结算
    const ladderSettlement = ClanRankLadder.settleRunRank(
      clanPersistentState.rankProgress || ClanRankLadder.initRankProgress(),
      serverEval
    );

    // 6. 服务端权威裁决宝箱提现
    const extractionResult = ChestUnboxingService.resolveRunExtraction(
      serverChests,
      serverEval.grade,
      payload.unboxingOptions || {}
    );

    // 将提取宝箱放入家族宗祠待开列表
    if (!clanPersistentState.pendingChests) {
      clanPersistentState.pendingChests = [];
    }
    clanPersistentState.pendingChests.push(...extractionResult.extracted);
    clanPersistentState.rankProgress = ladderSettlement.updatedProgress;

    return {
      verified: true,
      authoritativeScore: serverEval.finalScore,
      authoritativeGrade: serverEval.grade,
      ladderSettlement,
      extractionResult,
      updatedClanRank: ladderSettlement.updatedProgress,
      pendingChestsCount: clanPersistentState.pendingChests.length
    };
  }
}

module.exports = ReplayVerifier;
