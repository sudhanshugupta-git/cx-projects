import express from 'express';
import { createBlog } from '../controllers/blog.controller.js';

const blogRouter = express.Router();

blogRouter.post('/', createBlog); 

export default blogRouter;
