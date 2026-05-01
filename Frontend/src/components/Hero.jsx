import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-eesel-light py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Changed layout closely resembling the minimal eesel approach - left aligned text, bottom large image if necessary, but here we keep a side-by-side adapting to the original UI layout. */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="text-center lg:text-left mb-16 lg:mb-0">
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] font-extrabold text-eesel-dark leading-[1.1] tracking-tight mb-6">
              The Intelligent Marketing Engine.
            </h1>

            {/* Subtext/Description */}
            <p className="mt-4 max-w-lg mx-auto lg:mx-0 text-xl font-medium text-gray-600/90 mb-10 leading-relaxed">
              Supercharge your growth with an intelligent AI Assistant, get
              real-time business analysis, and launch dynamic social media
              campaigns instantly.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
              {/* Primary Pill Button */}
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-eesel-dark hover:bg-gray-800 transition duration-150 ease-in-out"
              >
                Get started free
              </Link>

              {/* Secondary Ghost/Link Button */}
              <a
                href="#"
                className="inline-flex items-center justify-center px-4 py-3 text-base font-medium text-eesel-dark hover:bg-eesel-dark/5 rounded-full transition duration-150 ease-in-out"
              >
                See how it works{" "}
                <span aria-hidden="true" className="ml-2">
                  →
                </span>
              </a>
            </div>
          </div>

          {/* Right Column: Image/Visual (using original placeholder but styled with minimal border instead of heavy dropshadow) */}
          <div className="relative">
            <div
              className="bg-center bg-no-repeat bg-cover rounded-2xl w-full h-[300px] sm:h-[400px] lg:h-[480px] shadow-sm border border-eesel-accent/50"
              style={{
                backgroundImage: 'url("/hero.jpg")',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
