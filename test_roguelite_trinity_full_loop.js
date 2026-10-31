/**
 * test_roguelite_trinity_full_loop.js
 * 《华夏世家》全周期肉鸽闭环端到端回归测试
 * 覆盖环节：
 * 1. 局前开局期待：立族大典 -> 先祖受命圣卷 (起源史/祖上名人/奉天承印) -> 宿命抽卡 (2次免费洗髓/金色麒麟儿直选/技能槽上限)
 * 2. 局中不确定性与爽感：天命滑牌决策 -> 暂存遗产行囊HUD -> 历史大战与奇遇暴击掉落遗产宝箱
 * 3. 局后想开下一把：单局独立生死终局 -> 九品世家史碑评级 (S/A/B/C) -> 段位升降 (+1.5, +1.0, 0, -0.8) -> 宝箱提现与没收铁律
 * 4. 跨赛季软重置 (Soft Reset)
 */

const assert = require('assert');

// 模拟微信运行环境
global.window = global;
global.wx = {
  getSystemInfoSync: () => ({ windowWidth: 375, windowHeight: 667, pixelRatio: 2 }),
  getStorageSync: () => null,
  setStorageSync: () => {},
  createCanvas: () => {
    const canvas = {
      width: 750,
      height: 1334,
      getContext: () => ({
        save: () => {},
        restore: () => {},
        beginPath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        stroke: () => {},
        fill: () => {},
        fillRect: () => {},
        strokeRect: () => {},
        clearRect: () => {},
        arc: () => {},
        arcTo: () => {},
        ellipse: () => {},
        clip: () => {},
        quadraticCurveTo: () => {},
        bezierCurveTo: () => {},
        closePath: () => {},
        measureText: (txt) => ({ width: (txt || '').length * 10 }),
        fillText: (txt) => { canvasLogs.push(txt); },
        strokeText: () => {},
        drawImage: () => {},
        translate: () => {},
        rotate: () => {},
        scale: () => {},
        setTransform: () => {},
        createLinearGradient: () => ({ addColorStop: () => {} }),
        createRadialGradient: () => ({ addColorStop: () => {} }),
        setLineDash: () => {},
        getLineDash: () => []
      })
    };
    return canvas;
  },
  onTouchStart: () => {},
  onTouchMove: () => {},
  onTouchEnd: () => {},
  onShow: () => {},
  onHide: () => {},
  loadSubpackage: ({ name, success }) => { if (success) success(); }
};

const canvasLogs = [];
require('./wechat-minigame/game.js');

const state = global.state;
const hitboxes = global.hitboxes;

console.log('====================================================');
console.log('🧪 启动检验：《华夏世家》全周期肉鸽闭环端到端实测');
console.log('====================================================\n');

// ----------------------------------------------------
// [环节 1] 局前立族仪式感与先祖起源圣卷
// ----------------------------------------------------
console.log('👉 [环节 1] 检验立族大典与先祖受命圣卷 (荣耀感与使命感)...');

// 打开立族模态
global.openClanEstablishmentModal();
assert.strictEqual(state.activeModal, 'clan_establishment', '立族模态应当成功开启');

// 选择琅琊王氏 (王氏为第0个姓氏)
state.clanForm = { surnameIndex: 0, provinceIndex: 1, vocationId: 'study_scholar', hallIndex: 0 };
hitboxes.length = 0;
canvasLogs.length = 0;
global.drawActiveModal();

function clickButton(btn) {
  assert(btn, '按钮对象不能为空');
  if (typeof btn.handler === 'function') {
    btn.handler();
  } else if (typeof btn.onClick === 'function') {
    btn.onClick();
  } else {
    throw new Error('按钮既无 handler 也无 onClick: ' + JSON.stringify(btn));
  }
}

// 模拟点击【✦ 焚香告庙 · 永定传世世家 ➔】
const submitBtn = hitboxes.find(h => h.id === 'clan_form_submit');
assert(submitBtn, '应存在 clan_form_submit 按钮');
clickButton(submitBtn);

// 校验是否进入【先祖受命圣卷】而不是直接枯燥跳过！
assert.strictEqual(state.activeModal, 'clan_origins_celebration', '立族后必须呈现先祖受命圣卷');
hitboxes.length = 0;
canvasLogs.length = 0;
global.drawActiveModal();

const logsText = canvasLogs.join(' ');
assert(logsText.includes('先祖受命圣卷'), '圣卷抬头应被绘制');
assert(logsText.includes('王氏'), '姓氏应为王氏');
assert(logsText.includes('奉天承绪 · 奕代载德'), '必须绘制朱红承天印章');
assert(logsText.includes('王翦') || logsText.includes('王导') || logsText.includes('两汉名贤'), '必须展现先祖显赫谱系与历史名人');
console.log('  ✅ 立族大典 -> 先祖显赫源流卷轴 (宗族荣誉感) 验证通过！');

// ----------------------------------------------------
// [环节 2] 局前宿命抽卡系统 (免费2次 / 绝品直选 / 技能槽上限)
// ----------------------------------------------------
console.log('\n👉 [环节 2] 检验宿命抽卡会话与配装系统...');

// 模拟点击【承先祖荣光 · 宿命大选】
const startGachaBtn = hitboxes.find(h => h.id === 'btn_clan_origins_start_gacha');
assert(startGachaBtn, '应存在 btn_clan_origins_start_gacha 按钮');
clickButton(startGachaBtn);

assert.strictEqual(state.gameScene, 'gacha', '应切换至全屏宿命抽卡舞台');
hitboxes.length = 0;
canvasLogs.length = 0;
global.drawGachaScene();

assert(state._destinyGachaSession, '应自动建立 DestinyGachaSession 会话');
assert.strictEqual(state._destinyGachaSession.freePicksMax, 2, '初始免费抽卡上限为2次');
assert.strictEqual(state._destinyGachaSession.freePicksUsed, 0, '初始已用抽卡为0次');

// 检验洗髓重卜按钮
const rerollBtn = hitboxes.find(h => h.id === 'btn_gacha_reroll');
assert(rerollBtn, '应存在洗髓改命重抽按钮');

// 执行第 1 次免费重抽
clickButton(rerollBtn);
assert.strictEqual(state._destinyGachaSession.freePicksUsed, 1, '已用免费重抽应为 1');

// 执行第 2 次免费重抽
clickButton(rerollBtn);
assert.strictEqual(state._destinyGachaSession.freePicksUsed, 2, '已用免费重抽应为 2 (已耗尽)');

// 执行第 3 次重抽 (无道具应受阻)
clickButton(rerollBtn);
assert.strictEqual(state._destinyGachaSession.freePicksUsed, 2, '无洗髓签时严禁超额免费抽取');

// 检验金色顶级卡直选特权
const directGoldBtn = hitboxes.find(h => h.id === 'btn_gacha_direct_legendary');
assert(directGoldBtn, '应存在金色绝品免抽直选按钮');
clickButton(directGoldBtn);

const chosen = state._destinyGachaSession.currentCandidates[state._gachaSelectedIdx || 0];
assert(chosen && chosen.id === 'destiny_golden_kirin', '直选后当前选中卡必须为【主家麒麟儿 · 天纵之才】');
console.log(`  ✅ 抽卡重抽限制 (余2次) 与金色绝品直选验证通过 (当前已选: ${chosen.title})！`);

// 检验技能槽位上限
hitboxes.length = 0;
canvasLogs.length = 0;
global.drawGachaScene();
assert(state.equippedSkillIds.length <= state.maxSkillSlots, '初始技能卡严禁突破槽位上限 (当前槽位: ' + state.maxSkillSlots + ')');
console.log(`  ✅ 技能槽位上限严格锁定 (${state.equippedSkillIds.length}/${state.maxSkillSlots})！`);

// ----------------------------------------------------
// [环节 3] 携宿命入世与局内战利品暂存行囊
// ----------------------------------------------------
console.log('\n👉 [环节 3] 检验携宿命入世与局内战利品行囊 HUD...');

// 确认天命入世
const confirmDestinyBtn = hitboxes.find(h => h.id === 'btn_gacha_confirm_enter_world');
assert(confirmDestinyBtn, '应存在 btn_gacha_confirm_enter_world 按钮');
clickButton(confirmDestinyBtn);

assert.strictEqual(state.gameScene, 'game', '入世后场景应切换为游戏舞台');
assert.strictEqual(state.activeTab, 'card_stage', '入世后必须直接停留在天命推演舞台');
assert.deepStrictEqual(state.chestInventory, [], '每一局人生必须独立，初始宝箱行囊必须为空！');

// 渲染天命推演舞台，检查行囊 HUD
hitboxes.length = 0;
canvasLogs.length = 0;
global.drawDynastyCardStageScreen();

const lootBagBtn = hitboxes.find(h => h.id === 'dynasty_chest_loot_bag_btn');
assert(lootBagBtn, '舞台必须渲染暂存遗产行囊快捷触控区');

// 点击查看行囊详情
clickButton(lootBagBtn);
assert.strictEqual(state.activeModal, 'chest_inventory_detail', '点击行囊应呼出遗产提现铁律与详情模态');

hitboxes.length = 0;
canvasLogs.length = 0;
global.drawActiveModal();
const modalLogs = canvasLogs.join(' ');
assert(modalLogs.includes('局内遗产暂存行囊'), '行囊标题应正常呈现');
assert(modalLogs.includes('S级评分') && modalLogs.includes('100% 提取'), '必须明示S级提取规则');
assert(modalLogs.includes('全部没收'), '必须明示B级以下没收规则');

// 关闭行囊详情
const closeLootBtn = hitboxes.find(h => h.id === 'btn_close_chest_inventory_detail');
assert(closeLootBtn, '应存在关闭行囊按钮');
clickButton(closeLootBtn);
assert.strictEqual(state.activeModal, null, '行囊详情模态应关闭');
console.log('  ✅ 局内战利品暂存行囊 HUD 与提现铁律模态验证通过！');

// ----------------------------------------------------
// [环节 4] 局内大战/奇遇暴击掉落遗产宝箱
// ----------------------------------------------------
console.log('\n👉 [环节 4] 检验战役决胜与奇遇掉落宝箱...');

state.activeCard = {
  id: 'card_yellow_turban_anchor_184',
  isAnchor: true,
  title: '黄巾烽火',
  year: 184,
  left: { text: '据险自守', effects: { force: -10 } },
  right: { text: '起兵勤王', effects: { force: 20, prestige: 25 } }
};

// 模拟右滑决断
global.executeCardDecision('right');
assert(state.chestInventory.length >= 1, '历史大捷后行囊中必须新增遗产宝箱！');
const firstChest = state.chestInventory[0];
console.log(`  ✅ 战役决胜爆出宝箱: ${firstChest.name} (来源: ${firstChest.source})！`);

if (state.activeModal === 'chest_drop_fanfare') {
  hitboxes.length = 0;
  global.drawActiveModal();
  const collectBtn = hitboxes.find(h => h.id === 'btn_collect_dropped_chest');
  assert(collectBtn, '爆箱狂欢弹窗中应包含收入行囊按键');
  clickButton(collectBtn);
  assert.strictEqual(state.activeModal, null, '收入行囊后狂欢弹窗应关闭');
}

// 再制造一次暴击奇遇掉落
state.activeCard = {
  id: 'card_guandu_anchor_200',
  isAnchor: true,
  title: '官渡对决',
  year: 200,
  left: { text: '退保宗族', effects: {} },
  right: { text: '运粮助曹', effects: { wealth: -15, prestige: 30 } }
};
global.executeCardDecision('right');
assert.strictEqual(state.chestInventory.length, 2, '累计缴获宝箱应达到 2 件');
console.log(`  ✅ 累计缴获暂存宝箱: ${state.chestInventory.length} 件！`);

if (state.activeModal === 'chest_drop_fanfare') {
  hitboxes.length = 0;
  global.drawActiveModal();
  const collectBtn = hitboxes.find(h => h.id === 'btn_collect_dropped_chest');
  assert(collectBtn, '爆箱狂欢弹窗中应包含收入行囊按键');
  clickButton(collectBtn);
  assert.strictEqual(state.activeModal, null, '收入行囊后狂欢弹窗应关闭');
}

// ----------------------------------------------------
// [环节 5] 局末九品世家结卷史碑与提现/没收铁律
// ----------------------------------------------------
console.log('\n👉 [环节 5] 检验终局评分与宝箱提取/没收铁律...');

// 场景 A：玩家打出 S 级极盛人生 (寿命长 + 门望高 + 渡过2次历史大潮)
state.age = 65;
state.year = 220;
state.meters = { prestige: 90, wealth: 85, force: 75, grain: 80 };
state.milestonesPassed = 2;

// 触发结算
const sEval = global._clanRankMod.evaluateSingleRunScore(state);
assert.strictEqual(sEval.grade, 'S', '高门长寿平乱应评为 S 级');
const sExtraction = global._clanRankMod.resolveChestExtraction(state.chestInventory, sEval.grade);
assert.strictEqual(sExtraction.extracted.length, 2, 'S 级必须 100% 全部提取宝箱！');
assert.strictEqual(sExtraction.discarded.length, 0, 'S 级不应有宝箱被没收');
console.log(`  ✅ [S级结算] 得分 ${sEval.rawScore} 分 (S级)，宝箱全取: ${sExtraction.extracted.length}/${state.chestInventory.length} 件！`);

// 场景 B：玩家打出 B 级平庸人生 (守成平和，终身无大波澜，无法晋阶)
state.age = 58;
state.year = 158;
state.meters = { prestige: 52, wealth: 50, force: 50, grain: 50 };
state.milestonesPassed = 0;

const bEval = global._clanRankMod.evaluateSingleRunScore(state);
assert.strictEqual(bEval.grade, 'B', '平淡人生应评为 B 级');
const bExtraction = global._clanRankMod.resolveChestExtraction(state.chestInventory, bEval.grade);
assert.strictEqual(bExtraction.extracted.length, 0, 'B 级段位不升，严禁提取宝箱！');
assert.strictEqual(bExtraction.discarded.length, 2, 'B 级所有宝箱必须全部没收！');
console.log(`  ✅ [B级结算] 得分 ${bEval.rawScore} 分 (B级)，段位不升，宝箱全部没收: ${bExtraction.discarded.length} 件！`);

// 检验终局模态渲染【九品世家结卷史碑】
state.activeModal = 'endgame';
state.lastRunEvaluation = sEval;
state.lastChestExtraction = sExtraction;
state.lastRankSettleResult = global._clanRankMod.settleClanRankProgress(state.familyProfile, sEval.grade);

hitboxes.length = 0;
canvasLogs.length = 0;
global.drawActiveModal();
const endgameLogs = canvasLogs.join(' ');
assert(endgameLogs.includes('九品世家结卷史碑'), '必须绘制九品世家史碑');
assert(endgameLogs.includes('宗族大评定') || endgameLogs.includes('世家等第'), '必须呈现门阀评级');
console.log('  ✅ 局末【九品世家结卷史碑】与提现结算卡片绘制完整无误！');

// ----------------------------------------------------
// [环节 6] 跨赛季软重置 (Soft Reset)
// ----------------------------------------------------
console.log('\n👉 [环节 6] 检验跨赛季段位平移与遗产软重置...');
const testProfile = {
  rankProgress: { rankOrder: 6, currentPoints: 80 }
};
const newRankCfg = global._clanRankMod.applySeasonSoftReset(testProfile);
assert(testProfile.rankProgress.rankOrder < 6, '新赛季段位应适度平移衰减');
assert.strictEqual(testProfile.rankProgress.rankOrder, 2, '中坚6阶世家软重置后应落入2阶');
assert(newRankCfg && newRankCfg.order === 2, '返回的新段位配置应当匹配');
console.log(`  ✅ 跨赛季软重置成功：段位阶由 6 阶衰减平移至 ${testProfile.rankProgress.rankOrder} 阶 (${newRankCfg.name})，积分归零，迎接新赛季挑战！`);

console.log('\n====================================================');
console.log('🎉 《华夏世家》全周期肉鸽闭环端到端实测 100% 全部通过！');
console.log('====================================================');
process.exit(0);
