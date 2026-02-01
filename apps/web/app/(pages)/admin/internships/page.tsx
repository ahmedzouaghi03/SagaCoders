"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Briefcase,
  Building2,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Filter,
} from "lucide-react";
import {
  mockAdminInternships,
  internshipStatusConfig,
  workModeConfig,
  type AdminInternship,
} from "@/components/admin/dashboard";

type StatusFilter = "all" | "pending" | "approved" | "rejected" | "closed";
type WorkModeFilter = "all" | "on_site" | "remote" | "hybrid";

interface InternshipFilters {
  search: string;
  status: StatusFilter;
  workMode: WorkModeFilter;
  company: string;
}

export default function AdminInternshipsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialStatus = (searchParams.get("status") as StatusFilter) || "all";

  const [filters, setFilters] = useState<InternshipFilters>({
    search: "",
    status: initialStatus,
    workMode: "all",
    company: "",
  });

  // Get unique companies for filter
  const companies = useMemo(() => {
    const uniqueCompanies = mockAdminInternships.map((i) => i.company);
    return [...new Map(uniqueCompanies.map((c) => [c.id, c])).values()];
  }, []);

  // Filter internships
  const filteredInternships = useMemo(() => {
    return mockAdminInternships.filter((internship) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch =
          internship.title.toLowerCase().includes(searchLower) ||
          internship.description?.toLowerCase().includes(searchLower) ||
          internship.company.name.toLowerCase().includes(searchLower) ||
          internship.field?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.status !== "all" && internship.status !== filters.status) {
        return false;
      }

      if (filters.workMode !== "all" && internship.workMode !== filters.workMode) {
        return false;
      }

      if (filters.company && internship.company.id.toString() !== filters.company) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: mockAdminInternships.length,
      pending: mockAdminInternships.filter((i) => i.status === "pending").length,
      approved: mockAdminInternships.filter((i) => i.status === "approved").length,
      rejected: mockAdminInternships.filter((i) => i.status === "rejected").length,
    };
  }, []);

  const handleApprove = (id: number) => {
    console.log("Approve internship:", id);
    // TODO: Implement approve logic
  };

  const handleReject = (id: number) => {
    console.log("Reject internship:", id);
    // TODO: Implement reject logic
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
              Manage Internships
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Review, approve, and manage all internship offers
            </p>
          </motion.div>
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
            <p className="text-[12px] text-[#6A7287] mb-1">Total</p>
            <p className="text-[24px] font-semibold text-[#202C4B]">{stats.total}</p>
          </div>
          <div
            className="bg-white rounded-lg p-4 border border-[#E9EDF4] cursor-pointer hover:border-[#E5A000]/50 transition-colors"
            onClick={() => setFilters((prev) => ({ ...prev, status: "pending" }))}
          >
            <p className="text-[12px] text-[#6A7287] mb-1">Pending</p>
            <p className="text-[24px] font-semibold text-[#E5A000]">{stats.pending}</p>
          </div>
          <div
            className="bg-white rounded-lg p-4 border border-[#E9EDF4] cursor-pointer hover:border-[#1ABE17]/50 transition-colors"
            onClick={() => setFilters((prev) => ({ ...prev, status: "approved" }))}
          >
            <p className="text-[12px] text-[#6A7287] mb-1">Approved</p>
            <p className="text-[24px] font-semibold text-[#1ABE17]">{stats.approved}</p>
          </div>
          <div
            className="bg-white rounded-lg p-4 border border-[#E9EDF4] cursor-pointer hover:border-[#E82646]/50 transition-colors"
            onClick={() => setFilters((prev) => ({ ...prev, status: "rejected" }))}
          >
            <p className="text-[12px] text-[#6A7287] mb-1">Rejected</p>
            <p className="text-[24px] font-semibold text-[#E82646]">{stats.rejected}</p>
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
                placeholder="Search by title, company, or field..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full h-[40px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="flex flex-wrap gap-3">
              {/* Status */}
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
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                  <option value="closed">Closed</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287] pointer-events-none" />
              </div>

              {/* Work Mode */}
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

              {/* Company */}
              <div className="relative">
                <select
                  value={filters.company}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, company: e.target.value }))
                  }
                  className="h-[40px] pl-3 pr-8 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] appearance-none cursor-pointer focus:outline-none focus:border-[#3D5EE1] transition-colors"
                >
                  <option value="">All Companies</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id.toString()}>
                      {company.name}
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

        {/* Internships List */}
        {filteredInternships.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredInternships.map((internship, index) => {
              const status = internshipStatusConfig[internship.status];
              const StatusIcon = status.icon;
              const workMode = workModeConfig[internship.workMode];

              return (
                <motion.div
                  key={internship.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="bg-white rounded-xl p-5 border border-[#E9EDF4] hover:border-[#3D5EE1]/30 transition-all"
                  style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
                >
                  <div className="flex items-start gap-4">
                    {/* Company Logo Placeholder */}
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-semibold text-lg shrink-0">
                      {internship.company.name.charAt(0)}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-[16px] font-medium text-[#202C4B]">
                            {internship.title}
                          </h3>
                          <div className="flex items-center gap-2 mt-1 text-[13px] text-[#6A7287]">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{internship.company.name}</span>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bg} shrink-0`}
                        >
                          <StatusIcon className={`w-4 h-4 ${status.iconClass}`} />
                          <span className={`text-[12px] font-semibold ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="flex flex-wrap items-center gap-3 mt-3 text-[13px] text-[#515B73]">
                        {internship.field && <span>{internship.field}</span>}
                        {internship.location && (
                          <>
                            <span>•</span>
                            <span>{internship.location}</span>
                          </>
                        )}
                        {internship.duration && (
                          <>
                            <span>•</span>
                            <span>{internship.duration}</span>
                          </>
                        )}
                        <span
                          className={`px-2 py-0.5 rounded text-[11px] font-medium ${workMode.bg} ${workMode.text}`}
                        >
                          {workMode.label}
                        </span>
                      </div>

                      {/* Meta Row */}
                      <div className="flex items-center gap-4 mt-3 text-[12px] text-[#6A7287]">
                        <span>
                          Created{" "}
                          {internship.createdAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        <span>•</span>
                        <span>{internship.applicationsCount} applications</span>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#E9EDF4]">
                        {internship.status === "pending" && (
                          <>
                            <button
                              onClick={() => handleApprove(internship.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-[#E8F9E8] text-[#1ABE17] rounded-lg text-[13px] font-medium hover:bg-[#d4f4d4] transition-colors"
                            >
                              <CheckCircle2 className="w-4 h-4" />
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(internship.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-[#FDE9ED] text-[#E82646] rounded-lg text-[13px] font-medium hover:bg-[#fbd5dc] transition-colors"
                            >
                              <XCircle className="w-4 h-4" />
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() =>
                            router.push(`/admin/internships/${internship.id}`)
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-[#F4F6FA] text-[#515B73] rounded-lg text-[13px] font-medium hover:bg-[#E9EDF4] transition-colors ml-auto"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
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
            <p className="text-[14px] text-[#6A7287]">
              Try adjusting your filters to find more internships
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
