const { Op } = require('sequelize');
const { validationResult } = require('express-validator');
const db = require('../database/models');

/* ---------- controladores ---------- */

const productController = {

  /* LIST — soporta ?cat=plantas y ?search=xxx */
  list: async (req, res) => {
    try {
      const where = {};
      const include = [
        { model: db.Category, as: 'category' },
        { model: db.ProductColor, as: 'colors' }
      ];

      /* Filtro por categoría */
      if (req.query.cat) {
        const cat = req.query.cat;
        include[0].where = { name: cat };
        include[0].required = true;
      }

      /* Filtro por búsqueda */
      if (req.query.search) {
        where[Op.or] = [
          { name: { [Op.like]: `%${req.query.search}%` } },
          { description: { [Op.like]: `%${req.query.search}%` } }
        ];
      }

      const products = await db.Product.findAll({
        where,
        include,
        order: [['id', 'ASC']]
      });

      /* Mapear para que las vistas sigan funcionando igual */
      const mapped = products.map(p => {
        const row = p.toJSON();
        row.category = row.category ? row.category.name : '';
        row.colors = row.colors ? row.colors.map(c => c.color) : [];
        return row;
      });

      res.render('products/list', {
        products: mapped,
        activeCat: req.query.cat || '',
        searchQuery: req.query.search || ''
      });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al listar productos');
    }
  },

  /* DETAIL */
  detail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          { model: db.Category, as: 'category' },
          { model: db.ProductColor, as: 'colors' }
        ]
      });

      if (!product) return res.status(404).send('Producto no encontrado');

      const row = product.toJSON();
      row.category = row.category ? row.category.name : '';
      row.colors = row.colors ? row.colors.map(c => c.color) : [];

      /* Productos relacionados: misma categoría, distinto id */
      const related = await db.Product.findAll({
        where: {
          category_id: product.category_id,
          id: { [Op.ne]: product.id }
        },
        include: [
          { model: db.Category, as: 'category' },
          { model: db.ProductColor, as: 'colors' }
        ],
        limit: 4
      });

      const relatedMapped = related.map(r => {
        const row2 = r.toJSON();
        row2.category = row2.category ? row2.category.name : '';
        row2.colors = row2.colors ? row2.colors.map(c => c.color) : [];
        return row2;
      });

      res.render('products/detail', { product: row, related: relatedMapped });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al mostrar producto');
    }
  },

  /* CART */
  cart: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: [
          { model: db.Category, as: 'category' },
          { model: db.ProductColor, as: 'colors' }
        ],
        limit: 3
      });

      const mapped = products.map((p, i) => {
        const row = p.toJSON();
        row.category = row.category ? row.category.name : '';
        row.colors = row.colors ? row.colors.map(c => c.color) : [];
        row.qty = i === 1 ? 2 : 1;
        return row;
      });

      const subtotal = mapped.reduce((s, p) => s + p.price * p.qty, 0);
      const shipping = 2500;
      const total = subtotal + shipping;

      res.render('products/cart', { cartItems: mapped, subtotal, shipping, total });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al mostrar carrito');
    }
  },

  /* CREATE — form */
  createForm: async (req, res) => {
    try {
      const categories = await db.Category.findAll({ order: [['name', 'ASC']] });
      res.render('products/create', { categories, errors: {}, old: {} });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al cargar formulario');
    }
  },

  /* CREATE — store */
  store: async (req, res) => {
    try {
      const categories = await db.Category.findAll({ order: [['name', 'ASC']] });

      /* Verificar errores de express-validator */
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = {};
        result.array().forEach(err => {
          errors[err.param] = err.msg;
        });
        return res.render('products/create', {
          categories,
          errors,
          old: req.body
        });
      }

      const newProduct = await db.Product.create({
        name: req.body.name,
        description: req.body.description,
        image: req.file ? req.file.filename : '\uD83C\uDF33',
        price: Number(req.body.price),
        rating: 5,
        reviews: 0,
        badge: '',
        category_id: Number(req.body.category_id)
      });

      /* Guardar colores/variantes */
      if (req.body.colors) {
        const colors = req.body.colors.split(',').map(c => c.trim()).filter(c => c);
        if (colors.length) {
          await db.ProductColor.bulkCreate(
            colors.map(color => ({
              color,
              product_id: newProduct.id
            }))
          );
        }
      }

      res.redirect('/products');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al crear producto');
    }
  },

  /* EDIT — form */
  editForm: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          { model: db.Category, as: 'category' },
          { model: db.ProductColor, as: 'colors' }
        ]
      });

      if (!product) return res.status(404).send('Producto no encontrado');

      const row = product.toJSON();
      row.category = row.category ? row.category.name : '';
      row.colors = row.colors ? row.colors.map(c => c.color) : [];

      const categories = await db.Category.findAll({ order: [['name', 'ASC']] });

      res.render('products/edit', { product: row, categories, errors: {}, old: {} });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al cargar formulario');
    }
  },

  /* EDIT — update */
  update: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          { model: db.Category, as: 'category' },
          { model: db.ProductColor, as: 'colors' }
        ]
      });
      if (!product) return res.status(404).send('Producto no encontrado');

      const categories = await db.Category.findAll({ order: [['name', 'ASC']] });

      /* Verificar errores de express-validator */
      const result = validationResult(req);
      if (!result.isEmpty()) {
        const errors = {};
        result.array().forEach(err => {
          errors[err.param] = err.msg;
        });

        const row = product.toJSON();
        row.category = row.category ? row.category.name : '';
        row.colors = row.colors ? row.colors.map(c => c.color) : [];

        return res.render('products/edit', {
          product: { ...row, ...req.body },
          categories,
          errors,
          old: req.body
        });
      }

      await product.update({
        name: req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        category_id: Number(req.body.category_id)
      });

      /* Si subieron imagen nueva */
      if (req.file) {
        await product.update({ image: req.file.filename });
      }

      /* Actualizar colores/variantes: borrar anteriores y crear nuevas */
      if (req.body.colors) {
        await db.ProductColor.destroy({ where: { product_id: product.id } });
        const colors = req.body.colors.split(',').map(c => c.trim()).filter(c => c);
        if (colors.length) {
          await db.ProductColor.bulkCreate(
            colors.map(color => ({ color, product_id: product.id }))
          );
        }
      }

      res.redirect('/products/' + product.id);
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al actualizar producto');
    }
  },

  /* DELETE */
  destroy: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id);
      if (!product) return res.status(404).send('Producto no encontrado');

      /* ProductColor se borra en cascada por FK */
      await product.destroy();
      res.redirect('/products');
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al eliminar producto');
    }
  }
};

module.exports = productController;