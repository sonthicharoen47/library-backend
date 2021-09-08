const { ensureAuthenticated } = require("../middleware/auth");
const passport = require("passport");

module.exports = (app) => {
  app.use("/", require("./login_register"));

  app.use(
    "/account",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./account.route")
  );

  app.use(
    "/role",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./role.route")
  );

  app.use(
    "/book",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./book.route")
  );

  app.use(
    "/roleDetail",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./roleDetail.route")
  );

  app.use(
    "/author",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./author.route")
  );

  app.use(
    "/rent",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./rent.route")
  );

  app.use(
    "/rentDetail",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./rentDetail.route")
  );

  app.use(
    "/category",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./category.route")
  );

  app.use(
    "/rating",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./rating.route")
  );
};
