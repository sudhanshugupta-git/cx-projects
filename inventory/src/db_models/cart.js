import { DataTypes } from 'sequelize';
import sequelize from './config/index.js';

const Cart = sequelize.define('Cart', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  desc: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: true
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1 // Default value for quantity
  },
//   userId: {
//     type: DataTypes.INTEGER,
//     allowNull: false,
//     references: {
//       model: 'users', // This should match your users table name
//       key: 'id'
//     }
//   }
}, {
  tableName: 'cart',
  timestamps: true
});

// // Define association
// Cart.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
// User.hasMany(Cart, { foreignKey: 'userId' });

export default Cart;
