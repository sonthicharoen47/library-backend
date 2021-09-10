const { Role, RoleDetail } = require("../models");

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.send("fail login please");
};

const checkRoleAdmin = async (req, res, next) => {
  let id = req.session.passport.user.id_account;
  let admin = await Role.findOne({
    where: {
      fk_account: id,
    },
    include: [
      {
        model: RoleDetail,
        attributes: ["position"],
      },
    ],
  });
  if (admin.RoleDetail.position === "admin") {
    return next();
  } else {
    res.send("Unauthorized");
  }
};

const getRoleMiddleware = async (req, res, next) => {
  let id = req.session.passport.user.id_account;
  let role = await Role.findOne({
    where: {
      fk_account: id,
    },
  });
  req.role = role;
  return next();
};

module.exports = { ensureAuthenticated, checkRoleAdmin, getRoleMiddleware };
