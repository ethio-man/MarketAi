import React from "react";
import { Shirt, Utensils, Palette, GraduationCap } from "lucide-react";

const targetAudiences = [
  {
    name: "Fashion & Apparel",
    description:
      "AI-generated captions for new clothing lines, trend analysis, and multilingual ads.",
    icon: Shirt,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
  },
  {
    name: "Restaurants & Food",
    description:
      "Create engaging social media posts for daily specials and analyze dining trends.",
    icon: Utensils,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
  },
  {
    name: "Creative Agencies",
    description:
      "Rapidly generate AI visuals and multilingual content ideas for clients.",
    icon: Palette,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    name: "Educational Services",
    description:
      "Promote courses and programs with targeted ads and forecast enrollment demand.",
    icon: GraduationCap,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
  },
];

const TargetAudienceSection = () => {
  return (
    <section className="py-24 sm:py-32 bg-eesel-dark text-eesel-light rounded-[2.5rem] mx-4 sm:mx-8 lg:mx-auto max-w-[1400px]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
            Who Can Supercharge Growth?
          </h2>
          <p className="mt-4 text-xl text-eesel-light/70 max-w-2xl mx-auto">
            Our AI marketer is tailored for diverse businesses.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-4">
          {targetAudiences.map((audience, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-6">
                <div className={`p-4 rounded-2xl ${audience.bgColor}`}>
                  <audience.icon
                    className={`h-8 w-8 ${audience.iconColor}`}
                    aria-hidden="true"
                  />
                </div>
              </div>
              <h3 className="text-xl font-bold tracking-tight mt-2">
                {audience.name}
              </h3>
              <p className="mt-3 text-base text-eesel-light/70 leading-relaxed">
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
