import express from 'express';
import formController from '../controller/formController.js';

const formRouter = express.Router();

/*
GET api/forms      --> return forms table
POST api/forms   -->  populate forms table

GET api/forms/:id/responses    --> this'll give all the responses of given id
POST api/forms/:id/responses    --> this'll populate response table

GET api/forms/:id    ---> return inputfields table
POST api/forms/:id   --> populate inputfields table
*/

formRouter.get('/', formController.getForm);
formRouter.post('/', formController.createForm);

formRouter.get('/input/:id',  formController.getInputFields);
formRouter.post('/input/:id',  formController.addInputFields);

formRouter.get('/response/:id',  formController.getResponses);
formRouter.post('/response/:id',  formController.addResponse);

export default formRouter;