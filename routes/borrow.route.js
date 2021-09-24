const borrowRoute = require("express").Router();
const {
  Borrow,
  BorrowDetail,
  Role,
  Account,
  Book,
} = require("../models/index");
const { checkRoleAdmin } = require("../middleware/auth");

borrowRoute.get("/findAll", checkRoleAdmin, async (req, res) => {
  await Borrow.findAll({
    attributes: ["id_borrow", "start_date", "end_date", "status"],
    include: [
      {
        model: BorrowDetail,
        attributes: ["id_borrowDetail"],
        include: [
          {
            model: Book,
            attributes: ["title"],
          },
        ],
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

borrowRoute.get("/find/ordering", checkRoleAdmin, async (req, res) => {
  await Borrow.findAll({
    where: {
      status: "ordering",
    },
    attributes: ["id_borrow", "start_date", "end_date", "status"],
    include: [
      {
        model: BorrowDetail,
        attributes: ["id_borrowDetail"],
        include: [
          {
            model: Book,
            attributes: ["title"],
          },
        ],
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

borrowRoute.get("/find/borrowing", checkRoleAdmin, async (req, res) => {
  await Borrow.findAll({
    where: {
      status: "borrowing",
    },
    attributes: ["id_borrow", "start_date", "end_date", "status"],
    include: [
      {
        model: BorrowDetail,
        attributes: ["id_borrowDetail"],
        include: [
          {
            model: Book,
            attributes: ["title"],
          },
        ],
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

borrowRoute.get("/find/return", checkRoleAdmin, async (req, res) => {
  await Borrow.findAll({
    where: {
      status: "return",
    },
    attributes: ["id_borrow", "start_date", "end_date", "status"],
    include: [
      {
        model: BorrowDetail,
        attributes: ["id_borrowDetail"],
        include: [
          {
            model: Book,
            attributes: ["title"],
          },
        ],
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
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

borrowRoute.put("/update", checkRoleAdmin, async (req, res) => {
  let idList = req.body.borrowListId;
  let checkStatus = req.body.status;
  if (checkStatus === "ordering") {
    checkStatus = "borrowing";
  } else if (checkStatus === "borrowing") {
    checkStatus = "return";
  }
  var updateStatus;
  if (Array.isArray(idList) && checkStatus) {
    for (let i = 0; i < idList.length; i++) {
      updateStatus = await Borrow.update(
        { status: checkStatus },
        {
          where: {
            id_borrow: idList[i],
          },
        }
      );
    }
  } else if (typeof idList === "number" && checkStatus) {
    updateStatus = await Borrow.update(
      {
        status: checkStatus,
      },
      {
        where: {
          id_borrow: idList,
        },
      }
    );
  }
  if (updateStatus == 1) {
    res.send({ message: "update borrow status successful!" });
  } else {
    res.send({ err: "can not update borrow status!" });
  }
});

borrowRoute.delete("/delete", checkRoleAdmin, async (req, res) => {
  let idList = req.body.borrowListId;
  var destroyBorrow;
  if (!idList) {
    res.send("id missing!");
  } else if (Array.isArray(idList) && idList != []) {
    for (let i = 0; i < idList.length; i++) {
      let borrowDetailIds = await BorrowDetail.findAll({
        where: { fk_borrow: idList[i] },
      });
      for (let j = 0; j < borrowDetailIds.length; j++) {
        await BorrowDetail.destroy({
          where: {
            fk_borrow: idList[i],
          },
        });
      }
      destroyBorrow = await Borrow.destroy({
        where: {
          id_borrow: idList[i],
        },
      });
    }
  } else {
    let borrowDetailId = await BorrowDetail.findAll({
      where: {
        fk_borrow: idList,
      },
    });
    for (let i = 0; i < borrowDetailId.length; i++) {
      await BorrowDetail.destroy({
        where: {
          fk_borrow: idList,
        },
      });
    }
    destroyBorrow = await Borrow.destroy({
      where: {
        id_borrow: idList,
      },
    });
  }
  if (destroyBorrow == 1) {
    res.send({ message: "destroy borrow successful!" });
  } else {
    res.send({ err: "can not destroy borrow!" });
  }
});

module.exports = borrowRoute;
