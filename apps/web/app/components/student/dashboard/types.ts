import { InternshipWithCompany } from "../../student/internships/types";

export type ApplicationStatus = "pending" | "accepted" | "rejected";

export interface Application {
  id: number;
  internship: InternshipWithCompany;
  status: ApplicationStatus;
  appliedAt: Date;
}
