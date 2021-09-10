const authorRoute = require("express").Router();
const { Author } = require("../models");
const { checkRoleAdmin } = require("../middleware/auth");

authorRoute.get("/findAll", (req, res) => {
  Author.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

authorRoute.post("/addAuthor", checkRoleAdmin, async (req, res) => {
  await Author.create({ author_name: req.body.author_name })
    .then(() => {
      res.send({ message: "add new author success!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = authorRoute;
