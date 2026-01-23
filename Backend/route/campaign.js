import express from "express";

const route = express.Router();

route.get("/", async (req, res) => {
  try {
    //get all campaign logic here
  } catch (err) {
    //catch server error here
  }
});

export default route;
