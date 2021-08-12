const bookRoute = require("express").Router();
const { Book } = require("../models");

bookRoute.get("/findAll", async (req, res) => {
  const books = await Book.findAll();
  res.json(books);
});

module.exports = bookRoute;
