/**
 * sim-core/index.js
 * 《华夏世家》纯逻辑内核入口 (v3 全面升级)
 */

const PRNG = require('./prng.js');
const rules = require('./rules.js');
const DeckEngine = require('./deckEngine.js');
const CheckEngine = require('./checkEngine.js');
const SkillEngine = require('./skillEngine.js');
const BagEngine = require('./bagEngine.js');
const ClashEngine = require('./clashEngine.js');
const { CalamityEngine, STRATEGY_NAMES, COUNTER_MATRIX } = require('./calamityEngine.js');
const { KinsfolkEngine, ROLES, ROLE_NAMES, DUTIES } = require('./kinsfolkEngine.js');
const SuccessionEngine = require('./successionEngine.js');
const RetreatEngine = require('./retreatEngine.js');
const ScoreEngine = require('./scoreEngine.js');
const PosthumousEngine = require('./posthumousEngine.js');
const RoundRunner = require('./roundRunner.js');

module.exports = {
  PRNG,
  rules,
  DeckEngine,
  CheckEngine,
  SkillEngine,
  BagEngine,
  ClashEngine,
  CalamityEngine,
  STRATEGY_NAMES,
  COUNTER_MATRIX,
  KinsfolkEngine,
  ROLES,
  ROLE_NAMES,
  DUTIES,
  SuccessionEngine,
  RetreatEngine,
  ScoreEngine,
  PosthumousEngine,
  RoundRunner
};
