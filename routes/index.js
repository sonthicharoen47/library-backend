const ensureAuthenticated = require("../middleware/auth");

module.exports = (app) => {
  app.use("/account", require("./routes/account.route"));
  app.use(
    "/role",
    ensureAuthenticated,
    passport.authenticate("jwt", { session: false }),
    require("./routes/role.route")
  );
  app.use("/", require("./routes/login_register"));
  app.use(
    "/book",
    passport.authenticate("jwt", { session: false }),
    require("./routes/book.route")
  );
  app.use("/roleDetail", require("./routes/roleDetail.route"));
  app.use("/author", require("./routes/author.route"));

  app.use(
    "/rentDetail",
    passport.authenticate("jwt", { session: false }),
    require("./routes/rentDetail.route")
  );

  app.use("/category", require("./routes/category.route"));
};
