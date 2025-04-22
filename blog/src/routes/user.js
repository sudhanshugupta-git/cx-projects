import express from 'express';
import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../controllers/user.js';

const userRouter = express.Router();

// Create user
userRouter.post('/', createUser);

// Get all users
userRouter.get('/', getAllUsers);

// Get single user by ID
userRouter.get('/:id', getUserById);

// Update user
userRouter.put('/:id', updateUser);

// Delete user
userRouter.delete('/:id', deleteUser);

export default userRouter;
