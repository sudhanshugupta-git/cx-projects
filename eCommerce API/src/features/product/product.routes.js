// Manage routes/paths to ProductController

// 1. Import express.
import express from 'express';
import ProductController from './product.controller.js';
import { upload } from '../../middlewares/fileupload.middleware.js';

// 2. Initialize Express router.
const router = express.Router();
const productController = new ProductController();


// All the paths to the controller methods.
// localhost/api/products 
router.get('/', productController.getAllProducts);
router.post('/', upload.single('imageUrl'), productController.addProduct);   // or can use upload.array('imageUrl', maxCount?), 


// localhost:3000/api/products/rate?userID=2&productID=1&rating=4    // u can also add query params using the params section in postman
router.post('/rate',productController.rateProduct );

// localhost:3000/api/products/filter?minPrice=10&maxPrice=20&category=Category1
router.get('/filter', productController.filterProducts);


router.get('/:id', productController.getOneProduct);



export default router;