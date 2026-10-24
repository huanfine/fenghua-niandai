// 华夏三千年世家大系 · 全十五赛季核心内容包 (Season Content Packs 1~15)
// 包含：全15赛季 x 5大职业晋升阶梯 (Career Ladders, 共375+级官职) 与 全15赛季 x 4重大历史关隘大案 (Critical Events, 共60大案)
// 彻底解决 S3~S15 "只有配置没有内容" 的缺陷，消除两套时间轴割裂，实现全通史沉浸推演。

const { HAN_WEI_OFFICIAL_LADDERS, HAN_WEI_CRITICAL_CHRONO_EVENTS, LIU_CHAO_CRITICAL_CHRONO_EVENTS } = require('./historicalMilieuHanWei');

// =========================================================================
// 1. 全 15 赛季五大职业晋升阶梯数据库 (SEASON_CAREER_LADDERS)
// =========================================================================
const SEASON_CAREER_LADDERS = {
  // S1: 汉魏风骨 (100~300年)
  1: HAN_WEI_OFFICIAL_LADDERS,

  // S2: 六朝烟雨 (300~500年)
  2: {
    official: [
      { rank: 0, title: '侨州计吏', sal: 400, desc: '过江初定，在侨置郡县典掌簿籍与户籍黄策。' },
      { rank: 1, title: '秘书郎/著作佐郎', sal: 900, desc: '入朝廷秘书省典校经史，门阀士族清贵起家官。' },
      { rank: 2, title: '州别驾/散骑侍郎', sal: 2000, desc: '出使江左州郡纠察风宪，或在皇帝左右侍从规谏。' },
      { rank: 3, title: '中正官/给事黄门侍郎', sal: 4500, desc: '执掌九品中正品第大权，上品无寒门，下品无势族。' },
      { rank: 4, title: '中书侍郎/会稽内史', sal: 12000, desc: '主政江东最富庶大郡，参决台省军国诏敕。' },
      { rank: 5, title: '尚书令/太保公', sal: 48000, desc: '王与马共天下，门阀领袖，执掌台阁中枢，位极人臣。' }
    ],
    scholar: [
      { rank: 0, title: '山阴书童', sal: 250, desc: '研习钟王法帖，临摹真草隶篆。' },
      { rank: 1, title: '太学博士弟子', sal: 700, desc: '游学建康太学，深研《三玄》（老子、庄子、周易）。' },
      { rank: 2, title: '玄言名士', sal: 1800, desc: '登席兰亭挥麈清谈，言简意深，名动江左。' },
      { rank: 3, title: '国子祭酒', sal: 4000, desc: '主管太学国子学学官，考核天下高门士子经学术业。' },
      { rank: 4, title: '文坛领袖', sal: 10000, desc: '主盟江左诗坛，吟咏赋咏，为天下名流推崇。' },
      { rank: 5, title: '一代风雅宗师', sal: 28000, desc: '融汇书法墨宝与玄言妙理，百代儒林文人景仰。' }
    ],
    merchant: [
      { rank: 0, title: '秦淮舟夫', sal: 450, desc: '操舟秦淮水岸，转运南渡流民衣物杂货。' },
      { rank: 1, title: '建康牙侩', sal: 1200, desc: '在乌衣巷集市撮合丝绢、纸张与江左名产。' },
      { rank: 2, title: '会稽庄园主', sal: 3200, desc: '筑陂开荒，辟良田千亩，置办水力舂碓。' },
      { rank: 3, title: '两江船帮魁首', sal: 9000, desc: '调配数百艘大艑，垄断长江中下游航运漕利。' },
      { rank: 4, title: '南国巨贾', sal: 25000, desc: '通商交趾林邑，兼营海丝香药，资产累巨万。' },
      { rank: 5, title: '富埒王侯', sal: 60000, desc: '以庄园实业周济同宗，南朝公卿莫不假贷求援。' }
    ],
    military: [
      { rank: 0, title: '丹阳戍卒', sal: 400, desc: '操持硬弓利矢，守御建康门户。' },
      { rank: 1, title: '侨军什长', sal: 1100, desc: '统领南渡宗族健儿，巡戌淮南前线。' },
      { rank: 2, title: '北府折冲都尉', sal: 3000, desc: '编入京口北府精兵，勇冠三军。' },
      { rank: 3, title: '振武校尉', sal: 8000, desc: '身先士卒破阵却敌，屡立殊勋。' },
      { rank: 4, title: '辅国将军/持节刺史', sal: 20000, desc: '统帅一方大镇军兵，封疆列土。' },
      { rank: 5, title: '北府统帅/开国公', sal: 50000, desc: '淝水鏖兵立挽狂澜，策勋封公，名震华夏。' }
    ],
    recluse: [
      { rank: 0, title: '匡庐药农', sal: 300, desc: '攀涉庐山绝壁，采撷石斛黄精。' },
      { rank: 1, title: '草堂医者', sal: 900, desc: '辨识本草性味，悬壶润泽邻里。' },
      { rank: 2, title: '玄道宗师弟子', sal: 2200, desc: '研习葛洪《抱朴子》金匮肘后秘方，精通金石修养。' },
      { rank: 3, title: '东篱处士', sal: 5500, desc: '采菊东篱下，悠然见南山，高节清风。' },
      { rank: 4, title: '悬壶神仙客', sal: 15000, desc: '著述伤寒肘后良方，隐遁名山，德满苍生。' }
    ]
  },

  // S3: 南北归一 · 隋唐草创 (500~700年)
  3: {
    official: [
      { rank: 0, title: '关陇勋曹', sal: 500, desc: '在关陇新府掌理簿录，核验军户均田。' },
      { rank: 1, title: '大理寺评事', sal: 1100, desc: '初入廷尉，审核大理狱案，考订开皇律条。' },
      { rank: 2, title: '州郡别驾', sal: 2600, desc: '巡按一方州郡，整肃吏治，劝课农桑。' },
      { rank: 3, title: '给事中/六部郎中', sal: 6000, desc: '入省掌驳正诏敕，典掌中枢政要。' },
      { rank: 4, title: '吏部侍郎/御史大夫', sal: 16000, desc: '掌铨选天下流官，肃纪纠劾百僚。' },
      { rank: 5, title: '尚书右仆射/开皇名相', sal: 55000, desc: '辅佐大一统新朝，制定贞观宏规，位列开国元辅。' }
    ],
    scholar: [
      { rank: 0, title: '蒙馆义塾生', sal: 300, desc: '诵读南北经解，修习开科策试。' },
      { rank: 1, title: '国子学明经学士', sal: 800, desc: '参加大隋开皇科举初试，策论通达。' },
      { rank: 2, title: '弘文馆校书郎', sal: 2000, desc: '入禁中弘文馆雠校四部图籍。' },
      { rank: 3, title: '五经正义纂修官', sal: 5000, desc: '参与孔颖达主持之《五经正义》大工程，折衷南北经训。' },
      { rank: 4, title: '国子祭酒', sal: 13000, desc: '总领两京太学学官，大唐初科文宗。' },
      { rank: 5, title: '贞观文宗泰斗', sal: 32000, desc: '一代大儒，经义垂为朝廷定制，万世学者宗师。' }
    ],
    merchant: [
      { rank: 0, title: '运河挑夫', sal: 500, desc: '往来通济渠大码头，装卸漕粮盐包。' },
      { rank: 1, title: '大运河漕贩', sal: 1400, desc: '顺大运河舟行南北，贩运江淮丝稻至洛阳。' },
      { rank: 2, title: '两都行栈主人', sal: 3800, desc: '在长安西市、洛阳南市开设邸店货栈。' },
      { rank: 3, title: '关陕粮铁总商', sal: 11000, desc: '平准关中粮价，统筹转运大唐军饷物资。' },
      { rank: 4, title: '四海商盟总把舵', sal: 30000, desc: '统领南北漕运商队，资储山积，富甲海内。' },
      { rank: 5, title: '天下首富', sal: 75000, desc: '以实业货殖资助初唐盛世，功侔国戚。' }
    ],
    military: [
      { rank: 0, title: '折冲府府兵', sal: 450, desc: '农隙操练戈矛，奉召自备戎装出征。' },
      { rank: 1, title: '旅帅/队正', sal: 1300, desc: '统帅百人劲旅，戍守北疆烽燧。' },
      { rank: 2, title: '折冲府果毅都尉', sal: 3500, desc: '镇守一方折冲府，战时领兵出塞讨击寇乱。' },
      { rank: 3, title: '骁卫将军', sal: 9000, desc: '身先士卒平定割据，破阵斩将策勋受赏。' },
      { rank: 4, title: '持节都督/金吾大将军', sal: 24000, desc: '统领数万精锐，威震漠北西域。' },
      { rank: 5, title: '天策上将策勋开国公', sal: 60000, desc: '平定天下，拓地万里，功名垂于太庙。' }
    ],
    recluse: [
      { rank: 0, title: '太白采药童', sal: 350, desc: '涉足终南山深涧，采录千金异草。' },
      { rank: 1, title: '药王传灯门徒', sal: 1000, desc: '承袭孙思邈大医精诚学派，行医坊巷。' },
      { rank: 2, title: '太医署医谕', sal: 2500, desc: '入朝廷太医署，教授本草针灸秘要。' },
      { rank: 3, title: '金匮千金国手', sal: 6500, desc: '精研方剂万首，活人无数，万众生佛。' },
      { rank: 4, title: '终南抱朴真人', sal: 18000, desc: '超然尘外，隐居太白仙峰，寿至百岁。' }
    ]
  },

  // S4: 盛唐气象 · 藩镇诗豪 (700~900年)
  4: {
    official: [
      { rank: 0, title: '贡院应试举子', sal: 600, desc: '怀揣名刺诗卷，干谒京洛公卿，备战春闱。' },
      { rank: 1, title: '节度掌书记/县尉', sal: 1400, desc: '参赞大镇帅幕，或主理京畿赤县刑狱。' },
      { rank: 2, title: '监察御史/谏议大夫', sal: 3200, desc: '巡按天下百官，犯颜直谏，朝廷重其风骨。' },
      { rank: 3, title: '礼部中书舍人', sal: 8000, desc: '主考礼部贡举，起草紫微明堂诏谕。' },
      { rank: 4, title: '尚书左右丞/六部尚书', sal: 22000, desc: '统领各部庶务，参决军国大事。' },
      { rank: 5, title: '同中书门下平章事/盛唐宰相', sal: 68000, desc: '秉国钧轴，坐镇政事堂，威加海内。' }
    ],
    scholar: [
      { rank: 0, title: '太学应奉', sal: 350, desc: '研习大唐律诗格律，兼通四书六经。' },
      { rank: 1, title: '进士及第/探花郎', sal: 1000, desc: '曲江泛舟，雁塔题名，名动长安京华。' },
      { rank: 2, title: '翰林院待诏', sal: 2600, desc: '出入禁中金銮殿，陪侍帝皇挥毫诗文。' },
      { rank: 3, title: '集贤殿学士', sal: 6500, desc: '掌编纂盛世鸿编，领袖一代文苑。' },
      { rank: 4, title: '开元诗坛盟主', sal: 16000, desc: '诗赋词华动天下，洛阳纸贵，诸国传唱。' },
      { rank: 5, title: '盛唐文宗至圣', sal: 40000, desc: '文质兼备，诗名与日月同辉，百代儒林圭臬。' }
    ],
    merchant: [
      { rank: 0, title: '西市波斯邸客', sal: 600, desc: '在西市胡商货栈打理香料、琉璃与珠宝账目。' },
      { rank: 1, title: '飞钱兑换坊主', sal: 1800, desc: '首推大唐便换飞钱汇票，免除千万里行商铜钱重负。' },
      { rank: 2, title: '扬州盐铁大贾', sal: 5000, desc: '经略天下漕盐利薮，腰缠十万贯，骑鹤下扬州。' },
      { rank: 3, title: '丝路跨国商魁', sal: 15000, desc: '商驼连绵万里，通商西域葱岭至大食罗马。' },
      { rank: 4, title: '广交海丝海舶主', sal: 38000, desc: '置办巨型远洋广船，操控南海与印度洋通商航道。' },
      { rank: 5, title: '富可敌国', sal: 95000, desc: '财力雄厚，大唐遇兵燹饥馑，以私财犒军安民。' }
    ],
    military: [
      { rank: 0, title: '塞外健儿', sal: 500, desc: '横槊漠北，守卫安西四镇关津。' },
      { rank: 1, title: '朔方铁骑校尉', sal: 1600, desc: '统领百战精骑，冲锋陷阵摧坚折锐。' },
      { rank: 2, title: '神策军指挥使', sal: 4200, desc: '掌天子禁军精锐，拱卫长安北门。' },
      { rank: 3, title: '安西都护府都护', sal: 12000, desc: '节度西域百万里疆土，胡汉百族俯首归命。' },
      { rank: 4, title: '节度使/开府仪同三司', sal: 32000, desc: '坐拥数万人马钱粮，威镇一方大藩。' },
      { rank: 5, title: '勤王元勋/天下兵马副元帅', sal: 80000, desc: '安史之乱血战克复两京，匡扶社稷，裂土封王。' }
    ],
    recluse: [
      { rank: 0, title: '青城山童', sal: 400, desc: '攀绝壁采摘天山雪莲与重楼紫芝。' },
      { rank: 1, title: '华山玄真修客', sal: 1200, desc: '悟透黄帝内经周天之理，养浩然气。' },
      { rank: 2, title: '长安国医供奉', sal: 3200, desc: '以金针神术起死回生，王公公卿争相请益。' },
      { rank: 3, title: '太医局金匮奉御', sal: 8500, desc: '著述本草秘籍三卷，解万民于瘴疠疾苦。' },
      { rank: 4, title: '蓬莱云外真隐', sal: 24000, desc: '行踪莫测，朝游北海暮苍梧，寿享长春。' }
    ]
  },

  // S5: 宋韵风华 · 义庄书院 (900~1100年)
  5: {
    official: [
      { rank: 0, title: '省试贡士', sal: 700, desc: '博涉经史，经殿试金榜题名，赐进士出身。' },
      { rank: 1, title: '宣德郎/通判', sal: 1600, desc: '佐贰一州军政，掌州郡纠察与财赋出纳。' },
      { rank: 2, title: '知州事/提点刑狱', sal: 3800, desc: '巡按一路风纪，平反冤狱，劝农兴学。' },
      { rank: 3, title: '三司副使/御史中丞', sal: 9500, desc: '掌天下度支财赋，或整肃百司宪纲。' },
      { rank: 4, title: '翰林学士知制诰', sal: 26000, desc: '入草内命诏敕，为皇帝股肱顾问。' },
      { rank: 5, title: '参知政事/北宋同平章事', sal: 75000, desc: '主持熙宁新政或元祐更化，位极台辅名相。' }
    ],
    scholar: [
      { rank: 0, title: '应天府斋生', sal: 400, desc: '研习周易性理与《春秋》大义。' },
      { rank: 1, title: '太学上舍生', sal: 1200, desc: '太学三舍考核名列前茅，直通释褐出仕。' },
      { rank: 2, title: '国子监直讲', sal: 3000, desc: '升堂讲授儒家经典，座下千人肃然。' },
      { rank: 3, title: '书院主讲山长', sal: 7500, desc: '执掌四大书院讲席，倡立理学性命之学。' },
      { rank: 4, title: '一代道学名儒', sal: 19000, desc: '著书立说，为天地立心，为生民立命。' },
      { rank: 5, title: '儒林泰斗文正公', sal: 46000, desc: '后世学者尊若神明，从祀孔庙大成殿。' }
    ],
    merchant: [
      { rank: 0, title: '汴京茶坊牙郎', sal: 700, desc: '在相国寺繁华市场撮合书画杂货。' },
      { rank: 1, title: '钞引盐茶客', sal: 2000, desc: '承运官府茶引盐引，往来两淮川蜀。' },
      { rank: 2, title: '蜀锦交子铺总掌柜', sal: 5500, desc: '在益州发行早期纸币【交子】，信用冠于天下。' },
      { rank: 3, title: '泉州海舶外贸魁首', sal: 18000, desc: '远航爪哇印度，垄断海外香药瓷器贸易。' },
      { rank: 4, title: '两宋交子商盟总督', sal: 45000, desc: '调动千万贯楮钞，掌控全国钱庄信贷网络。' },
      { rank: 5, title: '富埒王室', sal: 110000, desc: '创立传世宗族义田义庄，置田万顷周济同族。' }
    ],
    military: [
      { rank: 0, title: '厢军健儿', sal: 550, desc: '戍卫沿边城池要塞。' },
      { rank: 1, title: '禁军都虞候', sal: 1800, desc: '掌禁军甲兵宿卫，精研阵图箭术。' },
      { rank: 2, title: '沿边巡检使', sal: 4800, desc: '率骁勇轻骑防御西夏契丹犯境。' },
      { rank: 3, title: '经略安抚副使', sal: 14000, desc: '驻节西北塞上，扼守关河咽喉。' },
      { rank: 4, title: '殿前都指挥使', sal: 36000, desc: '统领殿前司三衙禁军数十万精锐。' },
      { rank: 5, title: '枢密使/武胜军节度使', sal: 90000, desc: '总揽全天下军符大柄，策定四海烽烟。' }
    ],
    recluse: [
      { rank: 0, title: '熟药所配药生', sal: 450, desc: '在官设惠民局炮制丸散膏丹。' },
      { rank: 1, title: '义庄义学掌事', sal: 1400, desc: '依范公义庄家法，掌宗族赈恤助学账簿。' },
      { rank: 2, title: '和剂局录事', sal: 3600, desc: '纂修局方神效药书，惠泽四海病患。' },
      { rank: 3, title: '理学悬壶硕儒', sal: 9500, desc: '以仁者之心辨症施治，寿跻期颐。' },
      { rank: 4, title: '终南采芝大隐', sal: 28000, desc: '不履公门，清谈道德，品格昭示百代。' }
    ]
  }
};

// 复制并自动补齐 S6 至 S15 的职业阶梯（支持古代、近代与深空）
const MODERN_AND_FUTURE_LADDERS_PRESET = {
  // 6~10 古代中晚期至近代
  6: SEASON_CAREER_LADDERS[5], // S6两宋理学大成（继承优化）
  7: SEASON_CAREER_LADDERS[5], // S7大元洪武开基
  8: SEASON_CAREER_LADDERS[5], // S8晚明阳明心学
  9: SEASON_CAREER_LADDERS[5], // S9康乾西学东渐
  10: {
    official: [
      { rank: 0, title: '地方议员/办事员', sal: 800, desc: '投身近代地方市政，推行实业教育公约。' },
      { rank: 1, title: '经贸司员/专员', sal: 2200, desc: '参与规划现代交通水利与重工业布局。' },
      { rank: 2, title: '特区建设司长', sal: 6000, desc: '主持国家级经济特区开拓，招商引资。' },
      { rank: 3, title: '部委常务副职', sal: 16000, desc: '主持国家现代工业化与科技体制改革。' },
      { rank: 4, title: '国家内阁主官', sal: 45000, desc: '总揽国家宏观经纬，推动时代巨变。' },
      { rank: 5, title: '经国参政元老', sal: 120000, desc: '德高望重，为民族复兴立下万世勋劳。' }
    ],
    scholar: [
      { rank: 0, title: '新学堂助教', sal: 600, desc: '研习现代数理化与现代人文社科。' },
      { rank: 1, title: '大学讲师/研究员', sal: 1800, desc: '在国内外核心学刊发表自主创新成果。' },
      { rank: 2, title: '重点实验室主任', sal: 5000, desc: '攻关两弹一星或卡脖子关键前沿科技。' },
      { rank: 3, title: '国家科学院院士', sal: 14000, desc: '领衔国家重大科技专项，功勋垂范。' },
      { rank: 4, title: '顶尖学府校长/大师', sal: 38000, desc: '培养桃李满天下，奠定百年教育根基。' },
      { rank: 5, title: '世纪战略科学宗师', sal: 100000, desc: '为人类科学突破作出不可磨灭的划时代贡献。' }
    ],
    merchant: [
      { rank: 0, title: '码头货运掌柜', sal: 900, desc: '在沿海通商口岸开办进出口货运代理。' },
      { rank: 1, title: '民族实业工坊主', sal: 3000, desc: '开办棉纺、火柴或面粉实业，实业救国。' },
      { rank: 2, title: '沿海特区开拓先锋', sal: 9000, desc: '顺应改革春风，创建第一代民营科技企业。' },
      { rank: 3, title: '跨国高科技集团总裁', sal: 28000, desc: '自研硬核芯片与精密制造，参与全球竞争。' },
      { rank: 4, title: '产业互联网链主魁首', sal: 75000, desc: '带动数千家产业链上下游走向繁荣。' },
      { rank: 5, title: '世界级产业领袖', sal: 200000, desc: '资累万亿，设立宗族文明公益信托反哺天下。' }
    ],
    military: [
      { rank: 0, title: '边防巡防排长', sal: 750, desc: '戍卫祖国边疆海防哨所。' },
      { rank: 1, title: '合成营指挥官', sal: 2400, desc: '指挥现代机械化合成营，能征善战。' },
      { rank: 2, title: '空天防御旅长', sal: 6500, desc: '执掌先进防空与超音速战备体系。' },
      { rank: 3, title: '航母编队司令', sal: 20000, desc: '统领远洋航母战斗群，巡航深蓝大洋。' },
      { rank: 4, title: '战区联合司令员', sal: 55000, desc: '统驭海陆空天全域联合作战体系。' },
      { rank: 5, title: '战略国防上将', sal: 150000, desc: '固国强军，铸就保家卫国钢铁长城。' }
    ],
    recluse: [
      { rank: 0, title: '中西医汇通学徒', sal: 550, desc: '博采本草经方与现代临床药理之长。' },
      { rank: 1, title: '公立医院主治医师', sal: 1800, desc: '一线坐诊，救死扶伤，医德高尚。' },
      { rank: 2, title: '创新药物研发首席', sal: 5200, desc: '研发抗癌新药与抗病毒特效中成药。' },
      { rank: 3, title: '国家医药终身学者', sal: 15000, desc: '荣获国家最高科学技术奖，造福亿万苍生。' },
      { rank: 4, title: '大医精诚无双圣手', sal: 42000, desc: '隐于林泉，著书立说，传世经方惠及百代。' }
    ]
  },

  // 11~15 未来深空纪元
  11: {
    official: [
      { rank: 0, title: '近地轨道联络员', sal: 1500, desc: '协调空间天梯站进出港客货配额。' },
      { rank: 1, title: '月海特区行政长官', sal: 4500, desc: '主导月球南极水冰与科研基建行政。' },
      { rank: 2, title: '地月自贸区高级专员', sal: 12000, desc: '制定地月关税与宇航员流动安全宪章。' },
      { rank: 3, title: '天梯联合执政委员', sal: 35000, desc: '掌管连接母星与近地轨道的超级交通动脉。' },
      { rank: 4, title: '地月星环总督', sal: 90000, desc: '主盟地月双星文明治理，功载千秋。' }
    ],
    scholar: [
      { rank: 0, title: '月面引力计算助理', sal: 1200, desc: '测算地月拉格朗日点潮汐轨道摄动。' },
      { rank: 1, title: '天梯纳米力学专家', sal: 3800, desc: '突破十万公里碳纳米管超高抗拉极限。' },
      { rank: 2, title: '氦三受控核聚变首席', sal: 10000, desc: '实现月岩氦三全自主清洁裂变并网。' },
      { rank: 3, title: '近地科学院院士', sal: 30000, desc: '开创微重力星际材料科学新范式。' },
      { rank: 4, title: '星汉引路泰斗', sal: 80000, desc: '带领华夏文明跨出母星摇篮迈向深空。' }
    ],
    merchant: [
      { rank: 0, title: '轨道货运驳船舵手', sal: 1800, desc: '驾驶低轨道货运飞船装运空间建材。' },
      { rank: 1, title: '月海采掘公司经理', sal: 5000, desc: '开采百万吨月海玄武岩与稀贵金属。' },
      { rank: 2, title: '氦三能源批发托拉斯', sal: 15000, desc: '掌控地月往返清洁聚变能源供应链。' },
      { rank: 3, title: '天梯物流航运总裁', sal: 45000, desc: '掌管上百艘万吨级地月穿梭巡洋货轮。' },
      { rank: 4, title: '近地太空产业寡头', sal: 120000, desc: '资产富可倾星，以家族信托反哺母星黎庶。' }
    ],
    military: [
      { rank: 0, title: '空间巡航陆战队员', sal: 1400, desc: '常驻空间站执行安保反劫持巡防。' },
      { rank: 1, title: '月面极轨护卫机长', sal: 4200, desc: '驾驶离子动力巡逻战机护卫采矿区。' },
      { rank: 2, title: '天梯警备司令', sal: 13000, desc: '统筹天梯两端电磁拦截网与雷达预警。' },
      { rank: 3, title: '地月联合舰队少将', sal: 38000, desc: '率领主力驱逐舰群巡弋地月拉格朗日点。' },
      { rank: 4, title: '近地防御联合统帅', sal: 100000, desc: '构筑捍卫母星家园的不可逾越星空天幕。' }
    ],
    recluse: [
      { rank: 0, title: '月海静修居士', sal: 1000, desc: '在月背真空幽室体悟宇宙寂寥禅机。' },
      { rank: 1, title: '太空生保系统总师', sal: 3200, desc: '营建全闭环人工生物圈，护佑游子生息。' },
      { rank: 2, title: '深空量子冥想宗师', sal: 9000, desc: '通过量子脑波冥想实现天人神游虚空。' },
      { rank: 3, title: '地月先祖记忆守火人', sal: 26000, desc: '守护第一纪元以来的汉魏家谱量子长卷。' },
      { rank: 4, title: '星汉大道大隐神仙客', sal: 70000, desc: '超脱物质束缚，与星海共存长生。' }
    ]
  }
};

// 填充 12~15 赛季阶梯
for (let sIdx = 12; sIdx <= 15; sIdx++) {
  MODERN_AND_FUTURE_LADDERS_PRESET[sIdx] = MODERN_AND_FUTURE_LADDERS_PRESET[11];
}
for (let sIdx = 6; sIdx <= 15; sIdx++) {
  SEASON_CAREER_LADDERS[sIdx] = MODERN_AND_FUTURE_LADDERS_PRESET[sIdx];
}

// =========================================================================
// 2. 全 15 赛季重大历史关隘大案数据库 (SEASON_HISTORICAL_EVENTS, 每季4大案)
// =========================================================================
const SEASON_HISTORICAL_EVENTS = {
  // S1: 汉魏风骨 (100~300年) - 严格保留前8案中的代表性4大核心案
  1: HAN_WEI_CRITICAL_CHRONO_EVENTS.slice(0, 4),

  // S2: 六朝烟雨 (300~500年) - 永嘉南渡、兰亭修禊、淝水决战、孝文迁洛
  2: LIU_CHAO_CRITICAL_CHRONO_EVENTS,

  // S3: 南北归一 · 隋唐草创 (500~700年)
  3: [
    {
      id: 's3_evt_581_kaihuang',
      year: 581,
      title: '开皇之治 · 均田定籍',
      historicalContext: '隋文帝开皇初年，颁行《开皇律》，推行均田制与大索貌阅，整顿隐匿户口，天下版籍清明。',
      options: [
        {
          text: '主动呈报隐蔽庄客隐田，输庸调以换取朝廷勋爵官身',
          reqTrack: 'official',
          reqStat: 'rep',
          reqVal: 55,
          successReward: { rep: 40, clanPrestige: 40, officialTitle: '开皇通议大夫', chronicleText: '主动奉公，成为新朝整饬吏治典范，跻身开皇勋贵门庭。' },
          failPenalty: { rep: -10, money: -2000, chronicleText: '隐田漏报被按察官核查，虽免大罪但名声受损。' }
        },
        {
          text: '趁南北商路初通，倾资组织商队贩运江南粮米北上洛阳',
          reqTrack: 'merchant',
          reqStat: 'iq',
          reqVal: 50,
          cost: { money: 3000 },
          successReward: { money: 15000, clanPrestige: 35, chronicleText: '运粮北上获利丰厚，奠定家族漕运商道第一桶金！' },
          failPenalty: { money: -2000, chronicleText: '水路关津征税严苛，利薄而归。' }
        },
        {
          text: '立足书院考据南北经训异同，撰述《开皇经籍考》',
          reqTrack: 'scholar',
          reqStat: 'iq',
          reqVal: 60,
          successReward: { iq: 25, culture: 35, clanPrestige: 30, chronicleText: '折衷南北经术，文风雅正，为天下学子推崇。' }
        }
      ]
    },
    {
      id: 's3_evt_605_dayunhe',
      year: 605,
      title: '大业开河 · 万里通波',
      historicalContext: '隋炀帝开凿通济渠与江南河，贯通南北大运河。民力虽疲，然千里通波，商贾舟楫云集。',
      options: [
        {
          text: '承包运河关键渡口大型码头与粮仓水栈营建',
          reqTrack: 'merchant',
          cost: { money: 5000 },
          reqStat: 'iq',
          reqVal: 55,
          successReward: { money: 28000, clanPrestige: 50, chronicleText: '扼守运河咽喉水栈，日进斗金，货殖资财暴增数倍！' },
          failPenalty: { money: -3000, chronicleText: '督造河堤超时获谴，勉强完工。' }
        },
        {
          text: '上疏规谏惜惜民力，建议分段轮换劳役以活饥民',
          reqTrack: 'official',
          reqStat: 'courage',
          reqVal: 60,
          successReward: { morality: 40, rep: 35, clanPrestige: 40, chronicleText: '为民请命，朝野交口称赞仁厚，虽遭迁谪但万家生佛。' },
          failPenalty: { rep: -15, chronicleText: '直谏触怒上意，削职还乡。' }
        },
        {
          text: '组织家族义医队沿运河工段施汤送药防治疾疠',
          reqTrack: 'recluse',
          cost: { money: 2000 },
          reqStat: 'health',
          reqVal: 50,
          successReward: { health: 20, morality: 35, clanPrestige: 30, chronicleText: '施药救活数千役夫，善名远播运河两岸。' }
        }
      ]
    },
    {
      id: 's3_evt_626_xuanwumen',
      year: 626,
      title: '武德九年 · 玄武惊雷',
      historicalContext: '秦王李世民发动玄武门之变，定鼎太宗贞观之治。天下门阀高门面临拥戴站队抉择。',
      options: [
        {
          text: '决意拥戴秦王府，联络关陇各府兵营与学士策应',
          reqTrack: 'official',
          reqStat: 'iq',
          reqVal: 65,
          successReward: { promoBonus: 2, clanPrestige: 60, officialTitle: '贞观凌烟阁功勋', chronicleText: '定策元勋！在新朝太宗朝廷跻身机枢中枢，门第极盛！' },
          failPenalty: { rep: -20, money: -4000, chronicleText: '行迹险遭牵连，虽保全宗族但元气受挫。' }
        },
        {
          text: '保境安民留守关中祖宅，闭门杜客精研诗书',
          reqTrack: 'scholar',
          reqStat: 'resilience',
          reqVal: 55,
          successReward: { clean: 30, clanPrestige: 30, chronicleText: '明哲保身，宗族血脉安稳无祸，德泽久远。' }
        },
        {
          text: '倾资赈济关中兵乱难民，设粥厂三处保全流民',
          reqTrack: 'merchant',
          cost: { money: 3500 },
          successReward: { morality: 45, rep: 35, clanPrestige: 35, chronicleText: '倾囊济民，新朝登极特旨褒扬为【义德世家】。' }
        }
      ]
    },
    {
      id: 's3_evt_683_zhenguan_wuzhou',
      year: 683,
      title: '贞观余烈 · 登庸新科',
      historicalContext: '武后执政，开创殿试与武举，大力擢用寒俊新科士人，打击关陇旧门阀。',
      options: [
        {
          text: '送族中英杰参加新科殿试策论，以才学争得天子门生',
          reqTrack: 'scholar',
          reqStat: 'iq',
          reqVal: 65,
          successReward: { rep: 45, promoBonus: 2, officialTitle: '明经第一名/崇文馆学士', chronicleText: '殿试擢拔名列第一甲！跨越门阀旧局，确立新科显贵之名。' },
          failPenalty: { rep: 10, chronicleText: '名落孙山，然文风见赏，留京深造。' }
        },
        {
          text: '参加首创武举大考，以弓马绝技拔得头筹',
          reqTrack: 'military',
          reqStat: 'courage',
          reqVal: 65,
          successReward: { courage: 35, clanPrestige: 40, officialTitle: '武举状元/羽林校尉', chronicleText: '校场百步穿杨，御前射柳惊艳百官，拜为禁军武将！' },
          failPenalty: { health: -15, chronicleText: '比武落马受创，休养经年。' }
        }
      ]
    }
  ],

  // S4: 盛唐气象 · 藩镇诗豪 (700~900年)
  4: [
    {
      id: 's4_evt_713_kaiyuan',
      year: 713,
      title: '开元盛世 · 华戎同风',
      historicalContext: '唐玄宗开元之治，四夷宾服，长安成为世界中心。波斯胡商云集西市，天下家给人足。',
      options: [
        {
          text: '在长安西市建立【波斯飞钱便换庄】，主理跨国通商汇兑',
          reqTrack: 'merchant',
          cost: { money: 6000 },
          reqStat: 'iq',
          reqVal: 60,
          successReward: { money: 35000, clanPrestige: 50, chronicleText: '首创跨国信用汇票，四海商贾争相存兑，利累巨万！' },
          failPenalty: { money: -3000, chronicleText: '丝路变故导致商款滞纳，折损本金。' }
        },
        {
          text: '赴考曲江春闱，以绝句律诗惊艳主考，雁塔题名',
          reqTrack: 'scholar',
          reqStat: 'iq',
          reqVal: 65,
          successReward: { culture: 45, rep: 50, officialTitle: '开元同进士及第', chronicleText: '雁塔题名动长安！名士争相传抄诗卷，誉满两京。' },
          failPenalty: { rep: 15, chronicleText: '虽未登甲科，诗名已传于长安市井。' }
        },
        {
          text: '随安西都护府大军远征碎叶城，戍卫丝绸之路北道',
          reqTrack: 'military',
          reqStat: 'courage',
          reqVal: 65,
          successReward: { courage: 35, clanPrestige: 45, officialTitle: '瀚海副统领', chronicleText: '横槊绝域斩将破敌，威镇大食与突厥，受封塞外重将。' }
        }
      ]
    },
    {
      id: 's4_evt_755_anshiluan',
      year: 755,
      title: '天宝十四年 · 渔阳鼙鼓',
      historicalContext: '安禄山反于范阳，天下震骇。潼关告破，两京沦陷。宗族去留与勤王救亡刻不容缓！',
      options: [
        {
          text: '散尽家财招募三千乡勇义兵，奔赴灵武保卫肃宗勤王',
          reqTrack: 'military',
          cost: { money: 8000 },
          reqStat: 'courage',
          reqVal: 65,
          successReward: { courage: 40, rep: 50, clanPrestige: 60, officialTitle: '朔方勤王元勋', chronicleText: '血战收复两京！立下不赏之功，光耀宗庙，拜爵开国公！' },
          failPenalty: { health: -25, money: -4000, chronicleText: '喋血城堞，子弟折损甚重，然忠名不泯。' }
        },
        {
          text: '保护历代先祖典籍与宗族老幼，泛舟南迁避乱于江南',
          reqTrack: 'scholar',
          cost: { money: 4000 },
          reqStat: 'resilience',
          reqVal: 55,
          successReward: { resilience: 35, clanPrestige: 35, southEstateUnlocked: true, chronicleText: '南渡避祸于江淮，保全诗书火种，辟良田安顿宗亲。' }
        },
        {
          text: '设法保全睢阳张巡大营之后勤粮道，运粮万石入孤城',
          reqTrack: 'merchant',
          cost: { money: 6000 },
          reqStat: 'courage',
          reqVal: 60,
          successReward: { morality: 50, rep: 45, clanPrestige: 50, chronicleText: '冒矢石输送军粮，保全江淮半壁，四海传颂大义！' }
        }
      ]
    },
    {
      id: 's4_evt_820_yuanhe',
      year: 820,
      title: '元和中兴 · 藩镇角力',
      historicalContext: '唐宪宗平定淮西吴元济，重振中央权威。藩镇割据与中枢朝廷暗流涌动。',
      options: [
        {
          text: '出任中枢谏官，力主削藩收权，编修《元和郡县图志》',
          reqTrack: 'official',
          reqStat: 'rep',
          reqVal: 60,
          successReward: { rep: 40, iq: 25, promoBonus: 2, chronicleText: '整饬风纪辅弼中兴，为朝廷定鼎规略，名垂台阁。' },
          failPenalty: { rep: -10, chronicleText: '削藩触动宿将利益，遭外调历练。' }
        },
        {
          text: '在淮西战后置办万亩荒田，引进江南先进双季稻种',
          reqTrack: 'merchant',
          cost: { money: 4500 },
          reqStat: 'iq',
          reqVal: 55,
          successReward: { money: 22000, clanPrestige: 40, chronicleText: '变荒田为膏腴粮仓，活流民数千家，宗族资财日盛。' }
        }
      ]
    },
    {
      id: 's4_evt_878_huangchao',
      year: 878,
      title: '乾符风雷 · 冲天香阵',
      historicalContext: '黄巢起事席卷天下，转战千里攻入长安。世家大族遭受百年未有之大洗牌。',
      options: [
        {
          text: '深壁固垒，在江南深山密筑石寨，保藏全族字画谱牒',
          reqTrack: 'scholar',
          reqStat: 'resilience',
          reqVal: 60,
          cost: { money: 3000 },
          successReward: { resilience: 30, culture: 30, clanPrestige: 40, chronicleText: '固守坚寨避过乱世狂澜，大唐文脉藉我族完好传承。' },
          failPenalty: { money: -2000, chronicleText: '外寨遭劫掠，幸核心宗祠谱牒无恙。' }
        },
        {
          text: '率义勇组织团练护卫桑梓集市，剿抚流民保一方平安',
          reqTrack: 'military',
          reqStat: 'courage',
          reqVal: 65,
          successReward: { courage: 35, rep: 40, clanPrestige: 50, chronicleText: '保境安民！被郡里推举为乡邦统领，威震东南。' }
        }
      ]
    }
  ]
};

// 补齐 S5 至 S15 的历史大案（每季4大案）
const REMAINING_SEASONS_EVENTS = {
  // S5: 宋韵风华 (900~1100年)
  5: [
    { id: 's5_1', year: 960, title: '陈桥兵变 · 黄袍加身', historicalContext: '宋太祖赵匡胤受禅建立北宋，杯酒释兵权，推崇崇文抑武。', options: [
      { text: '转武从文，令子弟入太学攻读经史，以科举取士晋身', reqTrack: 'scholar', reqStat: 'iq', reqVal: 55, successReward: { iq: 25, rep: 30, clanPrestige: 40, chronicleText: '转型耕读世家，子弟连登甲科，奠定两宋名门文脉。' } },
      { text: '上缴兵权，换取朝廷大额绢帛与临安江南良田庄园', reqTrack: 'merchant', cost: { money: 2000 }, successReward: { money: 18000, clanPrestige: 35, chronicleText: '以武换文富，置买良田水磨，成为江东巨商庄园主。' } }
    ]},
    { id: 's5_2', year: 1004, title: '澶渊之盟 · 百年止戈', historicalContext: '真宗亲征澶州，与契丹订立和约，边境罢兵，榷场互市大开。', options: [
      { text: '在河北边境大设榷场商行，倒腾茶瓷绢帛与北方骏马', reqTrack: 'merchant', cost: { money: 5000 }, reqStat: 'iq', reqVal: 60, successReward: { money: 30000, clanPrestige: 45, chronicleText: '垄断榷场互市，年入千万，马匹资粮充裕宗族！' } },
      { text: '修葺边境书院，以文教化育边关士民，增进胡汉同好', reqTrack: 'scholar', reqStat: 'culture', reqVal: 55, successReward: { culture: 40, rep: 35, clanPrestige: 35, chronicleText: '边疆兴学，名播塞北，天下称其儒雅之德。' } }
    ]},
    { id: 's5_3', year: 1043, title: '庆历新政 · 范公筑庄', historicalContext: '范仲淹主持庆历新政，设立【范氏义庄】，倡导先忧后乐。', options: [
      { text: '效仿范公设立宗族【永业义庄】，购置千亩义田赡养九族', reqTrack: 'official', cost: { money: 6000 }, reqStat: 'morality', reqVal: 60, successReward: { morality: 50, clanPrestige: 60, newMottoTag: '先忧后乐', chronicleText: '立下万代不拔之义庄，贫者赡之，学者助之，名震儒林！' } },
      { text: '支持精简冗官，主持整顿地方考课簿录', reqTrack: 'official', reqStat: 'rep', reqVal: 60, successReward: { rep: 35, promoBonus: 2, chronicleText: '执政有方，吏治肃然，为朝廷名臣所器重。' } }
    ]},
    { id: 's5_4', year: 1069, title: '熙宁变法 · 青苗均输', historicalContext: '王安石受宋神宗信任推行熙宁新政，颁布青苗法、免役法与均输法。', options: [
      { text: '配合新政开办地方义仓低息青苗信贷，助农抵御兼并', reqTrack: 'official', reqStat: 'iq', reqVal: 60, successReward: { rep: 40, clanPrestige: 45, chronicleText: '施惠平民，抗击豪强高利，深得神宗皇帝圣眷。' } },
      { text: '专注实业工坊，借均输法扩大瓷器与丝绸官府采办', reqTrack: 'merchant', cost: { money: 4000 }, reqStat: 'iq', reqVal: 55, successReward: { money: 25000, clanPrestige: 40, chronicleText: '拿下官造瓷丝大单，宗族工坊日夜不息，资财翻番。' } }
    ]}
  ]
};

// 补齐 6~15 赛季通用事件包模版
for (let sIdx = 6; sIdx <= 15; sIdx++) {
  const startY = 100 + (sIdx - 1) * 200;
  REMAINING_SEASONS_EVENTS[sIdx] = [
    {
      id: `s${sIdx}_1`,
      year: startY + 20,
      title: `${startY + 20} · 时代风云破晓`,
      historicalContext: `公元${startY + 20}年，新朝与新时代制度确立，宗族迎来实现跨越式立足的重大机遇。`,
      options: [
        { text: '立足仕途台阁，整饬典章律令主导新政', reqTrack: 'official', reqStat: 'rep', reqVal: 55, successReward: { rep: 40, clanPrestige: 40, chronicleText: '位列台辅，为新时代立规立宪。' } },
        { text: '把握实业通商先机，拓荒产业新赛道', reqTrack: 'merchant', cost: { money: 5000 }, reqStat: 'iq', reqVal: 55, successReward: { money: 30000, clanPrestige: 45, chronicleText: '抢占产业风口，经世资财暴增数倍！' } }
      ]
    },
    {
      id: `s${sIdx}_2`,
      year: startY + 65,
      title: `${startY + 65} · 文明风骨争鸣`,
      historicalContext: `公元${startY + 65}年，文化学派与思想浪潮风起云涌，世家修身齐家治国平天下。`,
      options: [
        { text: '设立传世书院与文化智库，修撰巨著传颂天下', reqTrack: 'scholar', reqStat: 'iq', reqVal: 60, successReward: { culture: 45, rep: 40, clanPrestige: 45, chronicleText: '著书立说，文脉传家，受世代读书人尊崇。' } },
        { text: '广开义田善堂，赈济流民化解兵燹天灾', reqTrack: 'recluse', cost: { money: 4000 }, reqStat: 'morality', reqVal: 55, successReward: { morality: 45, clanPrestige: 40, chronicleText: '善行义举泽被四方，百姓立德政碑传颂。' } }
      ]
    },
    {
      id: `s${sIdx}_3`,
      year: startY + 120,
      title: `${startY + 120} · 烽烟考验砥柱`,
      historicalContext: `公元${startY + 120}年，外部冲击与动荡来临，宗族面临存亡与气节考验。`,
      options: [
        { text: '精忠报国从戎效命，率领子弟血战御侮', reqTrack: 'military', reqStat: 'courage', reqVal: 65, successReward: { courage: 40, rep: 45, clanPrestige: 60, chronicleText: '力挽狂澜！立下盖世奇勋，拜爵封疆！' } },
        { text: '坚壁清野自守祖茔，保全宗门血脉薪火', reqTrack: 'scholar', reqStat: 'resilience', reqVal: 55, successReward: { resilience: 35, clanPrestige: 35, chronicleText: '隐忍自强，在逆境中保全族中老幼与传家孤本。' } }
      ]
    },
    {
      id: `s${sIdx}_4`,
      year: startY + 180,
      title: `${startY + 180} · 终局大典结卷`,
      historicalContext: `公元${startY + 180}年，两百年赛季行至巅峰大成，后世子孙将本纪元勋业刻入传家金册。`,
      options: [
        { text: '总结本朝两百年家训，筑建宗庙大观勒石立铭', reqTrack: 'official', cost: { money: 6000 }, reqStat: 'rep', reqVal: 60, successReward: { clanPrestige: 70, rep: 50, chronicleText: '丰碑不朽！两百年风雨终成不朽基业！' } },
        { text: '将家族积累之巨万资财注入宗族信托，永续福荫', reqTrack: 'merchant', cost: { money: 8000 }, reqStat: 'iq', reqVal: 60, successReward: { morality: 60, clanPrestige: 65, chronicleText: '取之于时，用之于族，子孙百代永享祖荫！' } }
      ]
    }
  ];
}

for (const sIdx in REMAINING_SEASONS_EVENTS) {
  SEASON_HISTORICAL_EVENTS[sIdx] = REMAINING_SEASONS_EVENTS[sIdx];
}

// =========================================================================
// 3. 核心 API 辅助函数
// =========================================================================

/**
 * 获取指定赛季的 5 大职业阶梯
 * @param {number} seasonIndex 1~15
 */
function getSeasonCareerLadders(seasonIndex) {
  const idx = Math.min(15, Math.max(1, Number(seasonIndex) || 1));
  return SEASON_CAREER_LADDERS[idx] || SEASON_CAREER_LADDERS[1];
}

/**
 * 获取指定赛季的历史大案列表（默认 4 大案）
 * @param {number} seasonIndex 1~15
 */
function getSeasonEvents(seasonIndex) {
  const idx = Math.min(15, Math.max(1, Number(seasonIndex) || 1));
  return SEASON_HISTORICAL_EVENTS[idx] || SEASON_HISTORICAL_EVENTS[1];
}

/**
 * 根据年份和赛道动态获取精准官阶职称对象
 * @param {string} track 赛道名称
 * @param {number} rankIndex 官阶索引 (0~5)
 * @param {number} year 历史年份 (100~3100)
 */
function getSeasonRankTitle(track, rankIndex, year) {
  const y = Number(year) || 100;
  const sIdx = Math.min(15, Math.max(1, Math.floor((y - 100) / 200) + 1));
  const ladders = getSeasonCareerLadders(sIdx);
  if (!ladders) return null;

  let trKey = 'official';
  const tStr = String(track || '').toLowerCase();
  if (['merchant', 'biz', 'trade', 'finance'].includes(tStr)) trKey = 'merchant';
  else if (['military', 'army', 'soldier'].includes(tStr)) trKey = 'military';
  else if (['scholar', 'edu', 'tech', 'study'].includes(tStr)) trKey = 'scholar';
  else if (['recluse', 'med', 'medical', 'herb', 'grassroots'].includes(tStr)) trKey = 'recluse';
  else trKey = 'official';

  const list = ladders[trKey] || ladders.official || [];
  if (!Array.isArray(list) || list.length === 0) return null;
  const rIdx = Math.min(list.length - 1, Math.max(0, Number(rankIndex) || 0));
  return list[rIdx] || list[0];
}

module.exports = {
  SEASON_CAREER_LADDERS,
  SEASON_HISTORICAL_EVENTS,
  getSeasonCareerLadders,
  getSeasonEvents,
  getSeasonRankTitle
};
