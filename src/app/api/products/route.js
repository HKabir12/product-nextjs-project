import { dbConnect } from "@/lib/dbConnect";

// GET all products
export async function GET() {
  try {
    const collection = await dbConnect("products");

    // Fetch all products with latest first, then higher price first
    const products = await collection
      .find({}, { projection: { name: 1, description: 1, price: 1, image: 1 } })
      .sort({ createdAt: -1, price: -1 }) // latest first, then higher price first
      .toArray();

    return Response.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

// POST create a new product
export async function POST(request) {
  try {
    const body = await request.json(); // Parse request body

    const { name, description, price, image } = body;

    if (!name || !description || !price) {
      return Response.json(
        { message: "Name, description and price are required" },
        { status: 400 }
      );
    }

    const collection = await dbConnect("products");

    const result = await collection.insertOne({
      name,
      description,
      price,
      image: image || null,
      createdAt: new Date(),
    });

    return Response.json(
      { message: "Product created successfully", productId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error inserting product:", error);
    return Response.json({ message: "Failed to create product" }, { status: 500 });
  }
}
