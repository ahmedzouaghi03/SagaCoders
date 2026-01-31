"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { UserPlus, Search, Send, CheckCircle } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    title: "Create Account",
    description:
      "Sign up as a student or company. Complete your profile with relevant information.",
    step: "01",
  },
  {
    icon: Search,
    title: "Browse Opportunities",
    description:
      "Explore available internships filtered by field, location, and work mode.",
    step: "02",
  },
  {
    icon: Send,
    title: "Apply",
    description:
      "Submit your application with CV and motivation letter. Track status in real-time.",
    step: "03",
  },
  {
    icon: CheckCircle,
    title: "Get Accepted",
    description:
      "Receive responses from companies and start your internship journey.",
    step: "04",
  },
];

export default function HowItWorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-24 bg-white" id="how-it-works">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-royalStart bg-royalStart/10 rounded-full">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Your Path to{" "}
            <span className="bg-gradient-to-r from-royalStart to-royalEnd bg-clip-text text-transparent">
              Success
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Getting started is easy. Follow these simple steps to find your
            perfect internship match.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-royalStart to-royalEnd transform -translate-y-1/2 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-6">
                    <div className="w-20 h-20 bg-gradient-to-br from-royalStart to-royalEnd rounded-2xl flex items-center justify-center shadow-lg shadow-royalStart/25">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-white text-royalStart font-bold text-sm rounded-full flex items-center justify-center shadow-md border-2 border-royalStart">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-slate-600">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
