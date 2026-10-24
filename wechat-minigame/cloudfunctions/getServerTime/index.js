// 云函数入口文件：getServerTime
let cloud = null;
try {
  cloud = require('wx-server-sdk');
  cloud.init({
    env: cloud.DYNAMIC_CURRENT_ENV
  });
} catch (_) {
  // 本地测试/无头仿真环境降级桩
  cloud = {
    getWXContext: () => ({ OPENID: 'local_openid', APPID: 'local_appid' })
  };
}

// 云函数入口函数
exports.main = async (event, context) => {
  const now = Date.now();
  const wxContext = cloud.getWXContext();

  return {
    success: true,
    serverTime: now,
    ntpIso: new Date(now).toISOString(),
    openid: wxContext.OPENID,
    appid: wxContext.APPID
  };
};
