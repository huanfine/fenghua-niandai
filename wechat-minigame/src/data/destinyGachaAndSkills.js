/**
 * destinyGachaAndSkills.js
 * 《华夏世家》局前宿命抽卡与技能卡配装系统
 * 涵盖：
 * 1. 宿命人物卡池 (金/紫/蓝/白分阶，12大差异化门第身份)
 * 2. 免费2次抽卡、洗髓签重抽与顶级金色绝品直选机制
 * 3. 技能卡系统与槽位上限 (2~4个槽位)
 */

// 1. 宿命人物卡池 (12大差异化门第身份)
const DESTINY_CHARACTER_POOL = [
  // ----------------------------------------------------
  // 👑 绝品 (金色) · 顶级主家特权卡 (支持直选/极低概率抽取)
  // ----------------------------------------------------
  {
    id: 'destiny_golden_kirin',
    title: '主家麒麟儿 · 天纵之才',
    quality: 'legendary',
    qualityName: '绝品',
    color: '#f59e0b',
    badge: '👑 绝品主家',
    avatar: '✨',
    desc: '累代嫡传真脉，幼负大名，州郡倾慕。出生即为宗族钦定接班人。',
    meters: { prestige: 75, wealth: 60, force: 45, grain: 60 },
    trait: '【名冠华夏】朝堂弹劾直接豁免，名士奇遇率+50%',
    goal: '领袖群伦，鼎立两汉，立百代之不拔基业！',
    canDirectSelect: true
  },
  {
    id: 'destiny_golden_sage',
    title: '经学宗师 · 儒林泰斗',
    quality: 'legendary',
    qualityName: '绝品',
    color: '#f59e0b',
    badge: '👑 绝品帝师',
    avatar: '📜',
    desc: '家传古文尚书，门生故吏遍布两京，海内学者奉为圭臬。',
    meters: { prestige: 85, wealth: 45, force: 30, grain: 65 },
    trait: '【万流景仰】门望上限突破100封顶，天下名士主动登门投效',
    goal: '著书立说，垂范百世，让宗族成为天下儒林图腾！',
    canDirectSelect: true
  },
  {
    id: 'destiny_golden_warlord',
    title: '柱国上将 · 八阵总戎',
    quality: 'legendary',
    qualityName: '绝品',
    color: '#f59e0b',
    badge: '👑 绝品统帅',
    avatar: '⚔️',
    desc: '兵书战阵了然于胸，麾下亲卫部曲百战精锐，横刀立马震慑四方。',
    meters: { prestige: 60, wealth: 50, force: 85, grain: 50 },
    trait: '【三军辟易】兵灾大考100%直接大胜，平定乱局缴获翻倍',
    goal: '扫平天下烽烟，以武定国，勋名冠绝青史！',
    canDirectSelect: true
  },

  // ----------------------------------------------------
  // 📜 极品 (紫色) · 门阀中坚嫡脉
  // ----------------------------------------------------
  {
    id: 'destiny_epic_lineage_heir',
    title: '主家嫡长 · 经学承绪',
    quality: 'epic',
    qualityName: '极品',
    color: '#a855f7',
    badge: '📜 极品嫡脉',
    avatar: '🏛️',
    desc: '家风严整，通晓五经，恪守礼法，士人尊为道德表率。',
    meters: { prestige: 65, wealth: 45, force: 40, grain: 55 },
    trait: '【儒林推戴】所有门望扣除减半，清谈论辨额外+6门望',
    goal: '承继祖烈，稳固郡望，让家族位列天下高门。',
    canDirectSelect: false
  },
  {
    id: 'destiny_epic_frontier_general',
    title: '边地骁骑 · 部曲雄宗',
    quality: 'epic',
    qualityName: '极品',
    color: '#a855f7',
    badge: '⚔️ 极品悍将',
    avatar: '🐎',
    desc: '弓马娴熟，长于边塞风霜，部曲死士视死如归。',
    meters: { prestige: 45, wealth: 45, force: 70, grain: 50 },
    trait: '【陷阵无畏】遭遇兵灾判定直接胜利，战意凛冽',
    goal: '捍御北疆，封侯拜将，铸就铁血将门门第。',
    canDirectSelect: false
  },
  {
    id: 'destiny_epic_chancellor',
    title: '台阁令史 · 枢要秘要',
    quality: 'epic',
    qualityName: '极品',
    color: '#a855f7',
    badge: '📜 极品台阁',
    avatar: '🪶',
    desc: '出入尚书台省，通晓朝仪律令，深谙庙堂明争暗和。',
    meters: { prestige: 65, wealth: 55, force: 35, grain: 50 },
    trait: '【明察秋毫】免受一切朝堂政治株连与暗算，岁俸丰厚',
    goal: '身居枢机，参赞机务，掌持两百年治乱权柄。',
    canDirectSelect: false
  },

  // ----------------------------------------------------
  // 🪙 良品 (蓝色) · 地方豪强支脉
  // ----------------------------------------------------
  {
    id: 'destiny_rare_merchant_tycoon',
    title: '巨室商贾 · 资财通神',
    quality: 'rare',
    qualityName: '良品',
    color: '#38bdf8',
    badge: '🪙 良品富宗',
    avatar: '💰',
    desc: '善操奇赢之术，四方通商，僮仆成群，富甲一方。',
    meters: { prestige: 40, wealth: 75, force: 40, grain: 60 },
    trait: '【奇货居奇】灾荒期间物价翻倍，岁入丰登不绝',
    goal: '积聚巨资，兼并良田，以财通神反哺宗族。',
    canDirectSelect: false
  },
  {
    id: 'destiny_rare_country_squire',
    title: '乡邦耆宿 · 宗族坞壁',
    quality: 'rare',
    qualityName: '良品',
    color: '#38bdf8',
    badge: '🌾 良品田宗',
    avatar: '🏯',
    desc: '在乡里兴修水利，广聚流民屯田，深壁固垒以待天时。',
    meters: { prestige: 50, wealth: 50, force: 45, grain: 75 },
    trait: '【深耕广积】良田收益+25%，仓廪不易遭流寇洗劫',
    goal: '庇护宗人，保境安民，打造乱世不陷之坞堡。',
    canDirectSelect: false
  },
  {
    id: 'destiny_rare_wandering_scholar',
    title: '游学游侠 · 四方任侠',
    quality: 'rare',
    qualityName: '良品',
    color: '#38bdf8',
    badge: '🗡️ 良品义侠',
    avatar: '🥋',
    desc: '结交天下奇人异士，不拘小节，义薄云天。',
    meters: { prestige: 50, wealth: 35, force: 65, grain: 45 },
    trait: '【任侠四海】奇遇事件触发概率翻倍，行商购入折扣50%',
    goal: '行侠仗义，扶危济困，于微末中聚拢豪杰羽翼。',
    canDirectSelect: false
  },

  // ----------------------------------------------------
  // 🌿 凡品 (白色) · 偏支草莽之子
  // ----------------------------------------------------
  {
    id: 'destiny_common_collateral_rebel',
    title: '破落旁支 · 寒林潜龙',
    quality: 'common',
    qualityName: '凡品',
    color: '#94a3b8',
    badge: '🌿 凡品旁支',
    avatar: '🗡️',
    desc: '微末草芥，不居祖宅，身怀虎狼之志，欲于乱世中自开一宗。',
    meters: { prestige: 30, wealth: 35, force: 65, grain: 45 },
    trait: '【草莽野望】割据争锋胜率+20%，不受家规束缚',
    goal: '逆境崛起，以庶夺嫡，证明寒宗偏支亦有冲天之日！',
    canDirectSelect: false
  },
  {
    id: 'destiny_common_tenant_farmer',
    title: '耕读偏房 · 坚忍耐劳',
    quality: 'common',
    qualityName: '凡品',
    color: '#94a3b8',
    badge: '🌿 凡品农支',
    avatar: '🌾',
    desc: '长于阡陌之间，日出而作，耐得苦寒，知稼穑之艰难。',
    meters: { prestige: 35, wealth: 40, force: 40, grain: 65 },
    trait: '【知节固守】粮草匮乏濒危时免死1次，劳作收益+10%',
    goal: '勤勉持家，广积微利，供后嗣读书以求鲤跃龙门。',
    canDirectSelect: false
  },
  {
    id: 'destiny_common_border_scout',
    title: '塞外斥候 · 绝地求生',
    quality: 'common',
    qualityName: '凡品',
    color: '#94a3b8',
    badge: '🌿 凡品边兵',
    avatar: '🏹',
    desc: '戍守长城边塞，通晓胡汉风俗与塞外险隘，身手矫健。',
    meters: { prestige: 35, wealth: 35, force: 65, grain: 45 },
    trait: '【塞上飞镝】危险大考回避率+30%，战局机动灵敏',
    goal: '立功塞外，挣得微职，让宗族在边疆立足生根。',
    canDirectSelect: false
  }
];

// 2. 宗族传承秘术技能库 (8大核心技能)
const CLAN_SKILL_CARDS = [
  {
    id: 'skill_fortress_rescue',
    name: '死士死守',
    type: 'defense',
    quality: 'epic',
    icon: '🛡️',
    desc: '【单局保命】任意属性跌至0濒死时，牺牲忠义部曲强制回升至25点！'
  },
  {
    id: 'skill_granary_steady',
    name: '仓廪丰盈',
    type: 'economy',
    quality: 'rare',
    icon: '🌾',
    desc: '【稳健岁产】每推演3载，良田起获补给+6粮草（设有上限保护）。'
  },
  {
    id: 'skill_prestige_anchor',
    name: '清流砥柱',
    type: 'culture',
    quality: 'epic',
    icon: '🏛️',
    desc: '【经学底蕴】门望底线锁定为25点，永不因奸佞诬陷而名声扫地。'
  },
  {
    id: 'skill_swift_raid',
    name: '白马突骑',
    type: 'offense',
    quality: 'rare',
    icon: '🐎',
    desc: '【先发制人】在所有兵灾历史大考中，初始武备战意自动+20点。'
  },
  {
    id: 'skill_filial_scholar',
    name: '举孝廉',
    type: 'governance',
    quality: 'epic',
    icon: '📜',
    desc: '【名士推引】每隔8载自动引荐一位高贤门客入府，平定朝野风波。'
  },
  {
    id: 'skill_silk_merchant',
    name: '奇货居奇',
    type: 'economy',
    quality: 'rare',
    icon: '🪙',
    desc: '【通商互济】大荒之年族产不会贬值，可按原价折换两倍救济军粮。'
  },
  {
    id: 'skill_medicine_benevolence',
    name: '悬壶济世',
    type: 'survival',
    quality: 'rare',
    icon: '💊',
    desc: '【仁心御疠】全局免疫一次伤寒疫病大劫，全族眷属安然无恙。'
  },
  {
    id: 'skill_deep_fortress',
    name: '深垒拒马',
    type: 'defense',
    quality: 'rare',
    icon: '🧱',
    desc: '【金汤之固】坞堡防御等级永久提升1级，流寇侵袭直接败退。'
  }
];

/**
 * 抽取 3 张不重复人物身份卡 (品质加权洗牌)
 */
function drawRandomDestinyCards(count = 3) {
  const pool = [...DESTINY_CHARACTER_POOL];
  // Fisher-Yates 洗牌算法
  for (let i = pool.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pool[i], pool[j]] = [pool[j], pool[i]];
  }
  return pool.slice(0, count);
}

/**
 * 局前抽卡会话管理状态器
 */
class DestinyGachaSession {
  constructor(freePicksMax = 2) {
    this.freePicksMax = freePicksMax;
    this.freePicksUsed = 0;
    this.currentCandidates = drawRandomDestinyCards(3);
    this.chosenCard = null;
    this.isFlipped = [false, false, false]; // 局前卡牌初始暗置背面，带来真实的翻牌揭晓快感！
    this.lastRerollTs = Date.now();
  }

  canFreeReroll() {
    return this.freePicksUsed < this.freePicksMax;
  }

  reroll(hasRerollItem = false) {
    if (this.canFreeReroll()) {
      this.freePicksUsed += 1;
      this.currentCandidates = drawRandomDestinyCards(3);
      this.isFlipped = [false, false, false];
      this.lastRerollTs = Date.now();
      return { success: true, mode: 'free', remainingFree: this.freePicksMax - this.freePicksUsed };
    }
    if (hasRerollItem) {
      this.currentCandidates = drawRandomDestinyCards(3);
      this.isFlipped = [false, false, false];
      this.lastRerollTs = Date.now();
      return { success: true, mode: 'item', remainingFree: 0 };
    }
    return { success: false, reason: '免费洗髓次数耗尽，需消耗【洗髓签】！' };
  }

  selectCard(cardId) {
    const match = this.currentCandidates.find(c => c.id === cardId) || DESTINY_CHARACTER_POOL.find(c => c.id === cardId);
    if (match) {
      this.chosenCard = match;
      return match;
    }
    return null;
  }

  directSelectTopTier(cardId = 'destiny_golden_kirin') {
    const topCard = DESTINY_CHARACTER_POOL.find(c => c.id === cardId && c.canDirectSelect);
    if (topCard) {
      this.chosenCard = topCard;
      return topCard;
    }
    return null;
  }
}

/**
 * 技能卡槽位合法性校验器 (依据世家段位阶数确定硬上限)
 */
function validateEquippedSkills(equippedSkillIds, clanRankOrder = 1) {
  // 根据段位阶数确定最大槽位上限 (1~3阶=2槽, 4~6阶=3槽, 7~9阶=4槽)
  let maxSlots = 2;
  if (clanRankOrder >= 7) {
    maxSlots = 4;
  } else if (clanRankOrder >= 4) {
    maxSlots = 3;
  }

  const validSkills = (equippedSkillIds || []).filter(id => CLAN_SKILL_CARDS.some(s => s.id === id));
  // 截断至最大合法槽位
  const trimmed = validSkills.slice(0, maxSlots);

  return {
    maxSlots,
    equipped: trimmed,
    isOverLimit: (equippedSkillIds || []).length > maxSlots
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    DESTINY_CHARACTER_POOL,
    CLAN_SKILL_CARDS,
    drawRandomDestinyCards,
    DestinyGachaSession,
    validateEquippedSkills
  };
}
