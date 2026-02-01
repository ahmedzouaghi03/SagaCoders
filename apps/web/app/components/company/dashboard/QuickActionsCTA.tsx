"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Plus, Sparkles } from "lucide-react";

export default function QuickActionsCTA() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="p-4 bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] rounded-lg text-white"
    >
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="text-[14px] font-semibold mb-1">
            Find your next intern
          </h3>
          <p className="text-[12px] text-white/80 mb-3">
            Create a new internship offer to attract talented students from top
            universities.
          </p>
          <Link
            href="/company/internships/createInternship"
            className="inline-flex items-center gap-1 px-3 py-1.5 bg-white text-[#3D5EE1] rounded-md text-[12px] font-semibold hover:bg-white/90 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            Create Offer
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
