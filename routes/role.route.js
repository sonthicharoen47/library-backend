const roleRoute = require("express").Router();
const Role = require("../models/role.model");

roleRoute.get("/", (req, res) => {
  Role.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = roleRoute;
