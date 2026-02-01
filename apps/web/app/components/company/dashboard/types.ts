import { ApplicationStatus, InternshipStatus, WorkMode } from "@monkeyprint/db";

export interface CompanyInternship {
  id: number;
  title: string;
  description: string | null;
  field: string | null;
  duration: string | null;
  workMode: WorkMode;
  location: string | null;
  status: InternshipStatus;
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
