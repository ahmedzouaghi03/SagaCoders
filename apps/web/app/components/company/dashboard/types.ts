import { ApplicationStatus, InternshipStatus, WorkMode } from "@monkeyprint/db";

export interface CompanyInternship {
  id: number | string;
  title: string;
  description: string | null;
  field: string | null;
  duration: string | null;
  workMode: "ON_SITE" | "REMOTE" | "HYBRID" | "on_site" | "remote" | "hybrid";
  location: string | null;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CLOSED" | "pending" | "approved" | "rejected" | "closed";
  createdAt: Date;
  applicationsCount: number;
  pendingCount: number;
}

export interface Applicant {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  universityId: string | null;
  fieldOfStudy: string | null;
  cvUrl: string | null;
}

export interface CompanyApplication {
  id: number;
  internship: {
    id: number;
    title: string;
  };
  applicant: Applicant;
  status: ApplicationStatus;
  appliedAt: Date;
  reviewedAt: Date | null;
}

export interface DashboardStats {
  totalInternships: number;
  activeInternships: number;
  totalApplications: number;
  pendingApplications: number;
  acceptedApplications: number;
  rejectedApplications: number;
}
