"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Settings,
  LogOut,
  Bell,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

// This would come from auth context in a real app
type UserRole = "student" | "company" | "admin" | "guest";

interface GlobalHeaderProps {
  userRole?: UserRole;
  userName?: string;
  userAvatar?: string;
}

const dashboardRoutes: Record<UserRole, string> = {
  student: "/student",
  company: "/company",
  admin: "/admin",
  guest: "/",
};

// Breadcrumb labels for common routes
const breadcrumbLabels: Record<string, string> = {
  internships: "Internships",
  profile: "Profile",
  settings: "Settings",
  applications: "Applications",
  companies: "Companies",
  students: "Students",
  createInternship: "Create Offer",
  updateInternship: "Edit Offer",
};

export default function GlobalHeader({
  userRole = "student",
  userName = "John Doe",
  userAvatar,
}: GlobalHeaderProps) {
  const pathname = usePathname();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const dashboardRoute = dashboardRoutes[userRole];

  // Determine if we're on the main dashboard page
  const isOnDashboard = pathname === dashboardRoute;

  // Generate breadcrumbs from pathname
  const generateBreadcrumbs = () => {
    if (isOnDashboard || !pathname.startsWith(dashboardRoute)) return null;

    const pathParts = pathname.replace(dashboardRoute, "").split("/").filter(Boolean);
    if (pathParts.length === 0) return null;

    const breadcrumbs: { label: string; href: string }[] = [];
    let currentPath = dashboardRoute;

    pathParts.forEach((part, index) => {
      currentPath += `/${part}`;
      // Check if it's an ID (number or UUID-like)
      const isId = /^\d+$/.test(part) || part.length > 20;
      
      if (!isId) {
        const label = breadcrumbLabels[part] || part.charAt(0).toUpperCase() + part.slice(1);
        breadcrumbs.push({
          label,
          href: currentPath,
        });
      } else {
        // For IDs, show "Details" or similar
        breadcrumbs.push({
          label: "Details",
          href: currentPath,
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-[#E9EDF4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side - Logo & Navigation */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8  rounded-lg flex items-center justify-center">
              <img src="images/feee_logo.png" alt="" />
              </div>
              <span className="text-[18px] font-semibold  hidden sm:block">
                FEEE
              </span>
            </Link>

            {/* Separator */}
            {userRole !== "guest" && (
              <div className="hidden sm:block w-px h-6 bg-[#E9EDF4]" />
            )}

            {/* Dashboard Button & Breadcrumbs */}
            {userRole !== "guest" && (
              <nav className="hidden sm:flex items-center gap-1">
                {/* Dashboard Link */}
                <Link
                  href={dashboardRoute}
                  className={`flex items-center gap-1.5 px-2 py-1 rounded transition-colors text-[14px] font-medium ${
                    isOnDashboard
                      ? "text-[#3D5EE1]"
                      : "text-[#515B73] hover:text-[#3D5EE1]"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Dashboard</span>
                </Link>

                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                  <>
                    {breadcrumbs.map((crumb, index) => (
                      <div key={crumb.href} className="flex items-center">
                        <ChevronRight className="w-4 h-4 text-[#6A7287]" />
                        {index === breadcrumbs.length - 1 ? (
                          <span className="px-2 py-1 text-[14px] font-medium text-[#3D5EE1]">
                            {crumb.label}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href}
                            className="px-2 py-1 text-[14px] font-medium text-[#515B73] hover:text-[#3D5EE1] transition-colors"
                          >
                            {crumb.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </>
                )}
              </nav>
            )}
          </div>

          {/* Right Side - User Menu */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            {userRole !== "guest" && (
              <button className="relative p-2 text-[#515B73] hover:bg-[#F4F6FA] rounded-[5px] transition-colors">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#E82646] rounded-full" />
              </button>
            )}

            {/* Profile Dropdown */}
            {userRole !== "guest" ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 px-3 py-2 rounded-[5px] hover:bg-[#F4F6FA] transition-colors"
                >
                  {/* Avatar */}
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#3D5EE1] to-[#5F74FF] flex items-center justify-center text-white font-medium text-sm">
                    {userAvatar ? (
                      <img
                        src={userAvatar}
                        alt={userName}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      userName.charAt(0).toUpperCase()
                    )}
                  </div>

                  {/* Name & Role */}
                  <div className="hidden md:block text-left">
                    <p className="text-[14px] font-medium text-[#202C4B]">
                      {userName}
                    </p>
                    <p className="text-[12px] text-[#6A7287] capitalize">
                      {userRole}
                    </p>
                  </div>

                  <ChevronDown
                    className={`w-4 h-4 text-[#6A7287] transition-transform ${
                      isProfileOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <>
                    {/* Backdrop */}
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsProfileOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-[5px] border border-[#E9EDF4] shadow-lg z-20">
                      {/* User Info */}
                      <div className="px-4 py-3 border-b border-[#E9EDF4]">
                        <p className="text-[14px] font-medium text-[#202C4B]">
                          {userName}
                        </p>
                        <p className="text-[12px] text-[#6A7287] capitalize">
                          {userRole} Account
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-2">
                        <Link
                          href={`/${userRole}/profile`}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#515B73] hover:bg-[#F4F6FA] transition-colors"
                        >
                          <User className="w-4 h-4" />
                          <span className="text-[14px]">My Profile</span>
                        </Link>
                        <Link
                          href={`/${userRole}/settings`}
                          onClick={() => setIsProfileOpen(false)}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#515B73] hover:bg-[#F4F6FA] transition-colors"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-[14px]">Settings</span>
                        </Link>
                      </div>

                      {/* Logout */}
                      <div className="border-t border-[#E9EDF4] py-2">
                        <button
                          onClick={() => {
                            setIsProfileOpen(false);
                            // Handle logout
                            console.log("Logout");
                          }}
                          className="flex items-center gap-3 px-4 py-2.5 text-[#E82646] hover:bg-[#FDE9ED] w-full transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-[14px]">Log Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="px-4 py-2 text-[14px] font-medium text-[#515B73] hover:text-[#202C4B] transition-colors"
                >
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 text-[14px] font-medium text-white bg-[#3D5EE1] rounded-[5px] hover:bg-[#3351c7] transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="sm:hidden p-2 text-[#515B73] hover:bg-[#F4F6FA] rounded-[5px] transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white border-t border-[#E9EDF4]">
          <div className="px-4 py-4 space-y-2">
            {userRole !== "guest" && (
              <>
                {/* Dashboard Link */}
                <Link
                  href={dashboardRoute}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-[5px] ${
                    isOnDashboard
                      ? "text-[#3D5EE1] bg-[#F4F6FA]"
                      : "text-[#515B73]"
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="text-[14px] font-medium">Dashboard</span>
                </Link>

                {/* Breadcrumbs for Mobile */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                  <div className="flex items-center gap-1 px-4 py-2 text-[13px]">
                    {breadcrumbs.map((crumb, index) => (
                      <div key={crumb.href} className="flex items-center">
                        <ChevronRight className="w-3.5 h-3.5 text-[#6A7287]" />
                        {index === breadcrumbs.length - 1 ? (
                          <span className="px-1 font-medium text-[#3D5EE1]">
                            {crumb.label}
                          </span>
                        ) : (
                          <Link
                            href={crumb.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="px-1 text-[#515B73]"
                          >
                            {crumb.label}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
