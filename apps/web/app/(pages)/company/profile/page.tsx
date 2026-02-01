"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Building2,
  Mail,
  Globe,
  Calendar,
  Camera,
  Edit3,
  Save,
  X,
  Key,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
  AlertCircle,
  FileText,
  Briefcase,
  Users,
} from "lucide-react";

interface CompanyProfile {
  name: string;
  email: string;
  description: string;
  website: string;
  logoUrl?: string;
  createdAt: string;
}

interface PasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface CompanyStats {
  totalInternships: number;
  activeInternships: number;
  totalApplications: number;
}

// Mock data - would come from API
const mockProfile: CompanyProfile = {
  name: "TechCorp Solutions",
  email: "contact@techcorp.com",
  description:
    "TechCorp Solutions is a leading technology company specializing in innovative software solutions. We help businesses transform their digital presence through cutting-edge applications and services.",
  website: "https://techcorp.com",
  logoUrl: undefined,
  createdAt: "2024-03-10",
};

const mockStats: CompanyStats = {
  totalInternships: 12,
  activeInternships: 4,
  totalApplications: 87,
};

export default function CompanyProfilePage() {
  const [profile, setProfile] = useState<CompanyProfile>(mockProfile);
  const [stats] = useState<CompanyStats>(mockStats);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState<CompanyProfile>(profile);
  const [isSaving, setIsSaving] = useState(false);
  const [showPasswordSection, setShowPasswordSection] = useState(false);
  const [passwordForm, setPasswordForm] = useState<PasswordForm>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordForm>>({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleEditToggle = () => {
    if (isEditing) {
      setEditForm(profile);
    }
    setIsEditing(!isEditing);
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setProfile(editForm);
    setIsEditing(false);
    setIsSaving(false);
    showSuccess("Profile updated successfully!");
  };

  const validatePassword = (): boolean => {
    const errors: Partial<PasswordForm> = {};

    if (!passwordForm.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    if (!passwordForm.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters";
    }
    if (!passwordForm.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePassword()) return;

    setIsChangingPassword(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setShowPasswordSection(false);
    setIsChangingPassword(false);
    showSuccess("Password changed successfully!");
  };

  const showSuccess = (message: string) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(null), 3000);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Success Toast */}
      {successMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-20 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-[#1ABE17] text-white rounded-lg shadow-lg"
        >
          <CheckCircle2 className="w-5 h-5" />
          {successMessage}
        </motion.div>
      )}

      {/* Page Header */}
      <div className="bg-white border-b border-[#E9EDF4]">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-[24px] font-semibold text-[#202C4B] mb-1">
              Company Profile
            </h1>
            <p className="text-[14px] text-[#515B73]">
              Manage your company information and settings
            </p>
          </motion.div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="max-w-4xl mx-auto px-6 lg:px-8 py-8 space-y-6">
        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          <div
            className="bg-white rounded-xl p-5 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center">
                <Briefcase className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Total Internships</p>
                <p className="text-[20px] font-semibold text-[#202C4B]">
                  {stats.totalInternships}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-5 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#1ABE17] to-[#22c55e] flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Active Offers</p>
                <p className="text-[20px] font-semibold text-[#202C4B]">
                  {stats.activeInternships}
                </p>
              </div>
            </div>
          </div>

          <div
            className="bg-white rounded-xl p-5 border border-[#E9EDF4]"
            style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5A000] to-[#f59e0b] flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-[12px] text-[#6A7287]">Applications</p>
                <p className="text-[20px] font-semibold text-[#202C4B]">
                  {stats.totalApplications}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className="bg-white rounded-xl border border-[#E9EDF4] overflow-hidden"
          style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
        >
          {/* Profile Header with Logo */}
          <div className="relative h-32 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF]">
            <div className="absolute -bottom-12 left-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-xl bg-white p-1 shadow-lg">
                  <div className="w-full h-full rounded-lg bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white text-3xl font-semibold">
                    {profile.logoUrl ? (
                      <img
                        src={profile.logoUrl}
                        alt={profile.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <Building2 className="w-10 h-10" />
                    )}
                  </div>
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white border border-[#E9EDF4] rounded-full flex items-center justify-center text-[#6A7287] hover:text-[#3D5EE1] hover:border-[#3D5EE1] transition-colors shadow-sm">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Edit Button */}
            <div className="absolute top-4 right-4">
              <button
                onClick={handleEditToggle}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[14px] font-medium transition-all ${
                  isEditing
                    ? "bg-white/20 text-white hover:bg-white/30"
                    : "bg-white text-[#3D5EE1] hover:shadow-md"
                }`}
              >
                {isEditing ? (
                  <>
                    <X className="w-4 h-4" />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Profile Details */}
          <div className="pt-16 px-6 pb-6">
            {isEditing ? (
              /* Edit Mode */
              <div className="space-y-5">
                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={editForm.name}
                    onChange={(e) =>
                      setEditForm({ ...editForm, name: e.target.value })
                    }
                    className="w-full h-[44px] px-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm({ ...editForm, email: e.target.value })
                    }
                    className="w-full h-[44px] px-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Website
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#6A7287]" />
                    <input
                      type="url"
                      value={editForm.website}
                      onChange={(e) =>
                        setEditForm({ ...editForm, website: e.target.value })
                      }
                      placeholder="https://example.com"
                      className="w-full h-[44px] pl-10 pr-4 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                    Description
                  </label>
                  <textarea
                    value={editForm.description}
                    onChange={(e) =>
                      setEditForm({ ...editForm, description: e.target.value })
                    }
                    placeholder="Tell students about your company..."
                    rows={4}
                    className="w-full px-4 py-3 bg-[#F8FAFC] border border-[#E9EDF4] rounded-lg text-[14px] text-[#202C4B] placeholder-[#6A7287] focus:outline-none focus:border-[#3D5EE1] transition-colors resize-none"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all disabled:opacity-70"
                  >
                    {isSaving ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
              /* View Mode */
              <div className="space-y-6">
                <div>
                  <h2 className="text-[20px] font-semibold text-[#202C4B]">
                    {profile.name}
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="px-2 py-0.5 bg-[#3D5EE1]/10 text-[#3D5EE1] text-[12px] font-medium rounded-full">
                      Company
                    </span>
                  </div>
                </div>

                {/* Description */}
                {profile.description && (
                  <div className="p-4 bg-[#F8FAFC] rounded-lg border border-[#E9EDF4]">
                    <div className="flex items-start gap-3">
                      <FileText className="w-5 h-5 text-[#6A7287] flex-shrink-0 mt-0.5" />
                      <p className="text-[14px] text-[#515B73] leading-relaxed">
                        {profile.description}
                      </p>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Email */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F4F6FA] flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-[#6A7287]" />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#6A7287] mb-0.5">
                        Email Address
                      </p>
                      <p className="text-[14px] font-medium text-[#202C4B]">
                        {profile.email}
                      </p>
                    </div>
                  </div>

                  {/* Website */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F4F6FA] flex items-center justify-center flex-shrink-0">
                      <Globe className="w-5 h-5 text-[#6A7287]" />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#6A7287] mb-0.5">
                        Website
                      </p>
                      {profile.website ? (
                        <a
                          href={profile.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[14px] font-medium text-[#3D5EE1] hover:underline"
                        >
                          {profile.website}
                        </a>
                      ) : (
                        <p className="text-[14px] text-[#6A7287]">Not provided</p>
                      )}
                    </div>
                  </div>

                  {/* Member Since */}
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#F4F6FA] flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-[#6A7287]" />
                    </div>
                    <div>
                      <p className="text-[12px] text-[#6A7287] mb-0.5">
                        Member Since
                      </p>
                      <p className="text-[14px] font-medium text-[#202C4B]">
                        {formatDate(profile.createdAt)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* Security Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
          style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E5A000] to-[#f59e0b] flex items-center justify-center">
                <Key className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-[16px] font-semibold text-[#202C4B]">
                  Security
                </h2>
                <p className="text-[13px] text-[#6A7287]">
                  Manage your password and security settings
                </p>
              </div>
            </div>

            {!showPasswordSection && (
              <button
                onClick={() => setShowPasswordSection(true)}
                className="px-4 py-2 border border-[#E9EDF4] rounded-lg text-[14px] font-medium text-[#515B73] hover:bg-[#F4F6FA] transition-colors"
              >
                Change Password
              </button>
            )}
          </div>

          {showPasswordSection && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              onSubmit={handleChangePassword}
              className="space-y-5 pt-4 border-t border-[#E9EDF4]"
            >
              {/* Current Password */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    className={`w-full h-[44px] px-4 pr-12 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                      passwordErrors.currentPassword
                        ? "border-[#E82646]"
                        : "border-[#E9EDF4]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A7287] hover:text-[#202C4B]"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.currentPassword && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.currentPassword}
                  </p>
                )}
              </div>

              {/* New Password */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    className={`w-full h-[44px] px-4 pr-12 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                      passwordErrors.newPassword
                        ? "border-[#E82646]"
                        : "border-[#E9EDF4]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A7287] hover:text-[#202C4B]"
                  >
                    {showNewPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.newPassword && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.newPassword}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-[14px] font-medium text-[#202C4B] mb-2">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordForm.confirmPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    className={`w-full h-[44px] px-4 pr-12 bg-[#F8FAFC] border rounded-lg text-[14px] text-[#202C4B] focus:outline-none focus:border-[#3D5EE1] transition-colors ${
                      passwordErrors.confirmPassword
                        ? "border-[#E82646]"
                        : "border-[#E9EDF4]"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6A7287] hover:text-[#202C4B]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                {passwordErrors.confirmPassword && (
                  <p className="mt-1 text-[12px] text-[#E82646] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    {passwordErrors.confirmPassword}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordSection(false);
                    setPasswordForm({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                    setPasswordErrors({});
                  }}
                  className="px-4 py-2 border border-[#E9EDF4] rounded-lg text-[14px] font-medium text-[#515B73] hover:bg-[#F4F6FA] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isChangingPassword}
                  className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-[#3D5EE1] to-[#5F74FF] text-white rounded-lg text-[14px] font-medium hover:shadow-lg transition-all disabled:opacity-70"
                >
                  {isChangingPassword ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Changing...
                    </>
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </motion.div>

        {/* Account Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-[#E9EDF4]"
          style={{ boxShadow: "0px 2px 8px -1px rgba(222, 222, 222, 0.3)" }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#6A7287] to-[#515B73] flex items-center justify-center">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-[16px] font-semibold text-[#202C4B]">
                Account Information
              </h2>
              <p className="text-[13px] text-[#6A7287]">
                Your account details and status
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-[#F8FAFC] rounded-lg">
              <p className="text-[12px] text-[#6A7287] mb-1">Account Status</p>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#1ABE17] rounded-full"></span>
                <span className="text-[14px] font-medium text-[#202C4B]">
                  Active
                </span>
              </div>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-lg">
              <p className="text-[12px] text-[#6A7287] mb-1">Account Type</p>
              <p className="text-[14px] font-medium text-[#202C4B]">
                Company Account
              </p>
            </div>

            <div className="p-4 bg-[#F8FAFC] rounded-lg">
              <p className="text-[12px] text-[#6A7287] mb-1">Last Login</p>
              <p className="text-[14px] font-medium text-[#202C4B]">
                {formatDate(new Date().toISOString())}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
