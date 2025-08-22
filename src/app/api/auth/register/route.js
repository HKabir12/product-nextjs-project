import { dbConnect } from "@/lib/dbConnect";
import bcrypt from "bcryptjs";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "All fields are required" }),
        { status: 400 }
      );
    }

    const collection = await dbConnect("users");

    // Check if user already exists
    const existingUser = await collection.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ success: false, message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      name,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    };

    await collection.insertOne(newUser);

    // ✅ Send success = true so frontend can redirect
    return new Response(
      JSON.stringify({ success: true, message: "User registered successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to register user" }),
      { status: 500 }
    );
  }
}
