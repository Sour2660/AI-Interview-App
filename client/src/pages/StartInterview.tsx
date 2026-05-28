import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StartInterview() {

  const { id } = useParams();

  const questions = [
    "Tell me about yourself",
    "What is React and how does it work?",
    "Explain Node.js architecture",
    "What is MongoDB?",
    "What is REST API?"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<any[]>([]);
  const [time, setTime] = useState(0);

  // TIMER
  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleNext = () => {

    const updatedAnswers = [...answers];
    updatedAnswers[currentIndex] = {
      question: questions[currentIndex],
      answer: answer
    };

    setAnswers(updatedAnswers);
    setAnswer("");

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="p-8">

      <h1 className="text-3xl font-bold">
        AI Interview Session
      </h1>

      <p className="mt-2 text-gray-600">
        Interview ID: {id}
      </p>

      {/* TIMER */}
      <div className="mt-4 text-red-500 font-bold">
        Time: {time}s
      </div>

      {/* QUESTION */}
      <div className="mt-6 bg-white p-6 rounded shadow">

        <h2 className="text-xl font-semibold">
          Q{currentIndex + 1}: {questions[currentIndex]}
        </h2>

        <textarea
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          className="w-full border mt-4 p-3 rounded"
          rows={5}
          placeholder="Type your answer..."
        />

        {/* BUTTONS */}
        <div className="flex gap-4 mt-4">

          <button
            onClick={handlePrev}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Previous
          </button>

          <button
            onClick={handleNext}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Next
          </button>

        </div>

      </div>

    </div>
  );
}

export default StartInterview;