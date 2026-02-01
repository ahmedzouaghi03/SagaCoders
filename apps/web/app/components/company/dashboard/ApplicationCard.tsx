"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Clock,
  FileText,
  CheckCircle2,
  XCircle,
  ExternalLink,
} from "lucide-react";
import { CompanyApplication } from "./types";
import { applicationStatusConfig } from "./config";

interface ApplicationCardProps {
  application: CompanyApplication;
  onAccept?: (id: number) => void;
  onReject?: (id: number) => void;
}

export default function ApplicationCard({
  application,
  onAccept,
  onReject,
}: ApplicationCardProps) {
  const router = useRouter();
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
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg p-4 border border-[#E9EDF4]"
      style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
    >
      <div className="flex items-start gap-3">
        {/* Applicant Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {initials}
        </div>

        <div className="flex-1 min-w-0">
          {/* Applicant Info & Status */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-[14px] font-medium text-[#202C4B] truncate">
                {applicantName}
              </h4>
              <p className="text-[12px] text-[#6A7287] truncate">
                {application.applicant.fieldOfStudy || "Student"}
              </p>
            </div>

            {/* Status Badge */}
            <div
              className={`flex items-center justify-center gap-1.5 w-[85px] py-1 rounded ${status.bg} shrink-0`}
            >
              <StatusIcon
                className={`w-3.5 h-3.5 ${status.iconClass} ${application.status === "pending" ? "animate-spin" : ""}`}
              />
              <span className={`text-[11px] font-semibold ${status.text}`}>
                {status.label}
              </span>
            </div>
          </div>

          {/* Internship & Date */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[12px] text-[#515B73] truncate">
              For: {application.internship.title}
            </span>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span className="text-[11px] text-[#6A7287] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Applied{" "}
              {application.appliedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
            {application.applicant.cvUrl && (
              <a
                href={application.applicant.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="text-[11px] text-[#3D5EE1] flex items-center gap-1 hover:underline"
              >
                <FileText className="w-3 h-3" />
                View CV
              </a>
            )}
          </div>

          {/* Actions for pending applications */}
          {application.status === "pending" && (
            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#E9EDF4]">
              <button
                onClick={() => onAccept?.(application.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#E8F9E8] text-[#1ABE17] rounded text-[12px] font-medium hover:bg-[#d4f4d4] transition-colors"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                Accept
              </button>
              <button
                onClick={() => onReject?.(application.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FDE9ED] text-[#E82646] rounded text-[12px] font-medium hover:bg-[#fbd5dc] transition-colors"
              >
                <XCircle className="w-3.5 h-3.5" />
                Reject
              </button>
              <button
                onClick={() =>
                  router.push(`/company/applications/${application.id}`)
                }
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#F4F6FA] text-[#515B73] rounded text-[12px] font-medium hover:bg-[#E9EDF4] transition-colors ml-auto"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                View Details
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
