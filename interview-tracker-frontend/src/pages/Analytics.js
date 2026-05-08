import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Analytics() {
  const [data, setData] = useState(null);

  const fetchAnalytics = async () => {
    const res = await API.get("/insights/skill-progress");
    setData(res.data);
  };

  useEffect(() => {
    fetchAnalytics();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f0f9ff 0%, #eff6ff 60%, #0f172a 100%)", color: "#0f172a" }}>
      <Navbar />
      <div style={{ maxWidth: "980px", margin: "auto", padding: "28px 20px 40px" }}>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.12em" }}>
            Skill analytics
          </p>
          <h1 style={{ margin: "10px 0 0", fontSize: "34px" }}>Performance dashboard</h1>
          <p style={{ marginTop: "12px", color: "#475569" }}>
            Track topic progress, quiz performance, and where to focus next.
          </p>
        </div>

        <div style={{ display: "grid", gap: "22px" }}>
          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Topic progress</h2>
            {!data && <p style={{ marginTop: "18px", color: "#475569" }}>Loading analytics...</p>}
            {data?.topicSummaries?.map((item) => (
              <div key={item.topicId} style={{ marginTop: "18px", padding: "18px", borderRadius: "22px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "16px" }}>{item.title}</h3>
                    <p style={{ margin: "6px 0 0", color: "#475569", fontSize: "14px" }}>
                      {item.completed}/{item.total} completed · {item.inProgress} in progress · {item.pending} pending
                    </p>
                  </div>
                  <span style={{ color: "#1d4ed8", fontWeight: 700 }}>{item.progress}%</span>
                </div>
                <div style={{ marginTop: "12px", height: "10px", borderRadius: "999px", background: "#e2e8f0" }}>
                  <div style={{ width: `${item.progress}%`, height: "100%", background: "linear-gradient(90deg, #2563eb, #38bdf8)", borderRadius: "999px" }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Quiz performance</h2>
            {data?.quizStats?.map((item) => (
              <div key={item.topicId} style={{ marginTop: "18px", padding: "18px", borderRadius: "22px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                  <div>
                    <h3 style={{ margin: 0, fontSize: "16px" }}>{item.title}</h3>
                    <p style={{ margin: "6px 0 0", color: "#475569", fontSize: "14px" }}>Attempts: {item.attempts}</p>
                  </div>
                  <span style={{ color: "#166534", fontWeight: 700 }}>{item.averageScore}% avg</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
