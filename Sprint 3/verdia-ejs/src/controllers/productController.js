const productController = {
  list: (req, res) => {
    res.render('products/list');
  },

  detail: (req, res) => {
    res.render('products/detail');
  },

  cart: (req, res) => {
    res.render('products/cart');
  },

  createForm: (req, res) => {
    res.render('products/create');
  },

  editForm: (req, res) => {
    res.render('products/edit');
  }
};

module.exports = productController;
