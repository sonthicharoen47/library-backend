const bookRoute = require("express").Router();
const { Book } = require("../models");

bookRoute.get("/findAll", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

bookRoute.post("/addBook", async (req, res) => {
  let data = {
    title: req.body.title,
    description: req.body.description,
    fk_author: req.body.fk_author,
    fk_category: req.body.fk_category,
  };
  await Book.create(data)
    .then((result) => {
      res.send({ message: "add book success!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = bookRoute;
