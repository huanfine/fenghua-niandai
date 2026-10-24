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
    return {
      farmlandAcres: Math.max(30, Math.round((inheritedManor.farmlandAcres || 50) * 0.85)),
      watermills: Math.max(0, (inheritedManor.watermills || 1)),
      fortressLevel: Math.max(1, (inheritedManor.fortressLevel || 1)),
      armedRetainers: Math.max(15, Math.round((inheritedManor.armedRetainers || 30) * 0.8)),
      granaryStoredGrain: Math.max(200, Math.round((inheritedManor.granaryStoredGrain || 500) * 0.7)),
      libraryTiers: Math.max(1, (inheritedManor.libraryTiers || 1)),
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
    settleEpochOneAncestor
  };
}
