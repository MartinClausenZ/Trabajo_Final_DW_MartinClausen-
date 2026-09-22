const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const db = require('../database/models');

/* ---------- controladores ---------- */

const userController = {

  /* ===== FORMULARIOS (GET) ===== */

  /* LOGIN — formulario */
  loginForm: (req, res) => {
    res.render('users/login', { errors: {}, old: {} });
  },

  /* REGISTER — formulario */
  registerForm: (req, res) => {
    res.render('users/register', { errors: {}, old: {} });
  },

  /* ===== ACCIONES (POST) ===== */

  /* LOGIN — procesar */
  login: async (req, res) => {
    try {
      /* Verificar errores de express-validator */
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = {};
        result.array().forEach(err => {
          errors[err.param] = err.msg;
        });
        return res.render('users/login', {
          errors,
          old: req.body
        });
      }

      const { email, password, remember } = req.body;

      /* Buscar usuario por email */
      const user = await db.User.findOne({ where: { email } });

      /* Guardar datos del usuario en sesión (sin la contraseña) */
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        category: user.category,
        image: user.image
      };

      /* Cookie "Recordarme" */
      if (remember) {
        res.cookie('rememberUser', user.email, {
          maxAge: 1000 * 60 * 60 * 24 * 30,
          httpOnly: true
        });
      }

      res.redirect('/users/profile');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al iniciar sesión');
    }
  },

  /* REGISTER — procesar */
  store: async (req, res) => {
    try {
      /* Verificar errores de express-validator */
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = {};
        result.array().forEach(err => {
          errors[err.param] = err.msg;
        });
        return res.render('users/register', {
          errors,
          old: req.body
        });
      }

      const { firstName, lastName, email, password } = req.body;

      const newUser = await db.User.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, 10),
        category: 'user',
        image: req.file ? req.file.filename : '\uD83D\uDC64'
      });

      /* Loguear al usuario automáticamente después de registrarse */
      req.session.user = {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        category: newUser.category,
        image: newUser.image
      };

      res.redirect('/users/profile');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al registrar usuario');
    }
  },

  /* ===== PERFIL ===== */

  /* PROFILE — mostrar */
  profile: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const user = await db.User.findByPk(userId);

      if (!user) return res.redirect('/users/login');

      res.render('users/profile', { user });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al mostrar perfil');
    }
  },

  /* PROFILE — editar formulario */
  editForm: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const user = await db.User.findByPk(userId);

      if (!user) return res.redirect('/users/login');

      res.render('users/edit', { user, errors: {} });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al cargar formulario');
    }
  },

  /* PROFILE — actualizar */
  update: async (req, res) => {
    try {
      const userId = req.session.user.id;
      const user = await db.User.findByPk(userId);
      if (!user) return res.redirect('/users/login');

      /* Verificar errores de express-validator */
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = {};
        result.array().forEach(err => {
          errors[err.param] = err.msg;
        });
        return res.render('users/edit', {
          user: { ...user.toJSON(), ...req.body },
          errors
        });
      }

      await user.update({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email
      });

      /* Si cambió la contraseña */
      if (req.body.password && req.body.password.trim() !== '') {
        await user.update({ password: bcrypt.hashSync(req.body.password, 10) });
      }

      /* Si subieron imagen nueva */
      if (req.file) {
        await user.update({ image: req.file.filename });
      }

      /* Actualizar sesión */
      req.session.user = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        category: user.category,
        image: user.image
      };

      res.redirect('/users/profile');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al actualizar perfil');
    }
  },

  /* LOGOUT */
  logout: (req, res) => {
    req.session.destroy();
    res.clearCookie('rememberUser');
    res.clearCookie('verdiaSession');
    res.redirect('/');
  }
};

module.exports = userController;