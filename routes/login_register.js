const route = require("express").Router();
const passport = require("passport");
const ensureAuthenticated = require("../auth");

route.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/loginfailed",
  })
);

route.get("/dashboard", ensureAuthenticated, (req, res) => {
  console.log(req.user.fname);
  res.send("dashboard here");
});

route.get("/loginfailed", (req, res) => {
  res.send("login failed!");
});

route.get("/logout", (req, res) => {
  req.logOut();
  console.log("you are logged out");
  res.redirect("/loginfailed");
});

module.exports = route;
