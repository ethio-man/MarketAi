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
    <section className="container mx-auto px-6 py-20">
      <h2 className="text-3xl font-bold text-darkblue mb-12 text-center">
        The All-in-One AI Platform for Your Business Growth
      </h2>
      <p className="mt-3 text-center mx-auto text-lg text-gray-600/50 sm:text-xl lg:mx-0 mb-8">
        Our platform provides you with the tools to automate marketing,
        understand your customers deeply, and monitor your business performance
        from one central dashboard.
      </p>
      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-xl shadow-lg p-6 text-center hover:scale-105 transition"
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2, duration: 0.8 }}
          >
            <f.icon className="text-amber-600 " />
            <h3 className="text-lg font-bold leading-tight mb-2 text-blue-900">
              {f.title}
            </h3>
            <p className="text-gray-600">
              Lorem ipsum placeholder description for {f.title}.
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
