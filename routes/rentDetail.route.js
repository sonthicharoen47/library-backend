const rentDetailRoute = require("express").Router();
const { Rent, RentDetail, Role } = require("../models/index");

//create rent detail
rentDetailRoute.post("/add", async (req, res) => {
  //check req.body.bookRent 1st
  //find role
  console.log(req.body);
  let role = await Role.findOne({
    //create a new middleware?
    where: {
      fk_account: req.session.passport.user.id_account,
    },
  });
  if (!role) {
    res.send("permission denine!");
  } else {
    const bookRentList = req.body.bookRent;
    if (!bookRentList) {
      res.send("bookrent missing!");
    } else {
      if (!Array.isArray(bookRentList)) {
        res.send("bookrent not arr");
      } else {
        let dataRent = {
          start_date: new Date(),
          end_date: req.body.end_date,
          status: "waiting",
          fk_role: role.id_role,
        };

        await Rent.create(dataRent)
          .then(async (result) => {
            for (let i = 0; i < bookRentList.length; i++) {
              if (!bookRentList[i].id_book) {
                res.send("id book missing!");
              } else {
                let data = {
                  date_return: null,
                  fk_book: bookRentList[i].id_book,
                  fk_rent: result.id_rent,
                };
                await RentDetail.create(data)
                  .then(() => {
                    res.send("add rentDetail success!");
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
