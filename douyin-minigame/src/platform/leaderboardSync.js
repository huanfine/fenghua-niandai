/**
 * 《风华年代：沧海沉浮录》排行榜鉴权与微信开放数据域同步服务 (Leaderboard Sync Service)
 * 职责：终局双向签名计算、云函数防作弊验算门禁、写入 setUserCloudStorage 与 SharedCanvas 消息调度
 */

const SERVER_SALT_LIFESIM = 'LIFESIM_2026_ANTITAMPER_KEY_#8899';

function generateScoreChecksum(score, year, age, rep, clean, runSeed) {
  const str = `${score}:${year}:${age}:${rep}:${clean}:${runSeed}:${SERVER_SALT_LIFESIM}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

function createLeaderboardSync(deps = {}) {
  const {
    getState = () => ({}),
    evaluateEndgameArchetype = () => ({ grade: 'B', title: '平凡一生' }),
    sanitizeUserInput = (s) => s,
    reportMilestone = () => {},
    playSoundEffect = () => {},
    requestRender = () => {},
    logDebugError = () => {},
    getConfig = () => null
  } = deps;

  let _lastLeaderboardSyncTs = 0;
  const LEADERBOARD_SYNC_MIN_INTERVAL_MS = 5000;

  function syncScoreToLeaderboard() {
    try {
      const now = Date.now();
      if (now - _lastLeaderboardSyncTs < LEADERBOARD_SYNC_MIN_INTERVAL_MS) {
        return;
      }
      _lastLeaderboardSyncTs = now;

      const state = getState();
      const arch = state.endgameArchetype || evaluateEndgameArchetype(state);
      const dynCfg = (typeof getConfig === 'function' && getConfig()) || (typeof LIFESIM_DYNAMIC_CONFIG !== 'undefined' ? LIFESIM_DYNAMIC_CONFIG : null);
      const rew = (dynCfg && dynCfg.rewards) || {};
      const sScore = (rew.endgameSGradeBaseScore !== undefined) ? rew.endgameSGradeBaseScore : 1000;
      const aScore = (rew.endgameAGradeBaseScore !== undefined) ? rew.endgameAGradeBaseScore : 750;
      const bScore = (rew.endgameBGradeBaseScore !== undefined) ? rew.endgameBGradeBaseScore : 500;
      const cScore = (rew.endgameCGradeBaseScore !== undefined) ? rew.endgameCGradeBaseScore : 250;
      const gradeScore = arch.grade === 'S' ? sScore : (arch.grade === 'A' ? aScore : (arch.grade === 'B' ? bScore : cScore));
      // 排除 B 组广告额外赠予的 ¥15,000 与 +5 声望，维护全平台排行榜基准公平
      const effectiveRep = Math.max(0, (state.rep || 0) - (state.heritageBonusRep || 0));
      const effectiveCapital = Math.max(0, (state.capital || 0) - (state.heritageBonusCapital || 0));
      const rawScore = Math.round(gradeScore + effectiveRep * 5 + (state.clean || 0) * 3 + Math.min(500, Math.floor(effectiveCapital / 5000)));
      const delegationPenalty = (state.delegatedDecisionsCount && state.delegatedDecisionsCount > 0) ? 0.75 : 1.0;
      const totalScore = Math.round(rawScore * delegationPenalty);

      const isHeadless = Boolean(state._isHeadlessSimulation || (typeof global !== 'undefined' && global.__HEADLESS_SIM__));

      if (!Array.isArray(state.leaderboardHistory)) state.leaderboardHistory = [];
      const cleanedName = sanitizeUserInput(state.name || '时代弄潮儿');
      const safeActorName = (!cleanedName || cleanedName.includes('***')) ? '时代弄潮儿' : cleanedName;
      state.leaderboardHistory.push({
        name: safeActorName,
        score: totalScore,
        grade: String(arch.grade || 'B'),
        title: String(arch.title || ''),
        age: state.age || 78,
        year: state.year || 2050,
        track: state.track || 'gov',
        bucket: state.abTestBucket || 'A_standard',
        ts: Date.now()
      });
      state.leaderboardHistory.sort((a, b) => (b.score || 0) - (a.score || 0));
      if (state.leaderboardHistory.length > 10) {
        state.leaderboardHistory = state.leaderboardHistory.slice(0, 10);
      }

      if (isHeadless) return;

      const secureChecksum = generateScoreChecksum(
        totalScore,
        state.year || 2050,
        state.age || 78,
        state.rep || 50,
        state.clean || 50,
        state.runSeed || 0
      );

      const writeVerifiedCloudStorage = (finalScore, finalGrade, finalTitle) => {
        if (typeof wx !== 'undefined' && typeof wx.setUserCloudStorage === 'function') {
          wx.setUserCloudStorage({
            KVDataList: [
              { key: 'era_score', value: String(finalScore) },
              { key: 'era_grade', value: String(finalGrade || 'B') },
              { key: 'era_title', value: String(finalTitle || '') },
              { key: 'era_bucket', value: String(state.abTestBucket || 'A_standard') }
            ],
            success: () => {
              if (typeof wx.getOpenDataContext === 'function') {
                const openDataContext = wx.getOpenDataContext();
                if (openDataContext && typeof openDataContext.postMessage === 'function') {
                  openDataContext.postMessage({
                    type: 'UPDATE_SCORE',
                    score: finalScore,
                    grade: finalGrade,
                    title: finalTitle
                  });
                }
              }
            }
          });
        }
        reportMilestone('leaderboard_synced', { score: finalScore, grade: finalGrade });
      };

      if (typeof wx !== 'undefined' && wx.cloud && typeof wx.cloud.callFunction === 'function') {
        try {
          wx.cloud.callFunction({
            name: 'verifyAndSubmitScore',
            data: {
              score: totalScore,
              rawScore: rawScore,
              grade: arch.grade,
              title: arch.title,
              runSeed: state.runSeed,
              year: state.year,
              age: state.age,
              rep: state.rep,
              clean: state.clean,
              capital: state.capital,
              delegatedDecisionsCount: state.delegatedDecisionsCount || 0,
              checksum: secureChecksum,
              submitTime: now
            }
          }).then((res) => {
            if (res && res.result && res.result.verified) {
              writeVerifiedCloudStorage(res.result.score || totalScore, arch.grade, arch.title);
            } else {
              console.warn('[Leaderboard] 云函数校验拦截，拒绝写入开放数据域:', res && res.result);
            }
          }).catch((err) => {
            console.warn('[Leaderboard] 云函数调用未响应，保持本地成绩:', err);
          });
        } catch (e) {
          logDebugError('syncScoreToLeaderboard.cloud', e);
        }
      } else {
        if (typeof wx !== 'undefined' && typeof wx.getSystemInfoSync === 'function') {
          try {
            const sys = wx.getSystemInfoSync();
            if (sys && sys.platform === 'devtools') {
              writeVerifiedCloudStorage(totalScore, arch.grade, arch.title);
            }
          } catch (_) {}
        }
      }
    } catch (err) {
      logDebugError('syncScoreToLeaderboard', err);
    }
  }

  function openLeaderboardModal(screenWidth) {
    const state = getState();
    state._leaderboardReturnModal = state.activeModal === 'endgame' ? 'endgame' : null;
    state.activeModal = 'leaderboard';
    try {
      if (typeof wx !== 'undefined' && typeof wx.getOpenDataContext === 'function') {
        const openDataContext = wx.getOpenDataContext();
        if (openDataContext && typeof openDataContext.postMessage === 'function') {
          openDataContext.postMessage({ type: 'SHOW_LEADERBOARD', width: screenWidth - 48, height: 220 });
        }
      }
    } catch (err) {
      logDebugError('openLeaderboardModal', err);
    }
    playSoundEffect('paper');
    requestRender();
  }

  return {
    syncScoreToLeaderboard,
    openLeaderboardModal,
    generateScoreChecksum
  };
}

module.exports = {
  SERVER_SALT_LIFESIM,
  generateScoreChecksum,
  createLeaderboardSync
};
