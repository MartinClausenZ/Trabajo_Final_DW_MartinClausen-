const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const usersPath = path.join(__dirname, '..', 'data', 'users.json');

/* ---------- helpers ---------- */

function readUsers() {
  const raw = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(raw);
}

function writeUsers(users) {
  fs.writeFileSync(usersPath, JSON.stringify(users, null, 2));
}

function nextUserId() {
  const users = readUsers();
  if (users.length === 0) return 1;
  return Math.max(...users.map(u => u.id)) + 1;
}

/* ---------- controladores ---------- */

const userController = {

  /* ===== FORMULARIOS (GET) ===== */

  /* LOGIN — formulario */
  loginForm: (req, res) => {
    res.render('users/login', { errors: null, old: null });
  },

  /* REGISTER — formulario */
  registerForm: (req, res) => {
    res.render('users/register', { errors: null, old: null });
  },

  /* ===== ACCIONES (POST) ===== */

  /* LOGIN — procesar */
  login: (req, res) => {
    const users = readUsers();
    const { email, password, remember } = req.body;

    /* Buscar usuario por email */
    const user = users.find(u => u.email === email);

    if (!user) {
      return res.render('users/login', {
        errors: { email: 'No existe una cuenta con ese email' },
        old: req.body
      });
    }

    /* Verificar contraseña */
    const valid = bcrypt.compareSync(password, user.password);
    if (!valid) {
      return res.render('users/login', {
        errors: { password: 'La contraseña es incorrecta' },
        old: req.body
      });
    }

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
        maxAge: 1000 * 60 * 60 * 24 * 30, // 30 días
        httpOnly: true
      });
    }

    res.redirect('/users/profile');
  },

  /* REGISTER — procesar */
  store: (req, res) => {
    const users = readUsers();
    const { firstName, lastName, email, password } = req.body;

    /* Verificar si el email ya existe */
    const exists = users.find(u => u.email === email);
    if (exists) {
      return res.render('users/register', {
        errors: { email: 'Ya existe una cuenta con ese email' },
        old: req.body
      });
    }

    const newUser = {
      id: nextUserId(),
      firstName,
      lastName,
      email,
      password: bcrypt.hashSync(password, 10),
      category: 'user',
      image: req.file ? req.file.filename : '👤'
    };

    users.push(newUser);
    writeUsers(users);

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
  },

  /* ===== PERFIL ===== */

  /* PROFILE — mostrar */
  profile: (req, res) => {
    const users = readUsers();
    const userId = req.session.user.id;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.redirect('/users/login');
    }

    res.render('users/profile', { user });
  },

  /* PROFILE — editar formulario */
  editForm: (req, res) => {
    const users = readUsers();
    const userId = req.session.user.id;
    const user = users.find(u => u.id === userId);

    if (!user) {
      return res.redirect('/users/login');
    }

    res.render('users/edit', { user, errors: null });
  },

  /* PROFILE — actualizar */
  update: (req, res) => {
    const users = readUsers();
    const userId = req.session.user.id;
    const idx = users.findIndex(u => u.id === userId);

    if (idx === -1) {
      return res.redirect('/users/login');
    }

    const updated = {
      ...users[idx],
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
    };

    /* Si cambió la contraseña */
    if (req.body.password && req.body.password.trim() !== '') {
      updated.password = bcrypt.hashSync(req.body.password, 10);
    }

    /* Si subieron imagen nueva */
    if (req.file) {
      updated.image = req.file.filename;
    }

    users[idx] = updated;
    writeUsers(users);

    /* Actualizar sesión */
    req.session.user = {
      id: updated.id,
      firstName: updated.firstName,
      lastName: updated.lastName,
      email: updated.email,
      category: updated.category,
      image: updated.image
    };

    res.redirect('/users/profile');
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