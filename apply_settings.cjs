const fs = require('fs');
const path = 'C:/Users/Dota/.claude/settings.json';

try {
    let content = fs.readFileSync(path, 'utf8');

    // 移除已有的 statusLine 块（如果存在）
    content = content.replace(/"statusLine"\s*:\s*\{[\s\S]*?\}/g, '').trim();

    // 准备新配置
    const newConfig = `
    "statusLine": {
      "type": "command",
      "command": "cd /d D:/MyTools/claude-code-tamagotchi && bun run --silent src/index.ts",
      "padding": 0
    },
    "hooks": {
      "PreToolUse": [
        {
          "matcher": "*",
          "hooks": [
            {
              "type": "command",
              "command": "cd /d D:/MyTools/claude-code-tamagotchi && bunx . violation-check"
            }
          ]
        }
      ]
    }
    `;

    // 在最后一个 '}' 之前插入
    const lastBraceIndex = content.lastIndexOf('}');
    if (lastBraceIndex !== -1) {
        let prefix = content.substring(0, lastBraceIndex).trim();
        // 确保前缀有逗号
        if (prefix.endsWith(',')) {
            prefix = prefix.slice(0, -1);
        }
        const finalContent = prefix + ',
' + newConfig + '
}';
        fs.writeFileSync(path, finalContent, 'utf8');
        console.log('Successfully updated settings.json');
    } else {
        console.error('Could not find closing brace');
    }
} catch (e) {
    console.error('Error:', e.message);
}
