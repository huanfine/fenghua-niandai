// 自动化验证脚本：家族创建与第一纪元（汉末筑基）全流程跑通

const { createFamilyProfile, recordAncestorToGenealogy, VOCATION_ORIGIN_PROFILES } = require('./wechat-minigame/src/data/familySystem');
const { EPOCH_ONE_HISTORICAL_EVENTS, runEpochOneEvent, settleEpochOneAncestor } = require('./wechat-minigame/src/data/epochOneEngine');

console.log('=== [测试 1: 家族档案建制与防伪合规校验] ===');

// 1.1 敏感词拦截测试
let blocked = false;
try {
  createFamilyProfile({ surname: '爱新觉罗', province: '北京', hallName: '正黄旗堂', vocationId: 'study_scholar' });
} catch (e) {
  blocked = true;
  console.log('  [PASS] 成功拦截敏感家族命名:', e.message);
}
if (!blocked) throw new Error('未能拦截敏感家族命名！');

// 1.2 正式创建合规世家：陈氏 · 颍川堂
const myFamily = createFamilyProfile({
  surname: '陈',
  province: '河南',
  hallName: '颍川堂',
  vocationId: 'study_scholar',
  customMotto: '诗书继世长，清白传家久。'
});

console.log('  [PASS] 成功创立家族:', myFamily.fullName);
console.log('  [INFO] 初始信托基金:', myFamily.clanTrust.trustFundMoney);
console.log('  [INFO] 始祖初训:', myFamily.clanTrust.mottoList[0].text);

console.log('\n=== [测试 2: 第一纪元（公元100~220年）5大历史关隘实战演进] ===');

// 始祖初生状态
const ancestorState = {
  name: '崇礼',
  ziHao: '子敬',
  courage: 65,
  iq: 70,
  morality: 60,
  sanbaoShen: 55,
  money: 5000,
  clanPrestige: 50
};

const decisionHistory = [];

EPOCH_ONE_HISTORICAL_EVENTS.forEach((evt, idx) => {
  console.log(`\n  --- 关隘 ${idx + 1}: 【${evt.year}年】${evt.title} ---`);
  // 策略：选择第 1 项或第 2 项
  const chosenOptIndex = idx % 2 === 0 ? 0 : 1;
  const outcome = runEpochOneEvent(idx, chosenOptIndex, ancestorState);
  decisionHistory.push(outcome);
  console.log(`    抉择: ${outcome.chosenText}`);
  console.log(`    回响: ${outcome.chronicleSnippet}`);
});

console.log('\n=== [测试 3: 第一代先祖百年盖棺、谥号与宗谱归档] ===');

const ancestorRecord = settleEpochOneAncestor(myFamily, ancestorState, decisionHistory);
console.log('  [INFO] 始祖享年:', `${ancestorRecord.lifespan[0]} - ${ancestorRecord.lifespan[1]}`);
console.log('  [INFO] 官封仕履:', ancestorRecord.officialTitle);
console.log('  [INFO] 宗祠谥号:', ancestorRecord.posthumousTitle);
console.log('  [INFO] 归档家训:', ancestorRecord.newMotto.text);
console.log('  [INFO] 墓志铭:', ancestorRecord.epitaph);

const genealogyEntry = recordAncestorToGenealogy(myFamily, ancestorRecord);
console.log('\n  [PASS] 成功墨印载入《千年家谱》第', genealogyEntry.generation, '世！');
console.log('  [INFO] 家族最新信托基金总额:', myFamily.clanTrust.trustFundMoney, '钱');
console.log('  [INFO] 家族传世家训总条数:', myFamily.clanTrust.mottoList.length, '条');
console.log('  [INFO] 族谱长卷记录数:', myFamily.genealogyList.length, '位先祖');

console.log('\n=== [所有测试全部通过！三千年世家大系 M1 奠基成功] ===\n');
