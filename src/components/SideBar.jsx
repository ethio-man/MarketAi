import React from "react";
import { Link } from "react-router-dom";
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

const Sidebar = () => {
  const navItems = [
    { icon: Home, label: "Dashboard", path: "/", active: false },
    { icon: Bot, label: "AI Assistant", path: "/assistant", active: true },
    { icon: BarChart2, label: "Analytics", path: "/analytics", active: false },
    { icon: ListChecks, label: "Campaigns", path: "/campaign", active: false },
    { icon: Settings, label: "Settings", path: "/setting", active: false },
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
          {navItems.map((item) => (
            <Link
              to={`${item.path}`}
              className={`flex items-center p-3 rounded-lg transition-colors duration-200 ${
                item.active
                  ? "bg-blue-50 text-indigo-700 font-semibold"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <item.icon className="mr-3" size={20} />
              {item.label}
            </Link>
          ))}
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
          <div className="flex items-center text-gray-600 hover:text-indigo-600 cursor-pointer p-1 transition duration-150">
            <LogOut size={20} className="mr-3" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
