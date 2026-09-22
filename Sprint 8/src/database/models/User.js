'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'first_name',
      validate: {
        notNull: { msg: 'El nombre es obligatorio' },
        notEmpty: { msg: 'El nombre es obligatorio' },
        len: { args: [2, 100], msg: 'El nombre debe tener al menos 2 caracteres' }
      }
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'last_name',
      validate: {
        notNull: { msg: 'El apellido es obligatorio' },
        notEmpty: { msg: 'El apellido es obligatorio' },
        len: { args: [2, 100], msg: 'El apellido debe tener al menos 2 caracteres' }
      }
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: {
        msg: 'Ya existe una cuenta con ese email'
      },
      validate: {
        notNull: { msg: 'El email es obligatorio' },
        notEmpty: { msg: 'El email es obligatorio' },
        isEmail: { msg: 'Debés ingresar un email válido' }
      }
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        notNull: { msg: 'La contraseña es obligatoria' },
        notEmpty: { msg: 'La contraseña es obligatoria' },
        len: { args: [8, 255], msg: 'La contraseña debe tener al menos 8 caracteres' }
      }
    },
    category: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'user'
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '\uD83D\uDC64'
    }
  }, {
    tableName: 'users',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  User.associate = function(models) {
    User.hasMany(models.Cart, {
      foreignKey: 'user_id',
      as: 'carts'
    });
  };

  return User;
};