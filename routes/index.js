var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.sendFile('audioChroma.html', { root: 'public' });
});

router.get('/getMusic', function(req, res, next) {
  fs.readdir('./public/music/', function(err, files) {
    if (err) throw err;

    console.log('Sent result: ' + files);
    res.status(200).json(files);
  })
});

module.exports = router;
