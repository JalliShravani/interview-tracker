import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Topics() {
  const [topics, setTopics] = useState([]);
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");

  // 👉 EDIT STATES
  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const fetchTopics = async () => {
    const res = await API.get("/topics");

    const enhanced = await Promise.all(
      res.data.map(async (topic) => {
        const taskCounts = { pending: 0, "in-progress": 0, completed: 0 };

        try {
          const taskRes = await API.get(`/tasks/${topic._id}`);
          taskRes.data.forEach((task) => {
            if (task.status && taskCounts[task.status] !== undefined) {
              taskCounts[task.status] += 1;
            }
          });
        } catch (err) {
          // keep counts if tasks are unavailable
        }

        return {
          ...topic,
          taskCounts,
          taskTotal: taskCounts.pending + taskCounts["in-progress"] + taskCounts.completed
        };
      })
    );

    setTopics(enhanced);
  };

  const deleteTopic = async (id) => {
    try {
      await API.delete(`/topics/${id}`);
      fetchTopics();
    } catch (err) {
      alert("Error deleting topic");
    }
  };

  const addTopic = async () => {
    if (!title.trim()) return alert("Enter title");

    await API.post("/topics", { title, notes });
    setTitle("");
    setNotes("");
    fetchTopics();
  };

  // 👉 UPDATE TOPIC
  const updateTopic = async (id) => {
    try {
      await API.put(`/topics/${id}`, {
        title: editTitle,
        notes: editNotes
      });

      setEditingId(null);
      fetchTopics();
    } catch (err) {
      alert("Error updating topic");
    }
  };

  useEffect(() => {
    fetchTopics();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #e0f2fe 0%, #f8fafc 52%, #0f172a 100%)",
        color: "#0f172a"
      }}
    >
      <Navbar />

      <div style={{ maxWidth: "920px", margin: "auto", padding: "28px 20px 42px" }}>
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <p style={{ margin: 0, color: "#475569", textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.18em" }}>
            Topic tracker
          </p>
          <h1 style={{ margin: "12px auto 0", fontSize: "36px", lineHeight: 1.05, maxWidth: "700px" }}>
            Build and track interview topics with live status badges.
          </h1>
        </div>

        <div
          style={{
            background: "#ffffff",
            borderRadius: "28px",
            padding: "30px",
            boxShadow: "0 32px 80px rgba(15,23,42,0.12)",
            marginBottom: "24px"
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "18px", marginBottom: "24px" }}>
            <div>
              <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>New Topic</p>
              <input
                value={title}
                placeholder="New Topic"
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  marginTop: "10px",
                  borderRadius: "18px",
                  border: "1px solid #cbd5e1",
                  fontSize: "15px",
                  boxSizing: "border-box"
                }}
              />
            </div>
            <div>
              <p style={{ margin: 0, color: "#64748b", fontSize: "14px" }}>Notes</p>
              <textarea
                value={notes}
                placeholder="Add notes"
                onChange={(e) => setNotes(e.target.value)}
                rows={4}
                style={{
                  width: "100%",
                  padding: "16px 18px",
                  marginTop: "10px",
                  borderRadius: "18px",
                  border: "1px solid #cbd5e1",
                  fontSize: "15px",
                  minHeight: "130px",
                  boxSizing: "border-box"
                }}
              />
            </div>
          </div>

          <button
            onClick={addTopic}
            style={{
              padding: "14px 24px",
              borderRadius: "18px",
              border: "none",
              background: "linear-gradient(90deg, #2563eb, #38bdf8)",
              color: "white",
              fontWeight: 700,
              cursor: "pointer"
            }}
          >
            Add Topic
          </button>
        </div>

        <div style={{ display: "grid", gap: "18px" }}>
          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {topics.map((t) => {
              const completedCount = t.taskCounts?.completed || 0;
              const total = t.taskTotal || 0;
              const progress = total ? Math.round((completedCount / total) * 100) : 0;

              return (
                <li
                  key={t._id}
                  style={{
                    background: "#ffffff",
                    padding: "22px",
                    borderRadius: "24px",
                    boxShadow: "0 20px 60px rgba(15,23,42,0.08)"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                      gap: "18px",
                      alignItems: "flex-start"
                    }}
                  >
                    {editingId === t._id ? (
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <input
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          style={{
                            width: "100%",
                            marginBottom: "10px",
                            padding: "12px 14px",
                            borderRadius: "14px",
                            border: "1px solid #cbd5e1"
                          }}
                        />
                        <textarea
                          value={editNotes}
                          onChange={(e) => setEditNotes(e.target.value)}
                          rows={3}
                          style={{
                            width: "100%",
                            padding: "12px 14px",
                            borderRadius: "14px",
                            border: "1px solid #cbd5e1"
                          }}
                        />
                      </div>
                    ) : (
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <h3 style={{ margin: 0, fontSize: "22px", color: "#0f172a" }}>{t.title}</h3>
                        {t.notes && (
                          <p style={{ margin: "12px 0 0", color: "#475569", lineHeight: 1.7 }}>{t.notes}</p>
                        )}
                      </div>
                    )}

                    <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "center" }}>
                      <span style={{ padding: "8px 12px", borderRadius: "999px", background: "#f8fafc", color: "#0f172a", fontWeight: 700 }}>
                        {progress}% Complete
                      </span>
                      <span style={{ padding: "8px 12px", borderRadius: "999px", background: "#eff6ff", color: "#2563eb", fontWeight: 700 }}>
                        {completedCount}/{total} Done
                      </span>
                      {editingId === t._id ? (
                        <button
                          onClick={() => updateTopic(t._id)}
                          style={{
                            background: "#16a34a",
                            color: "white",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: "14px",
                            cursor: "pointer"
                          }}
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setEditingId(t._id);
                            setEditTitle(t.title);
                            setEditNotes(t.notes || "");
                          }}
                          style={{
                            background: "#f59e0b",
                            color: "white",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: "14px",
                            cursor: "pointer"
                          }}
                        >
                          Edit
                        </button>
                      )}
                      <a
                        href={`/tasks/${t._id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 16px",
                          borderRadius: "14px",
                          background: "#e0f2fe",
                          color: "#1d4ed8",
                          textDecoration: "none",
                          fontWeight: 700
                        }}
                      >
                        Open Tasks
                      </a>
                      <a
                        href={`/quiz/${t._id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 16px",
                          borderRadius: "14px",
                          background: "#dbeafe",
                          color: "#1d4ed8",
                          textDecoration: "none",
                          fontWeight: 700
                        }}
                      >
                        Start Quiz
                      </a>
                      <a
                        href={`/mock-interview/${t._id}`}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          padding: "10px 16px",
                          borderRadius: "14px",
                          background: "#ede9fe",
                          color: "#4f46e5",
                          textDecoration: "none",
                          fontWeight: 700
                        }}
                      >
                        Mock Interview
                      </a>
                      <button
                        onClick={() => deleteTopic(t._id)}
                        style={{
                          background: "#ef4444",
                          color: "white",
                          border: "none",
                          padding: "10px 16px",
                          borderRadius: "14px",
                          cursor: "pointer"
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div style={{ marginTop: "18px" }}>
                    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                      <span style={{ padding: "8px 12px", borderRadius: "999px", background: "#fef9c3", color: "#92400e", fontSize: "13px", fontWeight: 700 }}>
                        Pending {t.taskCounts?.pending || 0}
                      </span>
                      <span style={{ padding: "8px 12px", borderRadius: "999px", background: "#dbeafe", color: "#1d4ed8", fontSize: "13px", fontWeight: 700 }}>
                        In Progress {t.taskCounts?.["in-progress"] || 0}
                      </span>
                      <span style={{ padding: "8px 12px", borderRadius: "999px", background: "#dcfce7", color: "#166534", fontSize: "13px", fontWeight: 700 }}>
                        Done {t.taskCounts?.completed || 0}
                      </span>
                    </div>

                    <div style={{ height: "10px", borderRadius: "999px", background: "#e2e8f0", marginTop: "14px" }}>
                      <div
                        style={{
                          width: `${progress}%`,
                          height: "100%",
                          borderRadius: "999px",
                          background: "linear-gradient(90deg, #2563eb, #38bdf8)"
                        }}
                      />
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Topics;