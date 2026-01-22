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

route.post("/", async (req, res) => {
  try {
    //create product logic here
  } catch (err) {
    //server error catch here
  }
});
export default route;
