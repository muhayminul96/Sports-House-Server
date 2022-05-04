const express = require("express");
const app = express();
var cors = require('cors')

app.use(cors())

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("hello man");
});

app.listen(port, () => {
  console.log("curd",port);
});