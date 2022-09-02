import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
require("dotenv").config();

// const express = require("express");
// const path = require("path");

const app = express();
const port = process.env.PORT || 3200;

// setup view engine
configViewEngine(app);

// setup web route
initWebRoute(app);
// app.get("/", (req, res) => {
//   res.render("test/index.ejs");
// });
// app.get("/about", (req, res) => {
//   res.send(`I'm Nguyen`);
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
