const fs = require('fs');
const path = require('path');

console.log('=== 《浮生万象》双版本自动化独立导出构建 ===');

const projectRoot = '/Users/leonour/development/人生模拟器';
const srcHtmlPath = path.join(projectRoot, 'index.html');
const rawHtml = fs.readFileSync(srcHtmlPath, 'utf8');

const distDir = path.join(projectRoot, 'dist');
const domesticDir = path.join(distDir, 'domestic');
const globalDir = path.join(distDir, 'global');

fs.mkdirSync(domesticDir, { recursive: true });
fs.mkdirSync(globalDir, { recursive: true });

// -------------------------------------------------------------
// 1. 构建国内合规版 (微信小游戏 / 抖音小游戏提审专属包)
// -------------------------------------------------------------
let domesticHtml = rawHtml;
// 固化默认版本为 domestic，并调整顶部展示
domesticHtml = domesticHtml.replace(
  'let currentEdition = localStorage.getItem("lifesim_edition") || "domestic";',
  'let currentEdition = "domestic";'
);
// 移除版本切换按钮，直接显示国内合规标志
domesticHtml = domesticHtml.replace(
  /<button id="btn-edition-toggle"[\s\S]*?<\/button>/,
  '<div class="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 font-bold flex items-center gap-1 shadow-sm">🛡️ 国内合规正式版</div>'
);
// 彻底清除国内包中残存的 global 写实配置字典，确保国内代码无任何敏感词残留
domesticHtml = domesticHtml.replace(
  /global:\s*\{[\s\S]*?phoneTitle:\s*"保密红机电话内线"\s*\}/,
  'global: null'
);

const domesticOutputPath = path.join(domesticDir, 'index.html');
fs.writeFileSync(domesticOutputPath, domesticHtml, 'utf8');
console.log(`✓ [国内合规版] 导出成功 -> ${domesticOutputPath} (${domesticHtml.length} bytes)`);

// -------------------------------------------------------------
// 2. 构建海外写实硬核版 (Steam / 海外发布专属包)
// -------------------------------------------------------------
let globalHtml = rawHtml;
// 固化默认版本为 global，注入真实九级官阶天梯
globalHtml = globalHtml.replace(
  'let currentEdition = localStorage.getItem("lifesim_edition") || "domestic";',
  'let currentEdition = "global";'
);
// 替换为 Steam / 海外写实专版标志
globalHtml = globalHtml.replace(
  /<button id="btn-edition-toggle"[\s\S]*?<\/button>/,
  '<div class="text-[10px] px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700 font-bold flex items-center gap-1 shadow-sm">🌍 Steam / 海外硬核写实版</div>'
);

const globalOutputPath = path.join(globalDir, 'index.html');
fs.writeFileSync(globalOutputPath, globalHtml, 'utf8');
console.log(`✓ [海外写实版] 导出成功 -> ${globalOutputPath} (${globalHtml.length} bytes)`);

console.log('=== 双版本独立产物导出全部完成！===');
