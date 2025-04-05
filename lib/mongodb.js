import { MongoClient } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

let cachedClient = null;
let cachedDb = null;

export async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  if (!MONGODB_URI) {
    throw new Error("Please define the MONGODB_URI environment variable");
  }

  if (!MONGODB_DB) {
    throw new Error("Please define the MONGODB_DB environment variable");
  }

  const client = new MongoClient(MONGODB_URI, {
    serverApi: { version: '1' },
    tls: true,
    // Only use below in local development with self-signed certs
    // tlsAllowInvalidCertificates: true 
  });

  await client.connect();
  const db = client.db(MONGODB_DB);

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}
