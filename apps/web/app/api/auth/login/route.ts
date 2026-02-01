import { NextRequest, NextResponse } from "next/server";
import { db } from "@monkeyprint/db";
import { comparePassword } from "@monkeyprint/utils/hash";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Find user by email
    const user = await db.user.findUnique({
      where: { email },
      include: {
        student: true,
        company: true,
        admin: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Check if user has a password (not OAuth user)
    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await comparePassword(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Remove sensitive data before sending to client
    const { passwordHash, passwordResetToken, passwordResetExpires, ...safeUser } = user;

    // Get role-specific data
    let roleData = null;
    if (user.role === "student" && user.student) {
      roleData = user.student;
    } else if (user.role === "company" && user.company) {
      roleData = user.company;
    } else if (user.role === "admin" && user.admin) {
      roleData = user.admin;
    }

    // Return user info
    return NextResponse.json({
      user: {
        id: safeUser.id,
        email: safeUser.email,
        role: safeUser.role,
        createdAt: safeUser.createdAt,
      },
      profile: roleData,
    });
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}