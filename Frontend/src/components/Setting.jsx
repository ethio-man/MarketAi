import React, { useState } from "react";
import { Bell, User, Sun, Moon } from "lucide-react";

const SettingsPage = () => {
  const [profile, setProfile] = useState({
    fullName: "Abebe Bikila",
    email: "abebe.bikila@email.com",
    businessName: "Bikila's Digital Marketing",
    businessType: "E-commerce",
    language: "English",
    theme: "Light",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving changes:", profile);
    // Add API call logic here
  };

  const dummyAvatar =
    "https://tse4.mm.bing.net/th/id/OIP.StC6nCSVINVtrPQOEPUF5QAAAA?cb=ucfimg2&ucfimg=1&w=300&h=359&rs=1&pid=ImgDetMain&o=7&rm=3"; // Placeholder for the avatar

  // Utility component for form rows
  const FormRow = ({ label, children }) => (
    <div className="flex flex-col space-y-1 w-full">
      <label className="text-sm font-medium text-gray-600">{label}</label>
      {children}
    </div>
  );

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header Bar */}
      <header className="flex justify-between items-center bg-white border-b border-gray-200 px-8 py-4">
        <h2 className="text-2xl font-semibold text-gray-800">Settings</h2>
        <div className="flex items-center space-x-4">
          <Bell
            size={24}
            className="text-gray-600 cursor-pointer hover:text-blue-600"
          />
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
            <img
              src={dummyAvatar}
              alt="User"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="p-8 space-y-8 max-w-4xl mx-auto">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">
            Profile
          </h3>

          <div className="flex items-center space-x-6 mb-8">
            <div className="w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-4 border-gray-100 shadow">
              <img
                src="https://tse4.mm.bing.net/th/id/OIP.StC6nCSVINVtrPQOEPUF5QAAAA?cb=ucfimg2&ucfimg=1&w=300&h=359&rs=1&pid=ImgDetMain&o=7&rm=3"
                alt="Abebe Bikila"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">Abebe Bikila</p>
              <p className="text-sm text-gray-500">abebe.bikila@email.com</p>
            </div>
            <button className="ml-auto text-blue-600 hover:text-blue-700 text-sm font-medium p-2 px-4 rounded-md border border-gray-300 transition-colors">
              Upload new picture
            </button>
          </div>

          <div className="flex space-x-6">
            <FormRow label="Full Name">
              <input
                type="text"
                name="fullName"
                value={profile.fullName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </FormRow>
            <FormRow label="Email Address">
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  readOnly
                  className="p-2 border border-gray-300 bg-gray-50 rounded-md w-full"
                />
                <button className="absolute right-0 mr-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                  Change Password
                </button>
              </div>
            </FormRow>
          </div>
        </div>

        {/* Business Details Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">
            Business Details
          </h3>
          <div className="flex space-x-6">
            <FormRow label="Business Name">
              <input
                type="text"
                name="businessName"
                value={profile.businessName}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </FormRow>
            <FormRow label="Business Type / Industry">
              <input
                type="text"
                name="businessType"
                value={profile.businessType}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </FormRow>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold mb-6 border-b pb-3 text-gray-800">
            Preferences
          </h3>

          <div className="flex flex-col space-y-6">
            <FormRow label="Language">
              <select
                name="language"
                value={profile.language}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md w-56 appearance-none bg-white pr-8 focus:ring-blue-500 focus:border-blue-500"
              >
                <option>English</option>
                <option>Afan Oromo</option>
                <option>Amharic</option>
              </select>
            </FormRow>

            <FormRow label="Theme">
              <div className="flex space-x-4">
                {/* Light Theme */}
                <button
                  onClick={() => setProfile({ ...profile, theme: "Light" })}
                  className={`flex flex-col items-center justify-center p-4 w-32 h-24 rounded-lg border-2 transition-colors ${
                    profile.theme === "Light"
                      ? "border-blue-600 ring-4 ring-blue-100"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <Sun size={32} className="text-gray-800 mb-1" />
                  <span className="text-sm font-medium">Light</span>
                </button>

                {/* Dark Theme */}
                <button
                  onClick={() => setProfile({ ...profile, theme: "Dark" })}
                  className={`flex flex-col items-center justify-center p-4 w-32 h-24 rounded-lg border-2 transition-colors ${
                    profile.theme === "Dark"
                      ? "border-blue-600 ring-4 ring-blue-100"
                      : "border-gray-300 hover:border-blue-300"
                  }`}
                >
                  <Moon size={32} className="text-gray-800 mb-1" />
                  <span className="text-sm font-medium">Dark</span>
                </button>
              </div>
            </FormRow>
          </div>
        </div>
      </div>

      {/* Footer Bar for Actions */}
      <footer className="sticky bottom-0 bg-white border-t border-gray-200 flex justify-end p-4 shadow-lg w-full">
        <div className="space-x-3 mr-16">
          {" "}
          {/* Adjust margin to align with main content */}
          <button className="text-gray-600 hover:text-gray-800 p-2 px-4 rounded-md border border-gray-300 transition-colors">
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white hover:bg-blue-700 p-2 px-6 rounded-md font-semibold transition-colors"
          >
            Save Changes
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SettingsPage;
