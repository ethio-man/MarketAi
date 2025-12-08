import React, { useState } from "react";

// --- Hashtag Helper Component ---
const Hashtag = ({ tag, isPrimary = false, isSecondary = false }) => {
  let classes = "px-3 py-1 text-sm rounded-full font-medium transition";

  if (isPrimary) {
    classes += " bg-blue-100 text-blue-700";
  } else if (isSecondary) {
    classes += " bg-yellow-100 text-yellow-700";
  } else {
    classes += " bg-gray-100 text-gray-700";
  }

  return <span className={classes}>{tag}</span>;
};

// --- Campaign Builder Content Component ---
const CampaignBuilder = () => {
  const [language, setLanguage] = useState("Afaan Oromo");
  const [tone, setTone] = useState("Persuasive");

  const LanguageButton = ({ lang }) => (
    <button
      className={`px-4 py-2 text-sm rounded-lg transition ${
        language === lang
          ? "bg-blue-500 text-white font-semibold"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
      }`}
      onClick={() => setLanguage(lang)}
    >
      {lang}
    </button>
  );

  const ToneButton = ({ t }) => (
    <button
      className={`px-4 py-2 text-sm rounded-lg transition ${
        tone === t
          ? "bg-blue-50 text-blue-600 border border-blue-300 font-semibold"
          : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
      }`}
      onClick={() => setTone(t)}
    >
      {t}
    </button>
  );

  return (
    // The main container for the content area (assuming parent handles full height/flex)
    <div className="flex-grow p-8 bg-gray-50 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Create a New Campaign Post
      </h1>

      <div className="flex space-x-6">
        {/* --- 1. Define Your Post (Left Panel) --- */}
        <div className="w-1/2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            1. Define Your Post
          </h2>

          <div className="space-y-6">
            {/* Product Select */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Choose a product to promote
              </label>
              <div className="relative">
                <select className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Select a product</option>
                  <option>Sidamo Coffee</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  {/* Down Arrow Icon */}
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Language Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Select Language
              </label>
              <div className="flex space-x-3">
                <LanguageButton lang="Amharic" />
                <LanguageButton lang="Afaan Oromo" />
                <LanguageButton lang="Tigrinya" />
                <LanguageButton lang="English" />
              </div>
            </div>

            {/* Tone Selection */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Set the Tone
              </label>
              <div className="flex space-x-3">
                <ToneButton t="Fun" />
                <ToneButton t="Formal" />
                <ToneButton t="Persuasive" />
              </div>
            </div>
          </div>

          <button className="mt-8 w-full flex items-center justify-center p-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/50">
            <span className="mr-2">✨</span> Generate Post
          </button>
        </div>

        {/* --- 2. Review Your AI-Generated Post (Right Panel) --- */}
        <div className="w-1/2 space-y-6">
          {/* Caption and Hashtags Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              2. Review Your AI-Generated Post
            </h2>

            {/* Caption Header and Actions */}
            <div className="flex justify-between items-center mb-4">
              <p className="font-medium text-gray-600">Generated Caption</p>
              <div className="text-sm space-x-3">
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  Copy
                </button>
                <button className="text-blue-500 hover:text-blue-600 font-medium">
                  Regenerate
                </button>
              </div>
            </div>

            {/* Caption Text Area */}
            <div className="text-gray-800 leading-relaxed bg-blue-50 p-4 rounded-lg border border-blue-200">
              Experience the authentic taste of Ethiopia with our premium
              **Sidamo coffee beans**. Sourced directly from local farmers, each
              cup offers a rich, aromatic journey. Perfect for your morning
              ritual. Order now and elevate your coffee experience! ✨☕
            </div>

            {/* Hashtags */}
            <p className="mt-6 font-medium text-gray-600 mb-3">
              Suggested Hashtags
            </p>
            <div className="flex flex-wrap gap-2">
              <Hashtag tag="#EthiopianCoffee" isPrimary={true} />
              <Hashtag tag="#Sidamo" isPrimary={true} />
              <Hashtag tag="#SingleOrigin" isSecondary={true} />
              <Hashtag tag="#SupportLocal" isSecondary={true} />
              <Hashtag tag="#CoffeeLovers" isPrimary={true} />
            </div>
          </div>

          {/* Generated Image Card */}
          <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
            <p className="font-medium text-gray-600 mb-3">Generated Image</p>
            <div className="relative w-full h-80 rounded-lg overflow-hidden border border-gray-300">
              {/* Placeholder for the image */}
              <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                <img
                  src="https://png.pngtree.com/png-clipart/20231110/original/pngtree-splash-cup-of-coffee-with-and-beans-on-a-plain-white-png-image_13524854.png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilder;
