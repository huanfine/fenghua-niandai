/**
 * sim-core/clashEngine.js
 * 历史大考与强敌交锋引擎 (每3回合一次多步交锋)
 * 提供三种军令策略克制关系、技能连锁加成与爆箱产出
 */

const { CHEST_TIERS } = require('./rules.js');

class ClashEngine {
  /**
   * @param {import('./prng')} prng
   */
  constructor(prng) {
    this.prng = prng;
    this.clashHistory = [];
  }

  /**
   * 军令与策略类型及克制克属关系
   * strike (突袭/进击) -> breaks defence (据垒固守)
   * defence (固守/壁垒) -> blocks disperse (离间散金)
   * disperse (散金/离间/计谋) -> baffles strike (突袭进击)
   */
  static get STRATEGIES() {
    return {
      STRIKE: { id: 'strike', name: '死士突袭', counters: 'defence', weakTo: 'disperse' },
      DEFENCE: { id: 'defence', name: '据垒固守', counters: 'disperse', weakTo: 'strike' },
      DISPERSE: { id: 'disperse', name: '散金离间', counters: 'strike', weakTo: 'defence' }
    };
  }

  /**
   * 生成大考遭遇敌酋/历史考验
   * @param {number} round 回合数 (3, 6, 9, 12)
   */
  generateClashTrial(round = 3) {
    const trials = {
      3: {
        id: 'clash_yellow_turban',
        title: '黄巾烽火席卷州郡',
        enemy: '张曼成部曲',
        enemyTactic: 'strike', // 倾向强攻
        basePower: 55,
        lootChest: {
          id: `chest_clash_3_${this.prng.nextInt(100, 999)}`,
          name: '黄巾荡平 · 岁稔战匣',
          tier: CHEST_TIERS.FINE
        }
      },
      6: {
        id: 'clash_dong_zhuo_hegemony',
        title: '董卓乱政迁都长安',
        enemy: '西凉骁骑铁卫',
        enemyTactic: 'defence', // 倾向坚垒跋扈
        basePower: 70,
        lootChest: {
          id: `chest_clash_6_${this.prng.nextInt(100, 999)}`,
          name: '破董勤王 · 奇遇秘匣',
          tier: CHEST_TIERS.EPIC
        }
      },
      9: {
        id: 'clash_guandu_gamble',
        title: '官渡中原霸权决战',
        enemy: '袁曹争雄风暴',
        enemyTactic: 'disperse', // 计谋粮道交锋
        basePower: 82,
        lootChest: {
          id: `chest_clash_9_${this.prng.nextInt(100, 999)}`,
          name: '中原霸业 · 凯旋金匮',
          tier: CHEST_TIERS.LEGENDARY
        }
      },
      12: {
        id: 'clash_dynasty_shift',
        title: '魏晋鼎革禅代风云',
        enemy: '辅政权臣势家',
        enemyTactic: 'defence',
        basePower: 90,
        lootChest: {
          id: `chest_clash_12_${this.prng.nextInt(100, 999)}`,
          name: '受禅承天 · 镇国玉匮',
          tier: CHEST_TIERS.LEGENDARY
        }
      }
    };

    return trials[round] || trials[3];
  }

  /**
   * 结算大考决断
   * @param {Object} params
   * @param {Object} params.trial 大考考题
   * @param {string} params.playerTactic 玩家选择军令 ('strike' | 'defence' | 'disperse')
   * @param {number} params.playerForce 玩家武备/综合点数
   * @param {number} params.skillBonus 技能加成点数
   */
  resolveClash({ trial, playerTactic, playerForce = 50, skillBonus = 0 }) {
    const strategies = ClashEngine.STRATEGIES;
    const playerStrat = Object.values(strategies).find(s => s.id === playerTactic) || strategies.STRIKE;
    const enemyTacticId = trial.enemyTactic;

    // 克制判定
    let tacticModifier = 0;
    if (playerStrat.counters === enemyTacticId) {
      tacticModifier = 20; // 战术克制大优势
    } else if (playerStrat.weakTo === enemyTacticId) {
      tacticModifier = -15; // 战术受制劣势
    }

    // 随机战阵波动 (-10 ~ +10)
    const battleFlux = this.prng.nextInt(-10, 10);
    const totalPlayerPower = playerForce + tacticModifier + skillBonus + battleFlux;
    const delta = totalPlayerPower - trial.basePower;

    const won = delta >= 0;
    const isCrushing = delta >= 20; // 战术克制且实力碾压为大胜

    const result = {
      round: trial.round,
      trialId: trial.id,
      playerTactic,
      enemyTactic: enemyTacticId,
      tacticModifier,
      delta,
      won,
      isCrushing,
      rewardChest: won ? trial.lootChest : null,
      scoreContribution: won ? (isCrushing ? 6.25 : 4.0) : 0
    };

    this.clashHistory.push(result);
    return result;
  }
}

module.exports = ClashEngine;
