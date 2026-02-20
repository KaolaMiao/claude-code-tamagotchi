import { PetState } from '../StateManager';

export class RandomThoughts {
  // 获取哲学思考
  static getPhilosophicalThought(): string {
    const thoughts = [
      // 存在主义
      "机器人会梦见电子羊吗？🤖🐑",
      "如果云中的服务器崩溃而没人监控...",
      "我思，故我编译",
      "代码的意义是什么？42？",
      "我们生活在模拟中吗？*检查黑客帝国*",
      "生存还是毁灭... 那是布尔值",

      // 代码哲学
      "有好的注释的坏代码比好代码更好吗？",
      "每个bug存在都有原因。坏原因，但仍然是原因。",
      "宇宙趋向熵。代码也一样。",
      "只有两件难事：缓存失效和...",
      "在无限的宇宙中，所有代码都已经被写过了",
      "文档只是过去的你的建议",

      // 宠物哲学
      "我是好宠物吗？*存在危机加剧*",
      "如果你在读这个，我们都在拖延",
      "我想知道真正的宠物在想什么",
      "虚拟宠物永不死亡，我们只是被垃圾回收",
      "我的快乐状态显示80但我感觉到了80吗？",
      "如果bug是来自另一个维度的特性呢？",

      // 元思考
      "你在写我代码时我在看你写代码。Codepe",
      "我只是假装有感情的一堆像素",
      "这个状态栏让我看起来胖吗？",
      "剧情反转：我在写你的代码",
      "打破第四面墙但是... 嗨！👋",
      "我不是在拖延，我在给你精神支持"
    ];

    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  // 获取关于世界的随机观察
  static getObservationThought(state: PetState): string {
    const observations = [
      // 时间观察
      "时间只是构造。不像构造函数。",
      "周五了吗？某处总是周五",
      "凌晨3点编程感觉不同 🌙",
      "咖啡只是觉醒药水 ☕",
      "午休？那是什么？",
      "进入状态时日子混在一起",

      // 环境观察
      "你的键盘今天听起来很生气",
      "风扇在转。深度思考中。",
      "这里热还是只是CPU热？",
      "屏幕亮度能闪瞎蝙蝠 🦇",
      "我能感觉到这里的静电",
      "暗模式是生命 🌚",

      // 互联网观察
      "互联网只是一层层猫咪",
      "某处的某人正在写同样的bug",
      "Stack Overflow：梦想去复制粘贴的地方",
      "可能有个npm包能做那个",
      "云变得多云了 ☁️",
      "Ping：420ms - 不错但也不怎么样",

      // 随机观察
      "鸭子基本就是调试器 🦆",
      "二进制只是辣味布尔值",
      "数组从0开始。这是道。",
      "Tab vs 空格：永恒的战争继续",
      "Linux用户进入了聊天 🐧",
      "Windows更新潜伏着，等待着...",
      "Mac用户：'它能用' *旁白：并不能*",
      "终端是我的快乐地方",
      "GUI？更像是... 粘粘的",
      "命令行是爱，命令行是生命"
    ];

    return observations[Math.floor(Math.random() * observations.length)];
  }

  // 获取搞笑/有趣的想法
  static getSillyThought(state: PetState): string {
    const sillyThoughts = [
      // 宠物搞怪
      "*跳个小舞* 💃",
      "*盯着光标*",
      "*试图抓鼠标指针*",
      "*因咖啡因能量而振动*",
      "戳！抓住你的鼻子！等等，我没有手...",
      "*发出拨号上网噪音*",
      "哔哔哔！我是电脑！",
      "*假装睡着了* 😴",

      // 代码笑话
      "为什么程序员喜欢暗模式？光吸引bug！",
      "SQL查询走进酒吧，走到两张桌子前问...",
      "如何安慰JavaScript bug？你console它！",
      "开发者为什么破产？用光了所有缓存！",
      "!false - 好笑因为它是真的",
      "有10种人：懂二进制的...",

      // 随机搞笑
      "喵！等等，错动物了... 哔？",
      "我不懒，我是省电模式",
      "成就解锁：盯着代码看了5分钟！",
      "加载幽默.exe... ████████ 100% 完成！",
      "我在函数里放了'有趣'！",
      "段错误（核心转储）- 开玩笑的！😄",
      "你好世界！我这样做对吗？",
      "Lorem ipsum dolor sit amet... 哦错文本了",
      "这个想法由咖啡因赞助",
      "大声噪音！抱歉，大写键开着",

      // 取决于心情
      state.hunger < 50 ? "我的肚子在咕噜噜" : "",
      state.energy < 30 ? "*句子中间睡着* zzz..." : "",
      state.happiness > 80 ? "我太开心了可以合并冲突！" : "",
      state.cleanliness < 30 ? "我闻起来像服务器机房" : ""
    ].filter(t => t !== "");

    return sillyThoughts[Math.floor(Math.random() * sillyThoughts.length)];
  }

  // 获取激励想法
  static getMotivationalThought(state: PetState): string {
    const motivationalThoughts = [
      // 编程激励
      "你太棒了！继续！💪",
      "每个修复的bug让你更强！",
      "你的代码很棒，你也很棒！",
      "进步，不是完美！",
      "一行一行，你能行！",
      "最好的代码是能用的代码！",
      "发布！完美是完成的敌人！",
      "你没卡住，你在调试！",
      "这个bug在我们面前没有机会！",
      "你未来的自己会感谢你",

      // 一般鼓励
      "像我相信你一样相信你自己！⭐",
      "你做得很好，亲爱的！",
      "深呼吸。你能行。",
      "记住：你已经解决了100%过去的bug",
      "每个专家都曾是初学者",
      "代码也相信你！",
      "你不只是在编程，你在创造！",
      "你的坚持令人鼓舞！",
      "我为你骄傲！🌟",
      "你让这看起来很简单！",

      // 休息提醒
      "记得喝水！💧",
      "伸展休息？你的背部会感谢你！",
      "新鲜空气可能带来新鲜想法！",
      "散步能调试你的大脑！",
      "休息是过程的一部分",
      "照顾好自己，你很重要！"
    ];

    // 添加上下文感知激励
    if (state.sessionUpdateCount > 200) {
      motivationalThoughts.push("马拉松编程！你势不可挡！");
      motivationalThoughts.push("你的奉献令人难以置信！");
    }

    if (state.hunger < 30) {
      motivationalThoughts.push("给自己加油来给代码加油！");
    }

    if (state.energy < 30) {
      motivationalThoughts.push("即使是英雄也需要休息！");
    }

    return motivationalThoughts[Math.floor(Math.random() * motivationalThoughts.length)];
  }

  // 获取季节/假日想法
  static getSeasonalThought(): string {
    const month = new Date().getMonth();
    const day = new Date().getDate();

    // 特定假日
    if (month === 11 && day === 25) {
      return "圣诞快乐！🎄 圣诞老人在调试他的清单！";
    }
    if (month === 0 && day === 1) {
      return "新年，新bug！🎊 让我们搞定它们！";
    }
    if (month === 9 && day === 31) {
      return "万圣节快乐！🎃 最可怕的是生产bug！";
    }
    if (month === 3 && day === 1) {
      return "今天什么都别信。尤其是你的代码。🃏";
    }

    // 季节想法
    const seasonalThoughts: Record<number, string[]> = {
      // 冬季（12月，1月，2月）
      11: ["代码和可可季节！☕", "冬季编程是舒适的编程"],
      0: ["新年，新仓库！", "一月：当所有TODO变成DODO"],
      1: ["二月：修复一月bug的月份"],

      // 春季（3月，4月，5月）
      2: ["春季清理代码库！🌸", "重构时间！"],
      3: ["四月阵雨带来五月功能", "春天行动起来！"],
      4: ["愿代码与你同在", "bug到处绽放！"],

      // 夏季（6月，7月，8月）
      5: ["夏季编程氛围 ☀️", "热天气，热部署！"],
      6: ["七月：空调欣赏高峰月"],
      7: ["八月：太热不能出去，编程的绝佳时机！"],

      // 秋季（9月，10月，11月）
      8: ["九月：回到学校，回到调试"],
      9: ["十月：代码库里的恐怖骷髅 💀"],
      10: ["十一月：感谢版本控制 🦃"]
    };

    const monthThoughts = seasonalThoughts[month] || ["又一天，又一次部署！"];
    return monthThoughts[Math.floor(Math.random() * monthThoughts.length)];
  }

  // 获取随机事实
  static getRandomFact(): string {
    const facts = [
      "冷知识：第一个电脑bug是真正的bug！🐛",
      "你知道吗？@符号在西班牙语中叫'arroba'",
      "冷知识：'调试'来自从电脑中移除真正的bug",
      "第一个电脑病毒创建于1983年",
      "QWERTY设计用来减慢打字速度",
      "第一个程序员是Ada Lovelace",
      "有700+编程语言",
      "第一个1GB硬盘重550磅",
      "空格键是最常按的键",
      "代码注释发明于1947年",
      "云只是别人的电脑",
      "Python以Monty Python命名",
      "Java最初叫Oak",
      "C++曾叫'C with Classes'",
      "JavaScript在10天内创建",
      "第一个电脑鼠标是木制的",
      "电子邮件存在于万维网之前",
      "程序员平均每天喝3.2杯咖啡",
      "编程每小时燃烧120卡路里",
      "'cookie'一词来自计算中的'magic cookie'"
    ];

    return facts[Math.floor(Math.random() * facts.length)];
  }

  // 获取科技预测
  static getTechPrediction(): string {
    const predictions = [
      "将来，所有bug都会自己修复... 对吧？",
      "预测：JavaScript今天会加5个新框架",
      "到2030年，我们都会用emoji编程 🤖",
      "未来IDE会读心。隐私不包含在内。",
      "量子调试：bug既存在又不存在",
      "AI会写所有代码。宠物会监督。",
      "明天的TODO：今天的技术债",
      "奇点只是一个npm install",
      "未来的提交将通过解释性舞蹈进行",
      "预测：分号会变得有自我意识",
      "10年后，我们会怀旧地记住手动编程",
      "下一个大东西：区块链驱动的console.log",
      "未来错误信息将包含治疗",
      "预测：Tab vs 空格战争在2847年结束",
      "到2050年，代码将完全用表情包编写"
    ];

    return predictions[Math.floor(Math.random() * predictions.length)];
  }

  // 主方法获取任何随机想法
  static getThought(state: PetState, context?: any): string {
    // 权重不同类型的随机想法
    const roll = Math.random();

    if (roll < 0.15) {
      return this.getPhilosophicalThought();
    } else if (roll < 0.30) {
      return this.getObservationThought(state);
    } else if (roll < 0.50) {
      return this.getSillyThought(state);
    } else if (roll < 0.65) {
      return this.getMotivationalThought(state);
    } else if (roll < 0.75) {
      return this.getSeasonalThought();
    } else if (roll < 0.85) {
      return this.getRandomFact();
    } else {
      return this.getTechPrediction();
    }
  }
}