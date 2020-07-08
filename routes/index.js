import memberRouter from "./member";

export const initializeRoutes = (app) => {
  app.use("/member", memberRouter);
};

export const initializeErrorRoutes = (app) => {
  app.use(function (req, res, next) {
    return res.status(404).send({ hata: "Sayfa bulunamadi" });
  });

  // error handler
  app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    return res.status(err.status || 500).send(err);
  });
};
