/**
 * meta-service/clanTreasury.js
 * 宗族宝库服务：传家宝管理、重复技能卡自动转碎片与祖训底蕴树 (加成硬上限+15%)
 */

const { RESOURCES_CAP } = require('../sim-core/rules.js');

class ClanTreasuryService {
  /**
   * 初始化宗族宝库持久态
   */
  static initTreasury() {
    return {
      heirlooms: [],              // 传家宝列表
      skills: {},                 // skillId -> { id, stars: 1~3, fragments: number }
      ancestralScrolls: 0,        // 祖训残卷
      washMarrowTokens: 3,        // 洗髓令
      directSelectFragments: 0,   // 直选券碎片 (10片合成1张直选券)
      directSelectVouchers: 0,    // 直选券
      heritageBuffTree: {         // 宗祠底蕴树
        prestige: 0,              // 0 ~ 0.15
        wealth: 0,
        force: 0,
        grain: 0
      }
    };
  }

  /**
   * 获得技能卡入库：若已有则自动转换为碎片用于升星
   * @param {Object} treasury
   * @param {Object} skillCard
   */
  static addSkillCard(treasury, skillCard) {
    const id = skillCard.id;
    if (!treasury.skills[id]) {
      treasury.skills[id] = {
        id,
        name: skillCard.name,
        faction: skillCard.faction,
        quality: skillCard.quality,
        stars: 1,
        fragments: 0
      };
      return { action: 'unlocked', skill: treasury.skills[id] };
    }

    // 重复获得：自动转换为碎片 (白卡5片, 蓝卡10片, 紫卡20片, 金卡40片)
    const fragmentMap = { common: 5, fine: 10, epic: 20, legendary: 40 };
    const fragmentsGained = fragmentMap[skillCard.quality] || 10;
    const entry = treasury.skills[id];
    entry.fragments += fragmentsGained;

    // 检查是否可自动升星 (1星->2星需20片, 2星->3星需50片, 3星满级)
    let starUpgraded = false;
    if (entry.stars === 1 && entry.fragments >= 20) {
      entry.fragments -= 20;
      entry.stars = 2;
      starUpgraded = true;
    } else if (entry.stars === 2 && entry.fragments >= 50) {
      entry.fragments -= 50;
      entry.stars = 3;
      starUpgraded = true;
    }

    return {
      action: 'converted_to_fragments',
      fragmentsGained,
      currentFragments: entry.fragments,
      stars: entry.stars,
      starUpgraded
    };
  }

  /**
   * 消耗祖训残卷升级宗祠底蕴树维度
   * 严格落实：各维度加成封顶 +15%
   * @param {Object} treasury
   * @param {'prestige'|'wealth'|'force'|'grain'} dimension
   */
  static upgradeHeritageTree(treasury, dimension) {
    if (treasury.ancestralScrolls < 1) {
      return { success: false, reason: '祖训残卷不足' };
    }

    const currentBuff = treasury.heritageBuffTree[dimension] || 0;
    if (currentBuff >= RESOURCES_CAP.MAX_CLAN_RESOURCE_BUFF) {
      return { success: false, reason: `该维度底蕴加成已达最大上限 (+${RESOURCES_CAP.MAX_CLAN_RESOURCE_BUFF * 100}%)` };
    }

    // 升级：每次消耗 1 卷，加成 +3%，最高不超过 15%
    treasury.ancestralScrolls--;
    const nextBuff = Math.min(RESOURCES_CAP.MAX_CLAN_RESOURCE_BUFF, Math.round((currentBuff + 0.03) * 100) / 100);
    treasury.heritageBuffTree[dimension] = nextBuff;

    return {
      success: true,
      dimension,
      buff: nextBuff,
      remainingScrolls: treasury.ancestralScrolls
    };
  }

  /**
   * 合成天命直选券 (10 碎片 -> 1 张券)
   */
  static craftDirectSelectVoucher(treasury) {
    if (treasury.directSelectFragments < 10) {
      return { success: false, reason: '直选券碎片不足 10 枚' };
    }

    treasury.directSelectFragments -= 10;
    treasury.directSelectVouchers = (treasury.directSelectVouchers || 0) + 1;

    return {
      success: true,
      vouchers: treasury.directSelectVouchers,
      remainingFragments: treasury.directSelectFragments
    };
  }

  /**
   * 获取起始家族加成 (供局内 RoundRunner 读取)
   */
  static getStartingClanBuff(treasury) {
    return { ...treasury.heritageBuffTree };
  }
}

module.exports = ClanTreasuryService;
