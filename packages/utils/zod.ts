// packages/utils/zod.ts
import * as z from "zod";

// Match UserRole enum from Prisma schema
export const UserRoleEnum = z.enum(["student", "company", "admin"]);

// Base user registration schema
export const registerSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must have more than 8 characters"),
  role: UserRoleEnum,
});

// Admin registration schema
export const adminRegisterSchema = registerSchema.extend({
  role: z.literal("admin"),
  fullName: z.string().min(1, "Full name is required"),
});

// Student registration schema
export const studentRegisterSchema = registerSchema.extend({
  role: z.literal("student"),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  universityId: z.string().optional(),
  fieldOfStudy: z.string().optional(),
});

// Company registration schema
export const companyRegisterSchema = registerSchema.extend({
  role: z.literal("company"),
  name: z.string().min(1, "Company name is required"),
  description: z.string().optional(),
  website: z.string().url().optional(),
});

import { object, string } from "zod";

export const signInSchema = object({
  email: string({ required_error: "Email is required" })
    .min(1, "Email is required")
    .email("Invalid email"),
  password: string({ required_error: "Password is required" })
    .min(1, "Password is required")
    .min(8, "Password must be more than 8 characters"),
});

// Internship status enum
export const InternshipStatusEnum = z.enum(["pending", "approved", "rejected", "closed"]);

// Work mode enum
export const WorkModeEnum = z.enum(["on_site", "remote", "hybrid"]);

// Application status enum
export const ApplicationStatusEnum = z.enum(["pending", "accepted", "rejected"]);

export const productUpdateSchema = z.object({
  name: z.string().min(1, "Name is required").max(255),
  description: z.string().optional(),
  price: z.number().positive("Price must be a positive number"),
  imageUrl: z.string().min(1, "Image URL is required"),
  stock: z.number().int().nonnegative().optional(),
});