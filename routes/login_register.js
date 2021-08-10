const route = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const ensureAuthenticated = require("../middleware/auth");

// route.post(
//   "/login",
//   passport.authenticate("local", {
//     session: false,
//     successRedirect: "/profile",
//   }),
//   (req, res) => {
//     console.log(res);
//   }
// );

route.post("/login", (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) return next(err);
    if (user) {
      const token = jwt.sign({ id: user.id_account }, "secretKey");
      return res.json({ user, token });
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
});

module.exports = route;
