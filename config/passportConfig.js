const LocalStrategy = require("passport-local").Strategy;
const { Account } = require("../models");
const bcrypt = require("bcrypt");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

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

  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "secretKey",
      },
      (jwtPayload, done) => {
        try {
          let user = Account.findOne({ where: { id_account: jwtPayload.id } });
          if (user) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        } catch (error) {
          return done(error, false);
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
