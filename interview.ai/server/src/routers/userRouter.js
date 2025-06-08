import express from 'express';
import userController from '../controller/UserController.js';

const userRouter = express.Router();

userRouter.post('/signup', userController.signUp);
userRouter.post('/signin', userController.signIn);
userRouter.get('/', userController.getAll);

userRouter
  .route('/:user_id')
  .get(userController.getById)
  .patch(userController.update)
  .delete(userController.delete);


export default userRouter;

/*
{
    "name":"Bob",
    "email":"Bob@gmail.com",
    "password":"BobPass"
}

  {
    "name": "Alice",
    "email": "alice@example.com",
    "password":"AlicePass"
  }

*/