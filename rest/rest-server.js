var http = require('http');
var resource = require('./rest-resource');

function unsupportedMethod(req, res) {
  res.writeHead(400, {'Content-Type': 'text/plain'});
  res.end('Unsupported method: ' + req.method);
}

function notFound(req, res) {
  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('Not found: ' + req.url);
}

function getTaskList(req, res) {
  console.log('get task list');
  res.writeHead(200, {'Content-Type': 'application/json'});
  res.end(JSON.stringify(resource.list()));
}

function getTask(req, res, id) {
  console.log('get task: ' + id);
  var task = resource.get(id);
  if (task) {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.end(JSON.stringify(task));
  } else {
    notFound(req, res);
  }
}

function putTask(req, res, id) {
  console.log('put task: ' + id);
  var body = '';
  req.on('data', function (chunk) {
    body += chunk;
  });
  req.on('end', function () {
    console.log('body: ' + body);
    resource.put(id, JSON.parse(body));
    res.writeHead(204, {'Content-Type': 'text/plain'});
    res.end();
  });
}

function deleteTask(req, res, id) {
  console.log('delete task: ' + id);
  if (resource.get(id)) {
    resource.delete(id);
    res.writeHead(204, {'Content-Type': 'text/plain'});
    res.end();
  } else {
    notFound(req, res);
  }
}

var server = http.createServer(function (req, res) {
  console.log('Received request: ' + req.url + ' (' + req.method + ')');
  if (/^\/tasks(\/)?$/.exec(req.url)) {
    if (req.method == "GET") {
      getTaskList(req, res);
    } else {
      unsupportedMethod(req, res);
    }
  } else {
    var taskMatch = /^\/tasks\/([^\/])+(\/)?$/.exec(req.url);
    if (taskMatch) {
      var id = taskMatch[1];
      if (req.method == "GET") {
        getTask(req, res, id);
      } else if (req.method == "PUT") {
        putTask(req, res, id);
      } else if (req.method == "DELETE") {
        deleteTask(req, res, id);
      } else {
        unsupportedMethod(req, res);
      }
    } else {
      notFound(req, res);
    }
  }
});

server.listen(8080);
console.log('Now listening on port 8080');
