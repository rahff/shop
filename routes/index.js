var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res) {
  res.render("index");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get('/register', function(req, res) {
  res.render("register");
});

router.get('/forgot_password', function(req, res) {
  res.render("forgot");
});

router.get('/cart', function(req, res) {
  res.render("cart");
});

module.exports = router;
