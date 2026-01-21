import React from "react";
export default function AnalyticsPreview({ embedUrl }) {
  return (
    <section className="w-full py-20 px-4 flex flex-col items-center">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-ethio-dark-blue text-center mb-10">
        See MarketMeda AI in Action
      </h2>

      <div className="w-full max-w-5xl bg-gray-100 dark:bg-gray-800 rounded-3xl shadow-xl p-4 sm:p-6">
        <div className="relative w-full overflow-hidden rounded-2xl shadow-md">
          <iframe
            src={embedUrl}
            className="w-full h-[480px] rounded-2xl border-0"
            allowFullScreen
            title="Analytics Dashboard"
            loading="lazy"
          ></iframe>
        </div>
      </div>
    </section>
  );
}
