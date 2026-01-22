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
route.post("/", async (req, res) => {
  try {
    //create analysis logic will be here
  } catch (err) {
    //server error catch here
  }
});
export default route;
