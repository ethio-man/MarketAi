import React from "react";
import { Link } from "react-router-dom";
const HeroSection = () => {
  return (
    // Outer container for padding and max width
    <section className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Grid Layout: 2 columns for Text/CTA and Image */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 items-center">
          {/* 1. Left Column: Text and CTAs */}
          <div className="text-center lg:text-left">
            {/* Sub-heading/Context */}
            {/* The image shows a small text "HeroSection_ijxz" - we'll include a placeholder for similar context */}
            <p className="text-sm font-medium text-gray-500 mb-2">
              MarketMeda AI Solution
            </p>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-blue-950 leading-tight mb-6">
              AI Marketer for <br className="hidden sm:inline" />
              Ethiopian Businesses
            </h1>

            {/* Subtext/Description */}
            <p className="mt-3 max-w-md mx-auto text-lg text-gray-600/70 sm:text-xl lg:mx-0 mb-8">
              Create ads, generate captions, analyze customers, and grow your
              business using AI.
            </p>

            {/* CTA Buttons */}
            <div className="mt-6 flex justify-center lg:justify-start space-x-4">
              {/* Primary Button: Get Started (Blue) */}
              <Link
                to="/login"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
              >
                Get Started
              </Link>

              {/* Secondary Button: Try Demo (Light Gray) */}
              <a
                href="#"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition duration-150 ease-in-out"
              >
                Try Demo
              </a>
            </div>

            {/* The small text block below the buttons for context/branding */}
            <p className="mt-10 text-xs text-gray-400 max-w-sm mx-auto lg:mx-0">
              AI-powered marketing suite. Focus on growth, powered by
              intelligence.
            </p>
          </div>

          {/* 2. Right Column: Image/Visual */}

          {/* Image container replicating the rounded, textured look */}

          {/* This is a placeholder for the actual textured mask image */}
          <div
            className="bg-center bg-no-repeat bg-cover rounded-xl w-full h-80 lg:w-[396px] lg:h-[396px]"
            style={{
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAb1vabO1vTtgynknGxo1-volYurbVf6Wu8vLj_dNAmxvotFhtR5C4b1Pteb-jbfjL5IWqCZqpAFGjH29jkzlzsUUPyvYjNxJxFRJFTRUkazpg0fC4DIP-VLMeqqHZaXfG5_31VqKtmJ1cMn7r9mug1cAC4bZnwrwTlnaIyWNcjpGyUwbsjeF-8880QavTyPMvj_Lp3gj6fFSXXVYn_CWYPdGCaf-dwvj0TBhabNC6xsEhstJBvbTWf-H_OhcyJY87lYNHR_h0tt1Th")',
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
