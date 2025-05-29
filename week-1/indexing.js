const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://plp-user:07060967334Ey8@plp-cluster.vv9ajyy.mongodb.net/?retryWrites=true&w=majority&appName=plp-cluster";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1️⃣ Create index on title
    const titleIndex = await books.createIndex({ title: 1 });
    console.log("📗 Created index on title:", titleIndex);

    // 2️⃣ Create compound index on author and published_year
    const compoundIndex = await books.createIndex({
      author: 1,
      published_year: -1,
    });
    console.log(
      "📘 Created compound index on author + published_year:",
      compoundIndex
    );

    // 3️⃣ Use explain() to check performance (BEFORE index, now shows index used)
    const explainResult = await books
      .find({ title: "1984" })
      .explain("executionStats");
    console.log("🔍 Query Performance (execution stats):");
    console.dir(explainResult.executionStats, { depth: null });
  } catch (err) {
    console.error("❌ Indexing error:", err.message);
  } finally {
    await client.close();
  }
}

run();
