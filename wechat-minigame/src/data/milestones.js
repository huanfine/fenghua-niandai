// 游戏成就、历史重大时刻、赛道里程碑与时代头条纪事
const MOMENTS_DATABASE = [
  {
    "id": "post_suqing",
    "authorId": "su_qing",
    "authorName": "苏晴",
    "role": "启明红杉资本合伙人 · 创投女王",
    "avatar": "💼",
    "timeAgo": "2小时前",
    "content": "在宏观周期波动中，真正能穿越风暴的从来不是盲目追逐风口的企业，而是现金流扎实、核心技术自立自强的实干家。敬畏周期，笃定前行。",
    "likes": 128,
    "userLiked": false,
    "replies": [
      {
        "name": "钱万山",
        "text": "苏总所言极是！实业才是真金白银！"
      }
    ],
    "replyOptions": [
      {
        "text": "【商业远见】：实业为本，自主研发才是穿越周期的真正护城河！",
        "iqDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【从容低调】：感谢苏总肯定，稳健经营与合规底线始终是第一准则。",
        "cleanDelta": 3,
        "eqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_qian",
    "authorId": "qian_wanshan",
    "authorName": "钱万山",
    "role": "万山商贸集团实控人 · 草莽商界巨鳄",
    "avatar": "🚢",
    "timeAgo": "4小时前",
    "content": "今晚码头又靠岸了三艘万吨冷藏船！三十年前我们靠小木船出海拉鱼，今天全自动化深水泊位开道。时代变了，敢闯敢拼的实干骨气永不褪色！干！",
    "likes": 256,
    "userLiked": false,
    "replies": [],
    "replyOptions": [
      {
        "text": "【江湖豪气】：祝钱总货通天下！海阔凭鱼跃，实业更上一层楼！",
        "courageDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【品质严谨】：冷链温度溯源台账一定要抓牢，质量过硬是长青基石。",
        "cleanDelta": 3,
        "iqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_zhong",
    "authorId": "zhong_lao",
    "authorName": "钟老泰斗",
    "role": "呼吸内科国家医学中心带头人 · 院士",
    "avatar": "🩺",
    "timeAgo": "昨天",
    "content": "医道漫漫，无非是性命相托的责任二字。青年医师要耐得住坐冷板凳，查房多听患者两句，手术台上手要稳、心要正、德要清。",
    "likes": 512,
    "userLiked": false,
    "replies": [],
    "replyOptions": [
      {
        "text": "【致敬医道】：大医精诚，谨遵钟老教诲，择一事终一生！",
        "cleanDelta": 3,
        "repDelta": 2,
        "trustDelta": 10
      },
      {
        "text": "【科研攻坚】：牢记临床导向，把攻关成果实实在在写在治病救人第一线！",
        "iqDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_chen",
    "authorId": "chen_tiesheng",
    "authorName": "陈铁生",
    "role": "国家重型数控机床首席总工程师",
    "avatar": "🔬",
    "timeAgo": "昨天",
    "content": "历时五年，第七代自研五轴联动高精机床通过全工况切削验收！重复定位精度冲入亚微米级！谁说中国造不出顶尖工业母机？敬今夜所有的图纸与汗水！",
    "likes": 384,
    "userLiked": false,
    "replies": [],
    "replyOptions": [
      {
        "text": "【大国工匠】：硬核自立，打破国外卡脖子垄断！向陈总工团队致敬！",
        "courageDelta": 3,
        "repDelta": 2,
        "trustDelta": 10
      },
      {
        "text": "【协同创新】：期待与总工团队在底层工控总线与自研芯片深度联合研发！",
        "iqDelta": 3,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_luyuan",
    "authorId": "lu_xiaohe",
    "authorName": "陆小禾",
    "role": "百村联合富民果蔬合作社理事长",
    "avatar": "🌾",
    "timeAgo": "2天前",
    "content": "深山梯田的晚熟富硒李子今天全部完成田头预冷装箱！看着老乡们分红到账时脸上的笑容，所有的日晒雨淋与汗水都值了。农业大有可为！",
    "likes": 198,
    "userLiked": false,
    "replies": [],
    "replyOptions": [
      {
        "text": "【乡村振兴】：沃野千里，实干兴邦！为陆理事长点赞！",
        "repDelta": 3,
        "eqDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【地理标志】：抓紧申报国家原产地地理标志保护，把生态溢价实实在在地带给农户！",
        "iqDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_yan",
    "authorId": "yan_binggong",
    "authorName": "严秉公",
    "role": "省纪检监察资深专员 · 纪检风骨标杆",
    "avatar": "⚖️",
    "timeAgo": "1小时前",
    "content": "心有敬畏，行有所止。公权力是人民赋予的沉甸甸责任，不是人情变通的筹码。两袖清风不仅是防线，更是最坚实的铠甲。",
    "likes": 210,
    "userLiked": false,
    "replies": [
      {
        "name": "周治国",
        "text": "公生明，廉生威！严公之言振聋发聩！"
      }
    ],
    "replyOptions": [
      {
        "text": "【恪守操守】：心如明镜，不染纤尘。严把纪律红线，对历史与人民负责！",
        "cleanDelta": 4,
        "iqDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【实干担当】：在清廉守正的前提下大胆破局，绝不做'不贪也不干'的太平官。",
        "courageDelta": 3,
        "cleanDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_sun_zong",
    "authorId": "sun_zongshi",
    "authorName": "孙总师",
    "role": "国家重点航空航天战略工程领衔总设计师",
    "avatar": "🚀",
    "timeAgo": "3小时前",
    "content": "今晨试车台点火成功，推力曲线与预研仿真完全吻合！三十年前我们靠图纸圆规计算，今天全数字化风洞领航。仰望星空，大国重器从不靠恩赐，唯有一代代人死磕到底！",
    "likes": 389,
    "userLiked": false,
    "replies": [
      {
        "name": "梁工",
        "text": "总师辛苦！核心叶片微米级动平衡我们车间保质保量交付！"
      }
    ],
    "replyOptions": [
      {
        "text": "【致敬国之重器】：向科研前辈致敬！关键核心技术自立自强，吾辈当自强！",
        "repDelta": 3,
        "iqDelta": 3,
        "trustDelta": 10
      },
      {
        "text": "【协同攻坚】：产学研紧密协同，后方产业链全力以赴保障战略攻坚！",
        "courageDelta": 3,
        "eqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_liang",
    "authorId": "liang_gong",
    "authorName": "梁工",
    "role": "大国工匠 · 国家级数控微米修研大师",
    "avatar": "🛠️",
    "timeAgo": "5小时前",
    "content": "车间干了四十年，最安心的声音就是刀尖切削合金的沙沙声。进口设备再先进，最后零点零零三毫米的手工微研，靠的是手感和静气。手艺活，骗不了人。",
    "likes": 268,
    "userLiked": false,
    "replies": [
      {
        "name": "沈大国",
        "text": "跟师傅学一辈子手艺，更学做人的匠骨！"
      }
    ],
    "replyOptions": [
      {
        "text": "【执着专注】：天下难事必作于易，精益求精方显大国匠心！",
        "iqDelta": 3,
        "resilienceDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【尊师重道】：向老一辈产业工人致敬，把绝活踏实传下去！",
        "eqDelta": 3,
        "cleanDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_gu",
    "authorId": "gu_jiaoshou",
    "authorName": "顾教授",
    "role": "国家医学中心名誉院长 · 资深大外科博导",
    "avatar": "🩺",
    "timeAgo": "6小时前",
    "content": "刚走下十二个小时的急诊联合断肢微创吻合台。年轻医生问我累不累，我说看到患者重新恢复脉搏和指尖温度，这种踏实是任何名利都无法比拟的。医生的一生，是渡人也是渡己。",
    "likes": 345,
    "userLiked": false,
    "replies": [
      {
        "name": "张护士长",
        "text": "顾老快喝口温水歇歇，生命体征平稳，我们守着！"
      }
    ],
    "replyOptions": [
      {
        "text": "【大医精诚】：敬畏生命，救死扶伤，医者仁心天地可鉴！",
        "cleanDelta": 3,
        "resilienceDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【关切健康】：医护大爱无疆，也请老院长多保重身体！",
        "eqDelta": 3,
        "healthDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_zhao_pai",
    "authorId": "zhao_paizhang",
    "authorName": "赵排长",
    "role": "重大战略基建突击队队长 · 铁血老排长",
    "avatar": "🪖",
    "timeAgo": "8小时前",
    "content": "高寒缺氧的特长隧道今天终于双向贯通了！全排战士在洞口抱头痛哭。我们把青春和汗水浇筑进了祖国大山深处，列车穿过的那一刻，一切牺牲都值了！",
    "likes": 412,
    "userLiked": false,
    "replies": [
      {
        "name": "陈铁峰",
        "text": "向铁血战友致敬！山河不会忘记你们的功绩！"
      }
    ],
    "replyOptions": [
      {
        "text": "【铁血壮志】：逢山开路，遇水架桥！向共和国的开路先锋致以最高敬意！",
        "courageDelta": 4,
        "repDelta": 3,
        "trustDelta": 10
      },
      {
        "text": "【深情铭记】：血肉之躯筑就钢铁脊梁，祖国和人民永远铭记！",
        "eqDelta": 3,
        "resilienceDelta": 3,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_zhou_zhi",
    "authorId": "zhou_zhiguo",
    "authorName": "周治国",
    "role": "发改综合司重点规划处长 · 宏观大局操盘手",
    "avatar": "🏛️",
    "timeAgo": "9小时前",
    "content": "起草五年规划重大产业布局汇编。统筹东部沿海与中西部腹地、统筹产业升级与民生兜底，每一笔数字背后都是千家万户的生计。不谋万世者，不足谋一时；不谋全局者，不足谋一域。",
    "likes": 198,
    "userLiked": false,
    "replies": [
      {
        "name": "严秉公",
        "text": "治大国若烹小鲜，务求实效，戒骄戒躁。"
      }
    ],
    "replyOptions": [
      {
        "text": "【宏阔大局】：跳出一域看全局，坚持以人民为中心的发展思想！",
        "iqDelta": 4,
        "repDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【求真务实】：顶层设计与基层实际深度结合，确保政策春风化雨落地生根！",
        "cleanDelta": 3,
        "courageDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_qi_lao",
    "authorId": "qi_lao",
    "authorName": "齐老",
    "role": "国家文史馆资深馆员 · 传统文化大家",
    "avatar": "📜",
    "timeAgo": "12小时前",
    "content": "深夜校勘古籍《天工开物》与《农政全书》。中华文脉绵延五千年，先民的巧思与韧劲早已融进民族基因。时代在变，求实求真、自强不息的民族气韵万古常青。",
    "likes": 275,
    "userLiked": false,
    "replies": [
      {
        "name": "叶知秋",
        "text": "齐老墨宝微言大义！非遗与数字美术正当传承此文脉！"
      }
    ],
    "replyOptions": [
      {
        "text": "【文脉传承】：文化自信是一个国家最深沉、最持久的力量源泉！",
        "iqDelta": 3,
        "cleanDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【知行合一】：读万卷书行万里路，把古圣先贤的智慧化作当代实干养分！",
        "resilienceDelta": 3,
        "courageDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_fang_ling",
    "authorId": "fang_ling",
    "authorName": "方凌",
    "role": "法援工作站主任 · 公益法治名宿",
    "avatar": "⚖️",
    "timeAgo": "14小时前",
    "content": "跑了三个省调查取证，终于帮四十二位尘肺病工友拿到了先予执行赔偿金。法律的条文是冰冷的，但正义的天平永远有温度。只要老百姓有委屈，我们就在他们身边。",
    "likes": 320,
    "userLiked": false,
    "replies": [
      {
        "name": "严秉公",
        "text": "法治中国，正需要像方律师这样敢为人伸张正义的铁肩硬骨！"
      }
    ],
    "replyOptions": [
      {
        "text": "【捍卫公义】：法治是最好的营商环境，更是弱势群体最温暖的依靠！",
        "cleanDelta": 4,
        "courageDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【同舟共济】：公益法援功德无量，支持建立专项工伤法援基金！",
        "eqDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_ye_zhiqiu",
    "authorId": "ye_zhiqiu",
    "authorName": "叶知秋",
    "role": "国风动画电影总导演 · 东方美学领跑者",
    "avatar": "🎨",
    "timeAgo": "16小时前",
    "content": "五年磨一剑，两千多个日夜的逐帧水墨手绘，新片终于拿到了龙标。有人劝我直接套用三维工业模版省成本，但东方意境的留白与气韵，必须用心血一笔一笔画出来！",
    "likes": 450,
    "userLiked": false,
    "replies": [
      {
        "name": "齐老",
        "text": "好一个画骨！期待在大银幕上一睹东方瑰宝气象！"
      }
    ],
    "replyOptions": [
      {
        "text": "【文化匠心】：不忘本来才能开辟未来，好作品经得起岁月的淘洗！",
        "iqDelta": 3,
        "resilienceDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【鼎力支持】：预祝大卖！东方美学理当走向世界中央舞台！",
        "repDelta": 3,
        "eqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_lao_jin",
    "authorId": "lao_jin",
    "authorName": "老金",
    "role": "深圳华强北元器件老行尊 · 供应链老炮",
    "avatar": "📦",
    "timeAgo": "18小时前",
    "content": "华强北三十年，看惯了多少人暴富又翻车。做元器件现货没有别的秘诀，一讲信誉，二懂技术。答应客户几号交货，哪怕自己贴运费空运也得按时送到！",
    "likes": 182,
    "userLiked": false,
    "replies": [
      {
        "name": "钱万山",
        "text": "金老板仗义！当年我跑外贸全靠你顶上关键批次！"
      }
    ],
    "replyOptions": [
      {
        "text": "【商道酬信】：人无信不立，业无信不兴！契约精神是商业最宝贵的财富！",
        "cleanDelta": 3,
        "eqDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【实战智慧】：敏锐洞察供应链波动，平稳护航实体制造业发展！",
        "iqDelta": 3,
        "courageDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_lin_yuan",
    "authorId": "lin_yuanshi",
    "authorName": "林院士",
    "role": "国家微电子与芯片技术先驱 · 战略科学家",
    "avatar": "🔬",
    "timeAgo": "20小时前",
    "content": "实验室里最后一批研究生完成了晶圆测试答辩。科学没有国界，但科学家有祖国。三十年前被封锁的时候，我们就坚信：中国人凭自己的双手，一定能造出世界上最好的芯片！",
    "likes": 560,
    "userLiked": false,
    "replies": [
      {
        "name": "孙总师",
        "text": "林院士风范长存！战略大协同，我们共同攻坚！"
      }
    ],
    "replyOptions": [
      {
        "text": "【薪火相传】：科技自强，舍我其谁！接过老一辈战略科学家的精神接力棒！",
        "iqDelta": 4,
        "courageDelta": 3,
        "trustDelta": 10
      },
      {
        "text": "【深厚敬意】：向自主创新的拓荒者致敬，大国崛起离不开无私奉献！",
        "repDelta": 3,
        "cleanDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_wang_dui",
    "authorId": "wang_duizhang",
    "authorName": "王队长",
    "role": "现代农机合作社理事长 · 农田机械化铁人",
    "avatar": "🌾",
    "timeAgo": "1天前",
    "content": "夏收大忙！五十台联合收割机列队开进麦浪，北斗自动导航加持，千亩麦田三天颗粒归仓！看着金灿灿的麦堆，这一年在地头流的汗水，全是甜的！",
    "likes": 230,
    "userLiked": false,
    "replies": [
      {
        "name": "陆远",
        "text": "王队好身手！现代农机把咱们农民从繁重体力里解放出来了！"
      }
    ],
    "replyOptions": [
      {
        "text": "【丰收喜悦】：向土地致敬，向实干的庄稼人致敬！仓廪实而天下安！",
        "resilienceDelta": 3,
        "cleanDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【农业科技】：科技强农、机械兴农，大国粮仓根基越来越扎实！",
        "iqDelta": 3,
        "courageDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_han_wenqing",
    "authorId": "han_wenqing",
    "authorName": "韩文清",
    "role": "深度脱贫攻坚驻村第一书记 · 时代楷模",
    "avatar": "🏛️",
    "timeAgo": "1天前",
    "content": "今天村里的冷链冻库和黑木耳大棚正式通电投产！老支书拉着我的手非要塞自家晒的柿饼。只要把老百姓的安危冷暖放在心头，再偏僻的穷山沟也能拔掉穷根！",
    "likes": 340,
    "userLiked": false,
    "replies": [
      {
        "name": "严秉公",
        "text": "俯首甘为孺子牛，韩书记辛苦！为民立功，人民不忘！"
      }
    ],
    "replyOptions": [
      {
        "text": "【扎根人民】：心系群众鱼得水，背离群众树断根！向一线扶贫干部致敬！",
        "cleanDelta": 3,
        "resilienceDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【产业赋能】：产业振兴是乡村振兴的根本，预祝特色农产品大卖！",
        "iqDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_zhang_haiqing",
    "authorId": "zhang_haiqing",
    "authorName": "张海清",
    "role": "山区改革老县长 · 退而不休护林长",
    "avatar": "🌲",
    "timeAgo": "1天前",
    "content": "退休二十年，在当年跑断腿的荒山栽下了十万株冷杉，如今已成万亩林海。为官一任，造福一方，留给子孙后代最好的遗产，就是这满目苍翠。",
    "likes": 298,
    "userLiked": false,
    "replies": [
      {
        "name": "周治国",
        "text": "老县长前人栽树后人乘凉，楷模风范长存！"
      }
    ],
    "replyOptions": [
      {
        "text": "【高风亮节】：捧一颗初心来，留万顷青山去！这才是共产党人的精神丰碑！",
        "cleanDelta": 4,
        "resilienceDelta": 3,
        "trustDelta": 10
      },
      {
        "text": "【绿水青山】：向老领导看齐，一张蓝图绘到底，久久为功！",
        "courageDelta": 3,
        "iqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_tang_cai",
    "authorId": "tang_caigou",
    "authorName": "唐采购",
    "role": "全国连锁超市生鲜采购总监 · 供应链把关人",
    "avatar": "🛒",
    "timeAgo": "2天前",
    "content": "深入大凉山果园直采，砍掉中间六道盘剥环节，既让果农每斤多赚八毛，又让大城市老百姓吃上平价鲜果。供应链的意义，就是用商业力量温暖两头！",
    "likes": 215,
    "userLiked": false,
    "replies": [
      {
        "name": "陆远",
        "text": "产地直采确实帮了大忙！今年合作社果子全走光了！"
      }
    ],
    "replyOptions": [
      {
        "text": "【合作共赢】：打通产销最后一公里，实实在在惠农利民！",
        "eqDelta": 3,
        "iqDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【严控品质】：生鲜源头把控，保障十四亿人舌尖上的安全！",
        "cleanDelta": 3,
        "resilienceDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_sun_hang",
    "authorId": "sun_hangzhang",
    "authorName": "孙行长",
    "role": "城商行对公金融副行长 · 普惠金融排头兵",
    "avatar": "🏦",
    "timeAgo": "2天前",
    "content": "今天批复了三十笔科技型小微企业'无抵押研发贷'。金融是实体经济的血脉，不能光做锦上添花，更要在高新技术种子破土最艰难的时候雪中送炭！",
    "likes": 240,
    "userLiked": false,
    "replies": [
      {
        "name": "顾明远",
        "text": "孙行长雪中送炭，解了我们初创团队流片燃眉之急！"
      }
    ],
    "replyOptions": [
      {
        "text": "【金融为民】：引导金融活水浇灌实体经济，善莫大焉！",
        "cleanDelta": 3,
        "iqDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【风险共担】：银企同舟共济，携手打造战略科创新高地！",
        "courageDelta": 3,
        "eqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_qin_zhu",
    "authorId": "qin_zhuren",
    "authorName": "秦主任",
    "role": "神经外科脑血管介入一把刀 · 临床金牌搭档",
    "avatar": "🩺",
    "timeAgo": "2天前",
    "content": "显微镜下拆除颅内复杂动脉瘤，耗时九小时。导丝在零点几毫米的血管里游走，稍有不慎就是万丈深渊。外科医生没有退路，唯有百分之百的专注与决绝。",
    "likes": 312,
    "userLiked": false,
    "replies": [
      {
        "name": "顾教授",
        "text": "下刀稳健，手艺炉火纯青，秦主任好样的！"
      }
    ],
    "replyOptions": [
      {
        "text": "【刀尖探戈】：以精湛医术挑战生命禁区，向白衣战士致敬！",
        "courageDelta": 3,
        "resilienceDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【笃行不怠】：千锤百炼成就绝技，患者之大幸！",
        "cleanDelta": 3,
        "iqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_qi_zong",
    "authorId": "qi_zong",
    "authorName": "齐总",
    "role": "国产腔镜手术机器人独角兽创始人 · 产学研伙伴",
    "avatar": "🤖",
    "timeAgo": "3天前",
    "content": "国产手术机器人第五千例人体临床多中心验证全部达标！过去一台进口设备要两千多万，耗材每年几百万。今天我们把整机成本打下一半，县级医院也能用得起！",
    "likes": 378,
    "userLiked": false,
    "replies": [
      {
        "name": "苏晴",
        "text": "当年投这轮A轮是我做过最自豪的决定，高端医疗装备全面突围！"
      }
    ],
    "replyOptions": [
      {
        "text": "【国之重器】：国产高端医疗装备自立自强，造福亿万百姓！",
        "repDelta": 3,
        "iqDelta": 3,
        "trustDelta": 8
      },
      {
        "text": "【普惠天下】：科技向善，让高阶医疗资源普惠基层！",
        "cleanDelta": 3,
        "courageDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_chu_tian",
    "authorId": "chu_tianshu",
    "authorName": "楚天舒",
    "role": "跨海大桥与深中通道总指挥部副指挥长",
    "avatar": "🌉",
    "timeAgo": "3天前",
    "content": "世界最大跨径海中钢箱梁合龙！海上鏖战七年，抗过十七级超强台风，克服深水强潮涌恶劣海况。中国桥梁建设者，从不向任何天险低头！",
    "likes": 480,
    "userLiked": false,
    "replies": [
      {
        "name": "赵排长",
        "text": "海上穿针引线，陆上逢山开路，大国基建有我们！"
      }
    ],
    "replyOptions": [
      {
        "text": "【一桥飞架】：天堑变通途！向世界展示大国超级工程磅礴力量！",
        "courageDelta": 4,
        "repDelta": 3,
        "trustDelta": 10
      },
      {
        "text": "【铁血忠诚】：攻克深海工程世界难题，你们是时代的弄潮儿！",
        "resilienceDelta": 3,
        "iqDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_chen_tie",
    "authorId": "chen_tiefeng",
    "authorName": "陈铁峰",
    "role": "抗洪抢险一等功臣 · 退役大校",
    "avatar": "🎖️",
    "timeAgo": "4天前",
    "content": "整理当年九八抗洪抢险老照片。决口大堤上，战友们跳进滔滔江水用身躯筑起人墙。几十年过去了，那份'听党指挥、能打胜仗'的军魂早已铸进血脉！",
    "likes": 510,
    "userLiked": false,
    "replies": [
      {
        "name": "岳青山",
        "text": "铁骨铮铮老英雄！敬礼！"
      }
    ],
    "replyOptions": [
      {
        "text": "【英雄赞歌】：军民同心固若金汤，致敬最可爱的人！",
        "courageDelta": 4,
        "cleanDelta": 3,
        "trustDelta": 10
      },
      {
        "text": "【初心永擎】：退役不褪色，转战地方续写辉煌篇章！",
        "repDelta": 3,
        "resilienceDelta": 3,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_tao_xiao",
    "authorId": "tao_xiaozhang",
    "authorName": "陶校长",
    "role": "大山女子免费高中创办人兼校长 · 七一勋章获得者",
    "avatar": "🎓",
    "timeAgo": "4天前",
    "content": "今天第一批毕业的女孩子从清华大学研究生毕业，主动申请回大山支教！她说：'张老师，我变成了当年的您。'教育，就是一棵树摇动另一棵树，一个灵魂唤醒另一个灵魂。",
    "likes": 620,
    "userLiked": false,
    "replies": [
      {
        "name": "温知新",
        "text": "百世师表，催人泪下！这就是大国教育最动人的风景！"
      }
    ],
    "replyOptions": [
      {
        "text": "【师道光芒】：燃灯校长点亮大山女孩人生！致敬伟大的人民教师！",
        "cleanDelta": 4,
        "resilienceDelta": 4,
        "trustDelta": 10
      },
      {
        "text": "【接力奉献】：薪火相传，大爱无疆，愿大山女孩前程似锦！",
        "eqDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_ji_jiao",
    "authorId": "ji_jiaoshou",
    "authorName": "季教授",
    "role": "量子科技前沿国家实验室领航科学家",
    "avatar": "🔬",
    "timeAgo": "5天前",
    "content": "光量子计算原型机完成千比特相干纠缠！国际顶刊以封面文章全篇刊发。这是我国在量子优越性领域迈出的关键历史一步。基础科研需要坐得住十年冷板凳的静气！",
    "likes": 435,
    "userLiked": false,
    "replies": [
      {
        "name": "林院士",
        "text": "季教授领航量子前沿，为国争光！"
      }
    ],
    "replyOptions": [
      {
        "text": "【自立自强】：坐热冷板凳，摘取基础科学皇冠上的明珠！",
        "iqDelta": 4,
        "repDelta": 3,
        "trustDelta": 10
      },
      {
        "text": "【探索无垠】：向未知发起挑战，抢占未来科技制高点！",
        "courageDelta": 3,
        "cleanDelta": 2,
        "trustDelta": 8
      }
    ]
  },
  {
    "id": "post_li_apo",
    "authorId": "li_apo",
    "authorName": "李阿婆",
    "role": "国家级非物质文化遗产苏绣织造传承人",
    "avatar": "🧵",
    "timeAgo": "5天前",
    "content": "一根真丝线劈成一百二十八丝，一针一线绣了八个月的《千里江山图》终于完工。现在村里年轻姑娘都在学刺绣，网上直播卖到几十个国家。传统手艺活出新光彩！",
    "likes": 360,
    "userLiked": false,
    "replies": [
      {
        "name": "齐老",
        "text": "鬼斧神工！民间非遗瑰宝在当代重焕生机！"
      }
    ],
    "replyOptions": [
      {
        "text": "【非遗新韵】：巧夺天工！传统非遗与数字国潮共融共生！",
        "iqDelta": 3,
        "cleanDelta": 2,
        "trustDelta": 8
      },
      {
        "text": "【共富手艺】：指尖技艺化作致富产业，阿婆功德无量！",
        "eqDelta": 3,
        "repDelta": 2,
        "trustDelta": 8
      }
    ]
  }
];

const ACHIEVEMENTS_LIST = [
  {
    "id": "pioneer_start",
    "title": "🌱 初心启航",
    "desc": "顺利完成人生首次入职履新"
  },
  {
    "id": "first_promoted",
    "title": "🚀 拔节起势",
    "desc": "获得人生第一次破格提拔晋升"
  },
  {
    "id": "industry_leader",
    "title": "🏛️ 行业翘楚",
    "desc": "出任行业龙头领跑者或国家级重点工程带头人"
  },
  {
    "id": "master_decision",
    "title": "✨ 绝妙破局",
    "desc": "在重大考验中成功触发并执行隐藏绝妙破局选项"
  },
  {
    "id": "whistleblower_hero",
    "title": "🛡️ 大国重器卫士",
    "desc": "在特大工程隐患中秉公直书捍卫质量红线"
  },
  {
    "id": "green_champion",
    "title": "🌱 零碳先锋",
    "desc": "主导建设国家级零碳示范基地或园区"
  },
  {
    "id": "sky_creator",
    "title": "🚁 天空之城",
    "desc": "敢为人先率先划定全域低空空域测试试验区"
  },
  {
    "id": "quantum_mind",
    "title": "⚛️ 科技脊梁",
    "desc": "主导量子计算或核心卡脖子技术取得国家级突破"
  },
  {
    "id": "space_captain",
    "title": "🚀 星辰大海",
    "desc": "商业运载火箭海上高精度垂直回收圆满成功"
  },
  {
    "id": "career_pivot_hero",
    "title": "⚡ 乘风转轨",
    "desc": "在人生关键分水岭勇敢跨界开创新天地"
  },
  {
    "id": "friends_everywhere",
    "title": "🌟 莫逆满天下",
    "desc": "与至少3位群像人物达成【莫逆之交】"
  },
  {
    "id": "clean_legend",
    "title": "⚔️ 铁壁清正",
    "desc": "连续三十年清廉指数始终保持在85分以上"
  },
  {
    "id": "tycoon_capital",
    "title": "💰 富甲一方",
    "desc": "个人或企业财富突破1000万元"
  },
  {
    "id": "medical_fellow",
    "title": "🩺 国士无双",
    "desc": "当选两院院士或主导国家医学中心"
  },
  {
    "id": "golden_family",
    "title": "👨‍👩‍👦 门风流芳",
    "desc": "创立永续传承的家族公益教育信托基金"
  },
  {
    "id": "long_life",
    "title": "🌿 颐养天年",
    "desc": "保持身心精力健康，平稳达至65岁光荣退休"
  },
  {
    "id": "aura_master",
    "title": "🌀 流派大宗师",
    "desc": "成功激活并维持一项战略流派共鸣光环"
  },
  {
    "id": "banquet_diplomat",
    "title": "🍷 席间纵横",
    "desc": "在重要公务或商务宴席博弈中拿下满分全胜"
  },
  {
    "id": "crisis_conqueror",
    "title": "🌊 惊涛骇浪",
    "desc": "平稳化解至少3次时代黑天鹅突发危机大考"
  },
  {
    "id": "grand_architect",
    "title": "🏆 卓越擘画",
    "desc": "登顶国家级示范区总指挥或协同发展总规划师"
  }
];


const TRACK_MILESTONES = {
  industry: [
    { age: 24, rank: "骨干三级钳工", job: "特种机床加工攻坚班组长", text: "【绝活淬炼】在全厂技能大比武中斩获钳工第一名，攻克高精度配合件公差难题！" },
    { age: 32, rank: "六级高级技师", job: "国家重大重装车间主任总技师", text: "【重装突围】带领攻关班组手工修配大型燃机转子，挽救价值数千万元关键装备！" },
    { age: 40, rank: "八级工技能大师", job: "国家级技能大师工作室带头人", text: "【大师铸剑】国家级技能大师工作室挂牌，数十项国家专利与工艺绝活享誉全行业！" },
    { age: 48, rank: "首席特级技师", job: "大国重器总装总技师", text: "【重器脊梁】主持国家重大科技工程主机总装装配，公差控制达到微米级世界最高水平！" },
    { age: 56, rank: "大国工匠泰斗", job: "国家大国工匠终身成就大师", text: "【工匠丰碑】荣获大国工匠年度人物与中华技能大奖，匠心技艺永载国家制造业史册！" }
  ],
  military: [
    { age: 24, rank: "先锋突击班长", job: "重点穿山架桥突击排班长", text: "【铁血排头兵】带领尖刀班冒暴雨塌方抢通国防生命线，荣立集体二等功！" },
    { age: 32, rank: "重大工程连长", job: "险难隧道贯通突击连连长", text: "【穿山破石】带领全连奋战八百昼夜，提前十个月打通千里秦岭特长隧道！" },
    { age: 40, rank: "基建工程总指挥", job: "国家战略通道重大工程项目总指挥", text: "【定海神针】在大江截流与高原冻土施工中化解特大管涌险情，保全千亿大工程安全！" },
    { age: 48, rank: "大国基建统帅", job: "国家重大工程建设集团总工程师", text: "【千秋伟业】领衔世界级超级跨海大桥与深中通道技术攻坚，立下不朽功绩！" },
    { age: 56, rank: "以身许国功勋专家", job: "国家重大基础设施建设终身功勋专家", text: "【国之柱石】三十八载以身许国，逢山开路遇水架桥，将万里壮美山河写入共和国丰碑！" }
  ],
        biz: [
          { age: 24, rank: "商行老板", job: "跨区水产冷链批发行长", text: "【商行跨越】立足码头成立全区最大冷链批发商行，年营收破千万！" },
          { age: 32, rank: "民营实业家", job: "收购国营冷冻食品厂厂长", text: "【实业突围】抵押全部身家成功改制国营冷冻厂，初显民营实业大鳄本色！" },
          { age: 40, rank: "民营集团老总", job: "城市基建控股董事长", text: "【基建巨擘】乘四万亿东风涉足城市基础建设，胜海控股全省闻名！" },
          { age: 48, rank: "拟上市公司总裁", job: "胜海实业实控人 (主板IPO在审)", text: "【资本跃升】化解银行抽贷危机，主板IPO申报获证监会受理！" },
          { age: 55, rank: "跨国巨头董事局主席", job: "高端智造跨国龙头董事长", text: "【一代传奇】完成全球化高端智造布局，成为中国民营商界一代传奇！" }
        ],
        med: [
          { age: 29, rank: "主治医师", job: "创伤微创普外主治医师", text: "【考核胜出】以全院第一名通过主治医师遴选，独立主刀三四级疑难微创手术！" },
          { age: 36, rank: "副主任医师", job: "大外科副主任 · 国自然PI", text: "【科研突围】斩获国家自然科学基金重点项目，破格晋升大外科副主任！" },
          { age: 43, rank: "主任医师 (博导)", job: "大外科大主任 · 国家课题带头人", text: "【学界巨擘】突破国家级靶向新药三期临床瓶颈，当选外科大主任！" },
          { age: 50, rank: "三甲副院长", job: "国家医学中心副主任 · 三甲副院长", text: "【领军统帅】出任知名三甲医院副院长，领衔全省重大医学中心攻关！" },
          { age: 56, rank: "三甲终身院长", job: "中华医学会副主委 · 两院院士", text: "【登峰造极】以杰出医学贡献当选两院院士，被誉为新时代医道国士！" }
        ],
        tech: [
          { age: 26, rank: "核心技术总监", job: "自主芯片与工业通讯协议研发带头人", text: "【技术破茧】自研首款高速工业通讯控制协议投产，获国家火炬计划立项支持！" },
          { age: 32, rank: "高新企业创始人", job: "明远微电子董事长兼首席科学家", text: "【自主攻坚】成功攻克高精度工业级伺服驱动算法，打破海外厂商长期垄断！" },
          { age: 40, rank: "智能装备掌舵人", job: "高精度工业机器人全栈自研龙头掌舵人", text: "【行业领跑】发布全国产微米级力控工业机器人系统，产值与估值双双突破百亿！" },
          { age: 48, rank: "科技巨头董事长", job: "工业互联网与智能装备科技集团董事长", text: "【科技登顶】主板成功挂牌上市，实现核心工业软件与智能装备全链条自主可控！" },
          { age: 56, rank: "功勋科学家企业家", job: "国家科学技术进步特等奖 · 科技先驱", text: "【时代丰碑】以卓越科技自立自强成就荣获国家科技进步最高嘉奖！" }
        ],
        agri: [
          { age: 25, rank: "农技示范带头人", job: "高山生态果蔬良种示范基地主理人", text: "【良种起步】荒坡引种高山优质果林首季大丰收，带动全乡农户增收致富！" },
          { age: 31, rank: "合作社理事长", job: "百村联合富民果蔬专业合作社理事长", text: "【带头致富】带领周边八个村上千农户入股合作社，户均分红翻番！" },
          { age: 38, rank: "现代农科董事长", job: "现代农业产业发展集团董事长", text: "【产业跃迁】建成全省最大恒温冷链与生态温室物流园，形成三产融合示范基地！" },
          { age: 46, rank: "乡村振兴领军人", job: "国家级农业产业化重点龙头企业掌舵人", text: "【绿水青山】高山特色农产品通过国际有机认证，成批直航出口海外！" },
          { age: 55, rank: "功勋卓越新农圣", job: "全国劳动模范 · 现代大农业功勋实干家", text: "【沃野传奇】带领十万老乡全面迈向共同富裕，荣膺全国劳动模范！" }
        ],
        art: [
          { age: 25, rank: "青年美术主创", job: "传统国风壁画与电视美术创作室主任", text: "【佳作惊艳】创作的敦煌飞天主题大型画册与电视美术短片斩获全国美展金奖！" },
          { age: 31, rank: "知名影视总监制", job: "大型东方历史文化纪录片与动画总导演", text: "【银幕经典】执导的中华历史文化视听巨制轰动全国荧屏，揽获多项国家级大奖！" },
          { age: 39, rank: "东方美学传媒董事长", job: "非遗文化全产业链传媒集团董事长", text: "【文化航母】主持故宫与敦煌非遗数字典藏工程，成为文化产业领军企业！" },
          { age: 47, rank: "国家文化出海总顾问", job: "东方美学全球数字巡展总策展人", text: "【文化远播】卢浮宫与大英博物馆东方美学特展引爆全球排队热潮！" },
          { age: 55, rank: "世界级文化艺术宗师", job: "联合国东方艺术终身成就奖大师", text: "【文脉流芳】以毕生心血筑牢中华文化软实力，当选世界级艺术宗师！" }
        ],
        law: [
          { age: 26, rank: "诉讼部金牌骨干", job: "知名大所知识产权与涉外诉讼合伙人", text: "【初试锋芒】代理首例小家电反倾销海外诉讼全胜，名震华南律政圈！" },
          { age: 33, rank: "破产重组首席律师", job: "百亿上市制造企业重整特聘破产管理人", text: "【挽救实业】化解三百亿债务危机成功重组龙头制造，保住五千职工岗位！" },
          { age: 40, rank: "红圈律所管委会主任", job: "全国顶尖综合法律事务所掌门人", text: "【律政统帅】当选红圈所主任，带领中国律师团队深度参与国际商事博弈！" },
          { age: 48, rank: "国际商事仲裁专家", job: "国际商事仲裁院首位中国特聘资深仲裁员", text: "【公义之剑】在国际仲裁法庭为中国新能源产业赢得里程碑式正义裁决！" },
          { age: 56, rank: "德高望重法治名宿", job: "法学泰斗 · 推动国家公平正义立法先驱", text: "【正义天平】推动多部国家重磅商事合规与劳动法典修订，功勋垂世！" }
        ],
        gov: [
          { age: 25, rank: "政务科员骨干", job: "市便民审批改革专班主办科员", text: "【勤政破冰】牵头梳理并联审批清单，推行一窗通办赢得群众广泛赞誉！" },
          { age: 33, rank: "实干正科处长", job: "重点民生与棚改工程督办处处长", text: "【为民安居】阳光推进数万户老工矿棚户区改造，实现零违纪与百日圆满回迁！" },
          { age: 41, rank: "主政一方县区长", job: "国家高新产业与生态示范县县长", text: "【造福一方】统筹县域硬科技产业引育与绿水青山保护，综合考评跃居全省第一！" },
          { age: 49, rank: "省市统筹主官", job: "区域高质量协同发展管委会主任", text: "【大局擘画】打通跨区域数字政务与民生保障一体化，成为全国现代治理标杆！" },
          { age: 56, rank: "清正封疆表率", job: "国家现代化治理与民生建设功勋模范", text: "【政声流芳】三十余载两袖清风、勤政爱民，治政经验载入国家改革发展典型史册！" }
        ],
        trade: [
          { age: 25, rank: "外贸开拓先锋", job: "特区机电进出口联营部经理", text: "【扬帆首航】在广交会打响自主机电品牌第一枪，开辟欧洲与东南亚直航航线！" },
          { age: 33, rank: "跨国商社掌舵", job: "远洋供应链与海外仓网集团总经理", text: "【逆风破浪】汇改大考中果断完成自主品牌升级，建立覆盖五大洲的营销网络！" },
          { age: 41, rank: "丝路商贸领袖", job: "中欧班列与数字丝路跨境枢纽董事长", text: "【货通天下】贯通欧亚十大智能保税海外仓，助推上万家中国智造企业抱团出海！" },
          { age: 49, rank: "全球经贸理事长", job: "跨国数字贸易与本币结算联盟主席", text: "【规则领航】牵头多国商社确立跨境数字提单与本币直连清算机制，享誉国际商界！" },
          { age: 56, rank: "五洲商道巨擘", job: "世界丝路商贸终身成就领航家", text: "【海纳百川】一生架设中外经贸合作金桥，成为畅通双循环的时代商业传奇！" }
        ],
        grassroots: [
          { age: 25, rank: "驻村选调骨干", job: "偏远山区脱贫攻坚驻村工作队长", text: "【泥腿初心】带领乡亲绝壁凿路、引水进村，彻底结束深山村落不通公路的历史！" },
          { age: 33, rank: "乡镇致富带头人", job: "生态示范镇党委书记兼合作社总指导", text: "【三变富民】推动荒山林权入股与阳光村务监督，实现村集体分红连续三年翻番！" },
          { age: 41, rank: "县域振兴标兵", job: "全国百佳基层治理与共富示范区带头人", text: "【安居乐业】打造易地搬迁共富工坊与小院议事厅，全镇二十年零信访、户户有产业！" },
          { age: 49, rank: "百村共富总顾问", job: "城乡融合与千万工程示范片区总协调人", text: "【绿富同兴】串联百村建成现代生态共富走廊，吸引万名青年创客返乡兴业！" },
          { age: 56, rank: "万民福泽楷模", job: "全国时代楷模 · 人民满意的基层功臣", text: "【大地丰碑】把半生汗水挥洒在广袤乡土，金杯银杯化作老百姓世代传颂的口碑！" }
        ],
        education: [
          { age: 25, rank: "杏坛青年讲师", job: "重点中学与高校拔尖创新班班主任", text: "【春风化雨】雨夜家访留住寒门英才，首届创新实验班全员考入顶尖学府！" },
          { age: 33, rank: "学科带头教授", job: "国家级精品课程与通识教改首席教授", text: "【启发新知】破除唯分数论，主编的数理与工程思维通识教材惠及百万青年学子！" },
          { age: 41, rank: "未来技术院长", job: "国家产教融合未来技术学院创院院长", text: "【科教报国】打通大学实验室与大国重器车间，带领师生攻克多项核心技术壁垒！" },
          { age: 49, rank: "名校掌舵校长", job: "双一流高等学府校长兼学术委员会主任", text: "【大师云集】建立长周期潜心问道学术特区，门下涌现大批青年科学家与大国总师！" },
          { age: 56, rank: "人民教育家泰斗", job: "百世师表 · 国家最高教育荣誉功勋得主", text: "【桃李天下】半世纪烛照山河，三千弟子遍布家国栋梁之林，师道清辉百世流芳！" }
        ]
      };


// 时代头版特刊数据库 (1992-2045重大历史关口)
const EPOCH_NEWSPAPER_HEADLINES = {
  1992: {
    year: 1992,
    date: '1992年春·特刊',
    paper: '时代观察报 · 改革先声',
    headline: '南巡谈话振聋发聩：市场经济大幕全面拉开！',
    sub: '“特区姓‘社’不姓‘资’！发展才是硬道理！”海内外掀起空前投资下海热潮。',
    comment: '历史将永远铭记这一刻。一个浩浩荡荡的民营实业与现代工商业黄金时代由此破茧启程。'
  },
  1997: {
    year: 1997,
    date: '1997年7月1日·历史时刻',
    paper: '国家晨报 · 世纪回归',
    headline: '一国两制历史丰碑：香港今晨顺利重回祖国怀抱！',
    sub: '五星红旗与紫荆花区旗升起，百年沧桑洗雪，东方之珠翻开繁荣崭新篇章。',
    comment: '香港回归标志着现代国家治理体系与全球金融桥梁的空前成熟，国际化大舞台正式开启。'
  },
  1998: {
    year: 1998,
    date: '1998年盛夏·紧急号外',
    paper: '国防与建设报 · 特刊',
    headline: '万众一心众志成城：全国军民誓死坚守长江千里生命大堤！',
    sub: '百年不遇特大洪峰过境，数十万抗洪官兵以血肉之躯筑牢铜墙铁壁，保卫千万人民财产。',
    comment: '沧海横流方显英雄本色！中华民族在特大灾难面前展现出排山倒海的凝聚力与向心力。'
  },
  2001: {
    year: 2001,
    date: '2001年冬·重磅快讯',
    paper: '经贸导报 · 走向世界',
    headline: '历经十五载风雨谈判：中国今夜正式敲响加入世贸组织大门！',
    sub: '全球最大新兴市场全面对接世界规则，“中国制造”开启横扫五洲四海超级征程。',
    comment: '入世不仅是关税与配额的开放，更是整个国家产业链、标准体系与现代治理能力的世纪大考。'
  },
  2008: {
    year: 2008,
    date: '2008年8月8日·盛世华章',
    paper: '环球时报 · 世纪盛会',
    headline: '同一个世界，同一个梦想！第29届北京奥运会今晚盛大启幕！',
    sub: '鸟巢之夜惊艳全球，无与伦比的东方美学与大国自信向世界展现跨越世纪的卓越答卷。',
    comment: '多难兴邦，大考铸魂。从汶川震后坚毅重生到奥运盛典高朋满座，大国雄浑气魄不可阻挡。'
  },
  2015: {
    year: 2015,
    date: '2015年金秋·产业特刊',
    paper: '科创先锋报 · 时代潮头',
    headline: '大众创业万众创新浪潮澎湃：硬科技与数字经济领跑时代风口！',
    sub: '互联网+、高端智能装备与创新工坊遍地开花，青年创客成为驱动中国经济新引擎。',
    comment: '告别廉价代工，走向自主研发与品牌立国，中国制造正式开启向“中国智造”的惊险一跃。'
  },
  2020: {
    year: 2020,
    date: '2020年春·抗击战役号外',
    paper: '人民日报 · 生命至上',
    headline: '举国同心生命至上：十四亿人民共克时艰打响卫生阻击战！',
    sub: '白衣执甲逆行出征，雷神山火神山十日拔地而起，中国供应链成为全球维系运转唯一压舱石。',
    comment: '惊涛骇浪见底色！无可比拟的组织动员力与制造韧性，再次向世界展示了制度与人民的伟大力量。'
  },
  2023: {
    year: 2023,
    date: '2023年春·远景特辑',
    paper: '新质生产力周刊 · 战略前瞻',
    headline: '高水平科技自立自强：新质生产力澎湃领航中国式现代化新航程！',
    sub: '人工智能、新能源车与大飞机破浪前行，打破卡脖子桎梏，向着制造强国巅峰发起历史冲刺！',
    comment: '三十八年激荡岁月，一代代实干家逢山开路、遇水架桥，历史的接力棒已稳稳交到你的手中！'
  },
  2028: {
    year: 2028,
    date: '2028年金秋·强国号外',
    paper: '时代重器报 · 全球领航',
    headline: '零碳算力网与工业母机全线告捷：中国标准成为全球产业新航标！',
    sub: '具身智能车间与绿色风光储氢大基地全面贯通，自主创新成果惠及五洲四海。',
    comment: '从追赶者到领跑者，数十年埋头苦干结出硕果，大国工匠与科学家共同挺起时代脊梁！'
  },
  2035: {
    year: 2035,
    date: '2035年春·世纪盛典',
    paper: '国家现代化公报 · 宏图大成',
    headline: '基本实现社会主义现代化远景目标达成：神州大地绘就共富新画卷！',
    sub: '城乡公共服务全面均等化，科技、教育、医疗与生态治理迈入世界顶尖行列。',
    comment: '这是亿万建设者用半生心血浇灌出的伟大时代，每一滴汗水都已镌刻进共和国的璀璨年轮！'
  },
  2045: {
    year: 2045,
    date: '2045年金秋·盛世回眸',
    paper: '百年风华报 · 时代记忆',
    headline: '山河锦绣万家安康：致敬跨越半世纪的大国履职实干家！',
    sub: '清洁能源点亮万家灯火，银龄智慧社会温暖从容，新一代青年接过强国火炬。',
    comment: '回首平生萧瑟处，归去，也无风雨也无晴。你们走过的路，已化作后人脚下最坚实的康庄大道！'
  }
};


// ==========================================
// 五.B 存档/续接、岁月相册与四时节庆岁律系统
// ==========================================

// 1. 全自动本地/云端持久化存储引擎 (V5 独立存档 Key 升级与 V3/V2 跨版本平滑迁移)
const SAVE_STORAGE_KEY = 'life_sim_grand_masterpiece_save_v4';

module.exports = {
  MOMENTS_DATABASE,
  ACHIEVEMENTS_LIST,
  TRACK_MILESTONES,
  EPOCH_NEWSPAPER_HEADLINES
};
