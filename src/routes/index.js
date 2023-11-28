var express = require('express');
var router = express.Router();
const path = require('path');
const controller = require('../controllers/productos');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/productos', (req, res) => {
  controller.obtenerProductos(req, res);
});

router.post('/productos', upload.single('imagen'), (req, res) => {
  controller.agregarProductos(req, res);
});

router.post('/productos/:id', (req, res) => {
  controller.agregarCarrito(req, res);
});

router.delete('/productos', (req, res) => {
  controller.eliminarProducto(req, res);
});

router.put('/productos', upload.single('imagen'), (req, res) => {
  controller.editarProducto(req, res);
});

module.exports = router;
