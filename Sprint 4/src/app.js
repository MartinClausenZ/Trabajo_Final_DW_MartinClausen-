const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const multer = require('multer');
const mainRoutes = require('./routes/mainRoutes');
const productRoutesFactory = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Configuración
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middlewares
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(methodOverride('_method'));

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
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'public', 'img', 'products')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `product-${Date.now()}${ext}`);
  }
});
const upload = multer({ storage });

// Rutas
app.use('/', mainRoutes);
app.use('/products', productRoutesFactory(upload));
app.use('/users', userRoutes);

// Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🌿 Verdia funcionando en http://localhost:${PORT}`);
});

module.exports = app;