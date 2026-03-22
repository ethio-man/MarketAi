import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home,
  Bot,
  BarChart2,
  ListChecks,
  Settings,
  Unlock,
  HelpCircle,
  LogOut,
  Coffee,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
  const location = useLocation();
  const { user, logout } = useAuth();
  
  const displayAvatar = user?.avatarUrl || "https://ui-avatars.com/api/?name=" + encodeURIComponent(user?.name || "User");

  const navItems = [
    { icon: Home, label: "Dashboard", path: "/" },
    { icon: Bot, label: "AI Assistant", path: "/assistant" },
    { icon: BarChart2, label: "Analytics", path: "/analytics" },
    { icon: ListChecks, label: "Campaigns", path: "/campaign" },
    { icon: Settings, label: "Settings", path: "/setting" },
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-100 p-4 flex flex-col justify-between h-screen">
      <div>
        <h1 className="text-xl font-bold mb-8 flex items-center text-gray-800">
          <Coffee className="mr-2 text-indigo-600" size={24} />
          Caravans
        </h1>

        {/* Navigation */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive =
              item.path === "/"
                ? location.pathname === "/"
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                  isActive
                    ? "bg-blue-50 text-indigo-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <item.icon className="mr-3" size={20} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="space-y-6">
        {/* Unlock Premium Features Card */}
        <div className="bg-blue-50 p-4 rounded-xl shadow-sm border border-blue-100">
          <div className="flex items-center mb-2 text-indigo-700">
            <Unlock size={18} className="mr-2" />
            <span className="font-semibold text-sm">
              Unlock Premium Features
            </span>
          </div>
          <p className="text-xs text-gray-600 mb-3">
            Get unlimited AI generations, advanced analytics, and more.
          </p>
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg transition duration-150 shadow-md">
            Upgrade Plan
          </button>
        </div>

        {/* Help & Logout */}
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer p-1 transition duration-150">
            <HelpCircle size={20} className="mr-3" />
            <span>Help</span>
          </div>
          <button 
             onClick={logout} 
             className="w-full flex items-center text-gray-600 hover:text-red-500 cursor-pointer p-1 transition duration-150"
          >
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </button>
        </div>

        {/* User Profile Snippet */}
        {user && (
          <div className="flex items-center pt-4 border-t border-gray-100 mt-4">
            <img src={displayAvatar} alt={user.name} className="w-10 h-10 rounded-full border border-gray-200 object-cover" />
            <div className="ml-3 overflow-hidden text-ellipsis">
              <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.businessType || "User"}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
