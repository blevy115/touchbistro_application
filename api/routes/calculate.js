var express = require('express');
var router = express.Router();
var eratosthenes = require('../formulas/eratosthenes')



router.get('/findMedianPrime', function(req, res, next) {
  const result = eratosthenes(req.query.number).join(' ')
  res.send({result});

});

module.exports = router;
