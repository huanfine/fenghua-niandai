// 微信生态运行环境与生命周期监听模块
function initWechatLifecycle(env = {}) {
  if (typeof wx === 'undefined') return;

  const {
    state = {},
    setGameSeed = () => {},
    reportGameMilestone = () => {},
    sanitizeUserInput = (s) => s,
    checkTextContentSafety = () => {},
    evaluateEndgameArchetype = () => ({ title: '平淡一生' }),
    generateShareCardImageUrl = () => null,
    stopBGM = () => {},
    startBGM = () => {},
    isBgmEnabled = () => true,
    getAudioContext = () => null,
    stopRapidAdvance = () => {},
    saveGameState = () => {},
    requestRender = () => {},
    trySyncNetworkTime = () => {},
    ensureCloudSecurityInit = () => {},
    logDebugError = (ctx, err) => {
      if (typeof console !== 'undefined' && console.warn) console.warn(`[LifeSim:${ctx}]`, err);
    }
  } = env;

// ------------------------------------------
if (typeof wx !== 'undefined') {
  // 0.0 初始化微信云开发安全环境 (供内容安全与云函数调用)
  ensureCloudSecurityInit();

  // 0. 读取冷启动参数与分享裂变来源归因 (from=share_menu / from=share_timeline / from=endgame_card&seed=...)
  if (typeof wx.getLaunchOptionsSync === 'function') {
    try {
      const launchOpts = wx.getLaunchOptionsSync() || {};
      const query = launchOpts.query || {};
      if (query.seed && !isNaN(Number(query.seed))) {
        setGameSeed(Number(query.seed));
      }
      if (query.from) {
        state.launchSource = String(query.from);
        reportGameMilestone('launch_from_share', {
          from: String(query.from),
          grade: query.grade ? String(query.grade) : '',
          seed: query.seed ? Number(query.seed) : 0,
          scene: launchOpts.scene || 0
        });
      }
      if (query.action === 'alliance' || query.action === 'clan_marriage') {
        state.pendingMarriageInvite = {
          fromFamId: query.fromFamId,
          fromSurname: decodeURIComponent(query.fromSurname || ''),
          fromProvince: decodeURIComponent(query.fromProvince || ''),
          fromHall: decodeURIComponent(query.fromHall || ''),
          youthName: query.youthName ? decodeURIComponent(query.youthName) : '世家子弟'
        };
        state.activeModal = 'marriage_invitation_received';
        if (typeof requestRender === 'function') requestRender();
      }
    } catch (e) {
      logDebugError('wx.getLaunchOptionsSync', e);
    }
  }

  // 0.5 线上版本发布自动检测更新 (wx.getUpdateManager)
  if (typeof wx.getUpdateManager === 'function') {
    try {
      const updateManager = wx.getUpdateManager();
      if (updateManager && typeof updateManager.onUpdateReady === 'function') {
        updateManager.onUpdateReady(() => {
          if (typeof wx.showModal === 'function') {
            wx.showModal({
              title: '新卷已备',
              content: '新版本书卷已修订妥当，是否现在重新翻开？',
              success(res) {
                if (res && res.confirm && typeof updateManager.applyUpdate === 'function') {
                  updateManager.applyUpdate();
                }
              }
            });
          }
        });
      }
    } catch (e) {
      logDebugError('wx.getUpdateManager', e);
    }
  }

  // 1. 开启小游戏右上角转发菜单与朋友圈分享支持
  if (typeof wx.showShareMenu === 'function') {
    try {
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      });
    } catch (e) {
      logDebugError('wx.showShareMenu', e);
    }
  }

  // 2. 自定义朋友转发卡片 (带实时履职身份、高光战绩、画布截图与时代身世种子)
  if (typeof wx.onShareAppMessage === 'function') {
    wx.onShareAppMessage(() => {
      const defaultTitle = "如果回到八十年代从头活一遍，你会选铁饭碗、搞科研还是下海？";
      let shareTitle = defaultTitle;
      if (state && state.isStarted) {
        const cleanedName = sanitizeUserInput(state.name || '陈守正');
        const safeActorName = (!cleanedName || cleanedName.includes('***')) ? '陈守正' : cleanedName;
        checkTextContentSafety(safeActorName, (isSafe, checked) => {
          if (!isSafe && state) state.name = '陈守正';
        }, '陈守正');
        if (state.activeModal === 'endgame') {
          const arch = state.endgameArchetype || evaluateEndgameArchetype(state);
          shareTitle = `${safeActorName}这一生走到了${state.age}岁，终局「${arch ? arch.title : '平淡一生'}」。同样的时代身世，你敢来试试吗？`;
        } else {
          shareTitle = `${state.year || 1992}年，${state.age || 24}岁的${safeActorName}刚干到「${state.jobTitle || state.rankName || '基层办事员'}」，这一步太难选了…`;
        }
      }
      const shareImg = generateShareCardImageUrl();
      reportGameMilestone('share_app_message', {
        year: state ? state.year : 1992,
        rank: state ? state.rankName : '',
        runs: state ? state.heritageRuns : 0,
        hasImage: !!shareImg
      });
      const challengeSeed = (state && state.runSeed) || (typeof _initialGameSeed !== 'undefined' ? _initialGameSeed : (typeof _gameSeed !== 'undefined' ? _gameSeed : 20260101));
      const payload = {
        title: shareTitle,
        query: `from=share_menu&seed=${challengeSeed}`
      };
      if (shareImg) payload.imageUrl = shareImg;
      return payload;
    });
  }

  // 3. 自定义朋友圈分享卡片 (含姓名内容安全校验与画布缩略图)
  if (typeof wx.onShareTimeline === 'function') {
    wx.onShareTimeline(() => {
      let timelineTitle = "从八十年代筒子楼到新世纪万家灯火，这一生的冷暖由你落笔";
      if (state && state.isStarted) {
        const cleanedName = sanitizeUserInput(state.name || '陈守正');
        const safeActorName = (!cleanedName || cleanedName.includes('***')) ? '陈守正' : cleanedName;
        checkTextContentSafety(safeActorName, (isSafe) => {
          if (!isSafe && state) state.name = '陈守正';
        }, '陈守正');
        if (state.activeModal === 'endgame') {
          const arch = state.endgameArchetype || evaluateEndgameArchetype(state);
          timelineTitle = `走完${safeActorName}的${state.age}年人生，终局评定：「${arch ? arch.title : '平淡一生'}」`;
        } else {
          timelineTitle = `${state.year}年 · ${safeActorName}（${state.age}岁，${state.jobTitle || '普通人'}）的人生十字路口`;
        }
      }
      const shareImg = generateShareCardImageUrl();
      reportGameMilestone('share_timeline', {
        year: state ? state.year : 1992,
        rank: state ? state.rankName : '',
        hasImage: !!shareImg
      });
      const challengeSeed = (state && state.runSeed) || (typeof _initialGameSeed !== 'undefined' ? _initialGameSeed : (typeof _gameSeed !== 'undefined' ? _gameSeed : 20260101));
      const payload = {
        title: timelineTitle,
        query: `from=share_timeline&seed=${challengeSeed}`
      };
      if (shareImg) payload.imageUrl = shareImg;
      return payload;
    });
  }

  if (typeof wx.onHide === 'function') {
    wx.onHide(() => {
      state.isAppInBackground = true;
      if (typeof stopBGM === 'function') stopBGM();
      const actx = getAudioContext();
      if (actx && typeof actx.suspend === 'function') {
        try { actx.suspend(); } catch (e) { logDebugError('audioSuspendOnHide', e); }
      }
      if (typeof stopRapidAdvance === 'function') stopRapidAdvance();
      if (typeof stopAutoAdvance === 'function') stopAutoAdvance();
      if (state.autoTimer) {
        clearInterval(state.autoTimer);
        state.autoTimer = null;
        state.isPlaying = false;
      }
      if (typeof saveGameState === 'function') saveGameState(true);
    });
  }
  if (typeof wx.onShow === 'function') {
    wx.onShow((showRes) => {
      state.isAppInBackground = false;
      const query = (showRes && showRes.query) || {};
      if (query.seed && !isNaN(Number(query.seed)) && (!state.isStarted || state.activeModal === 'endgame')) {
        setGameSeed(Number(query.seed));
      }
      if (query.action === 'alliance' || query.action === 'clan_marriage') {
        state.pendingMarriageInvite = {
          fromFamId: query.fromFamId,
          fromSurname: decodeURIComponent(query.fromSurname || ''),
          fromProvince: decodeURIComponent(query.fromProvince || ''),
          fromHall: decodeURIComponent(query.fromHall || ''),
          youthName: query.youthName ? decodeURIComponent(query.youthName) : '世家子弟'
        };
        state.activeModal = 'marriage_invitation_received';
      }
      const actx = getAudioContext();
      if (actx && actx.state === 'suspended') {
        try { actx.resume(); } catch (e) { logDebugError('audioResume', e); }
      }
      const shouldPlayBgm = (typeof isBgmEnabled === 'function') ? isBgmEnabled() : (typeof bgmEnabled !== 'undefined' ? bgmEnabled : state.bgmEnabled !== false);
      if (typeof startBGM === 'function' && shouldPlayBgm) {
        startBGM();
      }
      requestRender();
    });
  }
  if (typeof wx.onAudioInterruptionBegin === 'function') {
    wx.onAudioInterruptionBegin(() => {
      if (typeof stopBGM === 'function') stopBGM();
      const actx = getAudioContext();
      if (actx && typeof actx.suspend === 'function') {
        try { actx.suspend(); } catch (e) { logDebugError('audioSuspendOnInterruption', e); }
      }
    });
  }
  if (typeof wx.onAudioInterruptionEnd === 'function') {
    wx.onAudioInterruptionEnd(() => {
      const actx = getAudioContext();
      if (actx && actx.state === 'suspended') {
        try { actx.resume(); } catch (e) { logDebugError('audioInterruptionResume', e); }
      }
      const shouldPlayBgm = (typeof isBgmEnabled === 'function') ? isBgmEnabled() : (typeof bgmEnabled !== 'undefined' ? bgmEnabled : state.bgmEnabled !== false);
      if (typeof startBGM === 'function' && shouldPlayBgm) {
        startBGM();
      }
    });
  }
}

// 尝试校验网络/服务端时间基准 (防系统时间修改作弊)
// 延迟执行以确保微信底座 JSBridge 完全初始化就绪，避免与首帧生命周期争抢
setTimeout(() => {
  trySyncNetworkTime();
}, 600);

if (typeof wx !== 'undefined' && typeof wx.onShow === 'function') {
  try {
    wx.onShow(() => {
      trySyncNetworkTime();
    });
  } catch (_) {}
}

}

module.exports = {
  initWechatLifecycle
};
