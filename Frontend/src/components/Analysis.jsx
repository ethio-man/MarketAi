import React from "react";
import {
  Settings,
  LayoutDashboard,
  BarChart2,
  ListChecks,
  ChevronDown,
  User,
} from "lucide-react";

const Card = ({ title, children }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
    <h3 className="flex items-center text-xl font-semibold text-gray-800 mb-4">
      {title}
    </h3>
    {children}
  </div>
);

const ProgressBar = ({ label, value, colorClass }) => (
  <div className="mb-4">
    <p className="text-gray-600 mb-1">{label}</p>
    <div className="flex items-center">
      <div className="flex-grow bg-gray-200 rounded-full h-2.5">
        <div
          className={`h-2.5 rounded-full ${colorClass}`}
          style={{ width: `${value}%` }}
        ></div>
      </div>
      <span className="ml-3 text-sm font-medium text-gray-800">{value}%</span>
    </div>
  </div>
);

// --- Main Dashboard Component ---

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Main Content */}
      <div className="flex-1 p-8">
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b border-gray-200 mb-8">
          <div className="text-left">
            <h2 className="text-3xl font-bold text-gray-800">
              Insights & Analytics
            </h2>
            <p className="text-gray-500 mt-1">
              AI-powered digital marketing assistant for Ethiopian
              entrepreneurs.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Timeframe Dropdowns */}
            <div className="flex items-center text-gray-600 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white cursor-pointer hover:bg-gray-100">
              Last 30 Days <ChevronDown className="w-4 h-4 ml-2" />
            </div>
            <div className="flex items-center text-gray-600 border border-gray-300 rounded-lg px-3 py-2 text-sm bg-white cursor-pointer hover:bg-gray-100">
              This Quarter <ChevronDown className="w-4 h-4 ml-2" />
            </div>
            {/* User Profile */}
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition duration-150 flex items-center">
              Generate New Report
            </button>
            <div className="bg-gray-200 rounded-full w-10 h-10 flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Trending Product Categories Card */}
          <Card
            title={
              <>
                <BarChart2 className="w-5 h-5 mr-2 text-blue-500" />
                Top Trending Product Categories
              </>
            }
          >
            <div className="space-y-4">
              <ProgressBar
                label="Handmade Crafts"
                value={85}
                colorClass="bg-blue-500"
              />
              <ProgressBar
                label="Coffee Beans"
                value={78}
                colorClass="bg-blue-500"
              />
              <ProgressBar label="Spices" value={65} colorClass="bg-blue-500" />
              <ProgressBar
                label="Textiles"
                value={70}
                colorClass="bg-blue-500"
              />
              <ProgressBar
                label="Leather Goods"
                value={45}
                colorClass="bg-blue-500"
              />
            </div>
          </Card>

          {/* Competitor Snapshot Card */}
          <Card
            title={
              <>
                <User className="w-5 h-5 mr-2 text-yellow-500" />
                Competitor Snapshot
              </>
            }
          >
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                Competitor A is increasing spend on social media ads by **20%**.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                Price point analysis suggests a **market gap for premium leather
                goods**.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                New entrant "**Ethiopian Crafts Co.**" gaining traction on
                Instagram.
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2 mt-1">✓</span>
                Top competitor's website traffic is **down 5%** this quarter.
              </li>
            </ul>
          </Card>

          {/* First Looker Studio Report (Previously Live Data Report) */}
          <Card
            title={
              <>
                <ListChecks className="w-5 h-5 mr-2 text-green-500" />
                Market Trend Analysis
              </>
            }
          >
            {/* Embedded Looker Studio iframe 1 */}
            <iframe
              width="100%"
              height="450"
              src="https://lookerstudio.google.com/embed/reporting/9578c1b0-64ff-4a5e-9d24-a940c8d6d36e/page/6t2hF"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            ></iframe>
          </Card>

          {/* Second Looker Studio Report (Replaces Predicted Sales Performance Card) */}
          <Card
            title={
              <>
                <BarChart2 className="w-5 h-5 mr-2 text-orange-500" />
                Predicted Sales & Revenue
              </>
            }
          >
            {/* Embedded Looker Studio iframe 2 */}
            <iframe
              width="100%"
              height="450"
              src="https://lookerstudio.google.com/embed/reporting/5eca9475-2198-4dc5-ad26-db72ffd32bdb/page/Xv2hF"
              frameBorder="0"
              style={{ border: 0 }}
              allowFullScreen
              sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
            ></iframe>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
