const { MongoClient } = require("mongodb");
const uri =
  "mongodb+srv://plp-user:07060967334Ey8@plp-cluster.vv9ajyy.mongodb.net/?retryWrites=true&w=majority&appName=plp-cluster";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");
    const books_sample = [
      {
        title: "the power of now",
        author: "amos loveline",
        genre: "self help",
        published_year: 2023,
        price: 2000.00,
        in_stock: true,
        pages: 500,
        publisher:"A.B juliana"

      },
  
        {
          title: "Atomic Habits",
          author: "James Clear",
          genre: "Self-Help",
          published_year: 2018,
          price: 18.99,
          in_stock: true,
          pages: 320,
          publisher: "Penguin"
        },
        {
          title: "To Kill a Mockingbird",
          author: "Harper Lee",
          genre: "Fiction",
          published_year: 1960,
          price: 10.5,
          in_stock: false,
          pages: 281,
          publisher: "J.B. Lippincott & Co."
        },
        {
          title: "1984",
          author: "George Orwell",
          genre: "Dystopian",
          published_year: 1949,
          price: 12.25,
          in_stock: true,
          pages: 328,
          publisher: "Secker & Warburg"
        },
        {
          title: "The Alchemist",
          author: "Paulo Coelho",
          genre: "Adventure",
          published_year: 1988,
          price: 11.75,
          in_stock: true,
          pages: 208,
          publisher: "HarperCollins"
        },
        {
          title: "Becoming",
          author: "Michelle Obama",
          genre: "Biography",
          published_year: 2018,
          price: 16.99,
          in_stock: false,
          pages: 426,
          publisher: "Crown Publishing Group"
        },
        {
          title: "The Great Gatsby",
          author: "F. Scott Fitzgerald",
          genre: "Classic",
          published_year: 1925,
          price: 9.75,
          in_stock: true,
          pages: 180,
          publisher: "Charles Scribner's Sons"
        },
        {
          title: "Sapiens",
          author: "Yuval Noah Harari",
          genre: "History",
          published_year: 2011,
          price: 21.5,
          in_stock: true,
          pages: 443,
          publisher: "Harvill Secker"
        },
        {
          title: "Rich Dad Poor Dad",
          author: "Robert Kiyosaki",
          genre: "Finance",
          published_year: 1997,
          price: 14.0,
          in_stock: true,
          pages: 207,
          publisher: "Plata Publishing"
        },
        {
          title: "The Subtle Art of Not Giving a F*ck",
          author: "Mark Manson",
          genre: "Self-Help",
          published_year: 2016,
          price: 13.49,
          in_stock: false,
          pages: 224,
          publisher: "Harper"
        }
      ];
  
      const result = await books.insertMany(books_sample);
      console.log(`📚 Inserted ${result.insertedCount} books`);
    } catch (err) {
      console.error("❌ Insertion failed:", err.message);
    } finally {
      await client.close();
    }
  }
  
  run();
  