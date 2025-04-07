import Product from "./products.js";
import Rating from "./ratings.js";
import User from "./users.js";
// import Cart from "./cart.js";

const setupAssociations = () => {
  Product.hasMany(Rating, { foreignKey: 'productId', onDelete: 'CASCADE' });
  Rating.belongsTo(Product, { foreignKey: 'productId' });


  User.hasMany(Rating, { foreignKey: 'userId', onDelete: 'CASCADE' });
  Rating.belongsTo(User, { foreignKey: 'userId' });


  // Define association
  // Cart.belongsTo(User, { foreignKey: 'userId', onDelete: 'CASCADE' });
  // User.hasMany(Cart, { foreignKey: 'userId' });


  // Cart.belongsTo(Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
  // Product.hasMany(Cart, { foreignKey: 'productId' });
};

export default setupAssociations;