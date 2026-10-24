// 华夏三千年世家大系 · 社交裂变与宗族互联系统 (ClanSocialSystem)
// 包含：百家姓氏榜、八方籍贯榜、家业底色榜、联姻结世交裂变引擎、宗亲会与同乡会中枢

const MAX_ALLIANCES_TOTAL = 12;
const MAX_ALLIANCES_PER_DAY = 3;

function getTodayDateString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * 1. 榜单聚合计算引擎
 */
function buildSurnameLeaderboard(familyList = []) {
  const map = {};
  familyList.forEach(fam => {
    const s = fam.surname || '无名';
    if (!map[s]) {
      map[s] = {
        surname: s,
        totalPrestige: 0,
        totalTrustFund: 0,
        clanCount: 0,
        representativeHall: fam.hallName
      };
    }
    map[s].totalPrestige += (fam.clanTrust ? fam.clanTrust.prestigeScore : 0);
    map[s].totalTrustFund += (fam.clanTrust ? fam.clanTrust.trustFundMoney : 0);
    map[s].clanCount += 1;
  });

  return Object.values(map).sort((a, b) => b.totalPrestige - a.totalPrestige);
}

function buildProvinceLeaderboard(familyList = []) {
  const map = {};
  familyList.forEach(fam => {
    const p = fam.province || '中原';
    if (!map[p]) {
      map[p] = {
        province: p,
        totalPrestige: 0,
        clanCount: 0,
        topSurname: fam.surname
      };
    }
    map[p].totalPrestige += (fam.clanTrust ? fam.clanTrust.prestigeScore : 0);
    map[p].clanCount += 1;
  });

  return Object.values(map).sort((a, b) => b.totalPrestige - a.totalPrestige);
}

function buildVocationLeaderboard(familyList = []) {
  const map = {};
  familyList.forEach(fam => {
    const voc = fam.vocationId || 'study_scholar';
    const vocName = fam.vocationName || '耕读传家';
    if (!map[voc]) {
      map[voc] = {
        vocationId: voc,
        vocationName: vocName,
        totalPrestige: 0,
        clanCount: 0
      };
    }
    map[voc].totalPrestige += (fam.clanTrust ? fam.clanTrust.prestigeScore : 0);
    map[voc].clanCount += 1;
  });

  return Object.values(map).sort((a, b) => b.totalPrestige - a.totalPrestige);
}

/**
 * 2. 联姻与结为世交裂变引擎 (Invitation & Alliance Engine)
 */
const ALLIANCE_SECRET_SALT = 'LIFESIM_ALLIANCE_TOKEN_SALT_2026';

function generateAllianceToken(fromFamId, fromSurname, fromProvince, timestamp, nonce) {
  const str = `${fromFamId}:${fromSurname}:${fromProvince}:${timestamp}:${nonce}:${ALLIANCE_SECRET_SALT}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

/**
 * 2. 联姻与结为世交裂变引擎 (Invitation & Alliance Engine)
 */
function generateMarriageInvitationCard(myFamily, youthName = '长子') {
  if (!myFamily) return null;

  const ts = Date.now();
  const nonce = Math.random().toString(36).slice(2, 10);
  const token = generateAllianceToken(myFamily.familyId, myFamily.surname, myFamily.province, ts, nonce);

  return {
    shareTitle: `【世家结秦晋之好】${myFamily.province}·${myFamily.surname}氏诚备庚帖，邀君共立百年通好！`,
    shareDesc: `我族乃${myFamily.hallName}，已历${myFamily.genealogyList.length || 1}代风霜，特邀世交名门联姻互利！`,
    queryParam: `action=alliance&fromFamId=${myFamily.familyId}&fromSurname=${encodeURIComponent(myFamily.surname)}&fromProvince=${encodeURIComponent(myFamily.province)}&fromHall=${encodeURIComponent(myFamily.hallName)}&ts=${ts}&nonce=${nonce}&token=${token}`,
    inviterData: {
      familyId: myFamily.familyId,
      fullName: myFamily.fullName,
      surname: myFamily.surname,
      hallName: myFamily.hallName,
      province: myFamily.province,
      youthName: youthName,
      generation: myFamily.genealogyList.length || 1,
      ts,
      nonce,
      token
    }
  };
}

function _reportValidationFailure(res, invite) {
  if (typeof reportGameMilestone === 'function') {
    const payload = {
      reason: res.reason,
      message: res.message,
      fromFamId: (invite && invite.fromFamId) || '',
      fromSurname: (invite && invite.fromSurname) || '',
      fromProvince: (invite && invite.fromProvince) || ''
    };
    reportGameMilestone('marriage_validation_failed', payload);
    reportGameMilestone('marriage_verify_failed', payload);
  }
}

/**
 * 校验外部传入的联姻邀请庚帖合法性 (防刷、防伪造、防自恋同盟、防重放、时效校验)
 */
function validateMarriageInvite(invite, myFamily, networkTimestamp = null) {
  if (!invite || typeof invite !== 'object') {
    const res = { valid: false, reason: 'INVALID_DATA', message: '世家庚帖数据不完整' };
    _reportValidationFailure(res, invite);
    return res;
  }
  if (!myFamily) {
    const res = { valid: false, reason: 'NO_MY_FAMILY', message: '尚未立族，无法缔结世交' };
    _reportValidationFailure(res, invite);
    return res;
  }
  const sName = invite.fromSurname && typeof invite.fromSurname === 'string' ? invite.fromSurname.trim() : '';
  const prov = invite.fromProvince && typeof invite.fromProvince === 'string' ? invite.fromProvince.trim() : '';
  const hall = invite.fromHall && typeof invite.fromHall === 'string' ? invite.fromHall.trim() : '';

  if (!sName || !/^[\u4e00-\u9fa5]{1,2}$/.test(sName)) {
    const res = { valid: false, reason: 'INVALID_SURNAME', message: '求聘方姓氏不合规' };
    _reportValidationFailure(res, invite);
    return res;
  }
  if (!prov || prov.length > 8) {
    const res = { valid: false, reason: 'INVALID_PROVINCE', message: '求聘方籍贯不合规' };
    _reportValidationFailure(res, invite);
    return res;
  }
  if (!hall || hall.length > 12) {
    const res = { valid: false, reason: 'INVALID_HALL', message: '求聘方堂号不合规' };
    _reportValidationFailure(res, invite);
    return res;
  }
  if (invite.fromFamId && invite.fromFamId === myFamily.familyId) {
    const res = { valid: false, reason: 'SELF_ALLIANCE', message: '不可与同族自身结为世交' };
    _reportValidationFailure(res, invite);
    return res;
  }
  if (sName === myFamily.surname && prov === myFamily.province && hall === myFamily.hallName) {
    const res = { valid: false, reason: 'SAME_CLAN_BRANCH', message: '同堂同籍本家无须重复缔结秦晋之好' };
    _reportValidationFailure(res, invite);
    return res;
  }

  // 1. 签名与印信防伪防篡改校验 (强制要求 Token、时间戳与 Nonce，严禁无印信绕过)
  if (!invite.token || !invite.ts || !invite.nonce) {
    const res = { valid: false, reason: 'MISSING_TOKEN', message: '庚帖防伪印信缺失，无法缔结世交' };
    _reportValidationFailure(res, invite);
    return res;
  }
  const expectedToken = generateAllianceToken(invite.fromFamId, sName, prov, invite.ts, invite.nonce);
  if (invite.token !== expectedToken) {
    const res = { valid: false, reason: 'INVALID_SIGNATURE', message: '庚帖印信防伪校验未通过（疑似伪造）' };
    _reportValidationFailure(res, invite);
    return res;
  }

  // 2. 时效性与网络授时校验 (防时间穿越与重放攻击)
  const now = (typeof networkTimestamp === 'number' && networkTimestamp > 0) ? networkTimestamp : Date.now();
  if (invite.ts) {
    const inviteAge = now - Number(invite.ts);
    if (inviteAge > 7 * 86400 * 1000) {
      const res = { valid: false, reason: 'EXPIRED_INVITE', message: '世家庚帖已过时效（有效限7日）' };
      _reportValidationFailure(res, invite);
      return res;
    }
    if (inviteAge < -3600 * 1000) {
      const res = { valid: false, reason: 'FUTURE_INVITE', message: '庚帖时序异常，请校准网络时间' };
      _reportValidationFailure(res, invite);
      return res;
    }
  }

  // 3. 幂等防重放：已领受过的 Nonce 不得重复领受
  myFamily._redeemedInviteNonces = myFamily._redeemedInviteNonces || [];
  if (invite.nonce && myFamily._redeemedInviteNonces.includes(invite.nonce)) {
    const res = { valid: false, reason: 'ALREADY_REDEEMED', message: '此道庚帖已被兑纳，不可重复领受' };
    _reportValidationFailure(res, invite);
    return res;
  }

  myFamily.alliances = myFamily.alliances || [];
  if (myFamily.alliances.length >= MAX_ALLIANCES_TOTAL) {
    const res = { valid: false, reason: 'MAX_ALLIANCES_EXCEEDED', message: `世交名额已达上限（最多${MAX_ALLIANCES_TOTAL}家）` };
    _reportValidationFailure(res, invite);
    return res;
  }

  const already = myFamily.alliances.some(a =>
    (invite.fromFamId && a.targetFamilyId === invite.fromFamId) ||
    (a.surname === sName && a.province === prov && a.hallName === hall)
  );
  if (already) {
    const res = { valid: false, reason: 'ALREADY_ALLIED', message: '两家此前已结为通好世交' };
    _reportValidationFailure(res, invite);
    return res;
  }

  // 4. 设备时间防倒拨作弊检测 (Anti Clock Tamper)
  myFamily._highestSeenNetworkTs = Math.max(myFamily._highestSeenNetworkTs || 0, now);
  if (now < myFamily._highestSeenNetworkTs - 86400 * 1000) {
    const res = { valid: false, reason: 'TIME_TAMPER_DETECTED', message: '检测到设备系统时间异常，请对齐网络授时！' };
    _reportValidationFailure(res, invite);
    return res;
  }

  const today = getTodayDateString();
  const dailyRecord = myFamily._dailyAllianceRecord || { date: today, count: 0 };
  if (dailyRecord.date === today && dailyRecord.count >= MAX_ALLIANCES_PER_DAY) {
    const res = { valid: false, reason: 'DAILY_LIMIT_EXCEEDED', message: `今日缔结世交已达上限（每日限${MAX_ALLIANCES_PER_DAY}次）` };
    _reportValidationFailure(res, invite);
    return res;
  }

  return { valid: true };
}

/**
 * 收益动态阶梯衰减算法 (Diminishing Returns)
 * 每日第 1 次：+25 声望，+2500 礼金
 * 每日第 2 次：+15 声望，+1500 礼金
 * 每日第 3 次：+8 声望，+800 礼金
 * 每日第 4+ 次：0 收益（仅记录盟约关系）
 */
function calculateAllianceReward(dailyIndex) {
  if (dailyIndex === 0) return { prestige: 25, money: 2500 };
  if (dailyIndex === 1) return { prestige: 15, money: 1500 };
  if (dailyIndex === 2) return { prestige: 8, money: 800 };
  return { prestige: 0, money: 0 };
}

/**
 * 双向缔结世家通好/联姻盟约 (安全闭环校验与阶梯衰减收益)
 */
function acceptMarriageAlliance(familyA, familyB, options = {}) {
  if (!familyA || !familyB) {
    return { success: false, reason: 'INCOMPLETE_DATA', message: '联姻双方世家数据不完整' };
  }
  if (familyA.familyId === familyB.familyId) {
    return { success: false, reason: 'SELF_ALLIANCE', message: '不可与同族自身结为世交' };
  }
  if (familyA.surname === familyB.surname && familyA.province === familyB.province && familyA.hallName === familyB.hallName) {
    return { success: false, reason: 'SAME_BRANCH', message: '同堂同籍本家无须重复缔结秦晋之好' };
  }

  familyA.alliances = familyA.alliances || [];
  familyB.alliances = familyB.alliances || [];

  if (familyA.alliances.length >= MAX_ALLIANCES_TOTAL) {
    return { success: false, reason: 'MAX_ALLIANCES_EXCEEDED', message: `世家通好盟约已达上限（最多${MAX_ALLIANCES_TOTAL}门世交）` };
  }

  const today = getTodayDateString();
  familyA._dailyAllianceRecord = familyA._dailyAllianceRecord || { date: today, count: 0 };
  if (familyA._dailyAllianceRecord.date !== today) {
    familyA._dailyAllianceRecord = { date: today, count: 0 };
  }
  if (familyA._dailyAllianceRecord.count >= MAX_ALLIANCES_PER_DAY) {
    return { success: false, reason: 'DAILY_LIMIT_EXCEEDED', message: `今日缔结世交已达上限（每日限${MAX_ALLIANCES_PER_DAY}次）` };
  }

  // 防重复结盟
  const existsA = familyA.alliances.some(a =>
    a.targetFamilyId === familyB.familyId ||
    (a.surname === familyB.surname && a.province === familyB.province && a.hallName === familyB.hallName)
  );
  if (existsA) {
    return { success: false, reason: 'ALREADY_ALLIED', message: '两家此前已结为通好世交！' };
  }

  const bondYear = familyA.timeline ? familyA.timeline.currentYear : 2026;

  if (!familyA.clanTrust) familyA.clanTrust = { prestigeScore: 50, trustFundMoney: 5000 };
  if (!familyB.clanTrust) familyB.clanTrust = { prestigeScore: 50, trustFundMoney: 5000 };

  // 1. 双向写入世交盟约
  familyA.alliances.push({
    targetFamilyId: familyB.familyId,
    fullName: familyB.fullName || `${familyB.province}·${familyB.surname}氏·${familyB.hallName}`,
    surname: familyB.surname,
    province: familyB.province,
    hallName: familyB.hallName,
    bondYear: bondYear,
    allianceBuff: { mutualAidBonus: 0.15 } // 危机与经商获利 15% 互相加成
  });

  familyB.alliances.push({
    targetFamilyId: familyA.familyId,
    fullName: familyA.fullName || `${familyA.province}·${familyA.surname}氏·${familyA.hallName}`,
    surname: familyA.surname,
    province: familyA.province,
    hallName: familyA.hallName,
    bondYear: bondYear,
    allianceBuff: { mutualAidBonus: 0.15 }
  });

  // 2. 动态收益阶梯衰减：杜绝联姻暴富与脚本刷分
  const dailyIdx = familyA._dailyAllianceRecord.count;
  const reward = calculateAllianceReward(dailyIdx);

  familyA.clanTrust.prestigeScore = (familyA.clanTrust.prestigeScore || 0) + reward.prestige;
  familyB.clanTrust.prestigeScore = (familyB.clanTrust.prestigeScore || 0) + reward.prestige;
  familyA.clanTrust.trustFundMoney = (familyA.clanTrust.trustFundMoney || 0) + reward.money;
  familyB.clanTrust.trustFundMoney = (familyB.clanTrust.trustFundMoney || 0) + reward.money;

  // 记录每日计数
  familyA._dailyAllianceRecord.count += 1;

  // 记录已兑纳 Nonce，杜绝重放
  if (options.nonce) {
    familyA._redeemedInviteNonces = familyA._redeemedInviteNonces || [];
    familyA._redeemedInviteNonces.push(options.nonce);
    if (familyA._redeemedInviteNonces.length > 50) {
      familyA._redeemedInviteNonces = familyA._redeemedInviteNonces.slice(-50);
    }
  }

  // 3. 载入双方纪事录
  const chronicleTextA = `【世家盟好】与【${familyB.province}·${familyB.surname}氏·${familyB.hallName}】喜结秦晋之好，互通商路，声望+${reward.prestige}，礼金+¥${reward.money}！`;
  const chronicleTextB = `【世家盟好】与【${familyA.province}·${familyA.surname}氏·${familyA.hallName}】喜结秦晋之好，共立百代同盟誓约！`;

  return {
    success: true,
    bondYear,
    familyA_allianceCount: familyA.alliances.length,
    familyB_allianceCount: familyB.alliances.length,
    rewardPrestige: reward.prestige,
    rewardMoney: reward.money,
    chronicleTextA,
    chronicleTextB
  };
}

/**
 * 3. 同姓宗亲会与同乡世交总公所
 */
function getClanAssociationDetails(family) {
  if (!family) return null;

  return {
    clanGuild: {
      name: `全国${family.surname}氏宗亲总联合会`,
      desc: `汇聚天下${family.surname}氏血脉风骨，同宗同源，一脉相承。`,
      privileges: ['同姓互赠宗祠香火（每日领信托增益）', '宗谱联修参阅权', '百家姓氏总榜计分']
    },
    homelandGuild: {
      name: `${family.province}乡邦世家联谊公所`,
      desc: `聚集${family.province}本土望族，乡情融洽，共御水旱天灾。`,
      privileges: ['乡邦赈济储备金借贷', '地方风俗大考答辩加成', '八方籍贯总榜争鸣']
    }
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    buildSurnameLeaderboard,
    buildProvinceLeaderboard,
    buildVocationLeaderboard,
    generateMarriageInvitationCard,
    generateAllianceToken,
    calculateAllianceReward,
    validateMarriageInvite,
    acceptMarriageAlliance,
    getClanAssociationDetails
  };
}
