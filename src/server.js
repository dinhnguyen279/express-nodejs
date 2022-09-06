import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoute from "./route/web";
// import connection from "./configs/connectDB";
require("dotenv").config();

// const express = require("express");
// const path = require("path");

const app = express();
const port = process.env.PORT || 3200;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// setup view engine
configViewEngine(app);

// setup web route
initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
