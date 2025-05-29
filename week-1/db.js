const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://plp-user:07060967334Ey8@plp-cluster.vv9ajyy.mongodb.net/?retryWrites=true&w=majority&appName=plp-cluster";
const client = new MongoClient(uri);
async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    console.log("connect to mongoDB Atlas");
  } catch (err) {
    console.log("error connection failed: err.message");
  } finally {
    await client.close();
  }
}


run();