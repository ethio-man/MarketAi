import React from "react";
import NavBar from "../components/NavBar.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";

export default function AssistantOverview() {
  return (
    <div className="bg-eesel-light min-h-screen flex flex-col">
      <NavBar />
      
      <main className="flex-grow">
        <section className="py-24 sm:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-eesel-dark tracking-tight mb-6">
                Your 24/7 AI Marketing Assistant
              </h1>
              <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600/90 leading-relaxed">
                Get instant marketing guidance, generate post ideas, and analyze trends by simply chatting with your personalized AI teammate.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-eesel-dark hover:bg-gray-800 transition duration-150 ease-in-out"
                >
                  Try the Assistant Free
                </Link>
              </div>
            </div>

            <div className="mt-16 bg-white border border-eesel-accent/50 rounded-[2rem] shadow-sm p-4 sm:p-6 max-w-5xl mx-auto">
              <div className="relative w-full overflow-hidden rounded-2xl">
                {/* The demo image uploaded by the user */}
                <img 
                  src="/assistant.png" 
                  alt="AI Assistant Demo" 
                  className="w-full object-cover"
                />
              </div>
            </div>
            
            {/* Feature highlights for the Assistant */}
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto text-center">
              <div>
                <h3 className="text-xl font-bold text-eesel-dark tracking-tight mb-2">Instant Idea Generation</h3>
                <p className="text-gray-600/90">Never stare at a blank page. The assistant suggests trending content tailored to your brand.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-eesel-dark tracking-tight mb-2">Market Insights</h3>
                <p className="text-gray-600/90">Ask questions about local trends and get data-driven answers immediately.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-eesel-dark tracking-tight mb-2">Multilingual Support</h3>
                <p className="text-gray-600/90">Chat and generate content seamlessly in Amharic, Afaan Oromo, Tigrinya, and English.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
