/**
 * wechat-minigame/src/core/SimCoreAdapter.js
 * 《华夏世家》纯逻辑内核 sim-core / content / meta-service 与客户端微信环境的桥接适配器 (v3)
 */

const {
  PRNG,
  rules,
  DeckEngine,
  CheckEngine,
  SkillEngine,
  BagEngine,
  ClashEngine,
  CalamityEngine,
  KinsfolkEngine,
  ROLES,
  ROLE_NAMES,
  DUTIES,
  STRATEGY_NAMES,
  COUNTER_MATRIX,
  SuccessionEngine,
  RetreatEngine,
  ScoreEngine,
  PosthumousEngine,
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
  simCore: {
    PRNG,
    rules,
    DeckEngine,
    CheckEngine,
    SkillEngine,
    BagEngine,
    ClashEngine,
    CalamityEngine,
    KinsfolkEngine,
    ROLES,
    ROLE_NAMES,
    DUTIES,
    STRATEGY_NAMES,
    COUNTER_MATRIX,
    SuccessionEngine,
    RetreatEngine,
    ScoreEngine,
    PosthumousEngine,
    RoundRunner
  },
  content: {
    cardsHanwei,
    destinies,
    skills,
    vows,
    validateAllContent
  },
  metaService: {
    ClanRankLadder,
    DestinyGachaService,
    ChestUnboxingService,
    ClanTreasuryService,
    ReplayVerifier
  }
};
