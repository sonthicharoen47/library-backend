const bookRoute = require("express").Router();
const { Book, Rating } = require("../models");

bookRoute.post("/addBook", async (req, res) => {
  let data = {
    title: req.body.title,
    description: req.body.description,
    fk_author: req.body.fk_author,
    fk_category: req.body.fk_category,
  };
  await Book.create(data)
    .then(() => {
      res.send({ message: "add book success!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

bookRoute.get("/findAll", async (req, res) => {
  const bookList = await Book.findAll({
    include: [
      {
        model: Rating,
        attributes: ["id_rating", "score"],
      },
    ],
    order: [["id_book", "ASC"]],
  });

  let arr_id = [];
  let sumRate = 0;
  let result = [];

  for (let i = 0, j = 0, z = 0; i < bookList.length; i++) {
    let findId = arr_id.find(
      (element) => element.id_book === bookList[i].id_book
    );
    if (!findId) {
      arr_id.push(bookList[i]);
      if (i > 0) {
        let total = parseFloat((sumRate / j).toFixed(2));
        let Book = {
          id_book: arr_id[z].id_book,
          title: arr_id[z].title,
          description: arr_id[z].description,
          fk_author: arr_id[z].fk_author,
          fk_category: arr_id[z].fk_category,
          rating: total,
        };
        result.push(Book);
        j = 0;
        z++;
        sumRate = 0;
      }
    }
    if (bookList[i].Rating) {
      j++;
      sumRate += bookList[i].Rating.score;
    } else {
      sumRate += 0;
    }
    if (i == bookList.length - 1) {
      let total = parseFloat((sumRate / j).toFixed(2));
      let Book = {
        id_book: arr_id[z].id_book,
        title: arr_id[z].title,
        description: arr_id[z].description,
        fk_author: arr_id[z].fk_author,
        fk_category: arr_id[z].fk_category,
        rating: total,
      };
      result.push(Book);
    }
  }

  res.send(result);
});

module.exports = bookRoute;
