import express from 'express';
import userController from '../controller/userController.js';

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);

// userRouter
//   .route('/:id')
//   .get(userController.getById)
//   .patch(userController.update)
//   .delete(userController.delete);


export default userRouter;