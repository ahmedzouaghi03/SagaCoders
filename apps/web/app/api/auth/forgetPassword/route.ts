import { NextResponse } from "next/server";
import { db } from "@monkeyprint/db";
import { generateToken } from "@monkeyprint/utils/token";
import { sendPasswordResetEmail } from "@monkeyprint/utils/email";

export async function POST(req: Request) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { message: "Email is required" },
                { status: 400 }
            );
        }

        const user = await db.user.findUnique({
            where: { email },
        });

        if (!user) {
            // Return success even if user doesn't exist (security best practice)
            return NextResponse.json(
                { message: "If an account with this email exists, a password reset link has been sent" },
                { status: 200 }
            );
        }

        const resetToken = generateToken();
        const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

        await db.user.update({
            where: { email },
            data: {
                passwordResetToken: resetToken,
                passwordResetExpires: resetTokenExpiry,
            },
        });

        await sendPasswordResetEmail(email, resetToken);

        return NextResponse.json(
            { message: "If an account with this email exists, a password reset link has been sent" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error in POST /api/auth/forgetPassword:", error);
        return NextResponse.json(
            { message: "Something went wrong" },
            { status: 500 }
        );
    }
}