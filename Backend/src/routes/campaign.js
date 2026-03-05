import express from "express";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    //get all campaign logic here
  } catch (err) {
    //catch server error here
  }
});

route.get("/:id", async (req, res) => {
  try {
    //get a campaign logic here
  } catch (err) {
    //catch server error here
  }
});

route.post("/", async (req, res) => {
  try {
    //create campaign logic here
  } catch (err) {
    //catch server error here
  }
});
route.put("/:id", async (req, res) => {
  try {
    //update campaign logic here
  } catch (err) {
    //catch server error here
  }
});

route.delete("/:id", async (req, res) => {
  try {
    //remove campaign logic here
  } catch (err) {
    //catch server error here
  }
});
export default route;
