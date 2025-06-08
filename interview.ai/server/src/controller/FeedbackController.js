import db from "../../models/index.js";
const { Feedback } = db;

class FeedbackController {
  async create(req, res) {
    try {
      const feedback = await Feedback.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Feedback created successfully',
        data: feedback
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create feedback',
        error: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const feedbacks = await Feedback.findAll();
      return res.status(200).json({
        success: true,
        message: 'Feedback retrieved successfully',
        data: feedbacks
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve feedback',
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const feedback = await Feedback.findByPk(req.params.id);

      if (!feedback) {
        return res.status(404).json({
          success: false,
          message: 'Feedback not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Feedback retrieved successfully',
        data: feedback
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve feedback',
        error: error.message
      });
    }
  }
}

export default new FeedbackController();
