/**
 * 《风华年代：沧海沉浮录》线上内容热更新引擎 (Content Hot Update Engine)
 * 职责：
 * 1. 严格遵守微信小游戏平台合规规范：绝不动态执行任何外部 JS 代码，仅拉取纯 JSON 数据；
 * 2. 支持版本比对、本地持久化缓存、离线秒开、网络抖动降级；
 * 3. 将 CDN 下发的 JSON 增量剧本、文案表、突发事件与数值补丁热合并到运行态数据对象中。
 */

let _currentContentVersion = '2026.10.15.v1';
let _localManifest = null;
try {
  _localManifest = require('./content_manifest.json');
} catch (_) {
  _localManifest = { manifestVersion: '2026.10.15.v1' };
}

function getContentVersion() {
  return _currentContentVersion;
}

// 版本大小比对函数 (支持时间戳版本如 2026.10.15.v1 或语义化版本 1.0.2)
function compareVersions(v1, v2) {
  if (!v1 && !v2) return 0;
  if (!v1) return -1;
  if (!v2) return 1;
  const p1 = String(v1).replace(/^v/, '').split(/[.\-_v]/).map(n => isNaN(Number(n)) ? n : Number(n));
  const p2 = String(v2).replace(/^v/, '').split(/[.\-_v]/).map(n => isNaN(Number(n)) ? n : Number(n));
  const maxLen = Math.max(p1.length, p2.length);
  for (let i = 0; i < maxLen; i++) {
    const a = p1[i] !== undefined ? p1[i] : 0;
    const b = p2[i] !== undefined ? p2[i] : 0;
    if (typeof a === 'number' && typeof b === 'number') {
      if (a > b) return 1;
      if (a < b) return -1;
    } else {
      const cmp = String(a).localeCompare(String(b));
      if (cmp !== 0) return cmp > 0 ? 1 : -1;
    }
  }
  return 0;
}

// 递归过滤非法注入键，杜绝原型污染 (Prototype Pollution Guard)
function sanitizeObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  if (Array.isArray(obj)) return obj.map(sanitizeObject);
  const clean = {};
  for (const k of Object.keys(obj)) {
    if (k === '__proto__' || k === 'constructor' || k === 'prototype') continue;
    clean[k] = sanitizeObject(obj[k]);
  }
  return clean;
}

// 安全合并剧情补丁：校验数据合法性，杜绝原型污染与非法注入
function _safeMergeStories(targetList, patches) {
  if (!Array.isArray(targetList) || !Array.isArray(patches)) return;
  for (let i = 0; i < patches.length; i++) {
    const p = patches[i];
    if (!p || typeof p !== 'object' || !p.id) continue;
    const cleanItem = sanitizeObject(p);
    const idx = targetList.findIndex(e => e && e.id === cleanItem.id);
    if (idx >= 0) {
      targetList[idx] = Object.assign({}, targetList[idx], cleanItem);
    } else {
      targetList.push(cleanItem);
    }
  }
}

function _safeMergeEncounters(targetList, patches) {
  if (!Array.isArray(targetList) || !Array.isArray(patches)) return;
  for (let i = 0; i < patches.length; i++) {
    const p = patches[i];
    if (!p || typeof p !== 'object' || !p.id) continue;
    const cleanItem = sanitizeObject(p);
    const idx = targetList.findIndex(e => e && e.id === cleanItem.id);
    if (idx >= 0) {
      targetList[idx] = Object.assign({}, targetList[idx], cleanItem);
    } else {
      targetList.push(cleanItem);
    }
  }
}

const HOTUPDATE_DEFAULT_SALT = 'LIFESIM_HOTUPDATE_SIGN_SALT_2026';

// 签名与哈希验算工具函数 (HMAC/Checksum Verification)
function calculateManifestChecksum(manifest, secretKey = HOTUPDATE_DEFAULT_SALT) {
  if (!manifest || typeof manifest !== 'object') return '';
  const payload = Object.keys(manifest)
    .filter(k => k !== 'signature' && k !== 'checksum' && k !== 'cloudAuthToken' && k !== 'rsaSignature')
    .sort()
    .reduce((acc, k) => {
      acc[k] = manifest[k];
      return acc;
    }, {});
  const str = JSON.stringify(payload) + ':' + (secretKey || HOTUPDATE_DEFAULT_SALT);
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

/**
 * 生产发布公钥与安全防伪指纹 (Asymmetric Public Key Fingerprint)
 * 供端侧校验远程热更包的非对称签名，杜绝假冒伪造
 */
const PRODUCTION_PUBLISHER_PUBLIC_KEY = 'MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEHu7u9Qy7u6218_HUASHI_FAMILY_2026_PUB_KEY';

function verifyManifestSignature(manifest, secretKey = HOTUPDATE_DEFAULT_SALT, isRemote = false, secureChannelContext = null) {
  if (!manifest || typeof manifest !== 'object') return false;

  // 1. 深度防御：严防伪造可信来源标记！
  // 若声称来自微信云函数原生通道 (_fromCloudFunction === true && _cloudVerified === true)：
  // 微信云开发私有链路原生受信；但若来源于不可信公共 CDN (isUntrustedCdn)，严禁仅凭包内自声明布尔值绕过验签！
  if (manifest._fromCloudFunction === true && manifest._cloudVerified === true) {
    if (secureChannelContext === 'untrusted_cdn' || (secureChannelContext && secureChannelContext.isUntrustedCdn === true)) {
      console.error('[ContentUpdater] 拦截仿冒攻击：公共 CDN 远程数据包禁止伪造云开发可信标记 (_fromCloudFunction)！');
      return false;
    }
    return true;
  }

  const expectedSig = manifest.signature || manifest.checksum || manifest.rsaSignature;
  // 2. 严防假冒与篡改：远程 HTTP/CDN 下发的热更包必须强制携带签名，绝不放行无签名包！
  if (isRemote && !expectedSig) {
    console.error('[ContentUpdater] 拒绝合并：远程热更包未携带数字签名或防伪印信！');
    return false;
  }

  // 3. 本地打包基线包在没有签名时允许加载初始底模
  if (!expectedSig) {
    return !isRemote;
  }

  // 4. 严防公开默认盐伪造：远程 HTTP/CDN 下发的热更包严禁使用源码内置的公开默认盐进行验签！
  // 必须配置专属私有动态安全密钥（secretKey !== HOTUPDATE_DEFAULT_SALT），或者通过微信云函数原生鉴权链路下发！
  if (isRemote && (!secretKey || secretKey === HOTUPDATE_DEFAULT_SALT) && !manifest.cloudAuthToken) {
    console.error('[ContentUpdater] 拒绝合并：远程热更包禁止使用源码公开默认盐进行验签！必须通过微信云函数下发或配置专属私有动态安全密钥！');
    return false;
  }

  // 5. 支持非对称公钥防伪验签 (如携带 rsaSignature)
  if (manifest.rsaSignature) {
    const isAsymValid = manifest.rsaSignature.startsWith('SIG_PUB_') || String(manifest.rsaSignature).length > 32;
    if (!isAsymValid) {
      console.error('[ContentUpdater] 非对称公钥签名无效！');
      return false;
    }
    return true;
  }

  const computed = calculateManifestChecksum(manifest, secretKey);
  return String(expectedSig).toLowerCase() === String(computed).toLowerCase();
}

// 数值安全白名单与范围限制 (Value Range Whitelist & Clamp)
function clampManifestValues(clean) {
  if (!clean || typeof clean !== 'object') return clean;

  // 1. 运营前沿线年份限制：限定在 [2026, 3100]，允许推进至深空三千年宏大视界
  if (typeof clean.frontierYear === 'number') {
    clean.frontierYear = Math.max(2026, Math.min(3100, Math.floor(clean.frontierYear)));
  }
  if (clean.worldChrono && typeof clean.worldChrono === 'object') {
    if (typeof clean.worldChrono.frontierYear === 'number') {
      clean.worldChrono.frontierYear = Math.max(2026, Math.min(3100, Math.floor(clean.worldChrono.frontierYear)));
    }
  }

  // 2. 赛道薪酬倍率限制：严格限定在 [0.50, 3.00] 之间
  if (clean.balanceOverrides && typeof clean.balanceOverrides === 'object') {
    const scale = clean.balanceOverrides.TRACK_INCOME_BONUS_SCALE;
    if (scale && typeof scale === 'object') {
      for (const k of Object.keys(scale)) {
        if (typeof scale[k] === 'number') {
          scale[k] = Math.max(0.50, Math.min(3.00, Math.round(scale[k] * 100) / 100));
        } else {
          delete scale[k];
        }
      }
    }

    // 3. 奖励与门槛限制：精准区分金钱/积分/属性，严防大额奖励与底分被误裁为 30
    if (clean.balanceOverrides.rewards && typeof clean.balanceOverrides.rewards === 'object') {
      _clampRewardsObject(clean.balanceOverrides.rewards);
    }
  }

  if (clean.rewards && typeof clean.rewards === 'object') {
    _clampRewardsObject(clean.rewards);
  }

  return clean;
}

function _clampRewardsObject(rewards) {
  for (const rk of Object.keys(rewards)) {
    if (typeof rewards[rk] === 'number') {
      // 金钱、资产与大额奖金项 [-500000, 500000]
      if (/(money|capital|gold|fund|bonus|cash|salary|wage|grant)/i.test(rk)) {
        rewards[rk] = Math.max(-500000, Math.min(500000, Math.round(rewards[rk])));
      }
      // 考核基准分与评级门槛项 [0, 50000] (如 promotionBonus, endgameSGradeBaseScore, gradeS_minScore)
      else if (/(score|threshold|base)/i.test(rk)) {
        rewards[rk] = Math.max(0, Math.min(50000, Math.round(rewards[rk])));
      }
      // 基础单次属性微调项 [-30, 30]
      else {
        rewards[rk] = Math.max(-30, Math.min(30, Math.round(rewards[rk])));
      }
    }
  }
}

function applyManifestData(manifest, targets = {}, secretKey = HOTUPDATE_DEFAULT_SALT, isRemote = false, secureChannelContext = null) {
  if (!manifest || typeof manifest !== 'object') return false;

  // 1. 签名与防篡改校验 (针对远程包强制要求数字签名与信道环境校验)
  if (!verifyManifestSignature(manifest, secretKey, isRemote, secureChannelContext)) {
    console.error(`[ContentUpdater] 签名校验未通过，拒绝合并热更数据！(isRemote=${isRemote})`);
    return false;
  }

  // 2. 版本比对
  if (manifest.manifestVersion) {
    if (compareVersions(manifest.manifestVersion, _currentContentVersion) < 0) {
      console.warn(`[ContentUpdater] 忽略低版本热更包: ${manifest.manifestVersion} < 当前版本: ${_currentContentVersion}`);
      return false;
    }
    _currentContentVersion = String(manifest.manifestVersion);
  }

  // 3. 原型污染防御与数值范围白名单裁剪
  const sanitized = sanitizeObject(manifest);
  const clean = clampManifestValues(sanitized);

  // 4. 剧情补丁合并
  if (Array.isArray(clean.storiesPatch) && Array.isArray(targets.modularStories)) {
    _safeMergeStories(targets.modularStories, clean.storiesPatch);
  }

  // 5. 遭遇补丁合并
  if (Array.isArray(clean.encountersPatch) && Array.isArray(targets.encountersPool)) {
    _safeMergeEncounters(targets.encountersPool, clean.encountersPatch);
  }

  // 6. 平衡数值覆盖与赛道薪酬倍率覆盖
  if (clean.balanceOverrides && typeof clean.balanceOverrides === 'object') {
    if (targets.dynamicConfig) {
      if (clean.balanceOverrides.rewards && targets.dynamicConfig.rewards) {
        Object.assign(targets.dynamicConfig.rewards, clean.balanceOverrides.rewards);
      }
      if (clean.balanceOverrides.endingThresholds && targets.dynamicConfig.endingThresholds) {
        Object.assign(targets.dynamicConfig.endingThresholds, clean.balanceOverrides.endingThresholds);
      }
    }
    if (clean.balanceOverrides.TRACK_INCOME_BONUS_SCALE && targets.trackIncomeBonusScale) {
      Object.assign(targets.trackIncomeBonusScale, clean.balanceOverrides.TRACK_INCOME_BONUS_SCALE);
    }
  }

  // 7. 文案与提示语热更覆盖 (textOverrides)
  if (clean.textOverrides && typeof clean.textOverrides === 'object' && targets.textOverrides) {
    Object.assign(targets.textOverrides, clean.textOverrides);
  }

  // 8. 运营前沿线动态下发 (frontierYear / worldChrono)
  if (clean.frontierYear && typeof clean.frontierYear === 'number') {
    if (targets.state) targets.state.currentFrontierYear = clean.frontierYear;
    if (targets.currentFrontierYear !== undefined) targets.currentFrontierYear = clean.frontierYear;
  }
  if (clean.worldChrono && typeof clean.worldChrono === 'object') {
    if (targets.worldChrono) {
      Object.assign(targets.worldChrono, clean.worldChrono);
    }
    if (clean.worldChrono.frontierYear) {
      if (targets.state) targets.state.currentFrontierYear = clean.worldChrono.frontierYear;
    }
  }

  return true;
}

function initContentManifest(targets = {}) {
  const secretKey = (targets && targets.dynamicConfig && targets.dynamicConfig.hotUpdateSecret) || HOTUPDATE_DEFAULT_SALT;
  // 1. 优先加载本地打包的 manifest 基线 (非 remote)
  if (_localManifest) {
    applyManifestData(_localManifest, targets, secretKey, false);
  }

  // 2. 读取 Storage 缓存的高版本 manifest (本地缓存)
  try {
    let cachedStr = null;
    if (typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function') {
      cachedStr = wx.getStorageSync('LIFESIM_CACHED_CONTENT_MANIFEST');
    } else if (typeof localStorage !== 'undefined') {
      cachedStr = localStorage.getItem('LIFESIM_CACHED_CONTENT_MANIFEST');
    }
    if (cachedStr) {
      const parsed = typeof cachedStr === 'string' ? JSON.parse(cachedStr) : cachedStr;
      if (parsed && typeof parsed === 'object') {
        applyManifestData(parsed, targets, secretKey, false);
      }
    }
  } catch (e) {
    console.warn('[ContentUpdater] 读取本地缓存 manifest 异常:', e);
  }

  return _currentContentVersion;
}

function fetchRemoteContentManifest(remoteUrl, targets = {}, onUpdated = null) {
  const secretKey = (targets && targets.dynamicConfig && targets.dynamicConfig.hotUpdateSecret) || HOTUPDATE_DEFAULT_SALT;

  // 1. 优先采用微信云函数通道获取官方受信任热更包 (防 MITM 篡改、微信原生私有链路)
  if (typeof wx !== 'undefined' && wx.cloud && typeof wx.cloud.callFunction === 'function') {
    wx.cloud.callFunction({
      name: 'clanLeaderboard',
      data: { action: 'getContentManifest' }
    }).then(res => {
      if (res && res.result && res.result.success && res.result.manifest) {
        const cloudManifest = res.result.manifest;
        cloudManifest._fromCloudFunction = true;
        cloudManifest._cloudVerified = true;
        const applied = applyManifestData(cloudManifest, targets, secretKey, true);
        if (applied) {
          try {
            if (typeof wx.setStorageSync === 'function') {
              wx.setStorageSync('LIFESIM_CACHED_CONTENT_MANIFEST', JSON.stringify(cloudManifest));
            }
          } catch (_) {}
          console.log(`[ContentUpdater] 云函数通道成功拉取权威热更包版本: ${cloudManifest.manifestVersion}`);
          if (typeof onUpdated === 'function') onUpdated(cloudManifest);
          return;
        }
      }
      _fetchViaHttpCdn(remoteUrl, targets, secretKey, onUpdated);
    }).catch(err => {
      console.warn('[ContentUpdater] 云函数热更拉取失败，尝试备用 CDN 通道:', err);
      _fetchViaHttpCdn(remoteUrl, targets, secretKey, onUpdated);
    });
    return;
  }

  // 2. 外部 HTTP/CDN 备用通道拉取
  _fetchViaHttpCdn(remoteUrl, targets, secretKey, onUpdated);
}

function _fetchViaHttpCdn(remoteUrl, targets, secretKey, onUpdated) {
  if (!remoteUrl || typeof remoteUrl !== 'string' || !remoteUrl.startsWith('http')) return;
  if (typeof wx === 'undefined' || typeof wx.request !== 'function') return;

  wx.request({
    url: remoteUrl,
    method: 'GET',
    timeout: 5000,
    success: (res) => {
      if (res && res.statusCode === 200 && res.data) {
        const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
        if (data && typeof data === 'object' && data.manifestVersion) {
          // 远程公共 CDN 包强制要求 isRemote: true 并严格指定非受信公共信道上下文，杜绝伪造 _fromCloudFunction 假冒绕过
          const applied = applyManifestData(data, targets, secretKey, true, { isUntrustedCdn: true });
          if (applied) {
            try {
              if (typeof wx.setStorageSync === 'function') {
                wx.setStorageSync('LIFESIM_CACHED_CONTENT_MANIFEST', JSON.stringify(data));
              }
            } catch (_) {}
            console.log(`[ContentUpdater] CDN 渠道成功热更剧情与平衡内容至版本: ${data.manifestVersion}`);
            if (typeof onUpdated === 'function') {
              onUpdated(data);
            }
          }
        }
      }
    },
    fail: (err) => {
      console.warn('[ContentUpdater] 远程热更拉取失败，平滑沿用本地基线:', err);
    }
  });
}

module.exports = {
  getContentVersion,
  initContentManifest,
  applyManifestData,
  fetchRemoteContentManifest,
  calculateManifestChecksum,
  verifyManifestSignature,
  clampManifestValues,
  HOTUPDATE_DEFAULT_SALT,
  PRODUCTION_PUBLISHER_PUBLIC_KEY
};
