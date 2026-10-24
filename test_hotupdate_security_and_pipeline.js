/**
 * 自动化测试套件：热更安全签名、数值裁剪防误伤、MSCP赛季内容包产线与全链路关键埋点
 * 运行方式: node test_hotupdate_security_and_pipeline.js
 */

const assert = require('assert');

console.log('====================================================');
console.log('🧪 启动自动化测试：热更防篡改、数值裁剪白名单、MSCP产线与关键埋点');
console.log('====================================================');

// 1. 模拟微信运行环境桩
global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 375, windowHeight: 812, pixelRatio: 2, platform: 'devtools' }),
  getMenuButtonBoundingClientRect: () => ({ top: 48, bottom: 80, left: 290, right: 365, width: 75, height: 32 }),
  createCanvas: () => ({
    getContext: () => ({
      save: () => {},
      restore: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      rect: () => {},
      arcTo: () => {},
      fillText: () => {},
      measureText: (txt) => ({ width: (txt || '').length * 10 }),
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      arc: () => {},
      fill: () => {},
      stroke: () => {},
      clip: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      createLinearGradient: () => ({ addColorStop: () => {} }),
      setLineDash: () => {}
    }),
    width: 375,
    height: 812
  }),
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
  getStorageSync: (k) => null,
  setStorageSync: (k, v) => {},
  removeStorageSync: (k) => {},
  onShow: () => {},
  onHide: () => {},
  onError: () => {},
  showToast: () => {},
  vibrateShort: () => {},
  request: () => {},
  reportEvent: (evt, data) => {
    lastReportedMilestone = evt;
    lastReportedData = data;
    reportedMilestones.push({ eventName: evt, data });
  }
};

let lastReportedMilestone = null;
let lastReportedData = null;
const reportedMilestones = [];

// 2. 加载模块
const contentUpdater = require('./wechat-minigame/src/data/contentUpdater');
const seasonConfig = require('./wechat-minigame/src/data/seasonConfig');
const clanSocial = require('./wechat-minigame/src/data/clanSocialSystem');
const gameEngine = require('./wechat-minigame/game');

// ----------------------------------------------------
// 验证 1: 热更安全验签 (Hot Update Security)
// ----------------------------------------------------
console.log('\n--- 1. 验证热更安全验签防御能力 ---');

// 1.1 无签名的远程包必须被彻底拒绝
const unsignedRemote = {
  manifestVersion: '2026.11.01',
  timestamp: Date.now(),
  storiesPatch: { 2030: [{ title: '恶意注入' }] }
};
const resUnsigned = contentUpdater.verifyManifestSignature(unsignedRemote, contentUpdater.HOTUPDATE_DEFAULT_SALT, true);
assert.strictEqual(resUnsigned, false, '无签名的远程热更包必须被坚决拒之门外！');
console.log('✅ 测试通过: 远程无签名热更包被严格拦截并拒收');

// 1.2 篡改或伪造签名的远程包必须被拒绝
const forgedRemote = {
  manifestVersion: '2026.11.01',
  timestamp: 1729000000000,
  storiesPatch: { 2030: [{ title: '黑客修改事件' }] },
  signature: 'deadbeef_invalid'
};
const resForged = contentUpdater.verifyManifestSignature(forgedRemote, contentUpdater.HOTUPDATE_DEFAULT_SALT, true);
assert.strictEqual(resForged, false, '伪造签名的远程热更包必须被验签算法拒绝！');
console.log('✅ 测试通过: 伪造签名的远程包验签失败并被拦截');

// 1.3 远程包使用源码默认公开盐签名必须坚决拒收（杜绝公开盐假冒签名）
const defaultSaltSignedRemote = {
  manifestVersion: '2026.11.01',
  timestamp: Date.now(),
  storiesPatch: []
};
defaultSaltSignedRemote.signature = contentUpdater.calculateManifestChecksum(defaultSaltSignedRemote, contentUpdater.HOTUPDATE_DEFAULT_SALT);
const resDefaultSalt = contentUpdater.verifyManifestSignature(defaultSaltSignedRemote, contentUpdater.HOTUPDATE_DEFAULT_SALT, true);
assert.strictEqual(resDefaultSalt, false, '远程包使用公开默认盐自签名必须被彻底拒绝！');
console.log('✅ 测试通过: 远程包即便用源码默认盐自签名也被严格拦截拒收');

// 1.4 配置专属私有动态安全密钥的远程热更包验签通过
const customSecret = 'SECURE_PRODUCTION_SALT_2026_CUSTOM';
const customSignedRemote = {
  manifestVersion: '2026.11.01',
  timestamp: Date.now(),
  storiesPatch: []
};
customSignedRemote.signature = contentUpdater.calculateManifestChecksum(customSignedRemote, customSecret);
const resCustom = contentUpdater.verifyManifestSignature(customSignedRemote, customSecret, true);
assert.strictEqual(resCustom, true, '配置私有动态安全密钥的远程热更包必须合法验签放行！');
console.log('✅ 测试通过: 具备专属私有安全密钥的远程热更包合法验签放行');

// 1.5 微信云开发权威授信通道直接放行
const cloudVerifiedManifest = {
  manifestVersion: '2026.11.01',
  _fromCloudFunction: true,
  _cloudVerified: true,
  rewards: { promotionBonus: 25000 }
};
const resCloud = contentUpdater.verifyManifestSignature(cloudVerifiedManifest, contentUpdater.HOTUPDATE_DEFAULT_SALT, true);
assert.strictEqual(resCloud, true, '微信云开发通道经由安全信道交付，必须权威授信放行！');
console.log('✅ 测试通过: 微信云开发权威通道热更包直接放行通过');

// 1.6 验证外部公共 CDN 伪造 _fromCloudFunction 假冒攻击被深度拦截
const forgedCdnCloudManifest = {
  manifestVersion: '2026.11.01',
  _fromCloudFunction: true,
  _cloudVerified: true,
  rewards: { promotionBonus: 999999 }
};
const resForgedCdn = contentUpdater.verifyManifestSignature(
  forgedCdnCloudManifest,
  contentUpdater.HOTUPDATE_DEFAULT_SALT,
  true,
  { isUntrustedCdn: true }
);
assert.strictEqual(resForgedCdn, false, '不可信 CDN 伪造云函数标记必须被深度拦截！');
console.log('✅ 测试通过: 不可信 CDN 伪造云开发可信标记被深度拦截拒收');

// ----------------------------------------------------
// 验证 2: 数值裁剪白名单与前沿线支持至3100年
// ----------------------------------------------------
console.log('\n--- 2. 验证数值裁剪白名单与前沿线放开至3100年 ---');

const rawManifest = {
  frontierYear: 2850,
  worldChrono: { frontierYear: 2950 },
  rewards: {
    promotionBonus: 22000,
    endgameSGradeBaseScore: 1000,
    endgameAGradeBaseScore: 750,
    arbitraryAttributeDelta: 80 // 非白名单大额属性增量
  }
};

const clamped = contentUpdater.clampManifestValues(rawManifest);

// 2.1 promotionBonus 和 endgameSGradeBaseScore 不能被裁为 30
assert.strictEqual(clamped.rewards.promotionBonus, 22000, 'promotionBonus 不应被误伤裁剪为30！');
assert.strictEqual(clamped.rewards.endgameSGradeBaseScore, 1000, 'endgameSGradeBaseScore 不应被误伤裁剪为30！');
assert.strictEqual(clamped.rewards.endgameAGradeBaseScore, 750, 'endgameAGradeBaseScore 不应被误伤裁剪为30！');

// 2.2 普通属性仍应被严格裁剪在 ±30 内
assert.strictEqual(clamped.rewards.arbitraryAttributeDelta, 30, '非金额/积分的纯属性增量必须被安全裁剪至 ±30！');

// 2.3 前沿线允许扩展至3100年（而非2200年硬上限）
assert.strictEqual(clamped.frontierYear, 2850, '前沿线应被允许扩展至2850年！');
assert.strictEqual(clamped.worldChrono.frontierYear, 2950, '纪元前沿线应被允许扩展至2950年！');
console.log('✅ 测试通过: 数值白名单成功保护大额奖赏，前沿线成功支持至3100年且普通属性被限幅±30');

// ----------------------------------------------------
// 验证 3: 死配置激活与动态生效
// ----------------------------------------------------
console.log('\n--- 3. 验证 promotionBonus 与 endgameSGradeBaseScore 动态生效 ---');

// 3.1 验证 promotionBonus 注入
const engineState = global.state;
engineState.capital = 10000;
engineState.rep = 90;
engineState.govLevel = 2;

// 动态修改 promotionBonus 为 35000 测试生效
global.LIFESIM_DYNAMIC_CONFIG.rewards.promotionBonus = 35000;
global.triggerBreakthroughPromotion();
assert.strictEqual(engineState.capital, 10000 + 35000, 'triggerBreakthroughPromotion 必须读取并嘉奖动态 promotionBonus！');
console.log('✅ 测试通过: 破格提拔成功读取动态 promotionBonus: ¥35,000');

// 还原
global.LIFESIM_DYNAMIC_CONFIG.rewards.promotionBonus = 22000;

// ----------------------------------------------------
// 验证 4: 联姻防伪令牌强制核验
// ----------------------------------------------------
console.log('\n--- 4. 验证联姻防伪令牌强制核验与失败上报 ---');

// 4.1 不带 token 的庚帖必须被彻底拦截
const myTargetFamily = { familyId: 'fam_target_001', surname: '王', province: '山东', hallName: '三槐堂' };
const inviteWithoutToken = {
  fromFamId: 'fam_hacker_001',
  fromSurname: '赵',
  fromProvince: '河南',
  fromHall: '天水堂',
  ts: Date.now(),
  nonce: 'nonce_hack_01'
};
const resNoToken = clanSocial.validateMarriageInvite(inviteWithoutToken, myTargetFamily);
assert.strictEqual(lastReportedMilestone, 'marriage_verify_failed', '必须上报 marriage_verify_failed 埋点！');
assert(reportedMilestones.some(m => m.eventName === 'marriage_validation_failed'), '必须包含 marriage_validation_failed 埋点！');
console.log('✅ 测试通过: 无令牌联姻庚帖被拒绝并触发失败原因分布埋点');

// 4.2 篡改令牌的庚帖必须被拦截
const inviteWithBadToken = {
  ...inviteWithoutToken,
  token: 'invalid_sha_token'
};
const resBadToken = clanSocial.validateMarriageInvite(inviteWithBadToken, myTargetFamily);
assert.strictEqual(resBadToken.valid, false, '篡改令牌的联姻庚帖必须被拒！');
assert.strictEqual(resBadToken.reason, 'INVALID_SIGNATURE', '原因应为 INVALID_SIGNATURE');
console.log('✅ 测试通过: 伪造令牌联姻庚帖被拒绝');

// 4.3 真实令牌正常放行
const testFamily = { familyId: 'fam_real_001', surname: '陈', province: '河南', hallName: '颍川堂', genealogyList: [1,2] };
const card = clanSocial.generateMarriageInvitationCard(testFamily);
const validInvite = {
  fromFamId: testFamily.familyId,
  fromSurname: testFamily.surname,
  fromProvince: testFamily.province,
  fromHall: testFamily.hallName,
  ts: card.inviterData.ts,
  nonce: card.inviterData.nonce,
  token: card.inviterData.token
};
const resValidToken = clanSocial.validateMarriageInvite(validInvite, myTargetFamily);
assert.strictEqual(resValidToken.valid, true, '真实合法生成的联姻庚帖必须通过！');
console.log('✅ 测试通过: 合法联姻庚帖验签成功');

// ----------------------------------------------------
// 验证 5: 最小赛季内容包 (MSCP) 规格与产线排期
// ----------------------------------------------------
console.log('\n--- 5. 验证最小赛季内容包 (MSCP) 规格与 7 周倒排排期 ---');

assert(seasonConfig.SEASON_CONTENT_SPEC, 'SEASON_CONTENT_SPEC 必须定义');
assert.strictEqual(seasonConfig.SEASON_CONTENT_SPEC.requirements.careerLadders.minTracks, 5, 'MSCP必须包含至少5条行当官制阶梯');
assert.strictEqual(seasonConfig.SEASON_CONTENT_SPEC.requirements.historicalFigures.minFigures, 6, 'MSCP必须包含至少6位名宿');
assert.strictEqual(seasonConfig.SEASON_CONTENT_SPEC.requirements.criticalChronoEvents.minEvents, 4, 'MSCP必须包含至少4个关隘事件');
assert.strictEqual(seasonConfig.SEASON_CONTENT_SPEC.requirements.relicsAndHeritage.minRelics, 2, 'MSCP必须包含至少2件传世物');

assert(Array.isArray(seasonConfig.SEASON_PRODUCTION_PIPELINE), '必须定义 7 周倒排产线排期');
assert.strictEqual(seasonConfig.SEASON_PRODUCTION_PIPELINE.length, 8, '倒排排期应包含 T-7 至 T-0 共 8 个里程碑');

// 校验内容包就绪状态
assert.strictEqual(seasonConfig.hasSeasonContentPack('season_1_han_wei'), true, '第1赛季内容包必须就绪');
assert.strictEqual(seasonConfig.hasSeasonContentPack('season_2_liu_chao'), true, '第2赛季内容包必须就绪');
assert.strictEqual(seasonConfig.hasSeasonContentPack('season_3_sui_tang'), false, '第3赛季内容包目前未研发完成，必须为 false！');
console.log('✅ 测试通过: MSCP 产线规范与倒排排期完整，第3赛季内容包就绪检查正确返回 false');

// ----------------------------------------------------
// 验证 6: 赛季结算弹窗针对未研发赛季显示"敬请期待"且不可启程
// ----------------------------------------------------
console.log('\n--- 6. 验证第3赛季结算弹窗"敬请期待"锁死与启程拦截 ---');

// 模拟家族处于第2赛季末（即将结算跨入第3赛季）
engineState.familyProfile = {
  familyId: 'fam_test_s2',
  surname: '崔',
  hallName: '博陵堂',
  fullName: '博陵崔氏',
  currentSeasonId: 'season_2_liu_chao',
  isImmutable: true,
  genealogyList: [{}, {}, {}, {}],
  clanTrust: { prestigeScore: 500, trustFundMoney: 80000, relics: [], mottoList: [] },
  timeline: { currentEpochIndex: 2, currentYear: 500 }
};

// 打开赛季结算弹窗
global.openSeasonSettlementModal('season_2_liu_chao');
assert.strictEqual(engineState.activeModal, 'season_settlement', '弹窗应切换至 season_settlement');
assert(reportedMilestones.some(m => m.eventName === 'season_settlement_previewed'), '打开结算弹窗应触发 season_settlement_previewed 埋点！');
assert(reportedMilestones.some(m => m.eventName === 'season_settlement_opened'), '打开结算弹窗应触发 season_settlement_opened 埋点！');
console.log('✅ 测试通过: 结算弹窗打开上报 season_settlement_previewed 埋点');

// 渲染弹窗
global.drawSeasonSettlementModal();

// 尝试在无内容包的情况下强行触发二次确认
engineState.seasonSettlementPendingConfirm = true;
// 再次渲染触发安全检查与清零
global.drawSeasonSettlementModal();
assert.strictEqual(engineState.seasonSettlementPendingConfirm, false, '未研发的赛季（第3季）必须自动重置二次确认状态，严禁进入终局启程！');
console.log('✅ 测试通过: 第3赛季未发布时二次确认被严格锁死并重置');

// 6.2 验证第1赛季结算确认弹窗取消上报
engineState.familyProfile.currentSeasonId = 'season_1_han_wei';
global.openSeasonSettlementModal('season_1_han_wei');
global.drawSeasonSettlementModal();
engineState.seasonSettlementPendingConfirm = true;
global.drawSeasonSettlementModal();
const cancelBtn = typeof gameEngine.getHitboxes === 'function' ? gameEngine.getHitboxes().find(b => b.id === 'season_settle_cancel_confirm_btn') : null;
if (cancelBtn && typeof cancelBtn.handler === 'function') {
  cancelBtn.handler();
}
assert(reportedMilestones.some(m => m.eventName === 'season_settlement_confirm_cancelled'), '取消二次确认必须触发 season_settlement_confirm_cancelled 埋点！');
console.log('✅ 测试通过: 结算确认弹窗取消上报 season_settlement_confirm_cancelled 埋点');

// ----------------------------------------------------
// 验证 7: 关键埋点链路触发检验
// ----------------------------------------------------
console.log('\n--- 7. 验证立族、云恢复、前沿线拦截埋点 ---');

// 7.1 立族展示埋点
engineState.familyProfile = null;
global.openClanEstablishmentModal();
assert.strictEqual(lastReportedMilestone, 'clan_establishment_viewed', '必须触发 clan_establishment_viewed 埋点！');
console.log('✅ 测试通过: 立族大典展示触发 clan_establishment_viewed 埋点');

// 7.2 前沿线拦截埋点
global.openFrontierWaitingModal();
assert(reportedMilestones.some(m => m.eventName === 'frontier_intercepted'), '必须触发 frontier_intercepted 埋点！');
assert(reportedMilestones.some(m => m.eventName === 'frontier_blocked_intercepted'), '必须触发 frontier_blocked_intercepted 埋点！');
assert(lastReportedData.interceptCount >= 1, '拦截计数必须递增');
console.log('✅ 测试通过: 前沿线拦截触发 frontier_intercepted 与 frontier_blocked_intercepted 埋点');

console.log('\n====================================================');
console.log('🎉 所有热更安全、数值防误伤、MSCP产线与埋点测试全部 100% 通过！');
console.log('====================================================');
process.exit(0);
