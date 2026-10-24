// 微信小游戏分包：未来前沿纪元拓展包 (公元2100~3100年深空与星汉百年纪元)
// 动态按需加载，杜绝主包突破 4MB 限制

console.log('【风华年代 · 分包】futureEpoch 分包加载成功！');

let futureEngine = null;
try {
  futureEngine = require('./futureFrontierEngine.js');
} catch (e) {
  console.warn('【分包】加载 futureFrontierEngine 失败:', e);
}

module.exports = Object.assign({
  isLoaded: true,
  epochRange: [2100, 3100],
  version: '1.0.0'
}, futureEngine || {});
