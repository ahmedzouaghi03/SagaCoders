"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Eye, Phone, Mail, MoreVertical } from "lucide-react";
import { InternshipWithCompany } from "./types";

interface InternshipCardProps {
  internship: InternshipWithCompany;
  onApply: (id: number) => void;
}

const workModeConfig = {
  on_site: {
    label: "On-site",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    dot: "bg-[#1ABE17]",
  },
  remote: {
    label: "Remote",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    dot: "bg-[#1ABE17]",
  },
  hybrid: {
    label: "Hybrid",
    bg: "bg-[#FDE9ED]",
    text: "text-[#E82646]",
    dot: "bg-[#E82646]",
  },
};

export default function InternshipCard({
  internship,
  onApply,
}: InternshipCardProps) {
  const router = useRouter();
  
  const formattedDate = new Date(internship.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  const workMode = workModeConfig[internship.workMode];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-[267px] h-[284px]"
    >
      {/* Card Container */}
      <div
        className="flex flex-col w-full h-full bg-white rounded-[5px]"
        style={{ boxShadow: "0px 4.4px 12px -1px rgba(222, 222, 222, 0.36)" }}
      >
        {/* Top Grid - Header */}
        <div className="flex items-center px-5 py-[15px] gap-[15px] h-[54px]">
          {/* ID */}
          <span className="flex-1 text-[14px] leading-4 font-normal text-[#3D5EE1]">
            INT{String(internship.id).padStart(6, "0")}
          </span>

          {/* Status & Action */}
          <div className="flex items-center gap-[5px]">
            {/* Badge */}
            <div
              className={`flex items-center justify-center px-3 py-[5px] gap-[5px] h-6 rounded-[5px] ${workMode.bg}`}
            >
              <div className={`w-[5px] h-[5px] rounded-full ${workMode.dot}`} />
              <span
                className={`text-[12px] leading-[14px] font-semibold ${workMode.text}`}
              >
                {workMode.label}
              </span>
            </div>

            {/* Menu */}
            <button className="w-6 h-6 flex items-center justify-center">
              <MoreVertical className="w-4 h-4 text-[#202C4B]" />
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-0 border-t border-[#E9EDF4]" />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center px-4 py-4 gap-3 flex-1">
          {/* Profile Card */}
          <div className="flex items-center w-full p-3 gap-3 bg-[#F8FAFC] rounded-[5px]">
            {/* Company Avatar */}
            <div className="w-[42px] h-[42px] rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-bold text-sm shrink-0">
              {internship.company.name.charAt(0)}
            </div>

            {/* Title & Company */}
            <div className="flex flex-col gap-1 min-w-0 flex-1">
              <h3 className="text-[14px] leading-[17px] font-medium text-[#202C4B] truncate">
                {internship.title}
              </h3>
              <p className="text-[13px] leading-4 font-normal text-[#515B73] truncate">
                {internship.company.name}
              </p>
            </div>
          </div>

          {/* Details Row */}
          <div className="flex items-start justify-between w-full gap-2">
            {/* Field */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="text-[12px] leading-[14px] font-normal text-[#6A7287]">
                Field
              </span>
              <span className="text-[13px] leading-4 font-normal text-[#202C4B] truncate">
                {internship.field || "—"}
              </span>
            </div>

            {/* Location */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="text-[12px] leading-[14px] font-normal text-[#6A7287]">
                Location
              </span>
              <span className="text-[13px] leading-4 font-normal text-[#202C4B] truncate">
                {internship.location || "—"}
              </span>
            </div>

            {/* Duration */}
            <div className="flex flex-col gap-1 flex-1 min-w-0">
              <span className="text-[12px] leading-[14px] font-normal text-[#6A7287]">
                Duration
              </span>
              <span className="text-[13px] leading-4 font-normal text-[#202C4B] truncate">
                {internship.duration || "—"}
              </span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-0 border-t border-[#E9EDF4]" />

        {/* Footer - Contact */}
        <div className="flex items-center justify-between px-4 py-3 gap-3">
          {/* Contact Icons */}
          <div className="flex items-center gap-1">
            <button 
              onClick={() => router.push(`/student/internships/${internship.id}`)}
              className="flex items-center justify-center w-[35px] h-[33px] border border-[#E9EDF4] rounded-[5px] hover:bg-[#F8FAFC] transition-colors"
              title="View Details"
            >
              <Eye className="w-[15px] h-[15px] text-[#515B73]" />
            </button>
            <button className="flex items-center justify-center w-[35px] h-[33px] border border-[#E9EDF4] rounded-[5px] hover:bg-[#F8FAFC] transition-colors">
              <Phone className="w-[15px] h-[15px] text-[#515B73]" />
            </button>
            <button className="flex items-center justify-center w-[35px] h-[33px] border border-[#E9EDF4] rounded-[5px] hover:bg-[#F8FAFC] transition-colors">
              <Mail className="w-[15px] h-[15px] text-[#515B73]" />
            </button>
          </div>

          {/* Apply Button */}
          <button
            onClick={() => onApply(internship.id)}
            className="flex items-center justify-center px-3 py-2 h-[30px] bg-[#E9EDF4] rounded-[5px] hover:bg-[#dce1e9] transition-colors"
          >
            <span className="text-[12px] leading-[14px] font-semibold text-[#515B73]">
              Apply Now
            </span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
