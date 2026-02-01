"use server";
import { db } from '@monkeyprint/db';

type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED";

type CreateApplicationData = {
    internshipId: string;
    applicantId: string;
    applicantCv?: string;
    applicantMotivationLetter?: string;
};

export async function createApplication(data: CreateApplicationData) {
    try {
        const application = await db.application.create({
            data: {
                internshipId: data.internshipId,
                applicantId: data.applicantId,
                applicantCv: data.applicantCv,
                applicantMotivationLetter: data.applicantMotivationLetter,
                status: "PENDING",
            },
        });

        return {
            success: true,
            data: application,
            message: "Application created successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to create application",
        };
    }
}

type UpdateApplicationStatusData = {
    applicationId: string;
    status: ApplicationStatus;
};

export async function updateApplicationStatus(data: UpdateApplicationStatusData) {
    try {
        const application = await db.application.update({
            where: {
                id: data.applicationId,
            },
            data: {
                status: data.status,
                reviewedAt: new Date(),
            },
        });

        return {
            success: true,
            data: application,
            message: "Application status updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update application status",
        };
    }
}

type UpdateApplicationData = {
    applicationId: string;
    applicantCv?: string;
    applicantMotivationLetter?: string;
};

export async function updateApplication(data: UpdateApplicationData) {
    try {
        const { applicationId, ...updateData } = data;
        
        const application = await db.application.update({
            where: {
                id: applicationId,
            },
            data: updateData,
        });

        return {
            success: true,
            data: application,
            message: "Application updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update application",
        };
    }
}

export async function getApplication(applicationId: string) {
    try {
        const application = await db.application.findUnique({
            where: {
                id: applicationId,
            },
            include: {
                internship: {
                    include: {
                        company: true,
                        event: true,
                    },
                },
                applicant: {
                    include: {
                        user: true,
                    },
                },
            },
        });

        if (!application) {
            return {
                success: false,
                data: null,
                message: "Application not found",
            };
        }

        return {
            success: true,
            data: application,
            message: "Application retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve application",
        };
    }
}

type GetApplicationsFilters = {
    internshipId?: string;
    applicantId?: string;
    status?: ApplicationStatus;
};

export async function getApplications(filters?: GetApplicationsFilters) {
    try {
        const applications = await db.application.findMany({
            where: filters,
            include: {
                internship: {
                    include: {
                        company: true,
                        event: true,
                    },
                },
                applicant: {
                    include: {
                        user: true,
                    },
                },
            },
            orderBy: {
                appliedAt: 'desc',
            },
        });

        return {
            success: true,
            data: applications,
            message: "Applications retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve applications",
        };
    }
}

export async function deleteApplication(applicationId: string) {
    try {
        await db.application.delete({
            where: {
                id: applicationId,
            },
        });

        return {
            success: true,
            data: null,
            message: "Application deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to delete application",
        };
    }
}
