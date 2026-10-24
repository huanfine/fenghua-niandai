/**
 * 《风华年代：沧海沉浮录》华夏世家大系 · 服务端桥接与云端同步服务 (Clan Cloud & Telemetry Service)
 * 职责：
 * 1. 微信 OpenID 鉴权接入与唯一用户身份绑定 (wx.login / 云函数双重鉴权)；
 * 2. 全服世界运行参数拉取 (getWorldConfig: 运营前沿线、现实赛季元数据、网络授时校准)；
 * 3. 家族档案跨设备云端持久化、防篡改签名校验与换机一键迎回 (syncFamily / recoverFamily)；
 * 4. 真实全服百家榜单动态汇聚与现实赛季定期归档/清零 (fetchClanLeaderboard / archiveSeason)；
 * 5. 全离线/弱网自愈能力：本地秒开、离线沙盒演化、重连平滑增量上行同步。
 */

const SERVER_CLAN_SALT = 'LIFESIM_CLAN_CLOUD_SALT_2026_#9966';

// 初始种子示例名门（仅在离线或首次冷启动时作为世界底色垫底，绝非固定写死）
const SEED_SAMPLE_CLANS = [
  { familyId: 'fam_chen_henan', isSample: true, surname: '陈', province: '河南', hallName: '颍川堂', vocationId: 'study_scholar', vocationName: '耕读传家 · 诗书润骨', clanTrust: { prestigeScore: 1655, trustFundMoney: 220000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_li_guangdong', isSample: true, surname: '李', province: '广东', hallName: '陇西堂', vocationId: 'medical_herb', vocationName: '悬壶济世 · 杏林春暖', clanTrust: { prestigeScore: 1420, trustFundMoney: 180000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_zhang_shandong', isSample: true, surname: '张', province: '山东', hallName: '清河堂', vocationId: 'trade_craft', vocationName: '通商惠工 · 经纶世济', clanTrust: { prestigeScore: 1380, trustFundMoney: 250000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_wang_zhejiang', isSample: true, surname: '王', province: '浙江', hallName: '三槐堂', vocationId: 'iron_craft', vocationName: '百工机巧 · 经纬乾坤', clanTrust: { prestigeScore: 1350, trustFundMoney: 195000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_liu_jiangsu', isSample: true, surname: '刘', province: '江苏', hallName: '彭城堂', vocationId: 'study_scholar', vocationName: '耕读传家 · 诗书润骨', clanTrust: { prestigeScore: 1210, trustFundMoney: 160000 }, genealogyList: [1,2,3,4,5,6] },
  { familyId: 'fam_zhou_hunan', isSample: true, surname: '周', province: '湖南', hallName: '爱莲堂', vocationId: 'study_scholar', vocationName: '耕读传家 · 诗书润骨', clanTrust: { prestigeScore: 1150, trustFundMoney: 140000 }, genealogyList: [1,2,3,4,5,6] },
  { familyId: 'fam_huang_fujian', isSample: true, surname: '黄', province: '福建', hallName: '江夏堂', vocationId: 'trade_craft', vocationName: '通商惠工 · 经纶世济', clanTrust: { prestigeScore: 1080, trustFundMoney: 210000 }, genealogyList: [1,2,3,4,5] },
  { familyId: 'fam_yang_sichuan', isSample: true, surname: '杨', province: '四川', hallName: '弘农堂', vocationId: 'medical_herb', vocationName: '悬壶济世 · 杏林春暖', clanTrust: { prestigeScore: 990, trustFundMoney: 130000 }, genealogyList: [1,2,3,4] },
  { familyId: 'fam_zhao_beijing', isSample: true, surname: '赵', province: '北京', hallName: '天水堂', vocationId: 'study_scholar', vocationName: '耕读传家 · 诗书润骨', clanTrust: { prestigeScore: 920, trustFundMoney: 175000 }, genealogyList: [1,2,3,4] }
];

let _cachedOpenId = null;
let _cachedWorldConfig = null;
let _serverTimeOffset = 0; // serverTimestamp - localTimestamp
let _cachedCloudLeaderboards = {}; // realSeasonId -> list
let _hallOfFameArchive = {}; // realSeasonId -> topClans
let _cloudInitialized = false;

/**
 * 安全尝试初始化微信云开发 (防未开通云开发或未配置环境导致崩溃)
 */
function ensureCloudInit() {
  if (_cloudInitialized) return true;
  if (typeof wx !== 'undefined' && wx.cloud && typeof wx.cloud.init === 'function') {
    try {
      wx.cloud.init({ traceUser: true });
      _cloudInitialized = true;
      return true;
    } catch (_) {
      return false;
    }
  }
  return false;
}

/**
 * 健壮的云函数安全调用器：
 * 1. 自动尝试安全 init
 * 2. 彻底拦截返回 undefined 或报错，杜绝 'Cannot read properties of undefined (reading then)'
 * 3. 失败时自动静默回退，绝不导致小游戏主循环崩溃
 */
function safeCallCloudFunction(params) {
  if (typeof wx === 'undefined' || !wx.cloud || typeof wx.cloud.callFunction !== 'function') {
    return Promise.reject(new Error('CLOUD_NOT_AVAILABLE'));
  }
  ensureCloudInit();
  try {
    const res = wx.cloud.callFunction(params);
    if (res && typeof res.then === 'function') {
      return res;
    }
    return Promise.reject(new Error('CLOUD_RETURNED_UNDEFINED'));
  } catch (err) {
    return Promise.reject(err);
  }
}

/**
 * 计算家族档案防篡改哈希签名
 */
function calculateClanProfileChecksum(family) {
  if (!family) return '';
  const p = (family.clanTrust && family.clanTrust.prestigeScore) || 0;
  const m = (family.clanTrust && family.clanTrust.trustFundMoney) || 0;
  const g = (family.genealogyList && family.genealogyList.length) || 0;
  const id = family.familyId || '';
  const str = `${id}:${family.surname}:${family.province}:${family.hallName}:${p}:${m}:${g}:${SERVER_CLAN_SALT}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

/**
 * 1. 获取用户真实微信 OpenID (支持 wx.login、云开发 login 及本地防抖持久化)
 */
function getUserOpenId(callback) {
  if (_cachedOpenId) {
    if (typeof callback === 'function') callback(null, _cachedOpenId);
    return _cachedOpenId;
  }

  // 1. 读取本地持久化缓存
  try {
    if (typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function') {
      const stored = wx.getStorageSync('LIFESIM_WECHAT_OPENID');
      if (stored && typeof stored === 'string') {
        _cachedOpenId = stored;
        if (typeof callback === 'function') callback(null, _cachedOpenId);
        return _cachedOpenId;
      }
    } else if (typeof localStorage !== 'undefined') {
      const stored = localStorage.getItem('LIFESIM_WECHAT_OPENID');
      if (stored) {
        _cachedOpenId = stored;
        if (typeof callback === 'function') callback(null, _cachedOpenId);
        return _cachedOpenId;
      }
    }
  } catch (_) {}

  // 2. 微信云开发鉴权换取 (安全防护，离线优先)
  safeCallCloudFunction({ name: 'login' })
    .then(res => {
      if (res && res.result && res.result.openid) {
        _cachedOpenId = res.result.openid;
        try {
          if (typeof wx !== 'undefined' && typeof wx.setStorageSync === 'function') {
            wx.setStorageSync('LIFESIM_WECHAT_OPENID', _cachedOpenId);
          }
        } catch (_) {}
        if (typeof callback === 'function') callback(null, _cachedOpenId);
      } else {
        _fallbackOpenId(callback);
      }
    })
    .catch(() => {
      _fallbackOpenId(callback);
    });

  // 3. 模拟与离线回退 OpenID (保证离线唯一性与跨局一致性)
  return _fallbackOpenId(callback);
}

function _fallbackOpenId(callback) {
  if (!_cachedOpenId) {
    let devId = '';
    try {
      if (typeof wx !== 'undefined' && typeof wx.getSystemInfoSync === 'function') {
        const sys = wx.getSystemInfoSync();
        devId = (sys.brand || '') + (sys.model || '');
      }
    } catch (_) {}
    const randPart = Math.random().toString(36).slice(2, 8);
    _cachedOpenId = `wx_openid_${Date.now().toString(36)}_${randPart}`;
    try {
      if (typeof wx !== 'undefined' && typeof wx.setStorageSync === 'function') {
        wx.setStorageSync('LIFESIM_WECHAT_OPENID', _cachedOpenId);
      } else if (typeof localStorage !== 'undefined') {
        localStorage.setItem('LIFESIM_WECHAT_OPENID', _cachedOpenId);
      }
    } catch (_) {}
  }
  if (typeof callback === 'function') callback(null, _cachedOpenId);
  return _cachedOpenId;
}

/**
 * 2. 获取全服世界运行配置 (getWorldConfig: 运营前沿线、现实赛季元数据、网络授时)
 */
function getWorldConfig(callback) {
  if (_cachedWorldConfig) {
    if (typeof callback === 'function') callback(null, _cachedWorldConfig);
    return _cachedWorldConfig;
  }

  const defaultConfig = {
    serverFrontierYear: 2035,
    maxAllowedYear: 3100,
    currentRealSeasonId: 'RS_2026_Q4_HANWEI',
    currentRealSeasonIndex: 1,
    realSeasonName: '2026年第4季度 · 汉魏风骨创世季',
    realSeasonStartTime: 1760000000000,
    realSeasonEndTime: 1764233600000, // 约7周运营期
    isSeasonActive: true,
    serverTimestamp: Date.now()
  };

  safeCallCloudFunction({ name: 'getWorldConfig' })
    .then(res => {
      if (res && res.result && res.result.config) {
        _cachedWorldConfig = Object.assign({}, defaultConfig, res.result.config);
        if (res.result.serverTimestamp) {
          _serverTimeOffset = res.result.serverTimestamp - Date.now();
        }
        if (typeof callback === 'function') callback(null, _cachedWorldConfig);
      } else {
        _cachedWorldConfig = defaultConfig;
        if (typeof callback === 'function') callback(null, defaultConfig);
      }
    })
    .catch(() => {
      _cachedWorldConfig = defaultConfig;
      if (typeof callback === 'function') callback(null, defaultConfig);
    });
  _cachedWorldConfig = defaultConfig;
  return defaultConfig;
}

/**
 * 获取校准后的网络时间戳 (防客户端篡改本地时钟刷每日限额)
 */
function getNetworkTimestamp() {
  return Date.now() + _serverTimeOffset;
}

/**
 * 3. 家族档案跨设备云端持久化、防篡改签名校验与换机一键迎回 (syncFamily)
 */
function syncFamily(familyProfile, callback) {
  if (!familyProfile || typeof familyProfile !== 'object') {
    if (typeof callback === 'function') callback(new Error('Invalid family profile'));
    return false;
  }

  // 绑定 OpenID
  if (!familyProfile.openid) {
    familyProfile.openid = getUserOpenId();
  }

  // 计算安全校验和
  const checksum = calculateClanProfileChecksum(familyProfile);
  familyProfile._cloudChecksum = checksum;
  familyProfile._lastSyncTs = getNetworkTimestamp();

  // 本地镜像先落盘保证秒开
  try {
    const raw = JSON.stringify(familyProfile);
    if (typeof wx !== 'undefined' && typeof wx.setStorageSync === 'function') {
      wx.setStorageSync('LIFESIM_FAMILY_PROFILE_V2', raw);
    } else if (typeof localStorage !== 'undefined') {
      localStorage.setItem('LIFESIM_FAMILY_PROFILE_V2', raw);
    }
  } catch (err) {
    console.warn('[ClanCloudService] 本地存储镜像落盘异常:', err);
  }

  // 异步上行同步至微信云开发/服务器 (安全调用，云不可用时静默保留本地镜像)
  safeCallCloudFunction({
    name: 'clanLeaderboard',
    data: {
      action: 'syncFamily',
      openid: familyProfile.openid,
      familyId: familyProfile.familyId,
      profile: familyProfile,
      checksum: checksum,
      clientTs: Date.now()
    }
  }).then(res => {
    if (res && res.result && res.result.success) {
      console.log(`[ClanCloudService] 家族【${familyProfile.fullName}】云端同步成功！`);
      if (typeof callback === 'function') callback(null, { success: true, synced: true });
    } else if (res && res.result && res.result.reason === 'CLAN_ALREADY_EXISTS') {
      console.warn('[ClanCloudService] 云端已存在传世宗门，拒绝覆盖冲突档案:', res.result);
      if (typeof callback === 'function') callback(new Error('CLAN_ALREADY_EXISTS'), { success: false, existingProfile: res.result.existingProfile });
    } else {
      if (typeof callback === 'function') callback(null, { success: true, synced: false, localOnly: true });
    }
  }).catch(err => {
    if (typeof callback === 'function') callback(null, { success: true, synced: false, offline: true });
  });
  return true;
}

/**
 * 换机跨设备一键迎回家族 (从云端拉取当前 OpenID 绑定的宗族档案)
 */
function recoverFamilyFromCloud(callback) {
  const openid = getUserOpenId();
  safeCallCloudFunction({
    name: 'clanLeaderboard',
    data: {
      action: 'recoverFamily',
      openid: openid
    }
  }).then(res => {
    if (res && res.result && res.result.profile) {
      const cloudFam = res.result.profile;
      const validChecksum = calculateClanProfileChecksum(cloudFam);
      if (!cloudFam._cloudChecksum || cloudFam._cloudChecksum === validChecksum) {
        console.log(`[ClanCloudService] 跨设备成功迎回传世世家：【${cloudFam.fullName}】！`);
        if (typeof callback === 'function') callback(null, cloudFam);
        return;
      }
    }
    if (typeof callback === 'function') callback(null, null);
  }).catch(() => {
    // 云不可用或离线时，安全回调 null，本地继续正常运转
    if (typeof callback === 'function') callback(null, null);
  });
}

/**
 * 4. 真实全服百家榜单动态汇聚与现实赛季定期归档/清零 (fetchClanLeaderboard)
 */
function fetchClanLeaderboard(options = {}, callback) {
  const { realSeasonId = 'RS_2026_Q4_HANWEI', myFamily = null, forceRefresh = false } = options;

  if (!forceRefresh && _cachedCloudLeaderboards[realSeasonId]) {
    const merged = _aggregateWithLocalFamily(_cachedCloudLeaderboards[realSeasonId], myFamily);
    if (typeof callback === 'function') callback(null, merged);
    return merged;
  }

  const fallback = _aggregateWithLocalFamily(SEED_SAMPLE_CLANS, myFamily);

  // 离线或无微信云环境时，立即同步安全降级回调
  if (typeof wx === 'undefined' || !wx.cloud || typeof wx.cloud.callFunction !== 'function') {
    if (typeof callback === 'function') callback(null, fallback);
    return fallback;
  }

  safeCallCloudFunction({
    name: 'clanLeaderboard',
    data: {
      action: 'getLeaderboard',
      seasonId: realSeasonId
    }
  }).then(res => {
    if (res && res.result && Array.isArray(res.result.clans)) {
      _cachedCloudLeaderboards[realSeasonId] = res.result.clans;
      const merged = _aggregateWithLocalFamily(res.result.clans, myFamily);
      if (typeof callback === 'function') callback(null, merged);
    } else {
      if (typeof callback === 'function') callback(null, fallback);
    }
  }).catch(() => {
    if (typeof callback === 'function') callback(null, fallback);
  });
  return fallback;
}

function _aggregateWithLocalFamily(list, myFamily) {
  const cloned = [...list];
  if (myFamily && myFamily.familyId) {
    const idx = cloned.findIndex(c => c.familyId === myFamily.familyId);
    if (idx >= 0) {
      cloned[idx] = myFamily;
    } else {
      cloned.unshift(myFamily);
    }
  }
  return cloned;
}

/**
 * 现实赛季归档与清零 (Season Reset & Hall of Fame Archive)
 */
function archiveSeasonLeaderboard(realSeasonId, currentLeaderboard = []) {
  if (!realSeasonId) return;
  const sorted = [...currentLeaderboard].sort((a, b) => {
    const pa = (a.clanTrust && a.clanTrust.prestigeScore) || 0;
    const pb = (b.clanTrust && b.clanTrust.prestigeScore) || 0;
    return pb - pa;
  });
  _hallOfFameArchive[realSeasonId] = {
    seasonId: realSeasonId,
    archivedAt: getNetworkTimestamp(),
    topClans: sorted.slice(0, 50)
  };
  // 清空当季活跃榜单缓存，开启新赛季竞技！
  delete _cachedCloudLeaderboards[realSeasonId];
  console.log(`[ClanCloudService] 现实赛季【${realSeasonId}】已封存入世家名人堂，当季积分榜清零重置！`);
  return _hallOfFameArchive[realSeasonId];
}

function getHallOfFameArchive(realSeasonId) {
  return realSeasonId ? _hallOfFameArchive[realSeasonId] : _hallOfFameArchive;
}

/**
 * 5. 云函数通道拉取受信任热更包 (fetchContentManifest)
 */
function fetchContentManifest(callback) {
  safeCallCloudFunction({
    name: 'clanLeaderboard',
    data: { action: 'getContentManifest' }
  }).then(res => {
    if (res && res.result && res.result.success && res.result.manifest) {
      if (typeof callback === 'function') callback(null, res.result.manifest);
    } else {
      if (typeof callback === 'function') callback(new Error('Manifest not found'), null);
    }
  }).catch(err => {
    if (typeof callback === 'function') callback(err, null);
  });
}

/**
 * 6. 服务端权威核验联姻庚帖 (verifyAllianceRemote)
 */
function verifyAllianceRemote(invite, targetFamilyId, callback) {
  safeCallCloudFunction({
    name: 'clanLeaderboard',
    data: {
      action: 'verifyAlliance',
      invite,
      targetFamilyId
    }
  }).then(res => {
    if (res && res.result) {
      if (typeof callback === 'function') callback(null, res.result);
    } else {
      if (typeof callback === 'function') callback(new Error('Verify alliance failed'), null);
    }
  }).catch(err => {
    if (typeof callback === 'function') callback(err, null);
  });
}

module.exports = {
  SEED_SAMPLE_CLANS,
  getUserOpenId,
  getWorldConfig,
  getNetworkTimestamp,
  calculateClanProfileChecksum,
  syncFamily,
  recoverFamilyFromCloud,
  fetchClanLeaderboard,
  archiveSeasonLeaderboard,
  getHallOfFameArchive,
  fetchContentManifest,
  verifyAllianceRemote
};
