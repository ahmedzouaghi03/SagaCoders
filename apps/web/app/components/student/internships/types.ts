import { InternshipStatus, WorkMode } from "@monkeyprint/db";

// Types for the internships browse page
export interface InternshipWithCompany {
  id: number;
  title: string;
  description: string | null;
  field: string | null;
  duration: string | null;
  workMode: WorkMode;
  location: string | null;
  status: InternshipStatus;
  createdAt: Date;
  company: {
    name: string;
    logoUrl: string | null;
  };
}

export interface InternshipFilters {
  search: string;
  field: string;
  workMode: WorkMode | "all";
  location: string;
}

// Static data for filters - will be fetched from database
export const fieldOptions = [
  "Software Engineering",
  "Data Science",
  "Cybersecurity",
  "Cloud Computing",
  "DevOps",
  "AI / Machine Learning",
  "Mobile Development",
  "Web Development",
  "Network Engineering",
  "Business Intelligence",
];

export const locationOptions = [
  "Rabat",
  "Casablanca",
  "Marrakech",
  "Tangier",
  "Fes",
  "Agadir",
  "Remote",
];

// Static mock data - will be replaced with database fetch
export const mockInternships: InternshipWithCompany[] = [
  {
    id: 1,
    title: "Full Stack Developer Intern",
    description: "Join our team to build modern web applications using React, Node.js, and PostgreSQL. You'll work on real projects and learn best practices in software development.",
    field: "Web Development",
    duration: "3 months",
    workMode: "hybrid",
    location: "Casablanca",
    status: "approved",
    createdAt: new Date("2026-01-15"),
    company: {
      name: "TechCorp Morocco",
      logoUrl: null,
    },
  },
  {
    id: 2,
    title: "Data Science Intern",
    description: "Work with our data team to analyze large datasets, build ML models, and create insightful dashboards for business decision-making.",
    field: "Data Science",
    duration: "6 months",
    workMode: "on_site",
    location: "Rabat",
    status: "approved",
    createdAt: new Date("2026-01-20"),
    company: {
      name: "DataDriven Solutions",
      logoUrl: null,
    },
  },
  {
    id: 3,
    title: "Cloud Engineer Intern",
    description: "Help us manage and optimize cloud infrastructure on AWS and Azure. Great opportunity to get hands-on experience with modern cloud technologies.",
    field: "Cloud Computing",
    duration: "4 months",
    workMode: "remote",
    location: "Remote",
    status: "approved",
    createdAt: new Date("2026-01-18"),
    company: {
      name: "CloudFirst",
      logoUrl: null,
    },
  },
  {
    id: 4,
    title: "Cybersecurity Analyst Intern",
    description: "Join our security team to monitor threats, conduct vulnerability assessments, and help implement security best practices.",
    field: "Cybersecurity",
    duration: "3 months",
    workMode: "on_site",
    location: "Casablanca",
    status: "approved",
    createdAt: new Date("2026-01-22"),
    company: {
      name: "SecureNet",
      logoUrl: null,
    },
  },
  {
    id: 5,
    title: "Mobile Developer Intern",
    description: "Build cross-platform mobile applications using React Native. Work closely with designers and backend developers.",
    field: "Mobile Development",
    duration: "4 months",
    workMode: "hybrid",
    location: "Marrakech",
    status: "approved",
    createdAt: new Date("2026-01-25"),
    company: {
      name: "AppFactory",
      logoUrl: null,
    },
  },
  {
    id: 6,
    title: "DevOps Engineer Intern",
    description: "Learn CI/CD pipelines, containerization with Docker, and Kubernetes orchestration in a production environment.",
    field: "DevOps",
    duration: "6 months",
    workMode: "on_site",
    location: "Rabat",
    status: "approved",
    createdAt: new Date("2026-01-28"),
    company: {
      name: "InfraScale",
      logoUrl: null,
    },
  },
];
