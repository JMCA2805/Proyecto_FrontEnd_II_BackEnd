var express = require('express');
var router = express.Router();
const controller = require('../controllers/offers-c.js');

router.get("/", controller.getOffers)

module.exports = router;
