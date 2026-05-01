const fs = require('fs');
const path = require('path');

const srcPath = path.join(
  process.env.USERPROFILE,
  '.gemini',
  'antigravity',
  'brain',
  '28eec087-d5fa-4e63-8d73-8173867274be',
  'marketmeda_action_1777638330925.png'
);

const destPath = path.join(__dirname, 'public', 'marketmeda-action.png');

fs.copyFileSync(srcPath, destPath);
console.log('Action Image copied successfully!');
