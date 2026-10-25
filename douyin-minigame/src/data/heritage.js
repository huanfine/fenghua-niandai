// 华夏传世文化与百工非遗典藏数据 · 汉魏正统经史与古器名物谱

const INTANGIBLE_HERITAGE_DATABASE = [
  {
    id: 'craft_han_steel_blade',
    name: '汉代宿铁 · 锻铸百炼环首神刀',
    category: '金石锻冶',
    icon: '⚔️',
    spec: '三十炼至百炼精钢折叠锻打 · 刀背铭文错金寒芒照雪',
    costAp: 1,
    costMoney: 600,
    effects: { resilience: 25, courage: 20, heirloomScore: 30 },
    motto: '操利剑以辟四方，百炼为钢世不折。',
    desc: '汉魏精钢百炼绝艺，刀身坚韧无双，淬炼如铁心性，将门豪族底蕴大增。'
  },
  {
    id: 'craft_han_lacquerware',
    name: '汉代夹纻 · 丹漆彩绘云气漆器',
    category: '丹漆雕髹',
    icon: '🏺',
    spec: '苎麻裹胎多道生漆髹饰 · 错金银黑红彩绘云龙凤鸟',
    costAp: 1,
    costMoney: 800,
    effects: { sanbaoShen: 8, sanbaoJing: 6, apMaxBonus: 1, san: 15 },
    motto: '雕题镂槛，错彩镂金，水火不侵传万代。',
    desc: '两汉世家至尊漆艺，温润如玉经久耐磨，元神清明，精力上限永久提升。'
  },
  {
    id: 'craft_han_embroidery',
    name: '汉绣信期 · 蟠龙飞凤锁绣绝艺',
    category: '丝帛丹青',
    icon: '🪡',
    spec: '极细锁绣劈丝连环 · 飞凤蟠龙云气连绵五彩华光',
    costAp: 1,
    costMoney: 700,
    effects: { iq: 20, eq: 20, rep: 12 },
    motto: '信期应节，长寿万年，万缕灵丝化景星。',
    desc: '汉代官府锁绣神技，幽微生辉，洞察世情，智谋与门第名望同升。'
  },
  {
    id: 'craft_caihou_paper',
    name: '蔡侯麻纸 · 楮皮缣帛精造秘艺',
    category: '经史文房',
    icon: '📜',
    spec: '尚方令蔡伦楮树皮破布麻头 · 舂捣挫碓薄白坚密天下莫不用',
    costAp: 1,
    costMoney: 500,
    effects: { legacyScore: 45, clanCulture: 40, rep: 18 },
    motto: '纸寿千年蔡侯制，兰台遗篇墨香存。',
    desc: '东汉元兴年间造纸伟业，纸质细润坚韧，深厚涵养宗族经史文脉。'
  },
  {
    id: 'craft_boshan_gilt_bronze',
    name: '汉式博山 · 错金银青铜熏炉范铸',
    category: '宫廷巨匠',
    icon: '⛰️',
    spec: '分铸雕镂错金银丝 · 海上仙山云气缭绕百兽出没',
    costAp: 1,
    costMoney: 1000,
    effects: { clanBizBonus: 50, rep: 35, resilience: 15 },
    motto: '仙山盘郁，错金含彩，祥烟腾霄百代宁。',
    desc: '两汉吉金极品，瑞霭生辉富丽堂皇，厚植门阀资产基业，名动士林。'
  },
  {
    id: 'craft_han_pine_ink',
    name: '汉代松烟 · 杵臼捣捣松烟墨丸',
    category: '经史文房',
    icon: '🖤',
    spec: '古松清烟和鹿胶麝香 · 铁臼万杵捣压成丸坚黑如玉',
    costAp: 1,
    costMoney: 850,
    effects: { legacyScore: 50, clanCulture: 45, rep: 20 },
    motto: '研石压磨，落纸如漆，千秋青史墨迹新。',
    desc: '汉魏世家文房之祖，墨丸配石砚研石压研，墨色黝黑沉稳，文宗家风蔚然。'
  },
  {
    id: 'craft_han_brick_rubbing',
    name: '画像砖石 · 汉画朴茂椎拓神技',
    category: '文脉传薪',
    icon: '🪨',
    spec: '汉画像石画像砖生纸椎拓 · 朴茂雄健千姿百态神灵车马',
    costAp: 1,
    costMoney: 950,
    effects: { iq: 25, legacyScore: 55, clanCulture: 50 },
    motto: '勒石镂金记丰功，汉画拓本永垂光。',
    desc: '两汉艺术大成之活化石，刀法雄浑拙朴，启迪子孙智谋与崇高声誉。'
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
    desc: '商王宗室镇国大鼎拓本，雄浑庄穆气吞山河，全族抗逆心性大振，永葆鼎祚昌隆。'
  },
  {
    id: 'epigraphy_maogongding',
    name: '毛公鼎近五百字金文朱砂拓',
    dynasty: '西周宣王晚期',
    icon: '鼎',
    spec: '洋洋洒洒四百九十九字钟鼎铭文 · 华夏金文篇幅之冠',
    costAp: 1,
    costMoney: 950,
    effects: { iq: 20, clanCulture: 45, rep: 20 },
    inscription: '聿追先王，配命在天。天子引锡，用作宝鼎。',
    desc: '三代文章冠冕，书法朴茂严谨波磔飞动，研习大启智谋心智，深固诗书传家门风。'
  },
  {
    id: 'epigraphy_dayuding',
    name: '大盂鼎宗周纪事金石拓',
    dynasty: '西周康王重器',
    icon: '鼎',
    spec: '二百九十一字册命周初风云 · 纪事深沉书法质朴雄浑',
    costAp: 1,
    costMoney: 900,
    effects: { clanBizBonus: 40, clanCulture: 35, rep: 20 },
    inscription: '正德厚生，敬德保民，子子孙孙永宝用之。',
    desc: '宗周礼乐治国铭证，大篆端严古朴，极大稳固宗门基业实业，四海士人景仰。'
  },
  {
    id: 'epigraphy_taishan_stone',
    name: '泰山秦刻石琅琊台碑拓本',
    dynasty: '始皇封禅小篆之祖',
    icon: '🪨',
    spec: '丞相李斯铁线玉箸篆 · 书同文开天辟地千古正统',
    costAp: 1,
    costMoney: 750,
    effects: { iq: 25, eq: 15, rep: 15 },
    inscription: '皇帝临位，作制明法，臣下修饬。',
    desc: '大秦一统文字之极轨，风骨峻拔严整，临抚体悟天道规矩，智谋格局脱胎换骨。'
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
    id: 'porcelain_yue_proto_celadon',
    name: '东汉越窑 · 原始青瓷双系弦纹罐',
    kiln: '越窑 · 青瓷鼻祖',
    icon: '🥣',
    spec: '高岭土胎草木灰釉 · 胎质坚致釉色青绿莹润古雅',
    costAp: 1,
    costMoney: 1000,
    effects: { resilience: 25, eq: 25, sanbaoShen: 6, rep: 20 },
    appreciation: '青瓷鼻祖，胎釉相融，澄澈如玉，越州古韵。',
    desc: '两汉青瓷发轫之源，古拙沉雄，抚之微温，极具古雅素洁之汉魏大雅神韵。'
  },
  {
    id: 'porcelain_han_boshan_censer',
    name: '汉代陶冶 · 错金彩绘陶博山香炉',
    kiln: '汉陶 · 瑞云神兽',
    icon: '⛰️',
    spec: '通体朱砂白垩敷色 · 重峦叠嶂透雕错金瑞气蒸腾',
    costAp: 1,
    costMoney: 1200,
    effects: { rep: 35, legacyScore: 50, sanbaoShen: 6 },
    appreciation: '博山郁蒸，神仙所居，仙雾飘渺，吉金同辉。',
    desc: '汉代礼器名品，瑞气凌霄，门风文脉端肃，宗室传承积分与名望齐升。'
  },
  {
    id: 'porcelain_han_green_glazed_tower',
    name: '汉代釉陶 · 翠绿釉重楼水榭明器',
    kiln: '汉釉 · 庄园楼橹',
    icon: '🏛️',
    spec: '低温铅绿釉碧色如水 · 望楼连廊水榭飞檐坞堡规制',
    costAp: 1,
    costMoney: 1100,
    effects: { resilience: 30, heirloomScore: 30, sanbaoJing: 6 },
    appreciation: '重楼高耸，水榭回环，坞壁坚固，金城汤池。',
    desc: '展现汉魏世家坞壁庄园建筑大观，传家宝估值跃升，家业基盘固若金汤。'
  },
  {
    id: 'porcelain_yue_four_lug_lei',
    name: '东汉越瓷 · 青瓷四系波折印纹罍',
    kiln: '越州 · 莹澈玉润',
    icon: '🏺',
    spec: '瓷土细腻釉色淡青 · 划刻波折水波纹四系严整端庄',
    costAp: 1,
    costMoney: 1150,
    effects: { iq: 30, apMaxBonus: 1, sanbaoQi: 6 },
    appreciation: '水波纹动，四系拱卫，玉质金相，汉韵天成。',
    desc: '东汉成熟青瓷之典范，格物求真洞明世象，精力上限永久提升。'
  },
  {
    id: 'porcelain_han_acrobatic_figurine',
    name: '汉代彩绘 · 陶乐舞百戏俳优俑',
    kiln: '汉俑 · 妙舞清姿',
    icon: '🎭',
    spec: '泥质灰陶捏塑入微 · 广袖翻飞诙谐自如生动传神',
    costAp: 1,
    costMoney: 950,
    effects: { eq: 30, clanLuck: 45, sanbaoShen: 6 },
    appreciation: '翩翩起舞，长袖善舞，市井百戏，欢笑四海。',
    desc: '两汉人间烟火之缩影，心境开阔情商圆融，全族祥和欢洽、福泽盈门。'
  },
  {
    id: 'porcelain_han_granary_jar',
    name: '东汉堆塑 · 谷仓楼阁万石堆塑罐',
    kiln: '魂瓶 · 仓廪万石',
    icon: '🪴',
    spec: '四层五门楼阁堆塑 · 飞禽走兽百戏杂陈祈谷百代',
    costAp: 1,
    costMoney: 1300,
    effects: { clanLuck: 50, clanBizBonus: 60, rep: 10 },
    appreciation: '仓廪充盈，六畜兴旺，楼台层叠，子孙永昌。',
    desc: '汉末三国江东世家大宗礼器，全族庄园资财福泽大兴，五谷丰登。'
  },
  {
    id: 'porcelain_wei_jin_ram_water_dropper',
    name: '魏晋越瓷 · 辟邪卧羊形青瓷水滴',
    kiln: '青瓷 · 辟邪纳吉',
    icon: '🐏',
    spec: '仰首卧羊通体青釉 · 羊背圆孔下通腹腔温润可人',
    costAp: 1,
    costMoney: 1250,
    effects: { resilience: 25, eq: 25, heirloomScore: 35 },
    appreciation: '辟邪纳吉，卧羊安泰，案头清供，魏晋风骨。',
    desc: '汉魏文士案头滴水雅玩，质朴灵动，传家宝估值提升，涵养玄远从容之风。'
  }
];

const MASTER_TEA_WAY_DATABASE = [
  {
    id: 'tea_mengding_ganlu',
    name: '巴蜀蒙顶 · 甘露石峰七株灵仙茗',
    category: '仙茗 · 蒙山圣芽',
    icon: '🍃',
    spec: '西汉吴理真手植灵茗 · 细嫩紧卷白毫隐翠甘露甘冽',
    costAp: 1,
    costMoney: 900,
    effects: { resilience: 25, sanbaoShen: 6, rep: 20, eq: 20 },
    motto: '扬子江中水，蒙山顶上茶。',
    desc: '西汉茶祖仙茶，两汉茶道发轫，涤尽心头尘俗孤闷，神思朗澈清宁。'
  },
  {
    id: 'tea_wuyang_tongyue',
    name: '西汉武阳 · 王褒僮约买茶青峰茗',
    category: '两汉茶市 · 蜀中名市',
    icon: '🫖',
    spec: '《僮约》武阳买茶西汉名种 · 细叶含香煎饮清爽',
    costAp: 1,
    costMoney: 1000,
    effects: { rep: 30, legacyScore: 45, sanbaoQi: 6 },
    motto: '烹荼尽具，武阳买荼，两汉茗风千年传。',
    desc: '两汉商贸茶道文献明证，开阔灵思眼界，宗师传承与大局名望更上层楼。'
  },
  {
    id: 'tea_han_ginger_cooked',
    name: '汉魏古法 · 姜葱盐熟煮膏茗',
    category: '汉魏古饮 · 调元补气',
    icon: '🍵',
    spec: '捣茶叶入铛煮沸 · 掺以生姜葱白薄荷益气醒神',
    costAp: 1,
    costMoney: 850,
    effects: { eq: 25, heirloomScore: 30, sanbaoJing: 8 },
    motto: '调和五味，温中散寒，胸怀浩气心神安。',
    desc: '汉魏传统熬煮膏茗之古法，除烦醒酒，通利血脉，身心精力充沛。'
  },
  {
    id: 'tea_jingba_tea_cake',
    name: '荆巴古树 · 捣叶作饼炙饮煎茗',
    category: '广雅名饮 · 采叶作饼',
    icon: '🍂',
    spec: '魏张揖《广雅》所载 · 采叶作饼炙微焦捣碎葱姜煎煮',
    costAp: 1,
    costMoney: 1200,
    effects: { lifespanCeilingBonus: 1, apMaxBonus: 1, sanbaoQi: 6, health: 15 },
    motto: '荆巴采叶作饼，炙令色焦捣末煎之。',
    desc: '魏晋正统茶饼饮法，活血通络，延年益寿，精力上限与天年寿元双双突破！'
  },
  {
    id: 'tea_yangxian_purple_bamboo',
    name: '江南阳羡 · 汉末罨焙紫笋山岩茗',
    category: '紫笋古茶 · 义兴山岩',
    icon: '🌱',
    spec: '阳崖阴林紫芽为上 · 汉末义兴国山古岩茶甘醇',
    costAp: 1,
    costMoney: 1050,
    effects: { iq: 30, clanLuck: 50, sanbaoShen: 6 },
    motto: '紫笋凌霜发，阳崖抱玉泉。',
    desc: '两汉江南名山幽兰之香，品罢行云流水两腋习习清风，家族福泽大增。'
  },
  {
    id: 'tea_lushan_cloud_mist',
    name: '庐山云雾 · 汉末天柱峰方士灵山茶',
    category: '隐逸道茗 · 名岳云深',
    icon: '🌱',
    spec: '庐山危峰云雾滋养 · 汉末羽客方士修道手植青叶',
    costAp: 1,
    costMoney: 950,
    effects: { resilience: 25, eq: 22, sanbaoShen: 6 },
    motto: '绝顶云霞生瑞草，名山方士弄松烟。',
    desc: '云雾生灵叶，轻啜齿颊留香，神魂澄澈，心性与隐逸清谈气度大增。'
  },
  {
    id: 'tea_wuling_taoyuan',
    name: '武陵桃源 · 渫江石门古仙客茗',
    category: '幽涧野茗 · 武陵仙源',
    icon: '🍃',
    spec: '武陵桃花源幽深石门 · 悬崖野茶采撷煎烹芳洌绝俗',
    costAp: 1,
    costMoney: 1100,
    effects: { rep: 30, legacyScore: 45, sanbaoQi: 8 },
    motto: '武陵春色好，渫水茗香深。',
    desc: '汉魏隐逸之士幽涧手采，清冽幽远，涵养浩然正气，文脉底蕴升华。'
  }
];

const MASTER_BROCADE_HERITAGE_DATABASE = [
  {
    id: 'brocade_wuxing_shujin',
    name: '成都蜀锦 · 汉隶五星出东方利中国神锦',
    category: '两千载名锦 · 汉官重器',
    icon: '🌟',
    spec: '大花楼木织机五重彩纬提花 · 汉隶云气神兽凤凰瑞虎锦中冠冕',
    costAp: 1,
    costMoney: 1600,
    effects: { resilience: 35, legacyScore: 60, sanbaoJing: 8 },
    motto: '五星出东方利中国，锦水含章昭示千古宏运。',
    desc: '丝绸之路第一圣锦，吉金金石与织锦同寿，浩然正气护佑，抗逆心性大成。'
  },
  {
    id: 'brocade_han_changle_mingguang',
    name: '汉代官锦 · 长乐明光茱萸纹提花锦',
    category: '长乐未央 · 宫廷大机',
    icon: '👘',
    spec: '茱萸四神双面显花 · 红蓝黄黑白五行正色绚烂夺目',
    costAp: 1,
    costMoney: 1350,
    effects: { eq: 30, heirloomScore: 35, sanbaoQi: 8 },
    motto: '长乐明光，延年益寿，子孙昌炽安且吉。',
    desc: '色泽庄重平实，深藏华夏门阀格调，传家宝估值大幅跃升，情商与文脉大涨。'
  },
  {
    id: 'brocade_linzi_qi_wan',
    name: '临淄齐纨 · 冰纨轻素蝉翼练',
    category: '齐国织造 · 天下第一轻纱',
    icon: '🪡',
    spec: '齐都临淄三千织室精造 · 薄如蝉翼白若凝霜凉爽透气',
    costAp: 1,
    costMoney: 1100,
    effects: { rep: 30, resilience: 25, sanbaoShen: 8 },
    motto: '齐纨鲁缟冠天下，冰清玉润胜霜雪。',
    desc: '两汉天下第一名练，轻柔素雅，清凉避暑，彰显士族温润雅正之风。'
  },
  {
    id: 'brocade_lu_guo_gao',
    name: '鲁国鲁缟 · 纯白轻密御寒缟',
    category: '鲁邦精工 · 衣被苍生',
    icon: '🧵',
    spec: '鲁地传统精纺细经密纬 · 平纹纯白紧致耐用天下重之',
    costAp: 1,
    costMoney: 950,
    effects: { clean: 15, rep: 25, sanbaoQi: 8 },
    motto: '衣冠端肃，鲁缟纯良，敦厚传家守清节。',
    desc: '儒家故郡天下闻名之缟素，纯白不污，砥砺清正家风，门风声望大增。'
  },
  {
    id: 'brocade_han_ruishou_cloud',
    name: '汉代丝锦 · 登高明远重光瑞兽云气锦',
    category: '丝路天章 · 瑞气祥云',
    icon: '🦚',
    spec: '汉代重光云气动物纹双面锦 · 祥龙飞鸟奔鹿云中出没',
    costAp: 1,
    costMoney: 1400,
    effects: { iq: 35, apMaxBonus: 1, sanbaoShen: 8 },
    motto: '登高明远，大吉无极，千秋万岁乐未央。',
    desc: '织造艺术顶峰，瑞兽穿行于浩瀚云海，启迪智谋超迈前人，精力上限永久提升。'
  },
  {
    id: 'brocade_wanshou_wujiang',
    name: '汉代四神 · “万寿无疆”四神辟邪提花锦',
    category: '青龙白虎 · 四神镇宅',
    icon: '🐉',
    spec: '青龙白虎朱雀玄武四象提花 · 辟兵莫当消灾降福神锦',
    costAp: 1,
    costMoney: 1500,
    effects: { clanLuck: 60, health: 20, sanbaoQi: 8 },
    motto: '四神安镇，万寿无疆，门祚永固百代宁。',
    desc: '汉代天人和一哲学之物化瑰宝，四神镇护宗族，祥瑞鸿运大增，气血旺盛。'
  },
  {
    id: 'brocade_guanghan_gold_thread',
    name: '广汉巴蜀 · 金银错线连璧提花绮罗',
    category: '巴蜀重织 · 绮罗锦绣',
    icon: '✨',
    spec: '广汉金银丝提花交错 · 菱形连璧花纹灿若晨星',
    costAp: 1,
    costMoney: 1250,
    effects: { clanBizBonus: 50, resilience: 30, sanbaoJing: 8 },
    motto: '连璧生辉，绮罗满堂，资财鼎盛门风昌。',
    desc: '两汉西南丝织神技，金碧交辉，全族实业资财基业大振，家族韧劲绵长。'
  }
];

const MASTER_GUQIN_HERITAGE_DATABASE = [
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
    id: 'guqin_lvqi',
    name: '绿绮 · 司马相如梁王所赐良琴',
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
    id: 'guqin_jiuxiao_huanpei',
    name: '九霄环佩 · 神州伏羲式太古第一琴',
    category: '大圣遗音 · 旷古神品',
    icon: '🎵',
    spec: '伏羲太古遗式 · 杉木斫制鹿角霜灰胎紫檀配件千段蛇腹断纹',
    costAp: 1,
    costMoney: 2200,
    effects: { rep: 50, legacyScore: 70, sanbaoShen: 10, lifespanCeilingBonus: 1 },
    motto: '高山流水万壑松，泠泠七弦九霄声。',
    desc: '华夏神琴之冠，音质温劲松透纯粹，弹抚如与圣贤对坐，大局声誉大幅跃升，天年寿元突破+1载。'
  },
  {
    id: 'guqin_youlan',
    name: '幽兰琴 · 东汉蔡琰胡笳修身名琴',
    category: '空谷幽兰 · 文姬遗音',
    icon: '🌸',
    spec: '东汉才女蔡琰修心遗琴 · 音色幽咽凄清通畅灵思奇巧',
    costAp: 1,
    costMoney: 1800,
    effects: { eq: 40, iq: 35, sanbaoShen: 8, resilience: 30 },
    motto: '幽兰空谷无人见，流水幽音寄素心。',
    desc: '传世才媛心性所寄，音如天籁拂尘，情商智谋超迈常人，心性坚毅如磐。'
  },
  {
    id: 'guqin_guangling',
    name: '广陵散琴 · 魏晋嵇康竹林绝响神琴',
    category: '风姿超迈 · 广陵绝响',
    icon: '⚡',
    spec: '嵇中散抚弄神品 · 琴身狭长断纹如古木发声如击金铁戈',
    costAp: 1,
    costMoney: 2100,
    effects: { courage: 40, resilience: 35, sanbaoQi: 10, rep: 35 },
    motto: '袁孝尼尝请学此散，吾靳固不与，广陵散于今绝矣！',
    desc: '刚柔相济，弦动有龙吟雷震之概，极大提振魄力锐气，心性如铁石坚固。'
  }
];

const MASTER_INKSTONE_HERITAGE_DATABASE = [
  {
    id: 'inkstone_han_three_legged_stone',
    name: '东汉三足 · 辟邪圆石带盖名砚',
    category: '汉砚之尊 · 世家案头',
    icon: '🪨',
    spec: '整块天然砚石雕琢 · 三足鼎立盖雕辟邪兽面储水润墨',
    costAp: 1,
    costMoney: 1800,
    effects: { rep: 45, apMaxBonus: 1, sanbaoShen: 10, resilience: 30 },
    motto: '三足鼎峙，辟邪纳吉，发墨如油，汉风穆穆。',
    desc: '两汉世家案头名砚之尊，辟邪兽盖保润墨汁，精力上限永久提升1点，抗逆心性大增。'
  },
  {
    id: 'inkstone_han_pine_soot_ball',
    name: '汉代松烟 · 墨丸附和田青玉研磨石',
    category: '研石压磨 · 墨法之祖',
    icon: '✨',
    spec: '配带双鸠玉研子 · 压磨墨丸细腻发墨生光下墨如飞',
    costAp: 1,
    costMoney: 1600,
    effects: { iq: 45, legacyScore: 60, sanbaoJing: 8 },
    motto: '玉研压墨，声越金石，墨润生花，书契千古。',
    desc: '汉代特有研石研墨古法，下墨极匀，墨色乌黑发亮，极大涵养智谋与文脉传承。'
  },
  {
    id: 'inkstone_han_wadang',
    name: '秦汉陶瓦 · 长乐未央文字瓦当砚',
    category: '汉瓦文心 · 铭文传千古',
    icon: '🏛️',
    spec: '汉宫殿长乐未央瓦当改琢 · 陶质细密贮水经宿不涸',
    costAp: 1,
    costMoney: 1700,
    effects: { resilience: 45, eq: 35, sanbaoQi: 8 },
    motto: '长乐未央，延年益寿，千秋万岁，与天齐休。',
    desc: '秦汉金石陶瓦文心之祖，质地坚润，古韵盎然，抗逆心性与门庭情商大幅跃升。'
  },
  {
    id: 'inkstone_qingzhou_hongsi',
    name: '青州黑山 · 红丝石刷丝发墨古名砚',
    category: '红丝天成 · 汉魏名石',
    icon: '🧣',
    spec: '青州黑山老坑红丝石 · 黄底红丝如天然刷丝发墨润滑',
    costAp: 1,
    costMoney: 1650,
    effects: { heirloomScore: 40, eq: 40, sanbaoShen: 8 },
    motto: '红丝天产，如云如锦，温润发墨，古砚生辉。',
    desc: '汉代已有采琢之名石，红丝天成，传家宝估值大幅跃升，情商与文脉涵养极深。'
  },
  {
    id: 'inkstone_han_lacquer_box_stone',
    name: '东汉双鸠 · 漆盒彩绘石板砚',
    category: '漆石相合 · 汉墓重宝',
    icon: '🎨',
    spec: '夹纻黑红彩绘双鸠漆盒 · 内盛长方形青石质滑发墨板',
    costAp: 1,
    costMoney: 1550,
    effects: { rep: 40, clanLuck: 70, lifespanCeilingBonus: 1, sanbaoQi: 8 },
    motto: '双鸠并寿，漆石呈祥，案头清赏，福泽绵长。',
    desc: '汉魏世家文房雅玩，双鸠报喜，全族祥瑞鸿运大增，大局名望提升，天年寿元突破+1载。'
  },
  {
    id: 'inkstone_han_ancient_chenni',
    name: '汾阴古法 · 汉代澄泥焙烧陶砚',
    category: '千锤万漉 · 澄泥之祖',
    icon: '🏺',
    spec: '汾阴黄河古泥绢袋澄清 · 沉泥三年入窑烈火成玉',
    costAp: 1,
    costMoney: 1500,
    effects: { resilience: 40, rep: 35, sanbaoJing: 8 },
    motto: '泥陶胜玉，贮水不涸，发墨细腻，千年不损。',
    desc: '两汉澄泥砚发端之祖，泥化为玉，抗逆心性与大局声望齐升。'
  },
  {
    id: 'inkstone_weijin_celadon_water_dropper',
    name: '魏晋辟邪 · 青瓷三足砚与卧羊水注',
    category: '魏晋风流 · 青瓷砚韵',
    icon: '🐑',
    spec: '越州青瓷辟邪三足砚 · 附配卧羊水注釉色苍翠清穆',
    costAp: 1,
    costMoney: 1750,
    effects: { heirloomScore: 45, eq: 35, legacyScore: 50 },
    motto: '案头青碧，滴露调墨，玄谈风雅，名士所宗。',
    desc: '魏晋名士手泽雅器，青瓷莹彻，传家宝估值跃升45%，宗师传承文化深厚。'
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
