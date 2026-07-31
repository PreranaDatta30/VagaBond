// src/pages/Wishlist.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Wishlist() {
  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      {/* Vintage Header Banner */}
      <div style={{ 
        backgroundColor: "var(--theme-terracotta)", 
        border: "3px solid black", 
        borderRadius: "16px", 
        padding: "20px", 
        textAlign: "center", 
        marginBottom: "25px" 
      }}>
        <h1 style={{ color: "var(--theme-yellow)", margin: 0 }}>✦ SAVED STAYS & WISHLIST ✦</h1>
      </div>

      {/* Main Container */}
      <div className="vintage-card">
        <p style={{ fontSize: "16px", marginBottom: "20px" }}>
          Your saved accommodation listings will appear here.
        </p>

        <Link to="/accommodation">
          <button className="vintage-button">
            ← Explore Stays
          </button>
        </Link>
      </div>
    </div>
  );
}