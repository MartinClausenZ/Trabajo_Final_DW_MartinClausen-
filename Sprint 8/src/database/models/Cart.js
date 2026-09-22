'use strict';
module.exports = (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: 'active'
    }
  }, {
    tableName: 'carts',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  Cart.associate = function(models) {
    Cart.belongsTo(models.User, {
      foreignKey: 'user_id',
      as: 'user'
    });
    Cart.hasMany(models.CartItem, {
      foreignKey: 'cart_id',
      as: 'items'
    });
  };

  return Cart;
};
