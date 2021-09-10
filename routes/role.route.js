const roleRoute = require("express").Router();

//get a account
roleRoute.get("/test/me", async (req, res) => {
  // id -> roleId from front-end

  res.send("here");
});

module.exports = roleRoute;
