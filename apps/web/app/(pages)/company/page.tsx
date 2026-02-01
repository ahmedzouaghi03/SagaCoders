"use client";

import { motion } from "framer-motion";
import {
  StatsCards,
  InternshipsSection,
  ApplicationsSection,
  QuickActionsCTA,
  mockCompanyInternships,
  mockRecentApplications,
  mockDashboardStats,
} from "@/components/company/dashboard";

export default function CompanyDashboardPage() {
  const handleAcceptApplication = (id: number) => {
    console.log("Accept application:", id);
    // TODO: Implement accept logic
  };

  const handleRejectApplication = (id: number) => {
    console.log("Reject application:", id);
    // TODO: Implement reject logic
  };

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
              Welcome back, TechCorp! 👋
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Manage your internship offers and review applications
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Overview */}
        <StatsCards stats={mockDashboardStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Internships & Applications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Internships Section */}
            <InternshipsSection internships={mockCompanyInternships} />

            {/* Applications Section */}
            <ApplicationsSection
              applications={mockRecentApplications}
              onAccept={handleAcceptApplication}
              onReject={handleRejectApplication}
            />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActionsCTA />
          </div>
        </div>
      </div>
    </div>
  );
}
