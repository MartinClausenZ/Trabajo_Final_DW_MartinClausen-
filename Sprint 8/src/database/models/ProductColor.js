'use strict';
module.exports = (sequelize, DataTypes) => {
  const ProductColor = sequelize.define('ProductColor', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    color: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'products',
        key: 'id'
      }
    }
  }, {
    tableName: 'product_colors',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  });

  ProductColor.associate = function(models) {
    ProductColor.belongsTo(models.Product, {
      foreignKey: 'product_id',
      as: 'product'
    });
  };

  return ProductColor;
};
