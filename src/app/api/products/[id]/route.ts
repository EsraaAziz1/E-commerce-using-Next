import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";

export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await params; 
        const product = await Product.findById(id).populate("category").lean();

        if (!product) {
            return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, product }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
    }
}