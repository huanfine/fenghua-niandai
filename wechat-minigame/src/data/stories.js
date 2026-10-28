// 华夏世家大系 · 剧情故事文库 (主包轻量分包代理)
// 实际内容已移入 subpackages/season10_modern/stories.js，避免主包膨胀
let _targetMod = null;
try {
  _targetMod = require('../../subpackages/season10_modern/stories.js');
} catch (e1) {
  try {
    const path = require('path');
    _targetMod = require(path.resolve(__dirname, '../../subpackages/season10_modern/stories.js'));
  } catch (_) {
    _targetMod = {};
  }
}

module.exports = _targetMod || {};
