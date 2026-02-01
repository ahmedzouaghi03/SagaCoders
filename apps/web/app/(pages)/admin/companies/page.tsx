"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Building2,
  Globe,
  Briefcase,
  Eye,
  Mail,
  Calendar,
} from "lucide-react";
import { mockAdminCompanies, type AdminCompany } from "@/components/admin/dashboard";

interface CompanyFilters {
  search: string;
}

export default function AdminCompaniesPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<CompanyFilters>({
    search: "",
  });

  // Filter companies
  const filteredCompanies = useMemo(() => {
    return mockAdminCompanies.filter((company) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          company.name.toLowerCase().includes(searchLower) ||
          company.email.toLowerCase().includes(searchLower) ||
          company.description?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      return true;
    });
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    const totalInternships = mockAdminCompanies.reduce(
      (sum, c) => sum + c.internshipsCount,
      0
    );
    const activeInternships = mockAdminCompanies.reduce(
      (sum, c) => sum + c.activeInternshipsCount,
      0
    );
    return {
      total: mockAdminCompanies.length,
      totalInternships,
      activeInternships,
    };
  }, []);

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
              Manage Companies
            </h1>
            <p className="text-[14px] text-[#515B73]">
              View and manage company accounts
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-6 space-y-6">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1ABE17]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#1ABE17]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Total Companies</p>
                <p className="text-[20px] font-semibold text-[#202C4B]">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E5A000]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#E5A000]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Total Internships</p>
                <p className="text-[20px] font-semibold text-[#E5A000]">
                  {stats.totalInternships}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3D5EE1]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#3D5EE1]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Active Internships</p>
                <p className="text-[20px] font-semibold text-[#3D5EE1]">
                  {stats.activeInternships}
                </p>
              </div>
            </div>
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
                placeholder="Search by company name or email..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full h-[40px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-[#E9EDF4]">
            <p className="text-[13px] text-[#6A7287]">
              Showing{" "}
              <span className="font-medium text-[#202C4B]">
                {filteredCompanies.length}
              </span>{" "}
              compan{filteredCompanies.length !== 1 ? "ies" : "y"}
            </p>
          </div>
        </motion.div>

        {/* Companies Grid */}
        {filteredCompanies.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filteredCompanies.map((company, index) => (
              <motion.div
                key={company.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.05 * index }}
                className="bg-white rounded-xl p-5 border border-[#E9EDF4] hover:border-[#3D5EE1]/30 hover:shadow-md transition-all cursor-pointer"
                style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
                onClick={() => router.push(`/admin/companies/${company.id}`)}
              >
                {/* Header */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#1ABE17] to-[#22c55e] flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {company.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[16px] font-semibold text-[#202C4B] truncate">
                      {company.name}
                    </h3>
                    <p className="text-[13px] text-[#6A7287] truncate">
                      {company.email}
                    </p>
                  </div>
                </div>

                {/* Description */}
                {company.description && (
                  <p className="text-[13px] text-[#515B73] line-clamp-2 mb-4">
                    {company.description}
                  </p>
                )}

                {/* Stats */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[13px] text-[#515B73]">
                    <Briefcase className="w-4 h-4 text-[#6A7287]" />
                    <span>
                      <span className="font-medium">{company.internshipsCount}</span>{" "}
                      internships
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[13px] text-[#1ABE17]">
                    <span className="w-2 h-2 rounded-full bg-[#1ABE17]" />
                    <span>{company.activeInternshipsCount} active</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-[#E9EDF4]">
                  <div className="flex items-center gap-2 text-[12px] text-[#6A7287]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>
                      Joined{" "}
                      {company.createdAt.toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                  {company.website && (
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1 text-[12px] text-[#3D5EE1] hover:underline"
                    >
                      <Globe className="w-3.5 h-3.5" />
                      Website
                    </a>
                  )}
                </div>
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
              <Building2 className="w-8 h-8 text-[#6A7287]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#202C4B] mb-2">
              No companies found
            </h3>
            <p className="text-[14px] text-[#6A7287]">
              Try adjusting your search to find more companies
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
