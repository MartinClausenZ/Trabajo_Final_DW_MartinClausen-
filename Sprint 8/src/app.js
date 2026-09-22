const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const db = require('./database/models');
const mainRoutes = require('./routes/mainRoutes');
const productRoutesFactory = require('./routes/productRoutes');
const userRoutesFactory = require('./routes/userRoutes');
const apiRoutes = require('./routes/apiRoutes');
const cors = require('cors');
const { cookieAuth } = require('./middlewares/authMiddleware');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

// CORS — permite que el dashboard React (puerto 3001) consuma la API (puerto 3000)
app.use(cors());

// Sesiones y cookies
app.use(session({
  secret: 'verdia-green-2026',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 días
    httpOnly: true
  }
}));
app.use(cookieParser());

// Middleware de aplicación: cookie de "Recordarme"
app.use(cookieAuth);

// Helpers globales para todas las vistas
app.locals.formatPrice = (price) =>
  '$' + Number(price).toLocaleString('es-AR');
app.locals.stars = (rating) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? 1 : 0;
  const empty = 5 - full - half;
  return '★'.repeat(full) + (half ? '½' : '') + '☆'.repeat(empty);
};

// Multer — subida de imágenes de productos
const productStorage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, '..', 'public', 'img', 'products')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `product-${Date.now()}${ext}`);
  }
});
const productUpload = multer({ storage: productStorage });

// Multer — subida de imágenes de usuarios (avatares)
const userStorage = multer.diskStorage({
  destination: (req, file, cb) =>
    cb(null, path.join(__dirname, '..', 'public', 'img', 'users')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `user-${Date.now()}${ext}`);
  }
});
const userUpload = multer({ storage: userStorage });

// Rutas
app.use('/', mainRoutes);
app.use('/products', productRoutesFactory(productUpload));
app.use('/users', userRoutesFactory(userUpload));
app.use('/api', apiRoutes);

// Servidor — sincronizar DB antes de arrancar
const PORT = process.env.PORT || 3000;

db.sequelize.sync({ alter: true })
  .then(() => {
    console.log('✅ Base de datos sincronizada con Sequelize');
    app.listen(PORT, () => {
      console.log(`🌿 Verdia funcionando en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al sincronizar la base de datos:', err);
    process.exit(1);
  });

module.exports = app;
