// 充满时代烙印的童年事件库 (Childhood Events by Birth Era)
// 适配 1952、1962、1972、1982 四大多纪元出生年代，彻底消除年份与年龄脱节的历史穿越问题

const SHARED_CHILDHOOD_BASE = [
  {
    age: 3,
    title: "🍶 打碎暖水瓶的惶恐",
    desc: "三岁那年，你在红砖家属院的厨房玩耍，不小心撞倒了家里唯一的牡丹花印铁皮暖水瓶，开水与玻璃胆碎了一地。这在当年是一笔不菲的家庭财产：",
    choices: [
      {
        text: "含泪向赶来的父母坦白认错",
        outcome: "父亲虽然心疼好几块钱，但见你诚实，摸了摸你的头说：‘打碎了算咱的，人没烫着就好，要做个诚实的孩子。’",
        effects: { clean: 15, courage: 8, eq: 5 },
        seed: { id: 'child_honest', title: '坦荡诚笃', desc: '自幼不欺暗室，面对过错敢于挺身担责。' }
      },
      {
        text: "悄悄把碎玻璃踢进床底，栽赃给隔壁大花猫",
        outcome: "父母以为是野猫翻窗，虽然逃过了一顿责打，但你看着床底的碎玻璃，心里生平第一次尝到了良心不安的滋味。",
        effects: { eq: 10, clean: -10, iq: 5 },
        seed: { id: 'child_cunning', title: '市井机心', desc: '自幼懂得趋利避害，但心中常留戒尺。' }
      },
      {
        text: "吓得赶紧退后避开滚水，跑出屋大声喊母亲过来处理",
        outcome: "母亲闻声赶来收拾了碎胆，见你懂得避险没有烫伤小手，长舒一口气，边清理边教你做事要稳重留神。",
        effects: { courage: 15, iq: 8, rep: 10 },
        seed: { id: 'child_grit', title: '临危知止', desc: '遇突发险情懂得避险求援，自幼行事稳妥有度。' }
      }
    ]
  },
  {
    age: 5,
    title: "🍬 供销社水果糖失窃疑云",
    desc: "大杂院里几个小伙伴在供销社柜台边嬉闹，售货员阿姨发现一包紧俏的高粱饴软糖不见了，厉声质问。其实是你的发小偷偷揣进了棉袄口袋：",
    choices: [
      {
        text: "站出来替发小顶包：‘是我拿的，阿姨您罚我吧！’",
        outcome: "你挨了父亲一顿皮带抽，屁股肿了三天。但当晚发小哭着把那包糖塞给你，发誓这辈子都认你做生死兄弟！",
        effects: { courage: 20, rep: 15, health: -8 },
        seed: { id: 'child_shield_friend', title: '两肋插刀', desc: '幼年敢于替兄弟受过，结下一生莫逆死契。' }
      },
      {
        text: "悄悄拉发小到墙角，劝他主动把糖放回柜台并道歉",
        outcome: "发小满脸通红地退还了软糖，售货员见孩子主动认错并未深究，还奖了你们一人一颗水果糖糖纸。兼顾了道义与智慧。",
        effects: { eq: 18, clean: 15, iq: 10 },
        seed: { id: 'child_moral_guide', title: '循循善诱', desc: '自幼明辨是非且懂变通，善于化干戈为玉帛。' }
      },
      {
        text: "假装什么都没看见，拉开距离置身事外",
        outcome: "你冷静地避开了风波。虽然保全了自己，但在院子里看着发小被父母拧着耳朵拉走，你初次体会到了人情世态的冰冷界限。",
        effects: { iq: 12, clean: 5, eq: -8 },
        seed: { id: 'child_detached', title: '审慎自保', desc: '冷眼旁观局势，不轻易卷入是非漩涡。' }
      }
    ]
  },
  {
    age: 7,
    title: "🎒 跨入校门与第一批红领巾竞选",
    desc: "背上母亲缝制的粗帆布军绿书包，你正式踏入小学。班主任宣布全班只有前五名品学兼优的孩子能在国庆节第一批佩戴红领巾：",
    choices: [
      {
        text: "踊跃举手登台，声情并茂发表竞选演说",
        outcome: "你站在讲台上声音清澈响亮，博得满堂掌声，毫无悬念全票当选少先队第一批大队长！红领巾在胸前飘扬。",
        effects: { rep: 25, courage: 15, eq: 10 },
        seed: { id: 'child_leader', title: '领袖气象', desc: '自幼敢为人先，享受聚光灯与群众信任。' }
      },
      {
        text: "默默在课桌上把每门功课考出满分，以扎实成绩说话",
        outcome: "期中测验数学语文双百分！黑板报上张贴着你的字迹。老师将最鲜红的一条红领巾郑重系在你的颈间。",
        effects: { iq: 25, clean: 15, courage: 5 },
        seed: { id: 'child_scholar', title: '笃实苦学', desc: '不尚空谈，以无可挑剔的真才实学立足天地。' }
      },
      {
        text: "把名额主动让给家境贫寒、自卑胆怯的同桌",
        outcome: "同桌激动得泪如泉涌，全班同学和老师都被你的宽广胸襟深深打动。虽然晚了半个学期入队，但你赢得了所有人无条件的敬重。",
        effects: { rep: 30, eq: 25, clean: 10 },
        seed: { id: 'child_generous', title: '仁者爱人', desc: '先人后己，心怀慈悲，极具崇高人格魅力。' }
      }
    ]
  },
  {
    age: 10,
    title: "🥊 弄堂拐角的恶霸与饭票之争",
    desc: "放学路过煤渣胡同，几个留着分头的高年级小混混堵住了去路，手里把玩着自制弹簧刀，勒索你们交出下周的全国通用粮票与午餐钱：",
    choices: [
      {
        text: "抓起路边的半截红砖头，红着眼拼死反抗！",
        outcome: "你如同一头小豹子般不要命地扑上去，虽被打得嘴角渗血、棉袄扯破，但也把带头的恶霸拍得头破血流仓皇逃窜！从此大院没人敢惹你。",
        effects: { courage: 25, health: -10, rep: 15 },
        seed: { id: 'child_fierce', title: '铁骨不屈', desc: '遇强则更强，宁为玉碎不为瓦全的铁血狠劲。' }
      },
      {
        text: "大声呼喊‘保卫科王叔叔巡逻过来了！’借机拉发小狂奔脱险",
        outcome: "混混们做贼心虚四散而逃。你们俩一路狂奔到派出所门口，瘫在马路牙子上相视哈哈大笑，成功以智取胜！",
        effects: { iq: 20, eq: 15, health: 5 },
        seed: { id: 'child_clever_escape', title: '机警过人', desc: '绝不盲目硬拼，善借外势与环境化险为夷。' }
      },
      {
        text: "冷静谈判：交出一半零钱，换取对方不再骚扰同班同学",
        outcome: "你面不改色地与混混头子立下规矩，以极小的代价保全了大院同学的安全。你展现出远超同龄人的隐忍与契约周旋手腕。",
        effects: { eq: 25, iq: 15, courage: 10 },
        seed: { id: 'child_negotiator', title: '纵横周旋', desc: '懂得在劣势中妥协与置换，极具外交斡旋天赋。' }
      }
    ]
  },
  {
    age: 15,
    title: "🧭 时代抉择 · 十五岁人生大分流十字路口",
    desc: "初三毕业，面对走向社会最关键的人生分水岭：千家万户各奔前程，你选择哪一条时代之路？",
    choices: [
      {
        text: "【书香寒窗】报考重点高中，立志求索科学真理与文化复兴！",
        statReq: 'iq', reqVal: 35,
        outcome: "父母倾力支持，你考入省重点尖子班！挑灯苦读数理化与文史经典，立志在考场与科研上闯出广阔天地！",
        effects: { iq: 3, rep: 2, resilience: 1, health: -1 },
        youthPath: 'gaokao',
        seed: { id: 'path_gaokao', title: '寒窗苦读', desc: '以笔为剑，走学术科研、政法杏坛与大国总师之路。' }
      },
      {
        text: "【匠造之苗】报考国家统招工业技校，苦练车间一线精密绝活！",
        statReq: 'courage', reqVal: 35,
        outcome: "免学费发粮票的技校录取通知书送到家门！在实训车间跟八级老师傅学磨刀走刀，练就大国工匠底气！",
        effects: { courage: 3, iq: 2, clean: 1, eq: -1 },
        youthPath: 'vocational',
        seed: { id: 'path_vocational', title: '精工巧匠', desc: '车间淬火，走高精机床、特等技师与大国工匠技能路线。' }
      },
      {
        text: "【热血从戎】报名参军入伍，到国家重大工程先锋部队淬火锻炼！",
        statReq: 'resilience', reqVal: 35,
        outcome: "体检合格戴上大红花！换上挺括军装登上军列，加入穿山架桥工程先锋连队，锤炼钢铁意志！",
        effects: { courage: 3, resilience: 2, health: 1, iq: -1 },
        youthPath: 'military',
        seed: { id: 'path_military', title: '铁血硬骨', desc: '铁纪如山，走重大工程突击队与国防攻坚先锋路线。' }
      },
      {
        text: "【实业闯荡】奔赴工商业重镇与集市，在商海浪潮中学做生意！",
        statReq: 'eq', reqVal: 35,
        outcome: "揣着全家凑出的盘缠登上绿皮火车！在热闹的批发货场和口岸码头，你敏锐嗅到了时代破浪的气息！",
        effects: { eq: 3, courage: 2, rep: 1, clean: -1 },
        youthPath: 'commerce',
        seed: { id: 'path_commerce', title: '商海破浪', desc: '敢为人先，走民营实业与商贸物流先锋路线。' }
      },
      {
        text: "【深耕厚土】考入地区农林专科与乡土试验站，立志扎根基层沃野！",
        statReq: 'clean', reqVal: 35,
        outcome: "卷起裤腿踩进试验田泥浆里拜老农艺师为师，培育良种、服务十里八乡，把青春写在大地上！",
        effects: { clean: 3, resilience: 2, rep: 1, courage: -1 },
        youthPath: 'agri',
        seed: { id: 'path_agri', title: '沃土神农', desc: '躬耕陇亩，走超级良种、治沙生态与基层治理先锋路线。' }
      }
    ]
  }
];

// 各出生年代专属历史童年事件 (Historical Childhood Events by Era)
const ERA_HISTORICAL_CHILDHOOD = {
  // 100 华夏世家大系 · 第一赛季：汉魏风骨 (东汉永元十二年~三国魏晋)
  100: [
    {
      age: 3,
      year: 103,
      title: "🏛️ 坞壁观耕与庭训启蒙",
      desc: "东汉和帝永元末年，你三岁时站在高耸的坞壁望楼前，俯瞰宗族部曲与僮仆修筑坞堡、扶犁春耕。宗族长辈抚摸你的头顶，指向远处官道，传授先祖立身古训：",
      choices: [
        {
          text: "伏案静听长辈诵读《尔雅》，手握木牍不舍放开",
          outcome: "长辈见你天生喜好典籍，大喜过望：‘我宗族文脉有传人矣！’",
          effects: { iq: 12, clean: 10, eq: 5 },
          seed: { id: 'child_hw_classics', title: '笃志经学', desc: '自幼喜好经典文墨，深具书香文脉慧根。' }
        },
        {
          text: "奔向望楼城垛，抓起守卫部曲丢下的木剑挥舞有声",
          outcome: "武威凛然，坞壁部曲统领抚掌大笑：‘真乃将门虎子！’",
          effects: { courage: 15, health: 8, rep: 6 },
          seed: { id: 'child_hw_martial', title: '武备干城', desc: '筋骨强健，骨子里流淌着卫族安邦的豪迈胆魄。' }
        },
        {
          text: "蹲在仓廪旁清点入库的麦斛与五铢钱串，丝毫不乱",
          outcome: "三岁便通筹算之术，仓曹执事连连称奇，称你‘天生商度算才’！",
          effects: { iq: 10, capital: 300, eq: 6 },
          seed: { id: 'child_hw_commerce', title: '算筹自明', desc: '精于物料统筹与钱粮度支，行事条理分明。' }
        }
      ]
    },
    {
      age: 5,
      year: 105,
      title: "🖌️ 坞塾木觚与临池墨戏",
      desc: "五岁之年，族中开席设私塾。塾师为你削好木觚（木简），备好漆盘与墨石，命你初试描摹《急就篇》。你初次执笔蘸墨，面对宗族同辈：",
      choices: [
        {
          text: "屏息凝神，一笔一划工工整整写毕二十字，受塾师大赞",
          outcome: "字迹严整骨力初现，塾师夸赞你‘心性沉着，他日必成经纬名笔！’",
          effects: { clean: 15, iq: 10, eq: 6 },
          seed: { id: 'child_hw_calligraphy', title: '笔力遒劲', desc: '沉心静气，自幼写得一手遒美汉隶。' }
        },
        {
          text: "写完字后将池水研黑，邀同族兄弟共读先贤名句",
          outcome: "豪气干云，深得同辈爱戴，早早确立了宗族少年魁首威望！",
          effects: { eq: 16, rep: 12, courage: 8 },
          seed: { id: 'child_hw_fellowship', title: '倾盖如故', desc: '重情尚义，自幼富有号召族众的领袖器宇。' }
        },
        {
          text: "见同桌寒门门生无笔，将自己的备用木觚与墨石相赠",
          outcome: "轻财重义，门生感激涕零，结下日后死生相托的同窗义契！",
          effects: { clean: 18, eq: 14, rep: 10 },
          seed: { id: 'child_hw_generous', title: '轻财重义', desc: '仁厚待人，极具古仁人之风，天下莫不景仰。' }
        }
      ]
    },
    {
      age: 6,
      year: 106,
      title: "📖 束脩开蒙 · 入塾受业五经",
      desc: "六岁发蒙，你头戴缁布小冠，手捧芹藻与干肉，向当世大儒行束脩大礼。师尊端坐讲席之上，考问你求学治世之本心：",
      choices: [
        {
          text: "“明习《春秋》，通达古今治乱之机，辅国安邦！”",
          outcome: "大儒抚须称善：‘有匡扶天下之宏愿，大善！’当场收为关门门生！",
          effects: { iq: 15, rep: 12, clean: 8 },
          seed: { id: 'child_hw_statesman', title: '春秋大义', desc: '明是非、通治乱，胸怀天下苍生社稷。' }
        },
        {
          text: "“修身齐家，筑坚坞聚族众，保宗室世代周全！”",
          outcome: "讲求经世致用，族中长辈无不颔首：‘此子知根本，乃世家砥柱！’",
          effects: { resilience: 14, courage: 12, rep: 10 },
          seed: { id: 'child_hw_clan_pillar', title: '世家砥柱', desc: '重宗睦族，善聚族人向心力，庇佑一门周全。' }
        },
        {
          text: "“通晓《神农本草》与天文历算，普济天下黎庶疾苦！”",
          outcome: "大儒赞叹：‘仁心博施，济世活人，亦圣人之道也！’",
          effects: { clean: 15, iq: 12, health: 10 },
          seed: { id: 'child_hw_healer_mind', title: '大医仁心', desc: '怀抱博济群生之心，深得四方乡党爱戴。' }
        }
      ]
    },
    {
      age: 7,
      year: 107,
      title: "📜 洛阳书肆抄简与古文经籍",
      desc: "七岁那年，商帮从京都洛阳运回珍贵古文竹简抄本。族中置于中堂，召全族后辈观瞻。面对繁复的先秦古籀文字：",
      choices: [
        {
          text: "挑灯夜战逐字对照家藏竹简校勘异同，发现两处抄录讹误",
          outcome: "考据精严名动乡里，郡中名儒闻之特赠汉代铜笔筒以示奖掖！",
          effects: { iq: 18, clean: 12, rep: 10 },
          seed: { id: 'child_hw_philologist', title: '金石校勘', desc: '治学谨严，辨章学术考镜源流，罕有脱漏。' }
        },
        {
          text: "向往洛阳太学三万士子讲经盛况，立誓他日赴京求学",
          outcome: "壮志凌云，笃志于学，博览群籍进度一日千里！",
          effects: { courage: 14, iq: 14, rep: 10 },
          seed: { id: 'child_hw_taixue_dream', title: '太学宏愿', desc: '志在青云，一心跻身天下经林最高学府。' }
        },
        {
          text: "将抄录的经义摘句用隶书抄成木简，分送坞堡少年习读",
          outcome: "有教无类，宗族子弟无不争相诵读，门风蒸蒸日上！",
          effects: { eq: 16, rep: 15, clean: 10 },
          seed: { id: 'child_hw_pedagogue', title: '启蒙师表', desc: '循循善诱，善于传道授业、提携宗族后生。' }
        }
      ]
    },
    {
      age: 10,
      year: 110,
      title: "⚔️ 少年立志 · 坞壁夜巡与名宿投宿",
      desc: "十岁立志之年，天下渐有饥谨风波，关东有游侠名士夜宿坞壁避雨，亦有流寇斥候在坞堡外窥探。月黑风高之夜，你站在烽燧台前立下志向：",
      choices: [
        {
          text: "立志经学冠冕：博考三礼，将来登太学、入台阁匡扶汉祚！",
          outcome: "声若洪钟，宿儒击节赞叹，当场赠你古琴琴谱，许下通家之好！",
          effects: { rep: 20, iq: 15, clean: 12 },
          seed: { id: 'child_hw_minister_will', title: '相才自许', desc: '经纶满腹，自幼以社稷重臣自期。' }
        },
        {
          text: "立志将门用兵：研习孙吴兵书，整饬部曲护卫桑梓宗亲！",
          outcome: "挽弓习射穿杨破靶，部曲甲士齐声喝彩，将帅英气勃发！",
          effects: { courage: 20, health: 12, resilience: 12 },
          seed: { id: 'child_hw_general_will', title: '拔山英魄', desc: '善抚士卒，治军森严，有万夫不当之勇。' }
        },
        {
          text: "立志货殖经世：通南北商路，积粟千万石，让全族老幼丰足！",
          outcome: "族中长辈赠予一柄汉代算筹，命你协管宗族盐铁流水账簿！",
          effects: { capital: 1000, eq: 15, iq: 12 },
          seed: { id: 'child_hw_tycoon_will', title: '经商济众', desc: '深谙通商惠工之道，善于化无为有、聚财利民。' }
        }
      ]
    },
    {
      age: 12,
      year: 112,
      title: "🐎 辞亲远游 · 负笈寻师黄河古渡",
      desc: "十二岁，宗族为你备齐良马与盘缠，允你远赴郡城游学。行至黄河古渡，渡口滞留了数百逃避河决水患的流民与落魄生员：",
      choices: [
        {
          text: "设席渡口义诊施粥，将半数盘缠分赠寒门落难同窗",
          outcome: "名声震动州郡！刺史闻之遣吏致意，称你‘颍川小孟尝’！",
          effects: { rep: 25, clean: 20, capital: -400 },
          seed: { id: 'child_hw_philanthropist', title: '孟尝遗风', desc: '赈济贫寒，好义轻利，四海皆知贤名。' }
        },
        {
          text: "登船与北上名士论战《今古文尚书》，舌战群儒力拔头筹",
          outcome: "论点精辟无懈可击，船中硕儒皆叹为后生可畏！",
          effects: { iq: 22, rep: 20, courage: 10 },
          seed: { id: 'child_hw_rhetorician', title: '舌战群儒', desc: '辩才无碍，机锋敏捷，在经筵辩难中所向披靡。' }
        },
        {
          text: "结交渡口操舟豪客与押运粮商，摸清南北关津盐铁商道",
          outcome: "结下三山五岳人脉，摸透沿途水陆关税与物产差价门道！",
          effects: { eq: 22, capital: 800, courage: 12 },
          seed: { id: 'child_hw_trader_nexus', title: '关津通衢', desc: '广结江湖舟车各路朋友，商路无往不利。' }
        }
      ]
    },
    {
      age: 15,
      year: 115,
      title: "冠 束发志学 · 汉魏宗族分流大抉择",
      desc: "十五束发！宗族在祖祠为你举行束发礼，族老奉上宗谱长卷。此时东汉门阀初具雏形，面对即将到来的弱冠之年，你立誓定下终身进取之路：",
      choices: [
        {
          text: "笃志经史入仕：准备州郡察举孝廉，入洛阳台省出仕经邦",
          outcome: "宗族决定倾力供给太学研读费用，为你铺平察举通途！",
          effects: { iq: 25, rep: 20, clean: 15 },
          youthPath: "scholar"
        },
        {
          text: "披甲统领部曲：训练坞壁弓弩护卫，防范边关烽火与盗寇",
          outcome: "宗族授予你百人部曲符印，正式接管坞壁防御大权！",
          effects: { courage: 25, resilience: 20, health: 15 },
          youthPath: "military"
        },
        {
          text: "掌理宗族产业：接管族内盐铁炉坊与良田仓廪，货殖九州",
          outcome: "掌管全族度支大印，流水钱粮皆经你手调配，财运亨通！",
          effects: { capital: 2500, eq: 20, iq: 15 },
          youthPath: "commerce"
        },
        {
          text: "杏林悬壶济世：精研伤寒杂病经方，行医乡野救死扶伤",
          outcome: "深研医理，救治乡民无数，四方百姓无不焚香祝祷！",
          effects: { clean: 25, health: 15, eq: 15 },
          youthPath: "med"
        }
      ]
    },
    {
      age: 17,
      year: 117,
      title: "📜 汝南月旦评 · 名动州郡天下传",
      desc: "十七岁，天下名士在汝南品评当代英杰，每逢月初品评一人，称『月旦评』，凡得名题者名动公卿！你受邀赴会受评：",
      choices: [
        {
          text: "呈递所著《平准均输与民生策》，阐发安邦经世之方",
          outcome: "主评名士大惊失色，评你为‘清平之经略，乱世之干臣！’声名四海喧腾！",
          effects: { rep: 35, clean: 25, iq: 20 },
          seed: { id: 'child_hw_moon_appraisal', title: '月旦名士', desc: '得天下名士金口题评，州郡察举必登首选。' }
        },
        {
          text: "登台抚汉琴《广陵散》，神态萧散，谈吐高远超拔流俗",
          outcome: "名士叹服：‘岩岩若孤松之独立，高洁不群，真名士风流也！’",
          effects: { rep: 30, eq: 25, resilience: 20 },
          seed: { id: 'child_hw_hermit_spirit', title: '竹林高格', desc: '旷达超迈，不染尘俗，深得天下清流尊崇。' }
        },
        {
          text: "慷慨陈词论天下兵家大势，指出关东州郡虚实防务，四座皆惊",
          outcome: "州刺史击节叹赏：‘真有韩白之谋，当为万人之将！’",
          effects: { courage: 30, rep: 25, iq: 20 },
          seed: { id: 'child_hw_strategist', title: '算无遗策', desc: '胸罗甲兵，深明地利天时，极具将帅大局之谋。' }
        }
      ]
    }
  ],
  // 1952 建国开拓一代 (童年 1952~1969)
  1952: [
    {
      age: 4,
      year: 1956,
      title: "🏭 1956 公私合营与大院广播喇叭",
      desc: "1956年秋，街道商铺挂起大红横幅庆祝公私合营，大院广播喇叭播放着欢快的《社会主义好》。邻居把仅有的一块水果硬糖递给四岁的你：",
      choices: [
        {
          text: "懂事地把硬糖掰成两半，分给怀里抱着的小堂弟",
          outcome: "全院大人交口称赞：‘这孩子打小就有大公无私的长兄风范！’",
          effects: { rep: 25, courage: 15, clean: 10 },
          seed: { id: 'child_52_brotherly', title: '友爱谦逊', desc: '幼年经历集体化互助大潮，自幼深谙先人后己。' }
        },
        {
          text: "仰头好奇地盯着电线杆上的铁皮大喇叭，研究声音从哪儿来",
          outcome: "父亲笑着向你解释无线电广播与电磁原理，工业科学的萌芽悄悄种下。",
          effects: { iq: 20, courage: 10, eq: 8 },
          seed: { id: 'child_52_radio_curious', title: '求知若渴', desc: '对工业与机械有天生的探索欲望。' }
        },
        {
          text: "跑去帮街道大妈擦拭宣传栏上的红旗标语",
          outcome: "大妈奖励你一朵小红花，夸你是街坊里最热心的小红领巾接班人。",
          effects: { eq: 22, clean: 18, rep: 15 },
          seed: { id: 'child_52_helpful', title: '热忱奉公', desc: '自幼乐于助人，深得街坊邻里疼爱。' }
        }
      ]
    },
    {
      age: 8,
      year: 1960,
      title: "🍲 1960 粮票岁月与大杂院百家饭",
      desc: "1960年，粮票与副食供应紧张，大杂院里家家户户精打细算。傍晚邻居家熬了一锅热腾腾的红薯面糊糊，端了一碗到你家门口：",
      choices: [
        {
          text: "坚持要把自留地里刚摘的两根顶花带刺小黄瓜回赠隔壁",
          outcome: "礼尚往来，真情暖心。两家在困难年代结下了同甘共苦的深厚情谊。",
          effects: { clean: 20, eq: 15, health: 5 },
          seed: { id: 'child_52_solidarity', title: '风雨守望', desc: '经历艰苦岁月磨砺，深知患难与共之贵。' }
        },
        {
          text: "主动帮院里孤寡老人挑水劈柴，换取工分补贴家用",
          outcome: "瘦小肩膀挑起水桶，街坊都敬佩你的懂事与坚韧骨气。",
          effects: { courage: 20, rep: 20, eq: 10 },
          seed: { id: 'child_52_dutiful_hardwork', title: '铁骨担当', desc: '自幼不畏劳苦，能担千钧重担。' }
        },
        {
          text: "在油灯下用废作业本抄写精打细算的家庭账本",
          outcome: "小小年纪学会规划算度，养成了极度严谨的数理思维。",
          effects: { iq: 25, courage: 10, capital: 20 },
          seed: { id: 'child_52_ledger_mind', title: '明察秋毫', desc: '自幼精于筹算，行事谨小慎微。' }
        }
      ]
    },
    {
      age: 12,
      year: 1964,
      title: "🚀 1964 第一颗原子弹号外传遍街巷",
      desc: "1964年金秋，街头报童高呼‘特大号外！我国第一颗原子弹试验成功！’大院红旗招展，街坊锣鼓喧天，少年的你热血澎湃：",
      choices: [
        {
          text: "掏出积攒两年的零花钱买下号外报纸，贴在床头立志科技报国",
          outcome: "大国脊梁自此铸就！你发誓要在科研与工业一线为祖国争气！",
          effects: { iq: 30, courage: 10, rep: 15 },
          seed: { id: 'child_52_nuclear_dream', title: '强国志向', desc: '胸怀大国自强梦想，以科技报国为终身信仰。' }
        },
        {
          text: "带领全班同学组织庆祝板报与游行腰鼓队",
          outcome: "板报被评为全区特等奖，展现出强大的组织号召力！",
          effects: { rep: 25, eq: 20, courage: 10 },
          seed: { id: 'child_52_mobilizer', title: '旗手风范', desc: '善于提振团队士气，极具号召魄力。' }
        },
        {
          text: "亲手用木头和马口铁削出一架火箭模型，送给边防战士慰问团",
          outcome: "战士抚摸你的头顶勉励你好好学习，坚毅军魂深深植入心田。",
          effects: { courage: 22, clean: 18, health: 8 },
          seed: { id: 'child_52_soldier_heart', title: '军魂浩荡', desc: '崇敬英雄，骨子里流淌着卫国热血。' }
        }
      ]
    },
    {
      age: 14,
      year: 1966,
      title: "🛠️ 1966 奔赴大西南：三线建设誓师与拓荒号角",
      desc: "1966年，工厂大礼堂举行三线建设动员大会，第一批拓荒者整装待发奔赴大西南崇山峻岭，开辟国家工业战略大后方。十四岁的你在台下深受震撼：",
      choices: [
        {
          text: "偷偷写下决心书塞给领队干部，申请提前报名进厂做学徒",
          outcome: "干部虽让你先完成学业，但深受感动，表扬你‘有一颗赤诚的建设者雄心’！",
          effects: { courage: 25, rep: 20, eq: 10 },
          seed: { id: 'child_52_pioneer_grit', title: '拓荒先锋', desc: '敢于奔赴祖国最需要的地方，不计个人得失。' }
        },
        {
          text: "认真借来矿山机械与地质图书，整夜伏案做读书摘记",
          outcome: "积累了扎实的工业基础功底，在同学中俨然是个‘小工程师’。",
          effects: { iq: 28, clean: 15, courage: 5 },
          seed: { id: 'child_52_engineer_spark', title: '工匠精神', desc: '笃实苦学，专心致志钻研实用技术。' }
        },
        {
          text: "在文工宣传队用笛子吹奏激昂的劳动者赞歌",
          outcome: "笛声豪迈清澈，送行车队在欢呼中驶出厂区，你的艺术共情力备受赞誉。",
          effects: { eq: 25, rep: 15, health: 10 },
          seed: { id: 'child_52_era_song', title: '时代之声', desc: '善于用文艺凝聚人心，富于感染力。' }
        }
      ]
    },
    {
      age: 17,
      year: 1969,
      title: "🚩 1969 青年突击队：支援边疆农林与水利建设",
      desc: "1969年，十七岁的你即将中学毕业。广播里传来到边疆建设兵团和农田水利一线去的号召，背包打结整齐，青春报国的道路在眼前铺开：",
      choices: [
        {
          text: "主动挑起铺盖卷报名去边疆建设兵团农场，投身农田水利与荒原开垦",
          outcome: "全校师生佩服你的奉献担当，胸前大红花格外鲜艳！",
          effects: { rep: 35, courage: 25, clean: 20 },
          seed: { id: 'child_52_broad_world', title: '广阔天地', desc: '扎根农林拓荒一线，锤炼出坚韧不拔的意志。' }
        },
        {
          text: "苦心整理几大本农业良种与水利修造笔记，准备带到田头实践",
          outcome: "有备无患！科学实干的作风让所有人刮目相看。",
          effects: { iq: 28, resilience: 20, courage: 10 },
          seed: { id: 'child_52_practical_mind', title: '实干笃行', desc: '把书本知识与泥土实践紧密结合。' }
        },
        {
          text: "利用课余在街道缝纫铺打零工，把挣来的粮票与盘缠全留给父母",
          outcome: "至纯至孝，父母含泪叮嘱你出门在外万事要稳重保重身体。",
          effects: { eq: 25, clean: 20, capital: 50 },
          seed: { id: 'child_52_filial_pillar', title: '至孝敦厚', desc: '体恤至亲疾苦，深怀担当与仁厚。' }
        }
      ]
    }
  ],

  // 1962 改革拓荒一代 (童年 1962~1979)
  1962: [
    {
      age: 4,
      year: 1966,
      title: "🎺 1966 红砖家属院的劳动号子与大食堂",
      desc: "1966年，红砖厂区家属院一片忙碌，工人们热火朝天奋战生产，公共大食堂饭香飘溢。四岁的你在大院里奔跑玩耍：",
      choices: [
        {
          text: "牵着小伙伴的手排好队，自觉把食堂木碗整齐送回水池",
          outcome: "打饭师傅笑得合不拢嘴，往你手里塞了一小块刚出锅的香脆锅巴。",
          effects: { rep: 25, courage: 15, clean: 10 },
          seed: { id: 'child_62_orderly', title: '克己守礼', desc: '自幼讲规则知礼让，深得长辈喜爱。' }
        },
        {
          text: "捡来碎砖头在水泥地上画九宫格，教胡同孩子们跳房子算数",
          outcome: "你俨然成了胡同小首领，数理思维与组织协调初显锋芒。",
          effects: { iq: 20, eq: 15, courage: 8 },
          seed: { id: 'child_62_little_boss', title: '孩子王', desc: '懂得带领团队规则游乐，极具领袖潜质。' }
        },
        {
          text: "乖乖待在机修车间窗下看父亲车削零件，半天不吵不闹",
          outcome: "父亲欣慰于你的专注定力，下班背着你大步流星回家。",
          effects: { clean: 20, health: 10, iq: 10 },
          seed: { id: 'child_62_focus', title: '沉潜定力', desc: '遇事专注宁静，自幼耐得住寂寞。' }
        }
      ]
    },
    {
      age: 8,
      year: 1970,
      title: "🛰️ 1970 仰望夜空《东方红》卫星划破苍穹",
      desc: "1970年春，大院广播通知我国第一颗人造地球卫星今晚过境！全院老少齐聚晒谷场，屏息仰望夜空，那颗划破长空的移动星光与《东方红》乐曲响彻天地：",
      choices: [
        {
          text: "举起自制纸筒‘望远镜’，目不转睛追踪星轨直至消失",
          outcome: "星辰大海的梦想从此照亮心智，你在日记里立誓‘向太空进军’！",
          effects: { iq: 25, courage: 15, rep: 15 },
          seed: { id: 'child_62_star_dream', title: '星海遐想', desc: '自幼仰望星空，胸怀大国尖端科技强盛图景。' }
        },
        {
          text: "搬来小马扎扶着年迈的邻家奶奶坐下，轻声向老人指认移动的人造卫星",
          outcome: "老人感动得直抹眼泪，夸你是懂事孝顺的贴心棉袄。",
          effects: { eq: 22, clean: 18, rep: 12 },
          seed: { id: 'child_62_gentle_care', title: '春风化雨', desc: '体恤尊长，性格温润如玉。' }
        },
        {
          text: "跟随着广播里的旋律，大声带头领唱《东方红》",
          outcome: "全院老少被你带动的热血沸腾，齐声高歌，场面壮阔！",
          effects: { rep: 28, courage: 18, eq: 10 },
          seed: { id: 'child_62_lead_voice', title: '昂扬豪气', desc: '富有大局感染力，勇立潮头敢挑大梁。' }
        }
      ]
    },
    {
      age: 12,
      year: 1974,
      title: "📻 1974 巧手组装第一台矿石收音机",
      desc: "1974年，你找来漆包线、铅笔芯、活动矿石和废旧耳机，在煤油灯下屏息缠绕线圈。当耳机里突然传来清脆的中央广播电台播音时：",
      choices: [
        {
          text: "兴奋地拉邻居家小伙伴轮流戴上耳机听新闻广播",
          outcome: "胡同里的小伙伴排着长队来你家听神奇的‘无线电’，你成了街坊里的小科学家！",
          effects: { iq: 28, rep: 20, courage: 10 },
          seed: { id: 'child_62_radio_boy', title: '极客先锋', desc: '对电子工业与现代科技拥有过人的动手改造天赋。' }
        },
        {
          text: "琢磨给邻近的盲人陈大爷专门接了一条长耳机线拉进老人房里",
          outcome: "陈大爷激动万分，直夸你手艺好心肠更热！",
          effects: { eq: 25, clean: 20, rep: 15 },
          seed: { id: 'child_62_heart_warm', title: '仁心厚泽', desc: '善用科技与手艺造福身边人，广结善缘。' }
        },
        {
          text: "拆开继续研究加装自制双联可变电容器，提高调谐精度",
          outcome: "钻研技术精益求精，培养出严谨扎实的工程直觉。",
          effects: { iq: 30, courage: 8, capital: 30 },
          seed: { id: 'child_62_precision_tinkerer', title: '格物致知', desc: '刨根问底，对机械电子原理有着本能的专注。' }
        }
      ]
    },
    {
      age: 14,
      year: 1976,
      title: "🏕️ 1976 唐山地震与防震棚邻里守望",
      desc: "1976年夏末秋初，地震波及家乡，街坊四邻在空地搭起油毡防震棚。十四岁的你已经是个半大少年，风雨夜里大人们忙着加固棚顶：",
      choices: [
        {
          text: "扛起杉木和铁丝，冒雨爬上棚顶帮长辈紧固油毡",
          outcome: "大人们纷纷赞叹：‘后生可畏！十四岁就顶一个壮劳力了！’",
          effects: { courage: 25, rep: 20, health: 10 },
          seed: { id: 'child_62_quake_hero', title: '患难砥柱', desc: '危急时刻挺身而出，能顶半边天。' }
        },
        {
          text: "主动承担照顾棚里幼童的任务，带大家讲故事唱歌驱散恐惧",
          outcome: "防震棚里充满笑声与安全感，你展现出惊人的团队安抚定力。",
          effects: { eq: 25, clean: 15, iq: 12 },
          seed: { id: 'child_62_calm_anchor', title: '风雨安澜', desc: '临危不乱，极富心理定力与团队关怀。' }
        },
        {
          text: "借着马灯光线帮医疗巡逻队清点并分发救灾药品",
          outcome: "细致无误的统计让卫生所大夫连声夸赞，对现代医药产生了深刻崇敬。",
          effects: { clean: 22, iq: 20, rep: 15 },
          seed: { id: 'child_62_medic_aid', title: '井然有条', desc: '大考面前处乱不惊，行事极为周全细密。' }
        }
      ]
    },
    {
      age: 17,
      year: 1979,
      title: "📖 1979 科学的春天与《哥德巴赫猜想》",
      desc: "1979年，徐迟报告文学《哥德巴赫猜想》风靡全国，陈景润的事迹点燃全民科学热情！十七岁的你站在高考重开与改革开放初期的大门口：",
      choices: [
        {
          text: "在宿舍煤油灯下通宵刷完了厚厚三本《数理化自学丛书》",
          outcome: "数理逻辑突飞猛进，模拟考名列全县第一！向科学巅峰发起冲刺！",
          effects: { iq: 32, courage: 15, rep: 20 },
          seed: { id: 'child_62_science_fever', title: '科学春天', desc: '求知若渴，以科技自立自强为毕生所求。' }
        },
        {
          text: "敏锐关注到《光明日报》讨论真理标准大讨论的社论文章，撰写心得",
          outcome: "思路大开！你的文章被学校推荐到地区青年刊物，大局思辨力惊艳全校！",
          effects: { iq: 25, eq: 25, clean: 15 },
          seed: { id: 'child_62_ideology_open', title: '解放思想', desc: '敢于打破教条，具备宏阔的大局洞察力。' }
        },
        {
          text: "帮大杂院回城知青张罗修自行车与配钥匙小铺，学习自立谋生",
          outcome: "在市井缝隙中触摸到了商品经济萌动的脉搏，赚下第一笔机动盘缠。",
          effects: { capital: 180, eq: 22, courage: 12 },
          seed: { id: 'child_62_market_sprout', title: '春潮初嗅', desc: '善于捕捉时代风向，务实敢为。' }
        }
      ]
    }
  ],

  // 1972 中流砥柱一代 (童年 1972~1989)
  1972: [
    {
      age: 4,
      year: 1976,
      title: "🏕️ 1976 唐山地震与防震棚邻里守望",
      desc: "1976年夏末秋初，地震波及家乡，街坊四邻在空地搭起油毡防震棚。风雨夜里大人们忙着加固棚顶，隔壁大妈把仅剩的一碗热棒子面糊糊端到了四岁的你嘴边：",
      choices: [
        {
          text: "懂事地捧着碗分出一半，先喂给棚里哭闹的邻家小妹妹",
          outcome: "你不哭不闹、先人后己的乖巧模样让满棚大人眼眶发热，街坊纷纷夸赞：‘这孩子打小就仁义懂事！’",
          effects: { rep: 25, courage: 15, clean: 10 },
          seed: { id: 'child_shelter_solidarity', title: '同舟共济', desc: '幼年经历患难守望，自幼深谙邻里相扶之重。' }
        },
        {
          text: "安静依偎在母亲怀里，借着煤油灯光认真翻看父亲画的认字卡",
          outcome: "风雨呼啸中你毫不惊慌，睁大眼睛辨认卡片上的图画与汉字。父亲欣慰地摸了摸你的头顶。",
          effects: { iq: 20, courage: 10, eq: 8 },
          seed: { id: 'child_shelter_calm', title: '处变不惊', desc: '风雨交加而神色安宁，自幼便有超乎同龄人的定力。' }
        },
        {
          text: "迈着小短腿把家里的备用蜡烛送到孤寡陈爷爷手里",
          outcome: "陈爷爷激动得眼眶湿润，拿出珍藏的旧军功章给你看，哄着你讲述当年保家卫国的英雄往事。",
          effects: { eq: 22, clean: 18, rep: 15 },
          seed: { id: 'child_shelter_kindness', title: '仁心暖世', desc: '自幼怀纯善之心体恤长者，深得街坊疼爱。' }
        }
      ]
    },
    {
      age: 8,
      year: 1980,
      title: "📺 1980 街坊第一台九寸黑白电视机",
      desc: "1980年，街坊供销社主任家搬回了第一台昆仑牌九寸黑白电视机！晚饭后左邻右舍自带小竹凳把院子围得水泄不通，天线转来转去沙沙作响：",
      choices: [
        {
          text: "爬上院墙高处，主动帮大人们扶正室外鱼骨天线方向",
          outcome: "荧幕雪花消散，正播放着《铁臂阿童木》与女排比赛实况！满院爆发热烈掌声，你成了当晚的小功臣！",
          effects: { courage: 20, rep: 20, eq: 10 },
          seed: { id: 'child_tv_hero', title: '弄潮先锋', desc: '勇于挺身尝试，热衷于为众人解决棘手难题。' }
        },
        {
          text: "早早搬着马扎到院中央占位，给下班疲惫的父母留好前排",
          outcome: "父母下班走进大院，看到你用红领巾系在马扎上占的位置，满脸欣慰与骄傲，直夸你懂事孝顺。",
          effects: { clean: 20, eq: 15, health: 5 },
          seed: { id: 'child_filial_dutiful', title: '至纯至孝', desc: '百善孝为先，时刻心系至亲冷暖，深得长辈福荫。' }
        },
        {
          text: "凑在电视机侧面，痴迷研究背后的电子显像管和旋钮构造",
          outcome: "你盯着电子管微弱的红光，满脑子都是无线电与电磁波的神奇原理，科技探索的火种深深植入心灵。",
          effects: { iq: 25, courage: 10, capital: 20 },
          seed: { id: 'child_tv_tech_spark', title: '格物致知', desc: '对现代工业与电子科学拥有天生的解构与洞察本能。' }
        }
      ]
    },
    {
      age: 12,
      year: 1984,
      title: "📻 1984 废品站淘回的三洋半导体收音机",
      desc: "1984年，你在废品收购站用攒了半年的零花钱买下一台被摔烂的三洋收音机。外壳碎裂、电容脱焊，但核心晶体管依稀完好：",
      choices: [
        {
          text: "点燃煤油灯，用一把借来的烙铁整夜摸索焊修",
          outcome: "伴随一声微弱的嗞啦声，耳机里突然传出了中央人民广播电台清晰的播音！那一刻，你眼里的科技之火彻底被点燃了！",
          effects: { iq: 30, courage: 10, capital: 50 },
          seed: { id: 'child_tech_genius', title: '工匠顿悟', desc: '对电子通信与精密器械有触类旁通的直觉。' }
        },
        {
          text: "拆解零件分类翻新，拿到信托商店寄卖变现",
          outcome: "转手净赚 ¥28 元巨款！这在当时抵得上普通工人半个月工资。你赚到了人生真正意义上的第一桶金！",
          effects: { capital: 120, eq: 15, iq: 10 },
          seed: { id: 'child_first_pot', title: '商海第一桶金', desc: '天生敏锐的低买高卖嗅觉，极善于资产变现。' }
        },
        {
          text: "改装成简易发报机玩具，与隔壁院的发小拉铜线通话",
          outcome: "两个大院的小伙伴排队来你们家听‘有线电话’，你成了胡同里最受追捧的孩子王，威望如日中天！",
          effects: { rep: 25, eq: 20, courage: 10 },
          seed: { id: 'child_community_hero', title: '大院孩子王', desc: '懂得用新鲜事物聚拢人心，极具号召力。' }
        }
      ]
    },
    {
      age: 14,
      year: 1986,
      title: "🐒 1986 《西游记》轰动开播与齐天大圣梦",
      desc: "1986年寒假，中央电视台正式开播六小龄童版《西游记》！‘敢问路在何方，路在脚下’响彻街头巷尾。你和发小用旧拖把柄当金箍棒，在红砖墙头上腾云驾雾：",
      choices: [
        {
          text: "‘俺老孙来也！’带领大院发小排演大闹天宫，扮齐天大圣",
          outcome: "你手持木棒挥舞自如，指挥小伙伴各司其职，威震三个胡同，展现出惊人的团队号召与组织才干！",
          effects: { rep: 25, courage: 20, eq: 15 },
          seed: { id: 'child_wukong_spirit', title: '齐天豪情', desc: '敢叫日月换新天，不畏强权艰险的豪迈魄力。' }
        },
        {
          text: "省下早饭钱，去新华书店把整套原版连环画和西游小说买下苦读",
          outcome: "你沉浸在博大精深的传统文学与谋略隐喻之中，文笔与辞藻大幅拔节，写下的作文被全校传阅！",
          effects: { iq: 28, clean: 15, courage: 5 },
          seed: { id: 'child_literary_mastery', title: '笔走龙蛇', desc: '精通文史典籍与人情世故，下笔如有千钧神助。' }
        },
        {
          text: "模仿电视剧片头配乐，用自制竹笛吹奏出《敢问路在何方》",
          outcome: "清脆悠扬的笛声飘荡在大院黄昏，引来无数街坊围观叫好。你展现出非凡的艺术悟性与时代共鸣力。",
          effects: { eq: 25, rep: 15, health: 10 },
          seed: { id: 'child_musical_resonance', title: '时代清音', desc: '善于捕捉时代的情感脉搏，极富艺术感染力。' }
        }
      ]
    },
    {
      age: 17,
      year: 1989,
      title: "🐼 1990 北京亚运热潮与熊猫盼盼纪念章",
      desc: "1990年金秋，第十一届北京亚运会震撼开幕，《亚洲雄风》唱响神州大地！学校发起为亚运盛会捐款，捐资即可获赠一枚鎏金熊猫盼盼纪念徽章：",
      choices: [
        {
          text: "毫不犹豫砸开储蓄罐，将积攒的 ¥15 全部捐献亚运盛会",
          outcome: "校长在全校早操上为你亲手佩戴盼盼徽章并点名通报表扬！全校雷动！爱国之志化为胸中不熄火焰。",
          effects: { rep: 35, courage: 20, clean: 20 },
          seed: { id: 'child_asian_games_panpan', title: '亚洲雄风', desc: '胸怀大国崛起崇高信仰，视国家荣誉高于个人得失。' }
        },
        {
          text: "在板报上绘制青年时代奋斗长卷，激励同窗各奔时代前程",
          outcome: "宣传栏前挤满了热血沸腾的同窗青年，工匠、战士、知青与学子纷纷在板报前立下报国大志！",
          effects: { iq: 25, eq: 20, courage: 10 },
          seed: { id: 'child_gaokao_mobilizer', title: '中流砥柱', desc: '善于提振士气与大局动员，在决战关头有扛旗者的风范。' }
        },
        {
          text: "敏锐发现校门口对亚运贴纸小文创的巨大渴望，进货摆摊赚取第一桶金",
          outcome: "你用精明的算盘与口才在课余倒腾文创，净赚 ¥85 元！你在日记里写道：商业的浪潮即将席卷中国！",
          effects: { capital: 220, eq: 22, iq: 15 },
          seed: { id: 'child_early_merchant', title: '商贾天成', desc: '嗅觉极度敏锐，善于从时代的宏大脉动中挖掘商机。' }
        }
      ]
    }
  ],

  // 1982 世纪新锐一代 (童年 1982~1999)
  1982: [
    {
      age: 4,
      year: 1986,
      title: "🐒 1986 《西游记》霸屏与齐天大圣梦",
      desc: "1986年寒假，央视六小龄童版《西游记》震撼开播！四岁的你披着红色毛巾当斗篷，挥舞着塑料小金箍棒，在水泥小床上腾云驾雾：",
      choices: [
        {
          text: "‘俺老孙来也！’拉着隔壁大院小朋友一起演大闹天宫",
          outcome: "你不怕生敢担当，成了整栋筒子楼的快乐开心果与孩子王！",
          effects: { rep: 25, courage: 20, eq: 15 },
          seed: { id: 'child_82_wukong_boy', title: '勇敢烂漫', desc: '天真烂漫，敢说敢为，自幼充满自信霸气。' }
        },
        {
          text: "痴迷电视机里的各路神仙特技，盯着片尾字幕认汉字",
          outcome: "小小年纪识字数百，过目不忘的才智让街坊老师大为惊奇！",
          effects: { iq: 25, clean: 15, courage: 8 },
          seed: { id: 'child_82_early_reader', title: '聪颖夙慧', desc: '天生悟性极高，对文字与信息极度敏感。' }
        },
        {
          text: "把电视机旁果盘里的苹果先捧给辛苦做饭的母亲",
          outcome: "母亲欣慰得将你抱在怀里亲了又亲，一家人其乐融融。",
          effects: { clean: 20, eq: 18, health: 8 },
          seed: { id: 'child_82_warm_son', title: '纯孝仁爱', desc: '心怀温情，时刻懂得体贴父母辛劳。' }
        }
      ]
    },
    {
      age: 8,
      year: 1990,
      title: "🐼 1990 北京亚运热潮与熊猫盼盼纪念章",
      desc: "1990年金秋，北京亚运会开幕，《亚洲雄风》唱响大街小巷！八岁的你在电视机前挥舞国旗，学校号召为盛会捐款集资：",
      choices: [
        {
          text: "砸开小猪存钱罐，把平时舍不得吃冰棍攒下的钱全部捐献",
          outcome: "换回一枚金灿灿的熊猫盼盼别针徽章，别在胸口神气极了！",
          effects: { rep: 30, courage: 18, clean: 18 },
          seed: { id: 'child_82_panpan_pride', title: '大国情怀', desc: '自幼深植爱国自豪感，视集体荣誉高于个人私利。' }
        },
        {
          text: "在美术课上画出中国健儿夺金长卷，被选送全区少年宫展览",
          outcome: "画作色彩鲜明、气势如虹，展现出卓越的艺术与想象才华！",
          effects: { eq: 25, iq: 20, rep: 12 },
          seed: { id: 'child_82_art_spark', title: '丹青意象', desc: '具备非凡的形象思维与东方美学领悟力。' }
        },
        {
          text: "和小伙伴在弄堂里举办‘迷你田径赛’，勇夺百米跑冠军",
          outcome: "身手矫健体魄充沛，在操场上挥洒阳光汗水！",
          effects: { health: 22, courage: 20, rep: 10 },
          seed: { id: 'child_82_athletic_vital', title: '体魄强健', desc: '身手敏捷，坚韧耐操，充满生命朝气。' }
        }
      ]
    },
    {
      age: 12,
      year: 1994,
      title: "🎮 1994 小霸王学习机与四驱车风潮",
      desc: "1994年，‘小霸王其乐无穷’的声音传遍胡同！你用积攒的压岁钱淘到一台键盘学习机，胡同里四驱车竞速赛正热闹上演：",
      choices: [
        {
          text: "插上五笔字型打字卡带，挑灯苦练盲打与简易BASIC编程",
          outcome: "屏幕上跳出第一个由你编写的计算小程序！数智科技的窗户豁然打开！",
          effects: { iq: 32, courage: 10, capital: 50 },
          seed: { id: 'child_82_code_pioneer', title: '数字弄潮', desc: '最早接触计算机与互联网雏形，极具未来数字化直觉。' }
        },
        {
          text: "精细打磨四驱车底盘龙头凤尾与马达缠线，夺得街区四驱大赛冠军",
          outcome: "动手改装与机械结构悟性极其过人，小伙伴纷纷找你代调赛车！",
          effects: { courage: 22, rep: 22, eq: 15 },
          seed: { id: 'child_82_mini_maker', title: '机械极客', desc: '对高精机械与物理动力改装拥有极高天赋。' }
        },
        {
          text: "在校门口摆设微型四驱车零件互换摊位，倒腾紧俏零配件",
          outcome: "用以物易物与机智差价净赚 ¥65 元！早早展露出市场经济敏锐嗅觉！",
          effects: { capital: 150, eq: 22, iq: 12 },
          seed: { id: 'child_82_street_trader', title: '商海幼苗', desc: '在潮流迭代中敏锐发现交换价值，极富商业眼光。' }
        }
      ]
    },
    {
      age: 14,
      year: 1996,
      title: "📼 1996 随身听里的金曲与微机房初启蒙",
      desc: "1996年，磁带随身听在校园悄然风靡。学校新建成了第一个铺塑料鞋套的微机房，十四岁的你第一次推开微机房大门：",
      choices: [
        {
          text: "戴上鞋套坐在386电脑前，废寝忘食在DOS下敲打代码指令",
          outcome: "老师惊叹于你的理解力，破格允许你在课余担任微机室学生管理员！",
          effects: { iq: 30, courage: 12, rep: 15 },
          seed: { id: 'child_82_dos_master', title: '信息先锋', desc: '与中国互联网腾飞同步成长，前沿洞察无可限量。' }
        },
        {
          text: "用随身听反复倒带听英语磁带，积极准备中考与口语竞赛",
          outcome: "语感与国际视野大幅拓展，英语演讲比赛斩获全市特等奖！",
          effects: { eq: 25, clean: 18, iq: 15 },
          seed: { id: 'child_82_global_ear', title: '贯通中西', desc: '视野开阔，擅长跨文化交流与博闻强识。' }
        },
        {
          text: "与同窗组建校园民谣吉他小组，自编自唱青春逐梦歌曲",
          outcome: "歌声回荡在九十年代的梧桐树下，成为校园里最亮眼的文艺新星！",
          effects: { eq: 28, rep: 20, health: 10 },
          seed: { id: 'child_82_campus_bard', title: '时代游吟', desc: '浪漫洒脱，富有超凡的艺术号召力与感染力。' }
        }
      ]
    },
    {
      age: 17,
      year: 1999,
      title: "🎆 1999 迎千禧狂欢与澳门回归之夜",
      desc: "1999年岁末，神州大地喜迎澳门回归，《七子之歌》响彻千家万户，新世纪钟声即将敲响！十七岁的你站在千禧纪元门槛上立下人生大志：",
      choices: [
        {
          text: "在千禧跨年倒计时下写下《我的2000年代大国誓言》，冲刺高校联考",
          outcome: "豪情万丈！你将个人奋斗深嵌进新世纪大国崛起的浩荡长卷之中！",
          effects: { rep: 35, courage: 25, clean: 20 },
          seed: { id: 'child_82_millennium_stride', title: '世纪新人', desc: '与新千年同频共振，胸怀星辰大海与时代担当。' }
        },
        {
          text: "利用家庭拨号网络建立起全校第一个静态HTML学习互助主页",
          outcome: "主页访问量突破万次，你初次领略了互联网改变世界与连接万物的威力！",
          effects: { iq: 32, eq: 20, capital: 80 },
          seed: { id: 'child_82_web_builder', title: '互联弄潮', desc: '深谙数字浪潮精髓，善于利用前沿工具重构连接。' }
        },
        {
          text: "组织同学前往敬老院开展‘迎新世纪·世纪守望’志愿慰问",
          outcome: "尊老敬贤，薪火相传。以仁爱与品德赢得社会各界高度赞赏！",
          effects: { clean: 28, eq: 25, rep: 20 },
          seed: { id: 'child_82_civic_virtue', title: '仁心厚德', desc: '恪守公义，自律笃行，极具崇高人格魅力。' }
        }
      ]
    }
  ]
};

// 168 汉灵帝建宁年间（党锢之祸与黄巾前夕一代）
ERA_HISTORICAL_CHILDHOOD[168] = [
  {
    age: 3,
    year: 171,
    title: "🏛️ 党锢余波与暗室诵书",
    desc: "汉灵帝建宁末年，党锢之祸风声鹤唳，天下名士多受禁锢。三岁时你随长辈在后堂暗室，烛影摇曳，长辈抚你脊梁低声训示：",
    choices: [
      {
        text: "依偎长辈膝前暗记《论语》，不畏窗外更夫马蹄声",
        outcome: "幼小心灵铭刻经训，长辈赞你‘泰山崩于前而色不变，有大将经略之风！’",
        effects: { clean: 14, iq: 10, courage: 8 },
        seed: { id: 'child_168_serene', title: '临危诵经', desc: '经乱世而心定，自幼养就浩然正气。' }
      },
      {
        text: "紧握坞堡暗门钥匙，牢记藏身地窖通路",
        outcome: "心思缜密，熟知门径，日后遇兵荒马乱亦能从容指引全家避难。",
        effects: { courage: 14, resilience: 10, rep: 6 },
        seed: { id: 'child_168_prudent', title: '识险避难', desc: '审时度势，洞悉机变之法。' }
      },
      {
        text: "将长辈手书的竹简细心卷起，妥藏于泥封陶罐中",
        outcome: "护法传薪，藏经于甓，族老无不叹服：‘文脉托于此子，虽遭秦火亦无忧！’",
        effects: { iq: 12, clean: 12, eq: 8 },
        seed: { id: 'child_168_curator', title: '典籍深藏', desc: '善保文脉，守正不移。' }
      }
    ]
  },
  {
    age: 5,
    year: 173,
    title: "🖌️ 熹平石经与月旦品藻",
    desc: "熹平年间，洛阳立石经以正六经文字，汝南月旦评风靡海内。五岁之年，私塾塾师取石经拓片教你认字，考你志趣：",
    choices: [
      {
        text: "摹写石经严整八分隶书，力求笔笔有法度",
        outcome: "字如铁画银钩，塾师赞叹：‘此笔有蔡伯喈（蔡邕）风骨！’",
        effects: { clean: 16, iq: 12, rep: 8 },
        seed: { id: 'child_168_calligraphy', title: '石经法度', desc: '笔力精严，恪守法度规矩。' }
      },
      {
        text: "仿效名士口吻品评同舍同窗言行，条理分明",
        outcome: "童音朗朗言必有中，被乡闾传为‘神童品藻’，声名早播！",
        effects: { eq: 16, rep: 14, courage: 8 },
        seed: { id: 'child_168_appraiser', title: '少年品藻', desc: '独具慧眼，长于鉴识天下英才。' }
      },
      {
        text: "将分得的拓本分赠求学无门之寒士子弟",
        outcome: "好施乐善，声名广传，寒门士子争相依附，聚得一乡人心！",
        effects: { clean: 18, eq: 14, rep: 12 },
        seed: { id: 'child_168_magnanimous', title: '倾囊相助', desc: '乐善好施，博施济众。' }
      }
    ]
  },
  ...((ERA_HISTORICAL_CHILDHOOD[100] || []).filter(e => e.age > 5))
];

// 220 魏黄初受禅年间（三国鼎立与九品初建一代）
ERA_HISTORICAL_CHILDHOOD[220] = [
  {
    age: 3,
    year: 223,
    title: "🏛️ 禅代更始与新朝岁律",
    desc: "黄初年间，汉魏受禅，天下三分鼎立。三岁之年，你仰望宗祠正堂换上魏文帝颁赐之新历，长辈持笏肃立，引你拜谒宗祖：",
    choices: [
      {
        text: "俯首随长辈行三跪九叩大礼，庄严如小成人",
        outcome: "容止肃穆，举止合礼，宗族长者皆道：‘克己复礼，大宗之器！’",
        effects: { clean: 15, eq: 12, rep: 8 },
        seed: { id: 'child_220_ritual', title: '恪守朝仪', desc: '雍容沉稳，仪态端庄。' }
      },
      {
        text: "凝视新朝正朔历书上的天干地支，喃喃念诵",
        outcome: "推衍历法无师自通，长辈赞为‘天资明达，谙于天人之序’！",
        effects: { iq: 14, clean: 10, eq: 8 },
        seed: { id: 'child_220_astronomy', title: '明天人之序', desc: '明通历算，洞察天时大势。' }
      },
      {
        text: "指着堂外整军待发的部曲旗幡，毫无惧色",
        outcome: "气度雄浑，坞壁督帅抚案叹赏：‘乱世生此儿，宗族无虞矣！’",
        effects: { courage: 16, health: 8, rep: 6 },
        seed: { id: 'child_220_valiant', title: '雄威天生', desc: '勇毅坚忍，气盖山河。' }
      }
    ]
  },
  {
    age: 5,
    year: 225,
    title: "🖌️ 洛下玄风与九品立品",
    desc: "五岁之年，九品官人法推行天下，洛下清谈之风渐起。族中中正官回乡视察宗族子弟，命你在厅前试言经旨：",
    choices: [
      {
        text: "从容引述《老子》《庄子》名篇，发微阐幽",
        outcome: "才辩无滞，辞气清远，中正官大加赞叹：‘此子秀出班辈，具玄拔之资！’",
        effects: { iq: 16, rep: 14, clean: 10 },
        seed: { id: 'child_220_metaphysics', title: '清谈妙理', desc: '才思敏赡，谈玄析理超凡脱俗。' }
      },
      {
        text: "谨守儒家三礼古训，对答规整不失分寸",
        outcome: "敦厚笃实，进退有矩，核定考语为‘端方雅正，宗门楷模’！",
        effects: { clean: 16, eq: 14, rep: 10 },
        seed: { id: 'child_220_orthodox', title: '经明行修', desc: '品行纯正，持躬严谨。' }
      },
      {
        text: "坦陈宗族坞堡农桑出产实绩，言必由实",
        outcome: "务实求真，深悉经世之务，中正官深颔其首：‘通晓民瘼，实干良干也！’",
        effects: { courage: 14, resilience: 12, capital: 500 },
        seed: { id: 'child_220_pragmatic', title: '经世务实', desc: '脚踏实地，精研实业农桑。' }
      }
    ]
  },
  ...((ERA_HISTORICAL_CHILDHOOD[100] || []).filter(e => e.age > 5))
];

const HAN_WEI_CHILDHOOD_EVENTS = ERA_HISTORICAL_CHILDHOOD[100] || [];

// 汇总按纪元生成的全量事件，保持 CHILDHOOD_EVENTS 向后兼容
const CHILDHOOD_EVENTS = [
  ...SHARED_CHILDHOOD_BASE,
  ...(ERA_HISTORICAL_CHILDHOOD[1972] || [])
];

module.exports = {
  SHARED_CHILDHOOD_BASE,
  ERA_HISTORICAL_CHILDHOOD,
  HAN_WEI_CHILDHOOD_EVENTS,
  CHILDHOOD_EVENTS
};

