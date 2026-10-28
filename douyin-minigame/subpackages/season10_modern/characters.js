// 42位各界名仕通讯录与对话数据集
const ENSEMBLE_CHARACTERS = [
  {
    "id": "su_qing",
    "name": "苏晴",
    "role": "启明红杉资本合伙人 · 资深投资人",
    "category": "biz",
    "avatar": "💼",
    "trust": 60,
    "dialogues": [
      {
        "text": "商业世界里没有童话。我投你不是因为你讲的故事动听，而是看中你的抗风险能力与现金流造血底牌。这轮三千万，签字还是另寻高明？",
        "options": [
          {
            "text": "【从容拆解财务报表与毛利模型，坚持估值底线不妥协】",
            "reply": "苏晴眼神一亮：'有风骨更有数字底气，投委会全票通过！'",
            "trustDelta": 20,
            "iqDelta": 15,
            "capitalDelta": 50000
          },
          {
            "text": "【接受对赌条款换取溢价资金，全力扩张抢占市场】",
            "reply": "苏晴微微一笑：'爽快！但记住了，达不到对赌业绩你将失去控股权。'",
            "trustDelta": 10,
            "courageDelta": 20,
            "capitalDelta": 100000
          }
        ]
      },
      {
        "text": "海外巨头正准备以专利流氓手段对我们提起337调查，资本市场已经闻风做空。作为大股东，我需要你给我一颗定心丸。",
        "options": [
          {
            "text": "【亮出全套自研替代专利与反诉备忘录，坚决应诉】",
            "reply": "苏晴拍案叫绝：'漂亮！启明追加两千万法律与公关专项弹药！'",
            "trustDelta": 25,
            "courageDelta": 25,
            "repDelta": 20
          },
          {
            "text": "【启动备选供应链应急预案，确保国内订单零受阻】",
            "reply": "苏晴点头：'稳健！资本市场最看重确定性，股价稳住了！'",
            "trustDelta": 15,
            "iqDelta": 15
          }
        ]
      }
    ]
  },
  {
    "id": "qian_wanshan",
    "name": "钱万山",
    "role": "万山商贸集团实控人 · 沿海商界老行尊",
    "category": "biz",
    "avatar": "🚢",
    "trust": 50,
    "dialogues": [
      {
        "text": "老弟，在东南沿海做实业，水浅王八多！今年北欧的三文鱼配额我吃下了七成，剩下三成，咱们是联手做大还是同行火拼？",
        "options": [
          {
            "text": "【以退为进：联合组建沿海冷链物流联盟，共同平抑货源成本】",
            "reply": "钱万山大笑拍腿：'后生可畏！一起发财，今晚大排档我请！'",
            "trustDelta": 20,
            "eqDelta": 15,
            "repDelta": 15
          },
          {
            "text": "【亮出独家保税仓特许协议，公事公办不卑不亢】",
            "reply": "钱万山收敛笑容，肃然起敬：'有点手段，老钱佩服你的硬气。'",
            "trustDelta": 10,
            "courageDelta": 20,
            "repDelta": 20
          }
        ]
      },
      {
        "text": "那家外资超市巨头拖欠了我们六千万货款，还想强行压低明年进场费。老弟，咱们得联手给他们上上一课！",
        "options": [
          {
            "text": "【组织全省二十家优质供应商联合暂停供货，依法申请财产保全】",
            "reply": "钱万山兴奋挥拳：'这招打在七寸上！外资采购总监今天主动上门求和！'",
            "trustDelta": 25,
            "courageDelta": 20,
            "repDelta": 20
          },
          {
            "text": "【借机开辟国内社区生鲜直营与线上电商渠道，摆脱单一渠道依赖】",
            "reply": "钱万山竖大拇指：'老弟有远见，做实业就得有自己的命门！'",
            "trustDelta": 20,
            "iqDelta": 20,
            "capitalDelta": 60000
          }
        ]
      }
    ]
  },
  {
    "id": "lao_jin",
    "name": "老金",
    "role": "深圳华强北元器件老行尊 · 现货大拿",
    "category": "biz",
    "avatar": "📦",
    "trust": 55,
    "dialogues": [
      {
        "text": "别的地方缺芯少件急得跳楼，我老金柜台里永远有三箱绝版工业级晶振。看在多年交情上，平价给你，但下个月新产品线得优先让我做分销。",
        "options": [
          {
            "text": "【欣然握手，当场签署战略分销备忘录】",
            "reply": "老金痛快交货：'痛快！华强北十条街的现货你随时调！'",
            "trustDelta": 25,
            "repDelta": 15,
            "capitalDelta": 30000
          },
          {
            "text": "【现款现结不留欠条，坚守供应链多渠道安全底线】",
            "reply": "老金赞许：'是个办大事的料，规矩清爽，我认你这个朋友！'",
            "trustDelta": 15,
            "cleanDelta": 15,
            "iqDelta": 15
          }
        ]
      }
    ]
  },
  {
    "id": "dong_mishu",
    "name": "董秘书",
    "role": "金牌董事会秘书 · 资本市场合规专家",
    "category": "biz",
    "avatar": "👩‍💼",
    "trust": 65,
    "dialogues": [
      {
        "text": "董事长，证监会下周进驻进行IPO上市辅导验收。我们过去三年的关联交易和研发费用资本化必须经得起最严苛的穿透式核查。",
        "options": [
          {
            "text": "【下令全财务部门与律所、会计师事务所连夜全面自查，零瑕疵过会！】",
            "reply": "董秘松了口气：'账目清清白白，上市聆讯全票一次性通过！'",
            "trustDelta": 20,
            "cleanDelta": 20,
            "repDelta": 25
          },
          {
            "text": "【聘请顶级独立第三方合规机构出具全面穿透评估报告】",
            "reply": "董秘赞叹：'严谨求实！监管机构对我们的合规透明度给予最高评级！'",
            "trustDelta": 25,
            "iqDelta": 20
          }
        ]
      },
      {
        "text": "有野蛮人资本在二级市场悄悄吸筹已达4.8%，疑似准备举牌夺取控制权。我们需要启动反收购焦土预案吗？",
        "options": [
          {
            "text": "【引入长期看好我们的国资绿色产业基金与险资白衣骑士！稳住绝对控制权！】",
            "reply": "董秘连夜运作：'白衣骑士入场！野蛮人知难而退，股价大涨！'",
            "trustDelta": 25,
            "courageDelta": 25,
            "capitalDelta": 120000
          },
          {
            "text": "【修改公司章程增设超级投票权AB股与金色降落伞条款】",
            "reply": "董秘钦佩：'顶层制度筑起铜墙铁壁，控股权彻底高枕无忧！'",
            "trustDelta": 20,
            "iqDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "tang_caigou",
    "name": "唐采购",
    "role": "全国连锁超级商超采购总监",
    "category": "biz",
    "avatar": "🛒",
    "trust": 50,
    "dialogues": [
      {
        "text": "全国两千家门店的生鲜与科技潮品货架，上千家工厂在排队求我。你的产品虽好，但供货履约保证金和账期能不能放宽到九十天？",
        "options": [
          {
            "text": "【以全程冷链温控与过硬产品口碑说服对方，坚持四十五天账期】",
            "reply": "唐采购被品质折服：'行！有品质撑腰，给你开辟全国主通道货架！'",
            "trustDelta": 20,
            "iqDelta": 15,
            "capitalDelta": 80000
          },
          {
            "text": "【提供独家首发特供规格与联合促销补贴，共建品牌专区】",
            "reply": "唐采购眼前一亮：'懂商业！首周销售额直接破了全渠道纪录！'",
            "trustDelta": 25,
            "eqDelta": 20,
            "repDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "sun_hangzhang",
    "name": "孙行长",
    "role": "城商行对公金融业务副行长 · 信贷大拿",
    "category": "biz",
    "avatar": "🏦",
    "trust": 55,
    "dialogues": [
      {
        "text": "老同学，你们新投产的数字化智能基地，行里董事会刚刚批复了两亿元制造业长期低息专项贷款，基准利率下浮20个基点！",
        "options": [
          {
            "text": "【专款专用，全部锁死在高端数控机床与工业软件自研投入上】",
            "reply": "孙行长欣慰：'实体经济就需要你们这种实打实做事的实干家！'",
            "trustDelta": 20,
            "cleanDelta": 20,
            "capitalDelta": 150000
          },
          {
            "text": "【配资扩建沿海绿色保税冷链物流枢纽，打通上下游产销链条】",
            "reply": "孙行长频频点头：'布局宏大！下个月我们联合发债！'",
            "trustDelta": 25,
            "iqDelta": 20,
            "repDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "gu_jiaoshou",
    "name": "顾教授",
    "role": "协和医院资深大外科博导 · 国家名医导师",
    "category": "med",
    "avatar": "👨‍⚕️",
    "trust": 70,
    "dialogues": [
      {
        "text": "晚意，手术刀握在手里，重若千钧。这台高位胸主动脉瘤夹层微创手术，全国成功率不足四成。家属跪在门外，你敢不敢跟我一起上这台生死台？",
        "options": [
          {
            "text": "【沉着洗手穿衣：'老师，三维重建我已经推演了八遍，我做第一助手！'】",
            "reply": "顾教授欣慰拍肩：'临危不惧，大医之风！手术大获成功！'",
            "trustDelta": 25,
            "courageDelta": 25,
            "repDelta": 30
          },
          {
            "text": "【提出联合介入导管与覆膜支架复合杂交微创方案，将风险降至两成】",
            "reply": "顾教授大为赞赏：'好后生！创新思路，填补省内微创介入空白！'",
            "trustDelta": 20,
            "iqDelta": 25,
            "repDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "zhang_hushizhang",
    "name": "张护士长",
    "role": "急诊科资深老护士长 · 临床定海神针",
    "category": "med",
    "avatar": "👩‍⚕️",
    "trust": 65,
    "dialogues": [
      {
        "text": "主任，昨夜连环车祸送来八个大出血危重伤员，血库O型血告急！家属情绪近乎失控，走廊里哭声一片，请您定夺！",
        "options": [
          {
            "text": "【沉着果断启动自体血液回输机，同时亲自出面三句话稳定家属情绪】",
            "reply": "张护士长佩服：'有你在，急诊全科就像有了主心骨，伤员全救回来了！'",
            "trustDelta": 25,
            "eqDelta": 20,
            "repDelta": 25
          },
          {
            "text": "【火速联络中心血站绿色生命通道，并调动全院三线备班医生火速支援】",
            "reply": "抢救有条不紊，创下急诊全员抢救成功纪录！",
            "trustDelta": 20,
            "iqDelta": 20,
            "healthDelta": 5
          }
        ]
      }
    ]
  },
  {
    "id": "qin_zhuren",
    "name": "秦主任",
    "role": "神经外科微创介入一把刀 · 临床金牌搭档",
    "category": "med",
    "avatar": "🧠",
    "trust": 60,
    "dialogues": [
      {
        "text": "林院长，这例帕金森深部脑刺激术(DBS)电极植入，误差要求必须控制在0.1毫米以内。咱们联手申报国家前沿手术重点专项吧！",
        "options": [
          {
            "text": "【应用术中高场强核磁与机器人导航双重校准，精准植入零误差！】",
            "reply": "秦主任激动高呼：'患者震颤当场消失！这是国内神经外科的里程碑！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 30
          },
          {
            "text": "【推动建立多学科诊疗一体化病房，惠及上千名基层重症患者】",
            "reply": "秦主任由衷敬佩：'仁心仁术，不仅是名医更是学科领路人！'",
            "trustDelta": 20,
            "eqDelta": 20,
            "repDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "qi_zong",
    "name": "齐总",
    "role": "国产腔镜手术机器人独角兽创始人 · 产学研伙伴",
    "category": "med",
    "avatar": "🦾",
    "trust": 55,
    "dialogues": [
      {
        "text": "以往进口手术机器人一套两千多万，耗材每年上百万，平民百姓根本用不起。林院长，我们的国产完全自主知识产权原型机，能不能在贵院开展首批临床试验？",
        "options": [
          {
            "text": "【亲自牵头组建严苛的临床安全论证小组，带头完成首批50例平稳手术！】",
            "reply": "齐总眼眶湿润：'国家药监局创新通道获批！手术费用从八万直降到两万！'",
            "trustDelta": 30,
            "courageDelta": 25,
            "repDelta": 35,
            "cleanDelta": 20
          },
          {
            "text": "【指导工程师针对中国人体质优化微米级力矩传感器与防抖算法】",
            "reply": "齐总击节赞叹：'专家的临床反馈比我们在实验室闭门造车强一百倍！'",
            "trustDelta": 25,
            "iqDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "zhou_jiaoshou",
    "name": "周教授",
    "role": "国家传染病防治重点实验室资深首席科学家",
    "category": "med",
    "avatar": "🔬",
    "trust": 65,
    "dialogues": [
      {
        "text": "新型呼吸道靶向抑制抗体分子在小鼠模型上表现亮眼，但缺乏高等级三期临床真实世界队列。林院长，贵院的急危重症大数据能否与我们联合攻关？",
        "options": [
          {
            "text": "【联合启动千例多中心双盲随机对照临床队列，发表柳叶刀封面文章！】",
            "reply": "周教授激动致电：'新药获得国家紧急使用特批，救人无数！'",
            "trustDelta": 30,
            "iqDelta": 30,
            "repDelta": 35
          },
          {
            "text": "【建立跨区域重症样本资源库与基因测序预警平台】",
            "reply": "周教授深感振奋：'筑牢了国家公共卫生早期防控的坚强盾牌！'",
            "trustDelta": 20,
            "cleanDelta": 20,
            "repDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "li_lei",
    "name": "李雷 (Ray)",
    "role": "硅谷归国算法架构博士 · 联席技术合伙人",
    "category": "tech",
    "avatar": "💻",
    "trust": 65,
    "dialogues": [
      {
        "text": "海外EDA龙头停了我们的云端账号，二十个芯片工程师屏幕全黑了。我有套自主编译器的底层架构构想，但至少需要封闭开发三个月，你敢陪我赌吗？",
        "options": [
          {
            "text": "【把全部机动资金划入研发账户：'老李，放手去干，天塌下来我顶着！'】",
            "reply": "李雷通宵鏖战90天：'自主EDA内核编译成功！核心专利100%自主！'",
            "trustDelta": 30,
            "courageDelta": 30,
            "repDelta": 35,
            "capitalDelta": 80000
          },
          {
            "text": "【调集全球开源社区技术骨干联合分布式攻坚，两周上线紧急过渡版】",
            "reply": "李雷佩服：'分布式开发真被你盘活了，生产线一秒没停！'",
            "trustDelta": 20,
            "iqDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "ding_boshi",
    "name": "丁博士",
    "role": "自主指令集与工业编译架构新锐科学家",
    "category": "tech",
    "avatar": "🤓",
    "trust": 60,
    "dialogues": [
      {
        "text": "明远哥，现有的国外工业现场总线协议有严重的时延抖动，无法支撑微秒级人形机器人关节协同。我们团队设计了全新无损确定性光总线！",
        "options": [
          {
            "text": "【立刻立项专项突击组，亲自带队软硬件联合仿真，申请国际ISO标准！】",
            "reply": "丁博士狂喜：'总线时延降到0.2微秒！国际工委会全票通过该标准提案！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 30
          },
          {
            "text": "【把该协议开源发布到国内工业互联网开源社区，打造自主生态联盟】",
            "reply": "丁博士由衷钦佩：'做生态格局更大！三百家制造业企业纷纷接入我们的底层！'",
            "trustDelta": 25,
            "eqDelta": 25,
            "repDelta": 35
          }
        ]
      }
    ]
  },
  {
    "id": "lao_huang",
    "name": "老黄",
    "role": "无尘晶圆代工制造厂厂长 · 芯片流片良率定海神针",
    "category": "tech",
    "avatar": "🏭",
    "trust": 60,
    "dialogues": [
      {
        "text": "顾总，这是我们28nm首批工程批次晶圆。前几家设计公司流片良率只有三成亏得底掉。你们的自研版图跑完四百道工序，良品率冲到了89%！",
        "options": [
          {
            "text": "【连夜敲定年产十万片长协量产大单，抢占国产工业芯片最大份额！】",
            "reply": "老黄开怀大笑：'好！全厂三条产线全天候为你保供！'",
            "trustDelta": 25,
            "courageDelta": 20,
            "capitalDelta": 150000,
            "repDelta": 25
          },
          {
            "text": "【给晶圆厂一线工艺工程师全员发放特殊攻坚奖金与致谢信】",
            "reply": "老黄感动：'顾总仁厚！工人们干劲冲天，下一批工艺良率直接干到94%！'",
            "trustDelta": 30,
            "eqDelta": 25,
            "repDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "a_lun",
    "name": "阿伦 (Alan)",
    "role": "具身智能多模态大模型社区布道师",
    "category": "tech",
    "avatar": "🤖",
    "trust": 55,
    "dialogues": [
      {
        "text": "具身智能机器人的物理世界常识一直是个死结。我们采集了十万小时黑灯工厂装配视频训练端到端大模型，机器人已经学会盲摸精密插拔轴承！",
        "options": [
          {
            "text": "【将该端侧多模态模型部署到机器人本体神经芯片中，实现离线自适应控制！】",
            "reply": "阿伦惊呼：'机器人在复杂工况下完全自主避障并完成组装！全球首创！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 30
          },
          {
            "text": "【联合国家级重点制造业基地开放实测示范工段，打造智能制造样板间】",
            "reply": "阿伦竖起大拇指：'央视整整报道了八分钟！行业订单如雪片般飞来！'",
            "trustDelta": 25,
            "repDelta": 35,
            "capitalDelta": 100000
          }
        ]
      }
    ]
  },
  {
    "id": "chen_bo",
    "name": "陈伯",
    "role": "沿海高产示范田老把式 · 农科实践家",
    "category": "agri",
    "avatar": "🌾",
    "trust": 70,
    "dialogues": [
      {
        "text": "阿远，这片盐碱滩涂荒了三百年。你说省农科院新研制的高产耐盐碱水稻种子能在海风咸地里活？老汉我带着全村后生，把家底良田押给你试试！",
        "options": [
          {
            "text": "【晴天一身汗雨天一身泥，亲自带头在滩涂搭棚住下，监测土壤电导率】",
            "reply": "陈伯眼含热泪：'亩产突破八百斤！荒滩变成米粮川！你是全村的大恩人！'",
            "trustDelta": 30,
            "courageDelta": 25,
            "repDelta": 30,
            "capitalDelta": 60000
          },
          {
            "text": "【引入智能滴灌与土壤微生物脱盐有机菌肥，科学降解盐碱度】",
            "reply": "陈伯叹服：'老古董服了现代科技！稻谷颗粒饱满得像珍珠！'",
            "trustDelta": 20,
            "iqDelta": 25,
            "cleanDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "gui_hua_sao",
    "name": "桂花嫂",
    "role": "乡村非遗手工编织生态合作社带头人",
    "category": "agri",
    "avatar": "🧺",
    "trust": 65,
    "dialogues": [
      {
        "text": "陆理事长，俺们村留守妇女编的柳条竹编小提篮和纯天然草编工艺品，被城里来的外国客商一眼相中，下了二十万个出口大订单！",
        "options": [
          {
            "text": "【统一品质标准与环保熏蒸工序，协助合作社打响绿色生态出海名片】",
            "reply": "桂花嫂笑逐颜开：'每户农嫂一年多挣五万块！娃娃们念书全有底气了！'",
            "trustDelta": 30,
            "eqDelta": 20,
            "repDelta": 25,
            "capitalDelta": 50000
          },
          {
            "text": "【注册地理标志证明商标并申请外观设计专利，保护传统手工艺文脉】",
            "reply": "桂花嫂感激涕零：'有商标有专利，再也不怕城里黑心中介压价了！'",
            "trustDelta": 25,
            "cleanDelta": 20,
            "repDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "li_zhanzhang",
    "name": "李站长",
    "role": "县农技推广综合服务中心高级农艺师",
    "category": "agri",
    "avatar": "🔬",
    "trust": 60,
    "dialogues": [
      {
        "text": "老弟，连续三年大量使用化肥导致全县局部耕地土壤酸化板结。我们试验出测土配方有机绿肥替代方案，但老百姓习惯了用复合肥，思想一时转不过来。",
        "options": [
          {
            "text": "【联合合作社设立百亩有机种植对比试验田，让实打实的果实品质说话！】",
            "reply": "李站长拍手：'秋收对比苹果糖度提升两度！老百姓全抢着用有机绿肥！'",
            "trustDelta": 25,
            "iqDelta": 20,
            "cleanDelta": 25,
            "repDelta": 20
          },
          {
            "text": "【为改用有机绿肥的农户提供保底溢价收购承诺，彻底解除农户后顾之忧】",
            "reply": "李站长敬佩：'敢担当的领头雁！全县万亩土地重焕黑土生机！'",
            "trustDelta": 30,
            "courageDelta": 25,
            "capitalDelta": 40000
          }
        ]
      }
    ]
  },
  {
    "id": "liu_zong_agri",
    "name": "刘总",
    "role": "全国农产品冷链物流骨干直供网创办人",
    "category": "agri",
    "avatar": "🚛",
    "trust": 55,
    "dialogues": [
      {
        "text": "理事长，新鲜采摘的高山蜜桃和富硒草莓，以往运到大城市损耗率高达30%。我们在田头建立移动预冷保鲜仓，二十四小时内直达一线超市货架！",
        "options": [
          {
            "text": "【联合入股区域智能冷链物流中枢，打通从田头到餐桌的全程保鲜冷链】",
            "reply": "刘总大喜：'产地直达无损耗！高附加值有机果品在北上广被疯抢一空！'",
            "trustDelta": 25,
            "iqDelta": 20,
            "capitalDelta": 90000,
            "repDelta": 25
          },
          {
            "text": "【搭建产地冷链直播直发专线，农户手机就是新农具，直接对接全国吃客】",
            "reply": "刘总竖拇指：'单场直播卖出三万箱！农产品真正卖出了金子价！'",
            "trustDelta": 20,
            "eqDelta": 25,
            "repDelta": 30
          }
        ]
      }
    ]
  },
  {
    "id": "bai_biandao",
    "name": "白编导",
    "role": "现象级非遗纪录片总导演 · 东方美学传播使者",
    "category": "art",
    "avatar": "🎥",
    "trust": 65,
    "dialogues": [
      {
        "text": "老师，我准备用 8K 电影级画质跟拍你三年，记录你在深山抢救性复原千年失传缂丝与古法矿物颜料的全过程。这种纯粹的匠心，能震撼整个世界！",
        "options": [
          {
            "text": "【欣然答应，毫无保留展示复原工艺细节，并整理公开全部矿物调配古方】",
            "reply": "白编导动容：'大公无私！纪录片全网播放破十亿，海外多国电视台高价引进！'",
            "trustDelta": 30,
            "repDelta": 40,
            "cleanDelta": 25
          },
          {
            "text": "【联合美院青年画师共同发起非遗青年传承计划，建立数字化保护库】",
            "reply": "白编导赞叹：'不仅是艺术家，更是文脉引路人！青年一代彻底爱上传统国潮！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 30
          }
        ]
      }
    ]
  },
  {
    "id": "xue_zhipian",
    "name": "薛制片",
    "role": "资深院线动画电影金牌制片人",
    "category": "art",
    "avatar": "🎬",
    "trust": 60,
    "dialogues": [
      {
        "text": "总导演，你的东方神话叙事分镜脚本惊艳了整个投资圈！五大院线巨头联合承诺给咱们大年初一35%的排片！这次我们要让世界看看中国动画的真正硬实力！",
        "options": [
          {
            "text": "【严苛把控每一帧东方水墨意境与粒子流体光影，誓做影史标杆精品！】",
            "reply": "薛制片振臂高呼：'电影打破影史动画票房纪录！狂揽五十亿荣登榜首！'",
            "trustDelta": 30,
            "courageDelta": 30,
            "repDelta": 45,
            "capitalDelta": 150000
          },
          {
            "text": "【同步开发系列文创盲盒、数字交互沉浸展与国潮衍生品全产业链】",
            "reply": "薛制片服气：'衍生品单月销售破三亿！东方美学真正具备了长青商业生命力！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "capitalDelta": 100000
          }
        ]
      }
    ]
  },
  {
    "id": "mo_guanzhang",
    "name": "莫馆长",
    "role": "国家级历史文化博览院副馆长",
    "category": "art",
    "avatar": "🏛️",
    "trust": 70,
    "dialogues": [
      {
        "text": "先生，馆藏的两千件唐宋青铜古画与敦煌飞天壁画正在面临风化褪色危机。我们希望授权你的工作室开展全面的数字化三维活化重塑！",
        "options": [
          {
            "text": "【采用微米级激光扫描与自研虚幻光影引擎，全息还原盛唐飞天华章！】",
            "reply": "莫馆长激动落泪：'古人神韵在数字时代永生！巴黎卢浮宫争相邀请联合策展！'",
            "trustDelta": 30,
            "iqDelta": 25,
            "repDelta": 40,
            "cleanDelta": 20
          },
          {
            "text": "【将数字艺术图谱免费开放给全国中小学美术课堂，让传统美育润泽童心】",
            "reply": "莫馆长肃然起敬：'立德树人，艺德高尚！教育部授予你杰出美育勋章！'",
            "trustDelta": 25,
            "eqDelta": 25,
            "repDelta": 35
          }
        ]
      }
    ]
  },
  {
    "id": "hu_dazhuang",
    "name": "胡大状",
    "role": "顶级红圈律所创始高级合伙人 · 律政名宿",
    "category": "law",
    "avatar": "⚖️",
    "trust": 65,
    "dialogues": [
      {
        "text": "大律师，对方跨国巨头雇佣了三家国际顶尖律所，提交了三万页英文证据试图在伦敦国际仲裁院以技术窃取管辖权将我们绞杀。这案子，你敢主刀吗？",
        "options": [
          {
            "text": "【连续奋战四十八天建立自主研发代码时间戳全链公证，当庭揭露伪证！】",
            "reply": "胡大状拍案叫绝：'伦敦仲裁庭全票支持我方仲裁请求！跨国巨头赔礼认输！'",
            "trustDelta": 30,
            "courageDelta": 30,
            "repDelta": 35,
            "capitalDelta": 90000
          },
          {
            "text": "【依据反不正当竞争法提出反垄断管辖权异议，将主战场拉回中国法院】",
            "reply": "胡大状大赞：'精通国际法规则又深谙主场优势！一举为中国高端制造保驾护航！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 30
          }
        ]
      }
    ]
  },
  {
    "id": "wei_dalvshi",
    "name": "魏大律师",
    "role": "全国破产与困境企业救助重组委员会名誉主任",
    "category": "law",
    "avatar": "📜",
    "trust": 65,
    "dialogues": [
      {
        "text": "方首席，某百亿产值重工集团陷入两百亿债务危机，两万名职工面临下岗，多地债权人堵住厂门。是直接清算一了百了，还是做高难度的破产重组？",
        "options": [
          {
            "text": "【坚决启动司法重整！剥离不良债务，引入战略产业投资人保全两万个岗位！】",
            "reply": "魏主任眼眶湿润：'大仁大义！工人们复工保住了生计，企业两年后涅槃重生！'",
            "trustDelta": 30,
            "courageDelta": 30,
            "repDelta": 40,
            "cleanDelta": 20
          },
          {
            "text": "【创新设计债转股与留债展期综合金融法律方案，让债权人利益最大化回收】",
            "reply": "魏主任赞叹：'精妙绝伦的重组范式！入选最高院十大商事典型破产重整案例！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 35
          }
        ]
      }
    ]
  },
  {
    "id": "jin_faguan",
    "name": "金法官",
    "role": "国际商事审判前资深法官 · 现法学特聘教授",
    "category": "law",
    "avatar": "⚖️",
    "trust": 60,
    "dialogues": [
      {
        "text": "方首席，你在国际仲裁庭上的多场精彩辩论彰显了中国法治的严谨与公正。亚洲国际仲裁中心正在扩充仲裁员名单，我全力保荐你！",
        "options": [
          {
            "text": "【郑重接受保荐，以专业中立与法治精神裁决亚太跨境商事争端】",
            "reply": "金法官微笑点头：'大国法治之光！世界对中国仲裁裁决的公信力倍增！'",
            "trustDelta": 25,
            "repDelta": 35,
            "cleanDelta": 25
          },
          {
            "text": "【推动建立绿色低碳投资与涉外技术进出口的标准仲裁规则指引】",
            "reply": "金法官由衷称赞：'引领国际规则制定的时代先锋！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 30
          }
        ]
      }
    ]
  },
  {
    "id": "gao_fawu",
    "name": "高法务",
    "role": "世界500强亚太区合规与风险控制副总裁",
    "category": "law",
    "avatar": "👔",
    "trust": 55,
    "dialogues": [
      {
        "text": "方律师，国际监管机构对跨境供应链ESG与合规审计查得极严。我们希望聘请您的红圈所团队担任全球常年合规总法律顾问，每年八位数法务预算！",
        "options": [
          {
            "text": "【建立全流程数字化穿透合规风控体系，确保企业全球经营零红线违规】",
            "reply": "高法务叹服：'专业！帮集团化解了数亿美元潜在合规重罚风险！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "capitalDelta": 120000,
            "repDelta": 25
          },
          {
            "text": "【帮助企业建立严密的数据安全出境与核心商业秘密离岸隔离防线】",
            "reply": "高法务连声称谢：'真正做到了让企业扬帆出海高枕无忧！'",
            "trustDelta": 25,
            "courageDelta": 20,
            "repDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "ban_lv",
    "name": "相濡以沫的伴侣",
    "role": "人生最重要的贤内助 · 温暖港湾",
    "category": "life",
    "avatar": "💍",
    "trust": 85,
    "dialogues": [
      {
        "text": "这三十年来，你为了事业风里来雨里去，两鬓都染上了白霜。无论外面风浪多大，回到家，永远有一碗热汤等着你。咱们身体最要紧，下个月去海边疗养几天吧？",
        "options": [
          {
            "text": "【握紧伴侣的手，安排全家海边度假，陪伴家人共享天伦之乐】",
            "reply": "伴侣欣慰微笑：'这才是人间最踏实的幸福！'",
            "trustDelta": 15,
            "healthDelta": 15,
            "eqDelta": 15
          },
          {
            "text": "【深情拥抱：'这些年你操持家里辛苦了，企业的军功章有一大半是你的！'】",
            "reply": "伴侣动容：'只要你平平安安，全家就安心！'",
            "trustDelta": 20,
            "courageDelta": 10,
            "healthDelta": 10
          }
        ]
      }
    ]
  },
  {
    "id": "zi_nv",
    "name": "成才的儿女",
    "role": "风华正茂的新一代 · 事业接班人",
    "category": "life",
    "avatar": "🎓",
    "trust": 80,
    "dialogues": [
      {
        "text": "爸/妈，我刚刚拿到顶级学府的博士学位。有人劝我留在海外进大投行，但我决定回国！我想用我学到的前沿知识，把您的事业推向更高峰！",
        "options": [
          {
            "text": "【欣慰鼓励：'好孩子！从基层车间与一线业务扎扎实实干起，我为你护航！'】",
            "reply": "儿女目光坚定：'绝不让您失望，我要做靠真本事说话的创二代！'",
            "trustDelta": 20,
            "repDelta": 25,
            "iqDelta": 15
          },
          {
            "text": "【支持其独立创立下一代新兴科技文创子公司，给予两千万天使资金】",
            "reply": "儿女斗志昂扬：'我们要在全新的赛道上青出于蓝而胜于蓝！'",
            "trustDelta": 25,
            "courageDelta": 20,
            "capitalDelta": -50000,
            "repDelta": 30
          }
        ]
      }
    ]
  },
  {
    "id": "char_angela_hr",
    "name": "Angela 陆",
    "role": "外企跨国资深猎头合伙人 · 职场星探",
    "category": "biz",
    "avatar": "👠",
    "trust": 55,
    "dialogues": [
      {
        "text": "我手里握着三家纳斯达克准上市科技独角兽的C-Level高管定向寻访委托。看你的履历非常硬核，想不想听听五百万年薪+全球合伙人股权的Package？",
        "options": [
          {
            "text": "【礼貌倾听，借机了解顶级猎头市场对高端复合型人才的定价风向】",
            "reply": "Angela眼神赞许：'聪明！随时掌握自身市场身价，是顶级职业经理人的必修课。'",
            "trustDelta": 20,
            "eqDelta": 15,
            "repDelta": 15
          },
          {
            "text": "【婉拒猎头挖角，表明自己深耕当前实业、亲自做实控人的战略定力】",
            "reply": "Angela肃然起敬：'有魄力！我就欣赏有自己宏大愿景的真正实业家！'",
            "trustDelta": 25,
            "courageDelta": 25
          }
        ]
      },
      {
        "text": "最近全球供应链高管薪酬倒挂严重，好几家出海巨头托我物色一位懂跨国财税与本地化合规的定海神针。我想到了你。",
        "options": [
          {
            "text": "【引荐自己精心培养并独当一面的年轻总监，互利共赢扩展人脉版图】",
            "reply": "Angela惊喜万分：'太靠谱了！候选人背景完美匹配，这笔人情我Angela记下了！'",
            "trustDelta": 30,
            "repDelta": 25,
            "capitalDelta": 40000
          },
          {
            "text": "【以客座顾问身份协助其设计全球化股权激励体系，收取高额咨询顾问费】",
            "reply": "Angela拍案叫绝：'大师级方案！客户董事会赞不绝口！'",
            "trustDelta": 20,
            "iqDelta": 20,
            "capitalDelta": 80000
          }
        ]
      }
    ]
  },
  {
    "id": "char_dr_zhao_tcm",
    "name": "赵悬壶",
    "role": "国医大师亲传弟子 · 悬壶堂老中医",
    "category": "med",
    "avatar": "🍵",
    "trust": 60,
    "dialogues": [
      {
        "text": "看你面色微黄、脉象弦细，最近夜以继日拼搏耗损了心脾气血。医者治病，圣人治未病，这服古法炮制的黄芪党参膏滋你且拿去调理。",
        "options": [
          {
            "text": "【虚心求教中医脏腑调和之法，并请教中西医结合重症康复课题】",
            "reply": "赵老抚须微笑：'中西汇通，方为大医！老夫这里有几张传世验方愿与你切磋！'",
            "trustDelta": 25,
            "healthDelta": 15,
            "iqDelta": 15
          },
          {
            "text": "【资助悬壶堂联合科研院所开展传统中药名方现代化提纯与双盲临床研究】",
            "reply": "赵老热泪盈眶：'让老祖宗的瑰宝走向世界，善莫大焉！'",
            "trustDelta": 30,
            "repDelta": 25,
            "cleanDelta": 20,
            "capitalDelta": -20000
          }
        ]
      },
      {
        "text": "海外医药财团一直试图低价买断我国名贵道地药材古法炮制秘方，老夫一把年纪，绝不出卖祖宗基业！",
        "options": [
          {
            "text": "【运用现代知识产权与地理标志保护法，为道地药材铸造国家级非遗铁壁】",
            "reply": "赵老紧握你手：'苍生有幸！古方终于有了现代法律护身符！'",
            "trustDelta": 35,
            "cleanDelta": 25,
            "repDelta": 30
          },
          {
            "text": "【设立专项中医药现代化传承基金，支持年轻学徒潜心继承古法炮制技艺】",
            "reply": "赵老连声道谢：'薪火相传，弦歌不辍！'",
            "trustDelta": 25,
            "repDelta": 20,
            "eqDelta": 15
          }
        ]
      }
    ]
  },
  {
    "id": "char_pharmacist_lin",
    "name": "林芷若",
    "role": "原创新药靶点研发总监 · 海归药学博士",
    "category": "med",
    "avatar": "🧪",
    "trust": 50,
    "dialogues": [
      {
        "text": "我们筛选了三年的一类抗癌抗体分子在二期临床遭遇了溶解度瓶颈，如果两周内找不到新型脂质纳米载体递送方案，项目将被资方叫停。",
        "options": [
          {
            "text": "【跨界联络微流控纳米科研攻关组，彻夜联手攻破脂质体包裹技术大关！】",
            "reply": "林芷若激动拥抱：'突破了！靶向药物分子完美穿透血脑屏障！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "repDelta": 20
          },
          {
            "text": "【垫资两百万元从海外紧急订购高纯度药用辅料，保全管线临床进度】",
            "reply": "林芷若眼含热泪：'患难见真情！新药成功上市后你拥有全球首发专利分成！'",
            "trustDelta": 30,
            "courageDelta": 20,
            "capitalDelta": -20000,
            "repDelta": 30
          }
        ]
      }
    ]
  },
  {
    "id": "char_ai_scientist_dr_lu",
    "name": "陆启博士",
    "role": "前沿通用智能大模型首席科学家",
    "category": "tech",
    "avatar": "🧠",
    "trust": 55,
    "dialogues": [
      {
        "text": "万卡算力集群在大规模分布式混合并行训练时突发严重的梯度爆炸与通信网络拓扑拥塞，每停滞一小时就白白损耗二十万元算力电费！",
        "options": [
          {
            "text": "【设计新型自适应张量并行切分算法与拓扑感知梯度压缩协议，瞬间化解拥塞】",
            "reply": "陆启惊为天人：'太神了！千亿参数模型收敛曲线完全平稳！'",
            "trustDelta": 25,
            "iqDelta": 30,
            "repDelta": 25
          },
          {
            "text": "【果断重构算力流水线切片，牺牲10%显存换取全集群绝对通信容错】",
            "reply": "陆启由衷佩服：'实战经验极度丰富，集群稳定运行三十天零故障！'",
            "trustDelta": 20,
            "iqDelta": 20,
            "courageDelta": 15
          }
        ]
      }
    ]
  },
  {
    "id": "char_quantum_researcher_tang",
    "name": "唐工",
    "role": "极紫外光刻机高精度双工件台核心设计师",
    "category": "tech",
    "avatar": "🔬",
    "trust": 50,
    "dialogues": [
      {
        "text": "双工件台在百纳米加速度下的激光干涉测微震动幅度超标了0.3纳米，这道鸿沟卡了我们整整十四个月。是放弃还是彻底推倒底层动力学拓扑重来？",
        "options": [
          {
            "text": "【破釜沉舟！推倒传统机械悬挂，引入磁悬浮主动阻尼与高精度实时补偿算法】",
            "reply": "唐工眼角湿润：'测微计归零了！我们终于造出了中国人自己的亚纳米工件台！'",
            "trustDelta": 30,
            "courageDelta": 30,
            "iqDelta": 25,
            "repDelta": 35
          },
          {
            "text": "【查阅苏联绝密动力学力学老文献，提炼出非线性谐振吸收经验构件】",
            "reply": "唐工大喜过望：'老前辈的力学直觉太震撼了！指标全部达标！'",
            "trustDelta": 20,
            "iqDelta": 20,
            "repDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "char_security_whitehat_k",
    "name": "K神",
    "role": "国家漏洞库核心特聘白帽黑客 · 网络安全专家",
    "category": "tech",
    "avatar": "🕶️",
    "trust": 60,
    "dialogues": [
      {
        "text": "境外APT高级黑客组织正在利用某工业控制系统的零日漏洞渗透沿海智能变电站，我追踪到了他们的C2控制服务器跳板，必须在一分钟内拔掉恶意木马！",
        "options": [
          {
            "text": "【反向构造诱饵沙箱引蛇入洞，瞬间逆向提取其恶意攻击特征码并全网同步封堵】",
            "reply": "K神键盘敲得飞起：'漂亮绝杀！国家计算机网络应急中心为你记特等功！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "courageDelta": 20,
            "repDelta": 30
          },
          {
            "text": "【果断物理隔离核心交换机，牺牲局部遥测日志换取全电网绝对物理安全】",
            "reply": "K神松了口气：'稳准狠！电网毫秒未受损，危机彻底化解！'",
            "trustDelta": 20,
            "courageDelta": 20,
            "repDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "char_seed_breeder_he",
    "name": "何老总农艺师",
    "role": "南繁育种基地主任 · 杂交水稻功勋元老",
    "category": "agri",
    "avatar": "🌾",
    "trust": 65,
    "dialogues": [
      {
        "text": "今年超强台风把三亚试验田吹得一片狼藉，但有一垄耐盐碱野生海水稻株系奇迹般挺立！只要小心人工授粉，这就是中国人未来的万亩良田！",
        "options": [
          {
            "text": "【卷起裤腿跳进泥泞水田，通宵人工套袋授粉抢救保全珍贵亲本良种】",
            "reply": "何老老泪纵横：'好孩子！这才是当代农科学者的赤子脊梁！'",
            "trustDelta": 30,
            "healthDelta": 5,
            "cleanDelta": 20,
            "repDelta": 30
          },
          {
            "text": "【引入全封闭防风智能移动遮雨大棚，利用自动化温湿度调控保护幼穗】",
            "reply": "何老赞叹：'新式温控大棚帮了大忙，老头子我大开眼界！'",
            "trustDelta": 25,
            "iqDelta": 20,
            "capitalDelta": -10000,
            "repDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "char_smart_greenhouse_eva",
    "name": "Eva 梁",
    "role": "垂直智慧植物工厂创始人 · 瓦赫宁根海归硕士",
    "category": "agri",
    "avatar": "🌱",
    "trust": 50,
    "dialogues": [
      {
        "text": "传统大棚靠天吃饭，我们在地下车库建立的十层LED光谱立体植物工厂，水肥全自动内循环，每平米产量是传统土地的八十倍！只是初期电力光照成本居高不下。",
        "options": [
          {
            "text": "【为其接入工业园区低谷余热与光伏绿电储能系统，将综合能耗骤降60%！】",
            "reply": "Eva激动跳起：'单位毛利转正了！我们拿到了天使轮千万投资！'",
            "trustDelta": 25,
            "iqDelta": 25,
            "capitalDelta": 50000,
            "repDelta": 20
          },
          {
            "text": "【协助其开发高端米其林餐厅定制微型功能蔬菜供应链，主打极高溢价】",
            "reply": "Eva佩服不已：'商业眼光精准！每公斤羽衣甘蓝卖出了肉价！'",
            "trustDelta": 20,
            "eqDelta": 20,
            "capitalDelta": 40000
          }
        ]
      }
    ]
  },
  {
    "id": "char_game_producer_ark",
    "name": "方舟",
    "role": "单机动作神话游戏制作人 · 独立游戏人",
    "category": "art",
    "avatar": "🎮",
    "trust": 55,
    "dialogues": [
      {
        "text": "国内投资人都劝我们转做氪金换皮手游，说三年做主机单机必死无疑。我们七个人挤在破厂房里天天吃泡面做动作捕捉，为的就是给中国单机挣一口气！",
        "options": [
          {
            "text": "【坚定给予战略种子资金支持，鼓励其坚守匠心打磨世界级战斗手感】",
            "reply": "方舟热血沸腾：'知音！首发试玩预告片播放量突破一亿，全球玩家都在期待！'",
            "trustDelta": 30,
            "courageDelta": 25,
            "repDelta": 30,
            "capitalDelta": 60000
          },
          {
            "text": "【牵线国家级古建文保单位，提供几十处国宝级悬塑与石窟高精度扫描模型】",
            "reply": "方舟热泪盈眶：'东方审美震撼全球！海外媒体争相报道中国古建奇迹！'",
            "trustDelta": 35,
            "repDelta": 35,
            "iqDelta": 20
          }
        ]
      }
    ]
  },
  {
    "id": "char_heritage_restorer_liu",
    "name": "刘师傅",
    "role": "故宫古书画装裱修复国家级非遗名家",
    "category": "art",
    "avatar": "📜",
    "trust": 60,
    "dialogues": [
      {
        "text": "这幅宋代佚名绢本设色山水画，历经千年虫蛀霉变，丝绢脆若蝉翼。必须用天然马蹄刀一点点剔除旧命纸，稍微手抖哪怕半毫米，国宝就彻底毁了。",
        "options": [
          {
            "text": "【屏气凝神在旁递送特制羊毫排笔与古法浆糊，静心体会传统非遗之定力】",
            "reply": "刘师傅欣慰颔首：'心浮气躁者成不了大器，你的心性沉得住，有大将之风！'",
            "trustDelta": 25,
            "cleanDelta": 20,
            "eqDelta": 20,
            "iqDelta": 15
          },
          {
            "text": "【采用高光谱多光谱无损照相成像，为刘师傅提供肉眼难见的底层暗线线索】",
            "reply": "刘师傅惊喜连连：'现代高科技与古老手艺相得益彰，残卷天衣无缝！'",
            "trustDelta": 30,
            "iqDelta": 25,
            "repDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "char_pop_singer_aria",
    "name": "Aria 林",
    "role": "先锋新国风唱作人 · 民族交响电音先驱",
    "category": "art",
    "avatar": "🎵",
    "trust": 55,
    "dialogues": [
      {
        "text": "流量平台算法都在逼歌手做十五秒短视频洗脑神曲，我偏要把陕北信天游、江南评弹与好莱坞交响乐融为一炉做史诗概念大碟。你觉得这是自寻死路吗？",
        "options": [
          {
            "text": "【毫不犹豫肯定其艺术探索！真正的民族文化自信从来不怕曲高和寡！】",
            "reply": "Aria双眼放光：'新专辑横扫金曲奖三大桂冠！海外巡演场场售罄！'",
            "trustDelta": 30,
            "repDelta": 30,
            "eqDelta": 20
          },
          {
            "text": "【建议配合高质量东方舞剧巡演与纪录片深度宣发，打造立体文化IP】",
            "reply": "Aria深以为然：'格局打开了！全网国风爱好者奔走相告！'",
            "trustDelta": 25,
            "iqDelta": 20,
            "repDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "char_arbitrator_victoria",
    "name": "Victoria 郑",
    "role": "国际商事海事仲裁院首席中国籍仲裁员",
    "category": "law",
    "avatar": "⚖️",
    "trust": 60,
    "dialogues": [
      {
        "text": "在新加坡与伦敦的国际仲裁庭上，英美法系律师动辄援引先例法孤立中方当事人。涉外法治不仅是技术，更是捍卫国家海权与企业海外正当权益的无声战场。",
        "options": [
          {
            "text": "【精准援引《联合国国际货物销售合同公约》管辖权豁免条款，一击必杀反败为胜】",
            "reply": "Victoria肃然起敬：'逻辑严丝合缝！为中资企业挽回十亿美元海外资产！'",
            "trustDelta": 30,
            "iqDelta": 30,
            "repDelta": 35,
            "courageDelta": 20
          },
          {
            "text": "【主持起草并发布符合东方利益平衡原则的新型国际绿色能源海事仲裁示范规则】",
            "reply": "Victoria赞不绝口：'东方智慧登上世界舞台，国际仲裁界震动！'",
            "trustDelta": 35,
            "repDelta": 40,
            "cleanDelta": 25
          }
        ]
      }
    ]
  },
  {
    "id": "char_legal_aid_sister_chen",
    "name": "陈大姐",
    "role": "街道社区公益法律援助律师 · 群众暖心人",
    "category": "law",
    "avatar": "☂️",
    "trust": 65,
    "dialogues": [
      {
        "text": "农民工兄弟在工地干了一整年，包工头卷款跑路，几十个家庭等着钱看病交学费过年。我哪怕不吃不睡，也得通过劳动仲裁和代位权把这笔血汗钱追回来！",
        "options": [
          {
            "text": "【带头连夜固定劳务考勤与转账流水完整证据链，申请法院诉前财产保全冻结资产】",
            "reply": "陈大姐激动得热泪盈眶：'钱全部追回来了！工友们自发敲锣打鼓送来三面锦旗！'",
            "trustDelta": 30,
            "cleanDelta": 30,
            "repDelta": 35,
            "eqDelta": 20
          },
          {
            "text": "【个人先行垫付五万元应急路费，让工友们安心踏上返乡列车，后续从容诉讼】",
            "reply": "陈大姐感动落泪：'仁者爱人！你是老百姓心里真正的青天！'",
            "trustDelta": 35,
            "cleanDelta": 25,
            "repDelta": 30,
            "capitalDelta": -10000
          }
        ]
      }
    ]
  },
  {
    "id": "char_neighborhood_uncle_liu",
    "name": "老刘头",
    "role": "四合院传达室看门大爷 · 街坊邻里活地图",
    "category": "life",
    "avatar": "🚲",
    "trust": 70,
    "dialogues": [
      {
        "text": "甭管你在外头当多大的官、赚几亿的银子，回到这条胡同，在大爷眼里你永远是当年那个摔跤磕破膝盖不哭鼻子的小娃子。来，尝尝你大妈刚烙的芝麻烧饼！",
        "options": [
          {
            "text": "【接过热乎乎的烧饼大口嚼着，陪大爷在树荫下下一盘象棋，听取街坊生活冷暖】",
            "reply": "老刘头乐开花：'好！不忘本！不飘！走到哪儿都踏踏实实接地气！'",
            "trustDelta": 25,
            "eqDelta": 20,
            "healthDelta": 10,
            "cleanDelta": 15
          },
          {
            "text": "【为大杂院出资翻新适老化扶手、无障碍坡道与公共太阳能淋浴间】",
            "reply": "老刘头逢人便夸：'这孩子出息了真想着街坊，积大德了！'",
            "trustDelta": 30,
            "repDelta": 25,
            "cleanDelta": 20,
            "capitalDelta": -5000
          }
        ]
      }
    ]
  },
  {
    "id": "char_life_tea_master_su",
    "name": "苏掌柜",
    "role": "老城厢百年茶楼掌柜 · 烟火清欢解语人",
    "category": "life",
    "avatar": "🍵",
    "trust": 75,
    "dialogues": [
      {
        "text": "浮生偷得半日闲。你整日为家国大计操劳奔波，眉宇间总攒着解不开的重任。今天到了老朽的茶馆，只论草木清欢，不论案头公文。尝尝今年清明前头一采的狮峰龙井，如何？",
        "options": [
          {
            "text": "【静坐临窗小桌，洗盏沏茶细品回甘，向老掌柜请教民间市井安宁之法】",
            "reply": "苏掌柜抚须微笑：'心静则万物莫乱。这一盏茶能让你心旷神怡，老朽这茶坊就没白开！'",
            "trustDelta": 25,
            "healthDelta": 15,
            "eqDelta": 20,
            "resilienceDelta": 20
          },
          {
            "text": "【出资助修老茶楼屋顶漏雨灰瓦，并设立传统评书非遗茶席公益角】",
            "reply": "苏掌柜躬身作揖：'保全了老城厢的一处烟火文脉，百姓听书品茗，常念您的厚德！'",
            "trustDelta": 30,
            "repDelta": 25,
            "cleanDelta": 20,
            "capitalDelta": -6000
          }
        ]
      }
    ]
  },
  {
    "id": "char_life_old_neighbor_wang",
    "name": "王大娘",
    "role": "热心快肠大院居委会退休主任 · 街坊邻里知心人",
    "category": "life",
    "avatar": "🥟",
    "trust": 72,
    "dialogues": [
      {
        "text": "大冷天的又加班这么晚！身体是革命的本钱，你年轻时就不知道爱惜自己。大娘刚包好了热气腾腾的猪肉茴香水饺，赶紧趁热吃一碗，别把胃饿坏了！",
        "options": [
          {
            "text": "【吃下一大碗热乎水饺，与大娘围炉话家常，倾听社区独居老人与双职工家庭的切实难处】",
            "reply": "王大娘眼泛泪光：'还是当年的热心肠！位子再高，心里始终装着大院老百姓的油盐酱醋！'",
            "trustDelta": 25,
            "healthDelta": 12,
            "eqDelta": 22,
            "cleanDelta": 18
          },
          {
            "text": "【协调慈善基金会与街道，为老旧小区铺设防滑步道并资助老年幸福食堂】",
            "reply": "王大娘拍手称快：'小区里几十位高龄老人吃上热乎饭了，大伙都夸你是个大好人！'",
            "trustDelta": 30,
            "repDelta": 28,
            "cleanDelta": 22,
            "capitalDelta": -5000
          }
        ]
      }
    ]
  },
  {
    "id": "char_life_sent_down_friend",
    "name": "方志强",
    "role": "青年插队同窑知青旧友 · 退休农机修造站老站长",
    "category": "life",
    "avatar": "🌾",
    "trust": 78,
    "dialogues": [
      {
        "text": "老伙计！一晃四十年过去了！还记得当年在黄土高坡上，咱们俩裹着一件军大衣在煤油灯下啃高粱饼、畅谈未来建设新中国的日子吗？今天重逢，啥也不图，就想听你句掏心窝子话！",
        "options": [
          {
            "text": "【紧紧握住老友满是老茧的手，彻夜围炉叙旧，共同追忆当年艰苦奋斗的初心与激情】",
            "reply": "方老热泪盈眶：'老朋友，你初心未改！我就知道当年咱俩发过的誓愿，你一天都没忘！'",
            "trustDelta": 30,
            "resilienceDelta": 25,
            "courageDelta": 20,
            "cleanDelta": 20
          },
          {
            "text": "【出资为老插队村庄设立乡村农机传帮带工作室，支持老友发挥余热培育年轻农机能手】",
            "reply": "方老激动拍腿：'太好了！村里几十台老拖拉机和联合收割机又有着落了，这辈子值了！'",
            "trustDelta": 35,
            "repDelta": 26,
            "cleanDelta": 20,
            "capitalDelta": -8000
          }
        ]
      }
    ]
  },
  {
    "id": "char_life_old_apothecary_chen",
    "name": "陈老药师",
    "role": "百年国药老字号掌门老药师 · 岐黄调摄世外伯乐",
    "category": "life",
    "avatar": "🌿",
    "trust": 74,
    "dialogues": [
      {
        "text": "望闻问切，你这脉象弦紧而涩，是多年熬夜思虑过度、损耗了先天真元。治天下之病，先治一身之疾。老朽这里有一盒遵古法炮制的九蒸九晒黄精膏，每日晨起服一勺，善自珍重啊！",
        "options": [
          {
            "text": "【恭敬受教，遵医嘱调理作息与呼吸吐纳，向老先生虚心请教草木自然顺应四时之道】",
            "reply": "陈老微微颔首：'身心通泰则浩气长存。公忠体国之人，自当福寿绵长！'",
            "trustDelta": 25,
            "healthDelta": 25,
            "resilienceDelta": 18,
            "cleanDelta": 15
          },
          {
            "text": "【资助整理抢救老先生家传的孤本医案手稿，推动中医药民间古方数字化存档传承】",
            "reply": "陈老双手颤抖：'三代行医之秘不至湮没尘埃，你这是为神州杏林文脉立了大功！'",
            "trustDelta": 35,
            "repDelta": 30,
            "legacyScoreDelta": 40,
            "capitalDelta": -7000
          }
        ]
      }
    ]
  }
];


module.exports = {
  ENSEMBLE_CHARACTERS
};
