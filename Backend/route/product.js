import express from "express";
const route = express.Router();

route.get("/", async (req, res) => {
  try {
    //find products logic
  } catch (err) {
    //server error catch here
  }
});

route.get("/:id", async (req, res) => {
  try {
    //find single product logic
  } catch (err) {
    //server error catch here
  }
});

export default route;
