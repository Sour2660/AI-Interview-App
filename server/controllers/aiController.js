export const generateQuestions = async (req, res) => {

  try {

    const {
      category,
      difficulty
    } = req.body;

    let questions = [];

    // REACT QUESTIONS
    if (category === "React") {

      questions = [
        "What is Virtual DOM?",
        "Explain useEffect hook",
        "What is prop drilling?",
        "What are React hooks?",
        "Difference between state and props?"
      ];

    }

    // NODE QUESTIONS
    else if (category === "Node") {

      questions = [
        "What is Node.js?",
        "Explain event loop",
        "What is middleware?",
        "What is Express.js?",
        "What are streams in Node?"
      ];

    }

    // HR QUESTIONS
    else {

      questions = [
        "Tell me about yourself",
        "Why should we hire you?",
        "What are your strengths?",
        "Describe a challenge you faced",
        "Where do you see yourself in 5 years?"
      ];

    }

    // HARD difficulty
    if (difficulty === "Hard") {

      questions.push(
        "Explain system design considerations"
      );

    }

    res.status(200).json({
      questions
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};
export const evaluateAnswer = async (req, res) => {

  try {

    const {
      question,
      answer
    } = req.body;

    let score = 0;

    let feedback = "";

    // VERY BASIC AI LOGIC
    if (
      answer.length > 150
    ) {

      score = 9;

      feedback =
      "Excellent detailed answer.";

    }

    else if (
      answer.length > 80
    ) {

      score = 7;

      feedback =
      "Good answer with decent explanation.";

    }

    else if (
      answer.length > 30
    ) {

      score = 5;

      feedback =
      "Average answer. Add more detail.";

    }

    else {

      score = 2;

      feedback =
      "Answer too short.";

    }

    res.status(200).json({
      question,
      score,
      feedback
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};