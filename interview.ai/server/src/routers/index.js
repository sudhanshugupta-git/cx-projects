import express from 'express';
import userRouter from './userRouter.js';
import sessionRouter from './sessionRouter.js';
import conversationRouter from './conversationRouter.js';
import resultRouter from './resultRouter.js';
import feedbackRouter from './feedbackRouter.js';
import { getAllData } from '../controller/getAllData.js';

const router = express.Router();

router.use('/user', userRouter);
router.use('/session', sessionRouter);
router.use('/conversation', conversationRouter);
router.use('/result', resultRouter);
router.use('/feedback', feedbackRouter);


router.get('/user/:user_id/interview-data', getAllData);

// GET /api/user/5/interview-data
// GET /api/user/5/interview-data?sessionId=2

export default router;
