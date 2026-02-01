"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Clock, CheckCircle2, XCircle, ChevronRight, Building2 } from "lucide-react";
import { AdminInternship } from "./types";
import { internshipStatusConfig, workModeConfig } from "./config";

interface PendingInternshipsSectionProps {
  internships: AdminInternship[];
  onApprove?: (id: number) => void;
  onReject?: (id: number) => void;
}

export default function PendingInternshipsSection({
  internships,
  onApprove,
  onReject,
}: PendingInternshipsSectionProps) {
  const router = useRouter();
  const pendingInternships = internships.filter((i) => i.status === "pending");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#E5A000]/10 to-[#f59e0b]/10 flex items-center justify-center">
            <Clock className="w-4 h-4 text-[#E5A000]" />
          </div>
          <h2 className="text-[16px] font-semibold text-[#202C4B]">
            Pending Approval
          </h2>
          {pendingInternships.length > 0 && (
            <span className="px-2 py-0.5 bg-[#FFF8E6] rounded-full text-[12px] font-medium text-[#E5A000]">
              {pendingInternships.length} pending
            </span>
          )}
        </div>

        <Link
          href="/admin/internships?status=pending"
          className="flex items-center gap-1 text-[13px] font-medium text-[#3D5EE1] hover:text-[#5F74FF] transition-colors"
        >
          View All
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Internships List */}
      {pendingInternships.length > 0 ? (
        <div className="space-y-3">
          {pendingInternships.slice(0, 4).map((internship) => {
            const workMode = workModeConfig[internship.workMode];

            return (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-4 border border-[#E9EDF4] hover:border-[#E5A000]/30 transition-all"
                style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    {/* Title & Company */}
                    <h4 className="text-[14px] font-medium text-[#202C4B] truncate mb-1">
                      {internship.title}
                    </h4>
                    <div className="flex items-center gap-2 text-[13px] text-[#515B73] mb-2">
                      <Building2 className="w-3.5 h-3.5" />
                      <span>{internship.company.name}</span>
                    </div>

                    {/* Details */}
                    <div className="flex items-center gap-3 text-[12px] text-[#6A7287]">
                      <span>{internship.field}</span>
                      <span>•</span>
                      <span>{internship.location}</span>
                      <span>•</span>
                      <span
                        className={`px-2 py-0.5 rounded ${workMode.bg} ${workMode.text}`}
                      >
                        {workMode.label}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => onApprove?.(internship.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F9E8] text-[#1ABE17] rounded text-[12px] font-medium hover:bg-[#d4f4d4] transition-colors"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Approve
                    </button>
                    <button
                      onClick={() => onReject?.(internship.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FDE9ED] text-[#E82646] rounded text-[12px] font-medium hover:bg-[#fbd5dc] transition-colors"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      Reject
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center border border-[#E9EDF4]">
          <CheckCircle2 className="w-10 h-10 text-[#1ABE17] mx-auto mb-3" />
          <p className="text-[14px] text-[#515B73]">
            All internships have been reviewed!
          </p>
        </div>
      )}
    </motion.section>
  );
}
