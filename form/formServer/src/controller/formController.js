import db from "../../models/index.js";
const { Form, InputField, Response } = db;

class FormController {
  // Fetch all forms
  async getForm(req, res) {
    try {
      const forms = await Form.findAll();
      res.status(200).json(forms);
    } catch (error) {
      console.error('Error fetching forms:', error);
      res.status(500).json({ message: 'Error fetching forms', error: error.message });
    }
  }

  // Create a new form
  async createForm(req, res) {
    try {
      const { name, description, user_id } = req.body;

      if (!name || !user_id) {
        return res.status(400).json({ message: 'Name and user_id are required.' });
      }

      const newForm = await Form.create({ name, description, user_id });
      res.status(201).json({ message: 'Form created successfully', form: newForm });
    } catch (error) {
      console.error('Error creating form:', error);
      res.status(500).json({ message: 'Error creating form', error: error.message });
    }
  }

  // Add an input field to a form
  async addInputFields(req, res) {
    try {
      const { id: form_id } = req.params;
      const { question, type } = req.body;

      if (!question || !type) {
        return res.status(400).json({ message: 'Question and type are required.' });
      }

      const newInputField = await InputField.create({ form_id, question, type });
      res.status(201).json({ message: 'Input field created successfully', inputField: newInputField });
    } catch (error) {
      console.error('Error creating input field:', error);
      res.status(500).json({ message: 'Error creating input field', error: error.message });
    }
  }

  // Retrieve input fields for a specific form
  async getInputFields(req, res) {
    try {
      const { id: form_id } = req.params;
      const inputFields = await InputField.findAll({ where: { form_id } });

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

  // Add a response to a form
  async addResponse(req, res) {
    try {
      const { id: form_id } = req.params;
      const { question, answer } = req.body;

      if (!question || !answer) {
        return res.status(400).json({ message: 'Question and answer are required.' });
      }

      const newResponse = await Response.create({ form_id, question, answer });
      res.status(201).json({ message: 'Response added successfully', response: newResponse });
    } catch (error) {
      console.error('Error adding response:', error);
      res.status(500).json({ message: 'Error adding response', error: error.message });
    }
  }

  // Retrieve responses for a specific form
  async getResponses(req, res) {
    try {
      const { id: form_id } = req.params;
      const responses = await Response.findAll({ where: { form_id } });

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

export default new FormController();
