/**
 * 华夏世家大系 · 核心存档与云同步服务 (Archive Service)
 * 职责：
 * 1. 负责单局人生档案、世家家族谱系跨代数据的序列化与反序列化；
 * 2. 多端存储适配：微信小游戏本地存储 (wx.setStorageSync)、浏览器 (localStorage)；
 * 3. 云端防丢备份：微信云开发数据库 (wx.cloud) 与微信用户云存储 (wx.setUserCloudStorage)；
 * 4. 读写节流与闪存磨损保护，版本迁移兼容。
 */

const SAVE_STORAGE_KEY = 'life_sim_grand_masterpiece_save_v5';
const SAVE_VERSION = 5;
const LEGACY_SAVE_STORAGE_KEYS = [
  'life_sim_grand_masterpiece_save_v4',
  'life_sim_grand_masterpiece_save_v3',
  'life_sim_grand_masterpiece_save_v2',
  'LIFESIM_ARCHIVE_DATA_V2',
  'LIFESIM_ARCHIVE_DATA_V1'
];

class ArchiveService {
  constructor() {
    this._lastSaveTimestamp = 0;
    this._pendingSaveTimer = null;
    this._lastCloudSyncTs = 0;
    this._cachedSaveRaw = null;
    this._cachedSaveParsed = null;
    this._memoryFallback = new Map();
  }

  getSaveKey() {
    return SAVE_STORAGE_KEY;
  }

  getSaveVersion() {
    return SAVE_VERSION;
  }

  /**
   * 版本平滑迁移函数
   */
  migrateSaveData(data) {
    if (!data || typeof data !== 'object') return null;
    const parsed = Object.assign({}, data);
    const ver = parsed.version || 0;

    parsed.debtCrisisCount = Math.max(0, parsed.debtCrisisCount || 0);
    parsed.healthCrisisCount = Math.max(0, parsed.healthCrisisCount || 0);

    if (ver < SAVE_VERSION) {
      parsed.version = SAVE_VERSION;
    }
    return parsed;
  }

  /**
   * 将状态对象打包序列化为持久化字典
   */
  serializeState(state) {
    if (!state || typeof state !== 'object') return {};
    return {
      version: SAVE_VERSION,
      mode: state.mode || 'clan_season_v1',
      savedAt: Date.now(),
      isStarted: state.isStarted || false,
      endgameSettled: !!state.endgameSettled,
      isRetired: !!state.isRetired,
      earlyRetireReason: state.earlyRetireReason || null,
      bgmEnabled: typeof state.bgmEnabled !== 'undefined' ? state.bgmEnabled : true,
      sfxEnabled: typeof state.sfxEnabled !== 'undefined' ? state.sfxEnabled : true,
      hapticEnabled: state.hapticEnabled !== false,
      year: state.year,
      age: state.age,
      track: state.track,
      originKey: state.originKey,
      regionKey: state.regionKey,
      name: state.name,
      gender: state.gender,
      elementDestiny: state.elementDestiny,
      jobTitle: state.jobTitle,
      rankName: state.rankName,
      capital: state.capital,
      health: state.health,
      sp: state.sp,
      iq: state.iq,
      eq: state.eq,
      courage: state.courage,
      clean: state.clean,
      rep: state.rep,
      resilience: state.resilience || 50,
      ap: state.ap,
      maxAp: state.maxAp,
      bonusMaxAp: state.bonusMaxAp || 0,
      completedPactsCount: state.completedPactsCount || 0,
      inactionYears: state.inactionYears || 0,
      strategy: state.strategy,
      strategicPillar: state.strategicPillar,
      generationalVow: state.generationalVow || null,
      dynasticGeneration: state.dynasticGeneration || 1,
      familyProfile: state.familyProfile || null,
      lifespanCeiling: state.lifespanCeiling || 75,
      baseLifespanSeed: state.baseLifespanSeed || state.lifespanCeiling || 75,
      overworkYears: state.overworkYears || 0,
      wellnessYears: state.wellnessYears || 0,
      decisionSuccessCount: state.decisionSuccessCount || 0,
      decisionFailCount: state.decisionFailCount || 0,
      auditCrisisCount: state.auditCrisisCount || 0,
      debtCrisisCount: state.debtCrisisCount || 0,
      healthCrisisCount: state.healthCrisisCount || 0,
      tutorialStep: state.tutorialStep || 0,
      tutorialCompleted: !!state.tutorialCompleted,
      talentPoints: state.talentPoints,
      unlockedTalents: state.unlockedTalents || [],
      karmaPledges: state.karmaPledges || {},
      karmaHistory: state.karmaHistory || [],
      unlockedHeirlooms: state.unlockedHeirlooms || [],
      awardedMedals: state.awardedMedals || [],
      unlockedRelics: state.unlockedRelics || [],
      ownedCurios: state.ownedCurios || [],
      activeMotto: state.activeMotto || 'shishi',
      activeCalligraphyInscription: state.activeCalligraphyInscription || null,
      inscribedMonuments: state.inscribedMonuments || {},
      herbalWellness: state.herbalWellness || null,
      heritageCrafts: state.heritageCrafts || null,
      epigraphyRubbings: state.epigraphyRubbings || null,
      kilnPorcelains: state.kilnPorcelains || null,
      teaWayRecords: state.teaWayRecords || null,
      brocadeRecords: state.brocadeRecords || null,
      guqinRecords: state.guqinRecords || null,
      inkstoneRecords: state.inkstoneRecords || null,
      masterStudio: state.masterStudio || null,
      handledTours: state.handledTours || [],
      handledLectures: state.handledLectures || {},
      handledMotions: state.handledMotions || [],
      govLevel: state.govLevel || 1,
      rankIndex: state.rankIndex || 0,
      lifetimeMaxRank: state.lifetimeMaxRank || state.rankIndex || state.govLevel || 1,
      governancePolicy: state.governancePolicy || { rd: 25, welfare: 25, infra: 25, audit: 25 },
      governanceScore: state.governanceScore || 76,
      lifeAmbition: state.lifeAmbition || null,
      investments: state.investments || { realEstate: 0, bonds: 0, ventureTech: 0 },
      heritageRuns: state.heritageRuns || 0,
      heritageBonusTalents: state.heritageBonusTalents || 0,
      rewardedAdWatchedThisRun: state.rewardedAdWatchedThisRun || 0,
      lastRewardedAdTs: state.lastRewardedAdTs || 0,
      runSeed: state.runSeed || null,
      sponsorEditionUnlocked: !!state.sponsorEditionUnlocked,
      leaderboardHistory: (state.leaderboardHistory || []).slice(0, 10),
      childhoodTutorialDismissed: !!state.childhoodTutorialDismissed,
      family: state.family || {},
      contacts: (state.contacts || []).slice(0, 40),
      handledEvents: state.handledEvents || {},
      chronicleHistory: (state.chronicleHistory || []).slice(0, 100),
      unlockedAchievements: (state.unlockedAchievements || []).slice(0, 30),
      onboardingTasks: state.onboardingTasks || [],
      memoryAlbum: (state.memoryAlbum || []).slice(0, 15),
      collectedClippings: (state.collectedClippings || []).slice(0, 20),
      fortuneHexagram: state.fortuneHexagram || null,
      heldAssets: state.heldAssets || {},
      marketTrends: state.marketTrends || {},
      dynasticInheritance: state.dynasticInheritance || null
    };
  }

  /**
   * 写入持久化存储
   */
  saveGameState(state, force = false, options = {}) {
    if (!state || typeof state !== 'object') return false;
    try {
      const now = Date.now();
      if (!force && state.isPlaying) {
        if (now - this._lastSaveTimestamp < 2500) {
          if (!this._pendingSaveTimer) {
            this._pendingSaveTimer = setTimeout(() => {
              this._pendingSaveTimer = null;
              this.saveGameState(state, true, options);
            }, 1500);
          }
          return true;
        }
      }
      if (this._pendingSaveTimer) {
        clearTimeout(this._pendingSaveTimer);
        this._pendingSaveTimer = null;
      }
      this._lastSaveTimestamp = now;

      const saveData = Object.assign(this.serializeState(state), options.extraFields || {});
      const json = JSON.stringify(saveData);
      this._cachedSaveRaw = json;
      this._cachedSaveParsed = this.migrateSaveData(saveData);

      if (typeof wx !== 'undefined' && typeof wx.setStorageSync === 'function') {
        wx.setStorageSync(SAVE_STORAGE_KEY, json);
      } else if (typeof localStorage !== 'undefined') {
        localStorage.setItem(SAVE_STORAGE_KEY, json);
      } else {
        this._memoryFallback.set(SAVE_STORAGE_KEY, json);
      }

      this.syncSaveToCloud(saveData, state);
      return true;
    } catch (e) {
      if (typeof console !== 'undefined' && console.error) {
        console.error('[ArchiveService] saveGameState failed:', e);
      }
      return false;
    }
  }

  /**
   * 从本地读取存档
   */
  loadGameState() {
    try {
      let raw = null;
      if (typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function') {
        raw = wx.getStorageSync(SAVE_STORAGE_KEY);
        if (!raw) {
          for (let i = 0; i < LEGACY_SAVE_STORAGE_KEYS.length; i++) {
            const oldRaw = wx.getStorageSync(LEGACY_SAVE_STORAGE_KEYS[i]);
            if (oldRaw) { raw = oldRaw; break; }
          }
        }
      } else if (typeof localStorage !== 'undefined') {
        raw = localStorage.getItem(SAVE_STORAGE_KEY);
        if (!raw) {
          for (let i = 0; i < LEGACY_SAVE_STORAGE_KEYS.length; i++) {
            const oldRaw = localStorage.getItem(LEGACY_SAVE_STORAGE_KEYS[i]);
            if (oldRaw) { raw = oldRaw; break; }
          }
        }
      } else {
        raw = this._memoryFallback.get(SAVE_STORAGE_KEY) || this._cachedSaveRaw;
      }
      if (!raw) return null;
      const parsed = typeof raw === 'string' ? JSON.parse(raw) : raw;
      return this.migrateSaveData(parsed);
    } catch (e) {
      if (typeof console !== 'undefined' && console.error) {
        console.error('[ArchiveService] loadGameState failed:', e);
      }
      return null;
    }
  }

  /**
   * 清除存档
   */
  clearSaveData() {
    this._cachedSaveRaw = null;
    this._cachedSaveParsed = null;
    this._memoryFallback.delete(SAVE_STORAGE_KEY);
    LEGACY_SAVE_STORAGE_KEYS.forEach(k => {
      this._memoryFallback.delete(k);
    });
    try {
      if (typeof wx !== 'undefined' && typeof wx.removeStorageSync === 'function') {
        wx.removeStorageSync(SAVE_STORAGE_KEY);
        LEGACY_SAVE_STORAGE_KEYS.forEach(k => {
          try { wx.removeStorageSync(k); } catch (_) {}
        });
      } else if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(SAVE_STORAGE_KEY);
        LEGACY_SAVE_STORAGE_KEYS.forEach(k => {
          try { localStorage.removeItem(k); } catch (_) {}
        });
      }
      return true;
    } catch (_) {
      return false;
    }
  }

  clearSavedGame() {
    return this.clearSaveData();
  }

  hasSavedGame() {
    const s = this.loadGameState();
    return !!(s && s.isStarted && s.name);
  }

  /**
   * 云端多端漫游同步
   */
  syncSaveToCloud(saveData, state = {}) {
    if (!saveData || !saveData.name) return;
    const now = Date.now();
    if (now - this._lastCloudSyncTs < 12000) return;
    this._lastCloudSyncTs = now;

    try {
      const meta = {
        version: saveData.version,
        savedAt: saveData.savedAt || now,
        year: saveData.year,
        age: saveData.age,
        name: saveData.name,
        capital: saveData.capital,
        track: saveData.track
      };
      const metaStr = JSON.stringify(meta);
      const saveStr = JSON.stringify(saveData);

      if (typeof wx !== 'undefined' && typeof wx.setUserCloudStorage === 'function') {
        wx.setUserCloudStorage({
          KVDataList: [
            { key: 'lifesim_cloud_meta', value: metaStr },
            { key: 'lifesim_cloud_backup', value: saveStr }
          ],
          success() {
            if (state) {
              state._cloudSyncSuccess = true;
              state._lastCloudSyncTime = now;
            }
          },
          fail() {}
        });
      }

      if (typeof wx !== 'undefined' && wx.cloud && typeof wx.cloud.database === 'function') {
        try {
          const db = wx.cloud.database();
          db.collection('user_archives').doc('active_save').set({
            data: {
              saveData,
              meta,
              updatedAt: db.serverDate ? db.serverDate() : now
            }
          }).catch(() => {});
        } catch (_) {}
      }
    } catch (_) {}
  }
}

const archiveService = new ArchiveService();

module.exports = {
  ArchiveService,
  archiveService,
  SAVE_STORAGE_KEY,
  SAVE_VERSION,
  LEGACY_SAVE_STORAGE_KEYS
};
