// 检查配置ID是否为占位符或未配置
function isPlaceholderOrEmpty(id) {
  if (!id || typeof id !== 'string') return true;
  const s = id.trim();
  if (!s) return true;
  if (s.toLowerCase().includes('placeholder')) return true;
  if (s === 'adunit-8f3a9c2e4b1d6075' || s === '1450038291') return true;
  return false;
}

// 游戏动态远程配置中心与本地容灾缓存
const LIFESIM_DYNAMIC_CONFIG = {
  version: '2026.10.12.v2',
  remoteConfigUrl: '',
  bgmUrl: '',
  timeSyncUrl: '',
  // 剧情与数值配置版本管理（支持 CDN 下发 JSON 热更与安全私钥）
  contentVersion: '2026.10.15.v1',
  contentManifestUrl: '',
  hotUpdateSecret: '', // 生产环境私有密钥（或由云函数直发受信任热更），严禁远程使用客户端公开默认盐
  monetization: {
    // 微信公众平台申请的真实激励视频广告位ID（向后兼容默认回退）
    adUnitId: '',
    // 专设广告位：终局家风传承天赋激励视频（流量主场景1）
    inspirationAdUnitId: '',
    // 专设广告位：杏林颐养体魄调摄急救激励视频（流量主场景2）
    emergencyMedicalAdUnitId: '',
    // 专设广告位：【天机重演 · 逆天改命】检定失败逆转激励视频（流量主场景3：高转化）
    rerollFateAdUnitId: '',
    // 专设广告位：【特区内参 · 绝密行情情报】未来3年宏观风口精准预测（流量主场景4：高价值）
    marketIntelAdUnitId: '',
    maxRerollFatePerRun: 1,
    // 资质双模合规开关：
    // false: 纯广告/个人主体合规模式（默认）。关停虚拟支付，文房镇纸通过短片赠送，无资质审核风险。
    // true:  企业主体/有版号虚拟支付模式。拉起米大师虚拟支付，需要企业资质、软著及版号合规备案。
    enableInAppPurchase: false,
    // 米大师支付米币/道具充值OfferId（如：14500xxxxx）
    midasOfferId: '',
    midasBuyQuantity: 60,
    midasPriceFen: 600,
    midasCurrencyType: 'CNY',
    maxAdTalentsPerRun: 1,
    maxTotalHeritageTalents: 5,
    adCooldownMs: 60000,
    // 一次性/长期订阅消息模版ID
    dailySubscribeTemplateId: '',
    // 损失厌恶克制机制：每局仅限调摄急救1次，带10年冷却，严禁频发阻断
    maxEmergencyMedicalPerRun: 1,
    emergencyMedicalCooldownYears: 10,
    // 未成年人保护与防沉迷系统参数标准
    minorProtection: {
      cadpaRating: '12+',
      enforceRealNameAuth: true,
      maxSinglePaymentMinorsUnder16: 50,
      maxMonthlyPaymentMinorsUnder16: 200,
      maxSinglePaymentMinorsUnder18: 100,
      maxMonthlyPaymentMinorsUnder18: 400
    }
  },
  rewards: {
    promotionBonus: 22000,
    endgameSGradeBaseScore: 1000,
    endgameAGradeBaseScore: 750,
    endgameBGradeBaseScore: 500,
    endgameCGradeBaseScore: 250,
    heritageBundleCash: 15000,
    heritageBundleRep: 5
  },
  endingThresholds: {
    gradeS_minScore: 1000,
    gradeA_minScore: 750,
    gradeB_minScore: 500,
    respectableStandingMinRep: 45,
    respectableStandingMinClean: 55
  },
  eventWeights: {
    auditBaseCleanThreshold: 54,
    debtBaseCapitalThreshold: 0,
    healthEmergencyThreshold: 18,
    personalCrisisSlotYears: [29, 41, 51]
  },
  dailyDivinationOverrides: {}
};

function mergeDynamicGameConfig(remote) {
  if (!remote || typeof remote !== 'object') return;
  if (typeof remote.bgmUrl === 'string') LIFESIM_DYNAMIC_CONFIG.bgmUrl = remote.bgmUrl;
  if (typeof remote.timeSyncUrl === 'string') LIFESIM_DYNAMIC_CONFIG.timeSyncUrl = remote.timeSyncUrl;
  if (typeof remote.hotUpdateSecret === 'string') LIFESIM_DYNAMIC_CONFIG.hotUpdateSecret = remote.hotUpdateSecret;
  if (remote.monetization) Object.assign(LIFESIM_DYNAMIC_CONFIG.monetization, remote.monetization);
  if (remote.rewards) Object.assign(LIFESIM_DYNAMIC_CONFIG.rewards, remote.rewards);
  if (remote.endingThresholds) Object.assign(LIFESIM_DYNAMIC_CONFIG.endingThresholds, remote.endingThresholds);
  if (remote.eventWeights) Object.assign(LIFESIM_DYNAMIC_CONFIG.eventWeights, remote.eventWeights);
  if (remote.dailyDivinationOverrides) Object.assign(LIFESIM_DYNAMIC_CONFIG.dailyDivinationOverrides, remote.dailyDivinationOverrides);
}

function initDynamicGameConfig() {
  try {
    let cachedStr = null;
    if (typeof wx !== 'undefined' && typeof wx.getStorageSync === 'function') {
      cachedStr = wx.getStorageSync('lifesim_dynamic_config');
    } else if (typeof localStorage !== 'undefined') {
      cachedStr = localStorage.getItem('lifesim_dynamic_config');
    }
    if (cachedStr) {
      const parsed = typeof cachedStr === 'string' ? JSON.parse(cachedStr) : cachedStr;
      if (parsed && typeof parsed === 'object') {
        mergeDynamicGameConfig(parsed);
      }
    }
  } catch (err) {}
}

function fetchRemoteGameConfig(remoteUrl) {
  const url = remoteUrl || LIFESIM_DYNAMIC_CONFIG.remoteConfigUrl;
  if (!url) return;
  try {
    if (typeof wx !== 'undefined' && typeof wx.request === 'function') {
      wx.request({
        url: url,
        method: 'GET',
        success: (res) => {
          if (res && res.statusCode === 200 && res.data) {
            mergeDynamicGameConfig(res.data);
            try {
              wx.setStorageSync('lifesim_dynamic_config', JSON.stringify(res.data));
            } catch (e) {}
          }
        }
      });
    }
  } catch (e) {}
}

function checkMonetizationDiagnostics() {
  const m = LIFESIM_DYNAMIC_CONFIG.monetization || {};
  const inspAdId = m.inspirationAdUnitId || m.adUnitId || '';
  const emergAdId = m.emergencyMedicalAdUnitId || m.adUnitId || '';
  const midasId = m.midasOfferId || '';
  const subTmplId = m.dailySubscribeTemplateId || '';
  const remoteUrl = LIFESIM_DYNAMIC_CONFIG.remoteConfigUrl || '';
  const manifestUrl = LIFESIM_DYNAMIC_CONFIG.contentManifestUrl || '';

  const diag = {
    inspirationAd: {
      id: inspAdId,
      configured: !isPlaceholderOrEmpty(inspAdId),
      scene: '终局家风传承天赋激励视频'
    },
    emergencyMedicalAd: {
      id: emergAdId,
      configured: !isPlaceholderOrEmpty(emergAdId),
      scene: '杏林颐养体魄急救激励视频'
    },
    inAppPurchase: {
      enabled: Boolean(m.enableInAppPurchase),
      offerId: midasId,
      configured: !isPlaceholderOrEmpty(midasId),
      complianceMode: m.enableInAppPurchase ? '企业资质/道具内购模式' : '个人合规/免版号纯广告模式'
    },
    dailySubscribeTemplate: {
      id: subTmplId,
      configured: !isPlaceholderOrEmpty(subTmplId)
    },
    remoteConfig: {
      url: remoteUrl,
      configured: Boolean(remoteUrl && remoteUrl.startsWith('http'))
    },
    contentManifest: {
      url: manifestUrl,
      version: LIFESIM_DYNAMIC_CONFIG.contentVersion,
      configured: Boolean(manifestUrl && manifestUrl.startsWith('http'))
    }
  };

  diag.allCoreAdsConfigured = diag.inspirationAd.configured && diag.emergencyMedicalAd.configured;
  diag.productionReady = diag.allCoreAdsConfigured && (m.enableInAppPurchase ? diag.inAppPurchase.configured : true);

  return diag;
}

module.exports = {
  isPlaceholderOrEmpty,
  LIFESIM_DYNAMIC_CONFIG,
  mergeDynamicGameConfig,
  initDynamicGameConfig,
  fetchRemoteGameConfig,
  checkMonetizationDiagnostics
};

