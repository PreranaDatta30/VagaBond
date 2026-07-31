// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Accommodation from "./pages/Accommodation";
import PropertyDetails from "./pages/PropertyDetails";
import Wishlist from "./pages/Wishlist";
import SignUp from "./pages/SignUp";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Directly loads the Accommodation page on landing */}
        <Route path="/" element={<Accommodation />} />
        <Route path="/accommodation" element={<Accommodation />} />
        <Route path="/property/:id" element={<PropertyDetails />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}