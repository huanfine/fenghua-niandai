/**
 * 华夏三千年世家大系 · 第一纪元：汉魏风骨 (公元100~300年) 核心总控引擎
 * 职责：
 * 1. 坞壁庄园（良田、水碓、坞堡、部曲、藏书阁）资产与自给自足经营系统
 * 2. 四世接力“祖荫辟举与累世家风”因果链沉淀与继承
 * 3. 汉魏重大历史关隘大案执行与时代检定
 * 4. 平年快速编年流转与资产收益自动结算（支持单代极速推进）
 */

const { HAN_WEI_CRITICAL_CHRONO_EVENTS } = require('./historicalMilieuHanWei');

// 统一引用第一赛季（公元100~280年）历史关隘大案 (13大标准历史大案，涵盖卷一至卷四无空白窗口)
const EPOCH_ONE_HISTORICAL_EVENTS = (HAN_WEI_CRITICAL_CHRONO_EVENTS || []).filter(e => typeof e.year === 'number' && e.year <= 280);
const ALL_SEASON_ONE_CHRONO_EVENTS = EPOCH_ONE_HISTORICAL_EVENTS;

// ==========================================
// 1. 坞壁庄园（Manor & Fortress）资产经营系统
// ==========================================

/**
 * 初始化初代或继任世家的坞壁庄园产业底盘
 * @param {string} vocationId 世家家业底色 (study_scholar, trade_craft, military_honor, agri_land)
 * @param {object} inheritedManor 上代继祧遗留产业（若有）
 */
function initManor(vocationId = 'agri_land', inheritedManor = null) {
  if (inheritedManor && typeof inheritedManor === 'object') {
    // 世家多脉沙盒核心机制：祖业坞壁田庄代代相继，100% 完整继承，彻底消除衰减挫败感
    return {
      farmlandAcres: Math.max(30, inheritedManor.farmlandAcres || 50),
      watermills: Math.max(0, inheritedManor.watermills || 1),
      fortressLevel: Math.max(1, inheritedManor.fortressLevel || 1),
      armedRetainers: Math.max(15, inheritedManor.armedRetainers || 30),
      granaryStoredGrain: Math.max(200, Math.round((inheritedManor.granaryStoredGrain || 500) * 0.9)),
      libraryTiers: Math.max(1, inheritedManor.libraryTiers || 1),
      repairedYear: 100
    };
  }

  // 依据初生家业底色赋予特色起点
  switch (vocationId) {
    case 'trade_craft': // 通商惠工
      return {
        farmlandAcres: 40,
        watermills: 2,
        fortressLevel: 1,
        armedRetainers: 25,
        granaryStoredGrain: 600,
        libraryTiers: 1,
        repairedYear: 100
      };
    case 'military_honor': // 门阀军功
      return {
        farmlandAcres: 35,
        watermills: 1,
        fortressLevel: 2,
        armedRetainers: 60,
        granaryStoredGrain: 450,
        libraryTiers: 1,
        repairedYear: 100
      };
    case 'study_scholar': // 耕读传家
      return {
        farmlandAcres: 45,
        watermills: 1,
        fortressLevel: 1,
        armedRetainers: 20,
        granaryStoredGrain: 400,
        libraryTiers: 2,
        repairedYear: 100
      };
    case 'agri_land': // 积善齐家 / 桑梓望族
    default:
      return {
        farmlandAcres: 60,
        watermills: 1,
        fortressLevel: 1,
        armedRetainers: 30,
        granaryStoredGrain: 700,
        libraryTiers: 1,
        repairedYear: 100
      };
  }
}

/**
 * 结算坞壁庄园年度或多年连续产出
 * @param {object} manor 庄园数据
 * @param {number} yearsSpan 推进年数（1~5年）
 * @returns {object} 产出收益与文字简报
 */
function calculateManorYield(manor, yearsSpan = 1) {
  if (!manor) return { netMoney: 0, grainProduced: 0, snippet: '' };

  const span = Math.max(1, yearsSpan);
  // 良田产粮：每亩年产 12 斗，折合五铢钱
  const annualGrain = Math.round(manor.farmlandAcres * 12);
  // 水碓加工提纯倍率：每座水碓年提供 600 五铢钱工坊利润
  const watermillProfit = manor.watermills * 600;
  // 部曲军饷与口粮消耗：每名部曲年俸食 150 五铢钱与 3 斗粮
  const retainerCost = manor.armedRetainers * 150;

  const grossMoney = (manor.farmlandAcres * 50 + watermillProfit) * span;
  const netMoney = Math.max(200 * span, grossMoney - (retainerCost * span));
  const grainProduced = annualGrain * span;

  manor.granaryStoredGrain = (manor.granaryStoredGrain || 0) + grainProduced;

  let snippet = `庄园经略：膏腴良田${manor.farmlandAcres}亩丰登，水碓${manor.watermills}座磨碾不绝，得五铢钱${netMoney}，积粟米${grainProduced}斛。`;
  return {
    netMoney,
    grainProduced,
    snippet
  };
}

/**
 * 坞壁遭遇乱世兵灾检定 (如 184 黄巾、190 董卓烽烟)
 * @param {object} manor 庄园数据
 * @param {string} crisisType 乱世类型 ('rebel_siege', 'bandit_raid', 'warlord_tax')
 */
function resolveManorCrisisDefense(manor, crisisType = 'rebel_siege') {
  if (!manor) return { defended: false, lossMoney: 1000, lossGrain: 100, text: '无险可守，族人四散。' };

  // 防御战力 = 部曲人数 * (1 + 坞壁层级 * 0.35)
  const defensePower = Math.round(manor.armedRetainers * (1 + (manor.fortressLevel || 1) * 0.35));

  if (defensePower >= 60) {
    // 固若金汤
    manor.armedRetainers = Math.max(10, manor.armedRetainers - 5);
    return {
      defended: true,
      defensePower,
      lossMoney: 0,
      lossGrain: 50,
      reputationGain: 20,
      text: '坞壁深垒，箭矢如雨！部曲同仇敌忾击退流寇，保全宗族老幼与庄园积粟，四方流民望风投效！'
    };
  } else {
    // 险遭破垒
    const lossMoney = Math.round(manor.farmlandAcres * 30);
    const lossGrain = Math.min(manor.granaryStoredGrain || 0, 300);
    manor.granaryStoredGrain = Math.max(0, (manor.granaryStoredGrain || 0) - lossGrain);
    manor.armedRetainers = Math.max(5, Math.round(manor.armedRetainers * 0.6));
    return {
      defended: false,
      defensePower,
      lossMoney,
      lossGrain,
      reputationGain: -5,
      text: '坞垒失修，防御单薄。流寇劫掠外围田庄水碓，族丁死伤过半，幸闭重门方得苟全。'
    };
  }
}

// ==========================================
// 2. 四世接力“祖荫辟举与累世家风”因果链体系
// ==========================================

/**
 * 生成初代或前代始祖的祖荫遗泽信包 (Ancestral Legacy Package)
 */
function createAncestralLegacyPackage(familyProfile, ancestorState, decisionHistory = []) {
  const givenName = ancestorState.name || '远之';
  const officialTitle = ancestorState.officialTitle || ancestorState.jobTitle || '汉故郡功曹';
  const rankLevel = ancestorState.govLevel || ancestorState.rank || 2;
  const track = ancestorState.track || 'official';
  const manor = ancestorState.manor || initManor(familyProfile && familyProfile.vocationId);

  // 提炼祖训
  let mottoText = '深壁固垒以待天时，诗书训后克绍箕裘。';
  if (ancestorState.mottoTags && ancestorState.mottoTags.includes('以德化暴')) {
    mottoText = '天道好还，仁者无敌。逢荒必开仓，待客当推诚。';
  } else if (ancestorState.mottoTags && ancestorState.mottoTags.includes('杏林济众')) {
    mottoText = '精诚修仁，不务虚名。活人者寿，世守药囊。';
  } else if (ancestorState.mottoTags && ancestorState.mottoTags.includes('经林泰斗')) {
    mottoText = '古文经训，家学渊源。立言垂范，百代不迁。';
  }

  // 传世信物
  const legacyRelic = ancestorState.relicId ? {
    id: ancestorState.relicId,
    name: ancestorState.relicName || '建安汉魏金石碑拓'
  } : null;

  return {
    generation: (ancestorState.generation || 1),
    fatherName: `${familyProfile.surname || ''}${givenName}`,
    fatherTitle: officialTitle,
    fatherRank: rankLevel,
    fatherTrack: track,
    prestigeAccumulated: ancestorState.clanPrestige || 50,
    motto: mottoText,
    passedRelic: legacyRelic,
    inheritedManor: {
      farmlandAcres: manor.farmlandAcres || 50,
      watermills: manor.watermills || 1,
      fortressLevel: manor.fortressLevel || 1,
      armedRetainers: manor.armedRetainers || 30,
      granaryStoredGrain: manor.granaryStoredGrain || 400,
      libraryTiers: manor.libraryTiers || 1
    },
    bequeathedMoney: Math.max(2000, Math.round((ancestorState.money || ancestorState.capital || 5000) * 0.45)),
    decisionMemoryHighlights: (decisionHistory || []).slice(0, 3).map(d => d.chronicleSnippet || d.chosenText).filter(Boolean)
  };
}

/**
 * 将先祖遗泽注入下一世继任者开局
 * @param {object} descendantState 继任者状态
 * @param {object} legacyPackage 先祖遗泽信包
 */
function applyAncestralLegacyToDescendant(descendantState, legacyPackage) {
  if (!descendantState || !legacyPackage) return null;

  // 1. 继承庄园产业底盘
  descendantState.manor = initManor(descendantState.track, legacyPackage.inheritedManor);

  // 2. 继承五铢钱与门第声望
  descendantState.capital = (descendantState.capital || 0) + (legacyPackage.bequeathedMoney || 2000);
  descendantState.money = descendantState.capital;
  descendantState.clanPrestige = (descendantState.clanPrestige || 50) + Math.round((legacyPackage.prestigeAccumulated || 50) * 0.35);

  // 3. 祖荫跳级赋能 (先人铺路，后人乘凉)
  const fRank = legacyPackage.fatherRank || 1;
  const fTrack = legacyPackage.fatherTrack || 'official';
  let patronageStory = '';

  if (fRank >= 4 || fTrack === 'official') {
    // 官宦世家：起步跳过白衣门生，直接由故吏引荐入郡府
    descendantState.rank = 2; // 郡丞/功曹史
    descendantState.rankName = '郡丞/功曹史';
    descendantState.jobTitle = '郡功曹主事';
    descendantState.rep = (descendantState.rep || 40) + 15;
    patronageStory = `【门阀世荫】尚书台与本郡府君念及先君【${legacyPackage.fatherTitle}】清德遗爱，免去白衣求辟之苦，直接辟举你为【郡丞功曹史】！`;
  } else if (fTrack === 'scholar') {
    // 家学世家：天资悟性大增
    descendantState.iq = (descendantState.iq || 50) + 15;
    descendantState.culture = (descendantState.culture || 50) + 20;
    patronageStory = `【家学渊源】承袭先君藏书与古文治经心法，游学洛阳太学时受诸生景仰，悟性斐然！`;
  } else {
    // 货殖与武备世家：富甲一方，部曲严整
    descendantState.courage = (descendantState.courage || 50) + 12;
    patronageStory = `【基业绵延】先人遗留良田千顷、坞壁严整，宗族子弟精悍效命，起步资财富足！`;
  }

  // 4. 传世祖训加成
  if (legacyPackage.motto) {
    descendantState.activeFamilyMotto = legacyPackage.motto;
  }
  if (legacyPackage.passedRelic) {
    descendantState.heirlooms = descendantState.heirlooms || [];
    descendantState.heirlooms.push(legacyPackage.passedRelic);
  }

  return {
    patronageStory,
    bequeathedMoney: legacyPackage.bequeathedMoney,
    startingRank: descendantState.rankName
  };
}

// ==========================================
// 3. 平年快速编年流转与资产收益自动结算
// ==========================================

/**
 * 平年快速推进：跳过多余日常杂弹窗，自动滚过 3~5 年
 * @param {object} ancestorState 家主状态
 * @param {number} leapYears 跳进年数
 * @returns {object} 流水记录
 */
function advancePeacefulYears(ancestorState, leapYears = 3) {
  const span = Math.max(1, Math.min(5, leapYears));
  ancestorState.year = (ancestorState.year || 100) + span;
  ancestorState.age = (ancestorState.age || 18) + span;
  ancestorState.careerTenureYears = (ancestorState.careerTenureYears || 0) + span;

  // 庄园经济收益
  const yieldResult = calculateManorYield(ancestorState.manor, span);
  ancestorState.capital = (ancestorState.capital || 0) + yieldResult.netMoney;
  ancestorState.money = ancestorState.capital;

  // 岁时健康微调与阅历沉淀
  ancestorState.resilience = (ancestorState.resilience || 50) + span * 2;
  ancestorState.clanPrestige = (ancestorState.clanPrestige || 50) + span;

  const currentYr = ancestorState.year;
  const chronicleEntry = `【公元${currentYr}年·岁月如流】四海承平无重大兵燹。你在庄园静理家政、督率子弟修明家学。${yieldResult.snippet}`;

  return {
    leapYears: span,
    netMoneyGained: yieldResult.netMoney,
    grainProduced: yieldResult.grainProduced,
    chronicleText: chronicleEntry
  };
}

// ==========================================
// 4. 重大历史关隘执行器
// ==========================================

/**
 * 推进第一纪元执行状态
 */
function runEpochOneEvent(eventIndex, optionIndex, currentAncestorState) {
  const evt = EPOCH_ONE_HISTORICAL_EVENTS[eventIndex];
  if (!evt) return null;
  const opt = evt.options[optionIndex];
  if (!opt) return null;

  const result = {
    eventId: evt.id,
    eventTitle: evt.title,
    eventYear: evt.year,
    chosenText: opt.text,
    success: true,
    chronicleSnippet: ''
  };

  // 坞壁庄园联动检定（如黄巾之乱守城）
  if (evt.id === 'hw_event_184_huangjin' && optionIndex === 0 && currentAncestorState.manor) {
    const defenseRes = resolveManorCrisisDefense(currentAncestorState.manor, 'rebel_siege');
    if (defenseRes.defended) {
      currentAncestorState.rep = (currentAncestorState.rep || 50) + 25;
      currentAncestorState.clanPrestige = (currentAncestorState.clanPrestige || 50) + 30;
      result.chronicleSnippet = defenseRes.text;
      return result;
    }
  }

  // 检定逻辑 (支持 reqStat 与 reqTrack 多维赛道映射)
  let statKey = opt.reqStat;
  if (!statKey && opt.reqTrack) {
    const tr = String(opt.reqTrack).toLowerCase();
    if (['official', 'gov', 'politics'].includes(tr)) statKey = 'rep';
    else if (['scholar', 'edu', 'study'].includes(tr)) statKey = 'iq';
    else if (['merchant', 'biz', 'trade'].includes(tr)) statKey = 'iq';
    else if (['military', 'soldier'].includes(tr)) statKey = 'courage';
    else if (['recluse', 'hermit'].includes(tr)) statKey = 'clean';
    else if (['medical', 'doctor', 'herb'].includes(tr)) statKey = 'health';
    else statKey = 'courage';
  }
  if (statKey && typeof opt.reqVal === 'number') {
    const val = currentAncestorState[statKey] !== undefined ? currentAncestorState[statKey] : (currentAncestorState.courage || 50);
    if (val < opt.reqVal) {
      result.success = false;
      const pen = opt.failPenalty || {};
      for (const k in pen) {
        if (k !== 'chronicleText' && k !== 'text') currentAncestorState[k] = (currentAncestorState[k] || 0) + pen[k];
      }
      result.chronicleSnippet = pen.chronicleText || pen.text || '经历波折，勉力支应。';
      return result;
    }
  }

  // 扣除成本
  if (opt.cost) {
    for (const k in opt.cost) {
      currentAncestorState[k] = (currentAncestorState[k] || 0) - opt.cost[k];
    }
  }

  // 获得收益
  const rew = opt.successReward || {};
  for (const k in rew) {
    if (k !== 'chronicleText' && k !== 'text' && k !== 'newMottoTag' && k !== 'officialTitle') {
      currentAncestorState[k] = (currentAncestorState[k] || 0) + rew[k];
    }
  }
  if (rew.officialTitle) {
    currentAncestorState.officialTitle = rew.officialTitle;
  }
  if (rew.newMottoTag) {
    currentAncestorState.mottoTags = currentAncestorState.mottoTags || [];
    currentAncestorState.mottoTags.push(rew.newMottoTag);
  }
  result.chronicleSnippet = rew.chronicleText || rew.text || '行止有定，族风渐清。';
  return result;
}

/**
 * 结算第一纪元终局：生成第一代始祖归档卡
 */
function settleEpochOneAncestor(familyProfile, ancestorState, decisionHistory = []) {
  const givenName = ancestorState.name || '远之';
  const ziHao = ancestorState.ziHao || '伯思';
  const official = ancestorState.officialTitle || ancestorState.jobTitle || '汉故郡功曹';

  // 综合评定谥号
  let posthumous = '文靖公';
  if ((ancestorState.courage || 50) > 70) posthumous = '武襄公';
  else if ((ancestorState.morality || 50) > 70) posthumous = '文肃公';
  else if ((ancestorState.iq || 50) > 70) posthumous = '文宪公';

  // 自动沉淀第一代新家训
  let derivedMotto = '居安思危，深壁固垒。事亲必孝，睦恤九族。';
  if (ancestorState.mottoTags && ancestorState.mottoTags.includes('以德化暴')) {
    derivedMotto = '天道好还，仁者无敌。逢荒必开仓，待客当推诚。';
  } else if (ancestorState.mottoTags && ancestorState.mottoTags.includes('杏林济众')) {
    derivedMotto = '精诚修仁，不务虚名。活人者寿，世守药囊。';
  }

  const deeds = decisionHistory.map(d => `【${d.eventYear}年】${d.chronicleSnippet}`);

  // 动态依据经历的历史大案计算生卒年份
  const years = decisionHistory.map(d => d.eventYear).filter(y => typeof y === 'number');
  const minYear = years.length > 0 ? Math.min(...years) : 168;
  const maxYear = years.length > 0 ? Math.max(...years) : 220;
  const birthYear = ancestorState.birthYear || Math.max(100, minYear - 18);
  const deathYear = ancestorState.deathYear || Math.min(300, Math.max(birthYear + 60, maxYear));
  const lifespan = [birthYear, deathYear];

  // 撰写始祖墓志铭
  let epitaph = '';
  if (decisionHistory.length > 0) {
    const highlights = decisionHistory.map(d => d.chronicleSnippet || d.chosenText).filter(Boolean);
    epitaph = `公生于汉末，长于世族。一生经略风云：${highlights.slice(0, 3).join('；')}。保全宗脉，德荫子孙，百代不朽。`;
  } else {
    epitaph = `生于汉魏风骨之朝，率族人立坞自保、修明经训，卒保宗族老幼无虞。后世百代，皆本于公之余荫。`;
  }

  // 构筑先祖遗泽信包
  const legacyPackage = createAncestralLegacyPackage(familyProfile, ancestorState, decisionHistory);

  return {
    eraIndex: 1,
    eraName: '汉魏风骨',
    givenName,
    ziHao,
    fullName: `${familyProfile.surname || ''}${givenName}`,
    lifespan,
    officialTitle: official,
    posthumousTitle: posthumous,
    epitaph,
    finalDeeds: deeds,
    bequeathedMoney: legacyPackage.bequeathedMoney,
    prestigeGain: ancestorState.clanPrestige || 60,
    newMotto: {
      era: '第一世·汉魏留训',
      text: derivedMotto,
      author: `${familyProfile.surname}公${givenName}`
    },
    passedRelic: legacyPackage.passedRelic,
    legacyPackage // 完整祖荫遗泽信包，供继任世家直接解包继承
  };
}

// ==========================================
// 5. 汉魏天命开局卡与规则破坏型特质库 (Destiny & Perks)
// ==========================================

const HAN_WEI_DESTINY_CARDS = [
  {
    id: 'destiny_dang_gu',
    badge: '🏛️ 遗孤复仇',
    title: '党锢遗孤 · 隐忍复仇',
    shortDesc: '父辈死于党锢大狱，家产查抄。潜逃乡野，怀揣《熹平石经》残卷，誓雪前仇！',
    goal: '10年内名动公卿，入九品中正第一品，诛灭仇僚平反家门！',
    vocationId: 'study_scholar',
    track: 'scholar',
    startingAge: 18,
    initialStats: {
      capital: 800,
      iq: 78,
      culture: 72,
      rep: 42,
      courage: 50,
      health: 80
    },
    initialManor: {
      farmlandAcres: 25,
      watermills: 0,
      fortressLevel: 1,
      armedRetainers: 12,
      granaryStoredGrain: 280,
      libraryTiers: 2
    },
    exclusiveTrait: {
      id: 'trait_danggu_revenge',
      name: '悲愤明志',
      desc: '修学与参悟经训效果提升100%，名望增长速度+50%，每年体魄消耗额外+2。'
    }
  },
  {
    id: 'destiny_wubi_lord',
    badge: '⚔️ 铁血坞主',
    title: '坞壁少主 · 兵临城下',
    shortDesc: '中原险要深垒，宗族精悍部曲严整。黄巾在侧、大饥迫近，乱世生存唯铁与血！',
    goal: '抵御黄巾大暴动，保全乡梓宗族，割据雄关成为一方霸主！',
    vocationId: 'military_honor',
    track: 'military',
    startingAge: 18,
    initialStats: {
      capital: 3500,
      iq: 55,
      culture: 45,
      rep: 50,
      courage: 82,
      health: 90
    },
    initialManor: {
      farmlandAcres: 50,
      watermills: 1,
      fortressLevel: 2,
      armedRetainers: 45,
      granaryStoredGrain: 800,
      libraryTiers: 1
    },
    exclusiveTrait: {
      id: 'trait_fortress_iron',
      name: '深壁固垒',
      desc: '坞壁城防战损降低50%，遭遇贼兵围攻时胜率提高40%，部曲训练费用降低30%。'
    }
  },
  {
    id: 'destiny_merchant_tycoon',
    badge: '🪙 盐铁巨贾',
    title: '盐铁私枭 · 富埒王侯',
    shortDesc: '暗掌黄河水磨与私盐铁冶，家财累亿。贪鄙刺史意欲抄家夺产，唯以钱通神！',
    goal: '用泼天财富买通洛阳三公与九品高官，反手革职刺史，富甲天下！',
    vocationId: 'trade_craft',
    track: 'merchant',
    startingAge: 18,
    initialStats: {
      capital: 28000,
      iq: 72,
      culture: 50,
      rep: 30,
      courage: 58,
      health: 85
    },
    initialManor: {
      farmlandAcres: 35,
      watermills: 3,
      fortressLevel: 1,
      armedRetainers: 25,
      granaryStoredGrain: 500,
      libraryTiers: 1
    },
    exclusiveTrait: {
      id: 'trait_iron_monopoly',
      name: '通天货殖',
      desc: '水碓与商道年度收益翻倍，可用金钱直接消弭政治危机，但每年遭遇查税几率上升。'
    }
  }
];

const HAN_WEI_DESTINY_PERKS = [
  {
    id: 'perk_chongtong',
    tier: 'gold',
    tierName: '金色天命',
    name: '天生重瞳',
    icon: '👁️',
    desc: '海内名宿无视一切名望门槛必定亲切接见，好感增益翻倍，拜师必得绝学真本！'
  },
  {
    id: 'perk_death_soldiers',
    tier: 'purple',
    tierName: '紫色机运',
    name: '死士效节',
    icon: '🗡️',
    desc: '部曲忠诚度锁死100%永不哗变溃逃，战力+50%，城破危机时必定誓死保全家主撤离。'
  },
  {
    id: 'perk_shennong_herb',
    tier: 'purple',
    tierName: '紫色机运',
    name: '神农尝草',
    icon: '🌿',
    desc: '宗族全员免疫大疫毒疾，荒年大疫时可炼制神农伤寒汤救民万人，获泼天民心功勋！'
  },
  {
    id: 'perk_desperate_gamble',
    tier: 'blue',
    tierName: '蓝色奇策',
    name: '孤注一掷',
    icon: '🎲',
    desc: '农桑良田产量减少30%，但水碓工坊与四方商运利润提升100%，以险招求暴利！'
  },
  {
    id: 'perk_sage_dream',
    tier: 'blue',
    tierName: '蓝色奇策',
    name: '先圣遗泽',
    icon: '📜',
    desc: '开局自带传世金石古宝一份，族中家塾每三年自动使所有子弟悟性与文采+3。'
  }
];

// ==========================================
// 6. 时代死线大考与危机检定沙盘 (Crisis Deadlines)
// ==========================================

const HAN_WEI_CRISIS_TIMELINE = [
  {
    id: 'crisis_184_huangjin',
    year: 184,
    title: '⚠️【公元184年·黄巾烽烟】',
    desc: '巨鹿张角聚众三十万揭竿而起！四方郡县瓦解，贼兵前锋直逼你家坞壁！',
    reqDesc: '建议备御：部曲≥35人 或 坞堡≥2重，储备粮≥300石',
    check: (manor, state) => {
      const power = (manor.armedRetainers || 0) * (1 + (manor.fortressLevel || 1) * 0.4);
      const grain = (manor.granaryStoredGrain || 0);
      return power >= 50 && grain >= 200;
    },
    triumph: {
      title: '🏆 固若金汤 · 阵斩贼酋',
      text: '坞壁深垒强弩齐发！部曲精锐斩获千级，俘获降卒20人，缴获贼粮400石，名震一州！',
      apply: (manor, state) => {
        manor.armedRetainers = (manor.armedRetainers || 20) + 20;
        manor.granaryStoredGrain = (manor.granaryStoredGrain || 200) + 400;
        state.rep = (state.rep || 50) + 30;
        state.clanPrestige = (state.clanPrestige || 50) + 35;
      }
    },
    catastrophe: {
      title: '💔 坞壁遭劫 · 血染山庄',
      text: '城防单薄被流寇破垒！粮仓遭焚毁半数，忠勇副将死战断后殉节，族人死伤惨重！',
      apply: (manor, state) => {
        manor.granaryStoredGrain = Math.max(50, Math.round((manor.granaryStoredGrain || 200) * 0.4));
        manor.armedRetainers = Math.max(5, Math.round((manor.armedRetainers || 20) * 0.4));
        state.rep = Math.max(10, (state.rep || 50) - 20);
        state.health = Math.max(30, (state.health || 80) - 25);
      }
    }
  },
  {
    id: 'crisis_190_dongzhuo',
    year: 190,
    title: '⚠️【公元190年·董卓乱政】',
    desc: '西凉董卓焚烧洛阳两百年宫阙，强迁万民！西凉铁骑四出劫掠豪族坞堡！',
    reqDesc: '建议备御：资金≥4000五铢打通关节，或部曲≥50人持险拒守',
    check: (manor, state) => {
      return (state.capital || 0) >= 4000 || (manor.armedRetainers || 0) >= 50;
    },
    triumph: {
      title: '🏆 运筹保全 · 收纳名流',
      text: '你临危不乱，据险扎营同时厚赠将领，不仅坞壁无损，更从洛阳火海中营救出蔡邕门下士子！',
      apply: (manor, state) => {
        state.culture = (state.culture || 50) + 25;
        state.rep = (state.rep || 50) + 25;
        manor.libraryTiers = (manor.libraryTiers || 1) + 1;
      }
    },
    catastrophe: {
      title: '💔 强征洗劫 · 膏腴尽失',
      text: '西凉铁骑勒索巨资，强掠坞壁壮丁三十人，抢走良马金帛，世家百年积累险遭腰斩！',
      apply: (manor, state) => {
        state.capital = Math.max(200, Math.round((state.capital || 2000) * 0.3));
        manor.armedRetainers = Math.max(8, (manor.armedRetainers || 25) - 20);
      }
    }
  },
  {
    id: 'crisis_200_guandu',
    year: 200,
    title: '⚠️【公元200年·官渡风云】',
    desc: '曹操与袁绍对峙官渡！曹军军粮将尽，曹操密使连夜入坞，恳请借粮八百石救急！',
    reqDesc: '历史抉择：押注曹操（需粮≥500石） vs 投靠袁绍（得万两金） vs 闭门两不相帮',
    isGamble: true
  },
  {
    id: 'crisis_208_chibi_epidemic',
    year: 208,
    title: '⚠️【公元208年·建安大疫】',
    desc: '大疫流行，人多夭折！赤壁两军尸横江渚，疫疠蔓延中原，无数宗族阖门覆灭！',
    reqDesc: '建议备御：存粮≥600石赈灾，或精通岐黄医道/持有神农特质',
    check: (manor, state) => {
      const hasHerbPerk = (state.tags && state.tags['perk_shennong_herb']) || (state.activeDestinyPerk && state.activeDestinyPerk.id === 'perk_shennong_herb');
      return hasHerbPerk || (manor.granaryStoredGrain || 0) >= 500 || (state.health || 0) >= 85;
    },
    triumph: {
      title: '🏆 施粥舍药 · 普度黎元',
      text: '你大开粮仓煎熬伤寒解毒汤，活人万余！四海黎民跪拜如生神仙，朝廷破格加封太医令与关内侯！',
      apply: (manor, state) => {
        state.rep = (state.rep || 50) + 35;
        state.clanPrestige = (state.clanPrestige || 50) + 40;
        manor.granaryStoredGrain = Math.max(100, (manor.granaryStoredGrain || 500) - 200);
      }
    },
    catastrophe: {
      title: '💔 疫魔侵袭 · 骨肉凋零',
      text: '宗族未备药粮，全族感染寒热！族中三位长辈与半数佃丁染疾早逝，坞壁哀鸿遍野！',
      apply: (manor, state) => {
        state.health = Math.max(20, (state.health || 80) - 40);
        state.resilience = Math.max(20, (state.resilience || 50) - 20);
        manor.farmlandAcres = Math.max(15, Math.round((manor.farmlandAcres || 40) * 0.7));
      }
    }
  },
  {
    id: 'crisis_249_gaopingling',
    year: 249,
    title: '⚠️【公元249年·高平陵之变】',
    desc: '太傅司马懿称病暴起，关死洛阳洛水浮桥，诛曹爽三族！魏晋易代滔天政治血洗展开！',
    reqDesc: '生死抉择：助司马懿掌权 vs 誓死效忠曹魏 vs 遁入竹林避祸清谈',
    isGamble: true
  }
];

/**
 * 获取当前年份下一个紧迫的历史死线大考
 */
function getNextImminentCrisis(currentYear) {
  const y = currentYear || 100;
  for (let i = 0; i < HAN_WEI_CRISIS_TIMELINE.length; i++) {
    const c = HAN_WEI_CRISIS_TIMELINE[i];
    if (c.year >= y) {
      return {
        ...c,
        yearsLeft: c.year - y
      };
    }
  }
  return {
    id: 'crisis_291_eight_princes',
    year: 291,
    title: '⚠️【公元291年·八王乱起】',
    desc: '西晋皇室内讧兵连祸结，五胡乱华烽火隐现！速决断南渡立足江南会稽！',
    reqDesc: '终极大考：聚敛资财南渡建业，再定江左门阀！',
    yearsLeft: Math.max(0, 291 - y)
  };
}

// ==========================================
// 7. 家督令指令执行系统 (Manor Action Orders)
// ==========================================

const HAN_WEI_MANOR_ORDERS = {
  reclaim_farm: {
    key: 'reclaim_farm',
    name: '拓荒屯田',
    icon: '🌾',
    costDesc: '耗400五铢',
    gainDesc: '良田+10顷·粮+80石',
    cost: { capital: 400 },
    execute: (manor, state) => {
      manor.farmlandAcres = (manor.farmlandAcres || 40) + 10;
      manor.granaryStoredGrain = (manor.granaryStoredGrain || 300) + 80;
      return { msg: '开山引渠辟得良田十顷，今岁粟米多收八十石！', float: '+10田 +80粮', color: '#34d399' };
    }
  },
  train_retainers: {
    key: 'train_retainers',
    name: '整肃武备',
    icon: '🛡️',
    costDesc: '耗500铢+80石粮',
    gainDesc: '部曲+15精壮·城防+0.2',
    cost: { capital: 500, grain: 80 },
    execute: (manor, state) => {
      manor.armedRetainers = (manor.armedRetainers || 20) + 15;
      manor.fortressLevel = Number(((manor.fortressLevel || 1) + 0.2).toFixed(1));
      return { msg: '选拔流民健壮为家丁死士，操练环首刀弓箭，坞壁战力大振！', float: '+15死士', color: '#f87171' };
    }
  },
  build_fortress: {
    key: 'build_fortress',
    name: '修缮坞壁',
    icon: '🏰',
    costDesc: '耗800铢+100石粮',
    gainDesc: '城防+1级·避险翻倍',
    cost: { capital: 800, grain: 100 },
    execute: (manor, state) => {
      manor.fortressLevel = Math.round((manor.fortressLevel || 1) + 1);
      return { msg: '加筑滚木弩箭垛口与内外护城壕，坞壁坚如生铁！', float: `城防升至${manor.fortressLevel}级`, color: '#fde047' };
    }
  },
  lecture_academy: {
    key: 'lecture_academy',
    name: '立塾讲学',
    icon: '📜',
    costDesc: '耗450五铢',
    gainDesc: '文采+15·声望+15·悟性+5',
    cost: { capital: 450 },
    execute: (manor, state) => {
      state.culture = (state.culture || 50) + 15;
      state.rep = (state.rep || 50) + 15;
      state.iq = (state.iq || 50) + 5;
      manor.libraryTiers = (manor.libraryTiers || 1);
      return { msg: '广设书塾注疏古文群经，四方士子登门请益，门第清名大彰！', float: '+15文华 +15声望', color: '#6ee7b7' };
    }
  },
  merchant_trade: {
    key: 'merchant_trade',
    name: '水碓货殖',
    icon: '🪙',
    costDesc: '耗80石粮',
    gainDesc: '得2500~3500五铢钱',
    cost: { grain: 80 },
    execute: (manor, state) => {
      const baseGain = 2500 + (manor.watermills || 1) * 600;
      state.capital = (state.capital || 0) + baseGain;
      return { msg: '水碓磨面并车舟贩运丝帛盐铁，利市三倍，获利丰厚！', float: `+${baseGain}五铢`, color: '#fef08a' };
    }
  },
  distribute_relief: {
    key: 'distribute_relief',
    name: '施粥舍药',
    icon: '🌿',
    costDesc: '耗120石粮',
    gainDesc: '声望+20·引流民+10·健康+5',
    cost: { grain: 120 },
    execute: (manor, state) => {
      state.rep = (state.rep || 50) + 20;
      state.health = Math.min(100, (state.health || 80) + 5);
      manor.armedRetainers = (manor.armedRetainers || 20) + 10;
      return { msg: '于坞壁外置办施粥大棚并施舍伤寒草药，四乡流民感恩戴德，纷纷投效！', float: '+20声誉 +10归附', color: '#a7f3d0' };
    }
  }
};

/**
 * 执行一次家督令
 */
function executeManorOrder(state, orderKey) {
  if (!state || !orderKey) return { ok: false, error: '无效指令' };
  const order = HAN_WEI_MANOR_ORDERS[orderKey];
  if (!order) return { ok: false, error: '指令不存在' };

  if ((state.ap !== undefined ? state.ap : 3) <= 0) {
    return { ok: false, error: '当年心力已耗尽，请点击度过此年！' };
  }

  state.manor = state.manor || initManor(state.track);
  const manor = state.manor;

  // 校验成本
  if (order.cost) {
    if (order.cost.capital && (state.capital || 0) < order.cost.capital) {
      return { ok: false, error: `五铢钱不足（需 ${order.cost.capital} 铢）` };
    }
    if (order.cost.grain && (manor.granaryStoredGrain || 0) < order.cost.grain) {
      return { ok: false, error: `仓廪存粮不足（需 ${order.cost.grain} 石）` };
    }
    // 扣除成本
    if (order.cost.capital) state.capital -= order.cost.capital;
    if (order.cost.grain) manor.granaryStoredGrain -= order.cost.grain;
  }

  // 扣减精力
  state.ap = Math.max(0, (state.ap !== undefined ? state.ap : 3) - 1);

  // 执行具体收益
  const result = order.execute(manor, state);
  state.annualActionsTaken = (state.annualActionsTaken || 0) + 1;

  // 🎲 多巴胺暴击与惊喜奇遇 (当开启真实交互暴击模式时触发)
  const isCritRoll = state._triggerCrit || (state._enableOrderCrits && Math.random() < 0.28);
  if (isCritRoll) {
    result.isCrit = true;
    if (orderKey === 'reclaim_farm') {
      manor.farmlandAcres += 15;
      manor.granaryStoredGrain += 120;
      result.float = '💥 辟得沃野! +25田 +200粮';
      result.msg = '【福地大丰收】掘出先秦清泉沃壤，良田增辟25顷，粟米入库暴涨！';
    } else if (orderKey === 'train_retainers') {
      manor.armedRetainers += 15;
      manor.fortressLevel = Number(((manor.fortressLevel || 1) + 0.3).toFixed(1));
      result.float = '💥 猛士相投! +30死士';
      result.msg = '【边塞猛将】边境落魄豪侠率麾下悍勇死士投奔，战力大暴击！';
    } else if (orderKey === 'build_fortress') {
      manor.fortressLevel += 1;
      result.float = `💥 巧夺天工! 城防升至${manor.fortressLevel}重`;
      result.msg = '【墨家悬机】修成绝险滚木悬门与双层瓮城，防务固若金汤！';
    } else if (orderKey === 'merchant_trade') {
      const extraMoney = 5000 + Math.floor(Math.random() * 3000);
      state.capital = (state.capital || 0) + extraMoney;
      result.float = `💥 货殖暴利! +${extraMoney + 3000}铢`;
      result.msg = '【奇货可居】洛阳巨室豪商倾囊扫货，私盐丝帛利市十倍！';
    } else if (orderKey === 'lecture_academy') {
      state.culture = (state.culture || 50) + 15;
      state.rep = (state.rep || 50) + 15;
      result.float = '💥 鸿儒登门! +30文华 +30名望';
      result.msg = '【大儒开坛】海内经学泰斗亲临讲学赐书，宗族名动天下士林！';
    } else if (orderKey === 'distribute_relief') {
      state.rep = (state.rep || 50) + 20;
      manor.armedRetainers = (manor.armedRetainers || 20) + 15;
      result.float = '💥 万民归附! +40声望 +25死士';
      result.msg = '【仁德动天】四乡饥民奔走相告，无数精壮健丁自愿投效签押死士！';
    }
  }

  // 检查是否激活 Build 套路质变
  const combo = checkManorBuildCombos(state);

  return {
    ok: true,
    result,
    combo,
    ordersLeft: state.ap
  };
}

// ==========================================
// 8. 汉魏三大流派质变检定 (Build Combos)
// ==========================================

function checkManorBuildCombos(state) {
  if (!state || !state.manor) return null;
  const manor = state.manor;
  state.tags = state.tags || {};

  // 1. 铁血霸主流
  if ((manor.fortressLevel || 1) >= 3 && (manor.armedRetainers || 0) >= 60 && !state.tags['combo_iron_warlord']) {
    state.tags['combo_iron_warlord'] = true;
    state.rep = (state.rep || 50) + 30;
    return {
      id: 'combo_iron_warlord',
      name: '👑 雄踞一方 · 铁血坞主',
      desc: '坞壁雄峙山险，甲士如林！四方贼寇避道而行，诸侯纷送重礼修好！'
    };
  }

  // 2. 文宗泰斗流
  if ((manor.libraryTiers || 1) >= 3 && (state.culture || 50) >= 80 && !state.tags['combo_grand_scholar']) {
    state.tags['combo_grand_scholar'] = true;
    state.rep = (state.rep || 50) + 35;
    return {
      id: 'combo_grand_scholar',
      name: '📜 一代文宗 · 经学冠冕',
      desc: '藏书万卷，注疏风行！天下儒宗以得公一字之评为荣，入仕九品直登台阁！'
    };
  }

  // 3. 富埒王侯流
  if ((manor.watermills || 1) >= 3 && (state.capital || 0) >= 50000 && !state.tags['combo_golden_tycoon']) {
    state.tags['combo_golden_tycoon'] = true;
    return {
      id: 'combo_golden_tycoon',
      name: '🪙 富埒王侯 · 九州通市',
      desc: '水碓运转不绝，金山银海通达四海！以一族之财足佐大军十万之饷！'
    };
  }

  return null;
}

// ==========================================
// 8. 汉魏短周期生存考验 (每3~5年天灾人祸与损失厌恶)
// ==========================================

const HAN_WEI_SHORT_CRISES = [
  {
    id: 'short_crisis_drought',
    title: '关中旱蝗大荒',
    desc: '赤地千里，蝗虫蔽天！周边流民饥号聚聚坞堡门前，市面粮价暴涨十倍！',
    reqDesc: '备御：仓廪存粮≥150石 或 耗资1200五铢开渠赈恤',
    check: (manor, state) => (manor.granaryStoredGrain || 0) >= 150 || (state.capital || 0) >= 1200,
    triumph: {
      title: '🏆 开仓济荒 · 万民感恩',
      text: '你大开粮仓设棚施粥，活人无数！乡里流民感念大德，十五名精壮自愿签押死士效节！',
      apply: (manor, state) => {
        manor.granaryStoredGrain = Math.max(50, (manor.granaryStoredGrain || 150) - 80);
        manor.armedRetainers = (manor.armedRetainers || 20) + 15;
        state.rep = (state.rep || 50) + 20;
      }
    },
    catastrophe: {
      title: '💔 仓廪遭哄抢 · 良田荒芜',
      text: '存粮匮乏且无钱赈济，饥民破仓哄抢！良田荒芜十顷，部曲染疾死伤惨重！',
      apply: (manor, state) => {
        manor.granaryStoredGrain = Math.max(10, Math.round((manor.granaryStoredGrain || 100) * 0.4));
        manor.farmlandAcres = Math.max(15, (manor.farmlandAcres || 30) - 10);
        manor.armedRetainers = Math.max(5, (manor.armedRetainers || 20) - 8);
        state.rep = Math.max(10, (state.rep || 50) - 15);
      }
    }
  },
  {
    id: 'short_crisis_bandits',
    title: '太行流寇犯境',
    desc: '白波山贼百余悍卒破关下山，沿途村坞尽遭洗劫，黑压压兵临坞壁之下！',
    reqDesc: '备御：部曲≥30人 或 城防≥2重，或献纳1500五铢买路',
    check: (manor, state) => (manor.armedRetainers || 0) >= 30 || (manor.fortressLevel || 1) >= 2 || (state.capital || 0) >= 1500,
    triumph: {
      title: '🏆 强弩据险 · 阵斩寇首',
      text: '坞壁垛口强弩齐射，死士出击重创贼锋！贼首被阵斩，缴获战马皮甲与五铢钱！',
      apply: (manor, state) => {
        state.capital = (state.capital || 0) + 2000;
        state.rep = (state.rep || 50) + 20;
        manor.armedRetainers = (manor.armedRetainers || 20) + 10;
      }
    },
    catastrophe: {
      title: '💔 坞壁遭劫 · 资财大损',
      text: '城防单薄且私兵寡弱，贼寇撞破木闸劫掠粮仓与货殖工坊，死士伤亡惨重！',
      apply: (manor, state) => {
        state.capital = Math.max(100, Math.round((state.capital || 1000) * 0.4));
        manor.armedRetainers = Math.max(5, Math.round((manor.armedRetainers || 20) * 0.5));
        state.health = Math.max(30, (state.health || 80) - 15);
      }
    }
  },
  {
    id: 'short_crisis_shakedown',
    title: '郡守苛税逼索',
    desc: '贪墨刺史假借修筑御道与征蛮之名，向各县豪族勒索巨额钱粮，逾期者查抄坞产！',
    reqDesc: '备御：五铢钱≥2500，或士林文采≥60上书免除',
    check: (manor, state) => (state.capital || 0) >= 2500 || (state.culture || 0) >= 60,
    triumph: {
      title: '🏆 运筹化解 · 名扬公卿',
      text: '你巧借经学名家之势上书洛阳公卿，太守畏惧清议被迫撤回苛派，宗族门望大彰！',
      apply: (manor, state) => {
        state.rep = (state.rep || 50) + 25;
        state.culture = (state.culture || 50) + 10;
      }
    },
    catastrophe: {
      title: '💔 官衙严索 · 查没私产',
      text: '朝中无援，官府悍然查封你家一处水碓磨坊并罚没重金，元气大伤！',
      apply: (manor, state) => {
        state.capital = Math.max(200, (state.capital || 2000) - 1800);
        manor.watermills = Math.max(0, (manor.watermills || 1) - 1);
        state.rep = Math.max(10, (state.rep || 50) - 15);
      }
    }
  },
  {
    id: 'short_crisis_pestilence',
    title: '族中伤寒疫病',
    desc: '冬春之交阴湿寒冻，宗族上下突发寒热大疫，若无药汤救治将死伤枕藉！',
    reqDesc: '备御：存粮≥180石熬药 或 持有神农特质，或耗资1000五铢求医',
    check: (manor, state) => {
      const hasHerb = !!(state.tags && state.tags['perk_shennong_herb']);
      return hasHerb || (manor.granaryStoredGrain || 0) >= 180 || (state.capital || 0) >= 1000;
    },
    triumph: {
      title: '🏆 药石良方 · 全族康健',
      text: '你调集药材并按经方熬制祛寒良药，不仅全族无一人亡故，更救活邻近坞堡族人！',
      apply: (manor, state) => {
        state.health = Math.min(100, (state.health || 80) + 15);
        state.rep = (state.rep || 50) + 20;
      }
    },
    catastrophe: {
      title: '💔 疫疠肆虐 · 骨肉凋零',
      text: '缺药少粮，族中数位管事长辈与二十余名佃客壮丁相继病亡，人心惶惶！',
      apply: (manor, state) => {
        state.health = Math.max(20, (state.health || 80) - 30);
        manor.armedRetainers = Math.max(5, (manor.armedRetainers || 20) - 10);
        manor.farmlandAcres = Math.max(15, (manor.farmlandAcres || 30) - 8);
      }
    }
  }
];

function getShortCycleCrisis(year, state) {
  const y = year || 104;
  const idx = Math.abs(Math.floor((y - 104) / 4)) % HAN_WEI_SHORT_CRISES.length;
  const c = HAN_WEI_SHORT_CRISES[idx];
  return {
    ...c,
    year: y,
    yearsLeft: 0,
    isShortCycle: true
  };
}

// ==========================================
// 9. 宗祠香火局外天赋树系统 (Ancestral Incense Meta-Progression)
// ==========================================

const ANCESTRAL_HERITAGE_PERKS = [
  {
    key: 'perk_ancestral_land',
    name: '先祖赐田',
    cost: 10,
    icon: '🌾',
    desc: '始祖遗泽：开局良田永久+15顷，仓储粟米+100石',
    apply: (state) => {
      state.manor = state.manor || {};
      state.manor.farmlandAcres = (state.manor.farmlandAcres || 40) + 15;
      state.manor.granaryStoredGrain = (state.manor.granaryStoredGrain || 300) + 100;
    }
  },
  {
    key: 'perk_ancestral_guard',
    name: '部曲世荫',
    cost: 15,
    icon: '🛡️',
    desc: '开局部曲死士永久+15人，城防起步升至第2重',
    apply: (state) => {
      state.manor = state.manor || {};
      state.manor.armedRetainers = (state.manor.armedRetainers || 20) + 15;
      state.manor.fortressLevel = Math.max(2, (state.manor.fortressLevel || 1) + 1);
    }
  },
  {
    key: 'perk_ancestral_wealth',
    name: '陶朱遗资',
    cost: 15,
    icon: '🪙',
    desc: '开局带入祖传五铢钱金山+6,000铢，水碓磨坊+1座',
    apply: (state) => {
      state.capital = (state.capital || 0) + 6000;
      state.money = state.capital;
      state.manor = state.manor || {};
      state.manor.watermills = (state.manor.watermills || 1) + 1;
    }
  },
  {
    key: 'perk_ancestral_reroll',
    name: '天命神卜',
    cost: 20,
    icon: '🎲',
    desc: '开局洗髓改命次数永久+2次，洗出金色天命概率翻倍',
    apply: (state) => {
      state.freeRerolls = (state.freeRerolls || 3) + 2;
    }
  },
  {
    key: 'perk_ancestral_relic',
    name: '汉魏古宝',
    cost: 25,
    icon: '🏺',
    desc: '开局自带传世金石古玉一份，每年声望自动+3，九品易登高位',
    apply: (state) => {
      state.rep = (state.rep || 50) + 20;
      state.tags = state.tags || {};
      state.tags['has_ancestral_jade'] = true;
    }
  },
  {
    key: 'perk_ancestral_fortress',
    name: '金汤天险',
    cost: 30,
    icon: '🏰',
    desc: '城防大考防破率永久提升30%，面对流寇大军战损减半',
    apply: (state) => {
      state.tags = state.tags || {};
      state.tags['fortress_bonus_def'] = true;
    }
  }
];

let _inMemoryHeritage = null;

function loadAncestralHeritage() {
  if (_inMemoryHeritage) return _inMemoryHeritage;
  let data = null;
  try {
    if (typeof wx !== 'undefined' && wx.getStorageSync) {
      data = wx.getStorageSync('clan_ancestral_heritage');
    }
  } catch (_) {}
  if (!data || typeof data !== 'object') {
    data = {
      incensePoints: 0,
      totalRuns: 0,
      unlockedPerks: {},
      bestYears: 0
    };
  }
  _inMemoryHeritage = data;
  return data;
}

function saveAncestralHeritage(data) {
  _inMemoryHeritage = data;
  try {
    if (typeof wx !== 'undefined' && wx.setStorageSync) {
      wx.setStorageSync('clan_ancestral_heritage', data);
    }
  } catch (_) {}
}

function calculateIncenseGain(state) {
  if (!state) return 10;
  const yr = state.year || 100;
  const yrsLived = Math.max(1, yr - 100);
  let pts = Math.floor(yrsLived / 3);
  if ((state.capital || 0) >= 20000) pts += 5;
  if ((state.capital || 0) >= 50000) pts += 10;
  if (state.manor && (state.manor.armedRetainers || 0) >= 50) pts += 5;
  if (state.manor && (state.manor.fortressLevel || 1) >= 3) pts += 5;
  if (state.handledEvents) {
    if (state.handledEvents['crisis_184']) pts += 10;
    if (state.handledEvents['crisis_200']) pts += 10;
    if (state.handledEvents['crisis_249']) pts += 10;
  }
  return Math.max(8, pts);
}

function applyAncestralPerksToState(state) {
  const heritage = loadAncestralHeritage();
  if (!heritage || !heritage.unlockedPerks) return;
  for (const p of ANCESTRAL_HERITAGE_PERKS) {
    if (heritage.unlockedPerks[p.key]) {
      p.apply(state);
    }
  }
}

function unlockAncestralPerk(perkKey) {
  const heritage = loadAncestralHeritage();
  const perk = ANCESTRAL_HERITAGE_PERKS.find(p => p.key === perkKey);
  if (!perk) return { ok: false, error: '不存在该先祖遗泽' };
  if (heritage.unlockedPerks[perkKey]) return { ok: false, error: '该祖训已传承点亮！' };
  if (heritage.incensePoints < perk.cost) return { ok: false, error: `宗族香火不足（需 ${perk.cost} 缕香火）` };

  heritage.incensePoints -= perk.cost;
  heritage.unlockedPerks[perkKey] = true;
  saveAncestralHeritage(heritage);
  return { ok: true, perk, remainingIncense: heritage.incensePoints };
}

// ==========================================
// 汉魏家族奠基阶段目标体系 (Milestone Quests)
// 彻底解决“进游戏不知干嘛”痛点：提供极简、直观、即时正反馈的阶段式目标指引
// ==========================================
const HAN_WEI_MILESTONE_QUESTS = [
  {
    index: 1,
    id: 'quest_1_food',
    title: '第一阶段 · 辟地拓粮',
    desc: '初掌门户，首重仓廪！开荒屯田，积粟达 300 石以安顿族人。',
    targetLabel: '存粮',
    unit: '石',
    currentVal: (state) => (state.manor ? Math.round(state.manor.granaryStoredGrain || 0) : 0),
    targetVal: 300,
    rewardDesc: '五铢 +1500 铢 · 先祖声望 +15',
    applyReward: (state) => {
      state.capital = (state.capital || 0) + 1500;
      state.rep = (state.rep || 50) + 15;
    },
    hint: '点击下方【拓荒屯田】开辟良田增产！',
    recommendedOrder: 'reclaim_farm'
  },
  {
    index: 2,
    id: 'quest_2_force',
    title: '第二阶段 · 编练部曲',
    desc: '乱世将至，流寇盘踞！整肃武备，招募部曲死士达 30 人保卫坞壁。',
    targetLabel: '部曲',
    unit: '人',
    currentVal: (state) => (state.manor ? Math.round(state.manor.armedRetainers || 0) : 0),
    targetVal: 30,
    rewardDesc: '五铢 +2000 铢 · 战力声名鹊起',
    applyReward: (state) => {
      state.capital = (state.capital || 0) + 2000;
      state.rep = (state.rep || 50) + 20;
    },
    hint: '点击下方【整肃武备】招募精壮死士！',
    recommendedOrder: 'train_retainers'
  },
  {
    index: 3,
    id: 'quest_3_fortress',
    title: '第三阶段 · 坞壁深垒',
    desc: '加固城防防御至第 2 重，良田达 40 顷，铸就金汤基业！',
    targetLabel: '城防',
    unit: '重',
    currentVal: (state) => (state.manor ? (state.manor.fortressLevel || 1) : 1),
    targetVal: 2,
    rewardDesc: '晋升郡望名族 · 获赐九品推举名额',
    applyReward: (state) => {
      state.rep = (state.rep || 50) + 30;
      if (state.manor) state.manor.farmlandAcres = Math.max(state.manor.farmlandAcres || 0, 45);
    },
    hint: '点击【更多策令】中的【修缮坞壁】加固城防！',
    recommendedOrder: 'build_fortress'
  },
  {
    index: 4,
    id: 'quest_4_crisis_184',
    title: '第四阶段 · 决战黄巾烽烟',
    desc: '公元184年时代巨浪！部曲≥35人、城防≥2重，从容迎击时代大考！',
    targetLabel: '部曲达标',
    unit: '人',
    currentVal: (state) => (state.manor ? Math.min(35, state.manor.armedRetainers || 0) : 0),
    targetVal: 35,
    rewardDesc: '击溃黄巾军 · 封侯拜相定九品！',
    applyReward: (state) => {
      state.rep = (state.rep || 50) + 50;
    },
    hint: '保持充足部曲与存粮，时代大考决战！',
    recommendedOrder: 'train_retainers'
  }
];

function getCurrentMilestoneQuest(state) {
  if (!state.completedMilestones) state.completedMilestones = {};
  for (const q of HAN_WEI_MILESTONE_QUESTS) {
    if (!state.completedMilestones[q.id]) {
      const cur = q.currentVal(state);
      const isCompleted = cur >= q.targetVal;
      const progress = Math.min(1.0, Math.max(0, cur / q.targetVal));
      return {
        ...q,
        current: cur,
        progress,
        isCompleted
      };
    }
  }
  return {
    index: 5,
    id: 'quest_all_done',
    title: '极盛华夏 · 传世名门',
    desc: '宗族基业已固若金汤！运筹三策，笑看天下风云变幻！',
    targetLabel: '名望',
    unit: '点',
    currentVal: (state) => state.rep || 50,
    targetVal: 100,
    rewardDesc: '青史留名 · 万世景仰',
    hint: '从容统御坞壁，迈向两百年终局！',
    current: state.rep || 50,
    progress: Math.min(1.0, (state.rep || 50) / 100),
    isCompleted: (state.rep || 50) >= 100
  };
}

function checkAndClaimMilestoneQuest(state) {
  const quest = getCurrentMilestoneQuest(state);
  if (quest && quest.isCompleted && quest.id !== 'quest_all_done') {
    if (!state.completedMilestones) state.completedMilestones = {};
    state.completedMilestones[quest.id] = true;
    if (quest.applyReward) quest.applyReward(state);
    return { claimed: true, quest };
  }
  return { claimed: false, quest };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EPOCH_ONE_HISTORICAL_EVENTS,
    ALL_SEASON_ONE_CHRONO_EVENTS,
    initManor,
    calculateManorYield,
    resolveManorCrisisDefense,
    createAncestralLegacyPackage,
    applyAncestralLegacyToDescendant,
    advancePeacefulYears,
    runEpochOneEvent,
    settleEpochOneAncestor,
    // 扩展模块
    HAN_WEI_DESTINY_CARDS,
    HAN_WEI_DESTINY_PERKS,
    HAN_WEI_CRISIS_TIMELINE,
    HAN_WEI_MANOR_ORDERS,
    getNextImminentCrisis,
    executeManorOrder,
    checkManorBuildCombos,
    // 短周期生存考验与宗祠香火局外天赋
    HAN_WEI_SHORT_CRISES,
    getShortCycleCrisis,
    ANCESTRAL_HERITAGE_PERKS,
    loadAncestralHeritage,
    saveAncestralHeritage,
    calculateIncenseGain,
    applyAncestralPerksToState,
    unlockAncestralPerk,
    // 阶段目标体系
    HAN_WEI_MILESTONE_QUESTS,
    getCurrentMilestoneQuest,
    checkAndClaimMilestoneQuest
  };
}
