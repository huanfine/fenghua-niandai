#!/usr/bin/env node
/**
 * balance_sim.js — 《风华年代：沧海沉浮录》整局无头模拟 / 验收脚本
 *
 * 用法:
 *   node balance_sim.js <game.js 路径> [每赛道局数=3] [策略=strategic|random|skip|all] [--json out.json]
 *
 * 原理:
 *   1. 在 Node 里 mock wx / Canvas，把 game.js 复制到临时文件，末尾追加一段导出（不改原文件）。
 *   2. 每局: 创角 -> 逐年(或逐回合)推进 -> 遇到弹窗就用游戏自带的 resolveCurrentModalByPolicy 处理 -> 直到结局。
 *   3. 统计: 结局分布、S/A/B/C、抱负达成率、交互次数、估算时长、固定剧本占比、属性曲线、报错。
 *
 * 与游戏的契约(改造后请保持):
 *   - 必须存在全局函数: tickOneYear, resolveCurrentModalByPolicy, setRandomSeed,
 *     startCharacterCreation, evaluateEndgameArchetype, ensureLifeAmbition, 变量 state。
 *   - 若实现了回合包装器 runTurn(): 本脚本会优先调用它(见方案文档 §4.P1)。
 *     约定: runTurn() 返回后，若 state.activeModal 非空，表示需要玩家介入;
 *           否则表示本回合已跑完。被代办的事件记录在 state.turnDigest。
 *
 * 注意: 估算时长 = 玩家交互数 × 12s + 回合数 × 1.8s + 70s(开局+结局)。12s/次是假设值，请用真机计时校准。
 */
const fs = require('fs');
const os = require('os');
const path = require('path');

const GAME = process.argv[2];
if (!GAME) { console.error('用法: node balance_sim.js <game.js> [每赛道局数] [策略] [--json out.json]'); process.exit(1); }
const PER_TRACK = parseInt(process.argv[3], 10) || 3;
const POLICY_ARG = (process.argv[4] && !process.argv[4].startsWith('--')) ? process.argv[4] : 'strategic';
const jIdx = process.argv.indexOf('--json');
const JSON_OUT = jIdx > -1 ? process.argv[jIdx + 1] : null;
const SECONDS_PER_INTERACTION = 12, SECONDS_PER_TURN = 1.8, SECONDS_FIXED = 70;

// ---------- mock 运行环境 ----------
const noop = () => {};
const ctx = new Proxy({}, {
  get: (t, k) => k === 'measureText' ? () => ({ width: 10 })
    : (k === 'createLinearGradient' || k === 'createRadialGradient') ? () => ({ addColorStop: noop })
    : k === 'createPattern' ? () => ({})
    : (t[k] !== undefined ? t[k] : noop),
  set: (t, k, v) => { t[k] = v; return true; }
});
const canvas = { width: 750, height: 1624, getContext: () => ctx };
let store = {};
global.wx = {
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 812, pixelRatio: 2, safeArea: { top: 44, bottom: 778 } }),
  createCanvas: () => canvas, createOffscreenCanvas: () => canvas, createWebAudioContext: () => null,
  getStorageSync: k => store[k], setStorageSync: (k, v) => { store[k] = v }, removeStorageSync: k => delete store[k],
  vibrateShort: noop, vibrateLong: noop, onTouchStart: noop, onTouchMove: noop, onTouchEnd: noop, onTouchCancel: noop,
  onShow: noop, onHide: noop, onWindowResize: noop, onAudioInterruptionBegin: noop, onAudioInterruptionEnd: noop,
  getMenuButtonBoundingClientRect: () => ({ top: 48, right: 365, bottom: 80, left: 278, width: 87, height: 32 }),
  getSystemInfo: noop, getAccountInfoSync: () => ({ miniProgram: { envVersion: 'develop' } }),
  reportEvent: noop, showShareMenu: noop, onShareAppMessage: noop, onShareTimeline: noop,
  getLaunchOptionsSync: () => ({ query: {} }), getUpdateManager: () => ({ onCheckForUpdate: noop, onUpdateReady: noop, onUpdateFailed: noop })
};
global.requestAnimationFrame = noop; global.canvas = canvas;
global.Image = function () {}; global.document = undefined;

// ---------- 生成带导出的临时副本 ----------
const src = fs.readFileSync(GAME, 'utf8');
const EXPORT = `
;global.__t = {
  get state(){ return state; },
  tickOneYear, resolveCurrentModalByPolicy, setRandomSeed,
  startCharacterCreation, finishCharacterCreation, evaluateEndgameArchetype, ensureLifeAmbition,
  triggerWellnessAction: (typeof triggerWellnessAction==='function'?triggerWellnessAction:null),
  openFrontlineEvent: (typeof openFrontlineEvent==='function'?openFrontlineEvent:null),
  openFamilyEvent: (typeof openFamilyEvent==='function'?openFamilyEvent:null),
  generateProceduralBirth: (typeof generateProceduralBirth==='function'?generateProceduralBirth:null),
  runTurn: (typeof runTurn==='function'?runTurn:null)
};
`;
const TMP = path.join(os.tmpdir(), 'balance_sim_game_' + process.pid + '.js');
fs.writeFileSync(TMP, src + EXPORT, 'utf8');
function fresh() { delete require.cache[require.resolve(TMP)]; store = {}; require(TMP); return global.__t; }

// ---------- 单局 ----------
const DECISION_FAMILY = id => id ? String(id) : '-';
function playLife(seed, policy, track) {
  const T = fresh(); const st = T.state; T.setRandomSeed(seed);
  let err = null;
  try { T.startCharacterCreation(false); } catch (e) { err = 'start:' + e.message.slice(0, 60); }
  try { T.generateProceduralBirth && T.generateProceduralBirth(); } catch (e) {}
  st.preferredTrack = track; st.isStarted = true; st.gameScene = 'game';
  let g = 0; while (st.activeModal && g++ < 5) { try { T.resolveCurrentModalByPolicy(policy); } catch (e) { err = err || 'fate:' + e.message.slice(0, 60); break; } }

  const decisions = []; const modalCount = {}; const samples = {};
  let interactions = 0, turns = 0, years = 0, stuck = 0, guard = 0;
  const useTurn = !!T.runTurn;
  while (guard++ < 400) {
    const a = st.age;
    if (st.activeModal === 'endgame') break;

    // 生命周期越权与数值边界断言
    if (st.age < 18) {
      if (st.family && st.family.spouseName) err = err || `minor_marriage_at_${st.age}`;
      if (st.investments && st.investments.realEstate > 0) err = err || `minor_realestate_at_${st.age}`;
      if (st.govLevel !== 0 || st.rankIndex !== 0) err = err || `minor_rank_${st.govLevel}_${st.rankIndex}`;
    } else if (st.govLevel !== st.rankIndex || st.govLevel < 1 || st.govLevel > 5 || st.lifetimeMaxRank < st.govLevel) {
      err = err || `rank_desync_${st.govLevel}_${st.rankIndex}_${st.lifetimeMaxRank}`;
    }

    let k = 0;
    while ((st.activeModal || st.pendingPhoneCrisis) && st.activeModal !== 'endgame' && k++ < 60) {
      const m = st.activeModal || 'phone';
      modalCount[m] = (modalCount[m] || 0) + 1; interactions++;
      if (m === 'decision' && st.activeDecisionEvent) decisions.push({ age: st.age, id: DECISION_FAMILY(st.activeDecisionEvent.id) });
      try { T.resolveCurrentModalByPolicy(policy); } catch (e) { err = err || ('modal ' + m + ': ' + e.message.slice(0, 70)); st.activeModal = null; st.pendingPhoneCrisis = null; }
    }
    if (st.activeModal === 'endgame') break;

    // 成年后玩家主动消耗 AP 执行日常履职与按需调养（skip 策略不执行）
    if (st.age >= 18 && policy !== 'skip') {
      if (policy === 'strategic' && (st.health < 50 || st.clean < 61) && st.ap > 0 && T.triggerWellnessAction) {
        T.triggerWellnessAction();
      }
      if (st.ap > 0 && (policy === 'strategic' || (policy === 'random' && st.age % 3 === 0))) {
        if (st.age % 2 === 0 && T.openFrontlineEvent) T.openFrontlineEvent();
        else if (T.openFamilyEvent) T.openFamilyEvent();
        let innerK = 0;
        while ((st.activeModal || st.pendingPhoneCrisis) && st.activeModal !== 'endgame' && innerK++ < 15) {
          const m = st.activeModal || 'phone';
          modalCount[m] = (modalCount[m] || 0) + 1; interactions++;
          if (m === 'decision' && st.activeDecisionEvent) decisions.push({ age: st.age, id: DECISION_FAMILY(st.activeDecisionEvent.id) });
          try { T.resolveCurrentModalByPolicy(policy); } catch (e) { err = err || ('modal ' + m + ': ' + e.message.slice(0, 70)); st.activeModal = null; st.pendingPhoneCrisis = null; }
        }
      }
    }
    if (st.activeModal === 'endgame') break;

    try { useTurn ? T.runTurn() : T.tickOneYear(); } catch (e) { err = err || ('tick: ' + e.message.slice(0, 80)); }
    turns++; years += Math.max(0, st.age - a);
    if (st.age === a) { stuck++; if (stuck > 12) break; } else stuck = 0;
    [20, 30, 40, 50, 60, 70].forEach(x => { if (st.age >= x && !samples[x]) samples[x] = { cap: Math.round(st.capital || 0), rep: Math.round(st.rep || 0), clean: Math.round(st.clean || 0), hp: Math.round(st.health || 0) }; });
  }
  let arch = null, amb = null;
  try { arch = T.evaluateEndgameArchetype(st); amb = T.ensureLifeAmbition(st); } catch (e) {}
  // 非回合模式下,"回合数"按每 5 年折算,便于与回合版对比
  const turnsForTime = useTurn ? turns : Math.max(1, Math.round(years / 5));
  const secs = interactions * SECONDS_PER_INTERACTION + turnsForTime * SECONDS_PER_TURN + SECONDS_FIXED;
  return {
    req: track, track: st.track, endAge: st.age, cap: Math.round(st.capital || 0),
    iq: Math.round(st.iq), eq: Math.round(st.eq), cou: Math.round(st.courage), clean: Math.round(st.clean),
    rep: Math.round(st.rep), hp: Math.round(st.health),
    gaokaoScore: st.gaokaoScore || null, gaokaoTier: st.gaokaoTier || 'non-gaokao',
    gaokaoSchool: st.gaokaoSchool || '-', finalJob: st.jobTitle || '-',
    spouse: (st.family && st.family.spouseName) || '未婚',
    contactsCount: Array.isArray(st.contacts) ? st.contacts.length : 0,
    end: arch && arch.id, grade: arch && arch.grade, amb: !!(amb && amb.achieved),
    interactions, decisions: decisions.length, decisionIds: decisions, turns: turnsForTime,
    estMinutes: +(secs / 60).toFixed(1), err, samples, modalCount, delegated: (st.turnDigest || []).length
  };
}

// ---------- 汇总 ----------
const TRACKS = ['gov', 'tech', 'biz', 'trade', 'industry', 'military', 'agri', 'grassroots', 'art', 'med', 'law', 'education'];
const avg = (a, k) => a.length ? Math.round(a.reduce((s, r) => s + (+r[k] || 0), 0) / a.length) : 0;
const avg1 = (a, k) => a.length ? +(a.reduce((s, r) => s + (+r[k] || 0), 0) / a.length).toFixed(1) : 0;
const pct = (n, d) => d ? Math.round(n * 100 / d) + '%' : '-';
function hashTrackSeed(tr) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < tr.length; i++) h = Math.imul(h ^ tr.charCodeAt(i), 16777619) >>> 0;
  return (h % 99991) + 17;
}

function runPolicy(policy) {
  const all = [];
  TRACKS.forEach(tr => { for (let i = 1; i <= PER_TRACK; i++) all.push(playLife(i * 9173 + hashTrackSeed(tr), policy, tr)); });
  const N = all.length;
  const grades = { S: 0, A: 0, B: 0, C: 0 }; all.forEach(r => { grades[r.grade] = (grades[r.grade] || 0) + 1; });
  const endings = {}; all.forEach(r => { endings[r.end] = (endings[r.end] || 0) + 1; });
  // 高考分数与分档分布统计
  const gaokaoScores = all.map(r => r.gaokaoScore).filter(x => typeof x === 'number');
  const gaokaoTiers = {}; all.forEach(r => { gaokaoTiers[r.gaokaoTier] = (gaokaoTiers[r.gaokaoTier] || 0) + 1; });
  // 固定剧本占比: 在 >=85% 的局里都出现的决策 id
  const idLife = all.map(r => new Set(r.decisionIds.map(d => d.id)));
  const idCnt = {}; idLife.forEach(s => s.forEach(i => { idCnt[i] = (idCnt[i] || 0) + 1; }));
  const fixed = new Set(Object.keys(idCnt).filter(i => idCnt[i] >= 0.85 * N));
  const totalDec = all.reduce((s, r) => s + r.decisionIds.length, 0);
  const fixedDec = all.reduce((s, r) => s + r.decisionIds.filter(d => fixed.has(d.id)).length, 0);
  const errs = {}; all.forEach(r => { if (r.err) errs[r.err] = (errs[r.err] || 0) + 1; });
  const curve = {}; [20, 30, 40, 50, 60, 70].forEach(a => {
    const v = all.map(r => r.samples[a]).filter(Boolean);
    curve[a] = v.length ? { cap: Math.round(v.reduce((s, x) => s + x.cap, 0) / v.length), rep: Math.round(v.reduce((s, x) => s + x.rep, 0) / v.length) } : null;
  });
  const perTrack = TRACKS.map(tr => {
    const a = all.filter(r => r.req === tr); const g = { S: 0, A: 0, B: 0, C: 0 }; a.forEach(r => { g[r.grade] = (g[r.grade] || 0) + 1; });
    const gk = a.map(r => r.gaokaoScore).filter(Boolean);
    return {
      track: tr, real: [...new Set(a.map(r => r.track))].join(','), endAge: avg(a, 'endAge'),
      cap: avg(a, 'cap'), rep: avg(a, 'rep'), clean: avg(a, 'clean'), hp: avg(a, 'hp'),
      grades: `${g.S}/${g.A}/${g.B}/${g.C}`, amb: pct(a.filter(r => r.amb).length, a.length),
      gaokaoSamples: gk.length ? gk.join('/') : '职教/入伍/闯海/务农',
      endingSamples: [...new Set(a.map(r => r.end))].join(',')
    };
  });
  return {
    policy, lives: N,
    summary: {
      avgEndAge: avg(all, 'endAge'), interactionsPerLife: avg1(all, 'interactions'), decisionsPerLife: avg1(all, 'decisions'),
      turnsPerLife: avg1(all, 'turns'), estMinutesPerLife: avg1(all, 'estMinutes'), delegatedPerLife: avg1(all, 'delegated'),
      S_or_A_share: pct(grades.S + grades.A, N), grades, ambitionAchieved: pct(all.filter(r => r.amb).length, N),
      gaokaoScoreRange: gaokaoScores.length ? `${Math.min(...gaokaoScores)}~${Math.max(...gaokaoScores)} (均值 ${Math.round(gaokaoScores.reduce((a, b) => a + b, 0) / gaokaoScores.length)})` : '-',
      gaokaoTiers,
      distinctDecisionIds: Object.keys(idCnt).length, fixedScriptIds: fixed.size, fixedScriptShare: pct(fixedDec, totalDec),
      variableDecisionsPerLife: +((totalDec - fixedDec) / N).toFixed(1), distinctEndings: Object.keys(endings).length, endings, errors: errs
    },
    curve, perTrack, fixedIds: [...fixed].sort()
  };
}

// ---------- 同条件同策略分叉度测试 (Divergence Test) ----------
function runDivergenceTest(runs = 20) {
  const results = [];
  for (let i = 1; i <= runs; i++) {
    results.push(playLife(880000 + i * 104729, 'strategic', 'gov'));
  }
  const gkScores = new Set(results.map(r => r.gaokaoScore).filter(Boolean));
  const endIds = new Set(results.map(r => r.end));
  const endAges = new Set(results.map(r => r.endAge));
  const grades = { S: 0, A: 0, B: 0, C: 0 };
  results.forEach(r => { grades[r.grade] = (grades[r.grade] || 0) + 1; });
  return {
    runs,
    distinctGaokaoScores: gkScores.size,
    distinctEndAges: endAges.size,
    distinctEndings: endIds.size,
    grades
  };
}

const policies = POLICY_ARG === 'all' ? ['skip', 'random', 'strategic'] : [POLICY_ARG];
const reports = policies.map(runPolicy);
reports.forEach(r => {
  console.log(`\n===== 策略 ${r.policy} | ${r.lives} 局 | runTurn=${!!global.__t.runTurn} =====`);
  console.log(JSON.stringify(r.summary, null, 1));
  console.log('赛道       实际赛道        终龄  资金       声望 清廉 健康  S/A/B/C  抱负  高考抽样分数');
  r.perTrack.forEach(t => console.log(t.track.padEnd(11), t.real.padEnd(14), String(t.endAge).padStart(3), String(t.cap).padStart(9), String(t.rep).padStart(5), String(t.clean).padStart(4), String(t.hp).padStart(4), ' ', t.grades.padEnd(8), t.amb.padEnd(5), t.gaokaoSamples));
  console.log('属性曲线(平均):', Object.entries(r.curve).map(([a, v]) => v ? `${a}岁 资金${v.cap}/声望${v.rep}` : `${a}岁 -`).join(' | '));
});
const divReport = runDivergenceTest(20);
console.log('\n===== 同条件同策略分叉度测试 (Divergence Test, 20 局 gov) =====');
console.log(JSON.stringify(divReport, null, 1));
if (JSON_OUT) { fs.writeFileSync(JSON_OUT, JSON.stringify({ reports, divReport }, null, 1)); console.log('\n已写入', JSON_OUT); }
try { fs.unlinkSync(TMP); } catch (e) {}
