/**
 * 华夏世家 · 汉魏风骨（第一赛季）
 * 真实历史名士深度交互剧场 (Historical Figures Interactive Theatre)
 * 让汉魏名宿活起来：有历史场景、有正史性格、有专属名士好感与秘传授受！
 */

const HAN_WEI_FIGURE_THEATRE_EVENTS = [
  // --- 1. 经学宗师 · 郑玄 (127~200) ---
  {
    id: "fig_event_zheng_xuan",
    figureId: "zheng_xuan",
    figureName: "郑玄 (字康成 · 高密大儒)",
    minYear: 160, maxYear: 200,
    title: "📜 高密问礼 · 郑公草庐千生听经",
    scene: "北海高密草庐之内，大儒郑玄讲席前门生故吏坐席数百人。郑公素发童颜，手展《周礼》问难全场：‘何谓以九式均节财用，以九赋敛财贿？’诸生噤声，郑公正目望向你：",
    historicalSource: "《后汉书·卷三十五·郑玄列传第二十五》：‘门人相传数百千人……客居自注群经，天下宗之。’",
    choices: [
      {
        text: "【对答如流 · 详陈九赋与宗族积谷之政】结合坞壁仓廪实践，融汇《周礼》精义",
        statReq: "iq", reqVal: 52,
        outcomeText: "郑玄击案赞曰：‘知经能致用，非腐儒也！’亲书《三礼注》残卷相赠，收为入室弟子！智谋+15，经学声望+20，后世及冠悟性提升！",
        effects: { iq: 15, rep: 20, cultureBonus: 0.15 },
        tag: "高密高足"
      },
      {
        text: "【躬身请益 · 愿资助千金刊印经卷】向郑公讲席捐资万钱，供养寒门求学士子",
        outcomeText: "郑玄叹你厚德乐道，天下学者咸称你族为‘崇文长者’！声望+18，资金-5000，义声传海内。",
        effects: { rep: 18, money: -5000, clean: 10 },
        tag: "尊经乐施"
      }
    ]
  },

  // --- 2. 琴书冠冕 · 蔡邕 (133~192) ---
  {
    id: "fig_event_cai_yong",
    figureId: "cai_yong",
    figureName: "蔡邕 (字伯喈 · 蔡中郎)",
    minYear: 170, maxYear: 192,
    title: "🎵 焦尾之音 · 蔡中郎灶下辨良木",
    scene: "你过访蔡邕府邸，忽闻灶间柴薪爆烈之声异常清越。蔡邕急呼‘此良桐也！’自烈火中抢出焦炭一段，依音剖斫成琴。蔡邕试拂数声，转头问你：‘君识此音否？’",
    historicalSource: "《后汉书·卷六十下·蔡邕列传第五十下》：‘吴人有烧桐以爨者，邕闻火烈之声，知其良木，请而裁为琴，果有美音，而其尾犹焦，故时人名曰焦尾琴。’",
    choices: [
      {
        text: "【静听辨律 · 指出清角商音之妙】以古琴至道剖析琴尾余响之韵",
        statReq: "iq", reqVal: 50,
        outcomeText: "蔡邕大惊引为生平第一知音，当席抚《胡笳》赠饮，更题赠手抄《琴操》一部！才学+15，情商+12，名琴鉴赏力大增！",
        effects: { iq: 15, eq: 12, rep: 15 },
        tag: "千古知音"
      },
      {
        text: "【出言警醒 · 密陈董卓祸乱防身策】私下进言：‘董卓狂暴必取祸，中郎名高，宜潜图避祸！’",
        statReq: "eq", reqVal: 52,
        outcomeText: "蔡邕叹息良久，握手相谢：‘明公至言，吾受董公礼遇深重，身不由己矣！’赠你玉佩为信，情商+15，世交盟约达成！",
        effects: { eq: 15, resilience: 12, rep: 10 },
        tag: "肺腑忠言"
      }
    ]
  },

  // --- 3. 医圣 · 张仲景 (150~219) ---
  {
    id: "fig_event_zhang_zhongjing",
    figureId: "zhang_zhongjing",
    figureName: "张仲景 (长沙太守 · 医圣)",
    minYear: 196, maxYear: 219,
    title: "🌿 伤寒救民 · 长沙堂前坐堂施药",
    scene: "建安二十二年大疫，‘家家有僵尸之痛，室室有号泣之哀’。张仲景虽贵为长沙太守，却开公堂公案为万民切脉。闻你族坞壁有自栽草药，仲景亲步登门：",
    historicalSource: "《张仲景传》：‘感往昔之沦丧，伤横夭之莫救，乃勤求古训，博采众方，作《伤寒杂病论》。’",
    choices: [
      {
        text: "【尽倾坞壁药圃全资襄助】将庄园内全部百亩柴胡、甘草、麻黄悉数无偿献出，共制驱疫汤剂",
        outcomeText: "救活荆襄百姓数万人！张仲景感极泣下，亲授《伤寒金匮真本秘方》！全族大疫抗性翻倍，善德功名满天下！",
        effects: { rep: 30, healthCapBonus: 10, clean: 20 },
        tag: "仁心济世"
      },
      {
        text: "【派族中子弟拜入其门下】挑选聪颖少年三名随仲景学针石辨脉之法",
        outcomeText: "家族从此多了一支悬壶济世的医学名脉，世代免于绝户夭折之险！家族后代健康天花板+15，子嗣存活率暴增！",
        effects: { healthCapBonus: 15, iq: 10, rep: 12 },
        tag: "医道传家"
      }
    ]
  },

  // --- 4. 魏武帝 · 曹操 (155~220) ---
  {
    id: "fig_event_cao_cao",
    figureId: "cao_cao",
    figureName: "曹操 (魏武帝 · 丞相)",
    minYear: 196, maxYear: 220,
    title: "🍷 煮酒相勘 · 曹公击案辨天下名门",
    scene: "许昌相府梅林之下，曹操引你临轩对饮，青梅煮酒。曹操手按倚天剑，忽目光灼灼视你笑曰：‘今天下名门巨族，淮南袁氏已覆，荆州刘表虚名，以卿观之，谁堪共成大业？’",
    historicalSource: "《三国志·卷一·魏书·武帝纪》《三国志·先主传》",
    choices: [
      {
        text: "【盛赞唯才是举 · 誓以部曲粮草尽奉朝廷】‘名门若无实才亦为齑粉，明公唯才是举，方安万民！’",
        statReq: "courage", reqVal: 55,
        outcomeText: "曹操抚掌大笑：‘知孤者，卿也！’当场拜你为典农校尉，赐良田千亩！武略+15，宗族受封公府心腹！",
        effects: { courage: 15, rep: 20, farmlandAcres: 50 },
        tag: "深投魏武"
      },
      {
        text: "【借故自谦 · 巧对治生之策】‘某乃山野寒儒，仅识耕读自安，天下大势惟明公乾纲独断！’",
        statReq: "eq", reqVal: 54,
        outcomeText: "曹操目光微闪，疑心尽释，笑赞‘老成敦厚’。虽未授重兵，但保全宗族不卷入洛阳宫闱险杀。情商+18，心性+15。",
        effects: { eq: 18, resilience: 15, rep: 10 },
        tag: "韬晦脱身"
      }
    ]
  },

  // --- 5. 竹林领袖 · 嵇康 (224~263) ---
  {
    id: "fig_event_ji_kang",
    figureId: "ji_kang",
    figureName: "嵇康 (字叔夜 · 竹林七贤)",
    minYear: 245, maxYear: 263,
    title: "🔨 山阳锻铁 · 柳荫炉畔的广陵散绝唱",
    scene: "山阳柳树之下，嵇康身长七尺八寸，美词气有凤姿，正赤膊挥锤打铁，向秀在旁拉风箱。司马昭亲信钟会乘华轩肥马盛服而至，嵇康挥锤不辍旁若无人。钟会冷视于你：",
    historicalSource: "《晋书·卷四十九·嵇康传》：‘康美姿容，好运锤锻铁……钟会造之，康箕踞而锻，会去，康曰：何所闻而来？何所见而去？会曰：闻所闻而来，见所见而去。’",
    choices: [
      {
        text: "【取瓢酌甘泉奉嵇康】不理会权贵钟会，与嵇康席地长饮，听其抚《广陵散》",
        statReq: "resilience", reqVal: 55,
        outcomeText: "嵇康拂弦大笑，赠你打铁精锻匕首一柄！魏晋风流神采浸润心脾，心性韧性+25，清名传诵士林，傲骨凌云！",
        effects: { resilience: 25, rep: 20, clean: 20 },
        tag: "竹林遗响"
      },
      {
        text: "【两相劝解 · 巧言化解钟会杀机】以言辞舒缓气氛，免致二人结下殊死私仇",
        statReq: "eq", reqVal: 58,
        outcomeText: "钟会脸色稍霁拂袖而去，嵇康虽叹‘多事’，却也免去即刻之祸。情商+20，处世圆融无匹。",
        effects: { eq: 20, resilience: 10, rep: 12 },
        tag: "圆融消弭"
      }
    ]
  }
];

module.exports = {
  HAN_WEI_FIGURE_THEATRE_EVENTS
};
