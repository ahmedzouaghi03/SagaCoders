"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Plus,
  Search,
  Filter,
  Briefcase,
  MapPin,
  Building2,
  ChevronDown,
} from "lucide-react";
import InternshipCard from "@/components/company/dashboard/InternshipCard";
import {
  mockCompanyInternships,
  type CompanyInternship,
} from "@/components/company/dashboard";

type WorkModeFilter = "all" | "on_site" | "remote" | "hybrid";
type StatusFilter = "all" | "pending" | "approved" | "rejected" | "closed";

interface InternshipFilters {
  search: string;
  workMode: WorkModeFilter;
  status: StatusFilter;
  field: string;
}

export default function CompanyInternshipsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<InternshipFilters>({
    search: "",
    workMode: "all",
    status: "all",
    field: "",
  });

  // Get unique fields for filter dropdown
  const availableFields = useMemo(() => {
    const fields = mockCompanyInternships
      .map((i) => i.field)
      .filter((f): f is string => f !== null);
    return [...new Set(fields)];
  }, []);

  // Filter internships
  const filteredInternships = useMemo(() => {
    return mockCompanyInternships.filter((internship) => {
      // Search filter
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          internship.title.toLowerCase().includes(searchLower) ||
          internship.description?.toLowerCase().includes(searchLower) ||
          internship.field?.toLowerCase().includes(searchLower) ||
          internship.location?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      // Work mode filter
      if (filters.workMode !== "all" && internship.workMode !== filters.workMode) {
        return false;
      }

      // Status filter
      if (filters.status !== "all" && internship.status !== filters.status) {
        return false;
      }

      // Field filter
      if (filters.field && internship.field !== filters.field) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockCompanyInternships.length,
      active: mockCompanyInternships.filter((i) => i.status === "approved").length,
      pending: mockCompanyInternships.filter((i) => i.status === "pending").length,
      closed: mockCompanyInternships.filter((i) => i.status === "closed").length,
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
                My Internships
              </h1>
              <p className="text-[14px] text-[#515B73]">
                Manage and track all your internship offers
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => router.push("/company/internships/createInternship")}
              className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Create New Offer
            </motion.button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <p className="text-[12px] text-[#6A7287] mb-1">Total Offers</p>
            <p className="text-[24px] font-semibold text-[#202C4B]">{stats.total}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <p className="text-[12px] text-[#6A7287] mb-1">Active</p>
            <p className="text-[24px] font-semibold text-[#1ABE17]">{stats.active}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <p className="text-[12px] text-[#6A7287] mb-1">Pending Approval</p>
            <p className="text-[24px] font-semibold text-[#E5A000]">{stats.pending}</p>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <p className="text-[12px] text-[#6A7287] mb-1">Closed</p>
            <p className="text-[24px] font-semibold text-[#6A7287]">{stats.closed}</p>
          </div>
        </motion.div>

        {/* Filters Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl p-4 border border-[#E9EDF4]"
          style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287]" />
              <input
                type="text"
                placeholder="Search internships..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full h-[40px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={filters.status}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      status: e.target.value as StatusFilter,
                    }))
                  }
                  className="h-[40px] pl-3 pr-8 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] appearance-none cursor-pointer focus:outline-none focus:border-[#3D5EE1] transition-colors"
                >
                  <option value="all">All Status</option>
                  <option value="approved">Active</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="closed">Closed</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287] pointer-events-none" />
              </div>

              {/* Work Mode Filter */}
              <div className="relative">
                <select
                  value={filters.workMode}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      workMode: e.target.value as WorkModeFilter,
                    }))
                  }
                  className="h-[40px] pl-3 pr-8 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] appearance-none cursor-pointer focus:outline-none focus:border-[#3D5EE1] transition-colors"
                >
                  <option value="all">All Work Modes</option>
                  <option value="on_site">On-site</option>
                  <option value="remote">Remote</option>
                  <option value="hybrid">Hybrid</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287] pointer-events-none" />
              </div>

              {/* Field Filter */}
              <div className="relative">
                <select
                  value={filters.field}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, field: e.target.value }))
                  }
                  className="h-[40px] pl-3 pr-8 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] appearance-none cursor-pointer focus:outline-none focus:border-[#3D5EE1] transition-colors"
                >
                  <option value="">All Fields</option>
                  {availableFields.map((field) => (
                    <option key={field} value={field}>
                      {field}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-[#E9EDF4]">
            <p className="text-[13px] text-[#6A7287]">
              Showing{" "}
              <span className="font-medium text-[#202C4B]">
                {filteredInternships.length}
              </span>{" "}
              internship{filteredInternships.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* Internships Grid */}
        {filteredInternships.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4"
          >
            {filteredInternships.map((internship, index) => (
              <motion.div
                key={internship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <InternshipCard internship={internship} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-12 border border-[#E9EDF4] text-center"
          >
            <div className="w-16 h-16 rounded-full bg-[#F4F6FA] flex items-center justify-center mx-auto mb-4">
              <Briefcase className="w-8 h-8 text-[#6A7287]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#202C4B] mb-2">
              No internships found
            </h3>
            <p className="text-[14px] text-[#6A7287] mb-6">
              {filters.search || filters.status !== "all" || filters.workMode !== "all" || filters.field
                ? "Try adjusting your filters to find more internships"
                : "Create your first internship offer to get started"}
            </p>
            <button
              onClick={() => router.push("/company/internships/createInternship")}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" />
              Create New Offer
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
