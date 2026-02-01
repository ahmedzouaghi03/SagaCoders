"use client";

import { motion } from "framer-motion";
import {
  Users,
  Building2,
  Briefcase,
  Clock,
  FileText,
  Calendar,
} from "lucide-react";
import { AdminDashboardStats } from "./types";

interface StatsCardsProps {
  stats: AdminDashboardStats;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  const statItems = [
    {
      label: "Total Students",
      value: stats.totalStudents,
      icon: Users,
      color: "from-[#3D5EE1] to-[#5F74FF]",
      bg: "bg-[#3D5EE1]/10",
    },
    {
      label: "Total Companies",
      value: stats.totalCompanies,
      icon: Building2,
      color: "from-[#1ABE17] to-[#22c55e]",
      bg: "bg-[#1ABE17]/10",
    },
    {
      label: "Total Internships",
      value: stats.totalInternships,
      icon: Briefcase,
      color: "from-[#E5A000] to-[#f59e0b]",
      bg: "bg-[#E5A000]/10",
    },
    {
      label: "Pending Approval",
      value: stats.pendingInternships,
      icon: Clock,
      color: "from-[#E82646] to-[#f43f5e]",
      bg: "bg-[#E82646]/10",
      highlight: stats.pendingInternships > 0,
    },
    {
      label: "Total Applications",
      value: stats.totalApplications,
      icon: FileText,
      color: "from-[#8b5cf6] to-[#a78bfa]",
      bg: "bg-[#8b5cf6]/10",
    },
    {
      label: "Active Events",
      value: stats.activeEvents,
      icon: Calendar,
      color: "from-[#06b6d4] to-[#22d3ee]",
      bg: "bg-[#06b6d4]/10",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
    >
      {statItems.map((item, index) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`bg-white rounded-xl p-4 border ${
              item.highlight
                ? "border-[#E82646]/30 ring-1 ring-[#E82646]/20"
                : "border-[#E9EDF4]"
            }`}
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-10 h-10 rounded-lg ${item.bg} flex items-center justify-center`}
              >
                <Icon
                  className={`w-5 h-5 bg-gradient-to-br ${item.color} bg-clip-text`}
                  style={{
                    color: item.color.includes("3D5EE1")
                      ? "#3D5EE1"
                      : item.color.includes("1ABE17")
                        ? "#1ABE17"
                        : item.color.includes("E5A000")
                          ? "#E5A000"
                          : item.color.includes("E82646")
                            ? "#E82646"
                            : item.color.includes("8b5cf6")
                              ? "#8b5cf6"
                              : "#06b6d4",
                  }}
                />
              </div>
              <div>
                <p className="text-[11px] text-[#6A7287] whitespace-nowrap">
                  {item.label}
                </p>
                <p
                  className={`text-[20px] font-semibold ${
                    item.highlight ? "text-[#E82646]" : "text-[#202C4B]"
                  }`}
                >
                  {item.value}
                </p>
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
