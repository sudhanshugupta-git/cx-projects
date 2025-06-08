import db from "../../models/index.js";
const { InterviewSession, ConversationHistory, Result, Feedback } = db;

export const getAllData = async (req, res) => {
  try {
    const { user_id } = req.params;          
    const { sessionId } = req.query;       

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    const sessions = await InterviewSession.findAll({ where: { user_id } });
    const sessionIds = sessionId ? [sessionId] : sessions.map(s => s.session_id);

    const conversations = await ConversationHistory.findAll({
      where: { user_id, session_id: sessionIds }
    });
    const messageIds = conversations.map(c => c.message_id);

    const results = await Result.findAll({ where: { user_id, message_id: messageIds } });
    const resultIds = results.map(r => r.result_id);

    const feedbacks = await Feedback.findAll({ where: { user_id, result_id: resultIds } });

    res.json({ sessions, conversations, results, feedbacks });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
