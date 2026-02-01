"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Users, Eye, Edit } from "lucide-react";
import { CompanyInternship } from "./types";
import { workModeConfig, internshipStatusConfig } from "./config";

interface InternshipCardProps {
  internship: CompanyInternship;
}

// Helper to normalize workMode to lowercase
function normalizeWorkMode(workMode: string): "on_site" | "remote" | "hybrid" {
  const normalized = workMode.toLowerCase() as "on_site" | "remote" | "hybrid";
  if (normalized === "on_site" || normalized === "remote" || normalized === "hybrid") {
    return normalized;
  }
  return "hybrid"; // default fallback
}

// Helper to normalize status to lowercase
function normalizeStatus(status: string): "pending" | "approved" | "rejected" | "closed" {
  const normalized = status.toLowerCase() as "pending" | "approved" | "rejected" | "closed";
  if (normalized === "pending" || normalized === "approved" || normalized === "rejected" || normalized === "closed") {
    return normalized;
  }
  return "pending"; // default fallback
}

export default function InternshipCard({ internship }: InternshipCardProps) {
  const router = useRouter();
  
  // Normalize values for config lookup
  const normalizedWorkMode = normalizeWorkMode(internship.workMode);
  const normalizedStatus = normalizeStatus(internship.status);
  
  const workMode = workModeConfig[normalizedWorkMode];
  const status = internshipStatusConfig[normalizedStatus];
  const StatusIcon = status.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg p-4 cursor-pointer border border-[#E9EDF4] hover:border-[#3D5EE1]/30 transition-all"
      style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
      onClick={() => router.push(`/company/internships/${internship.id}`)}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {/* Title & Status */}
          <div className="flex items-start justify-between gap-2 mb-2">
            <h4 className="text-[14px] font-medium text-[#202C4B] truncate">
              {internship.title}
            </h4>
            <div
              className={`flex items-center justify-center gap-1.5 w-[75px] py-1 rounded ${status.bg} shrink-0`}
            >
              <StatusIcon className={`w-3.5 h-3.5 ${status.iconClass}`} />
              <span className={`text-[11px] font-semibold ${status.text}`}>
                {status.label}
              </span>
            </div>
          </div>

          {/* Field & Location */}
          <p className="text-[13px] text-[#515B73] mb-3">
            {internship.field} • {internship.location}
          </p>

          {/* Work Mode & Duration */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${workMode.bg} ${workMode.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${workMode.dot}`} />
              {workMode.label}
            </span>
            <span className="text-[11px] text-[#6A7287]">
              {internship.duration}
            </span>
          </div>

          {/* Applications Count */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-[12px] text-[#515B73]">
                <Users className="w-3.5 h-3.5" />
                <span>{internship.applicationsCount} applications</span>
              </div>
              {internship.pendingCount > 0 && (
                <span className="px-2 py-0.5 bg-[#FFF8E6] rounded text-[11px] font-medium text-[#E5A000]">
                  {internship.pendingCount} pending
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(`/company/internships/${internship.id}`);
                }}
                className="p-1.5 rounded hover:bg-[#F4F6FA] transition-colors"
                title="View Details"
              >
                <Eye className="w-4 h-4 text-[#6A7287]" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(
                    `/company/internships/updateInternship?id=${internship.id}`
                  );
                }}
                className="p-1.5 rounded hover:bg-[#F4F6FA] transition-colors"
                title="Edit"
              >
                <Edit className="w-4 h-4 text-[#6A7287]" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}