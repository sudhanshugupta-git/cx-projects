// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import { CartController } from './cart.controller.js';

// 2. Initialize Express router.
const cartRouter = express.Router();

const cartController = new CartController();

//  localhost:3000/api/cart?productID=2&quantity=3 
cartRouter.delete('/:id', cartController.delete);
cartRouter.post('/', cartController.add);
cartRouter.get('/', cartController.get);

export default cartRouter;