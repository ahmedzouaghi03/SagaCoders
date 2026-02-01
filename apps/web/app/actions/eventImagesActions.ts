"use server";
import { db } from '@monkeyprint/db';
import { type EventImageType } from '@/types';

type CreateEventImageData = {
    eventId: string;
    imageUrl: string;
    imageType: EventImageType;
};

export async function createEventImage(data: CreateEventImageData) {
    try {
        const eventImage = await db.eventImage.create({
            data: {
                eventId: data.eventId,
                imageUrl: data.imageUrl,
                imageType: data.imageType,
            },
            include: {
                event: true,
            },
        });

        return {
            success: true,
            data: eventImage,
            message: "Event image created successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to create event image",
        };
    }
}

type UpdateEventImageData = {
    imageId: string;
    imageUrl?: string;
    imageType?: EventImageType;
};

export async function updateEventImage(data: UpdateEventImageData) {
    try {
        const { imageId, ...updateData } = data;
        
        const eventImage = await db.eventImage.update({
            where: {
                id: imageId,
            },
            data: updateData,
            include: {
                event: true,
            },
        });

        return {
            success: true,
            data: eventImage,
            message: "Event image updated successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to update event image",
        };
    }
}

export async function getEventImage(imageId: string) {
    try {
        const eventImage = await db.eventImage.findUnique({
            where: {
                id: imageId,
            },
            include: {
                event: true,
            },
        });

        if (!eventImage) {
            return {
                success: false,
                data: null,
                message: "Event image not found",
            };
        }

        return {
            success: true,
            data: eventImage,
            message: "Event image retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve event image",
        };
    }
}

type GetEventImagesFilters = {
    eventId?: string;
    imageType?: EventImageType;
};

export async function getEventImages(filters?: GetEventImagesFilters) {
    try {
        const eventImages = await db.eventImage.findMany({
            where: filters,
            include: {
                event: true,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return {
            success: true,
            data: eventImages,
            message: "Event images retrieved successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to retrieve event images",
        };
    }
}

export async function deleteEventImage(imageId: string) {
    try {
        await db.eventImage.delete({
            where: {
                id: imageId,
            },
        });

        return {
            success: true,
            data: null,
            message: "Event image deleted successfully",
        };
    } catch (error) {
        return {
            success: false,
            data: null,
            message: error instanceof Error ? error.message : "Failed to delete event image",
        };
    }
}
