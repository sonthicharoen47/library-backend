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

  app.use(
    "/borrow",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./borrow.route")
  );
  app.use(
    "/borrowDetail",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./borrowDetail.route")
  );
};
