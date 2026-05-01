const fs = require('fs');
const path = require('path');

const srcPath = path.join(
  process.env.USERPROFILE,
  '.gemini',
  'antigravity',
  'brain',
  '28eec087-d5fa-4e63-8d73-8173867274be',
  'campaigns_demo_1777636809422.png'
);

const destPath = path.join(__dirname, 'public', 'campaigns-demo.png');

fs.copyFileSync(srcPath, destPath);
console.log('Campaigns Image copied successfully!');
