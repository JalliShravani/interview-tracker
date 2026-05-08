import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function MockInterview() {
  const { topicId } = useParams();
  const [prompts, setPrompts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [responses, setResponses] = useState({});
  const [completed, setCompleted] = useState(false);
  const [promptData, setPromptData] = useState({ prompt: "", expectedAnswer: "", difficulty: "medium", order: 1 });

  const fetchPrompts = async () => {
    if (!topicId) return;
    const res = await API.get(`/mock-interviews/${topicId}`);
    setPrompts(res.data);
  };

  useEffect(() => {
    fetchPrompts();
  }, [topicId]);

  const updateResponse = (promptId, value) => {
    setResponses((prev) => ({ ...prev, [promptId]: value }));
  };

  const addPrompt = async () => {
    if (!promptData.prompt.trim()) {
      return alert("Add a prompt first.");
    }

    await API.post("/mock-interviews", {
      topicId,
      prompt: promptData.prompt,
      expectedAnswer: promptData.expectedAnswer,
      difficulty: promptData.difficulty,
      order: Number(promptData.order) || 1
    });

    setPromptData({ prompt: "", expectedAnswer: "", difficulty: "medium", order: promptData.order + 1 });
    fetchPrompts();
  };

  const currentPrompt = prompts[currentIndex];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #eff6ff 0%, #f8fafc 70%, #0f172a 100%)", color: "#0f172a" }}>
      <Navbar />
      <div style={{ maxWidth: "980px", margin: "auto", padding: "28px 20px 40px" }}>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.12em" }}>
            Mock Interview
          </p>
          <h1 style={{ margin: "10px 0 0", fontSize: "34px" }}>Mock interview walkthrough</h1>
          <p style={{ marginTop: "12px", color: "#475569" }}>
            Practice with a sequence of prompts, capture your answers, and review your preparation flow.
          </p>
        </div>

        <div style={{ display: "grid", gap: "22px" }}>
          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Interview prompts</h2>
            {prompts.length ? (
              <>
                <div style={{ marginTop: "20px", padding: "22px", borderRadius: "24px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <p style={{ margin: 0, color: "#475569", fontSize: "13px" }}>Prompt {currentIndex + 1} of {prompts.length}</p>
                  <h3 style={{ margin: "12px 0 0", fontSize: "20px" }}>{currentPrompt.prompt}</h3>
                </div>
                <textarea
                  rows={5}
                  value={responses[currentPrompt._id] || ""}
                  onChange={(e) => updateResponse(currentPrompt._id, e.target.value)}
                  placeholder="Record your answer here"
                  style={{ width: "100%", borderRadius: "20px", border: "1px solid #cbd5e1", padding: "16px", fontSize: "15px" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
                    disabled={currentIndex === 0}
                    style={{ padding: "12px 18px", borderRadius: "16px", border: "none", background: "#e2e8f0", color: "#0f172a", cursor: currentIndex === 0 ? "not-allowed" : "pointer" }}
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => {
                      if (currentIndex === prompts.length - 1) {
                        setCompleted(true);
                      } else {
                        setCurrentIndex((prev) => prev + 1);
                      }
                    }}
                    style={{ padding: "12px 18px", borderRadius: "16px", border: "none", background: "linear-gradient(90deg, #2563eb, #38bdf8)", color: "white", cursor: "pointer" }}
                  >
                    {currentIndex === prompts.length - 1 ? "Finish mock interview" : "Next prompt"}
                  </button>
                </div>
              </>
            ) : (
              <p style={{ marginTop: "18px", color: "#475569" }}>No prompts yet. Add a prompt below and begin your mock interview.</p>
            )}
          </div>

          {completed && (
            <div style={{ background: "#ecfccb", borderRadius: "28px", padding: "24px", border: "1px solid #d9f99d" }}>
              <h3 style={{ margin: 0, fontSize: "22px" }}>Mock interview complete</h3>
              <p style={{ margin: "12px 0 0", color: "#4b5563" }}>Great work. Review your answer notes and continue improving the prompts you want to master.</p>
            </div>
          )}

          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Add mock interview prompt</h2>
            <div style={{ display: "grid", gap: "16px", marginTop: "18px" }}>
              <textarea
                rows={3}
                value={promptData.prompt}
                onChange={(e) => setPromptData((prev) => ({ ...prev, prompt: e.target.value }))}
                placeholder="Write a prompt such as 'Describe your last project'"
                style={{ width: "100%", padding: "16px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
              />
              <textarea
                rows={2}
                value={promptData.expectedAnswer}
                onChange={(e) => setPromptData((prev) => ({ ...prev, expectedAnswer: e.target.value }))}
                placeholder="Expected answer notes (optional)"
                style={{ width: "100%", padding: "16px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <select
                  value={promptData.difficulty}
                  onChange={(e) => setPromptData((prev) => ({ ...prev, difficulty: e.target.value }))}
                  style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
                >
                  <option value="easy">Easy</option>
                  <option value="medium">Medium</option>
                  <option value="hard">Hard</option>
                </select>
                <input
                  type="number"
                  min="1"
                  value={promptData.order}
                  onChange={(e) => setPromptData((prev) => ({ ...prev, order: Number(e.target.value) }))}
                  placeholder="Order"
                  style={{ width: "100%", padding: "14px", borderRadius: "16px", border: "1px solid #cbd5e1" }}
                />
              </div>
              <button
                onClick={addPrompt}
                style={{ padding: "14px 20px", borderRadius: "18px", border: "none", background: "linear-gradient(90deg, #2563eb, #38bdf8)", color: "white", fontWeight: 700, cursor: "pointer" }}
              >
                Add prompt
              </button>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <Link to="/suggestions" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
              Get AI suggestions →
            </Link>
            <Link to="/analytics" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
              Review skill analytics →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MockInterview;
