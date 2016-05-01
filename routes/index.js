var express = require('express');
var router = express.Router();
var path = require('path');

var uploader = undefined;
var count = 0;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.post('/test', function(req, res, next) {
  var commandString = `node ${path.join(__dirname, 'uploader.js')}`;
  uploader = require('child_process').exec(commandString, (error, stdout, stderr) => {
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
    if (error !== null) {
      console.log(`exec error: ${error}`);
    }
  });
  res.send('beginning to count');
});

router.post('/cancel', function(req, res, next) {
  if (uploader !== undefined) {
    uploader.kill("SIGINT");
    uploader = undefined;
    res.send('process cancelled');
  } else {
    res.send('no process available to cancel');
  }
});

module.exports = router;
