import express from "express";
import resultController from "../controller/resultController.js";

const resultRouter = express.Router();

resultRouter
  .route("/")
  .get(resultController.getAll)
  .post(resultController.create);

resultRouter.get("/:id", resultController.getById);

export default resultRouter;

/*
  {
  "message_id": 1,
  "user_id": 2,
  "session_id": 1,
  "score": 6,
  "completion_time": "00:25:00"
}
  {
  "message_id": 2,
  "user_id": 1,
  "session_id": 2,
  "score": 9,
  "completion_time": "00:30:00"
}
*/
