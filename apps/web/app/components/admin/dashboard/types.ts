import { ApplicationStatus, InternshipStatus, WorkMode, UserRole } from "@monkeyprint/db";

export interface AdminInternship {
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
  company: {
    id: number;
    name: string;
    logoUrl: string | null;
  };
}

export interface AdminApplication {
  id: number;
  internship: {
    id: number;
    title: string;
    company: {
      id: number;
      name: string;
    };
  };
  applicant: {
    id: number;
    firstName: string | null;
    lastName: string | null;
    email: string;
    universityId: string | null;
    fieldOfStudy: string | null;
  };
  status: ApplicationStatus;
  appliedAt: Date;
  reviewedAt: Date | null;
}

export interface AdminStudent {
  id: number;
  firstName: string | null;
  lastName: string | null;
  email: string;
  universityId: string | null;
  fieldOfStudy: string | null;
  cvUrl: string | null;
  createdAt: Date;
  applicationsCount: number;
}

export interface AdminCompany {
  id: number;
  name: string;
  email: string;
  description: string | null;
  website: string | null;
  logoUrl: string | null;
  createdAt: Date;
  internshipsCount: number;
  activeInternshipsCount: number;
}

export interface AdminEvent {
  id: number;
  name: string;
  description: string | null;
  slogan: string | null;
  year: number;
  startDate: Date;
  endDate: Date;
  location: string | null;
  isActive: boolean;
  createdAt: Date;
  internshipsCount: number;
  companiesCount: number;
}

export interface AdminDashboardStats {
  totalStudents: number;
  totalCompanies: number;
  totalInternships: number;
  pendingInternships: number;
  totalApplications: number;
  pendingApplications: number;
  activeEvents: number;
}
