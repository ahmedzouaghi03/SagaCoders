"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Clock,
  Briefcase,
  Building2,
  Calendar,
  Globe,
  Mail,
  Phone,
  Bookmark,
  Share2,
  CheckCircle,
} from "lucide-react";
import { mockInternships } from "@/components/student/internships";

const workModeConfig = {
  on_site: {
    label: "On-site",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    dot: "bg-[#1ABE17]",
  },
  remote: {
    label: "Remote",
    bg: "bg-[#E8F9E8]",
    text: "text-[#1ABE17]",
    dot: "bg-[#1ABE17]",
  },
  hybrid: {
    label: "Hybrid",
    bg: "bg-[#FDE9ED]",
    text: "text-[#E82646]",
    dot: "bg-[#E82646]",
  },
};

export default function InternshipDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const [isSaved, setIsSaved] = useState(false);

  const internshipId = Number(params.id);
  const internship = mockInternships.find((i) => i.id === internshipId);

  if (!internship) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-[#202C4B] mb-2">
            Internship Not Found
          </h1>
          <p className="text-[#515B73] mb-4">
            The internship you're looking for doesn't exist.
          </p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-[#3D5EE1] text-white rounded-[5px] hover:bg-[#3351c7] transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const workMode = workModeConfig[internship.workMode];

  const formattedDate = new Date(internship.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "numeric",
      month: "long",
      year: "numeric",
    }
  );

  const handleApply = () => {
    alert(`Application for "${internship.title}" - Coming soon!`);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-[#515B73] hover:text-[#202C4B] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="text-[14px] font-medium">Back to Internships</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex-1"
          >
            {/* Header Card */}
            <div
              className="bg-white rounded-[5px] p-6 mb-6"
              style={{
                boxShadow: "0px 4.4px 12px -1px rgba(222, 222, 222, 0.36)",
              }}
            >
              <div className="flex items-start gap-4">
                {/* Company Logo */}
                <div className="w-16 h-16 rounded-[10px] bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-bold text-2xl shrink-0">
                  {internship.company.name.charAt(0)}
                </div>

                <div className="flex-1 min-w-0">
                  {/* ID & Badge */}
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[14px] text-[#3D5EE1] font-medium">
                      INT{String(internship.id).padStart(6, "0")}
                    </span>
                    <div
                      className={`flex items-center px-3 py-1 gap-[5px] rounded-[5px] ${workMode.bg}`}
                    >
                      <div
                        className={`w-[5px] h-[5px] rounded-full ${workMode.dot}`}
                      />
                      <span
                        className={`text-[12px] font-semibold ${workMode.text}`}
                      >
                        {workMode.label}
                      </span>
                    </div>
                  </div>

                  {/* Title */}
                  <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
                    {internship.title}
                  </h1>

                  {/* Company */}
                  <p className="text-[16px] text-[#515B73]">
                    {internship.company.name}
                  </p>
                </div>
              </div>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-[#E9EDF4]">
                {internship.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-[18px] h-[18px] text-[#6A7287]" />
                    <span className="text-[14px] text-[#202C4B]">
                      {internship.location}
                    </span>
                  </div>
                )}
                {internship.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-[18px] h-[18px] text-[#6A7287]" />
                    <span className="text-[14px] text-[#202C4B]">
                      {internship.duration}
                    </span>
                  </div>
                )}
                {internship.field && (
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-[18px] h-[18px] text-[#6A7287]" />
                    <span className="text-[14px] text-[#202C4B]">
                      {internship.field}
                    </span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-[18px] h-[18px] text-[#6A7287]" />
                  <span className="text-[14px] text-[#202C4B]">
                    Posted {formattedDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Description Card */}
            <div
              className="bg-white rounded-[5px] p-6 mb-6"
              style={{
                boxShadow: "0px 4.4px 12px -1px rgba(222, 222, 222, 0.36)",
              }}
            >
              <h2 className="text-[18px] font-semibold text-[#202C4B] mb-4">
                About the Internship
              </h2>
              <p className="text-[14px] leading-6 text-[#515B73]">
                {internship.description ||
                  "No description available for this internship."}
              </p>
            </div>

            {/* Requirements Card */}
            <div
              className="bg-white rounded-[5px] p-6 mb-6"
              style={{
                boxShadow: "0px 4.4px 12px -1px rgba(222, 222, 222, 0.36)",
              }}
            >
              <h2 className="text-[18px] font-semibold text-[#202C4B] mb-4">
                Requirements
              </h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1ABE17] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[#515B73]">
                    Currently enrolled in a relevant degree program
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1ABE17] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[#515B73]">
                    Strong communication and teamwork skills
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1ABE17] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[#515B73]">
                    Available for the full duration of the internship
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#1ABE17] shrink-0 mt-0.5" />
                  <span className="text-[14px] text-[#515B73]">
                    Passionate about learning and growing professionally
                  </span>
                </li>
              </ul>
            </div>

            {/* Company Info Card */}
            <div
              className="bg-white rounded-[5px] p-6"
              style={{
                boxShadow: "0px 4.4px 12px -1px rgba(222, 222, 222, 0.36)",
              }}
            >
              <h2 className="text-[18px] font-semibold text-[#202C4B] mb-4">
                About the Company
              </h2>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-[8px] bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-bold text-lg">
                  {internship.company.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-[16px] font-medium text-[#202C4B]">
                    {internship.company.name}
                  </h3>
                  <p className="text-[14px] text-[#515B73]">
                    Technology Company
                  </p>
                </div>
              </div>
              <p className="text-[14px] leading-6 text-[#515B73]">
                {internship.company.name} is a leading company in its field,
                committed to innovation and excellence. We provide a supportive
                environment for interns to learn and grow.
              </p>
            </div>
          </motion.div>

          {/* Right Side - Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full lg:w-[320px] shrink-0"
          >
            {/* Action Card */}
            <div
              className="bg-white rounded-[5px] p-6 sticky top-8"
              style={{
                boxShadow: "0px 4.4px 12px -1px rgba(222, 222, 222, 0.36)",
              }}
            >
              {/* Apply Button */}
              <button
                onClick={handleApply}
                className="w-full flex items-center justify-center px-6 py-3 bg-[#3D5EE1] text-white rounded-[5px] hover:bg-[#3351c7] transition-colors mb-4"
              >
                <span className="text-[14px] font-semibold">
                  Apply for this Internship
                </span>
              </button>

              {/* Secondary Actions */}
              <div className="flex gap-3 mb-6">
                <button
                  onClick={handleSave}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border rounded-[5px] transition-colors ${
                    isSaved
                      ? "bg-[#E8F9E8] border-[#1ABE17] text-[#1ABE17]"
                      : "border-[#E9EDF4] text-[#515B73] hover:bg-[#F8FAFC]"
                  }`}
                >
                  <Bookmark
                    className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`}
                  />
                  <span className="text-[13px] font-medium">
                    {isSaved ? "Saved" : "Save"}
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E9EDF4] rounded-[5px] text-[#515B73] hover:bg-[#F8FAFC] transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  <span className="text-[13px] font-medium">Share</span>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E9EDF4] mb-6" />

              {/* Contact Section */}
              <h3 className="text-[14px] font-semibold text-[#202C4B] mb-4">
                Contact Information
              </h3>

              <div className="space-y-3">
                <button className="w-full flex items-center gap-3 px-4 py-3 border border-[#E9EDF4] rounded-[5px] text-left hover:bg-[#F8FAFC] transition-colors">
                  <div className="w-9 h-9 bg-[#F4F6FA] rounded-[5px] flex items-center justify-center">
                    <Mail className="w-4 h-4 text-[#515B73]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#6A7287]">Email</p>
                    <p className="text-[13px] text-[#202C4B]">
                      contact@{internship.company.name
                        .toLowerCase()
                        .replace(/\s/g, "")}
                      .com
                    </p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-[#E9EDF4] rounded-[5px] text-left hover:bg-[#F8FAFC] transition-colors">
                  <div className="w-9 h-9 bg-[#F4F6FA] rounded-[5px] flex items-center justify-center">
                    <Phone className="w-4 h-4 text-[#515B73]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#6A7287]">Phone</p>
                    <p className="text-[13px] text-[#202C4B]">
                      +212 5XX-XXXXXX
                    </p>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 px-4 py-3 border border-[#E9EDF4] rounded-[5px] text-left hover:bg-[#F8FAFC] transition-colors">
                  <div className="w-9 h-9 bg-[#F4F6FA] rounded-[5px] flex items-center justify-center">
                    <Globe className="w-4 h-4 text-[#515B73]" />
                  </div>
                  <div>
                    <p className="text-[12px] text-[#6A7287]">Website</p>
                    <p className="text-[13px] text-[#202C4B]">
                      www.{internship.company.name
                        .toLowerCase()
                        .replace(/\s/g, "")}
                      .com
                    </p>
                  </div>
                </button>
              </div>

              {/* Divider */}
              <div className="border-t border-[#E9EDF4] my-6" />

              {/* Internship Info */}
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#6A7287]">Status</span>
                  <span className="text-[13px] font-medium text-[#1ABE17]">
                    Open
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#6A7287]">Work Mode</span>
                  <span className="text-[13px] font-medium text-[#202C4B]">
                    {workMode.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#6A7287]">Duration</span>
                  <span className="text-[13px] font-medium text-[#202C4B]">
                    {internship.duration || "—"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[13px] text-[#6A7287]">Location</span>
                  <span className="text-[13px] font-medium text-[#202C4B]">
                    {internship.location || "—"}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
