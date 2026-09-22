const { body } = require('express-validator');
const db = require('../database/models');
const bcrypt = require('bcryptjs');

const validateLogin = [
  /* Email */
  body('email')
    .notEmpty().withMessage('El email es obligatorio').bail()
    .isEmail().withMessage('Debés ingresar un email válido').bail()
    .custom(async (value) => {
      const user = await db.User.findOne({ where: { email: value } });
      if (!user) {
        throw new Error('No existe una cuenta con ese email');
      }
    }),

  /* Contraseña */
  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria').bail()
    .custom(async (value, { req }) => {
      const user = await db.User.findOne({ where: { email: req.body.email } });
      if (user) {
        const valid = bcrypt.compareSync(value, user.password);
        if (!valid) {
          throw new Error('La contraseña es incorrecta');
        }
      }
    })
];

module.exports = validateLogin;