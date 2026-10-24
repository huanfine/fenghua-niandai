// 华夏三千年世家大系 · 未来推演前沿引擎 (FutureFrontierEngine)
// 全系时间轴：公元 100 年 ～ 3100 年（整整3000年跨度）
// 第一阶段研发视界：公元 2100 年；第二阶段百年深空纪元：公元 2100 ～ 3100 年
// 【特别说明】：未来推演场景均属于基于硬核前沿科技发展的宏观科幻沙盒推演，文中所涉机构、工程与事件皆为艺术化架空设计，绝不代表真实机构或现实既成事实。

// 全服世界时钟常量 (支持服务端配置与动态计算)
const GLOBAL_WORLD_CHRONO = {
  systemTitle: '华夏三千年世家大系',
  startYear: 100,             // 公元100年 (东汉末年筑基)
  endYear: 3100,               // 公元3100年 (三千载宏观终局)
  spanYears: 3000,             // 跨度 3000 年 (公元100~3100年)
  yearsPerGeneration: 50,      // 统一标准：平均50年一世，三千年约60世

  // 两大阶段战略视界划分
  phases: {
    phase1: {
      id: 'phase1_historic_and_near_future',
      name: '筑基至近未来视界',
      startYear: 100,
      horizonYear: 2100,
      spanYears: 2000,
      desc: '第一阶段视界（公元100~2100年）：两千年风云筑基与近未来星汉初开'
    },
    phase2: {
      id: 'phase2_deep_space_centennial',
      name: '深空与星汉未来纪元',
      startYear: 2100,
      horizonYear: 3100,
      spanYears: 1000,
      desc: '第二阶段百年纪元（公元2100~3100年）：地月系、内太阳系与柯伊伯带深空世家探索'
    }
  },

  // 当前客户端与内容研发的第一阶段视界（公元2100年）
  horizonYear: 2100,
  // 运营当前实际开放的前沿线年份（开服设为2035，随运营热更推进）
  defaultFrontierYear: 2035
};

/**
 * 根据年份动态计算传承世数 (世数 = 历经年数 / 每世年数)
 */
function calculateGenerationCount(startYear = GLOBAL_WORLD_CHRONO.startYear, targetYear = 2026, yearsPerGen = GLOBAL_WORLD_CHRONO.yearsPerGeneration) {
  const elapsed = Math.max(0, targetYear - startYear);
  return Math.max(1, Math.round(elapsed / yearsPerGen));
}

/**
 * 动态生成精准年数的前沿提示语，消除硬编码文案偏差
 */
function getFrontierBarrierPrompt(currentYear = 2026, frontierYear = GLOBAL_WORLD_CHRONO.defaultFrontierYear) {
  const elapsedYears = Math.max(0, currentYear - GLOBAL_WORLD_CHRONO.startYear);
  const remainingYears = Math.max(0, GLOBAL_WORLD_CHRONO.endYear - currentYear);
  return {
    title: '岁月未至 · 天机尚隐',
    quote: `${elapsedYears}载风云皆成过往，${remainingYears}年星汉浩瀚待开。先祖垂眸凝视，且待下一个时代风云际会……`,
    subText: '本世家已昂首迈至时代前沿！请前往【宗祠大院】进香祭祖、打理家族信托、或与同盟世家联姻。',
    elapsedYears,
    remainingYears,
    frontierYear
  };
}


// 2026至2100年：八个未来关键时代节点事件库 (每10年一大转折，科幻推演)
const FUTURE_DECADE_SCENARIOS = [
  {
    year: 2030,
    title: '2030 · 超导破晓与具身智能',
    historicalContext: '常温超导材料在特区实验室实现兆瓦级实测，人形具身机器人全面进入千行百业。产业大变革在即（推演）。',
    options: [
      {
        text: '重仓投资超导磁悬浮交通与工业母机生态',
        cost: { money: 50000 },
        successReward: {
          money: 300000,
          clanPrestige: 60,
          chronicleText: '抢占超导先机，布局工业新基建，家族成为新一代大国重器链主企业。'
        },
        macroWeight: { highTech: +1.2 }
      },
      {
        text: '聚焦家庭智能养老照护与情感陪伴机器人',
        cost: { money: 30000 },
        successReward: {
          money: 180000,
          morality: 40,
          clanPrestige: 50,
          chronicleText: '深耕银发大健康与智慧医养，造福数百万家庭，荣获国际银发康养卓越贡献金奖（推演）。'
        },
        macroWeight: { bioHealth: +1.1 }
      },
      {
        text: '以技术顾问与标准智库切入具身智能算法产学研合作',
        cost: { money: 3000 },
        successReward: {
          money: 35000,
          iq: 20,
          clanPrestige: 30,
          chronicleText: '立足经学治世与技术公约，主导行业开源标准，以极低门槛稳健切入未来智能前沿。'
        },
        macroWeight: { highTech: +0.6, ethics: +0.8 }
      }
    ]
  },
  {
    year: 2040,
    title: '2040 · 聚变点火与新型电网',
    historicalContext: '前沿可控核聚变示范工程实现商业化“高Q值持续放电”，无限清洁能源重塑宏观产业格局（科幻推演）。',
    options: [
      {
        text: '联合超导智能电网投建超大规模算力聚变园区',
        cost: { money: 80000 },
        successReward: {
          money: 500000,
          clanPrestige: 80,
          chronicleText: '构建清洁能源智算中枢，为千万大模型提供不竭动力，家族名望如日中天。'
        },
        macroWeight: { highTech: +1.5, cleanEnergy: +1.8 }
      },
      {
        text: '布局深海盐湖提取高纯氘氚聚变燃料供应链',
        cost: { money: 60000 },
        successReward: {
          money: 420000,
          resilience: 40,
          chronicleText: '把控聚变关键稀有同位素源头，立于不败之地。'
        },
        macroWeight: { deepOcean: +1.4 }
      }
    ]
  },
  {
    year: 2050,
    title: '2050 · 万米深蓝与可燃冰商业化',
    historicalContext: '南海万米深海空间站建立，海底富钴结壳与可燃冰正式进入无人潜航规模开采阶段。',
    options: [
      {
        text: '建造拥有千米下潜作业能力的远洋无人采矿舰队',
        cost: { money: 100000 },
        successReward: {
          money: 750000,
          clanPrestige: 90,
          chronicleText: '远征深蓝，采获战略资源无数，家族成为全球深海采掘翘楚。'
        },
        macroWeight: { deepOcean: +2.0 }
      },
      {
        text: '设立深海生物多样性保护与人工珊瑚生态保育信托',
        cost: { money: 50000 },
        successReward: {
          morality: 80,
          clanPrestige: 75,
          chronicleText: '平衡开发与生态，荣获全球人道与自然守护大奖，万代敬仰。'
        },
        macroWeight: { ecology: +1.5 }
      }
    ]
  },
  {
    year: 2060,
    title: '2060 · 近地轨道空间电站与天梯',
    historicalContext: '赤道天梯基座首期工程奠基，静止轨道兆瓦级空间太阳能电站实现微波向地面高效输电。',
    options: [
      {
        text: '承揽空间电站超高强度碳纳米管微波反射膜总装',
        cost: { money: 150000 },
        successReward: {
          money: 1200000,
          clanPrestige: 110,
          relicId: 'carbon_nanotube_blueprint',
          chronicleText: '筑就通天之径，在近地轨道刻下家族徽记，光耀苍穹！'
        },
        macroWeight: { spaceIndustry: +2.2 }
      },
      {
        text: '建设地面平流层超音速客运中转航空港',
        cost: { money: 80000 },
        successReward: {
          money: 600000,
          resilience: 50,
          chronicleText: '联通全球主要城市群，两小时直达天涯海角，海内名扬。'
        },
        macroWeight: { infrastructure: +1.3 }
      }
    ]
  },
  {
    year: 2070,
    title: '2070 · 脑机互联与意识外脑',
    historicalContext: '第三代侵入式全光神经接口获全球准入，人类思维与行星云端知识库实现零延迟光速共鸣。',
    options: [
      {
        text: '开发族人专属【家族数字宗祠智库】，将历代先祖毕生智慧数字化永存',
        cost: { money: 120000 },
        successReward: {
          iq: 60,
          clanPrestige: 100,
          relicId: 'ancestral_cloud_matrix',
          chronicleText: '先贤意念永续长存！后代子孙随时可与两千年前的始祖意念对话，汲取无穷大智慧！'
        },
        macroWeight: { highTech: +1.8 }
      },
      {
        text: '倡导建立严密《生物脑主权防入侵保护法典》，设立安全隔离芯片工坊',
        cost: { money: 90000 },
        successReward: {
          morality: 70,
          clanPrestige: 95,
          chronicleText: '捍卫人类精神终极净土，成为科技向善的文明守护者。'
        },
        macroWeight: { ethics: +1.6 }
      }
    ]
  },
  {
    year: 2080,
    title: '2080 · 月球南极工业与火星穹顶',
    historicalContext: '月球南极艾特肯盆地常驻科研城落成，第一座火星封闭生态试验穹顶迎来第一批世家移民。',
    options: [
      {
        text: '派遣精锐分家分支，远赴火星穹顶建立【火星陈氏开基祖茔】',
        cost: { money: 200000 },
        successReward: {
          courage: 80,
          clanPrestige: 150,
          branchTag: 'mars_dome_branch',
          chronicleText: '跨越星河！华夏世家分支立足红色星球，家族谱系正式向地外星海延展！'
        },
        macroWeight: { spaceIndustry: +2.5 }
      },
      {
        text: '留守母星，主持黄河与塔里木盆地全境人造气候湿润化大工程',
        cost: { money: 140000 },
        successReward: {
          morality: 90,
          clanPrestige: 120,
          chronicleText: '再造华夏故土河山，使塞外变为沃野千里鱼米之乡，立下千秋功德。'
        },
        macroWeight: { ecology: +2.0 }
      }
    ]
  },
  {
    year: 2090,
    title: '2090 · 跨世纪宏观大统',
    historicalContext: '新世纪最后一个十年到来。全球各世家在世界文明圆桌峰会上共同签署《地球文明和平进阶大宪章》（科幻推演）。',
    options: [
      {
        text: '发起创立【全球百家姓氏文明和平发展公益金】',
        cost: { money: 250000 },
        successReward: {
          morality: 100,
          clanPrestige: 180,
          officialTitle: '地球文明和平长者',
          chronicleText: '主盟天下世家，消弭纷争，宗族德馨照亮整个世纪！'
        },
        macroWeight: { peaceIndex: +3.0 }
      },
      {
        text: '全力出资研制首艘光帆加速星际先遣探测飞船',
        cost: { money: 300000 },
        successReward: {
          money: 2000000,
          clanPrestige: 200,
          chronicleText: '驶向比邻星！飞船船体刻铸我族堂号，流芳万代！'
        },
        macroWeight: { spaceIndustry: +3.0 }
      }
    ]
  },
  {
    year: 2100,
    title: '2100 · 第一阶段巅峰大典 (Phase 1 Horizon Epoch)',
    historicalContext: '公元 2100 年！世家大系第一阶段两千年历程圆满达成，回望东汉以来的沧海桑田，家族巍然矗立！',
    options: [
      {
        text: '主持全家族跨星球祭祖大典，宣布家族正式成为【第一阶段不朽门阀】',
        reqTrack: 'official',
        reqStat: 'rep',
        reqVal: 70,
        successReward: {
          clanPrestige: 300,
          rep: 50,
          posthumousTitle: '世纪文昭公',
          chronicleText: '两千载风刀霜剑，四十代薪火不绝！第一阶段筑基圆满，第二阶段星汉初开，万古流芳！'
        },
        failPenalty: {
          rep: -15,
          chronicleText: '大典仪轨繁复偶有瑕疵，虽微有波折，然两千年文脉依然令海内景仰。'
        }
      },
      {
        text: '斥资设立【华夏三千年文明传承信托母基金】，置办不可分割之数字义庄',
        cost: { money: 100000 },
        reqTrack: 'merchant',
        reqStat: 'iq',
        reqVal: 65,
        successReward: {
          clanPrestige: 260,
          morality: 50,
          clean: 40,
          chronicleText: '效法范公义田之志，立下星际母基金，周济天下同宗，万代安稳。'
        },
        failPenalty: {
          money: -15000,
          chronicleText: '跨星际信托法律合规受挫，多方斡旋后方告落成。'
        }
      },
      {
        text: '组建家族第一支深空拓荒探险旗舰远征队，扬帆进军地月与火星前沿',
        cost: { money: 120000 },
        reqTrack: 'military',
        reqStat: 'courage',
        reqVal: 70,
        successReward: {
          clanPrestige: 280,
          courage: 60,
          officialTitle: '深空先驱开国候',
          chronicleText: '乘风破浪驶向深空！族中健儿为家族抢占星辰大海首期战略领地！'
        },
        failPenalty: {
          health: -20,
          chronicleText: '深空强辐射风暴导致护航旗舰受损折返，然拓荒胆魄惊艳时代。'
        }
      }
    ]
  },
  {
    year: 2150,
    title: '2150 · 地月天梯与月海筑基',
    historicalContext: '地月第二座超导磁力天梯竣工，月球风暴洋与雨海基地实现常驻百万人口自给自足。',
    options: [
      {
        text: '开辟月海生态农庄与稀土氦三聚变开采联合体',
        cost: { money: 150000 },
        successReward: { money: 900000, clanPrestige: 160, chronicleText: '建基月海，成为月球拓荒第一批世家领袖。' }
      },
      {
        text: '出资共建月球综合太学书院与中华典籍星际深藏地宫',
        cost: { money: 80000 },
        successReward: { iq: 50, clanPrestige: 150, chronicleText: '使先秦两汉以降三千年文脉深刻于月岩之上，万劫不灭。' }
      },
      {
        text: '组建月球极轨常驻护卫巡防队，保障超导天梯运转与地月航道安全',
        cost: { money: 100000 },
        successReward: { courage: 50, clanPrestige: 140, chronicleText: '枕戈月海，统帅天梯护卫编队，保障千万人平稳往来地月之间。' }
      }
    ]
  },
  {
    year: 2200,
    title: '2200 · 火星生态穹顶与地外赤道环',
    historicalContext: '火星水手峡谷首座人造磁场穹顶城市落成，地表首片人工绿洲播撒成功。',
    options: [
      {
        text: '向火星派遣第三代宗族开拓分家，建立【火星拓荒宗祠】',
        cost: { money: 200000 },
        successReward: { courage: 70, clanPrestige: 220, branchTag: 'mars_prime_branch', chronicleText: '跨星播迁，宗脉在红色星球生根发芽，传世久远。' }
      },
      {
        text: '投资行星引力辅助货运轨道环，执掌地火物流主航道',
        cost: { money: 120000 },
        successReward: { money: 1200000, clanPrestige: 190, chronicleText: '畅通星海商路，富比陶朱，声名播于两星之间。' }
      },
      {
        text: '联合火星各界学者编修《火星开基首部乡规民约与宗族通史》',
        cost: { money: 90000 },
        successReward: { clean: 50, clanPrestige: 180, chronicleText: '以华夏礼乐规正火星开基秩序，被各穹顶城邦公推为文治大老。' }
      }
    ]
  },
  {
    year: 2300,
    title: '2300 · 小行星带开采与内太阳系聚变网',
    historicalContext: '谷神星与灶神星成为内太阳系工业枢纽，高Q值氦三聚变网全域覆盖。',
    options: [
      {
        text: '组建小行星带全自动深空采矿远征船团',
        cost: { money: 250000 },
        successReward: { money: 1800000, clanPrestige: 260, chronicleText: '开采金属小行星无数，奠定太阳系工业巨擘地位。' }
      },
      {
        text: '制定《太阳系小行星公约》，倡建深空航行安全救援基金',
        cost: { money: 100000 },
        successReward: { morality: 90, clanPrestige: 240, chronicleText: '仁心昭于星海，救护远航孤旅，深得全服万民敬颂。' }
      },
      {
        text: '在小行星带核心设立深空华夏药植温室，培育耐辐射长生灵草',
        cost: { money: 150000 },
        successReward: { health: 60, clanPrestige: 230, chronicleText: '岐黄通微！研制抗宇宙射线本草合剂，全活拓荒矿工无数。' }
      }
    ]
  },
  {
    year: 2400,
    title: '2400 · 木卫群冰海科考与深空引力走廊',
    historicalContext: '木卫二欧罗巴冰下海洋科研城建立，深空引力弹弓走廊直抵太阳系边缘。',
    options: [
      {
        text: '深潜木卫二千米冰下海洋探寻外星原始生命起源',
        cost: { money: 300000 },
        successReward: { iq: 80, clanPrestige: 300, chronicleText: '揭开冰海生命奥秘，宗族名氏载入人类自然哲学终极史册。' }
      },
      {
        text: '在木星拉格朗日点投建全自动氢核聚变补给母港',
        cost: { money: 180000 },
        successReward: { money: 2200000, clanPrestige: 280, chronicleText: '握住外太阳系交通枢纽命门，四方星舰皆依我港。' }
      },
      {
        text: '在木星强辐射外围营建抗辐射宗祠方舟，测试意识长生技术',
        cost: { money: 220000 },
        successReward: { resilience: 70, clanPrestige: 270, chronicleText: '攻克行星际强磁暴与辐射防护难题，筑牢深空家族生存基石。' }
      }
    ]
  },
  {
    year: 2500,
    title: '2500 · 太阳系戴森云环首期并网',
    historicalContext: '环绕太阳的巨型光能收集戴森蜂群首期竣工，人类文明跨入二级恒星能级文明。',
    options: [
      {
        text: '承揽戴森云环近日点能量微波集束传输骨干枢纽',
        cost: { money: 400000 },
        successReward: { money: 3500000, clanPrestige: 400, chronicleText: '汲取恒星之火！家族名讳与太阳光辉同辉，功盖千秋。' }
      },
      {
        text: '设立全太阳系戴森生态庇护所，护卫地球母星自然气候',
        cost: { money: 200000 },
        successReward: { morality: 100, clanPrestige: 360, chronicleText: '反哺母星，使地球永保蔚蓝山水，被尊为母星守护世家。' }
      },
      {
        text: '主导订立《太阳系戴森能源公平共享宪章》，遏制跨行星寡头垄断',
        cost: { money: 180000 },
        successReward: { clean: 80, clanPrestige: 380, chronicleText: '主持公道，确保平民城邦皆享恒星能源平价供给，万邦颂扬。' }
      }
    ]
  },
  {
    year: 2600,
    title: '2600 · 脑光量子宗祠与全家族智慧云矩阵',
    historicalContext: '全光脑机与量子纠缠网络普及，历代先祖的人格与智慧化作不灭意识长河。',
    options: [
      {
        text: '建立【百代光量子祖庙】，接入自公元100年以来的全代祖灵记忆',
        cost: { money: 300000 },
        reqTrack: 'scholar',
        reqStat: 'iq',
        reqVal: 75,
        successReward: { iq: 100, clanPrestige: 450, chronicleText: '五十一世薪火不灭！后世子孙心念一动即可与汉魏始祖促膝论道。' },
        failPenalty: { iq: -10, chronicleText: '量子纠缠矩阵同步遇阻，虽有延误但祖庙终得落成。' }
      },
      {
        text: '开源家族两千五百年经学与科技智库，铸造【天下大同文明光脑】',
        cost: { money: 200000 },
        reqTrack: 'recluse',
        reqStat: 'clean',
        reqVal: 70,
        successReward: { morality: 80, clean: 60, clanPrestige: 400, chronicleText: '先天下之忧而忧！开源文明光脑普惠万兆民众，被尊为光脑仁圣宗门。' },
        failPenalty: { rep: -10, chronicleText: '开源公约引发部分宗亲争议，后经宗老协调方得平息。' }
      },
      {
        text: '营建深空抗坍缩移动意识方舟，确保宗族信息在任何超新星爆发下万劫不灭',
        cost: { money: 280000 },
        reqTrack: 'military',
        reqStat: 'resilience',
        reqVal: 75,
        successReward: { resilience: 70, clanPrestige: 420, chronicleText: '深谋远虑，纵遇恒星坍缩之灾，家族文明火种依然在深空方舟永存。' },
        failPenalty: { money: -30000, chronicleText: '方舟曲率外壳需追加预算加固，安全底线得以保障。' }
      }
    ]
  },
  {
    year: 2700,
    title: '2700 · 柯伊伯带深空前哨与奥尔特云城',
    historicalContext: '太阳系最远疆域柯伊伯带与奥尔特星云哨所建立，人类目光投向4光年外的群星。',
    options: [
      {
        text: '出资建造柯伊伯带深空冰核物质补给站，垄断外太阳系通商航路',
        cost: { money: 350000 },
        reqTrack: 'merchant',
        reqStat: 'iq',
        reqVal: 75,
        successReward: { money: 3000000, clanPrestige: 420, chronicleText: '守望太阳系边疆，成为人类眺望深空最辽远的瞭望塔与货殖中枢。' },
        failPenalty: { money: -40000, chronicleText: '冰核开采受小行星撞击受挫，周期拉长。' }
      },
      {
        text: '设立奥尔特云华夏传统宗族书院分院，向过往科考船散播诗书文脉',
        cost: { money: 250000 },
        reqTrack: 'scholar',
        reqStat: 'culture',
        reqVal: 70,
        successReward: { culture: 80, rep: 60, clanPrestige: 460, chronicleText: '星海弦歌不绝！两千六百年华夏诗文回荡在冰冷的奥尔特云端。' },
        failPenalty: { rep: -10, chronicleText: '深空生源稀疏，书院初期运转艰难，然文脉不绝。' }
      },
      {
        text: '组建柯伊伯带巡航护卫舰队，戍卫太阳系最辽远的边疆要塞',
        cost: { money: 400000 },
        reqTrack: 'military',
        reqStat: 'courage',
        reqVal: 80,
        successReward: { courage: 80, clanPrestige: 500, chronicleText: '横槊向星汉！族中子弟统领重型深空战舰，戍卫人类通往外星之门。' },
        failPenalty: { health: -15, chronicleText: '星海巡航折损重型巡逻艇数艘，官兵英勇涉险。' }
      }
    ]
  },
  {
    year: 2800,
    title: '2800 · 亚光速曲率光帆先遣舰队启航',
    historicalContext: '首批搭载反物质与激光光帆的恒星际联合舰队启航，向半人马座阿尔法星进发。',
    options: [
      {
        text: '派遣精锐分支族人随先遣舰队远航深空，开辟【星外宗支】',
        cost: { money: 450000 },
        reqTrack: 'official',
        reqStat: 'courage',
        reqVal: 80,
        successReward: { courage: 100, clanPrestige: 500, chronicleText: '驶向星辰大海！华夏宗族枝叶正式播散于太阳系之外！' },
        failPenalty: { rep: -15, chronicleText: '远征分家面临跨星光年失联考验，族人含泪相送。' }
      },
      {
        text: '研发第三代反物质曲率引擎核心聚能阵列，成为跨星系工业巨擘',
        cost: { money: 400000 },
        reqTrack: 'scholar',
        reqStat: 'iq',
        reqVal: 85,
        successReward: { iq: 100, clanPrestige: 600, chronicleText: '掌握跨恒星跃迁核心科技，千万星舰皆倚重我族聚能核心！' },
        failPenalty: { money: -50000, chronicleText: '反物质约束环聚能实验轻微过载，需追加重金抢修。' }
      },
      {
        text: '留守太阳系大本营，充当远航舰队的永固物资与通信中继中枢',
        cost: { money: 300000 },
        reqTrack: 'recluse',
        reqStat: 'resilience',
        reqVal: 75,
        successReward: { resilience: 80, clanPrestige: 480, chronicleText: '守望桑梓！在母星老家架设超长基线引力波天线，指引游子归航。' },
        failPenalty: { resilience: -10, chronicleText: '超长基线阵列遭遇太阳风暴干扰，彻夜调试方得恢复。' }
      }
    ]
  },
  {
    year: 2900,
    title: '2900 · 新华夏星系宜居行星开辟与宗祠大典',
    historicalContext: '先遣舰队抵达第二家园宜居行星，命名为【新华夏星】。地外首座宗祠隆重奠基。',
    options: [
      {
        text: '在新华夏星主陆板块建立【新元开基大宗祠】，迎入故土五行神木',
        cost: { money: 500000 },
        reqTrack: 'official',
        reqStat: 'rep',
        reqVal: 80,
        successReward: { clanPrestige: 600, rep: 80, chronicleText: '异域重开日月天！华夏衣冠风骨在第二母星傲然鼎立！' },
        failPenalty: { rep: -15, chronicleText: '地外开基立庙多有波折，然华夏衣冠傲立外星。' }
      },
      {
        text: '规划新华夏星千万平方公里生态宜居圈，构筑地热清洁能源网络',
        cost: { money: 450000 },
        reqTrack: 'recluse',
        reqStat: 'clean',
        reqVal: 75,
        successReward: { morality: 80, clean: 70, clanPrestige: 550, chronicleText: '拓荒新家园，兴修水利水力硙碾之星际版，安顿千万移民黎庶。' },
        failPenalty: { money: -50000, chronicleText: '地热钻探遭遇强地质断裂，追加物资方稳住生态圈。' }
      },
      {
        text: '订立《新华夏星移民自治乡约法典》，主导第二母星跨星系议会',
        cost: { money: 350000 },
        reqTrack: 'scholar',
        reqStat: 'iq',
        reqVal: 80,
        successReward: { clean: 80, iq: 60, clanPrestige: 580, chronicleText: '以宗约化育新邦，制定宪章，族人受推戴为主权议会首任议长。' },
        failPenalty: { rep: -10, chronicleText: '星际各城邦诉求纷繁，数番公听后方成法典。' }
      }
    ]
  },
  {
    year: 3000,
    title: '3000 · 银河百家姓文明网络共治大宪章',
    historicalContext: '公元3000年！跨恒星系的华夏文明共同体成立，百家姓宗族联盟大会在银河天心召开。',
    options: [
      {
        text: '代表母星华夏宗族主盟签署《银河百家姓文明长青法典》',
        reqTrack: 'official',
        reqStat: 'rep',
        reqVal: 85,
        successReward: { clanPrestige: 800, rep: 100, officialTitle: '银河文昌元老公', chronicleText: '三千载大道沧桑，今朝鼎盛冠盖银河！宗族声望与星汉同寿！' },
        failPenalty: { rep: -10, chronicleText: '诸星同盟代表商榷甚烈，最终共达文明长青公约。' }
      },
      {
        text: '发起设立跨光年量子纠缠紧急赈济与互助公积，惠及全星系同胞',
        cost: { money: 600000 },
        reqTrack: 'merchant',
        reqStat: 'iq',
        reqVal: 80,
        successReward: { morality: 120, clanPrestige: 750, chronicleText: '三千年宗族义田之法泽被全银河，亿万同宗守望相助，名满诸星。' },
        failPenalty: { money: -60000, chronicleText: '超光年公积网络架构庞大，协调多方方得平稳运转。' }
      },
      {
        text: '建立银河华夏先贤全息英烈万神殿，将三千年先祖伟业刻入银心巨碑',
        cost: { money: 500000 },
        reqTrack: 'scholar',
        reqStat: 'iq',
        reqVal: 80,
        successReward: { culture: 100, clanPrestige: 780, chronicleText: '万流归宗！全息英烈殿前万星朝拜，三千年衣冠风骨照耀银心。' },
        failPenalty: { rep: -10, chronicleText: '三千年全息英烈史料浩瀚，编纂历时经年方告蒇事。' }
      }
    ]
  },
  {
    year: 3100,
    title: '3100 · 三千年宏观终局 · 万世不朽丰碑 (Grand Final Millennium Horizon)',
    historicalContext: '公元 3100 年！从公元100年东汉末年坞壁筑基，历经三十个世纪、六十代薪火相传，世家大系达成三千年宏伟终局！',
    options: [
      {
        text: '敲响天地金钟，勒石刻铭，宣布家族正式达成【三千年不朽始祖功勋】',
        reqTrack: 'official',
        reqStat: 'rep',
        reqVal: 90,
        successReward: { clanPrestige: 1000, posthumousTitle: '开天立极不朽公', chronicleText: '三千载江河滔滔，六十世英豪辈出！凡华夏儿女，皆有本根。一脉相承，万古长青！' },
        failPenalty: { rep: -10, chronicleText: '三千载大道沧桑，金钟长鸣，虽有微憾终成万古伟业！' }
      },
      {
        text: '将三千年积聚的千万亿信托资产全数转入【华夏文明永久繁衍公益金】',
        reqTrack: 'recluse',
        reqStat: 'clean',
        reqVal: 85,
        successReward: { clanPrestige: 950, morality: 150, clean: 100, posthumousTitle: '至德至圣公', chronicleText: '取之于天下，还之于文明！亿万后人世代享用宗族永续福荫，功德无量！' },
        failPenalty: { clean: -10, chronicleText: '海量资产交割繁重，然取之于文明还之于后人，大德无双！' }
      },
      {
        text: '启动下一纪元【仙女座星系百万年远征计划】，带领宗族向更深宇宙扬帆起航！',
        reqTrack: 'military',
        reqStat: 'courage',
        reqVal: 90,
        successReward: { clanPrestige: 980, courage: 150, posthumousTitle: '星汉远征公', chronicleText: '三千载不过一瞬，更辽远的深空才是终极归宿！宗族旗舰再度拔锚启航！' },
        failPenalty: { courage: -10, chronicleText: '星际拔锚远航雄关漫道，旗舰承载族人希望启程。' }
      }
    ]
  }
];

/**
 * 校验世家是否可以推进到下一未来年代
 */
function checkFrontierAccessibility(familyProfileOrYear, currentFrontierYear = GLOBAL_WORLD_CHRONO.defaultFrontierYear) {
  const currentYear = typeof familyProfileOrYear === 'number'
    ? familyProfileOrYear
    : (familyProfileOrYear && familyProfileOrYear.timeline ? familyProfileOrYear.timeline.currentYear : 2026);

  // 1. 达到三千年终局 3100 年
  if (currentYear >= GLOBAL_WORLD_CHRONO.endYear) {
    return {
      canAdvance: false,
      reason: 'HORIZON_REACHED',
      message: '已达到世家大系之【三千载大成终局】（公元3100年）！三十个世纪波澜壮阔，华夏百家姓谱系已成为银河永恒丰碑！'
    };
  }

  // 若当前运营开放线未超过第一阶段视界（<=2100），达到2100即达成第一阶段巅峰视界
  if (currentFrontierYear <= GLOBAL_WORLD_CHRONO.horizonYear && currentYear >= GLOBAL_WORLD_CHRONO.horizonYear) {
    return {
      canAdvance: false,
      reason: 'HORIZON_REACHED',
      message: '已达到世家大系之【第一阶段视界】（公元2100年）！第二阶段深空与星汉百年纪元（公元2100~3100年）即将随运营开放！感谢您见证这漫长波澜的世家史诗！'
    };
  }

  // 2. 超过当前运营开放前沿线
  if (currentYear >= currentFrontierYear) {
    const prompt = getFrontierBarrierPrompt(currentYear, currentFrontierYear);
    return {
      canAdvance: false,
      reason: 'FRONTIER_BLOCKED',
      frontierYear: currentFrontierYear,
      barrierPrompt: prompt,
      message: `岁月未至（当前前沿：${currentFrontierYear}年）。请稍待运营开放下一个时代！`
    };
  }

  return {
    canAdvance: true,
    currentYear,
    frontierYear: currentFrontierYear
  };
}

/**
 * 执行指定年份的未来事件 (支持先祖体系与现代人生体系属性双向同步，且防止数值负溢出)
 */
function runFutureDecadeEvent(yearOrIndex, optionIndex, ancestorState) {
  const scenario = (typeof yearOrIndex === 'number' && yearOrIndex < 100)
    ? FUTURE_DECADE_SCENARIOS[yearOrIndex]
    : FUTURE_DECADE_SCENARIOS.find(s => s.year === yearOrIndex);
  if (!scenario) return null;
  const opt = scenario.options[optionIndex];
  if (!opt) return null;

  // 1. 属性与职业线检定判定
  let statKey = opt.reqStat;
  if (!statKey && opt.reqTrack) {
    const tr = String(opt.reqTrack).toLowerCase();
    if (['official', 'gov'].includes(tr)) statKey = 'rep';
    else if (['scholar', 'edu', 'tech'].includes(tr)) statKey = 'iq';
    else if (['merchant', 'biz', 'trade'].includes(tr)) statKey = 'iq';
    else if (['military', 'soldier'].includes(tr)) statKey = 'courage';
    else if (['recluse', 'med'].includes(tr)) statKey = 'clean';
    else statKey = 'courage';
  }
  if (statKey && typeof opt.reqVal === 'number') {
    const curVal = ancestorState[statKey] !== undefined ? ancestorState[statKey] : (ancestorState.courage || 50);
    if (curVal < opt.reqVal) {
      const pen = opt.failPenalty || {};
      for (const k in pen) {
        if (k !== 'chronicleText' && k !== 'text') {
          ancestorState[k] = (ancestorState[k] || 0) + pen[k];
        }
      }
      return {
        year: scenario.year,
        title: scenario.title,
        chosenText: opt.text,
        success: false,
        chronicleSnippet: pen.chronicleText || pen.text || '深空探险遭逢险阻，经受严峻考验。',
        macroWeight: {}
      };
    }
  }

  // 2. 校验并扣减成本 (杜绝族产扣成负数)
  if (opt.cost) {
    for (const k in opt.cost) {
      const c = opt.cost[k] || 0;
      if (k === 'money' || k === 'capital') {
        const cur = ancestorState.money !== undefined ? ancestorState.money : (ancestorState.capital || 0);
        const nextVal = Math.max(0, cur - c);
        ancestorState.money = nextVal;
        ancestorState.capital = nextVal;
      } else {
        ancestorState[k] = Math.max(0, (ancestorState[k] || 0) - c);
      }
    }
  }

  // 2. 发放奖励并同步双重属性体系 (先祖体系与当代人生体系无缝映射)
  const rew = opt.successReward || {};
  for (const k in rew) {
    if (k !== 'chronicleText' && k !== 'officialTitle' && k !== 'relicId') {
      const val = rew[k];
      if (k === 'money') {
        ancestorState.money = (ancestorState.money || 0) + val;
        ancestorState.capital = (ancestorState.capital || 0) + val;
      } else if (k === 'morality') {
        ancestorState.morality = (ancestorState.morality || 0) + val;
        ancestorState.clean = Math.min(100, (ancestorState.clean || 50) + Math.min(20, Math.floor(val * 0.3)));
      } else if (k === 'clanPrestige') {
        ancestorState.clanPrestige = (ancestorState.clanPrestige || 0) + val;
        ancestorState.rep = Math.min(100, (ancestorState.rep || 50) + Math.min(20, Math.floor(val * 0.2)));
      } else {
        ancestorState[k] = (ancestorState[k] || 0) + val;
      }
    }
  }
  if (rew.officialTitle) ancestorState.officialTitle = rew.officialTitle;
  if (rew.relicId) ancestorState.relicId = rew.relicId;

  return {
    year: scenario.year,
    title: scenario.title,
    chosenText: opt.text,
    chronicleSnippet: rew.chronicleText || '开创新路，砥砺前行。',
    macroWeight: opt.macroWeight || {}
  };
}

/**
 * 推进家族未来十年重大抉择 (接入 checkFrontierAccessibility 拦截与信托基金结算)
 */
function executeFutureDecadeDecision(familyProfile, targetYear, optionIndex, currentFrontierYear) {
  if (!familyProfile) throw new Error('家族档案不存在');
  const frontierLimit = currentFrontierYear || GLOBAL_WORLD_CHRONO.defaultFrontierYear;

  // 校验前沿线准入
  const access = checkFrontierAccessibility(targetYear - 10, frontierLimit);
  if (!access.canAdvance && targetYear > frontierLimit) {
    throw new Error(access.message || `岁月未至（当前前沿：${frontierLimit}年）。请稍待运营开放下一个时代！`);
  }

  const scenario = FUTURE_DECADE_SCENARIOS.find(s => s.year === targetYear);
  if (!scenario) throw new Error(`未找到公元 ${targetYear} 年的时代重大转折节点`);
  const opt = scenario.options[optionIndex] || scenario.options[0];

  // 扣减族产成本 (校验族产是否充足，并支持以宗族声望授信抵扣部分资财门槛)
  const costMoney = opt.cost ? (opt.cost.money || 0) : 0;
  const currentTrustMoney = familyProfile.clanTrust ? (familyProfile.clanTrust.trustFundMoney || 0) : 0;
  const prestigeScore = (familyProfile.clanTrust && familyProfile.clanTrust.prestigeScore) || 50;
  // 资财门槛平滑机制：当宗族具备声望时，可获得声誉背书抵扣（最高冲抵 50% 成本，且不低于 0）
  const prestigeOffset = Math.min(Math.floor(costMoney * 0.5), Math.max(0, prestigeScore - 25) * 150);
  const requiredTrustMoney = Math.max(0, costMoney - prestigeOffset);

  if (requiredTrustMoney > 0 && currentTrustMoney < requiredTrustMoney) {
    throw new Error(`家族信托公积金不足（需准备金 ¥${requiredTrustMoney.toLocaleString()}，现有 ¥${currentTrustMoney.toLocaleString()}；声望已授信抵扣 ¥${prestigeOffset.toLocaleString()}）。建议选择产学研轻资本合作，或通过同盟世交与前代结卷积累族产！`);
  }

  if (requiredTrustMoney > 0 && familyProfile.clanTrust) {
    familyProfile.clanTrust.trustFundMoney -= requiredTrustMoney;
  }

  // 发放回报
  const rew = opt.successReward || {};
  const gainPrestige = rew.clanPrestige || 50;
  const gainMoney = rew.money ? Math.round(rew.money * 0.1) : 0; // 10% 充实家族永续公产
  if (familyProfile.clanTrust) {
    familyProfile.clanTrust.prestigeScore = (familyProfile.clanTrust.prestigeScore || 50) + gainPrestige;
    familyProfile.clanTrust.trustFundMoney = (familyProfile.clanTrust.trustFundMoney || 0) + gainMoney;
    if (rew.relicId) {
      familyProfile.clanTrust.relics = familyProfile.clanTrust.relics || [];
      if (!familyProfile.clanTrust.relics.includes(rew.relicId)) {
        familyProfile.clanTrust.relics.push(rew.relicId);
      }
    }
  }

  // 推进年份与记录决策
  familyProfile.timeline = familyProfile.timeline || {};
  familyProfile.timeline.currentYear = targetYear;
  familyProfile.timeline.decisions = familyProfile.timeline.decisions || [];

  const decisionEntry = {
    year: targetYear,
    scenarioTitle: scenario.title,
    chosenText: opt.text,
    chronicleSnippet: rew.chronicleText || '开创新路，砥砺前行。',
    macroWeight: opt.macroWeight || {}
  };
  familyProfile.timeline.decisions.push(decisionEntry);

  return {
    success: true,
    targetYear,
    scenarioTitle: scenario.title,
    chosenText: opt.text,
    chronicleSnippet: decisionEntry.chronicleSnippet,
    effects: {
      clanPrestige: gainPrestige,
      trustFundMoney: gainMoney
    }
  };
}

/**
 * 汇总全服玩家选择，驱动下一个十年的宏观指数
 */
function aggregateServerMacroTrends(allDecisions) {
  const trends = {
    highTech: 1.0,
    bioHealth: 1.0,
    cleanEnergy: 1.0,
    deepOcean: 1.0,
    spaceIndustry: 1.0,
    ecology: 1.0
  };

  if (!Array.isArray(allDecisions) || allDecisions.length === 0) return trends;

  allDecisions.forEach(d => {
    if (!d.macroWeight) return;
    for (const k in d.macroWeight) {
      trends[k] = (trends[k] || 1.0) + (d.macroWeight[k] * 0.01);
    }
  });

  return trends;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    GLOBAL_WORLD_CHRONO,
    calculateGenerationCount,
    getFrontierBarrierPrompt,
    FUTURE_DECADE_SCENARIOS,
    checkFrontierAccessibility,
    runFutureDecadeEvent,
    executeFutureDecadeDecision,
    aggregateServerMacroTrends
  };
}
