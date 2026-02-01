"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  FileText,
  Link as LinkIcon,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ImageIcon,
  Sparkles,
} from "lucide-react";

interface EventFormData {
  name: string;
  description: string;
  slogan: string;
  year: number;
  startDate: string;
  endDate: string;
  location: string;
  formUrl: string;
  invitationPdf: string;
  isActive: boolean;
}

const currentYear = new Date().getFullYear();

const initialFormData: EventFormData = {
  name: "",
  description: "",
  slogan: "",
  year: currentYear,
  startDate: "",
  endDate: "",
  location: "",
  formUrl: "",
  invitationPdf: "",
  isActive: false,
};

export default function CreateEventPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<EventFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof EventFormData, string>>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof EventFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Event name is required";
    }
    if (!formData.year || formData.year < 2020 || formData.year > 2100) {
      newErrors.year = "Please enter a valid year";
    }
    if (!formData.startDate) {
      newErrors.startDate = "Start date is required";
    }
    if (!formData.endDate) {
      newErrors.endDate = "End date is required";
    }
    if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
      newErrors.endDate = "End date must be after start date";
    }
    if (formData.formUrl && !isValidUrl(formData.formUrl)) {
      newErrors.formUrl = "Please enter a valid URL";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Creating event:", formData);
    // TODO: Implement actual API call

    setIsSubmitting(false);
    router.push("/admin/events");
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    
    // Clear error when user starts typing
    if (errors[name as keyof EventFormData]) {
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
              Back to Events
            </button>
            <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
              Create New Event
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Set up a new career forum event
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
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#8b5cf6] to-[#a78bfa] flex items-center justify-center">
                <Calendar className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#202C4B]">
                  Event Information
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  Basic details about the event
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Event Name */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Event Name <span className="text-[#E82646]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="e.g., Career Forum 2026"
                  className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                    errors.name ? "border-[#E82646]" : "border-[#E9EDF4]"
                  }`}
                />
                {errors.name && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Slogan */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Slogan
                </label>
                <div className="relative">
                  <Sparkles className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287]" />
                  <input
                    type="text"
                    name="slogan"
                    value={formData.slogan}
                    onChange={handleChange}
                    placeholder="e.g., Bridge to Your Future"
                    className="w-full h-[44px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe the event, its purpose, and what participants can expect..."
                  rows={4}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors resize-none"
                />
              </div>

              {/* Year */}
              <div className="max-w-[200px]">
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Year <span className="text-[#E82646]">*</span>
                </label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min={2020}
                  max={2100}
                  className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                    errors.year ? "border-[#E82646]" : "border-[#E9EDF4]"
                  }`}
                />
                {errors.year && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.year}
                  </p>
                )}
              </div>
            </div>
          </motion.div>

          {/* Date & Location */}
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
                  Date & Location
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  When and where the event takes place
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Date Range */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Start Date */}
                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Start Date <span className="text-[#E82646]">*</span>
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                      errors.startDate ? "border-[#E82646]" : "border-[#E9EDF4]"
                    }`}
                  />
                  {errors.startDate && (
                    <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.startDate}
                    </p>
                  )}
                </div>

                {/* End Date */}
                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    End Date <span className="text-[#E82646]">*</span>
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    className={`w-full h-[44px] px-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                      errors.endDate ? "border-[#E82646]" : "border-[#E9EDF4]"
                    }`}
                  />
                  {errors.endDate && (
                    <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.endDate}
                    </p>
                  )}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287]" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="e.g., ENSIAS, Rabat"
                    className="w-full h-[44px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Links & Resources */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center">
                <LinkIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#202C4B]">
                  Links & Resources
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  External links and documents
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Registration Form URL */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Registration Form URL
                </label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287]" />
                  <input
                    type="url"
                    name="formUrl"
                    value={formData.formUrl}
                    onChange={handleChange}
                    placeholder="https://forms.google.com/..."
                    className={`w-full h-[44px] pl-10 pr-4 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                      errors.formUrl ? "border-[#E82646]" : "border-[#E9EDF4]"
                    }`}
                  />
                </div>
                {errors.formUrl && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {errors.formUrl}
                  </p>
                )}
              </div>

              {/* Invitation PDF */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Invitation PDF URL
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287]" />
                  <input
                    type="url"
                    name="invitationPdf"
                    value={formData.invitationPdf}
                    onChange={handleChange}
                    placeholder="https://example.com/invitation.pdf"
                    className="w-full h-[44px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Settings */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5A000] to-[#f59e0b] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#202C4B]">
                  Event Settings
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  Configure event visibility
                </p>
              </div>
            </div>

            {/* Active Toggle */}
            <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-lg border border-[#E9EDF4]">
              <div>
                <h4 className="text-[14px] font-medium text-[#202C4B]">
                  Make Event Active
                </h4>
                <p className="text-[13px] text-[#6A7287] mt-0.5">
                  Active events are visible to students and companies
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleChange}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-[#E9EDF4] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1ABE17]"></div>
              </label>
            </div>

            {formData.isActive && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 p-4 bg-[#FFF8E6] rounded-lg border border-[#E5A000]/20"
              >
                <p className="text-[13px] text-[#E5A000] flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  <span>
                    <strong>Note:</strong> Only one event can be active at a time.
                    Activating this event will deactivate any currently active event.
                  </span>
                </p>
              </motion.div>
            )}
          </motion.div>

          {/* Submit Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.5 }}
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
                    Create Event
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
