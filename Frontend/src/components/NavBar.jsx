import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="bg-eesel-light sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            {/* Kept a minimal logo look */}
            <span className="text-2xl font-bold text-eesel-dark tracking-tight">
              MarketMeda <span className="font-medium text-gray-500">AI</span>
            </span>
          </div>

          {/* Center Links (Desktop only) */}
          <div className="hidden md:flex space-x-10">
            <Link
              to="/"
              className="text-eesel-dark hover:text-gray-500 font-medium transition duration-150 ease-in-out text-sm"
            >
              Home
            </Link>
            <Link
              to="/ai-assistant"
              className="text-eesel-dark hover:text-gray-500 font-medium transition duration-150 ease-in-out text-sm"
            >
              Assistant
            </Link>
            <Link
              to="/analytics-overview"
              className="text-eesel-dark hover:text-gray-500 font-medium transition duration-150 ease-in-out text-sm"
            >
              Analytics
            </Link>
            <Link
              to="/campaigns-overview"
              className="text-eesel-dark hover:text-gray-500 font-medium transition duration-150 ease-in-out text-sm"
            >
              Campaigns
            </Link>
          </div>

          {/* Right side CTAs */}
          <div className="flex items-center space-x-4">
            <Link
              to="/login"
              className="hidden sm:inline-flex text-eesel-dark hover:text-gray-500 font-medium transition text-sm"
            >
              Log in
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center px-5 py-2 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-eesel-dark hover:bg-gray-800 transition duration-150 ease-in-out"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
