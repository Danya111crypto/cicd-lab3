const http = require('http');
const { sum, createServer } = require('./index');

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});

test('HTTP server responds with status 200', (done) => {
  const server = createServer();
  server.listen(0, () => {
    const { port } = server.address();
    http.get(`http://127.0.0.1:${port}`, (res) => {
      expect(res.statusCode).toBe(200);
      server.close(done);
    });
  });
});
