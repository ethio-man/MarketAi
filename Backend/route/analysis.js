import express from "express";
const route = express.Router();

route.get("/", async (req, res) => {
  try {
  } catch (err) {}
});

route.get("/:id", async (req, res) => {
  try {
    //fetching single user logic
  } catch (err) {
    //server error handling :here
  }
});
export default route;
