/**
 * 华夏世家大系 · 200年赛季大结算引擎 (Season Settlement Engine)
 * 职责：
 * 1. 考定200年全族历经数代人拼搏后的门阀品阶 (寒微 / 郡中名士 / 郡望著姓 / 顶级阀阅)
 * 2. 封存本赛季族谱卷轴与先祖牌位殿堂
 * 3. 打包生成跨入下一个 200 年赛季的丰厚继承资产 (传世重宝、祖荫信托、血脉家风、下赛季阶层特权)
 */

const { SEASONS_REGISTRY, getSeasonById } = require('./seasonConfig.js');

const CLAN_NOBLE_TIERS = [
  {
    tier: 1,
    name: '寒微小姓',
    minPrestige: 0,
    titleDesc: '虽立宗祠，但门第尚微，仅保祖茔田舍，有待后世发扬。',
    seasonInheritBonus: { capitalRate: 0.35, startingStatus: 'commoner' }
  },
  {
    tier: 2,
    name: '郡中名士',
    minPrestige: 400,
    titleDesc: '代有清名，乡闾推重。历任郡守门吏与孝廉，宗族初具声势。',
    seasonInheritBonus: { capitalRate: 0.50, startingStatus: 'local_gentry' }
  },
  {
    tier: 3,
    name: '郡望著姓',
    minPrestige: 1000,
    titleDesc: '累世经学或巨商豪族，九品中正列为上品，享誉一州，名动朝野！',
    seasonInheritBonus: { capitalRate: 0.65, startingStatus: 'prominent_clan' }
  },
  {
    tier: 4,
    name: '顶级阀阅',
    minPrestige: 2500,
    titleDesc: '出将入相，与国休戚！门生故吏遍九州，鼎盛簪缨，万古不朽！',
    seasonInheritBonus: { capitalRate: 0.80, startingStatus: 'high_aristocracy' }
  }
];

function evaluateClanNobleTier(prestigeScore) {
  const score = prestigeScore || 0;
  for (let i = CLAN_NOBLE_TIERS.length - 1; i >= 0; i--) {
    if (score >= CLAN_NOBLE_TIERS[i].minPrestige) {
      return CLAN_NOBLE_TIERS[i];
    }
  }
  return CLAN_NOBLE_TIERS[0];
}

/**
 * 考定 200 年赛季继承预览（纯读取，不产生任何副作用）
 */
function previewSeasonSettlement(familyProfile, seasonId = 'season_1_han_wei') {
  if (!familyProfile) throw new Error('家族档案不能为空');

  const currentSeason = getSeasonById(seasonId);
  const clanTrust = familyProfile.clanTrust || { trustFundMoney: 10000, prestigeScore: 50, relics: [], mottoList: [] };
  const genealogy = familyProfile.genealogyList || [];

  // 1. 考定门阀品级
  const nobleTier = evaluateClanNobleTier(clanTrust.prestigeScore);

  // 2. 统计本赛季历代先祖功绩长卷
  const ancestorsSummary = genealogy.map(a => ({
    generation: a.generation,
    fullName: a.fullName,
    posthumousTitle: a.posthumousTitle,
    officialTitle: a.officialTitle,
    lifespan: a.lifespan,
    epitaph: a.epitaph,
    successorOrigin: a.successorOrigin || 'lineage_child',
    successorRole: a.successorRole || '宗门嫡长'
  }));

  // 3. 计算跨赛季继承资产包 (Season Heritage Package)
  const capitalBequestRate = nobleTier.seasonInheritBonus.capitalRate;
  const rawTrustMoney = clanTrust.trustFundMoney || 0;
  const carryOverTrustMoney = Math.round(rawTrustMoney * capitalBequestRate);

  const heritagePackage = {
    sourceSeasonId: seasonId,
    sourceSeasonName: currentSeason ? currentSeason.name : '汉魏风骨 · 坞壁筑基',
    targetSeasonIndex: currentSeason ? currentSeason.seasonIndex + 1 : 2,
    settlementTimestamp: Date.now(),
    nobleTier: nobleTier,
    ancestorsCount: genealogy.length,
    ancestorsSummary: ancestorsSummary,
    seasonPrestigeEarned: clanTrust.prestigeScore || 0,
    // 传世重宝永久继承
    relicsInherited: [...(clanTrust.relics || [])],
    // 宗族信托跨赛季结转金
    carryOverTrustFund: carryOverTrustMoney,
    // 传世家规祖训
    mottosCarriedForward: [...(clanTrust.mottoList || [])],
    // 下一赛季开基阶层与门第特权
    startingStatus: nobleTier.seasonInheritBonus.startingStatus,
    nextSeasonStartingPerkDesc: seasonId === 'season_2_liu_chao'
      ? (nobleTier.tier >= 3
        ? '下一赛季（南北归一·隋唐草创）起步自带关陇名门余荫与书香祖茔，直膺科第解额与开皇官爵！'
        : '下一赛季（南北归一·隋唐草创）起步获得宗亲庇护与坚实开基资产。')
      : (nobleTier.tier >= 3
        ? '下一赛季（六朝烟雨）起步自带南渡庄园与上品门阀光环，直接保送中正仕途！'
        : '下一赛季（六朝烟雨）起步获得宗亲庇护与坚实开基资产。')
  };

  return heritagePackage;
}

/**
 * 执行 200 年赛季大结卷（严格幂等，仅在玩家最终确认后执行）
 */
function settleTwoHundredYearSeason(familyProfile, seasonId = 'season_1_han_wei') {
  if (!familyProfile) throw new Error('家族档案不能为空');

  familyProfile.seasonHistory = familyProfile.seasonHistory || [];

  // 严格幂等防重：对同一赛季若已完成大结卷，直接返回已有档案，绝不多次扣费或重复入录
  const existingRecord = familyProfile.seasonHistory.find(h => h.sourceSeasonId === seasonId);
  if (existingRecord) {
    return existingRecord;
  }

  const currentSeason = getSeasonById(seasonId);
  const heritagePackage = previewSeasonSettlement(familyProfile, seasonId);

  // 4. 将赛季结算成果深固于家族历史功勋库中
  familyProfile.seasonHistory.push(heritagePackage);

  // 推进赛季索引
  familyProfile.currentSeasonId = (currentSeason && SEASONS_REGISTRY[currentSeason.seasonIndex])
    ? SEASONS_REGISTRY[currentSeason.seasonIndex].id
    : (currentSeason ? currentSeason.id : 'season_2_liu_chao');

  // 更新信托为结转后的新资金池
  familyProfile.clanTrust = familyProfile.clanTrust || {};
  familyProfile.clanTrust.trustFundMoney = heritagePackage.carryOverTrustFund;
  familyProfile.clanTrust.lastSeasonTier = heritagePackage.nobleTier.name;
  familyProfile.clanTrust.lastStartingStatus = heritagePackage.startingStatus;

  // 赛季声望重置与阶梯荣誉承继：杜绝声望永续棘轮膨胀
  // 基础底定 50 分 + 本赛季门阀品阶荣誉结转 (顶级阀阅 +80，郡望著姓 +50，郡中名士 +20)
  const prestigeCarryover = heritagePackage.nobleTier.tier >= 4 ? 80 :
    (heritagePackage.nobleTier.tier === 3 ? 50 :
    (heritagePackage.nobleTier.tier === 2 ? 20 : 0));
  familyProfile.clanTrust.prestigeScore = 50 + prestigeCarryover;

  return heritagePackage;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CLAN_NOBLE_TIERS,
    evaluateClanNobleTier,
    previewSeasonSettlement,
    settleTwoHundredYearSeason
  };
}
