const rentDetailRoute = require("express").Router();
const { Rent, RentDetail, Role } = require("../models/index");

//create rent detail
rentDetailRoute.post("/add", async (req, res) => {
  //check req.body.bookRent 1st
  //find role
  //console.log(req.body);
  let user = req.session.passport.user.id_account;
  let role = await Role.findOne({
    //create a new middleware?
    where: {
      fk_account: user,
    },
  });
  if (!role) {
    res.status(400).send({ err: "permission denine!" });
    //throw new Error("permission denine");
  } else {
    const bookRentList = req.body.bookRent;
    const endDate = req.body.endDate;
    if (!bookRentList || bookRentList.length === 0 || !endDate) {
      res.status(422).send({ err: "params missing!" });
      //throw new Error("bookrent missing!");
    } else {
      if (!Array.isArray(bookRentList)) {
        res.status(400).send({ err: "bookrent not arr" });
      } else {
        let dataRent = {
          start_date: new Date(),
          end_date: endDate,
          status: "waiting",
          fk_role: role.id_role,
        };

        await Rent.create(dataRent)
          .then(async (result) => {
            for (let i = 0; i < bookRentList.length; i++) {
              if (!bookRentList[i].id_book) {
                res.status(400).send({ err: "id book missing!" });
              } else {
                let data = {
                  date_return: null,
                  fk_book: bookRentList[i].id_book,
                  fk_rent: result.id_rent,
                };
                await RentDetail.create(data)
                  .then(() => {
                    res
                      .status(200)
                      .send({ message: "add rentDetail success!" });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
});

module.exports = rentDetailRoute;
