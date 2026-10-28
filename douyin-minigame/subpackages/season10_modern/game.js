// 微信小游戏分包：第十赛季【当代弄潮】纪元拓展包 (公元1900~2100年)
console.log('【风华年代 · 分包】season10_modern 分包加载成功！');

let stories = null;
let encounters = null;
let deskDocs = null;
let characters = null;

try { stories = require('./stories.js'); } catch (e) { console.warn('【分包】加载 stories 失败:', e); }
try { encounters = require('./encounters.js'); } catch (e) { console.warn('【分包】加载 encounters 失败:', e); }
try { deskDocs = require('./deskDocs.js'); } catch (e) { console.warn('【分包】加载 deskDocs 失败:', e); }
try { characters = require('./characters.js'); } catch (e) { console.warn('【分包】加载 characters 失败:', e); }

module.exports = Object.assign({
  isLoaded: true,
  seasonId: 'season_10_modern',
  epochRange: [1900, 2100],
  version: '1.0.0'
}, stories || {}, encounters || {}, deskDocs || {}, characters || {});
