const categoryRoute = require("express").Router();
const { Category } = require("../models/index");

categoryRoute.post("/addCategory", async (req, res) => {
  await Category.create({ category_name: req.body.category_name })
    .then((result) => {
      res.send({ message: "create new category success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = categoryRoute;
