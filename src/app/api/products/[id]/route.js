import { dbConnect } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";

export async function GET(req, { params }) {
  try {
    const { id } = params;
    const collection = await dbConnect("products");
    const product = await collection.findOne({ _id: new ObjectId(id) });

    if (!product) {
      return new Response(JSON.stringify({ message: "Product not found" }), { status: 404 });
    }

    return new Response(JSON.stringify(product), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching product:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch product" }), { status: 500 });
  }
}
