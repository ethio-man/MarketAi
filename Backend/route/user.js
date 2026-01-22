import express from "express";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    //fetch logic will be here
  } catch (err) {
    //server error will be handled here
  }
});

route.get("/:id", async (req, res) => {
  try {
    //getting by id logic
  } catch (err) {
    //server error will be handled here
  }
});
route.post("/", async (req, res) => {
  try {
    //create use logic here
  } catch (err) {
    //server error will handled here
  }
});
route.put("/:id", async (req, res) => {
  try {
    //update user logic :here
  } catch (err) {
    //server error catch here
  }
});
export default route;
