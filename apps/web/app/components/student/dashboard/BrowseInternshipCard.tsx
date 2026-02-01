"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { InternshipWithCompany } from "../../student/internships/types";
import { workModeConfig } from "./config";

interface BrowseInternshipCardProps {
  internship: InternshipWithCompany;
}

export default function BrowseInternshipCard({
  internship,
}: BrowseInternshipCardProps) {
  const router = useRouter();
  const workMode = workModeConfig[internship.workMode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className="bg-white rounded-lg p-4 cursor-pointer border border-[#E9EDF4] hover:border-[#3D5EE1]/30 transition-all group"
      style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
      onClick={() => router.push(`/student/internships/${internship.id}`)}
    >
      <div className="flex items-center gap-3">
        {/* Company Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-bold text-base shrink-0">
          {internship.company.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-medium text-[#202C4B] truncate group-hover:text-[#3D5EE1] transition-colors">
            {internship.title}
          </h4>
          <p className="text-[13px] text-[#515B73] truncate">
            {internship.company.name}
          </p>

          <div className="flex items-center gap-2 mt-1.5">
            <span
              className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-medium ${workMode.bg} ${workMode.text}`}
            >
              <span className={`w-1 h-1 rounded-full ${workMode.dot}`} />
              {workMode.label}
            </span>
            <span className="text-[11px] text-[#6A7287]">
              {internship.field}
            </span>
            <span className="text-[11px] text-[#6A7287]">•</span>
            <span className="text-[11px] text-[#6A7287]">
              {internship.duration}
            </span>
          </div>
        </div>

        <ChevronRight className="w-5 h-5 text-[#6A7287] group-hover:text-[#3D5EE1] transition-colors shrink-0" />
      </div>
    </motion.div>
  );
}
