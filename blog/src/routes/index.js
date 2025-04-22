import express from 'express';
import userRoutes from './user.js';
import blogRoutes from './blog.js';
import categoryRoutes from './category.js';

const router = express.Router();

router.use('/user', userRoutes);
router.use('/category', categoryRoutes);
router.use('/blog', blogRoutes);

export default router;
