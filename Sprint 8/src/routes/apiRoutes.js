const express = require('express');
const router = express.Router();
const apiController = require('../controllers/apiController');

/* ===== API DE USUARIOS ===== */
router.get('/users', apiController.usersList);
router.get('/users/:id', apiController.userDetail);

/* ===== API DE PRODUCTOS ===== */
router.get('/products', apiController.productsList);
router.get('/products/:id', apiController.productDetail);

/* ===== DASHBOARD DATA (endpoint extra) ===== */
router.get('/dashboard', apiController.dashboard);

module.exports = router;