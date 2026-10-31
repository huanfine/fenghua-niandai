/**
 * wechat-minigame/src/core/SimCoreAdapter.js
 * 纯逻辑内核 sim-core / content / meta-service 与客户端微信环境的桥接适配器
 */

const {
  PRNG,
  rules,
  DeckEngine,
  CheckEngine,
  SkillEngine,
  BagEngine,
  ClashEngine,
  SuccessionEngine,
  RetreatEngine,
  ScoreEngine,
  RoundRunner
} = require('../../../sim-core/index.js');

const {
  cardsHanwei,
  destinies,
  skills,
  vows,
  validateAllContent
} = require('../../../content/index.js');

const {
  ClanRankLadder,
  DestinyGachaService,
  ChestUnboxingService,
  ClanTreasuryService,
  ReplayVerifier
} = require('../../../meta-service/index.js');

module.exports = {
  // 纯逻辑包
  simCore: {
    PRNG,
    rules,
    DeckEngine,
    CheckEngine,
    SkillEngine,
    BagEngine,
    ClashEngine,
    SuccessionEngine,
    RetreatEngine,
    ScoreEngine,
    RoundRunner
  },
  // 内容包
  content: {
    cardsHanwei,
    destinies,
    skills,
    vows,
    validateAllContent
  },
  // 家族持久层与权威服务
  metaService: {
    ClanRankLadder,
    DestinyGachaService,
    ChestUnboxingService,
    ClanTreasuryService,
    ReplayVerifier
  }
};
