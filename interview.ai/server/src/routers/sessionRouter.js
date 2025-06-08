import express from "express";
import SessionController from "../controller/SessionController.js";

const sessionRouter = express.Router();

sessionRouter
  .route("/")
  .get(SessionController.getAll)
  .post(SessionController.create);

sessionRouter
  .route("/:id")
  .patch(SessionController.update)
  .get(SessionController.getById);

export default sessionRouter;


/*
api: http://localhost:3001/api/v1/session/
when the interview starts send a post request to http://localhost:3001/api/v1/session/
{
  "user_id": 1,
  "start_time": "09:00:00",
  "end_time": "null"
}

when the interview ends or canceled send a patch request
api: http://localhost:3001/api/v1/session/${session_id}

u'll get the session_id from the post request response
{
  "end_time": "11:30:00",
  "status": "completed"
}
*/