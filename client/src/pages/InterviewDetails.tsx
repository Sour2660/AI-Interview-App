import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getInterviewById } from "../services/interviewService";

function InterviewDetails() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [interview, setInterview] = useState<any>(null);

  const fetchInterview = async () => {
    try {
      if (id) {
        const data = await getInterviewById(id);
        setInterview(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchInterview();
  }, []);

  if (!interview) {
    return (
      <div className="p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        {interview.title}
      </h1>

      <p className="mt-2">
        Category: {interview.category}
      </p>

      <p>
        Difficulty: {interview.difficulty}
      </p>

      <button
        onClick={() =>
          navigate(`/start-interview/${id}`)
        }
        className="mt-6 bg-green-600 text-white px-6 py-3 rounded"
      >
        Start Interview
      </button>

    </div>
  );
}

export default InterviewDetails;