# -*- coding: utf-8 -*-
"""
大人物人生模拟器 (Big Shot Life Simulator) - 核心逻辑原型
"""
import random

class BigShotSimulator:
    def __init__(self):
        self.name = "林远舟"
        self.age = 0
        self.max_age = 83
        
        # 大人物核心维度
        self.vision = 50       # 战略眼界 (认知与时代嗅觉)
        self.courage = 50      # 枭雄魄力 (决断力、敢下重注的胆识)
        self.scheming = 50     # 权谋心术 (统御、制衡、人际政治)
        self.reputation = 20   # 时代声望 (社会公信力、历史地位)
        self.health = 95       # 生理健康
        self.capital = 0       # 资本积累 (人民币)
        
        # 人生阶位
        self.power_title = "草莽学子"
        self.family_background = ""
        self.talents = []
        self.chronicle = []    # 纪传体编年史
        self.family_status = {
            "spouse": None,
            "children": [],
            "dynasty_influence": 0
        }

    def init_birth(self):
        """随机出身与命格天赋"""
        origins = [
            ("三线小城工薪家庭", "虽无权财，但父母刚正坚毅，赋予了坚不可摧的底层逆袭决心", {"courage": +15, "health": +10, "capital": 5000}),
            ("江南书香望族余荫", "藏书万卷，自幼受教于政经名宿，博弈心术极深", {"vision": +20, "scheming": +15, "capital": 50000}),
            ("戎马军旅大院子弟", "作风铁血，说一不二，天生自带令人臣服的将帅威严", {"courage": +25, "reputation": +15, "capital": 30000}),
            ("沿海破产商人后代", "早历世态炎凉与催债屈辱，对金钱与危机有野兽般的直觉", {"vision": +15, "scheming": +20, "capital": 2000}),
        ]
        chosen = random.choice(origins)
        self.family_background = chosen[0]
        self.record_event(0, f"你降生于【{self.family_background}】。{chosen[1]}。")
        for k, v in chosen[2].items():
            setattr(self, k, getattr(self, k) + v)

        talent_pool = [
            ("【过目不忘】", "心智绝伦，对复杂信息与商业财报一眼洞穿", {"vision": +15}),
            ("【枭雄气场】", "天生具有令人信服的统御威严，下属誓死追随", {"scheming": +15, "courage": +10}),
            ("【时代弄潮儿】", "对历史大势的感知超越常人，总能押中关键风口", {"vision": +20}),
            ("【钢铁意志】", "哪怕跌入万丈深渊亦能绝地反击，心智坚不可摧", {"courage": +15, "health": +10}),
        ]
        self.talents = random.sample(talent_pool, 2)
        for t_name, t_desc, t_buff in self.talents:
            for k, v in t_buff.items():
                setattr(self, k, getattr(self, k) + v)

        t_str = "、".join([f"{t[0]}({t[1]})" for t in self.talents])
        self.record_event(0, f"觉醒命格天命：{t_str}。")

    def record_event(self, age, text):
        self.chronicle.append((age, text))

    def format_money(self, amount):
        if amount >= 100000000000:
            return f"{amount / 100000000000:.1f}千亿"
        elif amount >= 100000000:
            return f"{amount / 100000000:.2f}亿"
        elif amount >= 10000:
            return f"{amount / 10000:.1f}万"
        else:
            return f"{amount}元"

    def run_simulation(self):
        self.init_birth()
        
        # 历史宏大事件链 (涵盖时代破局、资本博弈、执掌产业、门阀布局)
        events_timeline = {
            7: ("启蒙与心性", [
                ("在私塾与少年宫通读《资治通鉴》与近现代战争史，早慧惊人，立下'大丈夫当如是'之宏愿", {"vision": +10, "scheming": +5}),
                ("在学校与街巷聚拢一批生死死党，小小年纪令众人心悦诚服，初显枭雄领袖气质", {"courage": +15, "reputation": +5})
            ]),
            18: ("青年立世：大学分流", [
                ("以全省理科前十考入最高学府微电子与理论物理系，立志'造国之重器以定乾坤'", {"vision": +15, "reputation": +10}),
                ("考入顶级法政与经管学院，结识未来一批核心部委与政商门阀的同窗挚友", {"scheming": +15, "vision": +10})
            ]),
            23: ("时代风口：第一桶金", [
                ("精准捕捉移动互联网与半导体浪潮，创立高端硬科技企业，连熬三个月研发出核心专利，一举破局", {"courage": +20, "health": -10, "capital": 25000000, "title": "科技新锐黑马"}),
                ("投身产业资本并购，利用高超对赌杠杆在初级市场连续阻击四起并购案，斩获数千万原始积累", {"scheming": +20, "courage": +15, "capital": 50000000, "title": "资本操盘新星"})
            ]),
            29: ("资本围剿与绝境反杀", [
                ("老牌跨国巨头联手本土资本发起恶意围剿，企图以三倍低价强制收购你的心血。你断然拒绝，抵押全副身家誓死对赌研发自主架构！", {"courage": +25, "vision": +20, "capital": 350000000, "reputation": +25, "title": "行业领军先锋"}),
                ("在商界死局中长袖善舞，引入国家级战略新兴产业基金与顶级央企背书，借力打力反向吞并对手，一战成名！", {"scheming": +25, "reputation": +30, "capital": 800000000, "title": "产融战略巨头"})
            ]),
            36: ("问鼎行业龙头 & 门阀联姻", [
                ("集团于港交所与纳斯达克双重敲钟上市，市值突破800亿！迎娶世家名门知性千金，强强联合奠定在京圈与沪上的核心人脉", {"reputation": +30, "capital": 12000000000, "spouse": "世家名门后裔·海外智库理事", "title": "商界巨擘"}),
                ("拒绝外资天价收购，果断斥巨资横向整合整条上游稀土与核心元器件产业链。与相濡以沫的创业并肩合伙人缔结婚盟", {"vision": +30, "courage": +25, "capital": 9500000000, "spouse": "实业财团联合创始人", "title": "民族工业脊梁"})
            ]),
            43: ("大国博弈：卡脖子攻坚战", [
                ("海外大国宣布实施最高级别单边技术制裁。你召开全集团两万人誓师大会，当众宣布：每年全额投入80%利润，哪怕连亏十年，也要砸穿高端光刻与核心芯片封锁！", {"vision": +35, "courage": +30, "reputation": +45, "capital": -3000000000, "title": "国之栋梁"}),
                ("在全球离岸金融中心暗中布设暗网影子供应链与海外离岸基金，通过穿透式股权在海外暗度陈仓，牢牢掌控全球产业命脉", {"scheming": +35, "capital": 38000000000, "reputation": +20, "title": "暗影财阀教父"})
            ]),
            51: ("登临绝顶：突破封锁与时代加冕", [
                ("历经九年卧薪尝胆，千亿研发终见奇迹！全国产自主制程超级芯片正式量产！打破西方三十年垄断！最高领袖亲自授予国家最高科学技术奖特等勋章！", {"reputation": +50, "capital": 88000000000, "title": "时代教父"}),
                ("重组跨国超级财团，横跨半导体、商业航天、深海探测与新能源，位列《财富》全球最具权势领袖前十位", {"vision": +30, "capital": 180000000000, "scheming": +25, "title": "全球产业寡头"})
            ]),
            59: ("世家开宗：九子夺嫡与权杖筹谋", [
                ("出资设立千亿规模'远舟前沿科学基金会'与离岸家族信托。长子执掌产业实业，次女进入联合国与国家核心智库，家族门阀蔚然成型", {"dynasty_influence": 95, "reputation": +25, "title": "百年望族家主"}),
                ("推行极其严苛的《家族百年宪章》，引入外部贤能共治模式与淘汰赛马制，彻底奠定跨越周期的世家统治力", {"dynasty_influence": 98, "scheming": +30, "title": "铁血家督"})
            ]),
            69: ("英雄暮年：健康报警与退居幕后", [
                ("因年轻时数十次危机攻坚过度透支心力，突发心脑血管危机，私人医疗专机与国医大师联手施救脱险，正式退居幕后，将帅印交接下一代", {"health": -35, "reputation": +15, "title": "隐世元老"}),
                ("在西湖侧隐居别苑静养，门生故吏遍布各部委高层与万亿企业CEO，重大国策出台前高层常有特使登门问策", {"health": -25, "scheming": +15, "reputation": +20, "title": "当代帝师"})
            ]),
            79: ("世纪回响：散尽千金与训诫子孙", [
                ("宣布将个人名下绝大部分股权无偿划归国家实验室与民生慈善信托，资助百万学子寒门出贵子，举国赞颂其'公忠体国，一代完人'", {"reputation": +40, "capital": -50000000000, "dynasty_influence": +20}),
                ("在家族宗祠亲手题写家训：'天下之本在国，国之本在家。不与民争微利，当为天下开太平'", {"reputation": +25, "dynasty_influence": +35})
            ]),
            83: ("巨星陨落：大风落幕", [
                ("于祖宅安详离世。灵车过处十里相送，多国政要致电吊唁。主流媒体头版通栏长篇生平：'深切缅怀这位改变了国家工业命运的时代伟人'", {})
            ])
        }

        while self.age <= 83:
            # 基础衰老机制
            if self.age > 45:
                self.health -= random.randint(1, 2)
            
            # 资本自然增长与分红
            if self.capital > 0:
                roi = random.uniform(0.04, 0.10)
                self.capital = int(self.capital * (1 + roi))

            if self.age in events_timeline:
                title, choices = events_timeline[self.age]
                # 随机或根据性格抉择
                chosen_option, buffs = random.choice(choices)
                
                self.record_event(self.age, f"【{title}】\n  决断：{chosen_option}")
                for k, v in buffs.items():
                    if k == "title":
                        self.power_title = v
                    elif k == "spouse":
                        self.family_status["spouse"] = v
                    elif k == "dynasty_influence":
                        self.family_status["dynasty_influence"] += v
                    elif hasattr(self, k):
                        setattr(self, k, getattr(self, k) + v)

            self.age += 1

    def generate_report(self):
        """生成大人物盖棺定论报告"""
        res = []
        res.append("*" * 64)
        res.append(f"  ★ 时代人物志：【{self.power_title}】{self.name} 之生平大传 ★")
        res.append("*" * 64)
        res.append(f"【出身背景】：{self.family_background}")
        res.append(f"【享年岁数】：83 岁 (寿终正寝，国士待之)")
        res.append(f"【巅峰身家】：约 {self.format_money(self.capital)}")
        res.append(f"【历史声望】：{self.reputation} / 100 (名列当代史册，青史留名)")
        res.append(f"【门阀底蕴】：{self.family_status['dynasty_influence']} / 100 (奠定家族百年基业)")
        res.append(f"【联姻伴侣】：{self.family_status['spouse']}")
        res.append("-" * 64)
        res.append("【一生波澜壮阔之编年史】:")
        for age, ev in self.chronicle:
            res.append(f"\n[岁在 {age:02d}] {ev}")
        res.append("\n" + "=" * 64)
        res.append("【太史公 / 时代盖棺定论】:")
        res.append(f"  赞曰：")
        res.append(f"  '{self.name}起于微末，而怀吞吐天地之志。在国之危难、技术封锁之秋，")
        res.append(f"   孤注一掷砸下千亿身家，破西方数十年垄断之局，成国之脊梁。")
        res.append(f"   对内整饬家风，创立百年门阀；对外散尽千金，福泽万千寒门。")
        res.append(f"   生执天下牛耳，没享万民敬仰。真当代国士，不世出之枭雄也！'")
        res.append("*" * 64)
        return "\n".join(res)

if __name__ == "__main__":
    sim = BigShotSimulator()
    sim.run_simulation()
    print(sim.generate_report())
