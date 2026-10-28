/**
 * 华夏世家大系 · 乾坤化境 · 三阶连锁蝴蝶因果网 (Cascading Butterfly Nexus)
 */
const CASCADING_BUTTERFLY_NEXUS = {
  chains: [
    {
      id: 'chain_classmate_aid',
      name: '同窗之谊 · 义薄云天',
      icon: '🤝',
      color: '#38bdf8',
      stage1: {
        minAge: 21, maxAge: 29,
        title: '🌱 青年种因 · 同窗突遭家变几近辍学',
        desc: '大学同窗家中突遭火灾、家徒四壁面临退学困境，独自在操场角落落泪。你手头仅有积攒半年的津贴与粮票：',
        choices: [
          {
            text: '倾尽全部积蓄与粮票塞给同窗 · 坚信同舟共济定能渡过难关',
            outcomeText: '同窗泪如雨下紧握你的双手：‘此恩同再生，来日必以涌泉报之！’心性沉毅，种下一生挚友因果！',
            effects: { resilience: 25, eq: 25, capital: -2000 },
            tag: '义薄云天'
          },
          {
            text: '发起班级义务勤工俭学帮扶小组 · 带领同窗自食其力重整旗鼓',
            outcomeText: '全班动员起来开展义卖与辅导，同窗重燃斗志顺利毕业！组织能力大展，领袖威望卓著！',
            effects: { resilience: 20, rep: 30, eq: 20 },
            tag: '同舟共济'
          }
        ]
      },
      stage2: {
        minAge: 42, maxAge: 51,
        title: '⚡ 中年回响 · 遭遇外部断供危机与特区同窗连夜驰援',
        desc: '你主持的国家重点攻坚项目突遇海外关键零部件断供，整条装配线面临停摆；此时昔日同窗已在深圳创立高新企业，闻讯立刻包机赶赴现场：',
        choices: [
          {
            text: '连夜并肩开辟国产高精备用供应链 · 攻关48小时全线贯通',
            outcomeText: '昔日同窗调集全厂精锐产能为你特制高精度配件，供应链危机彻底化解！滴水之恩终成定海神针！',
            effects: { resilience: 35, rep: 40, capital: 120000 },
            tag: '涌泉相报'
          },
          {
            text: '与同窗企业签署联合自主创新战略协议 · 携手打造全国产化产业联盟',
            outcomeText: '两大团队深度融合，孵化出享誉业界的自主创新标杆！智谋与声望跃升！',
            effects: { resilience: 30, iq: 40, rep: 35 },
            tag: '金兰同心'
          }
        ]
      },
      stage3: {
        minAge: 62, maxAge: 69,
        title: '👑 晚年大成 · 同窗后辈登门拜师与世纪工程薪火传承',
        desc: '昔日同窗的后代作为海外学成归国的青年拔尖青年科学家，手捧当年父辈亲笔信登门拜访，恳请拜入你的师门担纲国家大工程：',
        choices: [
          {
            text: '倾囊相授平生所学 · 托付国家重大战略工程接班总师重任',
            outcomeText: '新一代青年科学家顺利掌舵大国重器，老友后辈传承薪火！晚年家国大成，百世流芳！',
            effects: { resilience: 40, rep: 50, clean: 30 },
            tag: '薪火赓续'
          },
          {
            text: '联合老同窗出资设立‘赤子报国青年科技奖励基金’',
            outcomeText: '基金每年扶持百名青年科技新星走向世界前沿，桃李满天下！一代宗师典范！',
            effects: { resilience: 35, rep: 45, eq: 35 },
            tag: '立德树人'
          }
        ]
      }
    },
    {
      id: 'chain_quality_standard',
      name: '铁面匠心 · 玉汝于成',
      icon: '⚖️',
      color: '#fbbf24',
      stage1: {
        minAge: 23, maxAge: 30,
        title: '🌱 青年种因 · 面对老乡供应商说情坚决退回缺陷配件',
        desc: '初入重点制造一线负责质量抽检，老家同乡办的配套小厂送来的核心轴承公差超标千分之二，老乡拎着厚礼苦苦求情放行：',
        choices: [
          {
            text: '铁面无私贴上大红退货单 · 严肃指出差之毫厘谬以千里',
            outcomeText: '你顶住人情压力坚守质检底线！老乡厂长虽一时愤懑，但质量红线震动全厂！清廉声誉立地生根！',
            effects: { resilience: 25, clean: 35, rep: 20 },
            tag: '铁面无私'
          },
          {
            text: '退回产品同时自费买下缺陷件 · 连夜画出冷拔模具改良图纸相赠',
            outcomeText: '老乡厂长看到浸透汗水的图纸老泪纵横，连夜停产整改！仁义与原则并重！',
            effects: { resilience: 25, clean: 30, eq: 25 },
            tag: '德化人心'
          }
        ]
      },
      stage2: {
        minAge: 44, maxAge: 52,
        title: '⚡ 中年回响 · 昔日小厂卧薪尝胆蜕变为国家级专精特新首供',
        desc: '国家重大工程急需超极限公差精密锻件，该配套厂经过二十年技术积累脱胎换骨，厂长主动将首批最优产品优先直供你的攻坚项目：',
        choices: [
          {
            text: '亲自带队进驻现场验收 · 见证当年缺陷厂蜕变全国行业标杆',
            outcomeText: '产品精度超国际标准一倍，重大工程如虎添翼！当年严苛把关终结出大国良材硕果！',
            effects: { resilience: 30, rep: 40, iq: 30 },
            tag: '玉汝于成'
          },
          {
            text: '推荐该厂申报国家工匠示范基地 · 提炼总结‘零缺陷质量体系’',
            outcomeText: '全行业推行该标准，彻底打破国外进口垄断！声誉大圆满！',
            effects: { resilience: 25, clean: 35, rep: 35 },
            tag: '标准立国'
          }
        ]
      },
      stage3: {
        minAge: 62, maxAge: 68,
        title: '👑 晚年大成 · 百年老字号自传尊你为‘一生唯一的良心引路人’',
        desc: '该企业成长为享誉海内外的百年隐形冠军，老厂长出版口述史，开篇第一章便整版刊印当年你的退货单，尊你为一生良心引路人：',
        choices: [
          {
            text: '应邀出席企业百年华诞 · 共同敲响崇尚实业与诚信质量的世纪金钟',
            outcomeText: '金石齐鸣，全场千名工匠起立致敬！你的清廉操守成为大国制造的精神航标！',
            effects: { resilience: 40, clean: 50, rep: 45 },
            tag: '德音孔昭'
          },
          {
            text: '提字‘大工至至，诚心致远’相赠 · 将稿酬全数设立工匠学徒助学金',
            outcomeText: '大音希声，大德无疆！家风与师德交口传颂！',
            effects: { resilience: 35, clean: 45, eq: 40 },
            tag: '万世师表'
          }
        ]
      }
    },
    {
      id: 'chain_mountain_lamp',
      name: '大山星火 · 桃李天下',
      icon: '🏔️',
      color: '#10b981',
      stage1: {
        minAge: 22, maxAge: 28,
        title: '🌱 青年种因 · 赴偏远山区巡回支教并捐建星火阅览室',
        desc: '青年时期响应号召奔赴深山老区开展科普与支教，目睹农家娃因缺书而求知若渴，你省吃俭用捐建了第一座山村星火阅览室：',
        choices: [
          {
            text: '捐出全部津贴订购两百册科普丛书与地球仪 · 播撒科学启蒙火种',
            outcomeText: '孩子们眼里闪烁着对星辰大海的向往，紧紧簇拥着你！大山深处点亮一盏长明之灯！',
            effects: { resilience: 25, eq: 30, clean: 20 },
            tag: '大山点灯'
          },
          {
            text: '利用业余时间在山村小学土操场设立‘土木小能手实验角’',
            outcomeText: '孩子们学会了辨识矿石、组装水车模型，动手能力与探索欲空前高涨！',
            effects: { resilience: 20, iq: 25, eq: 25 },
            tag: '格物致知'
          }
        ]
      },
      stage2: {
        minAge: 42, maxAge: 50,
        title: '⚡ 中年回响 · 当年山村放羊娃博士毕业入组担当科研主力',
        desc: '你主持的前沿重大实验室迎来新批博士后，其中一位青年以第一作者身份发表多篇顶刊，见到你时深深鞠躬：‘老师，我是当年大山阅览室里的放羊娃！’',
        choices: [
          {
            text: '激动相拥热泪盈眶 · 委以最关键的核心子系统攻坚重担',
            outcomeText: '青年学者夜以继日奋战，带领青年组突破世界级技术壁垒！山村火种终成燎原烈火！',
            effects: { resilience: 35, rep: 40, iq: 35 },
            tag: '星火燎原'
          },
          {
            text: '勉励其不忘初心扎根土地 · 共同攻坚适合基层应用的惠民科技',
            outcomeText: '师徒携手推出低成本高效新技术，惠及百万乡民！时代丰碑巍然耸立！',
            effects: { resilience: 30, clean: 35, eq: 35 },
            tag: '惠民济世'
          }
        ]
      },
      stage3: {
        minAge: 63, maxAge: 69,
        title: '👑 晚年大成 · 师徒携手发起大国科教星火基金资助万千寒门学子',
        desc: '古稀之年，你与当年的放羊娃如今的国家杰青学者共同发起‘星火科教公益基金’，资助万名大山学子步入现代科学殿堂：',
        choices: [
          {
            text: '重返当年支教的山村小学 · 见证新一代数字化未来教室揭牌',
            outcomeText: '曾经的泥草房已化作现代化科教中心，千名学子齐声呼喊恩师！桃李满神州，一生足矣！',
            effects: { resilience: 45, rep: 50, eq: 40 },
            tag: '桃李满门'
          },
          {
            text: '编写《写给乡村少年的科学通识讲义》· 终身无偿版权公开',
            outcomeText: '讲义被全国万所乡村小学定为必读书，润物细无声，功在千秋！',
            effects: { resilience: 40, clean: 45, iq: 40 },
            tag: '功在千秋'
          }
        ]
      }
    },
    {
      id: 'chain_sand_oasis',
      name: '绿染黄沙 · 青山常在',
      icon: '🌾',
      color: '#84cc16',
      stage1: {
        minAge: 25, maxAge: 32,
        title: '🌱 青年种因 · 深入风沙前线研发麦草方格低成本锁沙新法',
        desc: '风沙肆虐吞噬农田与铁路线，常规治沙成本高昂难以推广。青年时期的你顶风冒雪扎进沙海，研制低成本草方格扎设新技术：',
        choices: [
          {
            text: '风餐露宿连续扎根沙丘两月 · 独创梯级阻沙耐旱麦草方格网',
            outcomeText: '草方格成功固定流动沙丘，首批耐旱梭梭成活率超90%！体魄磨砺如钢，种下生态福缘！',
            effects: { resilience: 30, courage: 25, health: 15 },
            tag: '绿染黄沙'
          },
          {
            text: '走访沙漠周边老牧民总结本土植被特性 · 编写本土化固沙速查表',
            outcomeText: '因地制宜结合乡土智慧，治沙成本立降六成！深受基层乡民爱戴！',
            effects: { resilience: 25, eq: 25, iq: 25 },
            tag: '沙海同心'
          }
        ]
      },
      stage2: {
        minAge: 45, maxAge: 53,
        title: '⚡ 中年回响 · 昔日梭梭林连片成海抵御特大沙暴并孵化沙产业',
        desc: '罕见特大沙暴席卷北方，唯独你当年治沙的县域生态屏障固若金汤；不仅如此，林下肉苁蓉中药材产业年产值达数十亿元：',
        choices: [
          {
            text: '主持全流域生态综合水土平衡规划 · 推动由‘防沙治沙’走向‘沙海淘金’',
            outcomeText: '数万沙漠农牧民增收致富，风沙线后退三百里！荣立国家生态文明特等功！',
            effects: { resilience: 35, rep: 45, capital: 150000 },
            tag: '沙海成金'
          },
          {
            text: '坚持将生态收益全额注入荒漠水源涵养基金 · 绝不盲目过度商业化',
            outcomeText: '守住了大漠纯净的生态原色，地下水位二十年来首次回升！清廉自律受万人景仰！',
            effects: { resilience: 30, clean: 40, rep: 35 },
            tag: '青山自守'
          }
        ]
      },
      stage3: {
        minAge: 62, maxAge: 68,
        title: '👑 晚年大成 · 治沙奇迹入选全球可持续典范登上联合国峰会',
        desc: '你带领团队开创的中国草方格与绿色沙产业模式，被联合国环境规划署评为全球荒漠化治理最佳实践，受邀发表主题演讲：',
        choices: [
          {
            text: '在世界讲坛讲述中国人民艰苦卓绝的造林史诗 · 彰显大国生态智慧',
            outcomeText: '全场起立鼓掌长达五分钟！全世界见证了中国工匠将黄沙化为绿洲的旷世奇迹！',
            effects: { resilience: 45, rep: 50, courage: 35 },
            tag: '山川永驻'
          },
          {
            text: '向全球发展中国家无偿共享全套防沙治沙数字化工具箱',
            outcomeText: '中国方案惠及非洲绿墙与中亚荒漠，人类命运共同体理念深入人心！',
            effects: { resilience: 40, clean: 50, eq: 40 },
            tag: '大美无疆'
          }
        ]
      }
    },
    {
      id: 'chain_machine_tool',
      name: '自力更生 · 工业母机',
      icon: '⚙️',
      color: '#a855f7',
      stage1: {
        minAge: 26, maxAge: 33,
        title: '🌱 青年种因 · 面对昂贵进口机床土法攻关手工研磨精密基准件',
        desc: '工厂引进外国机床受阻，核心零件精度不足。面对天价要价与苛刻协议，你带领老钳工用废旧铸件手工配磨，写下三本精密公差手稿：',
        choices: [
          {
            text: '日夜坚守车间用红丹粉反复刮研 · 徒手磨出微米级平整度基准板',
            outcomeText: '凭借出神入化的手感磨出比原厂更精准的基准平板！外国专家瞠目结舌！工匠之志不可辱！',
            effects: { resilience: 30, iq: 30, courage: 25 },
            tag: '自力更生'
          },
          {
            text: '将手工研磨数据与微震动参数全部系统量化为第一代数字公差表',
            outcomeText: '为后来的全数字控制埋下了第一块基石！智谋与技术底蕴空前深厚！',
            effects: { resilience: 25, iq: 35, clean: 20 },
            tag: '数智奠基'
          }
        ]
      },
      stage2: {
        minAge: 47, maxAge: 54,
        title: '⚡ 中年回响 · 外部突然断供刀具两周自研替代突破卡脖子',
        desc: '国际跨国寡头突然全面停售超硬切削刀具与高精度光栅尺，企图逼停大国新型装备装配；你凭借当年整理的底层微观力学手稿披甲上阵：',
        choices: [
          {
            text: '启动备用自研材料与自制超精夹具 · 两周内实现百分百自主平替',
            outcomeText: '不仅全面恢复量产，更反向迫使外国厂商大幅降价！自主可控定海神针坚不可摧！',
            effects: { resilience: 35, rep: 45, capital: 130000 },
            tag: '定海神针'
          },
          {
            text: '趁势整合全产业链组建国家级高精数控机床协同攻关联合体',
            outcomeText: '变危机为契机，打造出首条全自主高端工业母机生产线！大国脊梁！',
            effects: { resilience: 30, rep: 40, iq: 40 },
            tag: '举国攻坚'
          }
        ]
      },
      stage3: {
        minAge: 64, maxAge: 70,
        title: '👑 晚年大成 · 自主五轴联动数控工业母机正式列装大国重器',
        desc: '由你主持研制的完全自主知识产权高端五轴联动数控加工中心，在国家航天与大国重器核心总装车间成功切削出首件巨型整体叶盘：',
        choices: [
          {
            text: '手抚轰鸣运转的国产母机热泪盈眶 · 见证数十年强基梦想照进现实',
            outcomeText: '金石齐鸣！三代工匠的心血终铸就先进制造之魂！荣获国家科技进步特等奖！',
            effects: { resilience: 50, rep: 50, iq: 45 },
            tag: '工业基石'
          },
          {
            text: '将全部原始设计图纸与核心代码正式移交国家工业博物馆永久典藏',
            outcomeText: '大国重器万年大计，后人站在你的肩膀上继续攀登世界科学之巅！',
            effects: { resilience: 45, clean: 50, rep: 45 },
            tag: '大器流芳'
          }
        ]
      }
    }
  ]
};

module.exports = {
  CASCADING_BUTTERFLY_NEXUS
};
