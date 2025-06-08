import express from "express";
import ConversationController from "../controller/ConversationController.js";

const conversationRouter = express.Router();

conversationRouter
  .route("/")
  .get(ConversationController.getAll)
  .post(ConversationController.create);

conversationRouter.get("/:id", ConversationController.getById);

export default conversationRouter;

/*
route: http://localhost:3001/api/v1/conversation/  (post)
{
  "user_id": 2,
  "session_id": 2,
  "message_content": "Eva: Hello! I'm Eva. I will be interviewing you on JavaScript. Let's start with the first question: What is the difference between `==` and `===` in JavaScript?\nCandidate: === is used for precise comparisons to avoid unexpected type conversions.\nEva: That's a good start! Is there anything else you'd like to add about the differences between `==` and `===`?\nCandidate: no\nEva: Okay, let's move on to the next question. Can you explain the concept of closures in JavaScript with a simple example?\nCandidate: defines the scope of variables\nEva: That's a brief definition. Would you like to elaborate or provide a simple example to further illustrate the concept of closures?\nCandidate: inner function has access to outer variables but outer not\nEva: That's a good addition. Do you want to add anything else?\nCandidate: no\nEva: Alright, let's proceed. My final question for you is: What are the primitive data types in JavaScript?\nCandidate: string, number, boolean, null, undefined, symbol bigint\nEva: That's correct! You've identified all the primitive data types in JavaScript. This concludes our interview. Thank you for your time!"
}
*/
