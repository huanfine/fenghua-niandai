/**
 * sim-core/bagEngine.js
 * 局内战利品行囊 (Loot Pouch) 与爆箱管理引擎
 * 严格落实 4 格行囊稀缺设计、满格舍弃抉择、绝品金箱单局至多 1 个与未解封提现标记
 */

const { RESOURCES_CAP, CHEST_TIERS } = require('./rules.js');

class BagEngine {
  constructor() {
    this.slots = []; // 最多 4 个宝箱
    this.discardHistory = []; // 玩家舍弃记录
    this.goldChestCount = 0;  // 记录本局获得的绝品箱数量
  }

  /**
   * 检查行囊是否已满
   */
  isFull() {
    return this.slots.length >= RESOURCES_CAP.MAX_BAG_SLOTS;
  }

  /**
   * 获取当前槽位状态
   */
  getStatus() {
    return {
      used: this.slots.length,
      max: RESOURCES_CAP.MAX_BAG_SLOTS,
      items: this.slots.map(item => ({
        ...item,
        statusText: '尚未解封，局末凭评级提现'
      })),
      isFull: this.isFull()
    };
  }

  /**
   * 尝试将新获得的宝箱放入行囊
   * @param {Object} chest 获得的宝箱对象
   * @returns {{ success: boolean, needsDiscardChoice: boolean, chest: Object }}
   */
  tryAddChest(chest) {
    // 约束：一局至多 1 个绝品金宝箱，多出自动降级为极品紫
    const resolvedChest = { ...chest };
    if (resolvedChest.tier === CHEST_TIERS.LEGENDARY) {
      if (this.goldChestCount >= RESOURCES_CAP.MAX_GOLD_CHEST_PER_RUN) {
        resolvedChest.tier = CHEST_TIERS.EPIC;
        resolvedChest.name = resolvedChest.name.replace('绝品', '极品') + ' (绝品限额降转)';
      } else {
        this.goldChestCount++;
      }
    }

    resolvedChest.obtainedAt = Date.now();
    resolvedChest.locked = true;

    if (!this.isFull()) {
      this.slots.push(resolvedChest);
      return {
        success: true,
        needsDiscardChoice: false,
        chest: resolvedChest,
        currentSlots: this.slots
      };
    }

    // 行囊已满，必须触发抉择：选择替换现有 4 格之一，或丢弃新箱
    return {
      success: false,
      needsDiscardChoice: true,
      pendingChest: resolvedChest,
      currentSlots: this.slots
    };
  }

  /**
   * 玩家抉择：行囊满时替换现有宝箱
   * @param {number} replaceIndex 替换第几个槽位 (0~3)
   * @param {Object} pendingChest
   */
  replaceChest(replaceIndex, pendingChest) {
    if (replaceIndex < 0 || replaceIndex >= this.slots.length) {
      // 放弃新箱
      this.discardHistory.push({
        discarded: pendingChest,
        reason: 'player_declined_new'
      });
      return {
        success: true,
        replaced: false,
        discarded: pendingChest,
        slots: this.slots
      };
    }

    const oldChest = this.slots[replaceIndex];
    this.slots[replaceIndex] = pendingChest;
    this.discardHistory.push({
      discarded: oldChest,
      reason: 'player_replaced_with_new'
    });

    return {
      success: true,
      replaced: true,
      discarded: oldChest,
      slots: this.slots
    };
  }

  /**
   * 获取用于终局结算的全部暂存宝箱
   */
  getChestsForSettlement() {
    return [...this.slots];
  }
}

module.exports = BagEngine;
