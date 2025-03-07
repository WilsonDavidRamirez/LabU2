const { Sequelize, Model, DataTypes } = require('sequelize');

const DISCOUNT_TABLE = 'discounts';

const DiscountSchema = {
  id: {
    type: DataTypes.UUID,
    allowNull: false,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  percentage: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
      max: 100,
    },
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'start_date',
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'end_date',
    validate: {
      isAfterStart(value) {
        if (this.startDate && value <= this.startDate) {
          throw new Error('La fecha de finalización debe ser posterior a la de inicio.');
        }
      },
    },
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'created_at',
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: Sequelize.NOW,
  },
};

class Discount extends Model {
  static associate(models) {
    this.hasMany(models.Product, { as: 'products', foreignKey: 'discountid' });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DISCOUNT_TABLE,
      modelName: 'Discount',
      timestamps: true, // Incluye createdAt y updatedAt
    };
  }
}

module.exports = { DISCOUNT_TABLE, Discount, DiscountSchema };
