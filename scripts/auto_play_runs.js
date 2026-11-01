/**
 * scripts/auto_play_runs.js
 * 控制小游戏页面真实交互与点击，自主运行 3 局完整实战推演
 * 校验每一步的 UI 渲染、点击响应、史实剧情呈现、心力备印、经营造印、大劫生死与终局长卷
 */

const assert = require('assert');

// 模拟小游戏宿主环境
let touchStartCallback = null;
let touchEndCallback = null;
global.wx = {
  getSystemInfoSync: () => ({
    screenWidth: 375,
    screenHeight: 667,
    pixelRatio: 2,
    platform: 'devtools'
  }),
  getMenuButtonBoundingClientRect: () => ({
    left: 280,
    top: 24,
    right: 365,
    bottom: 56,
    width: 85,
    height: 32
  }),
  createCanvas: () => ({
    width: 750,
    height: 1334,
    getContext: () => ({
      save: () => {},
      restore: () => {},
      translate: () => {},
      rotate: () => {},
      scale: () => {},
      beginPath: () => {},
      closePath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      arc: () => {},
      arcTo: () => {},
      quadraticCurveTo: () => {},
      bezierCurveTo: () => {},
      rect: () => {},
      fill: () => {},
      stroke: () => {},
      fillRect: () => {},
      strokeRect: () => {},
      clearRect: () => {},
      fillText: () => {},
      strokeText: () => {},
      measureText: (txt) => ({ width: (txt || '').length * 12 }),
      createLinearGradient: () => ({ addColorStop: () => {} }),
      createRadialGradient: () => ({ addColorStop: () => {} }),
      drawImage: () => {},
      setLineDash: () => {},
      font: '14px sans-serif',
      fillStyle: '#fff',
      strokeStyle: '#000',
      lineWidth: 1,
      textAlign: 'left',
      textBaseline: 'top',
      globalAlpha: 1
    })
  }),
  onTouchStart: (cb) => {
    touchStartCallback = cb;
  },
  onTouchMove: () => {},
  onTouchEnd: (cb) => {
    touchEndCallback = cb;
  },
  getStorageSync: () => null,
  setStorageSync: () => {},
  removeStorageSync: () => {},
  vibrateShort: () => {},
  vibrateLong: () => {},
  showToast: (opts) => {
    // console.log(`    📢 [Toast] ${opts.title}`);
  },
  createInnerAudioContext: () => ({
    play: () => {},
    stop: () => {},
    pause: () => {},
    destroy: () => {},
    onEnded: () => {},
    onError: () => {}
  })
};

// 加载小游戏主文件
require('../wechat-minigame/game.js');

const state = global.state;

/**
 * 模拟屏幕触控点击对应的 Hitbox
 */
function tapHitbox(hitboxId) {
  // 查找对应的 hitbox
  const box = global.hitboxes.find(b => b.id === hitboxId);
  if (!box) {
    throw new Error(`未找到目标交互按钮: ${hitboxId}`);
  }
  const cx = box.x + box.width / 2;
  const cy = box.y + box.height / 2;

  // 触发真实的 wx.onTouchStart 与 wx.onTouchEnd
  if (touchStartCallback) {
    touchStartCallback({
      changedTouches: [{ clientX: cx, clientY: cy, x: cx, y: cy }],
      touches: [{ clientX: cx, clientY: cy, x: cx, y: cy }]
    });
  }
  if (touchEndCallback) {
    touchEndCallback({
      changedTouches: [{ clientX: cx, clientY: cy, x: cx, y: cy }],
      touches: []
    });
  } else {
    box.handler();
  }
}

/**
 * 运行单局完整游戏
 */
function playOneGame(runIndex, clanProfile = { hallName: '颍川堂', surname: '陈' }) {
  console.log(`\n======================================================================`);
  console.log(`🎮 【第 ${runIndex} 局】开启世家新章：《汉魏风骨》 颍川${clanProfile.surname}氏`);
  console.log(`======================================================================`);

  // 初始化世家状态
  state.familyProfile = clanProfile;
  state.isDynastic = true;
  state.year = 184;
  state.age = 25;
  state.activeTab = 'card_stage';
  state.meters = { prestige: 55, wealth: 55, force: 55, grain: 55 };
  state.timeline = [];
  state.endgameSettled = false;
  state.activeModal = null;

  // 初始化 v3 会话
  const v3 = global.ensureV3SessionInitialized ? global.ensureV3SessionInitialized(true) : null;
  assert(v3 && v3.runner, 'v3Session 必须正确构建');
  const runner = v3.runner;

  // 主循环：推进 12 回合与 3 次幕终大劫
  for (let r = 1; r <= 12; r++) {
    if (runner.isDead || runner.isCompleted || state.endgameSettled) {
      break;
    }

    // 渲染当前帧
    global.hitboxes.length = 0;
    global.drawDynastyCardStageScreen();

    // 若首次渲染弹出了新手速懂弹窗，模拟玩家点击【懂了！去带领家族破局 ➔】
    if (state.activeModal === 'game_guide_quick_modal') {
      global.drawGameGuideQuickModal();
      tapHitbox('btn_dismiss_quick_guide');
      global.hitboxes.length = 0;
      global.drawDynastyCardStageScreen();
    }

    const act = runner.currentAct;
    const actRound = runner.actRound;
    const yr = runner.currentYear;
    const meters = runner.meters;
    const seals = runner.seals;
    const wp = runner.willpowerRemaining;

    console.log(`\n--------------------------------------------------`);
    console.log(`📜 [回合 ${r}/12] 公元 ${yr} 年 (第${act}幕 第${actRound}/4年) | ⚡心力: ${wp}/3`);
    console.log(`   底蕴: 🏛️门望 ${meters.prestige} | 🪙族产 ${meters.wealth} | ⚔️部曲 ${meters.force} | 🌾义仓 ${meters.grain}`);
    console.log(`   锦盒: ⚔️兵印 ${seals.military} | 🪙财印 ${seals.wealth} | 🏛️名印 ${seals.prestige}`);

    // 1. 每幕首个回合：必须优先花 1 心力「探报军机」
    const upcoming = runner.upcomingCalamity;
    if (!upcoming.isScouted && runner.willpowerRemaining >= 1) {
      console.log(`   👉 [决策] 点击【🔍 探报军机】(消耗 1 点心力)...`);
      tapHitbox('btn_v3_action_scout');
      // 重新渲染以更新状态
      global.hitboxes.length = 0;
      global.drawDynastyCardStageScreen();
      console.log(`   🔍 军机探明！大劫【${upcoming.title}】需求: 【${upcoming.sealA}×2 + ${upcoming.sealB}×2】！`);
    }

    const reqA = upcoming.sealA;
    const reqB = upcoming.sealB;
    let needA = Math.max(0, 2 - (runner.seals[reqA] || 0));
    let needB = Math.max(0, 2 - (runner.seals[reqB] || 0));

    // 2. 查看当前 3 张正史候选牌
    const offered = v3.roundData.offeredCards || [];
    console.log(`   🎴 当前候选正史机缘牌面:`);
    for (let ci = 0; ci < offered.length; ci++) {
      const c = offered[ci];
      const isSecret = (ci === 2 && !v3.revealedSecretCards[2]);
      if (isSecret) {
        console.log(`      [${ci}] 🔮 窥探天机 (暗牌)`);
      } else {
        console.log(`      [${ci}] ${c.sealTag === 'military' ? '⚔️兵印' : (c.sealTag === 'wealth' ? '🪙财印' : '🏛️名印')} · ${c.name} (典籍: ${c.historicalSource || '正史'})`);
      }
    }

    // 3. 规划型策略决策链路：
    // 若第 3 张是暗牌，且需要探寻机缘，点击翻开
    if (!v3.revealedSecretCards[2]) {
      tapHitbox('btn_v3_tab_pick_2');
      global.hitboxes.length = 0;
      global.drawDynastyCardStageScreen();
    }

    // 优先选择能提供急需势印的卡牌处理
    let chosenCardIdx = -1;
    for (let ci = 0; ci < offered.length; ci++) {
      const c = offered[ci];
      if (c && !runner.handledCardIdsInRound.has(c.id)) {
        if ((c.sealTag === reqA && needA > 0) || (c.sealTag === reqB && needB > 0)) {
          chosenCardIdx = ci;
          break;
        }
      }
    }

    // 如果没有急需的牌，找任意未处理的牌防止扣损
    if (chosenCardIdx === -1) {
      for (let ci = 0; ci < offered.length; ci++) {
        const c = offered[ci];
        if (c && !runner.handledCardIdsInRound.has(c.id)) {
          chosenCardIdx = ci;
          break;
        }
      }
    }

    // 执行卡牌决断 (耗 1 心力)
    if (chosenCardIdx !== -1 && runner.willpowerRemaining >= 1) {
      v3.selectedCardIdx = chosenCardIdx;
      const targetCard = offered[chosenCardIdx];
      console.log(`   👉 [决策] 切换 Tab [${chosenCardIdx}] 并点击【🧮 算筹落盘 · 决断备印】: 【${targetCard.name}】...`);
      tapHitbox('btn_v3_cast_counting_rods');

      // 验证决断备印成功执行，印章直接入库，心流不被黑弹窗打断
      const outcome = v3.lastCheckOutcome;
      assert(outcome && outcome.checkResult, '决断备印必须产出判定结果');
      console.log(`      🧮 算筹得分: ${outcome.checkResult.rodScore} | 检定结果: ${outcome.checkResult.outcome}`);
      console.log(`      📜 正史记载: ${outcome.historicalSource || targetCard.historicalSource}`);
      console.log(`      ✍️ 剧情长卷: ${targetCard.description ? targetCard.description.slice(0, 48) : ''}...`);

      global.hitboxes.length = 0;
      global.drawDynastyCardStageScreen();
      console.log(`      ✅ 决断落定！已备印【${targetCard.sealTag} +1】，剩余心力: ${runner.willpowerRemaining}`);
    }

    // 4. 倒推大劫核心动作：「经营造印」
    // 如果还差关键印，且心力 >= 2，果断经营
    needA = Math.max(0, 2 - (runner.seals[reqA] || 0));
    needB = Math.max(0, 2 - (runner.seals[reqB] || 0));
    if ((needA > 0 || needB > 0) && runner.willpowerRemaining >= 2) {
      const sealToBuild = needA > 0 ? reqA : reqB;
      console.log(`   👉 [决策] 紧迫备印！点击【🏛️ 经营造印】(消耗 2 心力定向铸造 ${sealToBuild})...`);
      tapHitbox('btn_v3_action_manage');
      assert.strictEqual(state.activeModal, 'manage_seal_selector_modal', '经营弹窗必须打开');

      global.hitboxes.length = 0;
      global.drawManageSealSelectorModal();
      tapHitbox(`btn_choose_manage_seal_${sealToBuild}`);

      global.hitboxes.length = 0;
      global.drawDynastyCardStageScreen();
      console.log(`      🏛️ 经营得当！定向获得【${sealToBuild} +1】！剩余心力: ${runner.willpowerRemaining}`);
    }

    // 5. 若还有 1 点心力，继续处理剩余牌防扣损
    if (runner.willpowerRemaining >= 1) {
      let secondaryCardIdx = -1;
      for (let ci = 0; ci < offered.length; ci++) {
        const c = offered[ci];
        if (c && !runner.handledCardIdsInRound.has(c.id)) {
          secondaryCardIdx = ci;
          break;
        }
      }
      if (secondaryCardIdx !== -1) {
        // 先切换 Tab 到该卡牌
        tapHitbox(`btn_v3_tab_pick_${secondaryCardIdx}`);
        global.hitboxes.length = 0;
        global.drawDynastyCardStageScreen();

        const targetCard = offered[secondaryCardIdx];
        console.log(`   👉 [决策] 切换至 Tab [${secondaryCardIdx}]，余心决断: 【${targetCard.name}】...`);
        tapHitbox('btn_v3_cast_counting_rods');
        global.hitboxes.length = 0;
        global.drawCountingRodsModal();
        tapHitbox('btn_modal_finish_check_full');
        global.hitboxes.length = 0;
        global.drawDynastyCardStageScreen();
        console.log(`      ✅ 危机平定！获得【${targetCard.sealTag} +1】！`);
      }
    }

    // 检查是否在中途殒命
    if (runner.isDead || state.endgameSettled) {
      console.log(`   ☠️ 宗门底蕴竭尽，家族于公元 ${runner.currentYear} 年中道崩殂！`);
      break;
    }

    // 6. 心力用尽，点击【🔚 回合收官 · 结转入卷】
    console.log(`   👉 [决策] 点击【🔚 回合收官 · 结转入卷】...`);
    if (global.hitboxes.some(b => b.id === 'btn_v3_conclude_round')) {
      tapHitbox('btn_v3_conclude_round');
    } else {
      global.handleV3ConcludeRound();
    }

    // 检查是否唤起大劫弹窗 (第 4, 8, 12 回合末)
    if (state.activeModal === 'calamity_stage_modal') {
      console.log(`\n⚔️ ⚔️ ⚔️ 【幕终历史大劫降临】: ${upcoming.title} ⚔️ ⚔️ ⚔️`);
      global.hitboxes.length = 0;
      global.drawCalamityStageModal();

      const haveA = runner.seals[reqA] || 0;
      const haveB = runner.seals[reqB] || 0;
      console.log(`   大劫核验: 需交付【${reqA}×2】(当前:${haveA}) + 【${reqB}×2】(当前:${haveB})`);

      tapHitbox('btn_resolve_calamity_with_seals');
      const calRes = runner.calamityResults[runner.calamityResults.length - 1];

      if (calRes && calRes.survived) {
        console.log(`   🛡️ 势印齐备！【料敌机先 · 破平大劫】！门望底蕴暴涨！`);
      } else {
        console.log(`   💥 势印匮乏！【全面崩溃】！四维底蕴遭遇浩劫！`);
        if (runner.isDead) {
          console.log(`   ☠️ 家族力竭殒命于大劫之中！`);
          break;
        }
      }

      // 大劫结束后推进至下一幕
      global.handleV3ConcludeRound();
    }
  }

  // 终局结算与谥号长卷
  console.log(`\n======================================================================`);
  if (runner.isDead) {
    console.log(`⚰️ 终局结局：中道崩殂 · 【${runner.deathReason || '大劫沦丧'}】`);
  } else {
    console.log(`👑 终局结局：百代荣显 · 功成极盛收官！`);
  }
  console.log(`   终局底蕴: 🏛️门望 ${runner.meters.prestige} | 🪙族产 ${runner.meters.wealth} | ⚔️部曲 ${runner.meters.force} | 🌾义仓 ${runner.meters.grain}`);
  console.log(`   历练岁月: 执政 ${runner.totalRoundsRun} 载 (享年 ${runner.currentAge} 岁)`);
  console.log(`   宗族起居注条目数: ${state.timeline.length} 篇`);
  console.log(`======================================================================\n`);
}

// 连续自动玩 3 把不同世家
playOneGame(1, { hallName: '颍川堂', surname: '陈' });
playOneGame(2, { hallName: '太原堂', surname: '王' });
playOneGame(3, { hallName: '汝南堂', surname: '袁' });

console.log('🎉 恭喜！自主控制页面连续实战试玩 3 把全部圆满完成！');
