import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect("products");

    // Fetch featured products, sorted by latest
    const featuredProducts = await collection
      .find({ isFeatured: true })
      .sort({ createdAt: -1 })
      .toArray();

    return new Response(JSON.stringify(featuredProducts), { status: 200 });
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch featured products" }), { status: 500 });
  }
}
