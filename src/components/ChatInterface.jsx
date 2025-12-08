import React from "react";
import { Send, User, ChevronDown } from "lucide-react";

// Mock Component for user avatar
const Avatar = ({ name, imageUrl, className = "w-10 h-10" }) => (
  <div
    className={`rounded-full bg-gray-200 flex items-center justify-center ${className}`}
  >
    {imageUrl ? (
      <img src={imageUrl} alt={name} className="rounded-full object-cover" />
    ) : (
      <User size={24} className="text-gray-500" />
    )}
  </div>
);

const ChatInterface = () => {
  // Mock data for the user (Abebe K.)
  const user = {
    name: "Abebe K.",
    email: "abebe@email.com",
    avatar: "https://i.imgur.com/G7y25qB.png", // Replace with a placeholder or actual image URL
  };

  // Mock data for the AI (MarketMeda AI)
  const ai = {
    name: "MarketMeda AI",
    avatar: "https://i.imgur.com/7gK5Y0o.png", // Replace with a placeholder or actual image URL
  };

  const aiMessage = {
    title: "Option 1 (Focus on Heritage):",
    content: (
      <>
        Awaken your senses with the authentic taste of Ethiopia. Our
        **single-origin** coffee is grown in the ancient highlands and roasted
        to perfection. Experience a tradition in every cup. ☕
      </>
    ),
    hashtags: [
      "#EthiopianCoffee",
      "#SingleOrigin",
      "#CoffeeLovers",
      "#MadeInEthiopia",
    ],
    time: "10:32 AM",
  };

  const renderHashtags = (tags) => (
    <div className="flex flex-wrap gap-2 mt-3">
      {tags.map((tag) => (
        <span
          key={tag}
          className="text-xs font-medium text-indigo-700 bg-indigo-100 px-3 py-1 rounded-full shadow-sm"
        >
          {tag}
        </span>
      ))}
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-gray-50 overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-800">AI Assistant</h2>
          <p className="text-sm text-gray-500">
            Your AI-powered digital marketing co-pilot.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-500 hover:text-gray-700 transition duration-150">
            <span role="img" aria-label="notification">
              🔔
            </span>
          </button>
          <div className="flex items-center space-x-2">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-gray-800">{user.name}</p>
              <p className="text-xs text-gray-500">{user.email}</p>
            </div>
            <Avatar
              name={user.name}
              imageUrl={user.avatar}
              className="w-10 h-10"
            />
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {/* AI Initial Message */}
        <div className="flex items-start">
          <Avatar
            name={ai.name}
            imageUrl={ai.avatar}
            className="w-8 h-8 mr-3"
          />
          <div>
            <div className="text-xs text-gray-500 mb-1">
              **{ai.name}** <span className="text-[10px]">10:30 AM</span>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 max-w-xl">
              <p className="text-gray-800">
                Hello! I'm MarketMeda AI. How can I help you grow your business
                today? You can ask me to generate a caption, analyze a product,
                or optimize pricing.
              </p>
            </div>
          </div>
        </div>

        {/* User Message */}
        <div className="flex justify-end">
          <div className="max-w-xl">
            <div className="text-xs text-right text-gray-500 mb-1">
              **{user.name}** <span className="text-[10px]">10:31 AM</span>
            </div>
            <div className="bg-blue-600 text-white p-3 rounded-xl rounded-br-sm shadow-lg">
              Generate a social media caption for a new brand of Ethiopian
              coffee.
            </div>
          </div>
          <Avatar
            name={user.name}
            imageUrl={user.avatar}
            className="w-8 h-8 ml-3"
          />
        </div>

        {/* AI Response (Caption Options) */}
        <div className="flex items-start">
          <Avatar
            name={ai.name}
            imageUrl={ai.avatar}
            className="w-8 h-8 mr-3"
          />
          <div>
            <div className="text-xs text-gray-500 mb-1">
              **{ai.name}** <span className="text-[10px]">10:32 AM</span>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 max-w-2xl">
              <p className="text-gray-800 mb-4">
                Certainly! Here are a few options for your new brand of
                Ethiopian coffee. I've also included some relevant hashtags and
                a visual concept.
              </p>

              {/* Caption Option 1 */}
              <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
                <h4 className="font-bold text-sm text-gray-800 mb-2">
                  {aiMessage.title}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {aiMessage.content}
                </p>
                {renderHashtags(aiMessage.hashtags)}

                {/* Placeholder for visual concept */}
                <div className="mt-4 h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                  [Visual concept placeholder - e.g., A hand pouring coffee
                  beans]
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Input / Footer Section */}
      <div className="p-4 bg-white border-t border-gray-200">
        {/* Quick Actions Buttons */}
        <div className="flex space-x-3 mb-4">
          <button className="text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition duration-150">
            Generate caption
          </button>
          <button className="text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition duration-150">
            Analyze product
          </button>
          <button className="text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition duration-150">
            Optimize price
          </button>
        </div>

        {/* Input Bar */}
        <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-sm">
          <input
            type="text"
            placeholder="Ask MarketMeda AI..."
            className="flex-1 p-3 pl-5 bg-transparent focus:outline-none text-gray-700"
          />
          <button className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full m-1 transition duration-150">
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
