import express from 'express';
import formController from '../controller/formController.js';

const formRouter = express.Router();

formRouter.get('/', formController.getForm);
formRouter.post('/', formController.createForm);

formRouter.get('/input/:id',  formController.getInputFields);
formRouter.post('/input/:id',  formController.addInputFields);

formRouter.get('/response/:id',  formController.getResponses);
formRouter.post('/response/:id',  formController.addResponse);


formRouter.get('/:id', formController.getSpecificForm);

export default formRouter; 