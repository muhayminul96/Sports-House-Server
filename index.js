const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

var jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@cluster0.cv3fp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
const itemsCollection = client.db("SportHouse").collection("Items");

async function run() {
  try {
    await client.connect();

    app.get("/items", async (req, res) => {
      const query = {};
      const cursor = itemsCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    });
    app.post("/items", async (req, res) => {
      const newItem  = req.body
      const result = await itemsCollection.insertOne(newItem);
      res.send(result);
    });
    app.get("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const item = await itemsCollection.findOne(query);
      res.send(item);
    });
    app.put("/item/:id", async (req, res) => {
      const id = req.params.id;
      const quantity  = req.body.quantity
      const sold  = req.body.sold

      const filter = { _id: ObjectId(id) };
      const options = { upsert: true };
      const updateItem = {

        $set: {
            quantity,sold
  
        },
  
      };
      const result = await itemsCollection.updateOne(filter,updateItem,options);
      res.send(result)
      
    });
    app.delete("/item/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await itemsCollection.deleteOne(query);
      res.send(result)
      
    });

    app.get("/myitems", async (req, res) => {
      const email = req.query.email;
      console.log(email)
      const query = { supplierEmail:email };
      const cursor =  await itemsCollection.find(query);
      const myItems = await cursor.toArray();
      console.log(myItems)
      res.send(myItems);
    });

    app.post("/login", (req, res) => {
      const email = req.body
      const token = jwt.sign(email, process.env.ACCES_KEY, { expiresIn:'1d'});
      console.log(token)
      res.send({token});
    });

    // print a message if no documents were found
  } finally {
    // await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("hello man");
});

app.listen(port, () => {
  console.log("curd", port);
});
