const bcrypt = require('bcryptjs');
const db = require('../database/models');

/* Middleware de aplicación: si existe la cookie "rememberUser",
 * busca el usuario en la DB y lo loguea en req.session */
async function cookieAuth(req, res, next) {
  if (!req.session.user && req.cookies.rememberUser) {
    try {
      const user = await db.User.findOne({
        where: { email: req.cookies.rememberUser }
      });
      if (user) {
        req.session.user = {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          category: user.category,
          image: user.image
        };
      }
    } catch (err) {
      console.error('Error en cookieAuth:', err);
    }
  }
  /* Pasa los datos del usuario logueado a res.locals
   * para que estén disponibles en TODAS las vistas */
  res.locals.user = req.session.user || null;
  next();
}

/* Middleware de ruta: solo accesible si NO estás logueado (huéspedes) */
function guestOnly(req, res, next) {
  if (req.session.user) {
    return res.redirect('/users/profile');
  }
  next();
}

/* Middleware de ruta: solo accesible si ESTÁS logueado (usuarios) */
function authOnly(req, res, next) {
  if (!req.session.user) {
    return res.redirect('/users/login');
  }
  next();
}

module.exports = { cookieAuth, guestOnly, authOnly };
