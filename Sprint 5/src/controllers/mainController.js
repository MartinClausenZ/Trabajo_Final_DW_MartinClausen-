const fs = require('fs');
const path = require('path');

const productsPath = path.join(__dirname, '..', 'data', 'products.json');

function readProducts() {
  const raw = fs.readFileSync(productsPath, 'utf-8');
  return JSON.parse(raw);
}

/* formatPrice y stars ahora viven en app.locals (app.js) */

const mainController = {
  home: (req, res) => {
    const products = readProducts();
    /* Mostrar los primeros 4 como destacados */
    const featured = products.slice(0, 4);
    res.render('home', { featured });
  }
};

module.exports = mainController;