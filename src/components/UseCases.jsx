import React from "react";
// Import necessary icons from Lucide React
import {
  Pencil,
  Languages,
  Image as ImageIcon,
  TrendingUp,
  BarChart,
  Activity,
} from "lucide-react";

// Array of feature objects to map over and keep the component clean
const features = [
  {
    name: "AI Social Media Post Generation",
    description: "Create engaging social media content in seconds.",
    icon: Pencil,
  },
  {
    name: "Multilingual Captions",
    description:
      "Generate captions in Amharic, Afaan Oromo, Tigrinya, and English.",
    icon: Languages,
  },
  {
    name: "AI Image Generation",
    description:
      "Enhance your posts with AI-created visuals tailored to your brand.",
    icon: ImageIcon,
  },
  {
    name: "Market-Trend Insights",
    description: "Stay ahead with AI-powered analysis of local market trends.",
    icon: TrendingUp,
  },
  {
    name: "Product Analytics",
    description: "Understand which of your products are performing best.",
    icon: BarChart,
  },
  {
    name: "Demand Prediction",
    description: "Forecast customer demand to optimize your inventory.",
    icon: Activity, // Using Activity icon for prediction/motion
  },
];

const FeaturesSection = () => {
  return (
    // Outer container with padding and light background (matching the image)
    <section className="bg-gray-50 py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Powerful Features to Supercharge Your Marketing
          </h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col text-left">
              <div className="flex items-start">
                {/* Icon Container: Blue icon with custom size */}
                <feature.icon
                  className="flex-shrink-0 h-6 w-6 text-blue-500 mr-3 mt-1"
                  aria-hidden="true"
                />

                {/* Feature Content */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {feature.name}
                  </h3>
                  <p className="mt-1 text-base text-gray-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
