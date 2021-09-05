const ratingRoute = require("express").Router();
const { Rating, Role, Account } = require("../models/index");

const { getRole } = require("../middleware/func");

ratingRoute.post("/findAll", async (req, res) => {
  let bookId = req.body.fk_book;
  if (!bookId) {
    res.send({ err: "id book missing!" });
  } else {
    await Rating.findAll({
      where: {
        fk_book: bookId,
      },
    })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

ratingRoute.post("/comment", async (req, res) => {
  let role = await getRole(req.session.passport.user.id_account);
  if (role) {
    if (req.body.score <= 5) {
      let data = {
        score: req.body.score,
        time: new Date(),
        fk_book: req.body.fk_book,
        fk_role: role.id_role,
        comment: req.body.comment || null,
      };

      await Rating.create(data)
        .then(() => {
          res.send({
            message: "commented successful!",
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.send({ err: "max score is 5.00 and must positive nuber" });
    }
  }
});

ratingRoute.post("/getComment", async (req, res) => {
  await Rating.findAll({
    where: {
      fk_book: req.body.fk_book,
    },
    include: [
      {
        model: Role,
        include: [
          {
            model: Account,
            attributes: ["fname", "lname"],
          },
        ],
        attributes: ["fk_account"],
      },
    ],
    order: [["id_rating", "DESC"]],
  })
    .then((data) => {
      let result = [];
      for (let i = 0; i < data.length; i++) {
        result.push({
          id_rating: data[i].id_rating,
          score: data[i].score,
          date: JSON.stringify(data[i].time).slice(1, 11),
          time: JSON.stringify(data[i].time).slice(12, 20),
          fname: data[i].Role.Account.fname,
          lname: data[i].Role.Account.lname,
          comment: data[i].comment,
        });
      }
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = ratingRoute;
