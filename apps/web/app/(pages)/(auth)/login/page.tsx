"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.error || "Login failed" });
        return;
      }

      // Store user data in localStorage or session
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("profile", JSON.stringify(data.profile));

      // Redirect based on user role
      const role = data.user.role;
      switch (role) {
        case "STUDENT":
          router.push("/student");
          break;
        case "COMPANY":
          router.push("/company");
          break;
        case "ADMIN":
          router.push("/admin");
          break;
        default:
          router.push("/");
      }
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  const EmailIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  );

  const PasswordIcon = (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/Auth_Student.png"
          alt="Login"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-[#4B6FFF]/70" />
        
        {/* Content Overlay */}
        <div className="absolute inset-0 flex flex-col justify-center px-12 xl:px-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 w-fit mb-6">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            <span className="text-white text-sm font-medium">Welcome Back</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
            FEEE 11.0<br />
            <span className="text-white/90">Sign In Portal</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Access your account to explore internship opportunities, manage applications, 
            and connect with industry-leading companies.
          </p>

          {/* Feature List */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Students</h3>
                <p className="text-white/70 text-sm">Find your dream internship</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Companies</h3>
                <p className="text-white/70 text-sm">Discover talented candidates</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold">Administrators</h3>
                <p className="text-white/70 text-sm">Manage the platform efficiently</p>
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
              <p className="text-3xl font-bold text-white">2000+</p>
              <p className="text-white/70 text-sm">Registered Students</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form Section */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
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
                  Sign In
                </h1>
                <p className="text-sm text-[#515B73] font-roboto">
                  Enter your credentials to access your account
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  icon={EmailIcon}
                  variant="light"
                />

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

                {/* Forgot Password Link */}
                <div className="flex justify-end">
                  <Link 
                    href="/forgetPassword" 
                    className="text-sm text-[#3D5EE1] hover:underline font-roboto"
                  >
                    Forgot Password?
                  </Link>
                </div>

                {/* Submit Error */}
                {errors.submit && (
                  <p className="text-sm text-red-500 text-center">{errors.submit}</p>
                )}

                {/* Submit Button */}
                <Button type="submit" variant="auth" isLoading={isLoading}>
                  Sign In
                </Button>

                {/* Register Links */}
                <div className="text-center space-y-2">
                  <p className="text-sm text-[#515B73] font-roboto">
                    Don&apos;t have an account?
                  </p>
                  <div className="flex justify-center gap-4 text-sm font-roboto">
                    <Link href="/student/register" className="text-[#3D5EE1] hover:underline font-medium">
                      Student
                    </Link>
                    <span className="text-[#E9EDF4]">|</span>
                    <Link href="/company/register" className="text-[#3D5EE1] hover:underline font-medium">
                      Company
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-sm text-[#515B73] mt-8 font-roboto">
          Copyright © 2026 - ENETCOM
        </p>
      </div>
    </div>
  );
}