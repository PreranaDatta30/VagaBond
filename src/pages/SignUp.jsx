// src/pages/SignUp.jsx
import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate, Link } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password and New Password (Confirm) do not match!");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      await updateProfile(userCredential.user, {
        displayName: formData.name
      });

      alert("Welcome to VagaBond! Account created successfully.");
      navigate("/accommodation");
    } catch (err) {
      console.error("Signup error:", err.code, err.message);
      if (err.code === "auth/email-already-in-use") {
        setError("An account with this email already exists.");
      } else if (err.code === "auth/invalid-email") {
        setError("Invalid email address format.");
      } else if (err.code === "auth/weak-password") {
        setError("Password is too weak. Choose a stronger password.");
      } else {
        setError("Failed to create account. Please try again.");
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
          ✦ JOIN THE GUILD ✦
        </div>
        <h1
          style={{
            color: "var(--theme-yellow)",
            margin: 0,
            fontSize: "1.6rem",
            letterSpacing: "1px"
          }}
        >
          CREATE A VAGABOND ACCOUNT
        </h1>
        <p style={{ margin: "5px 0 0", color: "#f1f1f1", fontSize: "13px", fontStyle: "italic" }}>
          Fill in your details below to get started.
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

        <form onSubmit={handleSignUp} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          {/* NAME */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--theme-yellow)", display: "block", marginBottom: "4px" }}>
              NAME
            </label>
            <input
              required
              type="text"
              name="name"
              placeholder="e.g. Alex Mercer"
              value={formData.name}
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

          {/* EMAIL */}
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

          {/* PASSWORD */}
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

          {/* NEW PASSWORD (CONFIRM) */}
          <div>
            <label style={{ fontSize: "12px", fontWeight: "bold", color: "var(--theme-yellow)", display: "block", marginBottom: "4px" }}>
              NEW PASSWORD (CONFIRM)
            </label>
            <input
              required
              type="password"
              name="confirmPassword"
              placeholder="••••••••"
              value={formData.confirmPassword}
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
              backgroundColor: "#27ae60",
              color: "#fff",
              padding: "12px",
              fontSize: "14px",
              fontWeight: "bold",
              marginTop: "10px",
              cursor: loading ? "not-allowed" : "pointer"
            }}
          >
            {loading ? "REGISTERING..." : "REGISTER ACCOUNT ✦"}
          </button>
        </form>

        <div style={{ marginTop: "20px", textAlign: "center", fontSize: "13px", color: "#ccc" }}>
          Already registered?{" "}
          <Link to="/login" style={{ color: "var(--theme-yellow)", fontWeight: "bold", textDecoration: "underline" }}>
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}