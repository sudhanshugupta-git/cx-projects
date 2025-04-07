import { DataTypes } from 'sequelize';
import sequelize from './config/index.js';

// Define the Product model
const Product = sequelize.define('Product', {
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
    avgRating: {
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0
    },
    ratingCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'products',
    timestamps: true
});


// // // Define associations here
// // Product.hasMany(Rating, { foreignKey: 'productId', onDelete: 'CASCADE' });

export default Product;  