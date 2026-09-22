const { body } = require('express-validator');
const db = require('../database/models');

const validateProfile = [
  /* Nombre */
  body('firstName')
    .notEmpty().withMessage('El nombre es obligatorio').bail()
    .isLength({ min: 2 }).withMessage('El nombre debe tener al menos 2 caracteres'),

  /* Apellido */
  body('lastName')
    .notEmpty().withMessage('El apellido es obligatorio').bail()
    .isLength({ min: 2 }).withMessage('El apellido debe tener al menos 2 caracteres'),

  /* Email */
  body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debés ingresar un email válido').bail()
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (user && user.id !== req.session.user.id) {
        throw new Error('Ya existe una cuenta con ese email');
      }
    }),

  /* Contraseña (solo si la completa) */
  body('password')
    .optional({ checkFalsy: true })
    .isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres').bail()
    .matches(/[A-Z]/).withMessage('La contraseña debe tener al menos una letra mayúscula')
    .matches(/[a-z]/).withMessage('La contraseña debe tener al menos una letra minúscula')
    .matches(/[0-9]/).withMessage('La contraseña debe tener al menos un número')
    .matches(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/).withMessage('La contraseña debe tener al menos un carácter especial'),

  /* Imagen */
  body('image')
    .custom((value, { req }) => {
      if (!req.file) return true; /* imagen opcional */
      const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
      if (!allowed.includes(req.file.mimetype)) {
        throw new Error('La imagen debe ser JPG, JPEG, PNG o GIF');
      }
      return true;
    })
];

module.exports = validateProfile;