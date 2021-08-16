const roleRoute = require("express").Router();
const { Role } = require("../models");

//get a account
roleRoute.post("/findAccountById/me", async (req, res) => {
  // id -> roleId from front-end
  let arr = req.header("authorization").split(" ");
  res.send(arr);
});

module.exports = roleRoute;
