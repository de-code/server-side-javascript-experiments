var http = require('http');

var server = http.createServer(function (req, res) {
  console.log('Received request: ' + req.url);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello Node!');
});

server.listen(8080);
console.log('Now listening on port 8080');
