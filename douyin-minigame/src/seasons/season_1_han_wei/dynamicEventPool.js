/**
 * 华夏世家 · 汉魏风骨（第一赛季）
 * 动态涌现叙事事件池 (Dynamic Emergent Narrative Event Pool)
 * 
 * 核心机制：
 * 1. 彻底废弃死板的【固定年份硬编码 (year === yr)】；
 * 2. 采用【多维状态匹配 + 张力评估 + 因果印记 (Karma Tags)】动态激发；
 * 3. 涵盖：坞壁危机、门风家法、官场风骨、地域地缘、因果回响五大动态领域！
 */

const HAN_WEI_DYNAMIC_EVENT_POOL = [
  // ========================================================
  // 一、坞壁庄园与资源张力事件 (Tension: 粮食、部曲、良田、财富失衡)
  // ========================================================
  {
    id: "dyn_grain_rich_bandits",
    category: "manor_tension",
    title: "〔 戎 〕 粮充兵薄 · 乱世流寇窥伺坞壁",
    desc: "连年荒旱，周边数县民不聊生。本族义仓存粮数千石，然而庄园中持械部曲不足抵挡大队。黑山贼余部数千人探得虚实，夜间已至坞壁十里外扎营，扬言借粮万石，否则天明破堡：",
    historicalSource: "《三国志·卷十八·魏书·李通传》《后汉书·皇甫嵩传》",
    trigger: {
      grainMin: 400,
      retainersMax: 35,
      dangerClimate: ["war", "chaos", "famine"]
    },
    choices: [
      {
        text: "【开仓施粮三成，分化招安其精壮】‘盗亦饥民，施以粮粥并募其骁勇为家兵！’",
        statReq: "eq", reqVal: 52,
        outcomeText: "贼首感佩，部众分裂，其精壮数百人当场倒戈受编为本族部曲！粮食-300，部曲+30，声望+15！",
        effects: { granaryStoredGrain: -300, armedRetainers: 30, rep: 15 },
        addKarmaTags: ["merciful_lord", "reformed_bandits"],
        tag: "恩威并施"
      },
      {
        text: "【急召邻近豪族，歃血合围破贼】点燃烽火，联络通家大姓坞壁，约定前后夹攻",
        statReq: "courage", reqVal: 50,
        outcomeText: "两族骑兵夜袭贼营，大破流寇！缴获辎重无数，两家结为异姓同盟！部曲战力提升，资金+6000！",
        effects: { money: 6000, rep: 12, courage: 8 },
        addKarmaTags: ["allied_with_neighbors"],
        tag: "合纵破强"
      },
      {
        text: "【固守坞堡放箭滚木，闭门不纳】凭深壕高垒坚守，消耗其锐气",
        statReq: "resilience", reqVal: 48,
        outcomeText: "贼军攻城三日不克，死伤甚众仓皇退走。庄园外围农田水碓虽遭破坏，但核心根基未损。粮食-100，心性+10。",
        effects: { granaryStoredGrain: -100, resilience: 10, fortressLevel: 1 },
        tag: "深壁拒敌"
      }
    ]
  },
  {
    id: "dyn_arms_heavy_arrogant",
    category: "manor_tension",
    title: "〔 案 〕 部曲跋扈 · 强勇家将侵夺邻田案",
    desc: "本族近年来招募流民勇壮，部曲精悍雄冠本郡。然而近日部曲队长仗势跋扈，私自跨界占夺邻近寒门耕地，更殴伤县衙差役。县令敢怒不敢言，状纸递至宗祠案头：",
    historicalSource: "《后汉书·卷七十七·酷吏列传·董宣传》",
    trigger: {
      retainersMin: 50
    },
    choices: [
      {
        text: "【依汉律斩首枭示，亲向县衙赔礼】‘家兵仗势，罪在宗主！’斩杀带头恶兵，退还原田并厚赔",
        statReq: "clean", reqVal: 55,
        outcomeText: "部曲肃然无不股战，全郡士民震撼交口赞颂！洛阳公卿称你族‘有古良将严法家风’！清廉+20，士林声望+18，部曲-5。",
        effects: { clean: 20, rep: 18, armedRetainers: -5, money: -3000 },
        addKarmaTags: ["strict_house_law", "upright_magistrate"],
        tag: "大义严法"
      },
      {
        text: "【杖责家将三十，出资买断争端田产】将争端土地以市价三倍买下赠与部曲安家，并赠银安抚原主",
        outcomeText: "既保全了麾下强勇的效忠之心，又平息了官司。部曲死命相随，资金-8000，情商+12。",
        effects: { money: -8000, armedRetainers: 10, eq: 12 },
        addKarmaTags: ["indulgent_chieftain"],
        tag: "厚抚家丁"
      }
    ]
  },
  {
    id: "dyn_drought_watermill_clash",
    category: "manor_tension",
    title: "🌊 伏旱争流 · 渠堰分水与同郡宗族大衅",
    desc: "六月大旱赤地千里，流经本族庄园的河水断流大半。下游另一豪族大姓带数百族人，持械堵塞本族水碓进水口，欲强引全河之水灌溉其私田：",
    historicalSource: "《水经注·叶榆水注》《两汉均水令》",
    trigger: {
      watermillsMin: 1
    },
    choices: [
      {
        text: "【升堂辩水 · 引汉家《均水令》竹简公决】请郡丞与三老临河，依地亩均分昼夜水额",
        statReq: "iq", reqVal: 50,
        outcomeText: "言辞据理守法，郡丞当场判定各占半流，对方自惭撤兵。智谋+10，清廉+12，免除流血之祸！",
        effects: { iq: 10, clean: 12, rep: 8 },
        addKarmaTags: ["law_abiding_clan"],
        tag: "依法公断"
      },
      {
        text: "【兴造水车翻车，提引深井泉水】不与争锋，令百工连夜赶制翻水木龙，汲取坞壁深井之泉",
        statReq: "resilience", reqVal: 52,
        outcomeText: "巧匠精造龙骨翻车，庄园禾苗青青郁郁，神技引得四方惊叹！资金-4000，格物造诣+15，心性+10！",
        effects: { money: -4000, iq: 12, resilience: 10, techBonus: 0.1 },
        tag: "格物化难"
      }
    ]
  },

  // ========================================================
  // 二、门风家道与名望博弈事件 (Tension: 声望极高、财富见底、嫡庶之争)
  // ========================================================
  {
    id: "dyn_merchant_buys_recommendation",
    category: "clan_honor",
    title: "🪙 巨贾奉金 · 重资求取郡国察举书",
    desc: "本族士林清誉名动海内，然近期营建水利与藏书，宗族公积银钱告急。洛阳大盐商携黄金百斤、西域宝马十匹夜访，乞求以巨资为愚钝庶子买一封辟召孝廉的荐书：",
    historicalSource: "《后汉书·卷七十八·宦者列传》《潜夫论·考绩篇》",
    trigger: {
      reputeMin: 65,
      capitalMax: 8000
    },
    choices: [
      {
        text: "【严词拒之 · 掷金于门】‘吾族累世传经，岂以名器市铜臭！速去，勿污我门！’",
        statReq: "clean", reqVal: 58,
        outcomeText: "富贾惶恐而退，此事为太学生所知，天下赞颂‘清骨如霜雪’！清廉+25，声望+20，心性+15！",
        effects: { clean: 25, rep: 20, resilience: 15 },
        addKarmaTags: ["unbribable_scholar", "hated_by_merchants"],
        tag: "冰壶秋月"
      },
      {
        text: "【折中接纳 · 考其才艺引为商行执事】不与孝廉官身，但纳其黄金，聘其子为家族商队襄理",
        statReq: "eq", reqVal: 52,
        outcomeText: "既解宗族燃眉之急，又未损官箴名望，商队多了一员得力干将！资金+25000，情商+12，经商利润翻倍！",
        effects: { money: 25000, eq: 12, tradeSuccessBonus: 0.2 },
        addKarmaTags: ["pragmatic_clan"],
        tag: "经纬兼利"
      }
    ]
  },
  {
    id: "dyn_succession_conflict_dilemma",
    category: "clan_honor",
    title: "〔 宗 〕 宗祠争祧 · 嫡长文弱 vs 庶幼骁勇之争",
    desc: "族中承平日久，宗主年迈。嫡长子沉湎清谈五石散，体质孱弱无治家之能；庶出少子却精研弓马律令，深得部曲将校拥戴。宗族长老大会上，各房叔祖争执不下：",
    historicalSource: "《三国志·魏书·袁绍传》《颜氏家训·治家篇》",
    trigger: {
      clanAgeMin: 40
    },
    choices: [
      {
        text: "【恪守周礼宗法 · 立嫡长子】‘礼不可废，长幼失序必招大乱！’以贤辅佐长子管家",
        statReq: "clean", reqVal: 50,
        outcomeText: "宗族宗法森严，高门世族交口称善；庶少子虽郁郁，但宗门大统平稳延续。清廉+10，声望+8，家风端严。",
        effects: { clean: 10, rep: 8, resilience: 6 },
        addKarmaTags: ["orthodox_succession"],
        tag: "正统礼法"
      },
      {
        text: "【破除陈腐立贤能 · 密立庶少子】‘当今天下大乱，唯强干者方能庇佑合族！’",
        statReq: "courage", reqVal: 55,
        outcomeText: "少子继任后大刀阔斧整肃坞壁，部曲战力大进，商贾财货日盛！部曲+20，资产+15000，但引来保守名儒微词。",
        effects: { armedRetainers: 20, money: 15000, courage: 12, rep: -6 },
        addKarmaTags: ["merit_first_succession"],
        tag: "唯贤更弦"
      }
    ]
  },

  // ========================================================
  // 三、地域地缘专属风云 (Geo-Spatial Factors)
  // ========================================================
  // 1. 西北边塞（凉州、陇西、陕西、甘肃）
  {
    id: "dyn_region_northwest_silk_ambush",
    category: "geo_regional",
    title: "🐫 丝路胡尘 · 大宛马队遭西羌哨骑伏击",
    desc: "西陲天高气寒，本族往返安息与大宛的珍宝丝马商队，在祁连山峡谷突遭西羌叛军游骑合围，数十车蜀锦与百匹良马危在旦夕：",
    historicalSource: "《后汉书·卷八十七·西羌传第七十七》《汉书·赵充国传》",
    trigger: {
      regionTypes: ["northwest", "border"],
      provinces: ["陕西", "甘肃", "宁夏", "青海", "新疆"]
    },
    choices: [
      {
        text: "【亲督铁骑两百，疾驰出关解围】携连弩快骑星夜兼程，直扑峡谷两翼",
        statReq: "courage", reqVal: 54,
        outcomeText: "弩箭如雨射杀羌酋，斩首百余级！救下全部商队良马，威震陇右，羌胡部落闻名胆寒！资金+30000，部曲+25，武略大著！",
        effects: { money: 30000, armedRetainers: 25, courage: 15 },
        addKarmaTags: ["western_border_guardian"],
        tag: "塞外雄威"
      },
      {
        text: "【遣通事携重茶锦帛，歃血议和互市】以茶马互利之策招抚部落，相约共保商路",
        statReq: "eq", reqVal: 52,
        outcomeText: "化干戈为玉帛，羌胡部落首领感佩，反遣勇士充当商队保镖，辟通千里商道！资金+18000，情商+15，西陲太平。",
        effects: { money: 18000, eq: 15, tradeSuccessBonus: 0.3 },
        addKarmaTags: ["frontier_peacemaker"],
        tag: "和戎通商"
      }
    ]
  },
  // 2. 中原腹地（河南、山东、河北、安徽）
  {
    id: "dyn_region_central_taixue_qingyi",
    category: "geo_regional",
    title: "〔 宗 〕 洛下清议 · 太学生三万联署与权奸对峙",
    desc: "洛阳南宫之外，太学生三万人拥堵御道，抗议中官擅权卖官鬻爵。领袖郭泰、贾彪持公车上书竹简，亲临你族中原别馆，恳请名门列名领衔：",
    historicalSource: "《后汉书·卷六十七·党锢列传·郭泰贾彪》",
    trigger: {
      regionTypes: ["central_plains"],
      provinces: ["河南", "山东", "河北", "安徽", "江苏"]
    },
    choices: [
      {
        text: "【取朱砂大笔，名列联署卷首】‘天下清议所寄，吾族焉能自甘喑默！’",
        statReq: "courage", reqVal: 56,
        outcomeText: "天下士子狂呼欢跃，名声响遏两京！士林推你为‘八俊’之首！清廉+25，声望+30，但中官密牒已将你族列为眼中钉。",
        effects: { clean: 25, rep: 30, courage: 15 },
        addKarmaTags: ["leader_of_qingyi", "targeted_by_eunuchs"],
        tag: "主盟清议"
      },
      {
        text: "【暗中资助千金膏火，不具名以远祸】倾囊资助学子饮食纸墨，自身引退幕后",
        outcomeText: "学子感佩你族厚德，既获清流拥戴，又免去了诏狱直接抄捕之祸。资金-5000，情商+15，声望+15。",
        effects: { money: -5000, eq: 15, rep: 15, resilience: 10 },
        addKarmaTags: ["covert_patron"],
        tag: "阴德长荫"
      }
    ]
  },
  // 3. 江南水乡（浙江、江苏、江西、湖北、湖南、广东）
  {
    id: "dyn_region_south_shanyue_raid",
    category: "geo_regional",
    title: "🚣 江东烽火 · 山越宗贼夜袭沿江庄园",
    desc: "江左水网纵横，山林深阻。数千山越宗贼乘艨艟轻舟，持竹枪火把逆流而上，趁水汛合围你族沿江稻田与水碓工坊：",
    historicalSource: "《三国志·吴书·贺齐传》《江表传》",
    trigger: {
      regionTypes: ["south_river"],
      provinces: ["浙江", "江苏", "江西", "湖北", "湖南", "广东", "福建"]
    },
    choices: [
      {
        text: "【引水灌壕断其归路 · 艨艟连弩反击】决开上游蓄水，诱其入浅滩，战船万矢齐发",
        statReq: "courage", reqVal: 52,
        outcomeText: "水淹贼舟生擒其帅，俘获劳动力千人，令其开山垦荒，江东基业固若金汤！武略+12，良田+60亩，部曲+20！",
        effects: { courage: 12, farmlandAcres: 60, armedRetainers: 20 },
        addKarmaTags: ["shanyue_conqueror"],
        tag: "水战折寇"
      },
      {
        text: "【许以食盐铁器 · 招募其渠帅为庄园外护】派名士过江谈判，封其为山林大客",
        statReq: "eq", reqVal: 50,
        outcomeText: "山越首领誓死效忠，江左山林特产与良木源源不断运入庄园，两得其便！资金+12000，情商+12，商贸大盛！",
        effects: { money: 12000, eq: 12, tradeSuccessBonus: 0.25 },
        addKarmaTags: ["shanyue_blood_brother"],
        tag: "羁縻抚纳"
      }
    ]
  },

  // ========================================================
  // 四、历史因果长线回响 (Karma Tags Driven Events)
  // ========================================================
  {
    id: "karma_echo_targeted_by_eunuchs",
    category: "karma_echo",
    title: "🚨 宿怨骤发 · 缇骑按籍大搜捕回响",
    desc: "因你族当年曾【主盟清议/直抗权奸】，中官常侍在天子面前构陷你族私铸钱币、聚啸乡党，东厂前身禁军校尉带百骑突袭庄园：",
    historicalSource: "《后汉书·卷七十八·宦者列传》《资治通鉴》",
    trigger: {
      requiresKarma: ["targeted_by_eunuchs", "leader_of_qingyi"]
    },
    choices: [
      {
        text: "【四方同盟名门齐上奏本相救】汝南袁氏、颍川荀氏等数十高门连名担保，震慑中官",
        statReq: "rep", reqVal: 75,
        outcomeText: "满朝公卿皆执象笏伏地力争，天子只得收回成命并斥退宦官！你族声望臻于顶峰！声望+25，心性+20！",
        effects: { rep: 25, resilience: 20, clean: 15 },
        removeKarmaTags: ["targeted_by_eunuchs"],
        addKarmaTags: ["untouchable_nobility"],
        tag: "名门共保"
      },
      {
        text: "【出示当年先帝赐封铁券自证】庄严开正门迎校尉，捧读先祖御赐匾额与功勋账目",
        statReq: "clean", reqVal: 60,
        outcomeText: "校尉见你族清廉如水、民望极深，不敢造次，叩首告辞。清白之名再显于朝！清廉+18，魄力+10。",
        effects: { clean: 18, courage: 10 },
        removeKarmaTags: ["targeted_by_eunuchs"],
        tag: "光明磊落"
      }
    ]
  },
  {
    id: "karma_echo_reformed_bandits_save_clan",
    category: "karma_echo",
    title: "🛡️ 昔年善因 · 乱军围堡时的倒戈救主",
    desc: "天下大乱军阀混战，一股数千乱军合围你家坞壁，危急关头，乱军阵前先锋将领忽见坞堡上高悬的族徽，飞马出阵，翻身下拜：",
    historicalSource: "《三国志·卷一·魏书·武帝纪》《后汉书·李通传》",
    trigger: {
      requiresKarma: ["merciful_lord", "reformed_bandits"]
    },
    choices: [
      {
        text: "【认出当年所收饥民义子】‘今日恩公有难，某率本部精兵誓死保卫庄园！’",
        outcomeText: "乱军先锋当场倒戈，杀散劫掠乱兵！当年开仓种下的仁善之花，今日救得合族性命！部曲+40，粮草缴获无算，家门大吉！",
        effects: { armedRetainers: 40, granaryStoredGrain: 500, money: 15000, rep: 20 },
        addKarmaTags: ["divine_protection"],
        tag: "恩泽无极"
      }
    ]
  }
];

module.exports = {
  HAN_WEI_DYNAMIC_EVENT_POOL
};
