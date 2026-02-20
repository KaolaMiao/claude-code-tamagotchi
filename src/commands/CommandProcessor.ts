import * as fs from 'fs';
import { config } from '../utils/config';
import { PetAction } from '../engine/PetEngine';

// Define valid foods and their emojis
const VALID_FOODS: Record<string, string> = {
  'cookie': '🍪',
  'pizza': '🍕',
  'sushi': '🍣',
  'apple': '🍎',
  'carrot': '🥕',
  'steak': '🥩',
  'fish': '🐟',
  'candy': '🍬'
};

// Define valid toys
const VALID_TOYS: Record<string, string> = {
  'ball': '🎾',
  'frisbee': '🥏',
  'laser': '🔴',
  'yarn': '🧶',
  'puzzle': '🧩'
};

export class CommandProcessor {
  static async writeAction(command: string, parameter?: string): Promise<void> {
    const action: PetAction = {
      command,
      parameter,
      timestamp: Date.now()
    };
    
    try {
      // Write action to file for the statusline to pick up
      fs.writeFileSync(config.actionFile, JSON.stringify(action, null, 2));
    } catch (error) {
      console.error('Failed to write action:', error);
    }
  }
  
  static async processCommand(input: string): Promise<string> {
    const parts = input.trim().split(/\s+/);
    const command = parts[0]?.toLowerCase().replace('/', '');
    const parameter = parts.slice(1).join(' ');
    
    // Try to read current state for context-aware responses
    let state: any = null;
    try {
      if (fs.existsSync(config.stateFile)) {
        const stateData = fs.readFileSync(config.stateFile, 'utf-8');
        state = JSON.parse(stateData);
      }
    } catch {}
    
    switch (command) {
      case 'pet':
        await this.writeAction('pet');
        if (state?.sessionUpdateCount > 100) {
          return `You pet ${state.name}! They've been coding with you for a while and really appreciate the attention! 💕`;
        }
        return 'You pet your companion! 💕';
        
      case 'feed':
        const food = parameter || 'cookie';
        
        // Validate food
        if (!VALID_FOODS[food.toLowerCase()]) {
          return `Sorry, "${food}" is not a valid food. Try: ${Object.keys(VALID_FOODS).join(', ')}`;
        }
        
        const foodEmoji = VALID_FOODS[food.toLowerCase()];
        await this.writeAction('feed', food.toLowerCase());
        
        if (state?.sessionUpdateCount > 50 && state?.hunger < 50) {
          return `Perfect timing! ${state.name} was getting hungry from all this coding. Feeding ${food}! ${foodEmoji}`;
        }
        return `Feeding ${food} to your pet! ${foodEmoji}`;
        
      case 'play':
        const toy = parameter || 'ball';
        
        // Validate toy
        if (!VALID_TOYS[toy.toLowerCase()]) {
          return `Sorry, "${toy}" is not a valid toy. Try: ${Object.keys(VALID_TOYS).join(', ')}`;
        }
        
        const toyEmoji = VALID_TOYS[toy.toLowerCase()];
        await this.writeAction('play', toy.toLowerCase());
        
        if (state?.sessionUpdateCount > 100) {
          return `Great idea! ${state.name} needs a break after coding for so long. Playing with ${toy}! ${toyEmoji}`;
        }
        return `Playing with ${toy}! ${toyEmoji}`;
        
      case 'sleep':
        await this.writeAction('sleep');
        
        // Directly update the state file to set isAsleep
        if (state) {
          state.isAsleep = true;
          state.lastSlept = Date.now();
          state.systemMessage = `${state.name} is going to sleep... 😴`;
          state.messageTimestamp = Date.now();
          fs.writeFileSync(config.stateFile, JSON.stringify(state, null, 2));
        }
        
        if (state?.energy < 30) {
          return `${state.name} is exhausted and grateful for the rest... 😴`;
        }
        return 'Your pet is going to sleep... 😴';
        
      case 'wake':
        await this.writeAction('wake');
        return 'Waking up your pet! ☀️';
        
      case 'clean':
        await this.writeAction('clean');
        // Force an immediate update by running the pet engine
        const cleanExec = require('child_process').execSync;
        try {
          cleanExec(`${__dirname}/../../dist/index.js`, { stdio: 'ignore' });
        } catch {}
        return 'Giving your pet a bath! 🛁';
        
      case 'heal':
        await this.writeAction('heal');
        return 'Giving medicine to your pet! 💊';
        
      case 'pet-name':
        if (parameter) {
          await this.writeAction('name', parameter);
          
          // Directly update the state file to change name
          if (state) {
            state.name = parameter;
            state.systemMessage = `I'm ${parameter} now! 🏷️`;
            state.messageTimestamp = Date.now();
            fs.writeFileSync(config.stateFile, JSON.stringify(state, null, 2));
            return `Pet renamed to ${parameter}!`;
          }
          return `Pet renamed to ${parameter}!`;
        }
        return 'Usage: /pet-name <name>';
        
      case 'pet-trick':
        if (parameter) {
          await this.writeAction('trick', parameter);
          return `Teaching ${parameter} trick!`;
        }
        return 'Usage: /pet-trick <rollover|speak|dance>';
        
      case 'pet-stats':
        return await this.getStats();
        
      case 'pet-reset':
        return await this.resetPet();
        
      case 'pet-help':
        return this.getHelp();

      case 'pet-custom':
        if (parameter) {
          return await this.setCustomStat(parameter);
        }
        return 'Usage: /pet-custom <icon> <value> | /pet-custom <value> | /pet-custom clear';

      default:
        return 'Unknown command. Try /pet-help';
    }
  }

  /**
   * Parse and set custom stat from various input formats
   * Supports:
   * - "📊 45" → icon="📊", value=45
   * - "45" → icon="📊" (default), value=45
   * - "45%" → icon="📊" (default), value=45
   * - "剩余配额: 45%" → extracts 45
   * - "clear" → clears the custom stat
   */
  private static async setCustomStat(input: string): Promise<string> {
    try {
      // Handle clear command
      if (input.toLowerCase() === 'clear') {
        if (fs.existsSync(config.stateFile)) {
          const stateData = fs.readFileSync(config.stateFile, 'utf-8');
          const state = JSON.parse(stateData);
          state.customStat = undefined;
          fs.writeFileSync(config.stateFile, JSON.stringify(state, null, 2));
        }
        return 'Custom stat cleared.';
      }

      // Parse input to extract icon and value
      const parsed = this.parseCustomStatInput(input);

      if (!parsed) {
        return 'Invalid format. Use: /pet-custom <icon> <value> or /pet-custom <value>';
      }

      const { icon, value } = parsed;

      // Clamp value to valid range
      const clampedValue = Math.max(0, Math.min(100, value));

      // Update state file
      if (fs.existsSync(config.stateFile)) {
        const stateData = fs.readFileSync(config.stateFile, 'utf-8');
        const state = JSON.parse(stateData);

        state.customStat = {
          icon,
          value: clampedValue,
          updatedAt: Date.now()
        };

        fs.writeFileSync(config.stateFile, JSON.stringify(state, null, 2));
        return `Custom stat set: ${icon}${clampedValue}%`;
      }

      return 'Custom stat set (will appear on next update)';
    } catch (error) {
      return `Failed to set custom stat: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Parse custom stat input with smart extraction
   */
  private static parseCustomStatInput(input: string): { icon: string; value: number } | null {
    const trimmed = input.trim();

    // Clear command
    if (trimmed.toLowerCase() === 'clear') {
      return null;
    }

    // First try: pure number (e.g., "45")
    const pureNumberMatch = trimmed.match(/^-?\d+$/);
    if (pureNumberMatch) {
      const value = parseInt(pureNumberMatch[0], 10);
      if (!isNaN(value)) {
        return { icon: '📊', value };
      }
    }

    // Second try: extract first number and any preceding emoji/symbol
    // Match emoji/symbol followed by number (with optional separator)
    const iconValueMatch = trimmed.match(/([\p{Emoji}\p{Symbol}]+)\s*(-?\d+)/u);
    if (iconValueMatch) {
      const icon = iconValueMatch[1];
      const value = parseInt(iconValueMatch[2], 10);
      if (!isNaN(value)) {
        return { icon, value };
      }
    }

    // Third try: extract first number from any text, use default icon
    const numberMatch = trimmed.match(/(-?\d+)/);
    if (numberMatch) {
      const value = parseInt(numberMatch[1], 10);
      if (!isNaN(value)) {
        return { icon: '📊', value };
      }
    }

    return null;
  }

  private static async getStats(): Promise<string> {
    try {
      if (!fs.existsSync(config.stateFile)) {
        return 'No pet data found. Pet will be created on next statusline update.';
      }
      
      const stateData = fs.readFileSync(config.stateFile, 'utf-8');
      const state = JSON.parse(stateData);
      
      const ageHours = Math.floor(state.age / 60);
      const ageMinutes = state.age % 60;
      
      // Calculate session duration
      const sessionMinutes = Math.floor((Date.now() - state.sessionStartTime) / 60000);
      
      // Activity level assessment
      let activityLevel = 'Low';
      const recentUpdates = state.recentUpdateTimestamps?.filter(
        (t: number) => Date.now() - t < 60000
      ).length || 0;
      if (recentUpdates > 20) activityLevel = 'Intense';
      else if (recentUpdates > 10) activityLevel = 'High';
      else if (recentUpdates > 5) activityLevel = 'Moderate';
      
      // Mood interpretation
      const moodDescription = {
        'normal': 'Content',
        'happy': 'Happy',
        'debugging': 'Focused (debugging)',
        'celebrating': 'Celebrating!',
        'tired': 'Tired',
        'focused': 'Deep Focus',
        'sleeping': 'Sleeping'
      }[state.currentMood] || 'Unknown';
      
      // Suggestions based on state
      const suggestions = [];
      if (state.hunger < 30) suggestions.push('🍪 Pet is hungry!');
      if (state.energy < 30) suggestions.push('😴 Pet needs rest!');
      if (state.sessionUpdateCount > 150) suggestions.push('🎾 Time for a play break!');
      if (state.happiness < 50) suggestions.push('💕 Pet needs attention!');
      if (state.cleanliness < 50) suggestions.push('🛁 Bath time!');
      
      return `
🐾 Pet Statistics 🐾
━━━━━━━━━━━━━━━━━━
Name: ${state.name}
Type: ${state.type}
Age: ${ageHours}h ${ageMinutes}m
Evolution: Stage ${state.evolutionStage}
Mood: ${moodDescription}

📊 Vital Stats:
❤️ Happiness: ${Math.round(state.happiness)}%
🍖 Hunger: ${Math.round(state.hunger)}%
⚡ Energy: ${Math.round(state.energy)}%
🏥 Health: ${Math.round(state.health)}%
🧼 Cleanliness: ${Math.round(state.cleanliness)}%

💻 Coding Session:
Session Duration: ${sessionMinutes} minutes
Session Updates: ${state.sessionUpdateCount}
Activity Level: ${activityLevel}
Total Sessions: ${state.sessionsToday || 1}

📈 Lifetime Stats:
Total Feedings: ${state.totalFeedings}
Play Sessions: ${state.totalPlaySessions}
Favorite Food: ${state.favoriteFood}
Tricks Learned: ${state.tricks.length > 0 ? state.tricks.join(', ') : 'None'}
${suggestions.length > 0 ? '\n💡 Suggestions:\n' + suggestions.join('\n') : ''}
`;
    } catch (error) {
      return 'Failed to read pet stats.';
    }
  }
  
  private static async resetPet(): Promise<string> {
    try {
      if (fs.existsSync(config.stateFile)) {
        fs.unlinkSync(config.stateFile);
      }
      return 'Pet has been reset. A new pet will be created on next statusline update.';
    } catch (error) {
      return 'Failed to reset pet.';
    }
  }
  
  private static getHelp(): string {
    return `🐾 Claude Code Pet Commands 🐾

🍼 CARE: /pet-pet, /pet-feed [food], /pet-play [toy], /pet-clean, /pet-sleep
📊 INFO: /pet-status, /pet-stats, /pet-help
🎨 CUSTOM: /pet-name [name], /pet-custom [icon] <value>
⚙️ MANAGE: /pet-reset

🍽️ FOODS: cookie, pizza, sushi, apple, carrot, steak, fish, candy
🎮 TOYS: ball, frisbee, laser, yarn, puzzle

📊 CUSTOM STAT: /pet-custom <icon> <value> | /pet-custom <value> | /pet-custom clear
  Examples: /pet-custom 📊 45 | /pet-custom 67 | /pet-custom clear

⚠️ NEEDS ATTENTION: 🍖<30% (feed) ⚡<30% (sleep) 🧼<30% (clean)`;
  }
}