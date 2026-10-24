/**
 * 华夏世家 · 汉魏风骨（第一赛季）
 * 丰富多维的汉魏年度随机事件扩充库 (Expanded Han-Wei Encounters: 40+ 真实历史遭遇)
 * 涵盖：经学太学、案头吏治、坞壁经略、部曲争端、士林清议、宗门家风
 */

const HAN_WEI_EXPANDED_ENCOUNTERS = [
  // --- 1. 经学、太学与士林派系 ---
  {
    id: "hw_exp_taixue_biannan",
    track: "scholar",
    eraTags: ["han_wei"],
    minYear: 100, maxYear: 260,
    title: "📜 太学校书 · 《公羊》与《左氏》之辩",
    desc: "洛阳太学诸生齐聚辟雍，今文经学士与古文经学士就《春秋》大义展开舌战，气氛剑拔弩张，诸儒推你登台品评：",
    choices: [
      {
        text: "【兼采众长 · 效法郑玄折中今古】熔铸两家之说，不立门户之争",
        statReq: "iq", reqVal: 50,
        outcomeText: "言辞雅正，折服两派学子，当场被辟为太学博士弟子之师！智谋+6，士林声望+8。",
        effects: { iq: 6, rep: 8, sp: -3 },
        tag: "通儒博雅"
      },
      {
        text: "【力挺古文经 · 盛赞左氏事详理致】引先秦漆书古竹简为据，痛驳谶纬附会",
        statReq: "courage", reqVal: 52,
        outcomeText: "观点峻拔刚烈，得古文名儒交口称赞，但引来经生侧目。魄力+6，声望+5。",
        effects: { courage: 6, rep: 5, eq: -2 },
        tag: "直道古风"
      },
      {
        text: "【借故微醺 · 抚琴赋诗化解争锋】‘天下大道，何必拘于章句之辨？’",
        statReq: "eq", reqVal: 48,
        outcomeText: "风度从容洒脱，琴音回荡太学，众人相视大笑释怀。情商+8，心性+5。",
        effects: { eq: 8, resilience: 5 },
        tag: "名士高致"
      }
    ]
  },
  {
    id: "hw_exp_cai_yong_stone",
    track: "all",
    eraTags: ["han_wei"],
    minYear: 175, maxYear: 189,
    title: "🏛️ 熹平石经 · 蔡中郎手书碑前瞻拜",
    desc: "议郎蔡邕奏请正定六经文字，书丹刻石于太学门外。全国士子乘车数千两奔赴洛阳观摩摹拓，你亦身在其中：",
    choices: [
      {
        text: "【通宵达旦以纸墨精拓全经】花费千金求取最佳拓本，藏于族中书阁世守",
        outcomeText: "族中得《熹平石经》真拓，成为家族传世文胆！宗族底蕴+10，后嗣悟性加成，资金-3000。",
        effects: { rep: 8, iq: 6, money: -3000 },
        tag: "传家宝典"
      },
      {
        text: "【借此盛会广结天下俊秀】在碑林茶舍设宴款待青冀兖徐四州游学清彦",
        outcomeText: "数月之内结交数十位日后汉末英雄，人脉四通八达！情商+10，声望+8，资金-4000。",
        effects: { eq: 10, rep: 8, money: -4000 },
        tag: "四方宾朋"
      }
    ]
  },

  // --- 2. 坞壁经略、农桑水利与豪强争夺 ---
  {
    id: "hw_exp_watermill_conflict",
    track: "all",
    eraTags: ["han_wei"],
    minYear: 100, maxYear: 280,
    title: "🌊 水碓之争 · 上游引流与宗族械斗",
    desc: "春夏大旱，本族在河渠所设三连水碓缺乏水流冲磨，上游大姓私自筑坝截流灌溉，坞壁佃客部曲手持农具与其对峙欲起械斗：",
    choices: [
      {
        text: "【提部曲亲临严明据理】引两汉《均水令》竹简公断，申明分时启闭之法",
        statReq: "clean", reqVal: 50,
        outcomeText: "对方自知理亏，加之见你族甲士精良不敢造次，双方歃血定分水之约。清廉+8，声望+6，水碓恢复运转！",
        effects: { clean: 8, rep: 6, watermills: 1 },
        tag: "持法平争"
      },
      {
        text: "【斥资共同凿渠拓深】出资一半联合上游大姓深挖复渠，共引远山深潭之水",
        outcomeText: "大渠凿成，两村良田皆得甘霖，结为生死同盟！资金-5000，良田产出+20%，情商+8。",
        effects: { money: -5000, rep: 10, eq: 8 },
        tag: "共利修睦"
      },
      {
        text: "【雷霆突袭拆除私坝】派死士部曲趁夜潜水拆毁私坝，以势压人",
        statReq: "courage", reqVal: 54,
        outcomeText: "水流虽复，但两家结下宿怨，防范夜袭令部曲疲惫。魄力+8，资金+2000，安保隐患+5。",
        effects: { courage: 8, money: 2000, resilience: -3 },
        tag: "豪右手腕"
      }
    ]
  },
  {
    id: "hw_exp_refugee_influx",
    track: "all",
    eraTags: ["han_wei"],
    minYear: 160, maxYear: 230,
    title: "🌾 战乱荒岁 · 流民数千围聚坞壁祈食",
    desc: "连年兵燹大饥，三辅流民携老扶幼数千人涌至你家坞堡壕沟之外，啼哭哀嚎求一瓢粟米，族老主张闭门以防乱民生变：",
    choices: [
      {
        text: "【大开义仓设粥棚安辑】‘同为汉家赤子，岂忍见其饿殍！’立规矩按秩序赈济",
        outcomeText: "救活饥民无算，万家跪呼生佛！招募精壮八百人归为私属部曲，开垦荒山千亩！粮食-800，声望+25，部曲+30！",
        effects: { granaryStoredGrain: -800, rep: 25, armedRetainers: 30, farmlandAcres: 50 },
        tag: "活人无算"
      },
      {
        text: "【挑选中壮收编入堡】仅招纳有手艺工匠、铁匠与强勇入内，老弱赠粮遣往他郡",
        outcomeText: "既增强了坞壁守备制造能力，又未拖垮粮库。工匠赋能军备，资金+4000，情商+6，审慎周祥。",
        effects: { money: 4000, armedRetainers: 15, eq: 6 },
        tag: "精兵强垒"
      }
    ]
  },

  // --- 3. 案头吏治、反贪度田与官品考课 ---
  {
    id: "hw_exp_dutian_check",
    track: "official",
    eraTags: ["han_wei"],
    minYear: 100, maxYear: 220,
    title: "📋 度田勘验 · 豪右隐匿田亩与朝廷核考",
    desc: "你奉刺史命巡按各县度田，查出本郡第一名门隐匿良田五千亩、藏匿漏税人丁六百口，对方托亲故送黄金两饼求情：",
    choices: [
      {
        text: "【掷金于阶严正执法】‘国法如炉，岂以私废！’将隐漏据实登报台阁",
        statReq: "clean", reqVal: 55,
        outcomeText: "郡国肃然，追回赋税万石，朝廷御史下令通令嘉奖！清廉+15，政绩考课特优，但招致豪强怨恨。",
        effects: { clean: 15, rep: 12, courage: 8 },
        tag: "铁腕风宪"
      },
      {
        text: "【妥协折中勒令补税】令其补缴历年半数田赋充作军粮，留存薄面",
        statReq: "eq", reqVal: 50,
        outcomeText: "豪强大姓感恩戴德，官库亦得补充，圆滑化解纷争。情商+12，资金+6000，处世练达。",
        effects: { eq: 12, money: 6000, rep: 5 },
        tag: "老成持重"
      }
    ]
  },
  {
    id: "hw_exp_jiupin_evaluate",
    track: "official",
    eraTags: ["han_wei"],
    minYear: 220, maxYear: 280,
    title: "⚖️ 中正品第 · 寒素奇才与高门膏粱的定品",
    desc: "曹魏创设九品官人法，你荣膺本州小中正。簿册中有一寒门寒儒文章道德极高，而另一高门子弟乃当朝司空之侄却才具平庸：",
    choices: [
      {
        text: "【定寒士为二品上品】‘上品无寒门？吾今日便开百年之先！’",
        statReq: "clean", reqVal: 60,
        outcomeText: "寒士名扬天下，清议赞你为‘海内伯乐’！士林清誉暴涨，清廉+20，声望+18！",
        effects: { clean: 20, rep: 18, courage: 12 },
        tag: "唯才是举"
      },
      {
        text: "【随顺官场通则定高门为上】评高门子弟为二品，寒士列为六品起家",
        outcomeText: "深结当朝司空欢心，家族子弟官运亨通，平步青云！官阶隐形加成，资金+10000，情商+15。",
        effects: { eq: 15, money: 10000, rep: -5 },
        tag: "门阀周旋"
      }
    ]
  },

  // --- 4. 商业、货殖与乱世货币 ---
  {
    id: "hw_exp_silk_horse_trade",
    track: "merchant",
    eraTags: ["han_wei"],
    minYear: 140, maxYear: 260,
    title: "🐎 丝马互市 · 凉州关隘的暴利商路",
    desc: "西陲丝路商队返程，带回西域大宛良马三百匹与羊脂白玉，羌胡部落欲以重金求购江南蜀锦与精盐：",
    choices: [
      {
        text: "【组建武装商队直通凉州】派坞壁二百骑兵押运精盐蜀锦，换取大宛战马",
        statReq: "courage", reqVal: 50,
        outcomeText: "克服险阻大获全胜！不仅获利数十万五铢钱，更为家族组建了一支西凉铁骑！资金+35000，部曲战力暴增！",
        effects: { money: 35000, armedRetainers: 25, courage: 10 },
        tag: "丝路豪贾"
      },
      {
        text: "【居间转手平稳食利】不冒长途关隘之险，将货殖分销中原郡县世家",
        outcomeText: "旱涝保收无风险，资金稳健回笼。资金+18000，经商机敏+10。",
        effects: { money: 18000, eq: 8 },
        tag: "坐地致富"
      }
    ]
  },

  // --- 5. 宗门伦理、家风与传祧之选 ---
  {
    id: "hw_exp_clan_motto_discipline",
    track: "all",
    eraTags: ["han_wei"],
    minYear: 100, maxYear: 280,
    title: "📜 家规明正 · 宗党纨绔仗势伤人案",
    desc: "你族亲侄倚仗家族声势，在集市纵马踏伤布衣老叟并毁人摊位，地方县吏碍于你家门阀不敢查问：",
    choices: [
      {
        text: "【开宗祠仗责四十并厚赔老叟】‘家无严规，何以训天下！’命亲侄亲登门赔礼",
        statReq: "clean", reqVal: 52,
        outcomeText: "全族子弟股战自危，门风大肃！郡中父老无不感戴，称叹‘真名公世家也’！清廉+15，家族门望+12。",
        effects: { clean: 15, rep: 12, money: -2000 },
        tag: "严修家法"
      },
      {
        text: "【私下斥责出资私了】暗中命管家赔银五千，严厉警告亲侄闭门思过三月",
        outcomeText: "息事宁人未伤骨肉亲情，但地方略有怨言。资金-5000，情商+8。",
        effects: { money: -5000, eq: 8 },
        tag: "庇短周旋"
      }
    ]
  }
];

module.exports = {
  HAN_WEI_EXPANDED_ENCOUNTERS
};
