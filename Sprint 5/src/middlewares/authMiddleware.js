const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

function readUsers() {
  return JSON.parse(fs.readFileSync(usersPath, 'utf-8'));
}

/* Middleware de aplicación: si existe la cookie "rememberUser",
 * busca el usuario y lo loguea en req.session */
function cookieAuth(req, res, next) {
  if (!req.session.user && req.cookies.rememberUser) {
    const users = readUsers();
    const user = users.find(u => u.email === req.cookies.rememberUser);
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