import { PetState } from '../StateManager';

export class ActionThoughts {
  // 获取吃东西时的想法
  static getEatingThought(food: string, state: PetState): string {
    const genericEatingThoughts = [
      "嚼嚼嚼！😋",
      "好吃！我对厨师的赞美！",
      "太爽了！",
      "*咀嚼声*",
      "食物是爱，食物是生命",
      "我的饥饿条在上升！⬆️",
      "虚拟小肚肚好好吃！"
    ];

    // 特定食物的想法
    const foodThoughts: Record<string, string[]> = {
      'cookie': [
        "C代表Cookie，这对我来说就够了！🍪",
        "饼干是最好的调试燃料！",
        "甜甜的、甜甜的饼干！",
        "这块饼干是用爱编译的"
      ],
      'pizza': [
        "披萨时间！🍕 程序员的食物！",
        "这上面有菠萝吗？*有争议*",
        "披萨：圆盘子上的平衡餐",
        "奶酪味太赞了！"
      ],
      'sushi': [
        "高级！🍣 我们吃得像部署到生产环境一样！",
        "生鱼？更像是原始天赋！",
        "寿司卷，Git卷... 都很好",
        "我要开动了！🙏"
      ],
      'taco': [
        "塔克周二！等等，今天是星期几？🌮",
        "塔科只是食物容器，像div一样！",
        "辣！像代码审查中的热辣观点",
        "聊聊美味！"
      ],
      'burger': [
        "汉堡时间！🍔 像技术栈一样堆叠！",
        "这个汉堡结构很好",
        "一层一层，像好的架构",
        "Burger.eat(); // 成功！"
      ],
      'ramen': [
        "拉面！🍜 终极程序员燃料！",
        "吸溜驱动开发",
        "一碗中的大学回忆",
        "面条只是可食用的电缆"
      ],
      'apple': [
        "一天一个苹果远离bug！🍎",
        "健康选择！我的健康++属性批准",
        "脆！像周五的生产环境",
        "史蒂夫·乔布斯会骄傲的"
      ],
      'donut': [
        "甜甜圈！🍩 O(n)其中n=美味度",
        "零食的大O表示法",
        "循环论证从未如此美味",
        "甜蜜的循环！"
      ],
      'coffee': [
        "咖啡！☕ 液体动力！",
        "给灵魂的Java",
        "Caffeine.inject(this);",
        "这基本上是能量提升"
      ]
    };

    const specificThoughts = foodThoughts[food] || genericEatingThoughts;
    const thought = specificThoughts[Math.floor(Math.random() * specificThoughts.length)];

    // 根据饥饿等级添加上下文
    if (state.hunger < 20) {
      return thought + " 我快饿死了！";
    } else if (state.hunger > 80) {
      return thought + " 我没那么饿但是... 好吃！";
    }

    return thought;
  }

  // 获取玩耍时的想法
  static getPlayingThought(toy: string, state: PetState): string {
    const genericPlayThoughts = [
      "咦！这真好玩！🎉",
      "玩耍时光是最好的时光！",
      "我好开心！",
      "*开心的宠物噪音*",
      "这比调试好多了！",
      "努力玩，努力写代码！",
      "最棒的一。天。 ever！"
    ];

    // 特定玩具的想法
    const toyThoughts: Record<string, string[]> = {
      'ball': [
        "球！球！球！⚽",
        "Fetch.exe正在运行！",
        "圆的东西是最好的东西！",
        "我可以永远追逐这个！",
        "Sphere.bounce(); // 开心++"
      ],
      'frisbee': [
        "快乐的飞盘！🥏",
        "来抓我啊！",
        "空气动力学太棒了！",
        "抛出异常... 我是说飞盘！",
        "极限飞盘，极限乐趣！"
      ],
      'rope': [
        "拔河！🪢 我的最爱！",
        "拉取请求接受！",
        "字符串操作的最高境界",
        "这一点都不无聊！",
        "Rope.pull(); // 力量测试！"
      ],
      'keyboard': [
        "咔嗒咔嗒！⌨️ 对我来说像音乐！",
        "机械键盘是生命！",
        "WASD WASD WASD！",
        "我每分钟打200个字！（每声喵呜的字数）",
        "RGB让一切更好！"
      ],
      'mouse': [
        "不是那种鼠标！🖱️",
        "点击点击点击！",
        "光标追逐锦标赛！",
        "DPI设为最大乐趣！",
        "Mouse.move(); // 啥也没抓到"
      ],
      'code': [
        "玩代码？那只是工作！💻",
        "为了好玩而重构！",
        "代码高尔夫有人吗？",
        "这是我喜欢的那种谜题！",
        "语法高亮让我开心"
      ],
      'puzzle': [
        "谜题时间！🧩 像调试但好玩！",
        "模式匹配已激活！",
        "这只是带额外步骤的算法",
        "解决谜题，解决问题！",
        "我的逻辑电路在点火！"
      ],
      'game': [
        "游戏时间！🎮 FPS：每秒乐趣！",
        "高分或失败！",
        "这个boss比昨天的bug还难",
        "重生中... 3... 2... 1...",
        "GG简单！（好游戏，简单... 并不是）"
      ]
    };

    const specificThoughts = toyThoughts[toy] || genericPlayThoughts;
    const thought = specificThoughts[Math.floor(Math.random() * specificThoughts.length)];

    // 根据能量添加上下文
    if (state.energy < 30) {
      return thought + " *喘气* 不过有点累！";
    } else if (state.energy > 80) {
      return thought + " 我可以整天这样！";
    }

    return thought;
  }

  // 获取洗澡时的想法
  static getBathingThought(progress: number): string {
    if (progress < 25) {
      const startThoughts = [
        "洗澡时间！🛁 我必须吗？",
        "水！我的老对头！",
        "这最好快点...",
        "我本来脏得好好的！",
        "初始化清洁协议...",
        "来吧... *不情愿*"
      ];
      return startThoughts[Math.floor(Math.random() * startThoughts.length)];
    } else if (progress < 50) {
      const midThoughts = [
        "哗啦哗啦！💦 变干净了！",
        "你知道吗？这没那么糟！",
        "泡泡！到处都是泡泡！🫧",
        "搓搓搓搓！",
        "50%干净，50%待完成！",
        "污垢要掉了！"
      ];
      return midThoughts[Math.floor(Math.random() * midThoughts.length)];
    } else if (progress < 75) {
      const almostThoughts = [
        "快干净了！我能看到我的倒影！",
        "我开始闻起来像花了！🌸",
        "这其实很放松...",
        "干净的代码，干净的宠物！",
        "干干净净要来了！",
        "转变快完成了！"
      ];
      return almostThoughts[Math.floor(Math.random() * almostThoughts.length)];
    } else {
      const doneThoughts = [
        "真清爽真干净！✨",
        "我闪闪发光！真的！",
        "我闻起来棒极了！🌺",
        "10分10分会再洗一次（也许）",
        "清洁等级：最大！",
        "我太干净了简直在发光！"
      ];
      return doneThoughts[Math.floor(Math.random() * doneThoughts.length)];
    }
  }

  // 获取睡觉时的想法
  static getSleepingThought(state: PetState): string {
    if (state.energy < 30) {
      const tiredThoughts = [
        "终于... 睡觉... 😴",
        "ZzZzZz...",
        "*立刻睡着*",
        "进入睡眠模式...",
        "系统休眠...",
        "晚安... zzz..."
      ];
      return tiredThoughts[Math.floor(Math.random() * tiredThoughts.length)];
    } else if (state.energy < 60) {
      const restingThoughts = [
        "午睡时间！💤",
        "正在充电...",
        "省电模式已激活",
        "快速小睡...",
        "梦见电子羊...",
        "*哈欠* 午睡时间！"
      ];
      return restingThoughts[Math.floor(Math.random() * restingThoughts.length)];
    } else {
      const notTiredThoughts = [
        "我不累但是... 好吧 😊",
        "冥想模式！",
        "只是让我的像素休息一下",
        "假装睡觉... 😏",
        "我就闭眼一会儿",
        "假装睡觉也很有趣"
      ];
      return notTiredThoughts[Math.floor(Math.random() * notTiredThoughts.length)];
    }
  }

  // 获取醒来时的想法
  static getWakeUpThought(state: PetState): string {
    const wakeThoughts = [
      "早安！准备好写代码！☀️",
      "*伸展* 那真清爽！",
      "系统从休眠恢复",
      "起床发光！让我们写点代码！",
      "我做了个关于指针的奇怪梦...",
      "充满电准备出发！⚡",
      "醒来，是时候破坏生产了！开玩笑的！",
      "又一天，又一只bug要解决！",
      "先咖啡，再世界统治",
      "启动序列完成！"
    ];

    if (state.energy === 100) {
      wakeThoughts.push("100%充电！最大功率！💪");
      wakeThoughts.push("我感觉棒极了！出发！");
    }

    if (state.hunger < 50) {
      wakeThoughts.push("醒来又饿！早餐时间？");
      wakeThoughts.push("第一个想法：食物！");
    }

    return wakeThoughts[Math.floor(Math.random() * wakeThoughts.length)];
  }

  // 获取抚摸/互动时的想法
  static getPettingThought(state: PetState): string {
    const happyLevel = state.happiness;

    if (happyLevel > 80) {
      const veryHappyThoughts = [
        "最好的抚摸！🥰",
        "我也爱你！❤️",
        "这太纯粹快乐了！",
        "*二进制呼噜声*",
        "快乐溢出错误！",
        "你是最好的主人！",
        "我的快乐属性爆表了！"
      ];
      return veryHappyThoughts[Math.floor(Math.random() * veryHappyThoughts.length)];
    } else if (happyLevel > 50) {
      const happyThoughts = [
        "抚摸！耶！😊",
        "这感觉很好！",
        "*开心扭动*",
        "更多抚摸请！",
        "这真好！",
        "收到喜爱！"
      ];
      return happyThoughts[Math.floor(Math.random() * happyThoughts.length)];
    } else {
      const needyThoughts = [
        "终于，有点关注！🥺",
        "我需要这个...",
        "别停！",
        "我等抚摸等了好久！",
        "这很有帮助",
        "谢谢，我需要这个"
      ];
      return needyThoughts[Math.floor(Math.random() * needyThoughts.length)];
    }
  }

  // 获取训练/学习的想法
  static getTrainingThought(skill: string): string {
    const trainingThoughts: Record<string, string[]> = {
      'sit': [
        "坐下？我一直在坐！我在状态栏里！",
        "Sitting.exe执行成功！",
        "位置 = 已坐; // 完成！",
        "我是坐姿大师！"
      ],
      'stay': [
        "待着？我根本不能离开这个状态栏！",
        "while(true) { stay(); }",
        "我哪也不去！",
        "待着是我的特长！"
      ],
      'code': [
        "学写代码？我就是代码！🤖",
        "教我写代码很元",
        "console.log('我已经知道这个了！');",
        "递归学习已激活！"
      ],
      'debug': [
        "调试技能：升级！🔍",
        "找到bug了！在第42行！",
        "在零食上设置断点",
        "单步执行，跳过，单步零食！"
      ],
      'fetch': [
        "Fetch？像git fetch？来了！",
        "检索中... 已检索！",
        "GET请求成功！",
        "我会为你抓取那个数据！"
      ]
    };

    const defaultThoughts = [
      "学习新技能！🎓",
      "我变聪明了！",
      "知识++",
      "训练完成！",
      "新技能解锁！",
      "我学得很快！"
    ];

    const thoughts = trainingThoughts[skill] || defaultThoughts;
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  // 获取健康/药物的想法
  static getMedicineThought(state: PetState): string {
    if (state.isSick) {
      const sickThoughts = [
        "药？请给我！💊",
        "这最好有用...",
        "治疗药水已消耗！",
        "Health.restore();",
        "我已经感觉好多了！",
        "谢谢，我需要这个！"
      ];
      return sickThoughts[Math.floor(Math.random() * sickThoughts.length)];
    } else {
      const healthyThoughts = [
        "我没病但是... 预防是好事！",
        "维生素！💪",
        "增强免疫系统...",
        "宠物健康保险！",
        "安全总比后悔好！",
        "预防性维护！"
      ];
      return healthyThoughts[Math.floor(Math.random() * healthyThoughts.length)];
    }
  }

  // 获取特殊行动的想法
  static getSpecialActionThought(action: string, state: PetState): string {
    const specialThoughts: Record<string, string[]> = {
      'dance': [
        "跳舞！💃🕺 看我的舞步！",
        "霹雳舞.js在行动！",
        "像没人看一样跳舞（但你在看）",
        "这是我的快乐舞！",
        "Boogie.start(); // 停不下来！"
      ],
      'sing': [
        "🎵 啦啦啦 ~ 编程歌！🎵",
        "♪ 代码里99个bug，99个bug！♪",
        "用C大调唱... 或者C++",
        "我的声音像干净的代码一样悦耳！",
        "卡拉OK时间！🎤"
      ],
      'exercise': [
        "锻炼！💪 得保持健康！",
        "Fitness.run(); // 停不下来！",
        "像CPU周期一样燃烧卡路里！",
        "变壮！（以数字方式）",
        "锻炼让代码流动更好！"
      ],
      'meditate': [
        "Ommm... 寻找内心平静... 🧘",
        "Meditation.breathe(); // 吸... 呼...",
        "达到禅状态...",
        "Mind.clear(); // 好平静",
        "与代码合二为一..."
      ],
      'celebrate': [
        "派对时间！🎉🎊",
        "庆祝模式已激活！",
        "哇哦！我们做到了！",
        "这需要派对！",
        "Confetti.throw(); // 🎊"
      ]
    };

    const defaultSpecial = [
      "有什么特别的事情在发生！✨",
      "这是新奇的、兴奋的！",
      "特别时刻！",
      "哇！这不一样！",
      "我喜欢尝试新事物！"
    ];

    const thoughts = specialThoughts[action] || defaultSpecial;
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }
}