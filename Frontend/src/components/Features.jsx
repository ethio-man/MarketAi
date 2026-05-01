import React from "react";
import { Sparkles, Users, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

export default function Features() {
  const features = [
    { title: "AI-Powered Marketing", icon: Sparkles },
    { title: "Smart Customer Insights", icon: Users },
    { title: "Business Data Dashboard", icon: LayoutDashboard },
  ];

  return (
    <section className="container mx-auto px-6 py-24 sm:py-32">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-eesel-dark mb-6 text-center tracking-tight">
        The All-in-One AI Platform
      </h2>
      <p className="mt-3 text-center mx-auto max-w-2xl text-lg sm:text-xl text-gray-600/90 mb-16">
        Our platform provides you with the tools to automate marketing,
        understand your customers deeply, and monitor your business performance
        from one central dashboard.
      </p>
      <div className="grid md:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="rounded-2xl p-8 text-center border border-eesel-accent/50 bg-white/50 hover:bg-white transition duration-300"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center p-3 bg-eesel-dark rounded-full mb-6 text-white">
              <f.icon className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="text-xl font-bold leading-tight mb-3 text-eesel-dark tracking-tight">
              {f.title}
            </h3>
            <p className="text-gray-600/90 leading-relaxed">
              Automate tasks and unlock growth potential effortlessly.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
