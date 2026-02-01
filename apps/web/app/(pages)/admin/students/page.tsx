"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Search,
  ChevronDown,
  Users,
  GraduationCap,
  Mail,
  FileText,
  Eye,
  MoreVertical,
  Calendar,
} from "lucide-react";
import { mockAdminStudents, type AdminStudent } from "@/components/admin/dashboard";

interface StudentFilters {
  search: string;
  fieldOfStudy: string;
}

export default function AdminStudentsPage() {
  const router = useRouter();
  const [filters, setFilters] = useState<StudentFilters>({
    search: "",
    fieldOfStudy: "",
  });

  // Get unique fields of study
  const fieldsOfStudy = useMemo(() => {
    const fields = mockAdminStudents
      .map((s) => s.fieldOfStudy)
      .filter((f): f is string => f !== null);
    return [...new Set(fields)];
  }, []);

  // Filter students
  const filteredStudents = useMemo(() => {
    return mockAdminStudents.filter((student) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const fullName = `${student.firstName || ""} ${student.lastName || ""}`.toLowerCase();
        const matchesSearch =
          fullName.includes(searchLower) ||
          student.email.toLowerCase().includes(searchLower) ||
          student.universityId?.toLowerCase().includes(searchLower) ||
          student.fieldOfStudy?.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }

      if (filters.fieldOfStudy && student.fieldOfStudy !== filters.fieldOfStudy) {
        return false;
      }

      return true;
    });
  }, [filters]);

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
              Manage Students
            </h1>
            <p className="text-[14px] text-[#515B73]">
              View and manage student accounts
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
              <div className="w-10 h-10 rounded-lg bg-[#3D5EE1]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#3D5EE1]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Total Students</p>
                <p className="text-[20px] font-semibold text-[#202C4B]">
                  {mockAdminStudents.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1ABE17]/10 flex items-center justify-center">
                <FileText className="w-5 h-5 text-[#1ABE17]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">With CV</p>
                <p className="text-[20px] font-semibold text-[#1ABE17]">
                  {mockAdminStudents.filter((s) => s.cvUrl).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-[#E9EDF4]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Fields of Study</p>
                <p className="text-[20px] font-semibold text-[#8b5cf6]">
                  {fieldsOfStudy.length}
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
                placeholder="Search by name, email, or university ID..."
                value={filters.search}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, search: e.target.value }))
                }
                className="w-full h-[40px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
              />
            </div>

            {/* Field of Study */}
            <div className="relative">
              <select
                value={filters.fieldOfStudy}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, fieldOfStudy: e.target.value }))
                }
                className="h-[40px] pl-3 pr-8 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] appearance-none cursor-pointer focus:outline-none focus:border-[#3D5EE1] transition-colors"
              >
                <option value="">All Fields</option>
                {fieldsOfStudy.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287] pointer-events-none" />
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 pt-4 border-t border-[#E9EDF4]">
            <p className="text-[13px] text-[#6A7287]">
              Showing{" "}
              <span className="font-medium text-[#202C4B]">
                {filteredStudents.length}
              </span>{" "}
              student{filteredStudents.length !== 1 ? "s" : ""}
            </p>
          </div>
        </motion.div>

        {/* Students Table */}
        {filteredStudents.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl border border-[#E9EDF4] overflow-hidden"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E9EDF4]">
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#6A7287] uppercase tracking-wider">
                      Student
                    </th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#6A7287] uppercase tracking-wider">
                      University ID
                    </th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#6A7287] uppercase tracking-wider">
                      Field of Study
                    </th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#6A7287] uppercase tracking-wider">
                      Applications
                    </th>
                    <th className="text-left px-6 py-4 text-[12px] font-semibold text-[#6A7287] uppercase tracking-wider">
                      Joined
                    </th>
                    <th className="text-right px-6 py-4 text-[12px] font-semibold text-[#6A7287] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E9EDF4]">
                  {filteredStudents.map((student, index) => {
                    const fullName =
                      student.firstName && student.lastName
                        ? `${student.firstName} ${student.lastName}`
                        : student.email;
                    const initials =
                      student.firstName && student.lastName
                        ? `${student.firstName.charAt(0)}${student.lastName.charAt(0)}`
                        : student.email.charAt(0).toUpperCase();

                    return (
                      <motion.tr
                        key={student.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.05 * index }}
                        className="hover:bg-[#F8FAFC] transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                              {initials}
                            </div>
                            <div>
                              <p className="text-[14px] font-medium text-[#202C4B]">
                                {fullName}
                              </p>
                              <p className="text-[12px] text-[#6A7287]">
                                {student.email}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[14px] text-[#515B73]">
                            {student.universityId || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[14px] text-[#515B73]">
                            {student.fieldOfStudy || "-"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[12px] font-medium bg-[#3D5EE1]/10 text-[#3D5EE1]">
                            {student.applicationsCount}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[14px] text-[#6A7287]">
                            {student.createdAt.toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            {student.cvUrl && (
                              <a
                                href={student.cvUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg hover:bg-[#E9EDF4] transition-colors"
                                title="View CV"
                              >
                                <FileText className="w-4 h-4 text-[#6A7287]" />
                              </a>
                            )}
                            <button
                              onClick={() =>
                                router.push(`/admin/students/${student.id}`)
                              }
                              className="p-2 rounded-lg hover:bg-[#E9EDF4] transition-colors"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4 text-[#6A7287]" />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
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
              No students found
            </h3>
            <p className="text-[14px] text-[#6A7287]">
              Try adjusting your filters to find more students
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
