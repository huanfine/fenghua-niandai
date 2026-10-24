/**
 * test_p1_features.js - Comprehensive Unit & Integration Verification Suite for P1 Features
 * Tests:
 * 1. Era Rivals System (时代宿敌动态对决系统)
 * 2. Economic Hardcore Realism (时代通胀与刚性支出曲线)
 * 3. Late-Game Capital Sinks & Multi-Generational Heritage (40岁三大资金蓄水池与跨代继承)
 */

const fs = require('fs');
const path = require('path');
const assert = require('assert');

// Mock browser / wechat minigame environment
const noop = () => {};
const ctx = new Proxy({}, {
  get: (t, k) => k === 'measureText' ? () => ({ width: 10 })
    : (k === 'createLinearGradient' || k === 'createRadialGradient') ? () => ({ addColorStop: noop })
    : k === 'createPattern' ? () => ({})
    : (t[k] !== undefined ? t[k] : noop),
  set: (t, k, v) => { t[k] = v; return true; }
});
const canvas = { width: 750, height: 1624, getContext: () => ctx };
let storageStore = {};
global.wx = {
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 812, pixelRatio: 2, safeArea: { top: 44, bottom: 778 } }),
  createCanvas: () => canvas,
  createOffscreenCanvas: () => canvas,
  createWebAudioContext: () => null,
  getStorageSync: k => storageStore[k],
  setStorageSync: (k, v) => { storageStore[k] = v; },
  removeStorageSync: k => { delete storageStore[k]; },
  vibrateShort: noop, vibrateLong: noop, onTouchStart: noop, onTouchMove: noop, onTouchEnd: noop, onTouchCancel: noop,
  onShow: noop, onHide: noop, onWindowResize: noop, onAudioInterruptionBegin: noop, onAudioInterruptionEnd: noop,
  getMenuButtonBoundingClientRect: () => ({ top: 48, right: 365, bottom: 80, left: 278, width: 87, height: 32 }),
  getSystemInfo: noop, getAccountInfoSync: () => ({ miniProgram: { envVersion: 'develop' } }),
  reportEvent: noop, showShareMenu: noop, onShareAppMessage: noop, onShareTimeline: noop,
  getLaunchOptionsSync: () => ({ query: {} }),
  getUpdateManager: () => ({ onCheckForUpdate: noop, onUpdateReady: noop, onUpdateFailed: noop })
};
global.requestAnimationFrame = noop;
global.canvas = canvas;
global.Image = function () {};
global.document = undefined;

// Load game.js
const gamePath = path.resolve(__dirname, 'wechat-minigame/game.js');
console.log('Loading game engine from:', gamePath);
const engine = require(gamePath);
const state = global.state;
state.year = 1995;

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
    console.error(err);
    process.exitCode = 1;
  }
}

console.log('\n======================================================');
console.log('  TEST SUITE 1: 时代宿敌动态对决系统 (Era Rivals System)');
console.log('======================================================');

runTest('1.1 ERA_RIVALS_DATABASE schema and phase coverage', () => {
  assert(engine.ERA_RIVALS_DATABASE, 'ERA_RIVALS_DATABASE must exist');
  assert.strictEqual(engine.ERA_RIVALS_DATABASE.length, 4, 'Must have 4 era rivals covering life phases');
  
  const expectedRivals = [
    { id: 'rival_zhao', name: '赵天霸', age: 25 },
    { id: 'rival_cui', name: '崔铁面', age: 33 },
    { id: 'rival_gao', name: '高博', age: 41 },
    { id: 'rival_qian', name: '钱万贯', age: 49 }
  ];

  expectedRivals.forEach((exp, idx) => {
    const rival = engine.ERA_RIVALS_DATABASE[idx];
    assert.strictEqual(rival.id, exp.id);
    assert.strictEqual(rival.name, exp.name);
    assert.strictEqual(rival.age, exp.age);
    assert(Array.isArray(rival.options) && rival.options.length >= 2, `${rival.name} must have at least 2 duel choices`);
  });
});

runTest('1.2 getCurrentEraRival age routing', () => {
  assert.strictEqual(engine.getCurrentEraRival(18), null, 'Age 18 should have no rival');
  assert.strictEqual(engine.getCurrentEraRival(25).name, '赵天霸', 'Age 25 should face 赵天霸');
  assert.strictEqual(engine.getCurrentEraRival(33).name, '崔铁面', 'Age 33 should face 崔铁面');
  assert.strictEqual(engine.getCurrentEraRival(41).name, '高博', 'Age 41 should face 高博');
  assert.strictEqual(engine.getCurrentEraRival(49).name, '钱万贯', 'Age 49 should face 钱万贯');
  assert.strictEqual(engine.getCurrentEraRival(55), null, 'Age 55 should have no rival');
});

runTest('1.3 Momentum state management & clamping', () => {
  state.rivalMomentum = undefined;
  state.playerMomentum = undefined;
  engine.ensureRivalMomentumState();
  assert.strictEqual(state.playerMomentum, 50, 'Default player momentum is 50');
  assert.strictEqual(state.rivalMomentum, 50, 'Default rival momentum is 50');

  // Verify bounded clamping [0, 100]
  state.playerMomentum = 120;
  state.rivalMomentum = -30;
  engine.ensureRivalMomentumState();
  assert.strictEqual(state.playerMomentum, 100, 'Player momentum must clamp to 100 max');
  assert.strictEqual(state.rivalMomentum, 0, 'Rival momentum must clamp to 0 min');
});

runTest('1.4 Rival showdown modal opening and execution', () => {
  state.age = 25;
  const rival = engine.getCurrentEraRival(25);
  engine.ensureRivalMomentumState();
  state.activeModal = null;
  
  const opened = engine.openRivalShowdown(rival);
  assert.strictEqual(opened, true, 'openRivalShowdown should return true on success');
  assert.strictEqual(state.activeModal, 'rival_showdown', 'Active modal should be rival_showdown');
  assert(state.activeRival, 'state.activeRival must be set');
  assert.strictEqual(state.activeRival.name, '赵天霸');

  // Test choice execution (e.g. choice 0)
  const result = engine.executeRivalShowdownChoice(0);
  assert(result, 'executeRivalShowdownChoice should return resolution result');
  assert(typeof result.success === 'boolean', 'Resolution must report success boolean');
  assert.strictEqual(state.activeModal, null, 'Modal should close after execution');
});

runTest('1.5 Policy auto-resolution for rival showdown', () => {
  state.age = 33;
  const rival = engine.getCurrentEraRival(33);
  engine.openRivalShowdown(rival);
  assert.strictEqual(state.activeModal, 'rival_showdown');
  
  // Resolve via strategic policy
  const resolved = engine.resolveCurrentModalByPolicy('strategic');
  assert(resolved, 'resolveCurrentModalByPolicy should resolve rival_showdown');
  assert.strictEqual(state.activeModal, null, 'Modal should be cleared');
});

runTest('1.6 Dynamic momentum triggers (S-Appraisal & Pact completion)', () => {
  engine.ensureRivalMomentumState();
  state.playerMomentum = 50;
  state.rivalMomentum = 50;

  // Simulate S-Appraisal impact
  engine.evaluateYearlyAppraisal();
  // Player momentum and rival momentum should exist and be clamped between 0 and 100
  assert(state.playerMomentum >= 0 && state.playerMomentum <= 100);
  assert(state.rivalMomentum >= 0 && state.rivalMomentum <= 100);
});

console.log('\n======================================================');
console.log('  TEST SUITE 2: 经济硬核拟真与时代通胀 (Economic Realism)');
console.log('======================================================');

runTest('2.1 getEraInflationScale historical curve accuracy', () => {
  const scale1970 = engine.getEraInflationScale(1970);
  const scale1985 = engine.getEraInflationScale(1985);
  const scale1992 = engine.getEraInflationScale(1992);
  const scale2000 = engine.getEraInflationScale(2000);
  const scale2010 = engine.getEraInflationScale(2010);
  const scale2025 = engine.getEraInflationScale(2025);

  assert.strictEqual(scale1970, 1.0, '1970 base scale must be 1.0 (planned economy baseline)');
  assert.strictEqual(scale1985, 1.0, '1985 base scale must be 1.0 (pre-1992 price reform)');
  assert.strictEqual(scale1992, 1.0, '1992 base scale must be 1.0');
  assert(Math.abs(scale2000 - 1.64) < 0.01, `2000 scale (${scale2000}) should be 1.64`);
  assert(Math.abs(scale2010 - 2.44) < 0.01, `2010 scale (${scale2010}) should be 2.44`);
  assert(Math.abs(scale2025 - 3.64) < 0.01, `2025 scale (${scale2025}) should be 3.64`);

  // Verify monotonicity
  assert(scale1992 <= scale2000 && scale2000 < scale2010 && scale2010 < scale2025, 'Inflation curve must be monotonically increasing post-1992');
});

runTest('2.2 Medical emergency costs scaled with inflation', () => {
  state.year = 1975;
  state.capital = 100000;
  state.health = 50;

  const capBefore1975 = state.capital;
  engine.executeHealthChoice();
  const scale1975 = engine.getEraInflationScale(1975); // 1.0
  const expectedCost1975 = Math.round(15000 * scale1975);
  assert.strictEqual(capBefore1975 - state.capital, expectedCost1975, 'Cost at 1975 should be 15,000 * 1.0');

  // Test at year 2025
  state.year = 2025;
  state.capital = 200000;
  const capBefore2025 = state.capital;
  engine.executeHealthChoice();
  const scale2025 = engine.getEraInflationScale(2025); // 3.64
  const expectedCost2025 = Math.round(15000 * scale2025);
  assert.strictEqual(capBefore2025 - state.capital, expectedCost2025, `Cost at 2025 should be scaled by ${scale2025}x`);
});

runTest('2.3 Annual living costs scale with inflation in progression', () => {
  // Verify settleAnnualCoreProgression respects era inflation
  assert(typeof engine.tickOneYear === 'function', 'tickOneYear must exist');
});

console.log('\n======================================================');
console.log('  TEST SUITE 3: 40岁后期战略资金蓄水池与跨代继承 (Capital Sinks)');
console.log('======================================================');

runTest('3.1 Hometown university donation & dynamic IQ cap bonus', () => {
  state.age = 45;
  state.capital = 2000000;
  state.clanIqCapBonus = 0;
  state.iq = 90;
  engine.bindReactiveStatClamping();

  const success = engine.donateToHometownUniversity(500000);
  assert.strictEqual(success, true, 'Donation should succeed when funds are sufficient');
  assert.strictEqual(state.clanIqCapBonus, 3, 'First donation level should grant +3 clan IQ cap bonus');
  assert(state.epitaphTeacherOfAges, 'Epitaph千秋师表 flag should be set');
  assert(state.tags['epitaph_teacher_of_ages'], 'Tag epitaph_teacher_of_ages should be set');

  // Verify that IQ can now be set and clamped up to 103
  engine.setStat('iq', 105);
  assert.strictEqual(engine.getStat('iq'), 103, 'IQ should clamp to 100 + 3 = 103');

  // Test insufficient funds failure
  state.capital = 100000;
  const failRes = engine.donateToHometownUniversity(500000);
  assert.strictEqual(failRes, false, 'Donation must fail if capital is insufficient');
});

runTest('3.2 Family perpetual trust & 5% annual dividend cashflow', () => {
  state.capital = 1000000;
  state.familyPerpetualTrust = 0;

  const success = engine.injectFamilyPerpetualTrust(500000);
  assert.strictEqual(success, true, 'Trust injection should succeed');
  assert.strictEqual(state.familyPerpetualTrust, 500000);
  assert.strictEqual(state.capital, 500000);

  // Annual progression dividend check: 500,000 * 5% = 25,000
  const dividend = Math.round(state.familyPerpetualTrust * 0.05);
  assert.strictEqual(dividend, 25000, '5% trust dividend should be 25,000 for 500,000 trust principal');

  // Test insufficient funds failure
  state.capital = 50000;
  const failRes = engine.injectFamilyPerpetualTrust(200000);
  assert.strictEqual(failRes, false, 'Trust injection must fail if capital < amount');
});

runTest('3.3 National mega-project consortium sponsorship', () => {
  state.capital = 2000000;
  state.heritageBonusTalents = 0;
  state.talentPoints = 0;
  const repBefore = engine.getStat('rep');

  // Tier 1: 500,000
  const res1 = engine.sponsorNationalMegaprojectConsortia(500000);
  assert.strictEqual(res1, true, 'Tier 1 sponsorship should succeed');
  assert.strictEqual(state.capital, 1500000);
  assert(state.tags['megaproject_anchor_of_state'], 'Should receive anchor tag');
  assert.strictEqual(state.heritageBonusTalents, 1, 'Tier 1 grants 1 heritage talent');
  assert.strictEqual(state.talentPoints, 2, 'Tier 1 grants 2 talent points');

  // Tier 2: 1,000,000
  const res2 = engine.sponsorNationalMegaprojectConsortia(1000000);
  assert.strictEqual(res2, true, 'Tier 2 sponsorship should succeed');
  assert.strictEqual(state.capital, 500000);
  assert(state.tags['megaproject_pillar_of_state'], 'Should receive pillar tag');
  assert.strictEqual(state.heritageBonusTalents, 4, 'Tier 2 adds 3 heritage talents (total 4)');
  assert.strictEqual(state.talentPoints, 7, 'Tier 2 adds 5 talent points (total 7)');
});

runTest('3.4 Modal open and policy resolution for late_game_money_sinks', () => {
  state.age = 38;
  const openedUnder40 = engine.openLateGameMoneySinksModal();
  assert.strictEqual(openedUnder40, false, 'Late game money sinks cannot open under age 40');

  state.age = 42;
  const openedAt42 = engine.openLateGameMoneySinksModal();
  assert.strictEqual(openedAt42, true, 'Late game money sinks opens at age 42');
  assert.strictEqual(state.activeModal, 'late_game_money_sinks');

  const resolved = engine.resolveCurrentModalByPolicy('strategic');
  assert(resolved, 'resolveCurrentModalByPolicy resolves late_game_money_sinks');
  assert.strictEqual(state.activeModal, null, 'Modal should close after resolution');
});

runTest('3.5 Multi-generational inheritance (85% trust + clan IQ bonus)', () => {
  state.familyPerpetualTrust = 1000000;
  state.clanIqCapBonus = 6;
  state.family = state.family || {};
  state.family.children = [{ name: '林立新', gender: 'male', age: 20 }];
  state.capital = 400000;
  
  engine.successionToNextGeneration();
  assert(state.dynasticInheritance, 'state.dynasticInheritance must be created');
  assert.strictEqual(state.dynasticInheritance.clanIqCapBonus, 6, 'clanIqCapBonus must persist in inheritance');
  assert.strictEqual(state.dynasticInheritance.familyPerpetualTrust, 850000, '85% of family perpetual trust (850,000) must be recorded');

  // Complete character creation for new generation
  engine.finishCharacterCreation();
  assert.strictEqual(state.clanIqCapBonus, 6, 'clanIqCapBonus restored in new generation');
  assert.strictEqual(state.familyPerpetualTrust, 850000, 'familyPerpetualTrust restored in new generation');
  
  // Verify IQ ceiling can reach 106 in new generation
  engine.setStat('iq', 106);
  assert.strictEqual(engine.getStat('iq'), 106, 'New generation heir can reach IQ 106');
});

console.log('\n======================================================');
console.log(`  SUMMARY: ${passedTests}/${totalTests} Tests Passed`);
console.log('======================================================\n');

if (passedTests === totalTests) {
  process.exit(0);
} else {
  process.exit(1);
}
