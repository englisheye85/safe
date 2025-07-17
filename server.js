// server.js
const http = require('http');
const fs = require('fs');
const querystring = require('querystring');

const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/') {
    // index.html 파일을 읽어 응답
    fs.readFile('index.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        res.end('파일 읽기 실패');
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(data);
      }
    });
  } else if (req.method === 'POST' && req.url === '/submit') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const parsed = querystring.parse(body);
      const name = parsed.name;
      const age = parsed.age;

      res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end(`환영합니다, ${name}\n당신은 ${age}살 입니다`);
    });
  } else {
    res.writeHead(404);
    res.end('페이지를 찾을 수 없습니다');
  }
});

server.listen(3000, () => {
  console.log('서버가 http://localhost:3000 에서 실행 중입니다');
});