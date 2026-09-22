const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.list);
router.get('/detail', productController.detail);
router.get('/cart', productController.cart);
router.get('/create', productController.createForm);
router.get('/edit', productController.editForm);

module.exports = router;
