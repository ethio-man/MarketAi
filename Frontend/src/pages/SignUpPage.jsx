import React, { useState } from "react";
import { Eye, EyeOff, Loader2, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { useAuth } from "../context/AuthContext";

const SingUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleStandardAuth = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target["full-name"]?.value;
    const businessType = e.target["business-type"]?.value;

    const endpoint = isLoginMode ? "/api/users/login" : "/api/users/register";
    const payload = isLoginMode 
        ? { email, password } 
        : { email, password, name, businessType, role: "user" }; 

    try {
        const res = await fetch(`http://localhost:4000${endpoint}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        const data = await res.json();
        
        if (!data.success) {
            throw new Error(data.error || "Authentication failed");
        }
        
        login(data.user, data.token);
        navigate("/assistant");
    } catch (err) {
        setError(err.message);
    } finally {
        setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
        setError(null);
        setLoading(true);
        const res = await fetch("http://localhost:4000/api/users/google", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ credential: credentialResponse.credential }),
        });
        const data = await res.json();
        if (!data.success) throw new Error(data.error || "Google auth failed");
        
        login(data.user, data.token);
        navigate("/assistant");
    } catch (err) {
        setError(err.message);
        setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* 🚀 Header Section */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center space-x-4">
          <Link to="/" className="text-gray-500 hover:text-gray-800 transition duration-150" aria-label="Go back">
            <ArrowLeft size={24} />
          </Link>
          <div className="text-xl font-bold text-gray-800">MarketMeda AI</div>
        </div>
        <div className="text-sm text-gray-600">
          {isLoginMode ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => { setIsLoginMode(!isLoginMode); setError(null); }}
            className="text-blue-600 font-semibold hover:text-blue-700 transition duration-150"
          >
            {isLoginMode ? "Sign Up" : "Log In"}
          </button>
        </div>
      </header>

      {/* 📝 Main Content/Form Section */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-lg p-8 bg-white rounded-xl shadow-2xl">
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900">
              {isLoginMode ? "Welcome Back" : "Create your Account"}
            </h2>
            <p className="mt-1 text-gray-500">
              Your AI-powered marketing co-pilot.
            </p>
          </div>

          {error && (
            <div className="mb-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm text-center border border-red-200">
               {error}
            </div>
          )}

          {/* Google Sign-in Button */}
          <div className="flex justify-center w-full mb-6">
            <GoogleLogin
               onSuccess={handleGoogleSuccess}
               onError={() => setError("Google auth failed. Please try again.")}
               useOneTap
               shape="rectangular"
               size="large"
               text={isLoginMode ? "signin_with" : "signup_with"}
               width="100%"
            />
          </div>

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
          <form onSubmit={handleStandardAuth} className="space-y-5">
            {!isLoginMode && (
              <>
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
                    required={!isLoginMode}
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
                    required={!isLoginMode}
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
              </>
            )}

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
                  autoComplete={isLoginMode ? "current-password" : "new-password"}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-900 pr-10"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 mt-6 disabled:bg-blue-400"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (isLoginMode ? "Log In" : "Sign Up")}
            </button>
          </form>

          {/* Terms and Privacy */}
          <p className="mt-6 text-center text-xs text-gray-500">
            By continuing, you agree to our{" "}
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
