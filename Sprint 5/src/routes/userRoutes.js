const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { guestOnly, authOnly } = require('../middlewares/authMiddleware');

/* Recibe `upload` (multer) desde app.js y arma las rutas */
module.exports = (upload) => {

  /* ===== RUTAS DE HUÉSPEDES (solo sin login) ===== */

  /* Formulario de login */
  router.get('/login', guestOnly, userController.loginForm);

  /* Procesar login */
  router.post('/login', guestOnly, userController.login);

  /* Formulario de registro */
  router.get('/register', guestOnly, userController.registerForm);

  /* Procesar registro (con subida de imagen) */
  router.post('/register', guestOnly, upload.single('image'), userController.store);

  /* ===== RUTAS DE USUARIOS (solo con login) ===== */

  /* Perfil */
  router.get('/profile', authOnly, userController.profile);

  /* Editar perfil — formulario */
  router.get('/profile/edit', authOnly, userController.editForm);

  /* Editar perfil — procesar (con subida de imagen) */
  router.put('/profile', authOnly, upload.single('image'), userController.update);

  /* Logout */
  router.post('/logout', authOnly, userController.logout);

  return router;
};