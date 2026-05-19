import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { User } from "@/models/user";
import { auth } from "@/services/auth";

export async function GET() {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const user = await User.findOne({ email: session.user.email }).lean();
    return NextResponse.json({ user });
}

export async function PUT(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { name, image } = await req.json();
    const user = await User.findOneAndUpdate(
        { email: session.user.email },
        { name, image },
        { new: true }
    ).lean();
    return NextResponse.json({ user });
}