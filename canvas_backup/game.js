/**
 * 《浮生万象：当代人生风云录》微信小游戏原生高性能引擎
 * 核心目标：网页的效果 · 原生的性能
 * 特性：
 *  - 60FPS 丝滑渲染循环与粒子系统 (Particle FX)
 *  - 生平纪事流原生惯性滑动 (Inertia Touch Physics)
 *  - 零延迟原生合成音效 (WebAudio Synthesized SFX)
 *  - 全机型安全区与胶囊自适应 (Dynamic Safe-Area)
 *  - 六大赛道完整天梯 (Career Ladder System)
 *  - 经典三栏原生切换 (📜生平纪事 | 🏆职业天梯 | 📊四维属性)
 *  - 100% 合规 (NPPA 健康游戏忠告与 CADPA 12+ 适龄提示)
 */

// 1. 系统环境与高清 Canvas 视口配置
const sysInfo = wx.getSystemInfoSync();
const screenWidth = sysInfo.windowWidth;
const screenHeight = sysInfo.windowHeight;
const dpr = sysInfo.pixelRatio || 2;

// 胶囊避让与安全区动态计算
let capsule = { top: 44, bottom: 80, left: screenWidth - 95, right: screenWidth - 10, height: 32 };
if (wx.getMenuButtonBoundingClientRect) {
  try {
    const res = wx.getMenuButtonBoundingClientRect();
    if (res && res.top && res.bottom) capsule = res;
  } catch (e) {}
}

const safeTop = Math.max(capsule.bottom + 6, (sysInfo.safeArea ? sysInfo.safeArea.top : 40) + 8);
const safeBottom = sysInfo.safeArea ? Math.max(16, screenHeight - sysInfo.safeArea.bottom + 6) : 20;

// 初始化原生 Canvas
const canvas = wx.createCanvas();
canvas.width = screenWidth * dpr;
canvas.height = screenHeight * dpr;

const ctx = canvas.getContext('2d');
ctx.scale(dpr, dpr);

// 2. 原生 WebAudio 零延迟合成音效系统
let audioCtx = null;
try {
  if (wx.createWebAudioContext) {
    audioCtx = wx.createWebAudioContext();
  }
} catch (e) {}

function playSound(type) {
  if (!audioCtx) return;
  try {
    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    if (type === 'click') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.06);
      osc.start(now);
      osc.stop(now + 0.06);
    } else if (type === 'coin') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(987, now);
      osc.frequency.setValueAtTime(1318, now + 0.08);
      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.22);
      osc.start(now);
      osc.stop(now + 0.22);
    } else if (type === 'level') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523, now);
      osc.frequency.setValueAtTime(659, now + 0.09);
      osc.frequency.setValueAtTime(784, now + 0.18);
      osc.frequency.setValueAtTime(1046, now + 0.27);
      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    }
  } catch (e) {}
}

function playHaptic(type = 'light') {
  if (wx.vibrateShort) {
    wx.vibrateShort({ type: type });
  }
}

// 3. 通用几何工具与文本排版
function drawRoundedRect(c, x, y, width, height, radius) {
  if (radius <= 0) {
    c.beginPath();
    c.rect(x, y, width, height);
    c.closePath();
    return;
  }
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  c.beginPath();
  c.moveTo(x + radius, y);
  c.arcTo(x + width, y, x + width, y + height, radius);
  c.arcTo(x + width, y + height, x, y + height, radius);
  c.arcTo(x, y + height, x, y, radius);
  c.arcTo(x, y, x + width, y, radius);
  c.closePath();
}

function fitText(text, maxWidth, font) {
  ctx.font = font;
  if (ctx.measureText(text).width <= maxWidth) return text;
  let s = text;
  while (s.length > 1 && ctx.measureText(s + '...').width > maxWidth) {
    s = s.slice(0, -1);
  }
  return s + '...';
}

function wrapTextLines(text, maxWidth, font) {
  ctx.font = font;
  const lines = [];
  let cur = '';
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const test = cur + ch;
    if (ctx.measureText(test).width > maxWidth && cur.length > 0) {
      lines.push(cur);
      cur = ch;
    } else {
      cur = test;
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

// 4. 六大主线完整天梯元数据 (与网页版 100% 对齐)
const TRACKS = [
  {
    id: 'biz',
    name: '周胜海',
    title: '商海弄潮',
    icon: '🌊',
    color: '#f59e0b',
    startAge: 20,
    startYear: 1992,
    desc: '从海鲜地摊到千亿级国际实业控股巨擘',
    ladder: [
      { age: 20, rank: '初创个体户', job: '码头海鲜批发摊主', salary: 38000 },
      { age: 26, rank: '商行老板', job: '跨区水产冷链批发行长', salary: 120000 },
      { age: 32, rank: '民营实业家', job: '收购冷冻食品实业厂长', salary: 360000 },
      { age: 38, rank: '民营集团老总', job: '现代城市基建控股董事长', salary: 980000 },
      { age: 46, rank: '拟上市公司总裁', job: '万山胜海实业实控人', salary: 2800000 },
      { age: 55, rank: '跨国巨头主席', job: '高端智造跨国龙头董事长', salary: 6500000 }
    ]
  },
  {
    id: 'med',
    name: '林晚意',
    title: '大医精诚',
    icon: '🩺',
    color: '#06b6d4',
    startAge: 25,
    startYear: 2005,
    desc: '从规培住院医到国家医学中心首席专家',
    ladder: [
      { age: 25, rank: '规培住院医', job: '急诊外科住院医师', salary: 32000 },
      { age: 30, rank: '主治医师', job: '创伤微创普外主治医', salary: 95000 },
      { age: 36, rank: '副主任医师', job: '大外科副主任 · 国自然PI', salary: 280000 },
      { age: 42, rank: '主任医师', job: '大外科主任 · 国家课题带头人', salary: 680000 },
      { age: 50, rank: '三甲副院长', job: '国家医学中心副主任', salary: 1500000 },
      { age: 58, rank: '终身院长', job: '中华医学会副主委 · 行业泰斗', salary: 3200000 }
    ]
  },
  {
    id: 'tech',
    name: '顾明远',
    title: '硬核智造',
    icon: '🔬',
    color: '#3b82f6',
    startAge: 22,
    startYear: 2000,
    desc: '突破工业母机壁垒，领跑自主可控前沿',
    ladder: [
      { age: 22, rank: '车库创客', job: '自研软硬件极客工坊', salary: 45000 },
      { age: 28, rank: '自研CTO', job: '芯片架构自研初创团队总监', salary: 180000 },
      { age: 35, rank: '专精特新掌舵人', job: '精密伺服小巨人董事长', salary: 550000 },
      { age: 43, rank: '具身智能CEO', job: '工业人形机器人龙头领军', salary: 1600000 },
      { age: 50, rank: '科技巨头董事长', job: '工业互联网独角兽实控人', salary: 3800000 },
      { age: 58, rank: '全球科技泰斗', job: '国家工业战略核心首席科学家', salary: 8000000 }
    ]
  },
  {
    id: 'agri',
    name: '陆远',
    title: '沃野千里',
    icon: '🌾',
    color: '#10b981',
    startAge: 20,
    startYear: 1995,
    desc: '扎根泥土以科技兴农，谱写乡村振兴史诗',
    ladder: [
      { age: 20, rank: '基层农技员', job: '基层良种推广站技术员', salary: 30000 },
      { age: 27, rank: '示范园主任', job: '设施农业智能示范园主任', salary: 90000 },
      { age: 35, rank: '繁育中心总师', job: '现代良种繁育工程总师', salary: 260000 },
      { age: 42, rank: '首席产业专家', job: '国家现代农业示范区领军人', salary: 620000 },
      { age: 50, rank: '产业联合体理事长', job: '农业现代化联合体理事长', salary: 1400000 },
      { age: 58, rank: '卓越战略科学家', job: '国家乡村振兴战略领航专家', salary: 3000000 }
    ]
  },
  {
    id: 'art',
    name: '叶知秋',
    title: '文化造梦',
    icon: '🎨',
    color: '#ec4899',
    startAge: 21,
    startYear: 2003,
    desc: '以笔为剑传承国韵，让中华故事风靡全球',
    ladder: [
      { age: 21, rank: '独立画师', job: '国风独立动画分镜师', salary: 35000 },
      { age: 27, rank: '工作室主美', job: '原创国风动漫工作室主创', salary: 110000 },
      { age: 34, rank: '影视总导演', job: '爆款文化影视IP总导演', salary: 380000 },
      { age: 42, rank: '数字文创总监', job: '新国风互动文创科技实控人', salary: 920000 },
      { age: 50, rank: '艺术总监', job: '东方美学国际文化艺术总监', salary: 2200000 },
      { age: 58, rank: '文化泰斗', job: '国家级文化创新杰出奠基人', salary: 4500000 }
    ]
  },
  {
    id: 'law',
    name: '方凌',
    title: '律政天平',
    icon: '⚖️',
    color: '#8b5cf6',
    startAge: 23,
    startYear: 2002,
    desc: '捍卫法治与程序正义，驰骋涉外商事仲裁',
    ladder: [
      { age: 23, rank: '实习律师', job: '涉外商事合伙所助理律师', salary: 36000 },
      { age: 29, rank: '专职律师', job: '专职涉外争端仲裁律师', salary: 130000 },
      { age: 36, rank: '高级合伙人', job: '重组破产涉外首席律师', salary: 420000 },
      { age: 43, rank: '仲裁委主任', job: '特区仲裁委员会副主任', salary: 960000 },
      { age: 51, rank: '常任仲裁员', job: '国际商事仲裁院常任仲裁官', salary: 2500000 },
      { age: 58, rank: '法学泰斗', job: '涉外法治建设最高咨询专家', salary: 5200000 }
    ]
  }
];

// 5. 游戏运行时数据
let gameState = {
  phase: 'select_track', // 'select_track' | 'playing' | 'decision' | 'endgame'
  activeTab: 'chronicle', // 'chronicle' | 'ladder' | 'profile'
  track: TRACKS[0],
  name: '周胜海',
  age: 20,
  year: 1992,
  rankIdx: 0,
  capital: 38000,
  iq: 82,
  eq: 75,
  courage: 78,
  clean: 94,
  rep: 52,
  health: 98,
  chronicle: [],
  activeEvent: null,
  isAuto: false,
  autoSpeed: 1, // 1 | 2 | 3
  autoTimer: null,
  toastMsg: '',
  toastTimer: null
};

// 6. 动效与惯性滚动引擎 (Particle FX & Inertia Scroll)
const particles = [];

function spawnCoinParticles(text, color = '#fbbf24') {
  particles.push({
    text: text,
    x: screenWidth / 2,
    y: screenHeight - safeBottom - 75,
    vy: -2.2,
    alpha: 1.0,
    color: color
  });
}

// 触摸惯性滚动物理模型
const scrollState = {
  startY: 0,
  currentY: 0,
  offsetY: 0,
  targetOffsetY: 0,
  velocityY: 0,
  isDragging: false,
  maxScroll: 0
};

// 7. 经济结算与职业晋升判定
function getCurrentRank() {
  const lad = gameState.track.ladder;
  for (let i = lad.length - 1; i >= 0; i--) {
    if (gameState.age >= lad[i].age) return lad[i];
  }
  return lad[0];
}

function getNextRank() {
  const lad = gameState.track.ladder;
  for (let i = 0; i < lad.length; i++) {
    if (gameState.age < lad[i].age) return lad[i];
  }
  return null;
}

function getYearlyIncome() {
  const cur = getCurrentRank();
  const bonus = (gameState.age - cur.age) * 6000;
  return cur.salary + bonus;
}

// 8. 推进新一岁 (tickYear)
function tickYear() {
  playHaptic('medium');
  playSound('coin');
  gameState.age += 1;
  gameState.year += 1;

  const inc = getYearlyIncome();
  gameState.capital += inc;
  spawnCoinParticles(`+¥${inc.toLocaleString()}`, '#34d399');

  // 属性稳健自然成长
  gameState.iq = Math.min(100, gameState.iq + Math.floor(Math.random() * 2));
  gameState.eq = Math.min(100, gameState.eq + Math.floor(Math.random() * 2));
  gameState.courage = Math.min(100, gameState.courage + Math.floor(Math.random() * 2));
  gameState.rep = Math.min(100, gameState.rep + Math.floor(Math.random() * 3) + 1);
  gameState.health = Math.max(20, gameState.health - 1);

  // 职业天梯跨越检测
  const cur = getCurrentRank();
  const lad = gameState.track.ladder;
  const curIdx = lad.indexOf(cur);
  if (curIdx > gameState.rankIdx) {
    gameState.rankIdx = curIdx;
    playSound('level');
    playHaptic('heavy');
    gameState.chronicle.unshift({
      year: gameState.year,
      age: gameState.age,
      tag: '⭐ 职业跃迁',
      color: '#f59e0b',
      text: `厚积薄发！凭借卓绝实绩晋升【${cur.rank}】！担任【${cur.job}】，年入提升至 ¥${cur.salary.toLocaleString()}！`
    });
    showToast(`🎉 晋升为【${cur.rank}】！`);
  } else {
    // 常规年度奋斗记事
    gameState.chronicle.unshift({
      year: gameState.year,
      age: gameState.age,
      tag: '📈 稳健拓进',
      color: '#38bdf8',
      text: `在【${cur.job}】笃行不怠，拓展核心资源，本年度经营与分红净入账 +¥${inc.toLocaleString()}。`
    });
  }

  // 随机触发时代风云事件 (35% 概率)
  if (Math.random() < 0.35 && gameState.age < 60) {
    triggerRandomEvent();
  }

  // 60 岁达成终局
  if (gameState.age >= 60) {
    gameState.phase = 'endgame';
    if (gameState.autoTimer) clearInterval(gameState.autoTimer);
    gameState.isAuto = false;
    playSound('level');
  }
}

// 9. 时代风云事件库
function triggerRandomEvent() {
  const events = [
    {
      title: '重大产业战略协同机遇',
      desc: '国家推动现代产业链高质量协同发展，你的团队面临技术创新自主攻关或联合重组的战略抉择。',
      choices: [
        { text: '🚀 倾力设立自研实验室攻关核心技术', eff: (s) => { s.capital -= 80000; s.iq += 6; s.rep += 8; } },
        { text: '🛡️ 联袂行业头部生态稳健共担共赢', eff: (s) => { s.capital += 60000; s.eq += 5; s.clean += 4; } }
      ]
    },
    {
      title: '跨国商事争端与合规审计',
      desc: '海外合作方借非关税壁垒施压，权威独立合规第三方入驻现场全面审计。',
      choices: [
        { text: '⚖️ 亮出严谨合规证据链从容依法维权', eff: (s) => { s.clean += 8; s.rep += 6; } },
        { text: '🤝 战略转移布局一带一路沿线新兴市场', eff: (s) => { s.capital += 90000; s.courage += 5; } }
      ]
    },
    {
      title: '乡村振兴结对共富行动',
      desc: '行业号召骨干领头人奔赴乡村一线，以现代科技赋能特色产业生态。',
      choices: [
        { text: '🌾 出资援建全链条数字化深加工基地', eff: (s) => { s.capital -= 50000; s.rep += 12; s.clean += 5; } },
        { text: '📱 孵化农文旅融合超级IP带动全村致富', eff: (s) => { s.eq += 7; s.rep += 9; } }
      ]
    }
  ];

  const ev = events[Math.floor(Math.random() * events.length)];
  gameState.activeEvent = ev;
  gameState.phase = 'decision';
  if (gameState.autoTimer) clearInterval(gameState.autoTimer);
  gameState.isAuto = false;
  playSound('click');
}

function resolveDecision(idx) {
  playHaptic('medium');
  playSound('click');
  const ev = gameState.activeEvent;
  if (!ev) return;
  const c = ev.choices[idx];
  if (c && c.eff) c.eff(gameState);

  gameState.chronicle.unshift({
    year: gameState.year,
    age: gameState.age,
    tag: '⚡ 时代决断',
    color: '#a855f7',
    text: `面对【${ev.title}】，坚毅选择：${c.text}，深远拓宽了人生发展维度。`
  });

  gameState.activeEvent = null;
  gameState.phase = 'playing';
  showToast('✨ 抉择生效 · 命运齿轮平稳运转！');
}

function showToast(msg) {
  gameState.toastMsg = msg;
  if (gameState.toastTimer) clearTimeout(gameState.toastTimer);
  gameState.toastTimer = setTimeout(() => {
    gameState.toastMsg = '';
  }, 2000);
}

// 10. 高性能 60FPS 渲染循环 (Canvas 2D Ticker)
function tick() {
  // 更新惯性滚动物理
  if (!scrollState.isDragging && Math.abs(scrollState.velocityY) > 0.1) {
    scrollState.offsetY += scrollState.velocityY;
    scrollState.velocityY *= 0.92;
    if (scrollState.offsetY > 0) {
      scrollState.offsetY *= 0.8;
      if (scrollState.offsetY < 0.5) scrollState.offsetY = 0;
    } else if (scrollState.offsetY < -scrollState.maxScroll) {
      scrollState.offsetY = -scrollState.maxScroll;
    }
  }

  // 渲染整屏
  renderFrame();

  // 更新并绘制粒子
  renderParticles();

  requestAnimationFrame(tick);
}

// 11. 视觉渲染总控
function renderFrame() {
  ctx.save();
  ctx.textBaseline = 'top';

  // 极具质感的深色沉浸式底色
  ctx.fillStyle = '#080b14';
  ctx.fillRect(0, 0, screenWidth, screenHeight);

  if (gameState.phase === 'select_track') {
    renderTrackSelect();
  } else if (gameState.phase === 'playing' || gameState.phase === 'decision') {
    renderMainGame();
    if (gameState.phase === 'decision') {
      renderDecisionModal();
    }
  } else if (gameState.phase === 'endgame') {
    renderEndgame();
  }

  // 顶部全局悬浮 Toast
  if (gameState.toastMsg) {
    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.font = 'bold 13px -apple-system, sans-serif';
    const tw = ctx.measureText(gameState.toastMsg).width + 38;
    const tx = (screenWidth - tw) / 2;
    const ty = safeTop - 4;

    ctx.fillStyle = 'rgba(245, 158, 11, 0.96)';
    drawRoundedRect(ctx, tx, ty, tw, 34, 17);
    ctx.fill();

    ctx.fillStyle = '#0a0d18';
    ctx.fillText(gameState.toastMsg, screenWidth / 2, ty + 17);
    ctx.restore();
  }

  ctx.restore();
}

// 粒子飘字动效渲染
function renderParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];
    p.y += p.vy;
    p.alpha -= 0.02;

    if (p.alpha <= 0) {
      particles.splice(i, 1);
      continue;
    }

    ctx.save();
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.globalAlpha = Math.max(0, p.alpha);
    ctx.font = 'bold 16px -apple-system, sans-serif';
    ctx.fillStyle = p.color;
    ctx.shadowColor = 'rgba(251, 191, 36, 0.5)';
    ctx.shadowBlur = 8;
    ctx.fillText(p.text, p.x, p.y);
    ctx.restore();
  }
}

// A. 开局赛道选择界面 (媲美网页版卡片质感)
function renderTrackSelect() {
  ctx.save();

  // 主标题
  ctx.textAlign = 'center';
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 22px -apple-system, sans-serif';
  ctx.fillText('浮生万象 · 当代人生风云录', screenWidth / 2, safeTop);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillText('六大人生赛道 · 开启三十载当代风云奋斗征程', screenWidth / 2, safeTop + 30);

  // 六大赛道卡片 (2列 × 3行 精确网格)
  const padX = 14;
  const gap = 10;
  const cardW = (screenWidth - padX * 2 - gap) / 2;
  const cardH = 94;
  const startY = safeTop + 58;

  TRACKS.forEach((tr, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = padX + col * (cardW + gap);
    const y = startY + row * (cardH + gap);

    // 卡片背景与科技蓝边框
    ctx.fillStyle = '#12172a';
    ctx.strokeStyle = '#273356';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, x, y, cardW, cardH, 12);
    ctx.fill();
    ctx.stroke();

    // 赛道图标与名称
    ctx.textAlign = 'left';
    ctx.fillStyle = tr.color;
    ctx.font = 'bold 14px -apple-system, sans-serif';
    ctx.fillText(`${tr.icon} ${tr.title}`, x + 10, y + 12);

    // 主角徽章
    ctx.fillStyle = '#38bdf8';
    ctx.font = 'bold 11px -apple-system, sans-serif';
    ctx.fillText(`主角: ${tr.name}`, x + 10, y + 36);

    // 起步岗位 (自适应截断)
    ctx.fillStyle = '#cbd5e1';
    ctx.font = '10px -apple-system, sans-serif';
    const jobText = fitText(tr.ladder[0].job, cardW - 20, '10px -apple-system, sans-serif');
    ctx.fillText(jobText, x + 10, y + 54);

    // 赛道格言
    ctx.fillStyle = '#64748b';
    ctx.font = '9px -apple-system, sans-serif';
    const descText = fitText(tr.desc, cardW - 20, '9px -apple-system, sans-serif');
    ctx.fillText(descText, x + 10, y + 74);
  });

  // 法定健康游戏忠告与 CADPA 12+ 标识
  renderComplianceFooter(screenHeight - safeBottom - 50);

  ctx.restore();
}

// B. 主游戏界面 (顶栏仪表盘 + 原生三栏 Tab + 纪事/天梯/属性 + 底部控制台)
function renderMainGame() {
  ctx.save();

  // 1. 顶部主角核心仪表盘 (高度 98px)
  const headerY = safeTop;
  const headerH = 96;
  const headerW = screenWidth - 24;
  const headerX = 12;

  ctx.fillStyle = '#121629';
  ctx.strokeStyle = '#283458';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, headerX, headerY, headerW, headerH, 14);
  ctx.fill();
  ctx.stroke();

  const curRank = getCurrentRank();

  // 第一行：角色赛道与年份
  ctx.textAlign = 'left';
  ctx.fillStyle = gameState.track.color;
  ctx.font = 'bold 15px -apple-system, sans-serif';
  ctx.fillText(`${gameState.track.icon} ${gameState.name} · ${gameState.track.title}`, headerX + 12, headerY + 12);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 13px -apple-system, sans-serif';
  ctx.fillText(`${gameState.year}年 · ${gameState.age}岁`, headerX + headerW - 12, headerY + 13);

  // 第二行：职级与职务
  ctx.textAlign = 'left';
  ctx.fillStyle = '#f8fafc';
  ctx.font = 'bold 12px -apple-system, sans-serif';
  const roleText = fitText(`职级: ${curRank.rank} · ${curRank.job}`, headerW - 24, 'bold 12px -apple-system, sans-serif');
  ctx.fillText(roleText, headerX + 12, headerY + 36);

  // 第三行：总资产与年度收益
  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 14px -apple-system, sans-serif';
  ctx.fillText(`💰 资产: ¥${gameState.capital.toLocaleString()}`, headerX + 12, headerY + 58);

  ctx.textAlign = 'right';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px -apple-system, sans-serif';
  ctx.fillText(`年薪分红: +¥${getYearlyIncome().toLocaleString()}`, headerX + headerW - 12, headerY + 60);

  // 2. 原生三栏导航切换 (Tab Bar)
  const tabY = headerY + headerH + 10;
  const tabH = 34;
  const tabW = (screenWidth - 24) / 3;

  const tabs = [
    { id: 'chronicle', title: '📜 生平长卷' },
    { id: 'ladder', title: '🏆 职业天梯' },
    { id: 'profile', title: '📊 核心属性' }
  ];

  tabs.forEach((tb, i) => {
    const tx = 12 + i * tabW;
    const isActive = gameState.activeTab === tb.id;

    ctx.fillStyle = isActive ? '#1e293b' : '#0f1424';
    ctx.strokeStyle = isActive ? '#3b82f6' : '#1e263d';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, tx, tabY, tabW - 4, tabH, 8);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = isActive ? '#f8fafc' : '#64748b';
    ctx.font = isActive ? 'bold 12px -apple-system, sans-serif' : '11px -apple-system, sans-serif';
    ctx.fillText(tb.title, tx + (tabW - 4) / 2, tabY + 10);
  });

  // 3. 内容展示区 (根据 Tab 切换)
  const contentY = tabY + tabH + 10;
  const contentH = screenHeight - safeBottom - 72 - contentY;

  if (gameState.activeTab === 'chronicle') {
    renderChronicleTab(contentY, contentH);
  } else if (gameState.activeTab === 'ladder') {
    renderLadderTab(contentY, contentH);
  } else if (gameState.activeTab === 'profile') {
    renderProfileTab(contentY, contentH);
  }

  // 4. 底部主操作区 (Primary Mini-Game Action Deck)
  const deckH = 56;
  const deckY = screenHeight - safeBottom - deckH;
  const gapBtn = 10;
  const autoW = 88;
  const mainW = screenWidth - 24 - autoW - gapBtn;

  // 推进大键 (高光质感)
  ctx.fillStyle = '#ea580c';
  drawRoundedRect(ctx, 12, deckY, mainW, deckH, 14);
  ctx.fill();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px -apple-system, sans-serif';
  ctx.fillText(`⏩ 推进新一岁 (迈向 ${gameState.age + 1} 岁) ➔`, 12 + mainW / 2, deckY + 19);

  // 自动推演切换按钮
  ctx.fillStyle = gameState.isAuto ? '#059669' : '#1e293b';
  ctx.strokeStyle = gameState.isAuto ? '#10b981' : '#334155';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, 12 + mainW + gapBtn, deckY, autoW, deckH, 14);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = gameState.isAuto ? '#a7f3d0' : '#cbd5e1';
  ctx.font = 'bold 12px -apple-system, sans-serif';
  ctx.fillText(gameState.isAuto ? '⏸️ 暂停' : '▶️ 自动', 12 + mainW + gapBtn + autoW / 2, deckY + 21);

  ctx.restore();
}

// 子面板 1: 生平长卷流 (支持原生惯性触控滚动)
function renderChronicleTab(contentY, contentH) {
  ctx.save();

  // 视口剪裁，防止滑出
  ctx.beginPath();
  ctx.rect(12, contentY, screenWidth - 24, contentH);
  ctx.clip();

  const itemH = 52;
  const gap = 8;
  const totalH = gameState.chronicle.length * (itemH + gap);
  scrollState.maxScroll = Math.max(0, totalH - contentH);

  if (gameState.chronicle.length === 0) {
    ctx.textAlign = 'center';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px -apple-system, sans-serif';
    ctx.fillText('点击下方【推进新一岁】，开启你的奋斗岁月...', screenWidth / 2, contentY + 40);
  } else {
    gameState.chronicle.forEach((it, i) => {
      const y = contentY + scrollState.offsetY + i * (itemH + gap);
      // 视口外剔除优化
      if (y + itemH < contentY || y > contentY + contentH) return;

      const isLatest = (i === 0);
      ctx.fillStyle = isLatest ? '#17203d' : '#111526';
      ctx.strokeStyle = isLatest ? '#3b82f6' : '#1f2740';
      ctx.lineWidth = isLatest ? 1.5 : 1;
      drawRoundedRect(ctx, 12, y, screenWidth - 24, itemH, 8);
      ctx.fill();
      ctx.stroke();

      // 年份标签
      ctx.textAlign = 'left';
      ctx.fillStyle = it.color || '#38bdf8';
      ctx.font = 'bold 10px -apple-system, sans-serif';
      ctx.fillText(`[${it.year}年 · ${it.age}岁] ${it.tag}`, 20, y + 8);

      // 事件正文
      ctx.fillStyle = isLatest ? '#f8fafc' : '#94a3b8';
      ctx.font = '11px -apple-system, sans-serif';
      const lineText = fitText(it.text, screenWidth - 48, '11px -apple-system, sans-serif');
      ctx.fillText(lineText, 20, y + 28);
    });
  }

  ctx.restore();
}

// 子面板 2: 职业天梯路线图 (Ladder Roadmap)
function renderLadderTab(contentY, contentH) {
  ctx.save();
  const lad = gameState.track.ladder;
  const rowH = (contentH - 20) / lad.length;

  lad.forEach((step, i) => {
    const y = contentY + i * rowH;
    const isUnlocked = gameState.age >= step.age;
    const isCurrent = getCurrentRank() === step;

    ctx.fillStyle = isCurrent ? '#1e293b' : (isUnlocked ? '#11172a' : '#0d101d');
    ctx.strokeStyle = isCurrent ? '#f59e0b' : (isUnlocked ? '#3b82f6' : '#1e2538');
    ctx.lineWidth = isCurrent ? 1.5 : 1;
    drawRoundedRect(ctx, 14, y + 2, screenWidth - 28, rowH - 6, 8);
    ctx.fill();
    ctx.stroke();

    // 阶段指示器
    ctx.textAlign = 'left';
    ctx.fillStyle = isCurrent ? '#fbbf24' : (isUnlocked ? '#38bdf8' : '#475569');
    ctx.font = 'bold 12px -apple-system, sans-serif';
    ctx.fillText(`第 ${i + 1} 阶 · ${step.age}岁起`, 24, y + 10);

    ctx.fillStyle = isCurrent ? '#ffffff' : (isUnlocked ? '#cbd5e1' : '#64748b');
    ctx.font = 'bold 13px -apple-system, sans-serif';
    ctx.fillText(step.rank, 110, y + 10);

    ctx.textAlign = 'right';
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px -apple-system, sans-serif';
    ctx.fillText(`¥${step.salary.toLocaleString()}/年`, screenWidth - 24, y + 11);

    ctx.textAlign = 'left';
    ctx.fillStyle = isUnlocked ? '#94a3b8' : '#475569';
    ctx.font = '10px -apple-system, sans-serif';
    const jobStr = fitText(step.job, screenWidth - 50, '10px -apple-system, sans-serif');
    ctx.fillText(jobStr, 24, y + 26);
  });

  ctx.restore();
}

// 子面板 3: 核心四维属性雷达与身家 (Profile & Stats)
function renderProfileTab(contentY, contentH) {
  ctx.save();

  const attrs = [
    { label: '🧠 智商心智 (IQ)', val: gameState.iq, max: 100, color: '#38bdf8' },
    { label: '🤝 情商人脉 (EQ)', val: gameState.eq, max: 100, color: '#ec4899' },
    { label: '🦁 决断魄力 (Courage)', val: gameState.courage, max: 100, color: '#f59e0b' },
    { label: '🛡️ 廉洁操守 (Integrity)', val: gameState.clean, max: 100, color: '#10b981' },
    { label: '⭐ 行业声望 (Reputation)', val: gameState.rep, max: 100, color: '#8b5cf6' },
    { label: '❤️ 生理体魄 (Health)', val: gameState.health, max: 100, color: '#ef4444' }
  ];

  const barH = (contentH - 40) / attrs.length;

  attrs.forEach((a, idx) => {
    const y = contentY + 10 + idx * barH;

    ctx.textAlign = 'left';
    ctx.fillStyle = '#cbd5e1';
    ctx.font = 'bold 11px -apple-system, sans-serif';
    ctx.fillText(a.label, 20, y);

    ctx.textAlign = 'right';
    ctx.fillStyle = a.color;
    ctx.font = 'bold 12px -apple-system, sans-serif';
    ctx.fillText(`${a.val} / ${a.max}`, screenWidth - 20, y);

    // 进度槽背景
    const slotW = screenWidth - 40;
    const slotH = 8;
    const slotY = y + 18;

    ctx.fillStyle = '#182035';
    drawRoundedRect(ctx, 20, slotY, slotW, slotH, 4);
    ctx.fill();

    // 进度条填充
    const fillW = Math.max(8, (a.val / a.max) * slotW);
    ctx.fillStyle = a.color;
    drawRoundedRect(ctx, 20, slotY, fillW, slotH, 4);
    ctx.fill();
  });

  ctx.restore();
}

// C. 时代风云抉择弹窗
function renderDecisionModal() {
  ctx.save();

  // 磨砂暗色遮罩
  ctx.fillStyle = 'rgba(5, 7, 15, 0.86)';
  ctx.fillRect(0, 0, screenWidth, screenHeight);

  const ev = gameState.activeEvent;
  if (!ev) {
    ctx.restore();
    return;
  }

  const modalW = screenWidth - 36;
  const modalH = 260;
  const mx = 18;
  const my = (screenHeight - modalH) / 2;

  ctx.fillStyle = '#151b32';
  ctx.strokeStyle = '#3b82f6';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, mx, my, modalW, modalH, 16);
  ctx.fill();
  ctx.stroke();

  // 弹窗标题
  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 16px -apple-system, sans-serif';
  ctx.fillText(`⚡ 时代抉择 · ${gameState.year}年`, screenWidth / 2, my + 18);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 13px -apple-system, sans-serif';
  ctx.fillText(ev.title, screenWidth / 2, my + 44);

  // 描述换行排版
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '11px -apple-system, sans-serif';
  const descLines = wrapTextLines(ev.desc, modalW - 36, '11px -apple-system, sans-serif');
  descLines.forEach((l, idx) => {
    ctx.fillText(l, screenWidth / 2, my + 72 + idx * 18);
  });

  // 两个选项按钮
  const btnH = 44;
  const b1Y = my + 140;
  const b2Y = my + 196;

  [b1Y, b2Y].forEach((by, idx) => {
    const c = ev.choices[idx];
    if (!c) return;

    ctx.fillStyle = '#1e293b';
    ctx.strokeStyle = '#60a5fa';
    ctx.lineWidth = 1;
    drawRoundedRect(ctx, mx + 16, by, modalW - 32, btnH, 10);
    ctx.fill();
    ctx.stroke();

    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px -apple-system, sans-serif';
    const cText = fitText(c.text, modalW - 48, 'bold 12px -apple-system, sans-serif');
    ctx.fillText(cText, screenWidth / 2, by + 15);
  });

  ctx.restore();
}

// D. 功成身退终局面板
function renderEndgame() {
  ctx.save();

  ctx.textAlign = 'center';
  ctx.fillStyle = '#fbbf24';
  ctx.font = 'bold 22px -apple-system, sans-serif';
  ctx.fillText('🏆 一代宗师 · 功成身退', screenWidth / 2, safeTop + 16);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px -apple-system, sans-serif';
  ctx.fillText(`${gameState.name} · 六旬荣休 · 享誉天下`, screenWidth / 2, safeTop + 46);

  const cardY = safeTop + 76;
  const cardH = 176;
  ctx.fillStyle = '#151a32';
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 1;
  drawRoundedRect(ctx, 18, cardY, screenWidth - 36, cardH, 14);
  ctx.fill();
  ctx.stroke();

  const curRank = getCurrentRank();
  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 14px -apple-system, sans-serif';
  ctx.fillText(`终生最高成就: ${curRank.rank}`, screenWidth / 2, cardY + 22);

  ctx.fillStyle = '#10b981';
  ctx.font = 'bold 15px -apple-system, sans-serif';
  ctx.fillText(`终身总资产累计: ¥${gameState.capital.toLocaleString()}`, screenWidth / 2, cardY + 54);

  ctx.fillStyle = '#cbd5e1';
  ctx.font = '12px -apple-system, sans-serif';
  ctx.fillText(`智商 ${gameState.iq} | 情商 ${gameState.eq} | 操守 ${gameState.clean} | 声望 ${gameState.rep}`, screenWidth / 2, cardY + 86);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '11px -apple-system, sans-serif';
  ctx.fillText('择一事终一生，三十载砥砺奋斗，无愧时代！', screenWidth / 2, cardY + 124);

  // 重新启航按钮
  const rY = cardY + cardH + 24;
  const rH = 50;
  ctx.fillStyle = '#ea580c';
  drawRoundedRect(ctx, 30, rY, screenWidth - 60, rH, 14);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 15px -apple-system, sans-serif';
  ctx.fillText('🌱 开启全新人生 · 再次启航', screenWidth / 2, rY + 17);

  renderComplianceFooter(screenHeight - safeBottom - 45);

  ctx.restore();
}

// 法定合规提示
function renderComplianceFooter(y) {
  ctx.save();
  ctx.textAlign = 'center';
  ctx.fillStyle = '#475569';
  ctx.font = '9px -apple-system, sans-serif';
  ctx.fillText('抵制不良游戏，拒绝盗版游戏。注意自我保护，谨防受骗上当。', screenWidth / 2, y);
  ctx.fillText('适度游戏益脑，沉迷游戏伤身。合理安排时间，享受健康生活。', screenWidth / 2, y + 14);
  ctx.fillText('本游戏适用于年满 12 周岁及以上用户 · CADPA 适龄提示 12+', screenWidth / 2, y + 28);
  ctx.restore();
}

// 12. 统一全屏触控与手势系统
wx.onTouchStart((e) => {
  const touch = e.touches[0];
  if (!touch) return;
  const tx = touch.clientX;
  const ty = touch.clientY;

  // 记录滑动起始
  scrollState.isDragging = true;
  scrollState.startY = ty;
  scrollState.velocityY = 0;

  // 1. 赛道选择
  if (gameState.phase === 'select_track') {
    const padX = 14;
    const gap = 10;
    const cardW = (screenWidth - padX * 2 - gap) / 2;
    const cardH = 94;
    const startY = safeTop + 58;

    TRACKS.forEach((tr, i) => {
      const col = i % 2;
      const row = Math.floor(i / 2);
      const x = padX + col * (cardW + gap);
      const y = startY + row * (cardH + gap);

      if (tx >= x && tx <= x + cardW && ty >= y && ty <= y + cardH) {
        playSound('click');
        playHaptic('medium');
        gameState.track = tr;
        gameState.name = tr.name;
        gameState.age = tr.startAge;
        gameState.year = tr.startYear;
        gameState.rankIdx = 0;
        gameState.capital = tr.ladder[0].salary;
        gameState.phase = 'playing';
        showToast(`🎉 选定【${tr.title}】！开始你的风云人生！`);
      }
    });
    return;
  }

  // 2. 正在游戏中
  if (gameState.phase === 'playing') {
    // A. 顶部 Tab 点击切换
    const tabY = safeTop + 96 + 10;
    const tabH = 34;
    const tabW = (screenWidth - 24) / 3;

    if (ty >= tabY && ty <= tabY + tabH) {
      if (tx >= 12 && tx < 12 + tabW) {
        gameState.activeTab = 'chronicle';
        playSound('click');
        playHaptic('light');
        return;
      } else if (tx >= 12 + tabW && tx < 12 + tabW * 2) {
        gameState.activeTab = 'ladder';
        playSound('click');
        playHaptic('light');
        return;
      } else if (tx >= 12 + tabW * 2 && tx <= screenWidth - 12) {
        gameState.activeTab = 'profile';
        playSound('click');
        playHaptic('light');
        return;
      }
    }

    // B. 底部操作区
    const deckH = 56;
    const deckY = screenHeight - safeBottom - deckH;
    const gapBtn = 10;
    const autoW = 88;
    const mainW = screenWidth - 24 - autoW - gapBtn;

    // 点击【推进新一岁】
    if (tx >= 12 && tx <= 12 + mainW && ty >= deckY && ty <= deckY + deckH) {
      tickYear();
      return;
    }

    // 点击【自动 / 暂停】
    const autoX = 12 + mainW + gapBtn;
    if (tx >= autoX && tx <= autoX + autoW && ty >= deckY && ty <= deckY + deckH) {
      gameState.isAuto = !gameState.isAuto;
      playSound('click');
      playHaptic('light');
      if (gameState.isAuto) {
        gameState.autoTimer = setInterval(() => {
          if (gameState.phase === 'playing' && gameState.isAuto) {
            tickYear();
          }
        }, 1200);
      } else {
        if (gameState.autoTimer) clearInterval(gameState.autoTimer);
      }
      return;
    }
  }

  // 3. 抉择时刻弹窗
  if (gameState.phase === 'decision') {
    const modalW = screenWidth - 36;
    const modalH = 260;
    const mx = 18;
    const my = (screenHeight - modalH) / 2;
    const btnH = 44;
    const b1Y = my + 140;
    const b2Y = my + 196;

    if (tx >= mx + 16 && tx <= mx + modalW - 16) {
      if (ty >= b1Y && ty <= b1Y + btnH) {
        resolveDecision(0);
        return;
      }
      if (ty >= b2Y && ty <= b2Y + btnH) {
        resolveDecision(1);
        return;
      }
    }
  }

  // 4. 终局重开
  if (gameState.phase === 'endgame') {
    const cardY = safeTop + 76;
    const cardH = 176;
    const rY = cardY + cardH + 24;
    const rH = 50;

    if (tx >= 30 && tx <= screenWidth - 30 && ty >= rY && ty <= rY + rH) {
      playSound('click');
      playHaptic('medium');
      gameState.phase = 'select_track';
      gameState.chronicle = [];
      gameState.activeEvent = null;
      scrollState.offsetY = 0;
      return;
    }
  }
});

// 手势滑动监听 (触摸拖拽与惯性)
wx.onTouchMove((e) => {
  if (!scrollState.isDragging || gameState.phase !== 'playing' || gameState.activeTab !== 'chronicle') return;
  const touch = e.touches[0];
  if (!touch) return;

  const dy = touch.clientY - scrollState.startY;
  scrollState.startY = touch.clientY;
  scrollState.offsetY += dy;
  scrollState.velocityY = dy;

  // 阻尼回弹计算
  if (scrollState.offsetY > 40) {
    scrollState.offsetY = 40;
  } else if (scrollState.offsetY < -scrollState.maxScroll - 40) {
    scrollState.offsetY = -scrollState.maxScroll - 40;
  }
});

wx.onTouchEnd(() => {
  scrollState.isDragging = false;
});

// 13. 启动 60FPS 原生渲染主循环
tick();
console.log('《浮生万象》微信小游戏 60FPS 原生引擎启动成功！');
