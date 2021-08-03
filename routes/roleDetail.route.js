const roleDetailRoute = require("express").Router();
const RoleDetail = require("../models/roleDetail.model");

//get a roleDetail
roleDetailRoute.post("/", async (req, res) => {
  const roleDetail = await findById(req.body.id_roleDetail, RoleDetail);
  if (roleDetail) {
    res.send(roleDetail);
  } else {
    res.send("role not found!");
  }
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
