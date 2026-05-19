import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Category } from "@/models/Category";

export async function GET() {
  try {
    await connectDB();

    let categories = await Category.find().lean();

    if (categories.length === 0) {
      categories = await Category.insertMany([
        { name: "Laptops" },
        { name: "Phones" },
        { name: "Accessories" },
        { name: "Gaming" },
      ]);
    }

    return NextResponse.json(
      {
        success: true,
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      {
        success: false,
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}