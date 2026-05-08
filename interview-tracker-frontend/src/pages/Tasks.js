import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";

function Tasks() {
  const { topicId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const fetchTasks = async () => {
    const res = await API.get(`/tasks/${topicId}`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await API.post("/tasks", { title, topicId });
    setTitle("");
    fetchTasks();
  };

  useEffect(() => {
    if (topicId) {
      fetchTasks();
    }
  }, [topicId]);

  const updateStatus = async (id, status) => {
    await API.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  const counts = tasks.reduce(
    (acc, task) => {
      acc[task.status] = (acc[task.status] || 0) + 1;
      return acc;
    },
    { pending: 0, "in-progress": 0, completed: 0 }
  );

  const totalTasks = counts.pending + counts["in-progress"] + counts.completed;
  const progress = totalTasks ? Math.round((counts.completed / totalTasks) * 100) : 0;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eff6ff 0%, #e0f2fe 50%, #0f172a 100%)",
        color: "#0f172a",
        padding: "20px"
      }}
    >
      <Navbar />

      <div style={{ maxWidth: "980px", margin: "auto", padding: "28px 20px 40px" }}>
        <div
          style={{
            marginBottom: "22px",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "18px"
          }}
        >
          <div>
            <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.12em" }}>
              Task Manager
            </p>
            <h1 style={{ margin: "8px 0 0", fontSize: "32px" }}>Your topic tasks</h1>
          </div>

          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span style={{ padding: "10px 14px", borderRadius: "999px", background: "#f8fafc", color: "#0f172a", fontWeight: 700 }}>
              Pending {counts.pending}
            </span>
            <span style={{ padding: "10px 14px", borderRadius: "999px", background: "#e0f2fe", color: "#1d4ed8", fontWeight: 700 }}>
              In Progress {counts["in-progress"]}
            </span>
            <span style={{ padding: "10px 14px", borderRadius: "999px", background: "#dcfce7", color: "#166534", fontWeight: 700 }}>
              Done {counts.completed}
            </span>
          </div>
        </div>

        <div style={{ marginBottom: "24px", padding: "22px", borderRadius: "28px", background: "#ffffff", border: "1px solid rgba(148,163,184,0.2)", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <span style={{ color: "#475569", fontWeight: 700 }}>Overall Progress</span>
            <span style={{ color: "#1d4ed8", fontWeight: 700 }}>{progress}% complete</span>
          </div>
          <div style={{ width: "100%", height: "14px", borderRadius: "999px", background: "#e2e8f0", marginTop: "14px", overflow: "hidden" }}>
            <div
              style={{
                width: `${progress}%`,
                minWidth: progress ? "12px" : "0",
                height: "100%",
                borderRadius: "999px",
                background: progress ? "linear-gradient(90deg, #2563eb, #38bdf8)" : "#cbd5e1",
                transition: "width 0.3s ease"
              }}
            />
          </div>
        </div>

        <div style={{ background: "#ffffff", borderRadius: "28px", padding: "28px", boxShadow: "0 28px 80px rgba(15,23,42,0.1)" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "14px", marginBottom: "24px" }}>
            <input
              value={title}
              placeholder="Add a new task"
              onChange={(e) => setTitle(e.target.value)}
              style={{
                flex: 1,
                minWidth: "220px",
                padding: "14px 16px",
                borderRadius: "18px",
                border: "1px solid #cbd5e1",
                fontSize: "15px",
                boxSizing: "border-box"
              }}
            />
            <button
              onClick={addTask}
              style={{
                padding: "14px 22px",
                borderRadius: "18px",
                border: "none",
                background: "linear-gradient(90deg, #2563eb, #38bdf8)",
                color: "white",
                fontWeight: 700,
                cursor: "pointer"
              }}
            >
              Add Task
            </button>
          </div>

          <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "16px" }}>
            {tasks.map((t) => {
              const statusColor =
                t.status === "completed"
                  ? "#16a34a"
                  : t.status === "in-progress"
                  ? "#1d4ed8"
                  : "#f97316";

              return (
                <li
                  key={t._id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: "16px",
                    padding: "18px 22px",
                    borderRadius: "22px",
                    background: "#f8fafc",
                    border: "1px solid #e2e8f0"
                  }}
                >
                  <div>
                    <p style={{ margin: "0 0 8px", fontSize: "16px", fontWeight: 700, color: "#0f172a" }}>{t.title}</p>
                    <span
                      style={{
                        display: "inline-flex",
                        padding: "8px 12px",
                        borderRadius: "999px",
                        background: "rgba(59,130,246,0.1)",
                        color: statusColor,
                        fontWeight: 700,
                        fontSize: "13px"
                      }}
                    >
                      {t.status}
                    </span>
                  </div>

                  <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                    <button
                      onClick={() => updateStatus(t._id, "pending")}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "14px",
                        border: "1px solid #cbd5e1",
                        background: "white",
                        cursor: "pointer"
                      }}
                    >
                      Pending
                    </button>
                    <button
                      onClick={() => updateStatus(t._id, "in-progress")}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "14px",
                        border: "1px solid #cbd5e1",
                        background: "white",
                        cursor: "pointer"
                      }}
                    >
                      In Progress
                    </button>
                    <button
                      onClick={() => updateStatus(t._id, "completed")}
                      style={{
                        padding: "10px 14px",
                        borderRadius: "14px",
                        border: "1px solid #cbd5e1",
                        background: "white",
                        cursor: "pointer"
                      }}
                    >
                      Done
                    </button>
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

export default Tasks;