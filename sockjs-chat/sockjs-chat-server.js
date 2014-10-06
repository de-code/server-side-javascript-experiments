var http = require('http');
var sockjs = require('sockjs');

var clients = {};

var chatServer = sockjs.createServer();

chatServer.on('connection', function(conn) {
  clients[conn.id] = conn;
  conn.on('data', function(message) {
    console.log(message);
    for (var id in clients) {
      clients[id].write(message);
    }
  });
  conn.on('close', function() {
    delete clients[conn.id];
  });
});

var server = http.createServer();
chatServer.installHandlers(server, {prefix: '/chat'});
server.listen(8080);
