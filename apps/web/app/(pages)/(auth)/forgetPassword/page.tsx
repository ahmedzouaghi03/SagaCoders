"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Input from "@/components/shared/Input";
import Button from "@/components/shared/Button";

export default function ForgetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/forgetPassword", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ submit: data.message || "Something went wrong" });
        return;
      }

      setIsSubmitted(true);
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

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Image Section */}
      <div className="hidden lg:block lg:w-1/2 relative">
        <Image
          src="/images/Auth_Student.png"
          alt="Forgot Password"
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
            <span className="text-white text-sm font-medium">Password Recovery</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl xl:text-5xl font-bold text-white mb-4 leading-tight">
            Forgot Your<br />
            <span className="text-white/90">Password?</span>
          </h1>

          {/* Description */}
          <p className="text-white/80 text-lg mb-8 max-w-md">
            No worries! Enter your email address and we&apos;ll send you a secure link 
            to reset your password and regain access to your account.
          </p>

          {/* Steps */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold">1</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Enter Your Email</h3>
                <p className="text-white/70 text-sm">Provide your registered email address</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold">2</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Check Your Inbox</h3>
                <p className="text-white/70 text-sm">We&apos;ll send a password reset link</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <span className="text-white font-bold">3</span>
              </div>
              <div>
                <h3 className="text-white font-semibold">Reset Password</h3>
                <p className="text-white/70 text-sm">Create a new secure password</p>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-10 pt-8 border-t border-white/20">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-white/80 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <div>
                <h3 className="text-white font-semibold">Secure Process</h3>
                <p className="text-white/70 text-sm">
                  The reset link expires in 1 hour for your security. 
                  If you didn&apos;t request this, please ignore the email.
                </p>
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
              {isSubmitted ? (
                /* Success State */
                <div className="flex flex-col items-center gap-4 py-6">
                  <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h2 className="text-xl font-bold text-[#202C4B] font-roboto mb-2">
                      Check Your Email
                    </h2>
                    <p className="text-sm text-[#515B73] font-roboto">
                      If an account with the email <strong>{email}</strong> exists, 
                      you will receive a password reset link shortly.
                    </p>
                  </div>
                  <Link 
                    href="/login" 
                    className="text-[#3D5EE1] hover:underline font-medium text-sm font-roboto"
                  >
                    Back to Sign In
                  </Link>
                </div>
              ) : (
                /* Form State */
                <>
                  {/* Header */}
                  <div className="flex flex-col gap-1">
                    <h1 className="text-2xl font-bold text-[#202C4B] font-roboto">
                      Forgot Password
                    </h1>
                    <p className="text-sm text-[#515B73] font-roboto">
                      Enter your email to receive a password reset link
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <Input
                      label="Email Address"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) {
                          setErrors((prev) => ({ ...prev, email: "" }));
                        }
                      }}
                      error={errors.email}
                      icon={EmailIcon}
                      variant="light"
                    />

                    {/* Submit Error */}
                    {errors.submit && (
                      <p className="text-sm text-red-500 text-center">{errors.submit}</p>
                    )}

                    {/* Submit Button */}
                    <Button type="submit" variant="auth" isLoading={isLoading}>
                      Send Reset Link
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