"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Clock,
  FileText,
  Building2,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

type WorkMode = "on_site" | "remote" | "hybrid";

interface InternshipFormData {
  title: string;
  description: string;
  field: string;
  duration: string;
  workMode: WorkMode;
  location: string;
  requirements: string;
  responsibilities: string;
  benefits: string;
}

const initialFormData: InternshipFormData = {
  title: "",
  description: "",
  field: "",
  duration: "",
  workMode: "hybrid",
  location: "",
  requirements: "",
  responsibilities: "",
  benefits: "",
};

const fieldOptions = [
  "Web Development",
  "Mobile Development",
  "Data Science",
  "Machine Learning",
  "DevOps",
  "Cloud Computing",
  "Cybersecurity",
  "UI/UX Design",
  "Backend Development",
  "Frontend Development",
  "Full Stack Development",
  "QA Engineering",
  "Project Management",
  "Business Analysis",
  "Marketing",
  "Other",
];

const durationOptions = [
  "1 month",
  "2 months",
  "3 months",
  "4 months",
  "5 months",
  "6 months",
  "12 months",
];

export default function CreateInternshipPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<InternshipFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof InternshipFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof InternshipFormData, string>> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }
    if (!formData.field) {
      newErrors.field = "Field is required";
    }
    if (!formData.duration) {
      newErrors.duration = "Duration is required";
    }
    if (formData.workMode !== "remote" && !formData.location.trim()) {
      newErrors.location = "Location is required for on-site and hybrid positions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Submitting internship:", formData);
    // TODO: Implement actual API call

    setIsSubmitting(false);
    router.push("/company/internships");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof InternshipFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 text-[14px] text-[#6A7287] hover:text-[#202C4B] transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Internships
            </button>
            <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
              Create New Internship Offer
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Fill in the details to post a new internship opportunity
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#202C4B]">
                  Basic Information
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  Essential details about the internship
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Title */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Internship Title <span className="text-[#E82646]">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Full Stack Developer Intern"
                  className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                    errors.title ? "border-[#E82646]" : "border-[#E9EDF4]"
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Description <span className="text-[#E82646]">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide a detailed description of the internship..."
                  rows={4}
                  className={`w-full px-4 py-3 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors resize-none ${
                    errors.description ? "border-[#E82646]" : "border-[#E9EDF4]"
                  }`}
                />
                {errors.description && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Field & Duration Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Field */}
                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Field / Domain <span className="text-[#E82646]">*</span>
                  </label>
                  <select
                    name="field"
                    value={formData.field}
                    onChange={handleChange}
                    className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors cursor-pointer ${
                      errors.field ? "border-[#E82646]" : "border-[#E9EDF4]"
                    } ${!formData.field && "text-[#6A7287]"}`}
                  >
                    <option value="">Select a field</option>
                    {fieldOptions.map((field) => (
                      <option key={field} value={field}>
                        {field}
                      </option>
                    ))}
                  </select>
                  {errors.field && (
                    <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.field}
                    </p>
                  )}
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Duration <span className="text-[#E82646]">*</span>
                  </label>
                  <select
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors cursor-pointer ${
                      errors.duration ? "border-[#E82646]" : "border-[#E9EDF4]"
                    } ${!formData.duration && "text-[#6A7287]"}`}
                  >
                    <option value="">Select duration</option>
                    {durationOptions.map((duration) => (
                      <option key={duration} value={duration}>
                        {duration}
                      </option>
                    ))}
                  </select>
                  {errors.duration && (
                    <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.duration}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Location & Work Mode */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1ABE17] to-[#22c55e] flex items-center justify-center">
                <MapPin className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#202C4B]">
                  Location & Work Mode
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  Where and how will the intern work?
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Work Mode */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-3">
                  Work Mode <span className="text-[#E82646]">*</span>
                </label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { value: "on_site", label: "On-site", icon: Building2 },
                    { value: "remote", label: "Remote", icon: MapPin },
                    { value: "hybrid", label: "Hybrid", icon: Briefcase },
                  ].map((mode) => {
                    const Icon = mode.icon;
                    const isSelected = formData.workMode === mode.value;
                    return (
                      <button
                        key={mode.value}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            workMode: mode.value as WorkMode,
                          }))
                        }
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-lg border text-[14px] font-medium transition-all ${
                          isSelected
                            ? "border-[#3D5EE1] bg-[#3D5EE1]/5 text-[#3D5EE1]"
                            : "border-[#E9EDF4] bg-white text-[#515B73] hover:border-[#3D5EE1]/50"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {mode.label}
                        {isSelected && <CheckCircle2 className="w-4 h-4 ml-1" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Location */}
              {formData.workMode !== "remote" && (
                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Location <span className="text-[#E82646]">*</span>
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., Casablanca, Morocco"
                    className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                      errors.location ? "border-[#E82646]" : "border-[#E9EDF4]"
                    }`}
                  />
                  {errors.location && (
                    <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.location}
                    </p>
                  )}
                </div>
              )}
            </div>
          </motion.div>

          {/* Additional Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5A000] to-[#f59e0b] flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#202C4B]">
                  Additional Details
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  Optional but recommended information
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Requirements */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Requirements
                </label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  placeholder="List the skills and qualifications required..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors resize-none"
                />
              </div>

              {/* Responsibilities */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Responsibilities
                </label>
                <textarea
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  placeholder="Describe the main tasks and responsibilities..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors resize-none"
                />
              </div>

              {/* Benefits */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Benefits & Perks
                </label>
                <textarea
                  name="benefits"
                  value={formData.benefits}
                  onChange={handleChange}
                  placeholder="List any benefits, perks, or learning opportunities..."
                  rows={3}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors resize-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Submit Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="flex items-center justify-between pt-4"
          >
            <p className="text-[13px] text-[#6A7287]">
              <span className="text-[#E82646]">*</span> Required fields
            </p>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => router.back()}
                className="px-6 py-2.5 border border-[#E9EDF4] rounded-lg text-[14px] font-medium text-[#515B73] hover:bg-[#F4F6FA] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4" />
                    Create Internship
                  </>
                )}
              </button>
            </div>
          </motion.div>
        </form>
      </div>
    </div>
  );
}
