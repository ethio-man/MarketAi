import React, { useEffect, useRef, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

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

const CampaignBuilder = () => {
  const [product, setProduct] = useState("");
  const [brand, setBrand] = useState("");
  const [language, setLanguage] = useState("English");
  const [tone, setTone] = useState("Persuasive");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [imageError, setImageError] = useState("");
  const captionRef = useRef(null);

  const resizeCaptionArea = () => {
    if (!captionRef.current) return;
    captionRef.current.style.height = "auto";
    captionRef.current.style.height = `${captionRef.current.scrollHeight}px`;
  };

  useEffect(() => {
    resizeCaptionArea();
  }, [caption]);

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
  const sendMessage = async () => {
    if (!product.trim() || !brand.trim()) {
      setError("Please provide both product and brand.");
      return;
    }

    const payloadBody = {
      product_name: product,
      brand,
      caption_language: language,
      tone,
    };

    if (isSending || isGeneratingImage) return;

    setError("");
    setImageError("");
    setIsSending(true);
    setIsGeneratingImage(true);

    const captionPromise = fetch(`${API_BASE_URL}/api/ai/caption`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payloadBody),
    })
      .then(async (res) => {
        const payload = await res.json();
        if (!res.ok || !payload?.success)
          throw new Error(
            payload?.error || "Failed to get assistant response.",
          );
        setCaption(
          payload.answer || "I could not generate a response right now.",
        );
        setHashtags(payload.hashtags || []);
      })
      .catch((err) => {
        setError(err.message || "Unable to connect to AI service.");
      })
      .finally(() => {
        setIsSending(false);
      });

    const imagePromise = fetch(`${API_BASE_URL}/api/ai/image`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ product_name: product, brand, tone }),
    })
      .then(async (res) => {
        const payload = await res.json();
        if (!res.ok || !payload?.success)
          throw new Error(payload?.error || "Failed to generate image.");
        setImageUrl(payload.imageUrl);
        setImageLoading(true); // image URL received; waiting for browser to finish rendering
      })
      .catch((err) => {
        setImageError(err.message || "Unable to connect to AI Image service.");
      })
      .finally(() => {
        setIsGeneratingImage(false);
      });

    await Promise.all([captionPromise, imagePromise]);
  };
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
    <div className="flex-grow p-8 bg-gray-50 overflow-y-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-8">
        Create a New Campaign Post
      </h1>

      <div className="flex space-x-6">
        <div className="w-1/2 bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <h2 className="text-xl font-semibold text-gray-700 mb-6">
            1. Define Your Post
          </h2>

          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Choose a product to promote
              </label>
              <div className="relative">
                <input
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  placeholder="e.g. Arabica Coffee Beans"
                  className="w-full p-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700"></div>
              </div>
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-2">
                Brand Name
              </label>
              <input
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. Abebe Coffee"
                className="w-full p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

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

          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}

          <button
            onClick={sendMessage}
            disabled={isSending || isGeneratingImage}
            className="mt-8 w-full flex items-center justify-center p-3 text-lg font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition shadow-lg shadow-blue-500/50 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <span className="mr-2">✨</span>
            {isSending || isGeneratingImage ? "Generating..." : "Generate Post"}
          </button>
        </div>

        <div className="w-1/2 flex justify-center">
          {/* Social Media Post Template Card */}
          <div className="w-full max-w-md bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden flex flex-col">
            {/* Header: Profile & Brand */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 bg-white">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                  {(brand || "B").charAt(0).toUpperCase()}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">
                    {brand || "Your Brand"}
                  </p>
                  <p className="text-xs text-gray-500">Sponsored</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <button
                  onClick={() => navigator.clipboard?.writeText(caption || "")}
                  className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition"
                  title="Copy Caption"
                >
                  Copy
                </button>
                <button
                  onClick={sendMessage}
                  className="text-blue-500 text-sm font-semibold hover:text-blue-700 transition"
                  title="Regenerate All"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative w-full aspect-square bg-gray-50 flex items-center justify-center border-b border-gray-100">
              {imageError && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/95 z-20">
                  <p className="text-sm text-red-600 font-medium px-6 text-center">
                    {imageError}
                  </p>
                </div>
              )}
              {isGeneratingImage && (
                <div className="absolute inset-0 bg-gray-100 flex flex-col items-center justify-center text-blue-500 z-20">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                  <p className="font-medium text-sm">Generating image...</p>
                </div>
              )}
              {imageUrl ? (
                <>
                  {imageLoading && !isGeneratingImage && (
                    <div className="absolute inset-0 bg-gray-100/70 flex flex-col items-center justify-center text-blue-500 z-10 backdrop-blur-sm">
                      <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mb-3"></div>
                      <p className="font-medium text-sm drop-shadow-sm">
                        Loading from server...
                      </p>
                    </div>
                  )}
                  <img
                    src={imageUrl}
                    alt="Generated Advertisement"
                    className="w-full h-full object-cover"
                    onLoad={() => setImageLoading(false)}
                    onError={() => {
                      setImageLoading(false);
                      setImageError("Image failed to load. Please try again.");
                      setImageUrl("");
                    }}
                  />
                </>
              ) : (
                !isGeneratingImage && (
                  <div className="w-full h-full flex flex-col items-center justify-center text-gray-400 p-8 text-center bg-gray-100">
                    <svg
                      className="w-12 h-12 mb-3 opacity-50 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <p className="text-sm">
                      Your generated ad image will appear here
                    </p>
                  </div>
                )
              )}
            </div>

            {/* Post Actions (Instagram style) */}
            <div className="p-4 pb-3 bg-white">
              <div className="flex justify-between items-center mb-3 text-gray-800">
                <div className="flex space-x-4">
                  <svg
                    className="w-6 h-6 hover:text-red-500 hover:fill-red-500 cursor-pointer transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                  <svg
                    className="w-6 h-6 hover:text-blue-500 cursor-pointer transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <svg
                    className="w-6 h-6 hover:text-blue-500 cursor-pointer transition"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    ></path>
                  </svg>
                </div>
                <svg
                  className="w-6 h-6 hover:text-gray-500 cursor-pointer transition"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  ></path>
                </svg>
              </div>

              <p className="font-semibold text-sm text-gray-900 mb-2">
                1,245 likes
              </p>
              <div className="text-sm text-gray-800 leading-relaxed">
                <span className="font-bold mr-2 text-gray-900">
                  {brand || "Your Brand"}
                </span>
                {caption ? (
                  <span>{caption}</span>
                ) : (
                  <span className="text-gray-500 italic">
                    Generate a campaign to see the polished AI caption here...
                  </span>
                )}
              </div>

              {/* Hashtags */}
              {hashtags.length > 0 && (
                <div className="mt-2 text-[#00376b] text-sm font-medium break-words leading-relaxed">
                  {hashtags.join(" ")}
                </div>
              )}

              <p className="text-xs text-gray-400 mt-3 uppercase tracking-wide">
                Sponsored • Just now
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignBuilder;
