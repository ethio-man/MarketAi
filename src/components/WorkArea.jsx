import React from "react";
// Import the specific icons requested
import { Shirt, Utensils, Palette, GraduationCap } from "lucide-react";

// Array of use case/audience objects with their corresponding icon component and color classes
const targetAudiences = [
  {
    name: "Fashion & Apparel Brands",
    description:
      "AI-generated captions for new clothing lines, trend analysis, and multilingual ads for regional markets.",
    icon: Shirt,
    // First icon: Green
    iconColor: "text-amber-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Restaurants & Food Services",
    description:
      "Create engaging social media posts for daily specials and analyze local dining trends and peak demand times.",
    icon: Utensils,
    // Second icon: Green
    iconColor: "text-teal-600",
    bgColor: "bg-green-50",
  },
  {
    name: "Creative & Design Agencies",
    description:
      "Rapidly generate AI visuals and multilingual content ideas to streamline client campaign creation.",
    icon: Palette,
    // Third icon: Blue
    iconColor: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    name: "Educational Services",
    description:
      "Promote courses and programs with targeted, localized ads and forecast enrollment demand effectively.",
    icon: GraduationCap,
    // Fourth icon: Purple
    iconColor: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

const TargetAudienceSection = () => {
  return (
    // Section Container
    <section className="bg-white py-16 sm:py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Heading */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900">
            Who Can Supercharge Their Growth?
          </h2>
          <p className="mt-4 text-xl text-gray-600">
            Our AI marketer is tailored for diverse Ethiopian businesses.
          </p>
        </div>

        {/* Audience Grid - 4 columns on large screens */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {targetAudiences.map((audience, index) => (
            <div key={index} className="text-center">
              {/* Icon Container: Centered, large icon with background color */}
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${audience.bgColor}`}>
                  {/* The icon component is rendered, applying the specific color class */}
                  <audience.icon
                    className={`h-8 w-8 ${audience.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-gray-900 mt-2">
                {audience.name}
              </h3>
              <p className="mt-3 text-base text-gray-600">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetAudienceSection;
