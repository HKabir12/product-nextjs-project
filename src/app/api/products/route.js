import { dbConnect } from "@/lib/dbConnect";

// GET all products
export async function GET() {
  try {
    const collection = await dbConnect("products");

    // Fetch all products, latest first, then higher price first
    const products = await collection
      .find({}, { projection: { name: 1, description: 1, price: 1, image: 1, isFeatured: 1, createdAt: 1 } })
      .sort({ isFeatured: -1, createdAt: -1, price: -1 }) // Featured first, latest first, higher price first
      .toArray();

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return new Response(JSON.stringify({ message: "Failed to fetch products" }), { status: 500 });
  }
}

// POST create a new product
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, description, price, image, isFeatured } = body;

    if (!name || !description || !price) {
      return new Response(JSON.stringify({ message: "Name, description and price are required" }), { status: 400 });
    }

    const collection = await dbConnect("products");

    const result = await collection.insertOne({
      name,
      description,
      price: Number(price), // ensure price is number
      image: image || null,
      isFeatured: Boolean(isFeatured) || false, // default to false
      createdAt: new Date(),
    });

    return new Response(JSON.stringify({ message: "Product created successfully", productId: result.insertedId }), { status: 201 });
  } catch (error) {
    console.error("Error inserting product:", error);
    return new Response(JSON.stringify({ message: "Failed to create product" }), { status: 500 });
  }
}
