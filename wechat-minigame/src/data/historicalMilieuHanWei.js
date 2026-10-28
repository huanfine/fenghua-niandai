// 华夏世家大系 · 汉魏风骨历史大案与官阶考据 (主包轻量分包代理)
// 实际内容已移入 subpackages/season1_hanwei/historicalMilieuHanWei.js，避免主包膨胀
let _targetMod = null;
try {
  _targetMod = require('../../subpackages/season1_hanwei/historicalMilieuHanWei.js');
} catch (e1) {
  try {
    const path = require('path');
    _targetMod = require(path.resolve(__dirname, '../../subpackages/season1_hanwei/historicalMilieuHanWei.js'));
  } catch (_) {
    _targetMod = {};
  }
}

module.exports = _targetMod || {};
