import express from 'express';
// importing controller
import productController from './src/controllers/product.js';
import cartController from  './src/controllers/cart.js';
import UserController from './src/controllers/user.js'


import cors from 'cors';

// creating server
const server = express();

// listening
const PORT = 5000;
server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
})

// parse form data
server.use(express.urlencoded({ extended: true })); 
server.use(cors());
server.use(express.json());


server.post('/api/products', productController.create);

server.get('/api/products', productController.get);

// server.route('/api/products/:id')
//     .get(productController.getById)
//     .patch(productController.update)
//     .delete(productController.delete)
server.get('/api/products/:id', productController.getById);

server.patch('/api/products/:id',   productController.update);

server.delete('/api/products/:id',  productController.delete);




server.get('/api/cart', cartController.get);

server.post('/api/cart', cartController.create);

server.patch('/api/cart/:id',   cartController.update);

server.delete('/api/cart/:id',   cartController.delete);



server.post('/api/users', UserController.create);

server.get('/api/users', UserController.get);

server.get('/api/users/:id', UserController.getById);

server.patch('/api/users/:id',   UserController.update);

server.delete('/api/users/:id',  UserController.delete);