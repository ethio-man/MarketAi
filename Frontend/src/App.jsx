import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import Assistant from "./pages/Assistant.jsx";
import Analytics from "./pages/Analytics.jsx";
import Setting from "./pages/Setting.jsx";
import Campaign from "./pages/Campaign.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/assistant" element={<ProtectedRoute><Assistant /></ProtectedRoute>} />
        <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
        <Route path="/setting" element={<ProtectedRoute><Setting /></ProtectedRoute>} />
        <Route path="/campaign" element={<ProtectedRoute><Campaign /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}
