// 华夏传世文化与百工非遗典藏数据

const INTANGIBLE_HERITAGE_DATABASE = [
  {
    id: 'craft_longquan_sword',
    name: '龙泉宝剑 · 锻铸百炼技艺',
    category: '金石锻冶',
    icon: '⚔️',
    spec: '百炼精钢折叠锻打数十次 · 刚柔并济寒光照雪',
    costAp: 1,
    costMoney: 600,
    effects: { resilience: 25, courage: 15, heirloomScore: 30 },
    motto: '十年磨一剑，霜刃未曾试。',
    desc: '淬火千锤百炼，剑身坚韧不折，淬炼如钢心性，家族世代底蕴大增。'
  },
  {
    id: 'craft_yixing_zisha',
    name: '宜兴紫砂 · 原矿手工泥绘陶刻',
    category: '陶冶神韵',
    icon: '🫖',
    spec: '特种黄龙山陈腐老泥 · 全手工打泥条拍打成型',
    costAp: 1,
    costMoney: 800,
    effects: { sanbaoShen: 8, sanbaoJing: 5, apMaxBonus: 1, san: 15 },
    motto: '人间珠玉安足取，不及阳羡一丸土。',
    desc: '茶禅一味温润养性，涤尽凡尘浮躁，元神清明，精力上限永久提升。'
  },
  {
    id: 'craft_suzhou_embroidery',
    name: '苏绣 · 双面极细平针丝光绝艺',
    category: '丝帛丹青',
    icon: '🪡',
    spec: '一缕蚕丝剖为三十二丝 · 双面同绣异色天工',
    costAp: 1,
    costMoney: 700,
    effects: { iq: 20, eq: 20, rep: 10 },
    motto: '针墨齐辉神州秀，万缕灵丝化春风。',
    desc: '于幽微处见天地，极大开阔洞察与人际共情，智谋与声誉同升。'
  },
  {
    id: 'craft_xuan_paper',
    name: '宣纸 · 青檀皮料传统捞纸秘艺',
    category: '经史文房',
    icon: '📜',
    spec: '三年青檀皮经百道工序日晒 · 纸寿千年百折不损',
    costAp: 1,
    costMoney: 500,
    effects: { legacyScore: 45, clanCulture: 40, rep: 15 },
    motto: '轻似蝉翼白如雪，墨韵淋漓寿千年。',
    desc: '文脉长青千秋不拔，深厚涵养家族传世文化底蕴与宗师传承积分。'
  },
  {
    id: 'craft_cloisonne_enamel',
    name: '景泰蓝 · 铜胎掐丝珐琅绝艺',
    category: '宫廷巨匠',
    icon: '🏺',
    spec: '纯紫铜胎手工折掐扁铜丝 · 矿物珐琅经烈火七度淬炼',
    costAp: 1,
    costMoney: 1000,
    effects: { clanBizBonus: 50, rep: 35, resilience: 15 },
    motto: '铜胎掐丝施彩料，烈火涅槃耀神州。',
    desc: '国礼至尊富丽堂皇，直接厚植宗族实业商业基业，享誉四海。'
  },
  {
    id: 'craft_huizhou_ink',
    name: '徽墨 · 绩溪胡开文金箔松烟绝艺',
    category: '经史文房',
    icon: '🖤',
    spec: '桐油烟天然麝香名贵金箔 · 铁臼万杵捣烂千锤百炼',
    costAp: 1,
    costMoney: 850,
    effects: { legacyScore: 50, clanCulture: 45, rep: 20 },
    motto: '丰肌腻理，光泽如漆，一点如漆万载存真。',
    desc: '文房四宝之首，墨质坚如玉石、落纸生光，宗室文脉与传家文化大增。'
  },
  {
    id: 'craft_woodblock_printing',
    name: '雕版印刷 · 金陵刻经处传统水印绝艺',
    category: '文脉传薪',
    icon: '📖',
    spec: '棠梨木手工精雕反字 · 纯手工刷印宣纸线装成帙',
    costAp: 1,
    costMoney: 950,
    effects: { iq: 25, legacyScore: 55, clanCulture: 50 },
    motto: '镂水刻云传典籍，书香墨韵泽万方。',
    desc: '人类印刷文明活化石，刀法严谨神采飞扬，涵养家族世代学问与崇高声誉。'
  }
];

const BRONZE_EPIGRAPHY_DATABASE = [
  {
    id: 'epigraphy_houmuwu',
    name: '后母戊青铜大方鼎拓本',
    dynasty: '商代晚期吉金',
    icon: '鼎',
    spec: '重八百三十二点八四公斤 · 华夏现存最大商周青铜礼器',
    costAp: 1,
    costMoney: 800,
    effects: { resilience: 20, clanLuck: 40, rep: 25 },
    inscription: '母戊嘉德，子孙永宝用。',
    desc: '吉金之祖沉凝如岳，拓得墨色如漆，全族浩然正气升腾，心性抗逆坚如磐石。'
  },
  {
    id: 'epigraphy_maogongding',
    name: '毛公鼎近五百字金文朱砂拓',
    dynasty: '西周晚期重器',
    icon: '⚱️',
    spec: '内壁铸四百九十九字长篇铭文 · 抵得上一篇《尚书》文献',
    costAp: 1,
    costMoney: 1000,
    effects: { iq: 25, rep: 15, sanbaoShen: 6 },
    inscription: '肆皇天大命，盍勉帅泰德。',
    desc: '西周金文冠冕，朱拓灿烂夺目，细读铭文大开智谋，元神朗澈清和。'
  },
  {
    id: 'epigraphy_dayuding',
    name: '大盂鼎宗周纪事金石拓',
    dynasty: '西周早期吉金',
    icon: '🏺',
    spec: '二百九十一字宏伟册命 · 宗周礼乐典章制度之渊薮',
    costAp: 1,
    costMoney: 900,
    effects: { legacyScore: 50, sanbaoShen: 6, rep: 20 },
    inscription: '王若曰：盂，丕显文王受天有大命。',
    desc: '天命玄德宗法垂范，墨拓古劲浑厚，宗师传承积分大增，后学肃然起敬。'
  },
  {
    id: 'epigraphy_taishan_stone',
    name: '泰山秦刻石琅琊台碑拓本',
    dynasty: '秦代斯相法书',
    icon: '⛰️',
    spec: '丞相李斯手书小篆 · 字体圆健如铁画银钩',
    costAp: 1,
    costMoney: 700,
    effects: { rep: 30, heirloomScore: 35, eq: 15 },
    inscription: '皇帝临位，作制明法，臣下修饬。',
    desc: '千古一帝统一度量衡之石墨明证，传家宝估值大幅飞跃，声望震铄。'
  },
  {
    id: 'epigraphy_shiguwen',
    name: '石鼓文周宣王猎碣古拓',
    dynasty: '先秦石刻之祖',
    icon: '🪨',
    spec: '十面馒头状花岗岩石碣 · 大篆过渡小篆之活化石',
    costAp: 1,
    costMoney: 600,
    effects: { sanbaoQi: 6, sanbaoJing: 6, apMaxBonus: 1, resilience: 15 },
    inscription: '吾车既工，吾马既同。吾车既好，吾马既阜。',
    desc: '石刻之祖朴茂雄强，拓罢心旷神怡，补益气血三宝，精力上限永久提升。'
  },
  {
    id: 'epigraphy_sanshipan',
    name: '西周散氏盘草篆铭文朱拓本',
    dynasty: '西周厉王重器',
    icon: '盘',
    spec: '三百五十七字散伯履勘割田契约 · 奇崛雄强草篆之先河',
    costAp: 1,
    costMoney: 850,
    effects: { resilience: 25, clanLuck: 45, rep: 20 },
    inscription: '用田眉自桹木，至于井邑，右乃徂。',
    desc: '华夏最早土地契约吉金明证，字势欹正跌宕，全族福泽升华，抗逆心性坚忍。'
  },
  {
    id: 'epigraphy_goujian_sword',
    name: '越王勾践自作用剑鸟虫书金文拓',
    dynasty: '春秋霸主重器',
    icon: '🗡️',
    spec: '八字鸟虫篆错金铭文 · 历两千四百年出土依旧寒芒逼人',
    costAp: 1,
    costMoney: 1100,
    effects: { courage: 25, resilience: 25, rep: 30 },
    inscription: '越王鸠浅，自作用剑。',
    desc: '卧薪尝胆霸主之剑，寒光摄魄刚毅绝伦，心性如钢，魄力与大局声望大振。'
  }
];

const FAMOUS_KILN_PORCELAIN_DATABASE = [
  {
    id: 'porcelain_ru_celadon',
    name: '汝窑天青釉三足樽承盘',
    kiln: '汝窑 · 魁首天青',
    icon: '🥣',
    spec: '雨过天青云破处 · 玛瑙入釉抚若凝脂蟹爪纹细密',
    costAp: 1,
    costMoney: 1200,
    effects: { resilience: 25, eq: 25, sanbaoShen: 6, rep: 20 },
    appreciation: '青如天，面如玉，蝉翼纹，芝麻钉。',
    desc: '宋瓷之冠，器形简雅肃穆，天青釉色如蔚蓝霁日，极具澄澈静穆之大道神韵。'
  },
  {
    id: 'porcelain_guan_moonwhite',
    name: '官窑月白贯耳八方弦纹瓶',
    kiln: '官窑 · 澄泥紫口',
    icon: '🏺',
    spec: '紫口铁足金丝片 · 庄严穆肃浑厚古朴大器天成',
    costAp: 1,
    costMoney: 1500,
    effects: { rep: 35, legacyScore: 50, sanbaoShen: 6 },
    appreciation: '修内司官窑，紫口铁足，澄泥金线。',
    desc: '庙堂至尊官家大器，釉层莹厚如堆脂，文脉气度严正，宗师传承积分与名望大涨。'
  },
  {
    id: 'porcelain_ge_crackle',
    name: '哥窑金丝铁线海棠式洗',
    kiln: '哥窑 · 百圾碎纹',
    icon: '🪷',
    spec: '金丝铁线百圾碎 · 墨纹如铁金纹如丝千古绝唱',
    costAp: 1,
    costMoney: 1100,
    effects: { resilience: 30, heirloomScore: 30, sanbaoJing: 6 },
    appreciation: '百圾碎纹，开片自然，金丝铁线。',
    desc: '开片错落犹如冰裂初融，传家宝估值大幅跃升，坚韧心性在百劫千难中愈显光华。'
  },
  {
    id: 'porcelain_ding_white',
    name: '定窑白釉划花莲纹大斗笠碗',
    kiln: '定窑 · 白瓷胜雪',
    icon: '🍚',
    spec: '白瓷胜雪刻花绝 · 芒口覆烧泪痕流淌胎薄如纸',
    costAp: 1,
    costMoney: 1000,
    effects: { iq: 30, apMaxBonus: 1, sanbaoQi: 6 },
    appreciation: '定州白瓷，刀法飞动，白玉无瑕。',
    desc: '五大名窑唯一白瓷，刻花刀法如行云流水，悟彻格物真知，精力上限永久提升。'
  },
  {
    id: 'porcelain_jun_rosepurple',
    name: '钧窑窑变玫瑰紫海棠花盆',
    kiln: '钧窑 · 入窑万彩',
    icon: '🪴',
    spec: '入窑一色出万彩 · 蓝紫交辉蚯蚓走泥绚烂瑰丽',
    costAp: 1,
    costMoney: 1300,
    effects: { clanLuck: 50, clanBizBonus: 60, rep: 5 },
    appreciation: '黄金有价钧无价，窑变万彩夺天工。',
    desc: '窑变造化鬼斧神工，红霞紫霭蒸腾，全族家国福泽与实业基业繁盛昌隆。'
  },
  {
    id: 'porcelain_ge_kiln',
    name: '哥窑米黄釉百圾碎金丝铁线洗',
    kiln: '哥窑 · 金丝铁线',
    icon: '🍵',
    spec: '开片错落天然自成 · 粗黑深纹细黄浅纹相映成趣',
    costAp: 1,
    costMoney: 1250,
    effects: { resilience: 25, eq: 25, heirloomScore: 35 },
    appreciation: '金丝铁线裂纹开，巧夺天工宋韵裁。',
    desc: '宋代五大名窑绝品，碎纹层叠宛如冰裂，抚之如玉，传家宝估值与心性大增。'
  },
  {
    id: 'porcelain_blue_white_meiping',
    name: '元青花萧何月下追韩信图梅瓶',
    kiln: '景德镇 · 鬼斧神工',
    icon: '🏺',
    spec: '进口苏麻离青料浓翠发色 · 铁锈斑深沉入骨人物神态如生',
    costAp: 1,
    costMoney: 1800,
    effects: { rep: 40, legacyScore: 65, clanBizBonus: 50 },
    appreciation: '白釉青花一火成，花从釉里透分明。',
    desc: '青花瓷冠冕神品，萧何策马求贤若渴，家族大局声望极盛，宗师传承积分暴涨。'
  }
];

const MASTER_TEA_WAY_DATABASE = [
  {
    id: 'tea_shifeng_longjing',
    name: '西湖龙井 · 御前十八棵明前极品',
    category: '绿茶 · 龙井问茶',
    icon: '🍃',
    spec: '狮峰山下雨前春 · 一旗一枪色翠香郁甘冽如泉',
    costAp: 1,
    costMoney: 900,
    effects: { resilience: 25, sanbaoShen: 6, rep: 20, eq: 20 },
    motto: '一碗喉吻润，两碗破孤闷。',
    desc: '绿茶之魁，鲜嫩爽口，回甘持久，涤尽心头尘俗孤闷，神思朗澈宁静。'
  },
  {
    id: 'tea_dahongpao_mother',
    name: '武夷大红袍 · 九龙窠母树珍品',
    category: '乌龙 · 武夷岩茶',
    icon: '🫖',
    spec: '三坑两涧岩骨香 · 幽兰香高醇厚绵长茶中之王',
    costAp: 1,
    costMoney: 1600,
    effects: { rep: 35, legacyScore: 50, sanbaoQi: 6 },
    motto: '三碗搜枯肠，唯有文字五千卷。',
    desc: '岩骨花香绝冠天下，烹饮大开灵思悟性，宗师传承与大局名望更上一层楼。'
  },
  {
    id: 'tea_tieguanyin_chenxiang',
    name: '安溪铁观音 · 传统正味沉香音韵',
    category: '乌龙 · 观音韵致',
    icon: '🌿',
    spec: '青蒂绿腹蜻蜓头 · 沉重如铁美如观音兰香幽绝',
    costAp: 1,
    costMoney: 1100,
    effects: { eq: 30, heirloomScore: 30, sanbaoJing: 6 },
    motto: '四碗发轻汗，平生不平事，尽向毛孔散。',
    desc: '音韵天成，回甘带蜜，化解平生胸中郁结，传家古宝倍增岁月包浆雅韵。'
  },
  {
    id: 'tea_yiwu_puer_century',
    name: '云南易武 · 百年古树金瓜贡茶',
    category: '黑茶 · 越陈越香',
    icon: '🍂',
    spec: '易武正山百年木 · 汤感醇厚如稠红浓明澈金圈',
    costAp: 1,
    costMoney: 1400,
    effects: { lifespanCeilingBonus: 1, apMaxBonus: 1, sanbaoQi: 6, health: 15 },
    motto: '五碗肌骨清，六碗通仙灵。',
    desc: '时光陈化之活化石，养胃生津润养奇经八脉，精力上限与天年寿元双双突破！'
  },
  {
    id: 'tea_biluochun_dongting',
    name: '洞庭碧螺春 · 极品吓煞人香飞翠',
    category: '绿茶 · 洞庭飞翠',
    icon: '🌱',
    spec: '银白隐翠卷若螺 · 洞庭果木交错茶吸花香极品',
    costAp: 1,
    costMoney: 1000,
    effects: { iq: 30, clanLuck: 50, sanbaoShen: 6 },
    motto: '七碗吃不得也，唯觉两腋习习清风生。',
    desc: '花果幽香扑鼻，品罢如行云流水两腋清风，家族福泽与后学智谋大幅升华。'
  },
  {
    id: 'tea_huangshan_maofeng',
    name: '黄山毛峰 · 富溪母树雀舌特级云雾茶',
    category: '绿茶 · 云海雀舌',
    icon: '🌱',
    spec: '高山黄山云雾滋养 · 鱼叶金黄白毫披覆香如白兰',
    costAp: 1,
    costMoney: 950,
    effects: { resilience: 25, eq: 22, sanbaoShen: 6 },
    motto: '香气馥郁似白兰，滋味醇厚带回甘。',
    desc: '云雾生灵叶，轻啜一口齿颊生香，神魂澄澈，抗逆心性与情商人脉并进。'
  },
  {
    id: 'tea_guzhu_zisun',
    name: '湖州顾渚紫笋 · 陆羽茶经唐代第一贡茶',
    category: '贡茶 · 紫笋金芽',
    icon: '🍵',
    spec: '阳崖阴林紫者上 · 芳香清冽唐代天子年年清明设宴',
    costAp: 1,
    costMoney: 1200,
    effects: { rep: 30, legacyScore: 45, sanbaoQi: 8 },
    motto: '茶圣陆羽手自品题，清香入骨唐室之冠。',
    desc: '千年第一皇家贡茶，清冽幽远，涵养浩然正气，大局声誉与文脉底蕴升华。'
  }
];

const MASTER_BROCADE_HERITAGE_DATABASE = [
  {
    id: 'brocade_nanjing_yunjin',
    name: '南京云锦 · 妆花真金孔雀羽织金锦',
    category: '寸锦寸金 · 皇家御用',
    icon: '🦚',
    spec: '大花楼木织机双人提花 · 孔雀翠羽真金扁线灿若云霞',
    costAp: 1,
    costMoney: 1800,
    effects: { rep: 40, legacyScore: 60, sanbaoShen: 8, resilience: 25 },
    motto: '灿若云霞，寸锦寸金，通天彻地大国风华。',
    desc: '锦中之冠，金线孔雀羽交织如日丽中天，彰显华夏礼乐衣冠之极致气魄。'
  },
  {
    id: 'brocade_suzhou_songjin',
    name: '苏州宋锦 · 重锦八达晕双面几何锦',
    category: '华美古雅 · 冠绝锦丛',
    icon: '👘',
    spec: '斜纹重纬精妙显花 · 质地坚柔平整历经千年不褪',
    costAp: 1,
    costMoney: 1300,
    effects: { eq: 30, heirloomScore: 35, sanbaoQi: 8 },
    motto: '八达玲珑，锦绣温润，文雅高华宋韵传世。',
    desc: '色泽典雅平实，华美中深藏文人格调，传家宝估值大幅跃升，情商与文脉大涨。'
  },
  {
    id: 'brocade_chengdu_shujin',
    name: '成都蜀锦 · 汉唐五星出东方利中国织锦',
    category: '两千载名锦 · 丝路重器',
    icon: '🌟',
    spec: '锦江春水濯濯如星 · 汉隶云气神兽织锦汉唐之冠',
    costAp: 1,
    costMoney: 1500,
    effects: { resilience: 35, legacyScore: 50, sanbaoJing: 8 },
    motto: '五星出东方利中国，锦水含章昭示千古宏运。',
    desc: '丝绸之路第一圣锦，吉金金石与织锦同寿，浩然正气护佑，抗逆心性大成。'
  },
  {
    id: 'brocade_suzhou_kesi',
    name: '苏州缂丝 · 雕木织彩通经断纬山水大轴',
    category: '织中之圣 · 雕木巧匠',
    icon: '🖼️',
    spec: '通经断纬自由织彩 · 犹如雕镂以针作画一寸缂丝一寸金',
    costAp: 1,
    costMoney: 1600,
    effects: { iq: 35, apMaxBonus: 1, sanbaoShen: 8 },
    motto: '承空视之如雕镂之象，通经断纬神乎其技。',
    desc: '织造艺术顶峰，图案犹如立体浮雕，格物智谋超迈前人，精力上限永久提升。'
  },
  {
    id: 'brocade_guangxi_zhuangjin',
    name: '广西壮锦 · 凤穿牡丹八桂百花万字锦',
    category: '八桂瑰宝 · 民族华彩',
    icon: '🌺',
    spec: '竹刀挑花提综斜织 · 几何织纹结实耐用绚烂多姿',
    costAp: 1,
    costMoney: 1100,
    effects: { clanLuck: 60, health: 20, sanbaoQi: 8 },
    motto: '巧织百花绣八桂，凤穿牡丹祥瑞福寿千家春。',
    desc: '粗犷绚烂，生命活力喷薄而出，全族祥瑞鸿运齐聚，身心气血旺盛。'
  },
  {
    id: 'brocade_tujia_xilankapu',
    name: '土家西兰卡普 · 传统四十八勾通经断纬花锦',
    category: '西兰卡普 · 锦绣西兰',
    icon: '🧶',
    spec: '背向古法手工挑织 · 几何八勾图纹斑斓古拙纯真',
    costAp: 1,
    costMoney: 1150,
    effects: { clanLuck: 50, resilience: 30, sanbaoJing: 8 },
    motto: '千丝万缕寄深情，古朴西兰锦绣长。',
    desc: '武陵山脉千年织锦活化石，粗犷质朴生机盎然，家族福泽连绵，心性韧劲深厚。'
  },
  {
    id: 'brocade_dong_textile',
    name: '侗族大歌侗锦 · 芦笙日月飞鸟挑花手工神锦',
    category: '百越遗风 · 歌锦相生',
    icon: '🕊️',
    spec: '芦笙踩堂花纹经纬穿梭 · 天然植物蓝靛染线经久耐磨',
    costAp: 1,
    costMoney: 1050,
    effects: { health: 25, clanLuck: 55, eq: 20 },
    motto: '饭养身歌养心锦养美，侗家千年岁月长。',
    desc: '民族文化旷古天籁，与侗族大歌一体同源，身心气血饱满通畅，祥瑞鸿运大增。'
  }
];

const MASTER_GUQIN_HERITAGE_DATABASE = [
  {
    id: 'guqin_jiuxiao_huanpei',
    name: '九霄环佩 · 唐代伏羲式盛唐第一神琴',
    category: '大圣遗音 · 旷古神品',
    icon: '🎵',
    spec: '盛唐伏羲式 · 杉木斫制鹿角霜灰胎紫檀配件千段蛇腹断纹',
    costAp: 1,
    costMoney: 2200,
    effects: { rep: 50, legacyScore: 70, sanbaoShen: 10, lifespanCeilingBonus: 1 },
    motto: '高山流水万壑松，泠泠七弦九霄声。',
    desc: '华夏神琴之冠，音质温劲松透纯粹，弹抚如与圣贤对坐，大局声誉大幅跃升，天年寿元突破+1载。'
  },
  {
    id: 'guqin_haozhong',
    name: '号钟 · 周秦沉雷长鸣洪钟之琴',
    category: '周秦古器 · 诸侯重器',
    icon: '🔔',
    spec: '汉代蔡邕琴操所记齐桓公古琴 · 桐面梓底发声沉雄若雷霆',
    costAp: 1,
    costMoney: 1600,
    effects: { resilience: 40, rep: 35, sanbaoQi: 8 },
    motto: '长鸣如洪钟，沉雷破九幽，浩然正气贯长虹。',
    desc: '音色洪亮激昂，如长钟大吕荡涤俗虑，抗逆心性与大局声誉大幅增强。'
  },
  {
    id: 'guqin_raoliang',
    name: '绕梁 · 春秋楚庄王三日不绝之琴',
    category: '清微澹远 · 余音绕梁',
    icon: '🌌',
    spec: '春秋灵古桐木斫成 · 散音沉静泛音透彻余韵三日不绝',
    costAp: 1,
    costMoney: 1700,
    effects: { apMaxBonus: 1, health: 25, sanbaoJing: 8 },
    motto: '余音绕梁，三日不绝，天地澄澈万物生。',
    desc: '琴音绵长深邃，调和五脏六腑阴阳气血，精力上限永久提升1点，健康大增。'
  },
  {
    id: 'guqin_lvqi',
    name: '绿绮 · 司马相如凤求凰千古良琴',
    category: '冰裂云断 · 风流文采',
    icon: '🌿',
    spec: '梁王所赐司马相如名琴 · 题有幽兰金字冰裂断纹通体碧润',
    costAp: 1,
    costMoney: 1500,
    effects: { eq: 45, clanTalentSuccessRate: 0.15, heirloomScore: 35, sanbaoShen: 8 },
    motto: '凤兮凤兮归故乡，遨游四海求其凰。',
    desc: '文采风流之极致，情商与族裔成才率显著提高，传家宝估值大幅跃升35%。'
  },
  {
    id: 'guqin_jiaowei',
    name: '焦尾 · 东汉蔡邕救焚良桐名琴',
    category: '烈火涅槃 · 大智大悟',
    icon: '🔥',
    spec: '吴人烈火烧桐木 · 蔡邕知其良材抢救斫为奇琴尾犹焦黑',
    costAp: 1,
    costMoney: 1400,
    effects: { iq: 45, eq: 30, sanbaoShen: 8, resilience: 30 },
    motto: '烈火良桐识者稀，焦痕犹在发天籁。',
    desc: '浴火重生之神悟，智谋超凡拔群，在逆境中磨砺出洞穿世事的深邃智慧。'
  },
  {
    id: 'guqin_song_pinestone',
    name: '松石间意 · 宋代宣和官琴仲尼式神品',
    category: '宣和御府 · 天籁纯音',
    icon: '🌲',
    spec: '北宋宣和官琴仲尼式 · 金徽玉轸冰裂流水断纹十三徽灿若星辰',
    costAp: 1,
    costMoney: 2300,
    effects: { rep: 48, legacyScore: 68, sanbaoShen: 10, lifespanCeilingBonus: 1 },
    motto: '松涛万壑琴声咽，石上流泉见道心。',
    desc: '宋琴之巅，音色沉静苍古透润，抚之一洗凡胸，大局声誉大幅增强，寿元天年突破+1载。'
  },
  {
    id: 'guqin_ming_heleishi',
    name: '壑雷 · 明代蕉叶式百衲断纹传世古琴',
    category: '蕉叶仙品 · 空谷雷音',
    icon: '⚡',
    spec: '明代蕉叶式百衲琴 · 桐木老料拼接发音苍古如空谷春雷',
    costAp: 1,
    costMoney: 2100,
    effects: { courage: 35, resilience: 35, sanbaoQi: 10, rep: 35 },
    motto: '静如深壑止水，动若九天轰雷。',
    desc: '刚柔相济，弦动有龙吟雷震之概，极大提振魄力锐气，心性如铁石坚固。'
  }
];

const MASTER_INKSTONE_HERITAGE_DATABASE = [
  {
    id: 'inkstone_duanyan_shuiyan',
    name: '端砚 · 肇庆老坑水岩金线鱼脑冻',
    category: '砚中之王 · 极品水岩',
    icon: '🪨',
    spec: '肇庆羚羊峡水岩老坑 · 蕉叶白鱼脑冻天然金线如婴儿肌肤',
    costAp: 1,
    costMoney: 2400,
    effects: { rep: 45, apMaxBonus: 1, sanbaoShen: 10, resilience: 30 },
    motto: '呵气成墨，滑如玉肤，发墨细腻不损毫端。',
    desc: '端砚水岩绝品，玉洁冰清，磨墨如油，精力上限永久提升1点，心性抗逆大幅增强。'
  },
  {
    id: 'inkstone_sheyan_longwei',
    name: '歙砚 · 龙尾山金星罗纹刷丝金晕',
    category: '坚润坚密 · 下墨如飞',
    icon: '✨',
    spec: '婺源龙尾山罗纹坑 · 密布金星罗纹如星汉灿烂下墨若飞',
    costAp: 1,
    costMoney: 1800,
    effects: { iq: 45, legacyScore: 60, sanbaoJing: 8 },
    motto: '声清越若金石，下墨如飞涩不留笔。',
    desc: '石质坚润细密，击之有金石之声，大增格物智谋，大师创新工作室传承积分大涨60分。'
  },
  {
    id: 'inkstone_taoyan_lvshi',
    name: '洮河砚 · 洮砚老坑鹦鹉绿鸭头绿',
    category: '碧绿如玉 · 寒冬不冻',
    icon: '🌿',
    spec: '甘肃卓尼洮河水底深处 · 鹦鹉绿水波纹呵气研墨严冬不涸',
    costAp: 1,
    costMoney: 1900,
    effects: { resilience: 45, eq: 35, sanbaoQi: 8 },
    motto: '绿如翡翠，滑如膏脂，洮水深渊神鬼同工。',
    desc: '洮水激流之精魄，呵气即润，严寒冬日研墨不冻，抗逆心性与情商大幅跃升。'
  },
  {
    id: 'inkstone_chengniyan_shanhuang',
    name: '澄泥砚 · 绛州汾河沉泥焙烧鳝鱼黄',
    category: '千锤万漉 · 陶砚之冠',
    icon: '🏺',
    spec: '汾河泥沙经绢袋三年澄滤 · 掺和秘药入窑烈火烧结成砚',
    costAp: 1,
    costMoney: 1600,
    effects: { heirloomScore: 40, eq: 40, sanbaoShen: 8 },
    motto: '泥陶胜玉，贮水不涸，文房传家千年不损。',
    desc: '泥化为玉之奇迹，传家宝估值大幅跃升40%，情商与文脉涵养极深。'
  },
  {
    id: 'inkstone_songhuashi_yu',
    name: '松花石砚 · 长白山松花石温润如玉绿冻',
    category: '白山松水 · 皇家重器',
    icon: '🌲',
    spec: '长白山松花江源头砥石 · 翠绿微黄温润如玉发墨如脂',
    costAp: 1,
    costMoney: 2000,
    effects: { rep: 40, clanLuck: 80, lifespanCeilingBonus: 1, sanbaoQi: 8 },
    motto: '寿古而质润，色翠而声清，钟灵毓秀华夏重器。',
    desc: '关东灵山之造化，全族祥瑞鸿运大增80点，大局声誉大幅增强，天年寿元突破+1载。'
  },
  {
    id: 'inkstone_helanshi_dragons',
    name: '贺兰石砚 · 碧玉双龙贺兰巧雕文房古砚',
    category: '紫绿互映 · 朔方塞宝',
    icon: '🐉',
    spec: '宁夏贺兰山千米绝壁老坑 · 紫绿两色分明巧雕双龙戏珠',
    costAp: 1,
    costMoney: 1950,
    effects: { resilience: 40, rep: 35, sanbaoJing: 8 },
    motto: '色如碧玉质如凝脂，朔方重器文房奇葩。',
    desc: '大漠塞上之宝，质地坚润刚硬，双龙腾跃瑞气千条，抗逆心性与大局声望齐升。'
  },
  {
    id: 'inkstone_red_silk_qingzhou',
    name: '红丝石砚 · 青州黑山红丝刷丝古名砚',
    category: '红丝天成 · 唐宋第一',
    icon: '🧣',
    spec: '青州黑山老坑红丝石 · 黄底红丝如天然刷丝发墨润滑',
    costAp: 1,
    costMoney: 1850,
    effects: { heirloomScore: 45, eq: 35, legacyScore: 50 },
    motto: '唐代柳公权推为诸砚之首，红丝如织美不胜收。',
    desc: '曾冠绝唐代诸砚，华美天成，传家宝估值大幅跃升45%，宗师传承文化深厚。'
  }
];

module.exports = {
  INTANGIBLE_HERITAGE_DATABASE,
  BRONZE_EPIGRAPHY_DATABASE,
  FAMOUS_KILN_PORCELAIN_DATABASE,
  MASTER_TEA_WAY_DATABASE,
  MASTER_BROCADE_HERITAGE_DATABASE,
  MASTER_GUQIN_HERITAGE_DATABASE,
  MASTER_INKSTONE_HERITAGE_DATABASE
};
