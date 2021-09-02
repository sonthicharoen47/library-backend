const ratingRoute = require("express").Router();
const { Rating } = require("../models/index");

const { getRole } = require("../middleware/func");

//get all by book id
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
    if (req.body.score < 5) {
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
      res.send({ err: "max score is 5.00 " });
    }
  }
});

module.exports = ratingRoute;
