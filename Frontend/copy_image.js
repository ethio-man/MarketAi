const fs = require('fs');
const path = require('path');

const srcPath = path.join(
  process.env.USERPROFILE,
  '.gemini',
  'antigravity',
  'brain',
  '28eec087-d5fa-4e63-8d73-8173867274be',
  'ethiopia_market_analytics_1777633597182.png'
);

const destPath = path.join(__dirname, 'public', 'analytics-demo.png');

fs.copyFileSync(srcPath, destPath);
console.log('Image copied successfully!');
