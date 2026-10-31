/**
 * meta-service/index.js
 * 家族服务与服务端权威层统一导出
 */

const { ClanRankLadder, RANK_CONFIGS, SUBRANKS } = require('./clanRankLadder.js');
const DestinyGachaService = require('./destinyGacha.js');
const ChestUnboxingService = require('./chestUnboxing.js');
const ClanTreasuryService = require('./clanTreasury.js');
const ReplayVerifier = require('./replayVerifier.js');

module.exports = {
  ClanRankLadder,
  RANK_CONFIGS,
  SUBRANKS,
  DestinyGachaService,
  ChestUnboxingService,
  ClanTreasuryService,
  ReplayVerifier
};
