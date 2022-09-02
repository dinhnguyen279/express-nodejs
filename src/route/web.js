import { ModulesOption } from "@babel/preset-env/lib/options";
import express from "express";
import homeController from "../controller/homeController";
let router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.getHomepage);
  router.get("/about", (req, res) => {
    res.send(`I'm Nguyen`);
  });
  return app.use("/", router);
};
export default initWebRoute;
