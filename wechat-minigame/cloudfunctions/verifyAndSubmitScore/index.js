// 云函数入口文件：verifyAndSubmitScore
let cloud = null;
try {
  cloud = require('wx-server-sdk');
  cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
} catch (_) {
  // 本地测试/无头仿真环境降级桩
  cloud = {
    getWXContext: () => ({ OPENID: 'local_openid', APPID: 'local_appid' }),
    database: () => ({ collection: () => ({ add: async () => {} }) })
  };
}

// 服务端强签名盐值
const SERVER_SALT_LIFESIM = 'LIFESIM_2026_ANTITAMPER_KEY_#8899';

function computeServerChecksum(score, year, age, rep, clean, runSeed) {
  const str = `${score}:${year}:${age}:${rep}:${clean}:${runSeed}:${SERVER_SALT_LIFESIM}`;
  let hash = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16);
}

exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext();
  const openid = wxContext.OPENID;

  const {
    score = 0,
    rawScore = 0,
    grade = 'B',
    title = '',
    runSeed = 0,
    year = 2050,
    age = 78,
    rep = 50,
    clean = 50,
    capital = 0,
    delegatedDecisionsCount = 0,
    checksum = '',
    submitTime = Date.now()
  } = event || {};

  // 1. 基础属性硬边界防篡改检查 (防止修改器直接自报 99999)
  if (typeof rep !== 'number' || rep < 0 || rep > 100) {
    return { verified: false, reason: 'INVALID_REP_BOUNDS' };
  }
  if (typeof clean !== 'number' || clean < 0 || clean > 100) {
    return { verified: false, reason: 'INVALID_CLEAN_BOUNDS' };
  }
  if (typeof capital !== 'number' || capital < 0 || capital > 500000000) {
    return { verified: false, reason: 'INVALID_CAPITAL_BOUNDS' };
  }
  if (typeof age !== 'number' || age < 18 || age > 115) {
    return { verified: false, reason: 'INVALID_AGE_BOUNDS' };
  }

  // 2. 评级底分与计分公式服务端精确重算
  const gradeBaseScoreMap = { 'S': 1000, 'A': 750, 'B': 500, 'C': 250 };
  const baseGradeScore = gradeBaseScoreMap[grade] || 500;
  const expectedRawScore = Math.round(
    baseGradeScore +
    rep * 5 +
    clean * 3 +
    Math.min(500, Math.floor(capital / 5000))
  );

  const delegationPenalty = (delegatedDecisionsCount && delegatedDecisionsCount > 0) ? 0.75 : 1.0;
  const expectedTotalScore = Math.round(expectedRawScore * delegationPenalty);

  // 允许浮点四舍五入容差 2 分
  if (Math.abs(score - expectedTotalScore) > 2) {
    return {
      verified: false,
      reason: 'SCORE_FORMULA_MISMATCH',
      reportedScore: score,
      expectedTotalScore
    };
  }

  // 3. 校验客户端签名
  const expectedClientChecksum = computeServerChecksum(score, year, age, rep, clean, runSeed);
  const isLegacyChecksum = (checksum === (((score ^ (year || 2050)) * 31) >>> 0).toString(16));
  const isSecureChecksum = (checksum === expectedClientChecksum);

  if (!isSecureChecksum && !isLegacyChecksum) {
    return {
      verified: false,
      reason: 'CHECKSUM_SIGNATURE_MISMATCH'
    };
  }

  // 4. (可选) 写入云数据库终局归档集合
  try {
    const db = cloud.database();
    await db.collection('user_endgame_records').add({
      data: {
        openid,
        score: expectedTotalScore,
        grade,
        title,
        year,
        age,
        rep,
        clean,
        capital,
        runSeed,
        verified: true,
        isSecureSignature: isSecureChecksum,
        createdAt: new Date()
      }
    });
  } catch (dbErr) {
    // 若数据库集合未建，不阻塞核心认证流程
  }

  return {
    success: true,
    verified: true,
    score: expectedTotalScore,
    grade,
    title,
    openid,
    serverTimestamp: Date.now()
  };
};

exports.computeServerChecksum = computeServerChecksum;
