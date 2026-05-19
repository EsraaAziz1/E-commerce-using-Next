import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import bcrypt from "bcryptjs";
import { signUpSchema } from "@/schema/authschema";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    // Zod Validation
    const validated = signUpSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.issues[0].message },
        { status: 400 }
      );
    }

    const { name, email, password } = validated.data;

    // Check if exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // Hash + Create
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    return NextResponse.json(
      { message: "User created successfully", userId: user._id },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}