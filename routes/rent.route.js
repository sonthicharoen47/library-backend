const rentRoute = require("express").Router();
const { Rent, RentDetail, Role, Account } = require("../models/index");

rentRoute.get("/findAll", async (req, res) => {
  await Rent.findAll({
    where: {
      status: "waiting",
    },
    include: [
      {
        model: RentDetail,
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

module.exports = rentRoute;
