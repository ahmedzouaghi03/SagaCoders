"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  Building2,
  Calendar,
  Users,
  Edit3,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  FileText,
  Eye,
  MoreVertical,
  Loader2,
} from "lucide-react";
import {
  getCompanyInternshipById,
  deleteCompanyInternship,
} from "@/actions/companyActions";

type WorkMode = "on_site" | "remote" | "hybrid" | "ON_SITE" | "REMOTE" | "HYBRID";
type InternshipStatus = "PENDING" | "APPROVED" | "REJECTED" | "CLOSED" | "pending" | "approved" | "rejected" | "closed";

interface Internship {
  id: string;
  title: string;
  description: string | null;
  field: string | null;
  duration: string | null;
  workMode: WorkMode;
  location: string | null;
  status: InternshipStatus;
  requirements: string | null;
  responsibilities: string | null;
  benefits: string | null;
  createdAt: Date;
  applicationsCount: number;
  pendingCount: number;
}

// Normalize status to uppercase for config lookup
function normalizeStatus(status: string): "PENDING" | "APPROVED" | "REJECTED" | "CLOSED" {
  return status.toUpperCase() as "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";
}

// Normalize work mode to lowercase for label lookup
function normalizeWorkMode(workMode: string): "on_site" | "remote" | "hybrid" {
  const lower = workMode.toLowerCase();
  if (lower === "on_site" || lower === "remote" || lower === "hybrid") {
    return lower;
  }
  return "hybrid";
}

const statusConfig: Record<
  "PENDING" | "APPROVED" | "REJECTED" | "CLOSED",
  { label: string; color: string; bgColor: string; icon: typeof CheckCircle2 }
> = {
  PENDING: {
    label: "Pending Review",
    color: "#E5A000",
    bgColor: "#E5A000/10",
    icon: AlertCircle,
  },
  APPROVED: {
    label: "Approved",
    color: "#1ABE17",
    bgColor: "#1ABE17/10",
    icon: CheckCircle2,
  },
  REJECTED: {
    label: "Rejected",
    color: "#E82646",
    bgColor: "#E82646/10",
    icon: XCircle,
  },
  CLOSED: {
    label: "Closed",
    color: "#6A7287",
    bgColor: "#6A7287/10",
    icon: XCircle,
  },
};

const workModeLabels: Record<"on_site" | "remote" | "hybrid", string> = {
  on_site: "On-site",
  remote: "Remote",
  hybrid: "Hybrid",
};

export default function ViewInternshipPage() {
  const router = useRouter();
  const params = useParams();
  const [internship, setInternship] = useState<Internship | null>(null);
  const [companyId, setCompanyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showActionsMenu, setShowActionsMenu] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Get company ID from localStorage
  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        if (user.id) {
          setCompanyId(user.id);
        } else {
          router.push("/login");
        }
      } catch {
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  }, [router]);

  // Fetch internship data
  useEffect(() => {
    if (!companyId || !params.id) return;

    const fetchInternship = async () => {
      setIsLoading(true);
      setError(null);

      const result = await getCompanyInternshipById(
        params.id as string,
        companyId
      );

      if (result.success && result.data) {
        setInternship(result.data as Internship);
      } else {
        setError(result.message || "Failed to load internship");
      }

      setIsLoading(false);
    };

    fetchInternship();
  }, [params.id, companyId]);

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDelete = async () => {
    if (!companyId || !internship) return;

    setIsDeleting(true);
    const result = await deleteCompanyInternship(internship.id, companyId);

    if (result.success) {
      router.push("/company/internships");
    } else {
      setError(result.message || "Failed to delete internship");
      setIsDeleting(false);
      setShowDeleteModal(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="flex items-center gap-3">
          <Loader2 className="w-6 h-6 animate-spin text-[#3D5EE1]" />
          <span className="text-[14px] text-[#6A7287]">Loading internship...</span>
        </div>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-[20px] font-semibold text-[#202C4B] mb-2">
            {error || "Internship Not Found"}
          </h2>
          <p className="text-[14px] text-[#6A7287] mb-4">
            The internship you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.
          </p>
          <Link
            href="/company/internships"
            className="text-[14px] font-medium text-[#3D5EE1] hover:underline"
          >
            Back to Internships
          </Link>
        </div>
      </div>
    );
  }

  const normalizedStatus = normalizeStatus(internship.status);
  const normalizedWorkMode = normalizeWorkMode(internship.workMode);
  const StatusIcon = statusConfig[normalizedStatus].icon;

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 max-w-md w-full mx-4 shadow-xl"
          >
            <div className="w-12 h-12 rounded-full bg-[#E82646]/10 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 text-[#E82646]" />
            </div>
            <h3 className="text-[18px] font-semibold text-[#202C4B] text-center mb-2">
              Delete Internship?
            </h3>
            <p className="text-[14px] text-[#6A7287] text-center mb-6">
              Are you sure you want to delete this internship? This action cannot
              be undone and all applications will be lost.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 border border-[#E9EDF4] rounded-lg text-[14px] font-medium text-[#515B73] hover:bg-[#F4F6FA] transition-colors disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 px-4 py-2.5 bg-[#E82646] text-white rounded-lg text-[14px] font-medium hover:bg-[#d11f3d] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Page Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => router.push("/company/internships")}
              className="flex items-center gap-2 text-[14px] text-[#6A7287] hover:text-[#202C4B] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Internships
            </button>

            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-[24px] font-semibold text-[#202C4B]">
                    {internship.title}
                  </h1>
                  <span
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[13px] font-medium"
                    style={{
                      backgroundColor: `${statusConfig[normalizedStatus].color}15`,
                      color: statusConfig[normalizedStatus].color,
                    }}
                  >
                    <StatusIcon className="w-3.5 h-3.5" />
                    {statusConfig[normalizedStatus].label}
                  </span>
                </div>
                <p className="text-[14px] text-[#515B73]">
                  Posted on {formatDate(internship.createdAt)}
                </p>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/company/internships/updateInternship?id=${internship.id}`}
                  className="flex items-center gap-2 px-4 py-2 border border-[#E9EDF4] rounded-lg text-[14px] font-medium text-[#515B73] hover:bg-[#F4F6FA] transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setShowActionsMenu(!showActionsMenu)}
                    className="p-2 border border-[#E9EDF4] rounded-lg text-[#515B73] hover:bg-[#F4F6FA] transition-colors"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  {showActionsMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-full mt-1 w-48 bg-white rounded-lg border border-[#E9EDF4] shadow-lg py-1 z-10"
                    >
                      <Link
                        href={`/company/applications?internship=${internship.id}`}
                        className="flex items-center gap-2 px-4 py-2 text-[14px] text-[#515B73] hover:bg-[#F4F6FA]"
                      >
                        <Eye className="w-4 h-4" />
                        View Applications
                      </Link>
                      <button
                        onClick={() => {
                          setShowActionsMenu(false);
                          setShowDeleteModal(true);
                        }}
                        className="flex items-center gap-2 px-4 py-2 text-[14px] text-[#E82646] hover:bg-[#E82646]/5 w-full"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Internship
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8 space-y-6">
        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <div
            className="bg-white rounded-xl p-4 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#3D5EE1]/10 flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-[#3D5EE1]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Field</p>
                <p className="text-[14px] font-medium text-[#202C4B]">
                  {internship.field || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#1ABE17]/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-[#1ABE17]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Duration</p>
                <p className="text-[14px] font-medium text-[#202C4B]">
                  {internship.duration || "Not specified"}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#E5A000]/10 flex items-center justify-center">
                <Building2 className="w-5 h-5 text-[#E5A000]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Work Mode</p>
                <p className="text-[14px] font-medium text-[#202C4B]">
                  {workModeLabels[normalizedWorkMode]}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-4 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#8b5cf6]/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Applications</p>
                <p className="text-[14px] font-medium text-[#202C4B]">
                  {internship.applicationsCount}
                  {internship.pendingCount > 0 && (
                    <span className="text-[#E5A000] ml-1">
                      ({internship.pendingCount} pending)
                    </span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
          style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-[16px] font-semibold text-[#202C4B]">
              Description
            </h2>
          </div>
          <p className="text-[14px] text-[#515B73] leading-relaxed whitespace-pre-line">
            {internship.description || "No description provided."}
          </p>
        </motion.div>

        {/* Location */}
        {internship.location && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.15 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1ABE17] to-[#22c55e] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#202C4B]">
                Location
              </h2>
            </div>
            <p className="text-[14px] text-[#515B73]">{internship.location}</p>
          </motion.div>
        )}

        {/* Requirements */}
        {internship.requirements && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5A000] to-[#f59e0b] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#202C4B]">
                Requirements
              </h2>
            </div>
            <p className="text-[14px] text-[#515B73] leading-relaxed whitespace-pre-line">
              {internship.requirements}
            </p>
          </motion.div>
        )}

        {/* Responsibilities */}
        {internship.responsibilities && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.25 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#202C4B]">
                Responsibilities
              </h2>
            </div>
            <p className="text-[14px] text-[#515B73] leading-relaxed whitespace-pre-line">
              {internship.responsibilities}
            </p>
          </motion.div>
        )}

        {/* Benefits */}
        {internship.benefits && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#ec4899] to-[#f472b6] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-[16px] font-semibold text-[#202C4B]">
                Benefits & Perks
              </h2>
            </div>
            <p className="text-[14px] text-[#515B73] leading-relaxed whitespace-pre-line">
              {internship.benefits}
            </p>
          </motion.div>
        )}

        {/* Actions Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.35 }}
          className="flex items-center justify-between pt-4"
        >
          <Link
            href="/company/internships"
            className="text-[14px] font-medium text-[#6A7287] hover:text-[#202C4B] transition-colors"
          >
            ← Back to all internships
          </Link>
          <Link
            href={`/company/applications?internship=${internship.id}`}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all"
          >
            <Users className="w-4 h-4" />
            View Applications ({internship.applicationsCount})
          </Link>
        </motion.div>
      </div>
    </div>
  );
}