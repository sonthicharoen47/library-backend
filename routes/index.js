const ensureAuthenticated = require("../middleware/auth");
const passport = require("passport");

module.exports = (app) => {
  app.use("/account", require("./account.route"));
  app.use(
    "/role",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./role.route")
  );
  app.use("/", require("./login_register"));
  app.use(
    "/book",
    passport.authenticate("jwt", { session: false }),
    require("./book.route")
  );
  app.use("/roleDetail", require("./roleDetail.route"));
  app.use("/author", require("./author.route"));

  app.use(
    "/rentDetail",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./rentDetail.route")
  );

  app.use("/category", require("./category.route"));
};
