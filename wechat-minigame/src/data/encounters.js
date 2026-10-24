// 千人千面时代程序化随机遭遇库 (60+ Procedural Annual Encounters)
const PROCEDURAL_ANNUAL_ENCOUNTER_POOL = [
  // --- 童年与少年期 (Childhood & Youth: Age 4 ~ 17) ---
  {
    id: 'child_model_airplane',
    title: '✈️ 少年宫无线电航模试飞大考',
    minAge: 8, maxAge: 14, track: 'all',
    desc: '大院少年宫举办全省航模竞翔选拔赛，你亲手用桐木轻木与橡皮筋调校的轻型滑翔机，在起飞前遭遇气流侧风考验：',
    choices: [
      {
        text: '精心微调机翼升阻比角度 · 坚持精准气动布局',
        outcomeText: '滑翔机迎风盘旋升空，久久不落！荣获全省航模一等奖，智谋+5，魄力+3；代价：精力-4。',
        effects: { iq: 5, courage: 3, sp: -4 },
        tag: '少年巧思'
      },
      {
        text: '主动协助同组动手能力弱的小伙伴排障 · 团队携手出线',
        outcomeText: '你表现出优秀的组织号召风范，同伴皆心悦诚服！情商+5，声望+3；代价：精力-3。',
        effects: { eq: 5, rep: 3, sp: -3 },
        tag: '少年朋辈'
      },
      {
        text: '【因循苟且】图省事放弃调试直接试飞 · 侥幸心理导致滑翔机当场栽入灌木丛折翼（平庸纯负陷阱）',
        outcomeText: '敷衍塞责不仅断送了名次，更让同伴看轻，心性锐气与声誉双双受损！',
        effects: { rep: -3, courage: -2, resilience: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },
  {
    id: 'child_flood_dike_repair',
    title: '🌊 盛夏暴雨大院排水渠夜间抢险',
    minAge: 9, maxAge: 16, track: 'all',
    desc: '连日倾盆暴雨，红砖平房大院地势低洼，排涝渠突遭枯枝淤泥堵塞，雨水眼看就要漫进独居老烈属家中：',
    choices: [
      {
        text: '冒雨挽起裤腿跳入深沟 · 带头清掏阻塞淤泥排险',
        outcomeText: '排水渠瞬间通畅，邻里交口称赞！魄力+5，街坊声望+5；代价：体魄-3，着凉感冒。',
        effects: { courage: 5, rep: 5, health: -3 },
        tag: '少年担当'
      },
      {
        text: '迅速召集同院十几名少年前往各家各户借沙袋筑堤',
        outcomeText: '大家分工明确固守门槛，秋毫无犯！情商+4，智谋+3；代价：精力-4。',
        effects: { eq: 4, iq: 3, sp: -4 },
        tag: '通盘调度'
      },
      {
        text: '【明哲保身】躲在屋檐下观望避雨 · 任凭渠水漫入老烈属门槛（消极避风陷阱）',
        outcomeText: '虽然没有淋雨受冻，但冷漠推诿被大院街坊看在眼里，声誉与心性留下污点！',
        effects: { rep: -4, courage: -3, resilience: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '明哲保身'
      }
    ]
  },
  {
    id: 'child_ancient_calligraphy',
    title: '✍️ 少年书法碑林临摹与墨宝品鉴',
    minAge: 10, maxAge: 17, track: 'all',
    desc: '随长辈拜谒碑林，面对颜鲁公沉雄博大之《祭侄文稿》，心神巨震，当场提笔临摹：',
    choices: [
      {
        text: '凝神静气沉下心性 · 细细体悟风骨与忠烈正气',
        outcomeText: '笔力遒劲入木三分，清廉操守底蕴+5，心性抗逆+3；代价：精力-3。',
        effects: { clean: 5, resilience: 3, sp: -3 },
        tag: '颜骨正气'
      },
      {
        text: '虚心向现场研学书法名家请教用笔提按精髓',
        outcomeText: '老名家抚须称许后生可畏，赠予徽墨一方！情商+4，声望+3；代价：清廉-1。',
        effects: { eq: 4, rep: 3, clean: -1 },
        tag: '文墨雅怀'
      },
      {
        text: '【浮躁厌学】耐不住枯燥随手乱涂乱抹 · 敷衍涂鸦被师长当场训诫（平庸纯负陷阱）',
        outcomeText: '浮躁轻浮令师长长叹摇头，专注心性与声誉尽失！',
        effects: { clean: -3, resilience: -2, rep: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },
  {
    id: 'child_math_olympiad',
    title: '🧮 全国青少年数理奥林匹克联赛',
    minAge: 11, maxAge: 17, track: 'all',
    desc: '考场压轴大题极其冷僻刁钻，全省仅数人敢于动笔。时间仅剩最后二十分钟：',
    choices: [
      {
        text: '跳出常规解法套路 · 构造辅助函数跨维度奇袭破局',
        outcomeText: '演算草稿铺满三张大纸，绝妙答案跃然纸上！智谋+6，魄力+3；代价：精力-4，体魄-2。',
        effects: { iq: 6, courage: 3, health: -2, sp: -4 },
        tag: '数理奇才'
      },
      {
        text: '严谨回溯基础公理推导 · 确保前序各题无一扣分失误',
        outcomeText: '稳扎稳打以满分总评拔得头筹！智谋+4，操守+4；代价：魄力-1。',
        effects: { iq: 4, clean: 4, courage: -1 },
        tag: '求真求实'
      },
      {
        text: '【畏难交卷】见题型冷僻直接放弃交白卷 · 提前离场避开用脑之苦（畏难弃权陷阱）',
        outcomeText: '临阵退缩错失拔尖录取良机，同侪看轻且心性锐气蒙受严厉挫伤！',
        effects: { courage: -4, resilience: -3, rep: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '明哲保身'
      }
    ]
  },

  // --- 🔬 尖端科技总师赛道专属 (Tech Track) ---
  {
    id: 'tech_cleanroom_glitch',
    title: '🔬 超净微纳光刻间深宵参数漂移排障',
    minAge: 32, maxAge: 80, track: 'tech',
    desc: '国家重点攻关晶圆样品试制步入最后封顶阶段，关键光刻机台却在深夜出现微米级焦平面漂移：',
    choices: [
      {
        text: '彻夜不眠拆解光路干涉仪 · 亲自排查出微小热形变隐患',
        outcomeText: '精度完全复归零误差！首批试制良品率突破98%，智谋+9，声望+8；代价：体魄-5，精力-8。',
        effects: { iq: 9, rep: 8, health: -5, sp: -8 },
        tag: '精益求精'
      },
      {
        text: '编写动态温度自补偿算法 · 从软件层面实现实时自动校准',
        outcomeText: '不仅解决当下危机，更沉淀出一项自主核心发明专利！智谋+8，资金+¥20,000；代价：资金周转-¥4,000，精力-6。',
        effects: { iq: 8, capital: 16000, sp: -6 },
        tag: '算法立功'
      },
      {
        text: '【因循苟且】上报设备故障申请停机避险 · 等待外方售后专家进场排障（平庸纯负陷阱）',
        outcomeText: '虽然避开了连轴通宵的辛苦，但导致国家专项重大节点延误三个月，科研声誉与心性锐气大跌！',
        effects: { rep: -4, courage: -3, resilience: -2, capital: -2000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },
  {
    id: 'tech_wind_tunnel_test',
    title: '🚀 超高声速激波风洞极端吹风测试',
    minAge: 22, maxAge: 83, track: 'tech',
    desc: '新型空天飞行器耐热材料面临12马赫高超声速风洞试验考验，高温燃气流激荡，测控传感器读数逼近临界极限：',
    choices: [
      {
        text: '咬定青山不放松 · 坚决按照极限工况吹满全测试时长',
        outcomeText: '材料经受住熔蚀极限考验，斩获全套无价真实物理载荷数据！大局声望+9，智谋+8；代价：体魄-4，耗资-¥5,000。',
        effects: { rep: 9, iq: 8, courage: 6, health: -4, capital: -5000 },
        tag: '极限淬火'
      },
      {
        text: '适时微调引射流量分级释压 · 最大限度保全昂贵样机完整性',
        outcomeText: '保全核心试件并精准捕获临界相变曲线，为后续定型节约巨额经费！资金+¥25,000，智谋+7；代价：声望-3，魄力-2。',
        effects: { capital: 25000, iq: 7, rep: -3, courage: -2 },
        tag: '审时度势'
      },
      {
        text: '【明哲保身】见温度飙升慌忙提前关闭主阀门 · 虽保全了样机却导致全套飞行极限参数完全落空（消极避风陷阱）',
        outcomeText: '一味退缩推诿不仅浪费了昂贵吹风配额，更令试飞指挥部大失所望，行业声誉与科研锐气蒙受严厉损耗！',
        effects: { rep: -5, courage: -4, resilience: -3 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '明哲保身'
      }
    ]
  },
  {
    id: 'tech_quantum_bench',
    title: '🌌 量子纠缠计算原型机长相干性突破',
    minAge: 42, maxAge: 68, track: 'tech',
    desc: '超导量子比特面临稀释制冷机高频噪声干扰，相干退相干时间陷入瓶颈，国内外顶尖学者皆在屏息观望：',
    choices: [
      {
        text: '创新设计双层对称结超导回路 · 压制环境磁通磁通噪声',
        outcomeText: '量子相干时间暴涨四倍！在全球顶尖期刊发表重磅封面长文，智谋+10，声望+8；代价：体魄-5，精力-8。',
        effects: { iq: 10, rep: 8, health: -5, sp: -8 },
        tag: '量子突破'
      },
      {
        text: '搭建模块化容错量子纠错阵列 · 构建可扩展工程架构',
        outcomeText: '率先迈出工程实用化关键一步，获得国家重大科技专项重点资助！资金+¥35,000，声望+7；代价：清廉-4，精力-6。',
        effects: { capital: 35000, rep: 7, clean: -4, sp: -6 },
        tag: '工程拓荒'
      },
      {
        text: '【因循苟且】放宽相干判定数学阈值 · 用统计模糊法制造虚假收敛敷衍结题（学术自欺陷阱）',
        outcomeText: '虚假成果在国际复现实验中被公开质疑，不仅声誉扫地更面临科研诚信调查！',
        effects: { clean: -5, rep: -5, resilience: -3, capital: -3000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },

  // --- 🏭 先进制造领航者赛道专属 (Industry Track) ---
  {
    id: 'ind_five_axis_spindle',
    title: '⚙️ 五轴高端工业母机主轴微振公差突破',
    minAge: 34, maxAge: 83, track: 'industry',
    desc: '加工航发复杂叶轮的高端母机主轴在高速旋转时产生3微米动态跳动，外方技术封锁拒绝提供关键轴承参数：',
    choices: [
      {
        text: '联合老八级工匠带头人 · 纯手工刮研超硬合金滑动导轨',
        outcomeText: '工匠精神与现代力学完美交融！跳动公差被死死锁在0.5微米以内，魄力+8，声誉+9；代价：体魄-5，精力-8。',
        effects: { courage: 8, rep: 9, health: -5, sp: -8 },
        tag: '大国工匠'
      },
      {
        text: '自主研发主动磁悬浮减振阻尼系统 · 彻底颠覆机械轴承',
        outcomeText: '开创性技术路线引发全行业震动，企业斩获数亿元订单！资金+¥40,000，智谋+8；代价：清廉-3，精力-6。',
        effects: { capital: 40000, iq: 8, clean: -3, sp: -6 },
        tag: '磁悬浮颠覆'
      },
      {
        text: '【妥协退让】下调切削转速与进给参数 · 牺牲零件精度避开微振超差报警（平庸纯负陷阱）',
        outcomeText: '造出的叶轮因公差超标被军工验收组整批退回，企业不仅承担违约损失，信誉亦一落千丈！',
        effects: { rep: -4, courage: -4, capital: -3000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '妥协退让'
      }
    ]
  },
  {
    id: 'ind_battery_welding_yield',
    title: '🔋 新能源动力电池极耳超声波高速焊接良率',
    minAge: 42, maxAge: 65, track: 'industry',
    desc: '产线年产数亿只电池电芯，超声波极耳虚焊率居高不下，直接决定动力总成安全性与国际车企供应链认证：',
    choices: [
      {
        text: '引入高速AI机器视觉实时熔深检测 · 实现飞拍毫秒剔除',
        outcomeText: '产线不良率骤降至PPM级，通过严苛车规认证！声望+8，智谋+7；代价：资金投入-¥6,000，精力-6。',
        effects: { rep: 8, iq: 7, capital: -6000, sp: -6 },
        tag: '零缺陷制造'
      },
      {
        text: '改良超声波换能器声学阻抗匹配设计 · 从物理源头消除过烧',
        outcomeText: '流水线产速提升50%，树立全行业灯塔标杆！资金+¥35,000，智谋+8；代价：体魄-4，精力-5。',
        effects: { capital: 35000, iq: 8, health: -4, sp: -5 },
        tag: '灯塔智造'
      },
      {
        text: '【息事宁人】调低出厂检测灵敏度门槛 · 隐瞒虚焊批次蒙混出厂（重大质量违规陷阱）',
        outcomeText: '首批电池包在路测中发生短路自燃，被主管部门责令全线停产整顿，清廉与声望遭受毁灭性打击！',
        effects: { clean: -6, rep: -5, capital: -4000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '掩盖缺陷'
      }
    ]
  },
  {
    id: 'ind_mega_bridge_subsea',
    title: '🌉 世纪跨海通道深水超大型沉管浮运对接',
    minAge: 41, maxAge: 68, track: 'industry',
    desc: '八万吨巨型预制沉管要在深海暗流汹涌的伶仃洋底实现毫米级无缝对接，稍有闪失后果不堪设想：',
    choices: [
      {
        text: '亲自登上浮运指挥船 · 顶风破浪通宵靠前靠准指挥',
        outcomeText: '巨舰沉渊，分秒不差精准入海！创造世界深海沉管安装奇迹！声望+10，魄力+8；代价：体魄-6，精力-8。',
        effects: { rep: 10, courage: 8, health: -6, sp: -8 },
        tag: '定海神针'
      },
      {
        text: '采用北斗毫米级卫星差分定位与水下声呐双重实时监控',
        outcomeText: '精密卫星测量助力传统水工，沉管毫米级归位！资金+¥30,000，智谋+9；代价：资金协调-¥8,000，精力-5。',
        effects: { capital: 22000, iq: 9, sp: -5 },
        tag: '北斗导航'
      },
      {
        text: '【明哲保身】借洋流风浪为由延期下沉 · 避开个人风险却造成全线工期停滞（平庸纯负陷阱）',
        outcomeText: '借口避险导致几十艘大型浮吊与工程船窝工待命，每日烧钱数百万，各方声讨声中威信扫地！',
        effects: { rep: -5, courage: -4, resilience: -3, capital: -3000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '明哲保身'
      }
    ]
  },

  // --- 🌾 乡村振兴先锋赛道专属 (Grassroots Track) ---
  {
    id: 'grass_saline_rice_pilot',
    title: '🌾 千亩滨海重度盐碱地海水稻试验种植',
    minAge: 18, maxAge: 83, track: 'grassroots',
    desc: '面对含盐量千分之六的不毛荒滩，祖辈未曾长出一粒粮食，乡亲们心中打鼓，你决心打赢这场生态改土仗：',
    choices: [
      {
        text: '同科研专家一道挽裤腿扎在泥地 · 精密调配暗管排盐洗碱系统',
        outcomeText: '金秋时节荒滩泛起金黄！亩产突破450公斤，大局声望+9，清廉+7；代价：体魄-5，精力-7。',
        effects: { rep: 9, clean: 7, health: -5, sp: -7 },
        tag: '沧海变桑田'
      },
      {
        text: '成立全村共富农业合作社 · 发展盐碱水产与耐盐蔬菜立体复合生态',
        outcomeText: '全村集体经济年增收超百万元，分红盖新房！资金+¥25,000，情商+7；代价：体魄-4，精力-5。',
        effects: { capital: 25000, eq: 7, health: -4, sp: -5 },
        tag: '共富带头人'
      },
      {
        text: '【因循苟且】按普通荒地草草播种应付上级视察 · 坐视苗苗枯死任其撂荒（平庸纯负陷阱）',
        outcomeText: '弄虚作假不仅让试验田绝收，更被村民痛骂形式主义花架子，口碑与操守全面崩溃！',
        effects: { rep: -4, courage: -3, resilience: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },
  {
    id: 'grass_watershed_flood_mitigation',
    title: '🏞️ 特大山洪泥石流来袭前群众撤离与生态拦蓄',
    minAge: 22, maxAge: 86, track: 'grassroots',
    desc: '气象台发布特大暴雨红色预警，深山峡谷上游地质灾害隐患点裂缝扩大，危及下游数千村民生命安全：',
    choices: [
      {
        text: '打着手电通宵挨家挨户敲门背老人孩子 · 确保一人不落转移至安全高地',
        outcomeText: '山洪倾泻而下，全村无一人伤亡！乡亲们含泪送来感谢信，声望+10，清廉+8，魄力+7；代价：体魄-6，精力-8。',
        effects: { rep: 10, clean: 8, courage: 7, health: -6, sp: -8 },
        tag: '人民至上'
      },
      {
        text: '启动阶梯式生态蓄滞洪池分级拦洪削峰 · 保障下游核心农田不受冲毁',
        outcomeText: '灾后良田迅速复耕，损失降到最低！智谋+8，资金+¥15,000；代价：防洪应急资金-¥5,000，精力-6。',
        effects: { iq: 8, capital: 10000, rep: 6, sp: -6 },
        tag: '科学排险'
      },
      {
        text: '【明哲保身】仅在广播里喊几声避难通知 · 自身反锁在防汛二楼避雨不出（失职推诿陷阱）',
        outcomeText: '因通知不到位导致数位老人险遭山洪围困，被纪监部门当场停职通报，前程与心性尽失！',
        effects: { rep: -6, courage: -5, resilience: -3 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '明哲保身'
      }
    ]
  },
  {
    id: 'grass_digital_coldchain',
    title: '🚚 偏远大山高原有机鲜果冷链物流直达网',
    minAge: 28, maxAge: 83, track: 'grassroots',
    desc: '高原深处成熟的高品质雪桃鲜脆欲滴，却苦于山路崎岖、采摘后48小时内极易腐烂变质，销路受阻：',
    choices: [
      {
        text: '引入气调预冷保鲜仓与冷链专线 · 打通直飞沿海一线商超绿色通道',
        outcomeText: '鲜果溢价三倍当日售罄，打响原产地金字招牌！资金+¥25,000，声望+7；代价：体魄-4，精力-6。',
        effects: { capital: 25000, rep: 7, eq: 6, health: -4, sp: -6 },
        tag: '品牌强农'
      },
      {
        text: '发展深加工冻干果干与文旅采摘节 · 打造农文旅融合百里生态长廊',
        outcomeText: '古村落化身生态文旅胜地，青年争相返乡创业！情商+8，声望+7；代价：筹备垫资-¥4,000，精力-5。',
        effects: { eq: 8, rep: 7, capital: -4000, sp: -5 },
        tag: '农旅融合'
      },
      {
        text: '【因循苟且】任凭鲜果在村头烂掉 · 对上推诿道路不通对下打发茶水敷衍（平庸纯负陷阱）',
        outcomeText: '村民一整年心血化为烂泥，怒砸村委门窗，你的群众信赖彻底归零！',
        effects: { rep: -4, eq: -3, capital: -2000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },

  // --- 🌐 丝路商贸出海领袖赛道专属 (Trade Track) ---
  {
    id: 'trade_canton_fair_contract',
    title: '🌍 广交会跨国重工业成套装备谈判博弈',
    minAge: 21, maxAge: 83, track: 'trade',
    desc: '外方跨国采购巨头仗势压价，企图以极其苛刻的延期付款条件迫使我方让步：',
    choices: [
      {
        text: '不卑不亢摆事实亮过硬产品参数 · 坚守合理价格与知识产权底线',
        outcomeText: '外商最终被中国工业制造硬实力折服，签署数千万大单！魄力+8，声望+8，资金+¥25,000；代价：体魄-4，精力-6。',
        effects: { courage: 8, rep: 8, capital: 25000, health: -4, sp: -6 },
        tag: '商战亮剑'
      },
      {
        text: '附赠全生命周期数字化远程运维方案 · 用顶级增值服务打动全场',
        outcomeText: '开辟“产品+服务”全新出海赛道！智谋+8，情商+7；代价：系统适配费-¥5,000，精力-5。',
        effects: { iq: 8, eq: 7, capital: -5000, sp: -5 },
        tag: '服务出海'
      },
      {
        text: '【割肉妥协】全盘接受外商严苛霸王条款 · 倒贴违约金亏损甩卖成套装备（损公求和陷阱）',
        outcomeText: '看似签成了外贸大单，但交货期连连亏损遭上级追责，行业声望与资金双重折损！',
        effects: { capital: -12000, rep: -4, courage: -3 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '割肉妥协'
      }
    ]
  },
  {
    id: 'trade_digital_silkroad',
    title: '🚢 丝路跨境海运智慧集装箱港区物流联运',
    minAge: 42, maxAge: 68, track: 'trade',
    desc: '国际航运枢纽遭遇多船集中到港泊位紧张，传统纸质提单清关流转缓慢造成严重滞港：',
    choices: [
      {
        text: '推行全流程区块链无纸化电子提单与智能理货调度系统',
        outcomeText: '集装箱通关周转提速60%，港口吞吐量创历史新高！资金+¥30,000，声誉+8；代价：体魄-5，精力-6。',
        effects: { capital: 30000, rep: 8, iq: 7, health: -5, sp: -6 },
        tag: '数字丝路'
      },
      {
        text: '开拓中欧班列铁海联运国际多式联运大动脉 · 开辟陆海新通道',
        outcomeText: '内陆腹地直通亚欧大陆，沿线数十家制造业龙头争相签约！声望+9，魄力+7；代价：前期协调-¥6,000，精力-6。',
        effects: { rep: 9, courage: 7, capital: -6000, sp: -6 },
        tag: '陆海内外联动'
      },
      {
        text: '【因循苟且】按惯常老黄历排队放关 · 坐视千艘货轮在外海抛锚滞留（平庸纯负陷阱）',
        outcomeText: '巨额滞港费引来国际船东联合索赔抗议，口岸通关形象蒙羞，口碑跌落谷底！',
        effects: { rep: -4, courage: -3, resilience: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },

  // --- 🏛️ 杏坛科教一代宗师赛道专属 (Education Track) ---
  {
    id: 'edu_nat_grant_defense',
    title: '🏛️ 国家自然科学基金重大前沿跨学科课题答辩',
    minAge: 22, maxAge: 86, track: 'education',
    desc: '面对几十位国内外顶尖院士评审组，你的课题挑战了传统教科书经典理论模型：',
    choices: [
      {
        text: '沉着冷静以详实严谨的实验重复数据与公理推导演示',
        outcomeText: '全场评审起立鼓掌！以全票优等成绩获批国家顶尖资助！智谋+9，声誉+8，魄力+6；代价：体魄-4，精力-7。',
        effects: { iq: 9, rep: 8, courage: 6, health: -4, sp: -7 },
        tag: '学术泰斗'
      },
      {
        text: '重点阐述该基础理论突破在下一代产业革命中的深远应用前景',
        outcomeText: '打动跨界实业评委，联合企业追加产业转化投资！资金+¥30,000，声望+7；代价：精力-5。',
        effects: { capital: 30000, rep: 7, eq: 6, sp: -5 },
        tag: '经世致用'
      },
      {
        text: '【删削随众】主动删去论文中颠覆性前沿推论 · 迎合评委旧有偏见以求平庸过关（学术妥协陷阱）',
        outcomeText: '虽然侥幸保住普通面上项目，但失去了开宗立派的大气象，令同行叹惋锐气全无！',
        effects: { rep: -4, courage: -4, iq: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '因循苟且'
      }
    ]
  },
  {
    id: 'edu_young_talents_academy',
    title: '🎓 设立青年英才尖兵拔尖班言传身教',
    minAge: 35, maxAge: 88, track: 'education',
    desc: '从全国精选三十名数理拔尖少年，面对名利诱惑与国外高薪争抢，如何立德树人培养大国栋梁：',
    choices: [
      {
        text: '以两弹一星功勋先辈精神铸魂 · 引导学子树立科技报国志向',
        outcomeText: '学子们毕业全员扎根国防科研关键一线，后继有人！清廉+8，声望+9；代价：体魄-4，精力-7。',
        effects: { clean: 8, rep: 9, courage: 6, health: -4, sp: -7 },
        tag: '薪火相传'
      },
      {
        text: '倾囊相授平生治学笔记与核心学术框架 · 支持青年学者独立掌舵重大项目',
        outcomeText: '门下弟子数年间斩获多项国际青年桂冠，桃李满天下！智谋+8，声望+8；代价：精力-6。',
        effects: { iq: 8, rep: 8, eq: 6, sp: -6 },
        tag: '桃李争芳'
      },
      {
        text: '【放任自流】只顾自身发表论文拉经费 · 放任拔尖学子被商业中介买断出国流失（为师失格陷阱）',
        outcomeText: '尖子生纷纷转投华尔街金融机构，国家重点实验室后继无人，学术界痛心疾首！',
        effects: { rep: -4, clean: -3, courage: -3 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '明哲保身'
      }
    ]
  },

  // ==========================================
  // 🌸 二十四节气与时令物候百态 (Solar Terms & Seasonal Rhythm)
  // ==========================================
  {
    id: 'solar_lichun',
    title: '🌱 立春迎春 · 大地回春与基层春耕备播动员',
    minAge: 20, maxAge: 86, track: 'agri',
    desc: '东风解冻，春回大地。你走进田间地头察看冬小麦返青情况，农技推广站正组织良种与环保化肥集中调拨：',
    choices: [
      {
        text: '协调农机专业合作社组织跨区深翻耕作作业',
        outcomeText: '机械化作业大幅提升翻耕效率，乡亲们充满底气！情商+6，声望+5；代价：精力-4。',
        effects: { eq: 6, rep: 5, sp: -4 },
        tag: '春耕备播'
      },
      {
        text: '深入农技大棚为农户普及节水滴灌新技术',
        outcomeText: '实用农业科技深得民心，节水环保理念生根！智谋+6，清廉+5；代价：精力-4。',
        effects: { iq: 6, clean: 5, sp: -4 },
        tag: '节水春耕'
      },
      {
        text: '【平庸敷衍】在办公室照抄往年春耕发文 · 既不下田也不调运化肥（怠政敷衍陷阱）',
        outcomeText: '贻误了翻耕最佳时节导致春旱减产，村民怨声载道，基层考评亮黄牌！',
        effects: { rep: -3, courage: -2, capital: -1500 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '平庸敷衍'
      }
    ]
  },
  {
    id: 'solar_yushui',
    title: '🌧️ 雨水润物 · 连夜加固山区小型水库溢洪闸',
    minAge: 19, maxAge: 83, track: 'gov',
    desc: '春雨绵绵，河湖微涨。山区小型水库溢洪道突现少量浮渣漂木聚集，汛期前巡检刻不容缓：',
    choices: [
      {
        text: '穿上雨衣带领民兵连夜清捞溢洪道漂木杂物',
        outcomeText: '溢洪闸恢复畅通，安全隐患排除！魄力+6，声望+5；代价：体魄-3，精力-5。',
        effects: { health: -3, courage: 6, rep: 5, sp: -5 },
        tag: '雨水清患'
      },
      {
        text: '建立数字化库水位每日报送与联动预警机制',
        outcomeText: '防汛预警敏捷高效，全库区安稳无虞！智谋+6，情商+5；代价：精力-4。',
        effects: { iq: 6, eq: 5, sp: -4 },
        tag: '数智防汛'
      },
      {
        text: '【避险不前】借雨势太大为由推托巡查 · 待在值班室打扑克消遣（玩忽职守陷阱）',
        outcomeText: '浮木堵塞溢洪道造成农田倒灌受灾，防汛纪律追责令你颜面无存！',
        effects: { rep: -3, resilience: -2, courage: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '避险不前'
      }
    ]
  },
  {
    id: 'solar_jingzhe',
    title: '⚡ 惊蛰春雷 · 老厂区首台数控机床换装通电试机',
    minAge: 21, maxAge: 84, track: 'industry',
    desc: '春雷始鸣，万物萌发。老旧车间新采购的国产高精度数控机床组装完毕，迎来首次全负荷通电自检：',
    choices: [
      {
        text: '守在电控柜旁用示波器排查每一路抗干扰屏蔽',
        outcomeText: '伺服电机平稳启动转速分毫不差！智谋+7，魄力+5；代价：体魄-3，精力-5。',
        effects: { iq: 7, courage: 5, health: -3, sp: -5 },
        tag: '惊蛰开机'
      },
      {
        text: '组织青年学徒观摩通电排障全过程并写下操作手记',
        outcomeText: '老带新现场教学成效显著，青年工匠快速成长！情商+6，声望+5；代价：精力-4。',
        effects: { eq: 6, rep: 5, sp: -4 },
        tag: '工匠传薪'
      },
      {
        text: '【得过且过】不看示波器直接合闸盲试 · 侥幸心理烧坏伺服主板驱动模块（盲目蛮干陷阱）',
        outcomeText: '新机床当场冒起白烟停机报废，数万元维修费与严厉批评接踵而至！',
        effects: { rep: -3, iq: -2, capital: -2000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '得过且过'
      }
    ]
  },
  {
    id: 'solar_chunfen',
    title: '⚖️ 春分昼夜 · 重点工程中期进度平衡与物资盘点',
    minAge: 20, maxAge: 83, track: 'industry',
    desc: '春分麦齐，日夜均分。季度收尾关口，项目部物资台账与施工进度需进行一次全面校准盘点：',
    choices: [
      {
        text: '坚持台账与实物逐一过磅核验 · 杜绝丝毫虚报冒领',
        outcomeText: '账实分毫不差，清廉自律受好评！清廉+7，声望+5；代价：体魄-3，精力-4。',
        effects: { clean: 7, rep: 5, health: -3, sp: -4 },
        tag: '廉政核算'
      },
      {
        text: '优化并联工序时间表 · 缩短材料周转与吊装等待时间',
        outcomeText: '工期节约整整一周！智谋+6，资金+¥20,000；代价：逆商-2。',
        effects: { iq: 6, capital: 20000, resilience: -2 },
        tag: '精益工序'
      },
      {
        text: '【盲目平账】因进度吃紧在模糊物资单上大笔一挥盲签平账（平庸纯负陷阱）',
        outcomeText: '审计组突击抽查发现钢筋亏空数吨，违规签批被处以降职记过，清名尽失！',
        effects: { clean: -4, rep: -3, capital: -2000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '盲目平账'
      }
    ]
  },
  {
    id: 'solar_qingming',
    title: '🌿 清明寄思 · 烈士陵园擦拭墓碑与红色家风传承',
    minAge: 18, maxAge: 70, track: 'gov',
    desc: '清明时节，翠柏凝春。你带领青年一代前往烈士纪念碑敬献花圈，抚摸汉白玉碑文重温峥嵘岁月：',
    choices: [
      {
        text: '深情讲述当年筑路英烈‘一不怕苦二不怕死’的拼搏事迹',
        outcomeText: '在场青年热泪盈眶誓以身许国！心性抗逆+7，声望+5；代价：精力-4。',
        effects: { resilience: 7, rep: 5, sp: -4 },
        tag: '忠魂砥砺'
      },
      {
        text: '义务协助管理处修剪陵园松柏并擦洗无名烈士墓碑',
        outcomeText: '躬身实践感悟初心真谛！清廉自守+7，情商+5；代价：精力-4。',
        effects: { clean: 7, eq: 5, sp: -4 },
        tag: '初心不染'
      },
      {
        text: '【形式走场】签到处打卡拍完合影便匆匆溜走聚餐消遣（浮躁虚伪陷阱）',
        outcomeText: '被老革命看在眼里当众斥责作风虚浮，声誉与心性严重受损！',
        effects: { rep: -3, courage: -2, clean: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '形式走场'
      }
    ]
  },
  {
    id: 'solar_guyu',
    title: '🍵 谷雨采茶 · 山区生态茶园雨前春茶收摘与电商直通',
    minAge: 21, maxAge: 85, track: 'agri',
    desc: '谷雨初晴，茶山青翠。结对帮扶山村的数百亩高山生态茶迎来采摘黄金期，茶农们正为销路发愁：',
    choices: [
      {
        text: '牵线高校农学团队引进低温烘焙提香新技术保质保量',
        outcomeText: '春茶品质大幅提升！智谋+6，资金+¥20,000；代价：精力-4。',
        effects: { iq: 6, capital: 20000, sp: -4 },
        tag: '科技兴茶'
      },
      {
        text: '联系省城大型工会直采开设‘大山清茗’专柜直销',
        outcomeText: '春茶三日内抢购一空！情商+7，声望+5；代价：协调垫资-¥2,000，精力-4。',
        effects: { eq: 7, rep: 5, capital: -2000, sp: -4 },
        tag: '助农直采'
      },
      {
        text: '【放任滞销】不闻不问任凭雨前鲜叶老化粗烂在茶树枝头（漠视民生陷阱）',
        outcomeText: '茶农整年辛劳颗粒无收聚众上访，帮扶考核全省垫底，前途暗淡！',
        effects: { rep: -3, eq: -2, capital: -1500 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '放任滞销'
      }
    ]
  },
  {
    id: 'solar_lixia',
    title: '☀️ 立夏尝新 · 社区邻里夏至长桌宴与老邻居聚首',
    minAge: 20, maxAge: 88, track: 'gov',
    desc: '立夏节气，绿树浓阴夏日长。老院子里的邻居们搬出长桌，煮起豌豆糯米饭和立夏蛋，温情满溢：',
    choices: [
      {
        text: '端出自调凉茶分发给街坊老小唠邻里温情',
        outcomeText: '邻里欢声笑语宛如一家！情商+6，抗逆+5；代价：买茶开销-¥1,500。',
        effects: { eq: 6, resilience: 5, capital: -1500 },
        tag: '邻里和睦'
      },
      {
        text: '借聚会之机向大院退休老职工调研基层急难愁盼小事',
        outcomeText: '收集到多条公厕与照明建议！声望+6，清廉+5；代价：精力-4。',
        effects: { rep: 6, clean: 5, sp: -4 },
        tag: '民情民意'
      },
      {
        text: '【紧闭房门】嫌吵闹嫌邻居麻烦，在屋里反锁大门塞上耳机（孤僻自私陷阱）',
        outcomeText: '将上门送立夏蛋的老街坊拒之门外，人情口碑败尽，孤立无援！',
        effects: { eq: -3, rep: -2, resilience: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '紧闭房门'
      }
    ]
  },
  {
    id: 'solar_mangzhong',
    title: '🚜 芒种抢收 · 连夜抢收麦浪与金黄麦堆上的欢歌',
    minAge: 18, maxAge: 86, track: 'agri',
    desc: '芒种芒种，样样要种。天气预报两日后有雷阵雨，千亩成熟麦浪需通宵抢收脱粒进仓：',
    choices: [
      {
        text: '戴上草帽亲自登上联合收割机通宵作业抢麦',
        outcomeText: '抢在暴雨前将麦粒颗粒归仓！声望+7，魄力+5；代价：体魄-4，精力-6。',
        effects: { rep: 7, courage: 5, health: -4, sp: -6 },
        tag: '龙口夺粮'
      },
      {
        text: '协调空置粮库与通风烘干塔通宵开机降水防霉',
        outcomeText: '新麦水分降至安全标准！智谋+6，资金+¥22,000；代价：体魄-2，精力-4。',
        effects: { iq: 6, capital: 22000, health: -2, sp: -4 },
        tag: '保粮安仓'
      },
      {
        text: '【避雨误农】嫌夜风阴冷推脱开收割机 · 听任金黄麦穗倒伏在暴雨泥泞中发芽霉烂（平庸纯负陷阱）',
        outcomeText: '千亩良田颗粒难收酿成重大生产责任事故，受到撤职查办处分！',
        effects: { rep: -4, courage: -3, capital: -2000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '避雨误农'
      }
    ]
  },
  {
    id: 'solar_xiazhi',
    title: '🍉 夏至挥汗 · 盛夏车间慰问与送清凉降温改造',
    minAge: 20, maxAge: 85, track: 'industry',
    desc: '夏至昼最长，车间熔炉温度高达40度。一线工人们挥汗如雨赶制国家战略重型锻件：',
    choices: [
      {
        text: '为全车间争取安装负压水帘风机与定点冷风导管',
        outcomeText: '工位温度立降6度，干劲冲天！情商+7，声望+5；代价：加装经费-¥5,000，精力-4。',
        effects: { eq: 7, rep: 5, capital: -5000, sp: -4 },
        tag: '送凉到岗'
      },
      {
        text: '亲自熬制绿豆老冰糖清凉汤每天送到机床炉前',
        outcomeText: '工友们倍感关怀温情！抗逆+6，清廉+6；代价：体魄-2，精力-4。',
        effects: { resilience: 6, clean: 6, health: -2, sp: -4 },
        tag: '润心至诚'
      },
      {
        text: '【视若无睹】自己躲在有空调的总师办公室不出门 · 截留劳保解暑清凉费充作小金库（贪墨违规陷阱）',
        outcomeText: '车间数名骨干中暑倒地，私设小金库遭纪检查处，操守尽失身败名裂！',
        effects: { clean: -5, rep: -4, resilience: -3 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '视若无睹'
      }
    ]
  },
  {
    id: 'solar_dashu',
    title: '🔥 大暑伏天 · 电力负荷尖峰保供与变电站红外测温',
    minAge: 21, maxAge: 83, track: 'industry',
    desc: '大暑正值三伏中，全城空调用电冲顶。区域枢纽变电站主变压器满负荷运行，接头处温度逼近警界线：',
    choices: [
      {
        text: '手持红外热像仪在滚烫设备区逐个卡头测温排险',
        outcomeText: '消除松动隐患避免停电事故！声望+7，魄力+5；代价：体魄-4，精力-6。',
        effects: { rep: 7, courage: 5, health: -4, sp: -6 },
        tag: '伏天巡检'
      },
      {
        text: '实施大工业用户错峰用电与绿电调峰动态补偿机制',
        outcomeText: '平稳削减峰值负荷！智谋+7，资金+¥25,000；代价：精力-5。',
        effects: { iq: 7, capital: 25000, sp: -5 },
        tag: '柔性调峰'
      },
      {
        text: '【心存侥幸】懒得下车间暴晒测温 · 谎报仪表一切正常在阴凉处打瞌睡（玩忽职守陷阱）',
        outcomeText: '过热接头短路引发变电站火灾大停电，造成重大损失并被移送司法机关！',
        effects: { clean: -5, rep: -4, courage: -3, capital: -3000 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '心存侥幸'
      }
    ]
  },
  {
    id: 'solar_bailu',
    title: '💧 白露采茶 · 白露茶清香甘冽与大山老茶客论道',
    minAge: 22, maxAge: 88, track: 'agri',
    desc: '白露秋分夜，一夜凉一夜。深山秋茶别有一番沉稳幽香，偶遇山中隐居的退休老农学家对饮品茗：',
    choices: [
      {
        text: '虚心求教老学者半生土壤改良与梯田保肥心法',
        outcomeText: '获得宝贵第一手乡土笔记！智谋+7，抗逆+5；代价：精力-4。',
        effects: { iq: 7, resilience: 5, sp: -4 },
        tag: '虚己受教'
      },
      {
        text: '畅谈当代国家粮食安全与大国种业自立自强宏图',
        outcomeText: '老学者抚掌大赞后生可畏！声望+7，情商+5；代价：精力-4。',
        effects: { rep: 7, eq: 5, sp: -4 },
        tag: '天下粮仓'
      },
      {
        text: '【傲慢拒谏】自恃名牌大学毕业对老学者泥腿子经验嗤之以鼻（狂妄自大陷阱）',
        outcomeText: '盲目引进外来化肥导致梯田严重板结反酸，农业技术界纷纷侧目，声名受损！',
        effects: { rep: -3, resilience: -2, iq: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '傲慢拒谏'
      }
    ]
  },
  {
    id: 'solar_qiufen',
    title: '🍎 秋分庆丰 · 金秋晒秋大会与农特产丰收大集',
    minAge: 18, maxAge: 87, track: 'agri',
    desc: '秋分秋分，昼夜平分。大地金黄谷物飘香，全县举办金秋丰收大集，红彤彤的苹果与金黄玉米堆成小山：',
    choices: [
      {
        text: '登上农机大篷车向丰收劳模颁发大红花与科技农具',
        outcomeText: '劳动价值获全社会礼赞！情商+7，声望+7；代价：精力-4。',
        effects: { eq: 7, rep: 7, sp: -4 },
        tag: '致敬劳作'
      },
      {
        text: '引入现代冷链物流直达仓确保果蔬出山不烂一果',
        outcomeText: '果农收益翻倍！资金+¥25,000，智谋+6；代价：冷链补贴-¥4,000，精力-4。',
        effects: { capital: 21000, iq: 6, sp: -4 },
        tag: '冷链助农'
      },
      {
        text: '【截留盘剥】在丰收集市上向果农乱设摊位费与过秤管理费（盘剥民利陷阱）',
        outcomeText: '被果农联名举报到纠风办，贪墨所得被全额收缴并记大过处分！',
        effects: { clean: -5, rep: -4, courage: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '截留盘剥'
      }
    ]
  },
  {
    id: 'solar_dongzhi',
    title: '🥟 冬至数九 · 军民共建连队热腾腾的饺子宴',
    minAge: 18, maxAge: 70, track: 'gov',
    desc: '冬至大如年，人间小团圆。你来到基层共建哨所，与战士们围着大桌一边包各种形状的饺子一边拉家常：',
    choices: [
      {
        text: '跟战士们比赛包饺子速度，将好运铜钱饺盛给最年轻的新兵',
        outcomeText: '欢声笑语暖透冬日哨所！情商+7，声望+6；代价：食材花销-¥2,000，精力-4。',
        effects: { eq: 7, rep: 6, capital: -2000, sp: -4 },
        tag: '鱼水深情'
      },
      {
        text: '向基层官兵赠送科技图书与全套健康体检理疗仪',
        outcomeText: '科技强军拥军暖心！清廉+7，声誉+6；代价：购书费-¥3,000。',
        effects: { clean: 7, rep: 6, capital: -3000 },
        tag: '拥军崇德'
      },
      {
        text: '【推脱慰问】嫌哨所偏远山高路滑，推掉慰问在机关小食堂吃小灶（脱离群众陷阱）',
        outcomeText: '共建部队指战员深感冷落，军地关系降至冰点，政治大局考核扣分！',
        effects: { rep: -3, eq: -3, courage: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '推脱慰问'
      }
    ]
  },
  {
    id: 'solar_dahan',
    title: '🏮 大寒迎春 · 辞旧迎新写春联与守岁家国情怀',
    minAge: 18, maxAge: 70, track: 'art',
    desc: '大寒迎年，喜气渐浓。你铺开大红宣纸，饱蘸浓墨为大院工友与乡里街坊书写新年春联：',
    choices: [
      {
        text: '挥毫写下“国泰民安千重锦，风调雨顺万里春”赠与街坊',
        outcomeText: '墨香四溢赞誉如潮！声望+7，情商+5；代价：买纸墨开销-¥1,000，精力-3。',
        effects: { rep: 7, eq: 5, capital: -1000, sp: -3 },
        tag: '翰墨同欢'
      },
      {
        text: '组织青年志愿者为孤寡老人家中打扫除尘换贴窗花门神',
        outcomeText: '美德暖透寒冬！清廉+7，抗逆+5；代价：体魄-2，精力-3。',
        effects: { clean: 7, resilience: 5, health: -2, sp: -3 },
        tag: '岁暮大爱'
      },
      {
        text: '【闭门自私】嫌街坊求字麻烦，拉下卷帘门贴出“每副春联收费五十元”告示（市侩财迷陷阱）',
        outcomeText: '被大院邻里指着脊梁骨痛骂掉进钱眼里，声誉彻底扫地，人人鄙弃！',
        effects: { rep: -4, clean: -3, eq: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '闭门自私'
      }
    ]
  },

  // ==========================================
  // 📻 时代记忆与人间烟火百态 (Era Lifestyle Memories)
  // ==========================================
  {
    id: 'era_bicycle_flying_pigeon',
    title: '🚲 时代印记 · 攒下半年津贴购入第一辆飞鸽牌全链套自行车',
    minAge: 20, maxAge: 32, track: 'industry',
    desc: '凭票购得一辆锃亮的墨绿色加重全链套自行车，大院里邻里街坊纷纷围拢过来啧啧称赞：',
    choices: [
      {
        text: '周末细心用缝纫机油擦拭每一颗电镀车圈与辐条',
        outcomeText: '车铃清脆悦耳！体魄+5，智谋+4；代价：保养耗资-¥2,000。',
        effects: { health: 5, iq: 4, capital: -2000 },
        tag: '惜物知重'
      },
      {
        text: '大方借给邻里小伙作为相亲迎亲车队头车',
        outcomeText: '街坊赞你慷慨仗义！情商+6，声望+4；代价：逆商-1。',
        effects: { eq: 6, rep: 4, resilience: -1 },
        tag: '睦邻友好'
      },
      {
        text: '【小气避人】生怕车子被刮蹭，用铁链牢牢锁死在床头不准任何人摸（小气自私陷阱）',
        outcomeText: '被大院青年笑话小心眼抠门，落得孤家寡人口碑！',
        effects: { rep: -2, eq: -2, courage: -1 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '小气避人'
      }
    ]
  },
  {
    id: 'era_color_tv_purchase',
    title: '📺 时代换代 · 大院第一台国产彩电引发街坊万人空巷',
    minAge: 24, maxAge: 45, track: 'biz',
    desc: '家里换购了一台18英寸国产彩色电视机，屏幕亮起那抹鲜艳色彩时，院里大人小孩挤满了整间客厅：',
    choices: [
      {
        text: '搬出长条板凳备好大碗炒瓜子招待街坊邻里共同看春晚',
        outcomeText: '客厅充满欢声笑语！情商+6，声望+5；代价：零食茶水-¥3,000。',
        effects: { eq: 6, rep: 5, capital: -3000 },
        tag: '乐享邻里'
      },
      {
        text: '精心调校室内八木天线方向实现无雪花清晰接收',
        outcomeText: '无线电技巧让全院称奇！智谋+5，魄力+4；代价：体魄-2。',
        effects: { iq: 5, courage: 4, health: -2 },
        tag: '格物致知'
      },
      {
        text: '【拔线锁门】嫌邻居吵闹把彩电电源拔掉谎称机器烧坏（虚伪封闭陷阱）',
        outcomeText: '窗帘后偷偷亮起的彩光被街坊撞见，邻里指责人品虚伪小气！',
        effects: { rep: -3, eq: -2, resilience: -1 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '拔线锁门'
      }
    ]
  },
  {
    id: 'era_pager_beeper',
    title: '📟 时代脉搏 · 数字寻呼机腰间作响与特区创业潮',
    minAge: 26, maxAge: 48, track: 'biz',
    desc: '腰间的数字寻呼机哔哔响起，屏幕显示“168”代码，昔日同窗在特区创办软件工作室邀你洽谈技术合作：',
    choices: [
      {
        text: '在街头公用电话亭回拨电话提供严谨的算法底层架构建议',
        outcomeText: '助力同窗攻克核心逻辑！智谋+6，声望+5；代价：体魄-2，精力-3。',
        effects: { iq: 6, rep: 5, health: -2, sp: -3 },
        tag: '遥通八方'
      },
      {
        text: '坚守岗位本职工作，以个人名义注资两万元种子基金支持其创业',
        outcomeText: '同窗深怀感激带来丰厚回馈！资金+¥25,000，情商+5；代价：清廉-2。',
        effects: { capital: 25000, eq: 5, clean: -2 },
        tag: '远见注资'
      },
      {
        text: '【关机失联】疑神疑鬼认定老同学是搞传销骗钱，当场拉黑关机（封闭避险陷阱）',
        outcomeText: '不仅错失了互联网创业浪潮时代风口，更让多年同窗心寒绝交！',
        effects: { rep: -3, courage: -2, eq: -2 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '关机失联'
      }
    ]
  },
  {
    id: 'era_bullet_train_first_ride',
    title: '🚄 时代飞跃 · 首次试乘国产和谐号高铁体验三小时千里',
    minAge: 35, maxAge: 83, track: 'tech',
    desc: '国产高速铁路干线通车，你受邀参与首次试乘；立在窗台的一枚一元硬币在时速300公里下屹立不倒：',
    choices: [
      {
        text: '凝视窗外飞逝的祖国锦绣山川，写下《大国轨道自强赋》',
        outcomeText: '文字澎湃激昂发表！声望+7，情商+5；代价：车票差旅-¥1,000。',
        effects: { rep: 7, eq: 5, capital: -1000 },
        tag: '大国速度'
      },
      {
        text: '与随车工程师深入探讨受电弓微震与气动降噪数据',
        outcomeText: '提出宝贵工况改善建议！智谋+7，清廉+5；代价：精力-3。',
        effects: { iq: 7, clean: 5, sp: -3 },
        tag: '科技自立'
      },
      {
        text: '【浑浑噩噩】上车便呼呼大睡打呼噜 · 对沿途技术飞跃漠不关心（因循麻木陷阱）',
        outcomeText: '错失与现场高铁研发团队交流结识良机，白白浪费试乘名额！',
        effects: { rep: -2, courage: -2, resilience: -1 },
        isTrapOption: true,
        isPureNegative: true,
        tag: '浑浑噩噩'
      }
    ]
  },
  {
    id: 'era_smartphone_qrcode',
    title: '📱 数字化浪潮 · 智能手机普及与菜市场扫码便民体验',
    minAge: 40, maxAge: 70, track: 'gov',
    desc: '移动支付与智能手机迅速普及，胡同口卖菜的老大爷也挂出了收款二维码，政务窗口面临全面无纸化与适老化改造双重压力：',
    choices: [
      {
        text: '铁腕推进全窗口无纸化一网通办 · 倒逼政务效率跃升',
        statReq: 'courage', reqVal: 68,
        outcomeText: '政务审批时限压缩70%，但连轴督导透支体魄且触动旧惯性！声誉+9，智谋+7；代价：体魄-6，人情-5。',
        effects: { rep: 9, iq: 7, health: -6, eq: -5 },
        failEffects: { rep: -7, eq: -6, health: -5, resilience: -4 },
        failText: '系统切换期引发老年群众排队投诉，受到上级通报批评，声誉与人情双双受损。',
        tag: '数智攻坚'
      },
      {
        text: '保留人工绿色通道并组织社区志愿者驻点辅导老人',
        statReq: 'eq', reqVal: 60,
        outcomeText: '兼顾温度与进度，赢得老街坊赞誉，但补贴志愿者耗费专项经费！情商+8，清廉+6；代价：资金-¥6,000，精力-8。',
        effects: { eq: 8, clean: 6, capital: -6000, sp: -8 },
        failEffects: { rep: -5, eq: -5, capital: -6000, resilience: -3 },
        failText: '人手调配捉襟见肘，窗口排起长龙，经费超支且未能平息怨言。',
        tag: '暖心适老'
      },
      {
        text: '将系统外包给关系户服务商换取短期账面达标与商业赞助',
        statReq: 'iq', reqVal: 52,
        outcomeText: '短期账面迅速过关并节省经费，但外包粗糙埋下廉政与口碑隐患！资金+¥18,000，体魄+4；代价：清廉-10，声誉-6。',
        effects: { capital: 18000, health: 4, clean: -10, rep: -6 },
        failEffects: { clean: -12, rep: -9, capital: -8000, resilience: -5 },
        failText: '外包商数据泄露被媒体曝光，纪检约谈追责，清廉与声誉遭受重创！',
        tag: '外包置换'
      }
    ]
  },

  // ==========================================
  // 🏛️ 政界主政与基层治理专属两难事件池 (Gov Track Exclusive Expansion)
  // ==========================================
  {
    id: 'gov_old_factory_relocation',
    title: '🏗️ 老工业区腾退改造与三千下岗职工安置博弈',
    minAge: 21, maxAge: 76, track: 'gov',
    desc: '市中心重污染老搪瓷厂亟待搬迁腾退，开发商许诺巨额土地出让金，但三千名老职工要求先落实社保补缴与再就业岗位：',
    choices: [
      {
        text: '顶住财政压力先挪用城建机动金补齐职工社保 · 亲自驻厂谈判',
        statReq: 'courage', reqVal: 70,
        outcomeText: '三千职工平稳安置，获全省改革攻坚表彰，但熬夜驻厂大伤元气且财政垫资沉重！声誉+10，清廉+8；代价：体魄-7，资金-¥9,000。',
        effects: { rep: 10, clean: 8, health: -7, capital: -9000 },
        failEffects: { rep: -8, health: -6, capital: -9000, resilience: -5 },
        failText: '跨部门资金协调受阻，安置方案延期引发围堵，身心俱疲且遭诫勉。',
        tag: '民心为本'
      },
      {
        text: '引入产业园分期置换方案 · 要求入驻企业按比例吸纳老技工',
        statReq: 'eq', reqVal: 62,
        outcomeText: '多方折中达成妥协，平稳过渡但得罪了急于拿地的地产商会！情商+8，智谋+6；代价：声誉-4，精力-8。',
        effects: { eq: 8, iq: 6, rep: -4, sp: -8 },
        failEffects: { eq: -6, rep: -6, resilience: -4, capital: -5000 },
        failText: '劳资双方互不信任导致协议流产，项目停摆半年。',
        tag: '折中周旋'
      },
      {
        text: '优先批准开发商强行进场拆迁 · 以高额土地返还充实小金库',
        statReq: 'iq', reqVal: 50,
        outcomeText: '短期经费暴涨，但强拆寒了老工人心，纪检信访举报信雪片般飞来！资金+¥28,000，魄力+5；代价：清廉-12，声誉-8。',
        effects: { capital: 28000, courage: 5, clean: -12, rep: -8 },
        failEffects: { clean: -15, rep: -11, capital: -12000, resilience: -6 },
        failText: '引发大规模群体上访，被省督导组挂牌督办，清廉与前途大损！',
        tag: '急功近利'
      }
    ]
  },
  {
    id: 'gov_chemical_park_veto',
    title: '🧪 沿江百亿精细化工园环评一票否决风波',
    minAge: 26, maxAge: 80, track: 'gov',
    desc: '省重点招商的百亿级化工项目选址紧邻城市饮用水源地上游5公里，投资方承诺每年纳税三亿，环评专家组内部意见激烈撕裂：',
    choices: [
      {
        text: '拍案行使环保一票否决 · 宁少百亿GDP绝不染指水源红线',
        statReq: 'clean', reqVal: 72,
        outcomeText: '守住一江碧水赢得百姓千秋口碑，但当季招商考核垫底且得罪说情同僚！清廉+11，声誉+9；代价：人情-7，资金-¥7,000。',
        effects: { clean: 11, rep: 9, eq: -7, capital: -7000 },
        failEffects: { rep: -7, eq: -8, resilience: -5, capital: -6000 },
        failText: '否决程序被指证据链不全，遭投资方行政复议反扑，承受巨大政治压力。',
        tag: '铁腕护江'
      },
      {
        text: '要求项目迁至下游30公里工业飞地并自掏配套管网补贴',
        statReq: 'iq', reqVal: 64,
        outcomeText: '保住项目又避开水源地，但承担了高昂管网改道成本与漫长拉锯！智谋+8，情商+6；代价：体魄-6，资金-¥12,000。',
        effects: { iq: 8, eq: 6, health: -6, capital: -12000 },
        failEffects: { iq: -5, rep: -6, capital: -12000, health: -5 },
        failText: '迁址成本超支导致企业中途撤资，前期基建配套费打了水漂。',
        tag: '异地飞地'
      },
      {
        text: '默许环评报告模糊处理距离参数 · 快速签批换取招商政绩奖金',
        statReq: 'courage', reqVal: 50,
        outcomeText: '拿到招商重奖与短期资金回流，但夜间排污暗管成为悬在头顶的利剑！资金+¥32,000，魄力+5；代价：清廉-13，心性-6。',
        effects: { capital: 32000, courage: 5, clean: -13, resilience: -6 },
        failEffects: { clean: -16, rep: -12, capital: -15000, health: -6 },
        failText: '试生产首月即发生渗漏异味，环保督察组连夜进驻追责！',
        tag: '饮鸩止渴'
      }
    ]
  },
  {
    id: 'gov_budget_deficit_squeeze',
    title: '📉 年末基层财政收支缺口与保民生工资硬仗',
    minAge: 28, maxAge: 82, track: 'gov',
    desc: '岁末年关，县区财政账户仅剩八百万，而中小学教师津贴、环卫工欠薪与迎检亮化工程三方同时催款告急：',
    choices: [
      {
        text: '砍掉全部迎检亮化景观工程 · 优先足额发放教师与环卫工血汗钱',
        statReq: 'clean', reqVal: 68,
        outcomeText: '一线教师与环卫工热泪盈眶，但因城市迎检未搞亮化被上级点名批评！清廉+10，声誉+8；代价：人情-6，魄力-4。',
        effects: { clean: 10, rep: 8, eq: -6, courage: -4 },
        failEffects: { rep: -8, eq: -6, resilience: -5 },
        failText: '景观承包商拿着旧合同起诉冻结账户，导致工资发放延误。',
        tag: '民生优先'
      },
      {
        text: '连夜赴省厅争取专项转移支付调度并个人担保拆借过桥',
        statReq: 'eq', reqVal: 66,
        outcomeText: '跑断腿求来救命资金，三方勉强平账，但透支大量人情与体魄！情商+8，魄力+6；代价：体魄-7，精力-10。',
        effects: { eq: 8, courage: 6, health: -7, sp: -10 },
        failEffects: { eq: -6, health: -7, rep: -5, capital: -6000 },
        failText: '省厅额度已封账，无功而返还搭上差旅公关开支。',
        tag: '八方化缘'
      },
      {
        text: '向辖区龙头企业摊派预征过头税与赞助费强行填平缺口',
        statReq: 'courage', reqVal: 52,
        outcomeText: '账面缺口瞬间填平并留有机动结余，但营商口碑暴跌！资金+¥22,000，魄力+5；代价：声誉-9，清廉-8。',
        effects: { capital: 22000, courage: 5, rep: -9, clean: -8 },
        failEffects: { rep: -12, clean: -10, capital: -10000, resilience: -5 },
        failText: '企业联名向国务院督查组举报乱摊派，被责令全额退赔并检讨！',
        tag: '寅吃卯粮'
      }
    ]
  },
  {
    id: 'gov_affordable_housing_audit',
    title: '🏘️ 保障性安居房摇号分配暗箱举报彻查',
    minAge: 22, maxAge: 78, track: 'gov',
    desc: '群众举报新竣工的八百套保障房名单中混入了十余户开豪车的关系户，而多名孤残困难家庭落选，舆论沸腾：',
    choices: [
      {
        text: '公开曝光并清退全部违规关系户 · 联合公证处全程直播二次重摇',
        statReq: 'clean', reqVal: 72,
        outcomeText: '铁面无私震慑全场，百姓拍手称快，但彻底得罪了多名塞条子的实权人物！清廉+11，声誉+9；代价：人情-8，体魄-5。',
        effects: { clean: 11, rep: 9, eq: -8, health: -5 },
        failEffects: { rep: -8, eq: -7, health: -6, resilience: -5 },
        failText: '清退执行遭遇强大暗流阻挠，重摇现场秩序混乱引发二次舆情。',
        tag: '阳光铁腕'
      },
      {
        text: '内部约谈劝退违规户 · 另行筹措廉租补贴安抚落选困难家庭',
        statReq: 'eq', reqVal: 62,
        outcomeText: '低调化解风暴保住各方体面，但额外补贴支出掏空了科室经费！情商+8，智谋+6；代价：资金-¥10,000，清廉-4。',
        effects: { eq: 8, iq: 6, capital: -10000, clean: -4 },
        failEffects: { clean: -7, rep: -6, capital: -10000, resilience: -4 },
        failText: '内部劝退走漏风声被指责护短和稀泥，两头不讨好。',
        tag: '折中劝退'
      },
      {
        text: '压下举报信认定程序合规 · 收受开发商与关系户感谢礼金',
        statReq: 'iq', reqVal: 48,
        outcomeText: '暗中收下丰厚人情回馈，但良知蒙尘、埋下随时爆雷的违纪铁证！资金+¥26,000，人情+6；代价：清廉-14，心性-7。',
        effects: { capital: 26000, eq: 6, clean: -14, resilience: -7 },
        failEffects: { clean: -18, rep: -12, capital: -14000, resilience: -8 },
        failText: '记者暗访拍下豪车出入保障房小区铁证，全网曝光面临立案调查！',
        tag: '徇私舞弊'
      }
    ]
  },
  {
    id: 'gov_flood_detention_basin',
    title: '🌊 百年一遇洪峰压境：启用蓄滞洪区分洪生死抉择',
    minAge: 30, maxAge: 84, track: 'gov',
    desc: '上游连降特大暴雨，主干堤防距漫坝仅差20厘米！下游是百万人口省会城区，分洪蓄滞洪区则是两万亩即将丰收的良田与六个庄台：',
    choices: [
      {
        text: '立下军令状死守主干大堤72小时 · 亲自扛沙袋堵管涌争取错峰',
        statReq: 'courage', reqVal: 76,
        outcomeText: '以血肉之躯守住大堤且保住分洪区良田！功勋卓著但连续三昼夜泡在洪水里落下寒疾！魄力+11，声誉+10；代价：体魄-9，精力-12。',
        effects: { courage: 11, rep: 10, health: -9, sp: -12 },
        failEffects: { health: -10, rep: -9, capital: -15000, resilience: -6 },
        failText: '局部子堤发生漫溢被迫紧急爆破泄洪，抢险物资损毁严重且身负外伤。',
        tag: '人在堤在'
      },
      {
        text: '果断连夜转移蓄滞洪区全部群众 · 依法开闸分洪并足额兑现青苗补偿',
        statReq: 'iq', reqVal: 66,
        outcomeText: '科学调度确保主城绝对安全且无一人伤亡，但巨额青苗赔偿令财政吃紧！智谋+9，清廉+7；代价：资金-¥14,000，人情-5。',
        effects: { iq: 9, clean: 7, capital: -14000, eq: -5 },
        failEffects: { rep: -7, eq: -6, capital: -14000, resilience: -5 },
        failText: '夜间组织撤离时部分养殖户折返抢救财物受困，救援险象环生。',
        tag: '断腕分洪'
      },
      {
        text: '开闸分洪后克扣截留部分蓄滞洪区农业救灾补偿款挪作办公经费',
        statReq: 'eq', reqVal: 50,
        outcomeText: '保住主城且截留大笔机动资金，但受灾农户怨声载道！资金+¥25,000，智谋+4；代价：清廉-13，声誉-9。',
        effects: { capital: 25000, iq: 4, clean: -13, rep: -9 },
        failEffects: { clean: -16, rep: -13, capital: -16000, resilience: -7 },
        failText: '国家救灾专项审计组顺藤摸瓜查出截留账目，受到严厉党纪处分！',
        tag: '截留灾款'
      }
    ]
  },
  {
    id: 'gov_rural_road_bidding',
    title: '🛣️ 山区村村通公路工程围标串标暗流',
    minAge: 26, maxAge: 76, track: 'gov',
    desc: '山区通村水泥路招标前夕，三家本地建筑包工头私下达成默契抬高标底，并托老上司递话要求降低水泥标号厚度标准：',
    choices: [
      {
        text: '推翻串标结果引入外省国企公开盲评 · 严卡钻芯取样20厘米标准',
        statReq: 'clean', reqVal: 70,
        outcomeText: '修出百年放心路，但彻底驳了老上司面子且驻山监理极耗心力！清廉+10，声誉+8；代价：人情-8，体魄-5。',
        effects: { clean: 10, rep: 8, eq: -8, health: -5 },
        failEffects: { eq: -8, rep: -6, health: -5, resilience: -4 },
        failText: '地头蛇煽动砂石断供阻挠外省施工队进场，工期严重延误。',
        tag: '铁尺量路'
      },
      {
        text: '将标段拆分为六个小标段引入竞争 · 要求本地队签署十年质保终身追责书',
        statReq: 'iq', reqVal: 62,
        outcomeText: '分化瓦解串标同盟，质量达标但多标段监理支出大幅增加！智谋+8，情商+6；代价：资金-¥8,000，精力-8。',
        effects: { iq: 8, eq: 6, capital: -8000, sp: -8 },
        failEffects: { iq: -5, rep: -5, capital: -8000, resilience: -4 },
        failText: '个别小标段冬季施工防冻不到位出现起砂，返工耗费大笔资金。',
        tag: '分标制衡'
      },
      {
        text: '顺水推舟放行本地包工头中标 · 收受干股分红对偷工减料睁一只眼闭一只眼',
        statReq: 'eq', reqVal: 48,
        outcomeText: '腰包鼓胀、上下一团和气，但通车次年路面即开裂断板！资金+¥30,000，人情+6；代价：清廉-14，声誉-8。',
        effects: { capital: 30000, eq: 6, clean: -14, rep: -8 },
        failEffects: { clean: -17, rep: -12, capital: -15000, resilience: -7 },
        failText: '重载货车压塌偷工减料涵洞引发事故，巡视组倒查三年严惩不贷！',
        tag: '豆腐渣路'
      }
    ]
  },

  // ==========================================
  // 🔬 尖端科技总师赛道专属两难事件池 (Tech Track Exclusive Expansion)
  // ==========================================
  {
    id: 'tech_eda_architecture_fork',
    title: '💻 国产超算芯片指令集架构自主路线生死之争',
    minAge: 36, maxAge: 80, track: 'tech',
    desc: '海外突然收紧高端EDA软件与IP核授权，院务会上争论激烈：是推倒重来从零编写全自主底层指令集，还是购买次一代成熟海外架构做封装改型？',
    choices: [
      {
        text: '破釜沉舟从零研发全自主指令集与编译器 · 签下三年流片军令状',
        statReq: 'iq', reqVal: 74,
        outcomeText: '苦战千日实现底层代码100%自主可控，但长期通宵攻关严重透支体魄与经费！智谋+11，魄力+8；代价：体魄-8，资金-¥12,000。',
        effects: { iq: 11, courage: 8, health: -8, capital: -12000 },
        failEffects: { iq: -5, rep: -8, health: -7, capital: -15000 },
        failText: '首次流片因时序收敛缺陷未能点亮，百万流片经费打水漂并遭学界质疑。',
        tag: '自主铸魂'
      },
      {
        text: '双轨并行：开源架构过渡保交付 + 精锐小队秘密攻关核心微架构',
        statReq: 'eq', reqVal: 64,
        outcomeText: '既保住工程节点又留住火种，但双线作战令团队心力交瘁！智谋+7，情商+7；代价：精力-10，体魄-5。',
        effects: { iq: 7, eq: 7, sp: -10, health: -5 },
        failEffects: { rep: -6, sp: -10, health: -6, resilience: -4 },
        failText: '双线资源分散导致两边进度均滞后半年，中期评审亮黄牌。',
        tag: '双轨过渡'
      },
      {
        text: '直接采购海外成熟内核打磨换壳申报自主突破套取科研经费结余',
        statReq: 'courage', reqVal: 50,
        outcomeText: '轻松通过外行验收并分得巨额横向课题提成，但沦为业界笑柄！资金+¥35,000，体魄+5；代价：清廉-14，声誉-10。',
        effects: { capital: 35000, health: 5, clean: -14, rep: -10 },
        failEffects: { clean: -18, rep: -14, capital: -20000, resilience: -8 },
        failText: '底层代码开源协议特征被同行扒出实锤造假，撤销奖项并追缴全部经费！',
        tag: '换壳套利'
      }
    ]
  },
  {
    id: 'tech_satellite_cryo_valve',
    title: '🛰️ 深空探测火箭液氢低温阀门发射前72小时结霜告警',
    minAge: 26, maxAge: 82, track: 'tech',
    desc: '火箭已垂直转运至发射塔架，遥测发现二级发动机液氢加注活门出现0.3毫米异常微霜，推迟发射窗口意味着半年等待与数千万损失：',
    choices: [
      {
        text: '力排众议叫停发射窗口 · 冒着低温冻伤风险登塔钻进整流罩排障',
        statReq: 'courage', reqVal: 74,
        outcomeText: '亲手查出密封圈微裂纹挽救整枚火箭，但双手冻伤且承担推迟窗口罚金！魄力+10，声誉+9；代价：体魄-8，资金-¥10,000。',
        effects: { courage: 10, rep: 9, health: -8, capital: -10000 },
        failEffects: { rep: -8, health: -7, eq: -6, resilience: -5 },
        failText: '拆检后发现系传感器误报，却错失最佳发射窗口，背负巨大非议。',
        tag: '零疑点升空'
      },
      {
        text: '启动冗余备份管路热氮吹除方案 · 在发射窗口最后十分钟完成复测',
        statReq: 'iq', reqVal: 68,
        outcomeText: '精准计算热力学参数化险为夷，但高压倒计时令神经紧绷至极点！智谋+9，心性+6；代价：体魄-6，精力-10。',
        effects: { iq: 9, resilience: 6, health: -6, sp: -10 },
        failEffects: { iq: -5, rep: -7, health: -6, resilience: -5 },
        failText: '吹除压力波动触发自动紧急关机，发射中止进入长周期归零。',
        tag: '冗余吹除'
      },
      {
        text: '修改遥测告警阈值上限强行签字放行 · 赌一把带病点火领头功奖金',
        statReq: 'courage', reqVal: 48,
        outcomeText: '侥幸入轨拿到按期发射巨额奖金，但二级火箭姿态剧烈抖动险酿大祸！资金+¥28,000，魄力+6；代价：清廉-12，心性-8。',
        effects: { capital: 28000, courage: 6, clean: -12, resilience: -8 },
        failEffects: { clean: -16, rep: -15, capital: -18000, resilience: -9 },
        failText: '升空后阀门卡滞导致轨道偏离，质量归零委员会徹查篡改阈值铁证！',
        tag: '带病豪赌'
      }
    ]
  },
  {
    id: 'tech_paper_data_anomaly',
    title: '📄 顶刊封稿前夜发现门下博士生关键对照组数据异常',
    minAge: 28, maxAge: 84, track: 'tech',
    desc: '课题组历时四年撰写的重磅论文已被国际顶刊原则接收，恰逢杰青评定关键期，你复核原始谱图时发现第3组高温超导磁化率曲线存在人为平滑痕迹：',
    choices: [
      {
        text: '当场撤稿并封存原始记录 · 闭关半年自掏经费重做全部三百组实验',
        statReq: 'clean', reqVal: 72,
        outcomeText: '以铁骨捍卫科学底线，半年后重测发现更伟大的反常相变，但错过当届评优且耗尽积蓄！清廉+11，智谋+8；代价：资金-¥14,000，体魄-6。',
        effects: { clean: 11, iq: 8, capital: -14000, health: -6 },
        failEffects: { rep: -6, capital: -14000, health: -6, resilience: -4 },
        failText: '撤稿后被海外竞争团队抢先半月发表同类成果，四年心血付诸东流。',
        tag: '铁律求真'
      },
      {
        text: '向编辑部申请延期勘误 · 剔除争议图谱改投稳健专业期刊',
        statReq: 'iq', reqVal: 62,
        outcomeText: '稳妥保住学术清誉与团队成果，但论文影响因子大打折扣！智谋+7，清廉+6；代价：声誉-5，精力-8。',
        effects: { iq: 7, clean: 6, rep: -5, sp: -8 },
        failEffects: { rep: -7, iq: -4, resilience: -4 },
        failText: '审稿人质疑剔除数据动机导致拒稿，团队士气低落。',
        tag: '勘误降档'
      },
      {
        text: '默许美化图谱如期发表 · 先拿百万科研重奖与学术头衔再说',
        statReq: 'eq', reqVal: 48,
        outcomeText: '顺遂斩获高额科研奖金与风光头衔，但全球十余个实验室宣布无法复现你的数据！资金+¥36,000，人情+5；代价：清廉-15，声誉-9。',
        effects: { capital: 36000, eq: 5, clean: -15, rep: -9 },
        failEffects: { clean: -18, rep: -15, capital: -20000, resilience: -8 },
        failText: '顶刊发布正式撤稿声明并通报全球，学术声誉彻底崩塌！',
        tag: '学术失格'
      }
    ]
  },
  {
    id: 'tech_deepsea_titanium_weld',
    title: '🌊 万米载人深潜器钛合金球壳电子束焊缝微气孔抉择',
    minAge: 40, maxAge: 65, track: 'tech',
    desc: '万米海试在即，超声波探伤发现钛合金载人球壳赤道焊缝深处有一处0.15毫米临界微气孔，规范处于合格边缘，但万米海底每平方厘米承受一吨水压：',
    choices: [
      {
        text: '坚持整条赤道焊缝刨开重焊 · 亲自随艇下潜万米海底验证',
        statReq: 'courage', reqVal: 74,
        outcomeText: '球壳历经万米深渊纹丝不动，创下世界深潜纪录，但重焊耗资巨大且深潜落下一身关节病痛！魄力+10，智谋+8；代价：体魄-8，资金-¥12,000。',
        effects: { courage: 10, iq: 8, health: -8, capital: -12000 },
        failEffects: { health: -8, rep: -7, capital: -12000, resilience: -5 },
        failText: '二次重焊引发局部热应力变形，不得不启用备用球壳导致海试推迟一年。',
        tag: '以身试渊'
      },
      {
        text: '加做三次1.2倍极限高压水筒疲劳测试 · 限制首航最大下潜深度至8500米',
        statReq: 'iq', reqVal: 62,
        outcomeText: '安全稳妥完成阶段性海试，但因未冲刺万米极值错失年度头等大奖！智谋+8，清廉+6；代价：声誉-4，精力-8。',
        effects: { iq: 8, clean: 6, rep: -4, sp: -8 },
        failEffects: { rep: -6, iq: -4, capital: -8000, resilience: -4 },
        failText: '高压水筒测试中观测窗密封圈老化渗水，维修耗费数月。',
        tag: '限深稳测'
      },
      {
        text: '按合格下限直接签批出厂 · 省下百万重焊经费用于团队年终分红',
        statReq: 'eq', reqVal: 50,
        outcomeText: '分得丰厚结余奖金，但每次深潜你都心惊肉跳夜不能寐！资金+¥26,000，人情+6；代价：清廉-11，心性-8。',
        effects: { capital: 26000, eq: 6, clean: -11, resilience: -8 },
        failEffects: { clean: -15, rep: -13, capital: -16000, health: -6 },
        failText: '海试至七千米时声学监测报警紧急抛载上浮，焊缝隐患被彻底追责！',
        tag: '侥幸放行'
      }
    ]
  },

  // ==========================================
  // 💼 商海实业与丝路贸易赛道专属两难事件池 (Biz / Trade Track Exclusive Expansion)
  // ==========================================
  {
    id: 'biz_supply_chain_backstab',
    title: '📦 海外核心零部件断供勒索与违约金生死劫',
    minAge: 20, maxAge: 80, track: 'biz',
    desc: '海外独家传感器供应商趁旺季交货前突然坐地起价40%，否则断供；而下游大客户合同规定逾期一日罚款五十万：',
    choices: [
      {
        text: '自掏两百万预付款扶持国内小微精密厂72小时驻厂改制替代件',
        statReq: 'iq', reqVal: 72,
        outcomeText: '一举打破海外垄断实现国产替代，但垫资与改模令现金流紧绷且彻夜盯产伤身！智谋+10，声誉+8；代价：资金-¥16,000，体魄-7。',
        effects: { iq: 10, rep: 8, capital: -16000, health: -7 },
        failEffects: { capital: -22000, rep: -7, health: -6, resilience: -5 },
        failText: '首批替代件温漂超标被迫返工，赔付了大笔逾期违约金。',
        tag: '破局替代'
      },
      {
        text: '忍痛接受涨价保住本批交付 · 暗中搜集对方垄断证据发起反垄断索赔',
        statReq: 'eq', reqVal: 64,
        outcomeText: '守住大客户信誉，但本季利润被彻底吞噬！情商+8，清廉+6；代价：资金-¥14,000，魄力-4。',
        effects: { eq: 8, clean: 6, capital: -14000, courage: -4 },
        failEffects: { capital: -18000, eq: -5, resilience: -4 },
        failText: '对方得寸进尺二次延迟发货，利润亏空且维权取证艰难。',
        tag: '忍辱周旋'
      },
      {
        text: '从灰色拆机旧件市场低价扫货翻新充当全新原装件交付客户',
        statReq: 'courage', reqVal: 50,
        outcomeText: '瞬间省下巨额采购差价大赚一笔，但翻新件寿命隐患犹如定时炸弹！资金+¥38,000，魄力+5；代价：清廉-14，声誉-9。',
        effects: { capital: 38000, courage: 5, clean: -14, rep: -9 },
        failEffects: { clean: -16, rep: -14, capital: -28000, resilience: -7 },
        failText: '客户抽检发现批次打磨痕迹，触发假一赔三天价索赔并拉入行业黑名单！',
        tag: '以次充好'
      }
    ]
  },
  {
    id: 'biz_price_war_dumping',
    title: '⚔️ 行业巨头补贴价格战围剿：跟进烧钱还是断臂转型',
    minAge: 36, maxAge: 80, track: 'biz',
    desc: '资本巨头携十亿热钱杀入你的主营赛道，以低于成本价30%恶意倾销抢夺渠道经销商，核心代理商纷纷动摇要求降价返点：',
    choices: [
      {
        text: '拒绝低端价格泥潭 · 抵押个人房产孤注一掷研发高毛利二代旗舰品',
        statReq: 'courage', reqVal: 74,
        outcomeText: '二代精品上市引爆高端市场，毛利率翻倍，但研发期现金耗尽、身心濒临极限！魄力+10，智谋+8；代价：资金-¥18,000，体魄-7。',
        effects: { courage: 10, iq: 8, capital: -18000, health: -7 },
        failEffects: { capital: -25000, rep: -7, health: -6, resilience: -6 },
        failText: '新品研发周期过长，老渠道被对手蚕食殆尽，资金链险些断裂。',
        tag: '高端突围'
      },
      {
        text: '收缩三线亏损网点 · 与核心经销商结成利润共享联营体抱团过冬',
        statReq: 'eq', reqVal: 62,
        outcomeText: '稳住基本盘熬到对手补贴退潮，但让渡了大量渠道分红！情商+8，心性+6；代价：资金-¥10,000，声誉-4。',
        effects: { eq: 8, resilience: 6, capital: -10000, rep: -4 },
        failEffects: { capital: -15000, eq: -6, rep: -5 },
        failText: '两名大区代理商拿完返点后仍倒戈竞品，渠道收缩阵痛剧烈。',
        tag: '结盟过冬'
      },
      {
        text: '暗中缩减原材料规格并拖欠上游小作坊货款 · 打超低价游击战套现',
        statReq: 'iq', reqVal: 50,
        outcomeText: '靠压榨账期与减配短期回笼大批现金，但供应商堵门讨债、品牌口碑崩盘！资金+¥34,000，智谋+4；代价：清廉-13，声誉-10。',
        effects: { capital: 34000, iq: 4, clean: -13, rep: -10 },
        failEffects: { clean: -15, rep: -13, capital: -22000, resilience: -6 },
        failText: '上游供应商联合起诉查封仓库，减配产品遭消协通报曝光！',
        tag: '减配压款'
      }
    ]
  },
  {
    id: 'biz_ipo_valuation_gamble',
    title: '📈 上市前夕对赌协议大考：冲刺业绩对赌还是实事求是',
    minAge: 30, maxAge: 82, track: 'biz',
    desc: '距离A股申报基准日仅剩最后一个季度，账面净利润距投资人对赌线还差8%，财务总监试探是否将明年一季度预收款提前确认为本年营收：',
    choices: [
      {
        text: '严词拒绝财务跨期调节 · 坦诚向投资团披露真实数据并自掏股权补偿',
        statReq: 'clean', reqVal: 72,
        outcomeText: '以绝对诚信赢得发审委与长线基金敬重，次年顺利过会，但当场赔付个人股权与现金！清廉+11，声誉+9；代价：资金-¥22,000，人情-5。',
        effects: { clean: 11, rep: 9, capital: -22000, eq: -5 },
        failEffects: { capital: -26000, rep: -6, eq: -6, resilience: -5 },
        failText: '激进投资人翻脸触发回购条款，个人背上沉重现金偿付压力。',
        tag: '铁账上市'
      },
      {
        text: '全员发动年末百日促销冲刺真实回款 · 大幅让利折价清库存达标',
        statReq: 'courage', reqVal: 66,
        outcomeText: '硬生生靠真实发货踩线完成对赌，但折价促销掏空毛利且全员过劳！魄力+8，智谋+7；代价：体魄-8，资金-¥9,000。',
        effects: { courage: 8, iq: 7, health: -8, capital: -9000 },
        failEffects: { health: -8, capital: -16000, rep: -6, resilience: -4 },
        failText: '年末物流爆仓导致部分货物未能跨年前签收，差之毫厘未能达标。',
        tag: '喋血冲刺'
      },
      {
        text: '授意走空单过账提前确认营收 · 先拿上市对赌巨额奖金套现',
        statReq: 'iq', reqVal: 48,
        outcomeText: '账面华丽过关拿到大笔对赌奖金，但审计底稿留下致命窟窿！资金+¥42,000，人情+5；代价：清廉-16，心性-8。',
        effects: { capital: 42000, eq: 5, clean: -16, resilience: -8 },
        failEffects: { clean: -20, rep: -16, capital: -30000, resilience: -9 },
        failText: '证监现场督查穿透核查物流单据识破跨期虚增，IPO被一票否决并重罚！',
        tag: '粉饰报表'
      }
    ]
  },

  // ==========================================
  // ⚙️ 大国工匠与重工实业赛道专属两难事件池 (Industry Track Exclusive Expansion)
  // ==========================================
  {
    id: 'ind_turbine_blade_fatigue',
    title: '🔧 重型燃气轮机单晶叶片高温蠕变极限试验分歧',
    minAge: 20, maxAge: 80, track: 'industry',
    desc: '首台全国产F级重型燃气轮机满负荷试车至第180小时，红外监测发现第3级涡轮叶片叶尖温度偏高12℃，停机拆检将损失百万试车费并延误交付：',
    choices: [
      {
        text: '果断按下红色急停钮拆缸彻查 · 顶着高温钻进机匣手工修磨气膜孔',
        statReq: 'iq', reqVal: 72,
        outcomeText: '避免了断叶炸机灾难并改良气冷通道，但承担停机赔款且高温作业伤身！智谋+10，声誉+8；代价：体魄-7，资金-¥11,000。',
        effects: { iq: 10, rep: 8, health: -7, capital: -11000 },
        failEffects: { rep: -7, capital: -14000, health: -6, resilience: -5 },
        failText: '拆缸后叶片微裂纹扩展超预期，整盘叶片报废重铸，经费严重超支。',
        tag: '铁律急停'
      },
      {
        text: '降负荷至85%功率安全区间继续跑完考核 · 同步补做金相寿命评估',
        statReq: 'eq', reqVal: 62,
        outcomeText: '平稳保住阶段验收，但因未达满功率指标被扣减绩效奖金！情商+7，清廉+6；代价：资金-¥6,000，魄力-5。',
        effects: { eq: 7, clean: 6, capital: -6000, courage: -5 },
        failEffects: { rep: -6, capital: -8000, resilience: -4 },
        failText: '甲方代表对降负荷运行不满，拒绝签署最终性能接收证书。',
        tag: '降载保稳'
      },
      {
        text: '屏蔽高温探头信号强行跑满200小时 · 拿完节点重奖再按正常磨损报修',
        statReq: 'courage', reqVal: 50,
        outcomeText: '顺利领到全额交付奖金，但交付电厂后留下严重叶片断裂隐患！资金+¥30,000，魄力+5；代价：清廉-13，心性-7。',
        effects: { capital: 30000, courage: 5, clean: -13, resilience: -7 },
        failEffects: { clean: -16, rep: -14, capital: -22000, health: -6 },
        failText: '第195小时叶片飞断打穿机匣，引发重大车毁事故被严肃追责！',
        tag: '瞒报强跑'
      }
    ]
  },
  {
    id: 'ind_tunnel_rockburst_crisis',
    title: '🚇 高原超长深埋隧道TBM掘进机突遇强岩爆与涌水',
    minAge: 26, maxAge: 82, track: 'industry',
    desc: '地下1200米掌子面高地应力岩爆频发，钢拱架被挤压扭曲，每延误一天租赁费损失十万，施工方请示是否省去超前地质钻探直接快速掘进：',
    choices: [
      {
        text: '严令停机实施超前应力释放孔与双层初期支护 · 亲自驻守掌子面指挥',
        statReq: 'courage', reqVal: 72,
        outcomeText: '成功制服极高地应力实现零伤亡贯通，但高原缺氧粉尘重创体魄且支护超支！魄力+10，清廉+8；代价：体魄-8，资金-¥12,000。',
        effects: { courage: 10, clean: 8, health: -8, capital: -12000 },
        failEffects: { health: -8, capital: -15000, rep: -6, resilience: -5 },
        failText: '释放孔施工中突发高压突泥卡死刀盘，人工清淤脱困耗费月余。',
        tag: '铁壁支护'
      },
      {
        text: '调整掘进参数采用短进尺弱扰动工法 · 抽调老技师三班倒轮换',
        statReq: 'iq', reqVal: 62,
        outcomeText: '稳步渡过破碎带，但月进尺减半导致工期节点奖泡汤！智谋+8，情商+6；代价：资金-¥7,000，精力-8。',
        effects: { iq: 8, eq: 6, capital: -7000, sp: -8 },
        failEffects: { rep: -5, capital: -9000, health: -5 },
        failText: '掘进速度过慢受到业主指挥部黄牌警告并扣罚进度保证金。',
        tag: '短进稳掘'
      },
      {
        text: '取消超前钻探全速盲掘抢夺提前贯通巨额奖金 · 缩减锚杆数量省成本',
        statReq: 'courage', reqVal: 48,
        outcomeText: '侥幸抢出进度领到丰厚贯通奖，但支护薄弱段埋下后期坍塌大患！资金+¥32,000，魄力+5；代价：清廉-14，声誉-7。',
        effects: { capital: 32000, courage: 5, clean: -14, rep: -7 },
        failEffects: { clean: -17, rep: -14, capital: -24000, health: -7 },
        failText: '盲掘撞上高压富水断层引发塌方掩埋设备，遭安全生产一票否决！',
        tag: '盲掘抢奖'
      }
    ]
  },

  // ==========================================
  // 🌾 沃土三农与生态振兴赛道专属两难事件池 (Agri / Grassroots Track Exclusive Expansion)
  // ==========================================
  {
    id: 'agri_seed_purity_frost',
    title: '🌱 南繁育种基地台风倒灌与十万斤杂交亲本种子保卫战',
    minAge: 18, maxAge: 82, track: 'agri',
    desc: '超强台风登陆前夜，南繁试验田三百亩核心不育系亲本正值扬花授粉期，一旦海水倒灌或混杂串粉，五年育种心血将毁于一旦：',
    choices: [
      {
        text: '冒着十二级狂风暴雨跳入齐腰积水抢挖排咸沟 · 逐株套袋保护核心单株',
        statReq: 'courage', reqVal: 70,
        outcomeText: '保住全部核心亲本纯度99.9%，育成超级大品种，但风寒湿毒深侵骨髓！魄力+10，声誉+9；代价：体魄-8，资金-¥6,000。',
        effects: { courage: 10, rep: 9, health: -8, capital: -6000 },
        failEffects: { health: -9, rep: -6, capital: -8000, resilience: -5 },
        failText: '防风棚被狂风掀翻，部分亲本倒伏受淹，高烧住院半月。',
        tag: '护种如命'
      },
      {
        text: '紧急雇佣周边农户连夜抢收半熟种穗转入恒温除湿库人工催熟',
        statReq: 'iq', reqVal: 62,
        outcomeText: '保住八成良种发芽率，但雇工与烘干费用令课题经费见底！智谋+8，情商+6；代价：资金-¥10,000，精力-8。',
        effects: { iq: 8, eq: 6, capital: -10000, sp: -8 },
        failEffects: { capital: -12000, iq: -4, rep: -5 },
        failText: '除湿设备断电导致部分种穗霉变，发芽率未达国标。',
        tag: '抢收催熟'
      },
      {
        text: '将受台风串粉纯度不达标的次等种子掺入优等品照价卖给种子公司',
        statReq: 'eq', reqVal: 48,
        outcomeText: '全额收回成本并赚取高额转让费，但次年农户大田出现高低不齐减产！资金+¥28,000，体魄+4；代价：清廉-14，声誉-10。',
        effects: { capital: 28000, health: 4, clean: -14, rep: -10 },
        failEffects: { clean: -17, rep: -15, capital: -18000, resilience: -7 },
        failText: '农业执法大队抽检出纯度不达标，判定假劣种子并吊销繁育资质！',
        tag: '掺杂售劣'
      }
    ]
  },
  {
    id: 'agri_pesticide_residue_export',
    title: '🍵 生态高山茶出口欧盟农残超标百万货柜退运危机',
    minAge: 22, maxAge: 83, track: 'agri',
    desc: '合作社三百户茶农交售的十万斤春茶在港口检出微量除草剂超标0.02ppm，外商威胁全柜退运索赔，而茶农等着货款买肥开学：',
    choices: [
      {
        text: '全额垫资兑付茶农货款 · 当众销毁超标批次并推广生物防虫全封闭溯源',
        statReq: 'clean', reqVal: 72,
        outcomeText: '壮士断腕树起中国有机茶金字招牌，次年订单翻倍，但个人背负巨额垫资亏空！清廉+11，声誉+9；代价：资金-¥18,000，体魄-5。',
        effects: { clean: 11, rep: 9, capital: -18000, health: -5 },
        failEffects: { capital: -22000, rep: -6, resilience: -5 },
        failText: '资金周转吃紧引发银行抽贷，合作社一度陷入停摆。',
        tag: '断腕立信'
      },
      {
        text: '将超标茶转作工业茶多酚提取原料折价止损 · 按户追溯扣减违规农户分红',
        statReq: 'iq', reqVal: 62,
        outcomeText: '挽回六成经济损失并立下铁规，但被扣款的违规农户四处哭闹记恨！智谋+8，魄力+6；代价：人情-7，资金-¥6,000。',
        effects: { iq: 8, courage: 6, eq: -7, capital: -6000 },
        failEffects: { eq: -8, rep: -6, capital: -9000 },
        failText: '个别农户闹事阻挠收购站正常运转，乡里调解数月方息。',
        tag: '折价溯责'
      },
      {
        text: '托关系更换送检样品混过海关 · 将问题茶换贴名山古树标高价内销',
        statReq: 'eq', reqVal: 50,
        outcomeText: '非但没亏还大赚一笔内销暴利，但失信隐患深埋！资金+¥32,000，人情+5；代价：清廉-14，声誉-9。',
        effects: { capital: 32000, eq: 5, clean: -14, rep: -9 },
        failEffects: { clean: -17, rep: -14, capital: -20000, resilience: -7 },
        failText: '职业打假人与市监抽检同时命中，被处以十倍货值顶格罚款！',
        tag: '换标欺客'
      }
    ]
  },

  // ==========================================
  // 🎭 文化科教与医卫法治赛道专属两难事件池 (Art / Education / Med / Law Track Expansion)
  // ==========================================
  {
    id: 'art_ancient_fresco_restoration',
    title: '🎨 千年石窟唐代壁画抢救性揭取与旅游开发冲突',
    minAge: 19, maxAge: 84, track: 'art',
    desc: '雨水渗漏威胁唐代洞窟壁画，文旅集团要求三个月内用快干化学树脂封护以便五一开园迎客，而古法矿物可逆修复需闭窟两年：',
    choices: [
      {
        text: '死守文物原真性底线闭窟两年 · 住进阴冷石窟日夜用古法竹签剔除盐害',
        statReq: 'clean', reqVal: 72,
        outcomeText: '千年飞天重现盛唐神韵，斩获国际文保大奖，但石窟寒湿侵体且拒发旅游分成！清廉+10，声誉+9；代价：体魄-7，资金-¥8,000。',
        effects: { clean: 10, rep: 9, health: -7, capital: -8000 },
        failEffects: { health: -7, rep: -6, eq: -6, capital: -8000 },
        failText: '文旅局责怪闭窟影响门票创收，削减了文保所年度经费。',
        tag: '古法守真'
      },
      {
        text: '封闭核心真迹洞窟慢修 · 先建立1:1高精度数字光影复制窟供游客参观',
        statReq: 'iq', reqVal: 64,
        outcomeText: '文保与文旅双赢，但数字化扫描建模耗尽了全部科研结余！智谋+8，情商+7；代价：资金-¥12,000，精力-8。',
        effects: { iq: 8, eq: 7, capital: -12000, sp: -8 },
        failEffects: { capital: -14000, iq: -4, rep: -5 },
        failText: '数字展厅设备调试超支，首月票务收入不及预期。',
        tag: '数智复刻'
      },
      {
        text: '迎合开发商喷涂快干化学封护剂按期开园 · 领取景区高额顾问分红',
        statReq: 'eq', reqVal: 48,
        outcomeText: '拿到景区大笔分红，但两年后壁画底层酥碱起甲不可逆脱落！资金+¥28,000，人情+6；代价：清廉-14，声誉-10。',
        effects: { capital: 28000, eq: 6, clean: -14, rep: -10 },
        failEffects: { clean: -18, rep: -15, capital: -16000, resilience: -8 },
        failText: '开园半年壁画大面积变色剥落，国家文物局通报追责造成文物损毁！',
        tag: '竭泽而渔'
      }
    ]
  },
  {
    id: 'art_copyright_plagiarism_suit',
    title: '⚖️ 原创非遗国潮力作遭流量巨头抄袭洗稿维权之战',
    minAge: 42, maxAge: 65, track: 'art',
    desc: '你带领团队潜心三年采风创作的非遗纹样图谱，被一家头部流量大厂像素级抄袭用于商业联名，对方律师团提出私下给十万封口费买断署名权：',
    choices: [
      {
        text: '断然拒签封口协议 · 倾尽积蓄公证全部手稿发起跨省知识产权公益诉讼',
        statReq: 'courage', reqVal: 72,
        outcomeText: '历时一年终审胜诉入选最高法指导案例，大振原创风骨，但诉讼拉锯耗尽心力与律师费！魄力+10，声誉+10；代价：资金-¥11,000，体魄-6。',
        effects: { courage: 10, rep: 10, capital: -11000, health: -6 },
        failEffects: { capital: -15000, rep: -5, health: -6, resilience: -5 },
        failText: '一审因部分草图未及时时间戳存证陷入举证拉锯，耗资巨大。',
        tag: '铁骨维权'
      },
      {
        text: '联合行业协会公开比对时间线舆论施压 · 迫使对方公开致歉并补签授权分成',
        statReq: 'eq', reqVal: 62,
        outcomeText: '不动干戈收回联名署名权与合理分成，但舆论交锋损耗精力且让渡了独家权！情商+8，智谋+6；代价：精力-9，清廉-4。',
        effects: { eq: 8, iq: 6, sp: -9, clean: -4 },
        failEffects: { rep: -6, eq: -5, sp: -8, resilience: -4 },
        failText: '对方买水军反咬碰瓷营销，陷入舆论混战。',
        tag: '联名博弈'
      },
      {
        text: '收下高额封口费签署保密转让协议 · 将三年团队心血拱手冠上对方之名',
        statReq: 'iq', reqVal: 48,
        outcomeText: '账户瞬间入账大笔买断费，但主创徒弟心寒离去、业界鄙薄！资金+¥32,000，体魄+4；代价：清廉-13，声誉-11。',
        effects: { capital: 32000, health: 4, clean: -13, rep: -11 },
        failEffects: { clean: -15, rep: -14, eq: -10, resilience: -7 },
        failText: '团队成员悲愤晒出底稿揭发你私卖署名，身败名裂众叛亲离！',
        tag: '卖名求利'
      }
    ]
  },
  // --- 🪖 铁血军旅赛道专属 (Military Track) ---
  {
    id: 'mil_plateau_convoy_blizzard',
    title: '🪖 高原无人区暴风雪夜被困运输车队生死驰援',
    minAge: 19, maxAge: 52, track: 'military',
    desc: '海拔五千米的唐古拉山口突降暴风雪，兄弟连队十六辆物资补给车受困冰达坂，电台信号断续、油料即将耗尽：',
    choices: [
      {
        text: '亲率重装牵引排顶风破冰强行军 · 捆绑防滑链连夜拖救受困车队',
        statReq: 'courage', reqVal: 68,
        outcomeText: '在零下三十度严寒中苦战八小时全员脱险，荣立二等功，但冻伤落下风湿寒症！',
        effects: { courage: 8, rep: 9, health: -6, sp: -8 },
        tag: '绝境破冰'
      },
      {
        text: '依托数字微气象雷达精准标定背风古河道 · 分梯队交替掩护稳妥突围',
        statReq: 'iq', reqVal: 62,
        outcomeText: '零车辆折损安全抵达兵站，战术素养获集团军通令嘉奖！',
        effects: { iq: 7, rep: 7, sp: -6, health: -3 },
        tag: '智勇测绘'
      }
    ]
  },
  {
    id: 'mil_amphibious_night_drill',
    title: '⚓ 远海惊涛 · 合成营全要素夜间夺岛跨海红蓝对抗',
    minAge: 19, maxAge: 56, track: 'military',
    desc: '六级风浪暗夜演训中，蓝军强电磁干扰致指挥链路瞬断，滩头障碍尚未完全破除，总导演部要求临机决断：',
    choices: [
      {
        text: '启用静默旗语与红光信标 · 率破障尖刀连乘冲锋舟迂回侧翼奇袭',
        statReq: 'courage', reqVal: 70,
        outcomeText: '出其不意撕开蓝军核心防线，夺得年度红剑演习头功！',
        effects: { courage: 9, rep: 9, health: -5, sp: -7 },
        tag: '奇袭破局'
      },
      {
        text: '切换跳频备用短波网 · 协同无人机蜂群先行精确瘫痪蓝军干扰源',
        statReq: 'iq', reqVal: 66,
        outcomeText: '电磁制权瞬间逆转，教科书级合成协同战法被收入院校教案！',
        effects: { iq: 8, rep: 8, sp: -6, capital: -2000 },
        tag: '电磁制胜'
      }
    ]
  },
  {
    id: 'mil_equipment_acceptance_audit',
    title: '🛡️ 军工配套特种钢装甲批次抽检临界裂纹风波',
    minAge: 21, maxAge: 78, track: 'military',
    desc: '驻厂军代表验收新一批特种防护装甲板时，超声波探伤发现两处处于合格边缘的微细夹杂，厂方经理深夜登门求情通融：',
    choices: [
      {
        text: '铁面无私整批打回重炼 · 战场防护容不得半点马虎',
        statReq: 'clean', reqVal: 68,
        outcomeText: '军纪如山震慑全厂，重炼装甲在实弹打靶中表现完美！',
        effects: { clean: 9, rep: 8, eq: -4, health: -3 },
        tag: '铁血军规'
      },
      {
        text: '进驻熔炼车间同吃同住半月 · 协助厂方攻克真空脱气除杂工艺',
        statReq: 'iq', reqVal: 65,
        outcomeText: '既守住军品红线又救活了配套厂，军地双方交口称赞！',
        effects: { iq: 7, eq: 7, health: -5, sp: -8 },
        tag: '军工协同'
      }
    ]
  },
  {
    id: 'mil_veteran_demobilization_resettlement',
    title: '🎖️ 部队精简整编 · 伤残老班长与转业骨干安置抉择',
    minAge: 28, maxAge: 80, track: 'military',
    desc: '面临大裁军与体制整编，连队里曾为你挡过飞石的伤残老班长面临去留，地方安置指标仅有唯一一个重点国企名额：',
    choices: [
      {
        text: '亲自跑遍军分区与地方安置办立军令状 · 把唯一优选名额力争给伤残老班长',
        statReq: 'eq', reqVal: 66,
        outcomeText: '全营官兵无不动容，军心士气空前凝聚，但你也得罪了托关系的机关熟人！',
        effects: { rep: 9, clean: 7, eq: -3, sp: -7 },
        tag: '生死战友'
      },
      {
        text: '拿出个人积蓄联合转业战友创办安保与工程服务队 · 集中吸纳退役弟兄',
        statReq: 'courage', reqVal: 64,
        outcomeText: '退役弟兄们全员有了着落，硬朗作风在地方闯出一片天！',
        effects: { courage: 7, eq: 8, capital: -9000, health: -4 },
        tag: '聚义兴业'
      }
    ]
  },
  // --- 🩺 杏林悬壶医药赛道专属 (Medical Track) ---
  {
    id: 'med_midnight_organ_transfer',
    title: '🩺 暴雪封路 · 跨省活体供肝黄金六小时生死极速转运',
    minAge: 18, maxAge: 78, track: 'med',
    desc: '重症肝衰竭患儿命悬一线，外省捐献供肝因暴雪高速封闭困在百里外收费站，冷缺血极限时间仅剩不到三小时：',
    choices: [
      {
        text: '背起恒温转运箱换乘绿皮慢车再徒步雪地狂奔六公里 · 亲自接力护送供体进手术室',
        statReq: 'courage', reqVal: 68,
        outcomeText: '赶在冷缺血极限前二十分钟上台吻合血管，患儿重获新生！',
        effects: { courage: 8, rep: 10, health: -7, sp: -8 },
        tag: '生死时速'
      },
      {
        text: '紧急启用自研低温机械灌注携行装置 · 联合交警铁骑开辟应急生命通道',
        statReq: 'iq', reqVal: 65,
        outcomeText: '灌注技术有效延长供体活性，手术圆满成功并创下区域转运纪录！',
        effects: { iq: 8, eq: 7, capital: -4000, sp: -6 },
        tag: '仁术护航'
      }
    ]
  },
  {
    id: 'med_stent_rebate_storm',
    title: '💊 阳光采购前夕 · 进口高值支架代理商暗塞巨额回扣讲课费',
    minAge: 32, maxAge: 82, track: 'med',
    desc: '科室年度耗材招标在即，外资医疗器械代表借学术会议之名递来一张二十万元不记名储值卡，暗示优先选用其高价进口涂层支架：',
    choices: [
      {
        text: '当场严词拒收并上交院纪检备案 · 主导推进国产质优平价支架临床双盲比对',
        statReq: 'clean', reqVal: 70,
        outcomeText: '国产支架临床疗效比肩进口且费用直降七成，万千患者受惠，清名远播！',
        effects: { clean: 10, rep: 9, capital: -3000, health: -4 },
        tag: '悬壶清风'
      },
      {
        text: '公开将企业赞助全额转入贫困大病患儿慈善救助基金 · 严守阳光采购程序',
        statReq: 'eq', reqVal: 64,
        outcomeText: '既化解人情纠葛又救治了十余名贫困患儿，全院上下心服口服！',
        effects: { eq: 8, clean: 6, sp: -7, health: -3 },
        tag: '仁心善举'
      }
    ]
  },
  {
    id: 'med_county_epidemic_isolation',
    title: '🏥 偏远矿区突发不明原因急性肺部感染群发疫情',
    minAge: 20, maxAge: 80, track: 'med',
    desc: '深山矿区三天内连续收治十几名高热咯血旷工，病原体尚未明确，家属情绪激动围堵急诊大厅：',
    choices: [
      {
        text: '第一个穿戴防护服进入负压病房采集支气管灌洗液 · 连夜镜检锁定罕见人畜共患病原',
        statReq: 'iq', reqVal: 68,
        outcomeText: '四十八小时精准锁定病原并配制靶向抗感染方案，零死亡扑灭疫情！',
        effects: { iq: 9, rep: 9, health: -6, sp: -8 },
        tag: '白衣逆行'
      },
      {
        text: '坐镇急诊一线安抚矿工家属 · 统筹建立三级物理隔离动线防止院感扩散',
        statReq: 'eq', reqVal: 63,
        outcomeText: '院感零发生，矿工家属主动配合隔离，展现卓越公共卫生应急调度力！',
        effects: { eq: 8, courage: 6, health: -4, sp: -7 },
        tag: '公卫铁盾'
      }
    ]
  },
  {
    id: 'med_ancient_herbal_artemisinin',
    title: '🌿 传统古方与现代分子药理联合攻关疑难重症制剂',
    minAge: 28, maxAge: 84, track: 'med',
    desc: '面对耐药性慢性肾病临床瓶颈，院内西医派与传统中医派争执不下，课题经费面临削减：',
    choices: [
      {
        text: '自掏科研津贴搭建液相色谱分析室 · 从民间验方中分离提纯关键活性单体',
        statReq: 'iq', reqVal: 70,
        outcomeText: '单体结构论文登上国际顶刊，院内自研中药新药获批临床！',
        effects: { iq: 9, rep: 8, capital: -7000, health: -5 },
        tag: '中西融通'
      },
      {
        text: '深入云贵深山道地药材产区三年随访 · 建立标准化无硫饮片临床路径',
        statReq: 'courage', reqVal: 62,
        outcomeText: '复方临床有效率提升三成，被评为全国名老中医传承学术带头人！',
        effects: { resilience: 8, rep: 8, health: -4, sp: -6 },
        tag: '本草正源'
      }
    ]
  },
  // --- ⚖️ 法治轩辕政法赛道专属 (Law Track) ---
  {
    id: 'law_migrant_workers_wage_arrears',
    title: '⚖️ 寒冬腊月 · 二百名讨薪农民工连环转包工程欠薪死结',
    minAge: 20, maxAge: 78, track: 'law',
    desc: '年关将近，烂尾楼盘五层包工头卷款失踪，二百名农民工在寒风中欲采取过激行动，开发商以合同无直接关系拒不认账：',
    choices: [
      {
        text: '彻夜梳理三百份进场考勤与水泥签收单 · 依法冻结开发商预售监管账户先行强制划拨工资',
        statReq: 'iq', reqVal: 68,
        outcomeText: '铁证如山穿透层层转包迷雾，赶在除夕前让两百名工友拿到血汗钱！',
        effects: { iq: 8, rep: 10, health: -5, sp: -8 },
        tag: '司法利剑'
      },
      {
        text: '召集住建、银监与总包方连开十二小时听证协调会 · 以在建工程抵押置换农民工应急专款',
        statReq: 'eq', reqVal: 65,
        outcomeText: '既化解群体性危机又盘活了停工楼盘，入选全国多元解纷示范案例！',
        effects: { eq: 9, rep: 8, sp: -7, health: -3 },
        tag: '定分止争'
      }
    ]
  },
  {
    id: 'law_wrongful_conviction_reexamination',
    title: '🕯️ 尘封十五年命案申诉卷宗发现关键物证疑点',
    minAge: 26, maxAge: 82, track: 'law',
    desc: '在评查历史积案时，你发现一桩十五年前的抢劫命案现场生物检材提取笔录存在重大矛盾，但原办案人员如今已是政法系统老领导：',
    choices: [
      {
        text: '顶住层层说情压力启动异地复核与现代DNA重检 · 誓还无辜者清白与正义',
        statReq: 'clean', reqVal: 72,
        outcomeText: '真凶落网、蒙冤者当庭释放！法治脊梁震动全国，但你也承受了巨大的人情排挤！',
        effects: { clean: 10, rep: 10, eq: -5, health: -5 },
        tag: '洗冤昭雪'
      },
      {
        text: '联合法医鉴定中心先行秘密固定外围客观铁证 · 再呈报上级专案组一锤定音',
        statReq: 'iq', reqVal: 68,
        outcomeText: '程序严丝合缝无懈可击，既平反冤案又推动了全省非法证据排除规则落地！',
        effects: { iq: 9, clean: 8, sp: -8, health: -4 },
        tag: '铁案如山'
      }
    ]
  },
  {
    id: 'law_environmental_public_interest',
    title: '🌊 跨省化工园区暗管偷排重金属公益诉讼攻防战',
    minAge: 21, maxAge: 80, track: 'law',
    desc: '下游渔民联名反映河水异味死鱼，涉事化工龙头乃当地纳税第一大户，豪华律师团以水文稀释数据抗辩无因果关系：',
    choices: [
      {
        text: '暴雨夜乘橡皮艇潜入排污口暗渠取样公证 · 提起亿元级生态环境修复公益诉讼',
        statReq: 'courage', reqVal: 69,
        outcomeText: '暗管铁证当庭播放，判令企业赔付生态修复金并全面改造零排放系统！',
        effects: { courage: 9, rep: 9, health: -6, capital: -3000 },
        tag: '绿水法盾'
      },
      {
        text: '引入环境科学院士专家辅助人出庭质证 · 促成企业认缴生态基金并合规技改',
        statReq: 'iq', reqVal: 65,
        outcomeText: '兼顾生态修复与几千名化工职工稳岗就业，实现法律效果与社会效果统一！',
        effects: { iq: 8, eq: 7, sp: -7, health: -3 },
        tag: '法护青山'
      }
    ]
  },
  {
    id: 'law_overseas_ip_arbitration',
    title: '🌐 跨国巨头恶意专利狙击中国出海企业国际仲裁',
    minAge: 28, maxAge: 83, track: 'law',
    desc: '本土科技制造企业刚打入欧洲市场，即遭遇跨国巨头在斯德哥尔摩提起天价专利侵权禁令，企业面临巨额索赔：',
    choices: [
      {
        text: '挑灯检索三十年前公知技术文献 · 发起专利无效宣告反诉彻底击碎对方壁垒',
        statReq: 'iq', reqVal: 72,
        outcomeText: '核心涉案专利被判全部无效，中国企业免赔大胜，你一跃成为涉外法治领军大状！',
        effects: { iq: 9, rep: 9, capital: 15000, health: -6 },
        tag: '涉外铁律'
      },
      {
        text: '运用反垄断与标准必要专利FRAND原则交叉许可谈判 · 促成全球和解协议',
        statReq: 'eq', reqVal: 67,
        outcomeText: '以最小成本换取全球市场通行证，赢得中外双方高度敬重！',
        effects: { eq: 9, capital: 12000, sp: -7, health: -3 },
        tag: '折冲樽俎'
      }
    ]
  },
  // --- 🚢 商贸弄潮赛道专属 (Trade & Commerce Track) ---
  {
    id: 'trade_border_barter_train',
    title: '🚂 满洲里口岸易货贸易专列滞留与汇率剧烈震荡',
    minAge: 19, maxAge: 58, track: 'trade',
    desc: '满载轻工羽绒服与暖水瓶的皮包商贸专列刚抵边境口岸，外方货币突然大幅贬值，原定现金结算面临血本无归：',
    choices: [
      {
        text: '当机立断改签实物易货协议 · 全数换回重型钢材、化肥与原木运回内地分销',
        statReq: 'courage', reqVal: 66,
        outcomeText: '内地基建正急需钢材木材，转手之间利润翻倍，一战打响跨国倒爷威名！',
        effects: { capital: 18000, courage: 8, health: -5, sp: -7 },
        tag: '易货奇谋'
      },
      {
        text: '联合口岸十余家商号组建联合议价团 · 锁定美元保值条款分批稳健交割',
        statReq: 'eq', reqVal: 62,
        outcomeText: '抱团取暖稳住利润底盘，被推举为口岸商贸商会副会长！',
        effects: { capital: 11000, eq: 8, rep: 6, sp: -6 },
        tag: '商会盟主'
      }
    ]
  },
  {
    id: 'trade_canton_fair_sample_crisis',
    title: '🚢 广交会开展前夜 · 参展核心样品货柜遭遇台风滞留码头',
    minAge: 18, maxAge: 78, track: 'trade',
    desc: '明日清晨广交会正式开展，欧美大买家已约好首日看样，但装有全套新品的货柜车被困在百里外的台风积水路段：',
    choices: [
      {
        text: '连夜雇请五艘渔船与人力三轮接力绕道水路抢运 · 浑身湿透在开展前一小时布展完毕',
        statReq: 'courage', reqVal: 65,
        outcomeText: '外商被你守时重诺的拼劲折服，当场签下全年独家包销大单！',
        effects: { capital: 16000, rep: 8, health: -6, sp: -7 },
        tag: '风雨守信'
      },
      {
        text: '连夜在酒店房间手绘全套爆炸结构图并拆解随身原型机 · 现场实操演示征服买手',
        statReq: 'iq', reqVal: 64,
        outcomeText: '精湛的专业度令外商赞叹不已，不仅保住订单更拿下高溢价定制权！',
        effects: { iq: 8, capital: 13000, sp: -6, health: -3 },
        tag: '巧思拓客'
      }
    ]
  },
  {
    id: 'trade_cross_border_warehouse_customs',
    title: '📦 海外旺季爆仓与跨境物流清关查验风波',
    minAge: 36, maxAge: 82, track: 'trade',
    desc: '圣诞旺季前夕，发往欧美的三十个集装箱因同行违规夹带被连带扣关查验，仓储滞港费每日数万：',
    choices: [
      {
        text: '飞赴目的港出示全链路原产地溯源与完税凭证 · 借机在当地自建合规海外保税仓',
        statReq: 'iq', reqVal: 68,
        outcomeText: '货柜三日内优先放行，自建海外仓更成为周边外贸同行争相租用的摇钱树！',
        effects: { capital: 17000, iq: 8, rep: 7, health: -5 },
        tag: '海外筑仓'
      },
      {
        text: '主动向买家先行空运补发急需样品并承担延误违约金 · 死保品牌十年信誉',
        statReq: 'clean', reqVal: 64,
        outcomeText: '虽短期贴补了高昂空运费，但海外客户感动之下将次年订单扩大三倍！',
        effects: { rep: 10, clean: 7, capital: -6000, health: -3 },
        tag: '信义千金'
      }
    ]
  },
  // --- 🎓 杏坛春晖教育赛道专属 (Education Track) ---
  {
    id: 'edu_rural_dropout_home_visit',
    title: '🎓 大山寒夜 · 三名尖子生因家贫欲辍学南下打工',
    minAge: 19, maxAge: 58, track: 'education',
    desc: '高三摸底考全县前三的三个寒门学子突然连续三天未到校，打听得知其父母准备让他们跟同乡包工头去南方砖厂打工：',
    choices: [
      {
        text: '打着手电筒连夜翻越二十里山路挨家家访 · 拿出自己半年工资垫付学杂费立字据保读',
        statReq: 'courage', reqVal: 64,
        outcomeText: '三名学生痛哭返校，次年全数考入重点大学，十里八乡尊你为文曲活菩萨！',
        effects: { rep: 10, clean: 8, capital: -5000, health: -5 },
        tag: '燃灯育人'
      },
      {
        text: '联合县妇联与校友会发起勤工助学阳光食堂 · 免除特困生食宿并给家长提供校办工坊岗位',
        statReq: 'eq', reqVal: 62,
        outcomeText: '从根源解决寒门学子后顾之忧，全校辍学率降至零，获评省级模范教师！',
        effects: { eq: 8, rep: 9, sp: -7, health: -3 },
        tag: '春风化雨'
      }
    ]
  },
  {
    id: 'edu_exam_oriented_vs_heuristic',
    title: '📚 升学率军令状与启发式实验教学改革之争',
    minAge: 21, maxAge: 80, track: 'education',
    desc: '年级组推行题海战术冲刺重点率，你尝试的动手实验与数理逻辑推导课被部分家长质疑“耽误刷题时间”：',
    choices: [
      {
        text: '顶住压力精编《数理本源三百题》 · 用动手实验帮学生理顺压轴题解题思路',
        statReq: 'iq', reqVal: 68,
        outcomeText: '所带班级在高考创新压轴题上均分高出全校十五分，教学手稿风靡全省！',
        effects: { iq: 9, rep: 9, health: -5, sp: -7 },
        tag: '教改先锋'
      },
      {
        text: '开设周末开放课堂邀请家长旁听 · 分层因材施教兼顾基础巩固与拔尖创新',
        statReq: 'eq', reqVal: 64,
        outcomeText: '家长由质疑转为铁杆支持，班级全员上线，获颁特级教师津贴！',
        effects: { eq: 8, capital: 8000, rep: 7, health: -4 },
        tag: '因材施教'
      }
    ]
  },
  {
    id: 'edu_vocational_workshop_integration',
    title: '🛠️ 产教融合 · 闲置校办金工实习车间改造与经费风波',
    minAge: 28, maxAge: 83, track: 'education',
    desc: '学校老旧金工实训室面临拆迁改建商品房的诱惑，开发商许诺给学校一大笔赞助费，但工科学生将失去宝贵的实操基地：',
    choices: [
      {
        text: '在教代会上据理力争保住实训基地 · 联合本土制造名企共建现代数控产教融合中心',
        statReq: 'clean', reqVal: 68,
        outcomeText: '培养出的毕业生尚未毕业即被大厂疯抢，成为全国产教融合标杆院校！',
        effects: { clean: 8, rep: 9, iq: 6, health: -4 },
        tag: '守土兴教'
      },
      {
        text: '带领师生亲自动手翻修老机床 · 以校企横向科研课题收益反哺实训耗材',
        statReq: 'iq', reqVal: 65,
        outcomeText: '师生实战能力突飞猛进，斩获全国大学生工程创新大赛大满贯！',
        effects: { iq: 8, capital: 9000, sp: -7, health: -4 },
        tag: '知行合一'
      }
    ]
  },
  // --- 🏘️ 基层街巷赛道专属 (Grassroots Track) ---
  {
    id: 'grass_old_alley_heating_pipe',
    title: '🏘️ 寒潮来袭 · 老旧筒子楼供暖主管爆裂与历史欠费僵局',
    minAge: 19, maxAge: 60, track: 'grassroots',
    desc: '零下十五度寒夜，建于六十年代的老家属院暖气主管道爆裂，供热公司以部分下岗住户陈年欠费为由拒绝先行开挖抢修：',
    choices: [
      {
        text: '带着焊机与水泵跳进冰水抢修坑先行堵漏 · 用个人工资卡作保签下先通暖后清欠协议',
        statReq: 'courage', reqVal: 65,
        outcomeText: '凌晨三点暖流重新涌入千家万户，大爷大妈端着热姜汤围在坑边抹泪，民心威望爆棚！',
        effects: { rep: 10, courage: 8, health: -6, capital: -3000 },
        tag: '冷暖民心'
      },
      {
        text: '连夜挨家召开楼门院坝议事会 · 成立居民自治互助金并争取街道民生微实事专项补贴',
        statReq: 'eq', reqVal: 63,
        outcomeText: '三年陈欠一朝厘清，管网全线换新，创新出响亮全城的“胡同议事厅”基层治理样板！',
        effects: { eq: 9, rep: 8, sp: -7, health: -3 },
        tag: '街巷善治'
      }
    ]
  },
  {
    id: 'grass_night_market_vendor_conflict',
    title: '🏮 城市市容迎检与三百户下岗职工夜市摊贩生计两难',
    minAge: 19, maxAge: 80, track: 'grassroots',
    desc: '创卫迎检在即，上级要求取缔老街占道夜市，但三百户靠摆摊供孩子上学的下岗职工情绪激动聚集街道办：',
    choices: [
      {
        text: '盘活废弃国营染织厂空置大院 · 连夜划线通水电改造为规范化便民星光夜市',
        statReq: 'iq', reqVal: 66,
        outcomeText: '既保住了三百个家庭的饭碗，又让市容整洁有序，省报头版点赞“有温度的城市烟火”！',
        effects: { iq: 8, rep: 10, sp: -8, health: -4 },
        tag: '烟火民生'
      },
      {
        text: '实行错峰限时经营与摊主自治卫生联保公约 · 亲自带着扫帚陪摊主们每日收摊清扫',
        statReq: 'eq', reqVal: 62,
        outcomeText: '摊主们自觉维护街面一尘不染，检查组现场打出最高分！',
        effects: { eq: 8, clean: 7, health: -5, sp: -6 },
        tag: '将心比心'
      }
    ]
  }
,
  {
    "id": "youth_apprentice_first_mentor",
    "title": "🛠️ 青年出师 · 启蒙师傅的技术交底与门风传承",
    "minAge": 18,
    "maxAge": 26,
    "track": "all",
    "desc": "刚刚步入工作岗位，车间/科室里技术最硬的老劳模把你叫到跟前，拿出一本卷了边的泛黄手抄工艺笔记，准备传授独门绝活：",
    "choices": [
      {
        "text": "双手接过笔记挑灯钻研 · 虚心随师傅蹲守一线吃苦磨砺",
        "outcomeText": "尽得真传！深厚基本功令同侪赞叹不已，成为青年业务尖兵！智谋+6，声望+5；代价：体魄-2，精力-4。",
        "effects": {
          "iq": 6,
          "rep": 5,
          "health": -2,
          "sp": -4
        },
        "tag": "尊师重道"
      },
      {
        "text": "结合夜校新知识提出参数量化标准 · 帮师傅整理出规范化讲义",
        "outcomeText": "传统经验与现代科学相得益彰，成果在全系统交流推广！智谋+7，情商+5；代价：精力-5。",
        "effects": {
          "iq": 7,
          "eq": 5,
          "sp": -5
        },
        "tag": "守正出新"
      },
      {
        "text": "【因循苟且】嫌笔记晦涩枯燥 · 借故推脱不愿吃苦苦练（平庸纯负陷阱）",
        "outcomeText": "错失行业顶级言传身教机缘，师傅大失所望，心性锐气与口碑皆蒙受严厉损耗！",
        "effects": {
          "rep": -4,
          "resilience": -3,
          "clean": -2
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "因循苟且"
      }
    ]
  },
  {
    "id": "youth_first_wages_filial",
    "title": "✉️ 见习转正 · 第一笔全额工资的寄家与自立抉择",
    "minAge": 18,
    "maxAge": 25,
    "track": "all",
    "desc": "拿到了人生第一张盖着财务红印的见习转正工资条，沉甸甸的数十张钞票在手，家乡父母的辛劳与自己眼前的立足开支摆在面前：",
    "choices": [
      {
        "text": "大半寄回老家补贴家用孝敬父母 · 自己啃馒头勤俭持家",
        "outcomeText": "家信里父母欣慰垂泪，清白家风深得长辈邻里夸赞！操守清廉+6，声望+5；代价：体魄-2，资金-¥800。",
        "effects": {
          "clean": 6,
          "rep": 5,
          "health": -2,
          "capital": -800
        },
        "tag": "寸草春晖"
      },
      {
        "text": "买齐专业工具书籍与工友聚餐交流 · 稳步积蓄社会人脉资本",
        "outcomeText": "迅速融入集体建立起极佳人缘，业务视野大开！情商+6，声望+4，智谋+3；代价：资金-¥1,200。",
        "effects": {
          "eq": 6,
          "rep": 4,
          "iq": 3,
          "capital": -1200
        },
        "tag": "经纬自立"
      },
      {
        "text": "【急功近利】头脑发热买名牌衣着充阔气 · 月末囊空如洗向同事四处借债（虚荣破财陷阱）",
        "outcomeText": "虚荣招致同僚私下议论，信用受挫且生活陷入狼狈，清廉与心性锐气双跌！",
        "effects": {
          "clean": -4,
          "rep": -3,
          "capital": -2000
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "急功近利"
      }
    ]
  },
  {
    "id": "youth_night_school_exam",
    "title": "📖 夜大电大 · 挑灯夜战文凭进修与工学矛盾",
    "minAge": 18,
    "maxAge": 26,
    "track": "all",
    "desc": "为弥补学历短板，你报名了夜间高等教育进修班。恰逢单位面临阶段性攻坚任务，白天顶岗、夜晚骑车赶考身心俱疲：",
    "choices": [
      {
        "text": "咬紧牙关两头不误 · 深夜在楼道微弱灯光下背诵复习题库",
        "outcomeText": "各门统考全优通过，顺利斩获文凭并立功受奖！智谋+7，心性抗逆+6；代价：体魄-4，精力-6。",
        "effects": {
          "iq": 7,
          "resilience": 6,
          "health": -4,
          "sp": -6
        },
        "tag": "悬梁刺股"
      },
      {
        "text": "以所学理论反哺解决白天一线难关 · 申请单位产学研公假支持",
        "outcomeText": "不仅学以致用，更推动单位立项技术攻关，获得学费全额报销！智谋+6，资金+¥2,500；代价：精力-4。",
        "effects": {
          "iq": 6,
          "capital": 2500,
          "sp": -4
        },
        "tag": "知行合一"
      },
      {
        "text": "【因循苟且】畏惧辛苦托人找关系花钱买替考 · 被考场巡视员当场抓获（弄虚作假陷阱）",
        "outcomeText": "通报批评记入人事档案，不仅资格作废更让前程蒙上巨大阴影！",
        "effects": {
          "clean": -8,
          "rep": -6,
          "resilience": -4,
          "capital": -1500
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "因循苟且"
      }
    ]
  },
  {
    "id": "youth_grassroots_stationing",
    "title": "🎒 青年拓荒 · 主动请缨扎根最艰苦边远站点",
    "minAge": 18,
    "maxAge": 26,
    "track": "all",
    "desc": "单位动员青年骨干前往最艰苦偏远的深山/海岛/基层站点拓荒蹲点，多数同龄人犹豫不决，组织征求你的个人意愿：",
    "choices": [
      {
        "text": "第一个在请战书上按红手印 · 背起行囊奔赴艰苦一线淬炼",
        "outcomeText": "疾风知劲草！艰苦磨砺铸就如钢意志，组织部重点列入后备苗子库！魄力+8，声望+7，心性+6；代价：体魄-4。",
        "effects": {
          "courage": 8,
          "rep": 7,
          "resilience": 6,
          "health": -4
        },
        "tag": "请缨破浪"
      },
      {
        "text": "服从大局安排但提出技术支援方案 · 搭建前后方远程协作网络",
        "outcomeText": "既保障了前线运转又稳住了后方阵地，展现过人的系统筹划大局观！智谋+6，情商+5，清廉+4；代价：精力-5。",
        "effects": {
          "iq": 6,
          "eq": 5,
          "clean": 4,
          "sp": -5
        },
        "tag": "顾全大局"
      },
      {
        "text": "【明哲保身】找借口托关系开假病假条赖在机关 · 被同事看扁沦为边缘人（避重就轻陷阱）",
        "outcomeText": "临阵退缩丧失了挑大梁的机会，同侪敬而远之，心性锐气与前途全面受损！",
        "effects": {
          "rep": -6,
          "courage": -5,
          "clean": -4
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "明哲保身"
      }
    ]
  },
  {
    "id": "youth_technological_spark",
    "title": "💡 青年突击 · 班组首个工艺小改小革破冰",
    "minAge": 18,
    "maxAge": 26,
    "track": "all",
    "desc": "在一线重复操作中，你敏锐发现了沿用多年的传统流程存在卡顿冗余，私下画了一张简易改良图纸，但有老资格职工劝你别出风头：",
    "choices": [
      {
        "text": "用废旧下脚料做出实物模型验证 · 用扎实的数据向主管据理力争",
        "outcomeText": "小改小革大获成功！年节约工时数百小时，全厂推广表彰！智谋+7，魄力+6；代价：精力-4。",
        "effects": {
          "iq": 7,
          "courage": 6,
          "sp": -4
        },
        "tag": "小改大革"
      },
      {
        "text": "联合班组年轻工友集体署名申报 · 将功劳分享给整个团队",
        "outcomeText": "班组凝聚力空前高涨，老工人也对你刮目相看，公认你是领头羊！情商+7，声望+6；代价：资金-¥500。",
        "effects": {
          "eq": 7,
          "rep": 6,
          "capital": -500
        },
        "tag": "群策群力"
      },
      {
        "text": "【急功近利】绕过车间把图纸私自卖给同城竞品小作坊 · 换取眼前私利（背信弃义陷阱）",
        "outcomeText": "私下越界行径东窗事发，不仅面临法律问责，更令师门蒙羞、行业封杀！",
        "effects": {
          "clean": -8,
          "rep": -8,
          "capital": -3000
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "急功近利"
      }
    ]
  },
  {
    "id": "youth_dormitory_solidarity",
    "title": "🛏️ 青工大院 · 单身集体宿舍里的患难真情",
    "minAge": 18,
    "maxAge": 25,
    "track": "all",
    "desc": "初入职场的同龄青工合住在八人一间的大铁床宿舍里，室友突发急病身无分文，而你手头也仅剩当月口粮钱：",
    "choices": [
      {
        "text": "毫不犹豫倾囊相助垫付医药费 · 连夜骑车护送室友送急诊",
        "outcomeText": "救人于危难！室友全家感激涕零，宿舍同侪视你为生死挚友！情商+7，心性+6，声望+5；代价：资金-¥600，体魄-2。",
        "effects": {
          "eq": 7,
          "resilience": 6,
          "rep": 5,
          "capital": -600,
          "health": -2
        },
        "tag": "患难金兰"
      },
      {
        "text": "连夜敲开隔壁宿舍房门组织爱心募捐 · 协同工会走大病应急互助通道",
        "outcomeText": "短时间筹齐手术费并为单位建立起青年职工互助基金，深得领导赞赏！情商+6，清廉+5，智谋+4；代价：精力-4。",
        "effects": {
          "eq": 6,
          "clean": 5,
          "iq": 4,
          "sp": -4
        },
        "tag": "众木成林"
      },
      {
        "text": "【冷漠自私】佯装熟睡不闻不问 · 甚至因室友呻吟吵醒而恶语相向（刻薄寡恩陷阱）",
        "outcomeText": "冷酷自私令人齿冷，从此被全楼青年孤立，口碑与人脉跌入谷底！",
        "effects": {
          "eq": -6,
          "rep": -5,
          "resilience": -4
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "因循苟且"
      }
    ]
  },
  {
    "id": "youth_urgent_overtime_battle",
    "title": "⏰ 岁末倒计时 · 青年突击队挑灯通宵抢进度",
    "minAge": 18,
    "maxAge": 26,
    "track": "all",
    "desc": "年关收尾，单位面临跨年度紧急交付大考，青年团支部成立“青年先锋突击队”，号召连续三日换班不下火线：",
    "choices": [
      {
        "text": "主动请缨值守最艰险的后半夜班次 · 顶风冒雪确保流水线零故障",
        "outcomeText": "按期交出满分答卷！荣获青年突击手称号，组织记大功一次！魄力+8，声望+7；代价：体魄-4，精力-6。",
        "effects": {
          "courage": 8,
          "rep": 7,
          "health": -4,
          "sp": -6
        },
        "tag": "青年先锋"
      },
      {
        "text": "精心优化工序交接表与夜班保供姜汤 · 科学调度保障全员安全零事故",
        "outcomeText": "科学抢工无一人掉队，全厂事故率为零，被誉为最沉稳的青年调度员！智谋+6，情商+6，清廉+4；代价：精力-4。",
        "effects": {
          "iq": 6,
          "eq": 6,
          "clean": 4,
          "sp": -4
        },
        "tag": "有条不紊"
      },
      {
        "text": "【因循苟且】躲在更衣室打瞌睡摸鱼 · 险些导致关键阀门超压失控（玩忽职守陷阱）",
        "outcomeText": "侥幸未酿惨祸但被现场巡视通报批评，扣除年终奖且在同行中沦为反面教材！",
        "effects": {
          "clean": -5,
          "rep": -5,
          "capital": -1000
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "因循苟且"
      }
    ]
  },
  {
    "id": "youth_skills_grand_contest",
    "title": "🏆 岗位擂台 · 全市青工职业技能大赛选拔",
    "minAge": 18,
    "maxAge": 26,
    "track": "all",
    "desc": "全市选拔优秀青年技术能手参加大比武，单位仅有一个选送名额，你与另一位老骨干的关门弟子势均力敌：",
    "choices": [
      {
        "text": "心无旁骛在模拟台上刻苦打磨微米级基本功 · 凭绝对硬实力打擂",
        "outcomeText": "考场发挥神勇一举夺魁！市级青工冠军奖状光耀门楣！智谋+8，魄力+6，声望+6；代价：体魄-2，精力-5。",
        "effects": {
          "iq": 8,
          "courage": 6,
          "rep": 6,
          "health": -2,
          "sp": -5
        },
        "tag": "一战扬名"
      },
      {
        "text": "坦诚与竞争对手切磋技术盲区 · 相约无论谁胜出都共享全套备赛数据",
        "outcomeText": "展现出真正的大将风度与坦荡胸襟，两人双双斩获优胜，传为业界佳话！情商+7，心性+6，声望+5；代价：精力-4。",
        "effects": {
          "eq": 7,
          "resilience": 6,
          "rep": 5,
          "sp": -4
        },
        "tag": "惺惺相惜"
      },
      {
        "text": "【下作构陷】暗中损坏对手参赛工具让其考场失误 · 妄图不正当上位（道德败坏陷阱）",
        "outcomeText": "下作手段被现场仲裁监控严厉识破，开除竞赛资格并通报全系统，名声彻底扫地！",
        "effects": {
          "clean": -10,
          "rep": -8,
          "resilience": -5
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "急功近利"
      }
    ]
  },
  {
    "id": "elder_advisory_council_call",
    "title": "🏛️ 晚晴谘议 · 退休返聘行业重大战略专家组",
    "minAge": 65,
    "maxAge": 95,
    "track": "all",
    "desc": "离开一线领导岗位后，国家/行业重大工程专家委员会特聘你为资深战略顾问，就新一代跨世纪项目审议把脉：",
    "choices": [
      {
        "text": "仗义执言不当签字机器 · 亲自排查出项目立项报告中三项冒进隐患",
        "outcomeText": "老臣定海神针！为国家挽回数十亿潜在损失，高层批示高度赞誉你的风骨！智谋+8，声望+8，清廉+6；代价：精力-4。",
        "effects": {
          "iq": 8,
          "rep": 8,
          "clean": 6,
          "sp": -4
        },
        "tag": "老成谋国"
      },
      {
        "text": "重点扶持年轻项目领军团队 · 将评审意见转化为青年学者成长建议书",
        "outcomeText": "后生受教铭感五内，老专家传帮带美名传颂全行业！情商+8，声望+7，心性+6；代价：精力-3。",
        "effects": {
          "eq": 8,
          "rep": 7,
          "resilience": 6,
          "sp": -3
        },
        "tag": "甘为人梯"
      },
      {
        "text": "【因循苟且】随大流逢迎签字拿高额车马费 · 对明显技术硬伤视而不见（晚节蒙尘陷阱）",
        "outcomeText": "项目后续出险牵出签名专家名单，一世英名晚节蒙羞，声誉与清廉操守大跌！",
        "effects": {
          "clean": -8,
          "rep": -7,
          "resilience": -4,
          "capital": -5000
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "因循苟且"
      }
    ]
  },
  {
    "id": "elder_lifelong_memoir_press",
    "title": "📖 毕生手稿 · 五十年行业拓荒笔记付梓出版",
    "minAge": 66,
    "maxAge": 95,
    "track": "all",
    "desc": "国家权威出版社希望整理你半世纪以来的亲历日志与学术手札，出版《大国亲历者文存》，面对稿酬与发行：",
    "choices": [
      {
        "text": "严格校勘字句秉笔直书 · 将全额版税设立青年科研扶持基金",
        "outcomeText": "史料翔实成为国家典籍传世力作，版税基金惠泽百千学子！智谋+8，声望+9，清廉+7；代价：体魄-2。",
        "effects": {
          "iq": 8,
          "rep": 9,
          "clean": 7,
          "health": -2
        },
        "tag": "立言垂范"
      },
      {
        "text": "重点将镜头与篇幅留给当年并肩奋斗的无名战友和工匠师傅们",
        "outcomeText": "字里行间见公心真情，感动无数读者，斩获国家图书大奖！情商+8，声望+8，心性+6；代价：精力-4。",
        "effects": {
          "eq": 8,
          "rep": 8,
          "resilience": 6,
          "sp": -4
        },
        "tag": "功不独居"
      },
      {
        "text": "【夸大贪功】默许枪手撰稿添枝加叶 · 把集体功劳全部据为己有（贪天之功陷阱）",
        "outcomeText": "传记出版后遭多位当年老战友联名刊文勘误批驳，晚节不保声名受挫！",
        "effects": {
          "rep": -7,
          "clean": -6,
          "resilience": -4
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "急功近利"
      }
    ]
  },
  {
    "id": "elder_young_scholar_endowment",
    "title": "🌱 桑梓反哺 · 捐出毕生积蓄设立青年成长励学金",
    "minAge": 66,
    "maxAge": 95,
    "track": "all",
    "desc": "看到母校与故乡家境贫寒的青年学子勤奋苦读，你翻开自己一生的存折，考虑如何为下一代铺路：",
    "choices": [
      {
        "text": "捐资建立永久性“寒窗破浪”奖学金 · 资助百名贫寒学子圆梦大学",
        "outcomeText": "善泽流芳千古！受助学子中涌现出多位院士与行业骨干，世家声誉如日中天！声望+10，清廉+8，心性+7；代价：资金-¥30,000。",
        "effects": {
          "rep": 10,
          "clean": 8,
          "resilience": 7,
          "capital": -30000
        },
        "tag": "德泽后学"
      },
      {
        "text": "不仅出资更亲自定期给受助学子回信谈心 · 传授人生抗逆与立身之道",
        "outcomeText": "成为年轻人心中最温暖的指路明灯，精神丰碑传世！情商+8，声望+8，心性+6；代价：资金-¥12,000，精力-4。",
        "effects": {
          "eq": 8,
          "rep": 8,
          "resilience": 6,
          "capital": -12000,
          "sp": -4
        },
        "tag": "春风化雨"
      },
      {
        "text": "【小器守财】任由晚辈挥霍挥金如土 · 对寒门后生之难冷漠以对（守财奴陷阱）",
        "outcomeText": "子孙骄奢成性败尽家财，更失了宗族社会声望，留下无尽长叹！",
        "effects": {
          "rep": -6,
          "clean": -4,
          "resilience": -3,
          "capital": -10000
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "因循苟且"
      }
    ]
  },
  {
    "id": "elder_national_oral_history",
    "title": "🎙️ 岁月留声 · 国家现代史博物馆口述实录建档",
    "minAge": 68,
    "maxAge": 96,
    "track": "all",
    "desc": "国家口述历史团队带着摄像设备登门造访，请你对着镜头还原当年历史关头的内幕与未曾公开的心路历程：",
    "choices": [
      {
        "text": "不隐恶不虚美实事求是 · 为国家保留下一份不可磨灭的真实一手信史",
        "outcomeText": "真情实感力透纸背！成为国家一级档案馆永久封存的珍贵信史档案！智谋+8，清廉+8，声望+7；代价：体魄-2。",
        "effects": {
          "iq": 8,
          "clean": 8,
          "rep": 7,
          "health": -2
        },
        "tag": "实事求是"
      },
      {
        "text": "倾心讲述基层建设者与无名英雄的故事 · 让光辉照耀在普通人身上",
        "outcomeText": "纪录片网络播映催人泪下，全网青年观众掀起“向老一辈致敬”热潮！情商+8，声望+9，心性+6；代价：精力-3。",
        "effects": {
          "eq": 8,
          "rep": 9,
          "resilience": 6,
          "sp": -3
        },
        "tag": "人民史观"
      },
      {
        "text": "【随波逐流】照本宣科说官话套话 · 浪费珍贵的国家级历史立卷机会（平庸纯负陷阱）",
        "outcomeText": "空洞乏味未能留下任何有价值的历史细节，档案评级降为次等，抱憾终生！",
        "effects": {
          "rep": -4,
          "resilience": -3
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "明哲保身"
      }
    ]
  },
  {
    "id": "elder_clan_genealogy_preface",
    "title": "🏮 传家序跋 · 四世同堂宗族重修家谱提笔立训",
    "minAge": 70,
    "maxAge": 96,
    "track": "all",
    "desc": "家族第四代添丁，宗族长辈一致公推你为新修家谱作序，并为后世子孙题写立身治家规箴：",
    "choices": [
      {
        "text": "亲题“耕读传家、守正自律”八字家风 · 严禁子弟借名谋取非分之财",
        "outcomeText": "正气盈门！后世儿孙皆恪守清白，宗族成为远近闻名的名门望族！操守清廉+9，声望+8，心性+7；代价：资金-¥5,000。",
        "effects": {
          "clean": 9,
          "rep": 8,
          "resilience": 7,
          "capital": -5000
        },
        "tag": "门风垂范"
      },
      {
        "text": "设宗族创业与进修互助义庄基金 · 重点扶持家族青年学业创新",
        "outcomeText": "家族人才辈出枝繁叶茂，展现出跨世纪的名门底蕴与生生不息！资金周转+¥18,000，情商+8，声望+7；代价：资金-¥15,000。",
        "effects": {
          "capital": 3000,
          "eq": 8,
          "rep": 7
        },
        "tag": "义庄庇族"
      },
      {
        "text": "【纵容骄横】利用余威为不肖子弟大肆打招呼谋私利（晚节不保陷阱）",
        "outcomeText": "特权行径遭人实名举报通报，一世清白毁于一旦，宗族蒙羞受辱！",
        "effects": {
          "clean": -10,
          "rep": -8,
          "capital": -10000
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "急功近利"
      }
    ]
  },
  {
    "id": "elder_old_comrades_toast",
    "title": "🕯️ 鲐背之交 · 几十年老战友老搭档最后茶叙",
    "minAge": 70,
    "maxAge": 96,
    "track": "all",
    "desc": "当年并肩作战的老同事跨越千里来探望，两位耄耋长者手拉着手坐在藤椅上，笑看风云淡：",
    "choices": [
      {
        "text": "相视一笑尽释往年分歧与误会 · 共饮清茶畅叙时代天翻地覆之变",
        "outcomeText": "心胸旷达如江海，身心通泰延年益寿！心性抗逆+9，体魄+5，声望+6；代价：精力-2。",
        "effects": {
          "resilience": 9,
          "health": 5,
          "rep": 6,
          "sp": -2
        },
        "tag": "冰释前嫌"
      },
      {
        "text": "将二人合照与平生共事心得装裱题词 · 赠予两家晚辈共勉接续友谊",
        "outcomeText": "两代交游世交弥坚，长者风范令人肃然起敬！情商+8，声望+7，操守+5；代价：资金-¥2,000。",
        "effects": {
          "eq": 8,
          "rep": 7,
          "clean": 5,
          "capital": -2000
        },
        "tag": "金石之交"
      },
      {
        "text": "【斤斤计较】当面翻陈年旧账争论谁对谁错 · 气急败坏不欢而散（狭隘伤身陷阱）",
        "outcomeText": "狭隘执拗不仅伤害了垂暮挚友，更诱发高血压病倒入院，体魄与心性大损！",
        "effects": {
          "health": -6,
          "resilience": -5,
          "eq": -5
        },
        "isTrapOption": true,
        "isPureNegative": true,
        "tag": "因循苟且"
      }
    ]
  }
];

// ==========================================
// ⚖️ P0 核心闭环：全量决策事件规范化、代价补齐、三元两难结构与支线联动引擎
// ==========================================

module.exports = {
  PROCEDURAL_ANNUAL_ENCOUNTER_POOL
};
