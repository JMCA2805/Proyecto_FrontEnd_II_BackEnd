const express = require("express");
const router = express.Router();
const {agregarComentario,  filReseñaProd} = require('../controllers/reseñas.js')


router.post("/add", agregarComentario)
router.post("/getResProd", filReseñaProd)


module.exports = router;