/**
 * wechat-minigame/src/core/SimCoreAdapter.js
 * 《华夏世家》纯逻辑内核 sim-core / content / meta-service 与客户端微信环境的桥接适配器 (v3)
 */

let simCoreMod = null;
let contentMod = null;
let metaServiceMod = null;

try {
  simCoreMod = require('../../sim-core/index.js');
  contentMod = require('../../content/index.js');
  metaServiceMod = require('../../meta-service/index.js');
} catch (_) {
  try {
    simCoreMod = require('../../../sim-core/index.js');
    contentMod = require('../../../content/index.js');
    metaServiceMod = require('../../../meta-service/index.js');
  } catch (e2) {
    console.error('[SimCoreAdapter] 加载内核模块失败:', e2);
  }
}

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
} = simCoreMod || {};

const {
  cardsHanwei,
  destinies,
  skills,
  vows,
  validateAllContent
} = contentMod || {};

const {
  ClanRankLadder,
  DestinyGachaService,
  ChestUnboxingService,
  ClanTreasuryService,
  ReplayVerifier
} = metaServiceMod || {};

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
