import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Quiz() {
  const { topicId } = useParams();
  const [topic, setTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [result, setResult] = useState(null);
  const [questionData, setQuestionData] = useState({
    question: "",
    type: "mcq",
    choices: "",
    answer: "",
    difficulty: "medium",
    explanation: ""
  });

  const fetchQuiz = async () => {
    if (!topicId) return;
    const res = await API.get(`/quiz/topics/${topicId}`);
    setTopic(res.data.topic || null);
    setQuestions(res.data.questions || []);
  };

  useEffect(() => {
    fetchQuiz();
  }, [topicId]);

  const updateAnswer = (questionId, value) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const submitQuiz = async () => {
    if (!questions.length) return;
    const payload = questions.map((q) => ({
      questionId: q._id,
      selectedAnswer: answers[q._id] || ""
    }));

    const res = await API.post("/quiz/attempts", {
      topicId,
      answers: payload,
      confidence: "medium"
    });

    setResult(res.data);
    setSubmitted(true);
  };

  const addQuestion = async () => {
    if (!questionData.question.trim() || !questionData.answer.trim()) {
      return alert("Please add the question text and answer.");
    }

    const choices = questionData.type === "mcq"
      ? questionData.choices.split(",").map((item) => item.trim()).filter(Boolean)
      : [];

    await API.post("/quiz/questions", {
      topicId,
      question: questionData.question,
      type: questionData.type,
      choices,
      answer: questionData.answer,
      difficulty: questionData.difficulty,
      explanation: questionData.explanation
    });

    setQuestionData({ question: "", type: "mcq", choices: "", answer: "", difficulty: "medium", explanation: "" });
    fetchQuiz();
  };

  const currentQuestion = questions[currentIndex];
  const progress = questions.length ? Math.round(((currentIndex + 1) / questions.length) * 100) : 0;

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f0f9ff 0%, #eff6ff 60%, #0f172a 100%)", color: "#0f172a" }}>
      <Navbar />
      <div style={{ maxWidth: "980px", margin: "auto", padding: "28px 20px 40px" }}>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.12em" }}>
            Quiz Builder
          </p>
          <h1 style={{ margin: "10px 0 0", fontSize: "34px" }}>
            {topic?.title ? `Quiz for ${topic.title}` : "Quiz mode"}
          </h1>
          <p style={{ marginTop: "12px", maxWidth: "760px", color: "#475569" }}>
            Practice questions for a selected topic, save attempts, and track accuracy over time.
          </p>
        </div>

        <div style={{ display: "grid", gap: "22px" }}>
          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
              <div>
                <h2 style={{ margin: 0, fontSize: "24px" }}>Live quiz</h2>
                <p style={{ margin: "10px 0 0", color: "#64748b" }}>{questions.length ? `${questions.length} questions ready` : "Add question content below to start."}</p>
              </div>
              <div style={{ minWidth: "220px" }}>
                <div style={{ background: "#e2e8f0", borderRadius: "999px", overflow: "hidden", height: "14px" }}>
                  <div style={{ width: `${progress}%`, height: "100%", background: "linear-gradient(90deg, #2563eb, #38bdf8)" }} />
                </div>
                <p style={{ margin: "10px 0 0", color: "#475569", fontSize: "13px" }}>{progress}% through the quiz</p>
              </div>
            </div>

            {questions.length ? (
              <div style={{ marginTop: "24px" }}>
                <div style={{ marginBottom: "16px", color: "#475569" }}>
                  Question {currentIndex + 1} of {questions.length}
                </div>
                <div style={{ padding: "22px", borderRadius: "24px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <p style={{ margin: 0, fontSize: "18px", fontWeight: 700 }}>{currentQuestion.question}</p>
                  <div style={{ marginTop: "18px", display: "grid", gap: "14px" }}>
                    {currentQuestion.type === "mcq" ? (
                      currentQuestion.choices.map((choice) => (
                        <label key={choice} style={{ display: "flex", alignItems: "center", gap: "12px", background: "white", borderRadius: "14px", padding: "12px 16px", border: "1px solid #cbd5e1", cursor: "pointer" }}>
                          <input
                            type="radio"
                            name={currentQuestion._id}
                            value={choice}
                            checked={answers[currentQuestion._id] === choice}
                            onChange={(e) => updateAnswer(currentQuestion._id, e.target.value)}
                          />
                          <span>{choice}</span>
                        </label>
                      ))
                    ) : (
                      <textarea
                        rows={5}
                        value={answers[currentQuestion._id] || ""}
                        onChange={(e) => updateAnswer(currentQuestion._id, e.target.value)}
                        placeholder="Type your answer here"
                        style={{ width: "100%", padding: "16px", borderRadius: "18px", border: "1px solid #cbd5e1", fontSize: "15px" }}
                      />
                    )}
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap", marginTop: "20px" }}>
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    style={{ padding: "12px 18px", borderRadius: "16px", border: "none", background: "#e2e8f0", color: "#0f172a", cursor: currentIndex === 0 ? "not-allowed" : "pointer" }}
                  >
                    Previous
                  </button>
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setCurrentIndex((prev) => Math.min(prev + 1, questions.length - 1))}
                      disabled={currentIndex === questions.length - 1}
                      style={{ padding: "12px 18px", borderRadius: "16px", border: "none", background: "#e2e8f0", color: "#0f172a", cursor: currentIndex === questions.length - 1 ? "not-allowed" : "pointer" }}
                    >
                      Next
                    </button>
                    <button
                      onClick={submitQuiz}
                      style={{ padding: "12px 18px", borderRadius: "16px", border: "none", background: "linear-gradient(90deg, #2563eb, #38bdf8)", color: "white", cursor: "pointer" }}
                    >
                      Submit Quiz
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div style={{ marginTop: "24px", color: "#475569" }}>
                No quiz questions have been added yet. Use the form below to create a question for this topic.
              </div>
            )}

            {submitted && result && (
              <div style={{ marginTop: "24px", padding: "22px", borderRadius: "24px", background: "#eff6ff", border: "1px solid #bfdbfe" }}>
                <h3 style={{ margin: "0 0 12px", fontSize: "20px" }}>Quiz Results</h3>
                <p style={{ margin: "0 0 8px", color: "#0f172a" }}><strong>Score:</strong> {result.score}/{result.total}</p>
                <p style={{ margin: 0, color: "#1d4ed8" }}><strong>Accuracy:</strong> {result.accuracy}%</p>

                <div style={{ marginTop: "20px", display: "grid", gap: "14px" }}>
                  {result.attempt?.results?.map((item) => {
                    const isCorrect = item.correct;
                    return (
                      <div key={item.questionId} style={{ padding: "16px", borderRadius: "18px", background: "white", border: "1px solid #cbd5e1" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                          <div>
                            <p style={{ margin: "0 0 8px", fontWeight: 700 }}>{item.questionText || questions.find((q) => q._id.toString() === item.questionId)?.question}</p>
                            <p style={{ margin: 0, color: "#475569" }}>Your answer: <strong>{item.selectedAnswer || "(no answer)"}</strong></p>
                          </div>
                          <span style={{ color: isCorrect ? "#166534" : "#b91c1c", fontWeight: 700 }}>
                            {isCorrect ? "Correct" : "Incorrect"}
                          </span>
                        </div>
                        {!isCorrect && (
                          <p style={{ margin: "12px 0 0", color: "#475569" }}>Correct answer: <strong>{item.correctAnswer}</strong></p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Add Quiz Question</h2>
            <div style={{ display: "grid", gap: "16px", marginTop: "20px" }}>
              <input
                value={questionData.question}
                onChange={(e) => setQuestionData((prev) => ({ ...prev, question: e.target.value }))}
                placeholder="Question text"
                style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <select
                  value={questionData.type}
                  onChange={(e) => setQuestionData((prev) => ({ ...prev, type: e.target.value }))}
                  style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
                >
                  <option value="mcq">Multiple choice</option>
                  <option value="short-answer">Short answer</option>
                  <option value="code">Code prompt</option>
                </select>
                <select
                  value={questionData.difficulty}
                  onChange={(e) => setQuestionData((prev) => ({ ...prev, difficulty: e.target.value }))}
                  style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
              </div>
              {questionData.type === "mcq" && (
                <textarea
                  value={questionData.choices}
                  onChange={(e) => setQuestionData((prev) => ({ ...prev, choices: e.target.value }))}
                  placeholder="Enter choices separated by commas"
                  rows={2}
                  style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
                />
              )}
              <input
                value={questionData.answer}
                onChange={(e) => setQuestionData((prev) => ({ ...prev, answer: e.target.value }))}
                placeholder="Correct answer"
                style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
              />
              <textarea
                value={questionData.explanation}
                onChange={(e) => setQuestionData((prev) => ({ ...prev, explanation: e.target.value }))}
                placeholder="Optional explanation / notes"
                rows={3}
                style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
              />
              <button
                onClick={addQuestion}
                style={{ padding: "14px 20px", borderRadius: "18px", border: "none", background: "linear-gradient(90deg, #2563eb, #38bdf8)", color: "white", fontWeight: 700, cursor: "pointer" }}
              >
                Save question
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <Link to="/suggestions" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
              View smart suggestions →
            </Link>
            <Link to="/analytics" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
              See performance analytics →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Quiz;
