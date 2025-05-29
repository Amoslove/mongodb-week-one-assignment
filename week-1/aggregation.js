const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://plp-user:07060967334Ey8@plp-cluster.vv9ajyy.mongodb.net/?retryWrites=true&w=majority&appName=plp-cluster";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // 1️⃣ Average price of books by genre
    const avgPriceByGenre = await books
      .aggregate([
        { $group: { _id: "$genre", avgPrice: { $avg: "$price" } } },
        { $sort: { avgPrice: -1 } },
      ])
      .toArray();
    console.log("📊 Average Price by Genre:", avgPriceByGenre);

    // 2️⃣ Author with the most books
    const topAuthor = await books
      .aggregate([
        { $group: { _id: "$author", count: { $sum: 1 } } },
        { $sort: { count: -1 } },
        { $limit: 1 },
      ])
      .toArray();
    console.log("✍️ Author with Most Books:", topAuthor);

    // 3️⃣ Group books by publication decade
    const booksByDecade = await books
      .aggregate([
        {
          $project: {
            decade: {
              $concat: [
                {
                  $substr: [
                    {
                      $subtract: [
                        "$published_year",
                        { $mod: ["$published_year", 10] },
                      ],
                    },
                    0,
                    4,
                  ],
                },
                "s",
              ],
            },
          },
        },
        {
          $group: {
            _id: "$decade",
            count: { $sum: 1 },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();
    console.log("📅 Books Grouped by Decade:", booksByDecade);
  } catch (err) {
    console.error("❌ Aggregation error:", err.message);
  } finally {
    await client.close();
  }
}

run();
