'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(200),
      allowNull: false,
      validate: {
        notNull: { msg: 'El nombre es obligatorio' },
        notEmpty: { msg: 'El nombre es obligatorio' },
        len: { args: [5, 200], msg: 'El nombre debe tener al menos 5 caracteres' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: { msg: 'La descripción es obligatoria' },
        len: { args: [20], msg: 'La descripción debe tener al menos 20 caracteres' }
      }
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true,
      defaultValue: '\uD83C\uDF33'
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        notNull: { msg: 'El precio es obligatorio' },
        isDecimal: { msg: 'El precio debe ser un número válido' },
        min: { args: [0], msg: 'El precio debe ser un número positivo' }
      }
    },
    rating: {
      type: DataTypes.DECIMAL(2, 1),
      allowNull: true,
      defaultValue: 0
    },
    reviews: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    },
    badge: {
      type: DataTypes.STRING(100),
      allowNull: true
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'categories',
        key: 'id'
      },
      validate: {
        notNull: { msg: 'Debés seleccionar una categoría' },
        isInt: { msg: 'La categoría no es válida' }
      }
    }
  }, {
    tableName: 'products',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Product.associate = function(models) {
    Product.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category'
    });
    Product.hasMany(models.ProductColor, {
      foreignKey: 'product_id',
      as: 'colors'
    });
    Product.hasMany(models.CartItem, {
      foreignKey: 'product_id',
      as: 'cartItems'
    });
  };

  return Product;
};