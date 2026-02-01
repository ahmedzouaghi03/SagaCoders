"use client";

import { motion } from "framer-motion";
import { Briefcase, Plus } from "lucide-react";
import Link from "next/link";
import { CompanyInternship } from "./types";
import SectionHeader from "./SectionHeader";
import InternshipCard from "./InternshipCard";

interface InternshipsSectionProps {
  internships: CompanyInternship[];
}

export default function InternshipsSection({
  internships,
}: InternshipsSectionProps) {
  const activeInternships = internships.filter(
    (i) => i.status === "approved" || i.status === "pending"
  );

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <SectionHeader
        icon={Briefcase}
        title="My Internship Offers"
        count={activeInternships.length}
        linkText="View All"
        linkHref="/company/internships"
      />

      {internships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internships.slice(0, 4).map((internship) => (
            <InternshipCard key={internship.id} internship={internship} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-lg p-8 text-center border border-[#E9EDF4]">
          <Briefcase className="w-10 h-10 text-[#E9EDF4] mx-auto mb-3" />
          <p className="text-[14px] text-[#515B73] mb-4">
            You haven&apos;t created any internship offers yet
          </p>
          <Link
            href="/company/internships/createInternship"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#3D5EE1] text-white rounded text-[13px] font-medium hover:bg-[#3351c7] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Create Your First Offer
          </Link>
        </div>
      )}
    </motion.section>
  );
}
