"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Briefcase, GraduationCap, Building2 } from "lucide-react";
import { currentEvent } from "./eventData";

export default function HeroSection() {
  // Event data - will be fetched from database
  const { name: eventName, slogan, description, images, year, location, startDate, endDate } = currentEvent;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Banner Background Image */}
      {images.banner && (
        <div className="absolute inset-0 z-0">
          <Image
            src={images.banner}
            alt={`${eventName} banner`}
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900/70 to-slate-900" />
        </div>
      )}
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-royalStart/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-royalEnd/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-royalStart/10 to-royalEnd/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        {/* Event Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-2 mb-6 text-sm font-medium text-royalStart bg-royalStart/10 rounded-full border border-royalStart/20">
            🚀 {eventName} {year} • {location}
          </span>
        </motion.div>

        {/* Event Slogan as Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
        >
          {slogan ? (
            <>
              {slogan.split(" – ")[0]}
              {slogan.includes(" – ") && (
                <>
                  {" – "}
                  <span className="bg-gradient-to-r from-royalStart to-royalEnd bg-clip-text text-transparent">
                    {slogan.split(" – ")[1]}
                  </span>
                </>
              )}
            </>
          ) : (
            <>
              Welcome to{" "}
              <span className="bg-gradient-to-r from-royalStart to-royalEnd bg-clip-text text-transparent">
                {eventName}
              </span>
            </>
          )}
        </motion.h1>

        {/* Event Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-slate-300 mb-10 max-w-3xl mx-auto"
        >
          {description || "The premier platform connecting ambitious students with leading companies for transformative internship experiences. Build your future, one opportunity at a time."}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
        >
          <Link
            href="/api/auth/register"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-royalStart to-royalEnd rounded-xl hover:shadow-lg hover:shadow-royalStart/25 transition-all duration-300"
          >
            Get Started
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/about"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <GraduationCap className="w-10 h-10 text-royalStart mb-3" />
            <span className="text-3xl font-bold text-white mb-1">500+</span>
            <span className="text-slate-400">Active Students</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Building2 className="w-10 h-10 text-royalEnd mb-3" />
            <span className="text-3xl font-bold text-white mb-1">50+</span>
            <span className="text-slate-400">Partner Companies</span>
          </div>
          <div className="flex flex-col items-center p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
            <Briefcase className="w-10 h-10 text-royalStart mb-3" />
            <span className="text-3xl font-bold text-white mb-1">200+</span>
            <span className="text-slate-400">Internships Offered</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
