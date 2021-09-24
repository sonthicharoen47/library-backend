const roleRoute = require("express").Router();
const { Role, Account, RoleDetail } = require("../models/index");

//get a account
roleRoute.post("/checkLogin", async (req, res) => {
  //roleId , email
  let checkLogin = await Role.findOne({
    where: {
      id_role: req.body.id,
    },
    attributes: ["id_role"],
    include: [
      {
        model: Account,
        where: {
          email: req.body.email,
        },
        attributes: ["email"],
      },
      {
        model: RoleDetail,
        attributes: ["position"],
      },
    ],
  });

  if (checkLogin) {
    let result = {
      id: checkLogin.id_role,
      email: checkLogin.Account.email,
      permission: checkLogin.RoleDetail.position,
    };
    res.send(result);
  } else {
    res.send({ err: "login fail" });
  }
});

module.exports = roleRoute;
