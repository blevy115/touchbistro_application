var express = require('express');
var router = express.Router();

router.get('/findMedianPrime', function(req, res, next) {
  const double = req.query.number * 2;
  res.send({double});
});

module.exports = router;
