//////////////////////
// SHARED ENUMS
//////////////////////

export type EventImageType = "LOGO" | "BANNER" | "GALLERY";

export type WorkMode = "ON_SITE" | "REMOTE" | "HYBRID";

export type InternshipStatus = "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";

export type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

export type UserRole = "STUDENT" | "COMPANY" | "ADMIN";

export type StudentFileType = "CV" | "MOTIVATION_LETTER" | "PROFILE_PICTURE";

//////////////////////
// GENERIC RESPONSE
//////////////////////

export type ActionResponse<T = null> = {
    success: boolean;
    data: T;
    message: string;
};
