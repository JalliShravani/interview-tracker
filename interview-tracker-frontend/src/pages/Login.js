import React, { useState } from "react";
import API from "../services/api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);

      alert("Login Successful");

      window.location.href = "/topics";
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "radial-gradient(circle at top, #2563eb 0%, #0f172a 70%)",
        color: "#0f172a",
        padding: "20px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "rgba(255, 255, 255, 0.95)",
          borderRadius: "24px",
          boxShadow: "0 30px 60px rgba(15, 23, 42, 0.2)",
          padding: "36px",
          textAlign: "center"
        }}
      >
        <h2 style={{ margin: "0 0 10px", fontSize: "28px", color: "#111827" }}>
          Login
        </h2>
        <p style={{ margin: "0 0 28px", color: "#475569", lineHeight: 1.6 }}>
          Sign in to continue your interview preparation journey.
        </p>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            margin: "8px 0",
            borderRadius: "14px",
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
            fontSize: "15px"
          }}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            margin: "8px 0 20px",
            borderRadius: "14px",
            border: "1px solid #cbd5e1",
            boxSizing: "border-box",
            fontSize: "15px"
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "14px 16px",
            marginTop: "8px",
            background: "#1d4ed8",
            color: "white",
            border: "none",
            borderRadius: "14px",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: "15px"
          }}
        >
          Login
        </button>

        <p style={{ margin: "18px 0 0", color: "#475569" }}>
          Don't have an account?{' '}
          <a href="/signup" style={{ color: "#1d4ed8", fontWeight: 600, textDecoration: "none" }}>
            Signup
          </a>
        </p>

        <h1 style={{
          margin: "36px 0 0",
          fontSize: "22px",
          lineHeight: 1.3,
          color: "#0f172a"
        }}>
          Smart Interview Preparation Tracker
        </h1>
      </div>
    </div>
  );
}

export default Login;