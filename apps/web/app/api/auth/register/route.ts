import { NextResponse } from "next/server";
import { db } from "@monkeyprint/db";
import { hashPassword } from "@monkeyprint/utils/hash";
import {
  adminRegisterSchema,
  studentRegisterSchema,
  companyRegisterSchema,
} from "@monkeyprint/utils/zod";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("Request body:", body);

    const { role } = body;

    // Check if email already exists
    const existingUserByEmail = await db.user.findUnique({
      where: { email: body.email },
    });

    if (existingUserByEmail) {
      return NextResponse.json(
        { user: null, message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hashPassword(body.password);

    // Handle registration based on role
    if (role === "admin") {
      const { email, fullName } = adminRegisterSchema.parse(body);

      const result = await db.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email,
            passwordHash: hashedPassword,
            role: "ADMIN", // Changed to uppercase
          },
        });

        const newAdmin = await tx.admin.create({
          data: {
            userId: newUser.id,
            fullName,
          },
        });

        return { newUser, newAdmin };
      });

      const { passwordHash, ...userWithoutPassword } = result.newUser;

      return NextResponse.json(
        {
          user: userWithoutPassword,
          admin: result.newAdmin,
          message: "Admin created successfully",
        },
        { status: 201 }
      );
    }

    if (role === "student") {
      const { email, firstName, lastName, universityId, fieldOfStudy } =
        studentRegisterSchema.parse(body);

      const result = await db.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email,
            passwordHash: hashedPassword,
            role: "STUDENT", // Changed to uppercase
          },
        });

        const newStudent = await tx.student.create({
          data: {
            userId: newUser.id,
            firstName,
            lastName,
            universityId,
            fieldOfStudy,
          },
        });

        return { newUser, newStudent };
      });

      const { passwordHash, ...userWithoutPassword } = result.newUser;

      return NextResponse.json(
        {
          user: userWithoutPassword,
          student: result.newStudent,
          message: "Student created successfully",
        },
        { status: 201 }
      );
    }

    if (role === "company") {
      const { email, name, description, website } =
        companyRegisterSchema.parse(body);

      const result = await db.$transaction(async (tx) => {
        const newUser = await tx.user.create({
          data: {
            email,
            passwordHash: hashedPassword,
            role: "COMPANY", // Changed to uppercase
          },
        });

        const newCompany = await tx.company.create({
          data: {
            userId: newUser.id,
            name,
            description,
            website,
          },
        });

        return { newUser, newCompany };
      });

      const { passwordHash, ...userWithoutPassword } = result.newUser;

      return NextResponse.json(
        {
          user: userWithoutPassword,
          company: result.newCompany,
          message: "Company created successfully",
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { message: "Invalid role specified" },
      { status: 400 }
    );
  } catch (error) {
    console.error("Error in POST /api/auth/register:", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}