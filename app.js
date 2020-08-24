const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.listen(8000, () => {
  console.log("This cool app is running on localhost:8000");
});
