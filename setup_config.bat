@echo off
node -e "const fs = require('fs'); const path = 'C:/Users/Dota/.claude/settings.json'; let content = fs.readFileSync(path, 'utf8'); content = content.replace(/"statusLine":\s*\{[\s\S]*?\}/g, ''); let lastBrace = content.lastIndexOf('}'); if (lastBrace !== -1) { let prefix = content.substring(0, lastBrace).trim(); if (prefix.endsWith(',')) prefix = prefix.slice(0, -1); const newConfig = ',
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
}'; fs.writeFileSync(path, prefix + newConfig, 'utf8'); console.log('Configuration successful'); }"
