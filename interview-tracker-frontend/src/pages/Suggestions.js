import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Suggestions() {
  const [data, setData] = useState(null);

  const fetchSuggestions = async () => {
    const res = await API.get("/insights/suggestions");
    setData(res.data);
  };

  useEffect(() => {
    fetchSuggestions();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #f8fafc 0%, #e2e8f0 60%, #0f172a 100%)", color: "#0f172a" }}>
      <Navbar />
      <div style={{ maxWidth: "980px", margin: "auto", padding: "28px 20px 40px" }}>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ margin: 0, color: "#64748b", textTransform: "uppercase", fontSize: "13px", letterSpacing: "0.12em" }}>
            Smart suggestions
          </p>
          <h1 style={{ margin: "10px 0 0", fontSize: "34px" }}>What to practice next</h1>
          <p style={{ marginTop: "12px", color: "#475569" }}>
            AI-inspired recommendations based on your topic progress and quiz readiness.
          </p>
        </div>

        <div style={{ display: "grid", gap: "22px" }}>
          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Recommendations</h2>
            {!data && <p style={{ marginTop: "18px", color: "#475569" }}>Loading suggestions...</p>}
            {data?.suggestions?.map((item, index) => (
              <div key={index} style={{ marginTop: "20px", padding: "20px", borderRadius: "22px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                <h3 style={{ margin: "0 0 10px", fontSize: "18px" }}>{item.title}</h3>
                <p style={{ margin: 0, color: "#475569" }}>{item.description}</p>
                {item.topicId && (
                  <Link to={`/quiz/${item.topicId}`} style={{ display: "inline-block", marginTop: "12px", color: "#2563eb", fontWeight: 700 }}>
                    Start quiz for this topic →
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div style={{ background: "#ffffff", borderRadius: "28px", padding: "26px", boxShadow: "0 24px 60px rgba(15,23,42,0.08)" }}>
            <h2 style={{ margin: 0, fontSize: "22px" }}>Topic progress</h2>
            <div style={{ display: "grid", gap: "14px", marginTop: "18px" }}>
              {data?.topicProgress?.map((item) => (
                <div key={item.topic._id} style={{ padding: "18px", borderRadius: "20px", background: "#f8fafc", border: "1px solid #e2e8f0" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
                    <h4 style={{ margin: 0, fontSize: "16px" }}>{item.topic.title}</h4>
                    <span style={{ color: "#1d4ed8", fontWeight: 700 }}>{item.progress}%</span>
                  </div>
                  <div style={{ marginTop: "10px", height: "10px", borderRadius: "999px", background: "#e2e8f0" }}>
                    <div style={{ width: `${item.progress}%`, height: "100%", background: "linear-gradient(90deg, #2563eb, #38bdf8)", borderRadius: "999px" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <Link to="/analytics" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
              View analytics →
            </Link>
            <Link to="/topics" style={{ color: "#2563eb", textDecoration: "none", fontWeight: 700 }}>
              Manage topics →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
