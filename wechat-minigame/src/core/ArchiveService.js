/**
 * 华夏世家大系 · 核心存档与云同步服务 (Archive Service)
 * 职责：
 * 1. 负责单局人生档案、世家家族谱系跨代数据的序列化与反序列化；
 * 2. 多端存储适配：微信小游戏本地存储 (wx.setStorageSync)、浏览器 (localStorage)；
 * 3. 云端防丢备份：微信云开发数据库 (wx.cloud) 与微信用户云存储 (wx.setUserCloudStorage)；
 * 4. 读写节流与闪存磨损保护，版本迁移兼容。
 */

const SAVE_STORAGE_KEY = 'LIFESIM_ARCHIVE_DATA_V2';
const SAVE_VERSION = 20261015;

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
      savedAt: Date.now(),
      isStarted: state.isStarted || false,
      endgameSettled: !!state.endgameSettled,
      year: state.year,
      age: state.age,
      track: state.track,
      originKey: state.originKey,
      regionKey: state.regionKey,
      name: state.name,
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
      strategy: state.strategy,
      family: state.family || {},
      contacts: (state.contacts || []).slice(0, 40),
      handledEvents: state.handledEvents || {},
      chronicleHistory: (state.chronicleHistory || []).slice(0, 100),
      unlockedAchievements: (state.unlockedAchievements || []).slice(0, 30),
      heldAssets: state.heldAssets || {},
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
      } else if (typeof localStorage !== 'undefined') {
        raw = localStorage.getItem(SAVE_STORAGE_KEY);
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
    try {
      if (typeof wx !== 'undefined' && typeof wx.removeStorageSync === 'function') {
        wx.removeStorageSync(SAVE_STORAGE_KEY);
      } else if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(SAVE_STORAGE_KEY);
      }
      return true;
    } catch (_) {
      return false;
    }
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
  SAVE_VERSION
};
