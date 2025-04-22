import express from 'express';
import { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog} from '../controllers/blog.js';

const blogRouter = express.Router();

// Create a new blog
blogRouter.post('/', createBlog);

// Get all blogs
blogRouter.get('/', getAllBlogs);

// Get a blog by ID
blogRouter.get('/:id', getBlogById);

// Update a blog by ID
blogRouter.put('/:id', updateBlog);

// Delete a blog by ID
blogRouter.delete('/:id', deleteBlog);

export default blogRouter;
