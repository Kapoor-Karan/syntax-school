import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const QuizPage = () => {
  const { quizId } = useParams(); // Get quiz ID from URL
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
      return;
    }

    const fetchQuiz = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/quizzes/quiz/${quizId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch quiz");
        }

        const data = await response.json();
        setQuiz(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching quiz:", error);
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [quizId, navigate]);

  const handleAnswerChange = (questionId, answer) => {
    setAnswers({ ...answers, [questionId]: answer });
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `http://localhost:3000/api/quizzes/${quizId}/submit`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit quiz");
      }

      const data = await response.json();
      setScore(data.score);
    } catch (error) {
      console.error("Error submitting quiz:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="p-4 bg-indigo-600 text-white">
        <h1 className="text-xl font-bold">Quiz</h1>
      </header>
      <main className="p-8">
        {loading ? (
          <p>Loading quiz...</p>
        ) : quiz ? (
          <div>
            <h2 className="text-2xl font-semibold text-gray-800">{quiz.title}</h2>
            <p className="mt-2 text-gray-600">{quiz.description}</p>
            <div className="mt-6 space-y-6">
              {quiz.questions.map((question) => (
                <div key={question._id}>
                  <h3 className="text-lg font-medium text-gray-700">
                    {question.question}
                  </h3>
                  <ul className="mt-2 space-y-2">
                    {question.options.map((option, index) => (
                      <li key={index}>
                        <label className="flex items-center space-x-2">
                          <input
                            type="radio"
                            name={`question-${question._id}`}
                            value={option}
                            onChange={() =>
                              handleAnswerChange(question._id, option)
                            }
                            className="text-indigo-500 focus:ring-indigo-300"
                          />
                          <span>{option}</span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <button
              className="mt-8 px-4 py-2 bg-green-500 text-white rounded-lg"
              onClick={handleSubmit}
            >
              Submit Quiz
            </button>
          </div>
        ) : (
          <p>Quiz not found.</p>
        )}

        {score !== null && (
          <div className="mt-6 p-4 bg-green-100 text-green-700 rounded">
            <h3 className="text-lg font-semibold">Your Score: {score}%</h3>
          </div>
        )}

        <button
          className="mt-8 px-4 py-2 bg-indigo-500 text-white rounded-lg"
          onClick={() => navigate("/dashboard")}
        >
          Back to Dashboard
        </button>
      </main>
    </div>
  );
};

export default QuizPage;
