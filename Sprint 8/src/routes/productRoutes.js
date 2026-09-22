const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const validateProduct = require('../middlewares/validateProduct');
const { authOnly } = require('../middlewares/authMiddleware');

/* Recibe `upload` (multer) desde app.js y arma las rutas */
module.exports = (upload) => {

  /* GET — lectura */
  router.get('/', productController.list);
  router.get('/create', authOnly, productController.createForm);
  router.get('/:id', productController.detail);
  router.get('/:id/edit', authOnly, productController.editForm);

  /* POST — creación (con subida de imagen + validación back-end) */
  router.post('/', upload.single('image'), validateProduct, productController.store);

  /* PUT — edición (con subida de imagen opcional + validación back-end) */
  router.put('/:id', upload.single('image'), validateProduct, productController.update);

  /* DELETE — borrado */
  router.delete('/:id', authOnly, productController.destroy);

  return router;
};