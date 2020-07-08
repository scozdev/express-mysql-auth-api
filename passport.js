import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { User } from "./models/sql/user";
import lodash from "lodash";

const UNAUTH_URLS = ["/member/login"];

export const initializePassport = (app) => {
  app.use(passport.initialize());
  app.use(passport.session());

  app.use(function (req, res, next) {
    if (UNAUTH_URLS.indexOf(req.path) > -1) {
      return next();
    } else if (req.isAuthenticated()) {
      return next();
    }
    res.status(401).send({ error: "unauthorized" }).end();
  });

  passport.use(
    new LocalStrategy(function (username, password, done) {
      User.findOne({ where: { username: username, password: password } })
        .then((user) => {
          if (!user) {
            return done(null, false);
          }
          return done(
            null,
            lodash.pick(user, ["uuid", "username", "firstname", "lastname"])
          );
        })
        .catch((err) => {
          console.log(err);
        });
    })
  );

  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (user, done) {
    done(null, user);
  });
};
