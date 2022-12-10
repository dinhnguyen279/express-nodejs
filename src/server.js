import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
import initAPIRoute from "./route/api";
// import connection from "./configs/connectDB";
require("dotenv").config();
var morgan = require("morgan");

// const express = require("express");
// const path = require("path");

const app = express();
const port = process.env.PORT || 3232;

//Hỗ trợ gửi data từ client lên server
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("combined"));
// setup view engine
configViewEngine(app);

// init web route
initWebRoute(app);

// init api route
initAPIRoute(app);

// handle 404 not found
app.use((req, res) => {
  return res.render("404.ejs");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
