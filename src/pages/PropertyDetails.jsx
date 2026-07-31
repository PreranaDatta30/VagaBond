// src/pages/PropertyDetails.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";

export default function PropertyDetails() {
  const { id } = useParams();

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      <div className="vintage-card">
        <h1 style={{ color: "var(--theme-border)", marginTop: 0 }}>
          ✦ PROPERTY DETAILS ✦
        </h1>
        <p>Viewing property listing ID: <strong>{id}</strong></p>
        
        <Link to="/accommodation">
          <button className="vintage-button" style={{ marginTop: "15px" }}>
            ← Back to Stays
          </button>
        </Link>
      </div>
    </div>
  );
}