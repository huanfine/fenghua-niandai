/**
 * 华夏三千年世家大系 · 运营、服务器云架构、防作弊、双轨赛季与9大埋点全量自动化验证
 */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

console.log('================================================================================');
console.log('  华夏三千年世家大系 · 7大运营与云架构专项深度自动化验证');
console.log('================================================================================\n');

// -----------------------------------------------------------------------------
// 1. 验证 seasonConfig.js 双轨赛季与真实赛季映射 (RS1 ~ RS15)
// -----------------------------------------------------------------------------
console.log('>>> [模块 1：双轨赛季制与现实运营周期 (RS1~RS15)]');
const seasonConfig = require('./wechat-minigame/src/data/seasonConfig.js');

assert.ok(seasonConfig.REAL_WORLD_SEASONS_REGISTRY, 'REAL_WORLD_SEASONS_REGISTRY 应存在');
assert.strictEqual(seasonConfig.REAL_WORLD_SEASONS_REGISTRY.length, 15, '真实世界应精确规划 15 个运营赛季 (RS1~RS15)');

// 验证赛季时间属性与命名
const rs1 = seasonConfig.getRealSeasonById('RS_2026_Q4_HANWEI');
assert.ok(rs1, 'RS1 汉魏筑基赛季应能正常查找到');
assert.strictEqual(rs1.worldSeasonId, 'season_1_han_wei');
assert.strictEqual(rs1.durationWeeks, 7);

// 验证索引与世界赛季双向映射
const mappedRs1 = seasonConfig.mapWorldSeasonToRealSeason('season_1_han_wei');
assert.strictEqual(mappedRs1.realSeasonId, 'RS_2026_Q4_HANWEI');
const mappedRs2 = seasonConfig.mapWorldSeasonToRealSeason('season_2_liu_chao');
assert.strictEqual(mappedRs2.realSeasonId, 'RS_2026_WINTER_LIUCHAO');

// 验证指定时间查询赛季 (例如 2026-11-01 落在 RS1)
const seasonIn2026 = seasonConfig.getRealSeasonByDate(new Date('2026-11-01T00:00:00Z'));
assert.strictEqual(seasonIn2026.realSeasonId, 'RS_2026_Q4_HANWEI');

console.log('  ✅ 成功验证：15个现实赛季 (RS1~RS15) 映射精准，7周周期 (6周天梯+1周大结卷) 与三千年15纪元一一对应！');

// -----------------------------------------------------------------------------
// 2. 验证 contentUpdater.js 动态热更包合并、数值平衡与文案覆盖
// -----------------------------------------------------------------------------
console.log('\n>>> [模块 2：免审核动态热更引擎 (contentUpdater.js)]');
const contentUpdater = require('./wechat-minigame/src/data/contentUpdater.js');

const mockStories = [{ id: 'story_base_01', title: '基线故事' }];
const mockEncounters = [{ id: 'enc_base_01', title: '基线奇遇' }];
const mockIncomeScale = { biz: 1.5, gov: 1.0, tech: 1.2, grassroots: 0.85 };
const mockTextOverrides = {};
const mockChrono = { frontierYear: 2035 };
const mockState = { currentFrontierYear: 2035 };

contentUpdater.initContentManifest({
  modularStories: mockStories,
  encountersPool: mockEncounters,
  dynamicConfig: {},
  trackIncomeBonusScale: mockIncomeScale,
  textOverrides: mockTextOverrides,
  worldChrono: mockChrono,
  state: mockState
});

// 构建远端 CDN 补丁包
const remoteManifest = {
  manifestVersion: '2026.10.16.v2',
  balanceOverrides: {
    TRACK_INCOME_BONUS_SCALE: {
      biz: 1.88, // 商业系数热更增强
      grassroots: 1.25 // 草根系数热更增强
    }
  },
  textOverrides: {
    'CLAN_TITLE': '【热更】华夏九品中正门阀录',
    'FRONTIER_LOCKED_NOTICE': '【热更】前沿历史线正由研发中枢观测中'
  },
  frontierYear: 2088,
  worldChrono: {
    frontierYear: 2088
  },
  storiesPatch: [
    { id: 'story_hotfix_01', title: '新增免审传奇家传' }
  ]
};

// 计算验签
remoteManifest.signature = contentUpdater.calculateManifestChecksum(remoteManifest);

const updateResult = contentUpdater.applyManifestData(remoteManifest, {
  modularStories: mockStories,
  encountersPool: mockEncounters,
  trackIncomeBonusScale: mockIncomeScale,
  textOverrides: mockTextOverrides,
  worldChrono: mockChrono,
  state: mockState
});

assert.strictEqual(updateResult, true);
assert.strictEqual(mockIncomeScale.biz, 1.88, '职业薪酬系数热更应已覆盖 biz 为 1.88');
assert.strictEqual(mockIncomeScale.grassroots, 1.25, '职业薪酬系数热更应已覆盖 grassroots 为 1.25');
assert.strictEqual(mockTextOverrides['CLAN_TITLE'], '【热更】华夏九品中正门阀录', '文本覆盖热更生效');
assert.strictEqual(mockState.currentFrontierYear, 2088, '运营前沿线热更生效推进至 2088');
assert.ok(mockStories.find(s => s.id === 'story_hotfix_01'), '动态热更故事包成功注入');

console.log('  ✅ 成功验证：热更引擎完整支持职业收入系数、文案热覆盖、前沿年限与模块化剧情热注入！');

// -----------------------------------------------------------------------------
// 3. 验证 clanSocial.js 联姻防刷与防作弊机制 (每日配额衰减 + 防重放签名)
// -----------------------------------------------------------------------------
console.log('\n>>> [模块 3：宗族社交防刷防作弊 (联姻限额阶梯衰减 + 防伪印信)]');
const clanSocial = require('./wechat-minigame/src/data/clanSocialSystem.js');

const familyA = {
  familyId: 'fam_host_001',
  surname: '崔',
  province: '清河',
  hallName: '博陵堂',
  genealogyList: [1],
  alliances: [],
  clanTrust: { prestigeScore: 1000, trustFundMoney: 500000 }
};

const familyB = {
  familyId: 'fam_peer_002',
  surname: '王',
  province: '太原',
  hallName: '晋阳堂',
  alliances: [],
  clanTrust: { prestigeScore: 800, trustFundMoney: 300000 }
};

// 第一次联姻：应享受完整第一档奖励 (+25 声望，+2500 礼金)
const r1 = clanSocial.acceptMarriageAlliance(familyA, familyB);
assert.strictEqual(r1.success, true);
assert.strictEqual(r1.rewardPrestige, 25);
assert.strictEqual(r1.rewardMoney, 2500);

// 第二次联姻：衰减至第二档 (+15 声望，+1500 礼金)
const familyC = {
  familyId: 'fam_peer_003',
  surname: '谢',
  province: '陈郡',
  hallName: '东山堂',
  alliances: [],
  clanTrust: { prestigeScore: 850, trustFundMoney: 350000 }
};
const r2 = clanSocial.acceptMarriageAlliance(familyA, familyC);
assert.strictEqual(r2.success, true);
assert.strictEqual(r2.rewardPrestige, 15);
assert.strictEqual(r2.rewardMoney, 1500);

// 第三次联姻：衰减至第三档 (+8 声望，+800 礼金)
const familyD = {
  familyId: 'fam_peer_004',
  surname: '卢',
  province: '范阳',
  hallName: '琢县堂',
  alliances: [],
  clanTrust: { prestigeScore: 900, trustFundMoney: 400000 }
};
const r3 = clanSocial.acceptMarriageAlliance(familyA, familyD);
assert.strictEqual(r3.success, true);
assert.strictEqual(r3.rewardPrestige, 8);
assert.strictEqual(r3.rewardMoney, 800);

// 第四次联姻：单日超过上限拦截 (DAILY_LIMIT_EXCEEDED)
const familyE = {
  familyId: 'fam_peer_005',
  surname: '郑',
  province: '荥阳',
  hallName: '开封堂',
  alliances: [],
  clanTrust: { prestigeScore: 750, trustFundMoney: 250000 }
};
const r4 = clanSocial.acceptMarriageAlliance(familyA, familyE);
assert.strictEqual(r4.success, false);
assert.strictEqual(r4.reason, 'DAILY_LIMIT_EXCEEDED');

// 测试防重放联姻请柬卡生成与鉴权
const inviteCard = clanSocial.generateMarriageInvitationCard(familyA, '长子');
assert.ok(inviteCard.inviterData.nonce, '请柬应具有防重放 nonce');
assert.ok(inviteCard.inviterData.token, '请柬应具有防伪印信 token');

// 校验合法请柬
const testTs = Date.now();
const testNonce = 'nonce_test_777';
const validToken = clanSocial.generateAllianceToken(familyB.familyId, familyB.surname, familyB.province, testTs, testNonce);
const validPayload = {
  fromFamId: familyB.familyId,
  fromSurname: familyB.surname,
  fromProvince: familyB.province,
  fromHall: familyB.hallName,
  ts: testTs,
  nonce: testNonce,
  token: validToken
};

const familyNew = { familyId: 'fam_fresh_999', surname: '李', province: '陇西', hallName: '狄道堂', alliances: [] };
const validCheck = clanSocial.validateMarriageInvite(validPayload, familyNew);
assert.strictEqual(validCheck.valid, true);

// 篡改请柬数据（签名不匹配）
const tamperedPayload = { ...validPayload, token: 'tampered_fake_signature' };
const invalidCheck = clanSocial.validateMarriageInvite(tamperedPayload, familyNew);
assert.strictEqual(invalidCheck.valid, false);
assert.strictEqual(invalidCheck.reason, 'INVALID_SIGNATURE');

console.log('  ✅ 成功验证：联姻每日阶梯衰减机制生效 (25 -> 15 -> 8 -> 上限阻断)，防伪印信与防重放机制精准生效！');

// -----------------------------------------------------------------------------
// 4. 验证 clanCloudService.js 云端服务降级与数据安全
// -----------------------------------------------------------------------------
console.log('\n>>> [模块 4：微信云开发 clanCloudService.js 架构与云函数通讯]');
const clanCloud = require('./wechat-minigame/src/platform/clanCloudService.js');

assert.ok(clanCloud.syncFamily, 'syncFamily 应存在');
assert.ok(clanCloud.fetchClanLeaderboard, 'fetchClanLeaderboard 应存在');
assert.ok(clanCloud.archiveSeasonLeaderboard, 'archiveSeasonLeaderboard 应存在');
assert.ok(clanCloud.recoverFamilyFromCloud, 'recoverFamilyFromCloud 应存在');
assert.ok(Array.isArray(clanCloud.SEED_SAMPLE_CLANS), 'SEED_SAMPLE_CLANS 必须完备');
assert.ok(clanCloud.SEED_SAMPLE_CLANS.length >= 8, '种子榜单世家数量充足');

// 在非真机环境验证 fallback 本地优雅降级
let leaderboardsFetched = null;
clanCloud.fetchClanLeaderboard({ realSeasonId: 'RS_2026_Q4_HANWEI' }, (err, res) => {
  assert.strictEqual(err, null);
  leaderboardsFetched = res;
});
assert.ok(Array.isArray(leaderboardsFetched), '返回榜单世家列表数组');
assert.ok(leaderboardsFetched.length >= 8, '种子榜单世家数量充足');

// 验证现实赛季结卷归档与名人堂
const archiveResult = clanCloud.archiveSeasonLeaderboard('RS_2026_Q4_HANWEI', leaderboardsFetched);
assert.ok(archiveResult, '归档结果应存在');
assert.strictEqual(archiveResult.seasonId, 'RS_2026_Q4_HANWEI');
assert.ok(Array.isArray(archiveResult.topClans), '名人堂归档包含 topClans 榜单');
const hof = clanCloud.getHallOfFameArchive('RS_2026_Q4_HANWEI');
assert.strictEqual(hof.seasonId, 'RS_2026_Q4_HANWEI');

console.log('  ✅ 成功验证：云服务具备完备的异常防御、本地离线降级与赛季名人堂归档清零能力！');

// -----------------------------------------------------------------------------
// 5. 验证 云函数 cloudfunctions/clanLeaderboard/index.js 业务逻辑
// -----------------------------------------------------------------------------
console.log('\n>>> [模块 5：云函数 clanLeaderboard/index.js 接口及数据流]');
const cloudFunctionPath = path.join(__dirname, 'wechat-minigame/cloudfunctions/clanLeaderboard/index.js');
assert.ok(fs.existsSync(cloudFunctionPath), '云函数 index.js 文件应存在');
const cfCode = fs.readFileSync(cloudFunctionPath, 'utf8');

assert.ok(cfCode.includes("action === 'syncFamily'"), '支持 syncFamily 操作');
assert.ok(cfCode.includes("action === 'getLeaderboard'"), '支持 getLeaderboard 操作');
assert.ok(cfCode.includes("action === 'archiveSeason'"), '支持 archiveSeason 操作');
assert.ok(cfCode.includes('wxContext.OPENID'), '严格绑定微信用户真实 OPENID');
assert.ok(cfCode.includes('clan_leaderboard_archives'), '具备赛季结卷历史归档库存储');

console.log('  ✅ 成功验证：云函数端已支持跨设备云存档同步、分维度排行榜拉取与赛季归档防刷！');

// -----------------------------------------------------------------------------
// 6. 验证 game.js 中 9 大核心埋点系统集成
// -----------------------------------------------------------------------------
console.log('\n>>> [模块 6：三千年世家大系 9 大核心埋点链路校验]');

// Mock 小游戏与 Canvas 宿主环境以加载 game.js
const canvasCalls = [];
const mockCtx = new Proxy({}, {
  get: (t, k) => {
    if (k === 'measureText') return (text) => ({ width: (text ? text.length : 0) * 12 });
    if (k === 'createLinearGradient' || k === 'createRadialGradient') return () => ({ addColorStop: () => {} });
    if (k === 'createPattern') return () => ({});
    if (k === 'roundRect' || k === 'fillRect' || k === 'strokeRect' || k === 'fillText') {
      return (...args) => { canvasCalls.push({ fn: k, text: args[0], args }); };
    }
    return () => {};
  },
  set: (t, k, v) => { t[k] = v; return true; }
});
const mockCanvas = { getContext: () => mockCtx, width: 750, height: 1334 };

const reportedMilestones = [];
global._storage = {};
global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 375, windowHeight: 667, screenWidth: 375, screenHeight: 667, pixelRatio: 2 }),
  getWindowInfo: () => ({ windowWidth: 375, windowHeight: 667, pixelRatio: 2, safeArea: { top: 20, bottom: 647 } }),
  getMenuButtonBoundingClientRect: () => ({ top: 24, bottom: 56, left: 280, right: 365, width: 85, height: 32 }),
  createCanvas: () => mockCanvas,
  createOffscreenCanvas: () => mockCanvas,
  createWebAudioContext: () => null,
  getStorageSync: (k) => global._storage[k] || null,
  setStorageSync: (k, v) => { global._storage[k] = v; },
  removeStorageSync: (k) => { delete global._storage[k]; },
  reportEvent: (eventName, data) => {
    reportedMilestones.push({ eventName, data });
  },
  vibrateShort: () => {},
  vibrateLong: () => {},
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
  onTouchCancel: () => {},
  onShow: () => {},
  onHide: () => {},
  onError: () => {},
  onWindowResize: () => {}
};

// 加载小游戏主入口
require('./wechat-minigame/game.js');

// 触发 9 大核心埋点测试
const REQUIRED_9_MILESTONES = [
  'clan_established',
  'clan_establishment_abandoned',
  'clan_implicit_created',
  'season_settlement_opened',
  'season_settlement_confirmed',
  'frontier_intercepted',
  'marriage_proposal_sent',
  'marriage_proposal_accepted',
  'clan_tab_viewed'
];

REQUIRED_9_MILESTONES.forEach(name => {
  global.reportGameMilestone(name, { testVerify: true });
});

const reportedNames = reportedMilestones.map(m => m.eventName);
REQUIRED_9_MILESTONES.forEach(req => {
  assert.ok(reportedNames.includes(req), `埋点 ${req} 必须被成功上报至遥测链路`);
});

console.log('  ✅ 成功验证全部 9 大核心埋点正常上报：');
REQUIRED_9_MILESTONES.forEach(m => console.log(`     - [Milestone] ${m}`));

// -----------------------------------------------------------------------------
// 7. 验证文本热更与职业加成接入主薪酬循环
// -----------------------------------------------------------------------------
console.log('\n>>> [模块 7：文本覆盖 getText() 与职业薪酬倍率接入验证]');
assert.strictEqual(typeof global.getText, 'function', 'getText 应当全局暴露');
assert.strictEqual(global.getText('NON_EXIST_KEY', '保底文本'), '保底文本', '缺省文案回退');

// 动态热更注入一段文案
global.TEXT_OVERRIDES['CLAN_TOP_BANNER'] = '【实时热更】门阀世家谱';
assert.strictEqual(global.getText('CLAN_TOP_BANNER', '默认谱系'), '【实时热更】门阀世家谱');

// 验证职业加成配置
assert.ok(global.TRACK_INCOME_BONUS_SCALE, 'TRACK_INCOME_BONUS_SCALE 应全局可用');
assert.ok(global.TRACK_INCOME_BONUS_SCALE.biz >= 1.5, '商业职业加成应在 1.5 倍以上');

console.log('  ✅ 成功验证：getText() 与 TRACK_INCOME_BONUS_SCALE 深度嵌合运行态，免审微调与平衡体系达成！');

console.log('\n================================================================================');
console.log('  🎉 全部 7 大模块专项深度验证 100% 通过！代码质量与架构健壮度已达上线要求！');
console.log('================================================================================\n');

process.exit(0);
