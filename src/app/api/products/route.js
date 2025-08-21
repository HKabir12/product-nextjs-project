import { dbConnect } from "@/lib/dbConnect";

export async function GET() {
  try {
    const collection = await dbConnect("products");
    const products = await collection.find({}).toArray();

    return Response.json(products, { status: 200 });
  } catch (error) {
    console.error("Error fetching products:", error);
    return Response.json({ message: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json(); // read JSON body

    const { name, description, price } = body;

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
