import Interview from "../models/Interview.js";

// GET SINGLE INTERVIEW
export const getInterviewById = async (req, res) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return res.status(404).json({
        message: "Interview not found"
      });
    }

    res.status(200).json(interview);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// CREATE INTERVIEW
export const createInterview = async (req, res) => {
  try {
    const interview = await Interview.create(req.body);
    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL INTERVIEWS
export const getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find().sort({ createdAt: -1 });
    res.status(200).json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};