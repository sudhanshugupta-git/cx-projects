import express from 'express';
import cors from 'cors';

// importing controller
import productController from './src/controllers/product.js';
import cartController from './src/controllers/cart.js';
import UserController from './src/controllers/user.js'
import sequelize from './src/db_models/config/index.js';
import setupAssociations from './src/db_models/associations.js';

// creating server
const server = express();
setupAssociations();

// first create database in mysql using workbench
// then create table using the below command
sequelize.sync({ alter: true })  // use `{ force: true }` if you want to drop & recreate every time
    .then(() => {
        console.log("Tables synced successfully.");
    })
    .catch((err) => {
        console.error("Failed to sync tables:", err);
    });

// listening
const PORT = process.env.PORT;
server.listen(PORT, async () => {
    console.log(`Server is listening on port: ${PORT}`);
    // console.log(sequelize);
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})

server.use(express.json());
// parse form data
// server.use(express.urlencoded({ extended: true }));

server.use(cors());
// using cors built-in middleware
// let corsOptions = {
//     origin: "http://127.0.0.1:5500",
//     // allowedHeaders: ['Authorization', 'Content-Type']
// }
// server.use(cors(corsOptions));


// users routes
server.post('/api/users', UserController.create);
server.get('/api/users', UserController.get);
server.patch('/api/users/:id', UserController.update);
server.delete('/api/users/:id', UserController.delete);
server.get('/api/users/:id', UserController.getById);
server.get('/api/users/ratings/:userId', UserController.getUserRatings);



// http://localhost:5000/api/products/filter?minRating=4&minPrice=1000&maxPrice=5000&sort=rating_desc
//for multiple sorting --> http://localhost:5000/api/products/filter?minRating=0&minPrice=1000&maxPrice=5000&sort=rating_desc,price_asc 
server.get('/api/products/filter', productController.filter);  // ✅ Route to filter products — should come before '/:id'

server.get('/api/products', productController.get);
server.post('/api/products', productController.create);
// server.route('/api/products/:id')
//     .get(productController.getById)
//     .patch(productController.update)
//     .delete(productController.delete)
server.get('/api/products/:id', productController.getById);
server.patch('/api/products/:id', productController.update);
server.delete('/api/products/:id', productController.delete);
// http://localhost:5000/api/products/rate/1
server.post('/api/products/rate/:productId', productController.rateProduct);



server.get('/api/cart', cartController.get);
server.post('/api/cart', cartController.create);
server.patch('/api/cart/:id', cartController.update);
server.delete('/api/cart/:id', cartController.delete);
