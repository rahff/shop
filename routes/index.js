var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('', function(req, res) {
  res.render("index");
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.get('shop', function(req, res) {
  res.render("partials/shop");
});

module.exports = router;
