"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/input";
import  Button from "@/components/shared/Button";

export default function StudentRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    universityId: "",
    fieldOfStudy: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!agreeToTerms) {
      newErrors.terms = "You must agree to the terms and privacy policy";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          firstName: formData.firstName,
          lastName: formData.lastName,
          universityId: formData.universityId || undefined,
          fieldOfStudy: formData.fieldOfStudy || undefined,
          role: "student",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || "Registration failed" });
        return;
      }

      router.push("/student");
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const UserIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );

  const EmailIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PasswordIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  const IdIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
    </svg>
  );

  const BookIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/Auth_Student.png"
          alt="Student Registration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#4B6FFF]/70" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-20">
          {/* Student Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit mb-6">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
            </svg>
            <span className="text-white text-sm font-medium">Student Portal</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
            Launch Your<br />
            <span className="text-white/90">Career Journey</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Connect with top companies, discover exciting internship opportunities, 
            and gain real-world experience to kickstart your professional career.
          </p>

          {/* Feature List */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Internship Opportunities</h3>
                <p className="text-white/70 text-sm">Access hundreds of curated positions</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Top Companies</h3>
                <p className="text-white/70 text-sm">Partner with industry leaders</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Skill Development</h3>
                <p className="text-white/70 text-sm">Learn and grow with mentorship</p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-8 mt-10 pt-8 border-t border-white/20">
            <div>
              <p className="text-3xl font-bold text-white">500+</p>
              <p className="text-white/70 text-sm">Active Internships</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">150+</p>
              <p className="text-white/70 text-sm">Partner Companies</p>
            </div>
            <div>
              <p className="text-3xl font-bold text-white">95%</p>
              <p className="text-white/70 text-sm">Placement Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[453px] flex flex-col items-center gap-10">
          {/* Logo */}
          <Image
            src="/images/feee_logo.png"
            alt="Logo"
            width={178}
            height={50}
            className="object-contain"
          />

          {/* Form Card */}
          <div className="w-full bg-white rounded-[5px] shadow-[0px_4.4px_12px_-1px_rgba(222,222,222,0.36)]">
            <div className="p-5 flex flex-col gap-4">
              {/* Header */}
              <div className="flex flex-col gap-1">
                <h1 className="text-2xl font-bold text-[#202C4B] font-roboto">
                  Register
                </h1>
                <p className="text-sm text-[#515B73] font-roboto">
                  Please enter your details to sign up
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                {/* Name Row */}
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleChange}
                    error={errors.firstName}
                    icon={UserIcon}
                    variant="light"
                  />
                  <Input
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleChange}
                    error={errors.lastName}
                    icon={UserIcon}
                    variant="light"
                  />
                </div>

                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="student@university.edu"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={EmailIcon}
                  variant="light"
                />

                {/* University ID & Field of Study Row */}
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    label="University ID (Optional)"
                    name="universityId"
                    type="text"
                    placeholder="STU-123456"
                    value={formData.universityId}
                    onChange={handleChange}
                    icon={IdIcon}
                    variant="light"
                  />
                  <Input
                    label="Field of Study (Optional)"
                    name="fieldOfStudy"
                    type="text"
                    placeholder="Computer Science"
                    value={formData.fieldOfStudy}
                    onChange={handleChange}
                    icon={BookIcon}
                    variant="light"
                  />
                </div>

                <Input
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  error={errors.password}
                  icon={PasswordIcon}
                  variant="light"
                />

                <Input
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={errors.confirmPassword}
                  icon={PasswordIcon}
                  variant="light"
                />

                {/* Terms Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                    className="w-4 h-4 rounded border-[#E9EDF4] text-[#3D5EE1] focus:ring-[#3D5EE1]"
                  />
                  <label htmlFor="terms" className="text-sm text-[#202C4B] font-roboto">
                    I Agree to{" "}
                    <Link href="/terms" className="text-[#3D5EE1] hover:underline">
                      Terms & Privacy
                    </Link>
                  </label>
                </div>
                {errors.terms && (
                  <p className="text-xs text-red-500">{errors.terms}</p>
                )}

                {/* Submit Error */}
                {errors.submit && (
                  <p className="text-sm text-red-500 text-center">{errors.submit}</p>
                )}

                {/* Submit Button */}
                <Button type="submit" variant="auth" isLoading={isLoading}>
                  Sign Up
                </Button>

                {/* Sign In Link */}
                <p className="text-center text-sm text-[#202C4B] font-roboto">
                  Already have an account?{" "}
                  <Link href="/student/login" className="text-[#3D5EE1] hover:underline font-medium">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-[#515B73] mt-8 font-roboto">
          Copyright © 2026 - Enetcom
        </p>
      </div>
    </div>
  );
}