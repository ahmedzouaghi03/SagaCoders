import { NextResponse } from "next/server";
import { db } from "@monkeyprint/db";
import { hashPassword } from "@monkeyprint/utils/hash";

export async function POST(req: Request) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { message: "Token and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 8) {
            return NextResponse.json(
                { message: "Password must be at least 8 characters" },
                { status: 400 }
            );
        }

        const user = await db.user.findFirst({
            where: {
                passwordResetToken: token,
                passwordResetExpires: {
                    gt: new Date(),
                },
            },
        });

        if (!user) {
            return NextResponse.json(
                { message: "Invalid or expired token" },
                { status: 400 }
            );
        }

        const hashedPassword = await hashPassword(password);

        await db.user.update({
            where: { id: user.id },
            data: {
                passwordHash: hashedPassword,
                passwordResetToken: null,
                passwordResetExpires: null,
            },
        });

        return NextResponse.json(
            { message: "Password reset successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in POST /api/auth/resetPassword:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}