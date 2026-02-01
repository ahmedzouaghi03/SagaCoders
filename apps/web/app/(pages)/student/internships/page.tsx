"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";

import {
  InternshipCard,
  InternshipFiltersBar,
  InternshipsEmptyState,
  InternshipFilters,
  InternshipWithCompany,
  mockInternships,
} from "@/components/student/internships";

export default function StudentInternshipsPage() {
  const [filters, setFilters] = useState<InternshipFilters>({
    search: "",
    field: "",
    workMode: "all",
    location: "",
  });

  // Filter internships based on current filters
  const filteredInternships = useMemo(() => {
    return mockInternships.filter((internship) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          internship.title.toLowerCase().includes(searchLower) ||
          internship.company.name.toLowerCase().includes(searchLower) ||
          internship.description?.toLowerCase().includes(searchLower) ||
          internship.field?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Field filter
      if (filters.field && internship.field !== filters.field) {
        return false;
      }

      // Work mode filter
      if (filters.workMode !== "all" && internship.workMode !== filters.workMode) {
        return false;
      }

      // Location filter
      if (filters.location && internship.location !== filters.location) {
        return false;
      }

      return true;
    });
  }, [filters]);

  const handleApply = (internshipId: number) => {
    // TODO: Implement application flow
    console.log("Applying to internship:", internshipId);
    alert(`Application for internship #${internshipId} - Coming soon!`);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
              Browse Internships
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Discover exciting internship opportunities from top companies
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
        {/* Filters */}
        <InternshipFiltersBar
          filters={filters}
          onFilterChange={setFilters}
          resultsCount={filteredInternships.length}
        />

        {/* Internships Grid */}
        {filteredInternships.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {filteredInternships.map((internship) => (
              <InternshipCard
                key={internship.id}
                internship={internship}
                onApply={handleApply}
              />
            ))}
          </div>
        ) : (
          <InternshipsEmptyState />
        )}
      </div>
    </div>
  );
}
