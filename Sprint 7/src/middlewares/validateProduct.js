const { body } = require('express-validator');
const db = require('../database/models');

const validateProduct = [
  /* Nombre */
  body('name')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 5 }).withMessage('El nombre debe tener al menos 5 caracteres'),

  /* Descripción */
  body('description')
    .notEmpty().withMessage('La descripción es obligatoria').bail()
    .isLength({ min: 20 }).withMessage('La descripción debe tener al menos 20 caracteres'),

  /* Imagen */
  body('image')
    .custom((value, { req }) => {
      if (!req.file) return true; /* imagen opcional en edición */
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowed.includes(req.file.mimetype)) {
        throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF');
      }
      return true;
    }),

  /* Categoría */
  body('category_id')
    .notEmpty().withMessage('Debés seleccionar una categoría').bail()
    .isInt({ min: 1 }).withMessage('La categoría no es válida').bail()
    .custom(async (value) => {
      const cat = await db.Category.findByPk(value);
      if (!cat) {
        throw new Error('La categoría seleccionada no existe');
      }
    }),

  /* Precio */
  body('price')
    .notEmpty().withMessage('El precio es obligatorio').bail()
    .isFloat({ min: 0 }).withMessage('El precio debe ser un número positivo')
];

module.exports = validateProduct;