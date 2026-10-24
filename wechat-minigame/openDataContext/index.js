/**
 * 《风华年代：沧海沉浮录》微信开放数据域排行榜引擎 (Open Data Context)
 * 运行于独立沙箱环境，负责微信好友排行读取与 SharedCanvas 绘制
 */

const sharedCanvas = (typeof wx !== 'undefined' && typeof wx.getSharedCanvas === 'function')
  ? wx.getSharedCanvas()
  : null;
const ctx = sharedCanvas ? sharedCanvas.getContext('2d') : null;

let _friendDataList = [];
let _currentWidth = 327;
let _currentHeight = 145;

function parseKVData(kvList) {
  const result = { score: 0, grade: 'B', title: '平凡一生' };
  if (!Array.isArray(kvList)) return result;
  for (let i = 0; i < kvList.length; i++) {
    const item = kvList[i];
    if (item.key === 'era_score') {
      result.score = parseInt(item.value, 10) || 0;
    } else if (item.key === 'era_grade') {
      result.grade = String(item.value || 'B');
    } else if (item.key === 'era_title') {
      result.title = String(item.value || '');
    }
  }
  return result;
}

function fetchAndRenderFriendLeaderboard() {
  if (typeof wx === 'undefined' || typeof wx.getFriendCloudStorage !== 'function') {
    renderEmptyState("当前环境暂不支持好友排行");
    return;
  }

  wx.getFriendCloudStorage({
    keyList: ['era_score', 'era_grade', 'era_title'],
    success: (res) => {
      const rawList = (res && Array.isArray(res.data)) ? res.data : [];
      _friendDataList = rawList.map((friend) => {
        const parsed = parseKVData(friend.KVDataList);
        return {
          nickname: friend.nickname || '同窗挚友',
          avatarUrl: friend.avatarUrl || '',
          score: parsed.score,
          grade: parsed.grade,
          title: parsed.title
        };
      });

      // 按时代履职综合分从高到低排序
      _friendDataList.sort((a, b) => b.score - a.score);

      // 截取前 10 名
      if (_friendDataList.length > 10) {
        _friendDataList = _friendDataList.slice(0, 10);
      }

      renderFriendLeaderboard(_friendDataList);
    },
    fail: (err) => {
      console.warn('[OpenDataContext] 获取好友排行榜失败:', err);
      renderEmptyState("未能加载好友榜单，请稍后刷新");
    }
  });
}

function renderEmptyState(tipText) {
  if (!ctx || !sharedCanvas) return;
  const w = sharedCanvas.width || _currentWidth;
  const h = sharedCanvas.height || _currentHeight;

  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = '#94a3b8';
  ctx.font = '13px sans-serif';
  ctx.fillText(tipText || "暂无好友留档，邀好友同台比试", w / 2, h / 2);
}

function renderFriendLeaderboard(list) {
  if (!ctx || !sharedCanvas) return;
  const w = sharedCanvas.width || _currentWidth;
  const h = sharedCanvas.height || _currentHeight;

  ctx.clearRect(0, 0, w, h);

  // 背景：内敛墨色微渐变底
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, w, h);

  // 标头
  ctx.textAlign = 'left';
  ctx.textBaseline = 'top';
  ctx.fillStyle = '#f59e0b';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('🏆 微信好友功名榜 (前五名)：', 10, 8);

  if (!list || list.length === 0) {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#64748b';
    ctx.font = '12px sans-serif';
    ctx.fillText('虚位以待，快与同道中人一较高下', w / 2, h / 2 + 10);
    return;
  }

  const rowHeight = 26;
  const startY = 28;
  const displayCount = Math.min(list.length, 4);

  for (let i = 0; i < displayCount; i++) {
    const item = list[i];
    const rowY = startY + i * rowHeight;

    // 行背景高亮
    ctx.fillStyle = i === 0 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(30, 41, 59, 0.6)';
    ctx.fillRect(6, rowY, w - 12, rowHeight - 4);

    // 排名角标
    const rankSymbol = i === 0 ? '🥇' : (i === 1 ? '🥈' : (i === 2 ? '🥉' : `#${i + 1}`));
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = i === 0 ? '#fde047' : '#e2e8f0';
    ctx.fillText(rankSymbol, 12, rowY + (rowHeight - 4) / 2);

    // 昵称与称号
    ctx.font = '11px sans-serif';
    ctx.fillStyle = '#cbd5e1';
    let displayName = item.nickname || '同窗好友';
    if (displayName.length > 6) displayName = displayName.slice(0, 5) + '…';
    const tag = `[${item.grade}级] ${displayName}`;
    ctx.fillText(tag, 38, rowY + (rowHeight - 4) / 2);

    // 分数
    ctx.textAlign = 'right';
    ctx.font = 'bold 12px sans-serif';
    ctx.fillStyle = '#38bdf8';
    ctx.fillText(`${item.score || 0}分`, w - 14, rowY + (rowHeight - 4) / 2);
  }
}

// 监听主域指令消息
if (typeof wx !== 'undefined' && typeof wx.onMessage === 'function') {
  wx.onMessage((data) => {
    if (!data || typeof data !== 'object') return;
    if (data.type === 'SHOW_LEADERBOARD') {
      if (data.width) _currentWidth = data.width;
      if (data.height) _currentHeight = data.height;
      if (sharedCanvas) {
        sharedCanvas.width = _currentWidth;
        sharedCanvas.height = _currentHeight;
      }
      fetchAndRenderFriendLeaderboard();
    } else if (data.type === 'UPDATE_SCORE') {
      fetchAndRenderFriendLeaderboard();
    }
  });
}
