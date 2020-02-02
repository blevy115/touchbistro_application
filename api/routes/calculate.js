const express = require('express');
const router = express.Router();
const eratosthenes = require('../formulas/eratosthenes')
const arraymiddle = require('../formulas/arraymiddle')




router.get('/findMedianPrime', function(req, res, next) {
  const primes = eratosthenes(req.query.number);
  const result = arraymiddle(primes);
  res.send({result});
});

module.exports = router;
