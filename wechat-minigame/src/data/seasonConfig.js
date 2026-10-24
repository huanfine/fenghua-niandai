/**
 * 华夏三千年世家大系 · 200年纪元赛季总控配置 (Season Config)
 * 将三千年宏大历史划分为 15 大 200 年连续赛季周期（公元100~3100年），无缝覆盖无断档，
 * 统一时间线总表（纪元、赛季、出生年代共用），实现“家族演变 + 人物历程”双层演进。
 */

const SEASONS_REGISTRY = [
  {
    id: 'season_1_han_wei',
    seasonIndex: 1,
    name: '汉魏风骨 · 坞壁筑基',
    eraDesc: '东汉中期至西晋八王之乱前夕，群雄并起，察举九品，世家立宗。',
    startYear: 100,
    endYear: 300,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '五铢钱',
    historicalEras: [
      { id: 'era_1_1', name: '东汉中兴 · 门第筑基', startYear: 100, endYear: 168 },
      { id: 'era_1_2', name: '汉末烽烟 · 坞壁自保', startYear: 168, endYear: 220 },
      { id: 'era_1_3', name: '三国鼎峙 · 九品初定', startYear: 220, endYear: 265 },
      { id: 'era_1_4', name: '太康一统 · 门阀极盛', startYear: 265, endYear: 300 }
    ],
    careerTracks: [
      { id: 'official', name: '名臣良吏 · 察举执政', icon: '🏛️', desc: '经由察举孝廉与九品中正入仕，主政一方，出将入相。' },
      { id: 'scholar', name: '家学治经 · 文苑领袖', icon: '📜', desc: '精研古文经学或建安辞章，开馆聚徒数百人，文脉传家。' },
      { id: 'merchant', name: '盐铁货殖 · 桑梓巨商', icon: '🪙', desc: '通商舟车，囤积谷帛，经略盐铁与水碓工坊，富甲天下。' },
      { id: 'military', name: '坞堡督帅 · 仗剑从戎', icon: '⚔️', desc: '营建坞堡深垒，训练精壮族丁，逢乱世保全宗脉，建功立业。' },
      { id: 'recluse', name: '杏林国手 · 玄门隐逸', icon: '🌿', desc: '通晓伤寒本草，大疫之年设局救黎民，隐逸名山修长生。' }
    ]
  },
  {
    id: 'season_2_liu_chao',
    seasonIndex: 2,
    name: '六朝烟雨 · 门阀南渡',
    eraDesc: '西晋永嘉南渡至南朝齐梁，王与马共天下，士庶天隔，江南初开。',
    startYear: 300,
    endYear: 500,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '晋五铢/江南绢帛',
    historicalEras: [
      { id: 'era_2_1', name: '永嘉南渡 · 侨州筑基', startYear: 300, endYear: 350 },
      { id: 'era_2_2', name: '江左风雅 · 兰亭修禊', startYear: 350, endYear: 383 },
      { id: 'era_2_3', name: '淝水鏖兵 · 北府雄起', startYear: 383, endYear: 420 },
      { id: 'era_2_4', name: '南朝更迭 · 孝文改制', startYear: 420, endYear: 500 }
    ],
    careerTracks: [
      { id: 'official', name: '中正定品 · 执掌台阁', icon: '🏛️', desc: '经九品中正拔擢，居清显要职，典掌中书尚书，定鼎门阀朝局。' },
      { id: 'scholar', name: '玄言名理 · 兰亭风流', icon: '📜', desc: '精研老庄名理，挥毫丹青法帖，兰亭雅集诗酒酬唱，名重江左。' },
      { id: 'merchant', name: '江左舟楫 · 侨置庄园', icon: '🪙', desc: '统筹建康水陆舟楫，垦辟会稽膏腴庄园，汇聚四方货殖资累巨万。' },
      { id: 'military', name: '北府锐卒 · 节度藩镇', icon: '⚔️', desc: '督领京口北府精兵，枕戈待旦抵御北骑，克复失地以军功封侯。' },
      { id: 'recluse', name: '幽栖林泉 · 释道高贤', icon: '🌿', desc: '结庐匡庐天台，探求佛理道藏，超然物外备受朝野尊崇。' }
    ]
  },
  {
    id: 'season_3_sui_tang',
    seasonIndex: 3,
    name: '南北归一 · 隋唐草创',
    eraDesc: '南北朝后期至初盛唐，开皇之治破关山，开科取士草创，科甲初萌。',
    startYear: 500,
    endYear: 700,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '开皇五铢/开元通宝',
    historicalEras: [
      { id: 'era_3_1', name: '侯景乱梁 · 江左凋敝', startYear: 500, endYear: 550 },
      { id: 'era_3_2', name: '开皇之治 · 南北一统', startYear: 550, endYear: 600 },
      { id: 'era_3_3', name: '大业开河 · 营建东都', startYear: 600, endYear: 640 },
      { id: 'era_3_4', name: '贞观宏图 · 关陇门阀', startYear: 640, endYear: 700 }
    ],
    careerTracks: [
      { id: 'official', name: '开皇勋臣 · 台阁执政', icon: '🏛️', desc: '参赞朝廷开皇律制与台省机枢，削平割据，出仕关陇新朝。' },
      { id: 'scholar', name: '经学集解 · 初唐文宗', icon: '📜', desc: '博考南北经训，注疏典谟，开一代盛世之宏篇巨制。' },
      { id: 'merchant', name: '运河通商 · 关中巨贾', icon: '🪙', desc: '顺通济渠、江南河货运南北，起家巨万，经略大唐粮仓。' },
      { id: 'military', name: '府兵折冲 · 破阵骁果', icon: '⚔️', desc: '统帅关陇府兵，平定四方边患，以折冲都尉策勋受封。' },
      { id: 'recluse', name: '终南隐修 · 药王本草', icon: '🌿', desc: '隐迹终南药王谷，精修千金方论，以岐黄大道济世全真。' }
    ]
  },
  {
    id: 'season_4_tang_wudai',
    seasonIndex: 4,
    name: '盛唐气象 · 藩镇诗豪',
    eraDesc: '开元盛世至安史之乱、藩镇割据与唐末风云，诗赋流芳，世家向科第士绅转型。',
    startYear: 700,
    endYear: 900,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '开元通宝',
    historicalEras: [
      { id: 'era_4_1', name: '开元盛世 · 华戎同风', startYear: 700, endYear: 755 },
      { id: 'era_4_2', name: '安史烽烟 · 勤王护驾', startYear: 755, endYear: 800 },
      { id: 'era_4_3', name: '元和中兴 · 藩镇角力', startYear: 800, endYear: 850 },
      { id: 'era_4_4', name: '黄巢风雷 · 世家离散', startYear: 850, endYear: 900 }
    ],
    careerTracks: [
      { id: 'official', name: '谏议大夫 · 藩镇幕宾', icon: '🏛️', desc: '掌纠劾规谏大政，或出任大镇节度掌书记，斡旋朝野局势。' },
      { id: 'scholar', name: '雁塔折桂 · 诗赋文宗', icon: '📜', desc: '曲江宴饮，慈恩雁塔题名，以盛唐律诗词赋惊艳四海。' },
      { id: 'merchant', name: '西市胡商 · 飞钱通汇', icon: '🪙', desc: '立足长安西市波斯邸，首创飞钱便换兑付，纵横丝路商贾。' },
      { id: 'military', name: '朔方铁骑 · 神策精武', icon: '⚔️', desc: '身经百战克复西京，统领禁军神策，以定策平乱立殊勋。' },
      { id: 'recluse', name: '桑苎茶圣 · 终南逸仙', icon: '🌿', desc: '采茶撰经，逍遥林泉，诗画唱和，为朝野争相求见之逸高。' }
    ]
  },
  {
    id: 'season_5_song_yun',
    aliases: ['season_4_song_yuan'],
    seasonIndex: 5,
    name: '宋韵风华 · 义庄书院',
    eraDesc: '五代十国至北宋熙丰变法，范仲淹创义田义庄，程朱理学发轫，文运鼎盛。',
    startYear: 900,
    endYear: 1100,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '宋铜钱/交子',
    historicalEras: [
      { id: 'era_5_1', name: '五代烽火 · 乱世割据', startYear: 900, endYear: 960 },
      { id: 'era_5_2', name: '陈桥兵变 · 杯酒释兵', startYear: 960, endYear: 1020 },
      { id: 'era_5_3', name: '范氏义庄 · 欧苏谱法', startYear: 1020, endYear: 1069 },
      { id: 'era_5_4', name: '熙丰变法 · 理学发轫', startYear: 1069, endYear: 1100 }
    ],
    careerTracks: [
      { id: 'official', name: '参知政事 · 枢密谏宪', icon: '🏛️', desc: '主持二府大政，推动熙宁变法，澄清吏治，立朝刚直。' },
      { id: 'scholar', name: '书院山长 · 义理名儒', icon: '📜', desc: '主盟四大书院，会通理学心学，讲学授徒，名满东南。' },
      { id: 'merchant', name: '汴京交子 · 榷场海商', icon: '🪙', desc: '发行四川交子与会子，垄断宋辽西夏榷场博易，资产盈亿。' },
      { id: 'military', name: '殿前禁卫 · 帅府总管', icon: '⚔️', desc: '屯驻西军经略延州，枕戈御边，力扼西夏辽邦铁蹄。' },
      { id: 'recluse', name: '义庄宗师 · 泉林逸叟', icon: '🌿', desc: '建置不可变卖之宗族义田义庄，规整宗族，长保九族无饥寒。' }
    ]
  },
  {
    id: 'season_6_nan_song_yuan',
    seasonIndex: 6,
    name: '两宋烽烟 · 理学大成',
    eraDesc: '靖康之变至南宋崖山、蒙元一统，朱子家礼浸润民间，乡约宗族社会成型。',
    startYear: 1100,
    endYear: 1300,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '会子/中统元宝交钞',
    historicalEras: [
      { id: 'era_6_1', name: '靖康南渡 · 临安侨置', startYear: 1100, endYear: 1140 },
      { id: 'era_6_2', name: '绍兴和议 · 岳家精忠', startYear: 1140, endYear: 1190 },
      { id: 'era_6_3', name: '考亭理学 · 白鹿洞规', startYear: 1190, endYear: 1240 },
      { id: 'era_6_4', name: '襄樊鏖战 · 崖山悲歌', startYear: 1240, endYear: 1300 }
    ],
    careerTracks: [
      { id: 'official', name: '临安执政 · 留守总督', icon: '🏛️', desc: '周旋行在朝廷，经度江淮防务，力主恢复中原社稷。' },
      { id: 'scholar', name: '考亭门人 · 词林宗工', icon: '📜', desc: '传扬朱子家礼与近思之学，词章绝唱名载宋词青史。' },
      { id: 'merchant', name: '刺桐市舶 · 临安丝绸', icon: '🪙', desc: '开辟泉州刺桐远洋海运，远贸香药瓷器，富冠临安西湖。' },
      { id: 'military', name: '岳家军帅 · 襄樊守将', icon: '⚔️', desc: '挥戈北伐誓复两京，孤城血战苦拒蒙铁骑，尽忠报国。' },
      { id: 'recluse', name: '乡约祭酒 · 沧浪隐修', icon: '🌿', desc: '立吕氏乡约化育里闾，泛舟太湖富春，坚守气节超脱尘俗。' }
    ]
  },
  {
    id: 'season_7_da_yuan_ming_chu',
    seasonIndex: 7,
    name: '大元一统 · 洪武开基',
    eraDesc: '元末群雄逐鹿至明初永乐盛世，黄册里甲，移民迁徙，江南望族再兴。',
    startYear: 1300,
    endYear: 1500,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '大明通行宝钞/白银',
    historicalEras: [
      { id: 'era_7_1', name: '大都广运 · 宣抚四海', startYear: 1300, endYear: 1350 },
      { id: 'era_7_2', name: '洪武开基 · 黄册里甲', startYear: 1350, endYear: 1400 },
      { id: 'era_7_3', name: '永乐大统 · 宝船远航', startYear: 1400, endYear: 1450 },
      { id: 'era_7_4', name: '土木保卫 · 于少保风骨', startYear: 1450, endYear: 1500 }
    ],
    careerTracks: [
      { id: 'official', name: '洪武给事 · 吏部侍郎', icon: '🏛️', desc: '掌六科给事考核封驳，参与编定《大诰》，清正肃穆。' },
      { id: 'scholar', name: '国子监祭酒 · 永乐编修', icon: '📜', desc: '领衔纂修万卷巨册《永乐大典》，整饬文渊阁士林学统。' },
      { id: 'merchant', name: '盐引总纲 · 粮道行贾', icon: '🪙', desc: '经办淮盐两淮总引，统领大运河槽帮船帮，汇通天下资货。' },
      { id: 'military', name: '卫所指挥 · 靖难从戎', icon: '⚔️', desc: '分镇九边卫所，戍守金陵北平，以军功受封世袭指挥佥事。' },
      { id: 'recluse', name: '松江高士 · 避世名医', icon: '🌿', desc: '研习松江棉纺染织与温补流派，隐居林泉以实业仁术泽乡里。' }
    ]
  },
  {
    id: 'season_8_ming_zhong_wan',
    aliases: ['season_5_ming_qing'],
    seasonIndex: 8,
    name: '阳明心学 · 晚明清初',
    eraDesc: '嘉隆万大航海白银内流至明清鼎革，心学大炽，徽商晋商崛兴，宗族义会遍及城乡。',
    startYear: 1500,
    endYear: 1700,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '白银/纹银',
    historicalEras: [
      { id: 'era_8_1', name: '龙场悟道 · 心学大炽', startYear: 1500, endYear: 1550 },
      { id: 'era_8_2', name: '万历中兴 · 徽晋商帮', startYear: 1550, endYear: 1600 },
      { id: 'era_8_3', name: '甲申鼎革 · 气节忠烈', startYear: 1600, endYear: 1650 },
      { id: 'era_8_4', name: '清初入关 · 遗民守墓', startYear: 1650, endYear: 1700 }
    ],
    careerTracks: [
      { id: 'official', name: '内阁辅臣 · 总督巡抚', icon: '🏛️', desc: '入直文渊阁参赞枢要，督抚东南江右，经国济世。' },
      { id: 'scholar', name: '阳明门下 · 东林祭酒', icon: '📜', desc: '弘扬致良知、知行合一绝学，主盟东林复社清议天下。' },
      { id: 'merchant', name: '徽州盐木 · 晋商票号', icon: '🪙', desc: '贾而好儒，汇通天下八大商帮，垄断江南丝茶盐木大宗。' },
      { id: 'military', name: '戚家水师 · 关宁劲旅', icon: '⚔️', desc: '操演鸳鸯阵荡平倭患，统帅辽东坚甲利炮，死守孤城。' },
      { id: 'recluse', name: '晚明名士 · 西泠印人', icon: '🌿', desc: '金石篆刻绝艺自成一家，守节不仕新朝，隐修梅花草堂。' }
    ]
  },
  {
    id: 'season_9_qing_sheng_shi',
    seasonIndex: 9,
    name: '康乾鼎盛 · 西风东渐',
    eraDesc: '康乾盛世至晚清洋务自强、甲午风云，十三行与近代工商业发轫，宗族书院广开新学。',
    startYear: 1700,
    endYear: 1900,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '银两/制钱/银元',
    historicalEras: [
      { id: 'era_9_1', name: '康乾盛世 · 摊丁入亩', startYear: 1700, endYear: 1750 },
      { id: 'era_9_2', name: '四库文澜 · 考据极盛', startYear: 1750, endYear: 1800 },
      { id: 'era_9_3', name: '西风东渐 · 洋务自强', startYear: 1800, endYear: 1850 },
      { id: 'era_9_4', name: '甲午戊戌 · 维新启蒙', startYear: 1850, endYear: 1900 }
    ],
    careerTracks: [
      { id: 'official', name: '军机章京 · 督抚大吏', icon: '🏛️', desc: '入直军机禁省，经办洋务督抚一方，兴办实业近代防务。' },
      { id: 'scholar', name: '乾嘉巨儒 · 译馆总教', icon: '📜', desc: '精研朴学考据名播儒林，主笔同文馆翻译万国律例新知。' },
      { id: 'merchant', name: '粤海十三行 · 日升昌总兑', icon: '🪙', desc: '掌管对外通商夷馆特许，开办票号通汇九州，富埒王侯。' },
      { id: 'military', name: '湘淮水师 · 北洋武卫', icon: '⚔️', desc: '督建近代轮船铁甲水师，鏖战沙场，保疆卫土以身殉国。' },
      { id: 'recluse', name: '歧黄世家 · 丹青隐老', icon: '🌿', desc: '世守温病伤寒秘传医方，精研书画避世寄情于名山大川。' }
    ]
  },
  {
    id: 'season_10_jin_dai_dang_dai',
    aliases: ['season_6_early_modern', 'season_7_contemporary'],
    seasonIndex: 10,
    name: '近代风雷 · 智能复兴',
    eraDesc: '辛亥风雷、实业救国、改革开放激荡岁月，直至21世纪AI与地月破晓，百年民族复兴。',
    startYear: 1900,
    endYear: 2100,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '银元/法币/人民币(元)',
    historicalEras: [
      { id: 'era_10_1', name: '辛亥风雷 · 实业救国', startYear: 1900, endYear: 1949 },
      { id: 'era_10_2', name: '建国大业 · 改革春潮', startYear: 1949, endYear: 2000 },
      { id: 'era_10_3', name: '科技腾飞 · 智算浪潮', startYear: 2000, endYear: 2050 },
      { id: 'era_10_4', name: '世纪跨越 · 星汉破晓', startYear: 2050, endYear: 2100 }
    ],
    careerTracks: [
      { id: 'official', name: '经世公仆 · 宏观决策', icon: '🏛️', desc: '参与国家重点战略规划与全球治理，为盛世复兴领航擘画。' },
      { id: 'scholar', name: '战略科学家 · 两院院士', icon: '📜', desc: '主持前沿大科学工程与工业母机研发，攻克卡脖子关键重器。' },
      { id: 'merchant', name: '实业巨头 · 创新创投', icon: '🪙', desc: '布局新能源、智能硬科技与全产业链，铸造全球领军企业。' },
      { id: 'military', name: '空天卫士 · 国防骨干', icon: '⚔️', desc: '驾驭新一代隐身战机与空天防卫体系，戍守祖国万里长空。' },
      { id: 'recluse', name: '宗族长者 · 文化传承', icon: '🌿', desc: '主持百代族谱重修与文化寻根，设立传承公益金泽被四海。' }
    ]
  },
  {
    id: 'season_11_near_orbit_moon',
    aliases: ['season_8_future_star'],
    seasonIndex: 11,
    name: '近地开发 · 月宫筑城',
    eraDesc: '地月空间天梯奠基，常温超导与聚变电网普惠，月球南极永久常驻工业科研城。',
    startYear: 2100,
    endYear: 2300,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '地月信用点',
    historicalEras: [
      { id: 'era_11_1', name: '太空天梯 · 地月双轨', startYear: 2100, endYear: 2150 },
      { id: 'era_11_2', name: '月海工业 · 氦三能源', startYear: 2150, endYear: 2200 },
      { id: 'era_11_3', name: '轨道城邦 · 闭环生态', startYear: 2200, endYear: 2250 },
      { id: 'era_11_4', name: '地月中枢 · 文明自洽', startYear: 2250, endYear: 2300 }
    ],
    careerTracks: [
      { id: 'official', name: '地月联合执政官', icon: '🏛️', desc: '主掌地月空间统筹委员会，管理百万人口的轨道生态都市。' },
      { id: 'scholar', name: '地外天体物理博士', icon: '📜', desc: '设立月基大型射电阵列，破译深空宇宙背景辐射第一缕密码。' },
      { id: 'merchant', name: '氦三开采航运巨头', icon: '🪙', desc: '控制月海极地核原料运输航线，为全人类聚变炉提供动力源。' },
      { id: 'military', name: '轨道空天警备司令', icon: '⚔️', desc: '统领近地轨道快速反应空天编队，抵御高危近地小行星威胁。' },
      { id: 'recluse', name: '月岩生态拓荒隐士', icon: '🌿', desc: '在月背玄武岩地底营建首座地下桃花源，独辟长生生态净土。' }
    ]
  },
  {
    id: 'season_12_deep_space_fusion',
    seasonIndex: 12,
    name: '深空拓荒 · 聚变网络',
    eraDesc: '可控核聚变商用网贯通内太阳系，火星封闭穹顶都市与小行星带矿业世家崛起。',
    startYear: 2300,
    endYear: 2500,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '聚变能券(FC)',
    historicalEras: [
      { id: 'era_12_1', name: '火星穹顶 · 赤星开基', startYear: 2300, endYear: 2350 },
      { id: 'era_12_2', name: '小行星带 · 矿石开发', startYear: 2350, endYear: 2400 },
      { id: 'era_12_3', name: '木卫深冰 · 海洋求索', startYear: 2400, endYear: 2450 },
      { id: 'era_12_4', name: '日内环网 · 宏观统筹', startYear: 2450, endYear: 2500 }
    ],
    careerTracks: [
      { id: 'official', name: '火星总督 · 行星特使', icon: '🏛️', desc: '总揽火星特区执政，主导内太阳系联邦关税与生态共治法案。' },
      { id: 'scholar', name: '深空引力波学宗师', icon: '📜', desc: '利用木星巨大引力透镜，观测系外类地行星演化全生命周期。' },
      { id: 'merchant', name: '小行星带矿业托拉斯', icon: '🪙', desc: '调配数万艘全自主采矿驳船，开采千万吨稀金稀土资源。' },
      { id: 'military', name: '内行星联合巡航提督', icon: '⚔️', desc: '麾下聚变动力巨型护航战舰巡视小行星带，护卫远航通商航道。' },
      { id: 'recluse', name: '深空量子冥想大师', icon: '🌿', desc: '在特洛伊群小行星建造孤独观测站，体悟人与宇宙天人合一。' }
    ]
  },
  {
    id: 'season_13_mars_dyson',
    seasonIndex: 13,
    name: '行星生态 · 戴森云环',
    eraDesc: '太阳系戴森云环首期并网，巨型行星生态气候重塑，数字化宗祠跨代意念传承。',
    startYear: 2500,
    endYear: 2700,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '戴森能元(DE)',
    historicalEras: [
      { id: 'era_13_1', name: '太阳光压 · 戴森云建', startYear: 2500, endYear: 2550 },
      { id: 'era_13_2', name: '母星反哺 · 气候恒定', startYear: 2550, endYear: 2600 },
      { id: 'era_13_3', name: '量子祖庙 · 意念矩阵', startYear: 2600, endYear: 2650 },
      { id: 'era_13_4', name: '生态方舟 · 文明庇护', startYear: 2650, endYear: 2700 }
    ],
    careerTracks: [
      { id: 'official', name: '戴森工程最高专员', icon: '🏛️', desc: '主导千亿千瓦级太阳聚能阵列建设，调配太阳系全域恒星能源。' },
      { id: 'scholar', name: '恒星生态气候总师', icon: '📜', desc: '重塑金星与火星宏观大气层，使其成为适合人类繁衍的绿洲。' },
      { id: 'merchant', name: '恒星级光压能源寡头', icon: '🪙', desc: '统筹戴森云超导输电网，结算全太阳系能元，资产富可倾星。' },
      { id: 'military', name: '戴森防线舰队司令', icon: '⚔️', desc: '统帅驻泊太阳极轨的护卫要塞，保障恒星能源枢纽固若金汤。' },
      { id: 'recluse', name: '空间生态自然护持者', icon: '🌿', desc: '竭力守护地球母星自然原生态保护区，传承最古老的人文记忆。' }
    ]
  },
  {
    id: 'season_14_kuiper_interstellar',
    seasonIndex: 14,
    name: '恒星远航 · 深空哨所',
    eraDesc: '柯伊伯带深空哨所，亚光速光帆舰队驶向南门二半人马座，华夏世家远征深空。',
    startYear: 2700,
    endYear: 2900,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '星海量子币',
    historicalEras: [
      { id: 'era_14_1', name: '柯伊伯带 · 边疆堡垒', startYear: 2700, endYear: 2750 },
      { id: 'era_14_2', name: '奥尔特云 · 星际哨所', startYear: 2750, endYear: 2800 },
      { id: 'era_14_3', name: '曲率光帆 · 先遣启航', startYear: 2800, endYear: 2850 },
      { id: 'era_14_4', name: '星外宗支 · 跨光年守望', startYear: 2850, endYear: 2900 }
    ],
    careerTracks: [
      { id: 'official', name: '边疆开拓最高总督', icon: '🏛️', desc: '执掌太阳系外缘前沿星区，制定首部《深空星际开拓大宪章》。' },
      { id: 'scholar', name: '曲率跃迁工程大宗师', icon: '📜', desc: '攻克空间弯曲与反物质折叠跃迁难题，引领舰队迈向光速时代。' },
      { id: 'merchant', name: '反物质燃料垄断托拉斯', icon: '🪙', desc: '供给所有星际先遣舰队的终极动力，掌控跨恒星通商命脉。' },
      { id: 'military', name: '柯伊伯深空舰队统领', icon: '⚔️', desc: '巡视四十个天文单位之遥的冰封哨所，戍卫人类通往外星之门。' },
      { id: 'recluse', name: '奥尔特星云守望者', icon: '🌿', desc: '身居奥尔特云万年冰核之内，以超光速量子波向故土传唱古风。' }
    ]
  },
  {
    id: 'season_15_civilization_leap',
    seasonIndex: 15,
    name: '星际长歌 · 文明跃迁',
    eraDesc: '恒星际跃迁网络建立，系外宜居行星开辟新家园，华夏百家姓谱系播撒向浩瀚银河。',
    startYear: 2900,
    endYear: 3100,
    spanYears: 200,
    recommendedGenerations: 4,
    currencyName: '银河星元',
    historicalEras: [
      { id: 'era_15_1', name: '新元开基 · 新华夏星', startYear: 2900, endYear: 2950 },
      { id: 'era_15_2', name: '跨星同盟 · 乡约法典', startYear: 2950, endYear: 3000 },
      { id: 'era_15_3', name: '文明长青 · 银河天心', startYear: 3000, endYear: 3050 },
      { id: 'era_15_4', name: '万世不朽 · 三千载终局', startYear: 3050, endYear: 3100 }
    ],
    careerTracks: [
      { id: 'official', name: '银河百家姓文明议长', icon: '🏛️', desc: '主盟数十个恒星系华夏各门阀宗族，主持三千年文明庆典大典。' },
      { id: 'scholar', name: '三千年文脉执笔官', icon: '📜', desc: '修纂跨越公元100至3100年之《华夏全史》，文垂千古万世仰望。' },
      { id: 'merchant', name: '银河星元贸易同盟统领', icon: '🪙', desc: '统辖全银河系宗族信托公积，资产不可胜计，反哺万亿子孙。' },
      { id: 'military', name: '恒星跃迁防卫大元帅', icon: '⚔️', desc: '统领全银河防御天幕，庇护数以百计新家园行星和平永续。' },
      { id: 'recluse', name: '星云智库终身元老', icon: '🌿', desc: '化身智慧长河守护宗祠圣火，指引后世迈向更宏大的未知宇宙。' }
    ]
  }
];

const {
  SEASON_CAREER_LADDERS,
  SEASON_HISTORICAL_EVENTS,
  getSeasonCareerLadders,
  getSeasonEvents,
  getSeasonRankTitle
} = require('./seasonContentPacks');

// 统一将 15 赛季的职业线梯级 (ladder) 与重大历史关隘大案 (events) 注入 SEASONS_REGISTRY
SEASONS_REGISTRY.forEach(s => {
  const ladders = getSeasonCareerLadders(s.seasonIndex);
  if (ladders && Array.isArray(s.careerTracks)) {
    s.careerTracks.forEach(t => {
      t.ladder = ladders[t.id] || ladders.official || [];
    });
  }
  s.careerLadders = ladders;
  s.historicalEvents = getSeasonEvents(s.seasonIndex);
  s.events = s.historicalEvents;
});

// 时间线总表 (Chronological Master Timeline Registry)
// 贯通纪元、赛季、出生年代三大体系，彻底解决划分割裂
const CHRONO_TIMELINE_REGISTRY = {
  systemTitle: '华夏三千年世家大系',
  totalSpanYears: 3000,
  startYear: 100,
  endYear: 3100,
  seasonsCount: 15,
  seasonSpanYears: 200,
  seasons: SEASONS_REGISTRY,
  epochStartYears: {
    1: 100,
    2: 300,
    3: 500,
    4: 700,
    5: 900,
    6: 1100,
    7: 1300,
    8: 1500,
    9: 1700,
    10: 1900,
    11: 2100,
    12: 2300,
    13: 2500,
    14: 2700,
    15: 2900
  },
  epochNames: [
    '',
    '汉魏风骨', '六朝烟雨', '南北归一', '盛唐气象', '宋韵风华',
    '两宋烽烟', '大元一统', '阳明心学', '康乾鼎盛', '近代风雷',
    '近地开发', '深空拓荒', '行星生态', '恒星远航', '星际长歌'
  ],
  birthEraPresets: [
    { year: 100, seasonIndex: 1, name: '东汉门阀开基', eraTag: '汉魏风骨', desc: '和帝永元十二年，经学世家立宗祠筑坞堡，启程第一赛季两百年风骨' },
    { year: 168, seasonIndex: 1, name: '汉末党锢烽烟', eraTag: '风骨名士', desc: '灵帝建宁元年，党锢之祸爆发，结交天下名流，保全宗门砥柱' },
    { year: 220, seasonIndex: 1, name: '三国九品初定', eraTag: '鼎峙中原', desc: '曹魏代汉九品中正初定，出将入相定鼎中原，跻身上品门阀' },
    { year: 1978, seasonIndex: 10, name: '当代弄潮篇章', eraTag: '现代改革', desc: '两千年后传承至当代弄潮篇章，亲历改革开放激荡岁月' }
  ]
};

function getSeasonById(seasonId) {
  return SEASONS_REGISTRY.find(s => s.id === seasonId || (s.aliases && s.aliases.includes(seasonId))) || SEASONS_REGISTRY[0];
}

function getSeasonByIndex(idx) {
  return SEASONS_REGISTRY.find(s => s.seasonIndex === idx) || SEASONS_REGISTRY[0];
}

function getSeasonByYear(year) {
  const y = Number(year) || 100;
  return SEASONS_REGISTRY.find(s => y >= s.startYear && y < s.endYear) || SEASONS_REGISTRY[SEASONS_REGISTRY.length - 1];
}

function isYearInSeason(year, seasonId) {
  const s = getSeasonById(seasonId);
  return year >= s.startYear && year <= s.endYear;
}

/**
 * 现实运营赛季规范 (Real-World LiveOps Seasons Registry, RS1 ~ RS15)
 * 现实节奏：每季标准周期为 7 周（约 49 天，6 周激烈争榜 + 1 周休赛结卷公示）
 * 15 大现实赛季总运营周期约为 1.8 ~ 2.0 年，与 15 个两百年世界年赛季形成精准一一映射。
 */
const REAL_WORLD_SEASONS_REGISTRY = [
  {
    realSeasonId: 'RS_2026_Q4_HANWEI',
    realSeasonIndex: 1,
    worldSeasonId: 'season_1_han_wei',
    name: '创世第1赛季 · 汉魏风骨 (100~300年)',
    durationWeeks: 7,
    startDate: '2026-10-15',
    endDate: '2026-12-03',
    frontierYear: 2035,
    leaderboardResetKey: 'rs_1_leaderboard'
  },
  {
    realSeasonId: 'RS_2026_WINTER_LIUCHAO',
    realSeasonIndex: 2,
    worldSeasonId: 'season_2_liu_chao',
    name: '第2赛季 · 六朝烟雨 (300~500年)',
    durationWeeks: 7,
    startDate: '2026-12-04',
    endDate: '2027-01-22',
    frontierYear: 2045,
    leaderboardResetKey: 'rs_2_leaderboard'
  },
  {
    realSeasonId: 'RS_2027_SPRING_SUITANG',
    realSeasonIndex: 3,
    worldSeasonId: 'season_3_sui_tang',
    name: '第3赛季 · 南北归一 (500~700年)',
    durationWeeks: 7,
    startDate: '2027-01-23',
    endDate: '2027-03-13',
    frontierYear: 2055,
    leaderboardResetKey: 'rs_3_leaderboard'
  },
  {
    realSeasonId: 'RS_2027_SPRING2_TANG',
    realSeasonIndex: 4,
    worldSeasonId: 'season_4_tang_wudai',
    name: '第4赛季 · 盛唐气象 (700~900年)',
    durationWeeks: 7,
    startDate: '2027-03-14',
    endDate: '2027-05-02',
    frontierYear: 2065,
    leaderboardResetKey: 'rs_4_leaderboard'
  },
  {
    realSeasonId: 'RS_2027_SUMMER_SONG',
    realSeasonIndex: 5,
    worldSeasonId: 'season_5_song_yun',
    name: '第5赛季 · 宋韵风华 (900~1100年)',
    durationWeeks: 7,
    startDate: '2027-05-03',
    endDate: '2027-06-21',
    frontierYear: 2075,
    leaderboardResetKey: 'rs_5_leaderboard'
  },
  {
    realSeasonId: 'RS_2027_SUMMER2_NANSONG',
    realSeasonIndex: 6,
    worldSeasonId: 'season_6_nan_song_yuan',
    name: '第6赛季 · 两宋烽烟 (1100~1300年)',
    durationWeeks: 7,
    startDate: '2027-06-22',
    endDate: '2027-08-10',
    frontierYear: 2085,
    leaderboardResetKey: 'rs_6_leaderboard'
  },
  {
    realSeasonId: 'RS_2027_AUTUMN_YUANMING',
    realSeasonIndex: 7,
    worldSeasonId: 'season_7_da_yuan_ming_chu',
    name: '第7赛季 · 大元一统 (1300~1500年)',
    durationWeeks: 7,
    startDate: '2027-08-11',
    endDate: '2027-09-29',
    frontierYear: 2095,
    leaderboardResetKey: 'rs_7_leaderboard'
  },
  {
    realSeasonId: 'RS_2027_AUTUMN2_MINGQING',
    realSeasonIndex: 8,
    worldSeasonId: 'season_8_ming_zhong_wan',
    name: '第8赛季 · 阳明心学 (1500~1700年)',
    durationWeeks: 7,
    startDate: '2027-09-30',
    endDate: '2027-11-18',
    frontierYear: 2105,
    leaderboardResetKey: 'rs_8_leaderboard'
  },
  {
    realSeasonId: 'RS_2027_WINTER_QING',
    realSeasonIndex: 9,
    worldSeasonId: 'season_9_qing_sheng_shi',
    name: '第9赛季 · 康乾鼎盛 (1700~1900年)',
    durationWeeks: 7,
    startDate: '2027-11-19',
    endDate: '2028-01-07',
    frontierYear: 2115,
    leaderboardResetKey: 'rs_9_leaderboard'
  },
  {
    realSeasonId: 'RS_2028_WINTER2_MODERN',
    realSeasonIndex: 10,
    worldSeasonId: 'season_10_jin_dai_dang_dai',
    name: '第10赛季 · 近代风雷 (1900~2100年)',
    durationWeeks: 7,
    startDate: '2028-01-08',
    endDate: '2028-02-26',
    frontierYear: 2125,
    leaderboardResetKey: 'rs_10_leaderboard'
  },
  {
    realSeasonId: 'RS_2028_SPRING_MOON',
    realSeasonIndex: 11,
    worldSeasonId: 'season_11_near_orbit_moon',
    name: '第11赛季 · 近地开发 (2100~2300年)',
    durationWeeks: 7,
    startDate: '2028-02-27',
    endDate: '2028-04-16',
    frontierYear: 2135,
    leaderboardResetKey: 'rs_11_leaderboard'
  },
  {
    realSeasonId: 'RS_2028_SPRING2_FUSION',
    realSeasonIndex: 12,
    worldSeasonId: 'season_12_deep_space_fusion',
    name: '第12赛季 · 深空拓荒 (2300~2500年)',
    durationWeeks: 7,
    startDate: '2028-04-17',
    endDate: '2028-06-05',
    frontierYear: 2145,
    leaderboardResetKey: 'rs_12_leaderboard'
  },
  {
    realSeasonId: 'RS_2028_SUMMER_DYSON',
    realSeasonIndex: 13,
    worldSeasonId: 'season_13_mars_dyson',
    name: '第13赛季 · 行星生态 (2500~2700年)',
    durationWeeks: 7,
    startDate: '2028-06-06',
    endDate: '2028-07-25',
    frontierYear: 2155,
    leaderboardResetKey: 'rs_13_leaderboard'
  },
  {
    realSeasonId: 'RS_2028_SUMMER2_INTERSTELLAR',
    realSeasonIndex: 14,
    worldSeasonId: 'season_14_kuiper_interstellar',
    name: '第14赛季 · 恒星远航 (2700~2900年)',
    durationWeeks: 7,
    startDate: '2028-07-26',
    endDate: '2028-09-13',
    frontierYear: 2165,
    leaderboardResetKey: 'rs_14_leaderboard'
  },
  {
    realSeasonId: 'RS_2028_AUTUMN_CIVILIZATION',
    realSeasonIndex: 15,
    worldSeasonId: 'season_15_civilization_leap',
    name: '第15赛季 · 星际长歌 (2900~3100年)',
    durationWeeks: 7,
    startDate: '2028-09-14',
    endDate: '2028-11-02',
    frontierYear: 3100,
    leaderboardResetKey: 'rs_15_leaderboard'
  }
];

function getRealSeasonById(realSeasonId) {
  return REAL_WORLD_SEASONS_REGISTRY.find(s => s.realSeasonId === realSeasonId) || REAL_WORLD_SEASONS_REGISTRY[0];
}

function getRealSeasonByIndex(idx) {
  return REAL_WORLD_SEASONS_REGISTRY.find(s => s.realSeasonIndex === idx) || REAL_WORLD_SEASONS_REGISTRY[0];
}

function mapWorldSeasonToRealSeason(worldSeasonId) {
  return REAL_WORLD_SEASONS_REGISTRY.find(s => s.worldSeasonId === worldSeasonId) || REAL_WORLD_SEASONS_REGISTRY[0];
}

function getRealSeasonByDate(dateOrTs) {
  const ts = typeof dateOrTs === 'string' ? new Date(dateOrTs).getTime() : Number(dateOrTs);
  if (!ts || isNaN(ts) || !Array.isArray(REAL_WORLD_SEASONS_REGISTRY) || REAL_WORLD_SEASONS_REGISTRY.length === 0) {
    return REAL_WORLD_SEASONS_REGISTRY[0];
  }

  // 若早于创世第1赛季开始时间，归入第1赛季
  const firstStart = new Date(REAL_WORLD_SEASONS_REGISTRY[0].startDate).getTime();
  if (ts < firstStart) return REAL_WORLD_SEASONS_REGISTRY[0];

  // 若晚于最终赛季结束时间，归入最新终局赛季
  const lastEnd = new Date(REAL_WORLD_SEASONS_REGISTRY[REAL_WORLD_SEASONS_REGISTRY.length - 1].endDate).getTime();
  if (ts >= lastEnd) return REAL_WORLD_SEASONS_REGISTRY[REAL_WORLD_SEASONS_REGISTRY.length - 1];

  for (let i = 0; i < REAL_WORLD_SEASONS_REGISTRY.length; i++) {
    const s = REAL_WORLD_SEASONS_REGISTRY[i];
    const start = new Date(s.startDate).getTime();
    const end = new Date(s.endDate).getTime();
    if (ts >= start && ts <= end) return s;

    // 若处于本赛季结束与下一赛季开赛间的短暂休整过渡期，归入当前休赛期的前置赛季
    if (i < REAL_WORLD_SEASONS_REGISTRY.length - 1) {
      const nextStart = new Date(REAL_WORLD_SEASONS_REGISTRY[i + 1].startDate).getTime();
      if (ts > end && ts < nextStart) {
        return s;
      }
    }
  }
  return REAL_WORLD_SEASONS_REGISTRY[0];
}

/**
 * 计算目标真实赛季的剩余倒计时
 * @param {Object} realSeason
 * @param {number|Date} [currentTs]
 * @returns {{ days: number, hours: number, minutes: number, isExpired: boolean, text: string }}
 */
function calculateSeasonCountdown(realSeason, currentTs) {
  if (!realSeason || !realSeason.endDate) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true, text: '赛季已结束' };
  }
  const now = (currentTs !== undefined && currentTs !== null)
    ? (typeof currentTs === 'string' ? new Date(currentTs).getTime() : Number(currentTs))
    : Date.now();
  const end = new Date(realSeason.endDate).getTime();
  const diff = end - now;
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, isExpired: true, text: '赛季已结卷' };
  }
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  return {
    days,
    hours,
    minutes,
    isExpired: false,
    text: `剩余 ${days} 天 ${hours} 小时`
  };
}


/**
 * 最小赛季内容包标准规格 (Minimum Season Content Pack - MSCP)
 * 供策划、数值与内容产线对齐，标准周期 7 周一季
 */
const SEASON_CONTENT_SPEC = {
  version: '1.0.0',
  description: '标准200年世家大系赛季内容包最小准入标准 (MSCP)',
  cycleDurationWeeks: 7,
  requirements: {
    // 1. 官制与阶梯：约 5 条主线阶梯（文臣/学士/商贾/武弁/隐逸），每条梯级 5 阶
    careerLadders: { minTracks: 5, minRanksPerTrack: 5, targetTotal: 25 },
    // 2. 纪元名宿与对话通讯录：6 ~ 10 位历史真实名仕
    historicalFigures: { minFigures: 6, maxFigures: 10, minDialoguesPerFigure: 2 },
    // 3. 历史关隘大案事件：4 ~ 12 个重大历史抉择事件（含检定、代际影响、谥号/门风标记）
    criticalChronoEvents: { minEvents: 4, maxEvents: 12, minOptionsPerEvent: 2 },
    // 4. 传世物与祖训物：2 ~ 3 件纪元特色传世重宝信物（具备长线专属被动加成）
    relicsAndHeritage: { minRelics: 2, maxRelics: 3 },
    // 5. 纪元基础池：出生地郡望池 (>=6)、父辈职业池 (>=5)、抓周物池 (>=6)
    foundationPools: { minProvinces: 6, minParentVocations: 5, minZhuazhouItems: 6 }
  }
};

/**
 * 7周一季赛季内容产线倒排排期模版 (Season Production Reverse Schedule)
 * T-7 到 T-0 周全流程准入
 */
const SEASON_PRODUCTION_PIPELINE = [
  { week: 'T-7', phase: '史实考据与立项', deliverables: '断代考据、世家谱系脉络、名仕初选名单、5条行当官制初稿' },
  { week: 'T-6', phase: '数值框架与阶梯', deliverables: '俸禄与产出系数、门第声望阈值、抓周/出生地/父职基础池' },
  { week: 'T-5', phase: '剧情与关隘大案', deliverables: '4~12个重大历史抉择事件草案、选项检定要求与奖惩分流' },
  { week: 'T-4', phase: '名宿通讯录研制', deliverables: '6~10位历史名仕立绘、台词文风、交互支线与好感增益' },
  { week: 'T-3', phase: '传世信物与家训', deliverables: '2~3件传世重宝策划（如开皇碑拓、兰亭贴等）、长线宗族加成' },
  { week: 'T-2', phase: '无头自动化仿真', deliverables: '全量关隘检定通过率跑测、代际资产流转平衡性验证、零死循环测试' },
  { week: 'T-1', phase: '灰度体验与封包', deliverables: '小范围白名单测试、防沉迷/双模合规终审、热更CDN包数字签名封包' },
  { week: 'T-0', phase: '正式开季上线', deliverables: '全服无缝切换赛季、跨季大结卷资产结转、新榜单启程' }
];

// 已发布并就绪的赛季内容包清单（第1季汉魏风骨、第2季六朝烟雨）
const READY_SEASON_CONTENT_PACKS = new Set([
  'season_1_han_wei',
  'season_2_liu_chao'
]);

/**
 * 校验目标赛季是否已研制完成并具备内容包
 * @param {string|number} seasonOrEpochId 赛季ID或纪元编号
 * @returns {boolean}
 */
function hasSeasonContentPack(seasonOrEpochId) {
  if (!seasonOrEpochId) return false;
  const sStr = String(seasonOrEpochId);
  if (READY_SEASON_CONTENT_PACKS.has(sStr)) return true;
  if (sStr === '1' || sStr === 'epoch_1' || sStr === 'RS_2026_Q4_HANWEI') return true;
  if (sStr === '2' || sStr === 'epoch_2' || sStr === 'RS_2026_WINTER_LIUCHAO') return true;
  return false;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    SEASONS_REGISTRY,
    CHRONO_TIMELINE_REGISTRY,
    REAL_WORLD_SEASONS_REGISTRY,
    SEASON_CONTENT_SPEC,
    SEASON_PRODUCTION_PIPELINE,
    READY_SEASON_CONTENT_PACKS,
    getSeasonById,
    getSeasonByIndex,
    getSeasonByYear,
    isYearInSeason,
    getRealSeasonById,
    getRealSeasonByIndex,
    mapWorldSeasonToRealSeason,
    getRealSeasonByDate,
    calculateSeasonCountdown,
    hasSeasonContentPack,
    getSeasonRankTitle,
    getSeasonCareerLadders,
    getSeasonEvents,
    SEASON_CAREER_LADDERS,
    SEASON_HISTORICAL_EVENTS
  };
}
