import db from "../../models/index.js";
const { Result } = db;

class ResultController {
  async create(req, res) {
    try {
      const result = await Result.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Result created successfully',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to create result',
        error: error.message
      });
    }
  }

  async getAll(req, res) {
    try {
      const results = await Result.findAll();
      return res.status(200).json({
        success: true,
        message: 'Results retrieved successfully',
        data: results
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve results',
        error: error.message
      });
    }
  }

  async getById(req, res) {
    try {
      const result = await Result.findByPk(req.params.id);

      if (!result) {
        return res.status(404).json({
          success: false,
          message: 'Result not found'
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Result retrieved successfully',
        data: result
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Failed to retrieve result',
        error: error.message
      });
    }
  }
}

export default new ResultController();
