const fs = require('fs');
console.log('Building Service B heavy bundle...');
setTimeout(() => {
  fs.mkdirSync('dist', { recursive: true });
  fs.copyFileSync('index.js', 'dist/index.js');
  console.log('Service B build completed.');
}, 15000);
