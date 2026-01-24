import express from "express";
const app = express();
const port = process.env.PORT || 4000;

const server = app.listen(port, () => {
  console.log(`Server is listening on the port ${port} ...`);
});
export default server;
