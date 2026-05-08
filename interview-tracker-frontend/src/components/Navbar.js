import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "18px 28px",
        background: "linear-gradient(135deg, #0f172a 0%, #2563eb 100%)",
        color: "#f8fafc",
        boxShadow: "0 18px 46px rgba(15, 23, 42, 0.2)"
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div
          style={{
            width: "44px",
            height: "44px",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.16)",
            display: "grid",
            placeItems: "center",
            fontWeight: 700,
            fontSize: "18px",
            color: "#fff"
          }}
        >
          S
        </div>
        <div>
          <div style={{ fontSize: "18px", fontWeight: 700 }}>Prep Pulse</div>
          <div style={{ fontSize: "13px", color: "#cbd5e1" }}>
            Smart Interview Tracker
          </div>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "18px" }}>
        <Link
          to="/topics"
          style={{
            color: "#e2e8f0",
            margin: "0 14px",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.02em"
          }}
        >
          Topics
        </Link>
        <Link
          to="/dashboard"
          style={{
            color: "#e2e8f0",
            margin: "0 14px",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.02em"
          }}
        >
          Dashboard
        </Link>
        <Link
          to="/suggestions"
          style={{
            color: "#e2e8f0",
            margin: "0 14px",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.02em"
          }}
        >
          Suggestions
        </Link>
        <Link
          to="/analytics"
          style={{
            color: "#e2e8f0",
            margin: "0 14px",
            textDecoration: "none",
            fontWeight: 600,
            letterSpacing: "0.02em"
          }}
        >
          Analytics
        </Link>
      </div>
    </div>
  );
}

export default Navbar;