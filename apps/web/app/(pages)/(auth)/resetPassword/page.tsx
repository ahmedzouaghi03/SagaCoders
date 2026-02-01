"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setErrors({ token: "Invalid or missing reset token" });
    }
  }, [token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token) {
      setErrors({ token: "Invalid or missing reset token" });
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/resetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || "Password reset failed" });
        return;
      }

      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        router.push("/login");
      }, 3000);
    } catch (error) {
      setErrors({ submit: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

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
          alt="Reset Password"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-white text-sm font-medium">Secure Reset</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
            Create New<br />
            <span className="text-white/90">Password</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg mb-8 max-w-md">
            Choose a strong password to protect your account. 
            Make sure it&apos;s at least 8 characters and includes a mix of letters and numbers.
          </p>

          {/* Password Tips */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-lg">Password Tips</h3>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white/90 text-sm">At least 8 characters long</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white/90 text-sm">Mix of uppercase and lowercase letters</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white/90 text-sm">Include numbers and special characters</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="text-white/90 text-sm">Avoid using personal information</p>
              </div>
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
              {errors.token ? (
                /* Invalid Token State */
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-[#202C4B] font-roboto mb-2">
                      Invalid Link
                    </h2>
                    <p className="text-sm text-[#515B73] font-roboto">
                      This password reset link is invalid or has expired. 
                      Please request a new password reset link.
                    </p>
                  </div>
                  <Link 
                    href="/forgetPassword" 
                    className="text-[#3D5EE1] hover:underline font-medium text-sm font-roboto"
                  >
                    Request New Link
                  </Link>
                </div>
              ) : isSuccess ? (
                /* Success State */
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-[#202C4B] font-roboto mb-2">
                      Password Reset Successfully
                    </h2>
                    <p className="text-sm text-[#515B73] font-roboto">
                      Your password has been updated. You will be redirected to the login page shortly.
                    </p>
                  </div>
                  <Link 
                    href="/login" 
                    className="text-[#3D5EE1] hover:underline font-medium text-sm font-roboto"
                  >
                    Go to Sign In
                  </Link>
                </div>
              ) : (
                /* Form State */
                <>
                  {/* Header */}
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-[#202C4B] font-roboto">
                      Reset Password
                    </h1>
                    <p className="text-sm text-[#515B73] font-roboto">
                      Enter your new password below
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                      label="New Password"
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
                      label="Confirm New Password"
                      name="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      error={errors.confirmPassword}
                      icon={PasswordIcon}
                      variant="light"
                    />

                    {/* Submit Error */}
                    {errors.submit && (
                      <p className="text-sm text-red-500 text-center">{errors.submit}</p>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" variant="auth" isLoading={isLoading}>
                      Reset Password
                    </Button>

                    {/* Back to Login */}
                    <p className="text-center text-sm text-[#202C4B] font-roboto">
                      Remember your password?{" "}
                      <Link href="/login" className="text-[#3D5EE1] hover:underline font-medium">
                        Sign In
                      </Link>
                    </p>
                  </form>
                </>
              )}
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

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3D5EE1]"></div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}