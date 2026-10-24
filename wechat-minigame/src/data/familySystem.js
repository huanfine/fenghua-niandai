// 华夏三千年世家大系 · 家族建制与宗族底蕴管理系统 (FamilySystem)
// 规范：真实姓氏 + 省份 + 堂号 + 家业底色（不可更改，严格合规，脱敏防沉迷）

let HAN_WEI_PROMINENT_CLANS = [];
try {
  const milieu = require('./historicalMilieuHanWei');
  if (milieu && Array.isArray(milieu.HAN_WEI_PROMINENT_CLANS)) {
    HAN_WEI_PROMINENT_CLANS = milieu.HAN_WEI_PROMINENT_CLANS;
  }
} catch (e) {}

// 支持的百家姓精选库（亦支持自定义合法姓氏输入）
const COMMON_SURNAMES = [
  '王', '李', '张', '刘', '陈', '杨', '黄', '赵', '吴', '周',
  '徐', '孙', '马', '朱', '胡', '郭', '何', '高', '林', '罗',
  '郑', '梁', '谢', '宋', '唐', '许', '韩', '冯', '邓', '曹',
  '彭', '曾', '肖', '田', '董', '潘', '袁', '蔡', '蒋', '余',
  '万', '钟', '任', '崔', '卢', '段', '雷', '文', '汤', '陶',
  '贺', '康', '金', '魏', '薛', '谭', '陆', '戴', '尹', '廖'
];

// 全国省级行政区映射（仅限省级，绝不下沉至市县以保障隐私安全）
const PROVINCE_LIST = [
  '北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江',
  '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南',
  '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州',
  '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '香港', '澳门', '台湾'
];

// 经典百家姓先祖渊源与得姓谱系正史考据库 (Ancient Surname Lineage Compendium)
const COMMON_SURNAME_ANCIENT_ORIGINS = {
  '刘': {
    ancientOrigin: '帝尧陶唐氏祁姓之后，裔孙刘累受封夏代御龙氏 ➔ 周宣王封大夫杜伯，其子隰叔奔晋为士氏 ➔ 晋大夫士会食邑于随与刘，后以为氏。',
    historicalAncestors: '西汉高祖刘邦定鼎中原 ➔ 汉文帝、汉景帝休养生息 ➔ 光武帝刘秀中兴汉室 ➔ 东汉河间献王刘德（立五经学士，整理古籍，实事求是）。',
    hallName: '彭城堂 / 藜照堂 / 中山堂',
    motto: '德业相劝，过失相规；礼俗相交，患难相恤。',
    historicalSource: '《史记·卷八·高祖本纪》《汉书·卷三十六·楚元王传》《新唐书·宰相世系表》',
    historicalFeature: '汉家天子宗室血脉，累世封侯，门生故吏遍及两京十三州，宗族凝聚力称冠神州。'
  },
  '王': {
    ancientOrigin: '出自姬姓，周灵王太子姬晋（字子乔）直谏被废为庶人，其子宗敬为司徒，时人谓之王家，因以为氏 ➔ 秦武成侯王翦、王贲将门之后。',
    historicalAncestors: '西汉成帝朝博士王吉（字子阳，崇经学好礼）➔ 汉末司徒王允（诛董卓定乱安汉）➔ 曹魏司空王昶 ➔ 晋太保王祥（卧冰至孝）、大司马王浑。',
    hallName: '三槐堂 / 琅琊堂 / 太原堂',
    motto: '夫君子之行，静以修身，俭以养德。非淡泊无以明志，非宁静无以致远。',
    historicalSource: '《汉书·卷七十二·王吉传》《三国志·卷二十四·王昶传》《晋书·卷三十三·王祥传》',
    historicalFeature: '天下名门之冠，出将入相，魏晋门阀中枢，王与马共天下之基石。'
  },
  '李': {
    ancientOrigin: '出自赢姓皋陶（帝舜大理官，以官命族为理氏）➔ 商末理利贞避难食木子得全，遂改李氏 ➔ 东周老子李耳著《道德经》开道家道统。',
    historicalAncestors: '战国名将李牧 ➔ 西汉飞将军李广（威震匈奴）➔ 东汉司空李固（抗击外戚梁冀，士人风骨）➔ 曹魏破贼校尉李通。',
    hallName: '陇西堂 / 赵郡堂 / 敦睦堂',
    motto: '行不苟合，言不苟容。修身谨饬，居仁由义。',
    historicalSource: '《史记·卷六十三·老子列传》《史记·卷一百九·李将军列传》《后汉书·卷六十三·李固列传》',
    historicalFeature: '将门雄风与道家玄风并峙，雄镇凉州陇右丝路关隘，深壁固垒，部曲天下莫敌。'
  },
  '张': {
    ancientOrigin: '出自上古黄帝之孙挥公，观弧星而创弓矢，主祀孤星，世袭弓正之官，因赐姓张氏 ➔ 春秋晋大夫张老、张侯传家。',
    historicalAncestors: '西汉留侯张良（运筹帷幄，决胜千里）➔ 东汉天文学家张衡（造候风地动仪与浑天仪）➔ 医圣张仲景（著《伤寒杂病论》）➔ 大儒张俭。',
    hallName: '清河堂 / 金鉴堂 / 百忍堂',
    motto: '笃学尚行，止于至善。宽以济猛，忍以成德。',
    historicalSource: '《史记·卷五十五·留侯世家》《后汉书·卷五十九·张衡列传》《后汉书·卷六十七·党锢列传》',
    historicalFeature: '才兼文武，格物致知，既有汉家帝师之奇谋，又有格物救民之百工仁术。'
  },
  '陈': {
    ancientOrigin: '出自妫姓，虞舜后裔周武王封妫满于陈（国都宛丘），建陈国，谥号陈胡公 ➔ 春秋陈完奔齐为田氏 ➔ 秦末汉初高陵侯陈婴。',
    historicalAncestors: '东汉太丘长陈寔（字仲弓，海内士宗，梁上君子折服之至德）➔ 陈纪（大鸿胪）、陈谌 ➔ 曹魏司空陈群（创九品官人法）➔ 晋名将陈泰。',
    hallName: '德星堂 / 颍川堂 / 义门堂',
    motto: '梁上化德，清白持身；遗子黄金，不如一经。',
    historicalSource: '《后汉书·卷六十二·陈寔列传》《三国志·卷二十二·陈群传》《晋书·卷三十五·陈泰传》',
    historicalFeature: '以太丘长至德闻名海内，奠定九品中正官制，曹魏西晋台阁核心中枢。'
  },
  '荀': {
    ancientOrigin: '出自姬姓，周文王之子受封于荀国 ➔ 春秋晋国大夫荀息守节尽忠 ➔ 战国大儒荀子（荀卿）著书立说，集先秦儒法经学之大成。',
    historicalAncestors: '战国荀子 ➔ 东汉荀淑（当世号‘神君’，生八龙聚秀）➔ 荀爽（司空，白衣登台）➔ 曹魏尚书令荀彧（王佐之才）、军师荀攸。',
    hallName: '德星堂 / 颍阴堂 / 无二堂',
    motto: '德星聚秀，王佐济世；秉忠贞之节，守经世之务。',
    historicalSource: '《后汉书·卷六十二·荀淑列传》《三国志·卷十·荀彧荀攸传》',
    historicalFeature: '颍川名族之首，主盟天下清议，汉魏更迭文官柱石，王佐之才代出。'
  },
  '袁': {
    ancientOrigin: '出自妫姓陈氏之后，陈胡公裔孙诸字伯爰，其孙涛涂以王父字为氏为袁氏 ➔ 秦汉之际迁于汝南汝阳。',
    historicalAncestors: '东汉司徒袁安（‘袁安卧雪’，抗击外戚窦宪）➔ 袁敞（司空）➔ 袁汤（太尉）➔ 袁逢（司空）、袁隗（太傅）➔ 袁绍、袁术。',
    hallName: '汝南堂 / 卧雪堂 / 崇德堂',
    motto: '门生故吏，布于天下；清霜傲雪，居正不阿。',
    historicalSource: '《后汉书·卷四十五·袁安列传》《三国志·卷六·袁绍传》',
    historicalFeature: '四世三公门阀巨室，汉魏门生故吏遍布海内，号召力与政治号召无与伦比。'
  },
  '杨': {
    ancientOrigin: '出自姬姓周宣王之少子尚父封于杨国 ➔ 晋国羊舌肸（叔向）之后避乱以邑为氏 ➔ 战国杨朱 ➔ 西汉昭帝丞相杨敞（封安平侯）。',
    historicalAncestors: '东汉太尉杨震（‘关西孔子’，拒金留‘四知’清白风骨）➔ 太尉杨秉 ➔ 太尉杨赐 ➔ 太尉杨彪（直斥曹操）➔ 曹魏主簿杨修。',
    hallName: '弘农堂 / 四知堂 / 清白堂',
    motto: '天知地知你知我知，何谓无知；清白传家，历世不坠。',
    historicalSource: '《后汉书·卷五十四·杨震列传》《三国志·卷十九·任城陈萧王传引续汉书》',
    historicalFeature: '四世太尉门第，以清白廉吏和经学博闻世守家门，关陇世家冠冕。'
  },
  '谢': {
    ancientOrigin: '出自姜姓炎帝申伯之后，周宣王改封申伯于谢国，后以国为氏 ➔ 春秋战国迁居陈郡阳夏。',
    historicalAncestors: '曹魏典农中郎将谢缵 ➔ 西晋国子祭酒谢衡 ➔ 东晋太保谢安（东山再起，淝水拒苻坚）、名将谢玄（北府兵统帅）。',
    hallName: '陈郡堂 / 东山堂 / 宝树堂',
    motto: '雅量高致，处变不惊；芝兰玉树，欲使其生于庭阶。',
    historicalSource: '《三国志·卷十六·任嘏传注》《晋书·卷七十九·谢安列传》',
    historicalFeature: '江左风流宰辅，雅量宏深，北府将略与林下清风并耀千秋。'
  },
  '崔': {
    ancientOrigin: '出自姜姓炎帝之后，齐太公吕尚之长子丁公及让位其弟，食采邑于崔邑，遂以崔为氏 ➔ 战国秦汉迁居清河东武城。',
    historicalAncestors: '东汉崔瑗（大书法家）、崔寔（作《四民月令》）➔ 曹魏尚书崔琰（威仪严整，高风亮节，公议第一）➔ 西晋吏部侍郎崔洪。',
    hallName: '清河堂 / 博陵堂 / 德星堂',
    motto: '重礼崇让，敦厚履正；端本清源，士林表率。',
    historicalSource: '《后汉书·卷五十二·崔骃列传》《三国志·卷十二·崔琰传》',
    historicalFeature: '北朝华胄七姓十家之冠，经学法度谨严，士风峻拔，文章典则。'
  },
  '卢': {
    ancientOrigin: '出自姜姓齐文公之后，其子高傒食采于卢邑，因以为氏 ➔ 秦末汉初卢绾 ➔ 迁居涿郡涿县（范阳）。',
    historicalAncestors: '东汉北中郎将卢植（海内大儒兼名将，刘备、公孙瓒之座师，拒董卓抗强暴）➔ 曹魏司空卢毓（典选官吏，重实干核名实）➔ 西晋卢珽。',
    hallName: '范阳堂 / 专经堂 / 崇礼堂',
    motto: '崇儒敦经，学以经世；武御疆埸，文匡社稷。',
    historicalSource: '《后汉书·卷六十四·卢植列传》《三国志·卷二十二·卢毓传》',
    historicalFeature: '范阳名宿，文武兼资，北国经学与儒宗柱石，学子门生云集。'
  },
  '曹': {
    ancientOrigin: '出自姬姓周文王之子曹叔振铎封于曹国 ➔ 汉相国曹参之后封平阳侯 ➔ 沛国谯县名宗。',
    historicalAncestors: '西汉平阳侯相国曹参（萧规曹随）➔ 东汉太尉曹嵩 ➔ 魏武帝曹操（拨乱反正，开创建安风骨）➔ 魏文帝曹丕。',
    hallName: '谯国堂 / 留余堂 / 敦叙堂',
    motto: '周公吐哺，天下归心；唯才是举，经纬四海。',
    historicalSource: '《史记·卷五十四·曹相国世家》《三国志·卷一·魏书·武帝纪》',
    historicalFeature: '将略雄风冠绝当世，尚才任勇，求贤若渴，建安风骨之领袖。'
  },
  '郑': {
    ancientOrigin: '出自姬姓周宣王之弟姬友受封于郑国（郑桓公）➔ 春秋郑庄公小霸 ➔ 汉初迁入北海高密、荥阳。',
    historicalAncestors: '西汉大司农郑当时 ➔ 东汉经学大师郑玄（字康成，注遍群经，天下郑学宗奉）➔ 曹魏安仆射郑冲。',
    hallName: '荥阳堂 / 通德堂 / 博经堂',
    motto: '通晓群经，无偏无颇；淡泊名利，实事求是。',
    historicalSource: '《后汉书·卷三十五·郑玄列传》《三国志·卷四·三少帝纪注》',
    historicalFeature: '汉代通儒冠冕，集两汉经学之大成，士子无不知高密郑公。'
  },
  '孙': {
    ancientOrigin: '出自姬姓卫康叔之后孙武子，或出自妫姓齐田书赐姓孙氏 ➔ 吴郡富春世家。',
    historicalAncestors: '春秋兵圣孙武（著《孙子兵法》）➔ 战国孙膑 ➔ 汉末破虏将军孙坚、讨逆将军孙策 ➔ 吴大帝孙权。',
    hallName: '富春堂 / 乐安堂 / 兵家堂',
    motto: '知己知彼，百战不殆；保民安境，拓业江南。',
    historicalSource: '《史记·卷六十五·孙子吴起列传》《三国志·卷四十六·孙破虏讨逆传》',
    historicalFeature: '江东霸业奠基之主，勇烈开疆，兵法家风世守，拓土东南。'
  },
  '周': {
    ancientOrigin: '出自姬姓，周武王克商后，周公旦分封同姓，后代以国号为氏 ➔ 战国秦汉迁居汝南、庐江。',
    historicalAncestors: '西汉太尉绛侯周勃、周亚夫（细柳营军纪严整，平定七国之乱）➔ 东汉司空周荣 ➔ 汉末庐江名将周瑜（总督江东水军，火烧赤壁）。',
    hallName: '汝南堂 / 爱莲堂 / 细柳堂',
    motto: '严谨治军，持法不阿；雅量风流，立功塞外。',
    historicalSource: '《史记·卷五十七·降侯周勃世家》《三国志·卷五十四·周瑜传》',
    historicalFeature: '将门肃穆，文武并隆，既有细柳营军威之烈，又有火烧赤壁江左之风流。'
  },
  '赵': {
    ancientOrigin: '出自赢姓造父，善御马助周穆王平徐偃王，赐封赵城，因以为氏 ➔ 战国七雄赵国宗族 ➔ 迁入天水、涿郡。',
    historicalAncestors: '西汉营平侯赵充国（屯田戍边，沉勇良将）➔ 东汉名将赵熹（太傅，为人严整忠贞）➔ 蜀汉顺平侯赵云（常山真定人，单骑救主）。',
    hallName: '天水堂 / 半部堂 / 琴鹤堂',
    motto: '沉勇笃定，屯田自足；一身是胆，忠义不渝。',
    historicalSource: '《汉书·卷六十九·赵充国传》《后汉书·卷二十六·赵熹列传》《三国志·卷三十六·赵云传》',
    historicalFeature: '戍边良将忠勇传家，屯田抚民，忠贞义烈贯穿两汉魏晋。'
  },
  '黄': {
    ancientOrigin: '出自赢姓伯益之后，虞夏之际封于黄国（今河南潢川），后以国为氏 ➔ 迁居江夏安陆。',
    historicalAncestors: '西汉丞相黄霸（治民良吏第一）➔ 东汉太尉黄琼（名世清流）➔ 汉末大儒黄琬（抗董卓殉汉节）➔ 蜀汉五虎将黄忠。',
    hallName: '江夏堂 / 宽和堂 / 双井堂',
    motto: '为官廉正，宽严相济；居仁履德，忠节凛然。',
    historicalSource: '《汉书·卷八十九·循吏传·黄霸》《后汉书·卷六十一·黄琼黄琬列传》',
    historicalFeature: '江夏名门清望，良吏抚民名扬海内，秉性清严刚劲。'
  },
  '朱': {
    ancientOrigin: '出自邾国曹姓，周武王封曹挟于邾，后为楚所灭，子孙去邑为朱氏 ➔ 西汉迁居沛国相县、吴郡。',
    historicalAncestors: '西汉大司农朱买臣 ➔ 东汉右车骑将军朱儁（与卢植皇甫嵩齐名平定黄巾）➔ 汉末吴郡世家朱治、朱然。',
    hallName: '沛国堂 / 敦睦堂 / 紫阳堂',
    motto: '自强不息，耕读励志；安危托付，受任于败军。',
    historicalSource: '《汉书·卷六十四·朱买臣传》《后汉书·卷七十一·朱儁列传》《三国志·卷五十六·朱治朱然传》',
    historicalFeature: '勇略刚毅，战功卓著，吴郡四大望族柱石。'
  }
};

/**
 * 依据姓氏与指定家族标识，生成结构化先祖源流与正史考据档案
 * @param {string} surname 姓氏 (单字或复字)
 * @param {string} clanKey 汉魏名门标识 (可选，如 yingchuan_chen, yingchuan_xun 等)
 * @param {string} province 省份 (可选)
 * @param {string} hallName 堂号 (可选)
 */
function getClanLineageDocket(surname = '王', clanKey = null, province = '河南', hallName = '') {
  // 1. 优先从汉魏名门库匹配 (Prominent Han-Wei Clans)
  if (clanKey && Array.isArray(HAN_WEI_PROMINENT_CLANS)) {
    const prominent = HAN_WEI_PROMINENT_CLANS.find(c => c.clanKey === clanKey);
    if (prominent) {
      return {
        isProminentClan: true,
        clanKey: prominent.clanKey,
        clanName: prominent.clanName,
        region: prominent.region,
        hallName: hallName || prominent.hallName,
        ancientOrigin: prominent.ancientOrigin || `周秦三代圣贤之后，迁居${prominent.region}，累世显贵。`,
        historicalAncestors: prominent.ancestors,
        motto: prominent.motto,
        historicalSource: prominent.historicalSource,
        historicalFeature: prominent.historicalFeature
      };
    }
  }

  // 若未指定 clanKey，但姓氏命中名门库中的唯一氏族
  if (Array.isArray(HAN_WEI_PROMINENT_CLANS)) {
    const matchedClan = HAN_WEI_PROMINENT_CLANS.find(c => {
      const matchName = c.clanName.includes(surname);
      const matchReg = province ? c.region.includes(province) : true;
      return matchName && matchReg;
    });
    if (matchedClan) {
      return {
        isProminentClan: true,
        clanKey: matchedClan.clanKey,
        clanName: matchedClan.clanName,
        region: matchedClan.region,
        hallName: hallName || matchedClan.hallName,
        ancientOrigin: matchedClan.ancientOrigin || `周秦三代圣贤之后，立基中原，传世数百载。`,
        historicalAncestors: matchedClan.ancestors,
        motto: matchedClan.motto,
        historicalSource: matchedClan.historicalSource,
        historicalFeature: matchedClan.historicalFeature
      };
    }
  }

  // 2. 从百家姓先祖渊源考据库匹配
  const cleanSur = (surname || '王').slice(0, 2);
  const foundOrigin = COMMON_SURNAME_ANCIENT_ORIGINS[cleanSur];
  if (foundOrigin) {
    return {
      isProminentClan: false,
      clanKey: `custom_${cleanSur}`,
      clanName: `${province}·${cleanSur}氏`,
      region: `${province}`,
      hallName: hallName || foundOrigin.hallName.split('/')[0].trim(),
      ancientOrigin: foundOrigin.ancientOrigin,
      historicalAncestors: foundOrigin.historicalAncestors,
      motto: foundOrigin.motto,
      historicalSource: foundOrigin.historicalSource,
      historicalFeature: foundOrigin.historicalFeature
    };
  }

  // 3. 通用古雅正史档案生成 (兜底，保证任何生僻姓氏均有典雅介绍)
  return {
    isProminentClan: false,
    clanKey: `custom_${cleanSur}`,
    clanName: `${province}·${cleanSur}氏`,
    region: `${province}`,
    hallName: hallName || `${cleanSur}氏堂`,
    ancientOrigin: `出自上古圣王后裔，历春秋战国分封各方，因邑为氏，秦汉之际繁衍于${province}。`,
    historicalAncestors: `两汉名贤之后 ➔ 勤耕苦读开基立业 ➔ 今朝受命立族，传祧百代。`,
    motto: '行不苟合，言不苟容；积善传家，以义统利。',
    historicalSource: '《通志·卷二十五·氏族略》《古今姓氏书辩证》《元和姓纂》',
    historicalFeature: '耕读立世，家风纯谨，虽逢乱世风云，亦能力筑坚堡庇护族人。'
  };
}

// 经典传世郡望堂号推荐表（亦支持合法自定义堂号）
const FAMOUS_HALL_MAPPING = {
  '王': ['三槐堂', '琅琊堂', '太原堂'],
  '李': ['陇西堂', '赵郡堂', '青莲堂'],
  '张': ['清河堂', '百忍堂', '金鉴堂'],
  '刘': ['彭城堂', '中山堂', '藜照堂'],
  '陈': ['颍川堂', '义门堂', '德星堂'],
  '周': ['爱莲堂', '汝南堂', '敦睦堂'],
  '蒋': ['乐安堂', '三径堂', '钟山堂'],
  '罗': ['豫章堂', '尊尧堂', '琳琅堂'],
  '邓': ['南阳堂', '宜和堂', '平寿堂'],
  '林': ['西河堂', '九龙堂', '问礼堂'],
  '黄': ['江夏堂', '双井堂', '紫云堂'],
  '万': ['扶风堂', '九思堂', '崇敬堂'],
  '钟': ['颍川堂', '知音堂', '舞鹤堂'],
  '任': ['乐安堂', '九思堂', '玉局堂']
};

// 严禁恶意冒用名门与现代敏感人物黑名单（合规防线）
const SENSITIVE_FAMILY_KEYWORDS = [
  '爱新觉罗', '蒋介石', '毛泽东', '周恩来', '邓小平', '皇帝', '皇室', '天子', '国家', '中央'
];

// 四大家业底色（数值天平平衡，绝不与姓氏或地域绑定）
const VOCATION_ORIGIN_PROFILES = {
  'study_scholar': {
    id: 'study_scholar',
    name: '耕读传家 · 诗书润骨',
    icon: '📖',
    desc: '崇文重道，弦歌不绝。后世子弟悟性超群，科场登第与学术研发几率大幅提升。',
    statBonus: { iq: 15, eq: 5, cultureBonus: 0.25, startingMoney: 3000 },
    initialMotto: '遗子黄金满籯，不如一经。诗礼传家，百代不迁。'
  },
  'trade_craft': {
    id: 'trade_craft',
    name: '通商惠工 · 经纶世济',
    icon: '🪙',
    desc: '行商坐贾，富而好礼。对大航海、实业办厂及近现代资本风潮有极敏锐洞察。',
    statBonus: { courage: 15, eq: 10, tradeSuccessBonus: 0.2, startingMoney: 8000 },
    initialMotto: '诚笃待人，货真价实。以义统利，虽远必达。'
  },
  'medical_herb': {
    id: 'medical_herb',
    name: '悬壶济世 · 杏林春暖',
    icon: '🌿',
    desc: '博采众方，仁心活人。历代大疫与天灾抵抗力翻倍，族人寿命天花板显著上扬。',
    statBonus: { sanbaoShen: 12, healthCapBonus: 10, epidemicResist: 0.4, startingMoney: 4000 },
    initialMotto: '大医精诚，不求名利。逢凶施药，全活黎民。'
  },
  'iron_craft': {
    id: 'iron_craft',
    name: '百工机巧 · 经纬乾坤',
    icon: '⚒️',
    desc: '规矩尺度，格物致知。在水利营建、机械智造、硬核科技领域具备工匠祖传禀赋。',
    statBonus: { resilience: 18, techInventionBonus: 0.3, startingMoney: 5000 },
    initialMotto: '千锤百炼，工贵其精。器利善事，格物穷理。'
  }
};

/**
 * 校验并创建家族核心档案 (不可篡改)
 */
function createFamilyProfile(paramsOrSurname, maybeProvince, maybeHall, maybeVocation, maybeMotto, maybeOpenid) {
  let surname, province, hallName, vocationId, customMotto, openid;
  if (paramsOrSurname && typeof paramsOrSurname === 'object') {
    ({ surname, province, hallName, vocationId, customMotto, openid } = paramsOrSurname);
  } else {
    surname = paramsOrSurname;
    province = maybeProvince;
    hallName = maybeHall;
    vocationId = maybeVocation;
    customMotto = maybeMotto;
    openid = maybeOpenid;
  }

  // 1. 基础字段非空与字符合法性校验（支持单姓、复姓及自定义合法姓氏）
  if (!surname || typeof surname !== 'string' || surname.trim().length === 0) {
    throw new Error('家族姓氏不能为空');
  }
  const rawSurname = surname.trim();
  if (!/^[\u4e00-\u9fa5]{1,2}$/.test(rawSurname)) {
    throw new Error('家族姓氏须为1至2位合规中文字符');
  }

  // 2. 省份校验
  if (!province || !PROVINCE_LIST.includes(province)) {
    throw new Error('必须选择合规的祖籍省份');
  }

  // 3. 堂号与敏感词校验（按整词精确拦截，严禁子串误伤常见姓氏）
  const hallStr = Array.isArray(hallName) ? (hallName[0] || `${rawSurname}氏堂`) : hallName;
  const rawHall = (hallStr && typeof hallStr === 'string' && hallStr.trim()) ? hallStr.trim() : `${rawSurname}氏堂`;
  const combined = `${rawSurname}${rawHall}`;
  for (const kw of SENSITIVE_FAMILY_KEYWORDS) {
    if (combined.includes(kw) || rawSurname === kw || rawHall === kw || rawHall.includes(kw)) {
      throw new Error('家名或堂号包含受限敏感词汇，请重新命名');
    }
  }

  const cleanSurname = rawSurname.slice(0, 2); // 规范为单姓或复姓
  const cleanHall = rawHall.slice(0, 8);

  // 4. 家业底色校验
  const vocation = VOCATION_ORIGIN_PROFILES[vocationId] || VOCATION_ORIGIN_PROFILES['study_scholar'];

  const familyProfile = {
    familyId: openid ? `fam_${openid.slice(-8)}_${cleanSurname}_${Date.now().toString(36)}` : `fam_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    openid: openid || null,
    surname: cleanSurname,
    province: province,
    hallName: cleanHall,
    fullName: `${province}·${cleanSurname}氏·${cleanHall}`,
    vocationId: vocation.id,
    vocationName: vocation.name,
    createdAt: Date.now(),
    isImmutable: true, // 核心标记：不可更改

    // 先祖源流与正史考据卷轴 (随宗族世代永存，随时可查)
    lineageDocket: getClanLineageDocket(cleanSurname, null, province, cleanHall),

    currentSeasonId: 'season_1_han_wei',
    // 时代推进进度 (默认始于公元100年汉末)
    timeline: {
      currentEpochIndex: 1,
      currentYear: 100,
      isWaitingFrontier: false,
      completedEpochs: {}
    },

    // 宗族公共底蕴池 (跨越三千年永久继承)
    clanTrust: {
      trustFundMoney: vocation.statBonus.startingMoney || 5000,
      prestigeScore: 50,
      ancestralTempleTier: 1, // 1级草庐宗茔 -> 9级名刹大观
      accumulatedMerit: 0,
      mottoList: [
        {
          era: '汉末立族',
          text: customMotto && customMotto.trim() ? customMotto.trim().slice(0, 30) : vocation.initialMotto,
          effectDesc: '初代始祖立世誓诫，万代尊奉'
        }
      ],
      relics: [] // 传世重宝信物
    },

    // 族谱世系长卷 (不可篡改的墨印档案)
    genealogyList: [],

    // 宗族五柱功德册 (Five Clan Pillars: 多房多脉长线协同机制)
    clanPillars: {
      official: { maxRank: 0, maxTitle: '白衣门生', totalRuns: 0, perkDesc: '门阀政治庇护与官阶起步加成' },
      scholar: { maxRank: 0, maxTitle: '太学诸生', totalRuns: 0, perkDesc: '经学太学启蒙与悟性书香加成' },
      merchant: { maxRank: 0, maxTitle: '货殖商客', totalRuns: 0, perkDesc: '水碓庄园兴造与资财分红加成' },
      military: { maxRank: 0, maxTitle: '部曲武卒', totalRuns: 0, perkDesc: '坞壁防备坚固与部曲募兵加成' },
      recluse: { maxRank: 0, maxTitle: '名岳处士', totalRuns: 0, perkDesc: '大医避疫方术与延年天元加成' }
    },

    // 社交同盟网络
    alliances: []
  };

  return familyProfile;
}

/**
 * 载入一位先祖功业至族谱长卷 (幂等防刷写入)
 */
function recordAncestorToGenealogy(family, ancestorRecord) {
  if (!family || !family.genealogyList) return false;

  const isGenerational = !!ancestorRecord.isGenerationalRun;
  // 第一赛季恒定锁定 eraIndex = 1 (汉魏风骨)，严禁按 genealogyList.length 递增纪元！
  const targetEra = ancestorRecord.eraIndex || 1;
  const playOrder = family.genealogyList.length + 1;

  const existingIdx = ancestorRecord.recordId
    ? family.genealogyList.findIndex(a => a.recordId === ancestorRecord.recordId)
    : -1;

  if (existingIdx >= 0) {
    const existing = family.genealogyList[existingIdx];
    if (ancestorRecord.fullName) existing.fullName = ancestorRecord.fullName;
    else if (ancestorRecord.givenName) existing.fullName = `${family.surname}${ancestorRecord.givenName}`;
    if (ancestorRecord.ziHao) existing.ziHao = ancestorRecord.ziHao;
    if (ancestorRecord.officialTitle) existing.officialTitle = ancestorRecord.officialTitle;
    if (ancestorRecord.epitaph) existing.epitaph = ancestorRecord.epitaph;
    if (ancestorRecord.finalDeeds && ancestorRecord.finalDeeds.length > 0) existing.finalDeeds = ancestorRecord.finalDeeds;
    if (ancestorRecord.successorOrigin) existing.successorOrigin = ancestorRecord.successorOrigin;
    if (ancestorRecord.successorRole) existing.successorRole = ancestorRecord.successorRole;
    if (ancestorRecord.branchName) existing.branchName = ancestorRecord.branchName;
    return existing;
  }

  const entry = {
    recordId: ancestorRecord.recordId || `rec_${Date.now()}_${Math.floor(Math.random() * 10000)}`,
    isGenerationalRun: true,
    playOrder: playOrder, // 宗祠入祀总序（第 1 ~ N 位先贤）
    generation: ancestorRecord.generation || ancestorRecord.lineageGeneration || 1, // 宗法字辈（第 1 ~ 8 世）
    branchName: ancestorRecord.branchName || '长房嫡脉',
    eraIndex: targetEra,
    eraName: ancestorRecord.eraName || '汉魏风骨',
    successorOrigin: ancestorRecord.successorOrigin || 'lineage_heir',
    successorRole: ancestorRecord.successorRole || '宗门嫡长',
    fullName: ancestorRecord.fullName || `${family.surname}${ancestorRecord.givenName || '先贤'}`,
    ziHao: ancestorRecord.ziHao || '德远',
    lifespan: ancestorRecord.lifespan || [100, 165],
    officialTitle: ancestorRecord.officialTitle || '布衣名士',
    posthumousTitle: ancestorRecord.posthumousTitle || '仁靖公',
    epitaph: ancestorRecord.epitaph || '躬耕保族，虽经兵燹，文脉未坠。',
    finalDeeds: ancestorRecord.finalDeeds || [],
    passedRelic: ancestorRecord.passedRelic || null,
    bequeathedMoney: ancestorRecord.bequeathedMoney || 0,
    prestigeGain: ancestorRecord.prestigeGain || 30,
    recordedTimestamp: Date.now()
  };

  family.genealogyList.push(entry);

  if (ancestorRecord.bequeathedMoney) {
    family.clanTrust.trustFundMoney += Math.floor(ancestorRecord.bequeathedMoney * 0.3);
  }
  if (ancestorRecord.prestigeGain) {
    family.clanTrust.prestigeScore += ancestorRecord.prestigeGain;
  }
  if (ancestorRecord.newMotto) {
    family.clanTrust.mottoList.push(ancestorRecord.newMotto);
  }
  if (ancestorRecord.passedRelic) {
    family.clanTrust.relics.push(ancestorRecord.passedRelic);
  }

  // 宗族五柱功德沉淀 (Five Clan Pillars: 多房协同)
  if (ancestorRecord.track) {
    if (!family.clanPillars) {
      family.clanPillars = {
        official: { maxRank: 0, maxTitle: '白衣门生', totalRuns: 0, perkDesc: '门阀政治庇护与官阶起步加成' },
        scholar: { maxRank: 0, maxTitle: '太学诸生', totalRuns: 0, perkDesc: '经学太学启蒙与悟性书香加成' },
        merchant: { maxRank: 0, maxTitle: '货殖商客', totalRuns: 0, perkDesc: '水碓庄园兴造与资财分红加成' },
        military: { maxRank: 0, maxTitle: '部曲武卒', totalRuns: 0, perkDesc: '坞壁防备坚固与部曲募兵加成' },
        recluse: { maxRank: 0, maxTitle: '名岳处士', totalRuns: 0, perkDesc: '大医避疫方术与延年天元加成' }
      };
    }
    const pKey = ancestorRecord.track;
    if (family.clanPillars[pKey]) {
      const pillar = family.clanPillars[pKey];
      pillar.totalRuns = (pillar.totalRuns || 0) + 1;
      const rankLvl = ancestorRecord.rankLevel || 0;
      if (rankLvl >= pillar.maxRank) {
        pillar.maxRank = rankLvl;
        if (ancestorRecord.officialTitle) pillar.maxTitle = ancestorRecord.officialTitle;
      }
    }
  }

  // 严格锁定在第一赛季（汉魏风骨），绝不自动将 currentEpochIndex 递增至 2（六朝烟雨）
  if (family.timeline) {
    if (family.currentSeasonId === 'season_1_han_wei' || !family.currentSeasonId) {
      family.timeline.currentEpochIndex = 1;
      family.currentSeasonId = 'season_1_han_wei';
    } else {
      family.timeline.completedEpochs = family.timeline.completedEpochs || {};
      family.timeline.completedEpochs[targetEra] = true;
      family.timeline.currentEpochIndex = Math.min(15, Math.max(family.timeline.currentEpochIndex || 1, targetEra + 1));
    }
  }

  return entry;
}

const ANCESTRAL_TEMPLE_TIERS = [
  { tier: 1, name: '草创宗祠', upgradeCost: 0, desc: '青砖土瓦，粗备香案。族人子弟谨守清白，自力更生。', perk: '承领祖荫基础金 5,000五铢' },
  { tier: 2, name: '耕读义塾', upgradeCost: 10000, desc: '拓设义塾私席，延师训课。后代及冠悟性+2，岁息分红+5%。', perk: '后代悟性+2，信托岁息+5%' },
  { tier: 3, name: '郡望大宗祠', upgradeCost: 25000, desc: '堂皇正大，门树乌头。郡望名流过门下马，初始声望+10。', perk: '初始声望+10，族产结转率+10%' },
  { tier: 4, name: '敕建忠孝祠', upgradeCost: 50000, desc: '奉旨敕建，御赐龙凤匾额。全族清廉风骨永存，审查抗性翻倍。', perk: '清廉审查抗性+50%，族望+25' },
  { tier: 5, name: '簪缨阀阅堂', upgradeCost: 100000, desc: '五世簪缨，连理名门。后嗣起家官爵加一阶，外戚盟好常在。', perk: '起家职衔+1阶，岁息红利+10%' },
  { tier: 6, name: '经学世家总祠', upgradeCost: 200000, desc: '群经注本藏诸高阁，门生故吏布满神州。后代察举台阁几率大幅跃升。', perk: '台阁察举成功率+25%，初始资本+20,000五铢' },
  { tier: 7, name: '柱国名门宗庙', upgradeCost: 400000, desc: '出将入相定鼎天下。家庙配享太庙冷猪肉，威加四海。', perk: '出将入相特权，后代韧性+10' },
  { tier: 8, name: '三公世第家庙', upgradeCost: 800000, desc: '四世三公门阀巨室。金册玉牒，万家拱卫，岁收千万。', perk: '信托岁息翻倍，全服榜单金光环' },
  { tier: 9, name: '万世华夏宗庙', upgradeCost: 1500000, desc: '三千年道统所钟，文脉星火照耀千秋。虽历沧桑鼎革，家门永世不绝。', perk: '万代不灭气运，全属性+10' }
];

const HISTORICAL_CLAN_HOUSES = [
  { id: 'clan_xun_yingchuan', surname: '荀', province: '河南', hallName: '颍阴堂', tag: '颍川高士', desc: '经学冠冕，王佐门风。与荀氏结亲，族中文声大振。', dowryGift: 8000, prestigeBonus: 45 },
  { id: 'clan_wang_langya', surname: '王', province: '山东', hallName: '临沂堂', tag: '琅琊冠冕', desc: '海内望族，簪缨领袖。与之通好，起步直膺中正上评。', dowryGift: 12000, prestigeBonus: 50 },
  { id: 'clan_xie_chenjun', surname: '谢', province: '河南', hallName: '陈郡堂', tag: '江左风流', desc: '东山雅量，风流宰辅。与之缔约，全族危局平抑抗性+20%。', dowryGift: 10000, prestigeBonus: 45 },
  { id: 'clan_yang_hongnong', surname: '杨', province: '陕西', hallName: '弘农堂', tag: '关西孔子', desc: '四世太尉，清白传家。与之缔姻，全族清廉风宪永续。', dowryGift: 9000, prestigeBonus: 40 },
  { id: 'clan_cui_qinghe', surname: '崔', province: '山东', hallName: '清河堂', tag: '大河经儒', desc: '北朝华胄，七姓十家之冠。与之结姻，学术研发成功率+25%。', dowryGift: 11000, prestigeBonus: 50 },
  { id: 'clan_yuan_runan', surname: '袁', province: '河南', hallName: '汝南堂', tag: '四世三公', desc: '门生故吏遍天下。与之订盟，跨赛季继承启动资本+30%。', dowryGift: 15000, prestigeBonus: 55 },
  { id: 'clan_lu_fanyang', surname: '卢', province: '河北', hallName: '范阳堂', tag: '幽燕名宿', desc: '范阳大儒，文武兼资。与之联姻，商业与实业佣金全免。', dowryGift: 8500, prestigeBonus: 40 },
  { id: 'clan_wei_jingzhao', surname: '韦', province: '陕西', hallName: '京兆堂', tag: '关陇巨室', desc: '城南韦杜，去天五尺。与之通婚，直通朝省机枢枢纽。', dowryGift: 9500, prestigeBonus: 45 }
];

function upgradeAncestralTemple(family, paymentSource) {
  if (!family || !family.clanTrust) return { success: false, reason: '未确立世家档案' };
  const curTier = family.clanTrust.ancestralTempleTier || 1;
  if (curTier >= 9) return { success: false, reason: '宗庙已达至尊万世华夏宗庙(9阶)！' };
  const targetSpec = ANCESTRAL_TEMPLE_TIERS[curTier]; // next tier index is curTier
  const cost = targetSpec.upgradeCost;

  if (paymentSource === 'capital') {
    // handled by caller
  } else {
    const curTrustFund = family.clanTrust.trustFundMoney || 0;
    if (curTrustFund < cost) {
      return { success: false, reason: `族产公积不足，需公积金 ${cost.toLocaleString()} 五铢钱` };
    }
    family.clanTrust.trustFundMoney -= cost;
  }

  family.clanTrust.ancestralTempleTier = curTier + 1;
  const prestigeGain = targetSpec.tier * 30;
  family.clanTrust.prestigeScore = (family.clanTrust.prestigeScore || 50) + prestigeGain;

  return {
    success: true,
    newTier: targetSpec.tier,
    tierName: targetSpec.name,
    prestigeGain: prestigeGain,
    perk: targetSpec.perk
  };
}

function calculateClanTrustAnnualDividend(family) {
  if (!family || !family.clanTrust) return 0;
  const tier = family.clanTrust.ancestralTempleTier || 1;
  const fund = family.clanTrust.trustFundMoney || 5000;
  const rate = 0.04 + tier * 0.01;
  return Math.max(1000, Math.round(fund * rate));
}

function addClanAlliance(family, allianceHouse, currentYear) {
  if (!family || !family.alliances) return { success: false, reason: '世家档案未就绪' };
  family.alliances = family.alliances || [];
  const existing = family.alliances.find(a => a.surname === allianceHouse.surname);
  if (existing) {
    return { success: false, reason: `我族与【${allianceHouse.province}·${allianceHouse.surname}氏】早已缔结世交盟约！` };
  }
  const bond = {
    surname: allianceHouse.surname,
    province: allianceHouse.province,
    hallName: allianceHouse.hallName,
    desc: allianceHouse.desc,
    bondYear: currentYear || 2026,
    prestigeBonus: allianceHouse.prestigeBonus || 45
  };
  family.alliances.push(bond);
  family.clanTrust.trustFundMoney = (family.clanTrust.trustFundMoney || 5000) + (allianceHouse.dowryGift || 8000);
  family.clanTrust.prestigeScore = (family.clanTrust.prestigeScore || 50) + (allianceHouse.prestigeBonus || 45);

  return { success: true, bond: bond };
}

function preResearchSeasonDoctrine(family, nextSeasonId, doctrineName) {
  if (!family || !family.clanTrust) return { success: false, reason: '世家档案未就绪' };
  family.clanTrust.preResearchedSeasons = family.clanTrust.preResearchedSeasons || {};
  if (family.clanTrust.preResearchedSeasons[nextSeasonId]) {
    return { success: false, reason: `我族已精研领悟【${doctrineName}】之先祖要旨！` };
  }
  const curScore = family.clanTrust.prestigeScore || 0;
  if (curScore < 30) {
    return { success: false, reason: '需宗族功德声望达到 30 分方可研读经世密卷！' };
  }
  family.clanTrust.preResearchedSeasons[nextSeasonId] = {
    doctrineName: doctrineName,
    researchedAt: Date.now()
  };
  return { success: true, doctrineName: doctrineName };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    COMMON_SURNAMES,
    PROVINCE_LIST,
    FAMOUS_HALL_MAPPING,
    COMMON_SURNAME_ANCIENT_ORIGINS,
    getClanLineageDocket,
    VOCATION_ORIGIN_PROFILES,
    ANCESTRAL_TEMPLE_TIERS,
    HISTORICAL_CLAN_HOUSES,
    createFamilyProfile,
    recordAncestorToGenealogy,
    upgradeAncestralTemple,
    calculateClanTrustAnnualDividend,
    addClanAlliance,
    preResearchSeasonDoctrine
  };
}
