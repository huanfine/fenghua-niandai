/**
 * 华夏三千年世家大系 · 第一赛季：汉魏风骨 (公元100~300年) 历史知识库与社会风情引擎
 * 涵盖：五大古风官职晋升阶梯、真实历史名宿谱系、经典历史关隘大案与传世古宝。
 */

// 1. 五大历史立业晋升阶梯 (汉魏魏晋官制考证)
const HAN_WEI_OFFICIAL_LADDERS = {
  official: [
    { rank: 0, title: '白衣门生', sal: 300, desc: '未入仕版，在乡里通习章句，修身以待辟举。' },
    { rank: 1, title: '郡守门吏/文学掾', sal: 800, desc: '百石郡吏，负责文书簿录，参赞府君清议。' },
    { rank: 2, title: '郡丞/功曹史', sal: 1800, desc: '二百石，统领郡中庶务，掌选曹人才品评。' },
    { rank: 3, title: '察举孝廉/茂才', sal: 3600, desc: '四百石，登天子明堂受策，名冠一州。' },
    { rank: 4, title: '尚书郎/县令', sal: 6800, desc: '六百石，入台省典机要，或主政一邑抚安黎庶。' },
    { rank: 5, title: '别驾从事/刺史佐史', sal: 12000, desc: '千石，巡按州郡，风纪纠察，权倾一方。' },
    { rank: 6, title: '郡太守/持节刺史', sal: 25000, desc: '二千石封疆大吏，抚驭万民，坐拥一州兵刑之权。' },
    { rank: 7, title: '尚书仆射/侍中', sal: 48000, desc: '中二千石，出入禁省，参决军国大政。' },
    { rank: 8, title: '尚书令/三公太傅', sal: 96000, desc: '万石重臣，秉国钧轴，位极人臣，进封开国县侯。' }
  ],
  scholar: [
    { rank: 0, title: '经馆童生', sal: 200, desc: '研习《孝经》、《尔雅》，诵读古训。' },
    { rank: 1, title: '太学诸生', sal: 600, desc: '游学洛阳太学，与数万士子论道青云。' },
    { rank: 2, title: '郡学掌故', sal: 1500, desc: '掌讲一郡古文经术，开席授徒。' },
    { rank: 3, title: '五经博士', sal: 3200, desc: '立朝廷太常学官，注疏先圣经典。' },
    { rank: 4, title: '经学祭酒', sal: 6000, desc: '学林尊长，撰写鸿篇巨著，门生故吏布天下。' },
    { rank: 5, title: '文宗泰斗', sal: 12000, desc: '一代宗师，言出而成典谟，百代儒林景仰。' }
  ],
  merchant: [
    { rank: 0, title: '乡鄙行贩', sal: 400, desc: '肩挑背负，往来集市倒腾皮毛草麻。' },
    { rank: 1, title: '行商牙客', sal: 1200, desc: '驾骡马舟车，穿梭两淮中原贩运绢帛。' },
    { rank: 2, title: '盐铁工坊主', sal: 3000, desc: '兴建水碓水磨，置办盐井冶铁炉坊。' },
    { rank: 3, title: '跨郡豪贾', sal: 8000, desc: '货殖四方，平准谷价，置办良田千顷。' },
    { rank: 4, title: '九州商帮魁首', sal: 20000, desc: '商路通于西域交趾，操控江南与中原商道命脉。' },
    { rank: 5, title: '富埒王侯', sal: 50000, desc: '资累亿万，以巨贾通侯之位周济天下苍生。' }
  ],
  military: [
    { rank: 0, title: '里魁乡勇', sal: 350, desc: '巡更护里，持白挺警备流寇。' },
    { rank: 1, title: '坞壁护兵统领', sal: 1000, desc: '执长矛硬弩，戍卫宗族老幼良田。' },
    { rank: 2, title: '义兵别部司马', sal: 2500, desc: '聚众千人，起兵讨贼，护国安民。' },
    { rank: 3, title: '破贼校尉', sal: 6000, desc: '百战沙场，攻城略地，威震敌胆。' },
    { rank: 4, title: '持节偏将军/都尉', sal: 15000, desc: '统领一方大营，镇守险隘关津。' },
    { rank: 5, title: '车骑将军/封邑开国侯', sal: 45000, desc: '裂土分茅，拜将封侯，功勋垂于竹帛。' }
  ],
  recluse: [
    { rank: 0, title: '药栈学徒', sal: 250, desc: '辨识百草，炮制丹丸，通晓药性。' },
    { rank: 1, title: '坐堂郎中', sal: 800, desc: '望闻问切，行医里巷，活人无数。' },
    { rank: 2, title: '郡府医官', sal: 2000, desc: '掌郡中防疫药局，调理官佐士民疾苦。' },
    { rank: 3, title: '伤寒杏林圣手', sal: 5000, desc: '融会张仲景、华佗之学，创立传世医道学派。' },
    { rank: 4, title: '悬壶神仙客', sal: 12000, desc: '遁入名山洞府，著医书数卷，德施天下，寿登期颐。' }
  ]
};

// 2. 真实历史名宿谱系 (用于拜访、结交、联姻与师从 · 严格断代于公元100~300年汉魏魏晋)
const HAN_WEI_HISTORICAL_FIGURES = [
  {
    id: 'zheng_xuan',
    name: '郑玄',
    courtesy: '康成',
    title: '东汉大儒 · 经学集大成者',
    lifespan: [127, 200],
    birthYear: 127,
    deathYear: 200,
    region: '北海高密',
    historicalSource: '《后汉书·卷三十五·张曹郑列传第二十五·郑玄传》',
    historicalFact: '通晓今古文经学，破今古界限，注《易经》《诗经》《三礼》《论语》，门生数千人，世称‘郑学’。建安五年袁绍强召其随军官渡，病卒于行军途中。',
    featureDesc: '融会今古文经学，注遍群经，弟子数以千计。拜入其门下可获经学大悟。',
    dialogueQuotes: [
      '述先圣之玄意，整百家之不齐。',
      '读书何恨于穷独，立志固在于守经。'
    ],
    interviewPrompt: '老朽治《礼》数十载，敢问后生：‘克己复礼’与‘敦宗睦族’，何者当先？',
    discourseOptions: [
      {
        choiceText: '立身以孝悌为先，宗族和睦则仁义自充',
        feedback: '郑公颔首抚须：“孝悌者也，其为仁之本与！善哉后生，知本者也。”',
        statBonus: { iq: 15, morality: 15, clanPrestige: 20 }
      },
      {
        choiceText: '天理人伦本无二致，修己以安百姓',
        feedback: '郑公肃容赞道：“志在经世，胸襟不凡，当为天下士人标表！”',
        statBonus: { iq: 20, rep: 25, titleUnlocked: '康成门人' }
      }
    ],
    deepAffinityStory: '郑公感念君之至诚与求索之笃，临终前以亲笔校订之《古文尚书》《礼记郑注》手稿相托，使君之宗族成为天下治经学人朝圣之重镇。',
    interactionReward: { iq: 15, rep: 25, titleUnlocked: '康成门人' }
  },
  {
    id: 'cai_yong',
    name: '蔡邕',
    courtesy: '伯喈',
    title: '左中郎将 · 金石辞赋泰斗',
    lifespan: [133, 192],
    birthYear: 133,
    deathYear: 192,
    region: '陈留圉县',
    historicalSource: '《后汉书·卷六十下·蔡邕列传第五十下》',
    historicalFact: '熹平四年奏请正定六经文字，亲手以隶书书写并刊刻洛阳《熹平石经》；精于音律，创制‘焦尾琴’；藏书万卷，晚年董卓专政时被强拜为左中郎将。',
    featureDesc: '精通音律琴理与熹平石经，藏书万卷。与其结交可获珍稀古籍真本与琴理传授。',
    dialogueQuotes: [
      '有声之乐不足以尽性，唯焦尾清徽，与古人相往还。',
      '熹平刻石立太学，天下学徒奔走，所正者不过人心耳。'
    ],
    interviewPrompt: '伯喈手抚焦尾，长叹道：‘世人皆羡洛阳繁华，独不见火从东起。君观此桐木遗焦，所思何事？’',
    discourseOptions: [
      {
        choiceText: '良木罹难犹发正音，君子处困更当坚如磐石',
        feedback: '蔡邕抚节嗟叹：“相见恨晚！乱世之中，骨鲠之音尤为难得。”',
        statBonus: { courage: 15, culture: 20, heirloom: 'cai_yong_qin' }
      },
      {
        choiceText: '藏书万卷以待后世，文脉不绝则天下终安',
        feedback: '蔡邕深为动容：“海内若崩，唯文脉不可断，君可谓知我者！”',
        statBonus: { iq: 15, rep: 25, clanPrestige: 20 }
      }
    ],
    deepAffinityStory: '董卓之变前夕，蔡中郎深知大祸将临，将毕生秘藏之书画石墨数百卷潜托于君，嘱曰：“天下若崩，此文华灵气，唯君之坞堡可全之！”',
    interactionReward: { culture: 20, heirloom: 'cai_yong_qin', rep: 20 }
  },
  {
    id: 'chen_shi',
    name: '陈寔',
    courtesy: '仲弓',
    title: '太丘长 · 海内士宗德范',
    lifespan: [104, 187],
    birthYear: 104,
    deathYear: 187,
    region: '颍川许县',
    historicalSource: '《后汉书·卷六十二·荀韩钟陈列传第五十二·陈寔传》',
    historicalFact: '颍川名士之冠，为太丘长修德清俭，抚安吏民。盗夜入其室，匿梁上，寔呼子孙训诫‘梁上君子’化盗为良。党锢之祸主动就狱，卒时会葬者三万余人。',
    featureDesc: '海内德望冠冕，陈氏门阀发基名祖。与之论交可大正门风，清誉流芳。',
    dialogueQuotes: [
      '夫人不可不自勉，不善之人未必本恶，习以成性，遂至于此。梁上君子者是也。',
      '清白吏子孙，天下之所矜式。'
    ],
    interviewPrompt: '太丘长闭目静坐，徐徐言道：‘宗族势盛，难免有顽劣之徒、乡野侵夺。以严刑绳之？抑或以德风化之？’',
    discourseOptions: [
      {
        choiceText: '德化为先，导之以善，使之知耻而后勇',
        feedback: '陈公抚须赞叹：“君知德教之远！严刑止一时之恶，仁风定百代之基。”',
        statBonus: { clean: 25, morality: 25, rep: 30 }
      },
      {
        choiceText: '规矩肃穆，家法严厉，奖惩必信',
        feedback: '陈公微颔首：“治家不可无法，然法之底蕴，仍在仁恕宽平。”',
        statBonus: { iq: 15, clanPrestige: 25 }
      }
    ],
    deepAffinityStory: '陈太丘感君一门清正，亲登君族坞壁品评子弟，赐题“德星聚奎”匾额，颍川名士交相延誉，君之门第声望自此冠绝四海。',
    interactionReward: { clean: 25, rep: 30, clanPrestige: 35 }
  },
  {
    id: 'xun_yu',
    name: '荀彧',
    courtesy: '文若',
    title: '汉尚书令 · 颍川士族领袖',
    lifespan: [163, 212],
    birthYear: 163,
    deathYear: 212,
    region: '颍川颍阴',
    historicalSource: '《三国志·卷十·魏书·荀彧荀攸贾诩传第十》',
    historicalFact: '荀子之后，少有‘王佐之才’之称。为曹操画策数十年，迎奉天子以顺人心，荐拔钟繇、荀攸、陈群、戏志才、郭嘉等名士，终居汉臣大节，服鸩而亡。',
    featureDesc: '王佐之才，主盟天下清议。得到其举荐可直接通过察举入台省机要。',
    dialogueQuotes: [
      '秉忠贞之志，守谦退之节。',
      '深谋远虑，天下之机在顺守，而不在偏急。'
    ],
    interviewPrompt: '尚书令焚香端坐，香气袭人。其目光如炬：‘今天下三分未定，豪杰竞逐，世家当择木而栖，抑或自守宗邦？’',
    discourseOptions: [
      {
        choiceText: '奉天子以从众望，从正道以靖海内',
        feedback: '荀彧肃然起敬：“君所见极高！天下虽乱，大义不可废也。”',
        statBonus: { officialRep: 35, promoBonus: 2, rep: 30 }
      },
      {
        choiceText: '深筑坞壁以济桑梓，不以一身之进退废宗族之本',
        feedback: '荀彧赞许：“老成谋国，保全宗脉，方是世家根基所在。”',
        statBonus: { clanPrestige: 30, security: 25 }
      }
    ],
    deepAffinityStory: '荀令君密遗手书一封，托以关东名士引荐谱牒，称君为“济世砥柱”。台阁诸公受其嘱托，对君族子弟关照尤加。',
    interactionReward: { promoBonus: 2, officialRep: 35 }
  },
  {
    id: 'zhang_zhongjing',
    name: '张仲景',
    courtesy: '机',
    title: '建安医圣 · 长沙太守',
    lifespan: [150, 219],
    birthYear: 150,
    deathYear: 219,
    region: '南阳涅阳',
    historicalSource: '《伤寒杂病论·自序》《后汉书·卷七十四上·袁绍刘表列传·注引何颙语》',
    historicalFact: '举孝廉官至长沙太守。目睹宗族建安年间死于伤寒者十居其七，勤求古训，博采众方，著成《伤寒杂病论》十六卷，确立六经辨证理法方药体系。',
    featureDesc: '感建安伤寒大疫之酷，作《伤寒杂病论》。向其求教可护佑宗族规避大疫。',
    dialogueQuotes: [
      '进则救世，退则救民；不能为良相，亦当为良医。',
      '勤求古训，博采众方，伤寒不灭，吾志不休。'
    ],
    interviewPrompt: '仲景于药案前把脉问诊，抬头叹道：‘疫疠横行，贫家束手待毙。富商大族屯药自肥，何以解天下之痛？’',
    discourseOptions: [
      {
        choiceText: '坞壁开仓设义诊大汤，遍植草药以广济众生',
        feedback: '张公大喜：“仁人之心！老夫愿将六经辨证方论悉数相授。”',
        statBonus: { health: 25, morality: 30, epidemicImmunity: true }
      },
      {
        choiceText: '编修医籍传布郡县，教化子弟知医明理',
        feedback: '张公赞叹：“传经布道莫大于此，万世受其福庇！”',
        statBonus: { iq: 20, clanPrestige: 25 }
      }
    ],
    deepAffinityStory: '医圣感佩君仁爱济民之心，亲临坞壁指导修建药圃义舍，全族世代得其调治，免于疾疫横行之灾。',
    interactionReward: { epidemicImmunity: true, health: 25 }
  },
  {
    id: 'hua_tuo',
    name: '华佗',
    courtesy: '元化',
    title: '沛国神医 · 外科医祖',
    lifespan: [145, 208],
    birthYear: 145,
    deathYear: 208,
    region: '沛国谯县',
    historicalSource: '《三国志·卷二十九·魏书·方技传第二十九·华佗传》',
    historicalFact: '通晓数经，辞沛相陈珪举孝廉之辟，潜心医术。发明‘麻沸散’施行全身剖腹手术，创编‘五禽之戏’引导养生，后为曹操所杀，其传世医书《青囊书》焚毁。',
    featureDesc: '精通针石割治与五禽之戏。受其调理可洗髓易筋，大幅上扬寿数天花板。',
    dialogueQuotes: [
      '人体欲得劳动，但不当使极耳。动摇则谷气得消，血脉流通，病不得生。',
      '神医非能逆天，唯导气化滞耳。'
    ],
    interviewPrompt: '元化携布囊，笑问道：‘吾之五禽戏，虎、鹿、熊、猿、鸟。后生试言之，何禽能化心胸之垒块？’',
    discourseOptions: [
      {
        choiceText: '猿戏敏捷以舒心志，虎戏扑按以壮筋骨',
        feedback: '华佗拊掌称奇：“妙极！神形俱动，百病不侵，真得五禽三昧。”',
        statBonus: { health: 30, baseLifespanBonus: 5 }
      },
      {
        choiceText: '剖肌疗疾不如全神养元，善养浩然之气',
        feedback: '华佗视君为通玄之士，赠麻沸散方与精致银针一套。',
        statBonus: { iq: 15, health: 20 }
      }
    ],
    deepAffinityStory: '华佗于危难之际避难于君之坞堡，君力拒追兵，华佗感念君义，留传《青囊外经》残篇，宗族代代相承，老幼皆享遐龄。',
    interactionReward: { health: 30, baseLifespanBonus: 5 }
  },
  {
    id: 'zhuge_liang',
    name: '诸葛亮',
    courtesy: '孔明',
    title: '蜀汉丞相 · 忠武武侯',
    lifespan: [181, 234],
    birthYear: 181,
    deathYear: 234,
    region: '琅琊阳都',
    historicalSource: '《三国志·卷三十五·蜀书·诸葛亮传第五》',
    historicalFact: '琅琊名族，躬耕南阳。刘备三顾茅庐，提出《隆中对》三分天下方略。治蜀严明法度，修明均输水利，发明木牛流马与连弩，鞠躬尽瘁，死而后已。',
    featureDesc: '经纬相才，治国如神。受其指点可获内政治国大略，兵法与度支经纬两全。',
    dialogueQuotes: [
      '静以修身，俭以养德。非淡泊无以明志，非宁静无以致远。',
      '鞠躬尽瘁，死而后已。'
    ],
    interviewPrompt: '诸葛武侯持羽扇，立于陇右舆图前：‘经世致用，度支与战阵孰重？宗族处乱世，何以安天下？’',
    discourseOptions: [
      {
        choiceText: '农耕水利为本，军纪度支为用，本固则邦宁',
        feedback: '武侯动容道：“足下所言，深合经国要义！本固邦宁，天下可图。”',
        statBonus: { iq: 25, eq: 20, promoBonus: 2, rep: 30 }
      },
      {
        choiceText: '修德政、慎赏罚，以诚待人，虽弱必兴',
        feedback: '武侯抚扇感叹：“不谋一时之利，谋万世之业，真乃知音！”',
        statBonus: { morality: 25, clanPrestige: 35 }
      }
    ],
    deepAffinityStory: '武侯亲笔题赠“俭德传家”墨宝，并托付治蜀度支要略图谱一份，君族产业与屯田法度由此大兴。',
    interactionReward: { iq: 25, eq: 20, promoBonus: 2, rep: 30 }
  },
  {
    id: 'sima_yi',
    name: '司马懿',
    courtesy: '仲达',
    title: '曹魏太傅 · 西晋奠基宣帝',
    lifespan: [179, 251],
    birthYear: 179,
    deathYear: 251,
    region: '河内温县',
    historicalSource: '《晋书·卷一·帝纪第一·宣帝纪》',
    historicalFact: '河内世家巨族，世吏二千石。初拒曹操征辟，后历事四朝，两度受托孤。嘉平元年发高平陵之变诛曹爽，为西晋代魏奠定门阀政权根基。',
    featureDesc: '深沉有大度，坚忍图存。与其推杯换盏可洞悉乱世隐忍自保与高维韬略。',
    dialogueQuotes: [
      '夫处世之道，亦即善藏之道。鸷鸟将击，卑飞敛翼；猛兽将搏，弭耳俯伏。',
      '得失之间，非一时一役之胜负。'
    ],
    interviewPrompt: '宣王端坐静室，目光如鹰隼穿云：‘朝中风云莫测，浮华之士争名于市朝。敢问阁下，何为万全之策？’',
    discourseOptions: [
      {
        choiceText: '敛锋芒于无形，厚培基业以待天下之衅',
        feedback: '司马懿目光一凛：“好一个待天下之衅！阁下深明善藏之妙！”',
        statBonus: { resilience: 30, iq: 20, clanPrestige: 30 }
      },
      {
        choiceText: '恪尽职守以图自保，不涉中朝争衡',
        feedback: '司马懿颔首称善：“明哲保身，知进知退，堪为世家保全之道。”',
        statBonus: { security: 25, eq: 20 }
      }
    ],
    deepAffinityStory: '司马氏代魏之际，君族以坚忍隐晦深得宣帝信任，受辟为太傅掾属，门阀位列上品，免遭任何清洗之虞。',
    interactionReward: { resilience: 30, iq: 20, clanPrestige: 30 }
  },
  {
    id: 'he_yan',
    name: '何晏',
    courtesy: '平叔',
    title: '魏尚书仆射 · 玄学首倡宗匠',
    lifespan: [195, 249],
    birthYear: 195,
    deathYear: 249,
    region: '南阳宛县',
    historicalSource: '《三国志·卷九·魏书·诸夏侯曹传第九·附何晏传》《世说新语·文学第四》',
    historicalFact: '汉大将军何进之孙，曹操养子。美姿仪，面至白，雅好老庄，与夏侯玄、王弼共开正始玄谈新风，撰《论语集解》。高平陵变后被司马懿夷灭三族。',
    featureDesc: '正始名士领袖，倡道玄理。与之清谈可破除名缰利锁，领悟哲思极境。',
    dialogueQuotes: [
      '天地以无心为心，圣人以无为为贵。',
      '唯深也，故能通天下之志。'
    ],
    interviewPrompt: '何尚书面如白玉，手挥麈尾：‘名教本于自然，抑或出于圣人之意？后生何以教我？’',
    discourseOptions: [
      {
        choiceText: '天地同根，名教自应顺乎天地之自然',
        feedback: '何晏击节称赏：“妙论！同道之人，当入正始雅集共论玄微！”',
        statBonus: { culture: 25, eq: 15, freeSpiritTag: true }
      },
      {
        choiceText: '规矩礼度固然，心神自在更当逍遥',
        feedback: '何晏相视大笑：“名缰利锁，何足挂怀！痛饮此觞！”',
        statBonus: { freeSpiritTag: true, rep: 15 }
      }
    ],
    deepAffinityStory: '正始玄学风靡海内，何平叔将君撰写的玄谈清思列于太学首座，洛阳士子争相传颂君族名声。',
    interactionReward: { culture: 25, eq: 15, freeSpiritTag: true }
  },
  {
    id: 'wang_bi',
    name: '王弼',
    courtesy: '辅嗣',
    title: '魏尚书郎 · 易学玄辨宗师',
    lifespan: [226, 249],
    birthYear: 226,
    deathYear: 249,
    region: '山阳高平',
    historicalSource: '《三国志·卷二十八·魏书·钟会传·注引何劭王弼传》',
    historicalFact: '山阳王氏，高平名族，建安七子王粲之从孙。十余岁便辨析名理，著《老子注》《周易注》，开创魏晋义理玄学，年仅二十四岁染疫病卒。',
    featureDesc: '早慧哲思宗匠，玄理通透。与其研讨《周易》可通晓天地变化之机。',
    dialogueQuotes: [
      '名必有所分，称必有所由。由名不能得其意，由意乃可以尽其情。',
      '寻言以观象，寻象以观意。'
    ],
    interviewPrompt: '年方弱冠的王辅嗣目光炯炯：‘《老子》云“道可道，非常道”。言意之间，孰得其真？’',
    discourseOptions: [
      {
        choiceText: '得意而忘象，得象而忘言',
        feedback: '王弼惊为知音，抚掌呼道：“得吾意者，足下也！此千古玄义也！”',
        statBonus: { iq: 25, culture: 20, rep: 15 }
      },
      {
        choiceText: '道在日常日用之间，不离宗族日作之实',
        feedback: '王弼称许道：“玄意不远人，能将义理化为践履，笃实君子也。”',
        statBonus: { iq: 15, morality: 15 }
      }
    ],
    deepAffinityStory: '王弼临没之岁，将《周易略例》草稿赠于君，托付校订，使得君族成为天下易理玄学传世正脉。',
    interactionReward: { iq: 25, culture: 20, rep: 15 }
  },
  {
    id: 'ji_kang',
    name: '嵇康',
    courtesy: '叔夜',
    title: '中散大夫 · 竹林七贤领袖',
    lifespan: [224, 263],
    birthYear: 224,
    deathYear: 263,
    region: '谯国铚县',
    historicalSource: '《晋书·卷四十九·列传第十九·嵇康传》《世说新语·雅量第六》',
    historicalFact: '迎娶曹林之女，拜中散大夫。崇奉老庄，撰《养生论》《幽愤诗》。不顺司马氏虚伪名教，遭钟会谮言陷害，神采晏然抚《广陵散》赴刑于洛阳东市。',
    featureDesc: '高卧东平，抚琴长啸。深得老庄玄旨，引为知己可得风骨傲岸、坚贞不屈。',
    dialogueQuotes: [
      '越名教而任自然，审好恶而安称量。',
      '广陵散于今绝矣！但神明之姿，岂能受污于世俗之笼？'
    ],
    interviewPrompt: '嵇叔夜披发打铁于大树之下，火星飞溅。头也不回问道：‘来客何求？若为功名富贵而来，请速退！’',
    discourseOptions: [
      {
        choiceText: '不求功名，特携山野佳酿，来听先生一曲《广陵》',
        feedback: '嵇康掷锤大笑：“痛快！取琴来，山水之间正当与知己长啸！”',
        statBonus: { resilience: 30, courage: 20, freeSpiritTag: true }
      },
      {
        choiceText: '敬公风骨天成，世路多艰，愿为君护持家人',
        feedback: '嵇康目光温和，郑重抱拳：“足下高义，嵇康铭诸五内。”',
        statBonus: { morality: 25, clanPrestige: 25 }
      }
    ],
    deepAffinityStory: '东市就义前夕，嵇康密将孤幼山涛托孤之诺信函与琴谱托付于君，君守诺护持嵇门遗脉，天下士人莫不敬重君之高义。',
    interactionReward: { resilience: 30, courage: 20, freeSpiritTag: true }
  },
  {
    id: 'ruan_ji',
    name: '阮籍',
    courtesy: '嗣宗',
    title: '步兵校尉 · 竹林逸才行吟',
    lifespan: [210, 263],
    birthYear: 210,
    deathYear: 263,
    region: '陈留尉氏',
    historicalSource: '《晋书·卷四十九·列传第十九·阮籍传》',
    historicalFact: '建安七子阮瑀之子。嗜酒好老庄，博览群籍，喜怒不形于色，能为青白眼。见司马氏篡夺，痛哭穷途，饮酒沉醉以避祸，作《咏怀诗》八十二首。',
    featureDesc: '狂狷避世，洞察时艰。与之把酒言欢可消解朝省凶险，习得避世自保真诠。',
    dialogueQuotes: [
      '时无英雄，使竖子成名！',
      '行迈靡靡，中心摇摇。夜中不能寐，起坐弹鸣琴。'
    ],
    interviewPrompt: '阮步兵烂醉于大醉之境，长啸一声，忽转青白眼逼视于君：‘子视我为狂徒乎？为悲客乎？’',
    discourseOptions: [
      {
        choiceText: '先生非狂，乃大悲悯世、寄情长啸耳',
        feedback: '阮籍双目落泪，转作青眼相迎：“世人皆醉，唯君见我肺腑！”',
        statBonus: { eq: 25, resilience: 25, freeSpiritTag: true }
      },
      {
        choiceText: '世途穷处当哭，然君之文章，百代犹照汗青',
        feedback: '阮籍抚君之背，痛饮不绝，引君为忘机世外友。',
        statBonus: { culture: 20, resilience: 20 }
      }
    ],
    deepAffinityStory: '阮籍闭门撰《大人先生传》，唯许君于雪夜入室同坐，醉中指点魏晋士族保全之道，使君族在曹马鼎革中毫发无损。',
    interactionReward: { eq: 25, resilience: 25, freeSpiritTag: true }
  },
  {
    id: 'wang_xiang',
    name: '王祥',
    courtesy: '休征',
    title: '晋太保 · 琅琊王氏开基元勋',
    lifespan: [184, 268],
    birthYear: 184,
    deathYear: 268,
    region: '琅琊临沂',
    historicalSource: '《晋书·卷三十三·列传第三·王祥传》',
    historicalFact: '琅琊临沂名族。性至孝，早年侍奉继母有‘卧冰求鲤’之德。历仕汉魏晋三朝，位登太保，临终诫子孙以‘夫书之说，道德纯笃’，奠定琅琊王氏江左鼎盛之基。',
    featureDesc: '以孝悌著称于世，辅佐三朝，门第鼎盛。与之结秦晋之好可晋升上品门资。',
    dialogueQuotes: [
      '夫书之说，道德纯笃，各相敬让。夫清者，政之本也；让者，德之主也。',
      '百行以孝为先，治家以慎为要。'
    ],
    interviewPrompt: '王公年逾古稀，手拄鸠杖立于宗祠前：‘家之兴衰，在富贵乎？在官爵乎？抑在诗书德行乎？’',
    discourseOptions: [
      {
        choiceText: '不以浮利移志，唯以德厚温良传于子孙',
        feedback: '王祥大为赞许：“积善之家必有余庆，君得治家之精义！”',
        statBonus: { alliancePrestige: 50, nobleRankBonus: 1, clean: 20 }
      },
      {
        choiceText: '孝悌敦笃，宗族守望，虽逢乱世必固',
        feedback: '王祥连连称善：“敦睦亲族，方是门第百年不倒之柱石。”',
        statBonus: { clanPrestige: 35, morality: 25 }
      }
    ],
    deepAffinityStory: '王祥以三公之重，手书家训碑石赠予君族宗祠，并为君之子嗣执柯定盟，结成琅琊王氏与君族的百载通家之好。',
    interactionReward: { alliancePrestige: 50, nobleRankBonus: 1, clean: 20 }
  },
  {
    id: 'pei_xiu',
    name: '裴秀',
    courtesy: '季彦',
    title: '晋司空 · 科学制图学鼻祖',
    lifespan: [224, 271],
    birthYear: 224,
    deathYear: 271,
    region: '河东闻喜',
    historicalSource: '《晋书·卷三十五·列传第五·裴秀传》',
    historicalFact: '河东名族裴氏。魏晋易代功臣，官至司空。精通地学与经世之术，作《禹贡地域图》，开创‘分率、准望、道里、高下、方邪、迂直’之制图六体理论。',
    featureDesc: '河东望族名公，舆地舆图宗匠。得其指点可通晓九州关津商路与坞壁度支。',
    dialogueQuotes: [
      '制图之体有六：一曰分率，二曰准望，三曰道里，四曰高下，五曰方邪，六曰迂直。',
      '研经究舆，经世利民。'
    ],
    interviewPrompt: '裴司空铺展《禹贡地域图》，尺规精微：‘山川道里，毫厘之差千里之谬。庄园营筑，何以辨山水之脉？’',
    discourseOptions: [
      {
        choiceText: '准望以定方位，分率以审广袤，依山傍水循自然之理',
        feedback: '裴秀欣喜过望：“先生精微！六体之用，尽在经纬算理之间！”',
        statBonus: { iq: 20, craftBonus: 25, rep: 20 }
      },
      {
        choiceText: '绘图如治国，正本清源，步步有规有矩',
        feedback: '裴秀称赞：“经世之才！治图如此，治郡亦当如是。”',
        statBonus: { iq: 15, officialRep: 25 }
      }
    ],
    deepAffinityStory: '裴公依君族坞壁地利，亲手为君绘制《宗族百里庄园舆图》，明察地下暗泉与沃土脉络，使君族庄稼产出倍增。',
    interactionReward: { iq: 20, craftBonus: 25, rep: 20 }
  },
  {
    id: 'huangfu_mi',
    name: '皇甫谧',
    courtesy: '士安',
    title: '征士高士 · 针灸学与史学宗匠',
    lifespan: [215, 282],
    birthYear: 215,
    deathYear: 282,
    region: '安定朝那',
    historicalSource: '《晋书·卷五十一·列传第二十一·皇甫谧传》',
    historicalFact: '汉太尉皇甫嵩之孙。幼贫笃学，手不释卷。晋武帝累征不就，自称玄晏先生。因患风痹自刺经脉，著成中国第一部针灸专著《针灸甲乙经》及《高士传》。',
    featureDesc: '安贫乐道，博通史传与经脉。与其研讨可获针灸固本培元，全家去病延年。',
    dialogueQuotes: [
      '夫医者，意也。研察阴阳，探赜幽微，起死回生在乎一针。',
      '朝廷以厚币征召，吾宁躬耕山野，手注甲乙。'
    ],
    interviewPrompt: '玄晏先生端坐石几，施金针于穴位：‘形神合一，方得长生。君日夜经营宗族，神耗形敝，何以养生？’',
    discourseOptions: [
      {
        choiceText: '淡泊寡欲，调顺经脉，以山水养天真',
        feedback: '皇甫谧微颔首，亲施金针导气，传授《甲乙经》养元之法。',
        statBonus: { health: 25, culture: 20, resilience: 25 }
      },
      {
        choiceText: '体察万物生机，不以物喜，不以己悲',
        feedback: '皇甫谧赞叹：“达生之士也！养神者神全，养形者形固。”',
        statBonus: { health: 20, iq: 15 }
      }
    ],
    deepAffinityStory: '皇甫公晚年风痹，感念君长年资助药石书籍之德，将平生秘纂《历代帝王世纪》与针灸真传尽授君家子弟。',
    interactionReward: { health: 25, culture: 20, resilience: 25 }
  },
  {
    id: 'ma_jun',
    name: '马钧',
    courtesy: '德衡',
    title: '魏给事中 · 百工机巧天下第一',
    lifespan: [200, 265],
    birthYear: 200,
    deathYear: 265,
    region: '扶风',
    historicalSource: '《三国志·卷二十九·魏书·杜夔传·注引傅玄记马钧事》',
    historicalFact: '天下巧思之极。少时游于温县，后入曹魏。改进织绫机提升效率数倍；研创‘龙骨翻车’提水灌溉；复原周代指南车；创制水转百戏机关，惠及农工。',
    featureDesc: '巧思通神，天下巧匠。得其设计图谱可大幅提升坞壁水碓与庄园农田产出。',
    dialogueQuotes: [
      '天下名巧，虚辩不如实效。能使民受其实者，方为至巧。',
      '木石有性，运之在心，巧夺天工何难之有？'
    ],
    interviewPrompt: '马给事于匠肆中摆弄齿轮模型：‘朝中诸公笑吾口讷，以为巧器乃奇技淫巧。君亦如此以为乎？’',
    discourseOptions: [
      {
        choiceText: '水转百戏，翻车灌田，此乃富国安民之大功德也！',
        feedback: '马钧热泪盈眶：“得君一言，胜过朝堂千言！老朽立赠水器图谱！”',
        statBonus: { craftBonus: 35, capital: 10000, iq: 15 }
      },
      {
        choiceText: '器成事遂，工巧者为民省力，胜却千万浮辩',
        feedback: '马钧连连称快，亲临坞壁修筑翻车水磨。',
        statBonus: { craftBonus: 25, manorExpansion: 20 }
      }
    ],
    deepAffinityStory: '马钧毕生研制之指南车齿轮法度与灌溉提水机关图谱，全数托付君家妥善珍藏，君族工坊技艺冠绝诸郡。',
    interactionReward: { craftBonus: 35, capital: 10000, iq: 15 }
  }
];

// 3. 汉魏重大历史关隘大案 (贯穿公元100~300年 · 17大标准历史大案 · 严循《后汉书》《三国志》《晋书》考据 · 卷一至卷四无空白窗口)
const HAN_WEI_CRITICAL_CHRONO_EVENTS = [
  {
    id: 'hw_event_100_yongyuan',
    year: 100,
    title: '永元辟地 · 门第初奠',
    historicalSource: '《后汉书·卷四·孝和帝纪第四》《后汉书·窦宪列传第十三》',
    historicalFact: '汉和帝永元十二年，和帝亲政，扫荡窦氏外戚专权，海内大赦，休养生息。天下名豪大姓顺应时势，度田营庄，开辟宗茔，营筑深壁固垒之坞壁，招抚流民，传抄经义，汉魏门阀之基由是勃兴。',
    historicalContext: '汉和帝永元十二年，朝野风波初定。宗族始祖卜筑故土，买田置产营建坞壁，正是奠定百年基业的破土之岁。',
    options: [
      {
        text: '选山南水北膏腴之地，深筑厚石坞壁以备乱世',
        reqStat: 'courage',
        reqVal: 40,
        successReward: { courage: 15, security: 35, clanPrestige: 30, manorExpansion: 25, text: '坞壁依山傍水，厚墉深池，族人安居，基业固若金汤！' },
        failPenalty: { money: -1000, security: 15, text: '采石筑壁虽费颇多，终使族人有了遮风避雨之固垒。' }
      },
      {
        text: '开馆聚徒讲授齐鲁经学，广纳乡党英彦为门生',
        reqStat: 'iq',
        reqVal: 40,
        reqTrack: 'official',
        successReward: { iq: 15, rep: 35, morality: 25, clanPrestige: 35, text: '设帐讲经生徒数百人，声动州郡，世称名族！' },
        failPenalty: { money: -600, rep: 15, text: '购置典册开馆，虽清苦简素，门风自此笃正。' }
      },
      {
        text: '辟水碓工坊，垦治桑麻鱼塘，厚积资财谷帛',
        cost: { money: 800 },
        successReward: { craftBonus: 20, capital: 3500, clanPrestige: 20, text: '水碓转动日进万斛，仓廪充实，宗族用度大为宽裕！' }
      }
    ]
  },
  {
    id: 'hw_event_105_cailun',
    year: 105,
    title: '元兴造纸 · 洛阳传经',
    historicalSource: '《后汉书·卷七十八·宦者列传第六十八·蔡伦传》',
    historicalFact: '汉和帝元兴元年，尚方令蔡伦改进造纸之术，以树肤、麻头、敝布、鱼网造纸，奏上之，帝善其能，自是天下莫不从用，号曰‘蔡侯纸’。经学大姓由是摆脱沉重竹简与昂贵缣帛，大兴传抄家学经义之风。',
    historicalContext: '尚方蔡侯纸风行京师洛阳，本族名阀若要扩大家学声誉，须决断是否建纸作坊与广抄经典。',
    options: [
      {
        text: '投建族中纸坊，广聘巧匠研造精纸传抄古文尚书',
        reqStat: 'iq',
        reqVal: 45,
        successReward: { iq: 15, rep: 30, clanPrestige: 25, craftBonus: 20, text: '族中造纸精绝一时，抄录《五经》百卷，门徒咸至，文名赫赫！' },
        failPenalty: { money: -800, iq: 5, rep: 10, text: '初试纸作坊耗费颇多，虽未大成，亦得抄本数册自娱。' }
      },
      {
        text: '重金采买蔡侯纸千领，命族中子弟抄写祖训与章句家规',
        cost: { money: 1000 },
        successReward: { morality: 15, rep: 15, clanPrestige: 20, text: '纸本祖训永续传世，子弟日诵经书，族风丕振。' }
      },
      {
        text: '墨守简牍古制，不染流俗',
        successReward: { security: 10, clanPrestige: 5, text: '恪守竹简汉隶旧章，虽免开销，传学未免稍滞。' }
      }
    ]
  },
  {
    id: 'hw_event_121_dengtai',
    year: 121,
    title: '建光太后崩 · 邓氏覆案',
    historicalSource: '《后汉书·卷十上·和熹邓皇后纪》《资治通鉴·卷五十·汉纪四十二》',
    historicalFact: '建光元年三月，临朝十六年之和熹邓太后崩逝。中常侍江京、李闰等谮告邓氏宗族擅权图谋不轨，安帝废免邓氏，收太后兄弟皆迫令自杀。邓氏门生故吏多遭株连，士人清议大哗，海内震骇。',
    historicalContext: '和熹邓太后崩逝，外戚大遭诛戮。京中邓氏故吏流亡求庇，朝廷罗织罪名，世家门阀风声鹤唳。',
    options: [
      {
        text: '义不负旧，冒死上书为清白故吏辨枉',
        reqStat: 'courage',
        reqVal: 50,
        reqTrack: 'official',
        successReward: { courage: 20, rep: 40, morality: 30, clanPrestige: 35, text: '慷慨直言震动朝野，海内名士同声赞颂，世家气节无双！' },
        failPenalty: { money: -1500, rep: 10, text: '虽遭贬谪免职，海内却知先生仗义，声望不减反增。' }
      },
      {
        text: '资助故吏千钱并提供引荐信，隐遁山野避祸',
        cost: { money: 1200 },
        successReward: { rep: 20, morality: 20, clanPrestige: 15, text: '全其性命脱离险境，善结善缘，门生感佩铭骨。' }
      },
      {
        text: '焚毁往来尺牍，严守门户自保',
        successReward: { security: 25, rep: -10, text: '切断牵连，宗族上下虽安稳无虞，微招清议指摘。' }
      }
    ]
  },
  {
    id: 'hw_event_132_zhangheng',
    year: 132,
    title: '阳嘉地动 · 候风仪应',
    historicalSource: '《后汉书·卷五十九·张衡列传第四十九》《后汉书·顺帝纪第六》',
    historicalFact: '汉顺帝阳嘉元年，太史令张衡造候风地动仪。陇西地裂山崩，京师虽不觉动，仪机已发，八龙吐丸。驿马飞报陇西地动，朝野公卿叹服神明。顺帝召集贤良方正策问消灾救困之道。',
    historicalContext: '张衡地动仪神机妙验，陇西地动千里传书。汉顺帝下诏求直言并调集天下豪商望族开仓赈灾。',
    options: [
      {
        text: '应诏上策治道，兼献抗震保垒营造图法',
        reqStat: 'iq',
        reqVal: 50,
        successReward: { iq: 20, rep: 35, clanPrestige: 30, officialTitle: '太史治道参议', text: '策论切中机枢，营造保民之法颁布州郡，天子嘉奖！' },
        failPenalty: { rep: 10, text: '奏疏陈义稍高，虽未全面采用，亦得顺帝优诏慰勉。' }
      },
      {
        text: '调集族中粮栈仓廪，火速运送谷帛前往陇西赈灾',
        cost: { money: 2000 },
        successReward: { rep: 45, morality: 35, clanPrestige: 40, newMottoTag: '兼济天下', text: '赈济万民活人无数，陇西士民立生祠以颂陈公之德！' }
      },
      {
        text: '闭门参悟阴阳五行灾异，撰述经书',
        successReward: { iq: 15, clanPrestige: 10, text: '闭户研学，撰成《灾异五行考》，家学日趋笃实。' }
      }
    ]
  },
  {
    id: 'hw_event_140_xixiang',
    year: 140,
    title: '永和羌烽 · 关陇深垒',
    historicalSource: '《后汉书·卷八十七·西羌传第七十七》《资治通鉴·卷五十二·汉纪四十四》',
    historicalFact: '汉顺帝永和五年，且冻、傅末羌等大寇金城、陇西、三辅，四郡震恐。朝廷重臣议欲弃凉州内徙移民，李固力陈保土安民之重。关陕豪强士大夫毁家纾难，大筑坞壁，募合宗党乡兵自卫，汉土遂全。',
    historicalContext: '西羌烽燧燃及关辅，朝议纷纭欲弃凉土。数万流民涌入乡原，宗族坞壁正值生死存亡关口。',
    options: [
      {
        text: '拓建深沟高垒，接纳收编流民为庄园客丁',
        reqStat: 'courage',
        reqVal: 50,
        successReward: { courage: 20, rep: 30, clanPrestige: 35, manorExpansion: 30, text: '坞堡高耸宛若磐石，得壮勇数百丁，庄园农耕水碓大兴！' },
        failPenalty: { money: -1800, health: -10, text: '强御盗寇折损族丁数人，虽受轻创终得保全全堡。' }
      },
      {
        text: '联合周围同姓世家，组建三辅豪族联防乡团',
        cost: { money: 1800 },
        successReward: { rep: 35, clanPrestige: 35, allianceBonus: 20, text: '互为犄角守望相助，贼骑望垒而逃，名震关陕！' }
      },
      {
        text: '迁避关东祖籍，暂避羌乱锋芒',
        successReward: { security: 30, money: -800, text: '全族东撤避入洛阳，虽损祖产，所幸阖族安泰。' }
      }
    ]
  },
  {
    id: 'hw_event_166_yanxi',
    year: 166,
    title: '延熹党狱 · 太学伏阙',
    historicalSource: '《后汉书·卷六十七·党锢列传第五十七》《资治通鉴·卷五十五·汉纪四十七》',
    historicalFact: '汉桓帝延熹九年，司隶校尉李膺、太仆杜密等清正名臣绳纠宦官外戚，太学诸生三万余人盛倡清议，呼应士林。中常侍曹节等谗言构陷李膺等结党乱政，桓帝大怒捕收名士二百余人。太学生贾彪、郭泰等奔走呼号，伏阙上书，海内士大夫争相附翼抗争。',
    historicalContext: '延熹九年，李膺等下狱，太学三万士生悲愤交加，伏阙呼冤，士人清议与宦官权阉正面搏杀。',
    options: [
      {
        text: '遣族中才俊直赴宫阙，参与伏阙联名上书声援李公',
        reqStat: 'courage',
        reqVal: 50,
        reqTrack: 'scholar',
        successReward: { courage: 20, rep: 40, morality: 30, clanPrestige: 35, text: '伏阙直言震动九重天阙！虽遭廷杖，名动京华，士林同钦！' },
        failPenalty: { health: -15, rep: 20, text: '直言受挫下狱羁押，幸蒙赦令得脱，海内咸知世家骨鲠。' }
      },
      {
        text: '出资设洛阳邸阁，接济流亡无着之太学寒士',
        cost: { money: 1500 },
        successReward: { morality: 25, rep: 30, clanPrestige: 25, text: '暗设邸阁广纳士子，庇佑文脉，受救者皆成后日世家柱石门生。' }
      },
      {
        text: '杜门谢客，专心研治《周易》，不与朝局是非',
        successReward: { iq: 15, security: 20, clanPrestige: 10, text: '闭户治经，虽免株连之灾，士林清声稍逊。' }
      }
    ]
  },
  {
    id: 'hw_event_168_danggu',
    year: 168,
    title: '建宁党锢 · 孤舟叩坞',
    historicalSource: '《后汉书·卷六十七·党锢列传第五十七》《资治通鉴·卷五十六·汉纪四十八》',
    historicalFact: '汉灵帝建宁元年九月，宦官曹节、王甫等矫诏诛太傅陈蕃、大将军窦武，次年大索天下‘党人’，李膺、杜密等海内贤士数百人遇害或禁锢终身，门生故吏父子兄弟皆免官废锢。天下名士流亡山野，豪强大姓坞壁多有藏匿。',
    historicalContext: '汉灵帝建宁元年，曹节等诛害陈蕃窦武，大搜天下名士。深夜，浑身血迹的党人名士叩响了宗族坞堡木门……',
    options: [
      {
        text: '大开中门，将名士藏匿于后山夹壁地窖',
        reqStat: 'courage',
        reqVal: 50,
        reqTrack: 'official',
        successReward: { courage: 15, rep: 35, morality: 30, clanPrestige: 30, text: '冒死开坞匿党人名士，名播海内，奠定世家清议风骨。' },
        failPenalty: { money: -2000, health: -15, rep: 15, text: '搜捕官差破坞拷问，族人死守不吐一人，历尽酷刑保全名节。' }
      },
      {
        text: '奉赠快马盘缠与干粮，连夜密送出境',
        cost: { money: 1200 },
        successReward: { rep: 15, morality: 10, clanPrestige: 15, text: '赠马赍粮密送党人，既全道义，复保宗族无虞。' }
      },
      {
        text: '闭坞自保，不纳是非之人',
        successReward: { security: 20, rep: -10, morality: -10, text: '乱世自守，闭门谢客，虽免刀兵之虞，清声微损。' }
      }
    ]
  },
  {
    id: 'hw_event_184_huangjin',
    year: 184,
    title: '中平黄巾 · 烽火围庄',
    historicalSource: '《后汉书·卷七十一·皇甫嵩朱儁列传第六十一》《后汉书·卷八·孝灵帝纪第八》',
    historicalFact: '中平元年春，巨鹿张角自称‘天公将军’，传三十六方妖术符水，以‘苍天已死，黄天当立，岁在甲子，天下大吉’起兵，旬月之间，天下八州响应。朝廷震恐，弛党锢，发天下精兵，豪强士族纷纷筑深垒结乡兵自守。',
    historicalContext: '巨鹿张角起事，天下八州响应。数千饥军合围本族庄园，城濠欲破，族丁惊恐。',
    options: [
      {
        text: '鸣钲聚族，老少持长矛登墙死守',
        reqStat: 'courage',
        reqVal: 55,
        successReward: { courage: 25, rep: 30, clanPrestige: 35, officialTitle: '汉故义勇亭侯', text: '族人死战却敌，阵斩其帅，宗族威名大振！' },
        failPenalty: { money: -3000, health: -20, clanPrestige: 10, text: '外院粮仓被焚，族老死难数人，血战突围保全本阵。' }
      },
      {
        text: '大开仓廪，架十口大铜锅施稀粥化解兵锋',
        cost: { money: 2500 },
        successReward: { rep: 40, morality: 30, clanPrestige: 30, newMottoTag: '以德化暴', text: '倾家资设粥厂赈济饥民，数万乱军拜伏感泣而去，仁风播于四野。' }
      },
      {
        text: '坚壁清野，率宗族老幼退入太行深山密坞',
        successReward: { money: -1500, resilience: 20, clanPrestige: 15, text: '深壁固垒隐居深山，开荒垦田，虽失浮财，元气无损。' }
      }
    ]
  },
  {
    id: 'hw_event_190_dongzhuo',
    year: 190,
    title: '董卓乱政 · 废钱用帛',
    historicalSource: '《三国志·卷六·魏书·董卓传第六》《后汉书·卷七十二·董卓列传第六十二》',
    historicalFact: '初平元年，董卓迁都长安，焚烧洛阳宫室宗庙，发掘帝陵公卿冢墓。董卓悉椎破洛阳铜人钟鐻飞廉铸小钱，钱无轮郭文章，人莫能买卖，由是钱轻不复行，一斛谷至数百乃至千万钱，货殖崩溃，自此数十年天下以谷帛为币。',
    historicalContext: '董卓悉椎洛阳铜人小钱，滥发薄币，钱轻不复行，一斛谷直数百万。市场崩溃，商贾流亡。',
    options: [
      {
        text: '坚决废止铜钱，推行【布帛粟米以物易物】自立商市',
        reqStat: 'iq',
        reqVal: 50,
        reqTrack: 'merchant',
        successReward: { money: 10000, iq: 15, clanPrestige: 25, text: '以粟帛为币，全乡商贾借我坞自保，经世资财暴增数倍。' },
        failPenalty: { money: -1000, iq: 5, text: '仓促易货，周转受挫，然终免化为飞灰。' }
      },
      {
        text: '设立宗族【平准义仓】，以平价向邻里放粮',
        cost: { money: 2500 },
        successReward: { rep: 40, morality: 30, clanPrestige: 30, officialTitle: '郡举孝廉', text: '荒年设平准义仓济民，活人无数，郡守亲书举荐为孝廉。' }
      },
      {
        text: '倾资收购洛阳士民抛售的珍贵经史典籍与字画',
        cost: { money: 3500 },
        successReward: { culture: 45, clanPrestige: 40, heirloom: 'ancient_book_scroll', text: '乱世藏书！数十车先秦两汉孤本经卷尽归族中藏书楼，文脉无双！' }
      }
    ]
  },
  {
    id: 'hw_event_208_chibi',
    year: 208,
    title: '赤壁前夜 · 群雄从违',
    historicalSource: '《三国志·卷一·魏书·武帝纪第一》《三国志·卷三十五·蜀书·诸葛亮传第五》',
    historicalFact: '建安十三年秋，曹操平定荆州南下，刘琏投降，刘备败走当阳，孙权遣鲁肃结好备，诸葛亮舌战江东群儒促成孙刘联盟。赤壁之战曹操遇挫北归，确立三国鼎峙根基，荆襄士族分流南北。',
    historicalContext: '曹操大军南下，旌旗漫天。南阳、襄樊豪族皆面临站队，郡府文檄催促我族长子出仕参军。',
    options: [
      {
        text: '送长子赴丞相府任记室参军',
        successReward: {
          rep: 25,
          officialTitle: '汉丞相府主簿',
          clanPrestige: 25,
          futureConnection: 'wei_court',
          text: '子弟效命北方汉丞相府，历经风云，为家族结下中原高门之脉。'
        }
      },
      {
        text: '举族分家：一支出襄樊投刘豫州与孙吴，一支留守祖茔',
        successReward: {
          resilience: 30,
          clanPrestige: 25,
          branchFlag: 'south_north_split',
          text: '审时度势，南北分流，狡兔双窟，南宗开基江南，北宗守望桑梓。'
        }
      },
      {
        text: '托病辞征，闭户注疏《古文尚书》与《三礼》',
        reqStat: 'iq',
        reqVal: 60,
        successReward: {
          iq: 25,
          rep: 20,
          clanPrestige: 20,
          heirloom: 'cai_yong_qin',
          text: '淡泊名利，杜门注经，撰就《家传尚书疏》，文宗自此始立。'
        },
        failPenalty: {
          rep: 5,
          text: '闭户治学，虽无当道青睐，然门庭肃穆，子弟醇和。'
        }
      }
    ]
  },
  {
    id: 'hw_event_211_jianan',
    year: 211,
    title: '邺下雅集 · 建安风骨',
    historicalSource: '《三国志·卷二十一·魏书·王粲传第二十一》《宋书·卷六十七·列传第二十七·谢灵运传论》',
    historicalFact: '汉献帝建安十六年，魏太子曹丕及临淄侯曹植留邺都，延揽天下文苑英彦，孔融、陈琳、王粲、徐干、阮瑀、应玚、刘桢等齐聚邺城。置酒高宴，登铜雀台，极高谈清言，抒慷慨怀抱，建安风骨由是垂范千载。',
    historicalContext: '邺都铜雀高台宴饮，曹丕曹植大会名士。文人七子援翰成飞章，本族受邀入席赴宴。',
    options: [
      {
        text: '登台引觞长啸，赋《邺中感遇篇》，直抒济世匡时之志',
        reqStat: 'iq',
        reqVal: 55,
        reqTrack: 'scholar',
        successReward: { iq: 25, rep: 40, clanPrestige: 35, officialTitle: '邺都文学掾', text: '辞章俊逸慷慨，曹丕曹植抚掌激赏，名动邺下七子之列！' },
        failPenalty: { rep: 10, text: '诗文辞气稍显沉郁，虽未拔头筹，亦获中流名声。' }
      },
      {
        text: '暗结仓曹与水利名流，经略邺下漕运与盐铁工坊',
        cost: { money: 2000 },
        successReward: { capital: 6000, craftBonus: 25, clanPrestige: 25, text: '借名流雅集之便打通黄河舟车货殖，宗族利济大增！' }
      },
      {
        text: '敬肃奉礼，严守经师家传章句古义，不尚辞赋浮华',
        successReward: { morality: 20, clean: 15, clanPrestige: 20, text: '笃守家学古礼，公卿叹为醇儒高门。' }
      }
    ]
  },
  {
    id: 'hw_event_217_dayi',
    year: 217,
    title: '建安廿二年 · 疠气横野',
    historicalSource: '曹丕《与吴质书》《三国志·卷二十一·魏书·王粲传第二十一》',
    historicalFact: '建安二十二年冬，中原疠气大疫，曹丕在信中哀叹：‘昔年疾疫，亲故多离其灾，徐、陈、应、刘，一时俱逝，痛可言邪！’建安七子大半殒命于是岁。张仲景、华佗之学成为天下活人救命之津梁。',
    historicalContext: '天下大疫，家家有僵尸之痛，室室有号泣之哀。建安七子中徐干、陈琳、应玚、刘桢一时俱逝。',
    options: [
      {
        text: '严守坞壁水源，辟单舍隔离熏艾，按古方煎药',
        reqStat: 'health',
        reqVal: 50,
        successReward: { health: 25, rep: 30, clanPrestige: 35, text: '严整规置病舍，遵古训严断内外水源，全族三百口保全无恙，四乡称仁。' },
        failPenalty: { health: -20, text: '虽竭力防断，疠气深重，痛失数名族人，哀毁骨立。' }
      },
      {
        text: '倾千金求访名医张仲景门人，重购伤寒良方并煎大汤济众',
        cost: { money: 3000 },
        successReward: { health: 20, morality: 40, rep: 45, clanPrestige: 45, heirloom: 'shanghan_treatise', newMottoTag: '杏林济众', text: '千金得医圣秘方，通煎柴胡麻黄大汤全活老幼，收得传家秘卷《伤寒要旨》。' }
      },
      {
        text: '闭坞避客，深储清泉与腊肉干粮以待天时',
        successReward: { health: 15, clanPrestige: 15, text: '深居简出，虽不与外物交涉，宗族生灵得以保全。' }
      }
    ]
  },
  {
    id: 'hw_event_220_jiupin',
    year: 220,
    title: '黄初建国 · 九品中正',
    historicalSource: '《三国志·卷二十二·魏书·陈群传第二十二》《通典·卷十四·选举二》',
    historicalFact: '魏文帝曹丕延康元年登基改元黄初，尚书令陈群奏立‘九品官人法’。以郡国特设大小中正，品第人才为九等，兼收门资与德行，标志士族门阀与曹魏皇权达成制度妥协，奠定魏晋三百年门阀政治基础。',
    historicalContext: '魏文帝曹丕纳陈群之议，立九品官人法，以中正官品第天下士人。上品无寒门，下品无势族。',
    options: [
      {
        text: '精心呈递宗族三代行状与清议赞词，力争【二品上品】门第',
        reqStat: 'rep',
        reqVal: 65,
        successReward: { nobleTier: 2, clanPrestige: 60, heirloom: 'jiupin_gold_tablet', text: '大中正核定我族为【乡品二品】，正式跻身朝廷顶级世族行列！' },
        failPenalty: { rep: -10, text: '门第资历稍逊，仅评定为中品，族人深以为耻，发奋图强。' }
      },
      {
        text: '清谈避席，辞不赴选，以逸民高风自居',
        successReward: { resilience: 30, clanPrestige: 30, text: '高蹈独步，天下名士交口称誉，不仕而名动公卿。' }
      }
    ]
  },
  {
    id: 'hw_event_249_gaopingling',
    year: 249,
    title: '正始之变 · 高平陵风云',
    historicalSource: '《晋书·卷一·帝纪第一·宣帝纪》《三国志·卷四·魏书·三少帝纪第四》',
    historicalFact: '魏嘉平元年春，大将军曹爽辅少帝曹芳谒魏明帝高平陵。太傅司马懿称太后令突闭洛阳四门，夺武库占洛水桥。曹爽信其免死指洛水为誓之诺放弃抵抗，司马懿旋即食言，以谋反罪夷灭曹爽、何晏、丁谧等三族，司马氏专政。',
    historicalContext: '司马懿趁曹爽陪同少帝谒高平陵，突闭洛阳城门，发政变夺权。朝野震动，去留站队关乎九族。',
    options: [
      {
        text: '依附司马太傅，暗中联络太学与台省士人策应',
        reqStat: 'iq',
        reqVal: 60,
        successReward: { promoBonus: 2, clanPrestige: 45, text: '审时度势，在新朝中枢奠定拥戴元勋之位。' },
        failPenalty: { rep: -15, text: '行迹受阻，虽免大狱，受朝中侧目。' }
      },
      {
        text: '托病闭门，挂冠还乡，深藏坞堡以全晚节',
        successReward: { clean: 25, clanPrestige: 35, text: '明哲保身，虽去浮名，九族安稳无祸，德泽久远。' }
      }
    ]
  },
  {
    id: 'hw_event_255_huainan',
    year: 255,
    title: '淮南旌旗 · 寿春兵争',
    historicalSource: '《三国志·卷二十八·魏书·毌丘俭文钦传第二十八》《资治通鉴·卷七十六·魏纪八》',
    historicalFact: '魏正元二年春，镇东将军毌丘俭、扬州刺史文钦闻司马师废齐王曹芳，悲愤聚兵六万起于寿春，移檄州郡声讨擅行废立之逆。司马师亲督重兵东征，血战淮南。中原世家宗族部曲与江淮名阀卷入惨烈政争与兵锋。',
    historicalContext: '毌丘俭檄文飞驰中原，寿春旌旗蔽空，司马氏严命诸州豪右调粮督战，宗族去向命悬一线。',
    options: [
      {
        text: '遣派宗族部曲督运军粮响应朝廷中军，结好司马氏新贵',
        reqStat: 'courage',
        reqVal: 55,
        successReward: { courage: 20, rep: 30, clanPrestige: 35, officialTitle: '朝廷赞治从戎客', text: '策应平叛有功，深得洛阳新贵信任，宗族官位稳步擢迁。' },
        failPenalty: { money: -2500, health: -15, text: '运道遇伏受创，折损族丁兵马，虽立微劳得不偿失。' }
      },
      {
        text: '暗中庇护江淮士族妇孺，隐匿义军溃众于太行密坞',
        cost: { money: 2200 },
        successReward: { morality: 35, rep: 35, clanPrestige: 30, text: '暗全淮南忠良血胤，仁义之声隐然播于公卿私邸，天下敬仰。' }
      },
      {
        text: '闭关塞坞，加筑哨垒以御溃兵流寇劫掠',
        successReward: { security: 35, clanPrestige: 20, text: '深垒固守无一矢折损，宗族庄园在淮南兵灾中秋毫无犯。' }
      }
    ]
  },
  {
    id: 'hw_event_262_guangling',
    year: 262,
    title: '东市琴绝 · 广陵广传',
    historicalSource: '《晋书·卷四十九·列传第十九·嵇康传》《资治通鉴·卷七十八·魏纪十》',
    historicalFact: '魏景元三年，名士嵇康因言事受司徒钟会谗谮，大将军司马昭处康死刑于洛阳东市。太学生三千人跪阙请以为师，朝廷不许。嵇康临刑神气怡然，索琴弹奏《广陵散》，曲终抚弦叹曰：‘《广陵散》于今绝矣！’海内士庶皆掩涕长恸。',
    historicalContext: '东市刑场三千太学生伏阙叩头，一代琴宗嵇康临刑抚弦，名士风骨惊动九州。',
    options: [
      {
        text: '混入送行士生中，暗中以简册誊录《广陵散》绝响指法残谱',
        reqStat: 'iq',
        reqVal: 60,
        reqTrack: 'recluse',
        successReward: { iq: 25, morality: 30, clanPrestige: 40, heirloom: 'guangling_score', text: '广陵绝响未绝！秘谱墨本秘藏于宗族密阁，文脉风骨传世百代！' },
        failPenalty: { rep: -10, text: '搜捕严密险遭关吏缉拿，虽未全录，亦得残音数节。' }
      },
      {
        text: '联名满朝清流公卿，上书营救山涛、向秀等嵇门诸挚友',
        cost: { money: 2000 },
        successReward: { rep: 35, clean: 25, clanPrestige: 35, text: '倾力营救嵇康遗孤与挚友，义薄云天，清谈玄林视君为生死之交。' }
      },
      {
        text: '叹息归舍，闭户焚香，弹奏素琴为先贤招魂',
        successReward: { clean: 20, resilience: 20, clanPrestige: 15, text: '抚琴招魂，陶冶出尘雅量，心境卓然超脱。' }
      }
    ]
  },
  {
    id: 'hw_event_280_taikang',
    year: 280,
    title: '晋太康平吴 · 天下一统',
    historicalSource: '《晋书·卷三·帝纪第三·武帝纪》《晋书·卷二十六·志第十六·食货志》',
    historicalFact: '太康元年三月，龙骧将军王濬率楼船浮江顺流而下，吴主孙皓肉袒面缚降，东吴亡，三国归于一统。晋武帝下诏平兵革，颁行《占田课田令》与《户调式》，一品占田五十顷，二品四十五顷，确立官品占田制。然洛阳公卿石崇、王恺等斗富斗奢，八王之乱危局隐伏。',
    historicalContext: '晋武帝平定孙吴，天下一统。西晋公卿竞相豪奢，石崇王恺斗富。繁华之下，暗流汹涌。',
    options: [
      {
        text: '严饬家风，勒石立家训：【力戒奢靡，诗书传家】',
        successReward: { morality: 40, clean: 30, clanPrestige: 50, text: '力抗奢靡流毒，子孙俭朴敦厚，为即将到来的乱世筑牢防波堤！' }
      },
      {
        text: '参与平吴后江东良田大拓荒，在建邺购置庄园别苑',
        cost: { money: 10000 },
        successReward: { southEstateUnlocked: true, clanPrestige: 45, text: '未雨绸缪！提前在江南布下退路庄园，为日后永嘉南渡埋下火种！' }
      }
    ]
  }
];

// 3.2 六朝烟雨重大历史关隘大案 (贯穿公元300~500年 · 4大六朝历史大案)
const LIU_CHAO_CRITICAL_CHRONO_EVENTS = [
  {
    id: 'lc_event_311_nandu',
    year: 311,
    title: '永嘉南渡 · 衣冠过江',
    historicalContext: '洛阳陷落，八王乱尽，五胡蜂起。中原衣冠巨族纷泛孤舟浮江而南，王与马共天下。宗族去留在此一举。',
    options: [
      {
        text: '举族南渡，泛舟大江，在建邺秦淮河畔扎根立宅',
        cost: { money: 5000 },
        reqStat: 'courage',
        reqVal: 50,
        successReward: { clanPrestige: 50, resilience: 30, southEstateUnlocked: true, heirloom: 'nandu_zhuangyuan_deed', text: '举族南渡建邺，化危为机，成为江左中兴侨姓世族领袖！' },
        failPenalty: { money: -3000, rep: 10, text: '南渡舟车险恶，折损资财，然宗族血脉终得保全。' }
      },
      {
        text: '固守太行祖坞，联结各堡义军拒胡自保',
        reqStat: 'courage',
        reqVal: 65,
        successReward: { courage: 30, clanPrestige: 40, officialTitle: '北疆坞堡义帅', text: '横刀立马守望中原祖茔，保全桑梓数千百姓，北疆闻名！' },
        failPenalty: { health: -20, money: -4000, text: '敌骑合围，苦战固守，虽受重创但祖风不堕。' }
      }
    ]
  },
  {
    id: 'lc_event_353_lanting',
    year: 353,
    title: '兰亭修禊 · 曲水流觞',
    historicalContext: '会稽内史王羲之偕谢安、孙绰等四十一人，于山阴兰亭举行祓禊雅集，曲水流觞，写就天下第一行书。',
    options: [
      {
        text: '携宗族子弟登席赋诗，与王逸少推杯弄墨',
        reqStat: 'culture',
        reqVal: 50,
        successReward: { culture: 40, rep: 35, clanPrestige: 45, heirloom: 'lanting_rubbing', text: '一觞一咏畅叙幽情，与书圣唱和，获赠《兰亭集序》墨宝真迹！' },
        failPenalty: { rep: 10, text: '诗才略显生涩，然得书圣点拨，子弟风神为之一振。' }
      },
      {
        text: '捐资修葺山阴兰亭与曲水石渠，庇护江南文脉',
        cost: { money: 3000 },
        successReward: { rep: 30, morality: 25, clanPrestige: 35, text: '筑渠建亭厚待文宗，天下士子景仰，江南誉为【崇文名宗】。' }
      }
    ]
  },
  {
    id: 'lc_event_383_feishui',
    year: 383,
    title: '淝水决战 · 东山赌墅',
    historicalContext: '前秦苻坚率步骑百万南下，投鞭断流，江左震骇。谢公东山下围棋赌墅，遣北府兵迎战于淝水。',
    options: [
      {
        text: '倾全族义勇从戎编入北府兵，决战淝水渡口',
        reqStat: 'courage',
        reqVal: 60,
        successReward: { courage: 35, rep: 40, clanPrestige: 60, officialTitle: '北府折冲将军', text: '草木皆兵，风声鹤唳！族中健儿冲锋破阵，立挽狂澜之功！' },
        failPenalty: { health: -25, money: -2000, clanPrestige: 25, text: '血战淮淝，子弟舍身报国，虽有伤亡终保江东半壁。' }
      },
      {
        text: '为谢公中军筹措战船与粮秣万斛，保粮道无虞',
        cost: { money: 6000 },
        successReward: { money: 12000, promoBonus: 2, clanPrestige: 50, text: '运筹帷幄，粮草如山，战后朝廷论功行赏，进封侯伯！' }
      }
    ]
  },
  {
    id: 'lc_event_494_qianluo',
    year: 494,
    title: '孝文迁洛 · 胡汉同风',
    historicalContext: '北魏孝文帝拓跋宏迁都洛阳，断诸北语，改鲜卑姓为汉姓，尊崇儒术，天下大融合。',
    options: [
      {
        text: '上表策陈两汉经制与华夏典章，主导洛阳宗庙礼制建制',
        reqStat: 'iq',
        reqVal: 65,
        successReward: { iq: 30, rep: 45, clanPrestige: 60, promoBonus: 2, text: '辅弼新朝礼制，制定大典，宗族被核定为【中原文冠第一流】！' },
        failPenalty: { rep: -10, text: '议礼多有波折，但风宪初定，立足中原朝堂。' }
      },
      {
        text: '主持修纂胡汉合璧大族谱，广结北方高门亲好',
        cost: { money: 4000 },
        successReward: { rep: 35, clanPrestige: 40, alliancePrestige: 40, text: '修谱通婚，兼通南北，为隋唐大一统埋下百年人脉！' }
      }
    ]
  }
];

// 4. 传世古宝与重宝信物 (可跨赛季永久继承并带入下一赛季)
const HAN_WEI_RELICS_DATABASE = [
  {
    id: 'relic_cai_yong_qin',
    name: '蔡邕焦尾古琴残木',
    era: '汉末',
    desc: '汉左中郎将蔡邕于烈火中救出之桐木焦尾琴残片，琴音通灵。',
    perkDesc: '子孙后代悟性上限+10，文坛雅集声望获取翻倍。'
  },
  {
    id: 'relic_ancient_book_scroll',
    name: '先秦两汉孤本经卷集',
    era: '汉末',
    desc: '洛阳离乱之际倾资抢救之古文经史竹简与缣帛真本，文脉无双。',
    perkDesc: '全家族子孙修习经史速度+50%，科考策试与文坛雅集声望额外+25。'
  },
  {
    id: 'relic_shanghan_treatise',
    name: '建安伤寒论金匮秘卷',
    era: '建安',
    desc: '张仲景手书伤寒杂病药方古卷，医道精要。',
    perkDesc: '全家族免疫任何恶性瘟疫突发灾害，基础寿命天花板+5岁。'
  },
  {
    id: 'relic_jiupin_gold_tablet',
    name: '魏九品中正考定金策',
    era: '曹魏',
    desc: '大中正题署上品二品金字牒牌，门阀立家之信物。',
    perkDesc: '下一代子孙初生即享世家门第光环，起步官阶直接保送孝廉。'
  },
  {
    id: 'relic_fortress_architecture_scroll',
    name: '太行坞堡筑城水磨图卷',
    era: '汉末',
    desc: '历代先祖实测绘制之坚壁水磨工图，百工奇巧。',
    perkDesc: '宗族产业建造费用减半，水碓工坊与坞堡防卫战力翻倍。'
  },
  {
    id: 'relic_lanting_rubbing',
    name: '兰亭序神龙真迹拓本',
    era: '六朝',
    desc: '王羲之亲书兰亭集序神品真拓，天下第一行书，文质彬彬。',
    perkDesc: '子孙后代文化底蕴与悟性大幅跃升，名扬天下文坛。'
  },
  {
    id: 'relic_nandu_zhuangyuan_deed',
    name: '六朝建邺庄园地契',
    era: '六朝',
    desc: '永嘉南渡时期在建邺秦淮膏腴之地购建的庄园基业红契。',
    perkDesc: '跨赛季起步额外增加 15,000五铢钱 祖产，田庄产出提升 30%。'
  }
];

// 5. 汉魏世家时代专属程序化遭遇池 (24条纯正汉魏规制遭遇)
const HAN_WEI_PROCEDURAL_ENCOUNTER_POOL = [
  // --- 官制仕途 (official) ---
  {
    id: 'hw_enc_official_chaju',
    track: 'official',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 郡国察举 · 举孝廉名额抉择',
    desc: '郡守岁首察举孝廉，名额仅得一人。郡中名门各托书信请托，你奉命掌管文书品评：',
    choices: [
      {
        text: '力荐寒门笃行至孝之士 · 秉公登报台阁',
        statReq: 'clean', reqVal: 52,
        outcomeText: '所荐寒士对策高第，台阁称善，清风之誉遍传乡闾！',
        effects: { clean: 10, rep: 8, courage: 4 },
        tag: '至公秉直'
      },
      {
        text: '权衡望族联姻故旧 · 保举世家通家子弟',
        statReq: 'eq', reqVal: 48,
        outcomeText: '与郡望高门结为死党通家，仕途互为奥援！',
        effects: { eq: 8, rep: 6, capital: 1500 },
        tag: '广结门阀'
      },
      {
        text: '托辞才学难分 · 上呈刺史明断',
        statReq: 'iq', reqVal: 44,
        outcomeText: '进退得宜不涉私议，明哲保身，安稳无咎。',
        effects: { iq: 6, resilience: 6 },
        tag: '明哲审慎'
      }
    ]
  },
  {
    id: 'hw_enc_official_qingyi',
    track: 'official',
    eraTags: ['han_wei'],
    minYear: 120,
    maxYear: 260,
    title: '📜 乡闾清议 · 月旦人物品藻',
    desc: '汝南月旦清议盛极一时，士林公推你品评当世后生器识才量：',
    choices: [
      {
        text: '严词直言 · 痛批浮华夸诞附势之徒',
        statReq: 'courage', reqVal: 55,
        outcomeText: '谠论一出天下震动，四海名流交口称叹，清节凛然！',
        effects: { courage: 10, rep: 12, clean: 6 },
        tag: '骨鲠直陈'
      },
      {
        text: '温润品题 · 奖掖后生拔掘璞玉',
        statReq: 'eq', reqVal: 48,
        outcomeText: '成全数名后起英才，后生尊你为领袖师表，桃李满门！',
        effects: { eq: 10, rep: 8, clean: 4 },
        tag: '师表领袖'
      },
      {
        text: '引述五经微言大义 · 论德而不评短长',
        statReq: 'iq', reqVal: 46,
        outcomeText: '高屋建瓴不伤和气，士林咸服君子长者之风。',
        effects: { iq: 8, clean: 6 },
        tag: '雅量长者'
      }
    ]
  },
  {
    id: 'hw_enc_official_kaoke',
    track: 'official',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 岁终考课 · 劝农兴修水利',
    desc: '时逢初春，所辖县邑沟渠淤塞。刺史按部巡视考校治绩在即：',
    choices: [
      {
        text: '自捐俸禄调发部曲僮仆 · 疏浚百里河渠筑堤护麦',
        statReq: 'clean', reqVal: 50,
        cost: 2000,
        outcomeText: '河渠通畅沃野千里，秋粮大稔，考课列为上等第一！',
        effects: { clean: 8, rep: 12, capital: -2000 },
        tag: '劝农上考'
      },
      {
        text: '分派徭役发动豪强合力共修 · 统筹支度',
        statReq: 'iq', reqVal: 48,
        outcomeText: '处置周妥工期大进，豪强族丁皆称得法，治绩斐然。',
        effects: { iq: 8, eq: 6 },
        tag: '通筹治政'
      },
      {
        text: '立碑安抚乡民 · 奏请朝廷宽免当年田租',
        statReq: 'eq', reqVal: 45,
        outcomeText: '百姓感泣万家生佛，虽未大兴水利，口碑深植桑梓。',
        effects: { eq: 10, rep: 6, clean: 4 },
        tag: '宽仁安黎'
      }
    ]
  },
  {
    id: 'hw_enc_official_taige',
    track: 'official',
    eraTags: ['han_wei'],
    minYear: 150,
    maxYear: 300,
    title: '📜 台阁辟召 · 尚书郎除拜进退',
    desc: '中枢太傅府遣使持节辟召你为台阁郎官，然当道权臣暗流汹涌：',
    choices: [
      {
        text: '毅然应命拜受除书 · 赴台阁匡正朝纲',
        statReq: 'courage', reqVal: 54,
        outcomeText: '直入中枢掌理章奏机要，名望声威直达至尊！',
        effects: { courage: 8, rep: 14, capital: 3000 },
        tag: '台阁柱石'
      },
      {
        text: '托病固辞不赴征召 · 优游里巷静观大势',
        statReq: 'resilience', reqVal: 48,
        outcomeText: '不久台阁突发政争，受征者多遭牵连，你独得全名！',
        effects: { resilience: 10, clean: 8 },
        tag: '远嫌远祸'
      },
      {
        text: '上书陈谢并举荐族中贤彦代为效命',
        statReq: 'eq', reqVal: 50,
        outcomeText: '既全世家门户体面，又保宗族中枢人脉不绝。',
        effects: { eq: 8, rep: 6 },
        tag: '连横顾全'
      }
    ]
  },

  // --- 经学儒林 (scholar) ---
  {
    id: 'hw_enc_scholar_taixue',
    track: 'scholar',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 220,
    title: '📜 洛阳太学 · 今古文经学论辩',
    desc: '洛阳太学三万生员集会讲席，今文经师与古文经师为《尚书》篇帙激烈争辩：',
    choices: [
      {
        text: '登坛引据先秦石经大篆古文 · 折服四座大儒',
        statReq: 'iq', reqVal: 56,
        outcomeText: '博闻广识辩才无双，太学博士起立叹服，文宗声望大盛！',
        effects: { iq: 12, rep: 12, clean: 6 },
        tag: '经林泰斗'
      },
      {
        text: '调和今古二氏之见 · 著文阐释《中庸》融汇通义',
        statReq: 'eq', reqVal: 48,
        outcomeText: '持论公允两造咸服，朝野士子争抄《融经通论》，声震京师！',
        effects: { eq: 10, iq: 8, rep: 8 },
        tag: '融通经义'
      },
      {
        text: '静坐席末笔录各家胜言 · 辑入家传学录',
        statReq: 'clean', reqVal: 44,
        outcomeText: '采撷众长不与俗争，家塾学术底蕴再增一重大义。',
        effects: { clean: 8, iq: 8 },
        tag: '含章默记'
      }
    ]
  },
  {
    id: 'hw_enc_scholar_shujing',
    track: 'scholar',
    eraTags: ['han_wei'],
    minYear: 175,
    maxYear: 260,
    title: '📜 熹平石经 · 勘校石碑异文',
    desc: '洛阳城外熹平石经刊刻告竣，观者日有千乘。你抚摸石碑发现数处传抄讹脱：',
    choices: [
      {
        text: '呈书蔡中郎（蔡邕）当面质辨订误 · 获其亲手批注',
        statReq: 'courage', reqVal: 50,
        outcomeText: '得中郎引为忘年深交，赠予珍本石经原拓，文坛名重一时！',
        effects: { courage: 8, rep: 12, iq: 8 },
        tag: '金石考镜'
      },
      {
        text: '手自拓印碑文全帙 · 贮于族中秘阁传世',
        statReq: 'clean', reqVal: 46,
        cost: 1500,
        outcomeText: '手拓碑版字画森然，为全家族子弟留下无价文法圭臬！',
        effects: { clean: 8, iq: 8, capital: -1500 },
        tag: '手拓真本'
      },
      {
        text: '为碑前求学寒士讲授隶法与音韵句读',
        statReq: 'eq', reqVal: 44,
        outcomeText: '春风化雨有教无类，洛阳士子皆称大贤，声施四方。',
        effects: { eq: 8, rep: 8, clean: 6 },
        tag: '讲席传馨'
      }
    ]
  },
  {
    id: 'hw_enc_scholar_zhushu',
    track: 'scholar',
    eraTags: ['han_wei'],
    minYear: 120,
    maxYear: 300,
    title: '📜 杜门著述 · 撰订五经章句',
    desc: '经年闭户，撰写毕生心血《家传礼义疏解》，初稿既成：',
    choices: [
      {
        text: '刊行州里 · 广赠各地经馆学官推行',
        statReq: 'rep', reqVal: 52,
        cost: 2500,
        outcomeText: '各地学塾奉为范本，家学自此立于儒林，成为名家学派！',
        effects: { rep: 14, iq: 10, capital: -2500 },
        tag: '立言垂范'
      },
      {
        text: '珍藏于祖堂夹壁 · 仅作宗族子弟世守秘笈',
        statReq: 'clean', reqVal: 48,
        outcomeText: '家学渊深不露圭角，族中后辈代有名贤，深得底蕴！',
        effects: { clean: 10, iq: 8 },
        tag: '家学世守'
      },
      {
        text: '呈送郡守请予列入郡学课业教材',
        statReq: 'eq', reqVal: 46,
        outcomeText: '郡府颁行全郡，子弟察举多蒙殊恩，门户生光。',
        effects: { eq: 8, rep: 8, capital: 1000 },
        tag: '有补治化'
      }
    ]
  },
  {
    id: 'hw_enc_scholar_sheguan',
    track: 'scholar',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 乡塾设馆 · 传道寒门弟子',
    desc: '所设经馆百人来聚，多有交不起束脩的寒家子弟徒步百里求师：',
    choices: [
      {
        text: '免除全部束脩 · 并设义廪供其一日两餐',
        statReq: 'clean', reqVal: 50,
        cost: 1800,
        outcomeText: '弟子感激涕零刻苦钻研，数年后门人有登科入仕者，尊你如父！',
        effects: { clean: 12, rep: 10, capital: -1800 },
        tag: '博施仁育'
      },
      {
        text: '命其以抄书洒扫充抵束脩 · 磨砺其心性',
        statReq: 'iq', reqVal: 46,
        outcomeText: '勤工笃学规矩严整，馆舍井井有条，学风醇厚。',
        effects: { iq: 8, resilience: 6 },
        tag: '因材造就'
      },
      {
        text: '引荐给郡中商帮行肆半工半读',
        statReq: 'eq', reqVal: 44,
        outcomeText: '经世务实通达世情，寒生皆能自立，深得乡民敬重。',
        effects: { eq: 8, capital: 800 },
        tag: '务实周全'
      }
    ]
  },

  // --- 货殖商帮 (merchant) ---
  {
    id: 'hw_enc_merchant_yantie',
    track: 'merchant',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 官督民办 · 盐铁工坊开炉',
    desc: '郡府放宽煮盐冶铁包纳，你麾下工坊有获准扩建大高炉之良机：',
    choices: [
      {
        text: '投入巨资修建水力大风箱高炉 · 冶炼百炼钢',
        statReq: 'iq', reqVal: 52,
        cost: 4000,
        outcomeText: '高炉钢水沸腾，所产环首刀与铁犁甲于州郡，岁入暴增数倍！',
        effects: { iq: 8, capital: 12000 },
        tag: '精冶神工'
      },
      {
        text: '与各路商贾联营包销 · 规避铁料价格波动',
        statReq: 'eq', reqVal: 48,
        outcomeText: '稳健行商分摊风险，行肆货如轮转，财源延绵无竭！',
        effects: { eq: 8, capital: 6000, resilience: 4 },
        tag: '联营通阜'
      },
      {
        text: '兼造铁犁农具半价借贷给贫苦农户',
        statReq: 'clean', reqVal: 46,
        cost: 1500,
        outcomeText: '仁心利民乡党感戴，宗族美誉遐迩，官府特授免役通照！',
        effects: { clean: 8, rep: 8, capital: 1000 },
        tag: '厚德载殖'
      }
    ]
  },
  {
    id: 'hw_enc_merchant_shuodui',
    track: 'merchant',
    eraTags: ['han_wei'],
    minYear: 120,
    maxYear: 300,
    title: '📜 龙门水碓 · 构筑水磨机关',
    desc: '利用坞堡外湍急溪水，工匠提议兴建连环水碓水磨，节省百倍人工：',
    choices: [
      {
        text: '重赏精工良匠 · 依古籍图纸筑成双轴水碓',
        statReq: 'iq', reqVal: 50,
        cost: 3000,
        outcomeText: '机括隆隆日舂千石，四乡农户皆来碾米，坐收巨额赋利！',
        effects: { iq: 8, capital: 8000 },
        tag: '百工利器'
      },
      {
        text: '顺便兴修水闸灌溉族田 · 水旱无虞',
        statReq: 'resilience', reqVal: 46,
        cost: 2000,
        outcomeText: '千顷族田尽成膏腴熟地，旱涝保收，家族基石坚如磐石！',
        effects: { resilience: 8, capital: 4000, rep: 4 },
        tag: '润泽丰沃'
      },
      {
        text: '租借给外姓商民经营 · 抽成三分利',
        statReq: 'eq', reqVal: 44,
        outcomeText: '不担经营劳顿之苦，岁收定额租息，安闲裕如。',
        effects: { eq: 6, capital: 3500 },
        tag: '安享利息'
      }
    ]
  },
  {
    id: 'hw_enc_merchant_liangcang',
    track: 'merchant',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 平准义仓 · 灾年平抑谷价',
    desc: '大旱连月，奸商屯积居奇，一斛谷涨至五千钱，乡里饿殍遍野：',
    choices: [
      {
        text: '大开平准义仓按平价放粮 · 痛击奸商囤粮',
        statReq: 'courage', reqVal: 52,
        cost: 2500,
        outcomeText: '平抑谷价救活无数黎庶，奸商破产遁逃，全县立生祠颂德！',
        effects: { courage: 8, rep: 14, clean: 10, capital: -2500 },
        tag: '平准济世'
      },
      {
        text: '组织以工代赈 · 招募流民修筑坞墙仓廪',
        statReq: 'iq', reqVal: 48,
        cost: 2000,
        outcomeText: '既免流民无粮冻馁，又使坞壁固若金汤，深得各方称赞！',
        effects: { iq: 8, resilience: 8, capital: 2000 },
        tag: '以工济荒'
      },
      {
        text: '以粟米借贷待秋后按常利收还',
        statReq: 'eq', reqVal: 45,
        outcomeText: '周济农户又保本钱不失，秋后收回本息，行事周全。',
        effects: { eq: 6, capital: 3000 },
        tag: '稳妥度荒'
      }
    ]
  },
  {
    id: 'hw_enc_merchant_zhouji',
    track: 'merchant',
    eraTags: ['han_wei'],
    minYear: 140,
    maxYear: 300,
    title: '📜 淮泗舟楫 · 南北长途通商',
    desc: '组织百艘平底运粮大船沿淮泗顺流而下，直通江东建邺大市：',
    choices: [
      {
        text: '装运中原漆器与铁甲 · 换取江南香料生丝',
        statReq: 'iq', reqVal: 50,
        cost: 3500,
        outcomeText: '南北互通有无获利数倍，船队安全满载而归，商脉横贯南北！',
        effects: { iq: 8, capital: 9000, rep: 4 },
        tag: '利通九域'
      },
      {
        text: '重金雇请江上义勇部曲押运护航',
        statReq: 'courage', reqVal: 48,
        cost: 2000,
        outcomeText: '击退水寇截击完好抵达，威名赫赫，沿线水陆争相投靠！',
        effects: { courage: 8, capital: 4500 },
        tag: '护漕保全'
      },
      {
        text: '在沿途要津设立宗族货栈联络分号',
        statReq: 'eq', reqVal: 46,
        cost: 2500,
        outcomeText: '网罗各地消息行情，为家族织就一张庞大商贸信息之网。',
        effects: { eq: 10, iq: 6, capital: 2000 },
        tag: '布局长远'
      }
    ]
  },

  // --- 将门干城 (military) ---
  {
    id: 'hw_enc_military_wubao',
    track: 'military',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 太行筑垒 · 坞壁望楼加固',
    desc: '太行山麓盗匪流窜，族老共商修筑三道重垒以固本根：',
    choices: [
      {
        text: '督筑三重石堡深壕 · 置连弩望楼互为犄角',
        statReq: 'resilience', reqVal: 52,
        cost: 3000,
        outcomeText: '坞堡高耸入云壕堑深沉，虽十万之众不能破，安如磐石！',
        effects: { resilience: 10, courage: 6, capital: -3000 },
        tag: '固若金汤'
      },
      {
        text: '与近邻数处坞堡订立烽火守望互援盟约',
        statReq: 'eq', reqVal: 48,
        outcomeText: '一堡有警四邻响应，结成太行义垒同盟，威震山北！',
        effects: { eq: 8, rep: 8 },
        tag: '结垒同盟'
      },
      {
        text: '精简守备开辟外围梯田广储干粮',
        statReq: 'iq', reqVal: 46,
        cost: 1500,
        outcomeText: '粮秣充盈，虽遭长久围困亦无饥馁之患。',
        effects: { iq: 6, capital: 1500 },
        tag: '深储粮廪'
      }
    ]
  },
  {
    id: 'hw_enc_military_buqu',
    track: 'military',
    eraTags: ['han_wei'],
    minYear: 120,
    maxYear: 300,
    title: '📜 部曲操演 · 演练劲弩结阵',
    desc: '族丁部曲五百人齐聚较场，面临演武考课：',
    choices: [
      {
        text: '严明纪律推行战阵之法 · 赏罚分明绝不姑息',
        statReq: 'clean', reqVal: 52,
        outcomeText: '部曲号令森严进退如一，隐然有汉代期门羽林精锐之风！',
        effects: { clean: 8, courage: 8, rep: 6 },
        tag: '纪律森然'
      },
      {
        text: '亲自披甲执锐示范骑射 · 身先士卒',
        statReq: 'courage', reqVal: 54,
        outcomeText: '箭无虚发三军欢呼，将士争效死命，战意昂扬！',
        effects: { courage: 10, health: 6 },
        tag: '雄风盖世'
      },
      {
        text: '设酒肉重赏犒劳族丁 · 结兄弟深情',
        statReq: 'eq', reqVal: 46,
        cost: 1500,
        outcomeText: '上下同甘共苦，将士感泣，临阵必效死力。',
        effects: { eq: 8, courage: 6, capital: -1500 },
        tag: '同甘共苦'
      }
    ]
  },
  {
    id: 'hw_enc_military_fengsui',
    track: 'military',
    eraTags: ['han_wei'],
    minYear: 110,
    maxYear: 300,
    title: '📜 烽燧示警 · 击退入境流寇',
    desc: '望楼斥候夜燃烽燧，数百骑流寇乘雪夜劫掠坞外村邑：',
    choices: [
      {
        text: '亲率铁骑夜衔枚突袭敌营 · 斩其渠魁',
        statReq: 'courage', reqVal: 55,
        outcomeText: '直捣黄龙敌骑溃散，缴获良马百匹，郡府上表叙功！',
        effects: { courage: 12, rep: 10, capital: 3500 },
        tag: '夜袭斩将'
      },
      {
        text: '凭高放强弩据险严守 · 待敌疲弱再出击',
        statReq: 'iq', reqVal: 48,
        outcomeText: '无损破敌敌遁去，乡民尽免兵燹，守备之法称绝！',
        effects: { iq: 8, resilience: 6 },
        tag: '算无遗策'
      },
      {
        text: '悬赏分化其党羽 · 招降流民安置垦荒',
        statReq: 'eq', reqVal: 46,
        cost: 1200,
        outcomeText: '化敌为民增加数百户部曲，宗族实力更为壮大。',
        effects: { eq: 8, capital: 1000 },
        tag: '德化抚纳'
      }
    ]
  },
  {
    id: 'hw_enc_military_fuxu',
    track: 'military',
    eraTags: ['han_wei'],
    minYear: 130,
    maxYear: 300,
    title: '📜 战罢抚恤 · 优待阵亡族丁',
    desc: '阵战初定，族中伤亡数十人，孤儿寡母在中堂悲啼：',
    choices: [
      {
        text: '倾出库银厚赠抚恤金 · 由宗族公积供养其孤儿成人',
        statReq: 'clean', reqVal: 52,
        cost: 2500,
        outcomeText: '仁厚抚孤举族感泣，全族部曲发誓世世代代捍卫宗门！',
        effects: { clean: 12, rep: 12, capital: -2500 },
        tag: '大义仁抚'
      },
      {
        text: '将无主田宅优先分给遗烈眷属',
        statReq: 'eq', reqVal: 48,
        outcomeText: '孤寡皆得安顿立足，宗亲凝聚力大为增强。',
        effects: { eq: 8, resilience: 6 },
        tag: '妥善安顿'
      },
      {
        text: '在宗祠旁立功臣碑铭刻生平 · 岁时配享祭祀',
        statReq: 'rep', reqVal: 46,
        outcomeText: '名垂青史族人视战死为荣，军心大振！',
        effects: { rep: 8, courage: 6 },
        tag: '铭勋百代'
      }
    ]
  },

  // --- 隐逸名贤 (recluse) ---
  {
    id: 'hw_enc_recluse_linquan',
    track: 'recluse',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 啸傲东海 · 辞疾不就辟命',
    desc: '公府乘朱轮车持帛璧登门求聘，你素厌名缰利锁：',
    choices: [
      {
        text: '披发徉狂入山采药 · 绝口不谈世事',
        statReq: 'resilience', reqVal: 52,
        outcomeText: '高风绝俗天下倾慕，公卿叹为神仙中人，不仕而名动四海！',
        effects: { resilience: 10, clean: 10, rep: 6 },
        tag: '高尚其事'
      },
      {
        text: '从容出迎对使者清谈《庄子》三日三夜',
        statReq: 'iq', reqVal: 50,
        outcomeText: '使者神往叹服，回京复命称‘彼非池中物，不可屈致’！',
        effects: { iq: 10, rep: 8 },
        tag: '清谈玄远'
      },
      {
        text: '收下束帛转赠贫病邻舍 · 飘然而去',
        statReq: 'clean', reqVal: 46,
        outcomeText: '散财重义千古流芳，世人称为当代严光、管宁！',
        effects: { clean: 12, health: 6 },
        tag: '清风散彩'
      }
    ]
  },
  {
    id: 'hw_enc_recluse_yaopu',
    track: 'recluse',
    eraTags: ['han_wei'],
    minYear: 110,
    maxYear: 300,
    title: '📜 名山药圃 · 悬壶采芝制药',
    desc: '深山药圃灵芝初发，山下疠气偶发，百姓求药者络绎不绝：',
    choices: [
      {
        text: '尽采药圃灵芝仙草 · 煎煮百草大汤通济乡民',
        statReq: 'clean', reqVal: 50,
        cost: 1500,
        outcomeText: '疠气尽消救活千人，百姓尊为再世神农，阴骘深厚延年益寿！',
        effects: { clean: 10, health: 10, rep: 8, capital: -1500 },
        tag: '悬壶济世'
      },
      {
        text: '精研方剂写就《山中草药集要》传世',
        statReq: 'iq', reqVal: 52,
        outcomeText: '医道精深惠及百代，后世杏林尊为经方名著！',
        effects: { iq: 10, clean: 6, health: 6 },
        tag: '撰述医典'
      },
      {
        text: '收留求药孤童传授识药炮制之术',
        statReq: 'eq', reqVal: 44,
        outcomeText: '得衣钵真传弟子，药圃青翠，文脉生生不息。',
        effects: { eq: 8, health: 6 },
        tag: '传薪有后'
      }
    ]
  },
  {
    id: 'hw_enc_recluse_tanxuan',
    track: 'recluse',
    eraTags: ['han_wei'],
    minYear: 220,
    maxYear: 300,
    title: '📜 泉石清谈 · 辨析老庄名理',
    desc: '竹林名士数人携琴载酒投宿山庐，促膝辨论名教与自然：',
    choices: [
      {
        text: '秉拂长谈 · 独创【名教即自然】通明胜义',
        statReq: 'iq', reqVal: 54,
        outcomeText: '辞意奇崛冠绝席上，名士抚掌长啸称莫逆，名震魏晋！',
        effects: { iq: 12, rep: 10, resilience: 6 },
        tag: '玄胜妙言'
      },
      {
        text: '不著一字 · 但为众人鼓琴一曲《幽兰》',
        statReq: 'culture', reqVal: 48,
        outcomeText: '琴意萧散通达造化，座中客皆潸然泪下，传为琴道神话。',
        effects: { resilience: 8, clean: 8, health: 6 },
        tag: '弦歌通神'
      },
      {
        text: '取山中清泉酿造竹叶美酒款待通宵',
        statReq: 'eq', reqVal: 46,
        cost: 800,
        outcomeText: '宾主尽欢忘却魏晋兴亡，留得神仙风流佳话。',
        effects: { eq: 8, health: 4, capital: -800 },
        tag: '旷达尽欢'
      }
    ]
  },
  {
    id: 'hw_enc_recluse_guqin',
    track: 'recluse',
    eraTags: ['han_wei'],
    minYear: 130,
    maxYear: 300,
    title: '📜 空谷抚琴 · 斫制桐木古琴',
    desc: '山中古桐遇雷火半焦，木性异香沉厚，实为千载难求之良材：',
    choices: [
      {
        text: '沐浴焚香亲手斫削七弦古琴 · 取名【冰泉】',
        statReq: 'iq', reqVal: 50,
        outcomeText: '琴声清越如落冰碎玉，引百鸟来朝，成传世不拔之重宝！',
        effects: { iq: 8, clean: 8, rep: 8 },
        tag: '名琴初鸣'
      },
      {
        text: '将古木分赠当世斫琴大家共同研创',
        statReq: 'eq', reqVal: 46,
        outcomeText: '结交天下名匠琴师，互赠雅乐心得，通达心智。',
        effects: { eq: 8, clean: 6 },
        tag: '和光同尘'
      },
      {
        text: '留存于石室阴干以待后世有缘子孙',
        statReq: 'clean', reqVal: 44,
        outcomeText: '蓄宝于家不求速效，为百年后族人预留福泽。',
        effects: { clean: 8, resilience: 6 },
        tag: '厚储余庆'
      }
    ]
  },

  // --- 通用世家 (all) ---
  {
    id: 'hw_enc_general_zongci',
    track: 'all',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 宗祠岁祭 · 刻石重订家法',
    desc: '除夕宗祠岁祭，全族齐集。你主持重立家训石碑以正宗风：',
    choices: [
      {
        text: '严订【忠孝廉恕、力戒浮靡】十六字铁训',
        statReq: 'clean', reqVal: 52,
        outcomeText: '宗风大整族无败子，四海称赞陈氏家法森严为世家之冠！',
        effects: { clean: 10, rep: 8, resilience: 6 },
        tag: '立碑严训'
      },
      {
        text: '增拨族产二成设立【孤寡义学义田】',
        statReq: 'eq', reqVal: 48,
        cost: 2000,
        outcomeText: '族中无冻馁之患，老幼安康，宗族向心力达到极盛！',
        effects: { eq: 8, clean: 8, capital: -2000 },
        tag: '公义赡族'
      },
      {
        text: '分房祭拜按功勋表彰本年杰出子弟',
        statReq: 'iq', reqVal: 46,
        outcomeText: '人人争先奋发有为，宗族生机蒸蒸日上！',
        effects: { iq: 6, rep: 6, courage: 4 },
        tag: '旌善奖功'
      }
    ]
  },
  {
    id: 'hw_enc_general_fenjia',
    track: 'all',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 宗支敦睦 · 族田公产调处',
    desc: '各房旁支就祖产山林分配偶起争端，你作为家主主持调停：',
    choices: [
      {
        text: '以身为范拿出自家良田补足旁房差额',
        statReq: 'clean', reqVal: 50,
        cost: 1500,
        outcomeText: '各房惭愧感泣皆愿退让，阖族和睦，传为千古美谈！',
        effects: { clean: 12, rep: 10, capital: -1500 },
        tag: '推贤让产'
      },
      {
        text: '核查历年账簿依宗法均分收益',
        statReq: 'iq', reqVal: 48,
        outcomeText: '算目无差秉公而断，各房皆服无二话。',
        effects: { iq: 8, eq: 6 },
        tag: '秉公析理'
      },
      {
        text: '将争议山林辟为全族共有薪炭之林',
        statReq: 'eq', reqVal: 46,
        outcomeText: '化私利为公共福祉，族人皆沾雨露，争端永息。',
        effects: { eq: 8, resilience: 6 },
        tag: '公济万全'
      }
    ]
  },
  {
    id: 'hw_enc_general_fuxie',
    track: 'all',
    eraTags: ['han_wei'],
    minYear: 110,
    maxYear: 300,
    title: '📜 邻邦求援 · 借粮救难结世交',
    desc: '邻县世家坞堡遭蝗灾绝粮，其家主亲修书信并以传家宝剑为质借粮：',
    choices: [
      {
        text: '奉赠千石粮食并退还宝剑 · 誓结通家之好',
        statReq: 'clean', reqVal: 52,
        cost: 2000,
        outcomeText: '彼族感激铭心，两家缔结百年秦晋世交，患难相托！',
        effects: { clean: 10, rep: 12, eq: 8, capital: -2000 },
        tag: '义薄云天'
      },
      {
        text: '按平准价赊借粮食秋后易货偿还',
        statReq: 'eq', reqVal: 48,
        outcomeText: '既全道义又保本钱，两族通商往来日盛。',
        effects: { eq: 8, capital: 1000 },
        tag: '平准守义'
      },
      {
        text: '劝其移徙部分部曲来我坞堡屯田共守',
        statReq: 'courage', reqVal: 46,
        outcomeText: '两堡合力并力拒贼，势力大为扩张。',
        effects: { courage: 8, resilience: 6 },
        tag: '合力同守'
      }
    ]
  },
  {
    id: 'hw_enc_general_jiaxun',
    track: 'all',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 祖堂严训 · 力戒骄奢浮华',
    desc: '族中有后辈子弟在外斗富豪饮车马喧嚣，为乡闾所侧目：',
    choices: [
      {
        text: '大开祠堂按族规杖责三十 · 命其闭门读《孝经》三年',
        statReq: 'clean', reqVal: 52,
        outcomeText: '雷霆整饬风纪肃然，子弟洗心革面，海内赞叹陈氏门风整肃！',
        effects: { clean: 12, rep: 8, courage: 4 },
        tag: '雷霆肃纲'
      },
      {
        text: '带其深入田间体验农夫赤足锄禾之苦',
        statReq: 'eq', reqVal: 48,
        outcomeText: '子弟汗流浃背悔悟前非，从此俭朴好学，克绍箕裘。',
        effects: { eq: 10, resilience: 8 },
        tag: '循循化育'
      },
      {
        text: '收缴其车马佩玉充入宗族义学公积',
        statReq: 'iq', reqVal: 46,
        outcomeText: '革除浮华充实公帑，族人无不心悦诚服。',
        effects: { iq: 6, capital: 1500 },
        tag: '敛奢归公'
      }
    ]
  },
  {
    id: 'hw_enc_official_faming',
    track: 'official',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '🏛️ 明堂对策 · 考论治乱经纬',
    desc: '州郡考课召赴天子明堂，公卿策问：‘天下户口流移，何以安辑？’',
    choices: [
      {
        text: '直陈兴办水利宽徭役 · 抑豪强均占田',
        statReq: 'clean', reqVal: 50,
        outcomeText: '切中时弊直声动朝野，主考官叹赏：‘真王佐良吏之器也！’',
        effects: { clean: 14, rep: 12, iq: 8 },
        tag: '直陈利弊'
      },
      {
        text: '主张开辟汉魏常平仓平准物价调剂丰歉',
        statReq: 'iq', reqVal: 48,
        outcomeText: '通晓货殖利度经纶有章，获擢迁为劝农都尉。',
        effects: { iq: 12, capital: 2500 },
        tag: '平准经济'
      },
      {
        text: '引《尚书》《周礼》陈述古风仁政化民',
        statReq: 'eq', reqVal: 45,
        outcomeText: '言辞雅饬醇谨，虽未行大改，亦得考评上等。',
        effects: { eq: 10, rep: 8 },
        tag: '敦厚醇雅'
      }
    ]
  },
  {
    id: 'hw_enc_official_yutang',
    track: 'official',
    eraTags: ['han_wei'],
    minYear: 120,
    maxYear: 280,
    title: '🏛️ 绣衣按部 · 不避权贵折冲',
    desc: '奉命巡按郡国，查得权贵外戚庄园隐匿千丁不纳赋税且强夺民田：',
    choices: [
      {
        text: '封存账目铁面具奏直报洛阳尚书台',
        statReq: 'courage', reqVal: 54,
        outcomeText: '雷霆执法名动京华，平反冤田数百亩，百姓遮道送万民伞！',
        effects: { courage: 16, clean: 14, rep: 15 },
        tag: '铁面骢马'
      },
      {
        text: '勒令豪强补齐赋税出资筑修河堤退还占田',
        statReq: 'eq', reqVal: 50,
        outcomeText: '兼筹并顾无伤大雅，官民两安，深谙老成谋政之旨。',
        effects: { eq: 12, capital: 3500 },
        tag: '老成和济'
      },
      {
        text: '暗中留存罪证立卷以备朝局机变',
        statReq: 'iq', reqVal: 48,
        outcomeText: '深藏若虚保全性命，暗掌权豪把柄以待天时。',
        effects: { iq: 10, resilience: 8 },
        tag: '深沉克制'
      }
    ]
  },
  {
    id: 'hw_enc_scholar_guben',
    track: 'scholar',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 汲冢古竹 · 先秦秘册考辨',
    desc: '乡民于古冢发得先秦大篆竹简百捆，蠹蚀严重，你携门生亲赴勘订：',
    choices: [
      {
        text: '闭门半年通考籀文篆法 · 补正《竹书纪年》五卷',
        statReq: 'iq', reqVal: 52,
        cost: 1000,
        outcomeText: '考订绝世秘卷震惊经学界，郑玄、蔡邕遣使致书求借抄阅！',
        effects: { iq: 16, rep: 14, clean: 10 },
        tag: '考据大宗'
      },
      {
        text: '以蔡侯纸誊抄十部公诸于太学开馆研读',
        statReq: 'clean', reqVal: 48,
        outcomeText: '化私藏为天下公器，洛阳士子皆感先生弘通胸怀！',
        effects: { rep: 16, eq: 10, clean: 12 },
        tag: '惠泽学林'
      },
      {
        text: '秘藏于宗族金匮石室留作家传宝籍',
        statReq: 'resilience', reqVal: 46,
        outcomeText: '古籍传家，子孙经学底蕴代代不绝。',
        effects: { resilience: 10, iq: 8 },
        tag: '世守秘府'
      }
    ]
  },
  {
    id: 'hw_enc_scholar_bianyi',
    track: 'scholar',
    eraTags: ['han_wei'],
    minYear: 110,
    maxYear: 260,
    title: '📜 白虎经辨 · 今古文论衡',
    desc: '州学诸生请先生登坛，主持《公羊》《左氏》两传大辩：',
    choices: [
      {
        text: '引郑玄融通汉儒之注 · 详辨礼乐源流折服两造',
        statReq: 'iq', reqVal: 54,
        outcomeText: '义理圆融宏大，在座数千生员齐声拜服，尊为‘通儒硕学’！',
        effects: { iq: 15, rep: 16, eq: 8 },
        tag: '经学领袖'
      },
      {
        text: '以经世致用之理引导儒生注重农桑水利之实学',
        statReq: 'eq', reqVal: 48,
        outcomeText: '开一代朴学风气，诸生多成经世名吏。',
        effects: { eq: 12, clean: 10, capital: 1500 },
        tag: '通达经世'
      },
      {
        text: '讲授慎独修己克己复礼之家训',
        statReq: 'clean', reqVal: 46,
        outcomeText: '门风敦厚笃敬，乡党赞为道德楷模。',
        effects: { clean: 12, rep: 8 },
        tag: '端本正源'
      }
    ]
  },
  {
    id: 'hw_enc_merchant_qianfan',
    track: 'merchant',
    eraTags: ['han_wei'],
    minYear: 110,
    maxYear: 280,
    title: '🪙 汉代泉范 · 经略官铸五铢',
    desc: '郡国铸钱监招揽通商大姓承办铜炭采冶与钱范熔铸：',
    choices: [
      {
        text: '严格依汉官制规矩铸造轮廓端正之精五铢钱',
        statReq: 'clean', reqVal: 52,
        cost: 3000,
        outcomeText: '所铸钱文清峻无劣质假钱，天下客商争相换纳，声誉倾四海！',
        effects: { clean: 14, rep: 16, capital: 8000 },
        tag: '金石声誉'
      },
      {
        text: '改良鼓风水排与连续翻砂工法提高熔铸效能',
        statReq: 'iq', reqVal: 50,
        outcomeText: '百工技艺大进，水排铁炉日进千金，工坊成为天下水冶典范！',
        effects: { iq: 14, capital: 12000 },
        tag: '机巧百工'
      },
      {
        text: '囤积精炼熟铜转销南方制造青铜礼乐宝器',
        statReq: 'eq', reqVal: 46,
        outcomeText: '南北差价获利颇丰，结好江左多位名门显贵。',
        effects: { eq: 10, capital: 9000 },
        tag: '转运利市'
      }
    ]
  },
  {
    id: 'hw_enc_merchant_cangku',
    track: 'merchant',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 280,
    title: '🪙 平准义仓 · 丰储凶施济困',
    desc: '今秋风调雨顺谷贱伤农，奸商竞相压价盘剥农夫：',
    choices: [
      {
        text: '大开平准义仓按公道官价收储万石谷米保民',
        statReq: 'clean', reqVal: 50,
        cost: 4000,
        outcomeText: '万民感泣称德，来岁荒歉大开仓济众，获郡守赠‘仁商泽物’匾！',
        effects: { clean: 16, rep: 18, capital: -2000 },
        tag: '仁泽四乡'
      },
      {
        text: '将多余麦粟加工成面粉制曲酿酒行销洛阳西市',
        statReq: 'iq', reqVal: 48,
        outcomeText: '深加工获利翻倍，宗族商脉遍布京畿王侯私邸。',
        effects: { iq: 12, capital: 15000 },
        tag: '酿曲货殖'
      },
      {
        text: '建联锁密封大粮仓修筑深壁以防流寇与火灾',
        statReq: 'resilience', reqVal: 46,
        outcomeText: '粮仓深固如铁桶，虽遭荒岁流乱，宗族基盘岿然不动。',
        effects: { resilience: 12, capital: 3000 },
        tag: '深壁实廪'
      }
    ]
  },
  {
    id: 'hw_enc_military_duwei',
    track: 'military',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 280,
    title: '⚔️ 汉塞屯田 · 边郡烽燧戍边',
    desc: '受命督领八百精壮部曲戍守边塞关隘，外寇屡有袭扰：',
    choices: [
      {
        text: '身先士卒操持长戟立于前哨城壕激战拒敌',
        statReq: 'courage', reqVal: 54,
        outcomeText: '锐不可当阵斩敌酋，威震塞北，朝廷诏拜折冲都尉！',
        effects: { courage: 18, health: 10, rep: 14 },
        tag: '横槊塞上'
      },
      {
        text: '设重迭烽燧并筑深沟高堑实行耕战屯田',
        statReq: 'iq', reqVal: 48,
        outcomeText: '塞外开荒千顷自给自足，外寇望坚垒而引退，保境安民。',
        effects: { iq: 12, resilience: 12, capital: 2500 },
        tag: '耕战备边'
      },
      {
        text: '推心置腹以信义抚纳归化降卒扩实部曲',
        statReq: 'eq', reqVal: 46,
        outcomeText: '胡汉怀服，精骑数百誓死效命，宗族武装大为充实。',
        effects: { eq: 12, courage: 10 },
        tag: '怀远纳德'
      }
    ]
  },
  {
    id: 'hw_enc_military_xianfeng',
    track: 'military',
    eraTags: ['han_wei'],
    minYear: 120,
    maxYear: 280,
    title: '⚔️ 官渡探马 · 奇兵袭断粮道',
    desc: '大战胶着之际，前沿探骑探得敌军辎重粮草夜行峡道：',
    choices: [
      {
        text: '亲率百骑精锐死士借夜雾衔枚夜袭纵火焚粮',
        statReq: 'courage', reqVal: 56,
        outcomeText: '烈焰照天敌粮尽毁！全军主力乘胜击溃敌阵，功封前部先锋！',
        effects: { courage: 20, rep: 16, capital: 3500 },
        tag: '火焚乌巢'
      },
      {
        text: '截获大批粮秣骡马暗中运回自家坞壁充实家业',
        statReq: 'iq', reqVal: 50,
        outcomeText: '收获粮车两百辆壮马百匹，宗族私兵装备一跃位列全州之冠。',
        effects: { iq: 12, capital: 8000 },
        tag: '充实私兵'
      },
      {
        text: '将情报飞马密呈中军大营由主帅定夺',
        statReq: 'clean', reqVal: 46,
        outcomeText: '进退有法恪尽职守，得大将军嘉奖传令全军表彰。',
        effects: { clean: 12, rep: 10 },
        tag: '守制奉令'
      }
    ]
  },
  {
    id: 'hw_enc_recluse_danfang',
    track: 'recluse',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '🌿 伤寒救急 · 杏林岐黄大汤',
    desc: '大疫蔓延乡闾，你遵从仲景柴胡葛根之理，开锅煎药救民：',
    choices: [
      {
        text: '不避疠气日夜守在病榻前把脉施针救活千人',
        statReq: 'clean', reqVal: 52,
        outcomeText: '仁心大德感天动地，四乡万民叩拜呼为‘肉身菩萨’，清誉播四海！',
        effects: { clean: 18, rep: 18, morality: 15 },
        tag: '大医精诚'
      },
      {
        text: '整理病案辨别阴阳脉象著述传世《汉魏伤寒指南》',
        statReq: 'iq', reqVal: 50,
        outcomeText: '医书传抄数百家，成为天下医者案头奉读之活人秘典。',
        effects: { iq: 16, clean: 12, capital: 2000 },
        tag: '著录医范'
      },
      {
        text: '在名山洞府培育药圃引泉水灌溉五芝黄精',
        statReq: 'resilience', reqVal: 46,
        outcomeText: '灵芝吐秀药圃芬芳，自身体魄日臻强健，寿享遐龄。',
        effects: { health: 15, resilience: 10 },
        tag: '灵芝仙囿'
      }
    ]
  },
  {
    id: 'hw_enc_recluse_zhulin',
    track: 'recluse',
    eraTags: ['han_wei'],
    minYear: 140,
    maxYear: 280,
    title: '🌿 山阳琴啸 · 超然物外清谈',
    desc: '与名士阮籍、嵇康会于竹林之下，浊酒一杯，素琴一张：',
    choices: [
      {
        text: '抚琴长啸引吭高歌《秋水》篇，超脱红尘俗累',
        statReq: 'clean', reqVal: 54,
        outcomeText: '神情旷达萧散，嵇康抚琴相和，叹为‘千载知音也！’',
        effects: { clean: 20, rep: 15, eq: 10 },
        tag: '广陵知音'
      },
      {
        text: '论辨老庄玄微名理，探讨养生神全之大道',
        statReq: 'iq', reqVal: 50,
        outcomeText: '言辞超逸玄妙，撰成《声无哀乐论笺注》，洛阳纸贵！',
        effects: { iq: 15, clean: 12 },
        tag: '玄林巨擘'
      },
      {
        text: '醉卧竹根之下仰望白云千载悠悠',
        statReq: 'resilience', reqVal: 46,
        outcomeText: '得大自在大逍遥，身心康泰，神充气定。',
        effects: { health: 12, resilience: 12 },
        tag: '林下逍遥'
      }
    ]
  },
  {
    id: 'hw_enc_general_xiupu',
    track: 'all',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 鼎新族谱 · 详订昭穆世系',
    desc: '开祠堂召集各房族老，大修传世家谱长卷，考定三百年宗支：',
    choices: [
      {
        text: '穷搜碑铭谱牒考证至先秦始祖 · 立万世字派规制',
        statReq: 'iq', reqVal: 52,
        cost: 2000,
        outcomeText: '族谱谨严宏大文彩焕发，朝廷大中正见之赞为‘门第冠冕之典范’！',
        effects: { iq: 14, rep: 16, clanPrestige: 25 },
        tag: '昭穆谨严'
      },
      {
        text: '将有功于国保民全族之先贤专立《德业列传》',
        statReq: 'clean', reqVal: 48,
        outcomeText: '祖德昭彰激励后人，族中子弟争相勉励成器。',
        effects: { clean: 14, morality: 12, clanPrestige: 20 },
        tag: '祖德流芳'
      },
      {
        text: '简选直系宗枝勒石刻碑立于祠堂院落',
        statReq: 'resilience', reqVal: 46,
        outcomeText: '石碑沉厚传诸久远，历千年风霜而不磨灭。',
        effects: { resilience: 10, clanPrestige: 15 },
        tag: '勒石纪功'
      }
    ]
  },
  {
    id: 'hw_enc_general_yitian',
    track: 'all',
    eraTags: ['han_wei'],
    minYear: 100,
    maxYear: 300,
    title: '📜 宗族义田 · 赡养孤寡老幼',
    desc: '宗族公积充盈，你与族长商议划拨良田千亩设立永久义庄义田：',
    choices: [
      {
        text: '全数置办肥沃水田并将产出全免赋税赡养族内孤寡',
        statReq: 'clean', reqVal: 52,
        cost: 3000,
        outcomeText: '阖族上下无一冻馁之人，宗族向心力坚如磐石，万口齐颂！',
        effects: { clean: 18, morality: 16, rep: 16, clanPrestige: 30 },
        tag: '义田赡族'
      },
      {
        text: '义田收益半供修筑坞堡私塾半作宗族公积利息',
        statReq: 'iq', reqVal: 48,
        outcomeText: '经久不竭规制长青，私塾书声与坞堡部曲齐备。',
        effects: { iq: 12, capital: 5000, clanPrestige: 20 },
        tag: '经世永固'
      },
      {
        text: '按各房丁口比例分派义田免租轮耕',
        statReq: 'eq', reqVal: 46,
        outcomeText: '均平无偏各房欢悦，宗门安定无忧。',
        effects: { eq: 12, clanPrestige: 15 },
        tag: '均平得宜'
      }
    ]
  }
];

// 汉魏世家案头公文与经世机要卷宗 (涵盖五大立业阶梯全生命周期经略牒文)
const HAN_WEI_DESK_DOCUMENTS = {
  official: [
    {
      id: "hw_doc_off_1",
      age: 24,
      minAge: 20,
      minYear: 90,
      maxYear: 160,
      org: "汉郡守府选曹司",
      secret: "机要 · 呈荐",
      num: "永元十六年·举字第十二号",
      title: "关于本郡察举孝廉与茂才人选核验牒",
      content: "郡府选曹详核乡闾清议，拟辟举品学端方之名门后辈入洛阳天子明堂受策。需核验其治经造诣与睦族行状。",
      choices: [
        {
          stampType: "pass",
          stampText: "核准保荐",
          text: "【朱批保荐：据实保举清修端肃之寒士名流，不避权贵】",
          effect: "门第声望+15，清廉+10，五铢钱+3000。清议极盛，名播州郡！"
        },
        {
          stampType: "pass",
          stampText: "审慎勘校",
          text: "【签呈：引荐郡中国士与经学泰斗联席复核，力求持平】",
          effect: "智谋+8，门第声望+10。处事周全，朝野赞为长者之风。"
        }
      ]
    },
    {
      id: "hw_doc_off_2",
      age: 32,
      minAge: 28,
      minYear: 110,
      maxYear: 180,
      org: "刺史部劝农督邮司",
      secret: "民生 · 牒文",
      num: "元初三年·农字第零四号",
      title: "关于修筑陂塘水利以安抚流民流寓之策案",
      content: "大河决溢，流民南下。拟引洛水溉田万顷，并于两淮修筑陂塘。面临动用府库五铢钱救灾还是募宗族部曲共筑工程之决。",
      choices: [
        {
          stampType: "pass",
          stampText: "兴修大役",
          text: "【行文：带头发动宗族部曲并捐粮千斛，修筑防灾长堰！】",
          effect: "五铢钱-5000，门第声望+25，体魄+10。全活万民，受百姓立生祠称颂！"
        },
        {
          stampType: "pass",
          stampText: "官民调筹",
          text: "【批复：调筹常平仓平价出粟，由各坞壁联手分段筑堤】",
          effect: "智谋+10，五铢钱+2500。以工代赈，平稳渡过水患大荒。"
        }
      ]
    },
    {
      id: "hw_doc_off_3",
      age: 40,
      minAge: 36,
      minYear: 120,
      maxYear: 200,
      org: "朝廷台阁尚书省",
      secret: "台省 · 密奏",
      num: "延光二年·台字第七十一号",
      title: "关于天下上计考课与世家坞壁部曲稽核草疏",
      content: "朝廷岁终考核一州郡国赋税刑狱，面临清查豪族隐匿丁口，抑或宽仁待下、安定地方宗脉大局之抉择。",
      choices: [
        {
          stampType: "pass",
          stampText: "奉公守正",
          text: "【进奏：秉公清理编户齐民，整顿赋税，严明汉家纪纲！】",
          effect: "清廉+20，门第声望+15，胆识+12。虽遭豪强侧目，然名垂风宪！"
        },
        {
          stampType: "pass",
          stampText: "宽猛相济",
          text: "【缓进：宽抚四方世族，将多余丁口转入坞壁屯田水碓以充军资】",
          effect: "智谋+15，五铢钱+8000。深谙世家共治之道，门阀基业极盛。"
        }
      ]
    },
    {
      id: "hw_doc_off_4",
      age: 48,
      minAge: 42,
      minYear: 196,
      maxYear: 260,
      org: "魏中原典农中郎将府",
      secret: "屯田 · 考课",
      num: "建安十六年·农计第七号",
      title: "关于许下民屯水利整饬暨战备军实上计牒",
      content: "曹公行屯田法于许下，得谷百万斛。本族兼领典农都尉，面临督导百姓开渠浚治与减免老疾丁男力役之两难抉择。",
      choices: [
        {
          stampType: "pass",
          stampText: "体恤宽简",
          text: "【朱批准行：量免灾伤流寓丁口赋税，修缮渠堰并建义冢】",
          effect: "门第声望+30，清廉+20，五铢钱+4000。百姓颂为‘陈公德政，甘雨应期’！"
        },
        {
          stampType: "pass",
          stampText: "大修战备",
          text: "【督饬：严核水利工课，积粟巨万以供大军北伐】",
          effect: "智谋+15，胆识+12，五铢钱+10000。考绩卓异，受朝廷超迁台阁！"
        }
      ]
    }
  ],
  scholar: [
    {
      id: "hw_doc_sch_1",
      age: 24,
      minAge: 20,
      minYear: 90,
      maxYear: 150,
      org: "洛阳太学司业直学士",
      secret: "经苑 · 论辨",
      num: "永元经字第零五号",
      title: "关于洛阳太学《古文尚书》考异与辟雍讲席牒",
      content: "太学生员数万，今古文经师为先秦孔壁竹书异文争辩不休。邀我登坛主持经席辩析。",
      choices: [
        {
          stampType: "pass",
          stampText: "考定六艺",
          text: "【登坛：援引家藏汲冢先秦大篆竹简，考镜学术源流，折服今文经师】",
          effect: "智谋+18，门第声望+20，家学悟性大涨，名列经林翘楚！"
        },
        {
          stampType: "pass",
          stampText: "会通汉儒",
          text: "【著论：撰写《融经大义》阐发中庸，调和今古两造】",
          effect: "情商+15，智谋+10。两造叹服，争相传抄文卷。"
        }
      ]
    },
    {
      id: "hw_doc_sch_2",
      age: 32,
      minAge: 28,
      minYear: 140,
      maxYear: 170,
      org: "东观秘书阁校书署",
      secret: "经藏 · 秘牒",
      num: "延熹东观·校书第九案",
      title: "关于东观兰台勘定两《汉书》与先秦古文秘录呈文",
      content: "受诏入东观秘书阁掌管图籍，校定太史公《史记》及《汉书》，厘正班固遗文，面临撰述本家世家谱录以垂后世之机缘。",
      choices: [
        {
          stampType: "pass",
          stampText: "直笔董狐",
          text: "【秉笔：秉公秉实厘定正史世系，著成传世家传纪年三十卷】",
          effect: "门第声望+35，清廉+25，智谋+20。海内称叹‘良史之才，不虚美不隐恶’！"
        },
        {
          stampType: "pass",
          stampText: "注疏微言",
          text: "【疏证：专研春秋三传微言大义，阐扬汉魏门阀治世之道】",
          effect: "家风底蕴+30，智谋+15。受天下经师争相奉为案头宝笈。"
        }
      ]
    },
    {
      id: "hw_doc_sch_3",
      age: 40,
      minAge: 38,
      minYear: 172,
      maxYear: 220,
      org: "太常寺经学博士署",
      secret: "典谟 · 勘校",
      num: "熹平石经·碑勘第零一案",
      title: "关于太学门外刊刻儒家七经石碑之勘定状",
      content: "蔡邕等大儒奉诏于洛阳开阳门外立四十六碑。召请本族学者前往校对篆隶书法与字句正误。",
      choices: [
        {
          stampType: "pass",
          stampText: "精严手勒",
          text: "【笔受：闭门三月逐碑对照汉石经字形，发现并匡正七处脱漏】",
          effect: "清廉+15，智谋+15，门第声望+20。得蔡邕手书焦尾琴谱为酬！"
        },
        {
          stampType: "pass",
          stampText: "摹拓藏家",
          text: "【拓印：组织族中门生精拓数百帙，藏于本族藏书楼留训子孙】",
          effect: "家风底蕴+25，五铢钱+4000。传世金石碑拓奠定千秋家声！"
        }
      ]
    },
    {
      id: "hw_doc_sch_4",
      age: 50,
      minAge: 46,
      minYear: 265,
      maxYear: 300,
      org: "朝廷太常礼乐寺",
      secret: "国制 · 大典",
      num: "泰始礼典·开基第零一卷",
      title: "关于考定晋室新朝五礼制度暨登封大典议案",
      content: "西晋泰始开国，平吴后天下一统。朝廷召集海内耆儒大宗师，考定郊祀宗庙章服礼仪，正朔改元，以定万世风华。",
      choices: [
        {
          stampType: "pass",
          stampText: "定鼎礼乐",
          text: "【奏拟：参详三代古礼，制定《太康礼典》百卷，功封礼乐宗师】",
          effect: "门第声望+50，智谋+25，官品跃升一级。文脉昭垂，配享宗庙！"
        },
        {
          stampType: "pass",
          stampText: "退隐著述",
          text: "【请归：以年迈为由乞骸骨归乡，潜心为先贤诸儒立传】",
          effect: "清廉+30，身心康宁+20。避开洛阳浮华，名节皎然不染尘垢。"
        }
      ]
    }
  ],
  merchant: [
    {
      id: "hw_doc_mer_1",
      age: 24,
      minAge: 20,
      minYear: 90,
      maxYear: 160,
      org: "郡国均输盐铁监",
      secret: "通商 · 契案",
      num: "均字第七号·货殖关防",
      title: "关于修筑龙门水碓与水磨工坊之度支簿录",
      content: "利用颍川流水修建十座连续水碓，加工麦粟与铁器，需斥巨资购置巨木与生铁料石。",
      choices: [
        {
          stampType: "pass",
          stampText: "倾资营筑",
          text: "【画押：倾尽两代储蓄，延揽百工建造天下第一流高效水碓！】",
          effect: "五铢钱-6000，每岁庄园收益翻倍，工坊产业富埒一郡！"
        },
        {
          stampType: "pass",
          stampText: "合资分利",
          text: "【合契：邀约郡中通商巨室合资营建，分散经略风险】",
          effect: "五铢钱+5000，情商+12。稳收分成，商脉四通八达。"
        }
      ]
    },
    {
      id: "hw_doc_mer_2",
      age: 32,
      minAge: 28,
      minYear: 140,
      maxYear: 210,
      org: "两淮水陆关津通商盟",
      secret: "货殖 · 宏图",
      num: "淮商盟约·丙子年案",
      title: "关于统筹百艘粮船转运南北平准谷帛之公札",
      content: "北方荒旱谷贵，南方江南米贱。操盘千艘木帆大船顺淮泗航道北上，平抑粮价获利千万。",
      choices: [
        {
          stampType: "pass",
          stampText: "义利并举",
          text: "【启航：舟楫昼夜北上，半数平价售予灾黎，半数充实宗族公积】",
          effect: "五铢钱+25000，门第声望+30，百姓感恩戴德，商圣名播天下！"
        },
        {
          stampType: "pass",
          stampText: "货殖奇谋",
          text: "【囤积：待洛阳谷价至极方行开仓，换取大批名士手泽与城郊良田】",
          effect: "五铢钱+45000，良田增加三十亩。资累亿万，晋身神州巨贾！"
        }
      ]
    },
    {
      id: "hw_doc_mer_3",
      age: 42,
      minAge: 36,
      minYear: 215,
      maxYear: 275,
      org: "荆扬舟楫通商大总领",
      secret: "商路 · 密契",
      num: "建衡二年·商字第十八号",
      title: "关于连通长江汉沔通运蜀锦淮盐货殖文卷",
      content: "南北割据之际，天下商路阻绝。我族操盘连舫百艘穿行巴蜀、荆襄与淮扬之间，独家互通蜀锦、青瓷、淮盐与药材。",
      choices: [
        {
          stampType: "pass",
          stampText: "四海通商",
          text: "【放行：开辟秘密水驿商道，运粮济灾兼通天下之货】",
          effect: "五铢钱+60000，门第声望+25，情商+15。富甲江汉，两朝诸侯皆礼敬有加！"
        },
        {
          stampType: "pass",
          stampText: "经纶信托",
          text: "【存本：将累年通商巨利转入宗族义田永续基金，广置桑麻鱼塘】",
          effect: "五铢钱+30000，宗族信托公积暴涨，立万年不拔之业！"
        }
      ]
    },
    {
      id: "hw_doc_mer_4",
      age: 52,
      minAge: 46,
      minYear: 275,
      maxYear: 300,
      org: "太康典客榷运都公所",
      secret: "通漕 · 总账",
      num: "太康二年·商字第九十九案",
      title: "关于平吴后江南建邺邸阁丝麻货殖总核算牒",
      content: "天下归晋，南北混一。我族抢先于三吴膏腴之地布设三十所货殖邸舍与丝绸工坊，面临扩大江南庄园还是扶植乡邦小商户之裁决。",
      choices: [
        {
          stampType: "pass",
          stampText: "兼济桑梓",
          text: "【批复：免除小商户租佣三成，设商道义塾抚恤行商老弱】",
          effect: "五铢钱+50000，门第声望+40，德泽江南，深得江左世族爱戴！"
        },
        {
          stampType: "pass",
          stampText: "独揽胜景",
          text: "【垄断：收拢会稽盐场与青瓷窑坊，资累千万，雄踞东南商界之冠】",
          effect: "五铢钱+100000，情商+10。资财富可敌国，天下莫不仰视。"
        }
      ]
    }
  ],
  military: [
    {
      id: "hw_doc_mil_1",
      age: 24,
      minAge: 20,
      minYear: 90,
      maxYear: 185,
      org: "关中军司马府兵曹",
      secret: "战备 · 布防",
      num: "汉军防务·要塞布防图册",
      title: "关于加固坞壁敌楼与督率部曲习射之战备要件",
      content: "流寇窥伺，边塞烽烟起。需赶在初冬前将外壕拓深三丈，并操演三段弩射战法。",
      choices: [
        {
          stampType: "pass",
          stampText: "严阵筑垒",
          text: "【立帅印：日夜督修硬弩箭垛，与宗族部曲同吃同住，同仇敌忾】",
          effect: "胆识+20，体魄+12，坞壁防御力暴涨，流寇望而生畏！"
        },
        {
          stampType: "pass",
          stampText: "结盟拒敌",
          text: "【飞檄：联络周边七座世家坞壁订立互守盟约，掎角相救】",
          effect: "门第声望+18，情商+14。联防严密，保全一州千里平安。"
        }
      ]
    },
    {
      id: "hw_doc_mil_2",
      age: 32,
      minAge: 26,
      minYear: 186,
      maxYear: 205,
      org: "关东义军联防都尉府",
      secret: "戎机 · 密令",
      num: "初平元年·军字第零三号",
      title: "关于三辅世家各坞壁缔结联防并设八方烽燧公函",
      content: "董卓焚洛阳西迁长安，关东兵起，流寇蜂起。宗族面临统合八大异姓坞堡，修筑百里相望之烽燧连环要塞之决策。",
      choices: [
        {
          stampType: "pass",
          stampText: "结帅受盟",
          text: "【誓师：登坛主盟各路世家部曲，筑深垒以御流寇，保全一州苍生！】",
          effect: "胆识+25，门第声望+35，体魄+15。威震黄河两岸，部曲精卒达数千人！"
        },
        {
          stampType: "pass",
          stampText: "深固壁垒",
          text: "【自守：紧闭坞门，深堑重门以待四方尘定，不染是非兵戈】",
          effect: "宗族安定+25，粮秣丰足。坞中鸡犬相闻，俨然世外桃源。"
        }
      ]
    },
    {
      id: "hw_doc_mil_3",
      age: 42,
      minAge: 36,
      minYear: 198,
      maxYear: 230,
      org: "中军督护都督府",
      secret: "军略 · 军符",
      num: "建安五年·官渡大营军令牒",
      title: "关于统辖官渡十万石军粮转运并御夜袭之行军令",
      content: "袁曹官渡对垒相持不下。我族受命总督洛阳至官渡后方粮道，遭遇敌军轻骑夜袭乌巢连营危险，急需断决。",
      choices: [
        {
          stampType: "pass",
          stampText: "设伏破阵",
          text: "【拔剑：设连弩伏兵于粮道险隘，诱敌深入，阵斩敌部骁将！】",
          effect: "胆识+30，门第声望+35， officialTitle: '汉故平虏将军'。粮道晏然无虞，决胜官渡！"
        },
        {
          stampType: "pass",
          stampText: "兼济平稳",
          text: "【分道：将大粮散化为数千驮队密走险径，平稳押送入营】",
          effect: "智谋+20，五铢钱+8000。曹公赞叹‘运筹帷幄，真吾萧何也’！"
        }
      ]
    },
    {
      id: "hw_doc_mil_4",
      age: 52,
      minAge: 46,
      minYear: 270,
      maxYear: 300,
      org: "荆州都督府水军大本营",
      secret: "方略 · 水阵",
      num: "咸宁五年·平吴督建字第一号",
      title: "关于上游连舫楼船监造暨铁锁破江水战方略牒",
      content: "羊祜都督荆州，王濬于蜀中造方百二十步大楼船准备伐吴。面临以大火炬熔江上铁锁，或以轻舸突击吴军要塞之机略抉择。",
      choices: [
        {
          stampType: "pass",
          stampText: "横江破锁",
          text: "【督战：命工匠制巨木大筏灌麻油先导焚断拦江铁锁，万舟破浪顺流而下！】",
          effect: "胆识+35，门第声望+45，功封晋爵。受封亭侯，名扬长江万里！"
        },
        {
          stampType: "pass",
          stampText: "怀柔绥远",
          text: "【抚定：大军过处秋毫无犯，优待东吴降卒百姓，得江南士庶向化】",
          effect: "清廉+30，情商+20。天下一统，朝野交口称仁帅长者！"
        }
      ]
    }
  ],
  recluse: [
    {
      id: "hw_doc_rec_1",
      age: 24,
      minAge: 20,
      minYear: 90,
      maxYear: 180,
      org: "名山神仙洞府药局",
      secret: "杏林 · 秘方",
      num: "本草采芝·经脉医案",
      title: "关于采掘神农本草经方并于乡闾施药防疫案",
      content: "伏牛群山多生仙草灵药，乡民染患寒热之疾。需跋涉名山悬崖采集柴胡黄芩，研制传世驱疾草方。",
      choices: [
        {
          stampType: "pass",
          stampText: "舍身采药",
          text: "【背篓登山：踏遍太行伏牛诸山，尝百草辨药性，著述救急良方】",
          effect: "清廉+20，体魄+15，收得《汉魏百草救急要略》，活人无算！"
        },
        {
          stampType: "pass",
          stampText: "设局义诊",
          text: "【开炉：于坞壁外开设防疫药棚，日夜煎汤施济逃难病黎】",
          effect: "门第声望+35，清廉+25。受百姓尊为神仙再世，四乡称圣！"
        }
      ]
    },
    {
      id: "hw_doc_rec_2",
      age: 34,
      minAge: 28,
      minYear: 120,
      maxYear: 200,
      org: "太行名岳抱朴草堂",
      secret: "丹道 · 养生",
      num: "河上真经·导引要录",
      title: "关于深山修习老子河上真诀暨救治山氓疴疾之札",
      content: "隐居深山幽谷，修习《老子河上公注》与吐纳导引长生之法。近山采药时遇乡氓暴染瘴疟，祈求先生施符药搭救。",
      choices: [
        {
          stampType: "pass",
          stampText: "普济十方",
          text: "【施药：将秘炼青蒿金丹悉数分发乡民，连夜上山采药配汤】",
          effect: "清廉+25，门第声望+30，活人无算。百姓叩首呼为‘活神仙’！"
        },
        {
          stampType: "pass",
          stampText: "潜心悟道",
          text: "【闭关：于石室静修吐纳导引，著《保元经》十卷以阐生生之理】",
          effect: "体魄+20，智谋+15。心境湛然如水，寿算大为延展。"
        }
      ]
    },
    {
      id: "hw_doc_rec_3",
      age: 44,
      minAge: 38,
      minYear: 235,
      maxYear: 260,
      org: "白鹿山居避世精舍",
      secret: "玄言 · 琴道",
      num: "长生要旨·广陵音律辨",
      title: "关于受赠古琴蔡邕焦尾遗琴暨正始名理辩析书",
      content: "蔡氏后人感佩先生高德，奉赠传世焦尾古琴名器。何晏、王弼慕名遣使送来《道德论》，邀请入京共辩名理无为之妙。",
      choices: [
        {
          stampType: "pass",
          stampText: "绝意名缰",
          text: "【抚琴辞使：抚焦尾长弹《秋水》，作《难自然好学论》谢绝入仕洛阳】",
          effect: "清廉+35，门第声望+35，heirloom: 'cai_yong_qin'。风骨皎洁，四海仰止！"
        },
        {
          stampType: "pass",
          stampText: "答辩玄风",
          text: "【修书：以书信详辨名教与自然同异，开一代玄谈名学新峰】",
          effect: "智谋+25，情商+15。文字风行天下，名士争相手抄奉为圭臬。"
        }
      ]
    },
    {
      id: "hw_doc_rec_4",
      age: 54,
      minAge: 48,
      minYear: 255,
      maxYear: 285,
      org: "山阳竹林雅集草堂",
      secret: "超然 · 绝响",
      num: "山阳雅聚·景元清隐谱",
      title: "关于会晤嵇康阮籍暨收录《养生论》秘卷之简策",
      content: "嵇康、阮籍邀约聚于山阳竹林，肆意酣畅，论生死养生之真谛。当权者屡遣使辟召，面临出山入仕或超然物外之大决绝。",
      choices: [
        {
          stampType: "pass",
          stampText: "高蹈沧海",
          text: "【绝交归隐：与司马氏权贵作绝交书，坚隐深林，与嵇康同著《养生大义》】",
          effect: "清廉+40，门第声望+40，悟性+25。虽无朱紫显贵，千秋清名永垂不朽！"
        },
        {
          stampType: "pass",
          stampText: "和光同尘",
          text: "【逍遥：外示中庸，内守至真，以诗酒全生避祸，优游林下寿登耄耋】",
          effect: "情商+20，体魄+25。一生从容无虞，宗族上下尽沾福庇。"
        }
      ]
    }
  ]
};

const HAN_WEI_AND_LIU_CHAO_EVENTS = [
  ...HAN_WEI_CRITICAL_CHRONO_EVENTS,
  ...LIU_CHAO_CRITICAL_CHRONO_EVENTS
];

// ====================================================================
// 4. 华夏世家大系 · 第一赛季：汉魏通鉴编年全史知识库 (公元100~300年)
// 依据《后汉书》《三国志》《晋书》《资治通鉴》《水经注》《宋书·百官志》考订
// ====================================================================
const HAN_WEI_CHRONICLE_ENCYCLOPEDIA = [
  {
    year: 100,
    dynasty: '东汉',
    eraName: '永元十二年',
    emperor: '汉和帝刘肇',
    eventTitle: '永元中兴与西域平定',
    historicalSource: '《后汉书·卷四·孝和帝纪第四》《后汉书·卷四十七·班梁列传第三十七》',
    historicalFact: '和帝即位诛除窦宪外戚之患，亲总万机，百姓安辑；西域都护班超经略西域三十一载，抚平五十余国，遣使甘英抵条支临大海。',
    clanStrategy: '此时汉廷法度肃整，世家当遵从朝廷法纪，于郡国深修经学，教化乡闾，蓄养人才以备察举。'
  },
  {
    year: 121,
    dynasty: '东汉',
    eraName: '建光元年',
    emperor: '汉安帝刘祜',
    eventTitle: '邓后临朝与外戚宦官交迭',
    historicalSource: '《后汉书·卷五·孝安帝纪第五》《后汉书·卷十上·皇后纪第十上》',
    historicalFact: '和熹邓太后临朝十六年崩，安帝始亲政。阎显兄弟等外戚与中常侍江京、樊丰等宦官交结用事，罢黜邓氏宗族，朝纲日趋倾颓。',
    clanStrategy: '中枢风云诡谲，世家子弟宜慎涉外戚宦官倾轧之争，潜心治学，以清修自守保全家声。'
  },
  {
    year: 144,
    dynasty: '东汉',
    eraName: '建康元年',
    emperor: '汉顺帝/冲帝',
    eventTitle: '跋扈将军梁冀专政',
    historicalSource: '《后汉书·卷三十四·梁统列传第二十四》《资治通鉴·卷五十二·汉纪四十四》',
    historicalFact: '顺帝崩，大将军梁冀秉政专权，毒杀八岁质帝（斥梁冀为‘跋扈将军’），更立桓帝。梁氏一门前后九侯、三皇后、六贵人，专断国命二十余年。',
    clanStrategy: '当权外戚专横跋扈，豪强田产兼并烈甚。世家需在乡里筑高垒修水碓，抚恤族众，切忌锋芒毕露。'
  },
  {
    year: 159,
    dynasty: '东汉',
    eraName: '延熹二年',
    emperor: '汉桓帝刘志',
    eventTitle: '桓帝诛梁冀与五侯弄权',
    historicalSource: '《后汉书·卷七·孝桓帝纪第七》《后汉书·卷七十八·宦者列传第六十八》',
    historicalFact: '桓帝不堪梁冀幽制，与单超、徐璜、具瑗、左悺、唐衡五宦官血书结盟，发羽林骑围梁冀第，梁冀服毒自尽。收缴家财三十余亿充国库，封单超等五人为县侯，五侯亲属布列州郡，贪残滋甚。',
    clanStrategy: '宦官爪牙布满天下郡国，世家当谨守门庭账目，杜绝贪渎把柄，借经学清望联结四方正人。'
  },
  {
    year: 166,
    dynasty: '东汉',
    eraName: '延熹九年',
    emperor: '汉桓帝刘志',
    eventTitle: '第一次党锢之祸爆发',
    historicalSource: '《后汉书·卷六十七·党锢列传第五十七》《资治通鉴·卷五十五·汉纪四十七》',
    historicalFact: '司隶校尉李膺、太仆杜密与太学生郭泰、贾彪互相标榜，指陈中官罪恶。宦官诬告名士‘交通太学生，共为部党，诽讪朝廷’。桓帝大怒，收捕李膺等二百余人下黄门北寺狱，天下士气受挫。',
    clanStrategy: '清流抗暴彰显汉家风骨，面对罗织大狱，世家宗族或以义烈暗保孤忠，或远引潜匿，以存浩然正气。'
  },
  {
    year: 168,
    dynasty: '东汉',
    eraName: '建宁元年',
    emperor: '汉灵帝刘宏',
    eventTitle: '建宁血雨与第二次党锢大搜捕',
    historicalSource: '《后汉书·卷八·孝灵帝纪第八》《后汉书·卷六十九·窦何列传第五十九》',
    historicalFact: '灵帝即位，大将军窦武、太傅陈蕃谋诛宦官事泄，曹节、王甫等挟持太后发兵诛杀窦武陈蕃。次年，大搜天下党人，门生故吏及父子兄弟皆免官禁锢，天下贤良横遭芟夷。',
    clanStrategy: '大搜捕下天下士族皆涉株连。坞壁庄园地窖与深山重寨成为庇护海内文脉种子之关键避难所。'
  },
  {
    year: 175,
    dynasty: '东汉',
    eraName: '熹平四年',
    emperor: '汉灵帝刘宏',
    eventTitle: '熹平石经刊立于洛阳太学',
    historicalSource: '《后汉书·卷六十下·蔡邕列传第五十下》《水经注·卷十六·谷水》',
    historicalFact: '议郎蔡邕以六经文字年代久远、俗儒争相穿凿误谬，奏请正定经书。灵帝诏邕以隶书书丹于四十六块巨石立于洛阳开阳门外太学门前。碑立之后，观视摹写者车乘日千余辆，填塞街道。',
    clanStrategy: '经学正本清源之旷古盛事！世家当遣博雅子弟前往洛阳手摹碑拓，珍藏宗祠经楼，立为宗传至宝。'
  },
  {
    year: 178,
    dynasty: '东汉',
    eraName: '光和元年',
    emperor: '汉灵帝刘宏',
    eventTitle: '西园开张鬻官与鸿都门学',
    historicalSource: '《后汉书·卷八·孝灵帝纪第八》《资治通鉴·卷五十七·汉纪四十九》',
    historicalFact: '灵帝于西园开市卖官：关内侯五百万，三公千万，九卿五百万，甚至刺史太守皆按价勒索。又开鸿都门学招纳辞赋尺牍浮华之辈授以高官，士大夫视若国耻。',
    clanStrategy: '朝政秽浊至极，世家清流当守身如玉，宁辞不赴任，绝不纳赀买官，固守‘清白传家’之名。'
  },
  {
    year: 184,
    dynasty: '东汉',
    eraName: '中平元年',
    emperor: '汉灵帝刘宏',
    eventTitle: '黄巾起义爆发与大解党锢',
    historicalSource: '《后汉书·卷七十一·皇甫嵩朱儁列传第六十一》《后汉书·卷八·孝灵帝纪第八》',
    historicalFact: '巨鹿张角以‘苍天已死，黄天当立，岁在甲子，天下大吉’传三十六方符水起事，天下八州旬月同发。朝廷大震，皇甫嵩奏请大赦天下党人，发北军五校及天下精骑平乱。豪强士族纷纷筑深垒自卫。',
    clanStrategy: '乱世自此全面降临！坞壁要塞、水碓粮食储运与部曲精兵为生存之本；借平乱立下勤王功勋可换取汉家名位。'
  },
  {
    year: 189,
    dynasty: '东汉',
    eraName: '昭宁元年/初平元年',
    emperor: '汉少帝/汉献帝',
    eventTitle: '董卓入京专政与汉室瓦解',
    historicalSource: '《三国志·卷六·魏书·董二袁刘传第六》《后汉书·卷七十二·董卓列传第六十二》',
    historicalFact: '汉灵帝崩，何进谋诛内侍被害，袁绍入宫尽诛宦官。西凉董卓引铁骑入京，废少帝立陈留王为献帝，鸩杀何太后，纵兵掳掠洛阳公卿宫室，汉室社稷名存实亡。',
    clanStrategy: '王纲纽绝，汉家瓦解。世家需明辨逆顺，避居郡国险隘，不与乱臣狼狈为奸，保全宗祀。'
  },
  {
    year: 190,
    dynasty: '东汉',
    eraName: '初平元年',
    emperor: '汉献帝刘协',
    eventTitle: '关东义军盟起与洛阳焚墟',
    historicalSource: '《三国志·卷一·魏书·武帝纪第一》《后汉书·卷七十二·董卓列传第六十二》',
    historicalFact: '曹操、袁绍等关东诸侯发檄文酸枣会盟讨伐董卓。董卓火烧洛阳宗庙宫室二百里尽成瓦砾，劫迁献帝西都长安，毁五铢钱铸小钱，通货暴乱，谷一斛数百万钱。',
    clanStrategy: '货币崩解，唯粟帛是真！庄园粮仓与水磨水碓成为救命之本，推行粟帛易物，庇护流亡黎庶。'
  },
  {
    year: 196,
    dynasty: '东汉',
    eraName: '建安元年',
    emperor: '汉献帝刘协',
    eventTitle: '迎奉天子与许下开创大屯田',
    historicalSource: '《三国志·卷一·魏书·武帝纪第一》《三国志·卷十六·魏书·任峻传第十六》',
    historicalFact: '曹操自洛阳迎奉献帝都于许昌，奉天子以令不臣。采枣祗、任峻之议推行‘许下屯田’，招募流民租牛授田，‘是岁得谷百万斛，于是州郡例置田官，军国皆丰足’。',
    clanStrategy: '屯田令开辟了乱世经济治理先河。世家当顺应农桑生计大计，协助修治水利，安定流民，积聚功勋。'
  },
  {
    year: 200,
    dynasty: '东汉',
    eraName: '建安五年',
    emperor: '汉献帝刘协',
    eventTitle: '官渡之战与北方大势底定',
    historicalSource: '《三国志·卷一·魏书·武帝纪第一》《三国志·卷六·魏书·袁绍传第六》',
    historicalFact: '袁绍统军十余万进逼官渡，曹操兵少粮绝，采许攸奇袭乌巢火烧粮料之策，一举破袁绍主力，斩审配、灭袁谭，平定冀、青、幽、并北方四州根基奠定。一代经学泰斗郑玄病逝于随军途中。',
    clanStrategy: '北方一统格局底定。世家子弟须认清天下走向，入仕曹魏枢机或受任郡守，兼重文武政绩。'
  },
  {
    year: 208,
    dynasty: '东汉',
    eraName: '建安十三年',
    emperor: '汉献帝刘协',
    eventTitle: '赤壁烽火与三分天下鼎峙',
    historicalSource: '《三国志·卷三十五·蜀书·诸葛亮传第五》《三国志·卷五十四·吴书·周瑜传第九》',
    historicalFact: '曹操亲率水陆二十万大军下荆州，刘琏降。孙权决意纳鲁肃之策，诸葛亮渡江舌辩群儒力促联盟。周瑜、黄盖于赤壁行火攻之计，大破曹军于乌林，曹操北撤，三分天下之局成型。',
    clanStrategy: '天下鼎分，南北阻绝。琅琊、颍川诸世家多行‘分枝立足’之策，或仕魏、或仕蜀吴，狡兔有窟以防一蹶不振。'
  },
  {
    year: 217,
    dynasty: '东汉',
    eraName: '建安二十二年',
    emperor: '汉献帝刘协',
    eventTitle: '建安大疫与杏林医道集大成',
    historicalSource: '曹丕《与吴质书》《伤寒杂病论·自序》《三国志·卷二十一·魏书·王粲传第二十一》',
    historicalFact: '中原疫疠大作，曹丕哀述‘徐、陈、应、刘，一时俱逝’，建安七子泰半折损于此岁。张仲景《伤寒杂病论》方药广施天下，以桂枝、柴胡、麻黄各汤拯救苍生万民。',
    clanStrategy: '天灾疫毒横行之际，世家须严断坞壁水源，开设义舍施药煎汤，活人无算，累积旷世阴德。'
  },
  {
    year: 220,
    dynasty: '曹魏',
    eraName: '黄初元年',
    emperor: '魏文帝曹丕',
    eventTitle: '曹魏代汉称帝与陈群立九品中正制',
    historicalSource: '《三国志·卷二·魏书·文帝纪第二》《三国志·卷二十二·魏书·陈群传第二十二》《通典·卷十四·选举二》',
    historicalFact: '汉献帝禅位于魏文帝曹丕，四百年两汉终结，改元黄初。尚书令陈群奏立‘九品官人法’，由州郡大小中正官参酌家世德能品题人才，世家门阀自此正式垄断入仕通道。',
    clanStrategy: '九品官人法定鼎天下门第！宗族需力争在朝延揽大中正名位，巩固本族‘二品上品’清议，光前裕后。'
  },
  {
    year: 240,
    dynasty: '曹魏',
    eraName: '正始元年',
    emperor: '齐王曹芳',
    eventTitle: '正始玄风拂动与贵无论哲思',
    historicalSource: '《三国志·卷九·魏书·诸夏侯曹传第九·附何晏传》《世说新语·文学第四》',
    historicalFact: '少帝曹芳正始年间，尚书仆射何晏、尚书郎王弼等开创魏晋玄学，力主‘以无为本’，探求‘名教与自然’之辨，士大夫群起效仿拂麈清谈，世称‘正始之音’。',
    clanStrategy: '玄学清谈不仅为哲思，更关乎朝野政见风向。研读《老子》《周易》，兼通经史与玄辨，方可立足士林顶层。'
  },
  {
    year: 249,
    dynasty: '曹魏',
    eraName: '嘉平元年',
    emperor: '齐王曹芳',
    eventTitle: '高平陵之变与司马氏独揽大权',
    historicalSource: '《晋书·卷一·帝纪第一·宣帝纪》《三国志·卷四·魏书·三少帝纪第四》',
    historicalFact: '大将军曹爽陪少帝谒魏明帝高平陵。太傅司马懿突发政变闭洛阳门，夺武库，指洛水为誓许曹爽免死。曹爽降，司马懿背盟尽诛曹爽、何晏、丁谧三族，自此曹魏军政大柄全归司马氏。',
    clanStrategy: '高平陵风云变幻，站队去留关乎九族存亡。世家或顺水推舟归附司马门阀，或托病挂冠还山，保全血胤。'
  },
  {
    year: 263,
    dynasty: '曹魏/蜀汉',
    eraName: '景元四年',
    emperor: '魏元帝曹奂',
    eventTitle: '魏灭蜀汉与嵇康东市绝响',
    historicalSource: '《三国志·卷二十八·魏书·钟会传第二十八》《晋书·卷四十九·列传第十九·嵇康传》',
    historicalFact: '邓艾自阴平道裹毡下险壁奇袭成都，后主刘禅降，蜀汉亡。竹林名士嵇康不附权贵，遭钟会谮言，神色自若于洛阳东市顾视日影弹《广陵散》，长叹‘广陵散于今绝矣’，慷慨赴义。',
    clanStrategy: '名士风骨宁死不弯，名教与自然之争代价惨烈。世家宜守中致和，既存傲骨，亦当周全阖族。'
  },
  {
    year: 265,
    dynasty: '西晋',
    eraName: '泰始元年',
    emperor: '晋武帝司马炎',
    eventTitle: '西晋代魏立国与大封宗室',
    historicalSource: '《晋书·卷三·帝纪第三·武帝纪》《晋书·卷十四·志第四·地理上》',
    historicalFact: '魏帝曹奂禅位于晋王司马炎，建立西晋。武帝鉴于曹魏孤立无援而亡之弊，大封司马氏同姓诸王二十七人，各置三军掌握兵权，为日后八王相残埋下伏笔。',
    clanStrategy: '新朝立基，门阀同构。世家当受命封爵，结好辅政名王，同时避免卷入诸王军政争端之中。'
  },
  {
    year: 280,
    dynasty: '西晋',
    eraName: '太康元年',
    emperor: '晋武帝司马炎',
    eventTitle: '西晋平吴天下一统与颁布占田令',
    historicalSource: '《晋书·卷三·帝纪第三·武帝纪》《晋书·卷二十六·志第十六·食货志》',
    historicalFact: '王濬楼船破东吴，孙皓降，三国分裂近百年彻底复归一统，改元太康。武帝颁《占田课田令》与《户调式》：一品官得占田五十顷、荫佃客十五户；至九品官占田十顷。士族土地庄园特权获得法典彻底保障。',
    clanStrategy: '官品占田令出台，世家土地庄园经略进入鼎盛期！依律垦殖良田、收纳佃客、营建水碓，奠定百年之基。'
  },
  {
    year: 291,
    dynasty: '西晋',
    eraName: '元康元年',
    emperor: '晋惠帝司马衷',
    eventTitle: '八王之乱爆发与华夏板荡前夕',
    historicalSource: '《晋书·卷四·帝纪第四·惠帝纪》《晋书·卷五十九·列传第二十九·八王传》《资治通鉴·卷八十二·晋纪四》',
    historicalFact: '晋武帝崩，痴愚惠帝即位，贾南风皇后乱政诛杀杨骏。随后引汝南王亮、楚王玮入朝，开启历时十六年骨肉相残之‘八王之乱’，中原百骸暴野，五胡乱华与衣冠南渡大变局前夕来临。',
    clanStrategy: '华夏沉沦前夕之至暗关头！世家须未雨绸缪：北宗闭紧坞壁深垒、储备十年粮秣；南宗速在建邺购置别苑，为避乱江南留下血脉火种。'
  }
];

// ====================================================================
// 5. 汉魏四大核心社会与制度考释 (Institutional Compendium)
// ====================================================================
const HAN_WEI_INSTITUTIONAL_COMPENDIUM = {
  manor_system: {
    title: '坞壁庄园与部曲农兵合一经济制',
    historicalSource: '《后汉书·卷四十九·王充王符仲长统列传·昌言》《三国志·卷二十六·田畴传》《齐民要术·水碓》《水经注·颍水》',
    historicalFact: '汉末天下大乱，王纲解纽，流寇群盗与割据军阀纵横中原。世家大族纷纷修筑高壁深壕，依险据守，名曰‘坞壁’（或‘坞堡’）。坞壁内部形成自给自足之封闭经济体，以宗族为核心，以流民为佃客僮仆，以壮丁为部曲私兵；‘平时耕作于坞外田垄，战时引弓守御于楼堞之上’。汉魏之际水力机械长足发展，水碓水磨广泛用于庄园粮食脱壳磨粉及冶铁锻造，水碓一座日舂数十斛，极大富实了世家家底。',
    gameplaySignificance: '本赛季玩家拥有的【坞壁庄园】乃立身根本：良田产粟、水碓分利、部曲自卫、藏书阁传经，构成了四世接力的物质与武备压舱石。'
  },
  selection_system: {
    title: '两汉察举征辟至曹魏九品中正制之演进',
    historicalSource: '《后汉书·百官志》《通典·卷十三至十四·选举典》《三国志·陈群传》《宋书·卷九十四·恩幸传序》',
    historicalFact: '两汉选官本以‘察举制’为主，由地方郡国每年按人口察荐孝廉、茂才，注重乡闾清议评价与道德操守。汉末名教虚伪，卖官公行，察举崩坏。延康元年（220年），曹魏尚书令陈群创设‘九品官人法’（九品中正制）：州设大中正，郡设小中正，依‘家世’（门资族望）、‘道德’、‘才能’三端品评天下士人为九品，作为吏部授官之据。曹魏初兼重才德，入晋后门阀固化，终致‘上品无寒门，下品无势族’。',
    gameplaySignificance: '第一赛季仕途从白衣门生起步，中经孝廉察举，至曹魏九品中正确立后，父辈太守名望可化为【门阀祖荫】，使子辈直入中正品第，跳过寒素台阶。'
  },
  land_privilege_system: {
    title: '西晋占田课田令与官品优免特权制',
    historicalSource: '《晋书·卷二十六·志第十六·食货志》《隋书·卷二十四·志第十九·食货志》',
    historicalFact: '西晋太康元年灭吴一统后，晋武帝颁布《占田课田令》与《户调式》，标志国家首次以法典形式承认士族地主对土地与人口的合法垄断。法令明确规定‘官品占田制’：第一品官得占田五十顷，其后每品减五顷，至第九品得占田十顷。官吏还享有‘荫亲属与客’特权：第一品得荫亲属三代，荫佃客十五户、衣食客三户；乃至第九品荫佃客一户。免除其赋役，大量自耕农因逃避沉重赋税投充世家大族成为佃客。',
    gameplaySignificance: '当玩家宗族官位登临上品，庄园良田占田上限与流民依附规模呈指数级扩充，成为经世巨阀。'
  },
  classics_and_metaphysics: {
    title: '两汉经学合流、熹平石经与正始魏晋玄学',
    historicalSource: '《后汉书·卷七十九·儒林列传第六十九》《世说新语·文学第四》《晋书·卷四十三·列传第十三·王戎传》',
    historicalFact: '东汉太学极盛时生员达三万人，经学分今文与古文两派，争论不休。大儒马融、郑玄博通今古，郑玄遍注群经，确立兼采众长的经学典范；蔡邕主笔刊刻洛阳开阳门外《熹平石经》，立经字正本于天下。魏明帝、齐王芳正始年间，何晏、王弼崇奉老庄，开创辨析‘名教与自然’之玄学清谈；及至竹林七贤（嵇康、阮籍等），以放达抗衡司马氏之伪饰名教，铸就深沉旷达之‘魏晋风骨’。',
    gameplaySignificance: '游戏中研习章句、抄录经石、与名仕清谈辩难，可大幅上扬心性悟性与门第声望，成为士林尊崇的‘一代宗师’。'
  }
};

// ====================================================================
// 6. 汉魏十大著名门阀世家谱系与郡望堂号考释 (Prominent Clans)
// ====================================================================
const HAN_WEI_PROMINENT_CLANS = [
  {
    clanKey: 'yingchuan_xun',
    clanName: '颍川荀氏',
    region: '河南颍川颍阴',
    hallName: '德星堂',
    historicalSource: '《后汉书·卷六十二·荀韩钟陈列传》《三国志·卷十·荀彧传》',
    motto: '德星聚秀，王佐济世',
    ancestors: '战国荀子 ➔ 东汉荀淑（号‘神君’，生八龙）➔ 荀爽（司空）➔ 曹魏荀彧（尚书令）、荀攸',
    historicalFeature: '颍川名族之冠，经学传家，主盟天下清议。曹魏政权的核心文官柱石。'
  },
  {
    clanKey: 'yingchuan_chen',
    clanName: '颍川陈氏',
    region: '河南颍川许县',
    hallName: '颍川堂 / 德星堂',
    historicalSource: '《后汉书·卷六十二·陈寔传》《三国志·卷二十二·陈群传》',
    motto: '梁上化德，清白持身',
    ancestors: '东汉陈寔（太丘长，海内士宗）➔ 陈纪（大鸿胪）、陈谌 ➔ 曹魏陈群（司空，创制九品官人法）➔ 晋陈泰',
    historicalFeature: '以太丘长至德闻名天下，创设九品官人法，奠定魏晋门阀政治制度基石。'
  },
  {
    clanKey: 'runan_yuan',
    clanName: '汝南袁氏',
    region: '汝南汝阳',
    hallName: '汝南堂 / 卧雪堂',
    historicalSource: '《后汉书·卷四十五·袁张韩周列传》《三国志·卷六·袁绍传》',
    motto: '四世三公，门生遍野',
    ancestors: '袁安（司徒，‘袁安卧雪’）➔ 袁敞（司空）➔ 袁汤（太尉）➔ 袁逢（司空）、袁隗（太傅）➔ 袁绍、袁术',
    historicalFeature: '东汉门第鼎盛之极，四世五公，门生故吏遍及神州，为汉末讨董义军盟主。'
  },
  {
    clanKey: 'hongnong_yang',
    clanName: '弘农杨氏',
    region: '司隶弘农华阴',
    hallName: '四知堂 / 关西堂',
    historicalSource: '《后汉书·卷五十四·杨震列传第四十四》《三国志·卷十九·杨修传》',
    motto: '天知地知，清白传家',
    ancestors: '杨震（‘关西孔子’，太尉，留‘四知’清白家风）➔ 杨秉（太尉）➔ 杨赐（太尉）➔ 杨彪（太尉）➔ 杨修',
    historicalFeature: '四世太尉，风宪清峻，与汝南袁氏并称海内两大冠冕顶门。'
  },
  {
    clanKey: 'langya_wang',
    clanName: '琅琊王氏',
    region: '徐州琅琊临沂',
    hallName: '三槐堂 / 德化堂',
    historicalSource: '《三国志·卷二十四·王祥传》《晋书·卷三十三·王祥传》《世说新语》',
    motto: '孝悌纯笃，道德传家',
    ancestors: '西汉王吉 ➔ 曹魏西晋王祥（太保，二十四孝卧冰求鲤）、王览 ➔ 东晋王导、王敦（‘王与马共天下’）、王羲之',
    historicalFeature: '以孝悌醇厚起家，魏晋易代元勋，后世南渡成为六朝江左第一甲姓。'
  },
  {
    clanKey: 'chenjun_xie',
    clanName: '陈郡谢氏',
    region: '豫州陈郡阳夏',
    hallName: '宝树堂 / 乌衣堂',
    historicalSource: '《三国志·卷二十三·魏书·和常杨杜赵裴传·注引谢氏谱》《晋书·卷七十九·谢安传》',
    motto: '芝兰玉树，雅量风流',
    ancestors: '曹魏谢缵（典农中郎将）➔ 西晋谢衡（国子祭酒）➔ 东晋谢安（太保，淝水破苻坚）、谢玄',
    historicalFeature: '自汉末起家农官，魏晋崇儒修雅，后世与琅琊王氏并称，号‘乌衣门第’。'
  },
  {
    clanKey: 'qinghe_cui',
    clanName: '清河崔氏',
    region: '冀州清河东武城',
    hallName: '清河堂 / 德星堂',
    historicalSource: '《三国志·卷十二·魏书·崔琰传第十二》《晋书·卷四十二·崔洪传》',
    motto: '骨鲠清烈，经学名家',
    ancestors: '东汉崔瑗、崔寔（作《四民月令》）➔ 曹魏崔琰（尚书，威仪严整，高风亮节）➔ 西晋崔洪',
    historicalFeature: '大河之北经术巨族，文武兼资，家风严正肃然，后世列隋唐五姓七望之首。'
  },
  {
    clanKey: 'taiyuan_wang',
    clanName: '太原王氏',
    region: '并州太原晋阳',
    hallName: '太原堂 / 晋阳堂',
    historicalSource: '《三国志·卷二十六·魏书·田豫王昶等传》《晋书·卷三十三·王浑传》',
    motto: '出将入相，表里山河',
    ancestors: '东汉王允（司徒，诛董卓安汉社稷）➔ 曹魏王昶（司空）➔ 西晋王浑（司徒，灭吴名将）、王济',
    historicalFeature: '并汾雄镇名门，世代出将入相，深具北疆豪迈与经世经略之风。'
  },
  {
    clanKey: 'fanyang_lu',
    clanName: '范阳卢氏',
    region: '幽州涿郡范阳',
    hallName: '范阳堂',
    historicalSource: '《后汉书·卷六十四·卢植列传第五十四》《三国志·卷三十二·蜀书·先主传》',
    motto: '博古通今，儒将忠义',
    ancestors: '东汉卢植（北中郎将，大儒兼名将，刘备公孙瓒之师）➔ 曹魏卢毓（司空）➔ 西晋卢珽',
    historicalFeature: '文能注疏群经，武能统军荡平流寇，名播燕赵，后世历隋唐而不衰。'
  },
  {
    clanKey: 'longxi_li',
    clanName: '陇西李氏',
    region: '凉州陇西狄道',
    hallName: '陇西堂',
    historicalSource: '《三国志·卷十八·魏书·李通传》《晋书·卷三十六·卫瓘传·引李氏世系》',
    motto: '西陲雄镇，将门世家',
    ancestors: '汉飞将军李广之后 ➔ 曹魏李通（破贼校尉）➔ 西晋陇西豪族将领',
    historicalFeature: '雄镇陇右丝路关隘，深壁固垒，部曲弓马天下莫敌，为西北屏藩重室。'
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    HAN_WEI_OFFICIAL_LADDERS,
    HAN_WEI_HISTORICAL_FIGURES,
    HAN_WEI_CRITICAL_CHRONO_EVENTS,
    LIU_CHAO_CRITICAL_CHRONO_EVENTS,
    HAN_WEI_AND_LIU_CHAO_EVENTS,
    HAN_WEI_RELICS_DATABASE,
    HAN_WEI_PROCEDURAL_ENCOUNTER_POOL,
    HAN_WEI_DESK_DOCUMENTS,
    HAN_WEI_CHRONICLE_ENCYCLOPEDIA,
    HAN_WEI_INSTITUTIONAL_COMPENDIUM,
    HAN_WEI_PROMINENT_CLANS
  };
}
