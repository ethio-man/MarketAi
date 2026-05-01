import React from "react";

export default function AnalyticsPreview({ imageUrl }) {
  return (
    <section className="w-full py-24 sm:py-32 px-4 flex flex-col items-center">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-eesel-dark tracking-tight text-center mb-12">
        See MarketMeda AI in Action
      </h2>

      <div className="w-full max-w-5xl bg-white border border-eesel-accent/50 rounded-[2rem] shadow-sm p-4 sm:p-6">
        <div className="relative w-full overflow-hidden rounded-2xl">
          <img
            src={imageUrl}
            alt="MarketMeda AI in Action"
            className="w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}
