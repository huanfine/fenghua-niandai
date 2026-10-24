// 华夏三千年世家大系 · 古代至近代通史纪元总控引擎 (AncientChronicleMaster)
// 覆盖纪元二至纪元十（公元300年 ～ 2100年），与第一纪元（100~300年）及未来深空纪元（2100~3100年）无缝衔接
// 严格按照 15 大 200 年连续整纪元规范组织，消弭双轨割裂

const EPOCHS_TWO_TO_TEN_DATABASE = [
  // =========================================================================
  // 纪元二：六朝烟雨与门阀南渡 (公元 300 ～ 500年)
  // =========================================================================
  {
    epochIndex: 2,
    epochName: '六朝烟雨',
    timeSpan: [300, 500],
    contextSummary: '八王之乱、永嘉之祸，中原板荡。衣冠巨族相率浮江南渡，王与马共天下，建康侨置，六朝风雅。',
    historicalEvents: [
      {
        id: 'epoch2_event1_yongjia',
        year: 311,
        title: '永嘉南渡 · 存亡去就',
        historicalContext: '洛阳沦陷，五胡蜂起。匈奴刘曜焚掠宫庙。族中祖宅沦陷在即，宗族去留在此一举。',
        options: [
          {
            text: '举族携带族谱木牌与先祖灵位，泛舟过江侨居建康',
            cost: { money: 3000 },
            reqStat: 'courage',
            reqVal: 50,
            successReward: {
              clanPrestige: 40,
              resilience: 30,
              branchTag: 'south_migrated',
              chronicleText: '裹粮南渡，过江寓居秦淮，虽失中原良田，得保宗脉不绝，始开江南一脉。'
            }
          },
          {
            text: '固守太行山坞堡，联络北方遗民结寨拒胡自保',
            reqStat: 'courage',
            reqVal: 60,
            successReward: {
              courage: 30,
              rep: 30,
              branchTag: 'north_fortress',
              chronicleText: '坚守北方坞堡，历经十六国兵燹，百战不灭，成为太行遗民砥柱。'
            },
            failPenalty: {
              money: -2000,
              health: -20,
              chronicleText: '后赵石勒部破外寨，族人退保绝壁，血战保全老幼。'
            }
          }
        ]
      },
      {
        id: 'epoch2_event2_lanting',
        year: 353,
        title: '兰亭修禊 · 门阀清议',
        historicalContext: '王羲之携谢安等名士会聚山阴兰亭，曲水流觞。九品中正制下，上品无寒门，下品无势族。',
        options: [
          {
            text: '研习老庄名理与玄言，登兰亭与书圣唱和名震江左',
            reqStat: 'iq',
            reqVal: 60,
            successReward: {
              rep: 40,
              iq: 25,
              officialTitle: '晋中书舍人',
              relicId: 'lanting_rubbing',
              chronicleText: '玄谈精妙，为中正官叹服，核定为上品名门，名列侨姓高门。'
            },
            failPenalty: {
              rep: 10,
              chronicleText: '清谈见拙，被讥为浮虚，评为中品，进身受阻。'
            }
          },
          {
            text: '经略会稽曲阿良田，兴修水利水力硙碾以安顿侨民',
            cost: { money: 4000 },
            successReward: {
              money: 15000,
              resilience: 25,
              clanPrestige: 30,
              chronicleText: '深耕沃土，修陂筑堰，得万斛粮谷，以实业安顿流民数千。'
            }
          }
        ]
      },
      {
        id: 'epoch2_event3_feishui',
        year: 383,
        title: '淝水惊涛 · 北府雄风',
        historicalContext: '前秦苻坚率百万大军投鞭断流，晋室危在旦夕。谢公东山下围棋，遣北府兵迎击于淝水。',
        options: [
          {
            text: '选拔族中精壮从戎编入北府兵，决战淮淝渡口',
            reqStat: 'courage',
            reqVal: 60,
            successReward: {
              courage: 35,
              rep: 45,
              officialTitle: '汉寿亭侯/辅国将军',
              chronicleText: '北府立功，淝水大捷，阵斩敌将，名震江左，进封将军！'
            },
            failPenalty: {
              health: -20,
              clanPrestige: 15,
              chronicleText: '血战淮淝，子弟舍身御敌，虽有负伤终保半壁江山。'
            }
          },
          {
            text: '为谢府中军筹措战船十艘与粮草千斛保后路无虞',
            cost: { money: 5000 },
            successReward: {
              money: 12000,
              clanPrestige: 40,
              chronicleText: '运筹帷幄，粮草如山，战后朝廷论功行赏，进封开国侯伯。'
            }
          }
        ]
      },
      {
        id: 'epoch2_event4_qianluo',
        year: 494,
        title: '孝文迁洛 · 胡汉同风',
        historicalContext: '北魏孝文帝拓跋宏迁都洛阳，改鲜卑姓为汉姓，尊崇儒术礼制，天下大融合。',
        options: [
          {
            text: '上表策陈两汉经制与华夏典章，主导洛阳宗庙礼制建制',
            reqStat: 'iq',
            reqVal: 65,
            successReward: {
              iq: 30,
              rep: 45,
              clanPrestige: 50,
              chronicleText: '辅弼新朝礼制，制定大典，宗族被核定为【中原文冠第一流】！'
            }
          },
          {
            text: '主持修纂胡汉合璧大族谱，广结北方高门亲好',
            cost: { money: 4000 },
            successReward: {
              rep: 35,
              clanPrestige: 40,
              chronicleText: '修谱通婚，兼通南北，为隋唐大一统埋下百年人脉！'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元三：南北归一与隋唐草创 (公元 500 ～ 700年)
  // =========================================================================
  {
    epochIndex: 3,
    epochName: '南北归一',
    timeSpan: [500, 700],
    contextSummary: '侯景乱梁江左凋敝，西魏北周宇文泰立关陇集团。隋文帝开皇一统，大业贯通运河，初唐开科取士。',
    historicalEvents: [
      {
        id: 'epoch3_event1_kaihuang',
        year: 581,
        title: '开皇筑基 · 关陇开国',
        historicalContext: '隋文帝受禅代周，定都大兴，推行三省六部制，普查户口，开皇之治破关山。',
        options: [
          {
            text: '参与厘定《开皇律》，主持修订清算户籍之“大索貌阅”',
            reqStat: 'iq',
            reqVal: 60,
            successReward: {
              officialTitle: '隋大理寺丞/度支郎中',
              rep: 35,
              clean: 25,
              chronicleText: '执法平允，厘定户口使隐户归公，文帝称善，官拜度支机要。'
            }
          },
          {
            text: '出资助建大兴城新坊，置办丝绸行栈与水硙磨坊',
            cost: { money: 5000 },
            successReward: {
              money: 20000,
              clanPrestige: 35,
              chronicleText: '立足新都大兴，水磨磨坊日进斗金，积累雄厚传家之基。'
            }
          }
        ]
      },
      {
        id: 'epoch3_event2_yunhe',
        year: 605,
        title: '大业开河 · 运河舟楫',
        historicalContext: '隋炀帝发百万民夫开凿大运河，贯通通济渠、江南河与永济渠，南北水运大通。',
        options: [
          {
            text: '组建家族内河漕运船帮，垄断江淮至东都洛阳的粮盐转运',
            cost: { money: 6000 },
            successReward: {
              money: 30000,
              clanPrestige: 40,
              chronicleText: '千艘巨舟通南北，经略天下运河水利，资产不可胜计。'
            }
          },
          {
            text: '开仓赈济沿渠劳役流民，设立义舍收容孤残',
            cost: { money: 3500 },
            successReward: {
              morality: 40,
              clanPrestige: 45,
              newMottoTag: '仁德恤黎',
              chronicleText: '荒年不忘仁爱，全活运河两岸流民无数，德馨播于淮南江北。'
            }
          }
        ]
      },
      {
        id: 'epoch3_event3_zhenguan',
        year: 640,
        title: '贞观宏图 · 科甲发轫',
        historicalContext: '唐太宗虚心纳谏，行科举开进士明经科。房杜谋断，魏征直谏，盛世华章初现。',
        options: [
          {
            text: '命子弟苦研《五经正义》，赴长安弘文馆应选进士策试',
            reqStat: 'iq',
            reqVal: 65,
            successReward: {
              officialTitle: '唐中书舍人/起居郎',
              rep: 45,
              relicId: 'tang_handwritten_scrolls',
              chronicleText: '一举折桂，名动长安，太宗亲加赞许，自此开族中数百年科甲先河！'
            },
            failPenalty: {
              rep: 15,
              chronicleText: '辞策虽谨，未中甲科，然结交朝中名硕，为后代筑基。'
            }
          },
          {
            text: '倾资修筑乡族义学与先祖祠堂，设立学田供养后学',
            cost: { money: 4500 },
            successReward: {
              morality: 30,
              clanPrestige: 40,
              chronicleText: '立义学筑学田，宗族子弟诵读不辍，世有达人。'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元四：盛唐气象与藩镇风云 (公元 700 ～ 900年)
  // =========================================================================
  {
    epochIndex: 4,
    epochName: '盛唐气象',
    timeSpan: [700, 900],
    contextSummary: '开元盛世万国来朝，李杜诗篇惊天地。安史之乱突起，郭子仪再造唐室，藩镇割据世家转向士绅。',
    historicalEvents: [
      {
        id: 'epoch4_event1_kaiyuan_silk',
        year: 720,
        title: '开元西市 · 飞钱通商',
        historicalContext: '开元全盛，长安西市胡商云集。波斯粟特商人以金币包销庄园丝绸。',
        options: [
          {
            text: '设立联号，以【飞钱便换】开拓丝绸之路贸易汇兑',
            cost: { money: 5000 },
            successReward: {
              money: 35000,
              clanPrestige: 40,
              chronicleText: '首开飞钱兑付，西行大获其利，族中府库白银锦帛充溢。'
            }
          },
          {
            text: '专心置办族塾书楼，广购四海古今图籍万卷',
            cost: { money: 4000 },
            successReward: {
              iq: 35,
              clanPrestige: 45,
              relicId: 'tang_yanta_inscription',
              chronicleText: '守清白之诫，聚书万卷，子弟学识渊雅，门庭肃穆。'
            }
          }
        ]
      },
      {
        id: 'epoch4_event2_anshi_war',
        year: 755,
        title: '安史狂澜 · 勤王护驾',
        historicalContext: '渔阳鼙鼓动地来，安禄山反。两京沦陷，肃宗灵武即位，征发四海兵马勤王。',
        options: [
          {
            text: '输送族中精壮从郭子仪朔方军，捐献军粮万石',
            cost: { money: 8000 },
            reqStat: 'courage',
            reqVal: 65,
            successReward: {
              courage: 45,
              rep: 50,
              officialTitle: '唐赞治功臣/节度使',
              chronicleText: '朔方血战，两京收复，因功赐封铁券，满门忠烈名耀竹帛！'
            },
            failPenalty: {
              health: -20,
              clanPrestige: 25,
              chronicleText: '转战关中，折损良多，终迎玄宗还都，德义重于泰山。'
            }
          },
          {
            text: '携宗族核心藏书与祭器潜避入蜀中巴山',
            cost: { money: 3000 },
            successReward: {
              resilience: 35,
              clanPrestige: 30,
              chronicleText: '护全先圣古籍图谱入蜀，文种不绝，蜀人叹为高风。'
            }
          }
        ]
      },
      {
        id: 'epoch4_event3_fanzhen_crisis',
        year: 875,
        title: '晚唐烽烟 · 保全宗族',
        historicalContext: '黄巢起事，转战江淮两京。朱温李克用并起，旧门阀遭受浩劫，世家面临转型。',
        options: [
          {
            text: '筑高墙深沟固守乡村祖坞，散财周济乡里贫民以结人心',
            cost: { money: 6000 },
            successReward: {
              morality: 40,
              resilience: 40,
              clanPrestige: 40,
              chronicleText: '保全乡梓数百口，乱军过境秋毫无犯，宗族避过灭顶之灾。'
            }
          },
          {
            text: '出使藩镇节度使幕府，以经学策论劝谕止戈息兵',
            reqStat: 'iq',
            reqVal: 65,
            successReward: {
              rep: 40,
              officialTitle: '节度掌书记',
              chronicleText: '纵横捭阖于强藩之间，保全州郡生民，名冠藩镇。'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元五：宋韵风华与义庄书院 (公元 900 ～ 1100年)
  // =========================================================================
  {
    epochIndex: 5,
    epochName: '宋韵风华',
    timeSpan: [900, 1100],
    contextSummary: '陈桥兵变赵宋立国，崇文抑武。范仲淹首创义庄义田，欧阳修苏洵定制欧苏谱法，平民宗族制度大成。',
    historicalEvents: [
      {
        id: 'epoch5_event1_chao_wu',
        year: 960,
        title: '陈桥兵变 · 崇文抑武',
        historicalContext: '赵匡胤陈桥黄袍加身，杯酒释兵权。朝廷重开科举大纳天下士子，文人治国时代降临。',
        options: [
          {
            text: '命全族子弟改习进士词赋，投考开封贡院殿试',
            reqStat: 'iq',
            reqVal: 65,
            successReward: {
              officialTitle: '宋太常寺卿/知州',
              rep: 45,
              chronicleText: '文运昌隆！殿试钦点甲科，开宗明义，文宗地位百代巩固。'
            }
          },
          {
            text: '在汴京开设大型雕版印刷书坊与交引钱庄',
            cost: { money: 6000 },
            successReward: {
              money: 30000,
              clanPrestige: 35,
              chronicleText: '刊印经史四书，交通天下交子银钱，文商并举富甲都城。'
            }
          }
        ]
      },
      {
        id: 'epoch5_event2_yizhuang',
        year: 1050,
        title: '范氏义庄 · 宗法立基',
        historicalContext: '范仲淹创立范氏义庄，买田千亩周济同宗。先祖深为震动，倡议效法。',
        options: [
          {
            text: '效法范公，捐出五成家资购置【不可变卖之宗族义田】',
            cost: { money: 10000 },
            successReward: {
              clanPrestige: 60,
              morality: 50,
              newMottoTag: '义庄义学',
              chronicleText: '立下我族第一所义庄！置义田三百亩，供孤寡老幼，设义塾免束脩，百代不衰！'
            }
          },
          {
            text: '创办州桥瓦舍茶坊，以盈余设立助学金',
            cost: { money: 4000 },
            successReward: {
              money: 20000,
              clanPrestige: 35,
              chronicleText: '兼济义利，茶坊收益年年反哺宗祠，子弟衣食无虞。'
            }
          }
        ]
      },
      {
        id: 'epoch5_event3_ousu_pufa',
        year: 1069,
        title: '欧苏谱法 · 熙丰变法',
        historicalContext: '王安石推行青苗、免役新法；欧阳修苏洵定欧苏族谱法。先祖修撰我族首部印刷族谱。',
        options: [
          {
            text: '采用【欧苏五世一表法】，详考两汉魏晋源流雕版印谱',
            reqStat: 'iq',
            reqVal: 70,
            successReward: {
              clanPrestige: 55,
              iq: 30,
              relicId: 'ousu_first_edition_genealogy',
              chronicleText: '五世一表，源流井然！宗谱印成送呈两朝学林，名门谱系自此大定！'
            }
          },
          {
            text: '因应青苗免役新法，在全县推广低息宗族信用借贷',
            cost: { money: 5000 },
            successReward: {
              money: 25000,
              morality: 35,
              chronicleText: '平易近民，宗族钱息远优于官府青苗钱，活民无数。'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元六：两宋烽烟与理学大成 (公元 1100 ～ 1300年)
  // =========================================================================
  {
    epochIndex: 6,
    epochName: '两宋烽烟',
    timeSpan: [1100, 1300],
    contextSummary: '靖康之耻徽钦北狩，高宗南渡定都临安。岳飞精忠报国，朱熹集理学大成，崖山之后气节照汗青。',
    historicalEvents: [
      {
        id: 'epoch6_event1_jingkang_nandu',
        year: 1127,
        title: '靖康风云 · 泛舟临安',
        historicalContext: '金兵破汴京，二帝蒙尘。天下大乱，先祖率全族护持谱牒灵牌，渡江南下。',
        options: [
          {
            text: '举族南迁浙江临安，购置水乡庄园重建宗祠',
            cost: { money: 6000 },
            successReward: {
              clanPrestige: 45,
              resilience: 35,
              chronicleText: '南渡立基，在西湖之畔再起家业，保全宗脉，耕读不缀。'
            }
          },
          {
            text: '子弟从戎加入岳飞抗金岳家军，誓雪靖康耻',
            reqStat: 'courage',
            reqVal: 65,
            successReward: {
              courage: 45,
              rep: 45,
              officialTitle: '岳家军偏校/制置副使',
              chronicleText: '铁甲染血，驰骋中原战阵，满门忠烈名动天下！'
            }
          }
        ]
      },
      {
        id: 'epoch6_event2_zhuzi_lixue',
        year: 1190,
        title: '考亭理学 · 白鹿书院',
        historicalContext: '朱熹重修白鹿洞书院，集宋代理学大成，颁行《白鹿洞书院揭示》与《朱子家礼》。',
        options: [
          {
            text: '遣子弟拜入朱夫子门下，以《朱子家礼》重新规范家族冠婚丧祭',
            reqStat: 'iq',
            reqVal: 65,
            successReward: {
              morality: 45,
              clanPrestige: 50,
              clean: 30,
              chronicleText: '以朱子家礼整肃门风，长幼有序，诗书传家，东南称第一规矩门第。'
            }
          },
          {
            text: '投资泉州市舶司远洋商船，贩运青瓷丝绸远航南洋',
            cost: { money: 8000 },
            successReward: {
              money: 45000,
              clanPrestige: 40,
              chronicleText: '刺桐港大船破浪，海商巨利反哺书院宗祠，资产益发丰饶。'
            }
          }
        ]
      },
      {
        id: 'epoch6_event3_yashan_spirit',
        year: 1279,
        title: '崖山沧海 · 气节长存',
        historicalContext: '元军大举南下，崖山海战陆秀夫负幼帝投海。南宋亡国，文天祥留取丹心照汗青。',
        options: [
          {
            text: '誓死不仕元廷，散财隐居富春山居，讲学以保华夏文脉',
            successReward: {
              clean: 50,
              morality: 50,
              clanPrestige: 60,
              relicId: 'yashan_song_inkstone',
              chronicleText: '高节清风！宁守贫贱绝不折腰，天下士林皆尊为胜国遗民泰斗。'
            }
          },
          {
            text: '出资收殓战殁遗骸，在江淮置办义冢义田庇护孤寡',
            cost: { money: 6000 },
            successReward: {
              morality: 40,
              clanPrestige: 45,
              chronicleText: '仁者无疆，乱世收恤残骨，全活遗民无数，阴骘深远。'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元七：大元一统与洪武开基 (公元 1300 ～ 1500年)
  // =========================================================================
  {
    epochIndex: 7,
    epochName: '大元一统',
    timeSpan: [1300, 1500],
    contextSummary: '元末红巾聚义，朱元璋渡江定鼎金陵。明初颁行黄册鱼鳞图册，永乐大典与宝船下西洋，江南望族再兴。',
    historicalEvents: [
      {
        id: 'epoch7_event1_hongwu_census',
        year: 1368,
        title: '洪武开基 · 黄册鱼鳞',
        historicalContext: '朱元璋驱逐鞑虏恢复中华，开国大明，天下丈量田亩定鱼鳞图册，编纂赋役黄册。',
        options: [
          {
            text: '如实呈报田粮鱼鳞底册，协助朝廷清厘一县户籍税粮',
            reqStat: 'clean',
            reqVal: 55,
            successReward: {
              officialTitle: '明洪武粮长/户部主事',
              rep: 40,
              clean: 25,
              chronicleText: '处事公正，粮长课税毫厘不爽，洪武帝赐玺书奖勉，门第崇隆。'
            }
          },
          {
            text: '设立义田义塾，为全族子弟定制大明祖训与里甲规条',
            cost: { money: 5000 },
            successReward: {
              morality: 35,
              clanPrestige: 40,
              chronicleText: '整饬家规，宗族秩序井然，成为官府旌表之义门世家。'
            }
          }
        ]
      },
      {
        id: 'epoch7_event2_yongle_expedition',
        year: 1405,
        title: '永乐盛世 · 宝船下海',
        historicalContext: '明成祖永乐迁都北京，遣三宝太监郑和率庞大宝船舰队七下西洋，万国来朝。',
        options: [
          {
            text: '选派族中通晓星历与航海之才随郑和船队出洋贸易',
            cost: { money: 8000 },
            reqStat: 'courage',
            reqVal: 65,
            successReward: {
              money: 50000,
              clanPrestige: 45,
              relicId: 'zhenghe_star_chart',
              chronicleText: '扬帆西洋，采获奇珍异宝无数，家族声名远播重洋之外！'
            }
          },
          {
            text: '参与永乐文渊阁《永乐大典》编纂，呈献传世孤本古籍',
            cost: { money: 4000 },
            successReward: {
              iq: 40,
              clanPrestige: 50,
              officialTitle: '翰林院修撰',
              chronicleText: '献书名扬金阙，子弟入翰林修典，文名垂于帝都青史。'
            }
          }
        ]
      },
      {
        id: 'epoch7_event3_tumu_crisis',
        year: 1449,
        title: '土木惊变 · 于谦守京',
        historicalContext: '也先诱伏英宗于土木堡，京师大震。于谦力排南迁之议，率军民死守九门破敌。',
        options: [
          {
            text: '长子投效于少保麾下，输送义粮千石力守京师城垣',
            reqStat: 'courage',
            reqVal: 65,
            successReward: {
              courage: 45,
              rep: 45,
              officialTitle: '京营都指挥佥事',
              chronicleText: '九门血战力阻瓦剌，于少保亲擢为将，满门忠勇立挽天倾！'
            }
          },
          {
            text: '在江南宗祠设祭坛，为抗敌将士家眷发放赡养钱米',
            cost: { money: 5000 },
            successReward: {
              morality: 40,
              clanPrestige: 40,
              chronicleText: '仗义疏财，安定人心，江南数万士民赞叹义声。'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元八：阳明心学与晚明清初 (公元 1500 ～ 1700年)
  // =========================================================================
  {
    epochIndex: 8,
    epochName: '阳明心学',
    timeSpan: [1500, 1700],
    contextSummary: '王阳明龙场悟道致良知，一条鞭法白银大流入，徽商晋商称雄天下。甲申天倾明清鼎革，气节凛然。',
    historicalEvents: [
      {
        id: 'epoch8_event1_yangming_mind',
        year: 1520,
        title: '龙场悟道 · 知行合一',
        historicalContext: '王守仁平定宸濠之乱，倡明知行合一、致良知之说。天下士子学者奔走往投。',
        options: [
          {
            text: '亲赴稽山阳明书院受业，将“致良知”立为本族新训',
            reqStat: 'iq',
            reqVal: 65,
            successReward: {
              morality: 45,
              iq: 35,
              newMottoTag: '知行合一',
              chronicleText: '以良知治家，知行兼修，族风廓然清朗，东南士林景仰。'
            }
          },
          {
            text: '经办阳明学派讲义木刻印书，广销江南各书院',
            cost: { money: 4000 },
            successReward: {
              money: 22000,
              clanPrestige: 35,
              chronicleText: '传播心学大道兼收书坊重利，文化与财资并驾齐驱。'
            }
          }
        ]
      },
      {
        id: 'epoch8_event2_yitiaobian_merchant',
        year: 1582,
        title: '一条鞭法 · 徽晋商潮',
        historicalContext: '张居正行一条鞭法赋役折银。大帆船载美洲白银源源流入江南，徽商晋商横空出世。',
        options: [
          {
            text: '成立家族钱庄票号与茶盐典当，进军全国徽晋商帮联号',
            cost: { money: 10000 },
            successReward: {
              money: 60000,
              clanPrestige: 40,
              chronicleText: '汇通天下！钱庄通连九州，茶盐大宗富冠江南，家族成为大商帮盟首。'
            }
          },
          {
            text: '督修家族庄园水利，购置不可典质之良田千亩',
            cost: { money: 6000 },
            successReward: {
              morality: 30,
              resilience: 35,
              chronicleText: '耕读本色不移，深耕田亩，仓廪常实，抵御未来乱世之风。'
            }
          }
        ]
      },
      {
        id: 'epoch8_event3_jiashen_change',
        year: 1644,
        title: '甲申鼎革 · 气节忠烈',
        historicalContext: '闯王进京崇祯殉国，满清入关颁布剃发令。山河易色，天下大乱，宗族面临生死考验。',
        options: [
          {
            text: '坚拒清廷征召，闭门隐居山林修撰前朝通史',
            reqStat: 'clean',
            reqVal: 65,
            successReward: {
              clean: 50,
              morality: 45,
              clanPrestige: 55,
              relicId: 'ming_dynasty_history_manuscript',
              chronicleText: '守节不屈！一代遗民高士，著书名山，被天下士林共尊为孤忠风骨。'
            }
          },
          {
            text: '散尽浮财设粥棚收容两浙流民，保全桑梓宗族无恙',
            cost: { money: 8000 },
            successReward: {
              morality: 40,
              clanPrestige: 45,
              chronicleText: '大慈大悲，全活流离饥民数千，宗族血脉安然渡过鼎革之难。'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元九：康乾鼎盛与西风东渐 (公元 1700 ～ 1900年)
  // =========================================================================
  {
    epochIndex: 9,
    epochName: '康乾鼎盛',
    timeSpan: [1700, 1900],
    contextSummary: '康乾盛世摊丁入亩，四库文澜考据盛行。鸦片战争叩开国门，洋务运动自强求富，废科举开启新学。',
    historicalEvents: [
      {
        id: 'epoch9_event1_tanding_rumou',
        year: 1723,
        title: '摊丁入亩 · 盛世修典',
        historicalContext: '雍正推行摊丁入亩与改土归流，人头税并入田赋。人口大爆发，宗族人口突破千口。',
        options: [
          {
            text: '参与四库全书纂修，呈献家族世藏宋元秘本孤本',
            cost: { money: 5000 },
            reqStat: 'iq',
            reqVal: 70,
            successReward: {
              clanPrestige: 50,
              officialTitle: '四库馆协修/翰林侍讲',
              relicId: 'siku_imperial_award',
              chronicleText: '藏书名动天子！乾隆帝亲赐《四库全书》荟要一套，钦赐文端匾额！'
            }
          },
          {
            text: '设立庞大宗族助产公积，鼓励分支族人拓殖两淮川陕',
            cost: { money: 8000 },
            successReward: {
              clanPrestige: 45,
              resilience: 40,
              chronicleText: '湖广填川，族人分徙巴蜀，宗脉分枝散叶，蔚为大族。'
            }
          }
        ]
      },
      {
        id: 'epoch9_event2_opium_awakening',
        year: 1840,
        title: '鸦片惊雷 · 睁眼看海',
        historicalContext: '虎门销烟与鸦片战争爆发，英国坚船利炮轰开虎门海口。三千年未有之大变局开启。',
        options: [
          {
            text: '资助林则徐、魏源编纂《海国图志》，购求西学天文地志',
            cost: { money: 8000 },
            reqStat: 'iq',
            reqVal: 65,
            successReward: {
              iq: 40,
              clanPrestige: 50,
              chronicleText: '师夷长技以制夷！第一批睁眼看世界，为家族未来新世纪转型埋下火种。'
            }
          },
          {
            text: '在广州十三行开辟对外丝茶进出口，累积外洋贸易白银',
            cost: { money: 10000 },
            successReward: {
              money: 65000,
              clanPrestige: 40,
              chronicleText: '统筹粤海对外贸易，资财巨万，富冠商港，宗族公积充盈。'
            }
          }
        ]
      },
      {
        id: 'epoch9_event3_yangwu_reform',
        year: 1878,
        title: '洋务自强 · 选送留洋',
        historicalContext: '李鸿章办轮船招商局，张之洞倡办铁厂，容闳选送幼童赴美留学。',
        options: [
          {
            text: '出资入股近代机器织布局与轮船码头，创办近代实业',
            cost: { money: 12000 },
            successReward: {
              money: 80000,
              clanPrestige: 50,
              officialTitle: '候补知府/实业参议',
              chronicleText: '开近代实业先河，机器轰鸣，日进斗金，跻身民族工商业先驱！'
            }
          },
          {
            text: '设立【家族留洋助学金】，资助子弟远渡欧美攻读工科机械',
            cost: { money: 15000 },
            successReward: {
              iq: 45,
              clanPrestige: 55,
              relicId: 'overseas_diploma',
              chronicleText: '送子弟求索新学，后出大工程师与大学问家，宗族掌握新时代先机！'
            }
          }
        ]
      }
    ]
  },

  // =========================================================================
  // 纪元十：近代风雷与智能复兴 (公元 1900 ～ 2100年)
  // =========================================================================
  {
    epochIndex: 10,
    epochName: '近代风雷',
    timeSpan: [1900, 2100],
    contextSummary: '辛亥革命终结帝制，抗战救亡毁家纾难。改革开放弄潮时代，AI算力与聚变破晓，三千年世家跨入新纪元。',
    historicalEvents: [
      {
        id: 'epoch10_event1_anti_japanese_war',
        year: 1937,
        title: '抗战救亡 · 机器大西迁',
        historicalContext: '日军全面侵华。淞沪抗战爆发，民族面临亡国危机，沿海工厂纷纷冒轰炸内迁大后方。',
        options: [
          {
            text: '拆卸全部精密车床机器，雇船冒炮火西迁重庆入川，昼夜赶制军需',
            cost: { money: 20000 },
            reqStat: 'courage',
            reqVal: 65,
            successReward: {
              courage: 45,
              clanPrestige: 70,
              officialTitle: '国民参政会参政员',
              chronicleText: '机器不熄，源源供应大后方战时军需，成为民族抗战实业砥柱！'
            }
          },
          {
            text: '捐出全族半数黄金积蓄认购驱逐机，长子投考笕桥空军航校',
            cost: { money: 30000 },
            successReward: {
              courage: 50,
              clanPrestige: 75,
              relicId: 'airforce_honor_medal',
              chronicleText: '长子升空击落敌机立殊勋，满门忠勇，举国报纸专版致敬！'
            }
          }
        ]
      },
      {
        id: 'epoch10_event2_reform_opening',
        year: 1992,
        title: '春天的故事 · 停薪下海',
        historicalContext: '南巡讲话发表，春雷动地。民营企业如雨后春笋，当代领军人面临铁饭碗与下海决断。',
        options: [
          {
            text: '辞去体制内安稳职务，赴深圳特区创办民营硬科技制造企业',
            cost: { money: 10000 },
            successReward: {
              money: 150000,
              clanPrestige: 60,
              newMottoTag: '敢为人先',
              chronicleText: '弄潮南海之滨，以借来的万元资金开辟高新产业，十年敲钟上市！'
            }
          },
          {
            text: '留守体制内兢兢业业，主持地方现代农业与脱贫攻坚工程',
            successReward: {
              rep: 50,
              morality: 45,
              officialTitle: '时代先锋楷模',
              chronicleText: '扎根热土，带领数万农户共同富裕，政声卓著，万民颂扬。'
            }
          }
        ]
      },
      {
        id: 'epoch10_event3_ai_fusion_2040',
        year: 2040,
        title: '前沿破晓 · 具身智能与聚变并网',
        historicalContext: '可控核聚变商用示范电网点火成功，人形具身机器人普及，第四次工业革命迎来终极决战。',
        options: [
          {
            text: '投入全部家族信托储备，重仓全自主知识产权超导量子芯片与机器人链主',
            cost: { money: 50000 },
            reqStat: 'iq',
            reqVal: 75,
            successReward: {
              money: 500000,
              iq: 50,
              clanPrestige: 90,
              relicId: 'quantum_chip_patent',
              chronicleText: '斩获全球科技巅峰大奖，家族正式跨入顶尖【硬核科技世家】神坛！'
            }
          },
          {
            text: '设立【华夏三千年文明数字智库基金】，将历代先祖古训数字化永久永存',
            cost: { money: 30000 },
            successReward: {
              morality: 60,
              clanPrestige: 80,
              newMottoTag: '大爱达济',
              chronicleText: '两千年风云化作永恒数字灵智，后世子孙随时可与先祖促膝论道！'
            }
          }
        ]
      }
    ]
  }
];

// 保持旧版变量名兼容性
const EPOCHS_TWO_TO_EIGHT_DATABASE = EPOCHS_TWO_TO_TEN_DATABASE;

/**
 * 推进执行某个指定纪元的某个事件
 */
function runSpecificEpochEvent(epochIndex, eventIdx, optionIdx, ancestorState) {
  const epochData = EPOCHS_TWO_TO_TEN_DATABASE.find(e => e.epochIndex === epochIndex);
  if (!epochData) return null;
  const evt = epochData.historicalEvents[eventIdx];
  if (!evt) return null;
  const opt = evt.options[optionIdx];
  if (!opt) return null;

  const result = {
    epochIndex,
    epochName: epochData.epochName,
    eventId: evt.id,
    eventTitle: evt.title,
    eventYear: evt.year,
    chosenText: opt.text,
    success: true,
    chronicleSnippet: ''
  };

  // 1. 属性检定 (支持 reqStat 与 reqTrack 多维赛道映射)
  let statKey = opt.reqStat;
  if (!statKey && opt.reqTrack) {
    const tr = String(opt.reqTrack).toLowerCase();
    if (['official', 'gov', 'politics'].includes(tr)) statKey = 'rep';
    else if (['scholar', 'edu', 'study'].includes(tr)) statKey = 'iq';
    else if (['merchant', 'biz', 'trade'].includes(tr)) statKey = 'iq';
    else if (['military', 'soldier'].includes(tr)) statKey = 'courage';
    else if (['recluse', 'hermit'].includes(tr)) statKey = 'clean';
    else if (['medical', 'doctor', 'herb'].includes(tr)) statKey = 'health';
    else statKey = 'courage';
  }
  if (statKey && typeof opt.reqVal === 'number') {
    const val = ancestorState[statKey] !== undefined ? ancestorState[statKey] : (ancestorState.courage || 50);
    if (val < opt.reqVal) {
      result.success = false;
      const pen = opt.failPenalty || {};
      for (const k in pen) {
        if (k !== 'chronicleText') ancestorState[k] = (ancestorState[k] || 0) + pen[k];
      }
      result.chronicleSnippet = pen.chronicleText || '世途多艰，遭逢坎坷。';
      return result;
    }
  }

  // 2. 扣除成本
  if (opt.cost) {
    for (const k in opt.cost) {
      ancestorState[k] = Math.max(0, (ancestorState[k] || 0) - opt.cost[k]);
    }
  }

  // 3. 施加收益
  const rew = opt.successReward || {};
  for (const k in rew) {
    if (k !== 'chronicleText' && k !== 'relicId' && k !== 'officialTitle' && k !== 'newMottoTag' && k !== 'branchTag') {
      ancestorState[k] = (ancestorState[k] || 0) + rew[k];
    }
  }

  if (rew.officialTitle) ancestorState.officialTitle = rew.officialTitle;
  if (rew.relicId) ancestorState.relicId = rew.relicId;
  if (rew.newMottoTag) {
    ancestorState.mottoTags = ancestorState.mottoTags || [];
    ancestorState.mottoTags.push(rew.newMottoTag);
  }

  result.chronicleSnippet = rew.chronicleText || '秉祖德以行，克绍箕裘。';
  return result;
}

/**
 * 结算纪元二至十终局先祖卡片
 */
function settleEpochAncestorRecord(epochIndex, familyProfile, ancestorState, decisionHistory = []) {
  if (typeof epochIndex === 'object' && typeof familyProfile === 'number') {
    const temp = epochIndex;
    epochIndex = familyProfile;
    familyProfile = temp;
  }
  familyProfile = familyProfile || {};
  ancestorState = ancestorState || {};
  decisionHistory = decisionHistory || [];

  const epochData = EPOCHS_TWO_TO_TEN_DATABASE.find(e => e.epochIndex === epochIndex);
  const DEFAULT_EPOCH_NAMES = [
    '', '汉魏风骨', '六朝烟雨', '南北归一', '盛唐气象', '宋韵风华',
    '两宋烽烟', '大元一统', '阳明心学', '康乾鼎盛', '近代风雷',
    '近地开发', '深空拓荒', '行星生态', '恒星远航', '星际长歌'
  ];
  const epochName = epochData ? epochData.epochName : (DEFAULT_EPOCH_NAMES[epochIndex] || `纪元${epochIndex}`);
  const timeSpan = epochData ? epochData.timeSpan : [100 + (epochIndex - 1) * 200, 100 + epochIndex * 200];

  // 动态依据经历关隘年份计算生卒享年
  const years = decisionHistory.map(d => d.eventYear || d.year).filter(y => typeof y === 'number');
  const minYear = years.length > 0 ? Math.min(...years) : timeSpan[0] + 15;
  const maxYear = years.length > 0 ? Math.max(...years) : timeSpan[1] - 20;
  const birthYear = ancestorState.birthYear || Math.max(timeSpan[0], minYear - 18);
  const deathYear = ancestorState.deathYear || Math.min(timeSpan[1], Math.max(birthYear + 60, maxYear + 5));
  const realisticLifespan = [birthYear, deathYear];

  // 按家族姓氏与家业底色拟定多元名讳
  const EPOCH_NAME_CANDIDATES = {
    2: [{ name: '彦先', zi: '伯达' }, { name: '承安', zi: '季雅' }, { name: '元规', zi: '仲舒' }],
    3: [{ name: '崇礼', zi: '孝先' }, { name: '开皇', zi: '化远' }, { name: '延龄', zi: '公寿' }],
    4: [{ name: '承业', zi: '宏道' }, { name: '知微', zi: '守礼' }, { name: '元崇', zi: '思敬' }],
    5: [{ name: '希贤', zi: '德基' }, { name: '正卿', zi: '纯夫' }, { name: '至德', zi: '善长' }],
    6: [{ name: '忠恕', zi: '子与' }, { name: '克绍', zi: '文伯' }, { name: '伯符', zi: '君仪' }],
    7: [{ name: '廷辅', zi: '良谟' }, { name: '嘉谟', zi: '子猷' }, { name: '世恩', zi: '若愚' }],
    8: [{ name: '守愚', zi: '笃卿' }, { name: '述圣', zi: '维新' }, { name: '培英', zi: '济生' }],
    9: [{ name: '济苍', zi: '砥平' }, { name: '靖宇', zi: '自强' }, { name: '秉钧', zi: '辅邦' }],
    10: [{ name: '新民', zi: '振华' }, { name: '志远', zi: '海潮' }, { name: '立德', zi: '思源' }],
    11: [{ name: '天行', zi: '纪宇' }, { name: '晨曦', zi: '启明' }, { name: '贯日', zi: '凌云' }],
    12: [{ name: '远航', zi: '拓星' }, { name: '巡天', zi: '御宇' }, { name: '越海', zi: '扶摇' }],
    13: [{ name: '泰初', zi: '守元' }, { name: '玄同', zi: '应变' }, { name: '造极', zi: '见素' }],
    14: [{ name: '开阳', zi: '渡虚' }, { name: '浩然', zi: '载驰' }, { name: '太虚', zi: '澄空' }],
    15: [{ name: '太和', zi: '同光' }, { name: '大同', zi: '归元' }, { name: '三千', zi: '永纪' }]
  };

  const seed = (familyProfile.surname ? familyProfile.surname.charCodeAt(0) : 7) + epochIndex;
  const candList = EPOCH_NAME_CANDIDATES[epochIndex] || [{ name: '彦先', zi: '伯达' }];
  const picked = candList[seed % candList.length];

  const givenName = ancestorState.name || picked.name;
  const ziHao = ancestorState.ziHao || picked.zi;
  const official = ancestorState.officialTitle || '布衣名士';

  // 综合数值与家业底色拟定谥号
  const voc = familyProfile.vocationId || 'study_scholar';
  let posthumous = '庄惠公';
  if (voc === 'trade_craft') {
    posthumous = (ancestorState.money || 0) > 40000 ? '通惠公' : '裕民公';
  } else if (voc === 'medical_herb') {
    posthumous = (ancestorState.morality || 50) > 70 ? '仁康公' : '普济公';
  } else if (voc === 'iron_craft') {
    posthumous = (ancestorState.courage || 50) > 70 ? '格致公' : '工敏公';
  } else {
    // study_scholar
    if ((ancestorState.morality || 50) > 75) posthumous = '文正公';
    else if ((ancestorState.iq || 50) > 75) posthumous = '文简公';
    else if ((ancestorState.courage || 50) > 75) posthumous = '武烈公';
    else posthumous = '庄惠公';
  }

  // 拟定本纪元传承家训
  let newMottoText = '守正出奇，顺应时势。敦宗睦族，行善积德。';
  if (ancestorState.mottoTags && ancestorState.mottoTags.includes('义庄义学')) {
    newMottoText = '贫富相恤，义庄永昌。族中有秀，合力扶持。';
  } else if (ancestorState.mottoTags && ancestorState.mottoTags.includes('诚贾立基')) {
    newMottoText = '通商有道，信用第一。以诚聚财，以仁分财。';
  } else if (ancestorState.mottoTags && ancestorState.mottoTags.includes('知行合一')) {
    newMottoText = '知行合一，致其良知。事上磨练，不欺暗室。';
  } else if (ancestorState.mottoTags && ancestorState.mottoTags.includes('敢为人先')) {
    newMottoText = '勇立潮头，敢为人先。实干兴家，科技自立。';
  }

  const deeds = decisionHistory.map(d => `【${d.eventYear}年】${d.chronicleSnippet}`);

  return {
    eraIndex: epochIndex,
    eraName: epochName,
    givenName,
    ziHao,
    lifespan: realisticLifespan,
    officialTitle: official,
    posthumousTitle: posthumous,
    epitaph: `身逢【${epochName}】风云之会，秉祖德周旋于大争之世。修明家规，化解兵燹险阻，护佑宗支长青。`,
    finalDeeds: deeds,
    bequeathedMoney: Math.max(2000, Math.floor(ancestorState.money || 5000)),
    prestigeGain: ancestorState.clanPrestige || 50,
    newMotto: {
      era: `第${epochIndex}世·${epochName}留训`,
      text: newMottoText,
      author: `${familyProfile.surname}公${givenName}`
    },
    passedRelic: ancestorState.relicId ? { id: ancestorState.relicId, name: `${epochName}传家信物` } : null
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EPOCHS_TWO_TO_TEN_DATABASE,
    EPOCHS_TWO_TO_EIGHT_DATABASE,
    runSpecificEpochEvent,
    settleEpochAncestorRecord
  };
}
