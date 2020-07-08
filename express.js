import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import logger from "morgan";
import bodyParser from "body-parser";

export const initializeExpressApp = () => {
  var app = express();

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "hbs");

  app.use(logger("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));
  app.use(bodyParser.json());

  app.use(
    require("express-session")({
      secret: "keyboard cat",
      resave: true,
      saveUninitialized: true,
    })
  );

  return app;
};
