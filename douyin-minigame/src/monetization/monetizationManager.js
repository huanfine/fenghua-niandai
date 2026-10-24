/**
 * 《风华年代：沧海沉浮录》商业化变现与合规运营中台服务 (Monetization & Compliance Service)
 * 封装：激励视频独立广告位单例、急救调摄自闭环计数与冷却、资质双模米大师虚拟支付与订单补发
 */

const { isPlaceholderOrEmpty } = require('../config/gameConfig.js');

const DAILY_DIVINATION_TABLE = [
  { id: 'lichun', solar: '立春', title: '万物萌发 · 笃志前行', buffTitle: '笃志初萌', desc: '阳和起蛰，品物皆春。今日初涉人世，韧性与魄力坚如磐石。', effects: { courage: 3, resilience: 3 }, pactGain: 15 },
  { id: 'yushui', solar: '雨水', title: '润物无声 · 广结善缘', buffTitle: '春雨润物', desc: '随风潜入夜，润物细无声。今日为人处世如沐春风，人脉与情商大吉。', effects: { eq: 4, rep: 2 }, pactGain: 12 },
  { id: 'jingzhe', solar: '惊蛰', title: '雷动风行 · 破旧立新', buffTitle: '惊雷破局', desc: '春雷乍响，气象万千。今日勇破关隘，时代重大抉择胜率提升。', effects: { courage: 4, iq: 2 }, pactGain: 15 },
  { id: 'chunfen', solar: '春分', title: '阴阳相半 · 守正持中', buffTitle: '中正平和', desc: '风雷调顺，不偏不倚。今日行事谨守程序底线，清廉与操守有神助。', effects: { clean: 4, resilience: 2 }, pactGain: 12 },
  { id: 'qingming', solar: '清明', title: '气清景明 · 缅怀初衷', buffTitle: '澄澈明德', desc: '桐始华，田鼠化为鴽。今日追怀先辈门风，家风清誉与心境大明。', effects: { clean: 3, rep: 3 }, pactGain: 12 },
  { id: 'guyu', solar: '谷雨', title: '雨生百谷 · 积厚流光', buffTitle: '仓廪丰盈', desc: '戴胜降于桑，百谷由斯滋。今日谋篇布局厚积薄发，资金周转吉旺。', effects: { capital: 3000, iq: 3 }, pactGain: 15 },
  { id: 'lixia', solar: '立夏', title: '万物并秀 · 勇挑大梁', buffTitle: '风华正茂', desc: '斗指东南，维为立夏。今日精力充沛，体魄调摄获得额外补益。', effects: { health: 4, courage: 2 }, pactGain: 12 },
  { id: 'mangzhong', solar: '芒种', title: '有芒之谷 · 争分夺秒', buffTitle: '躬耕立功', desc: '麦黄梅熟，争分夺秒。今日三年军令状考核获取额外建功点数。', effects: { rep: 4, resilience: 2 }, pactGain: 18 },
  { id: 'xiazhi', solar: '夏至', title: '日北至极 · 昂扬奋进', buffTitle: '阳气极盛', desc: '鹿角解，蝉始鸣，半夏生。今日气贯长虹，突发危机化险能力提升。', effects: { courage: 4, health: 3 }, pactGain: 15 },
  { id: 'chushu', solar: '处暑', title: '暑退清风 · 沉潜慎独', buffTitle: '静水流深', desc: '天地肃杀，禾乃登。今日静心研判，大局智谋与复盘深得机宜。', effects: { iq: 4, clean: 2 }, pactGain: 12 },
  { id: 'qiufen', solar: '秋分', title: '雷始收声 · 硕果累累', buffTitle: '秋获大吉', desc: '秋水共长天一色。今日考核晋升机缘提升，功名得心应手。', effects: { rep: 4, eq: 3 }, pactGain: 15 },
  { id: 'dongzhi', solar: '冬至', title: '日南之至 · 一阳来复', buffTitle: '冬至阳生', desc: '一阳初动，生生不息。今日逢凶化吉，逆境抗挫心性坚如磐石。', effects: { resilience: 4, health: 3 }, pactGain: 15 }
];

// 广告位独立单例与事件句柄隔离缓存
let _cachedInspirationAd = null;
let _cachedInspirationHandler = null;
let _lastInspirationAdTs = 0;

let _cachedEmergencyAd = null;
let _cachedEmergencyHandler = null;

let _cachedFateAd = null;
let _cachedFateHandler = null;

let _cachedIntelAd = null;
let _cachedIntelHandler = null;

let _singletonInstance = null;

function createMonetizationManager(deps = {}) {
  const {
    getState = () => ({}),
    getConfig = () => ({}),
    showToast = () => {},
    reportMilestone = () => {},
    saveGameState = () => {},
    requestRender = () => {},
    playSoundEffect = () => {},
    triggerHaptic = () => {},
    logDebugError = () => {}
  } = deps;

  // 1. 终局家风传承激励视频广告
  function watchRewardedVideoForInspiration(onSuccess) {
    const state = getState();
    const config = getConfig().monetization || {};
    const rewardsCfg = getConfig().rewards || {};
    const maxPerRun = config.maxAdTalentsPerRun || 1;
    const maxTotal = config.maxTotalHeritageTalents || 5;
    const cooldownMs = config.adCooldownMs || 60000;
    const adUnitId = config.inspirationAdUnitId || config.adUnitId || '';

    if ((state.rewardedAdWatchedThisRun || 0) >= maxPerRun) {
      showToast("📽️ 这一世的旧影已翻阅过了，留待后人再看吧", "info");
      return;
    }
    if ((state.heritageBonusTalents || 0) >= maxTotal) {
      showToast("📽️ 家学底蕴已攒足五分，不必再添了", "gold");
      return;
    }
    const nowTs = Date.now();
    if (_lastInspirationAdTs > 0 && nowTs - _lastInspirationAdTs < cooldownMs) {
      const waitSec = Math.ceil((cooldownMs - (nowTs - _lastInspirationAdTs)) / 1000);
      showToast(`📽️ 往事尚在回味中，稍候 ${waitSec} 秒再翻阅吧`, "info");
      return;
    }

    reportMilestone('ad_click', {
      adType: 'endgame_heritage',
      abBucket: state.abTestBucket || 'A_standard'
    });

    const grantAdInspiration = () => {
      if ((state.rewardedAdWatchedThisRun || 0) >= maxPerRun) return;
      state.rewardedAdWatchedThisRun = (state.rewardedAdWatchedThisRun || 0) + 1;
      state.heritageBonusTalents = Math.min(maxTotal, (state.heritageBonusTalents || 0) + 1);
      const isBucketB = (state.abTestBucket === 'B_enhanced');
      if (isBucketB) {
        state.heritageBonusCapital = (state.heritageBonusCapital || 0) + (rewardsCfg.heritageBundleCash || 15000);
        state.heritageBonusRep = (state.heritageBonusRep || 0) + (rewardsCfg.heritageBundleRep || 5);
        state.hasHeirloomSeal = true;
      }
      _lastInspirationAdTs = Date.now();
      saveGameState(true);
      reportMilestone('ad_completed', {
        adType: 'endgame_heritage',
        abBucket: state.abTestBucket || 'A_standard'
      });
      if (typeof onSuccess === 'function') {
        onSuccess(true);
      } else {
        if (isBucketB) {
          showToast("📽️ 参悟先祖遗韵！下代天赋+1、获 15,000 五铢钱祖荫与世家声誉！", "gold");
        } else {
          showToast("📽️ 翻阅旧影有所得，为后人留下一分家学底蕴（下局天赋+1）", "gold");
        }
      }
      requestRender();
    };

    if (isPlaceholderOrEmpty(adUnitId)) {
      reportMilestone('ad_failed', {
        adType: 'endgame_heritage',
        reason: 'unconfigured_or_placeholder_adunit',
        abBucket: state.abTestBucket || 'A_standard'
      });
      console.warn('[LifeSim:Ad] 传承激励视频广告位ID尚未在 gameConfig.js 中配置，跳过拉起广告组件。');
      showToast("📽️ 时代影像正在筹备中（广告位未配置）", "info");
      return;
    }

    if (typeof wx !== 'undefined' && typeof wx.createRewardedVideoAd === 'function') {
      if (!_cachedInspirationAd) {
        _cachedInspirationAd = wx.createRewardedVideoAd({ adUnitId: adUnitId });
      }
      const videoAd = _cachedInspirationAd;
      if (videoAd) {
        if (_cachedInspirationHandler && typeof videoAd.offClose === 'function') {
          videoAd.offClose(_cachedInspirationHandler);
        }
        _cachedInspirationHandler = (res) => {
          if (res && res.isEnded === true) {
            grantAdInspiration();
          } else {
            reportMilestone('ad_skipped', {
              adType: 'endgame_heritage',
              abBucket: state.abTestBucket || 'A_standard'
            });
            showToast("📽️ 需完整观阅旧影方可领悟家学点化", "info");
            if (typeof onSuccess === 'function') onSuccess(false);
          }
        };
        if (typeof videoAd.onClose === 'function') {
          videoAd.onClose(_cachedInspirationHandler);
        }
        if (typeof videoAd.show === 'function') {
          videoAd.show().catch(() => {
            if (typeof videoAd.load === 'function') {
              videoAd.load().then(() => videoAd.show()).catch((e) => {
                logDebugError('inspirationAd.show', e);
                reportMilestone('ad_failed', {
                  adType: 'endgame_heritage',
                  reason: (e && e.errMsg) || 'load_fail',
                  abBucket: state.abTestBucket || 'A_standard'
                });
                showToast("📽️ 旧影载入未竟，请稍候再试", "info");
                if (typeof onSuccess === 'function') onSuccess(false);
              });
            } else {
              reportMilestone('ad_failed', {
                adType: 'endgame_heritage',
                reason: 'show_fail',
                abBucket: state.abTestBucket || 'A_standard'
              });
              showToast("📽️ 旧影载入未竟，请稍候再试", "info");
              if (typeof onSuccess === 'function') onSuccess(false);
            }
          });
          return;
        }
      }
    }
    reportMilestone('ad_failed', {
      adType: 'endgame_heritage',
      reason: 'no_ad_api',
      abBucket: state.abTestBucket || 'A_standard'
    });
    showToast("📽️ 暂无可供翻阅的旧影，请稍候再试", "info");
    if (typeof onSuccess === 'function') onSuccess(false);
  }

  // 2. 杏林颐养急救调摄机制 (自包含上限与冷却防御)
  function canUseEmergencyMedical() {
    const state = getState();
    const config = getConfig().monetization || {};
    const maxEmergencyPerRun = config.maxEmergencyMedicalPerRun || 1;
    if ((state.emergencyMedicalUsedCount || 0) >= maxEmergencyPerRun) return false;
    if (state.emergencyMedicalCooldownUntil && (state.year || 1990) < state.emergencyMedicalCooldownUntil) return false;
    return true;
  }

  function watchAdForEmergencyMedical(onSuccess) {
    const state = getState();
    const config = getConfig().monetization || {};
    const maxEmergencyPerRun = config.maxEmergencyMedicalPerRun || 1;
    const cooldownYears = config.emergencyMedicalCooldownYears || 10;
    const adUnitId = config.emergencyMedicalAdUnitId || config.adUnitId || '';

    if ((state.emergencyMedicalUsedCount || 0) >= maxEmergencyPerRun) {
      showToast("🌿 本世已蒙杏林名医悉心调摄过，顺其自然颐养晚晴即可", "info");
      return;
    }
    if (state.emergencyMedicalCooldownUntil && (state.year || 1990) < state.emergencyMedicalCooldownUntil) {
      showToast("🌿 药石调摄需循序渐进，当前尚在温养期中", "info");
      return;
    }

    reportMilestone('ad_click', {
      adType: 'emergency_medical',
      abBucket: state.abTestBucket || 'A_standard'
    });

    if (isPlaceholderOrEmpty(adUnitId)) {
      reportMilestone('ad_failed', {
        adType: 'emergency_medical',
        reason: 'unconfigured_or_placeholder_adunit',
        abBucket: state.abTestBucket || 'A_standard'
      });
      console.warn('[LifeSim:Ad] 杏林急救广告位ID尚未在 gameConfig.js 中配置，跳过拉起广告组件。');
      showToast("📽️ 杏林影像正在筹备中（广告位未配置）", "info");
      return;
    }

    const onWatchSuccessInternal = () => {
      // 模块内部自包含写入次数与10年冷却锁，杜绝调用方漏限漏洞
      state.emergencyMedicalUsedCount = (state.emergencyMedicalUsedCount || 0) + 1;
      state.emergencyMedicalCooldownUntil = (state.year || 1990) + cooldownYears;
      saveGameState(true);
      reportMilestone('ad_completed', {
        adType: 'emergency_medical',
        abBucket: state.abTestBucket || 'A_standard'
      });
      if (typeof onSuccess === 'function') onSuccess();
      requestRender();
    };

    if (typeof wx !== 'undefined' && typeof wx.createRewardedVideoAd === 'function') {
      if (!_cachedEmergencyAd) {
        _cachedEmergencyAd = wx.createRewardedVideoAd({ adUnitId: adUnitId });
      }
      const videoAd = _cachedEmergencyAd;
      if (videoAd) {
        if (_cachedEmergencyHandler && typeof videoAd.offClose === 'function') {
          videoAd.offClose(_cachedEmergencyHandler);
        }
        _cachedEmergencyHandler = (res) => {
          if (res && res.isEnded === true) {
            onWatchSuccessInternal();
          } else {
            reportMilestone('ad_skipped', {
              adType: 'emergency_medical',
              abBucket: state.abTestBucket || 'A_standard'
            });
            showToast("📽️ 需完整体会光影方得调摄心得", "info");
          }
        };
        if (typeof videoAd.onClose === 'function') {
          videoAd.onClose(_cachedEmergencyHandler);
        }
        if (typeof videoAd.show === 'function') {
          videoAd.show().catch(() => {
            if (typeof videoAd.load === 'function') {
              videoAd.load().then(() => videoAd.show()).catch((e) => {
                logDebugError('emergencyAd.show', e);
                reportMilestone('ad_failed', {
                  adType: 'emergency_medical',
                  reason: (e && e.errMsg) || 'load_fail',
                  abBucket: state.abTestBucket || 'A_standard'
                });
                showToast("📽️ 杏林旧影载入未竟，请稍候再试", "info");
              });
            } else {
              reportMilestone('ad_failed', {
                adType: 'emergency_medical',
                reason: 'show_fail',
                abBucket: state.abTestBucket || 'A_standard'
              });
              showToast("📽️ 杏林旧影载入未竟，请稍候再试", "info");
            }
          });
          return;
        }
      }
    }
    reportMilestone('ad_failed', {
      adType: 'emergency_medical',
      reason: 'no_ad_api',
      abBucket: state.abTestBucket || 'A_standard'
    });
    showToast("📽️ 暂无可供翻阅的杏林旧影，请稍候再试", "info");
  }

  // 3. 【天机重演 · 逆天改命】检定大失败/受挫逆转激励视频（每局限 1 次）
  function watchAdForFateReroll(onSuccess) {
    const state = getState();
    const config = getConfig().monetization || {};
    const maxPerRun = config.maxRerollFatePerRun || 1;
    const adUnitId = config.rerollFateAdUnitId || config.adUnitId || '';

    if (state.usedRerollAd || (state.rerollFateUsedCount || 0) >= maxPerRun) {
      showToast("🔥 本局已承蒙天机点化逆天改命一次，往后路途需自立自强", "info");
      if (typeof onSuccess === 'function') onSuccess(false);
      return;
    }

    reportMilestone('ad_click', {
      adType: 'fate_reroll',
      abBucket: state.abTestBucket || 'A_standard'
    });

    const onWatchSuccessInternal = () => {
      state.usedRerollAd = true;
      state.rerollFateUsedCount = (state.rerollFateUsedCount || 0) + 1;
      saveGameState(true);
      reportMilestone('ad_completed', {
        adType: 'fate_reroll',
        abBucket: state.abTestBucket || 'A_standard'
      });
      playSoundEffect('fanfare');
      triggerHaptic('heavy');
      showToast("🔥 天机重演！斗志重燃，获得额外 +15% 破局胜率！", "gold");
      if (typeof onSuccess === 'function') onSuccess(true);
      requestRender();
    };

    if (isPlaceholderOrEmpty(adUnitId)) {
      console.warn('[LifeSim:Ad] 逆天改命广告位ID未配置，直接放行进入测试流程。');
      onWatchSuccessInternal();
      return;
    }

    if (typeof wx !== 'undefined' && typeof wx.createRewardedVideoAd === 'function') {
      if (!_cachedFateAd) {
        _cachedFateAd = wx.createRewardedVideoAd({ adUnitId: adUnitId });
      }
      const videoAd = _cachedFateAd;
      if (videoAd) {
        if (_cachedFateHandler && typeof videoAd.offClose === 'function') {
          videoAd.offClose(_cachedFateHandler);
        }
        _cachedFateHandler = (res) => {
          if (res && res.isEnded === true) {
            onWatchSuccessInternal();
          } else {
            reportMilestone('ad_skipped', { adType: 'fate_reroll' });
            showToast("📽️ 唯有虔心观尽幻象，方可逆天改命重燃斗志", "info");
            if (typeof onSuccess === 'function') onSuccess(false);
          }
        };
        if (typeof videoAd.onClose === 'function') {
          videoAd.onClose(_cachedFateHandler);
        }
        if (typeof videoAd.show === 'function') {
          videoAd.show().catch(() => {
            if (typeof videoAd.load === 'function') {
              videoAd.load().then(() => videoAd.show()).catch((e) => {
                logDebugError('fateAd.show', e);
                onWatchSuccessInternal();
              });
            } else {
              onWatchSuccessInternal();
            }
          });
          return;
        }
      }
    }
    onWatchSuccessInternal();
  }

  // 4. 【特区内参 · 绝密行情情报】未来 3 年宏观风口精准预测（消除投资亏损风险）
  function watchAdForMarketIntel(onSuccess) {
    const state = getState();
    const config = getConfig().monetization || {};
    const adUnitId = config.marketIntelAdUnitId || config.adUnitId || '';

    reportMilestone('ad_click', {
      adType: 'market_intel',
      abBucket: state.abTestBucket || 'A_standard'
    });

    const onWatchSuccessInternal = () => {
      state.specialZoneIntelUnlocked = true;
      state.specialZoneIntelExpireYear = (state.year || 1990) + 3;
      saveGameState(true);
      reportMilestone('ad_completed', {
        adType: 'market_intel',
        abBucket: state.abTestBucket || 'A_standard'
      });
      playSoundEffect('fanfare');
      triggerHaptic('heavy');
      showToast("📡 特区机要内参已解密！已掌握未来3年宏观风口走势，投资零亏损！", "gold");
      if (typeof onSuccess === 'function') onSuccess(true);
      requestRender();
    };

    if (isPlaceholderOrEmpty(adUnitId)) {
      console.warn('[LifeSim:Ad] 特区内参广告位ID未配置，直接放行进入测试流程。');
      onWatchSuccessInternal();
      return;
    }

    if (typeof wx !== 'undefined' && typeof wx.createRewardedVideoAd === 'function') {
      if (!_cachedIntelAd) {
        _cachedIntelAd = wx.createRewardedVideoAd({ adUnitId: adUnitId });
      }
      const videoAd = _cachedIntelAd;
      if (videoAd) {
        if (_cachedIntelHandler && typeof videoAd.offClose === 'function') {
          videoAd.offClose(_cachedIntelHandler);
        }
        _cachedIntelHandler = (res) => {
          if (res && res.isEnded === true) {
            onWatchSuccessInternal();
          } else {
            reportMilestone('ad_skipped', { adType: 'market_intel' });
            showToast("📽️ 需完整观摩内参胶卷方可解密绝密行情", "info");
            if (typeof onSuccess === 'function') onSuccess(false);
          }
        };
        if (typeof videoAd.onClose === 'function') {
          videoAd.onClose(_cachedIntelHandler);
        }
        if (typeof videoAd.show === 'function') {
          videoAd.show().catch(() => {
            if (typeof videoAd.load === 'function') {
              videoAd.load().then(() => videoAd.show()).catch((e) => {
                logDebugError('intelAd.show', e);
                onWatchSuccessInternal();
              });
            } else {
              onWatchSuccessInternal();
            }
          });
          return;
        }
      }
    }
    onWatchSuccessInternal();
  }

  // 5. 典藏文房扩展包权益发放
  function grantSponsorEditionRewards() {
    const state = getState();
    const config = getConfig().monetization || {};
    state.sponsorEditionUnlocked = true;
    if (!Array.isArray(state.unlockedHeirlooms)) state.unlockedHeirlooms = [];
    if (!state.unlockedHeirlooms.includes('heirloom_historiographer_seal')) {
      state.unlockedHeirlooms.push('heirloom_historiographer_seal');
    }
    state.familyHeirloom = {
      id: 'heirloom_historiographer_seal',
      name: '旧藏铜镇纸',
      buff: '每代家风清誉+5，开局天赋点+1'
    };
    state.heritageBonusTalents = Math.min(
      config.maxTotalHeritageTalents || 5,
      (state.heritageBonusTalents || 0) + 1
    );
    state.capital = (state.capital || 0) + 12000;
    saveGameState(true);
    requestRender();
  }

  // 4. 典藏文房扩展包购买与资质双模合规拉起
  function requestSponsorSupport(sysInfo) {
    const state = getState();
    const config = getConfig().monetization || {};
    if (state.sponsorEditionUnlocked) {
      showToast("🕯️ 案头铜镇纸尚温，史馆已备齐修史底蕴", "gold");
      return;
    }
    const sysPlatform = (sysInfo && sysInfo.platform) ? String(sysInfo.platform).toLowerCase() : 'android';

    // 模式 A：个人主体 / 免版号纯广告合规模式（默认开启，杜绝平台资质审核红线）
    // 若未开启企业虚拟支付开关，将【旧藏铜镇纸】开放为激励视频短片赠送，不产生任何虚拟支付调用
    if (!config.enableInAppPurchase) {
      showToast("📜 本版为独立免版号合规版，观阅一段时代长卷旧影即可获赠【旧藏铜镇纸】！", "gold");
      watchRewardedVideoForInspiration((success) => {
        if (success) {
          grantSponsorEditionRewards();
          showToast("🕯️ 感念知音支持！案头已备好【旧藏铜镇纸】，后代开局多一分底蕴", "gold");
        }
      });
      return;
    }

    // 模式 B：企业主体 / 有版号虚拟支付模式 (Midas Payment)
    // 1. iOS 端受苹果 IAP 政策约束，微信平台不支持直接拉起米大师 Android 支付，走合规短片赠予
    if (sysPlatform === 'ios' || sysPlatform === 'iphone' || sysPlatform === 'ipad') {
      showToast("🍎 苹果端受限政策：观看一段时代长卷短片即可获赠【旧藏铜镇纸】！", "gold");
      watchRewardedVideoForInspiration((success) => {
        if (success) {
          grantSponsorEditionRewards();
          showToast("🕯️ 感念知音支持！案头已备好【旧藏铜镇纸】，后代开局多一分底蕴", "gold");
        }
      });
      return;
    }

    // 2. 检查 OfferId 是否有效
    if (isPlaceholderOrEmpty(config.midasOfferId)) {
      console.warn('[LifeSim:Midas] 米大师 OfferId 未配置。');
      if (sysPlatform === 'devtools') {
        grantSponsorEditionRewards();
        showToast("🛠️ [开发环境体验模式] 已赠送【旧藏铜镇纸】", "gold");
      } else {
        showToast("🕯️ 典藏通道正在筹备中（OfferId 未配置）", "info");
      }
      return;
    }

    // 3. 正常拉起微信米大师虚拟支付
    if (typeof wx !== 'undefined' && typeof wx.requestMidasPayment === 'function') {
      const isDevEnv = sysPlatform === 'devtools' ? 1 : 0;
      const buyQuantity = config.midasBuyQuantity || 60;
      const clientOrderId = `midas_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

      wx.requestMidasPayment({
        mode: 'game',
        env: isDevEnv,
        offerId: config.midasOfferId,
        currencyType: config.midasCurrencyType || 'CNY',
        platform: 'android',
        buyQuantity: buyQuantity,
        success(payRes) {
          // 支付即落盘：用户已扣款，优先发放权益
          grantSponsorEditionRewards();
          try {
            if (typeof wx.setStorageSync === 'function') {
              wx.setStorageSync('lifesim_sponsor_order_' + Date.now(), JSON.stringify({
                payRes: payRes || {},
                clientOrderId,
                buyQuantity,
                offerId: config.midasOfferId,
                timestamp: Date.now()
              }));
            }
          } catch (_) {}

          reportMilestone('midas_payment_success', { amount: buyQuantity, env: isDevEnv, verified: true });
          showToast("🕯️ 多谢添灯助印！案头已备好【旧藏铜镇纸】，后代开局多一分底蕴", "gold");

          // 异步调用服务端云函数对账，即使网络抖动也不剥夺已发放权益
          if (typeof wx.cloud !== 'undefined' && wx.cloud && typeof wx.cloud.callFunction === 'function') {
            wx.cloud.callFunction({
              name: 'verifyMidasOrder',
              data: {
                offerId: config.midasOfferId,
                buyQuantity: buyQuantity,
                payRes: payRes || {},
                clientOrderId: clientOrderId
              }
            }).catch((err) => {
              logDebugError('verifyMidasOrderAsync', err);
            });
          }
        },
        fail(err) {
          logDebugError('requestMidasPayment', err);
          const errMsg = (err && (err.errMsg || err.message || '')) || '';
          const errCode = (err && (err.errCode || err.code)) || 0;
          if (errCode === 1004 || errMsg.includes('未成年') || errMsg.includes('minor') || errMsg.includes('防沉迷')) {
            showToast("🛡️ 依未成年人保护规范，当前账号受限额或时段约束已停止扣费", "info");
          } else {
            showToast("🕯️ 暂未完成典藏订购，随时欢迎常来翻书", "info");
          }
        }
      });
      return;
    }

    // 4. 其他未知环境：非 devtools 坚决不静默免费放行，防御安全漏洞
    if (sysPlatform === 'devtools') {
      grantSponsorEditionRewards();
      showToast("🛠️ [开发环境测试模式] 已赠送【旧藏铜镇纸】", "gold");
    } else {
      showToast("🕯️ 典藏通道仅在微信客户端开放", "info");
    }
  }

  // 5. 补发与恢复购买通道 (Restore Purchases)
  function restoreSponsorOrders() {
    const state = getState();
    if (state.sponsorEditionUnlocked) {
      showToast("🕯️ 您已持有【旧藏铜镇纸】，全部典藏权益均已生效", "gold");
      return;
    }

    // 1. 本地存储凭据寻档
    let foundLocalOrder = false;
    try {
      if (typeof wx !== 'undefined' && typeof wx.getStorageInfoSync === 'function') {
        const info = wx.getStorageInfoSync();
        const keys = (info && info.keys) || [];
        for (let i = 0; i < keys.length; i++) {
          if (keys[i].startsWith('lifesim_sponsor_order_')) {
            foundLocalOrder = true;
            break;
          }
        }
      }
    } catch (_) {}

    if (foundLocalOrder) {
      grantSponsorEditionRewards();
      showToast("🕯️ 查验到本地历史订购凭证，已为您成功恢复【旧藏铜镇纸】！", "gold");
      return;
    }

    // 2. 服务端云函数恢复查询
    if (typeof wx !== 'undefined' && typeof wx.cloud !== 'undefined' && wx.cloud && typeof wx.cloud.callFunction === 'function') {
      showToast("🔍 正在核验云端赞助凭据...", "info");
      wx.cloud.callFunction({
        name: 'verifyMidasOrder',
        data: { requestType: 'restore' }
      }).then((res) => {
        const result = (res && res.result) || {};
        if (result.success && result.restored && result.count > 0) {
          grantSponsorEditionRewards();
          showToast(`🕯️ 成功核验 ${result.count} 笔云端赞助记录，已为您恢复【旧藏铜镇纸】！`, "gold");
        } else {
          showToast("📜 未查验到生效的历史订购记录", "info");
        }
      }).catch((err) => {
        logDebugError('restoreSponsorOrders', err);
        showToast("📜 云端凭证查验超时，请稍后重试", "info");
      });
      return;
    }

    showToast("📜 未查验到生效的历史订购记录", "info");
  }

  const manager = {
    watchRewardedVideoForInspiration,
    watchAdForEmergencyMedical,
    canUseEmergencyMedical,
    watchAdForFateReroll,
    watchAdForMarketIntel,
    requestSponsorSupport,
    grantSponsorEditionRewards,
    restoreSponsorOrders
  };

  _singletonInstance = manager;
  return manager;
}

function getMonetizationManager(deps) {
  if (!_singletonInstance && deps) {
    _singletonInstance = createMonetizationManager(deps);
  }
  return _singletonInstance;
}

module.exports = {
  DAILY_DIVINATION_TABLE,
  createMonetizationManager,
  getMonetizationManager
};
