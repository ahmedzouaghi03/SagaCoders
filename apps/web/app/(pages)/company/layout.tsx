"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { GlobalHeader } from "@/components/layout";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [companyName, setCompanyName] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get company profile from localStorage
    const profileStr = localStorage.getItem("profile");
    const userStr = localStorage.getItem("user");

    if (!userStr) {
      router.push("/login");
      return;
    }

    try {
      const user = JSON.parse(userStr);
      
      // Check if user is a company (case-insensitive)
      const userRole = user.role?.toUpperCase();
      if (userRole !== "COMPANY") {
        router.push("/login");
        return;
      }

      // Get company name from profile (with null check)
      if (profileStr && profileStr !== "null") {
        const profile = JSON.parse(profileStr);
        setCompanyName(profile?.name || "Company");
      } else {
        setCompanyName("Company");
      }
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
      return;
    }
  }, [router]);

  // Show nothing while checking auth
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#3D5EE1]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <GlobalHeader
        userRole="company"
        userName={companyName}
      />
      <main className="pt-16">{children}</main>
    </div>
  );
}