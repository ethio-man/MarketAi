import React from "react";
import {
  Pencil,
  Languages,
  Image as ImageIcon,
  TrendingUp,
  BarChart,
  Activity,
} from "lucide-react";

const features = [
  {
    name: "AI Social Media Post",
    description: "Launch targeted campaigns instantly using AI content generation.",
    icon: Pencil,
  },
  {
    name: "Multilingual Campaigns",
    description:
      "Generate campaigns in Amharic, Afaan Oromo, Tigrinya, and English.",
    icon: Languages,
  },
  {
    name: "AI Marketing Visuals",
    description:
      "Enhance your campaigns with AI-created visuals tailored to your brand.",
    icon: ImageIcon,
  },
  {
    name: "Assistant Market Insights",
    description: "Ask the AI assistant for analysis of local market trends.",
    icon: TrendingUp,
  },
  {
    name: "Real-Time Product Analytics",
    description: "Deeply understand which of your products are performing best.",
    icon: BarChart,
  },
  {
    name: "Analytics Demand Prediction",
    description: "Forecast customer demand based on data to optimize your inventory.",
    icon: Activity,
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-eesel-dark tracking-tight">
            Features to Supercharge Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col text-left group">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <feature.icon
                    className="h-6 w-6 text-eesel-dark/80 group-hover:text-eesel-dark transition-colors duration-200 mr-4"
                    aria-hidden="true"
                    strokeWidth={2}
                  />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-eesel-dark tracking-tight">
                    {feature.name}
                  </h3>
                  <p className="mt-2 text-base text-gray-600/90 leading-relaxed">
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
