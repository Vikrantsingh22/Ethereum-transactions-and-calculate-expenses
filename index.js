const express = require("express");
const startupFetch = require("./util/startupFetch");
const userFetch = require("./routes/userFetch");
const app = express();
const port = 3000;
require("dotenv").config();
app.use(express.json());

// dotenv is used to load environment variables from a .env file into process.env
require("dotenv").config();
app.use("/api", userFetch);
app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  startupFetch();
});
