const route = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { Role } = require("../models");

route.post("/login", (req, res, next) => {
  passport.authenticate(
    "local",
    { session: false },
    async function (err, user, info) {
      if (err) return next(err);
      if (user) {
        const checkRole = await Role.findOne({
          where: {
            fk_account: user.id_account,
            status: "active",
          },
        });

        // const data = {
        //   id: checkRole.id_role,
        //   email: user.email,
        //   fname: user.fname,
        //   lname: user.lname,
        // };

        const token = jwt.sign(
          { id: checkRole.id_role, email: user.email },
          "secretKey",
          { expiresIn: "1h" }
        );
        req.login(user, (err) => {
          if (err) {
            return res.status(401).json(err);
          } else {
            res.json({ token });
          }
        });

        // return res.json({ token });
      } else {
        return res.status(401).json(info);
      }
    }
  )(req, res, next);
});

route.get("/logout", (req, res) => {
  req.logout();
  res.send({ message: "logout successful!" });
});

module.exports = route;
