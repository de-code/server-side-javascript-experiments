var http = require('http');
var url = require('url');

var baseUrl = 'http://localhost:8080/';
var baseUrlOptions = url.parse(baseUrl);

function getTaskList() {
  http.get(baseUrl + 'tasks', function(res) {
    console.log('status: ' + res.statusCode);
    res.on('data', function (chunk) {
      // TODO this is only a chunk, but okay for the test client
      console.log('body: ' + chunk);
    });
  }).on('error', function(error) {
    console.log('error: ' + error.message);
  });
}

function getTask(id) {
  http.get(baseUrl + 'tasks/' + id, function(res) {
    console.log('status: ' + res.statusCode);
    res.on('data', function (chunk) {
      // TODO this is only a chunk, but okay for the test client
      console.log('body: ' + chunk);
    });
  }).on('error', function(error) {
    console.log('error: ' + error.message);
  });
}

function putTask(id, text) {
  var entry = {
    id: id,
    text: text
  };
  http.request({
    path: baseUrlOptions.path + 'tasks/' + id,
    hostname: baseUrlOptions.hostname,
    port: baseUrlOptions.port,
    method: "PUT",
    headers: { 'Content-Type': 'application/json' }
  }, function(res) {
    console.log('status: ' + res.statusCode);
    res.emit('end');
  }).on('error', function(error) {
    console.log('error: ' + error.message);
  }).end(JSON.stringify(entry));
}

function deleteTask(id) {
  http.request({
    path: baseUrlOptions.path + 'tasks/' + id,
    hostname: baseUrlOptions.hostname,
    port: baseUrlOptions.port,
    method: "DELETE"
  }, function(res) {
    console.log('status: ' + res.statusCode);
    res.emit('end');
  }).on('error', function(error) {
    console.log('error: ' + error.message);
  }).end();
}

var arguments = process.argv.slice(2);

var command = arguments[0];

if (command === 'list') {
  getTaskList();
} else if (command === 'get') {
  var id = arguments[1];
  getTask(id);
} else if (command === 'put') {
  var id = arguments[1];
  var text = arguments[2];
  putTask(id, text);
} else if (command === 'delete') {
  var id = arguments[1];
  deleteTask(id);
} else {
  console.log('Usage: ' + process.argv[0] + ' ' + process.argv[1] + ' list | get <id> | add <id> <text> | delete <id>');
}
