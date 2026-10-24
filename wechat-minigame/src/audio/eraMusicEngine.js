// ==========================================
// 风华年代：四大时代 64 拍东方意境算法交响引擎 (Era Music Engine)
// 原生 Web Audio 物理声学建模合成器 + Lookahead 高精度前瞻调度器
// 覆盖：童年《稚子谣》、八九十年代《春潮赋》、千禧盛世《如日升》、晚年当代《沉思录》
// ==========================================

let _audioCtx = null;
let _masterBusNode = null;
let _bgmBusNode = null;
let _activeTonalBus = null;
let _bgmPlaying = false;
let _bgmEnabled = true;
let _bgmBeatCount = 0;
let _bgmNextNoteTime = 0;
let _bgmLookaheadTimer = null;
let _getGameStateFn = () => ({});
let _logErrorFn = () => {};

const AUDIO_NOISE_BUFFERS = {};

function getNoiseBuffer(ctxAudio, key, dur, fillFn) {
  if (!ctxAudio) return null;
  const sampleRate = ctxAudio.sampleRate || 44100;
  const cacheKey = key + '_' + sampleRate;
  if (AUDIO_NOISE_BUFFERS[cacheKey]) {
    return AUDIO_NOISE_BUFFERS[cacheKey];
  }
  try {
    const bufferSize = Math.max(64, Math.floor(sampleRate * dur));
    const buf = ctxAudio.createBuffer(1, bufferSize, sampleRate);
    const output = buf.getChannelData(0);
    fillFn(output, bufferSize, sampleRate);
    AUDIO_NOISE_BUFFERS[cacheKey] = buf;
    return buf;
  } catch (e) {
    return null;
  }
}

function _triggerPcmBuffer(ctxAudio, dest, buf, vol, startTime, rateJitter, portamento) {
  if (!ctxAudio || !dest || !buf) return null;
  const t = startTime !== undefined && startTime !== null ? startTime : ctxAudio.currentTime;
  try {
    const src = ctxAudio.createBufferSource();
    src.buffer = buf;
    if (src.playbackRate) {
      const baseRate = 1.0 + (rateJitter ? (Math.random() * 2 - 1) * rateJitter : 0);
      if (portamento) {
        // 中国传统管弦起指气韵微滑音 (天然气口与指尖轻抹，打破电子机械死板感)
        src.playbackRate.setValueAtTime(baseRate * 0.984, t);
        src.playbackRate.linearRampToValueAtTime(baseRate, t + 0.038);
      } else {
        src.playbackRate.setValueAtTime(baseRate, t);
      }
    }
    const gain = ctxAudio.createGain();
    const targetV = Math.max(0.001, Math.min(0.65, vol || 0.16));
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(targetV, t + 0.005);
    src.connect(gain);
    gain.connect(dest);
    src.start(t);
    return src;
  } catch (e) {
    return null;
  }
}

// 1. 丝桐真声物理声学 (古琴按音/古筝流水/琵琶清音)
// 引入：双阶非对称指腹揉弦 (Flesh Plectrum Model) + 桐木面板声学共鸣峰 (Body Resonances at 180Hz, 320Hz, 540Hz)
function getKarplusStrongBuffer(ctxAudio, freq, dur, character) {
  const f = Math.max(55, Math.min(1760, Math.round(freq * 10) / 10));
  const d = Math.min(dur || 2.0, 3.2);
  const charKey = character || 'guzheng';
  return getNoiseBuffer(ctxAudio, 'acoustic_str_' + charKey + '_' + f + '_' + d.toFixed(2), d, (out, len, sr) => {
    const period = Math.max(8, Math.round(sr / f));
    const ring = new Float32Array(period);
    
    // 指尖轻抚与真丝缠弦真实激励（非机械阶跃脉冲）：
    // 指腹与指甲接触时间约 3~6ms，形成宽圆抛物线形位移，混入细微皮质摩擦泛音
    for (let i = 0; i < period; i++) {
      const phase = i / period;
      const fundamental = Math.sin(Math.PI * phase);
      const secondHarmonic = 0.42 * Math.sin(2 * Math.PI * phase);
      const thirdHarmonic = 0.18 * Math.sin(3 * Math.PI * phase);
      // 指尖皮肉摩擦温润微扰
      const fingerFriction = (Math.sin(i * 19.123 + f) * 43758.5453 % 1) * 0.12;
      ring[i] = (fundamental * 0.65 + secondHarmonic + thirdHarmonic) + fingerFriction;
    }

    // 桐木共鸣箱二阶带通滤波状态 (Body Formants: 220Hz 琴腔暗香, 520Hz 纳音清脆)
    let b1_1 = 0, b1_2 = 0;
    let b2_1 = 0, b2_2 = 0;
    const loss = charKey === 'guqin' ? 0.9968 : (charKey === 'pipa' ? 0.9948 : 0.9978);
    const lowpassBlend = charKey === 'guqin' ? 0.52 : (charKey === 'pipa' ? 0.32 : 0.38);

    let ptr = 0;
    for (let i = 0; i < len; i++) {
      const nextPtr = (ptr + 1) % period;
      const currentSample = ring[ptr];
      // 真实琴弦损耗循环（带阻尼低通扩散，高频泛音先逝，低频基音余音悠长）
      ring[ptr] = loss * ((1 - lowpassBlend) * currentSample + lowpassBlend * ring[nextPtr]);
      ptr = nextPtr;

      // 桐木面板声学共振箱模拟 (Acoustic Soundboard Coupling)
      b1_1 = 0.92 * b1_1 + currentSample * 0.08;
      b1_2 = 0.88 * b1_2 + (currentSample - b1_1) * 0.14;

      b2_1 = 0.78 * b2_1 + currentSample * 0.22;
      b2_2 = 0.84 * b2_2 + (currentSample - b2_1) * 0.18;

      // 传统丝弦起手吸气软包络与余音袅袅自然对数衰减
      const t = i / sr;
      const touchAtt = t < 0.012 ? Math.sin((t / 0.012) * (Math.PI * 0.5)) : 1.0;
      const naturalDecay = Math.exp(-t / (d * (charKey === 'guqin' ? 0.85 : 0.72)));

      // 桐木共振与原弦振动黄金比例耦合输出
      const combined = (currentSample * 0.55 + b1_2 * 0.35 + b2_2 * 0.25) * touchAtt * naturalDecay;
      out[i] = Math.tanh(combined * 1.35) * 0.82;
    }
  });
}

// 2. 竹管气鸣物理声学 (苦竹竹笛/紫竹洞箫/陶土古埙)
// 引入：真实呼吸气口脉冲 (Breath Chiff & Turbulence) + 簧膜共振 (Bamboo Membrane Buzz) + 演奏者自然微弱颤音
function getAcousticWindBuffer(ctxAudio, freq, dur, inst) {
  const f = Math.round(freq * 10) / 10;
  const d = Math.min(dur || 2.2, 4.6);
  const kind = inst || 'flute';
  return getNoiseBuffer(ctxAudio, 'acoustic_wind_' + kind + '_' + f + '_' + d.toFixed(2), d, (out, len, sr) => {
    const isXiao = (kind === 'xiao');
    const isXun = (kind === 'xun');
    let phase = 0;
    let breathTurbulence = 0;
    let memoState = 0;

    for (let i = 0; i < len; i++) {
      const t = i / sr;
      // 演奏者腹式呼吸与指尖运指自然微颤 (5.1Hz 人类情感微颤，前 0.3s 不颤，渐入深情)
      const vibratoOnset = t > 0.32 ? Math.min(1.0, (t - 0.32) / 0.6) : 0;
      const vibratoMod = 0.007 * Math.sin(2 * Math.PI * 5.1 * t) * vibratoOnset;
      const currentPitch = f * (1 + vibratoMod);

      phase += (2 * Math.PI * currentPitch) / sr;

      // 气流吹孔湍流物理建模 (Pinkish Breath Jet Turbulence)
      const rawNoise = (Math.random() * 2 - 1);
      breathTurbulence = 0.82 * breathTurbulence + 0.18 * rawNoise;

      // 吹奏起音气口微爆破 (Attack Chiff)
      const chiffGain = t < 0.06 ? (0.28 * Math.pow(1 - t / 0.06, 1.8)) : 0.035;
      const breathNoise = breathTurbulence * chiffGain;

      // 竹管管腔奇次与偶次谐波共鸣
      const h1 = Math.sin(phase);
      const h2 = (isXun ? 0.06 : (isXiao ? 0.16 : 0.28)) * Math.sin(phase * 2);
      const h3 = (isXun ? 0.03 : (isXiao ? 0.08 : 0.14)) * Math.sin(phase * 3);
      const h4 = (isXun ? 0.01 : (isXiao ? 0.03 : 0.07)) * Math.sin(phase * 4);

      // 笛膜非线性振动 (Bamboo Membrane Resonation): 给竹笛注入灵魂的清亮竹膜脆响
      let membraneBuzz = 0;
      if (!isXiao && !isXun) {
        membraneBuzz = 0.14 * Math.sin(phase * 2.5 + h1 * 0.8);
      }

      const rawAir = (h1 * 0.72 + h2 + h3 + h4 + membraneBuzz + breathNoise);

      // 管身腔体声学吸收滤波 (低通温润化)
      memoState = 0.76 * memoState + 0.24 * rawAir;

      // 呼吸起音包络：管乐器的渐进饱满发音过程
      const attDuration = isXun ? 0.12 : (isXiao ? 0.09 : 0.065);
      const attEnv = t < attDuration ? Math.sin((t / attDuration) * (Math.PI * 0.5)) : 1.0;
      // 乐句收气留白渐退
      const relStart = d - 0.28;
      const relEnv = t > relStart ? Math.exp(-(t - relStart) * 11) : 1.0;

      out[i] = Math.tanh(memoState * 1.22) * attEnv * relEnv * 0.78;
    }
  });
}

// 3. 丝竹二胡物理声学 (马尾弓毛与蟒皮琴筒共鸣峰)
// 引入：松香擦弦滞滑动力学 (Stick-Slip Friction) + 琴筒共鸣箱三峰声学滤波
function getAcousticBowedBuffer(ctxAudio, freq, dur) {
  const f = Math.round(freq * 10) / 10;
  const d = Math.min(dur || 2.4, 4.5);
  return getNoiseBuffer(ctxAudio, 'acoustic_erhu_' + f + '_' + d.toFixed(2), d, (out, len, sr) => {
    let phase = 0;
    let bowRosin = 0;
    let tubeRes1 = 0, tubeRes2 = 0;

    for (let i = 0; i < len; i++) {
      const t = i / sr;
      // 二胡揉弦情感颤音 (Vibrato 5.4Hz，带有传统江南丝竹的运指微滑)
      const vibOnset = t > 0.28 ? Math.min(1.0, (t - 0.28) / 0.5) : 0;
      const vib = 0.0085 * Math.sin(2 * Math.PI * 5.4 * t) * vibOnset;
      phase += (2 * Math.PI * f * (1 + vib)) / sr;

      // 松香马尾擦弦颗粒感 (Rosin Friction Noise)
      bowRosin = 0.80 * bowRosin + 0.20 * (Math.random() * 2 - 1);
      const bowBite = bowRosin * (t < 0.10 ? (0.24 * (1 - t / 0.10)) : 0.04);

      // 非对称真实琴弦锯齿/三角混合波
      const pMod = phase % (2 * Math.PI);
      const bowedWave = (pMod < Math.PI * 0.85) ? (pMod / (Math.PI * 0.85) * 2 - 1) : (1 - (pMod - Math.PI * 0.85) / (Math.PI * 1.15) * 2);

      // 红木琴筒与蟒皮双峰共振腔 (Erhu Tube & Python Skin Formants)
      const excited = bowedWave + bowBite;
      tubeRes1 = 0.74 * tubeRes1 + excited * 0.26;
      tubeRes2 = 0.82 * tubeRes2 + tubeRes1 * 0.22;

      // 运弓软起音与行弓深情延音
      const attEnv = t < 0.09 ? Math.pow(t / 0.09, 1.3) : 1.0;
      const relStart = d - 0.32;
      const relEnv = t > relStart ? Math.exp(-(t - relStart) * 9.5) : 1.0;

      out[i] = Math.tanh((tubeRes2 * 0.82 + Math.sin(phase) * 0.18) * 1.4) * attEnv * relEnv * 0.75;
    }
  });
}

// 4. 笙管簧片和鸣 (传统排笙温润低音铺底与和音长鸣)
function getAcousticShengBuffer(ctxAudio, freq, dur) {
  const f = Math.round(freq * 10) / 10;
  const d = Math.min(dur || 2.5, 4.8);
  return getNoiseBuffer(ctxAudio, 'acoustic_sheng_' + f + '_' + d.toFixed(2), d, (out, len, sr) => {
    let phase = 0;
    let chamber = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      phase += (2 * Math.PI * f) / sr;
      // 铜簧振动复合声学谐波
      const reed = Math.sin(phase) * 0.80 + Math.sin(phase * 2) * 0.18 + Math.sin(phase * 3) * 0.06;
      chamber = 0.85 * chamber + 0.15 * reed;
      const att = t < 0.14 ? Math.sin((t / 0.14) * (Math.PI * 0.5)) : 1.0;
      const rel = t > d - 0.32 ? Math.exp(-(t - (d - 0.32)) * 8) : 1.0;
      out[i] = chamber * att * rel * 0.68;
    }
  });
}

// 5. 金石金磬模态共振 (编钟/玉磬/八音盒)
function getMetallicModalBuffer(ctxAudio, baseFreq, dur, material) {
  const f = Math.round(baseFreq * 10) / 10;
  const d = Math.min(dur || 1.2, 2.5);
  const mat = material || 'bronze';
  return getNoiseBuffer(ctxAudio, 'metal_' + mat + '_' + f + '_' + d.toFixed(2), d, (out, len, sr) => {
    const modes = (mat === 'jade')
      ? [
          { r: 1.0, a: 0.66, k: 4.5 },
          { r: 2.0, a: 0.26, k: 9.5 },
          { r: 3.16, a: 0.10, k: 20.0 }
        ]
      : [
          { r: 0.5, a: 0.26, k: 1.9 },
          { r: 1.0, a: 0.62, k: 2.3 },
          { r: 1.0025, a: 0.24, k: 2.6 },
          { r: 1.50, a: 0.26, k: 3.8 },
          { r: 2.00, a: 0.18, k: 5.8 },
          { r: 3.00, a: 0.08, k: 11.0 }
        ];

    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const att = t < 0.0035 ? Math.sin((t / 0.0035) * (Math.PI * 0.5)) : 1.0;
      let sum = 0;
      for (let m = 0; m < modes.length; m++) {
        const md = modes[m];
        sum += md.a * Math.exp(-t * md.k) * Math.sin(2 * Math.PI * (f * md.r) * t);
      }
      out[i] = sum * att * 0.68;
    }
  });
}

// 6. 木音轻响与环境敲击 (紫檀木书案/梆子/算盘珠/粉笔/节拍 - 物理超短微模态，彻底消除电子beep音)
function getTactileClickBuffer(ctxAudio, style) {
  const st = style || 'wood_click';
  const dur = (st === 'wood_click') ? 0.022 : ((st === 'chalk' || st === 'abacus_hi') ? 0.024 : 0.038);
  return getNoiseBuffer(ctxAudio, 'tactile_v3_' + st, dur, (out, len, sr) => {
    let f0 = 320, damp = 520, crisp = 0.28;
    if (st === 'wood_click') { f0 = 320; damp = 520; crisp = 0.28; }
    else if (st === 'abacus_hi') { f0 = 960; damp = 340; crisp = 0.22; }
    else if (st === 'abacus_lo') { f0 = 680; damp = 280; crisp = 0.20; }
    else if (st === 'watch_1') { f0 = 1560; damp = 520; crisp = 0.25; }
    else if (st === 'watch_2') { f0 = 1320; damp = 480; crisp = 0.22; }
    else if (st === 'dice') { f0 = 740; damp = 290; crisp = 0.24; }
    else if (st === 'chalk') { f0 = 640; damp = 360; crisp = 0.18; }
    else if (st === 'wood_block') { f0 = 420; damp = 240; crisp = 0.18; }

    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const att = i < 16 ? (i / 16) : 1.0;
      // 超微指尖物理触击瞬态噪声脉冲 (0.8ms)
      const contactPulse = t < 0.0008 ? (Math.random() * 2 - 1) * Math.sin(Math.PI * (t / 0.0008)) * crisp : 0;
      const m1 = Math.exp(-t * damp) * Math.sin(2 * Math.PI * f0 * t);
      const m2 = Math.exp(-t * damp * 2.2) * Math.sin(2 * Math.PI * (f0 * 2.15) * t) * 0.22;
      out[i] = (contactPulse + m1 * 0.65 + m2) * att * 0.72;
    }
  });
}

// 6.1 寿山石印章温润落案 PCM (厚重实木书案物理低频共鸣与印面纸张贴合瞬态)
function getSealStampBuffer(ctxAudio) {
  return getNoiseBuffer(ctxAudio, 'seal_stamp_v3_pcm', 0.13, (out, len, sr) => {
    let prev = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const noise = (Math.random() * 2 - 1) - prev * 0.72;
      prev = noise;
      const slap = t < 0.005 ? noise * Math.exp(-t * 620) * 0.32 : 0;
      const desk1 = Math.exp(-t * 38) * Math.sin(2 * Math.PI * 104 * t) * 0.65;
      const desk2 = Math.exp(-t * 82) * Math.sin(2 * Math.PI * 228 * t) * 0.28;
      const desk3 = Math.exp(-t * 190) * Math.sin(2 * Math.PI * 490 * t) * 0.12;
      out[i] = Math.tanh((slap + desk1 + desk2 + desk3) * 1.15) * 0.72;
    }
  });
}

// 7. 温润粉红环境噪声 (用于微风/细雨/车间蒸汽/教室课本翻动)
function getPinkNoiseBuffer(ctxAudio, dur = 3.0) {
  return getNoiseBuffer(ctxAudio, 'pink_amb_' + dur.toFixed(1), dur, (out, len) => {
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < len; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      out[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
      b6 = white * 0.115926;
    }
  });
}

// 8. 宣纸书页微翻与书斋案头纸响 (细腻微动)
function getPaperFlipBuffer(ctxAudio, isScroll) {
  const dur = isScroll ? 0.15 : 0.082;
  return getNoiseBuffer(ctxAudio, 'paper_velvet_' + (isScroll ? 'long' : 'short'), dur, (out, len, sr) => {
    let prev1 = 0, prev2 = 0, lp = 0;
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      const normT = t / dur;
      const edgeSnap = t < 0.010 ? Math.sin(Math.PI * (t / 0.010)) * 0.24 : 0;
      const arcEnv = Math.pow(Math.sin(Math.PI * normT), 1.6) * Math.exp(-normT * 1.3);
      const density = 0.13 + 0.16 * Math.sin(Math.PI * normT);
      const r = Math.random();
      const impulse = r < density ? (r < density * 0.5 ? 1 : -1) : 0;
      const diff = impulse - 1.35 * prev1 + 0.45 * prev2;
      prev2 = prev1;
      prev1 = impulse;
      lp = 0.66 * lp + 0.34 * diff;
      out[i] = (edgeSnap * diff * 0.3 + lp * arcEnv * 0.58);
    }
  });
}

// 9. 紫砂茶汤注水与清泉水滴声学 Minnaert 气泡微共鸣
function getWaterPourBuffer(ctxAudio) {
  return getNoiseBuffer(ctxAudio, 'water_pour_minnaert', 0.42, (out, len, sr) => {
    const drops = [
      { t0: 0.010, f0: 620, tau: 0.0070, amp: 0.34 },
      { t0: 0.068, f0: 840, tau: 0.0060, amp: 0.40 },
      { t0: 0.132, f0: 720, tau: 0.0065, amp: 0.34 },
      { t0: 0.198, f0: 960, tau: 0.0055, amp: 0.42 },
      { t0: 0.268, f0: 790, tau: 0.0062, amp: 0.36 },
      { t0: 0.338, f0: 1060, tau: 0.0052, amp: 0.30 }
    ];
    for (let i = 0; i < len; i++) {
      const t = i / sr;
      let s = 0;
      for (let d = 0; d < drops.length; d++) {
        const dr = drops[d];
        const dt = t - dr.t0;
        if (dt >= 0 && dt < 0.038) {
          const instPhase = 2 * Math.PI * dr.f0 * dt * (1 + 0.14 * (dt / 0.028));
          s += dr.amp * Math.exp(-dt / dr.tau) * Math.sin(instPhase);
        }
      }
      out[i] = s * 0.62;
    }
  });
}

function getEffectiveAudioContext() {
  if (_audioCtx) return _audioCtx;
  if (typeof wx !== 'undefined' && typeof wx.createWebAudioContext === 'function') {
    try { _audioCtx = wx.createWebAudioContext(); } catch (e) {}
  }
  if (!_audioCtx && typeof AudioContext !== 'undefined') {
    try { _audioCtx = new AudioContext(); } catch (e) {}
  } else if (!_audioCtx && typeof webkitAudioContext !== 'undefined') {
    try { _audioCtx = new webkitAudioContext(); } catch (e) {}
  }
  if (_audioCtx && _audioCtx.state === 'suspended') {
    try { _audioCtx.resume(); } catch (e) {}
  }
  return _audioCtx;
}

function getMasterAudioBus(ctxAudio) {
  if (!ctxAudio) return null;
  if (_masterBusNode && _masterBusNode._ctx === ctxAudio) return _masterBusNode;
  try {
    const t = ctxAudio.currentTime || 0;
    const masterGain = ctxAudio.createGain();
    masterGain.gain.setValueAtTime(0.80, t);
    masterGain._ctx = ctxAudio;

    const warmthFilter = ctxAudio.createBiquadFilter();
    warmthFilter.type = 'lowpass';
    warmthFilter.frequency.setValueAtTime(6400, t);
    warmthFilter.Q.setValueAtTime(0.5, t);
    masterGain.connect(warmthFilter);

    const dryGain = ctxAudio.createGain();
    dryGain.gain.setValueAtTime(0.78, t);
    warmthFilter.connect(dryGain);

    let lastNode = dryGain;
    if (ctxAudio.createDynamicsCompressor) {
      try {
        const comp = ctxAudio.createDynamicsCompressor();
        comp.threshold.setValueAtTime(-16, t);
        comp.knee.setValueAtTime(20, t);
        comp.ratio.setValueAtTime(2.6, t);
        comp.attack.setValueAtTime(0.012, t);
        comp.release.setValueAtTime(0.20, t);
        lastNode.connect(comp);
        lastNode = comp;
      } catch (e) {}
    }
    lastNode.connect(ctxAudio.destination);
    _masterBusNode = masterGain;
    return _masterBusNode;
  } catch (e) {
    return ctxAudio.destination;
  }
}

function getBgmSubBus(ctxAudio) {
  const master = getMasterAudioBus(ctxAudio);
  if (!ctxAudio || !master) return null;
  if (_bgmBusNode && _bgmBusNode._ctx === ctxAudio) return _bgmBusNode;
  try {
    const t = ctxAudio.currentTime || 0;
    const bus = ctxAudio.createGain();
    bus.gain.setValueAtTime(0.85, t);
    bus._ctx = ctxAudio;

    // 1. 直达声通道 (Dry Path)
    const dryGain = ctxAudio.createGain();
    dryGain.gain.setValueAtTime(0.80, t);
    bus.connect(dryGain);
    dryGain.connect(master);

    // 2. 东方意境殿堂空间漫反射声场 (Acoustic Spatial Ambience & 3-Tap Diffuse Network)
    if (typeof ctxAudio.createDelay === 'function') {
      try {
        const reverbFilter = ctxAudio.createBiquadFilter();
        reverbFilter.type = 'lowpass';
        reverbFilter.frequency.setValueAtTime(2800, t); // 丝绸温润吸音
        reverbFilter.Q.setValueAtTime(0.5, t);

        const delay1 = ctxAudio.createDelay(1.5);
        delay1.delayTime.setValueAtTime(0.068, t); // 早期泛音反射 68ms (左侧侧墙反射)

        const delay2 = ctxAudio.createDelay(1.5);
        delay2.delayTime.setValueAtTime(0.142, t); // 次级空灵扩散 142ms (右侧后墙反射)

        const delay3 = ctxAudio.createDelay(1.5);
        delay3.delayTime.setValueAtTime(0.235, t); // 殿堂穹顶远景扩散 235ms (回字形深邃声场)

        const fb1 = ctxAudio.createGain();
        fb1.gain.setValueAtTime(0.24, t);

        const fb2 = ctxAudio.createGain();
        fb2.gain.setValueAtTime(0.20, t);

        const fb3 = ctxAudio.createGain();
        fb3.gain.setValueAtTime(0.16, t);

        const wetGain = ctxAudio.createGain();
        wetGain.gain.setValueAtTime(0.42, t); // 醇厚饱满、余韵悠长的空间沉浸感

        bus.connect(reverbFilter);
        reverbFilter.connect(delay1);
        delay1.connect(fb1);
        fb1.connect(delay2);
        delay2.connect(fb2);
        fb2.connect(delay3);
        delay3.connect(fb3);
        fb3.connect(delay1);

        delay1.connect(wetGain);
        delay2.connect(wetGain);
        delay3.connect(wetGain);
        wetGain.connect(master);
      } catch (_) {}
    }

    _bgmBusNode = bus;
    return bus;
  } catch (e) {
    return master;
  }
}

function duckBgmForSfx(duckDuration = 1.0, dipLevel = 0.38) {
  const ctxAudio = getEffectiveAudioContext();
  if (!ctxAudio || !_bgmPlaying) return;
  const bus = getBgmSubBus(ctxAudio);
  if (!bus || !bus.gain) return;
  try {
    const t = ctxAudio.currentTime;
    bus.gain.cancelScheduledValues(t);
    bus.gain.setValueAtTime(Math.max(0.001, bus.gain.value || 0.85), t);
    bus.gain.linearRampToValueAtTime(dipLevel, t + 0.045);
    bus.gain.exponentialRampToValueAtTime(0.85, t + Math.max(0.4, duckDuration));
  } catch (e) {}
}

function playInstrumentTone(instrument, freq, duration, volume, delaySec = 0, customBus = null, exactStartTime = null) {
  const ctxAudio = getEffectiveAudioContext();
  if (!ctxAudio || !freq) return;
  try {
    const dest = customBus || getMasterAudioBus(ctxAudio);
    if (!dest) return;
    const baseT = (exactStartTime !== null && exactStartTime !== undefined) ? exactStartTime : ctxAudio.currentTime;
    const t = baseT + (delaySec || 0);
    const v = Math.max(0.005, Math.min(0.28, (volume || 0.08) * 0.95));
    const d = Math.max(0.25, Math.min(duration || 1.4, 4.2));

    if (instrument === 'guqin') {
      const ksBuf = getKarplusStrongBuffer(ctxAudio, freq, Math.min(d, 2.8), 'guqin');
      _triggerPcmBuffer(ctxAudio, dest, ksBuf, v * 0.95, t, 0.001, true);
    } else if (instrument === 'guzheng' || instrument === 'pipa') {
      const isPipa = (instrument === 'pipa');
      const ksBuf = getKarplusStrongBuffer(ctxAudio, freq, Math.min(d, 2.2), isPipa ? 'pipa' : 'guzheng');
      _triggerPcmBuffer(ctxAudio, dest, ksBuf, v * (isPipa ? 0.88 : 0.95), t, 0.001, false);
    } else if (instrument === 'flute' || instrument === 'xiao' || instrument === 'xun') {
      const windBuf = getAcousticWindBuffer(ctxAudio, freq, d, instrument);
      _triggerPcmBuffer(ctxAudio, dest, windBuf, v * 0.88, t, 0.001, true);
    } else if (instrument === 'erhu') {
      const erhuBuf = getAcousticBowedBuffer(ctxAudio, freq, d);
      _triggerPcmBuffer(ctxAudio, dest, erhuBuf, v * 0.86, t, 0.001, true);
    } else if (instrument === 'bianzhong' || instrument === 'bianqing') {
      const mat = instrument === 'bianqing' ? 'jade' : 'bronze';
      const buf = getMetallicModalBuffer(ctxAudio, freq, Math.max(1.2, d), mat);
      _triggerPcmBuffer(ctxAudio, dest, buf, v * 0.85, t, 0.001, false);
    } else if (instrument === 'sheng' || instrument === 'cello_drone' || instrument === 'pad') {
      const shengBuf = getAcousticShengBuffer(ctxAudio, freq, d);
      _triggerPcmBuffer(ctxAudio, dest, shengBuf, v * 0.72, t, 0.001, false);
    } else if (instrument === 'musicbox') {
      const buf = getMetallicModalBuffer(ctxAudio, freq, Math.min(1.4, d), 'jade');
      _triggerPcmBuffer(ctxAudio, dest, buf, v * 0.68, t, 0.001);
    } else if (instrument === 'drum') {
      if (freq < 200) {
        const osc = ctxAudio.createOscillator();
        const dG = ctxAudio.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(92, t);
        osc.frequency.exponentialRampToValueAtTime(46, t + 0.18);
        dG.gain.setValueAtTime(0.0001, t);
        dG.gain.linearRampToValueAtTime(v * 0.55, t + 0.010);
        dG.gain.exponentialRampToValueAtTime(0.0001, t + 0.48);
        osc.connect(dG);
        dG.connect(dest);
        osc.start(t);
        osc.stop(t + 0.50);
      } else {
        const buf = getTactileClickBuffer(ctxAudio, 'wood_block');
        _triggerPcmBuffer(ctxAudio, dest, buf, v * 0.55, t, 0.010);
      }
    } else {
      const buf = getKarplusStrongBuffer(ctxAudio, freq, d, 'guzheng');
      _triggerPcmBuffer(ctxAudio, dest, buf, v * 0.85, t, 0.001);
    }
  } catch (e) {
    _logErrorFn('playInstrumentTone', e);
  }
}

// ------------------------------------------
// 四大时代 64 拍大曲式东方意境交响乐谱 (ERA_BGM_SUITES)
// ------------------------------------------
const ERA_BGM_SUITES = {
  childhood: {
    title: "《稚子谣·弄堂斜阳》", // 少年蒙童与小学时光 (0-15岁)
    tempoBpm: 66,
    beatSec: 0.909,
    totalBeats: 64,
    chords: [
      [130.81, 196.00, 261.63, 329.63], // 小节 1: C宫温润和弦 [C3, G3, C4, E4]
      [130.81, 196.00, 261.63, 392.00], // 小节 2: C宫空灵转位 [C3, G3, C4, G4]
      [110.00, 164.81, 220.00, 329.63], // 小节 3: A羽摇篮和弦 [A2, E3, A3, E4]
      [110.00, 164.81, 261.63, 329.63], // 小节 4: A羽抒情和弦 [A2, E3, C4, E4]
      [146.83, 220.00, 293.66, 392.00], // 小节 5: D商清泉和弦 [D3, A3, D4, G4]
      [146.83, 220.00, 293.66, 440.00], // 小节 6: D商明朗和弦 [D3, A3, D4, A4]
      [98.00,  196.00, 293.66, 392.00], // 小节 7: G徵晴空和弦 [G2, G3, D4, G4]
      [130.81, 196.00, 261.63, 329.63], // 小节 8: C宫回归和弦 [C3, G3, C4, E4]
      [110.00, 164.81, 220.00, 392.00], // 小节 9: A羽辽阔和弦 [A2, E3, A3, G4]
      [130.81, 196.00, 261.63, 392.00], // 小节 10: C宫深情和弦 [C3, G3, C4, G4]
      [146.83, 220.00, 293.66, 392.00], // 小节 11: D商奋进和弦 [D3, A3, D4, G4]
      [98.00,  196.00, 293.66, 392.00], // 小节 12: G徵晚霞和弦 [G2, G3, D4, G4]
      [130.81, 196.00, 261.63, 329.63], // 小节 13: C宫温存和弦 [C3, G3, C4, E4]
      [110.00, 164.81, 220.00, 261.63], // 小节 14: A羽轻喃和弦 [A2, E3, A3, C4]
      [98.00,  196.00, 293.66, 392.00], // 小节 15: G徵暮色和弦 [G2, G3, D4, G4]
      [130.81, 196.00, 261.63, 329.63]  // 小节 16: C宫终曲长音 [C3, G3, C4, E4]
    ],
    notes: [
      // 起·春风拂柳，洞箫深情倾诉
      { beat: 0,   freq: 392.00, dur: 1.5, inst: 'xiao', vol: 0.052 }, // 5 (G4)
      { beat: 1.5, freq: 329.63, dur: 0.5, inst: 'xiao', vol: 0.046 }, // 3 (E4)
      { beat: 2,   freq: 392.00, dur: 1.0, inst: 'xiao', vol: 0.050 }, // 5 (G4)
      { beat: 3,   freq: 523.25, dur: 2.6, inst: 'xiao', vol: 0.055 }, // 1' (C5) 悠长延音与气口
      { beat: 6,   freq: 440.00, dur: 1.0, inst: 'xiao', vol: 0.048 }, // 6 (A4)
      { beat: 7,   freq: 392.00, dur: 1.0, inst: 'xiao', vol: 0.046 }, // 5 (G4)
      { beat: 8,   freq: 329.63, dur: 1.5, inst: 'xiao', vol: 0.046 }, // 3 (E4)
      { beat: 9.5, freq: 293.66, dur: 0.5, inst: 'xiao', vol: 0.042 }, // 2 (D4)
      { beat: 10,  freq: 261.63, dur: 3.2, inst: 'xiao', vol: 0.052 }, // 1 (C4)
      // 承·洞箫留白，发条八音盒晶莹如梦
      { beat: 16,  freq: 659.25, dur: 1.0, inst: 'musicbox', vol: 0.042 }, // 3' (E5)
      { beat: 17,  freq: 587.33, dur: 0.8, inst: 'musicbox', vol: 0.038 }, // 2' (D5)
      { beat: 18,  freq: 523.25, dur: 1.0, inst: 'musicbox', vol: 0.040 }, // 1' (C5)
      { beat: 19,  freq: 440.00, dur: 1.2, inst: 'musicbox', vol: 0.036 }, // 6 (A4)
      { beat: 21,  freq: 392.00, dur: 2.2, inst: 'musicbox', vol: 0.040 }, // 5 (G4)
      { beat: 24,  freq: 293.66, dur: 1.0, inst: 'xiao', vol: 0.048 },     // 2 (D4)
      { beat: 25,  freq: 329.63, dur: 1.0, inst: 'xiao', vol: 0.048 },     // 3 (E4)
      { beat: 26,  freq: 392.00, dur: 1.5, inst: 'xiao', vol: 0.052 },     // 5 (G4)
      { beat: 28,  freq: 440.00, dur: 2.6, inst: 'xiao', vol: 0.054 },     // 6 (A4)
      // 转·古筝行云流水，洞箫高亢回应
      { beat: 32,  freq: 440.00, dur: 1.0, inst: 'guzheng', vol: 0.046 },  // 6 (A4)
      { beat: 33,  freq: 523.25, dur: 1.0, inst: 'guzheng', vol: 0.048 },  // 1' (C5)
      { beat: 34,  freq: 587.33, dur: 1.5, inst: 'xiao', vol: 0.054 },     // 2' (D5)
      { beat: 35.5, freq: 659.25, dur: 0.5, inst: 'xiao', vol: 0.052 },   // 3' (E5)
      { beat: 36,  freq: 587.33, dur: 2.6, inst: 'xiao', vol: 0.055 },     // 2' (D5)
      { beat: 40,  freq: 523.25, dur: 1.0, inst: 'xiao', vol: 0.052 },     // 1' (C5)
      { beat: 41,  freq: 440.00, dur: 1.0, inst: 'xiao', vol: 0.048 },     // 6 (A4)
      { beat: 42,  freq: 392.00, dur: 1.5, inst: 'xiao', vol: 0.050 },     // 5 (G4)
      { beat: 44,  freq: 329.63, dur: 2.6, inst: 'xiao', vol: 0.050 },     // 3 (E4)
      // 合·归家呼唤与星河入梦
      { beat: 48,  freq: 261.63, dur: 1.0, inst: 'guzheng', vol: 0.046 },  // 1 (C4)
      { beat: 49,  freq: 293.66, dur: 1.0, inst: 'guzheng', vol: 0.046 },  // 2 (D4)
      { beat: 50,  freq: 329.63, dur: 1.0, inst: 'guzheng', vol: 0.048 },  // 3 (E4)
      { beat: 51,  freq: 392.00, dur: 1.0, inst: 'guzheng', vol: 0.050 },  // 5 (G4)
      { beat: 52,  freq: 523.25, dur: 2.6, inst: 'xiao', vol: 0.054 },     // 1' (C5)
      { beat: 56,  freq: 440.00, dur: 1.0, inst: 'xiao', vol: 0.046 },     // 6 (A4)
      { beat: 57,  freq: 392.00, dur: 1.0, inst: 'xiao', vol: 0.044 },     // 5 (G4)
      { beat: 58,  freq: 329.63, dur: 1.5, inst: 'xiao', vol: 0.046 },     // 3 (E4)
      { beat: 60,  freq: 261.63, dur: 3.8, inst: 'xiao', vol: 0.052 }      // 1 (C4) 恬静淡入余音
    ]
  },
  early: {
    title: "《春潮赋·激荡岁月》", // 八九十年代春潮涌动与青年奋斗 (1980-1999)
    tempoBpm: 80,
    beatSec: 0.750,
    totalBeats: 64,
    chords: [
      [98.00,  196.00, 293.66, 392.00], // G徵朝气
      [98.00,  196.00, 329.63, 392.00], // G徵舒展
      [130.81, 196.00, 261.63, 329.63], // C宫宽广
      [130.81, 196.00, 261.63, 392.00], // C宫昂扬
      [146.83, 220.00, 293.66, 440.00], // D商弄潮
      [146.83, 220.00, 293.66, 392.00], // D商前行
      [98.00,  196.00, 293.66, 392.00], // G徵凯旋
      [110.00, 164.81, 220.00, 329.63], // A羽深情
      [130.81, 196.00, 261.63, 392.00], // C宫繁荣
      [146.83, 220.00, 293.66, 440.00], // D商激情
      [98.00,  196.00, 293.66, 392.00], // G徵浩瀚
      [110.00, 164.81, 220.00, 329.63], // A羽回响
      [130.81, 196.00, 261.63, 329.63], // C宫家国
      [146.83, 220.00, 293.66, 392.00], // D商奋发
      [98.00,  196.00, 293.66, 392.00], // G徵圆满
      [98.00,  196.00, 293.66, 392.00]  // G徵余韵
    ],
    notes: [
      // 起·清晨破晓，竹笛清亮嘹亮，充满生机与豪情
      { beat: 0,   freq: 261.63, dur: 0.8, inst: 'flute', vol: 0.052 }, // 1 (C4)
      { beat: 1,   freq: 293.66, dur: 0.8, inst: 'flute', vol: 0.052 }, // 2 (D4)
      { beat: 2,   freq: 329.63, dur: 1.2, inst: 'flute', vol: 0.056 }, // 3 (E4)
      { beat: 3.5, freq: 392.00, dur: 0.5, inst: 'flute', vol: 0.050 }, // 5 (G4)
      { beat: 4,   freq: 440.00, dur: 2.2, inst: 'flute', vol: 0.058 }, // 6 (A4)
      { beat: 7,   freq: 392.00, dur: 0.8, inst: 'flute', vol: 0.052 }, // 5 (G4)
      { beat: 8,   freq: 329.63, dur: 0.8, inst: 'flute', vol: 0.050 }, // 3 (E4)
      { beat: 9,   freq: 293.66, dur: 0.8, inst: 'flute', vol: 0.048 }, // 2 (D4)
      { beat: 10,  freq: 329.63, dur: 0.8, inst: 'flute', vol: 0.050 }, // 3 (E4)
      { beat: 11,  freq: 261.63, dur: 2.8, inst: 'flute', vol: 0.055 }, // 1 (C4)
      // 承·古筝流水花指与竹笛高亢对话
      { beat: 16,  freq: 392.00, dur: 0.8, inst: 'flute', vol: 0.052 }, // 5 (G4)
      { beat: 17,  freq: 440.00, dur: 0.8, inst: 'flute', vol: 0.054 }, // 6 (A4)
      { beat: 18,  freq: 523.25, dur: 1.2, inst: 'flute', vol: 0.058 }, // 1' (C5)
      { beat: 19.5, freq: 587.33, dur: 0.5, inst: 'flute', vol: 0.054 }, // 2' (D5)
      { beat: 20,  freq: 659.25, dur: 2.2, inst: 'flute', vol: 0.060 }, // 3' (E5)
      { beat: 23,  freq: 587.33, dur: 0.8, inst: 'flute', vol: 0.054 }, // 2' (D5)
      { beat: 24,  freq: 523.25, dur: 0.8, inst: 'flute', vol: 0.052 }, // 1' (C5)
      { beat: 25,  freq: 440.00, dur: 0.8, inst: 'flute', vol: 0.050 }, // 6 (A4)
      { beat: 26,  freq: 392.00, dur: 3.0, inst: 'flute', vol: 0.055 }, // 5 (G4)
      // 转·古筝清越独奏与琵琶轮指
      { beat: 32,  freq: 440.00, dur: 0.8, inst: 'guzheng', vol: 0.050 }, // 6 (A4)
      { beat: 33,  freq: 392.00, dur: 0.8, inst: 'guzheng', vol: 0.048 }, // 5 (G4)
      { beat: 34,  freq: 329.63, dur: 0.8, inst: 'guzheng', vol: 0.048 }, // 3 (E4)
      { beat: 35,  freq: 392.00, dur: 0.8, inst: 'guzheng', vol: 0.050 }, // 5 (G4)
      { beat: 36,  freq: 440.00, dur: 2.2, inst: 'flute', vol: 0.056 },   // 6 (A4)
      { beat: 40,  freq: 523.25, dur: 0.8, inst: 'flute', vol: 0.054 },   // 1' (C5)
      { beat: 41,  freq: 440.00, dur: 0.8, inst: 'flute', vol: 0.052 },   // 6 (A4)
      { beat: 42,  freq: 392.00, dur: 0.8, inst: 'flute', vol: 0.050 },   // 5 (G4)
      { beat: 43,  freq: 329.63, dur: 0.8, inst: 'flute', vol: 0.048 },   // 3 (E4)
      { beat: 44,  freq: 293.66, dur: 2.8, inst: 'flute', vol: 0.052 },   // 2 (D4)
      // 合·岁月如歌终章与万家灯火
      { beat: 48,  freq: 329.63, dur: 0.8, inst: 'flute', vol: 0.050 }, // 3 (E4)
      { beat: 49,  freq: 392.00, dur: 0.8, inst: 'flute', vol: 0.052 }, // 5 (G4)
      { beat: 50,  freq: 440.00, dur: 0.8, inst: 'flute', vol: 0.054 }, // 6 (A4)
      { beat: 51,  freq: 523.25, dur: 1.8, inst: 'flute', vol: 0.058 }, // 1' (C5)
      { beat: 54,  freq: 440.00, dur: 0.8, inst: 'flute', vol: 0.050 }, // 6 (A4)
      { beat: 55,  freq: 392.00, dur: 0.8, inst: 'flute', vol: 0.048 }, // 5 (G4)
      { beat: 56,  freq: 329.63, dur: 0.8, inst: 'flute', vol: 0.046 }, // 3 (E4)
      { beat: 57,  freq: 293.66, dur: 0.8, inst: 'flute', vol: 0.044 }, // 2 (D4)
      { beat: 58,  freq: 261.63, dur: 4.2, inst: 'flute', vol: 0.054 }  // 1 (C4)
    ]
  },
  mid: {
    title: "《如日升·千禧华章》", // 千禧年代盛世腾飞 (2000-2012)
    tempoBpm: 74,
    beatSec: 0.810,
    totalBeats: 64,
    chords: [
      [73.42,  146.83, 220.00, 293.66], // D商庄重
      [98.00,  146.83, 196.00, 293.66], // G徵宏伟
      [130.81, 196.00, 261.63, 392.00], // C宫辉煌
      [110.00, 164.81, 220.00, 329.63], // A羽深远
      [73.42,  146.83, 220.00, 293.66],
      [98.00,  146.83, 196.00, 293.66],
      [130.81, 196.00, 261.63, 392.00],
      [146.83, 220.00, 293.66, 440.00],
      [110.00, 164.81, 220.00, 329.63],
      [130.81, 196.00, 261.63, 392.00],
      [98.00,  146.83, 196.00, 293.66],
      [73.42,  146.83, 220.00, 293.66],
      [130.81, 196.00, 261.63, 392.00],
      [98.00,  146.83, 196.00, 293.66],
      [73.42,  146.83, 220.00, 293.66],
      [130.81, 196.00, 261.63, 392.00]
    ],
    notes: [
      // 起·曾侯乙编钟悠远鸣响，琵琶与竹笛展翅
      { beat: 0,   freq: 146.83, dur: 3.2, inst: 'bianzhong', vol: 0.052 }, // 钟鸣 D3
      { beat: 1,   freq: 293.66, dur: 0.8, inst: 'pipa', vol: 0.046 },
      { beat: 2,   freq: 329.63, dur: 0.8, inst: 'pipa', vol: 0.048 },
      { beat: 3,   freq: 392.00, dur: 1.0, inst: 'flute', vol: 0.055 },
      { beat: 4,   freq: 440.00, dur: 2.2, inst: 'flute', vol: 0.058 },
      { beat: 7,   freq: 523.25, dur: 1.0, inst: 'flute', vol: 0.056 },
      { beat: 8,   freq: 587.33, dur: 2.6, inst: 'flute', vol: 0.060 },
      // 承·千禧腾飞宏阔交响
      { beat: 16,  freq: 196.00, dur: 3.2, inst: 'bianzhong', vol: 0.050 }, // 钟鸣 G3
      { beat: 17,  freq: 659.25, dur: 1.0, inst: 'flute', vol: 0.058 },
      { beat: 18,  freq: 587.33, dur: 0.8, inst: 'flute', vol: 0.054 },
      { beat: 19,  freq: 523.25, dur: 1.0, inst: 'flute', vol: 0.054 },
      { beat: 20,  freq: 440.00, dur: 2.2, inst: 'pipa', vol: 0.052 },
      { beat: 23,  freq: 392.00, dur: 0.8, inst: 'pipa', vol: 0.048 },
      { beat: 24,  freq: 523.25, dur: 2.8, inst: 'flute', vol: 0.058 },
      // 转·沧海横流与时代盛宴
      { beat: 32,  freq: 587.33, dur: 1.0, inst: 'pipa', vol: 0.050 },
      { beat: 33,  freq: 659.25, dur: 1.0, inst: 'pipa', vol: 0.052 },
      { beat: 34,  freq: 783.99, dur: 1.8, inst: 'flute', vol: 0.060 },
      { beat: 36,  freq: 659.25, dur: 2.2, inst: 'flute', vol: 0.056 },
      { beat: 40,  freq: 587.33, dur: 1.0, inst: 'flute', vol: 0.054 },
      { beat: 41,  freq: 523.25, dur: 1.0, inst: 'flute', vol: 0.052 },
      { beat: 42,  freq: 440.00, dur: 2.6, inst: 'flute', vol: 0.054 },
      // 合·华章落成
      { beat: 48,  freq: 261.63, dur: 3.5, inst: 'bianzhong', vol: 0.055 }, // 钟鸣 C4
      { beat: 49,  freq: 392.00, dur: 0.8, inst: 'pipa', vol: 0.048 },
      { beat: 50,  freq: 440.00, dur: 0.8, inst: 'pipa', vol: 0.050 },
      { beat: 51,  freq: 523.25, dur: 1.2, inst: 'flute', vol: 0.056 },
      { beat: 53,  freq: 587.33, dur: 2.0, inst: 'flute', vol: 0.058 },
      { beat: 56,  freq: 523.25, dur: 1.0, inst: 'flute', vol: 0.054 },
      { beat: 57,  freq: 440.00, dur: 1.0, inst: 'flute', vol: 0.050 },
      { beat: 58,  freq: 392.00, dur: 4.2, inst: 'flute', vol: 0.056 }
    ]
  },
  modern: {
    title: "《沉思录·沧海回望》", // 盛世当代与岁月智慧 (2013-2035+)
    tempoBpm: 58,
    beatSec: 1.034,
    totalBeats: 64,
    chords: [
      [55.00,  110.00, 164.81, 220.00], // A羽沧桑弦底
      [65.41,  130.81, 196.00, 261.63], // C宫深沉底音
      [73.42,  146.83, 220.00, 293.66], // D商岁月轻叹
      [98.00,  146.83, 196.00, 329.63], // G徵辽阔沉思
      [55.00,  110.00, 164.81, 220.00],
      [65.41,  130.81, 196.00, 261.63],
      [73.42,  146.83, 220.00, 293.66],
      [98.00,  146.83, 196.00, 329.63],
      [55.00,  110.00, 164.81, 220.00],
      [65.41,  130.81, 196.00, 261.63],
      [73.42,  146.83, 220.00, 293.66],
      [98.00,  146.83, 196.00, 329.63],
      [55.00,  110.00, 164.81, 220.00],
      [65.41,  130.81, 196.00, 261.63],
      [98.00,  146.83, 196.00, 261.63],
      [55.00,  110.00, 164.81, 220.00]
    ],
    notes: [
      // 起·空谷古琴散音起调，灵璧玉磬微响
      { beat: 0,   freq: 220.00, dur: 2.8, inst: 'guqin', vol: 0.058 }, // A3 散音
      { beat: 3,   freq: 261.63, dur: 2.0, inst: 'guqin', vol: 0.054 }, // C4
      { beat: 6,   freq: 293.66, dur: 2.5, inst: 'erhu',  vol: 0.052 }, // D4 二胡深情慢弓
      { beat: 9,   freq: 329.63, dur: 3.2, inst: 'xiao',  vol: 0.050 }, // E4 洞箫空谷回响
      // 承·古琴按音微滑，岁月回望
      { beat: 16,  freq: 392.00, dur: 2.5, inst: 'guqin', vol: 0.056 }, // G4
      { beat: 19,  freq: 329.63, dur: 2.0, inst: 'guqin', vol: 0.052 }, // E4
      { beat: 22,  freq: 293.66, dur: 2.8, inst: 'erhu',  vol: 0.054 }, // D4
      { beat: 26,  freq: 220.00, dur: 4.5, inst: 'guqin', vol: 0.058 }, // A3 悠远留白
      // 转·天地苍茫，洞箫与古琴泛音对话
      { beat: 32,  freq: 440.00, dur: 2.2, inst: 'guqin', vol: 0.056 }, // A4 泛音
      { beat: 35,  freq: 392.00, dur: 2.0, inst: 'xiao',  vol: 0.052 }, // G4
      { beat: 38,  freq: 329.63, dur: 2.5, inst: 'erhu',  vol: 0.054 }, // E4
      { beat: 42,  freq: 293.66, dur: 3.5, inst: 'guqin', vol: 0.056 }, // D4
      // 合·大道至简，归于宁静
      { beat: 48,  freq: 261.63, dur: 2.5, inst: 'guqin', vol: 0.054 }, // C4
      { beat: 51,  freq: 220.00, dur: 2.5, inst: 'erhu',  vol: 0.050 }, // A3
      { beat: 54,  freq: 196.00, dur: 2.8, inst: 'xiao',  vol: 0.048 }, // G3
      { beat: 58,  freq: 110.00, dur: 5.5, inst: 'guqin', vol: 0.060 }  // A2 低沉古琴大泛音收束
    ]
  },
  hanwei: {
    title: "《汉魏雅乐·广陵清商》", // 汉魏第一赛季门阀世家风骨雅乐 (100-300年)
    tempoBpm: 60,
    beatSec: 1.0,
    totalBeats: 64,
    chords: [
      [55.00,  110.00, 164.81, 220.00], // A羽幽邃 (A1, A2, E3, A3)
      [65.41,  130.81, 196.00, 261.63], // C宫高古 (C2, C3, G3, C4)
      [73.42,  146.83, 220.00, 293.66], // D商风骨 (D2, D3, A3, D4)
      [98.00,  146.83, 196.00, 293.66], // G徵沉雄 (G2, D3, G3, D4)
      [55.00,  110.00, 164.81, 220.00],
      [65.41,  130.81, 196.00, 261.63],
      [73.42,  146.83, 220.00, 293.66],
      [98.00,  146.83, 196.00, 329.63],
      [55.00,  110.00, 164.81, 220.00],
      [65.41,  130.81, 196.00, 261.63],
      [73.42,  146.83, 220.00, 293.66],
      [98.00,  146.83, 196.00, 293.66],
      [55.00,  110.00, 164.81, 220.00],
      [65.41,  130.81, 196.00, 261.63],
      [98.00,  146.83, 196.00, 293.66],
      [55.00,  110.00, 164.81, 220.00]
    ],
    notes: [
      // 起·幽谷古琴散音长吟，汉魏相和歌初奠
      { beat: 0,   freq: 110.00, dur: 3.5, inst: 'guqin',     vol: 0.062 }, // A2 古琴深沉散音
      { beat: 2,   freq: 146.83, dur: 2.8, inst: 'bianzhong', vol: 0.048 }, // 编钟轻叩 D3
      { beat: 4,   freq: 220.00, dur: 2.2, inst: 'guqin',     vol: 0.056 }, // A3 按音微揉
      { beat: 6,   freq: 261.63, dur: 2.0, inst: 'guqin',     vol: 0.054 }, // C4
      { beat: 8,   freq: 293.66, dur: 3.2, inst: 'xiao',      vol: 0.052 }, // D4 洞箫空谷清吟
      // 承·建安风骨，古琴泛音与洞箫清越对话
      { beat: 16,  freq: 392.00, dur: 2.5, inst: 'guqin',     vol: 0.058 }, // G4 泛音
      { beat: 19,  freq: 440.00, dur: 2.0, inst: 'guqin',     vol: 0.055 }, // A4 泛音
      { beat: 22,  freq: 329.63, dur: 2.2, inst: 'xiao',      vol: 0.050 }, // E4
      { beat: 24,  freq: 293.66, dur: 2.8, inst: 'guzheng',   vol: 0.052 }, // D4 古筝流水轻抚
      { beat: 27,  freq: 220.00, dur: 4.5, inst: 'guqin',     vol: 0.060 }, // A3 大散音留白
      // 转·金石铿锵，编钟与古琴交相辉映
      { beat: 32,  freq: 196.00, dur: 3.5, inst: 'bianzhong', vol: 0.052 }, // G3 编钟长鸣
      { beat: 33,  freq: 293.66, dur: 1.8, inst: 'guqin',     vol: 0.056 }, // D4
      { beat: 35,  freq: 329.63, dur: 2.0, inst: 'guqin',     vol: 0.054 }, // E4
      { beat: 38,  freq: 392.00, dur: 2.5, inst: 'xiao',      vol: 0.052 }, // G4
      { beat: 41,  freq: 440.00, dur: 2.8, inst: 'guqin',     vol: 0.058 }, // A4 按音大滑音
      { beat: 44,  freq: 329.63, dur: 3.2, inst: 'guzheng',   vol: 0.050 }, // E4
      // 合·正始玄风，天地悠悠归于浩渺
      { beat: 48,  freq: 261.63, dur: 2.5, inst: 'guqin',     vol: 0.054 }, // C4
      { beat: 51,  freq: 220.00, dur: 2.5, inst: 'xiao',      vol: 0.050 }, // A3
      { beat: 54,  freq: 146.83, dur: 3.5, inst: 'bianzhong', vol: 0.050 }, // D3 钟声隐退
      { beat: 58,  freq: 110.00, dur: 5.8, inst: 'guqin',     vol: 0.065 }  // A2 苍茫太古余韵
    ]
  }
};



function getCurrentBgmSuite() {
  const state = _getGameStateFn() || {};
  const age = state.age !== undefined ? state.age : 18;
  const yr = state.year ? state.year : 100;
  // 汉魏第一赛季（公元 100-300 年及古典纪元）专属雅乐相和歌
  if (yr <= 500) {
    return ERA_BGM_SUITES.hanwei || ERA_BGM_SUITES.modern;
  }
  if (age < 16) return ERA_BGM_SUITES.childhood;
  if (yr < 2000) return ERA_BGM_SUITES.early;
  if (yr < 2013) return ERA_BGM_SUITES.mid;
  return ERA_BGM_SUITES.modern;
}

function scheduleBgmBeat(exactTime, beatIdx, suite) {
  const ctxAudio = getEffectiveAudioContext();
  if (!ctxAudio) return;
  const bgmBus = getBgmSubBus(ctxAudio);
  if (!bgmBus) return;

  const stepInPhrase = beatIdx % suite.totalBeats;
  const barIdx = Math.floor(stepInPhrase / 4);
  const beatInBar = stepInPhrase % 4;
  const chord = suite.chords[barIdx % suite.chords.length] || suite.chords[0];

  // 计算曲式阶段起伏权重 (起·承·转·合 Dynamic Macro-Contour)
  // bar 0-3 (起: 悠远清幽 0.85), bar 4-7 (承: 渐进展开 0.98), bar 8-11 (转·高潮: 激荡豪迈 1.15), bar 12-15 (合: 沉淀回味 0.88)
  const isIntro = (barIdx < 4);
  const isAscent = (barIdx >= 4 && barIdx < 8);
  const isClimax = (barIdx >= 8 && barIdx < 12);
  const isCoda = (barIdx >= 12);
  const sectionGain = isClimax ? 1.15 : (isAscent ? 0.98 : (isCoda ? 0.88 : 0.85));

  // 人性化微量时间抖动 (Human micro-rubato timing jitter, ±5ms)
  const humanJitter = (Math.sin(stepInPhrase * 3.7) * 0.005);
  const humanTime = exactTime + humanJitter;

  // ==========================================
  // 声部一：溯源基底（远景 / 呼吸低音长鸣，Ambient Sustained Foundation）
  // ==========================================
  if (beatInBar === 0) {
    const droneVol = (isClimax ? 0.038 : (isIntro ? 0.024 : 0.030)) * sectionGain;
    playInstrumentTone('cello_drone', chord[0], suite.beatSec * 3.7, droneVol, 0, bgmBus, humanTime);

    // 和声层：展开与高潮段加入五度与八度笙簧和鸣
    if (isAscent || isClimax) {
      if (chord[1]) playInstrumentTone('pad', chord[1], suite.beatSec * 3.4, droneVol * 0.70, 0.02, bgmBus, humanTime);
      if (chord[2] && isClimax) playInstrumentTone('sheng', chord[2], suite.beatSec * 3.0, droneVol * 0.60, 0.04, bgmBus, humanTime);
    }

    // 结构性段落标志金石之声 (Structural Cadential Accents)
    if (barIdx === 0 || barIdx === 4 || barIdx === 8 || barIdx === 12) {
      if (suite === ERA_BGM_SUITES.modern || suite === ERA_BGM_SUITES.hanwei) {
        // 当代与汉魏清商雅乐：灵璧玉磬与金石编钟悠长空灵微鸣
        playInstrumentTone('bianqing', chord[0] * 4.0, suite.beatSec * 3.0, 0.032, 0.01, bgmBus, humanTime);
      } else if (suite === ERA_BGM_SUITES.mid) {
        // 千禧盛世：曾侯乙青铜编钟宏大鸣响
        playInstrumentTone('bianzhong', chord[0] * 2.0, suite.beatSec * 3.5, 0.036, 0.01, bgmBus, humanTime);
      } else if (suite === ERA_BGM_SUITES.early && isClimax) {
        // 改革春潮高潮：牛皮战鼓沉稳大音
        playInstrumentTone('drum', 85, 0.45, 0.028, 0.01, bgmBus, humanTime);
      }
    }
  }

  // ==========================================
  // 声部二：丝桐流觞（中景 / 琵琶古筝流水织体与和弦琶音，Plucked String Fluid Texture）
  // ==========================================
  // 采用真正的五声调式行云流水织体，区分强弱拍、主辅交替与声部对位
  const arpInst = (suite === ERA_BGM_SUITES.childhood) ? 'musicbox' : ((suite === ERA_BGM_SUITES.hanwei) ? 'guqin' : ((suite === ERA_BGM_SUITES.early && isClimax) ? 'pipa' : 'guzheng'));

  if (beatInBar === 0) {
    // 拍 1：低音抚弦 (Root Pluck) 沉稳有力
    const rootP = chord[0] * 2.0;
    playInstrumentTone(arpInst, rootP, suite.beatSec * 1.8, 0.032 * sectionGain, 0.008, bgmBus, humanTime);
  } else if (beatInBar === 1) {
    // 拍 2：次强拍中音泛音流动
    const fifthP = (chord[1] || chord[0] * 1.5) * 2.0;
    playInstrumentTone(arpInst, fifthP, suite.beatSec * 1.4, 0.024 * sectionGain, 0.012, bgmBus, humanTime);
  } else if (beatInBar === 2) {
    // 拍 3：三度和音回旋，与主旋律交错
    const midP = (chord[2] || chord[0] * 1.25) * 2.0;
    playInstrumentTone(arpInst, midP, suite.beatSec * 1.5, 0.028 * sectionGain, 0.006, bgmBus, humanTime);
  } else if (beatInBar === 3) {
    // 拍 4：高八度水滴泛音收束
    const highP = (chord[3] || chord[0] * 2.0) * 2.0;
    playInstrumentTone(arpInst, highP, suite.beatSec * 1.2, 0.022 * sectionGain, 0.015, bgmBus, humanTime);
  }

  // ==========================================
  // 声部三：灵韵长歌（前景 / 竹笛洞箫二胡主旋律，Expressive Lead Melodic Voice）
  // ==========================================
  let isLeadNotePlayingThisBeat = false;
  if (suite.notes && suite.notes.length) {
    for (let i = 0; i < suite.notes.length; i++) {
      const note = suite.notes[i];
      if (Math.abs(note.beat - stepInPhrase) < 0.01) {
        isLeadNotePlayingThisBeat = true;
        // 随曲式宏观动态起伏智能微调力度 (增加饱满度 0.065~0.088)
        const leadVol = Math.max(0.045, note.vol * 1.28 * sectionGain);
        playInstrumentTone(
          note.inst,
          note.freq,
          note.dur * suite.beatSec,
          leadVol,
          0,
          bgmBus,
          exactTime
        );
        // 在高潮与展开段落加入温润八度/五度和声复调辅奏 (Polyphonic Counterpart)
        if ((isAscent || isClimax) && note.dur >= 1.5) {
          const subInst = (note.inst === 'flute' || note.inst === 'xiao') ? 'erhu' : 'xiao';
          const subFreq = (note.freq > 400) ? note.freq * 0.5 : note.freq * 1.5;
          playInstrumentTone(subInst, subFreq, note.dur * suite.beatSec * 0.85, leadVol * 0.45, 0.03, bgmBus, humanTime);
        }
      }
    }
  }

  // ==========================================
  // 声部四：对位呼应与留白点睛（Call-and-Response & Fill Motif）
  // ==========================================
  // 当主旋律处于留白休止小节时，副奏乐器在第 2 拍以空灵高泛音轻声回应，构成乐器间的真切对话！
  if (!isLeadNotePlayingThisBeat && beatInBar === 2 && !isIntro) {
    const callPitches = [392.0, 440.0, 523.25, 659.25];
    const fillPitch = callPitches[(barIdx * 2 + 1) % callPitches.length];
    const fillInst = (suite === ERA_BGM_SUITES.childhood) ? 'musicbox' : ((suite === ERA_BGM_SUITES.modern || suite === ERA_BGM_SUITES.hanwei) ? 'guqin' : 'guzheng');
    playInstrumentTone(fillInst, fillPitch, suite.beatSec * 1.4, 0.024 * sectionGain, 0.02, bgmBus, humanTime);
  }

  // ==========================================
  // 声部五：当前剧情意境环境声（Layer 5: Scenario Organic Ambience Texture）
  // ==========================================
  // 每 2 个小节（8 拍）循环点缀与当前人物剧情、时代相符的空气质感环境声，营造身临其境的现场呼吸感
  if (stepInPhrase % 8 === 4) {
    try {
      const curState = _getGameStateFn() || {};
      const activeEvt = (curState && (curState.activeDecisionEvent || curState.activeFamilyEvent || curState.activeFrontlineEvent)) || null;
      const sceneType = detectCurrentEraScene(activeEvt);
      playEraSceneAmbience(sceneType, 0.45, bgmBus, exactTime);
    } catch (_) {}
  }
}

// ------------------------------------------
// 五声调式和声量化中心 (Pentatonic Harmonics)
// ------------------------------------------
const PENTATONIC_SCALES = {
  childhood: {
    base: 130.81, // C宫纯真调
    melody: [130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25]
  },
  early: {
    base: 98.00, // G徵/D商弄潮奋进调
    melody: [164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25]
  },
  mid: {
    base: 146.83, // D商/G徵千禧腾飞调
    melody: [146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33]
  },
  modern: {
    base: 110.00, // A羽/C宫深邃回望沉思调
    melody: [130.81, 146.83, 164.81, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25]
  }
};

function getCurrentScale() {
  const state = _getGameStateFn() || {};
  const age = state.age !== undefined ? state.age : 18;
  const yr = state.year || 1992;
  if (age < 16) return PENTATONIC_SCALES.childhood;
  if (yr < 2000) return PENTATONIC_SCALES.early;
  if (yr < 2013) return PENTATONIC_SCALES.mid;
  return PENTATONIC_SCALES.modern;
}

function getHarmonizedFreq(degreeIdx = 4, octaveMul = 1.0) {
  const scale = getCurrentScale();
  const mel = scale.melody || PENTATONIC_SCALES.early.melody;
  const clampedIdx = Math.max(0, Math.min(mel.length - 1, Math.round(degreeIdx)));
  return mel[clampedIdx] * (octaveMul || 1.0);
}

// ==========================================
// 剧情与时代意境环境音检测引擎 (Era Scenario Detector)
// ==========================================
function detectCurrentEraScene(evtObj) {
  const state = _getGameStateFn() || {};
  const age = state.age !== undefined ? state.age : 18;
  const yr = state.year || 1992;
  const tr = state.track || '';
  const job = String(state.jobTitle || '');
  const pClass = (state.birthProfile && state.birthProfile.parents && state.birthProfile.parents.classType) || '';

  // 1. 优先提取当前正在发生的剧情文本
  let evtText = '';
  if (evtObj) {
    evtText = `${evtObj.title || ''} ${evtObj.desc || ''} ${evtObj.context || ''}`;
  } else if (state.activeDecisionEvent) {
    evtText = `${state.activeDecisionEvent.title || ''} ${state.activeDecisionEvent.desc || ''}`;
  } else if (state.activeFamilyEvent) {
    evtText = `${state.activeFamilyEvent.title || ''} ${state.activeFamilyEvent.desc || ''}`;
  } else if (state.activeFrontlineEvent) {
    evtText = `${state.activeFrontlineEvent.title || ''} ${state.activeFrontlineEvent.desc || ''}`;
  }

  if (/火车|绿皮车|站台|春运|铁道|列车|南下|北上|返乡|闯荡|出差/.test(evtText)) return 'train';
  if (/学校|学堂|教室|课堂|高考|中考|读书|课本|同窗|少年宫|老师|试卷|大学|校友|温书|题海|考场/.test(evtText)) return 'school';
  if (/工厂|车间|机床|纺织|钢铁|锅炉|工人|技工|厂长|流水线|矿山|工地|汽笛|国企|铁人|技改|制造|检修/.test(evtText)) return 'factory';
  if (/街头|集市|弄堂|胡同|个体户|摆摊|下海|供销社|粮票|百货|商铺|夜市|批发|海鲜|码头|小吃/.test(evtText)) return 'street';
  if (/雨|风雨|暴风|雷雨|寒潮|台风|洪水|抢险/.test(evtText)) return 'rain';

  // 2. 无显式事件时，依据角色当前人生阶段、时代与职业赛道自动匹配
  if (age >= 6 && age <= 18) return 'school';
  if (age < 6) return 'street';
  if (yr <= 2003 && (tr === 'tech' || tr === 'agri' || /厂|车间|工|矿|建|技|制造/.test(job) || pClass === '工薪模范' || pClass === '地质先锋')) {
    return 'factory';
  }
  if (yr <= 2002 && (tr === 'biz' || tr === 'trade')) return 'street';
  return 'study';
}

// ==========================================
// 剧情环境声实时合成器 (Scenario Ambience Synthesizer)
// 物理建模：夏日校园微风粉笔、大厂车床蒸汽、老街算盘车铃、绿皮火车节拍、静谧书斋煎茶
// ==========================================
function playEraSceneAmbience(sceneType, volMul = 1.0, customBus = null, exactStartTime = null) {
  const ctxAudio = getEffectiveAudioContext();
  if (!ctxAudio) return;
  try {
    const dest = customBus || getBgmSubBus(ctxAudio) || getMasterAudioBus(ctxAudio);
    if (!dest) return;
    const t = (exactStartTime !== null && exactStartTime !== undefined) ? exactStartTime : ctxAudio.currentTime;
    const v = Math.max(0.008, Math.min(0.24, 0.05 * volMul));
    const pinkBuf = getPinkNoiseBuffer(ctxAudio, 2.8);

    if (sceneType === 'school') {
      // 【校园学堂意境】：窗外夏日微风白桦沙沙 + 讲台粉笔板书微叩 + 书页轻翻 + 远方教学楼上课玉磬钟声
      if (pinkBuf) {
        const breeze = ctxAudio.createBufferSource();
        breeze.buffer = pinkBuf;
        const bFlt = ctxAudio.createBiquadFilter();
        const bG = ctxAudio.createGain();
        bFlt.type = 'bandpass';
        bFlt.frequency.setValueAtTime(1650, t);
        bFlt.frequency.linearRampToValueAtTime(2200, t + 0.9);
        bFlt.frequency.exponentialRampToValueAtTime(1400, t + 2.2);
        bFlt.Q.setValueAtTime(3.0, t);
        bG.gain.setValueAtTime(0.0001, t);
        bG.gain.linearRampToValueAtTime(v * 0.40, t + 0.35);
        bG.gain.exponentialRampToValueAtTime(0.0001, t + 2.3);
        breeze.connect(bFlt);
        bFlt.connect(bG);
        bG.connect(dest);
        breeze.start(t);
        breeze.stop(t + 2.4);
      }
      _triggerPcmBuffer(ctxAudio, dest, getPaperFlipBuffer(ctxAudio, false), v * 0.65, t + 0.06, 0.04);
      _triggerPcmBuffer(ctxAudio, dest, getTactileClickBuffer(ctxAudio, 'chalk'), v * 0.48, t + 0.22, 0.05);
      _triggerPcmBuffer(ctxAudio, dest, getTactileClickBuffer(ctxAudio, 'chalk'), v * 0.36, t + 0.32, 0.06);

      // 校园上下课远钟（完全对齐当前五声调式）
      const bell1 = getHarmonizedFreq(5, 2.0);
      const bell2 = getHarmonizedFreq(3, 2.0);
      _triggerPcmBuffer(ctxAudio, dest, getMetallicModalBuffer(ctxAudio, bell1, 1.2, 'jade'), v * 0.55, t + 0.15, 0.002);
      _triggerPcmBuffer(ctxAudio, dest, getMetallicModalBuffer(ctxAudio, bell2, 1.4, 'jade'), v * 0.48, t + 0.52, 0.002);

    } else if (sceneType === 'factory') {
      // 【国营大厂与车间意境】：远景低沉规律的车床机械律动与低频蒸汽微息
      [0, 0.42, 0.84].forEach((dl, idx) => {
        const loomBuf = getTactileClickBuffer(ctxAudio, idx === 0 ? 'wood_block' : 'abacus_lo');
        _triggerPcmBuffer(ctxAudio, dest, loomBuf, v * 0.32, t + dl, 0.015);
      });
      if (pinkBuf) {
        const steam = ctxAudio.createBufferSource();
        steam.buffer = pinkBuf;
        const sFlt = ctxAudio.createBiquadFilter();
        const sG = ctxAudio.createGain();
        sFlt.type = 'lowpass';
        sFlt.frequency.setValueAtTime(320, t);
        sG.gain.setValueAtTime(0.0001, t);
        sG.gain.linearRampToValueAtTime(v * 0.22, t + 0.25);
        sG.gain.exponentialRampToValueAtTime(0.0001, t + 1.8);
        steam.connect(sFlt);
        sFlt.connect(sG);
        sG.connect(dest);
        steam.start(t);
        steam.stop(t + 1.9);
      }

    } else if (sceneType === 'street') {
      // 【八九十年代街巷弄堂市井烟火】：二八大杠清脆车铃 + 算盘弹拨拨珠
      const bellF1 = getHarmonizedFreq(6, 2.0);
      const bellF2 = getHarmonizedFreq(5, 2.0);
      _triggerPcmBuffer(ctxAudio, dest, getMetallicModalBuffer(ctxAudio, bellF1, 0.35, 'jade'), v * 0.52, t + 0.04, 0.01);
      _triggerPcmBuffer(ctxAudio, dest, getMetallicModalBuffer(ctxAudio, bellF2, 0.35, 'bronze'), v * 0.42, t + 0.11, 0.01);
      _triggerPcmBuffer(ctxAudio, dest, getTactileClickBuffer(ctxAudio, 'abacus_lo'), v * 0.48, t + 0.28, 0.02);
      _triggerPcmBuffer(ctxAudio, dest, getTactileClickBuffer(ctxAudio, 'abacus_hi'), v * 0.40, t + 0.36, 0.02);

    } else if (sceneType === 'train') {
      // 【绿皮火车与远行站台意境】：铁轨接缝“哐当—哐当”双拍节奏 + 悠远洞箫汽笛和鸣
      const railBuf = getTactileClickBuffer(ctxAudio, 'wood_block');
      [0.0, 0.14, 0.50, 0.64].forEach((dl, i) => {
        _triggerPcmBuffer(ctxAudio, dest, railBuf, v * (i % 2 === 0 ? 0.60 : 0.42), t + dl, 0.01);
      });
      const hornF = getHarmonizedFreq(2, 1.0);
      playInstrumentTone('xiao', hornF, 1.6, v * 0.60, 0.16, dest, t);

    } else if (sceneType === 'rain') {
      // 【骤雨江南与风雨沧桑意境】：细腻雨幕粉红噪声 + 瓦当滴水气泡共鸣
      if (pinkBuf) {
        const rainSrc = ctxAudio.createBufferSource();
        rainSrc.buffer = pinkBuf;
        const rFlt = ctxAudio.createBiquadFilter();
        const rG = ctxAudio.createGain();
        rFlt.type = 'lowpass';
        rFlt.frequency.setValueAtTime(1400, t);
        rG.gain.setValueAtTime(0.0001, t);
        rG.gain.linearRampToValueAtTime(v * 0.38, t + 0.30);
        rG.gain.exponentialRampToValueAtTime(0.0001, t + 2.2);
        rainSrc.connect(rFlt);
        rFlt.connect(rG);
        rG.connect(dest);
        rainSrc.start(t);
        rainSrc.stop(t + 2.3);
      }
      _triggerPcmBuffer(ctxAudio, dest, getWaterPourBuffer(ctxAudio), v * 0.52, t + 0.08, 0.02);

    } else {
      // 【静谧案头与书斋茶寮意境】：紫砂清泉注水 Minnaert 气泡声 + 檐角玉磬空灵余响 + 宣纸轻翻
      _triggerPcmBuffer(ctxAudio, dest, getWaterPourBuffer(ctxAudio), v * 0.55, t + 0.05, 0.02);
      const chimeF = getHarmonizedFreq(6, 2.0);
      _triggerPcmBuffer(ctxAudio, dest, getMetallicModalBuffer(ctxAudio, chimeF, 1.4, 'jade'), v * 0.40, t + 0.24, 0.005);
      _triggerPcmBuffer(ctxAudio, dest, getPaperFlipBuffer(ctxAudio, false), v * 0.35, t + 0.42, 0.03);
    }
  } catch (e) {
    _logErrorFn('playEraSceneAmbience', e);
  }
}

function bgmSchedulerLoop() {
  if (!_bgmPlaying || !_bgmEnabled) return;
  const ctxAudio = getEffectiveAudioContext();
  if (!ctxAudio) return;

  const suite = getCurrentBgmSuite();
  const lookaheadSec = 0.35;

  while (_bgmNextNoteTime < ctxAudio.currentTime + lookaheadSec) {
    scheduleBgmBeat(_bgmNextNoteTime, _bgmBeatCount, suite);
    _bgmNextNoteTime += suite.beatSec;
    _bgmBeatCount++;
  }
}

function startEraBGM(era) {
  if (!_bgmEnabled) return;
  const ctxAudio = getEffectiveAudioContext();
  if (!ctxAudio) return;
  if (_bgmPlaying && _bgmLookaheadTimer) return;

  _bgmPlaying = true;
  _bgmBeatCount = 0;
  _bgmNextNoteTime = ctxAudio.currentTime + 0.06;
  if (_bgmLookaheadTimer) clearInterval(_bgmLookaheadTimer);
  _bgmLookaheadTimer = setInterval(bgmSchedulerLoop, 60);
}

function stopEraBGM() {
  _bgmPlaying = false;
  if (_bgmLookaheadTimer) {
    clearInterval(_bgmLookaheadTimer);
    _bgmLookaheadTimer = null;
  }
}

function pauseEraBGM() {
  stopEraBGM();
}

function resumeEraBGM() {
  if (_bgmEnabled) startEraBGM();
}

function toggleEraBGM() {
  _bgmEnabled = !_bgmEnabled;
  if (!_bgmEnabled) stopEraBGM();
  else startEraBGM();
  return _bgmEnabled;
}

function isEraBgmPlaying() {
  return _bgmPlaying;
}

function initEraMusicEngine(env = {}) {
  if (env.audioContext) _audioCtx = env.audioContext;
  if (env.getState) _getGameStateFn = env.getState;
  else if (env.state) _getGameStateFn = () => env.state;
  if (env.logDebugError) _logErrorFn = env.logDebugError;
}

module.exports = {
  startEraBGM,
  stopEraBGM,
  pauseEraBGM,
  resumeEraBGM,
  toggleEraBGM,
  isEraBgmPlaying,
  getCurrentBgmSuite,
  playInstrumentTone,
  duckBgmForSfx,
  initEraMusicEngine,
  detectCurrentEraScene,
  playEraSceneAmbience,
  getHarmonizedFreq,
  getTactileClickBuffer,
  getPaperFlipBuffer,
  getSealStampBuffer,
  getMetallicModalBuffer,
  getWaterPourBuffer,
  getPinkNoiseBuffer,
  getMasterAudioBus,
  _triggerPcmBuffer,
  ERA_BGM_SUITES,
  PENTATONIC_SCALES
};
