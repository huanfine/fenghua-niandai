/**
 * build_douyin.js
 * 自动化从 wechat-minigame 单一源头构建生成 douyin-minigame 产物
 * 告别多端手工同步 4.6 万行代码
 */
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');
const wechatDir = path.join(projectRoot, 'wechat-minigame');
const douyinDir = path.join(projectRoot, 'douyin-minigame');

console.log('🔄 开始从 wechat-minigame 单一代码源构建 douyin-minigame ...');

// 1. 同步 src/ 数据与子模块目录
function copyDirSync(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

const wechatSrc = path.join(wechatDir, 'src');
const douyinSrc = path.join(douyinDir, 'src');
if (fs.existsSync(wechatSrc)) {
  copyDirSync(wechatSrc, douyinSrc);
  console.log('✅ 已同步 wechat-minigame/src -> douyin-minigame/src');
}

// 1.5 同步 subpackages/ 纪元拓展分包
const wechatSub = path.join(wechatDir, 'subpackages');
const douyinSub = path.join(douyinDir, 'subpackages');
if (fs.existsSync(wechatSub)) {
  copyDirSync(wechatSub, douyinSub);
  console.log('✅ 已同步 wechat-minigame/subpackages -> douyin-minigame/subpackages');
}

// 1.6 同步 game.json 分包配置
const wechatGameJson = path.join(wechatDir, 'game.json');
const douyinGameJson = path.join(douyinDir, 'game.json');
if (fs.existsSync(wechatGameJson)) {
  fs.copyFileSync(wechatGameJson, douyinGameJson);
  console.log('✅ 已同步 game.json 分包声明');
}

// 2. 读取 wechat-minigame/game.js 并适配抖音小游戏
let gameCode = fs.readFileSync(path.join(wechatDir, 'game.js'), 'utf8');

// 注入抖音特定环境标志
const douyinHeader = `/**
 * 《风华年代：沧海沉浮录》字节跳动 / 抖音小游戏自动化构建产物
 * 由 scripts/build_douyin.js 从 wechat-minigame 单一真源自动生成
 * 生成时间: ${new Date().toISOString()}
 */
`;

if (!gameCode.startsWith('/**\n * 《风华年代：沧海沉浮录》字节跳动')) {
  gameCode = douyinHeader + gameCode;
}

fs.writeFileSync(path.join(douyinDir, 'game.js'), gameCode, 'utf8');
console.log(`✅ 已从主包编译生成 douyin-minigame/game.js (${(gameCode.length / 1024 / 1024).toFixed(2)} MB)`);
console.log('🎉 抖音小游戏端同步构建圆满完成！');
