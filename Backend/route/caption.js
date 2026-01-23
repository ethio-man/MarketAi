import express from "express";
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    //get caption logic here
  } catch (err) {
    //catch server error here
  }
});

route.get("/:id", async (req, res) => {
  try {
    //get a caption logic here
  } catch (err) {
    //catch server error here
  }
});

route.post("/", async (req, res) => {
  try {
    //create a caption logic here
  } catch (err) {
    //catch server error here
  }
});
export default route;
