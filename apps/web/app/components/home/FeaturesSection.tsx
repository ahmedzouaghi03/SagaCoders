"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Search,
  FileText,
  Users,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Matching",
    description:
      "Our intelligent algorithm matches students with internships based on skills, interests, and career goals.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: FileText,
    title: "Easy Applications",
    description:
      "Streamlined application process with CV and motivation letter uploads. Apply to multiple positions effortlessly.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Users,
    title: "Company Profiles",
    description:
      "Browse detailed company profiles to find the perfect cultural fit for your career aspirations.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: TrendingUp,
    title: "Track Progress",
    description:
      "Monitor your application status in real-time. Stay informed every step of the way.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: Shield,
    title: "Verified Companies",
    description:
      "All partner companies are verified to ensure legitimate and valuable internship opportunities.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Zap,
    title: "Fast Process",
    description:
      "Quick response times and efficient communication between students and companies.",
    color: "from-yellow-500 to-orange-500",
  },
];

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-24 bg-slate-50" id="features">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
          ref={ref}
        >
          <span className="inline-block px-4 py-2 mb-4 text-sm font-medium text-royalStart bg-royalStart/10 rounded-full">
            Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Everything You Need to{" "}
            <span className="bg-gradient-to-r from-royalStart to-royalEnd bg-clip-text text-transparent">
              Succeed
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Our platform provides all the tools and resources needed to connect
            students with their dream internships.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div
                className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} mb-6`}
              >
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
