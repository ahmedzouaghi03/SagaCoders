"use client";

import { motion } from "framer-motion";
import {
  ApplicationsSection,
  RecentlyViewedSection,
  NewInternshipsSection,
  recentlyViewedInternships,
  mockApplications,
  newInternships,
} from "@/components/student/dashboard";

export default function StudentPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
              Welcome back, Student! 👋
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Track your applications and discover new internship opportunities
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Applications & Recently Viewed */}
          <div className="lg:col-span-2 space-y-6">
            {/* My Applications Section (First - More Important) */}
            <ApplicationsSection applications={mockApplications} />

            {/* Recently Viewed Section */}
            <RecentlyViewedSection internships={recentlyViewedInternships} />
          </div>

          {/* Right Column - Browse New Internships */}
          <div className="lg:col-span-1">
            <NewInternshipsSection internships={newInternships} />
          </div>
        </div>
      </div>
    </div>
  );
}
