var express = require('express');
var router = express.Router();
var infos = { platform: "node.js", framework: "express", node_version: "14", express_version: "4" };

/* GET home page. */
router.get('/infos', function(req, res, next) {
  res.status(200).json(infos);
});

module.exports = router;
