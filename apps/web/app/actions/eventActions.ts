"use server";
import { db } from '@monkeyprint/db';

type CreateEventData = {
    name: string;
    year: number;
    description?: string;
    slogan?: string;
    invitationPdf?: string;
    formUrl?: string;
    startDate: string | Date;
    endDate: string | Date;
    location?: string;
};

export async function createEvent(data: CreateEventData) {
    try {
        const event = await db.event.create({
            data: {
                name: data.name,
                year: data.year,
                description: data.description,
                slogan: data.slogan,
                invitationPdf: data.invitationPdf,
                formUrl: data.formUrl,
                startDate: new Date(data.startDate),
                endDate: new Date(data.endDate),
                location: data.location,
            },
            include: {
                images: true,
                internships: true,
            },
        });

        return {
            success: true,
            data: event,
            message: "Event created successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to create event",
        };
    }
}

type UpdateEventData = {
    eventId: string;
    name?: string;
    description?: string;
    slogan?: string;
    year?: number;
    invitationPdf?: string;
    formUrl?: string;
    startDate?: string | Date;
    endDate?: string | Date;
    location?: string;
};

export async function updateEvent(data: UpdateEventData) {
    try {
        const { eventId, ...updateData } = data;
        
        const processedData = {
            ...updateData,
            ...(updateData.startDate && { startDate: new Date(updateData.startDate) }),
            ...(updateData.endDate && { endDate: new Date(updateData.endDate) }),
        };

        const event = await db.event.update({
            where: {
                id: eventId,
            },
            data: processedData,
            include: {
                images: true,
                internships: true,
            },
        });

        return {
            success: true,
            data: event,
            message: "Event updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update event",
        };
    }
}

type UpdateEventStatusData = {
    eventId: string;
    isActive: boolean;
};

export async function updateEventStatus(data: UpdateEventStatusData) {
    try {
        const event = await db.event.update({
            where: {
                id: data.eventId,
            },
            data: {
                isActive: data.isActive,
            },
            include: {
                images: true,
                internships: true,
            },
        });

        return {
            success: true,
            data: event,
            message: "Event status updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update event status",
        };
    }
}

export async function getEvent(eventId: string) {
    try {
        const event = await db.event.findUnique({
            where: {
                id: eventId,
            },
            include: {
                images: true,
                internships: {
                    include: {
                        company: true,
                    },
                },
            },
        });

        if (!event) {
            return {
                success: false,
                data: null,
                message: "Event not found",
            };
        }

        return {
            success: true,
            data: event,
            message: "Event retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve event",
        };
    }
}

type GetEventsFilters = {
    isActive?: boolean;
    year?: number;
};

export async function getEvents(filters?: GetEventsFilters) {
    try {
        const events = await db.event.findMany({
            where: filters,
            include: {
                images: true,
                internships: {
                    include: {
                        company: true,
                    },
                },
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            success: true,
            data: events,
            message: "Events retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve events",
        };
    }
}

export async function deleteEvent(eventId: string) {
    try {
        await db.event.delete({
            where: {
                id: eventId,
            },
        });

        return {
            success: true,
            data: null,
            message: "Event deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to delete event",
        };
    }
}
