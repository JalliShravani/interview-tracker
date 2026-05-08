import React, { useState } from "react";
import API from "../services/api";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    try {
      await API.post("/auth/signup", { name, email, password });
      alert("Signup Successful");
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
        background: "radial-gradient(circle at top right, #8b5cf6 0%, #0f172a 72%)",
        color: "#eef2ff",
        padding: "24px"
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "440px",
          background: "rgba(15, 23, 42, 0.96)",
          borderRadius: "28px",
          boxShadow: "0 32px 72px rgba(15, 23, 42, 0.35)",
          padding: "36px",
          color: "#f8fafc"
        }}
      >
        <div style={{ marginBottom: "26px", textAlign: "center" }}>
          <div
            style={{
              textTransform: "uppercase",
              letterSpacing: "0.22em",
              fontSize: "12px",
              color: "#c4b5fd",
              marginBottom: "12px"
            }}
          >
            Start your journey
          </div>
          <h2 style={{ margin: 0, fontSize: "32px", letterSpacing: "-0.03em" }}>
            Create Account
          </h2>
          <p style={{ margin: "14px auto 0", maxWidth: "320px", color: "#cbd5e1", lineHeight: 1.7 }}>
            Build your personalized interview tracker and stay ahead with smart task management.
          </p>
        </div>

        <input
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: "14px",
            borderRadius: "16px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#f8fafc",
            fontSize: "15px",
            boxSizing: "border-box"
          }}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "14px 16px",
            marginBottom: "14px",
            borderRadius: "16px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#f8fafc",
            fontSize: "15px",
            boxSizing: "border-box"
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
            marginBottom: "20px",
            borderRadius: "16px",
            border: "1px solid #334155",
            background: "#0f172a",
            color: "#f8fafc",
            fontSize: "15px",
            boxSizing: "border-box"
          }}
        />

        <button
          onClick={handleSignup}
          style={{
            width: "100%",
            padding: "14px 0",
            borderRadius: "16px",
            border: "none",
            background: "linear-gradient(90deg, #8b5cf6, #22d3ee)",
            color: "white",
            fontWeight: 700,
            fontSize: "15px",
            cursor: "pointer"
          }}
        >
          Signup
        </button>

        <p style={{ margin: "22px 0 0", color: "#cbd5e1", textAlign: "center" }}>
          Already have an account?{' '}
          <a href="/" style={{ color: "#7dd3fc", fontWeight: 700, textDecoration: "none" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;