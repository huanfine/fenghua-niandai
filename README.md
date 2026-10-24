# 《风华年代：沧海沉浮录》华夏三千年世家大系官方白皮书与工程文档

> **华夏三千年世家大系 · 200年纪元赛季制 · 非血脉多元接班体系 · 微信小游戏原生架构**

---

## 一、 项目愿景与宏观设定

《风华年代：沧海沉浮录》是一部跨越公元100年至公元3100年的史诗级世家模拟与时代人生交互作品。

### 1. 三千年世家大系（公元100年 ～ 公元3100年）
打破传统网文单一血缘繁衍的局限，真实还原华夏历史中各大门阀世族的生存哲学与承继智慧：
* **古代篇（公元100~1900年）**：汉末筑基与建安风骨、两晋南渡与江左门阀、隋唐草创与关陇枢要、盛唐科甲与诗书润骨、两宋义庄与宗族信托、明清波澜与晋徽商道。
* **近代篇（公元1900~1949年）**：晚清风雷、实业救国、抗战烽火、民族义举。
* **当代篇（公元1949~2026年）**：时代弄潮、改革开放、特区下海、科技强国。
* **未来篇（公元2026~3100年）**：星汉漫游、地月工业、闭环生态、深空前沿。

### 2. 非血脉多元接班体系
游戏核心继承机制彻底打破纯血缘单一单传，提供五大接班人择贤接班机制：
1. **宗门嫡长**：顺理承继，得家族正统认可，承接宗祠核心香火与声望加成；
2. **过继立嗣**：同宗近支兼祧过继，化解绝嗣危机，续接香火文脉；
3. **收养义子**：乱世救孤或结纳英才，赐姓入族，附带极高武力或商业魄力；
4. **家臣辅弼**：三代世仆或客卿掌柜晋升，忠贞不渝，力挽狂澜，保全族产；
5. **贤良掌事**：族中打破内外性别门第偏见，唯贤是用，商业经营与资财运作顶级。

---

## 二、 核心架构与模块清单

游戏主程序运行于微信小游戏 Canvas 2D 环境（`wechat-minigame/game.js`），核心系统模块位于 `wechat-minigame/src/`：

```text
wechat-minigame/
├── game.js                         # 小游戏主程序入口（Canvas 2D 渲染管线、手势触控、状态机、弹窗系统）
├── game.json                       # 微信小游戏平台配置文件（分包、横竖屏、设备朝向）
├── project.config.json             # 微信开发者工具工程配置
├── cloudfunctions/                 # 微信云开发云函数中台
│   ├── getServerTime/              # 权威网络授时（防玩家本地篡改设备时间）
│   ├── verifyAndSubmitScore/       # 终局成绩服务端双向验算与好友榜入库
│   ├── verifyMidasOrder/           # 米大师虚拟支付订单核验与幂等记账
│   └── clanLeaderboard/            # 宗族档案持久化、全服百家榜、权威热更与联姻防伪核验
└── src/
    ├── config/
    │   └── gameConfig.js           # 游戏动态配置中枢、商业化双模合规开关、数值白名单
    ├── data/
    │   ├── ancientChronicleMaster.js # 公元100~2026年古代通史事件与宏观波澜
    │   ├── epochOneEngine.js       # 第一纪元（汉魏风骨）五大历史关隘大案与谥号评价
    │   ├── futureFrontierEngine.js # 公元2026~3100年未来宏观推演与深空抉择
    │   ├── seasonConfig.js         # 15大200年赛季总控表、MSCP产线规范与7周倒排排期
    │   ├── seasonSettlementEngine.js # 200年赛季大结卷、门阀品第考定与资产跨纪元结转
    │   ├── clanSocialSystem.js     # 百家姓氏榜、八方籍贯榜、秦晋之好联姻防伪裂变
    │   └── contentUpdater.js       # 线上纯JSON剧情/数值补丁热更引擎（防篡改签名与数值裁剪）
    └── platform/
        ├── clanCloudService.js     # 宗族云服务客户端桥接器（OpenID绑定、跨设备迎回、全服榜拉取）
        ├── leaderboardSync.js      # 排行榜防抖同步与开放数据域桥接
        └── wechatLifecycle.js      # 微信生命周期监听（OnShow/OnHide/前后台网络恢复自愈）
```

---

## 三、 微信云开发服务端架构

云函数部署在 `wechat-minigame/cloudfunctions/`，无需自建服务器，零运维支撑全服百万并发：

| 云函数名称 | 核心职责 | 对应云数据库集合 |
| :--- | :--- | :--- |
| **`getServerTime`** | 授时中台：返回微信服务端权威时间戳，防御时钟穿越作弊。 | 云函数运行时基础能力 |
| **`verifyAndSubmitScore`** | 成绩验算：终局积分算法双向校验，防篡改签名核查，写入全服好友榜。 | `audit_logs` |
| **`verifyMidasOrder`** | 支付核验：米大师虚拟支付订单防重放记账、对账与跨局掉单恢复。 | `midas_orders` |
| **`clanLeaderboard`** | 宗族中枢：提供以下 6 大关键服务能力：<br>1. `syncFamily`：家族档案持久化与竞态覆盖防御；<br>2. `getLeaderboard`：全服百家姓氏与各省门阀真实声望排榜；<br>3. `recoverFamily`：玩家换机通过 OpenID 一键迎回传世世家；<br>4. `archiveSeason`：现实赛季结束时百强世家入驻青史名人堂；<br>5. `getContentManifest`：微信云端原生信道权威下发受信任平衡热更包；<br>6. `verifyAlliance`：联姻防伪 Nonce 服务端幂等记账核验。 | `clans`<br>`clan_leaderboard_archives`<br>`redeemed_alliances`<br>`content_manifests` |

---

## 四、 线上内容热更新引擎与安全防篡改体系

微信小游戏严禁动态下发并执行网络 `.js` 脚本。本项目设计了纯 JSON 增量补丁热更新引擎（`contentUpdater.js`）：
1. **权威信道下发**：
   * 优先通过 `clanLeaderboard.getContentManifest` 云函数原生下发，自带微信平台环境鉴权标识；
   * 若走 HTTP/CDN 备用信道，强制验证数字签名，**坚决拒绝客户端源码内置公开默认盐（`HOTUPDATE_DEFAULT_SALT`）**，必须配置私有安全密钥或走云端鉴权。
2. **原型污染防御与数值白名单裁剪**：
   * 递归清理 `__proto__`、`constructor`，杜绝任何外部注入风险；
   * 建立数值限幅白名单：
     * 金钱与奖金项（`Money`、`capital`、`gold`、`Fund`、`Bonus`、`Cash`、`Salary`）：限幅至 `[-500000, 500000]`；
     * 积分与考核基准分（`Score`、`Threshold`、`BaseScore`，如 `promotionBonus: 22000`, `endgameSGradeBaseScore: 1000`）：限幅至 `[0, 50000]`；
     * 基础单次属性微调项：限幅至 `[-30, 30]`；
     * 岁月前沿线：放开至 `[2026, 3100]` 年。

---

## 五、 最小赛季内容包 (MSCP) 与 7 周产线倒排排期

为了保证每个 200 年纪元赛季的高品质持续交付，制定了 **MSCP (Minimum Season Content Pack - 最小赛季内容包)** 工业级准入标准：

### 1. MSCP 交付规格
* **官制阶梯**：至少 5 条主线阶梯（文臣/学士/商贾/武弁/隐逸），每条梯级 5 阶（共 25 阶）；
* **纪元名宿**：6 ～ 10 位历史名仕立绘、台词文风与专属好感羁绊；
* **重大关隘事件**：4 ～ 12 个历史关键抉择事件（含检定要求、代际影响、谥号盖棺标记）；
* **传世信物与家训**：2 ～ 3 件纪元特色传世重宝信物（具备长线专属被动加成）；
* **纪元基础池**：出生地郡望池 ($\ge 6$)、父辈职业池 ($\ge 5$)、抓周物池 ($\ge 6$)。

### 2. 7 周倒排排期标准 (T-7 到 T-0)
* **T-7 周**：史实考据与断代立项，确定世家谱系脉络与 5 条官制阶梯初稿；
* **T-6 周**：数值框架搭建，平衡俸禄产出系数与门第声望阈值；
* **T-5 周**：剧情编撰，设计 4~12 个历史关隘大案与选项分流；
* **T-4 周**：名宿通讯录研制，完成 6~10 位历史名仕交互文案与增益链；
* **T-3 周**：传世信物与家训策划，设计长线专属宗族加成；
* **T-2 周**：无头自动化仿真跑测，验证代际流转零死循环与数值收敛；
* **T-1 周**：灰度体验、双模合规核查与数字签名封包；
* **T-0 周**：开季正式上线，全服平滑无感升级。

> **未研制内容包的赛季（如第3赛季隋唐草创，定档 2027-01-23）**：结算弹窗自动锁死启程按钮，显示“⏳ 敬请期待（定档 2027-01-23）”，引导玩家进入休赛期四大经略（多房分支再起、宗祠家产深耕、世家秦晋联姻、风云青史冲榜）。

---

## 六、 全量自动化测试矩阵 (17 大工程级测试套件)

在项目根目录下直接使用 Node.js 运行全链路自动化测试：

```bash
# === 1. 华夏三千年世家大系核心闭环测试 ===
node test_hotupdate_security_and_pipeline.js          # 热更防篡改验签、数值白名单防误伤、MSCP产线与关键埋点
node test_cloud_race_leaderboard_and_perks.js          # 云开发家族服务、全服百家榜、联姻防伪Token核验与开局特权
node test_season_settlement_confirm_and_ux.js         # 200年赛季大结卷二次确认防误触、触控热区合规与休赛期体验
node test_season_settlement_e2e.js                    # 赛季大结卷端到端流转、门阀品第考定、下一赛季资产承继全流程
node test_dual_axis_and_vocation_succession.js        # 双轴演进（个人历程轴与宗族编年轴）、五大非血脉接班人与家族行当传承
node test_clan_intermission_and_succession_depth.js   # 跨赛季大结卷资产结转、非血脉多房分支继承与休赛期经略深度推演
node test_3000year_full_simulation.js                 # 公元100~3100年跨世纪全链路史诗推演、15大纪元递进与岁月前沿拦截
node test_clan_liveops_and_telemetry.js               # 全链路埋点、弱网自愈重试、宗族长线闭环与运营事件上报
node test_minigame_clan_canvas.js                     # 微信小游戏 Canvas 2D 宗祠大殿、庄园、榜单与社交弹窗 9 大渲染手势实测
node test_playthrough_clan_linkage.js                 # 单局通关终局数据注入宗族义庄、功德评价与世家谱系入库联动
node test_epoch_and_timeline_unification_regression.js# 纪元与时间线统一回归测试、汉魏至未来深空纪元跨越
node test_family_epoch1.js                            # 第一纪元（汉末筑基与建安风骨）立族、家族谱系、宗祠信托初创
node test_timeline_audit_and_relic_costs.js           # 时间线全事件年代审计、传世重宝信物消耗与长线增益平衡
node test_hanwei_gaokao_purge.js                      # 汉魏时代背景纯净性校验（杜绝现代高考等未来概念穿越至汉末）

# === 2. 基础玩法、商业化与看板测试 ===
node test_fission_monetization.js                     # 社交裂变邀请、米大师虚拟支付与激励视频广告双模合规验证
node test_dashboard_features.js                       # 个人看板各项统计、传家宝、属性面板及UI交互
node test_p1_features.js                              # 核心玩法、事件选择、属性结算与结局判定回归
```

### 一键批量执行指令
```bash
for f in test_*.js; do node "$f" > /dev/null 2>&1 && echo "  PASS: $f" || echo "  FAIL: $f"; done
```
当前所有 17 个测试套件通过率 **100%**。
