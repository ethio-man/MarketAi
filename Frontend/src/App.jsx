import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage.jsx";
import SignUp from "./pages/SignUpPage.jsx";
import Assistant from "./pages/Assistant.jsx";
import Analytics from "./pages/Analytics.jsx";
import Setting from "./pages/Setting.jsx";
import Campaign from "./pages/Campaign.jsx";
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<SignUp />} />
        <Route path="/assistant" element={<Assistant />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/campaign" element={<Campaign />} />
      </Routes>
    </Router>
  );
}
