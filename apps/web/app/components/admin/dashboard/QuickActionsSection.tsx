"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Users,
  Building2,
  Briefcase,
  Calendar,
  FileText,
  Settings,
  ChevronRight,
} from "lucide-react";

const quickActions = [
  {
    title: "Manage Students",
    description: "View and manage student accounts",
    icon: Users,
    href: "/admin/students",
    color: "from-[#3D5EE1] to-[#5F74FF]",
    bg: "bg-[#3D5EE1]/10",
  },
  {
    title: "Manage Companies",
    description: "View and manage company accounts",
    icon: Building2,
    href: "/admin/companies",
    color: "from-[#1ABE17] to-[#22c55e]",
    bg: "bg-[#1ABE17]/10",
  },
  {
    title: "All Internships",
    description: "View and manage all internship offers",
    icon: Briefcase,
    href: "/admin/internships",
    color: "from-[#E5A000] to-[#f59e0b]",
    bg: "bg-[#E5A000]/10",
  },
  {
    title: "Manage Events",
    description: "Create and manage career events",
    icon: Calendar,
    href: "/admin/events",
    color: "from-[#8b5cf6] to-[#a78bfa]",
    bg: "bg-[#8b5cf6]/10",
  },
];

export default function QuickActionsSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#6A7287]/10 to-[#515B73]/10 flex items-center justify-center">
          <Settings className="w-4 h-4 text-[#6A7287]" />
        </div>
        <h2 className="text-[16px] font-semibold text-[#202C4B]">
          Quick Actions
        </h2>
      </div>

      {/* Actions Grid */}
      <div className="space-y-3">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <Link
                href={action.href}
                className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#E9EDF4] hover:border-[#3D5EE1]/30 hover:shadow-md transition-all group"
                style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
              >
                <div
                  className={`w-10 h-10 rounded-lg ${action.bg} flex items-center justify-center shrink-0`}
                >
                  <Icon
                    className="w-5 h-5"
                    style={{
                      color: action.color.includes("3D5EE1")
                        ? "#3D5EE1"
                        : action.color.includes("1ABE17")
                          ? "#1ABE17"
                          : action.color.includes("E5A000")
                            ? "#E5A000"
                            : "#8b5cf6",
                    }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[14px] font-medium text-[#202C4B] group-hover:text-[#3D5EE1] transition-colors">
                    {action.title}
                  </h4>
                  <p className="text-[12px] text-[#6A7287]">
                    {action.description}
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-[#6A7287] group-hover:text-[#3D5EE1] transition-colors" />
              </Link>
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}
