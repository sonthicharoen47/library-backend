const LocalStrategy = require("passport-local").Strategy;
const { Account } = require("../models");
const bcrypt = require("bcrypt");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" },
      (email, password, done) => {
        if (email && password) {
          Account.findOne({
            where: {
              email: email,
            },
          }).then((user) => {
            if (!user) {
              return done(null, false);
            }
            let validePassword = bcrypt.compareSync(password, user.password);
            if (!validePassword) {
              return done(null, false);
            }
            return done(null, user);
          });
        } else {
          return done(null, false);
        }
      }
    )
  );

  passport.serializeUser(function (account, done) {
    done(null, account);
  });

  passport.deserializeUser(function (account, done) {
    done(null, account);
  });
};
