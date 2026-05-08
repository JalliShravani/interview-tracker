import React, { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Dashboard() {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const topics = await API.get("/topics");

    const result = await Promise.all(
      topics.data.map(async (t) => {
        const progress = await API.get(`/topics/progress/${t._id}`);
        return { ...t, progress: progress.data.progress };
      })
    );

    setData(result);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #eff6ff 0%, #e2e8f0 45%, #0f172a 100%)",
        color: "#0f172a"
      }}
    >
      <Navbar />

      <div style={{ maxWidth: "1100px", margin: "auto", padding: "26px 24px 40px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "18px",
            flexWrap: "wrap"
          }}
        >
          <div>
            <p style={{ margin: 0, color: "#475569", textTransform: "uppercase", letterSpacing: "0.18em", fontSize: "13px" }}>
              Dashboard
            </p>
            <h1 style={{ margin: "10px 0 0", fontSize: "36px", lineHeight: 1.1 }}>
              Track progress across your topics
            </h1>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "22px", marginTop: "30px" }}>
            {data.map((t) => (
              <div
                key={t._id}
                style={{
                  background: "#ffffff",
                  borderRadius: "26px",
                  padding: "26px",
                  boxShadow: "0 28px 70px rgba(15,23,42,0.1)",
                  minHeight: "220px"
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                  <div>
                    <p style={{ margin: 0, color: "#2563eb", fontSize: "13px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                      Topic
                    </p>
                    <h2 style={{ margin: "10px 0 0", fontSize: "24px", color: "#0f172a" }}>{t.title}</h2>
                  </div>
                  <div style={{ padding: "8px 14px", borderRadius: "999px", background: "#e0f2fe", color: "#0c4a6e", fontWeight: 700, fontSize: "13px" }}>
                    {t.progress}%
                  </div>
                </div>

                {t.notes && (
                  <p style={{ margin: "0 0 22px", color: "#475569", lineHeight: 1.7 }}>{t.notes}</p>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                  <span style={{ color: "#475569", fontSize: "14px" }}>
                    {t.progress === 100 ? "Completed" : t.progress > 0 ? "In progress" : "Not started"}
                  </span>
                  <span style={{ color: "#1d4ed8", fontWeight: 700, fontSize: "14px" }}>
                    {t.progress}% done
                  </span>
                </div>

                <div style={{ width: "100%", height: "12px", borderRadius: "999px", background: "#e2e8f0" }}>
                  <div
                    style={{
                      width: `${t.progress}%`,
                      height: "100%",
                      borderRadius: "999px",
                      background: "linear-gradient(90deg, #2563eb, #38bdf8)"
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;