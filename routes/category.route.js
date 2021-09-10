const categoryRoute = require("express").Router();
const { Category } = require("../models/index");
const { checkRoleAdmin } = require("../middleware/auth");

categoryRoute.post("/addCategory", checkRoleAdmin, async (req, res) => {
  await Category.create({ category_name: req.body.category_name })
    .then(() => {
      res.send({ message: "create new category success" });
    })
    .catch((err) => {
      console.log(err);
    });
});

categoryRoute.get("/findAll", async (req, res) => {
  await Category.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = categoryRoute;
