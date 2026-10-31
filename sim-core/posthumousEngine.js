/**
 * sim-core/posthumousEngine.js
 * 《华夏世家》谥号与家谱评语引擎 (Posthumous Name & Chronicle Epitaph)
 * 落实 v3 方案：根据存续寿数、四维等第、大劫战果与家风德行授予谥号，生成 16~24 字史诗家谱评语
 */

class PosthumousEngine {
  /**
   * 谥号字库与法度 (周公谥法 / 汉魏世家定制)
   */
  static get POSTHUMOUS_TITLES() {
    return {
      S_TIER: [
        { title: '文成', comment: '经纬天地曰文，安民立政曰成。名列鼎食，万家生佛。' },
        { title: '武烈', comment: '威强叡德曰武，有功安民曰烈。克平大憝，勋冠当世。' },
        { title: '昭宪', comment: '容仪恭美曰昭，博闻多能曰宪。光辅国祚，海内景仰。' }
      ],
      A_TIER: [
        { title: '忠肃', comment: '危身奉上曰忠，刚德克就曰肃。匡扶乱世，家道炽昌。' },
        { title: '景穆', comment: '由义而济曰景，布德执义曰穆。保境全宗，士林矜式。' },
        { title: '明懿', comment: '照临四方曰明，温柔圣善曰懿。经纶世济，德音不瑕。' }
      ],
      B_PLUS_TIER: [
        { title: '端毅', comment: '守礼执敬曰端，致果杀敌曰毅。操持中节，克保家业。' },
        { title: '安惠', comment: '好和不争曰安，柔质慈民曰惠。逢迎板荡，全族以终。' },
        { title: '恭恪', comment: '尊贤贵贵曰恭，敬顺事上曰恪。守成有度，弗坠家声。' }
      ],
      B_TIER: [
        { title: '中庸', comment: '无过无不及曰中，修德保身曰庸。泯然众生，平淡归真。' },
        { title: '齐慎', comment: '好学审问曰齐，谨身保家曰慎。未立殊勋，差免颠覆。' }
      ],
      C_TIER: [
        { title: '悼愍', comment: '肆行劳民曰悼，在国遭忧曰愍。天不祚世，中道赍志。' },
        { title: '衰简', comment: '治家少方曰衰，临民无恪曰简。家道中阻，流离失所。' }
      ],
      D_TIER: [
        { title: '荒缪', comment: '好乐怠政曰荒，名与实爽曰缪。覆军折衄，宗社沦亡。' },
        { title: '幽厉', comment: '早孤短折曰幽，杀戮无辜曰厉。暴殄天物，宗祀断绝。' }
      ]
    };
  }

  /**
   * 裁定当家人的谥号与评语
   * @param {Object} runEvaluation 局末评分对象
   * @param {Object} context 局内上下文 (age, meters, calamityResults, vowResult)
   */
  static evaluatePosthumous({ runEvaluation, context = {} }) {
    const grade = runEvaluation.grade || 'B';
    const titles = PosthumousEngine.POSTHUMOUS_TITLES;
    const pool = titles[`${grade.replace('+', '_PLUS')}_TIER`] || titles.B_TIER;

    // 依倾向选择具体谥号
    let chosen = pool[0];
    const isMilitary = (context.meters?.force || 50) > (context.meters?.prestige || 50);

    if (pool.length > 1) {
      chosen = isMilitary ? pool[1 % pool.length] : pool[0];
    }

    // 生成四言家谱长卷追述 (16~24字)
    const epitaph = PosthumousEngine._generateEpitaph({
      grade,
      age: context.age || 70,
      isDead: context.isDead,
      isRetired: context.isRetired,
      calamityWins: (context.calamityResults || []).filter(c => c.survived).length
    });

    return {
      posthumousTitle: `【${chosen.title}公】`,
      shortTitle: chosen.title,
      definition: chosen.comment,
      genealogyEpitaph: epitaph,
      clanChronicleCard: {
        title: chosen.title,
        grade,
        epitaph,
        tenure: `世袭当家 ${Math.max(1, (context.age || 60) - 20)} 载`
      }
    };
  }

  static _generateEpitaph({ grade, age, isDead, isRetired, calamityWins }) {
    if (grade === 'S') {
      return '秉正持家，力定狂澜。克平三劫，名冠华夏。宗族极盛，百世流芳。';
    }
    if (grade === 'A') {
      return '修德固本，保境安民。逢迎乱世，不坠清规。家业炽昌，后人景仰。';
    }
    if (grade === 'B+') {
      return '持筹守成，谨慎自保。虽无赫赫，克免倾覆。香火延绵，宗谱载名。';
    }
    if (grade === 'B') {
      return '板荡飘摇，勉力支撑。平淡以终，未显峥嵘。族人离合，岁月无声。';
    }
    if (grade === 'C') {
      return '才力不逮，时运未周。兵火摧逼，家道衰微。幸全孑遗，待启来者。';
    }
    // D
    return '命舛数奇，兵燹及门。栋折榱崩，宗祠蒙尘。覆巢之痛，千古长叹。';
  }
}

module.exports = PosthumousEngine;
