import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <header className="bg-white shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <svg
              className="h-6 w-6 text-blue-500 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
              />{" "}
            </svg>

            <span className="text-xl font-semibold text-gray-900">
              MarketMeda <span className="font-normal">AI</span>
            </span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-8">
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-medium transition duration-150 ease-in-out"
              >
                Features
              </a>
              <a
                href="#"
                className="text-gray-600 hover:text-gray-900 font-medium transition duration-150 ease-in-out"
              >
                Use Cases
              </a>
            </div>
            <Link
              to="/login"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
