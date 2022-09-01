require("dotenv").config();

const express = require("express");

const app = express();
const port = process.env.port || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.get("/about", (req, res) => {
  res.send(`I'm Nguyen`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
