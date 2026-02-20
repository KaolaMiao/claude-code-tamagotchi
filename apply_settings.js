const fs = require('fs');
const path = 'C:/Users/Dota/.claude/settings.json';

try {
  let content = fs.readFileSync(path, 'utf8');

  // 配置内容字符串
  const configToAdd = `
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

  // 简单的字符串替换逻辑：定位最后一个 '}' 并在其前插入
  let lastBrace = content.lastIndexOf('}');
  if (lastBrace !== -1) {
    let beforeBrace = content.substring(0, lastBrace).trim();
    // 如果已有 statusLine，简单粗暴地先把它移除（通过正则匹配大概范围）
    beforeBrace = beforeBrace.replace(/"statusLine"\s*:\s*\{[\s\S]*?\}(,)?/g, '');
    beforeBrace = beforeBrace.trim();
    
    // 处理末尾逗号
    if (!beforeBrace.endsWith(',')) {
      beforeBrace += ',';
    }
    
    const newContent = beforeBrace + configToAdd + '
}';
    fs.writeFileSync(path, newContent, 'utf8');
    console.log('Successfully updated settings.json');
  } else {
    console.error('Could not find closing brace in settings.json');
  }
} catch (e) {
  console.error('Error modifying settings.json:', e.message);
}
