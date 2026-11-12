const http = require('http');

function sum(a, b) {
  return a + b;
}

function createServer() {
  return http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', service: 'cicd-lab3', sumExample: sum(1, 2) }));
  });
}

/* istanbul ignore next */
if (require.main === module) {
  const port = process.env.PORT || 3000;
  createServer().listen(port, '0.0.0.0', () => {
    console.log(`Server running on port ${port}`);
  });
}

module.exports = { sum, createServer };
