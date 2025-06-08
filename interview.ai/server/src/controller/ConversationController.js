import db from "../../models/index.js";
const { ConversationHistory } = db;

class ConversationController {
  async create(req, res) {
    try {
      const conversation = await ConversationHistory.create(req.body);
      return res.status(201).json({
        success: true,
        message: "Conversation created successfully",
        data: conversation,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to create conversation",
        error: error.message,
      });
    }
  }

  async getAll(req, res) {
    try {
      const conversations = await ConversationHistory.findAll();
      return res.status(200).json({
        success: true,
        message: "Conversations retrieved successfully",
        data: conversations,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve conversations",
        error: error.message,
      });
    }
  }

  async getById(req, res) {
    try {
      const conversation = await ConversationHistory.findByPk(req.params.id);

      if (!conversation) {
        return res.status(404).json({
          success: false,
          message: "Conversation not found",
        });
      }

      return res.status(200).json({
        success: true,
        message: "Conversation retrieved successfully",
        data: conversation,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Failed to retrieve conversation",
        error: error.message,
      });
    }
  }
}

export default new ConversationController();
