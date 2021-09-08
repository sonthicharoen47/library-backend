const route = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { Role, RoleDetail, Account } = require("../models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
          include: [
            {
              model: RoleDetail,
              attributes: ["position"],
            },
          ],
        });

        const users = {
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          dob: user.dob,
          phone: user.phone,
          role: checkRole.RoleDetail.position,
        };

        const token = jwt.sign(
          { id: checkRole.id_role, email: user.email },
          "secretKey",
          { expiresIn: "1d" }
        );
        req.login(user, (err) => {
          if (err) {
            return res.status(401).json(err);
          } else {
            res.json({ token: token, user: users });
          }
        });
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

//add new account
route.post("/register", async (req, res) => {
  const data = {
    fname: req.body.fname,
    lname: req.body.lname,
    email: req.body.email,
    password: req.body.password,
    dob: req.body.dob,
    phone: req.body.phone,
    cratedAt: new Date(),
  };

  const valueInputMissing = checkValueMissing(data);

  if (!valueInputMissing) {
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync(data.password, salt);
    data.password = hashPassword;

    let findRoleDetail = await RoleDetail.findOne({
      where: {
        position: "user",
      },
    });

    if (findRoleDetail) {
      //check email uniq?
      let checkEmail = await Account.findOne({
        where: {
          email: data.email,
        },
      });
      if (!checkEmail) {
        try {
          let account = await Account.create(data);

          let role = {
            fk_account: account.id_account,
            fk_roleDetail: findRoleDetail.id_roleDetail,
            status: "active",
          };

          await Role.create(role);
          res.send({ message: "register successful!" });
        } catch (err) {
          console.log(err);
        }
      } else {
        res.status(400).send({ err: "email has already been used" });
      }
    } else {
      res.send({ err: "error role not found or not create yet!" });
    }
  } else {
    res.send({ err: `missing : ${valueInputMissing}` });
  }
});

module.exports = route;

function checkValueMissing(obj) {
  let missing = [];
  let i = 0;
  for (let [key, value] of Object.entries(obj)) {
    if (!value) {
      missing[i] = key;
      i++;
    }
  }
  if (missing.length != 0) {
    return missing;
  } else {
    return null;
  }
}
