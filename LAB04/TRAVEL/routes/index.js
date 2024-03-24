var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Travel website' });
});

// Routes for individual actors
router.get('/tokyo', function(req, res, next) {
  res.render('TOKYO');
});

router.get('/newyork', function(req, res, next) {
  res.render('NEWYORK');
});

router.get('/paris', function(req, res, next) {
  res.render('PARIS');
});

router.get('/rome', function(req, res, next) {
  res.render('ROME');
});

module.exports = router;
