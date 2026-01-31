import { InternshipWithCompany } from "../internships/types";
import { Application } from "./types";

// Mock data for recently viewed internships
export const recentlyViewedInternships: InternshipWithCompany[] = [
  {
    id: 1,
    title: "Frontend Developer Intern",
    description: "Work on exciting web projects",
    field: "Web Development",
    location: "Casablanca",
    duration: "3 months",
    workMode: "hybrid",
    status: "pending",
    createdAt: new Date("2026-01-20"),
    company: {
      name: "TechCorp",
      logoUrl: null,
    },
  },
  {
    id: 2,
    title: "Data Science Intern",
    description: "Analyze large datasets",
    field: "Data Science",
    location: "Rabat",
    duration: "6 months",
    workMode: "remote",
    status: "pending",
    createdAt: new Date("2026-01-18"),
    company: {
      name: "DataFlow Inc",
      logoUrl: null,
    },
  },
  {
    id: 3,
    title: "UX Design Intern",
    description: "Design user experiences",
    field: "Web Development",
    location: "Marrakech",
    duration: "4 months",
    workMode: "on_site",
    status: "pending",
    createdAt: new Date("2026-01-15"),
    company: {
      name: "DesignHub",
      logoUrl: null,
    },
  },
];

// Mock data for applications
export const mockApplications: Application[] = [
  {
    id: 1,
    internship: {
      id: 4,
      title: "Backend Developer Intern",
      description: "Build scalable APIs",
      field: "Software Engineering",
      location: "Casablanca",
      duration: "6 months",
      workMode: "hybrid",
      status: "pending",
      createdAt: new Date("2026-01-10"),
      company: {
        name: "CloudServe",
        logoUrl: null,
      },
    },
    status: "accepted",
    appliedAt: new Date("2026-01-12"),
  },
  {
    id: 2,
    internship: {
      id: 5,
      title: "Mobile App Developer",
      description: "Develop iOS and Android apps",
      field: "Mobile Development",
      location: "Tangier",
      duration: "3 months",
      workMode: "remote",
      status: "pending",
      createdAt: new Date("2026-01-08"),
      company: {
        name: "AppWorks",
        logoUrl: null,
      },
    },
    status: "pending",
    appliedAt: new Date("2026-01-14"),
  },
  {
    id: 3,
    internship: {
      id: 6,
      title: "DevOps Engineer Intern",
      description: "Manage CI/CD pipelines",
      field: "DevOps",
      location: "Rabat",
      duration: "4 months",
      workMode: "on_site",
      status: "pending",
      createdAt: new Date("2026-01-05"),
      company: {
        name: "InfraTech",
        logoUrl: null,
      },
    },
    status: "rejected",
    appliedAt: new Date("2026-01-07"),
  },
];

// Mock data for new internships to browse
export const newInternships: InternshipWithCompany[] = [
  {
    id: 7,
    title: "AI Research Intern",
    description: "Work on cutting-edge AI projects",
    field: "AI / Machine Learning",
    location: "Casablanca",
    duration: "6 months",
    workMode: "hybrid",
    status: "pending",
    createdAt: new Date("2026-01-30"),
    company: {
      name: "AI Labs",
      logoUrl: null,
    },
  },
  {
    id: 8,
    title: "Cybersecurity Analyst Intern",
    description: "Protect digital assets",
    field: "Cybersecurity",
    location: "Rabat",
    duration: "3 months",
    workMode: "on_site",
    status: "pending",
    createdAt: new Date("2026-01-29"),
    company: {
      name: "SecureNet",
      logoUrl: null,
    },
  },
  {
    id: 9,
    title: "Product Manager Intern",
    description: "Lead product initiatives",
    field: "Business Intelligence",
    location: "Marrakech",
    duration: "4 months",
    workMode: "remote",
    status: "pending",
    createdAt: new Date("2026-01-28"),
    company: {
      name: "ProductLab",
      logoUrl: null,
    },
  },
  {
    id: 10,
    title: "Marketing Intern",
    description: "Drive growth campaigns",
    field: "Business Intelligence",
    location: "Agadir",
    duration: "3 months",
    workMode: "hybrid",
    status: "pending",
    createdAt: new Date("2026-01-27"),
    company: {
      name: "GrowthCo",
      logoUrl: null,
    },
  },
];
