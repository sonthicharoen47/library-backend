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

authorRoute.post("/addAuthor", async (req, res) => {
  await Author.create({ author_name: req.body.author_name })
    .then((result) => {
      res.send({ message: "add new author success!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = authorRoute;
