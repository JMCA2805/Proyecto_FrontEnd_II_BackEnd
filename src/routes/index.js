var express = require('express');
var router = express.Router();
const path = require('path');
const controller = require('../controllers/productos');

const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() });

router.get('/:id', (req, res) => {
  controller.obtenerProductos(req, res);
});

router.post('/', upload.single('imagen'), (req, res) => {
  controller.agregarProductos(req, res);
});

router.post('/:id', (req, res) => {
  controller.agregarCarrito(req, res);
});

router.delete('/', (req, res) => {
  controller.eliminarProducto(req, res);
});

router.put('/', upload.single('imagen'), (req, res) => {
  controller.editarProducto(req, res);
});

module.exports = router;
