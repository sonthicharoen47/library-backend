const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { testDatabaseConnection } = require("./dbConfig");
const PORT = process.env.PORT || 8080;

const app = express();

testDatabaseConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/account", require("./routes/account.route"));

app.listen(PORT, () => {
  console.log(`Server is running...`);
});
