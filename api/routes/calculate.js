const express = require('express');
const router = express.Router();
const eratosthenes = require('../formulas/eratosthenes')
const arraymiddle = require('../formulas/arraymiddle')

router.get('/findMedianPrime', function(req, res, next) {
  let error;
  if(!req.query.number) {
    error="Please Enter a Number"
  } else if (!Number.isInteger(parseFloat(req.query.number))) {
    error = 'Please Enter an Integer'
  } else if (parseFloat(req.query.number) <= 2) {
    error = 'Please Enter a number greater than 2'
  };
  if (error){
    res.send({error})
  } else {
    const primes = eratosthenes(req.query.number);
    const result = arraymiddle(primes);
    res.send({result});
  }
});

module.exports = router;
