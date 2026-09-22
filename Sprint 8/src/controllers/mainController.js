const db = require('../database/models');

const mainController = {
  home: async (req, res) => {
    try {
      const products = await db.Product.findAll({
        include: [
          { model: db.Category, as: 'category' },
          { model: db.ProductColor, as: 'colors' }
        ],
        limit: 4,
        order: [['id', 'ASC']]
      });

      /* Mapear para compatibilidad de vistas */
      const featured = products.map(p => {
        const row = p.toJSON();
        row.category = row.category ? row.category.name : '';
        row.colors = row.colors ? row.colors.map(c => c.color) : [];
        return row;
      });

      res.render('home', { featured });
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al cargar inicio');
    }
  }
};

module.exports = mainController;
