const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://plp-user:07060967334Ey8@plp-cluster.vv9ajyy.mongodb.net/?retryWrites=true&w=majority&appName=plp-cluster";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1️⃣ Find all books in a specific genre (e.g., "Self-Help")
    const selfHelpBooks = await books.find({ genre: "Self-Help" }).toArray();
    console.log("📚 Self-Help Books:", selfHelpBooks);

    // 2️⃣ Find books published after a certain year (e.g., after 2010)
    const recentBooks = await books
      .find({ published_year: { $gt: 2010 } })
      .toArray();
    console.log("📘 Books Published After 2010:", recentBooks);

    // 3️⃣ Find books by a specific author (e.g., "George Orwell")
    const orwellBooks = await books.find({ author: "George Orwell" }).toArray();
    console.log("📖 Books by George Orwell:", orwellBooks);

    // 4️⃣ Update the price of a specific book (e.g., "1984")
    const updateResult = await books.updateOne(
      { title: "1984" },
      { $set: { price: 14.99 } }
    );
    console.log("💲 Updated Book Price:", updateResult.modifiedCount);

    // 5️⃣ Delete a book by its title (e.g., "The Subtle Art of Not Giving a F*ck")
    const deleteResult = await books.deleteOne({
      title: "The Subtle Art of Not Giving a F*ck",
    });
    console.log("🗑️ Deleted Book:", deleteResult.deletedCount);
  } catch (err) {
    console.error("❌ Query failed:", err.message);
  } finally {
    await client.close();
  }
}

run();







async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1️⃣ Find books that are both in stock and published after 2010
    const recentInStock = await books
      .find({
        in_stock: true,
        published_year: { $gt: 2010 },
      })
      .toArray();
    console.log("📚 In-stock books published after 2010:", recentInStock);

    // 2️⃣ Use projection to return only title, author, and price
    const projectedBooks = await books
      .find({}, { projection: { _id: 0, title: 1, author: 1, price: 1 } })
      .toArray();
    console.log("🔍 Projected fields (title, author, price):", projectedBooks);

    // 3️⃣ Sort books by price ascending
    const sortedAsc = await books.find({}).sort({ price: 1 }).toArray();
    console.log("💵 Books sorted by price (ascending):", sortedAsc);

    // 4️⃣ Sort books by price descending
    const sortedDesc = await books.find({}).sort({ price: -1 }).toArray();
    console.log("💰 Books sorted by price (descending):", sortedDesc);

    // 5️⃣ Pagination - Get page 1 (first 5 books)
    const page1 = await books.find({}).skip(0).limit(5).toArray();
    console.log("📄 Page 1 (first 5 books):", page1);

    // 🔄 Pagination - Get page 2 (next 5 books)
    const page2 = await books.find({}).skip(5).limit(5).toArray();
    console.log("📄 Page 2 (next 5 books):", page2);
  } catch (err) {
    console.error("❌ Advanced query error:", err.message);
  } finally {
    await client.close();
  }
}

run();