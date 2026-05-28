import axios from "axios";

const API = "http://localhost:5000/api/interview";

export const getInterviews = async () => {
  const res = await axios.get(`${API}/all`);
  return res.data;
};

export const getInterviewById = async (id: string) => {
  const res = await axios.get(`${API}/${id}`);
  return res.data;
};