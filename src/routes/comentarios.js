const express = require("express");
const router = express.Router();
const {agregarComentario,getComentario,getComentarioPro, filComentarioPro} = require('../controllers/comentarios.js')


router.post("/add", agregarComentario)
router.get("/get", getComentario)
router.get("/getHab", getComentarioPro)
router.post("/filHab", filComentarioPro)


module.exports = router;