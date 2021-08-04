const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { testDatabaseConnection, sequelize } = require("./dbConfig");
const PORT = process.env.PORT || 8080;

const app = express();

testDatabaseConnection();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/account", require("./routes/account.route"));
app.use("/roleDetail", require("./routes/roleDetail.route"));
app.use("/role", require("./routes/role.route"));

app.listen(PORT, async () => {
  //await sequelize.sync({ force: true });
  console.log(`Server is running...`);
});
