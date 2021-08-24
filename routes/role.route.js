const roleRoute = require("express").Router();
const passport = require("passport");
const { Role } = require("../models");

//get a account
roleRoute.get("/test/me", async (req, res) => {
  // id -> roleId from front-end
  let users = await req.user;
  console.log(users);
  res.send("here");
});

module.exports = roleRoute;
