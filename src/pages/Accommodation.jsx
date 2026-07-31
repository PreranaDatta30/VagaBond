// src/pages/Accommodation.jsx
import React, { useState, useEffect } from "react";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";

// Initial seed data so your screen is NEVER empty!
const INITIAL_PROPERTIES = [
  {
    id: "seed-1",
    title: "Cozy 1BHK Student Apartment",
    type: "rent",
    price: 8500,
    location: "Ashta, Near Seminary Road",
    description: "Fully furnished 1BHK apartment with high-speed WiFi and 24/7 security.",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
    owner: {
      name: "Ravi Verma",
      phone: "+91 9876543210",
      email: "owner@vagabond.com"
    }
  },
  {
    id: "seed-2",
    title: "Spacious 2BHK Near VIT Campus",
    type: "rent",
    price: 14000,
    location: "Kothri Kalan, Near University Gate",
    description: "Ideal for students. Includes air conditioning, power backup, and study desks.",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500",
    owner: {
      name: "Rajesh Kumar",
      phone: "+91 9826011223",
      email: "rajesh.properties@gmail.com"
    }
  },
  {
    id: "seed-3",
    title: "Sunlit Executive Studio Loft",
    type: "sale",
    price: 2800000,
    location: "Vijay Nagar, Indore",
    description: "Modern studio loft with modular kitchen, private balcony, and rooftop lounge access.",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500",
    owner: {
      name: "Priya Verma",
      phone: "+91 9755123456",
      email: "p.verma@realestate.in"
    }
  }
];

export default function Accommodation() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState(INITIAL_PROPERTIES);
  const [filter, setFilter] = useState("all");
  const [showAddModal, setShowAddModal] = useState(false);

  // Form state for creating a new property
  const [newProp, setNewProp] = useState({
    title: "",
    type: "rent",
    price: "",
    location: "",
    description: "",
    imageUrl: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: ""
  });

  // Helper function to require login for gated actions
  const handleProtectedAction = (actionCallback) => {
    const currentUser = auth.currentUser;

    if (!currentUser) {
      alert("Please sign up or log in to contact owners or reserve properties!");
      navigate("/signup");
      return;
    }

    actionCallback();
  };

  // Fetch properties from Firebase, fallback to initial properties
  useEffect(() => {
    const fetchFromFirebase = async () => {
      try {
        let q = collection(db, "properties");
        if (filter !== "all") {
          q = query(collection(db, "properties"), where("type", "==", filter));
        }
        const snapshot = await getDocs(q);
        const firebaseData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        if (firebaseData.length > 0) {
          setProperties(firebaseData);
        } else {
          if (filter === "all") setProperties(INITIAL_PROPERTIES);
          else setProperties(INITIAL_PROPERTIES.filter((p) => p.type === filter));
        }
      } catch (err) {
        console.warn("Firebase not active yet. Using local state data.", err);
        if (filter === "all") setProperties(INITIAL_PROPERTIES);
        else setProperties(INITIAL_PROPERTIES.filter((p) => p.type === filter));
      }
    };

    fetchFromFirebase();
  }, [filter]);

  // Add property handler
  const handleAddProperty = async (e) => {
    e.preventDefault();

    const createdListing = {
      id: Date.now().toString(),
      title: newProp.title,
      type: newProp.type,
      price: Number(newProp.price),
      location: newProp.location,
      description: newProp.description,
      imageUrl: newProp.imageUrl || "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=500",
      owner: {
        name: newProp.ownerName,
        phone: newProp.ownerPhone,
        email: newProp.ownerEmail
      },
      createdAt: new Date().toISOString()
    };

    try {
      await addDoc(collection(db, "properties"), createdListing);
    } catch (err) {
      console.warn("Could not save to remote Firebase DB, saved locally instead.");
    }

    setProperties((prev) => [createdListing, ...prev]);
    alert("Property listed successfully!");
    setShowAddModal(false);

    setNewProp({
      title: "", type: "rent", price: "", location: "",
      description: "", imageUrl: "", ownerName: "", ownerPhone: "", ownerEmail: ""
    });
  };

  return (
    <div style={{ maxWidth: "1100px", margin: "30px auto", padding: "0 20px" }}>
      
      {/* Chapter Banner Header */}
      <div style={{
        backgroundColor: "var(--theme-terracotta)",
        border: "3px solid var(--theme-border)",
        borderRadius: "16px",
        padding: "20px 30px",
        textAlign: "center",
        marginBottom: "25px",
        boxShadow: "5px 5px 0px rgba(0,0,0,0.4)"
      }}>
        <div style={{
          display: "inline-block",
          backgroundColor: "var(--bg-navy)",
          color: "#fff",
          padding: "4px 14px",
          borderRadius: "10px",
          fontSize: "12px",
          fontFamily: "Cinzel",
          marginBottom: "8px"
        }}>
          ✦ CHAPTER 2 ✦
        </div>
        <h1 style={{ color: "var(--theme-yellow)", margin: 0, fontSize: "1.8rem", letterSpacing: "1px" }}>
          VAGABOND FINDS A HOME IN THE ABYSS
        </h1>
        <p style={{ margin: "5px 0 0", color: "#f1f1f1", fontStyle: "italic" }}>
          Browse available stays or list your own property.
        </p>
      </div>

      {/* Main Vintage Box */}
      <div className="vintage-card">
        
        {/* Top Control Bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "25px", flexWrap: "wrap", gap: "15px" }}>
          
          {/* Filter Buttons */}
          <div style={{ display: "flex", gap: "10px" }}>
            {["all", "rent", "sale"].map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className="vintage-button"
                style={{
                  background: filter === t ? "var(--theme-terracotta)" : "var(--card-navy)",
                  fontSize: "12px",
                  padding: "8px 16px"
                }}
              >
                For {t}
              </button>
            ))}
          </div>

          {/* Add Listing Button */}
          <button
            onClick={() => setShowAddModal(true)}
            className="vintage-button"
            style={{ background: "#27ae60" }}
          >
            + LIST A PROPERTY
          </button>
        </div>

        {/* Properties Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "25px" }}>
          {properties.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: "var(--card-navy)",
                border: "3px solid var(--theme-border)",
                borderRadius: "12px",
                padding: "16px",
                color: "#fff",
                display: "flex",
                flexDirection: "column",
                justify: "space-between"
              }}
            >
              <div>
                <div style={{ position: "relative" }}>
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px", border: "1px solid #000" }}
                  />
                  <span style={{
                    position: "absolute", top: "10px", right: "10px",
                    backgroundColor: item.type === "rent" ? "#27ae60" : "var(--theme-terracotta)",
                    color: "#fff", padding: "4px 10px", borderRadius: "6px",
                    fontFamily: "Cinzel", fontSize: "11px", fontWeight: "bold"
                  }}>
                    FOR {item.type?.toUpperCase()}
                  </span>
                </div>

                <h3 style={{ color: "var(--theme-yellow)", margin: "12px 0 6px" }}>{item.title}</h3>
                <p style={{ margin: "0 0 8px", fontSize: "14px", color: "#ddd" }}>📍 {item.location}</p>
                <p style={{ fontSize: "13px", color: "#aaa", margin: "0 0 12px", lineHeight: "1.4" }}>{item.description}</p>
                <h3 style={{ color: "#fff", margin: "0 0 15px" }}>
                  ₹{item.price?.toLocaleString()} {item.type === "rent" ? "/ month" : ""}
                </h3>
              </div>

              {/* Owner Info & Actions */}
              <div style={{
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px dashed var(--theme-yellow)",
                borderRadius: "8px",
                padding: "12px",
                marginTop: "10px"
              }}>
                <p style={{ margin: "0 0 4px", fontSize: "12px", color: "var(--theme-yellow)", fontFamily: "Cinzel" }}>
                  ✦ OWNER DETAILS
                </p>
                <p style={{ margin: "2px 0", fontSize: "13px" }}>👤 <strong>{item.owner?.name || "N/A"}</strong></p>
                <p style={{ margin: "2px 0", fontSize: "13px" }}>📞 {item.owner?.phone || "N/A"}</p>
                <p style={{ margin: "2px 0 10px", fontSize: "13px" }}>✉️ {item.owner?.email || "N/A"}</p>

                {/* Actions */}
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  
                  {/* Call & WhatsApp */}
                  <div style={{ display: "flex", gap: "8px" }}>
                    <button
                      onClick={() =>
                        handleProtectedAction(() => {
                          if (!item.owner?.phone) return;
                          const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
                          if (isMobile) {
                            window.location.href = `tel:${item.owner.phone}`;
                          } else {
                            navigator.clipboard.writeText(item.owner.phone);
                            alert(`📞 Phone Number:\n${item.owner.phone}\n\n(Copied to your clipboard!)`);
                          }
                        })
                      }
                      className="vintage-button"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: "11px",
                        padding: "6px",
                        backgroundColor: "#27ae60",
                        color: "#fff"
                      }}
                    >
                      📞 CALL
                    </button>

                    <button
                      onClick={() =>
                        handleProtectedAction(() => {
                          if (item.owner?.phone) {
                            const text = encodeURIComponent(`Hi ${item.owner?.name || ''}, I'm interested in your property: "${item.title}" listed on VagaBond.`);
                            window.open(`https://wa.me/${item.owner.phone.replace(/[^0-9]/g, '')}?text=${text}`, '_blank');
                          }
                        })
                      }
                      className="vintage-button"
                      style={{
                        flex: 1,
                        textAlign: "center",
                        fontSize: "11px",
                        padding: "6px",
                        backgroundColor: "#25D366",
                        color: "#fff"
                      }}
                    >
                      💬 WHATSAPP
                    </button>
                  </div>

                  {/* BUY NOW / RENT NOW */}
                  <button
                    onClick={() =>
                      handleProtectedAction(() => {
                        const actionType = item.type === "sale" ? "Purchase Inquiry" : "Rental Reservation";
                        const message = `Hello ${item.owner?.name || "Owner"},\n\nI want to proceed with the ${actionType.toLowerCase()} for "${item.title}" priced at ₹${item.price?.toLocaleString() || ''}.\n\nPlease let me know the next steps!`;
                        
                        if (item.owner?.phone) {
                          window.open(`https://wa.me/${item.owner.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
                        } else {
                          alert(`Contact owner at ${item.owner?.email || 'email provided'}.`);
                        }
                      })
                    }
                    className="vintage-button"
                    style={{
                      width: "100%",
                      textAlign: "center",
                      fontSize: "12px",
                      fontWeight: "bold",
                      padding: "10px",
                      backgroundColor: item.type === "sale" ? "#e67e22" : "#2980b9",
                      color: "#fff",
                      border: "2px solid #000",
                      cursor: "pointer"
                    }}
                  >
                    {item.type === "sale" ? "🛒 BUY NOW" : "🔑 RENT NOW"}
                  </button>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Property Modal */}
      {showAddModal && (
        <div style={{
          position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
          backgroundColor: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <div className="vintage-card" style={{ maxWidth: "550px", width: "90%", maxHeight: "90vh", overflowY: "auto" }}>
            <h2 style={{ marginTop: 0, textAlign: "center" }}>✦ LIST A PROPERTY ✦</h2>
            
            <form onSubmit={handleAddProperty} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <label style={{ fontSize: "12px", fontWeight: "bold" }}>PROPERTY TITLE</label>
              <input
                required
                type="text"
                placeholder="e.g. Spacious 2BHK Furnished Apartment"
                value={newProp.title}
                onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />

              <div style={{ display: "flex", gap: "10px" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>LISTING TYPE</label>
                  <select
                    value={newProp.type}
                    onChange={(e) => setNewProp({ ...newProp, type: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                  >
                    <option value="rent">Rent</option>
                    <option value="sale">Sale</option>
                  </select>
                </div>

                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: "12px", fontWeight: "bold" }}>PRICE (₹)</label>
                  <input
                    required
                    type="number"
                    placeholder="e.g. 12000"
                    value={newProp.price}
                    onChange={(e) => setNewProp({ ...newProp, price: e.target.value })}
                    style={{ width: "100%", padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
                  />
                </div>
              </div>

              <label style={{ fontSize: "12px", fontWeight: "bold" }}>LOCATION</label>
              <input
                required
                type="text"
                placeholder="e.g. Vijay Nagar, Indore"
                value={newProp.location}
                onChange={(e) => setNewProp({ ...newProp, location: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />

              <label style={{ fontSize: "12px", fontWeight: "bold" }}>IMAGE URL</label>
              <input
                type="text"
                placeholder="https://..."
                value={newProp.imageUrl}
                onChange={(e) => setNewProp({ ...newProp, imageUrl: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />

              <label style={{ fontSize: "12px", fontWeight: "bold" }}>DESCRIPTION</label>
              <textarea
                rows="3"
                placeholder="Describe facilities, distance to campus, etc."
                value={newProp.description}
                onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />

              <hr style={{ border: "1px solid #000", margin: "10px 0" }} />
              <h4 style={{ margin: "0 0 5px" }}>✦ OWNER DETAILS</h4>

              <input
                required
                type="text"
                placeholder="Owner Full Name"
                value={newProp.ownerName}
                onChange={(e) => setNewProp({ ...newProp, ownerName: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />

              <input
                required
                type="text"
                placeholder="Contact Phone Number"
                value={newProp.ownerPhone}
                onChange={(e) => setNewProp({ ...newProp, ownerPhone: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />

              <input
                required
                type="email"
                placeholder="Owner Email Address"
                value={newProp.ownerEmail}
                onChange={(e) => setNewProp({ ...newProp, ownerEmail: e.target.value })}
                style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
              />

              <div style={{ display: "flex", gap: "10px", marginTop: "15px" }}>
                <button type="submit" className="vintage-button" style={{ flex: 1 }}>SAVE LISTING</button>
                <button type="button" onClick={() => setShowAddModal(false)} className="vintage-button" style={{ background: "#555" }}>CANCEL</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}