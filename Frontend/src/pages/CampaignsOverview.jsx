import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default function CampaignsOverview() {
  return (
    <div className="bg-eesel-light min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-grow">
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-eesel-dark tracking-tight mb-6">
                Dynamic Multilingual Campaigns
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600/90 leading-relaxed">
                Generate localized social media captions in seconds and publish directly to Instagram, Facebook, and TikTok from one simple dashboard.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-eesel-dark hover:bg-gray-800 transition duration-150 ease-in-out"
                >
                  Start Your First Campaign
                </Link>
              </div>
            </div>

            <div className="mt-16 bg-white border border-eesel-accent/50 rounded-[2rem] shadow-sm p-4 sm:p-6 max-w-5xl mx-auto">
              <div className="relative w-full overflow-hidden rounded-2xl">
                <img
                  src="/campaigns-demo.png"
                  alt="Social Media Campaigns Dashboard Demo"
                  className="w-full object-cover"
                />
              </div>
            </div>

            {/* Feature highlights for Campaigns */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
              <div>
                <h3 className="text-xl font-bold text-eesel-dark tracking-tight mb-2">Multilingual Generation</h3>
                <p className="text-gray-600/90">Instantly generate high-converting captions in Amharic, Afaan Oromo, Tigrinya, and English.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-eesel-dark tracking-tight mb-2">Omnichannel Posting</h3>
                <p className="text-gray-600/90">Click once to distribute your perfectly formatted campaign directly to Instagram, Facebook, and TikTok.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-eesel-dark tracking-tight mb-2">AI Visual Integration</h3>
                <p className="text-gray-600/90">Enhance your posts with beautiful, brand-aligned images generated instantly by our AI models.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
