"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { CompanyApplication } from "./types";
import { ApplicationStatus } from "@monkeyprint/db";
import SectionHeader from "./SectionHeader";
import ApplicationCard from "./ApplicationCard";

interface ApplicationsSectionProps {
  applications: CompanyApplication[];
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
}

export default function ApplicationsSection({
  applications,
  onAccept,
  onReject,
}: ApplicationsSectionProps) {
  const [activeTab, setActiveTab] = useState<ApplicationStatus | "all">("all");

  const filteredApplications =
    activeTab === "all"
      ? applications
      : applications.filter((app) => app.status === activeTab);

  const pendingCount = applications.filter(
    (app) => app.status === "pending"
  ).length;
  const acceptedCount = applications.filter(
    (app) => app.status === "accepted"
  ).length;
  const rejectedCount = applications.filter(
    (app) => app.status === "rejected"
  ).length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <SectionHeader
        icon={Users}
        title="Recent Applications"
        count={applications.length}
        linkText="View All"
        linkHref="/company/applications"
      />

      {/* Status Tabs */}
      <div className="flex items-center gap-2 mb-4 overflow-x-auto pb-2">
        <button
          onClick={() => setActiveTab("all")}
          className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
            activeTab === "all"
              ? "bg-[#3D5EE1] text-white"
              : "bg-white text-[#515B73] border border-[#E9EDF4] hover:border-[#3D5EE1]/30"
          }`}
        >
          All ({applications.length})
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
            activeTab === "pending"
              ? "bg-[#E5A000] text-white"
              : "bg-white text-[#515B73] border border-[#E9EDF4] hover:border-[#E5A000]/30"
          }`}
        >
          Pending ({pendingCount})
        </button>
        <button
          onClick={() => setActiveTab("accepted")}
          className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
            activeTab === "accepted"
              ? "bg-[#1ABE17] text-white"
              : "bg-white text-[#515B73] border border-[#E9EDF4] hover:border-[#1ABE17]/30"
          }`}
        >
          Accepted ({acceptedCount})
        </button>
        <button
          onClick={() => setActiveTab("rejected")}
          className={`px-3 py-1.5 rounded-full text-[12px] font-medium transition-all whitespace-nowrap ${
            activeTab === "rejected"
              ? "bg-[#E82646] text-white"
              : "bg-white text-[#515B73] border border-[#E9EDF4] hover:border-[#E82646]/30"
          }`}
        >
          Rejected ({rejectedCount})
        </button>
      </div>

      {/* Applications List */}
      <div className="space-y-3">
        {filteredApplications.length > 0 ? (
          filteredApplications.map((application) => (
            <ApplicationCard
              key={application.id}
              application={application}
              onAccept={onAccept}
              onReject={onReject}
            />
          ))
        ) : (
          <div className="bg-white rounded-lg p-8 text-center border border-[#E9EDF4]">
            <Users className="w-10 h-10 text-[#E9EDF4] mx-auto mb-3" />
            <p className="text-[14px] text-[#515B73]">
              No {activeTab === "all" ? "" : activeTab} applications found
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
