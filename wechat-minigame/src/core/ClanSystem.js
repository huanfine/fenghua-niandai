/**
 * 华夏世家大系 · 宗族与世家系统 (Clan System)
 * 职责：
 * 1. 负责世家门阀立族、宗祠、郡望堂号、祖训家规；
 * 2. 跨代世系辈分字派起名、先祖功业与谥号录入；
 * 3. 宗族公积金/信托基金与门阀声望结算。
 */

class ClanSystem {
  constructor() {}

  /**
   * 创设世家基本档案
   */
  createClan(params = {}) {
    const province = params.province || '河南';
    const surname = params.surname || '陈';
    const hallName = params.hallName || '颍川堂';
    const pillarName = params.pillarName || '耕读传家 · 诗书润骨';

    return {
      clanId: `clan_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
      province,
      surname,
      hallName,
      pillarName,
      establishedYear: params.year || 100,
      generationsCount: 1,
      clanPrestige: params.initialPrestige || 50,
      clanTrustFund: params.initialFund || 20000,
      ancestors: [],
      mottos: [params.firstMotto || '居安思危，深壁固垒。事亲必孝，睦恤九族。'],
      alliances: []
    };
  }

  /**
   * 录入先祖入祠堂大谱
   */
  recordAncestorToGenealogy(clan, ancestorRecord) {
    if (!clan || !Array.isArray(clan.ancestors)) return null;
    const entry = Object.assign({
      generationIndex: clan.generationsCount,
      recordedAt: Date.now(),
      posthumousTitle: '公',
      officialTitle: '名望先祖',
      lifespan: [100, 160],
      deeds: []
    }, ancestorRecord);

    clan.ancestors.push(entry);
    clan.generationsCount += 1;
    clan.clanPrestige = (clan.clanPrestige || 0) + (entry.bequestPrestige || 30);
    return entry;
  }

  /**
   * 缔结秦晋之好 (两姓联姻盟好)
   */
  formAlliance(clanA, clanB, allianceGift = 2500) {
    if (!clanA || !clanB) return false;
    clanA.alliances = clanA.alliances || [];
    clanB.alliances = clanB.alliances || [];

    clanA.alliances.push({ allyClanId: clanB.clanId, allyName: `${clanB.province}·${clanB.surname}氏·${clanB.hallName}`, formedAt: Date.now() });
    clanB.alliances.push({ allyClanId: clanA.clanId, allyName: `${clanA.province}·${clanA.surname}氏·${clanA.hallName}`, formedAt: Date.now() });

    clanA.clanTrustFund = (clanA.clanTrustFund || 0) + allianceGift;
    clanA.clanPrestige = (clanA.clanPrestige || 0) + 25;

    clanB.clanTrustFund = (clanB.clanTrustFund || 0) + allianceGift;
    clanB.clanPrestige = (clanB.clanPrestige || 0) + 25;

    return true;
  }
}

const clanSystem = new ClanSystem();

module.exports = {
  ClanSystem,
  clanSystem
};
