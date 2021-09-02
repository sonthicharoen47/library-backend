const rentDetailRoute = require("express").Router();
const { Rent, RentDetail, Role, Book } = require("../models/index");

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
                var rentCreate = await RentDetail.create(data).catch((err) => {
                  console.log(err);
                });
              }
            }
            if (rentCreate) {
              res.status(200).send({ message: "add rentDetail success!" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  }
});

rentDetailRoute.get("/findAll/me", async (req, res) => {
  //history rent for me
  //database rent join rentDetail

  try {
    let user = req.session.passport.user.id_account;
    const role = await Role.findOne({
      where: {
        fk_account: user,
      },
    });

    if (!role) {
      throw new Error("id not found!");
    }

    const rentDetail = await Rent.findAll({
      where: {
        fk_role: role.id_role,
      },
      attributes: ["id_rent", "start_date", "end_date", "status"],
      order: [["start_date", "DESC"]],
      include: [
        {
          model: RentDetail,
          attributes: ["date_return", "fk_book"],
          include: [
            {
              model: Book,
            },
          ],
        },
      ],
    });
    // res.send(rentDetail);

    //find or split or get dateonly from start_date
    const arr_date = [];
    var arr_obj = [];
    var result = [];

    for (let i = 0, j = 0; i < rentDetail.length; i++) {
      let dateString = JSON.stringify(rentDetail[i].start_date).slice(1, 11);
      let findX = arr_date.find((element) => element == dateString);
      if (!findX) {
        if (i > 0) {
          result.push({ date: arr_date[j], rentArr: arr_obj });
          j++;
          arr_obj = [];
        }
        arr_date.push(dateString);
      }
      if (i == rentDetail.length - 1) {
        result.push({ date: arr_date[j], rentArr: arr_obj });
      }
      arr_obj.push(rentDetail[i]);
    }
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = rentDetailRoute;
