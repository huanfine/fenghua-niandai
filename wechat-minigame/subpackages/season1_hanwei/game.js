// 微信小游戏分包：第一赛季【汉魏风骨】纪元拓展包 (公元100~300年)
console.log('【风华年代 · 分包】season1_hanwei 分包加载成功！');

let historicalMilieu = null;
let epochOneEngine = null;

try {
  historicalMilieu = require('./historicalMilieuHanWei.js');
} catch (e) {
  console.warn('【分包】加载 historicalMilieuHanWei 失败:', e);
}

try {
  epochOneEngine = require('./epochOneEngine.js');
} catch (e) {
  console.warn('【分包】加载 epochOneEngine 失败:', e);
}

module.exports = Object.assign({
  isLoaded: true,
  seasonId: 'season_1_han_wei',
  epochRange: [100, 300],
  version: '1.0.0'
}, historicalMilieu || {}, epochOneEngine || {});
