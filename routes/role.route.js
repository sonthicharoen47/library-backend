const roleRoute = require("express").Router();
const { Role } = require("../models");

roleRoute.get("/", (req, res) => {
  Role.findAll({
    where: { fk_roleDetail: 2 },
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//get a account
roleRoute.post("/findAccountById/me", async (req, res) => {
  // id -> roleId from front-end
});

module.exports = roleRoute;
