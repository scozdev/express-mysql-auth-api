import express from "express";
import lodash from "lodash";
import passport from "passport";
import { isAuthenticated } from "../middlewares/auth";

const router = express.Router();

router.get("/me", function (req, res, next) {
  return res.status(200).send(req.user);
});

router.post("/login", function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(401).send({ error: "unauthorized" }).end();
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      }
      return res.status(200).send({ user: user });
    });
  })(req, res, next);
});

router.get("/logout", function (req, res) {
  req.logout();
  res.status(200).send({ success: true });
});

module.exports = router;
