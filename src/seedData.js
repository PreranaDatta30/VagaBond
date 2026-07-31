// src/seedData.js
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const seedProperties = async () => {
  const propertiesList = [
    {
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
      },
      createdAt: new Date().toISOString()
    },
    {
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
      },
      createdAt: new Date().toISOString()
    },
    {
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
      },
      createdAt: new Date().toISOString()
    }
  ];

  try {
    for (const property of propertiesList) {
      await addDoc(collection(db, "properties"), property);
    }
    alert("Sample properties added to Firebase!");
    window.location.reload(); // Refresh to display new data
  } catch (err) {
    console.error("Error seeding properties: ", err);
    alert("Failed to seed database. Make sure firebase.js has your actual API keys!");
  }
};