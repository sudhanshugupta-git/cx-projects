import express from 'express';
import userRouter from './userRouter.js';
import formRouter from './formRouter.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/form', formRouter);

export default router;
