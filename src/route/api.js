import express from "express";
let router = express.Router();
import APIController from "../controller/APIController";

const initAPIRoute = (app) => {
  router.get("/users", APIController.getAllUsers); // method GET -> Read data
  router.post("/create-users", APIController.createNewsers); // method post -> Create data
  router.put("/update-user", APIController.updateUser); // method put -> Update data
  router.delete("/delete-user/:id", APIController.deleteUser); // method Delete -> delete data

  return app.use("/api/v1/", router);
};
export default initAPIRoute;
