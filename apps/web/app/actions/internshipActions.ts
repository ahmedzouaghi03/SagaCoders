"use server";
import { db } from '@monkeyprint/db';
import { type InternshipStatus, type WorkMode } from '@/types';

type CreateInternshipData = {
    companyId: string;
    eventId: string;
    title: string;
    workMode: WorkMode;
    description?: string;
    field?: string;
    duration?: string;
    location?: string;
};

export async function createInternship(data: CreateInternshipData) {
    try {
        const internship = await db.internship.create({
            data: {
                companyId: data.companyId,
                eventId: data.eventId,
                title: data.title,
                status: "PENDING",
                workMode: data.workMode,
                description: data.description,
                field: data.field,
                duration: data.duration,
                location: data.location,
            },
        });

        return {
            success: true,
            data: internship,
            message: "Internship created successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to create internship",
        };
    }
}

type UpdateInternshipStatusData = {
    internshipId: string;
    status: InternshipStatus;
};

export async function updateInternshipStatus(data: UpdateInternshipStatusData) {
    try {
        const internship = await db.internship.update({
            where: {
                id: data.internshipId,
            },
            data: {
                status: data.status,
            },
        });

        return {
            success: true,
            data: internship,
            message: "Internship status updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update internship status",
        };
    }
}

type UpdateInternshipData = {
    internshipId: string;
    title?: string;
    workMode?: WorkMode;
    description?: string;
    field?: string;
    duration?: string;
    location?: string;
};

export async function updateInternship(data: UpdateInternshipData) {
    try {
        const { internshipId, ...updateData } = data;
        
        const internship = await db.internship.update({
            where: {
                id: internshipId,
            },
            data: updateData,
        });

        return {
            success: true,
            data: internship,
            message: "Internship updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update internship",
        };
    }
}

export async function getInternshipById(internshipId: string) {
    try {
        const internship = await db.internship.findUnique({
            where: {
                id: internshipId,
            },
            include: {
                company: true,
                event: true,
            },
        });

        if (!internship) {
            return {
                success: false,
                data: null,
                message: "Internship not found",
            };
        }

        return {
            success: true,
            data: internship,
            message: "Internship retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve internship",
        };
    }
}

type GetInternshipsFilters = {
    companyId?: string;
    eventId?: string;
    status?: InternshipStatus;
    workMode?: WorkMode;
};

export async function getInternships(filters?: GetInternshipsFilters) {
    try {
        const internships = await db.internship.findMany({
            where: filters,
            include: {
                company: true,
                event: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            success: true,
            data: internships,
            message: "Internships retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve internships",
        };
    }
}

export async function deleteInternship(internshipId: string) {
    try {
        await db.internship.delete({
            where: {
                id: internshipId,
            },
        });

        return {
            success: true,
            data: null,
            message: "Internship deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to delete internship",
        };
    }
}
