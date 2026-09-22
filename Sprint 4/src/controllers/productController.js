const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'data', 'products.json');

/* ---------- helpers ---------- */

function readProducts() {
  const raw = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(raw);
}

function writeProducts(products) {
  fs.writeFileSync(productsPath, JSON.stringify(products, null, 2));
}

function nextId() {
  const products = readProducts();
  if (products.length === 0) return 1;
  return Math.max(...products.map(p => p.id)) + 1;
}

/* formatPrice y stars ahora viven en app.locals (app.js)   *
 * así están disponibles en TODAS las vistas automáticamente */

/* ---------- controladores ---------- */

const productController = {
  /* LIST — soporta ?cat=plantas */
  list: (req, res) => {
    let products = readProducts();
    const cat = req.query.cat;

    if (cat) {
      products = products.filter(p => p.category === cat);
    }

    res.render('products/list', {
      products,
      activeCat: cat || ''
    });
  },

  /* DETAIL */
  detail: (req, res) => {
    const products = readProducts();
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    /* Productos relacionados: misma categoría, distinto id, máx. 4 */
    const related = products
      .filter(p => p.category === product.category && p.id !== product.id)
      .slice(0, 4);

    res.render('products/detail', {
      product,
      related
    });
  },

  /* CART */
  cart: (req, res) => {
    const products = readProducts();
    /* Mostramos 3 productos de ejemplo en el carrito */
    const cartItems = products.slice(0, 3).map((p, i) => ({
      ...p,
      qty: i === 1 ? 2 : 1
    }));
    const subtotal = cartItems.reduce((s, p) => s + p.price * p.qty, 0);
    const shipping = 2500;
    const total = subtotal + shipping;

    res.render('products/cart', {
      cartItems,
      subtotal,
      shipping,
      total
    });
  },

  /* CREATE — form */
  createForm: (req, res) => {
    res.render('products/create');
  },

  /* CREATE — store */
  store: (req, res) => {
    const products = readProducts();
    const newId = nextId();

    const newProduct = {
      id: newId,
      name: req.body.name,
      description: req.body.description,
      image: req.file ? req.file.filename : '🌿',
      category: req.body.category,
      colors: req.body.colors ? req.body.colors.split(',').map(c => c.trim()) : [],
      price: Number(req.body.price),
      rating: 5,
      reviews: 0,
      badge: ''
    };

    products.push(newProduct);
    writeProducts(products);

    res.redirect('/products');
  },

  /* EDIT — form */
  editForm: (req, res) => {
    const products = readProducts();
    const id = Number(req.params.id);
    const product = products.find(p => p.id === id);

    if (!product) {
      return res.status(404).send('Producto no encontrado');
    }

    res.render('products/edit', { product });
  },

  /* EDIT — update */
  update: (req, res) => {
    const products = readProducts();
    const id = Number(req.params.id);
    const idx = products.findIndex(p => p.id === id);

    if (idx === -1) {
      return res.status(404).send('Producto no encontrado');
    }

    const updated = {
      ...products[idx],
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      colors: req.body.colors ? req.body.colors.split(',').map(c => c.trim()) : products[idx].colors,
      price: Number(req.body.price)
    };

    /* Si subieron una imagen nueva, la actualizamos */
    if (req.file) {
      updated.image = req.file.filename;
    }

    products[idx] = updated;
    writeProducts(products);

    res.redirect('/products/' + id);
  },

  /* DELETE */
  destroy: (req, res) => {
    const products = readProducts();
    const id = Number(req.params.id);
    const idx = products.findIndex(p => p.id === id);

    if (idx === -1) {
      return res.status(404).send('Producto no encontrado');
    }

    products.splice(idx, 1);
    writeProducts(products);

    res.redirect('/products');
  }
};

module.exports = productController;