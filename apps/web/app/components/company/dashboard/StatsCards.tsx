"use client";

import { motion } from "framer-motion";
import {
  Briefcase,
  Users,
  Clock,
  CheckCircle2,
  XCircle,
  TrendingUp,
} from "lucide-react";
import { DashboardStats } from "./types";

interface StatsCardsProps {
  stats: DashboardStats;
}

interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
  bgColor: string;
  delay?: number;
}

function StatCard({
  icon: Icon,
  label,
  value,
  color,
  bgColor,
  delay = 0,
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white rounded-lg p-4 border border-[#E9EDF4]"
      style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-10 h-10 rounded-lg ${bgColor} flex items-center justify-center`}
        >
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <div>
          <p className="text-[24px] font-bold text-[#202C4B]">{value}</p>
          <p className="text-[12px] text-[#6A7287]">{label}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <StatCard
        icon={Briefcase}
        label="Total Offers"
        value={stats.totalInternships}
        color="text-[#3D5EE1]"
        bgColor="bg-[#3D5EE1]/10"
        delay={0}
      />
      <StatCard
        icon={TrendingUp}
        label="Active Offers"
        value={stats.activeInternships}
        color="text-[#1ABE17]"
        bgColor="bg-[#1ABE17]/10"
        delay={0.05}
      />
      <StatCard
        icon={Users}
        label="Total Applications"
        value={stats.totalApplications}
        color="text-[#3D5EE1]"
        bgColor="bg-[#3D5EE1]/10"
        delay={0.1}
      />
      <StatCard
        icon={Clock}
        label="Pending Review"
        value={stats.pendingApplications}
        color="text-[#E5A000]"
        bgColor="bg-[#E5A000]/10"
        delay={0.15}
      />
      <StatCard
        icon={CheckCircle2}
        label="Accepted"
        value={stats.acceptedApplications}
        color="text-[#1ABE17]"
        bgColor="bg-[#1ABE17]/10"
        delay={0.2}
      />
      <StatCard
        icon={XCircle}
        label="Rejected"
        value={stats.rejectedApplications}
        color="text-[#E82646]"
        bgColor="bg-[#E82646]/10"
        delay={0.25}
      />
    </div>
  );
}
