const express = require("express");
const app = express();
const cors = require("cors");
require('dotenv').config();
const port = process.env.PORT || 5000;



//middleware 
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.brfqf5n.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
      serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
      }
});

async function run() {
      try {
            // Connect the client to the server	(optional starting in v4.7)
            await client.connect();


            const donorCollection = client.db("bloodDonationUser").collection('donors');
            // api post
            app.post("/donors", async (req, res) => {
                  const user = req.body;
                  //   console.log(user);
                  const result = await donorCollection.insertOne(user);
                  console.log(result);
                  res.send(result);
            });
            // get method 
            app.get("/donors", async (req, res) => {
                  const result = await donorCollection.find().toArray();
                  res.send(result);
            });



            // Send a ping to confirm a successful connection
            await client.db("admin").command({ ping: 1 });
            console.log("Pinged your deployment. You successfully connected to MongoDB!");
      } finally {
            // Ensures that the client will close when you finish/error
            // await client.close();
      }
}
run().catch(console.dir);



app.get("/", (req, res) => {
      res.send("blood donation is running...");
});


app.listen(port, () => {
      console.log(`blood donation is Running on port ${port}`);
});