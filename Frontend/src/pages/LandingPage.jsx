import React from "react";
import NavBar from "../components/NavBar.jsx";
import Hero from "../components/Hero.jsx";
import Features from "../components/Features.jsx";
import UseCases from "../components/UseCases.jsx";
import Footer from "../components/Footer.jsx";
import TargetAudienceSection from "../components/WorkArea.jsx";
import AnalyticsPreview from "../components/Market.jsx";
import SingUp from "./SignUpPage.jsx";
export default function Landing() {
  return (
    <div>
      <NavBar />
      <Hero />
      <Features />
      <UseCases />
      <TargetAudienceSection />
      <AnalyticsPreview imageUrl="/marketmeda-action.png" />
      <Footer />
    </div>
  );
}
