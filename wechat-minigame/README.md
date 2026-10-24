# 《风华年代：沧海沉浮录》微信原生小游戏开发者手册

本工程为基于微信原生 Canvas 2D 架构深度自研的年代人生模拟小游戏，无任何 DOM、web-view 或第三方重型引擎依赖，开箱即用。

---

## 一、 工程目录架构与职责划分

```text
wechat-minigame/
├── game.js                     # 游戏核心引擎（主渲染循环、状态机、事件树与交互系统）
├── game.json                   # 小游戏全局配置文件（竖屏、openDataContext、网络超时）
├── project.config.json         # 开发者工具工程配置（基础库统一基线 3.4.0、云函数目录注册）
├── project.private.config.json # 个人开发者本地覆盖配置（开发期免校验域名等）
├── gameConfig.js               # 动态远程配置与运营频控入口桥接
├── wechatLifecycle.js          # 微信环境生命周期、右上角分享与更新检测桥接
├── eraMusicEngine.js           # 东方意境交响音乐与 WebAudio 引擎桥接
├── openDataContext/           # 微信开放数据域（SharedCanvas 独立沙箱）
│   └── index.js                # 微信好友时代功名榜水墨风排行渲染
├── cloudfunctions/             # 微信云开发云函数
│   ├── getServerTime/          # 服务端权威 NTP 授时（防御修改系统时钟作弊）
│   ├── verifyAndSubmitScore/   # 终局成绩服务端双向验算与防作弊上报鉴权
│   ├── verifyMidasOrder/       # 米大师虚拟支付/道具订单双向核验、防重放、流水对账与恢复购买
│   └── clanLeaderboard/        # 宗族档案跨设备持久化、全服百家榜、赛季归档、权威热更与联姻防伪校验
└── src/                        # 核心模块源码拆分目录
    ├── config/gameConfig.js    # 动态远程配置中心、就绪自检诊断与本地容灾缓存
    ├── audio/
    │   ├── eraMusicEngine.js   # 四大时代 64 拍意境合奏、微音效调度与动态避让
    │   └── soundManager.js     # 原生物理声学模态 PCM 合成引擎（消除电子蜂鸣）
    ├── platform/
    │   ├── wechatLifecycle.js  # 微信冷启动参数归因、胶囊适配、分享与版本热更
    │   ├── leaderboardSync.js  # 开放数据域数据同步与防作弊鉴权中台
    │   └── clanCloudService.js # 华夏世家大系服务端桥接与云端同步服务（换机迎回/全服榜单/联姻验签）
    ├── monetization/
    │   └── monetizationManager.js # 变现中台：独立广告位单例、急救自闭环、资质双模支付与订单补发
    └── data/                   # 模块化剧情、赛道、人物与动态内容热更数据底座
        ├── contentUpdater.js   # 线上 JSON 动态热更新引擎（免发版热更文案与数值，支持强制验签）
        ├── content_manifest.json # 剧情文案、突发事件与平衡数值标准 JSON 热更包
        ├── seasonConfig.js     # 华夏三千年世家大系 15 大 200 年赛季总控与 MSCP 7 周产线规范
        ├── seasonSettlementEngine.js # 200 年赛季大结卷、门阀品第考定与跨赛季继承引擎
        ├── clanSocialSystem.js # 宗族社交中心：合规姓氏同宗总会、秦晋联姻防伪校验、同乡义庄互助
        ├── familySystem.js     # 宗族立族大典、堂号家风、宗祠信托基金与祖训传承
        ├── epochOneEngine.js   # 第一纪元（汉末筑基，公元100~300年）关隘大案与开基立宗
        ├── ancientChronicleMaster.js # 古代至近代通史总控（公元100~2026年双轴编年演进）
        ├── futureFrontierEngine.js # 未来科幻宏观推演（公元2026~3100年），前沿线拦截与景气反哺
        ├── historicalMilieuHanWei.js # 汉魏风骨历史名仕、官制阶梯与重大历史关隘大案真源
        ├── tracks.js           # 12 大职业主线赛道配置与身世传承
        ├── stories.js          # 编年体时代大事件与重大转折
        ├── characters.js       # 群像人物与同行者好感体系
        ├── deskDocs.js         # 时代案头公文与批示卷宗
        ├── encounters.js       # 随机遭遇与命运抉择事件池
        ├── milestones.js       # 人生高光瞬间与成就名录
        ├── childhood.js        # 少年求学与高考录取卡牌
        └── heritage.js         # 宗族祠堂与家风传承典藏
```

---

## 二、 商业化变现与资质合规体系

### 1. 资质双模合规架构 (`enableInAppPurchase`)
由于向用户提供【旧藏铜镇纸】、初始资金或开局天赋点属于**虚拟道具交易**，微信平台有严格的主体与资质要求：
* **模式 A：纯广告流量变现合规模式（默认开启）**：
  * 在 `gameConfig.js` 中保持 `enableInAppPurchase: false`；
  * 小游戏**完全不调用任何虚拟支付接口**，【旧藏铜镇纸】通过观看时代长卷激励视频短片赠予；
  * **适用场景**：个人主体或无内购资质团队，以微信官方平台当前最新运营规范与主体资质自查要求为准。
* **模式 B：企业主体 / 虚拟道具内购模式**：
  * 具备企业主体资格、文网文/软著及相关版号审批资质后，将 `enableInAppPurchase` 设为 `true`，并配置真实 `midasOfferId`；
  * 将道具定性为**【修史典藏包 · 文房旧藏】**，通过微信米大师拉起虚拟支付；
  * iOS 平台受 Apple IAP 政策约束，自动降级为观看短片体验，杜绝违规。

### 2. 独立广告位单例与防串线
传承天赋与急救调摄分别独立配置广告位，避免回调串线并方便后台精准统计 eCPM：
* `inspirationAdUnitId`：终局家风传承天赋激励视频（流量主场景1）；
* `emergencyMedicalAdUnitId`：杏林颐养急救调摄激励视频（流量主场景2）；
* `monetizationManager.js` 内部针对两个广告位独立管理 `createRewardedVideoAd` 单例与 `onClose` 句柄，杜绝回调重复叠加。

### 3. 损失厌恶克制机制（杏林颐养急救）
* **每生限一次**：全局配置 `maxEmergencyMedicalPerRun: 1`，一局游戏内只允许触发 1 次；
* **超长冷却**：设置 `emergencyMedicalCooldownYears: 10`，10 年内绝不再弹；
* **自包含闭环防御**：观看完成回调内直接由模块自身写入局内次数与冷却年份，杜绝外部漏限漏洞；
* **尊严选择**：若玩家选择不看广告，赋予“从容荣退·功勋名宿”高规格致仕，不使用任何惩罚性字眼。

### 4. 订单防丢与补发恢复通道 (`restoreSponsorOrders`)
* **支付即落盘**：扣款成功瞬间优先发放权益，写入本地持久化流水，再异步调用云函数；
* **一键查验补发**：在系统设置弹窗中提供 **`🔄 恢复历史典藏权益 (订单防漏补发)`**，玩家换机或清理缓存后可一键核验本地与云端账单，自动补发【旧藏铜镇纸】。

---

## 三、 线上剧情与数值动态热更架构 (JSON CDN)

微信小游戏平台严禁下载并动态执行 `.js` 脚本（禁止 `eval`/`new Function`），但**完全允许拉取结构化 JSON 数据**：
1. **热更引擎 (`contentUpdater.js`)**：
   * 冷启动时优先读取本地持久化缓存 `LIFESIM_CACHED_CONTENT_MANIFEST`，秒开无白屏；
   * 后台异步通过 `wx.request` 请求 CDN 上的 `content_manifest.json`；
   * 检测到远程版本号高于本地时，自动执行数据校验与安全过滤，将剧情文案、突发遭遇与数值平衡补丁原子化合并至内存中的数据对象。
2. **免发版维护**：
   * 策划若需修正剧情错别字、调整数值平衡倍率、或临时上线突发时代事件，只需在 CDN 替换 `content_manifest.json` 并递增 `manifestVersion`，玩家重新进入小游戏即可无感更新，无需重新提交微信版本审核！

---

## 四、 云函数部署指南与职责

本项目包含 4 个高可用轻量级云函数，部署在 `cloudfunctions/` 目录下：

| 云函数名称 | 核心职责 | 依赖环境 |
| :--- | :--- | :--- |
| **`getServerTime`** | 授时中台：返回服务端权威时间戳，防御玩家本地修改时钟作弊。 | 云函数基础运行时 |
| **`verifyAndSubmitScore`** | 成绩验算：终局成绩双向验算、防篡改签名核查，通过后方允许写入好友榜。 | 云数据库 `audit_logs` |
| **`verifyMidasOrder`** | 支付核验：订单防重放记账、对账校验与恢复购买查询。 | 云数据库 `midas_orders` |
| **`clanLeaderboard`** | 宗族云服务：家族档案持久化同步 (`syncClanProfile`)、跨设备一键迎回 (`fetchClanProfile`)、全服百家榜动态汇聚 (`getClanLeaderboard`)、赛季大结卷归档 (`archiveSeason`)、受信任热更配置权威下发 (`getContentManifest`) 与联姻防伪 Nonce 幂等核验 (`verifyAlliance`)。 | 云数据库 `clans`、`clan_seasons`、`redeemed_alliances` |

### 部署步骤：
1. 在微信开发者工具中打开项目，点击工具栏 **“云开发”** 开通云环境；
2. 在左侧资源管理器中，分别右键 `getServerTime`、`verifyAndSubmitScore`、`verifyMidasOrder`、`clanLeaderboard`：
   * 选择 **“上传并部署：所有文件”**；
3. 云数据库初始化：
   * 在云开发控制台【数据库】中，新建以下集合（权限统一建议设为“所有用户可读，仅管理端可写”或按业务配置）：
     * `midas_orders`：米大师虚拟支付与道具补发对账流水；
     * `clans`：全服世家核心档案、宗祠信托基金与历代祖先功绩谱；
     * `clan_seasons`：历史赛季名人堂与百强世家归档；
     * `redeemed_alliances`：联姻防伪防重放 Nonce 幂等核销台账；
     * `audit_logs`：终局成绩防作弊验算日志。

---

## 五、 商业化就绪自检诊断 (Diagnostics)

在上线前或调试阶段，可在控制台运行内置就绪自检函数：
```javascript
const { checkMonetizationDiagnostics } = require('./src/config/gameConfig.js');
console.log(checkMonetizationDiagnostics());
```
该函数会输出详细检查报告：
* 传承激励视频广告位配置状态与 ID；
* 急救激励视频广告位配置状态与 ID；
* 虚拟支付资质模式与 OfferId 有效性；
* 订阅消息模板配置状态；
* CDN 远程热更与剧情 Manifest 连通性；
* 给出 `productionReady: true/false` 的上线就绪结论。

---

## 六、 本地自动化全生命周期模拟跑测

可在 Node.js 环境下免微信客户端直接运行自动化平衡推演：
```bash
# 语法与编译静态检查
node -c wechat-minigame/game.js
node -c wechat-minigame/src/config/gameConfig.js
node -c wechat-minigame/src/monetization/monetizationManager.js
node -c wechat-minigame/src/data/clanSocialSystem.js
node -c wechat-minigame/src/data/epochOneEngine.js
node -c wechat-minigame/src/data/ancientChronicleMaster.js
node -c wechat-minigame/src/data/futureFrontierEngine.js

# 运行自动化分叉度与平衡推演（20 局策略推演）
node balance_sim.js wechat-minigame/game.js 1 strategic
```

---

## 七、 华夏三千年世家大系核心架构与自动化测试

### 1. 架构定位与模块划分
《风华年代：沧海沉浮录》原生搭载“华夏三千年世家大系”（公元100年 ～ 公元3100年），打破传统网文纯血缘局限，构建“三千年世家非血脉多元接班体系（宗门嫡长/过继立嗣/收养义子/家臣辅弼/贤良掌事）与200年纪元赛季制”：
* **`familySystem.js`**：宗族立族大典、堂号家风、宗祠信托基金、非血脉五大接班人择贤与祖训传承。
* **`seasonConfig.js`**：15 大 200 年赛季总控、时间线统一总表与 7 周最小赛季内容包 (MSCP) 产线标准。
* **`seasonSettlementEngine.js`**：200 年赛季大结卷、门阀品第考定、信托结转与跨赛季继承资产包。
* **`epochOneEngine.js`**：第一纪元（汉末筑基与建安风骨，公元100~300年）五大历史关隘、谥号盖棺与始祖开基。
* **`ancientChronicleMaster.js`**：古代至近代通史总控（公元100~2026年，两晋南渡、隋唐草创、盛唐科甲、两宋义庄、明清波澜、晚清风雷、抗战救亡、当代弄潮）。
* **`futureFrontierEngine.js`**：未来科幻宏观推演（公元2026~3100年），支持运营 `frontierYear` 岁月前沿线异步拦截与宏观产业景气度反哺。
* **`clanSocialSystem.js`**：合规姓氏同宗总会、籍贯公所、秦晋之好联姻防伪令牌核验、同乡义庄救急与每日焚香敬祖。
* **`clanCloudService.js`**：客户端中台，提供微信 OpenID 绑定、跨设备迎回、全服榜单拉取、弱网自愈与防篡改签名校验。

### 2. 全量自动化测试套件矩阵 (17 大工程级测试套件)
项目根目录下配备完整的无头（Headless）自动化测试工程矩阵，涵盖核心数值、史实演进、热更安全、社交防伪与云端联调：

```bash
# === 华夏三千年世家大系核心闭环测试 ===
# 1. 验证热更强制验签、数值裁剪防误伤、MSCP赛季内容包准入与全链路关键埋点
node test_hotupdate_security_and_pipeline.js

# 2. 验证微信云开发家族服务、全服百家榜、联姻防伪Token核验与赛季特权
node test_cloud_race_leaderboard_and_perks.js

# 3. 验证200年赛季大结卷二次确认防误触、触控热区合规与休赛期四大经略指南
node test_season_settlement_confirm_and_ux.js

# 4. 验证赛季大结卷端到端流转、门阀品第考定、下一赛季资产承继全流程
node test_season_settlement_e2e.js

# 5. 验证双轴演进（个人历程轴与宗族编年轴）、五大非血脉接班人与家族行当传承
node test_dual_axis_and_vocation_succession.js

# 6. 验证跨赛季大结卷资产结转、非血脉多房分支继承与休赛期经略深度推演
node test_clan_intermission_and_succession_depth.js

# 7. 验证公元100~3100年跨世纪全链路史诗推演、15大纪元递进与岁月前沿拦截
node test_3000year_full_simulation.js

# 8. 验证全链路埋点、弱网自愈重试、宗族长线闭环与运营事件上报
node test_clan_liveops_and_telemetry.js

# 9. 验证微信小游戏 Canvas 2D 宗祠大殿、庄园、榜单与社交弹窗 9 大渲染阶段手势实测
node test_minigame_clan_canvas.js

# 10. 验证单局通关终局数据注入宗族义庄、功德评价与世家谱系入库联动
node test_playthrough_clan_linkage.js

# 11. 验证纪元与时间线统一回归测试、汉魏至未来深空纪元跨越
node test_epoch_and_timeline_unification_regression.js

# 12. 验证第一纪元（汉末筑基与建安风骨）立族、家族谱系、宗祠信托初创
node test_family_epoch1.js

# 13. 验证时间线全事件年代审计、传世重宝信物消耗与长线增益平衡
node test_timeline_audit_and_relic_costs.js

# 14. 汉魏时代背景纯净性校验（杜绝现代高考等未来概念穿越至汉末）
node test_hanwei_gaokao_purge.js

# === 基础玩法、商业化与看板测试 ===
# 15. 社交裂变邀请、米大师虚拟支付与激励视频广告双模合规验证
node test_fission_monetization.js

# 16. 个人看板各项统计、传家宝、属性面板及UI交互
node test_dashboard_features.js

# 17. 核心玩法、事件选择、属性结算与结局判定回归
node test_p1_features.js
```


