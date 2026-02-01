"use server";

import { db, WorkMode, InternshipStatus } from "@monkeyprint/db";
import { revalidatePath } from "next/cache";
import {
    createInternship,
    updateInternship,
    getInternshipById,
    deleteInternship,
} from "./internshipActions";

// ==========================================
// TYPES
// ==========================================

type CreateInternshipInput = {
    companyId: string;
    title: string;
    description: string;
    field: string;
    duration: string;
    workMode: "on_site" | "remote" | "hybrid";
    location?: string;
    requirements?: string;
    responsibilities?: string;
    benefits?: string;
};

type UpdateInternshipInput = {
    id: string;
    title?: string;
    description?: string;
    field?: string;
    duration?: string;
    workMode?: "on_site" | "remote" | "hybrid";
    location?: string;
    requirements?: string;
    responsibilities?: string;
    benefits?: string;
};

type GetCompanyInternshipsFilters = {
    search?: string;
    workMode?: "all" | "on_site" | "remote" | "hybrid";
    status?: "all" | "pending" | "approved" | "rejected" | "closed";
    field?: string;
};

// ==========================================
// HELPER FUNCTIONS
// ==========================================

function mapWorkModeToDb(workMode: "on_site" | "remote" | "hybrid"): "ON_SITE" | "REMOTE" | "HYBRID" {
    const mapping: Record<string, "ON_SITE" | "REMOTE" | "HYBRID"> = {
        on_site: "ON_SITE",
        remote: "REMOTE",
        hybrid: "HYBRID",
    };
    return mapping[workMode] || "HYBRID";
}

function mapWorkModeFromDb(workMode: WorkMode): "on_site" | "remote" | "hybrid" {
    const mapping: Record<WorkMode, "on_site" | "remote" | "hybrid"> = {
        ON_SITE: "on_site",
        REMOTE: "remote",
        HYBRID: "hybrid",
    };
    return mapping[workMode] || "hybrid";
}

function mapStatusToDb(status: string): InternshipStatus | undefined {
    const mapping: Record<string, InternshipStatus> = {
        pending: "PENDING",
        approved: "APPROVED",
        rejected: "REJECTED",
        closed: "CLOSED",
    };
    return mapping[status];
}

function mapStatusFromDb(status: InternshipStatus): "pending" | "approved" | "rejected" | "closed" {
    const mapping: Record<InternshipStatus, "pending" | "approved" | "rejected" | "closed"> = {
        PENDING: "pending",
        APPROVED: "approved",
        REJECTED: "rejected",
        CLOSED: "closed",
    };
    return mapping[status] || "pending";
}

// ==========================================
// GET ACTIVE EVENT
// ==========================================

export async function getActiveEvent() {
    try {
        const activeEvent = await db.event.findFirst({
            where: {
                isActive: true,
            },
            select: {
                id: true,
                name: true,
                year: true,
            },
        });

        if (!activeEvent) {
            return {
                success: false,
                data: null,
                message: "No active event found",
            };
        }

        return {
            success: true,
            data: activeEvent,
            message: "Active event retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to get active event",
        };
    }
}

// ==========================================
// CREATE INTERNSHIP (uses internshipActions.createInternship)
// ==========================================

export async function createCompanyInternship(data: CreateInternshipInput) {
    try {
        // Get the active event
        const activeEventResult = await getActiveEvent();
        if (!activeEventResult.success || !activeEventResult.data) {
            return {
                success: false,
                data: null,
                message: "No active event found. Cannot create internship.",
            };
        }

        // Use the createInternship function from internshipActions
        const result = await createInternship({
            companyId: data.companyId,
            eventId: activeEventResult.data.id,
            title: data.title,
            workMode: mapWorkModeToDb(data.workMode),
            description: data.description,
            field: data.field,
            duration: data.duration,
            location: data.location,
            requirements: data.requirements,
            responsibilities: data.responsibilities,
            benefits: data.benefits,
        });

        if (!result.success) {
            return result;
        }

        revalidatePath("/company/internships");

        return {
            success: true,
            data: result.data ? {
                ...result.data,
                workMode: mapWorkModeFromDb(result.data.workMode),
                status: mapStatusFromDb(result.data.status),
            } : null,
            message: "Internship created successfully. Awaiting admin approval.",
        };
    } catch (error) {
        console.error("Error creating internship:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to create internship",
        };
    }
}

// ==========================================
// UPDATE INTERNSHIP (uses internshipActions.updateInternship)
// ==========================================

export async function updateCompanyInternship(data: UpdateInternshipInput) {
    try {
        // Build update data for internshipActions
        const updateData: {
            internshipId: string;
            title?: string;
            description?: string;
            field?: string;
            duration?: string;
            workMode?: "ON_SITE" | "REMOTE" | "HYBRID";
            location?: string;
            requirements?: string;
            responsibilities?: string;
            benefits?: string;
        } = {
            internshipId: data.id,
        };

        if (data.title !== undefined) updateData.title = data.title;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.field !== undefined) updateData.field = data.field;
        if (data.duration !== undefined) updateData.duration = data.duration;
        if (data.workMode !== undefined) updateData.workMode = mapWorkModeToDb(data.workMode);
        if (data.location !== undefined) updateData.location = data.location;
        if (data.requirements !== undefined) updateData.requirements = data.requirements;
        if (data.responsibilities !== undefined) updateData.responsibilities = data.responsibilities;
        if (data.benefits !== undefined) updateData.benefits = data.benefits;

        // Use the updateInternship function from internshipActions
        const result = await updateInternship(updateData);

        if (!result.success) {
            return result;
        }

        revalidatePath("/company/internships");
        revalidatePath(`/company/internships/${data.id}`);

        return {
            success: true,
            data: result.data ? {
                ...result.data,
                workMode: mapWorkModeFromDb(result.data.workMode),
                status: mapStatusFromDb(result.data.status),
            } : null,
            message: "Internship updated successfully",
        };
    } catch (error) {
        console.error("Error updating internship:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update internship",
        };
    }
}

// ==========================================
// GET SINGLE INTERNSHIP (uses internshipActions.getInternshipById)
// ==========================================

export async function getCompanyInternshipById(internshipId: string, companyId: string) {
    try {
        const result = await getInternshipById(internshipId);

        if (!result.success || !result.data) {
            return {
                success: false,
                data: null,
                message: result.message || "Internship not found",
            };
        }

        const internship = result.data;

        if (internship.companyId !== companyId) {
            return {
                success: false,
                data: null,
                message: "You don't have permission to view this internship",
            };
        }

        const [applicationsCount, pendingCount] = await Promise.all([
            db.application.count({
                where: { internshipId: internship.id },
            }),
            db.application.count({
                where: {
                    internshipId: internship.id,
                    status: "PENDING",
                },
            }),
        ]);

        return {
            success: true,
            data: {
                id: internship.id,
                title: internship.title,
                description: internship.description,
                field: internship.field,
                duration: internship.duration,
                workMode: internship.workMode,
                location: internship.location,
                status: internship.status,
                createdAt: internship.createdAt,
                requirements: internship.requirements,       // Use actual DB value
                responsibilities: internship.responsibilities, // Use actual DB value
                benefits: internship.benefits,               // Use actual DB value
                applicationsCount,
                pendingCount,
                event: internship.event,
                company: internship.company,
            },
            message: "Internship retrieved successfully",
        };
    } catch (error) {
        console.error("Error getting internship:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve internship",
        };
    }
}
// ==========================================
// GET COMPANY INTERNSHIPS (with filtering)
// ==========================================

export async function getCompanyInternships(
    companyId: string,
    filters?: GetCompanyInternshipsFilters
) {
    try {
        // Build where clause
        const whereClause: Record<string, unknown> = {
            companyId,
        };

        // Work mode filter
        if (filters?.workMode && filters.workMode !== "all") {
            whereClause.workMode = mapWorkModeToDb(filters.workMode);
        }

        // Status filter
        if (filters?.status && filters.status !== "all") {
            const dbStatus = mapStatusToDb(filters.status);
            if (dbStatus) {
                whereClause.status = dbStatus;
            }
        }

        // Field filter
        if (filters?.field) {
            whereClause.field = filters.field;
        }

        // Search filter
        let searchConditions = {};
        if (filters?.search) {
            searchConditions = {
                OR: [
                    { title: { contains: filters.search, mode: "insensitive" } },
                    { description: { contains: filters.search, mode: "insensitive" } },
                    { field: { contains: filters.search, mode: "insensitive" } },
                    { location: { contains: filters.search, mode: "insensitive" } },
                ],
            };
        }

        const internships = await db.internship.findMany({
            where: {
                ...whereClause,
                ...searchConditions,
            },
            include: {
                event: {
                    select: {
                        id: true,
                        name: true,
                    },
                },
                _count: {
                    select: {
                        applications: true,
                    },
                },
            },
            orderBy: {
                createdAt: "desc",
            },
        });

        // Get pending counts for each internship
        const internshipsWithStats = await Promise.all(
            internships.map(async (internship) => {
                const pendingCount = await db.application.count({
                    where: {
                        internshipId: internship.id,
                        status: "PENDING",
                    },
                });

                return {
                    id: internship.id,
                    title: internship.title,
                    description: internship.description,
                    field: internship.field,
                    duration: internship.duration,
                    workMode: mapWorkModeFromDb(internship.workMode),
                    location: internship.location,
                    status: mapStatusFromDb(internship.status),
                    createdAt: internship.createdAt,
                    applicationsCount: internship._count.applications,
                    pendingCount,
                    event: internship.event,
                };
            })
        );

        return {
            success: true,
            data: internshipsWithStats,
            message: "Internships retrieved successfully",
        };
    } catch (error) {
        console.error("Error getting internships:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve internships",
        };
    }
}

// ==========================================
// GET COMPANY INTERNSHIP STATS
// ==========================================

export async function getCompanyInternshipStats(companyId: string) {
    try {
        const [total, approved, pending, closed, rejected] = await Promise.all([
            db.internship.count({ where: { companyId } }),
            db.internship.count({ where: { companyId, status: "APPROVED" } }),
            db.internship.count({ where: { companyId, status: "PENDING" } }),
            db.internship.count({ where: { companyId, status: "CLOSED" } }),
            db.internship.count({ where: { companyId, status: "REJECTED" } }),
        ]);

        return {
            success: true,
            data: {
                total,
                active: approved,
                pending,
                closed,
                rejected,
            },
            message: "Stats retrieved successfully",
        };
    } catch (error) {
        console.error("Error getting stats:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve stats",
        };
    }
}

// ==========================================
// DELETE INTERNSHIP (uses internshipActions.deleteInternship)
// ==========================================

export async function deleteCompanyInternship(internshipId: string, companyId: string) {
    try {
        // Use getInternshipById to verify ownership
        const internshipResult = await getInternshipById(internshipId);

        if (!internshipResult.success || !internshipResult.data) {
            return {
                success: false,
                data: null,
                message: "Internship not found",
            };
        }

        if (internshipResult.data.companyId !== companyId) {
            return {
                success: false,
                data: null,
                message: "You don't have permission to delete this internship",
            };
        }

        // Delete all applications first (due to foreign key constraint)
        await db.application.deleteMany({
            where: { internshipId },
        });

        // Use the deleteInternship function from internshipActions
        const result = await deleteInternship(internshipId);

        if (result.success) {
            revalidatePath("/company/internships");
        }

        return result;
    } catch (error) {
        console.error("Error deleting internship:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to delete internship",
        };
    }
}

// ==========================================
// GET AVAILABLE FIELDS (for filtering)
// ==========================================

export async function getCompanyInternshipFields(companyId: string) {
    try {
        const fields = await db.internship.findMany({
            where: {
                companyId,
                field: { not: null },
            },
            select: {
                field: true,
            },
            distinct: ["field"],
        });

        const uniqueFields = fields
            .map((f) => f.field)
            .filter((f): f is string => f !== null);

        return {
            success: true,
            data: uniqueFields,
            message: "Fields retrieved successfully",
        };
    } catch (error) {
        console.error("Error getting fields:", error);
        return {
            success: false,
            data: [],
            message: error instanceof Error ? error.message : "Failed to retrieve fields",
        };
    }
}

export async function getCompanyProfile(companyId: string) {
    try {
        const company = await db.company.findUnique({
            where: { userId: companyId },
            include: {
                user: {
                    select: {
                        email: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!company) {
            return {
                success: false,
                data: null,
                message: "Company not found",
            };
        }

        return {
            success: true,
            data: {
                id: company.userId,
                name: company.name,
                email: company.user.email,
                description: company.description,
                website: company.website,
                logoUrl: company.logoUrl,
                createdAt: company.user.createdAt,
            },
            message: "Company profile retrieved successfully",
        };
    } catch (error) {
        console.error("Error getting company profile:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to get company profile",
        };
    }
}

type UpdateCompanyProfileInput = {
    companyId: string;
    name?: string;
    description?: string;
    website?: string;
    logoUrl?: string;
};

export async function updateCompanyProfile(data: UpdateCompanyProfileInput) {
    try {
        const updateData: {
            name?: string;
            description?: string;
            website?: string;
            logoUrl?: string;
        } = {};

        if (data.name !== undefined) updateData.name = data.name;
        if (data.description !== undefined) updateData.description = data.description;
        if (data.website !== undefined) updateData.website = data.website;
        if (data.logoUrl !== undefined) updateData.logoUrl = data.logoUrl;

        const company = await db.company.update({
            where: { userId: data.companyId },
            data: updateData,
            include: {
                user: {
                    select: {
                        email: true,
                        createdAt: true,
                    },
                },
            },
        });

        revalidatePath("/company/profile");

        return {
            success: true,
            data: {
                id: company.userId,
                name: company.name,
                email: company.user.email,
                description: company.description,
                website: company.website,
                logoUrl: company.logoUrl,
                createdAt: company.user.createdAt,
            },
            message: "Profile updated successfully",
        };
    } catch (error) {
        console.error("Error updating company profile:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update profile",
        };
    }
}

export async function getCompanyProfileStats(companyId: string) {
    try {
        const [totalInternships, activeInternships, totalApplications] = await Promise.all([
            db.internship.count({ where: { companyId } }),
            db.internship.count({ where: { companyId, status: "APPROVED" } }),
            db.application.count({
                where: {
                    internship: { companyId },
                },
            }),
        ]);

        return {
            success: true,
            data: {
                totalInternships,
                activeInternships,
                totalApplications,
            },
            message: "Stats retrieved successfully",
        };
    } catch (error) {
        console.error("Error getting profile stats:", error);
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to get stats",
        };
    }
}