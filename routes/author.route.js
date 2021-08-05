const authorRoute = require("express").Router();
const { Author } = require("../models");

authorRoute.get("/findAll", (req, res) => {
  Author.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = authorRoute;
