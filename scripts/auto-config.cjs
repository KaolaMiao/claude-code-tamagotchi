#!/usr/bin/env node
/**
 * 自动配置脚本 - 安装后自动配置 Claude Code
 *
 * 功能：
 * 1. 自动配置 statusLine
 * 2. 复制 /pet-* 命令到 ~/.claude/commands/
 */

const fs = require('fs');
const path = require('path');
const os = require('os');

const PACKAGE_NAME = '@kaolamiao/claude-code-tamagotchi';
const CLAUDE_DIR = path.join(os.homedir(), '.claude');
const SETTINGS_FILE = path.join(CLAUDE_DIR, 'settings.json');
const COMMANDS_DIR = path.join(CLAUDE_DIR, 'commands');

// 获取包安装路径
function getPackagePath() {
  // 全局安装时，从 npm_global/node_modules/@dota/claude-code-tamagotchi 获取
  // 或从 bun install/global 获取
  try {
    // 尝试获取全局安装路径
    const { execSync } = require('child_process');
    let globalPath;

    try {
      // 优先使用 bun 的全局路径
      globalPath = execSync('bun pm bin -g', { encoding: 'utf-8' }).trim();
      const packagePath = path.join(globalPath, '..', 'node_modules', '@dota', 'claude-code-tamagotchi');
      if (fs.existsSync(packagePath)) {
        return packagePath;
      }
    } catch {}

    try {
      // 备用：npm 全局路径
      globalPath = execSync('npm root -g', { encoding: 'utf-8' }).trim();
      const packagePath = path.join(globalPath, '@dota', 'claude-code-tamagotchi');
      if (fs.existsSync(packagePath)) {
        return packagePath;
      }
    } catch {}
  } catch {}

  // 最后尝试从当前脚本位置推断
  return path.resolve(__dirname, '..');
}

// 确保目录存在
function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// 配置 statusLine
function configureStatusLine(packagePath) {
  ensureDir(CLAUDE_DIR);

  let settings = {};
  if (fs.existsSync(SETTINGS_FILE)) {
    try {
      settings = JSON.parse(fs.readFileSync(SETTINGS_FILE, 'utf-8'));
    } catch {
      console.log('⚠️  无法解析现有配置文件，将创建新配置');
      settings = {};
    }
  }

  // 检查是否已有配置
  if (settings.statusLine && settings.statusLine.command) {
    if (settings.statusLine.command.includes(PACKAGE_NAME) ||
        settings.statusLine.command.includes('claude-code-tamagotchi')) {
      console.log('✅ statusLine 已配置，跳过');
      return;
    }
    console.log('⚠️  已存在其他 statusLine 配置');
    console.log(`   当前: ${settings.statusLine.command}`);
    console.log(`   建议使用: bunx ${PACKAGE_NAME} statusline`);
    return;
  }

  // 添加配置
  settings.statusLine = {
    type: 'command',
    command: `bunx ${PACKAGE_NAME} statusline`,
    padding: 0
  };

  // 备份原文件
  if (fs.existsSync(SETTINGS_FILE)) {
    fs.copyFileSync(SETTINGS_FILE, SETTINGS_FILE + '.backup');
  }

  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings, null, 2));
  console.log('✅ statusLine 已自动配置');
}

// 复制命令文件
function copyCommands(packagePath) {
  ensureDir(COMMANDS_DIR);

  const sourceDir = path.join(packagePath, 'claude-commands');
  if (!fs.existsSync(sourceDir)) {
    console.log('⚠️  未找到命令模板目录，跳过命令安装');
    return;
  }

  const commands = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

  for (const cmd of commands) {
    const srcFile = path.join(sourceDir, cmd);
    const destFile = path.join(COMMANDS_DIR, cmd);

    // 替换路径占位符
    let content = fs.readFileSync(srcFile, 'utf-8');
    content = content.replace(/\$PET_PATH/g, packagePath);

    fs.writeFileSync(destFile, content);
    console.log(`   ✅ /${cmd.replace('.md', '')}`);
  }

  console.log('✅ Claude Code 命令已安装');
}

// 主函数
function main() {
  console.log('\n🐾 Claude Code Tamagotchi 自动配置 🐾\n');

  const packagePath = getPackagePath();
  console.log(`📦 包路径: ${packagePath}\n`);

  // 配置 statusLine
  console.log('⚙️  配置 statusLine...');
  configureStatusLine(packagePath);

  // 复制命令
  console.log('\n📁 安装 Claude Code 命令...');
  copyCommands(packagePath);

  console.log('\n✨ 配置完成！✨');
  console.log('\n🎮 可用命令:');
  console.log('   /pet-feed pizza  - 喂食');
  console.log('   /pet-play ball   - 玩耍');
  console.log('   /pet-stats       - 查看状态');
  console.log('   /pet-help        - 帮助\n');
}

main();
