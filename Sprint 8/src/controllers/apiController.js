const db = require('../database/models');

const apiController = {

  /* ========================================
   *  API DE USUARIOS
   * ======================================== */

  /* GET /api/users — Listado con paginado */
  usersList: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await db.User.findAndCountAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
        order: [['id', 'ASC']],
        limit,
        offset
      });

      const users = rows.map(u => ({
        id: u.id,
        name: `${u.firstName} ${u.lastName}`,
        email: u.email,
        detail: `${req.protocol}://${req.get('host')}/api/users/${u.id}`
      }));

      const baseUrl = `${req.protocol}://${req.get('host')}/api/users`;

      const response = {
        count,
        users
      };

      /* Paginado opcional */
      if (count > limit) {
        response.next = page * limit < count ? `${baseUrl}?page=${page + 1}` : null;
        response.previous = page > 1 ? `${baseUrl}?page=${page - 1}` : null;
      }

      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  },

  /* GET /api/users/:id — Detalle de usuario */
  userDetail: async (req, res) => {
    try {
      const user = await db.User.findByPk(req.params.id, {
        attributes: { exclude: ['password', 'category'] }
      });

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const response = user.toJSON();
      response.imageUrl = `${req.protocol}://${req.get('host')}/img/users/${user.image}`;

      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener detalle de usuario' });
    }
  },

  /* ========================================
   *  API DE PRODUCTOS
   * ======================================== */

  /* GET /api/products — Listado con paginado y countByCategory */
  productsList: async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = 10;
      const offset = (page - 1) * limit;

      const { count, rows } = await db.Product.findAndCountAll({
        attributes: ['id', 'name', 'description', 'category_id'],
        include: [
          { model: db.Category, as: 'category', attributes: ['id', 'name'] }
        ],
        order: [['id', 'ASC']],
        limit,
        offset
      });

      /* countByCategory — total por categoría */
      const categories = await db.Category.findAll({
        attributes: ['id', 'name'],
        include: [{
          model: db.Product,
          as: 'products',
          attributes: ['id']
        }]
      });

      const countByCategory = {};
      categories.forEach(cat => {
        countByCategory[cat.name] = cat.products.length;
      });

      const products = rows.map(p => ({
        id: p.id,
        name: p.name,
        description: p.description,
        categories: p.category ? [{ id: p.category.id, name: p.category.name }] : [],
        detail: `${req.protocol}://${req.get('host')}/api/products/${p.id}`
      }));

      const baseUrl = `${req.protocol}://${req.get('host')}/api/products`;

      const response = {
        count,
        countByCategory,
        products
      };

      /* Paginado opcional */
      if (count > limit) {
        response.next = page * limit < count ? `${baseUrl}?page=${page + 1}` : null;
        response.previous = page > 1 ? `${baseUrl}?page=${page - 1}` : null;
      }

      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  /* GET /api/products/:id — Detalle de producto */
  productDetail: async (req, res) => {
    try {
      const product = await db.Product.findByPk(req.params.id, {
        include: [
          { model: db.Category, as: 'category', attributes: ['id', 'name'] },
          { model: db.ProductColor, as: 'colors', attributes: ['id', 'color'] }
        ]
      });

      if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado' });
      }

      const response = product.toJSON();
      response.imageUrl = `${req.protocol}://${req.get('host')}/img/products/${product.image}`;

      /* Relaciones como arrays */
      if (response.category) {
        response.categories = [{ id: response.category.id, name: response.category.name }];
        delete response.category;
      } else {
        response.categories = [];
        delete response.category;
      }

      /* Limpiar field names para la respuesta */
      if (response.colors) {
        response.colors = response.colors.map(c => ({ id: c.id, color: c.color }));
      }

      res.json(response);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener detalle de producto' });
    }
  },

  /* ========================================
   *  ENDPOINT EXTRA — DASHBOARD DATA
   *  (Resumen de métricas para el dashboard React)
   * ======================================== */

  dashboard: async (req, res) => {
    try {
      /* Totales */
      const totalProducts = await db.Product.count();
      const totalUsers = await db.User.count();
      const totalCategories = await db.Category.count();

      /* Último producto creado */
      const lastProduct = await db.Product.findOne({
        order: [['created_at', 'DESC']],
        include: [
          { model: db.Category, as: 'category' }
        ]
      });

      /* Último usuario registrado */
      const lastUser = await db.User.findOne({
        order: [['created_at', 'DESC']],
        attributes: { exclude: ['password'] }
      });

      /* Productos por categoría */
      const categories = await db.Category.findAll({
        attributes: ['id', 'name'],
        include: [{
          model: db.Product,
          as: 'products',
          attributes: ['id']
        }]
      });

      const categoriesWithCount = categories.map(cat => ({
        id: cat.id,
        name: cat.name,
        count: cat.products.length
      }));

      /* Listado completo de productos (para la tabla del dashboard) */
      const products = await db.Product.findAll({
        attributes: ['id', 'name', 'price', 'category_id', 'image', 'created_at'],
        include: [
          { model: db.Category, as: 'category', attributes: ['id', 'name'] }
        ],
        order: [['id', 'ASC']]
      });

      const productsList = products.map(p => ({
        id: p.id,
        name: p.name,
        price: Number(p.price),
        category: p.category ? p.category.name : '',
        image: p.image,
        imageUrl: `${req.protocol}://${req.get('host')}/img/products/${p.image}`,
        created_at: p.created_at
      }));

      /* Último producto formateado */
      const lastProductData = lastProduct ? {
        id: lastProduct.id,
        name: lastProduct.name,
        description: lastProduct.description,
        price: Number(lastProduct.price),
        category: lastProduct.category ? lastProduct.category.name : '',
        image: lastProduct.image,
        imageUrl: `${req.protocol}://${req.get('host')}/img/products/${lastProduct.image}`,
        created_at: lastProduct.created_at
      } : null;

      /* Último usuario formateado */
      const lastUserData = lastUser ? {
        id: lastUser.id,
        firstName: lastUser.firstName,
        lastName: lastUser.lastName,
        email: lastUser.email,
        image: lastUser.image,
        imageUrl: `${req.protocol}://${req.get('host')}/img/users/${lastUser.image}`,
        created_at: lastUser.created_at
      } : null;

      res.json({
        totals: {
          products: totalProducts,
          users: totalUsers,
          categories: totalCategories
        },
        lastProduct: lastProductData,
        lastUser: lastUserData,
        categories: categoriesWithCount,
        products: productsList
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al obtener datos del dashboard' });
    }
  }
};

module.exports = apiController;