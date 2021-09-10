const borrowDetailRoute = require("express").Router();
const { Op } = require("sequelize");
const { Borrow, BorrowDetail, Book } = require("../models/index");
const { getRoleMiddleware } = require("../middleware/auth");

//create rent detail
borrowDetailRoute.post("/add", getRoleMiddleware, async (req, res) => {
  if (!req.role) {
    res.status(400).send({ err: "permission denine!" });
  } else {
    let checkBorrowStatus = await Borrow.findOne({
      where: {
        fk_role: req.role.id_role,
        status: {
          [Op.or]: ["ordering", "borrowing"],
        },
      },
    });
    if (checkBorrowStatus) {
      res.send({
        err: "Now, you have order on system. u can not order this time",
      });
    } else {
      const bookBorrowList = req.body.borrowBook;
      const endDate = req.body.endDate;

      if (!bookBorrowList || bookBorrowList.length === 0 || !endDate) {
        res.status(422).send({ err: "params missing!" });
      } else {
        if (!Array.isArray(bookBorrowList)) {
          res.status(400).send({ err: "bookrent not arr" });
        } else {
          let dataRent = {
            start_date: new Date(),
            end_date: endDate,
            status: "ordering",
            fk_role: req.role.id_role,
          };

          await Borrow.create(dataRent)
            .then(async (result) => {
              for (let i = 0; i < bookBorrowList.length; i++) {
                if (!bookBorrowList[i].id_book) {
                  res.status(400).send({ err: "id book missing!" });
                } else {
                  let data = {
                    date_return: null,
                    fk_book: bookBorrowList[i].id_book,
                    fk_borrow: result.id_borrow,
                  };
                  var borrowCreate = await BorrowDetail.create(data).catch(
                    (err) => {
                      console.log(err);
                    }
                  );
                }
              }
              if (borrowCreate) {
                res.status(200).send({ message: "add rentDetail success!" });
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }
    }
  }
});

borrowDetailRoute.get("/findAll/me", getRoleMiddleware, async (req, res) => {
  //history rent for me
  //database rent join rentDetail

  try {
    if (!req.role) {
      throw new Error("id not found!");
    }

    const borrowDetail = await Borrow.findAll({
      where: {
        fk_role: req.role.id_role,
      },
      attributes: ["id_borrow", "start_date", "end_date", "status"],
      order: [["start_date", "DESC"]],
      include: [
        {
          model: BorrowDetail,
          attributes: ["date_return", "fk_book"],
          include: [
            {
              model: Book,
            },
          ],
        },
      ],
    });

    //find or split or get dateonly from start_date
    const arr_date = [];
    var arr_obj = [];
    var result = [];

    for (let i = 0, j = 0; i < borrowDetail.length; i++) {
      let dateString = JSON.stringify(borrowDetail[i].start_date).slice(1, 11);
      let findX = arr_date.find((element) => element == dateString);
      if (!findX) {
        if (i > 0) {
          result.push({ date: arr_date[j], rentArr: arr_obj });
          j++;
          arr_obj = [];
        }
        arr_date.push(dateString);
      }
      if (i == borrowDetail.length - 1) {
        result.push({ date: arr_date[j], rentArr: arr_obj });
      }
      arr_obj.push(borrowDetail[i]);
    }
    res.send(result);
  } catch (error) {
    console.log(error);
  }
});

module.exports = borrowDetailRoute;
