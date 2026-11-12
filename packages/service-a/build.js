const fs = require('fs');
fs.mkdirSync('dist', { recursive: true });
fs.copyFileSync('index.js', 'dist/index.js');
console.log('Service A build completed.');
