import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { Product } from "@/models/Product";
import { Category } from "@/models/Category";

export async function GET(req: Request) {
  try {
    await connectDB();

    let categories = await Category.find();

    if (categories.length === 0) {
      categories = await Category.insertMany([
        { name: "Laptops" },
        { name: "Phones" },
        { name: "Accessories" },
        { name: "Gaming" },
      ]);
    }

  
    const existingProducts = await Product.find();

    if (existingProducts.length === 0) {
      await Product.insertMany([
        {
          name: "MacBook Pro M3",
          description: "Powerful laptop for developers and designers",
          price: 2500,
          rating: 4.9,
          featured: true,
          category: categories[0]._id,
          images: ["https://picsum.photos/seed/macbook/400/300"],
        },
        {
          name: "Dell XPS 15",
          description: "Premium Windows laptop",
          price: 2200,
          rating: 4.7,
          featured: true,
          category: categories[0]._id,
          images: ["https://picsum.photos/seed/dell/400/300"],
        },
        {
          name: "iPhone 15 Pro",
          description: "Apple flagship phone",
          price: 1400,
          rating: 4.8,
          featured: true,
          category: categories[1]._id,
          images: ["https://picsum.photos/seed/iphone/400/300"],
        },
        {
          name: "Samsung S25 Ultra",
          description: "High-end Android smartphone",
          price: 1300,
          rating: 4.6,
          featured: false,
          category: categories[1]._id,
          images: ["https://picsum.photos/seed/samsung/400/300"],
        },
        {
          name: "Gaming Headset",
          description: "RGB gaming headset with surround sound",
          price: 120,
          rating: 4.2,
          featured: false,
          category: categories[3]._id,
          images: ["https://picsum.photos/seed/headset/400/300"],
        },
        {
          name: "Mechanical Keyboard",
          description: "Blue switch RGB keyboard",
          price: 90,
          rating: 4.5,
          featured: true,
          category: categories[3]._id,
          images: ["https://picsum.photos/seed/keyboard/400/300"],
        },
        {
          name: "Wireless Mouse",
          description: "Ergonomic wireless mouse",
          price: 45,
          rating: 4.1,
          featured: false,
          category: categories[2]._id,
          images: ["https://picsum.photos/seed/mouse/400/300"],
        },
        {
          name: "USB-C Hub",
          description: "Multi-port adapter",
          price: 60,
          rating: 4.0,
          featured: false,
          category: categories[2]._id,
          images: ["https://picsum.photos/seed/usbhub/400/300"],
        },
      ]);
    }

    const { searchParams } = new URL(req.url);

    const featured = searchParams.get("featured");
    const category = searchParams.get("category");
    const query = searchParams.get("query");

    const filter: any = {};

    if (featured === "true") {
      filter.featured = true;
    }

    if (category) {
      filter.category = category;
    }

    if (query) {
      filter.name = {
        $regex: query,
        $options: "i",
      };
    }

    const products = await Product.find(filter)
      .populate("category")
      .lean();

    return NextResponse.json(
      {
        success: true,
        products,
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