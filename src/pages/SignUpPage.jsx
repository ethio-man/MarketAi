import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react"; // Assuming you have lucide-react or similar icons
import { Link } from "react-router-dom";
// If you don't have lucide-react, you can install it: npm install lucide-react

const SingUp = () => {
  const [showPassword, setShowPassword] = useState(false);

  // Example handler, replace with actual form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up clicked!");
    // Handle form submission
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🚀 Header Section */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 shadow-sm">
        <div className="text-xl font-bold text-gray-800">MarketMeda AI</div>
        <div className="text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="text-blue-600 font-semibold hover:text-blue-700 transition duration-150"
          >
            Log In
          </a>
        </div>
      </header>

      {/* 📝 Main Content/Form Section */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create your Account
            </h2>
            <p className="mt-1 text-gray-500">
              Your AI-powered marketing co-pilot.
            </p>
          </div>

          {/* Google Sign-in Button */}
          <button
            type="button"
            className="w-full flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition duration-150"
          >
            <img
              className="mr-2"
              src="https://upload.wikimedia.org/wikipedia/commons/4/4a/Logo_2013_Google.png"
              alt="Google logo"
              style={{ height: "20px" }}
            />
            Continue with Google
          </button>

          {/* OR Divider */}
          <div className="relative my-6">
            <div
              className="absolute inset-0 flex items-center"
              aria-hidden="true"
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Sign Up Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Full Name */}
            <div>
              <label
                htmlFor="full-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Full Name
              </label>
              <input
                id="full-name"
                name="full-name"
                type="text"
                placeholder="Enter your full name"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900"
              />
            </div>

            {/* Business Type */}
            <div>
              <label
                htmlFor="business-type"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Business Type
              </label>
              <select
                id="business-type"
                name="business-type"
                required
                defaultValue="Retail"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none bg-white pr-8"
              >
                <option value="">Select business type</option>
                <option value="Retail">Retail</option>
                <option value="Service">Service</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Phone Number */}
            <div>
              <label
                htmlFor="phone-number"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number
              </label>
              <div className="flex rounded-lg shadow-sm border border-gray-300 overflow-hidden">
                <span className="inline-flex items-center px-3 bg-gray-50 text-gray-500 text-sm">
                  +251
                </span>
                <input
                  id="phone-number"
                  name="phone-number"
                  type="tel"
                  placeholder="91 234 5678"
                  required
                  className="flex-1 block w-full px-3 py-2 focus:ring-blue-500 focus:border-blue-500 border-none placeholder-gray-400 text-gray-900"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900 pr-10" // pr-10 for icon space
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition duration-150"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <Link
              to="/assistant"
              className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-6"
            >
              Sign Up
            </Link>
          </form>

          {/* Terms and Privacy */}
          <p className="mt-6 text-center text-xs text-gray-500">
            By creating an account, you agree to our{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </main>
    </div>
  );
};

export default SingUp;
