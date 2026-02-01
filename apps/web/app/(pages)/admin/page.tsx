"use client";

import { motion } from "framer-motion";
import {
  StatsCards,
  PendingInternshipsSection,
  RecentApplicationsSection,
  QuickActionsSection,
  mockAdminStats,
  mockAdminInternships,
  mockAdminApplications,
} from "@/components/admin/dashboard";

export default function AdminDashboardPage() {
  const handleApproveInternship = (id: number) => {
    console.log("Approve internship:", id);
    // TODO: Implement approve logic
  };

  const handleRejectInternship = (id: number) => {
    console.log("Reject internship:", id);
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
              Admin Dashboard 
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Manage students, companies, internships, and events
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Overview */}
        <StatsCards stats={mockAdminStats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Pending & Applications */}
          <div className="lg:col-span-2 space-y-6">
            {/* Pending Internships */}
            <PendingInternshipsSection
              internships={mockAdminInternships}
              onApprove={handleApproveInternship}
              onReject={handleRejectInternship}
            />

            {/* Recent Applications */}
            <RecentApplicationsSection applications={mockAdminApplications} />
          </div>

          {/* Right Column - Quick Actions */}
          <div className="lg:col-span-1">
            <QuickActionsSection />
          </div>
        </div>
      </div>
    </div>
  );
}
