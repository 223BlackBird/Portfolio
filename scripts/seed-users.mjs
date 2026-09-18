import { MongoClient } from "mongodb";

// Explicitly load .env.local using Node's native env loader
try {
  process.loadEnvFile(".env.local");
} catch (err) {
  console.error("Could not load .env.local file:", err.message);
  process.exit(1);
}

const uri = process.env.MONGODB_URI;
if (!uri) {
  console.error("MONGODB_URI is not set in .env.local");
  process.exit(1);
}

const SEED_USERS = [
  { name: "Alex", role: "backend", active: true },
  { name: "Sam", role: "automation", active: true },
  { name: "Jordan", role: "devops", active: false },
  { name: "Taylor", role: "backend", active: true },
];

async function seed() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    // Strictly scoped to portfolio_playground and users collection
    const db = client.db("portfolio_playground");
    const usersCollection = db.collection("users");

    // Idempotent upsert of canonical records only (no destructive collection-wide deletes)
    for (const user of SEED_USERS) {
      await usersCollection.updateOne(
        { name: user.name },
        { $set: { name: user.name, role: user.role, active: user.active } },
        { upsert: true }
      );
    }

    console.log(`[Seed] Success: ${SEED_USERS.length} demo records verified in portfolio_playground.users`);
  } catch (err) {
    console.error("[Seed] Error executing seed script:", err.message);
    process.exit(1);
  } finally {
    await client.close();
  }
}

seed();
