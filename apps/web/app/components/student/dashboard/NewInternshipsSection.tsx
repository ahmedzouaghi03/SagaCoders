"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { InternshipWithCompany } from "../../student/internships/types";
import SectionHeader from "./SectionHeader";
import BrowseInternshipCard from "./BrowseInternshipCard";
import BrowseMoreCTA from "./BrowseMoreCTA";

interface NewInternshipsSectionProps {
  internships: InternshipWithCompany[];
}

export default function NewInternshipsSection({
  internships,
}: NewInternshipsSectionProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <SectionHeader
        icon={Sparkles}
        title="New Internships"
        linkText="See More"
        linkHref="/student/internships"
      />

      <div className="space-y-3">
        {internships.map((internship) => (
          <BrowseInternshipCard key={internship.id} internship={internship} />
        ))}
      </div>

      <BrowseMoreCTA />
    </motion.section>
  );
}
