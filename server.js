const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");

require("dotenv").config();
require("./config/passportConfig")(passport);
const { testDatabaseConnection, sequelize } = require("./config/dbConfig");
const PORT = process.env.PORT || 8080;

const app = express();

testDatabaseConnection();

app.set("trust proxy", 1);
app.use(
  session({
    secret: process.env.SESSION_KEY,
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

require("./routes/index")(app);

app.listen(PORT, async () => {
  await sequelize.sync({ alter: true });
  //await sequelize.sync({ force: true });
  console.log(`Server is running...`);
});
