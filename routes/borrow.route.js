const borrowRoute = require("express").Router();
const { Borrow, BorrowDetail, Role, Account } = require("../models/index");
const { checkRoleAdmin } = require("../middleware/auth");

borrowRoute.get("/findAll", checkRoleAdmin, async (req, res) => {
  await Borrow.findAll({
    where: {
      status: "ordering",
    },
    include: [
      {
        model: BorrowDetail,
      },
      {
        model: Role,
        where: {
          status: "active",
        },
        attributes: ["id_role"],
        include: [
          {
            model: Account,
            attributes: ["fname", "lname"],
          },
        ],
      },
    ],
  })
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = borrowRoute;
