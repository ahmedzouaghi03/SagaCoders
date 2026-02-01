"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/ui/input";
import Button from "@/components/ui/Button";

export default function CompanyRegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    description: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Company name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (formData.website && !/^https?:\/\/.+\..+/.test(formData.website)) {
      newErrors.website = "Invalid website URL (must start with http:// or https://)";
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
          name: formData.name,
          description: formData.description || undefined,
          website: formData.website || undefined,
          role: "company",
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || "Registration failed" });
        return;
      }

      router.push("/company");
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const BuildingIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  );

  const EmailIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const GlobeIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
    </svg>
  );

  const PasswordIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/Auth_Company.png"
          alt="Company Registration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#4B6FFF]/70" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-start pt-12 xl:pt-16 px-12 xl:px-20">
          {/* Company Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit mb-6">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            <span className="text-white text-sm font-medium">Company Portal</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
            Find Tomorrow&apos;s<br />
            <span className="text-white/90">Top Talent Today</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Connect with ambitious students and fresh graduates. Post internships, 
            review applications, and build your future workforce with ease.
          </p>

          {/* Feature List */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Easy Job Posting</h3>
                <p className="text-white/70 text-sm">Create and manage internship listings</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Talent Pool Access</h3>
                <p className="text-white/70 text-sm">Browse qualified candidates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Direct Communication</h3>
                <p className="text-white/70 text-sm">Connect with applicants seamlessly</p>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5">
              <p className="text-white/90 italic mb-4">
                &quot;We found amazing interns through this platform. The quality of 
                candidates and ease of use exceeded our expectations.&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="text-white font-bold">TC</span>
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Tech Corp Inc.</p>
                  <p className="text-white/70 text-xs">Partner since 2024</p>
                </div>
              </div>
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
                  Please enter your company details to sign up
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Company Name"
                  name="name"
                  type="text"
                  placeholder="Acme Corporation"
                  value={formData.name}
                  onChange={handleChange}
                  error={errors.name}
                  icon={BuildingIcon}
                  variant="light"
                />

                <Input
                  label="Business Email"
                  name="email"
                  type="email"
                  placeholder="contact@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={EmailIcon}
                  variant="light"
                />

                <Input
                  label="Website (Optional)"
                  name="website"
                  type="text"
                  placeholder="https://www.company.com"
                  value={formData.website}
                  onChange={handleChange}
                  error={errors.website}
                  icon={GlobeIcon}
                  variant="light"
                />

                {/* Description Textarea */}
                <div className="w-full">
                  <label className="block text-sm font-medium text-[#202C4B] mb-1 font-roboto">
                    Company Description (Optional)
                  </label>
                  <div className="relative">
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Tell us about your company..."
                      rows={3}
                      className="w-full px-4 py-2 pr-10 bg-white border border-[#E9EDF4] rounded-md text-sm text-[#202C4B] placeholder-[#515B73] focus:outline-none focus:border-[#3D5EE1] font-roboto resize-none"
                    />
                    <svg
                      className="absolute right-3 top-3 w-4 h-4 text-[#515B73]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 6h16M4 12h16M4 18h7"
                      />
                    </svg>
                  </div>
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
                  <Link href="/company/login" className="text-[#3D5EE1] hover:underline font-medium">
                    Sign In
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-[#515B73] mt-8 font-roboto">
          Copyright © 2026 - SagaCoders
        </p>
      </div>
    </div>
  );
}