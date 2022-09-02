import express from "express";
import configViewEngine from "./configs/viewEngine";
require("dotenv").config();

// const express = require("express");
// const path = require("path");

const app = express();
const port = process.env.port || 4000;

configViewEngine(app);

app.get("/", (req, res) => {
  res.render("test/index.ejs");
});
app.get("/about", (req, res) => {
  res.send(`I'm Nguyen`);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
