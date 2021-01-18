import cookieParser from "cookie-parser";
import express from "express";
import createError from "http-errors";
import logger from "morgan";
import { join } from "path";
import indexRouter from "./routes";
import expressLayouts from "express-ejs-layouts";
import bodyParser from "body-parser";
import reviewOptionsRouter from "./routes/reviews";
import BlogRouter from "./routes/blog";

const app = express();

// view engine setup
app.set("views", join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(expressLayouts);
app.use(logger("dev"));
// Parsing body to JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
// Provide static content insidfe public
app.use(express.static(join(__dirname, "../", "public")));

// Set root route
app.use("/", indexRouter);
app.use("/blog", BlogRouter);

app.use("/reviews", reviewOptionsRouter);

// If still not reached to any route it's not found
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
