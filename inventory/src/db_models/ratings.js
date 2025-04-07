import { DataTypes } from 'sequelize';
import sequelize from './config/index.js';

const Rating = sequelize.define('Rating', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'products',
      key: 'id'
    }
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id'
    }
  },
  rating: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 5
    }
  },
  comment: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'ratings',
  timestamps: true
});

// Associations
// Product.hasMany(Rating, { foreignKey: 'productId', onDelete: 'CASCADE' });
// Rating.belongsTo(Product, { foreignKey: 'productId' });

export default Rating;
