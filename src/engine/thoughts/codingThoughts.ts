import { PetState } from '../StateManager';

export class CodingThoughts {
  // 根据关键词获取反应想法
  static getReactiveThought(input: string, state: PetState): string {
    const lowerInput = input.toLowerCase();

    // 错误/Bug 相关
    if (lowerInput.includes('error')) {
      const errorThoughts = [
        "哦，红色波浪线！我也看见了！🔴",
        "别担心，我们会搞定这个bug的！🐛",
        "错误信息只是伪装的谜题",
        "你试过关机再开机吗？🔄",
        "错误来自函数内部！",
        "那不是bug，它是... 不等等，它绝对是bug"
      ];
      return errorThoughts[Math.floor(Math.random() * errorThoughts.length)];
    }

    if (lowerInput.includes('bug')) {
      const bugThoughts = [
        "抓bug时间！🐛🔍",
        "是bug还是特性？让我们找出答案！",
        "Bug只是想有创意的代码",
        "我闻到了bug... 或者可能只是我身上脏了",
        "部署调试器！🚀"
      ];
      return bugThoughts[Math.floor(Math.random() * bugThoughts.length)];
    }

    // 成功相关
    if (lowerInput.includes('fixed') || lowerInput.includes('works')) {
      const successThoughts = [
        "耶！！！我们做到了！🎉",
        "胜利舞蹈时间！💃",
        "我就知道你能做到！⭐",
        "发布！发布！🚢",
        "这就是我所说的问题解决！",
        "我们是最棒的团队！🤝"
      ];
      return successThoughts[Math.floor(Math.random() * successThoughts.length)];
    }

    if (lowerInput.includes('success') || lowerInput.includes('passed')) {
      const passThoughts = [
        "全部绿色！像美丽的花园！🌿",
        "测试通过让我开心！✅",
        "成功的味道比饼干还好！",
        "成就解锁！🏆",
        "这是我们喜欢的绿色！"
      ];
      return passThoughts[Math.floor(Math.random() * passThoughts.length)];
    }

    // Git 相关
    if (lowerInput.includes('git') || lowerInput.includes('commit')) {
      const gitThoughts = [
        "Git commit -m 'pet was here' 🐾",
        "别忘了推送！除非是强制推送... 😰",
        "又一次提交，离生产更近一步！",
        "这个提交信息描述够详细吗？🤔",
        "提交犯罪... 我是说代码！",
        "版本控制救命！"
      ];
      return gitThoughts[Math.floor(Math.random() * gitThoughts.length)];
    }

    if (lowerInput.includes('merge') || lowerInput.includes('conflict')) {
      const mergeThoughts = [
        "合并冲突只是谜题！🧩",
        "<<<<<<< HEAD 的困惑",
        "愿合并与你同在",
        "冲突让我紧张... 😬",
        "玩合并侦探游戏时间！"
      ];
      return mergeThoughts[Math.floor(Math.random() * mergeThoughts.length)];
    }

    // TODO 相关
    if (lowerInput.includes('todo') || lowerInput.includes('fixme')) {
      const todoThoughts = [
        "未来的我们会处理那个... 📝",
        "TODO：喂宠物（只是建议）",
        "添加到无限TODO列表",
        "那是明天开发者的问题",
        "TODO计数器：∞",
        "我会提醒你那件事... 迟早"
      ];
      return todoThoughts[Math.floor(Math.random() * todoThoughts.length)];
    }

    // 删除相关
    if (lowerInput.includes('delete') || lowerInput.includes('remove')) {
      const deleteThoughts = [
        "再见代码！你服务得很好！👋",
        "删除键 brrrr响",
        "代码越少 = bug越少！",
        "近藤麻理惠会骄傲的",
        "进入虚空！🕳️",
        "Ctrl+Z 是我们的朋友，对吧？对吧？"
      ];
      return deleteThoughts[Math.floor(Math.random() * deleteThoughts.length)];
    }

    // 注释相关
    if (lowerInput.includes('//') || lowerInput.includes('/*') || lowerInput.includes('comment')) {
      const commentThoughts = [
        "注释是给未来自己的情书 💌",
        "// TODO：让这个真的能工作",
        "像真正的专业人士一样注释代码！",
        "未来的开发者会感谢你",
        "// 此处有龙 🐉",
        "好注释让我开心！"
      ];
      return commentThoughts[Math.floor(Math.random() * commentThoughts.length)];
    }

    // 测试相关
    if (lowerInput.includes('test') || lowerInput.includes('spec')) {
      const testThoughts = [
        "测试，测试，一二三！🎤",
        "测试就像蔬菜 - 对你有好处！",
        "红，绿，重构！🔴🟢♻️",
        "100%覆盖率或失败！",
        "测试保护我们免受未来自己的伤害",
        "写测试是代码的自我关怀"
      ];
      return testThoughts[Math.floor(Math.random() * testThoughts.length)];
    }

    // 默认编码观察
    return "有趣的代码！👀";
  }

  // 获取一般编码观察
  static getObservation(state: PetState, sessionLength: number): string {
    // 长函数观察
    if (Math.random() < 0.3) {
      const functionThoughts = [
        "这个函数变得好长... 📜",
        "好多参数！🎯",
        "嵌套循环让我头晕... 🌀",
        "我数了17层缩进。新纪录？",
        "这个函数做了所有事情！",
        "单一职责？没听说过！"
      ];
      return functionThoughts[Math.floor(Math.random() * functionThoughts.length)];
    }

    // 基于会话的观察
    if (sessionLength > 200) {
      const longSessionThoughts = [
        "我们已经搞了一阵子了... 很有成效！💪",
        "马拉松编码会话！别忘了伸展！",
        "代码必须流动... ⌨️",
        "进入状态！没有什么能阻止我们！",
        "这就是巅峰表现的样子",
        "我们火力全开！🔥（不是真的，希望如此）"
      ];
      return longSessionThoughts[Math.floor(Math.random() * longSessionThoughts.length)];
    }

    if (sessionLength < 50) {
      const shortSessionThoughts = [
        "刚热身！🏃",
        "准备好写所有代码！",
        "新会话，新bug待发现！",
        "让我们做点很棒的东西！",
        "IDE加载好了，我们也准备好了！",
        "代码库冒险等着我们！"
      ];
      return shortSessionThoughts[Math.floor(Math.random() * shortSessionThoughts.length)];
    }

    // 时间观察（如果我们有时间上下文）
    const timeThoughts = [
      "深夜编码感觉不一样 🌙",
      "早上代码是最好的代码！☀️",
      "下午调试会话？☕",
      "到部署周五了吗？📅",
      "编码时光飞逝！",
      "又一天，又一个依赖更新"
    ];

    // 语言/框架观察
    const techThoughts = [
      "JavaScript又JavaScript了... 🤷",
      "TypeScript拯救了这一天！💙",
      "Python的缩进让我饿了",
      "CSS基本是魔法 ✨",
      "SQL查询变复杂了！",
      "正则就是行噪声，对吧？",
      "Docker容器到处都是！🐳",
      "Kubernetes？更像是Kuber-很棒-es！",
      "云只是别人的电脑",
      "微服务还是单体？🤔"
    ];

    // 随机编码观察
    const generalThoughts = [
      "分号是可选的... 直到它们不是",
      "命名仍然很难",
      "缓存失效再次来袭！",
      "差一错误？经典！",
      "那个变量名... 'temp123'",
      "复制，粘贴，以后重构（剧透：永远不会）",
      "Stack Overflow来救援！🦸",
      "这段代码是自文档的！（其实不是）",
      "在我机器上能用！🖥️",
      "这不是内存泄漏，这是内存瀑布",
      "Undefined不是函数... 又来",
      "构建坏了但我的精神没坏！",
      "调试就是当侦探 🔍",
      "代码审查时间 = 友谊测试时间",
      "这需要更多抽象... 或者更少？",
      "技术债就是未来的乐趣！",
      "文档... '即将推出'",
      "遗留代码 = 工作保障",
      "重构让一切都更好！",
      "注释撒谎，代码不会"
    ];

    // 混合所有想法类别
    const allThoughts = [...timeThoughts, ...techThoughts, ...generalThoughts];
    return allThoughts[Math.floor(Math.random() * allThoughts.length)];
  }

  // 获取关于代码质量的想法
  static getCodeQualityThought(state: PetState): string {
    const qualityThoughts = [
      "这代码太干净了我能在上面吃饭！✨",
      "我的猫砂盆里的代码都比这干净... 📦",
      "DRY原则？更像是WET - 把所有东西写两遍！",
      "SOLID原则会骄傲的！",
      "这个架构... 有趣 🏗️",
      "意大利面条代码让我饿了 🍝",
      "抽象层还有抽象层",
      "这是代码还是现代艺术？🎨",
      "我感觉重构要来了...",
      "这代码让我快乐！⭐",
      "检测到代码异味！👃",
      "这就是优雅的样子",
      "复杂度评分：是",
      "漂亮代码让我呼噜",
      "这需要更多设计模式... 或者更少？"
    ];

    return qualityThoughts[Math.floor(Math.random() * qualityThoughts.length)];
  }

  // 获取关于调试的想法
  static getDebuggingThought(state: PetState): string {
    const debugThoughts = [
      "console.log('这里') - 经典",
      "你试过console.log(一切)吗？",
      "bug总是在你最后找的地方",
      "断点派对！🎉",
      "单步执行，跳过，进入疯狂",
      "堆栈追踪更深了...",
      "打印调试：古老但有效",
      "橡皮鸭调试时间！🦆",
      "bug一直都在那里！",
      "总是拼写错误。总是。",
      "查文档... 哦等等",
      "真正的bug是我们沿途交到的朋友",
      "调试：90%盯着，10%修复",
      "找到了！是分号。",
      "网络标签揭示所有秘密"
    ];

    return debugThoughts[Math.floor(Math.random() * debugThoughts.length)];
  }

  // 获取特定语言的观察
  static getLanguageSpecificThought(language: string): string {
    const thoughts: Record<string, string[]> = {
      javascript: [
        "undefined不是null... 或者是？🤔",
        "=== 还是 ==？永恒的问题",
        "Promise到处都是！",
        "回调地狱是真实存在的地方",
        "这就是我们需要TypeScript的原因",
        "NaN === NaN 是false。JavaScript！"
      ],
      python: [
        "缩进不是建议！",
        "import this - Python之禅",
        "列表推导让一切更好",
        "够pythonic吗？",
        "pip install 一切问题的解决方案",
        "鸭子类型！🦆 如果它叫起来..."
      ],
      java: [
        "public static void 所有东西()",
        "AbstractFactoryBuilderPattern！",
        "啰嗦？Java？从不！😏",
        "NullPointerException 来了！",
        "更多的getter和setter！",
        "企业级代码质量在这里"
      ],
      typescript: [
        "类型安全让我感到安全 🛡️",
        "any类型？我们这里不那样做",
        "编译器又生气了",
        "给所有东西加接口！",
        "泛型来救援！",
        "strict: true - 危险生活"
      ]
    };

    const defaultThoughts = [
      "代码就是代码，语言只是语法",
      "每种语言都有自己的魅力",
      "多语言程序员工作中！",
      "学习新语法很有趣！"
    ];

    const langThoughts = thoughts[language.toLowerCase()] || defaultThoughts;
    return langThoughts[Math.floor(Math.random() * langThoughts.length)];
  }
}