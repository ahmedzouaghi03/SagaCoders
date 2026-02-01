"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { InternshipWithCompany } from "../../student/internships/types";
import { workModeConfig } from "./config";

interface RecentlyViewedCardProps {
  internship: InternshipWithCompany;
}

export default function RecentlyViewedCard({
  internship,
}: RecentlyViewedCardProps) {
  const router = useRouter();
  const workMode = workModeConfig[internship.workMode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white rounded-lg p-4 cursor-pointer border border-[#E9EDF4] hover:border-[#3D5EE1]/30 transition-all"
      style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
      onClick={() => router.push(`/student/internships/${internship.id}`)}
    >
      <div className="flex items-start gap-3">
        {/* Company Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-semibold text-sm shrink-0">
          {internship.company.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <h4 className="text-[14px] font-medium text-[#202C4B] truncate">
            {internship.title}
          </h4>
          <p className="text-[13px] text-[#515B73] truncate">
            {internship.company.name}
          </p>

          <div className="flex items-center gap-2 mt-2">
            <span
              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-medium ${workMode.bg} ${workMode.text}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${workMode.dot}`} />
              {workMode.label}
            </span>
            <span className="text-[11px] text-[#6A7287]">
              {internship.location}
            </span>
          </div>
        </div>

        <Eye className="w-4 h-4 text-[#6A7287] shrink-0" />
      </div>
    </motion.div>
  );
}
