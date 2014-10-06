var resource = require('./rest-resource');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.json());

var router = express.Router();

router.get('/tasks', function(req, res) {
  console.log('get task list');
  res.json(resource.list());
});

router.get('/tasks/:task_id', function(req, res) {
  console.log('get task: ' + req.params.task_id);
  var task = resource.get(req.params.task_id);
  if (task) {
	res.json(task);
  } else {
    res.status(404).send('Not found');
  }
});

router.put('/tasks/:task_id', function(req, res) {
  console.log('put task: ' + req.params.task_id + ', body=' + JSON.stringify(req.body));
  if (req.body.id == req.params.task_id) {
    resource.put(req.params.task_id, req.body);
    res.status(204).send('');
  } else {
    res.status(400).send('');
  }
});

router.delete('/tasks/:task_id', function(req, res) {
  console.log('delete task: ' + req.params.task_id);
  if (resource.get(req.params.task_id)) {
    resource.delete(req.params.task_id);
    res.status(204).send('');
  } else {
    res.status(404).send('Not found');
  }
});

app.use('', router);

var port = process.env.PORT || 8080;
app.listen(port);
console.log('Now listening on port ' + port);
