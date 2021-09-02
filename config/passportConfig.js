const LocalStrategy = require("passport-local").Strategy;
const { Account, Role } = require("../models");
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
          })
            .then((user) => {
              if (!user) {
                return done(null, false, { message: "no such user found" });
              }
              let validePassword = bcrypt.compareSync(password, user.password);
              if (!validePassword) {
                return done(null, false, { message: "password did not match" });
              }
              return done(null, user);
            })
            .catch((err) => {
              console.log("error logging user in. message : " + err);
              return done(err);
            });
        } else {
          console.log("email or password are empty!");
          return done(null, false, { message: "email or password are empty!" });
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

  passport.serializeUser(function (user, done) {
    console.log("serializeUser");
    done(null, user);
  });

  passport.deserializeUser(async function (user, done) {
    console.log("deserializeUser");
    await Account.findByPk(user.id_account)
      .then((user) => done(null, user))
      .catch((err) => done(err, null));
  });
};
