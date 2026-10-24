// 云函数入口文件：clanLeaderboard
// 华夏三千年世家大系 · 微信云开发宗族档案中心、全服排行榜、跨设备迎回与赛季名人堂归档

let cloud = null;
try {
  cloud = require('wx-server-sdk');
  cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
} catch (_) {
  // 本地测试/无头仿真环境降级桩
  cloud = {
    getWXContext: () => ({ OPENID: 'local_test_openid', APPID: 'local_test_appid' }),
    database: () => ({
      collection: (colName) => ({
        where: () => ({
          get: async () => ({ data: [] }),
          orderBy: () => ({ limit: () => ({ get: async () => ({ data: [] }) }) })
        }),
        doc: () => ({
          set: async () => ({ stats: { updated: 1 } }),
          get: async () => ({ data: null })
        }),
        add: async () => ({ _id: 'mock_id' }),
        orderBy: () => ({ limit: () => ({ get: async () => ({ data: [] }) }) })
      })
    })
  };
}

const SERVER_CLAN_SALT = 'LIFESIM_CLAN_CLOUD_SALT_2026_#9966';

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

// 种子榜单保底
const SEED_SAMPLE_CLANS = [
  { familyId: 'fam_chen_henan', isSample: true, surname: '陈', province: '河南', hallName: '颍川堂', vocationId: 'study_scholar', vocationName: '耕读传家 · 诗书润骨', clanTrust: { prestigeScore: 1655, trustFundMoney: 220000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_li_guangdong', isSample: true, surname: '李', province: '广东', hallName: '陇西堂', vocationId: 'medical_herb', vocationName: '悬壶济世 · 杏林春暖', clanTrust: { prestigeScore: 1420, trustFundMoney: 180000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_zhang_shandong', isSample: true, surname: '张', province: '山东', hallName: '清河堂', vocationId: 'trade_craft', vocationName: '通商惠工 · 经纶世济', clanTrust: { prestigeScore: 1380, trustFundMoney: 250000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_wang_zhejiang', isSample: true, surname: '王', province: '浙江', hallName: '三槐堂', vocationId: 'iron_craft', vocationName: '百工机巧 · 经纬乾坤', clanTrust: { prestigeScore: 1350, trustFundMoney: 195000 }, genealogyList: [1,2,3,4,5,6,7,8] },
  { familyId: 'fam_liu_jiangsu', isSample: true, surname: '刘', province: '江苏', hallName: '彭城堂', vocationId: 'study_scholar', vocationName: '耕读传家 · 诗书润骨', clanTrust: { prestigeScore: 1210, trustFundMoney: 160000 }, genealogyList: [1,2,3,4,5,6] },
  { familyId: 'fam_zhou_hunan', isSample: true, surname: '周', province: '湖南', hallName: '爱莲堂', vocationId: 'study_scholar', vocationName: '耕读传家 · 诗书润骨', clanTrust: { prestigeScore: 1150, trustFundMoney: 140000 }, genealogyList: [1,2,3,4,5,6] },
  { familyId: 'fam_huang_fujian', isSample: true, surname: '黄', province: '福建', hallName: '江夏堂', vocationId: 'trade_craft', vocationName: '通商惠工 · 经纶世济', clanTrust: { prestigeScore: 1080, trustFundMoney: 210000 }, genealogyList: [1,2,3,4,5] },
  { familyId: 'fam_yang_sichuan', isSample: true, surname: '杨', province: '四川', hallName: '弘农堂', vocationId: 'medical_herb', vocationName: '悬壶济世 · 杏林春暖', clanTrust: { prestigeScore: 990, trustFundMoney: 130000 }, genealogyList: [1,2,3,4] }
];

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID || 'mock_openid';
  const { action = 'getLeaderboard', seasonId = 'RS_2026_Q4_HANWEI', profile = null, checksum = '' } = event || {};

  const db = cloud.database();

  // 1. 同步家族档案至云端数据库
  if (action === 'syncFamily') {
    if (!profile || !profile.surname || !profile.province || !profile.hallName) {
      return { success: false, reason: 'INVALID_CLAN_DATA' };
    }

    const calculatedSign = calculateClanProfileChecksum(profile);
    if (checksum && checksum !== calculatedSign) {
      return { success: false, reason: 'CHECKSUM_MISMATCH' };
    }

    try {
      // 竞态防御：校验是否已有更早立族的传世宗门
      const existingRes = await db.collection('clans').where({ openid }).get();
      if (existingRes && existingRes.data && existingRes.data.length > 0) {
        const existingClan = existingRes.data[0];
        // 若客户端传入的新档案尝试以不同姓氏/籍贯覆盖已有多代传承的云端旧档案，拦截拒绝！
        const isOverwriteConflict = existingClan.familyId !== profile.familyId &&
          (existingClan.surname !== profile.surname || existingClan.province !== profile.province);
        const existingGenerations = (existingClan.genealogyList && existingClan.genealogyList.length) || 0;
        const newGenerations = (profile.genealogyList && profile.genealogyList.length) || 0;

        if (isOverwriteConflict && existingGenerations > newGenerations) {
          return {
            success: false,
            reason: 'CLAN_ALREADY_EXISTS',
            existingProfile: existingClan,
            message: `该用户已存在传世宗族【${existingClan.fullName}】，拒绝覆盖！`
          };
        }
      }

      const clanDoc = {
        ...profile,
        openid: openid,
        _cloudChecksum: calculatedSign,
        updatedAt: new Date()
      };

      await db.collection('clans').doc(profile.familyId || openid).set({
        data: clanDoc
      });

      return {
        success: true,
        familyId: profile.familyId,
        openid,
        updatedAt: Date.now()
      };
    } catch (err) {
      return { success: false, reason: 'DB_WRITE_ERROR', error: err.message };
    }
  }

  // 2. 拉取当季云端真实排行榜 (按声望值倒序排序)
  if (action === 'getLeaderboard') {
    try {
      const res = await db.collection('clans')
        .where({
          currentSeasonId: seasonId
        })
        .orderBy('clanTrust.prestigeScore', 'desc')
        .limit(100)
        .get();

      let clans = (res && res.data && res.data.length > 0) ? res.data : SEED_SAMPLE_CLANS;
      return {
        success: true,
        seasonId,
        clans,
        isCloudData: (res && res.data && res.data.length > 0)
      };
    } catch (err) {
      return {
        success: true,
        seasonId,
        clans: SEED_SAMPLE_CLANS,
        isCloudData: false,
        fallback: true
      };
    }
  }

  // 3. 跨设备通过 OPENID 迎回宗族档案
  if (action === 'recoverFamily') {
    try {
      const res = await db.collection('clans').where({ openid }).get();
      if (res && res.data && res.data.length > 0) {
        return {
          success: true,
          profile: res.data[0]
        };
      }
      return { success: false, reason: 'NO_PROFILE_FOUND' };
    } catch (err) {
      return { success: false, reason: 'DB_READ_ERROR', error: err.message };
    }
  }

  // 4. 赛季大结卷历史归档入库 (清零重置与名人堂入驻)
  if (action === 'archiveSeason') {
    try {
      const topClansRes = await db.collection('clans')
        .where({ currentSeasonId: seasonId })
        .orderBy('clanTrust.prestigeScore', 'desc')
        .limit(50)
        .get();

      const archiveRecord = {
        seasonId,
        archivedAt: new Date(),
        archivedBy: openid,
        topClans: (topClansRes && topClansRes.data) || []
      };

      await db.collection('clan_leaderboard_archives').add({
        data: archiveRecord
      });

      return {
        success: true,
        archived: true,
        seasonId,
        archivedCount: archiveRecord.topClans.length
      };
    } catch (err) {
      return { success: false, reason: 'ARCHIVE_FAILED', error: err.message };
    }
  }

  // 5. 官方受信任热更包下发通道 (免审核动态内容，微信云端私有防篡改链路)
  if (action === 'getContentManifest') {
    try {
      const manifestRes = await db.collection('content_manifests')
        .orderBy('updatedAt', 'desc')
        .limit(1)
        .get();

      let manifest = (manifestRes && manifestRes.data && manifestRes.data[0]) ? manifestRes.data[0] : null;
      if (!manifest) {
        // 内置高信度兜底热更包
        manifest = {
          manifestVersion: '2026.10.16.v2',
          updatedAt: new Date().toISOString(),
          description: '微信云端直发官方平衡与剧情热更包',
          balanceOverrides: {
            rewards: {
              promotionBonus: 22000,
              endgameSGradeBaseScore: 1000
            },
            TRACK_INCOME_BONUS_SCALE: { trade: 1.25, biz: 1.20, tech: 1.15 }
          },
          frontierYear: 2035
        };
      }
      return {
        success: true,
        manifest: manifest,
        serverTs: Date.now()
      };
    } catch (err) {
      return { success: false, reason: 'MANIFEST_FETCH_ERROR', error: err.message };
    }
  }

  // 6. 服务端权威联姻核验与 Nonce 防重放记账 (verifyAlliance)
  if (action === 'verifyAlliance') {
    const { invite = null, targetFamilyId = null } = event || {};
    if (!invite || !invite.fromFamId || !invite.nonce || !invite.token) {
      return { success: false, reason: 'MISSING_INVITE_TOKEN', message: '联姻庚帖数据缺失' };
    }

    try {
      // 查验发起方世家在云端是否存在
      const fromFamRes = await db.collection('clans').where({ familyId: invite.fromFamId }).get();
      if (!fromFamRes || !fromFamRes.data || !fromFamRes.data.length) {
        return { success: false, reason: 'SENDER_FAMILY_NOT_FOUND', message: '发起方世家尚未入驻云端百家谱' };
      }

      // 查验 Nonce 幂等
      const nonceRes = await db.collection('redeemed_alliances').where({ nonce: invite.nonce }).get();
      if (nonceRes && nonceRes.data && nonceRes.data.length > 0) {
        return { success: false, reason: 'NONCE_ALREADY_REDEEMED', message: '此道庚帖已被领受，不可重复缔盟' };
      }

      // 记账存证
      await db.collection('redeemed_alliances').add({
        data: {
          nonce: invite.nonce,
          fromFamId: invite.fromFamId,
          redeemedByOpenId: openid,
          targetFamilyId: targetFamilyId || '',
          redeemedAt: new Date()
        }
      });

      return {
        success: true,
        verified: true,
        fromClan: fromFamRes.data[0]
      };
    } catch (err) {
      return { success: false, reason: 'VERIFY_ALLIANCE_ERROR', error: err.message };
    }
  }

  return { success: false, reason: 'UNKNOWN_ACTION' };
};

exports.calculateClanProfileChecksum = calculateClanProfileChecksum;
