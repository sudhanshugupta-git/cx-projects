import db from "../../models/index.js";
const { InterviewSession } = db;

class SessionController {
  async create(req, res) {
    try {
      const session = await InterviewSession.create(req.body);
      return res.status(201).json({
        success: true,
        message: 'Interview session created successfully',
        data: session
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to create session', error: error.message });
    }
  }

  async getAll(req, res) {
    try {
      const sessions = await InterviewSession.findAll();
      return res.status(200).json({ success: true, data: sessions });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to fetch sessions', error: error.message });
    }
  }

  // Inside SessionController.js
async update(req, res) {
  try {
    const session = await InterviewSession.findByPk(req.params.id);

    if (!session) {
      return res.status(404).json({ success: false, message: "Session not found" });
    }

    // Update the session with the fields provided in the request body
    await session.update(req.body);

    return res.status(200).json({ success: true, message: "Session updated successfully", data: session });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to update session", error: error.message });
  }
}


  async getById(req, res) {
    try {
      const session = await InterviewSession.findByPk(req.params.id);
      if (!session) {
        return res.status(404).json({ success: false, message: 'Session not found' });
      }
      return res.status(200).json({ success: true, data: session });
    } catch (error) {
      return res.status(500).json({ success: false, message: 'Failed to retrieve session', error: error.message });
    }
  }

}

export default new SessionController();
