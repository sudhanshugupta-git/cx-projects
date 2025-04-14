import { Sequelize } from 'sequelize';
import Form from '../schema/forms.js';
import Response from '../schema/responses.js';
import InputField from '../schema/inputFields.js';


class formController {

    async getForm(req, res) {
        try {
            const forms = await Form.findAll();
            console.log(forms);
            res.status(200).json(forms);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error fetching forms', error: error.message });
        }
    }


    async createForm(req, res) {
        try {
            const { name, description } = req.body;

            const newForm = await Form.create({
                name,
                description,
                // created_at: new Date(),
                // updated_at: new Date(),
            });

            res.status(201).json({ message: 'Form created successfully', form: newForm });
        } catch (error) {
            console.error('Error creating form:', error);
            res.status(500).json({ message: 'Error creating form', error: error.message });
        }
    }


    async addInputFields(req, res) {
        try {
            const { id: form_id } = req.params;   // is equivalent to const form_id = req.params.id;
            const { question, type } = req.body;

            const newInputField = await InputField.create({
                form_id,
                type,
                question,
            });

            res.status(201).json({ message: 'Input field created successfully', inputField: newInputField });
        } catch (error) {
            console.error('Error creating input field:', error);
            res.status(500).json({ message: 'Error creating input field', error: error.message });
        }
    }



    async getInputFields(req, res) {
        try {
            // const id = req.params.id;
            // const inputFields = await InputField.findAll({
            //     where: { id },  // this'll match with id column
            // });

            const { id: form_id } = req.params;
            const inputFields = await InputField.findAll({
                where: { form_id },  // You’re explicitly saying: search by form_id in DB
            });
            
            
            if (inputFields.length > 0) {
                res.status(200).json({ inputFields });
            } else {
                res.status(404).json({ message: 'No input fields found for the given form ID' });
            }
        } catch (error) {
            console.error('Error fetching input fields:', error);
            res.status(500).json({ message: 'Error fetching input fields', error: error.message });
        }
    }


    async addResponse(req, res) {
        try {
            const { id: form_id } = req.params; 
            const { question, answer } = req.body; 
    
            // Insert data into the responses table
            const newResponse = await Response.create({
                form_id,
                question,
                answer,
            });

            res.status(201).json({ message: 'Response added successfully', response: newResponse });
        } catch (error) {
            console.error('Error adding response:', error);
            res.status(500).json({ message: 'Error adding response', error: error.message });
        }
    }


    async getResponses(req, res) {
        try {
            const { id: form_id } = req.params;
    
            const responses = await Response.findAll({
                where: { form_id }, 
            });
    
            if (responses.length > 0) {
                res.status(200).json({ responses });
            } else {
                res.status(404).json({ message: 'No responses found for the given form ID' });
            }
        } catch (error) {
            console.error('Error fetching responses:', error);
            res.status(500).json({ message: 'Error fetching responses', error: error.message });
        }
    }

}

export default new formController();