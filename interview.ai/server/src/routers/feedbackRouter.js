import express from "express";
import feedbackController from "../controller/feedbackController.js";

const feedbackRouter = express.Router();

feedbackRouter
  .route("/")
  .get(feedbackController.getAll)
  .post(feedbackController.create);

feedbackRouter.get("/:id", feedbackController.getById);

export default feedbackRouter;
