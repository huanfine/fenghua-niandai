/**
 * sim-core/kinsfolkEngine.js
 * 《华夏世家》族人系统 (Kinsfolk System) —— 策略与情感联结核心
 * 落实 v3 方案：开局 5 名族人 (当家人、配偶、兄弟、子侄、门客)，具备特长、心结、忠诚度与派遣议事机制
 */

const ROLES = {
  HEAD: 'head',         // 当家人
  SPOUSE: 'spouse',     // 配偶
  BROTHER: 'brother',   // 兄弟
  JUNIOR: 'junior',     // 子侄
  RETAINER: 'retainer'  // 门客
};

const ROLE_NAMES = {
  head: '当家人',
  spouse: '贤内助',
  brother: '同胞手足',
  junior: '宗房子侄',
  retainer: '宿儒门客'
};

// 五类事务：仕(官)、商(财)、武(军)、学(道)、守(固)
const DUTIES = ['officialdom', 'management', 'military', 'cultivation', 'defence'];

class KinsfolkEngine {
  /**
   * @param {import('./prng')} prng
   * @param {Object} options
   */
  constructor(prng, options = {}) {
    this.prng = prng;
    this.kinsfolk = [];
    this.currentAssignments = {}; // kinsmanId -> duty ('officialdom'|'management'|'military'|'cultivation'|'defence')
    this.historyEvents = [];

    this._initStartingClan(options.surname || '王');
  }

  /**
   * 初始化当局 5 名核心族人
   */
  _initStartingClan(surname) {
    const maleNames = ['策', '容', '宛', '符', '衡', '朗', '肃', '融', '恪', '俭'];
    const femaleNames = ['淑', '清', '徽', '华', '萱', '静', '令', '瑶'];

    // 1. 当家人
    this.kinsfolk.push({
      id: 'kin_head',
      role: ROLES.HEAD,
      name: `${surname}${maleNames[this.prng.nextInt(0, maleNames.length - 1)]}`,
      title: ROLE_NAMES[ROLES.HEAD],
      specialties: ['officialdom', 'cultivation'], // 特长
      flaw: '刚愎自矜',                           // 心结 (弱点)
      loyalty: 100,                               // 忠诚
      health: 90,                                 // 体魄
      morale: 85,                                 // 心境
      status: 'active'                            // active | injured | departed
    });

    // 2. 配偶
    this.kinsfolk.push({
      id: 'kin_spouse',
      role: ROLES.SPOUSE,
      name: femaleNames[this.prng.nextInt(0, femaleNames.length - 1)],
      title: ROLE_NAMES[ROLES.SPOUSE],
      specialties: ['management', 'cultivation'],
      flaw: '念旧笃亲',
      loyalty: 95,
      health: 85,
      morale: 80,
      status: 'active'
    });

    // 3. 兄弟
    this.kinsfolk.push({
      id: 'kin_brother',
      role: ROLES.BROTHER,
      name: `${surname}${maleNames[this.prng.nextInt(0, maleNames.length - 1)]}`,
      title: ROLE_NAMES[ROLES.BROTHER],
      specialties: ['military', 'defence'],
      flaw: '勇而少谋',
      loyalty: 88,
      health: 92,
      morale: 75,
      status: 'active'
    });

    // 4. 子侄
    this.kinsfolk.push({
      id: 'kin_junior',
      role: ROLES.JUNIOR,
      name: `${surname}${maleNames[this.prng.nextInt(0, maleNames.length - 1)]}`,
      title: ROLE_NAMES[ROLES.JUNIOR],
      specialties: ['officialdom', 'management'],
      flaw: '历练未深',
      loyalty: 90,
      health: 95,
      morale: 85,
      status: 'active'
    });

    // 5. 门客
    this.kinsfolk.push({
      id: 'kin_retainer',
      role: ROLES.RETAINER,
      name: `子敬`,
      title: ROLE_NAMES[ROLES.RETAINER],
      specialties: ['military', 'officialdom'],
      flaw: '寄人篱下',
      loyalty: 78,
      health: 80,
      morale: 70,
      status: 'active'
    });
  }

  /**
   * 获取所有在堂族人列表
   */
  getActiveKinsfolk() {
    return this.kinsfolk.filter(k => k.status === 'active');
  }

  /**
   * 议事：将族人指派到仕、商、武、学、守五类事务
   * @param {Object} assignments { kin_head: 'officialdom', kin_brother: 'military', ... }
   */
  assignDuties(assignments = {}) {
    const activeIds = new Set(this.getActiveKinsfolk().map(k => k.id));
    const validAssignments = {};

    for (const [kinId, duty] of Object.entries(assignments)) {
      if (activeIds.has(kinId) && DUTIES.includes(duty)) {
        validAssignments[kinId] = duty;
      }
    }

    this.currentAssignments = validAssignments;
    return this.currentAssignments;
  }

  /**
   * 计算族人在某类事务上提供的协助增益
   * @param {'officialdom'|'management'|'military'|'cultivation'|'defence'} duty
   */
  getDutyModifier(duty) {
    let modifier = 0;
    const active = this.getActiveKinsfolk();

    for (const kin of active) {
      if (this.currentAssignments[kin.id] === duty) {
        let baseBonus = 0.08; // 基础协助加成 +8%
        if (kin.specialties.includes(duty)) {
          baseBonus += 0.08; // 契合特长额外 +8% (共 +16%)
        }
        // 忠诚度修正
        const loyaltyFactor = (kin.loyalty >= 80 ? 1.1 : (kin.loyalty <= 50 ? 0.7 : 1.0));
        modifier += baseBonus * loyaltyFactor;
      }
    }

    return Math.min(0.35, modifier); // 单项最高封顶 +35% 检定增益
  }

  /**
   * 岁月轮转：族人心境、体魄与事件演变
   * @param {Object} roundContext
   */
  advanceRound(roundContext = {}) {
    const changes = [];

    for (const kin of this.getActiveKinsfolk()) {
      // 正常变老与损耗
      kin.health = Math.max(10, kin.health - this.prng.nextInt(1, 3));

      // 若处于险境或大考失利，族人有概率负伤或离心
      if (roundContext.disasterHappened && this.prng.next() < 0.20) {
        kin.health = Math.max(10, kin.health - 15);
        kin.morale = Math.max(10, kin.morale - 10);
        changes.push({
          kinId: kin.id,
          name: kin.name,
          event: '在大劫兵荒中负伤，体魄大减',
          type: 'injured'
        });
      }

      // 心结触发：若连续未委任其擅长事务，忠诚微降
      const assigned = this.currentAssignments[kin.id];
      if (assigned && !kin.specialties.includes(assigned) && this.prng.next() < 0.15) {
        kin.loyalty = Math.max(20, kin.loyalty - 3);
      }
    }

    return changes;
  }

  /**
   * 从在籍族人中择嗣选出下一代当家人 (终局传承前置)
   * @param {string} kinId
   */
  selectSuccessor(kinId) {
    const chosen = this.kinsfolk.find(k => k.id === kinId) || this.kinsfolk[0];
    return {
      successor: chosen,
      isBloodline: chosen.role !== ROLES.RETAINER,
      bonus: chosen.role === ROLES.JUNIOR ? 18 : (chosen.role === ROLES.BROTHER ? 15 : 12)
    };
  }
}

module.exports = {
  ROLES,
  ROLE_NAMES,
  DUTIES,
  KinsfolkEngine
};
