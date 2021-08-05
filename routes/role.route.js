const roleRoute = require("express").Router();
const {Role} = require("../models");

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

module.exports = roleRoute;
