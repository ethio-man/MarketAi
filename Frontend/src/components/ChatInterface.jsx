import React, { useMemo, useRef, useState } from "react";
import { Send, User } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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

const formatTime = (date) =>
  new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(date);

const ChatInterface = () => {
  const bottomRef = useRef(null);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const user = {
    name: "Abebe K.",
    email: "abebe@email.com",
    avatar: "https://i.imgur.com/G7y25qB.png",
  };

  const ai = {
    name: "MarketMeda AI",
    avatar:
      "https://i.pinimg.com/736x/15/34/92/153492d5cc36e23919920d27ab4b08cc.jpg",
  };

  const [messages, setMessages] = useState(() => [
    {
      role: "assistant",
      text: "Hello! I'm MarketMeda AI. How can I help you grow your business today? You can ask me to generate a caption, analyze a product, or optimize pricing.",
      time: formatTime(new Date()),
    },
  ]);

  const quickPrompts = useMemo(
    () => [
      "Generate a social media caption for Ethiopian coffee.",
      "Analyze this product's market potential in Addis Ababa.",
      "Suggest a better pricing strategy for handmade crafts.",
    ],
    [],
  );

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  };

  const sendMessage = async (rawQuestion) => {
    const question = rawQuestion.trim();
    if (!question || isSending) return;

    setError("");
    const userMessage = {
      role: "user",
      text: question,
      time: formatTime(new Date()),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);
    scrollToBottom();

    try {
      const res = await fetch(`${API_BASE_URL}/api/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question }),
      });

      const payload = await res.json();

      if (!res.ok || !payload?.success) {
        throw new Error(payload?.error || "Failed to get assistant response.");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: payload.answer || "I could not generate a response right now.",
          time: formatTime(new Date()),
        },
      ]);
    } catch (err) {
      setError(err.message || "Unable to connect to AI service.");
    } finally {
      setIsSending(false);
      scrollToBottom();
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

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
        {messages.map((message, index) => {
          const isUser = message.role === "user";

          return (
            <div
              key={`${message.time}-${index}`}
              className={isUser ? "flex justify-end" : "flex items-start"}
            >
              {!isUser && (
                <Avatar
                  name={ai.name}
                  imageUrl={ai.avatar}
                  className="w-8 h-8 mr-3"
                />
              )}

              <div className={isUser ? "max-w-xl" : "max-w-2xl"}>
                <div
                  className={`text-xs text-gray-500 mb-1 ${
                    isUser ? "text-right" : ""
                  }`}
                >
                  <strong>{isUser ? user.name : ai.name}</strong>{" "}
                  <span className="text-[10px]">{message.time}</span>
                </div>
                <div
                  className={`p-4 rounded-xl shadow-sm border ${
                    isUser
                      ? "bg-blue-600 text-white border-blue-600 rounded-br-sm"
                      : "bg-white text-gray-800 border-gray-100"
                  }`}
                >
                  <p className="whitespace-pre-wrap">{message.text}</p>
                </div>
              </div>

              {isUser && (
                <Avatar
                  name={user.name}
                  imageUrl={user.avatar}
                  className="w-8 h-8 ml-3"
                />
              )}
            </div>
          );
        })}

        {isSending && (
          <div className="flex items-start">
            <Avatar
              name={ai.name}
              imageUrl={ai.avatar}
              className="w-8 h-8 mr-3"
            />
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 text-gray-500 text-sm">
              MarketMeda AI is thinking...
            </div>
          </div>
        )}

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg p-3">
            {error}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input / Footer Section */}
      <div className="p-4 bg-white border-t border-gray-200">
        {/* Quick Actions Buttons */}
        <div className="flex flex-wrap gap-3 mb-4">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => sendMessage(prompt)}
              disabled={isSending}
              className="text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-full transition duration-150 disabled:opacity-50"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="flex items-center border border-gray-300 rounded-full bg-white shadow-sm">
          <input
            type="text"
            placeholder="Ask MarketMeda AI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            className="flex-1 p-3 pl-5 bg-transparent focus:outline-none text-gray-700"
            disabled={isSending}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isSending || !input.trim()}
            className="bg-indigo-600 hover:bg-indigo-700 text-white p-3 rounded-full m-1 transition duration-150 disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
