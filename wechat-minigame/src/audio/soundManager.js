/**
 * 《风华年代：沧海沉浮录》轻量化原生音频与触感反馈服务 (Sound & Haptic Manager)
 * 架构规范：
 * 1. 短音效 (SFX)：纯原生 Web Audio 振荡器与物理声学建模，即发即弃，零常驻定时器，无垃圾回收抖动
 * 2. 时代交响乐 (BGM)：由 eraMusicEngine 维护 60ms 高精度前瞻调度器，按需调度并在停播时自动彻底销毁定时器
 * 3. 状态双向同步：模块状态与主游戏 state 双向同步，彻底杜绝静音穿透与状态脱节
 */

let audioCtx = null;
let bgmEnabled = true;
let sfxEnabled = true;
let bgmPlaying = false;
let _bgmAudioContext = null;
let _eraMusicEngineRef = null;

try {
  _eraMusicEngineRef = require('./eraMusicEngine.js');
} catch (_) {}

function setEraMusicEngine(engine) {
  if (engine) _eraMusicEngineRef = engine;
}

function getAudioContext() {
  if (!audioCtx) {
    if (typeof wx !== 'undefined' && typeof wx.createWebAudioContext === 'function') {
      try { audioCtx = wx.createWebAudioContext(); } catch (e) {}
    } else if (typeof AudioContext !== 'undefined') {
      try { audioCtx = new AudioContext(); } catch (e) {}
    } else if (typeof webkitAudioContext !== 'undefined') {
      try { audioCtx = new webkitAudioContext(); } catch (e) {}
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    try { audioCtx.resume(); } catch (e) {}
  }
  return audioCtx;
}

function triggerHaptic(type, state) {
  if (typeof wx === 'undefined') return;
  if (state && state.hapticEnabled === false) return;
  try {
    if (type === 'long') {
      if (typeof wx.vibrateLong === 'function') wx.vibrateLong();
    } else {
      if (typeof wx.vibrateShort === 'function') wx.vibrateShort({ type: type || 'light' });
    }
  } catch (e) {}
}

/**
 * 完整覆盖游戏内全部音效类型，提供国风传统乐器物理建模与纯正物理微模态触击拟音
 * 彻底消除电子合成器生硬单调的“AI味”，营造温润沉浸的东方器物美学
 */
function playSoundEffect(type, customPitch, state) {
  // 静音严格阻断（同时检查模块级状态与外部 state 的 soundEnabled / sfxEnabled）
  if (!sfxEnabled) return;
  if (state && (state.soundEnabled === false || state.sfxEnabled === false)) return;

  // 1. 触感反馈路由 (根据音效能量匹配最优触感振动)
  if (type === 'click' || type === 'tab' || type === 'pop' || type === 'pocket_watch_tick' || type === 'tin_tap' || type === 'abacus_bead_click') {
    triggerHaptic('light', state);
  } else if (type === 'stamp' || type === 'confirm' || type === 'success' || type === 'coin' || type === 'bell' || type === 'bicycle_bell') {
    triggerHaptic('medium', state);
  } else if (type === 'alert' || type === 'crisis' || type === 'fail' || type === 'seal_stamp_heavy' || type === 'war' || type === 'battle_drum_roll' || type === 'heartbeat_dilemma') {
    triggerHaptic('heavy', state);
  }

  const ctx = getAudioContext();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const engine = _eraMusicEngineRef;
    const master = (engine && typeof engine.getMasterAudioBus === 'function') ? engine.getMasterAudioBus(ctx) : ctx.destination;

    // ==========================================
    // 一、 温润器物触感与文房雅事物理拟音 (纯物理微模态，彻底消除电子beep音)
    // ==========================================
    if (type === 'click' || type === 'tab' || type === 'pop') {
      // 温润紫檀木微触感（超短阻尼瞬态，绝无任何电子音阶/蜂鸣音，纯粹清爽触感）
      if (engine && typeof engine.getTactileClickBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        engine._triggerPcmBuffer(ctx, master, engine.getTactileClickBuffer(ctx, 'wood_click'), 0.14, now, 0.022);
        return;
      }
    }

    if (type === 'abacus' || type === 'abacus_bead_click') {
      // 老式红木算盘拨珠细腻连拨
      if (engine && typeof engine.getTactileClickBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        engine._triggerPcmBuffer(ctx, master, engine.getTactileClickBuffer(ctx, 'abacus_lo'), 0.16, now, 0.02);
        engine._triggerPcmBuffer(ctx, master, engine.getTactileClickBuffer(ctx, 'abacus_hi'), 0.14, now + 0.044, 0.02);
        engine._triggerPcmBuffer(ctx, master, engine.getTactileClickBuffer(ctx, 'abacus_lo'), 0.12, now + 0.092, 0.025);
        return;
      }
    }

    if (type === 'pocket_watch_tick') {
      // 老上海机械怀表擒纵轮细腻滴答
      if (engine && typeof engine.getTactileClickBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        engine._triggerPcmBuffer(ctx, master, engine.getTactileClickBuffer(ctx, 'watch_1'), 0.14, now, 0.01);
        engine._triggerPcmBuffer(ctx, master, engine.getTactileClickBuffer(ctx, 'watch_2'), 0.11, now + 0.14, 0.01);
        return;
      }
    }

    if (type === 'stamp' || type === 'seal_stamp_heavy' || type === 'ink_seal_thud' || type === 'wax_seal_stamp' || type === 'rubbing_pad_tap') {
      // 寿山石印章温润落案（实木书案物理低频共鸣 + 印纸贴合瞬态，杜绝激光音降频）
      if (engine && typeof engine.getSealStampBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        engine._triggerPcmBuffer(ctx, master, engine.getSealStampBuffer(ctx), type === 'rubbing_pad_tap' ? 0.18 : 0.28, now, 0.018);
        return;
      }
    }

    if (
      type === 'paper' || type === 'paper_rustle' ||
      type === 'silk_scroll_unfurl' || type === 'blueprint_unroll_foley' ||
      type === 'brush_ink_whisper' || type === 'brush_stroke_foley' ||
      type === 'pencil_sketch_rustle' || type === 'ink_grinding_whisper' ||
      type === 'silk_thread_shimmer' || type === 'ink_splash'
    ) {
      // 宣纸轻拈翻页 / 丝帛舒展（纯粹纤维摩擦微声，杜绝三角波滑音）
      if (engine && typeof engine.getPaperFlipBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        const isScroll = (type === 'silk_scroll_unfurl' || type === 'blueprint_unroll_foley' || type === 'ink_splash');
        engine._triggerPcmBuffer(ctx, master, engine.getPaperFlipBuffer(ctx, isScroll), 0.20, now, 0.03);
        if (isScroll) {
          engine._triggerPcmBuffer(ctx, master, engine.getPaperFlipBuffer(ctx, false), 0.14, now + 0.11, 0.04);
        }
        return;
      }
    }

    if (type === 'dice') {
      // 骨骰掷落青花瓷碗（微弹跳触点 + 瓷碗玉质泛音）
      if (engine && typeof engine.getTactileClickBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        const dBuf = engine.getTactileClickBuffer(ctx, 'dice');
        [0, 0.055, 0.105, 0.148, 0.182].forEach((dl, i) => {
          engine._triggerPcmBuffer(ctx, master, dBuf, 0.18 * Math.pow(0.76, i), now + dl, 0.04);
        });
        if (typeof engine.getMetallicModalBuffer === 'function') {
          const bowlBuf = engine.getMetallicModalBuffer(ctx, 1046.5, 0.38, 'jade');
          engine._triggerPcmBuffer(ctx, master, bowlBuf, 0.08, now + 0.06, 0.01);
        }
        return;
      }
    }

    if (type === 'coin' || type === 'coin_cascade' || type === 'toast' || type === 'porcelain_ping_resonance') {
      if (engine && typeof engine.getMetallicModalBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        if (type === 'toast' || type === 'porcelain_ping_resonance') {
          engine._triggerPcmBuffer(ctx, master, engine.getMetallicModalBuffer(ctx, 880.0, 0.60, 'jade'), 0.16, now, 0.005);
          engine._triggerPcmBuffer(ctx, master, engine.getMetallicModalBuffer(ctx, 1174.6, 0.55, 'jade'), 0.13, now + 0.07, 0.005);
        } else {
          const notes = (type === 'coin_cascade') ? [1760.0, 2093.0, 2349.3, 2793.8] : [1975.5, 2637.0];
          notes.forEach((cf, idx) => {
            engine._triggerPcmBuffer(ctx, master, engine.getMetallicModalBuffer(ctx, cf, 0.32, 'coin'), 0.14 - idx * 0.015, now + idx * 0.055, 0.008);
          });
        }
        return;
      }
    }

    if (type === 'tea' || type === 'tea_pour' || type === 'tea_pour_trickle' || type === 'tea_water_pour' || type === 'inkstone_jade_water_drip') {
      if (engine && typeof engine.getWaterPourBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        engine._triggerPcmBuffer(ctx, master, engine.getWaterPourBuffer(ctx), 0.22, now, 0.025);
        if (typeof engine.getMetallicModalBuffer === 'function') {
          engine._triggerPcmBuffer(ctx, master, engine.getMetallicModalBuffer(ctx, 1046.5, 0.42, 'jade'), 0.08, now + 0.18, 0.008);
        }
        return;
      }
    }

    if (type === 'bell' || type === 'bicycle_bell' || type === 'bell_grand_chime') {
      if (engine && typeof engine.getMetallicModalBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
        const isBike = (type === 'bicycle_bell');
        const bHi = engine.getMetallicModalBuffer(ctx, isBike ? 1760.0 : 587.33, isBike ? 0.32 : 1.4, isBike ? 'coin' : 'bronze');
        const bLo = engine.getMetallicModalBuffer(ctx, isBike ? 1318.5 : 392.00, isBike ? 0.28 : 1.6, isBike ? 'coin' : 'bronze');
        [0, 0.055, 0.110].forEach((dl, idx) => {
          engine._triggerPcmBuffer(ctx, master, idx % 2 === 0 ? bHi : bLo, isBike ? 0.14 : 0.18, now + dl, 0.008);
        });
        return;
      }
    }

    // ==========================================
    // 二、 庄严典雅国风礼乐与抉择氛围声景 (告别廉价电子合成哔哔声)
    // ==========================================
    if (type === 'alert' || type === 'crisis' || type === 'fail' || type === 'war' || type === 'heartbeat_dilemma' || type === 'war_drum_resonance' || type === 'battle_drum_roll') {
      // 【沉雷更鼓与深沉古琴】：风云低回，绝无锯齿波刺耳蜂鸣
      if (engine && typeof engine.playInstrumentTone === 'function') {
        engine.playInstrumentTone('drum', 88, 0.55, 0.15, 0, master);
        engine.playInstrumentTone('guqin', 130.81, 1.45, 0.12, 0.03, master);
        engine.playInstrumentTone('guqin', 98.00, 1.85, 0.14, 0.16, master);
        return;
      }
    }

    if (
      type === 'fanfare' || type === 'state_orchestra_fanfare' || type === 'triumph_brass' ||
      type === 'horn_call_majestic' || type === 'court_hymn_peace' || type === 'success' ||
      type === 'promotion' || type === 'reward' || type === 'confirm' || type === 'spark'
    ) {
      // 【金石丝竹同调华彩】：曾侯乙编钟 + 灵璧玉磬 + 古筝五声华彩 + 竹笛破空
      if (engine && typeof engine.playInstrumentTone === 'function') {
        engine.playInstrumentTone('bianzhong', 261.63, 2.2, 0.09, 0, master);
        engine.playInstrumentTone('bianqing', 523.25, 1.8, 0.07, 0.04, master);
        [261.63, 293.66, 329.63, 392.00, 523.25].forEach((p, idx) => {
          engine.playInstrumentTone('guzheng', p, 1.4, 0.085 - idx * 0.008, idx * 0.065, master);
        });
        engine.playInstrumentTone('flute', 523.25, 1.5, 0.08, 0.26, master);
        return;
      }
    }

    // 传统乐器直通路由
    if (engine && typeof engine.playInstrumentTone === 'function') {
      if (type === 'guzheng_cascade' || type === 'guzheng_harmonic_pluck') {
        const pitches = type === 'guzheng_harmonic_pluck' ? [329.63, 392.00, 523.25] : [261.63, 293.66, 329.63, 392.00, 523.25, 659.25];
        pitches.forEach((p, idx) => {
          engine.playInstrumentTone('guzheng', p, 1.4, 0.09, idx * 0.04);
        });
        return;
      }
      if (type === 'pipa_spring_blossoms' || type === 'pipa_tremolo') {
        const pitches = [392.00, 440.00, 523.25, 659.25];
        pitches.forEach((p, idx) => {
          engine.playInstrumentTone('pipa', p, 0.8, 0.08, idx * 0.035);
        });
        return;
      }
      if (type.indexOf('guqin') === 0) {
        engine.playInstrumentTone('guqin', customPitch || 196.00, 2.2, 0.12);
        return;
      }
      if (type.indexOf('bianzhong') === 0 || type === 'bronze_ding_chime') {
        engine.playInstrumentTone('bianzhong', customPitch || 392.00, 2.4, 0.14);
        return;
      }
      if (type.indexOf('bianqing') === 0 || type.indexOf('chime_stone') === 0) {
        engine.playInstrumentTone('bianqing', customPitch || 523.25, 1.8, 0.12);
        return;
      }
      if (type === 'bamboo_flute' || type === 'luan_flute_ethereal') {
        engine.playInstrumentTone('flute', customPitch || 587.33, 1.2, 0.10);
        return;
      }
      if (type === 'xiao_reverie' || type === 'dongxiao_whisper') {
        engine.playInstrumentTone('xiao', customPitch || 440.00, 1.5, 0.09);
        return;
      }
      if (type === 'xun_ancient_clay') {
        engine.playInstrumentTone('xun', customPitch || 220.00, 1.8, 0.11);
        return;
      }
      if (type === 'erhu_sorrow') {
        engine.playInstrumentTone('erhu', customPitch || 293.66, 1.8, 0.11);
        return;
      }
      if (type === 'sheng_harmonious_reed') {
        engine.playInstrumentTone('sheng', customPitch || 329.63, 1.6, 0.10);
        return;
      }
      if (type === 'storm_gale' || type === 'storm_wind_thunder' || type === 'storm_surge_strings' || type === 'waves_crashing_shore') {
        engine.playInstrumentTone('drum', 68, 0.60, 0.16);
        engine.playInstrumentTone('guqin', 130.81, 2.2, 0.12, 0.08);
        engine.playInstrumentTone('erhu', 196.00, 1.8, 0.10, 0.18);
        return;
      }

      // 未知类型：空灵古琴微鸣，绝不播放纯音正弦波
      engine.playInstrumentTone('guqin', 261.63, 1.4, 0.08, 0);
      return;
    }

    // ==========================================
    // 三、 引擎未就绪极端兜底：物理超短触击缓冲 (零电子合成哔哔声)
    // ==========================================
    const sr = ctx.sampleRate || 44100;
    const clickLen = Math.floor(sr * 0.020);
    const clickBuf = ctx.createBuffer(1, clickLen, sr);
    const data = clickBuf.getChannelData(0);
    for (let i = 0; i < clickLen; i++) {
      const t = i / sr;
      const noise = (Math.random() * 2 - 1) * 0.22;
      const body = Math.sin(2 * Math.PI * 320 * t) * Math.exp(-t * 520);
      data[i] = (noise * Math.exp(-t * 1200) + body * 0.65) * 0.32;
    }
    const bSrc = ctx.createBufferSource();
    bSrc.buffer = clickBuf;
    bSrc.connect(ctx.destination);
    bSrc.start(now);
  } catch (e) {}
}

function playAmbientChime() {
  const ctx = getAudioContext();
  if (!ctx || !bgmEnabled) return;
  const engine = _eraMusicEngineRef;
  if (engine && typeof engine.getMetallicModalBuffer === 'function' && typeof engine._triggerPcmBuffer === 'function') {
    try {
      const bus = (engine.getMasterAudioBus && engine.getMasterAudioBus(ctx)) || ctx.destination;
      const notes = [329.63, 392.00, 440.00, 523.25]; // 宫商角徵羽清灵玉磬
      const now = ctx.currentTime;
      notes.forEach((pitch, i) => {
        const buf = engine.getMetallicModalBuffer(ctx, pitch, 0.55, 'jade');
        engine._triggerPcmBuffer(ctx, bus, buf, 0.05, now + i * 0.12, 0.005);
      });
      return;
    } catch (_) {}
  }
}

function playEraSceneAmbience(sceneType, volMul = 1.0, state = null) {
  if (!sfxEnabled) return;
  if (state && (state.soundEnabled === false || state.sfxEnabled === false)) return;
  const engine = _eraMusicEngineRef;
  if (engine && typeof engine.playEraSceneAmbience === 'function') {
    engine.playEraSceneAmbience(sceneType, volMul);
  }
}

function detectCurrentEraScene(evtObj) {
  const engine = _eraMusicEngineRef;
  if (engine && typeof engine.detectCurrentEraScene === 'function') {
    return engine.detectCurrentEraScene(evtObj);
  }
  return 'study';
}

function startBGM(era, eraMusicEngine, bgmUrl) {
  if (!bgmEnabled) return;
  bgmPlaying = true;
  const engine = eraMusicEngine || _eraMusicEngineRef;
  try {
    if (typeof wx !== 'undefined' && typeof wx.createInnerAudioContext === 'function') {
      if (!_bgmAudioContext) {
        _bgmAudioContext = wx.createInnerAudioContext();
        _bgmAudioContext.loop = true;
        _bgmAudioContext.autoplay = false;
        _bgmAudioContext.volume = 0.35;
      }
      const bgmSrc = bgmUrl || '';
      if (bgmSrc && _bgmAudioContext.src !== bgmSrc) {
        _bgmAudioContext.src = bgmSrc;
      }
      if (_bgmAudioContext.src) {
        _bgmAudioContext.play();
        return;
      }
    }
    if (engine && typeof engine.startEraBGM === 'function') {
      engine.startEraBGM(era);
    } else {
      playAmbientChime();
    }
  } catch (e) {}
}

function stopBGM(eraMusicEngine) {
  bgmPlaying = false;
  const engine = eraMusicEngine || _eraMusicEngineRef;
  try {
    if (_bgmAudioContext && typeof _bgmAudioContext.pause === 'function') {
      _bgmAudioContext.pause();
    }
    if (engine && typeof engine.stopEraBGM === 'function') {
      engine.stopEraBGM();
    }
  } catch (e) {}
}

function toggleBGM(era, eraMusicEngine, bgmUrl) {
  bgmEnabled = !bgmEnabled;
  if (!bgmEnabled) stopBGM(eraMusicEngine);
  else startBGM(era, eraMusicEngine, bgmUrl);
  return bgmEnabled;
}

module.exports = {
  getAudioContext,
  triggerHaptic,
  playSoundEffect,
  playAmbientChime,
  playEraSceneAmbience,
  detectCurrentEraScene,
  startBGM,
  stopBGM,
  toggleBGM,
  setEraMusicEngine,
  isBgmEnabled: () => bgmEnabled,
  isSfxEnabled: () => sfxEnabled,
  isBgmPlaying: () => bgmPlaying,
  setBgmEnabled: (v) => { bgmEnabled = !!v; },
  setSfxEnabled: (v) => { sfxEnabled = !!v; }
};
