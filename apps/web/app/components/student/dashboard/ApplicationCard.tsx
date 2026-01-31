"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Application } from "./types";
import { workModeConfig, statusConfig } from "./config";

interface ApplicationCardProps {
  application: Application;
}

export default function ApplicationCard({ application }: ApplicationCardProps) {
  const router = useRouter();
  const status = statusConfig[application.status];
  const StatusIcon = status.icon;
  const workMode = workModeConfig[application.internship.workMode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg p-4 cursor-pointer border border-[#E9EDF4] hover:border-[#3D5EE1]/30 transition-all"
      style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
      onClick={() =>
        router.push(`/student/internships/${application.internship.id}`)
      }
    >
      <div className="flex items-start gap-3">
        {/* Company Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {application.internship.company.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h4 className="text-[14px] font-medium text-[#202C4B] truncate">
                {application.internship.title}
              </h4>
              <p className="text-[13px] text-[#515B73] truncate">
                {application.internship.company.name}
              </p>
            </div>

            {/* Status Badge */}
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded ${status.bg} shrink-0`}
            >
              <StatusIcon
                className={`w-3.5 h-3.5 ${status.iconClass} ${application.status === "pending" ? "animate-spin" : ""}`}
              />
              <span className={`text-[11px] font-semibold ${status.text}`}>
                {status.label}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${workMode.bg} ${workMode.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${workMode.dot}`} />
              {workMode.label}
            </span>
            <span className="text-[11px] text-[#6A7287] flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Applied{" "}
              {application.appliedAt.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
