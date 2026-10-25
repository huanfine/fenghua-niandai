// 华夏三千年世家大系 · 未来推演前沿引擎 (主包轻量瘦身代理)
// 实际完整实现已移入分包 subpackages/futureEpoch/futureFrontierEngine.js
// 避免主包重复打包 38 KB，降低 4MB 红线风险
try {
  module.exports = require('../../subpackages/futureEpoch/futureFrontierEngine.js');
} catch (e) {
  module.exports = {};
}
