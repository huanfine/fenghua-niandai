/**
 * audit_era_purity.js
 * 华夏世家大系 · 第一赛季（汉魏·公元100—300年）时代纯净性自动化审计工具 (A3)
 * 依据规划附录 B 审计规则：
 * 1. 现代科技（电、手机、电脑、芯片、机床、软件、程序等）
 * 2. 现代金融与组织（公司、集团、银行、贷款、股票、证券、融资等）
 * 3. 现代交通（火车、飞机、地铁、高铁、公交等）
 * 4. 现代媒体（电视、报纸、广播、直播、互联网等）
 * 5. 现代制度（高考、职称、公务员、考公等）
 * 6. 现代货币与单位（元、块、¥、公里、米等）
 * 7. 越界年份（世界年 > 300）
 */

const fs = require('fs');
const path = require('path');

// 允许在古汉语/历史语境下出现的词汇白名单（经史料复核备案）
const APPROVED_WHITELIST = new Set([
  '地动仪',   // 张衡候风地动仪
  '机巧',     // 百工机巧、心机
  '机杼',     // 织造机杼
  '枢机',     // 朝省枢机
  '机枢',     // 机枢重地
  '先机',     // 洞察先机
  '契机',     // 转变契机
  '机宜',     // 相机宜行
  '生机',     // 一线生机
  '良机',     // 错失良机
  '伺机',     // 伺机而动
  '机要',     // 军机机要
  '危机',     // 宗门危机
  '玄机',     // 暗藏玄机
  '相机',     // 相机行事
  '战机',     // 延误战机
  '气机',     // 调摄气机
  '神机',     // 神机妙算
  '机警',     // 敏锐机警
  '风电',     // 疾如风电、风驰电掣
  '雷电',     // 疾风雷电
  '电掣',     // 风驰电掣
  '电光',     // 电光石火
  '闪电',     // 掣同闪电
  '天网',     // 天网恢恢
  '罗网',     // 坠入罗网
  '网罗',     // 网罗英杰
  '渔网',     // 结渔网
  '蛛网',     // 尘封蛛网
  '元老',     // 开国元老、太勋元老
  '元年',     // 永汉元年、建安元年等
  '元勋',     // 开国元勋
  '元气',     // 固本培元
  '元初',     // 年号
  '元康',     // 年号
  '元嘉',     // 年号
  '元和',     // 年号
  '元帝',     // 汉元帝
  '元服',     // 加冠元服
  '米粮',     // 米粮、斗米
  '粟米',     // 粟米、米粟
  '五斗米',   // 五斗米道
  '米盐',     // 细如米盐
  '糙米',     // 糙米
  '粳米',     // 粳米
  '稻米',     // 稻米
  '块磊',     // 胸中块磊
  '土块',     // 聚土成块
  '石块',     // 投石击块
  '板块',     // 地理山川板块
  '公元100',  // 赛季年份
  '公元1',    // 100~300 年代
  '公元2',    // 200~300 年代
  '公元300',  // 赛季结卷年份
  '建康元年'  // 东汉顺帝公元144年正史年号（非南京地名建康）
]);

// 违禁词表分类模式
const FORBIDDEN_PATTERNS = [
  // 现代货币与符号
  { category: '货币与符号', regex: /¥/g, desc: '现代人民币符号 ¥' },
  { category: '货币与符号', regex: /\d+\s*元(?!老|年|勋|气|初|康|嘉|和|帝|服)/g, desc: '现代货币单位 元' },
  { category: '货币与符号', regex: /\d+\s*块(?!磊)/g, desc: '现代口语货币 块' },

  // 现代度量衡
  { category: '度量衡', regex: /\d+\s*公里/g, desc: '现代公制单位 公里' },
  { category: '度量衡', regex: /\d+\s*千米/g, desc: '现代公制单位 千米' },
  { category: '度量衡', regex: /(?<!粟|米粮|糙|粳|稻|斗)米(?![粮粟])/g, filter: (match, fullText, idx) => {
    // 检查前后文，排除五斗米、米粮、糙米等
    const window = fullText.slice(Math.max(0, idx - 4), Math.min(fullText.length, idx + 5));
    for (const w of APPROVED_WHITELIST) {
      if (window.includes(w)) return false;
    }
    return /\d+\s*米(?!\s*粮|\s*粟)/.test(window);
  }, desc: '现代公制度量单位 米' },

  // 汉魏纯净性专属拦截 (穿透式审计新增)
  { category: '汉魏古风符号', regex: /¥/g, desc: '现代人民币符号 ¥' },
  { category: '汉魏古风符号', regex: /实业报国/g, desc: '现代家训口号“实业报国”穿帮' },
  { category: '汉魏道途英文字符', regex: /(?:投身|赛道|道途)\s*official/g, desc: '汉魏赛道未映射英文字符 official' },
  { category: '汉魏地名与官制超前', regex: /建康(?!元年)/g, filter: (match, fullText) => {
    // 东晋以前（<=300）不得出现地名“建康”（排除正史年号“建康元年”）
    return fullText.includes('建康') && !fullText.includes('建康元年');
  }, desc: '东晋前早期年代误用地名“建康”（应为建业/建邺）' },

  // 现代科技
  { category: '现代科技', regex: /(电脑|手机|互联网|软件|算法|芯片|人工智能|半导体|航模|微机|代码|程序猿|网购|充电|电池)/g, desc: '现代电子与信息技术' },
  { category: '现代科技', regex: /电(?!掣|光|气|雷|冰|石火|母|神)/g, filter: (match, fullText, idx) => {
    const window = fullText.slice(Math.max(0, idx - 2), Math.min(fullText.length, idx + 4));
    for (const w of APPROVED_WHITELIST) {
      if (window.includes(w)) return false;
    }
    return /(电话|电报|电子|电视|电影|电费|电厂|电机|电力|电梯|网)/.test(window);
  }, desc: '现代电力与电信' },

  // 现代金融与组织
  { category: '金融组织', regex: /(公司|集团|银行|证券|期货|股票|基金会|合伙人|破产清算|融资|天使轮|风投|外汇)/g, desc: '现代金融与企业组织' },

  // 现代交通
  { category: '现代交通', regex: /(火车|飞机|高铁|地铁|公交车|出租车|乘用车|大巴|客运站|飞机场)/g, desc: '现代交通工具' },

  // 现代媒体
  { category: '现代媒体', regex: /(电视|报纸|广播|直播|短视频|自媒体|博主|网易|央视|新华社)/g, desc: '现代传媒机构' },

  // 现代制度
  { category: '现代制度', regex: /(高考|考研|公务员|考公|职称评定|大专|本科生|少先队|少年宫|工会)/g, desc: '现代人事教育制度' },

  // 现代职场人称
  { category: '职场人称', regex: /(同事|老板|领导(?!\s*班子)|客户|销售额|KPI|PPT|汇报材料)/g, desc: '现代企业职场称谓与黑话' }
];

// 年份违规检测：文中出现 > 300 且不是已登记特殊ID的年份
function checkYearOutOfBounds(text) {
  const violations = [];
  const yrRegex = /(?:(?:公元|西元)\s*([1-9]\d{2,3})|(?<![0-9\+\-])([1-9]\d{2,3})\s*年)(?![0-9])/g;
  let match;
  while ((match = yrRegex.exec(text)) !== null) {
    const yrStr = match[1] || match[2];
    if (!yrStr) continue;
    const yr = parseInt(yrStr, 10);
    // 忽略白名单与合理范围（100~300年）
    if (yr > 300 && yr < 1000) {
      violations.push({ text: match[0], year: yr });
    } else if (yr >= 1800 && yr <= 2100) {
      // 现代年份越界
      violations.push({ text: match[0], year: yr });
    }
  }
  return violations;
}

// 深度提取对象中的所有中文文本字符串
function extractAllStrings(obj, pathPrefix = '', bucket = []) {
  if (!obj) return bucket;
  if (typeof obj === 'string') {
    bucket.push({ path: pathPrefix, text: obj });
  } else if (Array.isArray(obj)) {
    obj.forEach((item, idx) => {
      extractAllStrings(item, `${pathPrefix}[${idx}]`, bucket);
    });
  } else if (typeof obj === 'object') {
    for (const [key, val] of Object.entries(obj)) {
      // 忽略不需要审计的代码内逻辑键名
      if (key === 'id' || key === 'statReq' || key === 'tag' && typeof val !== 'string') continue;
      extractAllStrings(val, `${pathPrefix}.${key}`, bucket);
    }
  }
  return bucket;
}

function runAudit() {
  console.log('====================================================');
  console.log('🏛️  华夏世家大系 · 第一赛季（汉魏·公元100—300年）时代纯净性审计');
  console.log('====================================================\n');

  const filesToAudit = [
    { name: 'historicalMilieuHanWei.js', path: path.join(__dirname, 'wechat-minigame/src/data/historicalMilieuHanWei.js') },
    { name: 'epochOneEngine.js', path: path.join(__dirname, 'wechat-minigame/src/data/epochOneEngine.js') },
    { name: 'childhood.js (Han-Wei packages)', path: path.join(__dirname, 'wechat-minigame/src/data/childhood.js'), filterS1Only: true },
    { name: 'familySystem.js', path: path.join(__dirname, 'wechat-minigame/src/data/familySystem.js') },
    { name: 'game.js (HAN_WEI_RIVALS_DATABASE)', path: path.join(__dirname, 'wechat-minigame/game.js'), extractRivals: true },
    { name: 'game.js (ENDGAME_ARCHETYPES_HAN_WEI)', path: path.join(__dirname, 'wechat-minigame/game.js'), extractHanWeiArchetypes: true },
    { name: 'season_1_han_wei/figureEvents.js', path: path.join(__dirname, 'wechat-minigame/src/seasons/season_1_han_wei/figureEvents.js') },
    { name: 'season_1_han_wei/dynamicEventPool.js', path: path.join(__dirname, 'wechat-minigame/src/seasons/season_1_han_wei/dynamicEventPool.js') }
  ];

  let totalViolations = 0;
  let auditedItemsCount = 0;

  filesToAudit.forEach(fileInfo => {
    if (!fs.existsSync(fileInfo.path)) {
      console.warn(`[WARN] 找不到待审计文件: ${fileInfo.path}`);
      return;
    }

    console.log(`🔍 正在审计: ${fileInfo.name} ...`);
    let mod = null;
    let dataToAudit = null;
    if (fileInfo.extractRivals) {
      const code = fs.readFileSync(fileInfo.path, 'utf8');
      const match = code.match(/const HAN_WEI_RIVALS_DATABASE = (\[[\s\S]*?\]);\n\n\/\/ ======/);
      if (match) {
        try {
          const evalFn = new Function(`return ${match[1]};`);
          dataToAudit = evalFn();
        } catch (e) {
          console.error('[ERROR] 解析 HAN_WEI_RIVALS_DATABASE 失败:', e);
          return;
        }
      } else {
        console.error('[ERROR] 未能在 game.js 中匹配到 HAN_WEI_RIVALS_DATABASE');
        return;
      }
    } else if (fileInfo.extractHanWeiArchetypes) {
      const code = fs.readFileSync(fileInfo.path, 'utf8');
      const match = code.match(/const ENDGAME_ARCHETYPES_HAN_WEI = (\[[\s\S]*?\]);\n\nconst ENDGAME_ARCHETYPES_16/);
      if (match) {
        try {
          const evalFn = new Function(`return ${match[1]};`);
          dataToAudit = evalFn();
        } catch (e) {
          console.error('[ERROR] 解析 ENDGAME_ARCHETYPES_HAN_WEI 失败:', e);
          return;
        }
      } else {
        console.error('[ERROR] 未能在 game.js 中匹配到 ENDGAME_ARCHETYPES_HAN_WEI');
        return;
      }
    } else {
      try {
        mod = require(fileInfo.path);
      } catch (e) {
        console.error(`[ERROR] 载入模块失败: ${fileInfo.path}`, e);
        return;
      }
      dataToAudit = mod;
      if (fileInfo.filterS1Only) {
        dataToAudit = {
          EPOCH_ONE_CHILDHOOD_100: mod.EPOCH_ONE_CHILDHOOD_100,
          EPOCH_ONE_CHILDHOOD_168: mod.EPOCH_ONE_CHILDHOOD_168,
          EPOCH_ONE_CHILDHOOD_220: mod.EPOCH_ONE_CHILDHOOD_220
        };
      }
    }

    const allStrings = extractAllStrings(dataToAudit, fileInfo.name);
    auditedItemsCount += allStrings.length;

    let fileViolations = 0;

    allStrings.forEach(item => {
      // 1. 违禁词检测
      FORBIDDEN_PATTERNS.forEach(rule => {
        let match;
        const re = new RegExp(rule.regex);
        while ((match = re.exec(item.text)) !== null) {
          const matchedWord = match[0];
          if (APPROVED_WHITELIST.has(matchedWord)) continue;
          if (rule.filter && !rule.filter(matchedWord, item.text, match.index)) continue;

          console.error(`  ❌ [${rule.category}] 违规词 "${matchedWord}" (${rule.desc})`);
          console.error(`     位置: ${item.path}`);
          console.error(`     文案: "${item.text.trim()}"\n`);
          fileViolations++;
          totalViolations++;
        }
      });

      // 2. 年份越界检测
      const yrViolations = checkYearOutOfBounds(item.text);
      yrViolations.forEach(v => {
        console.error(`  ❌ [年份越界] 文中出现越界年份 "${v.text}" (第一赛季边界为公元 100~300)`);
        console.error(`     位置: ${item.path}`);
        console.error(`     文案: "${item.text.trim()}"\n`);
        fileViolations++;
        totalViolations++;
      });
    });

    if (fileViolations === 0) {
      console.log(`  ✅ ${fileInfo.name} 审计通过：0 处违规词，0 处越界年份。\n`);
    } else {
      console.log(`  ⚠️  ${fileInfo.name} 发现 ${fileViolations} 处违规。\n`);
    }
  });

  console.log('----------------------------------------------------');
  console.log(`📊 审计完成汇总: 扫描字符串 ${auditedItemsCount} 处, 违规总数: ${totalViolations}`);
  console.log('----------------------------------------------------');

  if (totalViolations === 0) {
    console.log('🎉 时代纯净性审计全部通过 (0 违例)！符合附录 B 与质量门标准！\n');
    process.exit(0);
  } else {
    console.error(`💥 时代纯净性审计未通过，存在 ${totalViolations} 处违例，请整改！\n`);
    process.exit(1);
  }
}

runAudit();
