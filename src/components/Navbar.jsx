// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for live login/logout status
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
      navigate("/login");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <nav style={{
      backgroundColor: "var(--bg-navy)",
      borderBottom: "2px solid var(--theme-border)",
      padding: "12px 25px",
      display: "flex",
      justify: "space-between",
      alignItems: "center",
      flexWrap: "wrap",
      gap: "10px"
    }}>
      {/* Brand Logo & Navigation Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <Link to="/accommodation" style={{ color: "var(--theme-yellow)", textDecoration: "none", fontSize: "1.2rem", fontWeight: "bold", fontFamily: "Cinzel" }}>
          ✦ VAGABOND
        </Link>
        <Link to="/accommodation" className="vintage-button" style={{ fontSize: "11px", padding: "6px 12px", textDecoration: "none", color: "#fff" }}>
          🏠 STAYS
        </Link>
      </div>

      {/* Auth Action Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {user ? (
          <>
            <span style={{ color: "var(--theme-yellow)", fontSize: "12px", fontWeight: "bold" }}>
              👤 {user.displayName || user.email}
            </span>
            <button
              onClick={handleLogout}
              className="vintage-button"
              style={{
                backgroundColor: "#c0392b",
                color: "#fff",
                fontSize: "11px",
                padding: "6px 12px",
                cursor: "pointer"
              }}
            >
              🚪 LOG OUT
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="vintage-button"
              style={{
                textDecoration: "none",
                fontSize: "11px",
                padding: "6px 12px",
                backgroundColor: "#2980b9",
                color: "#fff"
              }}
            >
              🔑 SIGN IN
            </Link>
            <Link
              to="/signup"
              className="vintage-button"
              style={{
                textDecoration: "none",
                fontSize: "11px",
                padding: "6px 12px",
                backgroundColor: "#27ae60",
                color: "#fff"
              }}
            >
              ✦ SIGN UP
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}