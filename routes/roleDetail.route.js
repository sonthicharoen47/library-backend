const roleDetailRoute = require("express").Router();
const { RoleDetail } = require("../models");
const { checkRoleAdmin } = require("../middleware/auth");

//get a roleDetail
roleDetailRoute.post("/me", async (req, res) => {
  const roleDetail = await findById(req.body.id_roleDetail, RoleDetail);
  if (roleDetail) {
    res.send(roleDetail);
  } else {
    res.send("role not found!");
  }
});

//add a new role
roleDetailRoute.post("/addRole", checkRoleAdmin, async (req, res) => {
  let data = {
    position: req.body.position,
    salary: req.body.salary,
  };

  await RoleDetail.create(data)
    .then((result) => {
      res.send({ message: "add a new roleDetail success!" });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = roleDetailRoute;

async function findById(id, model) {
  if (id) {
    const result = await model.findByPk(id);
    if (!result) {
      return null;
    } else {
      return result;
    }
  } else {
    return null;
  }
}
