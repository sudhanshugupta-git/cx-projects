import express from 'express';
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from '../controllers/category.js';

const categoryRouter = express.Router();

// Create category
categoryRouter.post('/', createCategory);

// Get all categories
categoryRouter.get('/', getAllCategories);

// Get single category by ID
categoryRouter.get('/:id', getCategoryById);

// Update category
categoryRouter.put('/:id', updateCategory);

// Delete category
categoryRouter.delete('/:id', deleteCategory);

export default categoryRouter;
