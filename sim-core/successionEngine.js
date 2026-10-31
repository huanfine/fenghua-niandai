/**
 * sim-core/successionEngine.js
 * 家族接班与传嗣引擎 (第9回合核心决策)
 * 提供五种接班方式 (嫡长、过继、义子、家臣、贤良)，影响传承评分与特质继承
 */

const { SUCCESSION_TYPES } = require('./rules.js');

class SuccessionEngine {
  /**
   * 获取五种接班方式的候选人方案与利弊特征
   * @param {Object} context 局内家族状态 (meters, destinyCard, etc.)
   */
  static getCandidates(context = {}) {
    return [
      {
        type: SUCCESSION_TYPES.PRIMOGENITURE,
        title: '嫡长正统接棒',
        name: '伯玉',
        desc: '宗法大宗，天下归心。家法严谨，固本培元。',
        scoreBase: 12,
        meterBonus: { prestige: 10, grain: 5 },
        trait: '正统纲常 (评分稳健+3，抗宗族内耗)'
      },
      {
        type: SUCCESSION_TYPES.ADOPTION,
        title: '过继宗亲才俊',
        name: '叔朗',
        desc: '分支贤俊，联络群宗。化解族系嫌隙。',
        scoreBase: 11,
        meterBonus: { prestige: 5, wealth: 8 },
        trait: '群从辑睦 (族产增益+10%)'
      },
      {
        type: SUCCESSION_TYPES.FOSTER,
        title: '拔擢虎将义子',
        name: '奉先之风',
        desc: '行伍悍将，破格收纳。乱世执戈，部曲效死。',
        scoreBase: 10,
        meterBonus: { force: 15, prestige: -5 },
        trait: '骁勇部曲 (武备大考检定区间+15%)'
      },
      {
        type: SUCCESSION_TYPES.RETAINER,
        title: '倚重家臣主事',
        name: '子敬之韬',
        desc: '世代忠仆，持筹握算。经商理财，仓廪充盈。',
        scoreBase: 11,
        meterBonus: { wealth: 15, grain: 10 },
        trait: '富甲一方 (资财底蕴+12%)'
      },
      {
        type: SUCCESSION_TYPES.WORTHY,
        title: '广延海内贤良',
        name: '孔明遗风',
        desc: '不问宗派，唯才是举。海内名士，争相归附。',
        scoreBase: 13,
        meterBonus: { prestige: 12, force: 5, wealth: 5 },
        trait: '天下公器 (终局家业评分满格潜力)'
      }
    ];
  }

  /**
   * 结算传嗣抉择
   * @param {string} successionType
   * @param {Object} context
   */
  static resolveSuccession(successionType, context = {}) {
    const candidates = SuccessionEngine.getCandidates(context);
    const chosen = candidates.find(c => c.type === successionType) || candidates[0];

    // 计算传嗣与家业得分 (满分 20)
    // 依据接班人底分 + 族产与门望达标情况
    const prestige = context.meters?.prestige || 50;
    const wealth = context.meters?.wealth || 50;
    const grain = context.meters?.grain || 50;

    let estateScore = chosen.scoreBase;
    if (prestige >= 80 && wealth >= 80) {
      estateScore = Math.min(20, estateScore + 5);
    } else if (prestige >= 65 && wealth >= 65) {
      estateScore = Math.min(17, estateScore + 3);
    } else if (grain < 35 || wealth < 35) {
      estateScore = Math.max(5, estateScore - 5);
    }

    return {
      chosen,
      successionType: chosen.type,
      estateScore, // 计入终局评分 (0~20)
      meterBonus: chosen.meterBonus,
      inheritingTrait: chosen.trait
    };
  }
}

module.exports = SuccessionEngine;
