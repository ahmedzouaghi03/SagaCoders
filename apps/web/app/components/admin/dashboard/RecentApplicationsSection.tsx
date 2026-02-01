"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Users, Clock, ChevronRight, Building2 } from "lucide-react";
import { AdminApplication } from "./types";
import { applicationStatusConfig } from "./config";

interface RecentApplicationsSectionProps {
  applications: AdminApplication[];
}

export default function RecentApplicationsSection({
  applications,
}: RecentApplicationsSectionProps) {
  const router = useRouter();

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#3D5EE1]/10 to-[#5F74FF]/10 flex items-center justify-center">
            <Users className="w-4 h-4 text-[#3D5EE1]" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#202C4B]">
            Recent Applications
          </h2>
          <span className="px-2 py-0.5 bg-[#E9EDF4] rounded-full text-[12px] font-medium text-[#515B73]">
            {applications.length}
          </span>
        </div>

        <Link
          href="/admin/applications"
          className="flex items-center gap-1 text-[13px] font-medium text-[#3D5EE1] hover:text-[#5F74FF] transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Applications List */}
      {applications.length > 0 ? (
        <div className="space-y-3">
          {applications.slice(0, 5).map((application) => {
            const status = applicationStatusConfig[application.status];
            const StatusIcon = status.icon;
            const applicantName =
              application.applicant.firstName && application.applicant.lastName
                ? `${application.applicant.firstName} ${application.applicant.lastName}`
                : application.applicant.email;
            const initials =
              application.applicant.firstName && application.applicant.lastName
                ? `${application.applicant.firstName.charAt(0)}${application.applicant.lastName.charAt(0)}`
                : application.applicant.email.charAt(0).toUpperCase();

            return (
              <motion.div
                key={application.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 border border-[#E9EDF4] hover:border-[#3D5EE1]/30 transition-all cursor-pointer"
                style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
                onClick={() => router.push(`/admin/applications/${application.id}`)}
              >
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {initials}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-[14px] font-medium text-[#202C4B] truncate">
                        {applicantName}
                      </h4>
                      <div
                        className={`flex items-center gap-1 px-2 py-0.5 rounded ${status.bg} shrink-0`}
                      >
                        <StatusIcon
                          className={`w-3 h-3 ${status.iconClass} ${application.status === "pending" ? "animate-spin" : ""}`}
                        />
                        <span className={`text-[11px] font-medium ${status.text}`}>
                          {status.label}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[12px] text-[#6A7287]">
                      <span className="truncate">
                        {application.internship.title}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 shrink-0">
                        <Building2 className="w-3 h-3" />
                        {application.internship.company.name}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center border border-[#E9EDF4]">
          <Users className="w-10 h-10 text-[#E9EDF4] mx-auto mb-3" />
          <p className="text-[14px] text-[#515B73]">No applications yet</p>
        </div>
      )}
    </motion.section>
  );
}
