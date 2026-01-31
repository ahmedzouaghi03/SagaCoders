import { NextResponse } from "next/server";
import { db } from "@monkeyprint/db";
import { hashPassword } from "@monkeyprint/utils/hash";
import { adminRegisterSchema } from "@monkeyprint/utils/zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { email, password, fullName } = adminRegisterSchema.parse(body);

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password using bcrypt from utils/hash
    const hashedPassword = await hashPassword(password);

    const result = await db.$transaction(async (tx) => {
      // Create user with admin role
      const newUser = await tx.user.create({
        data: {
          email,
          passwordHash: hashedPassword,
          role: "admin",
        },
      });

      // Create admin profile linked to user
      const newAdmin = await tx.admin.create({
        data: {
          userId: newUser.id,
          fullName,
        },
      });

      return { newUser, newAdmin };
    });

    // Don't show the password hash in the response
    const { passwordHash, ...userWithoutPassword } = result.newUser;

    return NextResponse.json(
      {
        user: userWithoutPassword,
        admin: result.newAdmin,
        message: "Admin created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in POST /api/auth/register:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}