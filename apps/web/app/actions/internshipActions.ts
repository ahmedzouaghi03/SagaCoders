"use server";
import { db } from '@monkeyprint/db';

type InternshipStatus = "PENDING" | "APPROVED" | "REJECTED" | "CLOSED";

type WorkMode = "REMOTE" | "ONSITE" | "HYBRID";

type CreateInternshipData = {
    companyId: number;
    eventId: number;
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
