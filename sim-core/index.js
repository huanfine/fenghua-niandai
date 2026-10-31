/**
 * sim-core/index.js
 * 《风华年代》纯逻辑包入口
 * 不依赖 wx 与 Canvas，支持无头仿真、自动化测试与服务端重放验算。
 */

const PRNG = require('./prng.js');
const rules = require('./rules.js');
const DeckEngine = require('./deckEngine.js');
const CheckEngine = require('./checkEngine.js');
const SkillEngine = require('./skillEngine.js');
const BagEngine = require('./bagEngine.js');
const ClashEngine = require('./clashEngine.js');
const SuccessionEngine = require('./successionEngine.js');
const RetreatEngine = require('./retreatEngine.js');
const ScoreEngine = require('./scoreEngine.js');
const RoundRunner = require('./roundRunner.js');

module.exports = {
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
};
