/**
 * 《华夏世家 · 汉魏天命》极速滑牌对决与编年长河驱动引擎 (Card Deck Engine)
 * 采用类似 Reigns 的四维生死走钢丝机制：
 * 4 大生存指标：🌾 粮草 (grain)、🛡️ 部曲 (force)、📜 声望 (prestige)、🪙 资财 (wealth)
 * 任何一项跌至 0 或升至 100 均触发不可逆剧烈死因（死于匮乏 vs 怀璧其罪）！
 * 
 * 岁月长河：每滑一张卡，时间流转 1~2 载；
 * 历史大案作为不可逆时代巨浪卡插入，因果连锁回响，代际传承无缝流转。
 */

const _clanRankMod = (typeof require !== 'undefined') ? require('./clanRankLadderEngine.js') : null;

const HAN_WEI_METERS = {
  prestige: {
    key: 'prestige',
    name: '门望',
    icon: '🏛️',
    color: '#fde047',
    minDeath: '【士林唾弃】名声扫地受天下士族唾弃，朝廷下诏以“逆党国贼”诛灭三族！',
    maxDeath: '【功高震主】名动天下门生故吏遍九州，曹公/权臣夜不能寐，赐鸩酒一杯！'
  },
  wealth: {
    key: 'wealth',
    name: '族产',
    icon: '🪙',
    color: '#fef08a',
    minDeath: '【族库悬磬】资财耗尽田庄破产，家仆尽散，债主贪吏逼索，家督自尽！',
    maxDeath: '【金谷抄没】富可敌国引朝野垂涎，被以“私铸钱弊”罪名籍没全族田产充公！'
  },
  force: {
    key: 'force',
    name: '武备',
    icon: '⚔️',
    color: '#f87171',
    minDeath: '【盗寇破堡】护家私兵死绝，黑夜里过境流寇翻墙而入，屠灭坞堡！',
    maxDeath: '【死士弑主】私兵死士拥兵自重、军纪废弛，兵变斩杀家督自立为王！'
  },
  grain: {
    key: 'grain',
    name: '粮草',
    icon: '🌾',
    color: '#34d399',
    minDeath: '【仓廪断绝】绝粮饥荒，部曲哗变，族人散亡，宗族覆灭！',
    maxDeath: '【仓满招匪】存粮过甚，引关东诸侯联军借粮围攻，破壁强征！'
  },
  culture: {
    key: 'culture',
    name: '粮草',
    icon: '🌾',
    color: '#34d399',
    minDeath: '【家学断绝】经书散佚子弟沦为白丁，门阀底蕴丧尽，被士林除名！',
    maxDeath: '【文字之祸】著书立说触犯朝廷大忌，被指妄议国政连坐夷灭全族！'
  }
};

// 保持双向别名兼容
if (!HAN_WEI_METERS.culture.name) HAN_WEI_METERS.culture.name = '粮草';

// 汉魏两百年五卷历史大篇章
const HAN_WEI_CHAPTERS = [
  { start: 100, end: 145, title: '东汉中兴', roman: '一', desc: '经学筑基与州郡辟地' },
  { start: 146, end: 190, title: '党锢烽烟', roman: '二', desc: '党锢之祸与黄巾狂澜' },
  { start: 191, end: 240, title: '群雄鼎立', roman: '三', desc: '官渡赤壁与受禅立魏' },
  { start: 241, end: 280, title: '魏晋禅代', roman: '四', desc: '高平陵事变与太康一统' },
  { start: 281, end: 300, title: '八王终局', roman: '五', desc: '八王之乱与衣冠南渡' }
];

function getHanWeiChapter(year = 100) {
  for (const chap of HAN_WEI_CHAPTERS) {
    if (year >= chap.start && year <= chap.end) return chap;
  }
  return HAN_WEI_CHAPTERS[HAN_WEI_CHAPTERS.length - 1];
}

// 汉魏历史长河卡牌库 (涵盖公元100~300年重大关隘与世家微观生存)
const HAN_WEI_SWIPE_CARDS = [
  // -------------------------------------------------------------
  // 卷一：东汉中兴与经学筑基 (公元 100 ~ 145 年)
  // -------------------------------------------------------------
  {
    id: 'hw_c_100_yongyuan',
    year: 100,
    speaker: '郡守功曹',
    avatar: '🏛️',
    title: '永元辟地',
    text: '“朝廷诏修水利屯田，是否承揽开渠造田千顷？”',
    isAnchor: true,
    left: {
      text: '谨慎观望',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: -8, wealth: 4 },
      toast: '闭门守成，虽无耗费，然失州郡清议之誉。'
    },
    right: {
      text: '领命开渠',
      hint: { grain: 1, force: 0, prestige: 1, wealth: -1 },
      effects: { grain: 14, force: 0, prestige: 10, wealth: -12 },
      toast: '引渠开田千亩！粮食丰登，士民交口称赞！'
    }
  },
  {
    id: 'hw_c_105_paper',
    year: 105,
    speaker: '尚方令蔡伦使者',
    avatar: '📜',
    title: '元兴新纸',
    text: '“蔡侯新纸问世！是否重金采买打点，献书太学立名？”',
    isAnchor: true,
    left: {
      text: '恪守竹简',
      hint: { grain: 0, force: 0, prestige: 0, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: -6, wealth: 6 },
      toast: '恪守古法虽省金帛，然错失开宗立言之先机。'
    },
    right: {
      text: '重金献书',
      hint: { grain: 0, force: 0, prestige: 2, wealth: -2 },
      effects: { grain: 0, force: 0, prestige: 16, wealth: -14 },
      toast: '蔡侯纸注群经！洛阳诸生争相传抄，家学文名大震！'
    }
  },
  {
    id: 'hw_c_110_banchao_frontier',
    year: 110,
    speaker: '西域都护随使',
    avatar: '🐫',
    title: '西域驼铃',
    text: '“都护征调精骑通使西域大月氏，是否遣本族子弟从征立威？”',
    isAnchor: true,
    left: {
      text: '称疾辞征',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: -8, wealth: 4 },
      toast: '辞避远行，保全子弟，然失却边功封爵之机。'
    },
    right: {
      text: '遣骑西征',
      hint: { grain: -1, force: 1, prestige: 1, wealth: 1 },
      effects: { grain: -8, force: 10, prestige: 12, wealth: 8 },
      toast: '班超旧部威震大夏！带回汗血宝马与西域重宝，子弟拜假司马！'
    }
  },
  {
    id: 'hw_c_121_deng',
    year: 121,
    speaker: '廷尉捕吏',
    avatar: '⚖️',
    title: '邓氏覆案',
    text: '“邓氏外戚尽诛！门客携万卷密卷逃至坞外求庇。”',
    isAnchor: true,
    left: {
      text: '缚送官府',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 0, force: 0, prestige: -12, wealth: 10 },
      toast: '交出逃客获朝廷赏赐，然士林皆齿冷君之薄情。'
    },
    right: {
      text: '密室收纳',
      hint: { grain: -1, force: 0, prestige: 2, wealth: 0 },
      effects: { grain: -8, force: 6, prestige: 16, wealth: -6 },
      toast: '暗藏邓氏孤本与忠义死士，门阀底蕴大增！'
    }
  },
  {
    id: 'hw_c_132_zhangheng_seismograph',
    year: 132,
    speaker: '太史令张衡门生',
    avatar: '🌐',
    title: '候风地动',
    text: '“地动仪铜龙吐丸！陇西地震，朝廷征问群儒‘灾异与人事’。”',
    isAnchor: true,
    left: {
      text: '归咎天运',
      hint: { grain: 0, force: 0, prestige: 0, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: -4, wealth: 2 },
      toast: '陈词中庸不求有功，朝廷批复‘平庸循吏’。'
    },
    right: {
      text: '直陈弊政',
      hint: { grain: 0, force: 0, prestige: 2, wealth: -1 },
      effects: { grain: 0, force: -4, prestige: 16, wealth: -8 },
      toast: '敢犯龙鳞直刺宦寺专权！天下学子交口传颂，士林尊为骨鲠之臣！'
    }
  },
  {
    id: 'hw_c_140_qiang',
    year: 140,
    speaker: '护羌校尉急使',
    avatar: '⚔️',
    title: '西陲烽烟',
    text: '“西羌叛军逼近关陇！官府急令我族遣部曲从军平乱。”',
    isAnchor: true,
    left: {
      text: '重资代役',
      hint: { grain: 0, force: 0, prestige: -1, wealth: -2 },
      effects: { grain: -4, force: 0, prestige: -8, wealth: -14 },
      toast: '出万金赎免兵役，保全部曲死士，然军资耗费甚巨。'
    },
    right: {
      text: '带甲亲征',
      hint: { grain: -1, force: -2, prestige: 2, wealth: 1 },
      effects: { grain: -10, force: -14, prestige: 18, wealth: 10 },
      toast: '关陇血战破羌！部曲虽折损，然斩将立殊勋受封偏将军！'
    }
  },
  {
    id: 'hw_c_144_liangji_arrogance',
    year: 144,
    speaker: '大将军梁冀舍人',
    avatar: '🐅',
    title: '跋扈将军',
    text: '“梁大将军专断朝政鸩杀幼帝！逼令我族联名呈递颂德贺表。”',
    isAnchor: true,
    left: {
      text: '托疾不预',
      hint: { grain: 0, force: 0, prestige: 1, wealth: -1 },
      effects: { grain: 0, force: -6, prestige: 14, wealth: -10 },
      toast: '刚正不阿拒附恶党！虽遭构陷罚俸，然清望冠绝天下！'
    },
    right: {
      text: '屈意联署',
      hint: { grain: 0, force: 0, prestige: -2, wealth: 2 },
      effects: { grain: 0, force: 0, prestige: -15, wealth: 14 },
      toast: '附和权贵换取梁府辟除，资财渐厚，然士族深鄙之。'
    }
  },

  // -------------------------------------------------------------
  // 卷二：党锢烽烟与黄巾大暴动 (公元 146 ~ 190 年)
  // -------------------------------------------------------------
  {
    id: 'hw_c_159_huan_emperor_coup',
    year: 159,
    speaker: '汉桓帝密诏中黄门',
    avatar: '👑',
    title: '南宫除跋扈',
    text: '“帝登前殿诏发羽林诛梁冀！令我部曲即刻封锁开阳门断其死党退路。”',
    isAnchor: true,
    left: {
      text: '观望避祸',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: -10, wealth: 0 },
      toast: '禁足自守，错失从龙立功之殊遇。'
    },
    right: {
      text: '拔刀诛奸',
      hint: { grain: 0, force: 1, prestige: 1, wealth: 1 },
      effects: { grain: 0, force: 6, prestige: 12, wealth: 12 },
      toast: '斩将夺门尽抄梁府！分润良田百顷，天子赐金紫光禄！'
    }
  },
  {
    id: 'hw_c_166_danggu_first',
    year: 166,
    speaker: '洛阳太学诸生',
    avatar: '📜',
    title: '初起党锢',
    text: '“张成妖道伏诛，宦寺反咬名士！朝廷诏捕李膺杜密，万生号哭相迎。”',
    isAnchor: true,
    left: {
      text: '闭门绝客',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 0, force: 0, prestige: -10, wealth: 6 },
      toast: '明哲保身，虽免廷尉诏狱，然被士林指为首鼠两端。'
    },
    right: {
      text: '联名请命',
      hint: { grain: 0, force: -1, prestige: 2, wealth: -1 },
      effects: { grain: 0, force: -8, prestige: 18, wealth: -8 },
      toast: '跪阙上书震动两京！朝廷虽罢官归田，然海内号为“八俊”！'
    }
  },
  {
    id: 'hw_c_168_danggu',
    year: 168,
    speaker: '清流领袖李膺门生',
    avatar: '📜',
    title: '党锢之祸',
    text: '“十常侍大捕名士！数位大儒逃至坞堡求设馆避难。”',
    isAnchor: true,
    left: {
      text: '谢客避祸',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: -12, wealth: 6 },
      toast: '虽免除宦官侦骑之灾，然宗门失信于儒林。'
    },
    right: {
      text: '舍命庇佑',
      hint: { grain: -1, force: 1, prestige: 2, wealth: -1 },
      effects: { grain: -10, force: 8, prestige: 18, wealth: -10 },
      toast: '庇佑天下清流！宗族被尊为海内泰斗，死士自发结盟护卫！'
    }
  },
  {
    id: 'hw_c_175_xiping_stone_classics',
    year: 175,
    speaker: '议郎蔡邕使者',
    avatar: '🪨',
    title: '熹平石经',
    text: '“蔡邕手书七经刻石立于太学门外！日来观者车千余辆，是否出重资拓印？”',
    isAnchor: true,
    left: {
      text: '坐守家传',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 0, force: 0, prestige: -6, wealth: 6 },
      toast: '守旧免金，然家学经义日渐与当世官定七经脱节。'
    },
    right: {
      text: '购拓全帙',
      hint: { grain: 0, force: 0, prestige: 2, wealth: -1 },
      effects: { grain: -4, force: 0, prestige: 18, wealth: -12 },
      toast: '熹平石经拓本聚齐家塾！海内学子争渡求教，家学文脉大炽！'
    }
  },
  {
    id: 'hw_c_178_selling_offices',
    year: 178,
    speaker: '西邸买官鸿胪寺承',
    avatar: '💰',
    title: '西邸卖爵',
    text: '“灵帝设西邸卖爵榷钱，两千石太守千万钱！是否倾全族巨资纳钱买官？”',
    isAnchor: true,
    left: {
      text: '鄙夷不屑',
      hint: { grain: 0, force: 0, prestige: 1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: 12, wealth: 0 },
      toast: '高节清风视若粪土！虽无朱紫华冕，然清誉动海内！'
    },
    right: {
      text: '输钱买爵',
      hint: { grain: 0, force: 1, prestige: -2, wealth: -2 },
      effects: { grain: 0, force: 8, prestige: -16, wealth: -20 },
      toast: '纳千万五铢得封郡守！虽掌兵权，然士大夫皆侧目嗤之。'
    }
  },
  {
    id: 'hw_c_184_huangjin_main',
    year: 184,
    speaker: '大方渠帅马元义',
    avatar: '🔥',
    title: '黄巾烽烟',
    text: '“黄巾大军围困坞壁，勒令纳粮投降，否则屠坞灭族！”',
    isAnchor: true,
    clashData: { enemyName: '大方渠帅马元义', title: '黄巾烽烟坚壁战', enemyPower: 60, year: 184 },
    left: {
      text: '死守深垒',
      hint: { grain: -1, force: -2, prestige: 2, wealth: 0 },
      effects: { grain: -14, force: -12, prestige: 18, wealth: 8 },
      toast: '滚木弩箭齐发！大破黄巾贼锋，缴获辎重无数，斩杀贼首！'
    },
    right: {
      text: '纳财求和',
      hint: { grain: -2, force: 1, prestige: -2, wealth: -1 },
      effects: { grain: -18, force: 10, prestige: -16, wealth: -10 },
      toast: '倾仓纳粮虽免破壁，然被朝廷斥为通贼逆族！'
    }
  },
  {
    id: 'hw_c_189_hejin_palace_storm',
    year: 189,
    speaker: '袁绍部将校尉',
    avatar: '🗡️',
    title: '洛阳宫变',
    text: '“何进被斩，袁绍引兵诛宦宫中大火！两宫大乱，是否遣死士入城接驾？”',
    isAnchor: true,
    left: {
      text: '严守坞门',
      hint: { grain: 0, force: 1, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 6, prestige: -8, wealth: 0 },
      toast: '严兵固守避开洛阳血火，保全部曲无虞。'
    },
    right: {
      text: '提兵救驾',
      hint: { grain: -1, force: -1, prestige: 2, wealth: 1 },
      effects: { grain: -8, force: -8, prestige: 20, wealth: 10 },
      toast: '夜护少帝与陈留王归北芒！天子亲抚前襟，宗族进封开国县子！'
    }
  },
  {
    id: 'hw_c_190_dongzhuo_fire',
    year: 190,
    speaker: '西凉铁骑悍将',
    avatar: '🐎',
    title: '董卓焚城',
    text: '“董卓焚洛阳西迁！西凉铁骑勒索我族良马与粮草万石。”',
    isAnchor: true,
    left: {
      text: '据险抗命',
      hint: { grain: 0, force: -2, prestige: 2, wealth: 0 },
      effects: { grain: -8, force: -16, prestige: 16, wealth: 0 },
      toast: '山险坚守，西凉骑兵久攻不下撤围，保全家产！'
    },
    right: {
      text: '纳贡求全',
      hint: { grain: -1, force: 0, prestige: -1, wealth: -2 },
      effects: { grain: -10, force: 0, prestige: -12, wealth: -18 },
      toast: '奉献重宝金帛，董卓赐官封侯，然天下诸侯皆耻之。'
    }
  },

  // -------------------------------------------------------------
  // 卷三：群雄争霸与官渡赤壁 (公元 191 ~ 240 年)
  // -------------------------------------------------------------
  {
    id: 'hw_c_192_wangyun_changan',
    year: 192,
    speaker: '司徒王允密使',
    avatar: '⚖️',
    title: '关中鼎沸',
    text: '“吕布刺董卓，李傕郭汜反扑长安！流民数十万东奔，是否大纳流民？”',
    isAnchor: true,
    left: {
      text: '拒纳流亡',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 8, force: 0, prestige: -10, wealth: 0 },
      toast: '保全自族口粮，然失却开拓大片荒田之绝佳劳力。'
    },
    right: {
      text: '开荒屯垦',
      hint: { grain: -2, force: 1, prestige: 1, wealth: 1 },
      effects: { grain: -16, force: 10, prestige: 14, wealth: 10 },
      toast: '收容关中流民五千口！开辟膏腴良田数千亩，部曲壮丁大增！'
    }
  },
  {
    id: 'hw_c_196_emperor',
    year: 196,
    speaker: '曹操迎奉侍郎',
    avatar: '👑',
    title: '迎奉天子',
    text: '“曹操迎奉天子于许都！诏令我族献粟八百石以充国用。”',
    isAnchor: true,
    left: {
      text: '荒歉推诿',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 8, force: 0, prestige: -12, wealth: 4 },
      toast: '省下仓廪，然错失进入许都朝堂机要之良机。'
    },
    right: {
      text: '输粟充公',
      hint: { grain: -2, force: 0, prestige: 2, wealth: -1 },
      effects: { grain: -16, force: 6, prestige: 18, wealth: -10 },
      toast: '天子亲赐九锡印信！宗门子弟直接辟举为尚书郎！'
    }
  },
  {
    id: 'hw_c_199_baima_yanliang',
    year: 199,
    speaker: '曹操麾下别驾',
    avatar: '⚔️',
    title: '白马危局',
    text: '“袁绍大将颜良围白马！军情危如累卵，急征我族部曲助防白马津。”',
    isAnchor: true,
    left: {
      text: '托辞拒征',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: -10, wealth: 4 },
      toast: '自保部曲，然关东士林皆讥讽宗门畏战退缩。'
    },
    right: {
      text: '引军助战',
      hint: { grain: -1, force: -1, prestige: 2, wealth: 0 },
      effects: { grain: -8, force: -8, prestige: 18, wealth: 6 },
      toast: '亲睹关羽斩颜良解白马围！部曲同沐殊荣，曹操亲赐良马百匹！'
    }
  },
  {
    id: 'hw_c_200_guandu_epic',
    year: 200,
    speaker: '曹操密使荀彧',
    avatar: '📜',
    title: '官渡生死豪赌',
    text: '“官渡军粮告罄！曹操微服求借全族存粮与死士助战。”',
    isAnchor: true,
    clashData: { enemyName: '袁绍先锋大将', title: '官渡中原鏖战', enemyPower: 70, year: 200 },
    left: {
      text: '暗通袁绍',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 2 },
      effects: { grain: 0, force: -6, prestige: -15, wealth: 18 },
      toast: '收受袁氏万两黄金！然而曹操乌巢大捷，战后宗族受清算之累。'
    },
    right: {
      text: '倾力助曹',
      hint: { grain: -2, force: -1, prestige: 2, wealth: -1 },
      effects: { grain: -20, force: -8, prestige: 22, wealth: -10 },
      toast: '曹公乌巢大捷！敕赐【九品第一品·大中正】，进封开国县侯！'
    }
  },
  {
    id: 'hw_c_207_longzhong_inquiry',
    year: 207,
    speaker: '南阳隆中水镜门徒',
    avatar: '🌿',
    title: '隆中对问',
    text: '“刘玄德三顾隆中！诸葛卧龙天下三分策出，荆襄宗族暗中密结。”',
    isAnchor: true,
    left: {
      text: '归附中原',
      hint: { grain: 0, force: 0, prestige: 1, wealth: 1 },
      effects: { grain: 0, force: 0, prestige: 10, wealth: 8 },
      toast: '笃定北方一统，向许都递交门阀表章，得朝廷恩荫。'
    },
    right: {
      text: '暗助玄德',
      hint: { grain: -1, force: 1, prestige: 1, wealth: -1 },
      effects: { grain: -10, force: 8, prestige: 12, wealth: -10 },
      toast: '暗输钱粮结交卧龙凤雏！在汉室大旗之下伏下深厚棋子！'
    }
  },
  {
    id: 'hw_c_208_chibi_plague',
    year: 208,
    speaker: '坐堂神医',
    avatar: '🌿',
    title: '建安大疫',
    text: '“赤壁鏖战中原大疫！神医献伤寒方，是否开仓舍药？”',
    isAnchor: true,
    left: {
      text: '闭门避疫',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 8, force: -6, prestige: -12, wealth: 0 },
      toast: '虽保坞内族人不染，然外围田庄佃丁死伤大半。'
    },
    right: {
      text: '舍药济民',
      hint: { grain: -2, force: 1, prestige: 2, wealth: -1 },
      effects: { grain: -16, force: 12, prestige: 18, wealth: -10 },
      toast: '活人万余！四方黎民归心投效，收编得力壮丁数百！'
    }
  },
  {
    id: 'hw_c_211_weinan_machao',
    year: 211,
    speaker: '关中破贼中郎将',
    avatar: '🐎',
    title: '渭南破羌',
    text: '“马超韩遂引西凉铁骑反！曹操筑冰城相抗，征发我族粮车千辆赶赴潼关。”',
    isAnchor: true,
    left: {
      text: '缓行观衅',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 6, force: 0, prestige: -10, wealth: 0 },
      toast: '辎重未损，然被丞相府判为“迟缓军机”，削夺食邑。'
    },
    right: {
      text: '星夜运粮',
      hint: { grain: -2, force: 1, prestige: 2, wealth: 0 },
      effects: { grain: -16, force: 8, prestige: 18, wealth: 6 },
      toast: '冰城得粟固若金汤！曹公破西凉捷报至，宗门受赐关内侯印！'
    }
  },
  {
    id: 'hw_c_219_fancheng_guanyu',
    year: 219,
    speaker: '荆州急报驿骑',
    avatar: '⚔️',
    title: '威震华夏',
    text: '“关羽水淹七军擒于禁斩庞德，兵锋直逼许昌！是否调部曲协防宛洛？”',
    isAnchor: true,
    clashData: { enemyName: '荆州先锋偏将', title: '襄樊前线防卫战', enemyPower: 72, year: 219 },
    left: {
      text: '托辞坚守',
      hint: { grain: 0, force: 1, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 6, prestige: -12, wealth: 0 },
      toast: '保境自守，所幸孙权偷袭荆州解围，然士林皆议宗族无勤王之心。'
    },
    right: {
      text: '提兵勤王',
      hint: { grain: -1, force: -1, prestige: 2, wealth: 1 },
      effects: { grain: -12, force: -10, prestige: 20, wealth: 10 },
      toast: '徐晃长驱直入解襄樊围！部曲协同合围破敌，受封辅国将军！'
    }
  },
  {
    id: 'hw_c_220_nine_ranks',
    year: 220,
    speaker: '魏国吏部中正官陈群',
    avatar: '🏛️',
    title: '九品中正定鼎',
    text: '“大魏初定九品中正！朝廷特来评定我族门风与家声。”',
    isAnchor: true,
    left: {
      text: '经学清谈',
      hint: { grain: 0, force: -1, prestige: 2, wealth: 0 },
      effects: { grain: 0, force: -8, prestige: 18, wealth: -6 },
      toast: '以清流文苑立宗，被定为【门阀二品】，朝野景仰！'
    },
    right: {
      text: '避嫌韬晦',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 8, force: 0, prestige: -12, wealth: 6 },
      toast: '辞让中正清品，避朝堂纷争，保境息民，积蓄家资！'
    }
  },
  {
    id: 'hw_c_222_yiling_fire',
    year: 222,
    speaker: '江南陆氏商贾',
    avatar: '⛵',
    title: '夷陵烈火',
    text: '“陆逊火烧连营七百里！刘备大溃白帝城，江南荆扬大贾邀我族入江东开埠。”',
    isAnchor: true,
    left: {
      text: '恪守中原',
      hint: { grain: 1, force: 0, prestige: 0, wealth: 0 },
      effects: { grain: 6, force: 0, prestige: 4, wealth: 2 },
      toast: '守住中原大本营，坐看天下三分沧桑起伏。'
    },
    right: {
      text: '开辟江南',
      hint: { grain: -1, force: 0, prestige: 1, wealth: 2 },
      effects: { grain: -8, force: 0, prestige: 12, wealth: 16 },
      toast: '楼船顺江入吴会！在三吴水乡置办桑蚕良田，开宗族江南别业！'
    }
  },
  {
    id: 'hw_c_227_chushi_biao',
    year: 227,
    speaker: '大魏雍凉都督司马懿使者',
    avatar: '📜',
    title: '祁山烽燧',
    text: '“诸葛亮出师北伐六出祁山！都督急调关东名门输纳栈道木料与铁甲。”',
    isAnchor: true,
    left: {
      text: '推诿克扣',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 0, force: 0, prestige: -10, wealth: 8 },
      toast: '截留族产木石，然被中军斥责，失宠于台阁。'
    },
    right: {
      text: '倾输军资',
      hint: { grain: -1, force: 1, prestige: 2, wealth: -1 },
      effects: { grain: -10, force: 8, prestige: 18, wealth: -12 },
      toast: '栈道飞通陇右！诸葛大军粮尽退保汉中，宗门获司马府厚待！'
    }
  },
  {
    id: 'hw_c_234_wuzhangyuan_autumn',
    year: 234,
    speaker: '渭北前线牙将',
    avatar: '🍂',
    title: '五丈秋风',
    text: '“五丈原巨星陨落！蜀兵退守剑阁，天下兵戈暂息，朝廷诏示休兵屯田。”',
    isAnchor: true,
    left: {
      text: '休兵退田',
      hint: { grain: 1, force: -1, prestige: 0, wealth: 1 },
      effects: { grain: 12, force: -8, prestige: 4, wealth: 10 },
      toast: '解甲归田赋税充盈，坞壁良田岁稔年丰。'
    },
    right: {
      text: '厉兵秣马',
      hint: { grain: -1, force: 2, prestige: 1, wealth: -1 },
      effects: { grain: -8, force: 16, prestige: 8, wealth: -8 },
      toast: '深谋远虑防患未然！部曲刀枪锃亮，随时备应朝局巨变！'
    }
  },

  // -------------------------------------------------------------
  // 卷四：魏晋禅代与太康一统 (公元 241 ~ 280 年)
  // -------------------------------------------------------------
  {
    id: 'hw_c_241_zhengshi_reform',
    year: 241,
    speaker: '吏部尚书何晏名帖',
    avatar: '🪭',
    title: '正始玄风',
    text: '“大将军曹爽辅政何晏主吏部！海内清谈崇尚自然，邀我族子弟赴洛阳玄谈。”',
    isAnchor: true,
    left: {
      text: '闭户崇礼',
      hint: { grain: 0, force: 0, prestige: 1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: 10, wealth: 0 },
      toast: '恪守名教不苟同浮浪！虽不附曹党，然得耆老宿儒之尊崇。'
    },
    right: {
      text: '倾心玄学',
      hint: { grain: 0, force: -1, prestige: 1, wealth: 1 },
      effects: { grain: 0, force: -6, prestige: 14, wealth: 8 },
      toast: '辩才无碍名动京华！子弟被辟为黄门侍郎，风头无两！'
    }
  },
  {
    id: 'hw_c_249_gaopingling_coup',
    year: 249,
    speaker: '司马懿黑甲死士',
    avatar: '🗡️',
    title: '高平陵政变',
    text: '“司马懿洛水起兵！令我部曲即刻合围曹爽大将军府邸。”',
    isAnchor: true,
    clashData: { enemyName: '洛阳夺门甲士', title: '高平陵夺门之变', enemyPower: 75, year: 249 },
    left: {
      text: '围杀曹党',
      hint: { grain: 0, force: 1, prestige: 1, wealth: 1 },
      effects: { grain: 0, force: 8, prestige: 14, wealth: 16 },
      toast: '站队司马氏！论功受封西晋开国元勋，爵位世袭罔替！'
    },
    right: {
      text: '遁入竹林',
      hint: { grain: 1, force: -1, prestige: -1, wealth: 0 },
      effects: { grain: 6, force: -12, prestige: -16, wealth: 0 },
      toast: '竹林清谈避世！辞去要职退避嫌疑，免除政治血洗！'
    }
  },
  {
    id: 'hw_c_251_huainan_wangling',
    year: 251,
    speaker: '太尉王凌密使',
    avatar: '📜',
    title: '淮南第一叛',
    text: '“太尉王凌起兵寿春反司马！密檄邀我宗族共立楚王曹彪为帝。”',
    isAnchor: true,
    left: {
      text: '上缴密檄',
      hint: { grain: 0, force: 0, prestige: 1, wealth: 1 },
      effects: { grain: 0, force: 4, prestige: 12, wealth: 10 },
      toast: '飞报洛阳朝廷！司马太傅顺水擒王凌，赐我族加官进爵！'
    },
    right: {
      text: '暗结淮南',
      hint: { grain: -1, force: 1, prestige: -2, wealth: 1 },
      effects: { grain: -8, force: 8, prestige: -16, wealth: 12 },
      toast: '兵败受累！淮南诸族尽遭连坐，全凭重金打点死士方得脱罪。'
    }
  },
  {
    id: 'hw_c_255_huainan_wenqin',
    year: 255,
    speaker: '镇东将军毌丘俭檄文',
    avatar: '🔥',
    title: '毌丘俭勤王',
    text: '“毌丘俭文钦淮南起兵诛司马师！朝廷命我族速献千匹战马助征。”',
    isAnchor: true,
    left: {
      text: '匿马观变',
      hint: { grain: 0, force: 1, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: 6, prestige: -10, wealth: 2 },
      toast: '藏马自保，然淮南事定后被司马氏追责减封。'
    },
    right: {
      text: '尽献良驹',
      hint: { grain: 0, force: -1, prestige: 2, wealth: -1 },
      effects: { grain: 0, force: -6, prestige: 18, wealth: -10 },
      toast: '战马驰骋大破文鸯！司马师亲赐紫金双鱼佩，门第威重！'
    }
  },
  {
    id: 'hw_c_260_caomao_palace_charge',
    year: 260,
    speaker: '洛阳宿卫都督',
    avatar: '🗡️',
    title: '南阙弑君',
    text: '“高贵乡公曹髦拔剑攻相府，成济当街弑君！洛阳百官皆泣，何去何从？”',
    isAnchor: true,
    left: {
      text: '缟素哭灵',
      hint: { grain: 0, force: 0, prestige: 2, wealth: -1 },
      effects: { grain: 0, force: -6, prestige: 20, wealth: -10 },
      toast: '效节大魏旧恩缟素号哭！朝野无不敬佩宗门忠节，千古流芳！'
    },
    right: {
      text: '上表劝进',
      hint: { grain: 0, force: 0, prestige: -2, wealth: 2 },
      effects: { grain: 0, force: 4, prestige: -16, wealth: 18 },
      toast: '顺应天命上表司马昭！受赐晋国上卿，权倾州府，然士林不齿。'
    }
  },
  {
    id: 'hw_c_263_dengai_conquer_shu',
    year: 263,
    speaker: '征西将军邓艾粮台令',
    avatar: '⛰️',
    title: '阴平裹毡',
    text: '“邓艾裹毡滚七百里阴平绝险袭成都！急令我族押送精粮入蜀犒军。”',
    isAnchor: true,
    left: {
      text: '裹足不前',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 6, force: 0, prestige: -8, wealth: 0 },
      toast: '免于蜀道艰险，然错失瓜分巴蜀沃野之天赐机缘。'
    },
    right: {
      text: '飞栈入蜀',
      hint: { grain: -2, force: 0, prestige: 1, wealth: 2 },
      effects: { grain: -14, force: 4, prestige: 14, wealth: 18 },
      toast: '刘禅出降蜀汉平定！宗族获分锦城良田两千顷与蜀锦千匹！'
    }
  },
  {
    id: 'hw_c_265_jin_dynasty_founding',
    year: 265,
    speaker: '晋武帝司马炎册命使',
    avatar: '👑',
    title: '受禅代魏',
    text: '“司马炎受魏禅立西晋！大封同姓诸王与开国门阀，册封我族列侯！”',
    isAnchor: true,
    left: {
      text: '辞爵崇俭',
      hint: { grain: 1, force: 0, prestige: 1, wealth: 0 },
      effects: { grain: 8, force: 0, prestige: 12, wealth: 0 },
      toast: '固辞高爵安守本分，力避卷入晋初藩王之争。'
    },
    right: {
      text: '拜受圭衮',
      hint: { grain: 0, force: 1, prestige: 2, wealth: 1 },
      effects: { grain: 0, force: 8, prestige: 20, wealth: 16 },
      toast: '开国县侯世袭罔替！位列西晋元勋，门生故吏遍布两京！'
    }
  },
  {
    id: 'hw_c_280_taikang_unification',
    year: 280,
    speaker: '晋武帝赐宴尚书',
    avatar: '👑',
    title: '太康天下一统',
    text: '“西晋一统！王濬楼船下益州灭孙吴，朝野大宴，是否赴洛阳大庆？”',
    isAnchor: true,
    left: {
      text: '闭门崇俭',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 8, force: 0, prestige: -10, wealth: 6 },
      toast: '力戒奢靡闭门崇俭，在浮浪之风中淡泊自守！'
    },
    right: {
      text: '盛装朝贺',
      hint: { grain: -1, force: 0, prestige: 2, wealth: -1 },
      effects: { grain: -8, force: 0, prestige: 18, wealth: -12 },
      toast: '百官朝贺四海升平！宗族子弟入选太康台阁，极尽一时之荣！'
    }
  },

  // -------------------------------------------------------------
  // 卷五：八王终局与衣冠南渡 (公元 281 ~ 300 年)
  // -------------------------------------------------------------
  {
    id: 'hw_c_285_shichong_waikang_wealth',
    year: 285,
    speaker: '荆州刺史石崇豪奴',
    avatar: '💎',
    title: '金谷斗富',
    text: '“石崇王恺于金谷园蜡油作炊、珊瑚斗富！下帖邀我族赴宴比富。”',
    isAnchor: true,
    left: {
      text: '布衣拒席',
      hint: { grain: 1, force: 0, prestige: 1, wealth: 0 },
      effects: { grain: 6, force: 0, prestige: 12, wealth: 4 },
      toast: '布衣蔬食拒赴金谷！清风亮节折服洛阳诸士，远避奢靡之祸！'
    },
    right: {
      text: '千金斗奢',
      hint: { grain: 0, force: 0, prestige: 1, wealth: -2 },
      effects: { grain: 0, force: 0, prestige: 8, wealth: -22 },
      toast: '掷七尺珊瑚震惊四座！富甲京华，然宗族资财几乎耗空。'
    }
  },
  {
    id: 'hw_c_290_emperor_hui_jiananfeng',
    year: 290,
    speaker: '贾南风皇后密使',
    avatar: '🐍',
    title: '贾后弄权',
    text: '“惠帝暗弱贾后专横，谋诛太傅杨骏夷灭三族！密令我族甲士相助搜捕。”',
    isAnchor: true,
    left: {
      text: '托辞抗命',
      hint: { grain: 0, force: 0, prestige: 1, wealth: -1 },
      effects: { grain: 0, force: -4, prestige: 14, wealth: -8 },
      toast: '拒充贾后鹰犬！虽遭降职罚铜，然全族清名无损。'
    },
    right: {
      text: '引兵诛杨',
      hint: { grain: 0, force: 1, prestige: -2, wealth: 2 },
      effects: { grain: 0, force: 8, prestige: -16, wealth: 18 },
      toast: '抄灭太傅府邸瓜分珍宝！得贾后信重，然天下人皆恨如蛇蝎。'
    }
  },
  {
    id: 'hw_c_291_eight_princes_prelude',
    year: 291,
    speaker: '江南会稽使者',
    avatar: '⛵',
    title: '八王乱起 · 南渡先机',
    text: '“八王之乱五胡兵起！江南士族力劝我族及早南渡置业以备万全。”',
    isAnchor: true,
    left: {
      text: '坚守中原',
      hint: { grain: 0, force: 1, prestige: 0, wealth: 0 },
      effects: { grain: 0, force: 12, prestige: 4, wealth: -8 },
      toast: '留守中原祖茔深垒，即将直面八王混战惨烈兵祸！'
    },
    right: {
      text: '南渡置业',
      hint: { grain: -1, force: 0, prestige: 1, wealth: -2 },
      effects: { grain: -12, force: 0, prestige: 16, wealth: -18 },
      toast: '南渡建康筑基！奠定六朝江南第一门阀万世之基！'
    }
  },
  {
    id: 'hw_c_299_prince_minhuai_fall',
    year: 299,
    speaker: '愍怀太子洗马',
    avatar: '⚖️',
    title: '废立危局',
    text: '“贾后诬陷废黜愍怀太子！赵王司马伦暗聚兵马谋夺大权，邀我族会盟。”',
    isAnchor: true,
    left: {
      text: '深沟壁垒',
      hint: { grain: 1, force: 1, prestige: 0, wealth: 0 },
      effects: { grain: 6, force: 8, prestige: 0, wealth: -4 },
      toast: '深沟高垒不预两派之争，保境息民以待天下大定。'
    },
    right: {
      text: '潜通宗室',
      hint: { grain: -1, force: 1, prestige: 1, wealth: 1 },
      effects: { grain: -8, force: 10, prestige: 10, wealth: 8 },
      toast: '结纳宗室诸王！在八王倾轧狂潮中奇兵破局，掌握宿卫之权！'
    }
  },
  {
    id: 'hw_c_300_century_consecration',
    year: 300,
    speaker: '八王决战中军都督',
    avatar: '👑',
    title: '两百年汉魏终卷',
    text: '“赵王司马伦诛贾后自称帝！八王全面决战洛阳！宗族两百年基业在此一举！”',
    isAnchor: true,
    clashData: { enemyName: '洛阳八王精锐中军', title: '汉魏极盛终局决战', enemyPower: 80, year: 300 },
    left: {
      text: '保全万民',
      hint: { grain: 1, force: -1, prestige: 2, wealth: 0 },
      effects: { grain: 8, force: -10, prestige: 22, wealth: -6 },
      toast: '以万民为念保全族人！经受两百年血火锤炼，宗风不朽永驻人间！'
    },
    right: {
      text: '问鼎洛阳',
      hint: { grain: -1, force: 2, prestige: 2, wealth: 1 },
      effects: { grain: -10, force: 16, prestige: 24, wealth: 14 },
      toast: '力挽狂澜定鼎洛阳！宗门鼎食传祧两百年，成为华夏不拔之高门！'
    }
  },

  // -------------------------------------------------------------
  // 常态生活与宗族治家卡牌 (随时间动态穿插)
  // -------------------------------------------------------------
  {
    id: 'hw_gen_famine_refugee',
    speaker: '流民老弱',
    avatar: '🌾',
    title: '饥民叩门',
    text: '“旱荒连岁饥民数百聚在坞门外，乞求一口米粥活命。”',
    left: {
      text: '闭门驱赶',
      hint: { grain: 1, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 8, force: 0, prestige: -10, wealth: 0 },
      toast: '保住积粮，然城外怨声载道，名声有损。'
    },
    right: {
      text: '开仓赈饥',
      hint: { grain: -1, force: 1, prestige: 1, wealth: 0 },
      effects: { grain: -14, force: 8, prestige: 12, wealth: 0 },
      toast: '耗粮施粥，活人无数，收纳精壮壮丁二十人充为部曲！'
    }
  },
  {
    id: 'hw_gen_salt_iron_contraband',
    speaker: '江淮私盐枭客',
    avatar: '🪙',
    title: '私盐秘道',
    text: '“私盐暴利十倍，盐枭欲借我族船队暗运入中原分润。”',
    left: {
      text: '秉公拒绝',
      hint: { grain: 0, force: 0, prestige: 1, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: 8, wealth: -4 },
      toast: '守法奉公，清议称道，绝无把柄落于贪官之手。'
    },
    right: {
      text: '秘运分润',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 2 },
      effects: { grain: 0, force: 0, prestige: -12, wealth: 16 },
      toast: '五铢进库如流水！族资巨万，然官府侦骑暗中窥伺。'
    }
  },
  {
    id: 'hw_gen_clan_marriage_cui',
    speaker: '清河崔氏媒妁',
    avatar: '💍',
    title: '门阀联姻',
    text: '“清河崔氏名门，欲将嫡女许配我族少主，聘礼需百金。”',
    left: {
      text: '婉拒聘礼',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 0, force: 0, prestige: -8, wealth: 10 },
      toast: '省下重聘，但错失北方第一名门之奥援。'
    },
    right: {
      text: '隆重纳彩',
      hint: { grain: 0, force: 0, prestige: 2, wealth: -2 },
      effects: { grain: 0, force: 0, prestige: 18, wealth: -16 },
      toast: '结秦晋之好！两大家族结盟，宗门声望跃居望族！'
    }
  },
  {
    id: 'hw_gen_retainers_training',
    speaker: '部曲教头',
    avatar: '⚔️',
    title: '演武整军',
    text: '“流寇猖獗，教头请调铁料钱粮，精训两百披甲弩手。”',
    left: {
      text: '免增兵费',
      hint: { grain: 1, force: -1, prestige: 0, wealth: 1 },
      effects: { grain: 8, force: -12, prestige: 0, wealth: 6 },
      toast: '休兵息武，节省开销，然外围防御稍显薄弱。'
    },
    right: {
      text: '重赏精训',
      hint: { grain: -1, force: 2, prestige: 0, wealth: -1 },
      effects: { grain: -10, force: 16, prestige: 4, wealth: -14 },
      toast: '练就铁甲精锐！坞壁战力天下莫敌，流寇闻风丧胆！'
    }
  },
  {
    id: 'hw_gen_study_academy',
    speaker: '太学博士旧友',
    avatar: '📜',
    title: '立馆授徒',
    text: '“四方学子慕名而来，家塾请拨资财扩建书院纳百士。”',
    left: {
      text: '不图虚名',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 1 },
      effects: { grain: 0, force: 0, prestige: -8, wealth: 8 },
      toast: '免于嘈杂聚徒之嫌，族产自得安闲。'
    },
    right: {
      text: '扩建书院',
      hint: { grain: -1, force: 0, prestige: 2, wealth: -1 },
      effects: { grain: -8, force: 0, prestige: 18, wealth: -12 },
      toast: '书声琅琅动州郡！门生故吏遍布朝野，奠定世家文脉！'
    }
  },
  // -------------------------------------------------------------
  // 🎲 纯正肉鸽高风险博弈卡牌 (High-Stakes Rogue-Lite Gamble Cards)
  // -------------------------------------------------------------
  {
    id: 'hw_gamble_bandit_night_raid',
    speaker: '坞堡死士统领',
    avatar: '⚔️',
    title: '夜袭黑山贼营',
    text: '“太行贼扎营十里外，今夜暴雨，部曲请令夜袭劫粮！”',
    left: {
      text: '闭门戒备',
      hint: { grain: 0, force: 0, prestige: -1, wealth: 0 },
      effects: { grain: 0, force: -4, prestige: -6, wealth: 0 },
      toast: '据守稳妥，然贼寇气焰益张，庄人微有怨言。'
    },
    right: {
      text: '全军夜袭',
      hint: { grain: 1, force: 1, prestige: 1, wealth: 1 },
      effects: { grain: 8, force: 8, prestige: 8, wealth: 8 },
      toast: '暴雨夜袭！斩将搴旗，大破敌营！',
      gamble: {
        winRate: 0.70,
        critMsg: '🎲【夜袭大捷】斩首贼酋！缴获战马皮甲无数，五铢爆满！',
        failMsg: '🎲【夜袭受伏】陷入敌围！死士折损过半，带伤突围！',
        winEffects: { force: 4, wealth: 6, grain: 4 },
        failEffects: { force: -12, wealth: -8, grain: -6, prestige: -4 }
      }
    }
  },
  {
    id: 'hw_gamble_grain_speculation',
    speaker: '洛阳大贾粮商',
    avatar: '🪙',
    title: '奇货居奇',
    text: '“洛阳粮价飞涨二十倍！商贾请倾全族余粟入市豪赌！”',
    left: {
      text: '留粮自保',
      hint: { grain: 1, force: 0, prestige: 0, wealth: -1 },
      effects: { grain: 8, force: 0, prestige: 2, wealth: -6 },
      toast: '深藏仓廪，虽失暴利，然族中老幼温饱无忧。'
    },
    right: {
      text: '出粟豪赌',
      hint: { grain: -2, force: 0, prestige: -1, wealth: 2 },
      effects: { grain: -16, force: 0, prestige: -4, wealth: 16 },
      toast: '高位抛售！族产大发，五铢钱塞满库房！',
      gamble: {
        winRate: 0.65,
        critMsg: '🎲【奇货暴利】粮市疯抢！资产暴涨三万贯，富可敌国！',
        failMsg: '🎲【遭官府抄没】官府平抑物价查封粮行！血本无归！',
        winEffects: { wealth: 8, prestige: -2 },
        failEffects: { wealth: -16, prestige: -8, grain: -8 }
      }
    }
  },
  {
    id: 'hw_gamble_ancient_mine',
    speaker: '山野采金老客',
    avatar: '⛏️',
    title: '后山先秦秘矿',
    text: '“坞后绝壁发现先秦密铜矿！私采获重利，败则逆谋！”',
    left: {
      text: '献铜归公',
      hint: { grain: 0, force: 0, prestige: 1, wealth: -1 },
      effects: { grain: 0, force: 0, prestige: 10, wealth: -8 },
      toast: '恪守王法奉献矿藏，敕赐【忠贞世德】金匾！'
    },
    right: {
      text: '私铸地炉',
      hint: { grain: 0, force: 1, prestige: -1, wealth: 2 },
      effects: { grain: 0, force: 8, prestige: -6, wealth: 14 },
      toast: '私铸重器与五铢！钱兵两旺，坞壁甲兵冠绝州郡！',
      gamble: {
        winRate: 0.68,
        critMsg: '🎲【宝藏大发】暗炼精铜万斤！部曲兵甲全换精铁！',
        failMsg: '🎲【密报泄漏】刺史巡骑突袭查封！重金行贿方得免死！',
        winEffects: { wealth: 8, force: 4 },
        failEffects: { wealth: -14, prestige: -10, force: -6 }
      }
    }
  },
  {
    id: 'hw_gamble_hero_sworn',
    speaker: '关西避难壮士',
    avatar: '🐎',
    title: '猛士投效',
    text: '“边军豪杰斩杀贪官投效我族，官府悬赏五千铢缉捕！”',
    left: {
      text: '缚送官府',
      hint: { grain: 0, force: -1, prestige: -1, wealth: 1 },
      effects: { grain: 0, force: -6, prestige: -8, wealth: 8 },
      toast: '领受赏钱，然江湖游侠皆唾骂君家寡恩薄幸。'
    },
    right: {
      text: '厚礼结纳',
      hint: { grain: -1, force: 2, prestige: 1, wealth: -1 },
      effects: { grain: -6, force: 12, prestige: 6, wealth: -8 },
      toast: '英雄死节！猛士誓死效忠，部曲战力脱胎换骨！',
      gamble: {
        winRate: 0.75,
        critMsg: '🎲【万人敌效节】真豪杰也！一人可当百夫，威震盗寇！',
        failMsg: '🎲【追兵围坞】官差引缇骑围庄搜捕！损失巨财平事！',
        winEffects: { force: 6, prestige: 4 },
        failEffects: { force: -6, wealth: -12, prestige: -6 }
      }
    }
  },
  {
    id: 'hw_wandering_silk_caravan',
    speaker: '西域龟兹大胡商',
    avatar: '🐫',
    title: '丝路行商秘市',
    text: '“骆驼商队自葱岭而来！带来西域奇宝与神秘青铜古匣，万金可购！”',
    left: {
      text: '敬谢不敏',
      hint: { grain: 0, force: 0, prestige: 0, wealth: 0 },
      effects: { grain: 0, force: 0, prestige: 0, wealth: 4 },
      toast: '恪守本分，婉拒行商，余财留待家用。'
    },
    right: {
      text: '重金采买秘匣',
      hint: { grain: 0, force: 1, prestige: 1, wealth: -2 },
      effects: { grain: 0, force: 6, prestige: 8, wealth: -16 },
      toast: '开箱见宝！缴获【丝路秘藏 · 奇遇宝匣】与西域遗物！',
      grantRelic: { id: 'relic_crossbow_blueprint', name: '【诸葛连弩图谱】' },
      gamble: {
        winRate: 0.80,
        critMsg: '🎲【开出稀世遗物】西域奇匣爆出【诸葛连弩图谱】残卷！武备损耗减少30%！',
        failMsg: '🎲【买椟还珠】西域琉璃质脆多损，所费不赀！',
        winEffects: { force: 6, prestige: 6 },
        failEffects: { wealth: -6 }
      }
    }
  },
  {
    id: 'hw_wandering_miracle_healer',
    speaker: '隐世神医高足',
    avatar: '🌿',
    title: '杏林圣手叩门',
    text: '“传闻华佗门徒游方至此，愿以千金古方置换宗门庇护。”',
    left: {
      text: '薄赠盘缠',
      hint: { grain: 0, force: 0, prestige: 1, wealth: -1 },
      effects: { grain: 0, force: 0, prestige: 6, wealth: -4 },
      toast: '礼遇高人，赢得杏林赞誉。'
    },
    right: {
      text: '延揽入府供奉',
      hint: { grain: -1, force: 1, prestige: 2, wealth: -2 },
      effects: { grain: -6, force: 8, prestige: 12, wealth: -12 },
      toast: '聘为宗族客卿！神医调理宗老族人体魄，宗脉延绵！',
      grantRelic: { id: 'relic_jiuzhang_arithmetic', name: '【九章算术残卷】' }
    }
  }
];

// ==========================================
// 核心运行引擎函数
// ==========================================

/**
 * 初始化一局滑牌状态
 */
function initCardRun(state, destinyId = 'destiny_wubi_lord') {
  state.year = state.year || 100;
  state.age = state.age || 20;
  state.dynasticGeneration = state.dynasticGeneration || 1;
  state.handledSwipeCards = state.handledSwipeCards || {};

  // 四维平衡槽初始值 (门望 prestige, 族产 wealth, 武备 force, 文脉/粮草 culture/grain)
  // 若已经由 applyChosenHanWeiDestiny 或宿命卡注入，则保留并防御补齐，绝不暴力覆写为50！
  if (!state.meters || state.meters.prestige === undefined) {
    state.meters = {
      prestige: 50,
      wealth: 50,
      force: 50,
      culture: 55,
      grain: 55
    };

    if (destinyId === 'destiny_dang_gu') {
      state.meters.prestige = 65;
      state.meters.wealth = 35;
      state.meters.force = 35;
      state.meters.culture = 65;
      state.meters.grain = 65;
    } else if (destinyId === 'destiny_wubi_lord') {
      state.meters.prestige = 45;
      state.meters.wealth = 45;
      state.meters.force = 65;
      state.meters.culture = 65;
      state.meters.grain = 65;
    } else if (destinyId === 'destiny_merchant_tycoon') {
      state.meters.prestige = 35;
      state.meters.wealth = 75;
      state.meters.force = 40;
      state.meters.culture = 50;
      state.meters.grain = 50;
    }
  } else {
    // 补齐缺失维度并保持 grain 与 culture 双向同步
    if (state.meters.grain === undefined && state.meters.culture !== undefined) state.meters.grain = state.meters.culture;
    if (state.meters.culture === undefined && state.meters.grain !== undefined) state.meters.culture = state.meters.grain;
    if (state.meters.force === undefined) state.meters.force = 50;
    if (state.meters.wealth === undefined) state.meters.wealth = 50;
    if (state.meters.prestige === undefined) state.meters.prestige = 50;
  }

  // 宗业实体经略初始状态 (坞壁深垒, 膏腴良田, 宗祠学堂)
  state.estate = state.estate || {
    fortressLevel: 1, // 初始1级坞壁 (提供1次绝境死守免死)
    farmlandLevel: 1, // 初始1级膏腴良田 (每3载起获补给粮草)
    academyLevel: 0   // 宗祠学堂 (门望保底与吉兆概率)
  };

  // 随身秘术【深垒拒马】生效：坞壁初始防御升至2级
  if (state.equippedSkillIds && state.equippedSkillIds.includes('skill_deep_fortress')) {
    state.estate.fortressLevel = Math.max(state.estate.fortressLevel || 1, 2);
  }

  state._usedFortressLifeline = false;
  state._usedSkillRescue = false;

  state.activeCard = getNextSwipeCard(state);
  return state;
}

/**
 * 依据当前年份与剧情锁链获取下一张卡牌
 */
function getNextSwipeCard(state) {
  const yr = state.year || 100;
  const handled = state.handledSwipeCards || {};

  // 1. 优先检查当前年份的历史大浪潮锚点卡 (Chrono-Anchors，优先选取公元纪年距离最近的锚点卡)
  const anchors = HAN_WEI_SWIPE_CARDS.filter(c => c.isAnchor && !handled[c.id]);
  const matchedAnchor = anchors
    .filter(c => Math.abs(c.year - yr) <= 2)
    .sort((a, b) => Math.abs(a.year - yr) - Math.abs(b.year - yr))[0];
  if (matchedAnchor) {
    return matchedAnchor;
  }

  // 2. 否则从常规牌库随机抽取未打过的卡
  const availableGen = HAN_WEI_SWIPE_CARDS.filter(c => !c.isAnchor && !handled[c.id]);
  if (availableGen.length > 0) {
    const idx = Math.floor(Math.random() * availableGen.length);
    return availableGen[idx];
  }

  // 3. 全打完了循环重置常规卡
  const allGen = HAN_WEI_SWIPE_CARDS.filter(c => !c.isAnchor);
  const rndIdx = Math.floor(Math.random() * allGen.length);
  return allGen[rndIdx];
}

/**
 * 解析并结算一次卡牌滑动 (direction: 'left' | 'right')
 */
function resolveCardSwipe(state, card, direction) {
  if (!state || !card || !direction) return null;

  state.handledSwipeCards = state.handledSwipeCards || {};
  state.handledSwipeCards[card.id] = true;

  const opt = direction === 'left' ? card.left : card.right;
  let effects = { ...(opt.effects || {}) };
  const eqSkills = state.equippedSkillIds || [];

  // 🎲 风险博弈骰子机制 (Gamble Risk Roll)
  let gambleResult = null;
  if (opt.gamble) {
    const g = opt.gamble;
    let winRate = (typeof g.winRate === 'number' ? g.winRate : 0.65);
    // 【白马突骑】先发制人，风险博弈与大考胜率+15%
    if (eqSkills.includes('skill_swift_raid')) {
      winRate = Math.min(0.95, winRate + 0.15);
    }
    const roll = Math.random();
    const isWin = roll < winRate;
    gambleResult = { isGamble: true, isWin };
    if (isWin) {
      gambleResult.msg = g.critMsg || '🎲 豪赌大捷！破局立威！';
      gambleResult.isCrit = true;
      if (g.winEffects) {
        for (const k in g.winEffects) {
          effects[k] = (effects[k] || 0) + g.winEffects[k];
        }
      }
    } else {
      gambleResult.msg = g.failMsg || '🎲 兵行险着！失算受创！';
      gambleResult.isFail = true;
      effects = { ...(g.failEffects || {}) };
    }
  }

  // 1. 随身秘术被动加成 (Equipped Skill Passives)
  // 【清流砥柱】门望损耗减免30%
  if (eqSkills.includes('skill_prestige_anchor') && effects.prestige < 0) {
    effects.prestige = Math.round(effects.prestige * 0.7);
  }
  // 【举孝廉】门望增益额外+25%
  if (eqSkills.includes('skill_filial_scholar') && effects.prestige > 0) {
    effects.prestige = Math.round(effects.prestige * 1.25);
  }
  // 【奇货居奇】族产增益+25%，亏损减少25%
  if (eqSkills.includes('skill_silk_merchant')) {
    if (effects.wealth > 0) effects.wealth = Math.round(effects.wealth * 1.25);
    if (effects.wealth < 0) effects.wealth = Math.round(effects.wealth * 0.75);
  }
  // 【白马突骑】武备增益+25%
  if (eqSkills.includes('skill_swift_raid') && effects.force > 0) {
    effects.force = Math.round(effects.force * 1.25);
  }
  // 【仓廪丰盈】粮草增益+25%
  if (eqSkills.includes('skill_granary_steady') && effects.grain > 0) {
    effects.grain = Math.round(effects.grain * 1.25);
  }
  // 【悬壶济世】灾荒瘟疫损耗减少50%
  if (eqSkills.includes('skill_medicine_benevolence')) {
    if (effects.grain < 0) effects.grain = Math.round(effects.grain * 0.5);
    if (effects.force < 0 && (card.id.includes('plague') || card.id.includes('famine'))) {
      effects.force = Math.round(effects.force * 0.5);
    }
  }

  // 局内遗物加成与获取 (In-Run Active Relics)
  let relicNotice = null;
  state.activeRelics = state.activeRelics || [];
  if (opt.grantRelic && !state.activeRelics.includes(opt.grantRelic.id)) {
    state.activeRelics.push(opt.grantRelic.id);
    relicNotice = `✨ 获得局内遗物${opt.grantRelic.name}！即刻生效！`;
  }
  if (state.activeRelics.includes('relic_crossbow_blueprint') && effects.force < 0) {
    effects.force = Math.round(effects.force * 0.7); // 武备损耗减少30%
  }
  if (state.activeRelics.includes('relic_jiuzhang_arithmetic') && effects.wealth > 0) {
    effects.wealth = Math.round(effects.wealth * 1.25); // 族资增益提升25%
  }
  if (state.activeRelics.includes('relic_family_motto_tablet') && effects.prestige > 0) {
    effects.prestige += 3; // 门望增益额外+3
  }
  if (state.activeRelics.includes('relic_ancient_plow') && effects.grain > 0) {
    effects.grain = Math.round(effects.grain * 1.3); // 粮草增益提升30%
  }

  state.meters = state.meters || { prestige: 50, wealth: 50, force: 50, culture: 50, grain: 50 };
  for (const mKey in effects) {
    if (state.meters[mKey] !== undefined) {
      state.meters[mKey] = Math.max(0, Math.min(100, state.meters[mKey] + effects[mKey]));
    }
  }
  // 双向同步 grain 与 culture
  if (effects.grain !== undefined && effects.culture === undefined) {
    state.meters.culture = state.meters.grain;
  } else if (effects.culture !== undefined && effects.grain === undefined) {
    state.meters.grain = state.meters.culture;
  }

  // 【清流砥柱】经学底蕴门望底线锁定为25点
  if (eqSkills.includes('skill_prestige_anchor') && state.meters.prestige < 25) {
    state.meters.prestige = 25;
  }

  // 1.5 宗业【宗祠学堂】经学门望保底
  if (state.estate && state.estate.academyLevel > 0) {
    const minPrestigeFloor = 20 + state.estate.academyLevel * 5; // Lv1=25, Lv2=30, Lv3=35
    if (state.meters.prestige < minPrestigeFloor) {
      state.meters.prestige = minPrestigeFloor;
    }
  }

  // 2. 推进时间 (每滑一张卡，流逝 1~2 载)
  const yearsLeaped = card.isAnchor ? 2 : 1;
  state.year = (state.year || 100) + yearsLeaped;
  state.age = (state.age || 20) + yearsLeaped;
  state.careerTenureYears = (state.careerTenureYears || 0) + yearsLeaped;

  // 【举孝廉】每隔8载自动引荐贤良入京，门望额外+6
  if (eqSkills.includes('skill_filial_scholar') && (state.careerTenureYears || 0) > 0 && ((state.careerTenureYears || 0) % 8 === 0)) {
    state.meters.prestige = Math.min(100, (state.meters.prestige || 50) + 6);
    relicNotice = (relicNotice ? relicNotice + ' ' : '') + '📜【举孝廉】门生高士辟召入京，四海仰望，门望+6！';
  }

  // 获取世家当前段位配置
  const rankCfg = (_clanRankMod && state.familyProfile && state.familyProfile.rankProgress)
    ? _clanRankMod.CLAN_RANK_LADDER.find(r => r.rankId === state.familyProfile.rankProgress.currentRankId)
    : null;
  const maxChestTier = (rankCfg && rankCfg.maxChestTier) ? rankCfg.maxChestTier : 'legendary';

  // 2.2 击破大考与豪赌暴击掉落【三大遗产宝箱】(凯旋金匮、奇遇秘匣、岁稔行囊)
  let chestLootNotice = null;
  state.chestInventory = state.chestInventory || [];
  if (card.isAnchor) {
    state.milestonesPassed = (state.milestonesPassed || 0) + 1;
    let chestTier = (card.year >= 249)
      ? { name: `【${card.title} · 凯旋金匮】`, quality: 'gold' }
      : ((card.year >= 184)
        ? { name: `【${card.title} · 奇遇秘匣】`, quality: 'purple' }
        : { name: `【${card.title} · 岁稔行囊】`, quality: 'blue' });

    // 段位宝箱品阶硬限制
    if (maxChestTier === 'common') {
      if (chestTier.quality === 'gold' || chestTier.quality === 'purple') {
        chestTier = { name: `【${card.title} · 简素行囊】`, quality: 'blue' };
      }
    } else if (maxChestTier === 'rare') {
      if (chestTier.quality === 'gold') {
        chestTier = { name: `【${card.title} · 奇遇秘匣】`, quality: 'purple' };
      }
    }

    const anchorChest = {
      id: `chest_anchor_${card.year || state.year}_${Date.now()}`,
      name: chestTier.name,
      quality: chestTier.quality,
      year: state.year
    };
    state.chestInventory.push(anchorChest);
    chestLootNotice = `🎁 战役大捷！缴获${anchorChest.name}！`;
  } else if (gambleResult && gambleResult.isWin && gambleResult.isCrit) {
    const gambleChest = {
      id: `chest_gamble_${Date.now()}`,
      name: `【险中求胜 · 奇遇秘匣】`,
      quality: 'purple',
      year: state.year
    };
    state.chestInventory.push(gambleChest);
    chestLootNotice = `🎁 豪赌大捷！缴获${gambleChest.name}！`;
  }

  // 2.5 宗业【膏腴良田】岁熟起获稳产 (每3载起获补给，温和补给上限80，绝不爆仓过盛)
  let farmlandNotice = null;
  if (state.estate && (state.estate.farmlandLevel || 0) > 0) {
    if ((state.careerTenureYears || 0) % 3 === 0) {
      let bonusGrain = (state.estate.farmlandLevel || 1) * 3;
      if (eqSkills.includes('skill_granary_steady')) bonusGrain += 3; // 仓廪丰盈加成
      if ((state.meters.grain || 50) < 80) {
        state.meters.grain = Math.min(80, (state.meters.grain || 50) + bonusGrain);
        state.meters.culture = state.meters.grain;
        farmlandNotice = `🌾 膏腴良田起获：粮草+${bonusGrain}`;
      }
    }
  }

  // 辅助函数：结算终局排位与宝箱提现
  function buildEndgameResult(isDead, reason, cause) {
    let runEvaluation = null;
    let chestExtraction = null;
    let rankSettleResult = null;
    if (_clanRankMod && typeof _clanRankMod.evaluateSingleRunScore === 'function') {
      runEvaluation = _clanRankMod.evaluateSingleRunScore(state);
      chestExtraction = _clanRankMod.resolveChestExtraction(state.chestInventory || [], runEvaluation.grade);
      if (state.familyProfile) {
        rankSettleResult = _clanRankMod.settleClanRankProgress(state.familyProfile, runEvaluation);
      }
    }
    return { runEvaluation, chestExtraction, rankSettleResult };
  }

  // 3. 校验死亡与走钢丝崩溃判定 (包含宗业【坞壁深垒】与秘术【死士死守】绝境免死)
  const coreMeterKeys = ['prestige', 'wealth', 'force', 'culture'];
  let lifelineNotice = null;
  for (const k of coreMeterKeys) {
    const val = state.meters[k];
    const mCfg = HAN_WEI_METERS[k];
    if (val <= 0) {
      // 1. 检查坞壁免死金牌 (限每代一次)
      if (state.estate && (state.estate.fortressLevel || 0) >= 1 && !state._usedFortressLifeline && (k === 'force' || k === 'culture' || k === 'wealth')) {
        state._usedFortressLifeline = true;
        state.meters[k] = 25;
        if (k === 'culture') state.meters.grain = 25;
        if (k === 'grain') state.meters.culture = 25;
        lifelineNotice = '🛡️【坞壁死守】宗族死士拼死力挽狂澜！免于倾覆！';
        break;
      }
      // 2. 检查传承秘术【死士死守】(每局1次)
      if (eqSkills.includes('skill_fortress_rescue') && !state._usedSkillRescue) {
        state._usedSkillRescue = true;
        state.meters[k] = 28;
        if (k === 'culture') state.meters.grain = 28;
        if (k === 'grain') state.meters.culture = 28;
        lifelineNotice = '🛡️【死士死守】佩戴传承秘术救主！麾下亲卫死士以命相抵，保住全族不倾！';
        break;
      }
      const endData = buildEndgameResult(true, mCfg.minDeath, k);
      return {
        dead: true,
        cause: mCfg.minDeath,
        meterKey: k,
        extreme: 'min',
        toast: `💔 ${mCfg.name}耗尽！${mCfg.minDeath}`,
        ...endData
      };
    } else if (val >= 100) {
      // 检查明哲保身过盛避险 (需宗业根基，限每代一次：知进退，辞让散财施粥避祸)
      if (state.estate && (state.estate.fortressLevel || 0) >= 1 && !state._usedExcessLifeline) {
        state._usedExcessLifeline = true;
        state.meters[k] = 70;
        if (k === 'culture') state.meters.grain = 70;
        if (k === 'grain') state.meters.culture = 70;
        lifelineNotice = `🕊️【明哲保身】审时度势，辞让散财避嫌以退为进！化解${mCfg.name}过盛之祸！`;
        break;
      }
      const endData = buildEndgameResult(true, mCfg.maxDeath, k);
      return {
        dead: true,
        cause: mCfg.maxDeath,
        meterKey: k,
        extreme: 'max',
        toast: `⚡ ${mCfg.name}过盛！${mCfg.maxDeath}`,
        ...endData
      };
    }
  }

  // 4. 检查自然寿数与任期交接 (主政满50年或寿终)
  if ((state.careerTenureYears || 0) >= 50 || (state.age || 18) >= 78) {
    return {
      succession: true,
      reason: '春秋高寿，宗门传祧',
      toast: '📜 先祖勋业圆满，召集族老传祧立嗣！'
    };
  }

  // 5. 检查段位历史上限与两百年赛季大结卷
  const maxEpoch = (rankCfg && rankCfg.maxHistoricalEpoch) ? rankCfg.maxHistoricalEpoch : 300;
  if (state.year >= maxEpoch) {
    const isSeasonCap = (maxEpoch >= 300);
    const reason = isSeasonCap
      ? '汉魏风骨两百年大业极盛封卷'
      : `宗族门第【${rankCfg ? rankCfg.title : '当前等第'}】时代推演上限封卷（突破需提升段位）`;
    const endData = buildEndgameResult(false, reason, null);
    return {
      seasonEnd: true,
      reason,
      toast: isSeasonCap ? '👑 公元300年！两百年汉魏大卷极盛结卷！' : `📜 门第上限：止于公元${maxEpoch}年！终局清算晋升以破关！`,
      ...endData
    };
  }

  // 6. 获取下一张卡牌
  state.activeCard = getNextSwipeCard(state);

  return {
    dead: false,
    succession: false,
    seasonEnd: false,
    toast: (gambleResult && gambleResult.msg) || opt.toast,
    gambleResult,
    lifelineNotice,
    farmlandNotice,
    chestLootNotice,
    relicNotice,
    triggerClash: (card.clashData && ((direction === 'left' && card.year === 184) || (direction === 'right' && card.year !== 184))) ? card.clashData : null,
    nextCard: state.activeCard,
    year: state.year,
    age: state.age
  };
}

/**
 * 宗门择贤继祧 (传承下一世传人，时间不中断)
 */
function advanceGenerationSuccession(state, heirType = 'eldest') {
  state.dynasticGeneration = (state.dynasticGeneration || 1) + 1;
  state.careerTenureYears = 0;
  state.age = 22; // 下一代年富力强接棒
  state._usedFortressLifeline = false; // 新一代家督恢复坞壁免死庇护
  state._usedExcessLifeline = false;   // 新一代家督恢复明哲保身庇护

  // 世代交替：宗族基业承前启后，削峰填谷，回归稳健中值 (45~60)
  state.meters = state.meters || { grain: 50, force: 50, prestige: 50, wealth: 50, culture: 50 };
  for (const k of ['prestige', 'wealth', 'force', 'grain', 'culture']) {
    const cur = state.meters[k] || 50;
    state.meters[k] = Math.round(50 + (cur - 50) * 0.45);
  }

  // 依据接班人类型微调四维继承盘面
  if (heirType === 'eldest') {
    // 宗门嫡长：守成稳健，声望高
    state.meters.prestige = Math.min(75, state.meters.prestige + 10);
    state.meters.force = Math.max(30, state.meters.force - 5);
  } else if (heirType === 'adoptive') {
    // 过继养子：兵权强盛，武勇
    state.meters.force = Math.min(75, state.meters.force + 10);
    state.meters.prestige = Math.max(30, state.meters.prestige - 5);
  } else {
    // 贤能经商：资财充盈
    state.meters.wealth = Math.min(75, state.meters.wealth + 10);
    state.meters.grain = Math.max(30, state.meters.grain - 5);
  }

  state.activeCard = getNextSwipeCard(state);
  return {
    generation: state.dynasticGeneration,
    year: state.year,
    activeCard: state.activeCard
  };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HAN_WEI_METERS,
    HAN_WEI_CHAPTERS,
    getHanWeiChapter,
    HAN_WEI_SWIPE_CARDS,
    initCardRun,
    getNextSwipeCard,
    resolveCardSwipe,
    advanceGenerationSuccession
  };
}
