const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

/* Recibe `upload` (multer) desde app.js y arma las rutas */
module.exports = (upload) => {

  /* GET — lectura */
  router.get('/', productController.list);                  // Listado de productos
  router.get('/create', productController.createForm);      // Formulario de creación
  router.get('/:id', productController.detail);              // Detalle de un producto
  router.get('/:id/edit', productController.editForm);      // Formulario de edición

  /* POST — creación (con subida de imagen) */
  router.post('/', upload.single('image'), productController.store);

  /* PUT — edición (con subida de imagen opcional) */
  router.put('/:id', upload.single('image'), productController.update);

  /* DELETE — borrado */
  router.delete('/:id', productController.destroy);

  return router;
};