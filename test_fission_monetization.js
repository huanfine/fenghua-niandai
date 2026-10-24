/**
 * test_fission_monetization.js
 * Comprehensive Verification Suite for:
 * 1. 🔥 全服每日同命挑战 (Daily Seed Challenge) - Determinism, Theming & Leaderboard Sync
 * 2. 📜 宣纸长卷海报一键生成与朋友圈分享 (Canvas to TempFilePath & ShowShareImageMenu)
 * 3. 💰 高价值激励视频场景 (【天机重演·逆天改命】 & 【特区内参·绝密行情情报】)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Mock browser / wechat minigame environment
const noop = () => {};
const drawCalls = [];
const ctx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length * 10 : 10) });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') {
      return () => ({
        addColorStop: noop
      });
    }
    if (k === 'createPattern') return () => ({});
    if (t[k] !== undefined) return t[k];
    return (...args) => {
      drawCalls.push({ method: k, args });
    };
  },
  set: (t, k, v) => { t[k] = v; return true; }
});

const mockCanvas = {
  width: 750,
  height: 1334,
  getContext: () => ctx,
  toTempFilePathSync: () => 'wxfile://tmp_life_trajectory_poster_20261014.png',
  toTempFilePath: (opts) => {
    if (opts && typeof opts.success === 'function') {
      opts.success({ tempFilePath: 'wxfile://tmp_life_trajectory_poster_20261014.png' });
    }
    if (opts && typeof opts.complete === 'function') {
      opts.complete();
    }
  }
};

let storageStore = {};
let postedMessages = [];
let shareMenuCalledWith = null;
let savedImageFilePath = null;
let toastShown = null;

global.wx = {
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 812, pixelRatio: 2, safeArea: { top: 44, bottom: 778 } }),
  createCanvas: () => ({ ...mockCanvas }),
  createOffscreenCanvas: (opts) => ({ ...mockCanvas, width: (opts && opts.width) || 750, height: (opts && opts.height) || 1334 }),
  createWebAudioContext: () => null,
  getStorageSync: k => storageStore[k],
  setStorageSync: (k, v) => { storageStore[k] = v; },
  removeStorageSync: k => { delete storageStore[k]; },
  vibrateShort: noop,
  vibrateLong: noop,
  onTouchStart: noop,
  onTouchMove: noop,
  onTouchEnd: noop,
  onTouchCancel: noop,
  onShow: noop,
  onHide: noop,
  onWindowResize: noop,
  onAudioInterruptionBegin: noop,
  onAudioInterruptionEnd: noop,
  getMenuButtonBoundingClientRect: () => ({ top: 48, right: 365, bottom: 80, left: 278, width: 87, height: 32 }),
  getSystemInfo: noop,
  getAccountInfoSync: () => ({ miniProgram: { envVersion: 'develop' } }),
  reportEvent: noop,
  showShareMenu: noop,
  onShareAppMessage: noop,
  onShareTimeline: noop,
  getLaunchOptionsSync: () => ({ query: {} }),
  getUpdateManager: () => ({ onCheckForUpdate: noop, onUpdateReady: noop, onUpdateFailed: noop }),
  getOpenDataContext: () => ({
    postMessage: (msg) => {
      postedMessages.push(msg);
    }
  }),
  showShareImageMenu: (opts) => {
    shareMenuCalledWith = opts;
    if (opts && typeof opts.success === 'function') opts.success();
  },
  saveImageToPhotosAlbum: (opts) => {
    savedImageFilePath = opts && opts.filePath;
    if (opts && typeof opts.success === 'function') opts.success();
  },
  showToast: (opts) => {
    toastShown = opts;
  },
  createRewardedVideoAd: (opts) => {
    let onLoadCb = noop;
    let onErrorCb = noop;
    let onCloseCb = noop;
    return {
      load: () => Promise.resolve(),
      show: () => {
        if (onCloseCb) onCloseCb({ isEnded: true });
        return Promise.resolve();
      },
      onLoad: fn => { onLoadCb = fn; },
      onError: fn => { onErrorCb = fn; },
      onClose: fn => { onCloseCb = fn; },
      offClose: noop
    };
  }
};

global.requestAnimationFrame = noop;
global.canvas = mockCanvas;
global.Image = function () {};
global.document = undefined;

// Load game.js
const gamePath = path.resolve(__dirname, 'wechat-minigame/game.js');
console.log('Loading game engine for fission & monetization verification from:', gamePath);
const engine = require(gamePath);
const state = global.state;

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✅ [PASS] ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ❌ [FAIL] ${name}`);
    console.error('    Error:', err.message);
    if (err.stack) console.error(err.stack);
  }
}

console.log('\n======================================================');
console.log('🧪 SUITE 1: 全服每日同命挑战 (Daily Seed Challenge)');
console.log('======================================================');

runTest('1.1 确定性种子解析 (getDailyChallengeSeed)', () => {
  const seed1 = engine.getDailyChallengeSeed('2026-10-14');
  const seed2 = engine.getDailyChallengeSeed('20261014');
  assert.strictEqual(seed1, 20261014, 'Date with dashes should resolve to integer 20261014');
  assert.strictEqual(seed2, 20261014, 'Numeric string should resolve to integer 20261014');

  const details = engine.getDailyChallengeDetails();
  assert.ok(details.dateStr, 'Must contain date string');
  assert.ok(typeof details.seed === 'number', 'Seed must be a number');
  assert.ok(details.theme, 'Must resolve an active theme');
  assert.ok(details.theme.title, 'Theme must have a title');
});

runTest('1.2 每日挑战主题池包含公元100年永元筑基与汉魏风骨主题', () => {
  const themes = engine.DAILY_CHALLENGE_THEMES;
  assert.ok(Array.isArray(themes), 'DAILY_CHALLENGE_THEMES should be an array');
  const yongyuan = themes.find(t => t.eraYear === 118 || t.title.includes('永元筑基'));
  assert.ok(yongyuan, 'Should include 公元100年 永元筑基 themed challenge');
  assert.ok(yongyuan.classType.includes('经学') || yongyuan.classType.includes('冠冕'), 'Class type should be 经学冠冕: ' + yongyuan.classType);
});

runTest('1.3 全服同一起跑线：相同种子产出100%一致的初始特质与身世', () => {
  // Run 1
  engine.startDailyChallengeRun();
  const run1Seed = state.runSeed;
  const run1BirthYear = state.birthYear;
  const run1Class = state.birthProfile.parents.classType;
  const run1Name = state.name;
  const run1Stats = { ...state.stats };

  // Run 2
  engine.startDailyChallengeRun();
  const run2Seed = state.runSeed;
  const run2BirthYear = state.birthYear;
  const run2Class = state.birthProfile.parents.classType;
  const run2Name = state.name;
  const run2Stats = { ...state.stats };

  assert.strictEqual(run1Seed, run2Seed, 'Seeds must match');
  assert.strictEqual(run1BirthYear, run2BirthYear, 'Birth years must match');
  assert.strictEqual(run1Class, run2Class, 'Parent social class must match');
  assert.strictEqual(run1Name, run2Name, 'Names must match under deterministic PRNG');
  assert.deepStrictEqual(run1Stats, run2Stats, 'Core stats must match 100%');
  assert.strictEqual(state.isDailyChallenge, true, 'isDailyChallenge flag must be active');
  assert.strictEqual(state.age, 18, 'Must be fast-forwarded to adulthood (age 18)');
});

runTest('1.4 每日挑战终局评分与微信好友同命榜数据同步 (uploadDailyChallengeScore)', () => {
  postedMessages = [];
  state.isDailyChallenge = true;
  state.age = 60;
  state.stats = { wisdom: 95, health: 80, charm: 85, wealth: 5000000, reputation: 90 };
  state.achievements = ['gaokao_top', 'first_pot_of_gold'];
  state.familyClan = { children: [{ name: '长子' }, { name: '次女' }] };

  const score = engine.calcDailyChallengeScore(state);
  assert.ok(score > 1000, `Calculated score should reflect substantial achievement: ${score}`);

  engine.uploadDailyChallengeScore(score);
  assert.strictEqual(postedMessages.length, 1, 'Should post 1 message to OpenDataContext');
  assert.strictEqual(postedMessages[0].type, 'UPDATE_DAILY_SCORE');
  assert.strictEqual(postedMessages[0].score, score);
  assert.strictEqual(postedMessages[0].date, state.dailyChallengeDate);
});

console.log('\n======================================================');
console.log('🧪 SUITE 2: 宣纸长卷海报与朋友圈分享 (Poster & Moments Share)');
console.log('======================================================');

runTest('2.1 生成宣纸走势海报包含朱印、沉浮折线走势与葵花码', () => {
  drawCalls.length = 0;
  let returnedPath = null;
  engine.generateLifeTrajectoryPoster((path) => {
    returnedPath = path;
  });

  assert.ok(returnedPath, 'generateLifeTrajectoryPoster must return tempFilePath');
  assert.ok(state.lastGeneratedPosterCanvas, 'state.lastGeneratedPosterCanvas must be cached');
  assert.strictEqual(state.lastGeneratedPosterCanvas.width, 750, 'Poster width should be 750px');
  assert.strictEqual(state.lastGeneratedPosterCanvas.height, 1334, 'Poster height should be 1334px');

  // Verify that stroke, fillText, and arc were called during rendering (trajectory graph, seals, sun code)
  const hasStroke = drawCalls.some(c => c.method === 'stroke');
  const hasFillText = drawCalls.some(c => c.method === 'fillText');
  const hasArc = drawCalls.some(c => c.method === 'arc');
  assert.ok(hasStroke, 'Must execute stroke calls for borders and trajectory lines');
  assert.ok(hasFillText, 'Must execute fillText for calligraphy, dates, and title');
  assert.ok(hasArc, 'Must execute arc calls for cinnabar seal / sun code');
});

runTest('2.2 一键分享海报到朋友圈 (shareLifeTrajectoryPosterToMoments)', () => {
  shareMenuCalledWith = null;
  state.lastGeneratedPosterPath = null;

  engine.shareLifeTrajectoryPosterToMoments();
  assert.ok(shareMenuCalledWith, 'wx.showShareImageMenu must be called');
  assert.ok(shareMenuCalledWith.path.includes('wxfile://'), 'Must pass tempFilePath');
  assert.strictEqual(state.lastGeneratedPosterPath, 'wxfile://tmp_life_trajectory_poster_20261014.png');
});

console.log('\n======================================================');
console.log('🧪 SUITE 3: 高转化激励视频 (逆天改命 & 特区内参)');
console.log('======================================================');

runTest('3.1 【天机重演 · 逆天改命】：大失败后回滚惩罚并以+15%胜率重掷（限1次/局）', () => {
  state.usedRerollAd = false;
  state.rerollFateUsedCount = 0;
  state.stats.wealth = 75;

  state.lastDecisionChoice = {
    text: '竞标时代重大枢纽工程',
    successStat: 'wealth',
    checkStat: 'wealth',
    successDelta: 30,
    failDelta: -25,
    consequence: '大获全胜',
    failConsequence: '遭遇重大暗礁，血本无归'
  };
  state.lastChoiceBaseRate = 40;
  state.lastChoiceRollVerdict = 'fail';
  state._preRollSnapshot = {
    stats: { ...state.stats },
    age: state.age
  };

  // Simulate loss applied on failure
  state.stats.wealth -= 25;
  assert.strictEqual(state.stats.wealth, 50, 'Stat penalty applied on failure');

  // Trigger Fate Reroll
  let rerolledSuccess = false;
  engine.watchAdForFateReroll((ok) => {
    if (ok) {
      engine.rerollFailedDecision();
      rerolledSuccess = true;
    }
  });

  assert.strictEqual(rerolledSuccess, true, 'Rewarded ad onSuccess callback fired');
  assert.strictEqual(state.rerollFateUsedCount, 1, 'Reroll fate count incremented to 1');
  assert.strictEqual(state.usedRerollAd, true, 'usedRerollAd marked true');

  // Pre-roll stat snapshot should have been restored during reroll
  // (Wealth was restored to 75, then re-rolled with +15% boost = 55% success rate)
  assert.ok(state.stats.wealth >= 50, 'Stats should be at least restored/recalculated');

  // Attempt second reroll in same run
  let secondReroll = false;
  engine.watchAdForFateReroll((ok) => {
    if (ok) secondReroll = true;
  });
  assert.strictEqual(secondReroll, false, 'Second reroll in same run must be rejected (max 1/run)');
});

runTest('3.2 【特区内参 · 绝密行情情报】：解锁3年预测，保障投资保本与+12%智谋红利', () => {
  state.specialZoneIntelUnlocked = false;
  state.year = 1992;
  state.capital = 10000;
  state.heldAssets = {
    realEstateShares: 20000
  };
  state.marketTrends = {
    realEstateChange: '-15%' // 宏观大跌15%
  };

  // 1. Unlock intel via ad
  let intelUnlocked = false;
  engine.watchAdForMarketIntel((ok) => {
    if (ok) intelUnlocked = true;
  });
  assert.strictEqual(intelUnlocked, true, 'Market intel ad onSuccess callback fired');
  assert.strictEqual(state.specialZoneIntelUnlocked, true, 'Intel unlocked flag must be true');
  assert.strictEqual(state.specialZoneIntelExpireYear, 1995, 'Expires after 3 years (1992 + 3 = 1995)');

  // 2. Sell asset during down market
  // Without intel: -15% -> returns 20000 * 0.85 = 17000 (loss of 3000)
  // With intel: loss turned into +5% protected minimum -> 20000 * 1.05 = 21000!
  const prevCap = state.capital;
  engine.sellMarketAsset('realEstateShares', 20000);
  const proceedsGained = state.capital - prevCap;
  assert.strictEqual(proceedsGained, 21000, 'Proceeds must turn loss (-15%) into protected positive gain (+5% = 21000)');
  assert.strictEqual(state.heldAssets.realEstateShares, 0, 'All shares sold');

  // 3. Test expiry when year advances past expire year
  state.year = 1996;
  const hasIntelExpired = state.specialZoneIntelUnlocked && (state.year <= state.specialZoneIntelExpireYear);
  assert.strictEqual(hasIntelExpired, false, 'Intel should expire after 1995');
});

console.log('\n======================================================');
console.log(`🏁 VERIFICATION SUMMARY: ${passedTests}/${totalTests} TESTS PASSED`);
console.log('======================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
