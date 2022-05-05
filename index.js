const { MongoClient, ServerApiVersion } = require("mongodb");
const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.USER_NAME}:${process.env.DB_PASS}@cluster0.cv3fp.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
client.connect((err) => {
  const itemsCollection = client.db("SportHouse").collection("Items");
  // perform actions on the collection object
  console.log("conneted");
});

app.get("/", (req, res) => {
  res.send("hello man");
});

app.listen(port, () => {
  console.log("curd", port);
});
