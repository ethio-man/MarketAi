import React, { useState, useEffect, useRef } from "react";
import { Bell, User, Sun, Moon, Camera, Loader2 } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const SettingsPage = () => {
  const { user, token, updateUser } = useAuth();
  const [profile, setProfile] = useState({
    name: "",
    businessType: "Retail",
    language: "English",
    theme: "Light",
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (user) {
      setProfile({
        name: user.name || "",
        businessType: user.businessType || "",
        language: "English",
        theme: "Light",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch("http://localhost:4000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: profile.name,
          businessType: profile.businessType,
        }),
      });
      const data = await res.json();
      if (data.success) {
        updateUser(data.data); // Update context
      } else {
        alert(data.error || "Failed to update profile");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving profile.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setIsUploading(true);
      const res = await fetch("http://localhost:4000/api/users/me/avatar", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        updateUser({ avatarUrl: data.data.avatarUrl });
      } else {
        alert(data.error || "Failed to upload avatar");
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred during upload.");
    } finally {
      setIsUploading(false);
    }
  };

  const displayAvatar = user?.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User");

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
          <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden border border-gray-200">
            <img
              src={displayAvatar}
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
            <div className="relative w-20 h-20 rounded-full bg-gray-200 overflow-hidden border-4 border-gray-100 shadow flex items-center justify-center">
              {isUploading ? (
                <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
              ) : (
                <img
                  src={displayAvatar}
                  alt={user?.name || "User"}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{user?.name || "Your Name"}</p>
              <p className="text-sm text-gray-500">{user?.email || "your.email@example.com"}</p>
            </div>
            
            <input 
               type="file" 
               accept="image/*" 
               ref={fileInputRef} 
               onChange={handleAvatarUpload} 
               className="hidden" 
            />
            <button 
                disabled={isUploading}
                onClick={() => fileInputRef.current?.click()}
                className="ml-auto flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium p-2 px-4 rounded-md border border-gray-300 transition-colors disabled:text-gray-400 disabled:border-gray-200"
            >
              <Camera size={16} />
              {isUploading ? "Uploading..." : "Upload picture"}
            </button>
          </div>

          <div className="flex space-x-6">
            <FormRow label="Full Name">
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </FormRow>
            <FormRow label="Email Address">
              <div className="relative flex items-center">
                <input
                  type="email"
                  name="email"
                  value={user?.email || ""}
                  readOnly
                  className="p-2 border border-gray-300 bg-gray-50 text-gray-500 rounded-md w-full cursor-not-allowed"
                  title="Email cannot be changed directly"
                />
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
            <FormRow label="Business Type / Industry">
              <select
                name="businessType"
                value={profile.businessType}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900 appearance-none bg-white pr-8"
              >
                <option value="">Select industry</option>
                <option value="Retail">Retail</option>
                <option value="Service">Service</option>
                <option value="Manufacturing">Manufacturing</option>
                <option value="Software">Software</option>
                <option value="Food & Beverage">Food & Beverage</option>
                <option value="Other">Other</option>
              </select>
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
            disabled={isSaving}
            className="flex items-center gap-2 bg-blue-600 text-white hover:bg-blue-700 p-2 px-6 rounded-md font-semibold transition-colors disabled:bg-blue-400"
          >
            {isSaving && <Loader2 className="w-4 h-4 animate-spin" />}
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </footer>
    </div>
  );
};

export default SettingsPage;
