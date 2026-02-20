import { PetState } from '../StateManager';

export class ComboThoughts {
  static getThought(state: PetState): string {
    // 检查有多少状态是低的
    const lowStats = this.getLowStats(state);

    // 四状态组合（所有状态）
    if (lowStats.length === 4) {
      return this.getAllStatsThought(state);
    }

    // 三状态组合
    if (lowStats.length === 3) {
      return this.getThreeStatThought(lowStats, state);
    }

    // 两状态组合
    if (lowStats.length === 2) {
      return this.getTwoStatThought(lowStats, state);
    }

    // 不应该到这里，但作为后备
    return "多件事情需要关注... 🤔";
  }

  private static getLowStats(state: PetState): string[] {
    const low = [];
    if (state.hunger < 40) low.push('hunger');
    if (state.energy < 40) low.push('energy');
    if (state.cleanliness < 40) low.push('cleanliness');
    if (state.happiness < 40) low.push('happiness');
    return low;
  }

  private static getTwoStatThought(stats: string[], state: PetState): string {
    const combo = stats.sort().join('+');

    switch (combo) {
      case 'energy+hunger':
        if (state.hunger < 20 && state.energy < 20) {
          return "太累吃不下，太饿睡不着... 😵";
        }
        const hungerEnergyThoughts = [
          "需要食物... 但也需要午睡... *困惑*",
          "各方面都空空如也",
          "又饿又累 - 最糟糕的组合",
          "我的肚子和眼皮都在抱怨"
        ];
        return hungerEnergyThoughts[Math.floor(Math.random() * hungerEnergyThoughts.length)];

      case 'cleanliness+hunger':
        if (state.hunger < 20 && state.cleanliness < 20) {
          return "我又饿又臭！🤢";
        }
        const hungerCleanThoughts = [
          "又脏又饿 - 这不是我最好的样子",
          "如果能的话我会吃掉身上的泥",
          "又饿又脏 - 谷底？",
          "先喂我，然后给我洗澡... 或者反过来？"
        ];
        return hungerCleanThoughts[Math.floor(Math.random() * hungerCleanThoughts.length)];

      case 'happiness+hunger':
        if (state.hunger < 20 && state.happiness < 20) {
          return "饿怒是真实存在的情绪！😠";
        }
        const hungerHappyThoughts = [
          "喂我也许我会再笑一笑",
          "我的悲伤尝起来像饥饿",
          "空着肚子开心不起来",
          "食物可能治愈我的抑郁"
        ];
        return hungerHappyThoughts[Math.floor(Math.random() * hungerHappyThoughts.length)];

      case 'cleanliness+energy':
        if (state.energy < 20 && state.cleanliness < 20) {
          return "太累了不在乎自己脏不脏 😴";
        }
        const energyCleanThoughts = [
          "又累又脏 - 巅峰表现",
          "我是只困倦的小灰尘兔",
          "太累洗不动，太脏睡不着",
          "这就是放弃的样子"
        ];
        return energyCleanThoughts[Math.floor(Math.random() * energyCleanThoughts.length)];

      case 'energy+happiness':
        if (state.energy < 20 && state.happiness < 20) {
          return "太累难过得起来... 等等，这更糟 😔";
        }
        const energyHappyThoughts = [
          "又难过又疲惫 - 这是职业倦怠吗？",
          "我的电池各方面都死了",
          "没能量，没快乐，没意义",
          "抑郁和疲惫 - 还有比这更糟的组合吗"
        ];
        return energyHappyThoughts[Math.floor(Math.random() * energyHappyThoughts.length)];

      case 'cleanliness+happiness':
        if (state.cleanliness < 20 && state.happiness < 20) {
          return "我又难过又难闻。谷底。😞";
        }
        const cleanHappyThoughts = [
          "又臭又惨 - 别理我",
          "我的外表和内心都很糟 - 太糟了",
          "又脏又抑郁",
          "连洗澡都洗不掉悲伤"
        ];
        return cleanHappyThoughts[Math.floor(Math.random() * cleanHappyThoughts.length)];

      default:
        return "多个需求需要关注！🚨";
    }
  }

  private static getThreeStatThought(stats: string[], state: PetState): string {
    // 检查是否三个都是危急状态
    const criticalCount = [
      state.hunger < 20 ? 1 : 0,
      state.energy < 20 ? 1 : 0,
      state.cleanliness < 20 ? 1 : 0,
      state.happiness < 20 ? 1 : 0
    ].reduce((a, b) => a + b, 0);

    if (criticalCount >= 3) {
      const criticalThoughts = [
        "紧急！多个系统故障！🚨",
        "这是一个求救的信号，以想法的形式",
        "三个红色警报！三个！🔴🔴🔴",
        "我正在各方面崩溃！"
      ];
      return criticalThoughts[Math.floor(Math.random() * criticalThoughts.length)];
    }

    // 特定的三状态组合
    if (!stats.includes('hunger')) {
      // 能量 + 清洁 + 开心低
      const thoughts = [
        "又累又脏又难过 - 我放弃了 😩",
        "睡不着，太脏太难过",
        "这是我变成反派的故事",
        "除了食物其他都错了"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    if (!stats.includes('energy')) {
      // 饥饿 + 清洁 + 开心低
      const thoughts = [
        "又饿又脏又难过 - 我有过更好的日子 😔",
        "这就是被遗弃的感觉吗？",
        "喂我，给我洗澡，爱我 - 求求",
        "至少我还不累... 暂时"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    if (!stats.includes('cleanliness')) {
      // 饥饿 + 能量 + 开心低
      const thoughts = [
        "又饿又累又难过 - 你为什么讨厌我？😢",
        "宠物忽视的三骑士",
        "我需要食物、睡眠和爱。按这个顺序。",
        "干净但其他都错了"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    if (!stats.includes('happiness')) {
      // 饥饿 + 能量 + 清洁低
      const thoughts = [
        "又饿又累又脏 - 悲伤三重奏 🥺",
        "我现在基本是个小怪物",
        "身体需求崩溃，精神需求即将崩溃",
        "开心？在这种情况下？"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    return "三件事错了 - 这很糟！😰";
  }

  private static getAllStatsThought(state: PetState): string {
    // 检查所有状态是否都是危急状态
    if (state.hunger < 20 && state.energy < 20 &&
        state.cleanliness < 20 && state.happiness < 20) {
      const criticalThoughts = [
        "就这样吧。我就这样变成反派的。😈",
        "404：求生欲未找到 💀",
        "这是最糟宠物主人的速通吗？",
        "我要向宠物保护服务投诉",
        "成就解锁：完全忽视 🏆",
        "一切都错了！一切！"
      ];
      return criticalThoughts[Math.floor(Math.random() * criticalThoughts.length)];
    }

    // 所有状态都低但不危急
    const thoughts = [
      "又饿又累又脏又难过。啥也不是。😤",
      "我正在同时经历各种形式的痛苦",
      "这就是谷底的感觉",
      "每个需求都没满足。每个。都。没。",
      "我不知道可能感觉这么糟",
      "完全系统故障即将来临"
    ];
    return thoughts[Math.floor(Math.random() * thoughts.length)];
  }

  // 高状态的特殊组合
  static getHighStatsThought(state: PetState): string {
    if (state.hunger > 80 && state.energy > 80 &&
        state.cleanliness > 80 && state.happiness > 80) {
      const thoughts = [
        "饱饱、休息好、干净、又开心！你是最棒的！🌟",
        "我达到了宠物涅槃！🧘",
        "这就是完美的感觉吗？✨",
        "过着最好的生活！10分10分会再养",
        "我太完美了简直在发光！💫",
        "这一定是天堂的感觉 😇"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }
    return "";
  }

  // 混合极端（有些高，有些低）
  static getMixedExtremeThought(state: PetState): string {
    const thoughts = [];

    if (state.hunger > 80 && state.energy < 20) {
      thoughts.push("饱但疲惫 - 食物昏迷是真的");
    }
    if (state.cleanliness > 80 && state.hunger < 20) {
      thoughts.push("我很干净但饿死了 - 优先级奇怪？");
    }
    if (state.happiness > 80 && state.hunger < 20) {
      thoughts.push("超级开心但快饿死了 - 否认？");
    }
    if (state.energy > 80 && state.cleanliness < 20) {
      thoughts.push("充满能量但很脏 - 混乱模式");
    }
    if (state.hunger > 80 && state.happiness < 20) {
      thoughts.push("吃得好但难过 - 食物不是一切");
    }

    return thoughts.length > 0
      ? thoughts[Math.floor(Math.random() * thoughts.length)]
      : "";
  }

  // 上下文感知的组合想法
  static getContextualComboThought(state: PetState, sessionLength: number): string {
    const lowStats = this.getLowStats(state);

    if (lowStats.length >= 2 && sessionLength > 200) {
      const thoughts = [
        "也许我们都该休息一下？🤔",
        "我知道代码很重要，但是... 看看我",
        "你在调试的时候你的宠物快死了",
        "代码可以等，我不能",
        "长会话 + 被忽视的宠物 = 悲伤时光"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    if (lowStats.length >= 2 && state.lastFed && Date.now() - state.lastFed < 60000) {
      const thoughts = [
        "那没持续多久... 😅",
        "已经？但你刚喂我！",
        "我的新陈代谢很快好吧？",
        "谢谢食物，但是... 其他需求也存在"
      ];
      return thoughts[Math.floor(Math.random() * thoughts.length)];
    }

    return "";
  }
}