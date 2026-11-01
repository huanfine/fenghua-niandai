/**
 * meta-service/chestUnboxing.js
 * 遗产宝箱评级提现、抄没惩戒与宗祠开箱典礼服务
 * 落实 S全额保底紫 / A自选抢救60% / B+提取1-2 / B遗泽残页 / C/D全没收，以及 8 箱保底紫与 6 类掉落池
 */

const PRNG = require('../sim-core/prng.js');

class ChestUnboxingService {
  /**
   * 依据局末评级裁决行囊宝箱的带出数量与没收清单
   * @param {Array<Object>} bagChests 局内行囊中的宝箱列表 (最多4个)
   * @param {string} grade 评级 ('S' | 'A' | 'B+' | 'B' | 'C' | 'D')
   * @param {Object} options 附加选项 (如 A 级时的自选抢救宝箱 ID)
   */
  static resolveRunExtraction(bagChests = [], grade = 'B', options = {}) {
    const totalCount = bagChests.length;
    if (totalCount === 0) {
      return {
        grade,
        extracted: [],
        confiscated: [],
        relicRemnants: 0,
        summary: '行囊空空如也，无可提现遗产。'
      };
    }

    let extracted = [];
    let confiscated = [];
    let relicRemnants = 0; // 遗泽残页
    let rescueUsed = false;

    if (grade === 'S') {
      // S级：全部带出 (<=4)，并保底至少 1 件紫色以上 (若行囊中有)
      extracted = [...bagChests];
      confiscated = [];
    } else if (grade === 'A') {
      // A级：自选 1 件必带 (抢救)，剩余随机带出约 60% (向上取整)
      const rescueId = options.rescueChestId;
      let pool = [...bagChests];

      if (rescueId) {
        const rescueIdx = pool.findIndex(c => c.id === rescueId);
        if (rescueIdx !== -1) {
          extracted.push(pool[rescueIdx]);
          pool.splice(rescueIdx, 1);
          rescueUsed = true;
        }
      }

      // 对剩余的按 60% 提取
      const remainingQuota = Math.ceil(pool.length * 0.6);
      for (let i = 0; i < remainingQuota && pool.length > 0; i++) {
        extracted.push(pool.shift());
      }
      confiscated = pool;
    } else if (grade === 'B+') {
      // B+级：随机带出 1~2 件，其余遗失
      const extractQuota = Math.min(bagChests.length, 2);
      extracted = bagChests.slice(0, extractQuota);
      confiscated = bagChests.slice(extractQuota);
    } else if (grade === 'B') {
      // B级 (平盘)：无宝箱带出！全部没收，但发放「遗泽残页」提供温和保底反馈
      extracted = [];
      confiscated = [...bagChests];
      relicRemnants = Math.max(1, totalCount * 2); // 每个没收宝箱折算 2 张残页
    } else {
      // C / D 级：全部没收归公，记录败局
      extracted = [];
      confiscated = [...bagChests];
      relicRemnants = 0;
    }

    return {
      grade,
      extracted,
      confiscated,
      relicRemnants,
      rescueUsed,
      extractedCount: extracted.length,
      confiscatedCount: confiscated.length,
      isTotalLoss: confiscated.length > 0 && extracted.length === 0
    };
  }

  /**
   * 在宗祠宝库中开箱
   * @param {Object} chest 待开宝箱
   * @param {Object} clanTreasury 宗族宝库持久态 (记录连续未出紫计数)
   * @param {number|string} seed 随机种子
   */
  static openChest(chest, clanTreasury, seed = Date.now()) {
    const prng = new PRNG(seed);
    if (!clanTreasury.chestPityCount) {
      clanTreasury.chestPityCount = 0;
    }
    clanTreasury.chestPityCount++;

    // 连续 8 个宝箱未出紫色以上，下一个必出保底紫
    let forcePurpleOrHigher = (clanTreasury.chestPityCount >= 8);
    const chestTier = chest.tier || 'common';

    // 概率表分布：
    // 传家宝 25%，技能卡 30%，祖训残卷 15%，技能碎片 20%，洗髓令 5%，直选券碎片 5%
    const categoryRoll = prng.nextInt(1, 100);
    let category = 'skill_card';
    if (categoryRoll <= 25) category = 'heirloom';
    else if (categoryRoll <= 55) category = 'skill_card';
    else if (categoryRoll <= 70) category = 'ancestral_scroll';
    else if (categoryRoll <= 90) category = 'skill_fragment';
    else if (categoryRoll <= 95) category = 'wash_marrow_token';
    else category = 'direct_select_fragment';

    // 品质判定：宝箱本身品质提升掉落品质
    let quality = 'fine';
    if (chestTier === 'legendary') {
      quality = prng.nextInt(1, 100) <= 60 ? 'legendary' : 'epic';
    } else if (chestTier === 'epic' || forcePurpleOrHigher) {
      quality = 'epic';
    } else if (chestTier === 'fine') {
      quality = prng.nextInt(1, 100) <= 25 ? 'epic' : 'fine';
    } else {
      quality = prng.nextInt(1, 100) <= 10 ? 'fine' : 'common';
    }

    if (quality === 'epic' || quality === 'legendary') {
      clanTreasury.chestPityCount = 0; // 重置保底
    }

    // 生成具体战利品
    const loot = ChestUnboxingService._generateLootItem(category, quality, prng);

    return {
      chestId: chest.id,
      chestName: chest.name,
      chestTier,
      openedAt: Date.now(),
      loot,
      isPityTriggered: forcePurpleOrHigher
    };
  }

  static _generateLootItem(category, quality, prng) {
    if (category === 'wash_marrow_token') {
      return { type: 'token', name: '洗髓令', amount: 1, quality: 'fine' };
    }
    if (category === 'direct_select_fragment') {
      return { type: 'fragment', name: '天命直选券残片', amount: prng.nextInt(1, 3), quality: 'epic' };
    }
    if (category === 'ancestral_scroll') {
      return { type: 'scroll', name: '祖训残卷', amount: prng.nextInt(1, 2), quality };
    }
    if (category === 'skill_fragment') {
      return { type: 'fragment', name: '太公兵略残页', amount: prng.nextInt(2, 5), quality };
    }
    if (category === 'heirloom') {
      return {
        type: 'heirloom',
        id: `heirloom_${prng.nextInt(100, 999)}`,
        name: quality === 'legendary' ? '传国金匮 · 白璧' : '汉瓦拓片',
        quality,
        passiveEffect: '家族开局资财 +5%'
      };
    }
    // 默认技能卡
    return {
      type: 'skill_card',
      id: `skill_card_${prng.nextInt(100, 999)}`,
      name: quality === 'legendary' ? '经天纬地' : (quality === 'epic' ? '奇策疾行' : '治平小术'),
      quality,
      faction: 'military',
      cost: quality === 'legendary' ? 3 : 2
    };
  }
}

module.exports = ChestUnboxingService;
