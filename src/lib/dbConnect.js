// lib/dbConnect.js
import { MongoClient, ServerApiVersion } from "mongodb";

let cachedClient = null;
let cachedDb = null;

export async function dbConnect(collectionName) {
  if (cachedClient && cachedDb) {
    console.log("Using cached MongoDB connection");
    return cachedDb.collection(collectionName);
  }

  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    },
  });

  await client.connect();
  console.log("✅ New MongoDB connection established!");

  const db = client.db(process.env.DB_NAME);

  cachedClient = client;
  cachedDb = db;

  return db.collection(collectionName);
}
