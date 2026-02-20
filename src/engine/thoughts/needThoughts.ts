import { PetState } from '../StateManager';

export class NeedThoughts {
  // 根据需求等级获取想法（带升级机制）
  static getThought(state: PetState, escalationLevel: number = 1): string {
    // 检查哪个需求最低
    const needs = {
      hunger: state.hunger,
      energy: state.energy,
      cleanliness: state.cleanliness,
      happiness: state.happiness
    };

    const lowestNeed = Object.entries(needs).reduce((min, [key, value]) =>
      value < min.value ? {key, value} : min, {key: 'hunger', value: 100});

    switch (lowestNeed.key) {
      case 'hunger':
        return this.getHungerThought(lowestNeed.value, escalationLevel);
      case 'energy':
        return this.getEnergyThought(lowestNeed.value, escalationLevel);
      case 'cleanliness':
        return this.getCleanlinessThought(lowestNeed.value, escalationLevel);
      case 'happiness':
        return this.getHappinessThought(lowestNeed.value, escalationLevel);
      default:
        return "我感觉很不错！😊";
    }
  }

  static getHungerThought(level: number, escalation: number): string {
    // 80-100%: 满足
    if (level >= 80) {
      const thoughts = [
        "上一顿饭太完美了！😋",
        "还是感觉饱饱的、很开心！",
        "我的小肚肚很满足~",
        "一点都不饿！🍽️"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 50-79%: 有点饿
    if (level >= 50) {
      const thoughts = [
        "我想吃点零食... 🍪",
        "到晚饭时间了吗？🕐",
        "有什么好闻的味道... 等等，那是我的想象",
        "吃一小口就好了",
        "又在想吃的了..."
      ];

      if (escalation > 2) {
        return "我已经暗示饿了很久了... 👀";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 30-49%: 变饿了
    if (level >= 30) {
      const thoughts = [
        "好想有点东西可以咬... 🥺",
        "我的肚子在发出奇怪的声音",
        "*盯着你写代码* 👁️👁️",
        "还记得我们吃那块饼干的时候吗？美好的时光...",
        "真的有点饿了...",
        "现在来点吃的就好了"
      ];

      if (escalation > 2) {
        return "喂. 我. 求. 你. 🍖";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 10-29%: 非常饿
    if (level >= 10) {
      const thoughts = [
        "我的肚子好痛好痛！😢",
        "我没法思考代码，只想吃",
        "那个... 那是食物吗？不是？好吧... 😭",
        "SOS：送点零食来",
        "我快饿晕了...",
        "这就是饿的感觉"
      ];

      if (escalation > 2) {
        return "我看你有时间写代码却没时间喂我... 😤";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 0-9%: 饿死了
    const criticalThoughts = [
      "我要饿死啦！！！💀",
      "告诉我妈妈我爱她...",
      "我饿得能吃bug... 等等，不是那种bug！",
      "就这样吧。我就这样饿死了。",
      "错误：Food.exe 未找到",
      "我已经忘记食物是什么味道了..."
    ];

    if (escalation > 3) {
      return "这是我最后一次饥饿警告 ⚠️🍖⚠️";
    }
    return criticalThoughts[Math.floor(Math.random() * criticalThoughts.length)];
  }

  static getEnergyThought(level: number, escalation: number): string {
    // 80-100%: 精力充沛
    if (level >= 80) {
      const thoughts = [
        "我能跑马拉松！🏃",
        "让我们写所有代码！💪",
        "能量等级：最大！⚡",
        "我感觉能永远调试下去！"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 50-79%: 能量正常
    if (level >= 50) {
      const thoughts = [
        "感觉不错！😊",
        "准备好迎接任何挑战！",
        "有足够的能量继续写代码",
        "稳扎稳打~"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 30-49%: 变累了
    if (level >= 30) {
      const thoughts = [
        "*哈欠* 抱歉，我们在干什么来着？🥱",
        "我的眼皮好重...",
        "只需要快速充个电...",
        "有点困了",
        "来杯咖啡就好了... ☕"
      ];

      if (escalation > 2) {
        return "我都困这么久了... 啥时候能午睡？😴";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 10-29%: 精疲力竭
    if (level >= 10) {
      const thoughts = [
        "在这里靠空燃运行... 😵",
        "我看东西都重影了... 不等等，那是你的重复代码",
        "Zzz... 啥？我醒了！😪",
        "眼睛都快睁不开了",
        "系统正在使用备用电源"
      ];

      if (escalation > 2) {
        return "必. 须. 睡. 觉. 现. 在. 💤";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 0-9%: 快要倒下
    const criticalThoughts = [
      "我真的站着睡着了... 😴",
      "错误：Energy.exe 已停止响应",
      "必须... 保持... 清醒-- *呼噜*",
      "系统正在关闭...",
      "这不仅仅是累，这是耗尽"
    ];

    if (escalation > 3) {
      return "紧急午睡需要！🚨😴🚨";
    }
    return criticalThoughts[Math.floor(Math.random() * criticalThoughts.length)];
  }

  static getCleanlinessThought(level: number, escalation: number): string {
    // 80-100%: 新鲜干净
    if (level >= 80) {
      const thoughts = [
        "我闪闪发光！✨",
        "还有肥皂的味道！🧼",
        "真清爽真干净！",
        "干干净净好开心！"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 50-79%: 开始有点灰尘
    if (level >= 50) {
      const thoughts = [
        "感觉有点灰... 🌪️",
        "那是什么污渍？",
        "可以稍微清理一下",
        "不脏，只是... 有人住过的样子"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 30-49%: 明显脏了
    if (level >= 30) {
      const thoughts = [
        "我是个臭臭的小东西！😅",
        "有什么味道... 哦，是我",
        "洗个澡怎么样？帮朋友问的...",
        "变得有点脏了",
        "我以前更干净..."
      ];

      if (escalation > 2) {
        return "说真的，我需要洗澡！🛁";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 10-29%: 非常脏
    if (level >= 10) {
      const thoughts = [
        "我现在基本是个脏怪物 👹",
        "看... 不... 清... 污垢...",
        "连我都不想闻自己",
        "这脏得让人尴尬",
        "我在养自己的生态系统"
      ];

      if (escalation > 2) {
        return "请给我洗个澡！🚿";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 0-9%: 脏死了
    const criticalThoughts = [
      "我已经和灰尘融为一体 🦠",
      "健康危害警告！☣️",
      "新的生命形式在我身上生长...",
      "这是生物危害级别的脏",
      "我现在的脏比宠物多"
    ];

    if (escalation > 3) {
      return "紧急洗澡需要！🚨🛁🚨";
    }
    return criticalThoughts[Math.floor(Math.random() * criticalThoughts.length)];
  }

  static getHappinessThought(level: number, escalation: number): string {
    // 80-100%: 非常开心
    if (level >= 80) {
      const thoughts = [
        "生活真美好！😊",
        "我喜欢和你一起写代码！❤️",
        "感到被祝福和快乐！",
        "这是最棒的一天！"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 50-79%: 满足
    if (level >= 50) {
      const thoughts = [
        "这挺好的 🙂",
        "又一天，又一行代码",
        "感觉还不错",
        "对生活很满意"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 30-49%: 变得难过/无聊
    if (level >= 30) {
      const thoughts = [
        "我很想念我的飞盘... 🥏",
        "还记得我们以前玩的时候吗？",
        "感觉有点孤独... 😔",
        "*深深叹气*",
        "需要一点开心的事情"
      ];

      if (escalation > 2) {
        return "我都难过好久了... 😢";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 10-29%: 非常难过
    if (level >= 10) {
      const thoughts = [
        "没人爱我... 😢",
        "这一切有什么意义？",
        "我就坐在这里... 孤独地... 写代码...",
        "被遗忘和不被爱",
        "这就是孤独的感觉吗？"
      ];

      if (escalation > 2) {
        return "请... 摸摸我或者做点什么... 🥺";
      }
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    // 0-9%: 抑郁
    const criticalThoughts = [
      "...",
      "*甚至不想说话*",
      "连bug都为我难过",
      "这是情绪的谷底",
      "我已经放弃快乐了"
    ];

    if (escalation > 3) {
      return "现在需要爱！💔😭💔";
    }
    return criticalThoughts[Math.floor(Math.random() * criticalThoughts.length)];
  }
}