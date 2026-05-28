import axios from "axios";

const API = "http://localhost:5000/api/ai";

export const generateQuestions = async (
  category: string,
  difficulty: string
) => {

  const response = await axios.post(
    `${API}/generate-questions`,
    {
      category,
      difficulty
    }
  );

  return response.data.questions;
};

export const evaluateAnswer = async (
  question: string,
  answer: string
) => {

  const response = await axios.post(
    `${API}/evaluate-answer`,
    {
      question,
      answer
    }
  );

  return response.data;

};