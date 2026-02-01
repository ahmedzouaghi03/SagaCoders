"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Users,
  Building2,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  ExternalLink,
  Loader2,
} from "lucide-react";
import {
  mockAdminApplications,
  mockAdminInternships,
  applicationStatusConfig,
  type AdminApplication,
} from "@/components/admin/dashboard";

type StatusFilter = "all" | "pending" | "accepted" | "rejected";

interface ApplicationFilters {
  search: string;
  status: StatusFilter;
  internshipId: string;
  companyId: string;
}

// Extended mock data
const extendedApplications: AdminApplication[] = [
  ...mockAdminApplications,
  {
    id: 5,
    internship: {
      id: 5,
      title: "UI/UX Design Intern",
      company: { id: 5, name: "Creative Labs" },
    },
    applicant: {
      id: 105,
      firstName: "Omar",
      lastName: "Benjelloun",
      email: "omar.benjelloun@university.ma",
      universityId: "STU2024005",
      fieldOfStudy: "Mathematics",
    },
    status: "pending",
    appliedAt: new Date("2026-01-31"),
    reviewedAt: null,
  },
  {
    id: 6,
    internship: {
      id: 1,
      title: "Full Stack Developer Intern",
      company: { id: 1, name: "TechCorp" },
    },
    applicant: {
      id: 106,
      firstName: "Nadia",
      lastName: "Moussaoui",
      email: "nadia.moussaoui@university.ma",
      universityId: "STU2024006",
      fieldOfStudy: "Software Engineering",
    },
    status: "pending",
    appliedAt: new Date("2026-01-30"),
    reviewedAt: null,
  },
];

export default function AdminApplicationsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<ApplicationFilters>({
    search: "",
    status: "all",
    internshipId: "",
    companyId: "",
  });

  // Get unique companies
  const companies = useMemo(() => {
    const uniqueCompanies = extendedApplications.map((a) => a.internship.company);
    return [...new Map(uniqueCompanies.map((c) => [c.id, c])).values()];
  }, []);

  // Filter applications
  const filteredApplications = useMemo(() => {
    return extendedApplications.filter((application) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const applicantName = `${application.applicant.firstName || ""} ${application.applicant.lastName || ""}`.toLowerCase();
        const matchesSearch =
          applicantName.includes(searchLower) ||
          application.applicant.email.toLowerCase().includes(searchLower) ||
          application.applicant.fieldOfStudy?.toLowerCase().includes(searchLower) ||
          application.internship.title.toLowerCase().includes(searchLower) ||
          application.internship.company.name.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.status !== "all" && application.status !== filters.status) {
        return false;
      }

      if (
        filters.internshipId &&
        application.internship.id.toString() !== filters.internshipId
      ) {
        return false;
      }

      if (
        filters.companyId &&
        application.internship.company.id.toString() !== filters.companyId
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  // Stats
  const stats = useMemo(() => {
    return {
      total: extendedApplications.length,
      pending: extendedApplications.filter((a) => a.status === "pending").length,
      accepted: extendedApplications.filter((a) => a.status === "accepted").length,
      rejected: extendedApplications.filter((a) => a.status === "rejected").length,
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
              All Applications
            </h1>
            <p className="text-[14px] text-[#515B73]">
              View all applications across the platform
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#F4F6FA] flex items-center justify-center">
                <Users className="w-5 h-5 text-[#3D5EE1]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Total</p>
                <p className="text-[20px] font-semibold text-[#202C4B]">
                  {stats.total}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FFF8E6] flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#E5A000]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Pending</p>
                <p className="text-[20px] font-semibold text-[#E5A000]">
                  {stats.pending}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E8F9E8] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-[#1ABE17]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Accepted</p>
                <p className="text-[20px] font-semibold text-[#1ABE17]">
                  {stats.accepted}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#FDE9ED] flex items-center justify-center">
                <XCircle className="w-5 h-5 text-[#E82646]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Rejected</p>
                <p className="text-[20px] font-semibold text-[#E82646]">
                  {stats.rejected}
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
                placeholder="Search by applicant, internship, or company..."
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
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287] pointer-events-none" />
              </div>

              {/* Company */}
              <div className="relative">
                <select
                  value={filters.companyId}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, companyId: e.target.value }))
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

              {/* Internship */}
              <div className="relative">
                <select
                  value={filters.internshipId}
                  onChange={(e) =>
                    setFilters((prev) => ({ ...prev, internshipId: e.target.value }))
                  }
                  className="h-[40px] pl-3 pr-8 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] appearance-none cursor-pointer focus:outline-none focus:border-[#3D5EE1] transition-colors"
                >
                  <option value="">All Internships</option>
                  {mockAdminInternships.map((internship) => (
                    <option key={internship.id} value={internship.id.toString()}>
                      {internship.title}
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
                {filteredApplications.length}
              </span>{" "}
              application{filteredApplications.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* Applications List */}
        {filteredApplications.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="space-y-4"
          >
            {filteredApplications.map((application, index) => {
              const status = applicationStatusConfig[application.status];
              const StatusIcon = status.icon;
              const applicantName =
                application.applicant.firstName && application.applicant.lastName
                  ? `${application.applicant.firstName} ${application.applicant.lastName}`
                  : application.applicant.email;
              const initials =
                application.applicant.firstName && application.applicant.lastName
                  ? `${application.applicant.firstName.charAt(0)}${application.applicant.lastName.charAt(0)}`
                  : application.applicant.email.charAt(0).toUpperCase();

              return (
                <motion.div
                  key={application.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.05 * index }}
                  className="bg-white rounded-xl p-5 border border-[#E9EDF4] hover:border-[#3D5EE1]/30 transition-all"
                  style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {initials}
                    </div>

                    <div className="flex-1 min-w-0">
                      {/* Header Row */}
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-[16px] font-medium text-[#202C4B]">
                            {applicantName}
                          </h3>
                          <p className="text-[13px] text-[#6A7287]">
                            {application.applicant.email}
                          </p>
                        </div>

                        {/* Status Badge */}
                        <div
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full ${status.bg} shrink-0`}
                        >
                          <StatusIcon
                            className={`w-4 h-4 ${status.iconClass} ${application.status === "pending" ? "animate-spin" : ""}`}
                          />
                          <span className={`text-[12px] font-semibold ${status.text}`}>
                            {status.label}
                          </span>
                        </div>
                      </div>

                      {/* Details Row */}
                      <div className="flex flex-wrap items-center gap-4 mt-3">
                        <span className="text-[13px] text-[#515B73]">
                          <span className="font-medium">Internship:</span>{" "}
                          {application.internship.title}
                        </span>
                        <span className="text-[13px] text-[#515B73] flex items-center gap-1">
                          <Building2 className="w-3.5 h-3.5" />
                          {application.internship.company.name}
                        </span>
                        {application.applicant.fieldOfStudy && (
                          <span className="text-[13px] text-[#515B73]">
                            <span className="font-medium">Field:</span>{" "}
                            {application.applicant.fieldOfStudy}
                          </span>
                        )}
                      </div>

                      {/* Date Row */}
                      <div className="flex items-center gap-4 mt-3 text-[12px] text-[#6A7287]">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          Applied{" "}
                          {application.appliedAt.toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                        {application.reviewedAt && (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            Reviewed{" "}
                            {application.reviewedAt.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                            })}
                          </span>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-3 mt-4 pt-4 border-t border-[#E9EDF4]">
                        <button
                          onClick={() =>
                            router.push(`/admin/students/${application.applicant.id}`)
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-[#F4F6FA] text-[#515B73] rounded-lg text-[13px] font-medium hover:bg-[#E9EDF4] transition-colors"
                        >
                          <Users className="w-4 h-4" />
                          View Student
                        </button>
                        <button
                          onClick={() =>
                            router.push(
                              `/admin/internships/${application.internship.id}`
                            )
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-[#F4F6FA] text-[#515B73] rounded-lg text-[13px] font-medium hover:bg-[#E9EDF4] transition-colors"
                        >
                          <FileText className="w-4 h-4" />
                          View Internship
                        </button>
                        <button
                          onClick={() =>
                            router.push(`/admin/applications/${application.id}`)
                          }
                          className="flex items-center gap-2 px-4 py-2 bg-[#3D5EE1]/10 text-[#3D5EE1] rounded-lg text-[13px] font-medium hover:bg-[#3D5EE1]/20 transition-colors ml-auto"
                        >
                          <ExternalLink className="w-4 h-4" />
                          Full Details
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
              <Users className="w-8 h-8 text-[#6A7287]" />
            </div>
            <h3 className="text-[16px] font-medium text-[#202C4B] mb-2">
              No applications found
            </h3>
            <p className="text-[14px] text-[#6A7287]">
              Try adjusting your filters to find more applications
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
