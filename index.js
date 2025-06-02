const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.USER_ID}:${process.env.USER_PASS}@cluster0.jeofvdx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    // Send a ping to confirm a successful connection

    const database = client.db("NiyogBD_Job");
    const jobCollection = database.collection("jobs");

    app.get("/jobs", async (req, res) => {
      const cursor = jobCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    });

    app.post("/jobs", async (req, res) => {
      const data = req.body;
      const result = await jobCollection.insertOne(data);
      res.send(result);
    });

    //jwt releted api

    // app.post("/jwt_token", (req, res) => {
    //   const { email } = req.body;
    //   const userData = { email };
    //   const token = jwt.sign({ userData }, process.env.API_SECRET, {
    //     expiresIn: "1h",
    //   });
    //   res.send({ token });
    // });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("NiyogBd Server running ");
});
app.listen(port, () => {
  console.log(`NiyogBD server is running to ${port}`);
});
