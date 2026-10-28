// 华夏世家大系 · 第一纪元核心引擎 (主包轻量分包代理)
// 实际内容已移入 subpackages/season1_hanwei/epochOneEngine.js，避免主包膨胀
let _targetMod = null;
try {
  _targetMod = require('../../subpackages/season1_hanwei/epochOneEngine.js');
} catch (e1) {
  try {
    const path = require('path');
    _targetMod = require(path.resolve(__dirname, '../../subpackages/season1_hanwei/epochOneEngine.js'));
  } catch (_) {
    _targetMod = {};
  }
}

module.exports = _targetMod || {};
