/**
 * characterVisualsEngine.js
 * 《华夏世家》程序化古风人物立绘头像、对话气泡与对决交锋视觉引擎
 * 彻底消除“纯文字电子书”感，赋予角色鲜活动态神态、主线对白气泡与战场交锋微交互
 */

// 预定义人物角色大类与视觉配色
const ROLE_VISUAL_CONFIG = {
  military: {
    name: '武将/部曲',
    themeColor: '#ef4444',
    bgGradient: ['#450a0a', '#7f1d1d'],
    borderColor: '#f87171',
    symbol: '⚔️',
    armorColor: '#374151',
    collarColor: '#991b1b',
    headwear: 'helmet' // 铁盔铁胄
  },
  scholar: {
    name: '文臣/名士',
    themeColor: '#60a5fa',
    bgGradient: ['#0f172a', '#1e3a8a'],
    borderColor: '#93c5fd',
    symbol: '📜',
    armorColor: '#1e293b',
    collarColor: '#1d4ed8',
    headwear: 'cap' // 进贤冠
  },
  elder: {
    name: '宗老/家主',
    themeColor: '#f59e0b',
    bgGradient: ['#291a03', '#78350f'],
    borderColor: '#fbbf24',
    symbol: '🏛️',
    armorColor: '#3f2208',
    collarColor: '#b45309',
    headwear: 'elder_cap' // 华冠
  },
  merchant: {
    name: '巨贾/行商',
    themeColor: '#34d399',
    bgGradient: ['#062818', '#065f46'],
    borderColor: '#6ee7b7',
    symbol: '🪙',
    armorColor: '#143825',
    collarColor: '#047857',
    headwear: 'merchant_cap' // 丝帕
  },
  rebel: {
    name: '敌酋/黄巾',
    themeColor: '#eab308',
    bgGradient: ['#2e1f02', '#713f12'],
    borderColor: '#facc15',
    symbol: '🔥',
    armorColor: '#3c2415',
    collarColor: '#ca8a04',
    headwear: 'headband' // 黄巾头带
  },
  emperor: {
    name: '天子/使节',
    themeColor: '#c084fc',
    bgGradient: ['#27073b', '#581c87'],
    borderColor: '#d8b4fe',
    symbol: '👑',
    armorColor: '#3b0764',
    collarColor: '#7e22ce',
    headwear: 'crown' // 冕旒
  }
};

/**
 * 根据卡牌发言人推断角色类型
 */
function inferRoleFromSpeaker(speaker = '', avatar = '') {
  if (speaker.includes('将') || speaker.includes('骑') || speaker.includes('部曲') || speaker.includes('兵') || avatar.includes('⚔️') || avatar.includes('🐎')) {
    return 'military';
  }
  if (speaker.includes('相') || speaker.includes('帝') || speaker.includes('使') || speaker.includes('太守') || avatar.includes('👑')) {
    return 'emperor';
  }
  if (speaker.includes('贼') || speaker.includes('巾') || speaker.includes('寇') || speaker.includes('逆') || avatar.includes('🔥') || avatar.includes('👺')) {
    return 'rebel';
  }
  if (speaker.includes('贾') || speaker.includes('商') || speaker.includes('市') || speaker.includes('仓') || avatar.includes('💰') || avatar.includes('🪙')) {
    return 'merchant';
  }
  if (speaker.includes('老') || speaker.includes('伯') || speaker.includes('叔') || speaker.includes('祖') || speaker.includes('宗') || avatar.includes('👴')) {
    return 'elder';
  }
  return 'scholar';
}

/**
 * 绘制高质感圆形古风立绘半身像徽记
 */
/**
 * 绘制高质感国风工笔人物微立绘半身像徽记
 */
function drawCharacterBust(ctx, cx, cy, size, opts = {}) {
  let roleKey = 'scholar';
  let realCx = cx;
  let realCy = cy;
  let realSize = size;

  if (typeof opts === 'number') {
    // 兼容 (ctx, x, y, w, h, role) 签名
    const w = size;
    const h = opts;
    const roleParam = arguments[5];
    realCx = cx + w / 2;
    realCy = cy + h / 2;
    realSize = Math.min(w, h);
    roleKey = (typeof roleParam === 'string') ? roleParam : (roleParam && roleParam.role ? roleParam.role : 'scholar');
  } else {
    roleKey = opts.role || inferRoleFromSpeaker(opts.speaker || '', opts.avatar || '');
  }

  const cfg = ROLE_VISUAL_CONFIG[roleKey] || ROLE_VISUAL_CONFIG.scholar;
  cx = realCx;
  cy = realCy;
  size = realSize;
  const radius = Math.floor(size / 2);

  ctx.save();

  // 1. 底座光晕与双层玉璧同心圆框
  ctx.save();
  ctx.shadowColor = cfg.borderColor;
  ctx.shadowBlur = 8;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 1, 0, Math.PI * 2);
  ctx.fillStyle = '#0a0508';
  ctx.fill();
  ctx.restore();

  // 圆形裁切保护区
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 3, 0, Math.PI * 2);
  if (typeof ctx.clip === 'function') ctx.clip();

  // 背景水墨晕染渐变 (Ink-wash Backdrop Gradient)
  const bgGrad = ctx.createRadialGradient(cx, cy - radius * 0.2, radius * 0.1, cx, cy, radius);
  bgGrad.addColorStop(0, cfg.bgGradient[1]);
  bgGrad.addColorStop(0.7, cfg.bgGradient[0]);
  bgGrad.addColorStop(1, '#080306');
  ctx.fillStyle = bgGrad;
  ctx.fill();

  // 背后祥云气韵暗纹
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.12)';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy - radius * 0.15, radius * 0.65, 0, Math.PI * 2);
  ctx.stroke();

  // 2. 绘制汉魏宽袍大袖与甲胄服饰 (Traditional Robes & Lamellar Armor)
  const shoulderW = radius * 1.55;
  const shoulderY = cy + radius * 0.42;

  // 内衬白绢交领 (White Silk Inner Collar)
  ctx.fillStyle = '#f8fafc';
  ctx.beginPath();
  if (typeof ctx.ellipse === 'function') {
    ctx.ellipse(cx, shoulderY + radius * 0.25, shoulderW * 0.75, radius * 0.55, 0, 0, Math.PI * 2);
  } else {
    ctx.arc(cx, shoulderY + radius * 0.25, (shoulderW * 0.75 + radius * 0.55) / 2, 0, Math.PI * 2);
  }
  ctx.fill();

  // 外袍 / 甲胄身躯
  ctx.fillStyle = cfg.armorColor;
  ctx.beginPath();
  if (typeof ctx.ellipse === 'function') {
    ctx.ellipse(cx, shoulderY + radius * 0.35, shoulderW, radius * 0.7, 0, 0, Math.PI * 2);
  } else {
    ctx.arc(cx, shoulderY + radius * 0.35, (shoulderW + radius * 0.7) / 2, 0, Math.PI * 2);
  }
  ctx.fill();

  // 汉服右衽交领饰边 (Overlapping Neckline Trim)
  ctx.strokeStyle = cfg.collarColor;
  ctx.lineWidth = Math.max(2.5, size * 0.055);
  ctx.beginPath();
  ctx.moveTo(cx - radius * 0.35, shoulderY + radius * 0.65);
  ctx.lineTo(cx, shoulderY + radius * 0.12);
  ctx.lineTo(cx + radius * 0.4, shoulderY + radius * 0.65);
  ctx.stroke();

  // 金线织锦扣 / 护心明镜 (Breastplate Mirror or Gilded Clasp)
  ctx.fillStyle = '#fbbf24';
  ctx.beginPath();
  ctx.arc(cx, shoulderY + radius * 0.32, Math.max(2, size * 0.04), 0, Math.PI * 2);
  ctx.fill();

  // 3. 头部轮廓与自然肤色 (Face & Neck)
  const headR = radius * 0.44;
  const headY = cy - radius * 0.1;

  // 脖颈
  ctx.fillStyle = '#f5d0b5';
  ctx.fillRect(cx - headR * 0.32, headY + headR * 0.5, headR * 0.64, headR * 0.6);

  // 面部下颌轮廓
  ctx.fillStyle = '#fed7aa';
  ctx.beginPath();
  ctx.arc(cx, headY, headR, 0, Math.PI * 2);
  ctx.fill();

  // 侧脸与下颌轻微阴影修容
  ctx.fillStyle = 'rgba(217, 119, 6, 0.12)';
  ctx.beginPath();
  ctx.arc(cx, headY + headR * 0.1, headR * 0.95, 0, Math.PI);
  ctx.fill();

  // 4. 发式与冠弁头饰 (Han Dynasty Classical Headdress)
  if (cfg.headwear === 'helmet') {
    // 【武将】玄铁虎盔 + 兽面金顶 + 飘逸红缨
    ctx.fillStyle = '#334155';
    ctx.beginPath();
    ctx.arc(cx, headY - headR * 0.22, headR * 1.08, Math.PI, 0);
    ctx.fill();
    // 护耳
    ctx.fillRect(cx - headR * 1.05, headY - headR * 0.2, headR * 0.24, headR * 0.7);
    ctx.fillRect(cx + headR * 0.81, headY - headR * 0.2, headR * 0.24, headR * 0.7);
    // 鎏金护额
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, headY - headR * 0.15, headR * 1.05, Math.PI * 0.9, Math.PI * 0.1, true);
    ctx.stroke();
    // 飘逸朱雀红缨
    ctx.fillStyle = '#dc2626';
    ctx.beginPath();
    ctx.moveTo(cx, headY - headR * 1.35);
    ctx.bezierCurveTo(cx - 8, headY - headR * 0.9, cx - 4, headY - headR * 0.6, cx, headY - headR * 0.5);
    ctx.bezierCurveTo(cx + 4, headY - headR * 0.6, cx + 8, headY - headR * 0.9, cx, headY - headR * 1.35);
    ctx.fill();
  } else if (cfg.headwear === 'crown') {
    // 【天子】通天冠 / 冕旒
    ctx.fillStyle = '#1e1b18';
    ctx.fillRect(cx - headR * 1.1, headY - headR * 0.85, headR * 2.2, headR * 0.35);
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(cx - headR * 1.25, headY - headR * 0.95, headR * 2.5, headR * 0.18);
    // 珠旒
    ctx.fillStyle = '#fef08a';
    for (let di = -3; di <= 3; di++) {
      ctx.fillRect(cx + di * (headR * 0.3), headY - headR * 0.75, 1.8, headR * 0.4);
    }
  } else if (cfg.headwear === 'headband') {
    // 【黄巾/义军】苍天黄巾战布
    ctx.fillStyle = '#eab308';
    ctx.fillRect(cx - headR * 1.05, headY - headR * 0.65, headR * 2.1, headR * 0.5);
    ctx.fillStyle = '#ca8a04';
    ctx.fillRect(cx - headR * 0.9, headY - headR * 0.55, headR * 1.8, 2);
    // 垂带飘逸
    ctx.beginPath();
    ctx.moveTo(cx + headR * 0.9, headY - headR * 0.3);
    ctx.lineTo(cx + headR * 1.25, headY + headR * 0.4);
    ctx.lineTo(cx + headR * 1.05, headY + headR * 0.45);
    ctx.closePath();
    ctx.fill();
  } else if (cfg.headwear === 'elder_cap') {
    // 【宗老】白发华冠 + 束发玉簪
    ctx.fillStyle = '#e2e8f0';
    ctx.beginPath();
    ctx.arc(cx, headY - headR * 0.15, headR * 1.02, Math.PI, 0);
    ctx.fill();
    ctx.fillStyle = '#78350f';
    ctx.fillRect(cx - headR * 0.45, headY - headR * 0.9, headR * 0.9, headR * 0.5);
    // 碧玉簪横贯
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(cx - headR * 0.7, headY - headR * 0.65);
    ctx.lineTo(cx + headR * 0.7, headY - headR * 0.65);
    ctx.stroke();
  } else {
    // 【文臣名士】进贤二梁冠 (Jin-xian Scholar Cap)
    ctx.fillStyle = '#0f172a';
    ctx.beginPath();
    ctx.arc(cx, headY - headR * 0.18, headR * 0.98, Math.PI, 0);
    ctx.fill();
    // 冠顶前低后高梁柱
    ctx.fillStyle = '#1e293b';
    ctx.fillRect(cx - headR * 0.55, headY - headR * 0.85, headR * 1.1, headR * 0.5);
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(cx - headR * 0.55, headY - headR * 0.85, headR * 1.1, headR * 0.5);
    // 冠梁金线
    ctx.beginPath();
    ctx.moveTo(cx - headR * 0.15, headY - headR * 0.85);
    ctx.lineTo(cx - headR * 0.15, headY - headR * 0.35);
    ctx.moveTo(cx + headR * 0.15, headY - headR * 0.85);
    ctx.lineTo(cx + headR * 0.15, headY - headR * 0.35);
    ctx.stroke();
  }

  // 5. 生动眼眉神态与五官 (Expressive Eyes & Eyebrows)
  const isAlarmed = (opts.mood === 'alarm');
  ctx.strokeStyle = '#0f172a';
  ctx.lineWidth = 1.5;

  // 剑眉 / 轩眉
  ctx.beginPath();
  if (roleKey === 'military' || isAlarmed) {
    // 斜飞入鬓剑眉
    ctx.moveTo(cx - headR * 0.45, headY - headR * 0.22 + (isAlarmed ? 2 : 0));
    ctx.lineTo(cx - headR * 0.12, headY - headR * 0.28);
    ctx.moveTo(cx + headR * 0.12, headY - headR * 0.28);
    ctx.lineTo(cx + headR * 0.45, headY - headR * 0.22 + (isAlarmed ? 2 : 0));
  } else {
    // 温润儒士平眉
    ctx.moveTo(cx - headR * 0.45, headY - headR * 0.25);
    ctx.lineTo(cx - headR * 0.12, headY - headR * 0.25);
    ctx.moveTo(cx + headR * 0.12, headY - headR * 0.25);
    ctx.lineTo(cx + headR * 0.45, headY - headR * 0.25);
  }
  ctx.stroke();

  // 丹凤眼眼型 (Almond Eyes with Sclera & Iris)
  const eyeY = headY - headR * 0.08;
  const eyeW = headR * 0.28;
  const eyeH = headR * 0.16;

  // 左眼眼白与瞳仁
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx - headR * 0.28, eyeY, eyeW * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx - headR * 0.28, eyeY, eyeW * 0.32, 0, Math.PI * 2);
  ctx.fill();
  // 瞳孔高光点
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx - headR * 0.26, eyeY - 1.5, 1.2, 1.2);

  // 右眼眼白与瞳仁
  ctx.fillStyle = '#ffffff';
  ctx.beginPath();
  ctx.arc(cx + headR * 0.28, eyeY, eyeW * 0.6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#0f172a';
  ctx.beginPath();
  ctx.arc(cx + headR * 0.28, eyeY, eyeW * 0.32, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(cx + headR * 0.3, eyeY - 1.5, 1.2, 1.2);

  // 鼻梁与下颌微弧
  ctx.strokeStyle = '#ea580c';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx, headY + headR * 0.02);
  ctx.lineTo(cx - 1, headY + headR * 0.22);
  ctx.lineTo(cx + 2, headY + headR * 0.24);
  ctx.stroke();

  // 6. 美髯须发 (Dignified Classical Beard)
  if (roleKey === 'elder' || roleKey === 'emperor' || roleKey === 'military') {
    ctx.fillStyle = roleKey === 'elder' ? '#f1f5f9' : '#1e293b';
    ctx.beginPath();
    ctx.moveTo(cx - headR * 0.28, headY + headR * 0.38);
    ctx.lineTo(cx, headY + headR * 0.95);
    ctx.lineTo(cx + headR * 0.28, headY + headR * 0.38);
    ctx.closePath();
    ctx.fill();

    // 唇上微髭
    ctx.beginPath();
    ctx.moveTo(cx - headR * 0.3, headY + headR * 0.32);
    if (typeof ctx.quadraticCurveTo === 'function') {
      ctx.quadraticCurveTo(cx, headY + headR * 0.26, cx + headR * 0.3, headY + headR * 0.32);
    } else {
      ctx.lineTo(cx + headR * 0.3, headY + headR * 0.32);
    }
    ctx.stroke();
  } else {
    // 青年名士朱唇微启
    ctx.strokeStyle = '#c2410c';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.moveTo(cx - headR * 0.16, headY + headR * 0.4);
    ctx.lineTo(cx + headR * 0.16, headY + headR * 0.4);
    ctx.stroke();
  }

  ctx.restore(); // 结束裁切

  // 7. 外围双层鎏金回纹饰边与图腾印鉴 (Heraldic Metallic Rim)
  ctx.strokeStyle = cfg.borderColor;
  ctx.lineWidth = Math.max(2, size * 0.045);
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 2, 0, Math.PI * 2);
  ctx.stroke();

  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(cx, cy, radius - 4, 0, Math.PI * 2);
  ctx.stroke();

  // 右下方角色图腾角标徽章 (Corner Role Medallion)
  const badgeR = Math.max(10, Math.floor(size * 0.22));
  const bx = cx + radius * 0.65;
  const by = cy + radius * 0.65;

  ctx.save();
  ctx.shadowColor = '#000000';
  ctx.shadowBlur = 6;
  ctx.fillStyle = '#1c1015';
  ctx.beginPath();
  ctx.arc(bx, by, badgeR, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.font = `${Math.floor(badgeR * 1.15)}px sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(cfg.symbol, bx, by);

  ctx.restore();
}

/**
 * 绘制漫画/剧场式主线对白气泡框 (Comic Dialogue Balloon)
 */
function drawSpeechBalloon(ctx, boxX, boxY, boxW, boxH, text, tailX, tailY, opts = {}) {
  const radius = opts.radius || 6;
  const bg = opts.bg || 'rgba(30, 20, 26, 0.96)';
  const border = opts.borderColor || '#92400e';
  const textColor = opts.textColor || '#fef08a';
  const font = opts.font || '13.5px sans-serif';

  ctx.save();

  // 1. 气泡主体
  ctx.fillStyle = bg;
  ctx.strokeStyle = border;
  ctx.lineWidth = 1.5;

  ctx.beginPath();
  const quad = (cpx, cpy, x, y) => {
    if (typeof ctx.quadraticCurveTo === 'function') ctx.quadraticCurveTo(cpx, cpy, x, y);
    else ctx.lineTo(x, y);
  };
  // 绘制圆角矩形
  ctx.moveTo(boxX + radius, boxY);
  ctx.lineTo(boxX + boxW - radius, boxY);
  quad(boxX + boxW, boxY, boxX + boxW, boxY + radius);
  ctx.lineTo(boxX + boxW, boxY + boxH - radius);
  quad(boxX + boxW, boxY + boxH, boxX + boxW - radius, boxY + boxH);

  // 指向说话人的小尖角 (Tail pointing to speaker)
  const anchorY = boxY + Math.min(boxH * 0.45, 24);
  ctx.lineTo(boxX + radius, boxY + boxH);
  quad(boxX, boxY + boxH, boxX, boxY + boxH - radius);

  // 左侧或上方指向角
  if (tailX < boxX) {
    ctx.lineTo(boxX, anchorY + 8);
    ctx.lineTo(tailX + 4, tailY);
    ctx.lineTo(boxX, anchorY - 6);
  }

  ctx.lineTo(boxX, boxY + radius);
  quad(boxX, boxY, boxX + radius, boxY);
  ctx.closePath();

  ctx.fill();
  ctx.stroke();

  // 2. 气泡内部文字排版
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.font = font;
  ctx.fillStyle = textColor;

  const padX = 12;
  const padY = 10;
  const maxW = boxW - padX * 2;
  const quoteText = text.startsWith('“') ? text : `“${text}”`;

  // 简易折行
  const words = quoteText.split('');
  let line = '';
  let curY = boxY + padY;
  const lineH = 19;

  for (let i = 0; i < words.length; i++) {
    const testLine = line + words[i];
    const metrics = ctx.measureText(testLine);
    if (metrics.width > maxW && i > 0) {
      ctx.fillText(line, boxX + padX, curY);
      line = words[i];
      curY += lineH;
      if (curY + lineH > boxY + boxH) break; // 防溢出
    } else {
      line = testLine;
    }
  }
  if (line) {
    ctx.fillText(line, boxX + padX, curY);
  }

  ctx.restore();
}

/**
 * 绘制金色尘埃飞升粒子动效 (Golden Heritage Sparks)
 */
function drawFloatingSparks(ctx, boundsX, boundsY, boundsW, boundsH, seed = 0) {
  ctx.save();
  const sparkCount = 12;
  const now = Date.now() * 0.0015;

  for (let i = 0; i < sparkCount; i++) {
    const phase = i * 0.55 + seed;
    const px = boundsX + (Math.sin(now + phase) * 0.45 + 0.5) * boundsW;
    const py = boundsY + ((phase * 17 + now * 25) % boundsH);
    const alpha = (Math.sin(now * 3 + phase) * 0.35 + 0.45);
    const size = (i % 3 === 0) ? 2.5 : 1.8;

    ctx.fillStyle = `rgba(251, 191, 36, ${Math.max(0.1, Math.min(0.8, alpha))})`;
    ctx.beginPath();
    ctx.arc(px, boundsY + boundsH - py, size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.restore();
}

/**
 * 绘制战利品宝箱抖动爆开动效 (Animated Treasure Chest with Light Rays)
 */
function drawAnimatedChest(ctx, cx, cy, size, isOpen = false, pulse = 1.0) {
  ctx.save();
  const w = size;
  const h = size * 0.85;
  const x = cx - w / 2;
  const y = cy - h / 2;

  // 1. 背部放射金光光芒 (Radiant Rays)
  if (isOpen) {
    ctx.save();
    ctx.translate(cx, cy);
    const rayCount = 10;
    const rot = (Date.now() * 0.001) % (Math.PI * 2);
    ctx.rotate(rot);
    for (let r = 0; r < rayCount; r++) {
      ctx.rotate((Math.PI * 2) / rayCount);
      ctx.fillStyle = 'rgba(253, 224, 71, 0.18)';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(-12, -size * 1.2);
      ctx.lineTo(12, -size * 1.2);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }

  // 2. 箱体下半部 (Chest Base)
  const baseH = h * 0.55;
  const baseY = y + h - baseH;
  ctx.fillStyle = '#78350f';
  ctx.fillRect(x, baseY, w, baseH);
  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2;
  ctx.strokeRect(x, baseY, w, baseH);

  // 3. 箱盖 (Lid)
  const lidH = h * 0.45;
  ctx.save();
  if (isOpen) {
    ctx.translate(x, y + lidH);
    ctx.rotate(-0.35 * pulse); // 掀开
    ctx.translate(-x, -(y + lidH));
  }
  ctx.fillStyle = '#92400e';
  ctx.beginPath();
  if (typeof ctx.roundRect === 'function') {
    ctx.roundRect(x - 2, y, w + 4, lidH, [6, 6, 0, 0]);
  } else if (typeof ctx.rect === 'function') {
    ctx.rect(x - 2, y, w + 4, lidH);
  } else if (typeof ctx.fillRect === 'function') {
    ctx.fillRect(x - 2, y, w + 4, lidH);
  }
  ctx.fill();
  ctx.strokeStyle = '#fbbf24';
  ctx.lineWidth = 2;
  ctx.stroke();

  // 箱锁扣 (Golden Lock)
  ctx.fillStyle = '#fde047';
  ctx.fillRect(cx - 6, baseY - 4, 12, 12);
  ctx.strokeStyle = '#78350f';
  ctx.lineWidth = 1;
  ctx.strokeRect(cx - 6, baseY - 4, 12, 12);
  ctx.restore();

  ctx.restore();
}

/**
 * 绘制全屏局前宿命抽卡大牌 (Tarot-Style Destiny Gacha Card)
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {Object} card 卡牌元数据
 * @param {boolean} isFlipped 是否翻开正面
 * @param {boolean} isSelected 是否当前选中
 * @param {number} animProgress 翻转动画进程 (0~1)
 */
function drawGachaCard(ctx, x, y, w, h, card, isFlipped = true, isSelected = false, animProgress = 1.0) {
  if (!ctx || !card) return;
  ctx.save();

  const rarityColors = {
    legendary: { border: '#f59e0b', innerBorder: '#fbbf24', glow: 'rgba(245, 158, 11, 0.55)', bg: ['#3b1803', '#1c0803'], tag: '👑 绝品·天命' },
    epic: { border: '#a855f7', innerBorder: '#c084fc', glow: 'rgba(168, 85, 247, 0.45)', bg: ['#280f38', '#13041c'], tag: '📜 极品·经纬' },
    rare: { border: '#0ea5e9', innerBorder: '#38bdf8', glow: 'rgba(14, 165, 233, 0.4)', bg: ['#082438', '#03111c'], tag: '🪙 良品·豪右' },
    common: { border: '#94a3b8', innerBorder: '#cbd5e1', glow: 'rgba(148, 163, 184, 0.3)', bg: ['#1e293b', '#0f172a'], tag: '🌿 凡品·寒林' }
  };
  const rarity = rarityColors[card.quality] || rarityColors.common;

  // 1. 卡牌多层次物理光晕与阴影
  ctx.save();
  if (isSelected) {
    ctx.shadowColor = '#fde047';
    ctx.shadowBlur = 20;
  } else {
    ctx.shadowColor = rarity.glow;
    ctx.shadowBlur = 12;
  }

  // 2. 卡身底色 (Xuan-Silk Brocade Texture)
  const cardGrad = ctx.createLinearGradient(x, y, x, y + h);
  if (isFlipped) {
    cardGrad.addColorStop(0, rarity.bg[0]);
    cardGrad.addColorStop(1, rarity.bg[1]);
  } else {
    cardGrad.addColorStop(0, '#2e0a12');
    cardGrad.addColorStop(0.5, '#190308');
    cardGrad.addColorStop(1, '#0e0104');
  }
  ctx.fillStyle = cardGrad;

  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.fill();
  } else {
    ctx.fillRect(x, y, w, h);
  }
  ctx.restore();

  // 3. 饰金外框与内衬双金线
  ctx.strokeStyle = isSelected ? '#fde047' : rarity.border;
  ctx.lineWidth = isSelected ? 3 : 2;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 8);
    ctx.stroke();
  } else {
    ctx.strokeRect(x, y, w, h);
  }

  // 内衬回字金线与四角云纹
  ctx.strokeStyle = isSelected ? '#fef08a' : rarity.innerBorder;
  ctx.lineWidth = 0.8;
  ctx.strokeRect(x + 4, y + 4, w - 8, h - 8);

  // 四角云雷纹装饰 (Corner Relief Brackets)
  const cornerL = 7;
  ctx.strokeStyle = isSelected ? '#fde047' : '#d97706';
  ctx.lineWidth = 1.5;
  // 左上
  ctx.beginPath();
  ctx.moveTo(x + 7, y + 7 + cornerL);
  ctx.lineTo(x + 7, y + 7);
  ctx.lineTo(x + 7 + cornerL, y + 7);
  // 右上
  ctx.moveTo(x + w - 7 - cornerL, y + 7);
  ctx.lineTo(x + w - 7, y + 7);
  ctx.lineTo(x + w - 7, y + 7 + cornerL);
  // 左下
  ctx.moveTo(x + 7, y + h - 7 - cornerL);
  ctx.lineTo(x + 7, y + h - 7);
  ctx.lineTo(x + 7 + cornerL, y + h - 7);
  // 右下
  ctx.moveTo(x + w - 7 - cornerL, y + h - 7);
  ctx.lineTo(x + w - 7, y + h - 7);
  ctx.lineTo(x + w - 7, y + h - 7 - cornerL);
  ctx.stroke();

  // 4. 正面 / 背面内容渲染
  if (!isFlipped) {
    // ==========================================
    // 卡牌背面：龙纹古篆闭合秘印与天象金盘
    // ==========================================
    const bcx = x + w / 2;
    const bcy = y + h * 0.44;
    const dialR = Math.min(w * 0.36, 42);

    // 金盘外环
    ctx.save();
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1.8;
    ctx.beginPath();
    ctx.arc(bcx, bcy, dialR, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(251, 191, 36, 0.4)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(bcx, bcy, dialR - 4, 0, Math.PI * 2);
    ctx.stroke();

    // 放射性八方罗盘刻度
    for (let ai = 0; ai < 8; ai++) {
      const ang = (ai * Math.PI) / 4;
      const x1 = bcx + Math.cos(ang) * (dialR - 3);
      const y1 = bcy + Math.sin(ang) * (dialR - 3);
      const x2 = bcx + Math.cos(ang) * (dialR + 3);
      const y2 = bcy + Math.sin(ang) * (dialR + 3);
      ctx.beginPath();
      ctx.moveTo(x1, y1);
      ctx.lineTo(x2, y2);
      ctx.stroke();
    }

    // 核心鎏金古篆大字【天命】
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 24px serif';
    ctx.fillStyle = '#fbbf24';
    ctx.shadowColor = '#f59e0b';
    ctx.shadowBlur = 10;
    ctx.fillText('天命', bcx, bcy);
    ctx.restore();

    // 下方揭晓指引飘带
    const ribbonY = y + h - 42;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.15)';
    ctx.strokeStyle = '#d97706';
    ctx.lineWidth = 1;
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x + 10, ribbonY, w - 20, 24, 3);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(x + 10, ribbonY, w - 20, 24);
      ctx.strokeRect(x + 10, ribbonY, w - 20, 24);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 11px serif';
    ctx.fillStyle = '#fde047';
    ctx.fillText('✦ 轻触揭晓天机 ✦', bcx, ribbonY + 12);
  } else {
    // ==========================================
    // 卡牌正面：立绘头像、属性词条、神级天赋
    // ==========================================
    // 顶部品质角标
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 10.5px sans-serif';
    ctx.fillStyle = isSelected ? '#fde047' : rarity.border;
    ctx.fillText(rarity.tag, x + 8, y + 8);

    // 选中金石印鉴
    if (isSelected) {
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fde047';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText('✓ 选定', x + w - 8, y + 8);
    }

    // 身份大标题
    ctx.textAlign = 'center';
    ctx.font = 'bold 12.5px sans-serif';
    ctx.fillStyle = '#fef08a';
    const titleText = (card.title || '世家子弟').split('·')[0];
    ctx.fillText(titleText, x + w / 2, y + 23);

    // 八角铜镜立绘视窗 (Octagonal Mirror Bust Frame)
    const bustRole = card.quality === 'legendary' ? (card.id.includes('warlord') ? 'military' : (card.id.includes('sage') ? 'scholar' : 'elder'))
      : (card.badge && card.badge.includes('旁支') ? 'scholar' : 'elder');
    const bustSize = Math.min(w * 0.65, 74);
    const bustX = x + (w - bustSize) / 2;
    const bustY = y + 40;

    // 铜镜外圈八角边饰
    ctx.save();
    ctx.strokeStyle = isSelected ? '#fde047' : '#d97706';
    ctx.lineWidth = 1.2;
    ctx.strokeRect(bustX - 2, bustY - 2, bustSize + 4, bustSize + 4);
    ctx.restore();

    drawCharacterBust(ctx, bustX, bustY, bustSize, bustSize, bustRole, 1.0);

    // 初始四维数值徽标 (4 Sculpted Medallion Badges - 告别纯文本黑框)
    const m = card.meters || { prestige: 50, wealth: 50, force: 50, grain: 50 };
    const meterY = bustY + bustSize + 8;
    const pillW = Math.floor((w - 18) / 2);
    const pillH = 17;

    // 4个精美徽章
    const meterDefs = [
      { k: 'prestige', name: '声', val: m.prestige, icon: '🏛️', color: '#fde047', bg: 'rgba(120, 53, 15, 0.4)' },
      { k: 'wealth', name: '资', val: m.wealth, icon: '🪙', color: '#fef08a', bg: 'rgba(113, 63, 18, 0.4)' },
      { k: 'force', name: '武', val: m.force, icon: '⚔️', color: '#fca5a5', bg: 'rgba(127, 29, 29, 0.4)' },
      { k: 'grain', name: '粮', val: m.grain, icon: '🌾', color: '#86efac', bg: 'rgba(20, 83, 45, 0.4)' }
    ];

    meterDefs.forEach((md, mi) => {
      const col = mi % 2;
      const row = Math.floor(mi / 2);
      const px = x + 7 + col * (pillW + 4);
      const py = meterY + row * (pillH + 3);

      ctx.fillStyle = md.bg;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.12)';
      ctx.lineWidth = 0.8;
      if (typeof ctx.roundRect === 'function') {
        ctx.beginPath();
        ctx.roundRect(px, py, pillW, pillH, 2.5);
        ctx.fill();
        ctx.stroke();
      } else {
        ctx.fillRect(px, py, pillW, pillH);
        ctx.strokeRect(px, py, pillW, pillH);
      }

      ctx.textAlign = 'left';
      ctx.textBaseline = 'middle';
      ctx.font = '9px sans-serif';
      ctx.fillStyle = '#cbd5e1';
      ctx.fillText(`${md.icon} ${md.name}`, px + 3, py + pillH / 2);

      ctx.textAlign = 'right';
      ctx.font = 'bold 9.5px sans-serif';
      ctx.fillStyle = md.color;
      ctx.fillText(`${md.val}`, px + pillW - 4, py + pillH / 2);
    });

    // 特性胶囊 / 琅琊金牒神级词条
    const traitY = meterY + pillH * 2 + 8;
    const traitH = h - (traitY - y) - 8;
    ctx.fillStyle = 'rgba(245, 158, 11, 0.16)';
    ctx.strokeStyle = isSelected ? '#fde047' : rarity.border;
    ctx.lineWidth = 1;
    if (typeof ctx.roundRect === 'function') {
      ctx.beginPath();
      ctx.roundRect(x + 6, traitY, w - 12, traitH, 4);
      ctx.fill();
      ctx.stroke();
    } else {
      ctx.fillRect(x + 6, traitY, w - 12, traitH);
      ctx.strokeRect(x + 6, traitY, w - 12, traitH);
    }

    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    ctx.font = 'bold 10px sans-serif';
    ctx.fillStyle = '#fde047';
    const traitLines = card.trait ? card.trait.replace(/【|】/g, '').split(' ') : ['万流景仰'];
    ctx.fillText(`✦ ${traitLines[0]} ✦`, x + w / 2, traitY + 5);

    ctx.font = '8.5px sans-serif';
    ctx.fillStyle = '#e2e8f0';
    const subDesc = traitLines[1] || (card.desc ? card.desc.slice(0, 14) : '世家宿命');
    ctx.fillText(subDesc.slice(0, 13), x + w / 2, traitY + 19);
  }

  ctx.restore();
}

/**
 * 绘制朝廷抄没圣旨弹窗 (Imperial Confiscation Decree Modal)
 * 极具冲击力的高压损失厌恶反馈：未达标则宝箱全数抄没入内府，激起复仇与重开冲动
 */
function drawConfiscationDecreeModal(ctx, cardX, cardY, cardW, cardH, count = 1, grade = 'B') {
  if (!ctx) return;
  ctx.save();

  // 1. 圣旨卷轴底板 (血红暗金皇权质感)
  const bgGrad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardH);
  bgGrad.addColorStop(0, '#1c0a0c');
  bgGrad.addColorStop(0.5, '#2d080c');
  bgGrad.addColorStop(1, '#180406');
  ctx.fillStyle = bgGrad;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.fill();
  } else {
    ctx.fillRect(cardX, cardY, cardW, cardH);
  }

  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 2.5;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.stroke();
  } else {
    ctx.strokeRect(cardX, cardY, cardW, cardH);
  }

  // 2. 顶部圣旨标题
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = 'bold 16px serif';
  ctx.fillStyle = '#fca5a5';
  ctx.fillText('📜 廷尉圣旨 · 府库籍没 📜', cardX + cardW / 2, cardY + 16);

  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('大汉廷尉诏曰：世家门第未显，遗宝尽收内府', cardX + cardW / 2, cardY + 38);

  // 3. 铁链锁链困缚宝箱视觉 (Chained Chests)
  const chestCenterY = cardY + 120;
  drawAnimatedChest(ctx, cardX + cardW / 2, chestCenterY, 65, false, 0.9);

  // 绘制锁链 ⛓️ 叉叉
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(cardX + cardW / 2 - 35, chestCenterY - 30);
  ctx.lineTo(cardX + cardW / 2 + 35, chestCenterY + 30);
  ctx.moveTo(cardX + cardW / 2 + 35, chestCenterY - 30);
  ctx.lineTo(cardX + cardW / 2 - 35, chestCenterY + 30);
  ctx.stroke();

  // 4. 【已抄没】血红大印章 (倾斜砸下)
  ctx.save();
  ctx.translate(cardX + cardW / 2 + 25, chestCenterY + 10);
  ctx.rotate(-0.25);
  ctx.strokeStyle = '#ef4444';
  ctx.lineWidth = 3;
  ctx.strokeRect(-48, -16, 96, 32);
  ctx.fillStyle = 'rgba(239, 68, 68, 0.2)';
  ctx.fillRect(-48, -16, 96, 32);
  ctx.fillStyle = '#f87171';
  ctx.font = 'bold 15px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('【 朝廷抄没 】', 0, 0);
  ctx.restore();

  // 5. 损失厌恶警示文本
  let textY = cardY + 180;
  ctx.textAlign = 'center';
  ctx.font = 'bold 13px sans-serif';
  ctx.fillStyle = '#fca5a5';
  ctx.fillText(`本局终局评级：【${grade} 等】 (排位平盘/跌落)`, cardX + cardW / 2, textY);

  textY += 22;
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#cbd5e1';
  ctx.fillText(`局内斩获之 ${count} 件遗产宝箱未入祖庙，尽数被没收！`, cardX + cardW / 2, textY);

  textY += 18;
  ctx.fillStyle = '#facc15';
  ctx.font = 'italic 11px sans-serif';
  ctx.fillText('「唯有斩获 S / A 级显赫大捷，方可全额解封！」', cardX + cardW / 2, textY);

  ctx.restore();
}

/**
 * 绘制局内宝箱掉落狂欢弹窗 (Chest Drop Fanfare Modal)
 * 实时打断并呈现多巴胺爆箱与旋转金光，需玩家亲自点击收入囊中
 */
function drawChestDropFanfareModal(ctx, cardX, cardY, cardW, cardH, chest) {
  if (!ctx || !chest) return;
  ctx.save();

  // 1. 卡片底座
  const bgGrad = ctx.createLinearGradient(cardX, cardY, cardX, cardY + cardH);
  bgGrad.addColorStop(0, '#1c1308');
  bgGrad.addColorStop(0.5, '#2e1905');
  bgGrad.addColorStop(1, '#180e03');
  ctx.fillStyle = bgGrad;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.fill();
  } else {
    ctx.fillRect(cardX, cardY, cardW, cardH);
  }

  ctx.strokeStyle = '#f59e0b';
  ctx.lineWidth = 2.5;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(cardX, cardY, cardW, cardH, 8);
    ctx.stroke();
  } else {
    ctx.strokeRect(cardX, cardY, cardW, cardH);
  }

  // 金色飞尘
  drawFloatingSparks(ctx, cardX + 10, cardY + 10, cardW - 20, cardH - 20, 0);

  // 2. 标题
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = 'bold 16px serif';
  ctx.fillStyle = '#fef08a';
  ctx.fillText('✦ 战阵大捷 · 斩获遗产宝箱 ✦', cardX + cardW / 2, cardY + 18);

  ctx.font = '11.5px sans-serif';
  ctx.fillStyle = '#fed7aa';
  ctx.fillText('敌酋辟易 · 缴获旷世奇珍，必待终局解封！', cardX + cardW / 2, cardY + 40);

  // 3. 动态旋转宝箱
  const chestCenterY = cardY + 130;
  const pulse = 1.0 + Math.sin(Date.now() * 0.005) * 0.08;
  drawAnimatedChest(ctx, cardX + cardW / 2, chestCenterY, 75, true, pulse);

  // 4. 宝箱品阶与名称
  let textY = cardY + 195;
  ctx.textAlign = 'center';
  ctx.font = 'bold 14px sans-serif';
  ctx.fillStyle = '#fde047';
  ctx.fillText(chest.name || '【稀世遗产秘匣】', cardX + cardW / 2, textY);

  textY += 22;
  ctx.font = '11px sans-serif';
  ctx.fillStyle = '#e2e8f0';
  ctx.fillText(chest.desc || '蕴含上古秘术卡与世家底蕴，终局结算提取。', cardX + cardW / 2, textY);

  ctx.restore();
}

/**
 * 绘制卡牌层叠物理堆叠景深效果 (Card Stack Backs)
 * 模拟《小丑牌 / Balatro》与《王权 / Reigns》的实体卡牌立体堆叠感
 */
function drawCardStackBacks(ctx, x, y, w, h, isAnchor) {
  ctx.save();
  // Card 3 (最底下一张，偏移并微缩)
  const c3Scale = 0.94;
  const c3W = w * c3Scale;
  const c3H = h * c3Scale;
  const c3X = x + (w - c3W) / 2;
  const c3Y = y + 10;
  
  // 底部阴影
  ctx.fillStyle = 'rgba(0, 0, 0, 0.4)';
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(c3X + 2, c3Y + 3, c3W, c3H, 8);
    ctx.fill();
  }
  
  // 牌背漆木质感
  const grad3 = ctx.createLinearGradient(c3X, c3Y, c3X + c3W, c3Y + c3H);
  grad3.addColorStop(0, '#1c151b');
  grad3.addColorStop(1, '#0e0b0e');
  ctx.fillStyle = grad3;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(c3X, c3Y, c3W, c3H, 8);
    ctx.fill();
  }
  ctx.strokeStyle = '#4a3728';
  ctx.lineWidth = 1;
  ctx.stroke();

  // Card 2 (中间一张，微偏移)
  const c2Scale = 0.97;
  const c2W = w * c2Scale;
  const c2H = h * c2Scale;
  const c2X = x + (w - c2W) / 2;
  const c2Y = y + 5;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(c2X + 1, c2Y + 2, c2W, c2H, 8);
    ctx.fill();
  }

  const grad2 = ctx.createLinearGradient(c2X, c2Y, c2X + c2W, c2Y + c2H);
  grad2.addColorStop(0, '#261b23');
  grad2.addColorStop(1, '#140f14');
  ctx.fillStyle = grad2;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(c2X, c2Y, c2W, c2H, 8);
    ctx.fill();
  }
  ctx.strokeStyle = isAnchor ? '#7f1d1d' : '#6b4f3b';
  ctx.lineWidth = 1.2;
  ctx.stroke();

  // 金色或朱红暗纹勾角
  ctx.strokeStyle = isAnchor ? 'rgba(239, 68, 68, 0.4)' : 'rgba(217, 119, 6, 0.35)';
  ctx.lineWidth = 1;
  ctx.strokeRect(c2X + 8, c2Y + 8, c2W - 16, c2H - 16);

  ctx.restore();
}

/**
 * 绘制汉魏古制朱砂宣印 / 青玉方印决断大印 (Imperial Cinnabar Stamp)
 * 替换简陋纯色矩形，形成极具威仪的世家宗令朱砂盖印反馈
 */
function drawImperialCinnabarSeal(ctx, cx, cy, text, isRight, alpha) {
  if (alpha <= 0.05) return;
  ctx.save();
  ctx.globalAlpha = Math.min(1.0, Math.max(0, alpha));

  const rot = isRight ? -0.14 : 0.14;
  ctx.translate(cx, cy);
  ctx.rotate(rot);

  // 尺寸设定
  const sealW = 148;
  const sealH = 46;
  const sx = -sealW / 2;
  const sy = -sealH / 2;

  // 印泥基底与边框颜色
  const sealColor = isRight ? '#10b981' : '#ef4444';
  const sealDark = isRight ? '#047857' : '#b91c1c';
  const sealLight = isRight ? '#6ee7b7' : '#fca5a5';
  const sealBg = isRight ? 'rgba(6, 78, 59, 0.45)' : 'rgba(127, 29, 29, 0.45)';

  // 外层古印阴影与印泥底色
  ctx.fillStyle = sealBg;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(sx, sy, sealW, sealH, 6);
    ctx.fill();
  } else {
    ctx.fillRect(sx, sy, sealW, sealH);
  }

  // 仿古金石印章双重边框
  ctx.strokeStyle = sealColor;
  ctx.lineWidth = 2.5;
  if (typeof ctx.roundRect === 'function') {
    ctx.beginPath();
    ctx.roundRect(sx + 1, sy + 1, sealW - 2, sealH - 2, 5);
    ctx.stroke();
  } else {
    ctx.strokeRect(sx + 1, sy + 1, sealW - 2, sealH - 2);
  }

  // 内圈金石细纹
  ctx.strokeStyle = sealDark;
  ctx.lineWidth = 1;
  ctx.strokeRect(sx + 4, sy + 4, sealW - 8, sealH - 8);

  // 四角古印断纹斑驳质感
  ctx.fillStyle = sealColor;
  ctx.fillRect(sx + 6, sy + 6, 3, 3);
  ctx.fillRect(sx + sealW - 9, sy + 6, 3, 3);
  ctx.fillRect(sx + 6, sy + sealH - 9, 3, 3);
  ctx.fillRect(sx + sealW - 9, sy + sealH - 9, 3, 3);

  // 顶部印玺铭文
  ctx.textAlign = 'center';
  ctx.textBaseline = 'top';
  ctx.font = 'bold 9.5px serif';
  ctx.fillStyle = sealLight;
  ctx.fillText(isRight ? '✦ 华夏世家 · 钦定行之 ✦' : '✦ 宗族戒令 · 恪守存续 ✦', 0, sy + 6);

  // 核心决断大字
  ctx.textBaseline = 'middle';
  ctx.font = 'bold 15px serif';
  ctx.fillStyle = '#ffffff';
  ctx.fillText(text, 0, sy + sealH / 2 + 5);

  ctx.restore();
}

/**
 * 华夏六大名门望族档案与独门宗族特权 (Famous Historical Great Clans)
 * 赋予开局极强历史使命感与名门代入感，告别枯燥 Demo 表单
 */
const FAMOUS_DYNASTY_CLANS = [
  {
    id: 'langya_wang',
    surname: '王',
    choronym: '徐州琅琊',
    hallName: '琅琊堂',
    title: '【徐州 · 琅琊王氏】',
    fame: '王与马共天下 · 华夏簪缨第一家',
    ancestor: '王祥、王导',
    motto: '海纳百川，卧冰行孝，德业延年',
    vocationId: 'study_scholar',
    themeColor: '#f59e0b',
    perk: '👑 门阀之冠 (初始门望+15，名士声援)'
  },
  {
    id: 'yingchuan_chen',
    surname: '陈',
    choronym: '豫州颍川',
    hallName: '德星堂',
    title: '【豫州 · 颍川陈氏】',
    fame: '太丘道广 · 德星聚会名冠汉魏',
    ancestor: '陈寔、陈群',
    motto: '高风峻节，经学传家，九品定法',
    vocationId: 'study_scholar',
    themeColor: '#38bdf8',
    perk: '📜 经学定法 (文华昌盛，朝廷辟召特权)'
  },
  {
    id: 'hongnong_yang',
    surname: '杨',
    choronym: '司州弘农',
    hallName: '四知堂',
    title: '【司州 · 弘农杨氏】',
    fame: '四世三公 · 关西孔子清德传家',
    ancestor: '杨震、杨修',
    motto: '天知地知你知我知，清白遗子孙',
    vocationId: 'study_scholar',
    themeColor: '#c084fc',
    perk: '⚖️ 四世三公 (政治威望无匹，免受攻讦)'
  },
  {
    id: 'runan_yuan',
    surname: '袁',
    choronym: '豫州汝南',
    hallName: '汝南堂',
    title: '【豫州 · 汝南袁氏】',
    fame: '四世五公 · 门生故吏遍布海内',
    ancestor: '袁安、袁绍',
    motto: '累叶簪缨，雄霸州郡，部曲鼎盛',
    vocationId: 'military_general',
    themeColor: '#ef4444',
    perk: '⚔️ 部曲三千 (武备充盈，战阵士气高昂)'
  },
  {
    id: 'qinghe_cui',
    surname: '崔',
    choronym: '冀州清河',
    hallName: '博陵堂',
    title: '【冀州 · 清河崔氏】',
    fame: '海内门阀之首 · 博雅清贵冠盖神州',
    ancestor: '崔琰、崔林',
    motto: '清忠履正，天下士冠，衣冠茂盛',
    vocationId: 'study_scholar',
    themeColor: '#34d399',
    perk: '🏛️ 阀阅之宗 (族产底蕴深厚，抗风险)'
  },
  {
    id: 'custom_surname',
    surname: '李',
    choronym: '华夏神州',
    hallName: '自立宗堂',
    title: '【自立名门 · 百家姓门阀】',
    fame: '自辟乾坤 · 创万代不拔之基',
    ancestor: '自立始祖',
    motto: '天行健君子以自强不息，奕世载德',
    vocationId: 'study_scholar',
    themeColor: '#fbbf24',
    perk: '🌟 潜龙在渊 (全属性平衡，成长潜能无限)'
  }
];

/**
 * 绘制汉魏沉浸式工笔山水与气运天象背景 (Oriental Landscape Backdrop)
 * 彻底消除黑屏死水与 Demo 感，赋予游戏如《千里江山图》《江南百景图》般的东方历史美学
 */
function drawOrientalLandscapeBackdrop(ctx, width, height, time = 0) {
  if (!ctx) return;
  ctx.save();

  const safeBezier = (c, cp1x, cp1y, cp2x, cp2y, x, y) => {
    if (typeof c.bezierCurveTo === 'function') c.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
    else c.lineTo(x, y);
  };
  const safeQuad = (c, cpx, cpy, x, y) => {
    if (typeof c.quadraticCurveTo === 'function') c.quadraticCurveTo(cpx, cpy, x, y);
    else c.lineTo(x, y);
  };
  const safeEllipse = (c, x, y, rx, ry) => {
    if (typeof c.ellipse === 'function') c.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2);
    else c.arc(x, y, rx, 0, Math.PI * 2);
  };
  
  // 1. 绢帛天幕底色 (漆黑入深赭朱红渐变)
  if (typeof ctx.createLinearGradient === 'function') {
    const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
    skyGrad.addColorStop(0, '#0c070c');
    skyGrad.addColorStop(0.35, '#170c12');
    skyGrad.addColorStop(0.7, '#241018');
    skyGrad.addColorStop(1, '#180a0f');
    ctx.fillStyle = skyGrad;
  } else {
    ctx.fillStyle = '#170c12';
  }
  ctx.fillRect(0, 0, width, height);

  // 2. 远天旭日/皓月微光与浑天星象光晕
  if (typeof ctx.createRadialGradient === 'function') {
    const sunX = width * 0.78;
    const sunY = height * 0.22;
    const sunGrad = ctx.createRadialGradient(sunX, sunY, 10, sunX, sunY, 140);
    sunGrad.addColorStop(0, 'rgba(245, 158, 11, 0.22)');
    sunGrad.addColorStop(0.5, 'rgba(180, 83, 9, 0.08)');
    sunGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = sunGrad;
    ctx.beginPath();
    ctx.arc(sunX, sunY, 140, 0, Math.PI * 2);
    ctx.fill();
  }

  // 3. 远山层 (Misty Distant Mountains - 青黛薄霭)
  const farY = height * 0.48;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, farY + 20);
  safeBezier(ctx, width * 0.25, farY - 35, width * 0.45, farY + 15, width * 0.65, farY - 25);
  safeBezier(ctx, width * 0.82, farY - 50, width * 0.92, farY - 10, width, farY);
  ctx.lineTo(width, height);
  ctx.closePath();
  if (typeof ctx.createLinearGradient === 'function') {
    const farGrad = ctx.createLinearGradient(0, farY - 50, 0, height * 0.85);
    farGrad.addColorStop(0, 'rgba(38, 24, 38, 0.55)');
    farGrad.addColorStop(0.5, 'rgba(28, 16, 26, 0.65)');
    farGrad.addColorStop(1, 'rgba(16, 8, 14, 0.85)');
    ctx.fillStyle = farGrad;
  } else {
    ctx.fillStyle = 'rgba(28, 16, 26, 0.65)';
  }
  ctx.fill();
  ctx.restore();

  // 4. 浮云缭绕层 (Drifting Ink Cloud Mist)
  const cloudOffset = (time * 0.015) % width;
  ctx.save();
  ctx.fillStyle = 'rgba(245, 230, 211, 0.035)';
  for (let c = -1; c <= 1; c++) {
    const cx = c * width + cloudOffset;
    ctx.beginPath();
    safeEllipse(ctx, cx + width * 0.3, farY + 10, width * 0.35, 18);
    ctx.fill();
    ctx.beginPath();
    safeEllipse(ctx, cx + width * 0.75, farY - 15, width * 0.28, 14);
    ctx.fill();
  }
  ctx.restore();

  // 5. 中峦层 (Middle Mountain Ridge - 焦墨重峦)
  const midY = height * 0.62;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, height);
  ctx.lineTo(0, midY);
  safeBezier(ctx, width * 0.18, midY - 45, width * 0.32, midY + 10, width * 0.5, midY - 30);
  safeBezier(ctx, width * 0.68, midY - 55, width * 0.85, midY + 5, width, midY - 20);
  ctx.lineTo(width, height);
  ctx.closePath();
  if (typeof ctx.createLinearGradient === 'function') {
    const midGrad = ctx.createLinearGradient(0, midY - 55, 0, height);
    midGrad.addColorStop(0, 'rgba(24, 14, 22, 0.88)');
    midGrad.addColorStop(1, 'rgba(12, 6, 10, 0.96)');
    ctx.fillStyle = midGrad;
  } else {
    ctx.fillStyle = 'rgba(24, 14, 22, 0.88)';
  }
  ctx.fill();
  ctx.restore();

  // 6. 汉魏坞壁重楼与飞檐剪影 (Han Dynasty Fortress Watchtower & Flying Eaves)
  ctx.save();
  const fortX = width * 0.84;
  const fortBaseY = height * 0.72;
  ctx.fillStyle = 'rgba(15, 8, 12, 0.95)';
  // 角楼塔身
  ctx.fillRect(fortX - 22, fortBaseY - 45, 44, 50);
  // 上层飞檐 (Sweeping Eaves)
  ctx.beginPath();
  ctx.moveTo(fortX - 32, fortBaseY - 45);
  safeQuad(ctx, fortX, fortBaseY - 52, fortX + 32, fortBaseY - 45);
  ctx.lineTo(fortX + 36, fortBaseY - 49);
  safeQuad(ctx, fortX, fortBaseY - 60, fortX - 36, fortBaseY - 49);
  ctx.closePath();
  ctx.fill();
  // 角楼宝顶
  ctx.beginPath();
  ctx.moveTo(fortX - 16, fortBaseY - 55);
  ctx.lineTo(fortX, fortBaseY - 70);
  ctx.lineTo(fortX + 16, fortBaseY - 55);
  ctx.closePath();
  ctx.fill();
  // 悬挂红灯微芒
  const lanternGlow = 0.4 + 0.3 * Math.sin(time * 0.003);
  ctx.fillStyle = `rgba(239, 68, 68, ${lanternGlow})`;
  ctx.beginPath();
  ctx.arc(fortX - 28, fortBaseY - 42, 3, 0, Math.PI * 2);
  ctx.arc(fortX + 28, fortBaseY - 42, 3, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();

  // 7. 飞鹤掠影 (Chinese Flying Cranes in the sky)
  ctx.save();
  ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
  ctx.lineWidth = 1.2;
  const craneX = (width * 0.35 + (time * 0.02) % (width + 60)) - 30;
  const craneY = height * 0.28 + Math.sin(time * 0.002) * 8;
  ctx.beginPath();
  ctx.moveTo(craneX - 8, craneY - 3);
  safeQuad(ctx, craneX, craneY - 8, craneX + 8, craneY - 3);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(craneX - 3, craneY);
  ctx.lineTo(craneX + 5, craneY + 1);
  ctx.stroke();
  ctx.restore();

  ctx.restore();
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ROLE_VISUAL_CONFIG,
    FAMOUS_DYNASTY_CLANS,
    inferRoleFromSpeaker,
    drawCharacterBust,
    drawSpeechBalloon,
    drawFloatingSparks,
    drawAnimatedChest,
    drawGachaCard,
    drawConfiscationDecreeModal,
    drawChestDropFanfareModal,
    drawCardStackBacks,
    drawImperialCinnabarSeal,
    drawOrientalLandscapeBackdrop
  };
}
