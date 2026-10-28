/**
 * 华夏世家大系 · 十二大赛道专属终身大考 (Track-Specific Magnum Opus Crossroads)
 */
const TRACK_MAGNUM_OPUS_DATABASE = {
  gov: {
    id: 'magnum_gov',
    title: '🏛️ 【时代大考】特大综合改革示范区的战略抉择',
    desc: '重点改革试验迈入攻坚克难的关键期，面对盘根错节的发展阻力。在总体统筹决策协调会上各方激烈论证，关键时刻由你牵头拍板定夺：',
    choices: [
      {
        text: "以职业声誉作保 · 顶住压力坚决推进阳光公开与管理机制创新",
        outcomeText: "你以无私无畏的魄力打破利益藩篱！群众自发拉起横幅致敬，清廉+8，大局声誉+10！",
        effects: { clean: 8, rep: 10, courage: 6 },
        tag: '中流砥柱'
      },
      {
        text: "求真务实稳妥统筹 · 采取渐进试点与利益补偿机制分步化解",
        outcomeText: "方案平稳落地未起风波，兼顾各方诉求，人情+8，智谋+6，深得组织器重！",
        effects: { eq: 8, iq: 6, clean: 5 },
        tag: '老成谋国'
      }
    ]
  },
  industry: {
    id: 'magnum_corp',
    title: '🏭 【制造大考】跨国资本恶意绞杀与全链自主保卫战',
    desc: '海外垄断财团以三倍溢价发起恶意要约收购，并威胁断供关键工业母机核心轴承，民族先进制造生死存亡系于一线：',
    choices: [
      {
        text: "立下军令状死战不退 · 联合全国数千家上下游发起全链自主反击",
        outcomeText: "历经九百个日夜闭关攻坚，自主高端轴承全面投产，击溃外资做空！资本+¥25,000，魄力+8！",
        effects: { capital: 25000, courage: 8, rep: 8 },
        tag: '大国脊梁'
      },
      {
        text: "引入国家制造业转型升级基金战略入股 · 实施产学研协同破局",
        outcomeText: "核心工业资产大幅保值增值，引入顶尖管理体制，声誉+8，资本+¥20,000！",
        effects: { rep: 8, capital: 20000, iq: 6 },
        tag: '重器强基'
      }
    ]
  },
  tech: {
    id: 'magnum_sci',
    title: '🔬 【科研大考】国之重器试验参数千钧一发的放行抉择',
    desc: '耗资数百亿的国家绝密超级工程即将进行首飞试验，总装车间深夜发现一组边缘公差存在0.003毫米微小离散：',
    choices: [
      {
        text: "以总师身份担起全部责任 · 运用深厚力学机理判定安全并签字放行",
        outcomeText: "大国重器破空而起圆满成功！国家领导人亲赴现场拥抱祝贺，智谋+10，荣获国家特级功勋！",
        effects: { iq: 10, rep: 10, courage: 8 },
        tag: '国之巨匠'
      },
      {
        text: "坚持科学求真一票否决 · 顶住各方压力推迟试验三个月彻底归零",
        outcomeText: "全面归零排查竟意外发现一处隐蔽材料疲劳隐患，避免了灾难性后果！清廉+8，智谋+8！",
        effects: { clean: 8, iq: 8, rep: 8 },
        tag: '严谨治学'
      }
    ]
  },
  biz: {
    id: 'magnum_biz',
    title: '💰 【商界大考】国际金融风暴突袭与民营产业互保大联盟',
    desc: '国际空头突袭外贸大省，汇率巨震与银根紧缩导致本地数百家中小微制造企业面临资金链断裂暴雷：',
    choices: [
      {
        text: "牵头成立百亿民营企业互助应急基金 · 抵押个人全部股权担保",
        outcomeText: "你以一己之力扛起全行业脊梁，保住了数十万产业工人的生计！全省工商界奉你为商圣，声誉+10！",
        effects: { rep: 10, capital: 18000, courage: 8 },
        tag: '义薄云天'
      },
      {
        text: "顺势整合产业链上下游破产资产 · 打造全球化垂直一体化巨无霸",
        outcomeText: "危机之后公司一跃成为全球行业龙头，资本增进 ¥30,000，商界话语权跃升！",
        effects: { capital: 30000, iq: 8, courage: 6 },
        tag: '商海霸主'
      }
    ]
  },
  trade: {
    id: 'magnum_diplo',
    title: '🌐 【丝路大考】日内瓦多边经贸公约破裂前夕的四十八小时斡旋',
    desc: '关键多边数字贸易与绿色关税公约在最后关头遭遇保护主义阵营联合阻击，各方代表拂袖而去，跨国商贸通道面临停摆：',
    choices: [
      {
        text: "开展不眠不休的48小时穿梭密会 · 提出互利共赢中国折中方案力挽狂澜",
        outcomeText: "五大洲代表起立为你鼓掌！新公约成功签署并命名为中国丝路倡议，大局声誉+10！",
        effects: { rep: 10, eq: 8, capital: 22000 },
        tag: '丝路领航'
      },
      {
        text: "坚决捍卫新兴市场与发展中国家核心利益底线 · 联合五十国开通自主清算网",
        outcomeText: "掷地有声的大国商道赢得亚非拉万国同钦！清廉+8，魄力+8，跨境订单逆势翻番！",
        effects: { rep: 8, courage: 8, clean: 8, capital: 18000 },
        tag: '铮铮铁骨'
      }
    ]
  },
  art: {
    id: 'magnum_cult',
    title: '📜 【文化大考】流失海外国宝孤本的跨国抢救竞购',
    desc: '流落海外近百年的敦煌盛唐孤本残卷突现苏富比夜拍，西方投机财团恶意哄抬价格，企图将国宝拆分牟利：',
    choices: [
      {
        text: "变卖毕生珍藏并号召海内外华商筹款 · 一锤定音将国宝完璧归赵",
        outcomeText: "故宫博物院举行隆重入藏仪式，万人空巷瞻仰国宝！万古流芳，声誉+10，清廉+8！",
        effects: { rep: 10, clean: 8, courage: 6 },
        tag: '文脉薪传'
      },
      {
        text: "运用国际公约与文物法典展开长线法律追索 · 联合教科文组织施压",
        outcomeText: "法理严密证据确凿，拍卖行迫于国际道义无偿归还国宝，智谋+8，名震全球学术界！",
        effects: { iq: 8, rep: 8, eq: 6 },
        tag: '法理卫道'
      }
    ]
  },
  military: {
    id: 'magnum_military',
    title: '🪖 【铁血大考】高原极寒超级桥隧震后复合险情生死总决战',
    desc: '高寒无人区突发强震引发冰川堰塞湖管涌， threatens 下游百亿战略通道与十万群众安全，余震飞石不断、黄金排险窗口仅剩二十四小时：',
    choices: [
      {
        text: "亲率党员敢死突击队索降核心坝体 · 手工安放定向爆破药包精准泄洪",
        outcomeText: "惊天巨响后洪峰顺导流槽平稳下泄，下游十万百姓与大国工程安然无恙！荣立个人特等功！",
        effects: { courage: 10, rep: 10, resilience: 8 },
        tag: '铁血柱石'
      },
      {
        text: "坐镇前指统筹三维雷达监测与重型机械集群 · 分梯次立体围堰锁死管涌",
        outcomeText: "零伤亡创造世界工程抢险奇迹！教科书级指挥被收入国防工程典范，智谋+8，声誉+10！",
        effects: { iq: 8, rep: 10, clean: 6 },
        tag: '大国统帅'
      }
    ]
  },
  agri: {
    id: 'magnum_agri',
    title: '🌾 【种业大考】跨国粮商专利围剿与中华耐盐碱母种保卫战',
    desc: '海外四大粮商借极端气候抬高国际粮价，并对我国自主杂交良种发起跨国专利诉讼，企图卡住中国种业咽喉：',
    choices: [
      {
        text: "公开三十年原始田间繁育谱系铁证 · 向全国盐碱荒滩免费推广高产自主新良种",
        outcomeText: "亿亩盐碱滩化作金色粮仓，跨国粮商做空阴谋彻底粉碎！万民感念，声誉+10，清廉+8！",
        effects: { rep: 10, clean: 8, capital: 20000 },
        tag: '天下粮仓'
      },
      {
        text: "牵头组建国家种业种质资源大联盟 · 建立全基因组分子育种自主专利池",
        outcomeText: "以科技利剑筑起种业安全万里长城，海外粮商不得不反过来高价购买我方授权！",
        effects: { iq: 8, rep: 9, capital: 26000 },
        tag: '神农铸盾'
      }
    ]
  },
  grassroots: {
    id: 'magnum_grassroots',
    title: '🏡 【民生大考】百年流域行蓄洪区十万乡亲搬迁与共富安居抉择',
    desc: '国家启动跨流域世纪防洪与生态共富工程，涉及百余个古老村落搬迁与十万乡亲生计转型，故土难离的乡亲们眼巴巴望着你这位老带头人：',
    choices: [
      {
        text: "立下军令状先建好配套名校医院与共富产业园再搬迁 · 挨家挨户算透阳光明白账",
        outcomeText: "十万乡亲敲锣打鼓喜迁新居，三年内人均收入翻番，无一人上访掉队！铸就万民口碑丰碑！",
        effects: { rep: 10, clean: 9, eq: 8 },
        tag: '万民福泽'
      },
      {
        text: "将腾退滩涂统筹改造成国家级生态湿地与现代农旅合作社 · 让老乡世世代代拿分红",
        outcomeText: "昔日水患之地化作聚宝盆，生态与富民双赢模式响彻全国，声誉+9，集体与个人收益丰厚！",
        effects: { rep: 9, iq: 8, capital: 20000 },
        tag: '共富楷模'
      }
    ]
  },
  med: {
    id: 'magnum_med',
    title: '🩺 【杏林大考】突发未知高危变异重症潮与原研特效药破局',
    desc: '罕见高致病性呼吸综合征在多地零星暴发，跨国药企的天价靶向药不仅供应杯水车薪且伴随严重心衰副作用，全国危重病房焦急等待国家医学中心定夺：',
    choices: [
      {
        text: "披挂进驻重症红区一线主刀领衔 · 启用自主研发中西医协同靶向救治方案",
        outcomeText: "重症抢救成功率跃升至96%，治疗费用不足进口药十分之一！大医精诚，荣膺国士无双殊荣！",
        effects: { rep: 10, clean: 9, courage: 8 },
        tag: '大医国士'
      },
      {
        text: "统筹全国百家三甲医院共享临床大数据 · 七十二小时锁定致病机理并开源诊疗指南",
        outcomeText: "全球医疗界采用中国诊疗金标准，挽救海内外无数苍生，智谋+9，声望享誉世界！",
        effects: { iq: 9, rep: 10, eq: 6 },
        tag: '济世苍生'
      }
    ]
  },
  law: {
    id: 'magnum_law',
    title: '⚖️ 【法治大考】海外百亿主权资产恶意冻结与国际法庭终极抗辩',
    desc: '某西方财团勾结境外仲裁机构，恶意滥用长臂管辖冻结我国出海龙头产业百亿海外资产，距离强制拍卖裁决生效仅剩最后七天：',
    choices: [
      {
        text: "亲赴海牙与伦敦法庭舌战群儒 · 出具三千页穿透式证据链当庭揭穿管辖权欺诈",
        outcomeText: "国际法庭全票裁定撤销冻结令并判令对方巨额赔偿！一战成名，铸就涉外法治不朽传奇！",
        effects: { iq: 9, rep: 10, courage: 8 },
        tag: '公义利剑'
      },
      {
        text: "依法启动国家反外国制裁对等反制法律程序 · 迫使跨国财团在48小时内无条件和解",
        outcomeText: "雷霆万钧的大国法理反制令对手胆寒，百亿国有与民族资产完好归来！清廉+9，声誉+10！",
        effects: { clean: 9, rep: 10, capital: 22000 },
        tag: '铁肩卫国'
      }
    ]
  },
  education: {
    id: 'magnum_education',
    title: '🎓 【杏坛大考】国家基础科学十年潜心问道特区与拔尖人才大考',
    desc: '面对全球科技竞争进入无人区，急功近利的短期论文指标束缚了青年学者的原创力。作为执掌名校与国家教改的领军者，你在全国科教大会上力推十年破壁计划：',
    choices: [
      {
        text: "以校长与学术泰斗声誉作保 · 为百名寒门青年奇才设立十年免考核基础攻关特区",
        outcomeText: "十年磨一剑！特区连出三项改写世界教科书的重大原创突破，桃李满天下，尊为百世师表！",
        effects: { rep: 10, clean: 9, eq: 8 },
        tag: '百世师表'
      },
      {
        text: "领衔重编全套大中小学贯通式数理与工程经典教材 · 无偿向全国城乡学校开源",
        outcomeText: "润物细无声，托举起千万中国青少年的科学脊梁，获颁国家最高教育荣誉勋章！",
        effects: { iq: 9, rep: 10, clean: 8 },
        tag: '大先生风范'
      }
    ]
  }
};
TRACK_MAGNUM_OPUS_DATABASE.corp = TRACK_MAGNUM_OPUS_DATABASE.industry;
TRACK_MAGNUM_OPUS_DATABASE.sci = TRACK_MAGNUM_OPUS_DATABASE.tech;
TRACK_MAGNUM_OPUS_DATABASE.diplo = TRACK_MAGNUM_OPUS_DATABASE.trade;
TRACK_MAGNUM_OPUS_DATABASE.cult = TRACK_MAGNUM_OPUS_DATABASE.art;

module.exports = {
  TRACK_MAGNUM_OPUS_DATABASE
};
