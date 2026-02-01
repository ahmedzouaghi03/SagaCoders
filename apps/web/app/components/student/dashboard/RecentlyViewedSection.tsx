"use client";

import { motion } from "framer-motion";
import { History } from "lucide-react";
import { InternshipWithCompany } from "../../student/internships/types";
import SectionHeader from "./SectionHeader";
import RecentlyViewedCard from "./RecentlyViewedCard";

interface RecentlyViewedSectionProps {
  internships: InternshipWithCompany[];
}

export default function RecentlyViewedSection({
  internships,
}: RecentlyViewedSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <SectionHeader
        icon={History}
        title="Recently Viewed"
        count={internships.length}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {internships.map((internship) => (
          <RecentlyViewedCard key={internship.id} internship={internship} />
        ))}
      </div>
    </motion.section>
  );
}
