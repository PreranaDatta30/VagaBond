// src/pages/Login.jsx
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      alert("Welcome back to VagaBond!");
      navigate("/accommodation");
    } catch (err) {
      console.error("Login error:", err.code, err.message);
      if (err.code === "auth/user-not-found" || err.code === "auth/wrong-password" || err.code === "auth/invalid-credential") {
        setError("Invalid email or password.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email format.");
      } else {
        setError("Failed to sign in. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "450px", margin: "50px auto", padding: "0 20px" }}>
      {/* Banner Header */}
      <div
        style={{
          backgroundColor: "var(--theme-terracotta)",
          border: "3px solid var(--theme-border)",
          borderRadius: "16px",
          padding: "20px",
          textAlign: "center",
          marginBottom: "20px",
          boxShadow: "5px 5px 0px rgba(0,0,0,0.4)"
        }}
      >
        <div
          style={{
            display: "inline-block",
            backgroundColor: "var(--bg-navy)",
            color: "#fff",
            padding: "4px 14px",
            borderRadius: "10px",
            fontSize: "12px",
            fontFamily: "Cinzel",
            marginBottom: "8px"
          }}
        >
          ✦ GUILD PORTAL ✦
        </div>
        <h1
          style={{
            color: "var(--theme-yellow)",
            margin: 0,
            fontSize: "1.6rem",
            letterSpacing: "1px"
          }}
        >
          SIGN IN TO VAGABOND
        </h1>
        <p style={{ margin: "5px 0 0", color: "#f1f1f1", fontSize: "13px", fontStyle: "italic" }}>
          Enter your credentials to manage listings and contact owners.
        </p>
      </div>

      {/* Form Card */}
      <div className="vintage-card" style={{ padding: "25px" }}>
        {error && (
          <div
            style={{
              backgroundColor: "rgba(231, 76, 60, 0.2)",
              border: "1px solid #e74c3c",
              color: "#ff6b6b",
              padding: "10px",
              borderRadius: "6px",
              marginBottom: "15px",
              fontSize: "13px",
              textAlign: "center"
            }}
          >
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--theme-yellow)", display: "block", marginBottom: "4px" }}>
              EMAIL
            </label>
            <input
              required
              type="email"
              name="email"
              placeholder="alex@example.com"
              value={formData.email}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box"
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--theme-yellow)", display: "block", marginBottom: "4px" }}>
              PASSWORD
            </label>
            <input
              required
              type="password"
              name="password"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                boxSizing: "border-box"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="vintage-button"
            style={{
              width: "100%",
              backgroundColor: "#2980b9",
              color: "#fff",
              padding: "12px",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "10px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "AUTHENTICATING..." : "SIGN IN ✦"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "#ccc" }}>
          Don't have an account yet?{" "}
          <Link to="/signup" style={{ color: "var(--theme-yellow)", fontWeight: "bold", textDecoration: "underline" }}>
            Register Now
          </Link>
        </div>
      </div>
    </div>
  );
}