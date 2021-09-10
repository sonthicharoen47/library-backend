const accountRoute = require("express").Router();
const { Account } = require("../models/index");

//findAll account
accountRoute.get("/findAll", (req, res) => {
  Account.findAll()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

//findOne
accountRoute.post("/findOne/me", async (req, res) => {
  //console.log(req.body.id_account);
  const account = await findById(req.body.id_account);
  if (account) {
    res.send(account);
  } else {
    res.send("id is not found!");
  }
});

//edit | update
accountRoute.put("/edit/me", async (req, res) => {
  const updateData = {
    fname: req.body.fname,
    lname: req.body.lname,
    phone: req.body.phone,
  };

  const account = await findById(req.body.id_account);
  if (account) {
    await Account.update(updateData, {
      where: {
        id_account: req.body.id_account,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.send(`updated successful!`);
        } else {
          res.send(`updated failed!`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send(`id is not found!`);
  }
});

//delete
accountRoute.delete("/destroy/me", async (req, res) => {
  const account = findById(req.body.id_account);
  if (account) {
    await Account.destroy({
      where: {
        id_account: req.body.id_account,
      },
    })
      .then((num) => {
        if (num == 1) {
          res.send(`deleted successful!`);
        } else {
          res.send(`deleted failed!`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    res.send(`id is not found!`);
  }
});

module.exports = accountRoute;

function checkValueMissing(obj) {
  let missing = [];
  let i = 0;
  for (let [key, value] of Object.entries(obj)) {
    if (!value) {
      missing[i] = key;
      i++;
    }
  }
  if (missing.length != 0) {
    return missing;
  } else {
    return null;
  }
}

async function findById(id) {
  if (id) {
    const acc = await Account.findByPk(id);
    if (!acc) {
      return null;
    } else {
      return acc;
    }
  } else {
    console.log("here");
    return null;
  }
}
