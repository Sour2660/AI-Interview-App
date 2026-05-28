import express from "express";
import {
  createInterview,
  getInterviews,
  getInterviewById
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/create", createInterview);
router.get("/all", getInterviews);
router.get("/:id", getInterviewById);

export default router;