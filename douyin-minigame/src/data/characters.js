// 华夏世家大系 · 名宿人物长卷 (主包轻量分包代理)
// 实际内容已移入 subpackages/season10_modern/characters.js，避免主包膨胀
let _targetMod = null;
try {
  _targetMod = require('../../subpackages/season10_modern/characters.js');
} catch (e1) {
  try {
    const path = require('path');
    _targetMod = require(path.resolve(__dirname, '../../subpackages/season10_modern/characters.js'));
  } catch (_) {
    _targetMod = {};
  }
}

module.exports = _targetMod || {};
