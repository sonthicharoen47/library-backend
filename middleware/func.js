const { Role } = require("../models/index");

const getRole = async (id) => {
  let role = await Role.findOne({
    where: {
      fk_account: id,
    },
  });

  if (role) {
    return role;
  } else {
    return null;
  }
};

module.exports = { getRole };
