import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Order } from "@/models/Order";
import { User } from "@/models/user";
import { Product } from "@/models/Product";
import { auth } from "@/services/auth";

export async function GET() {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const user = await User.findOne({ email: session.user.email }).lean() as any;
    const orders = await Order.find({ user: user._id })
        .populate("items.product")
        .sort({ createdAt: -1 })
        .lean();
    return NextResponse.json({ orders });
}

export async function POST(req: Request) {
    const session = await auth();
    if (!session?.user?.email) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    await connectDB();
    const { items, total } = await req.json();
    const user = await User.findOne({ email: session.user.email }).lean() as any;
    const order = await Order.create({ user: user._id, items, total });
    return NextResponse.json({ order }, { status: 201 });
}