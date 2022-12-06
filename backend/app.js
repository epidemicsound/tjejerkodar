const express = require("express");
const logger = require("morgan");
const cors = require("cors");

require("dotenv").config();

const authRouter = require("./routes/auth");
const flagRoute = require("./routes/flag");
const healthRoute = require("./routes/health");

const app = express();

// Cors configuration
let allowlist = [
  "http://127.0.0.1:4242",
  "http://localhost:3000",
  "https://production.example.com",
];
let corsOptionsDelegate = function (req, callback) {
  let corsOptions;
  if (allowlist.indexOf(req.header("Origin")) !== -1) {
    corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false }; // disable CORS for this request
  }
  callback(null, corsOptions); // callback expects two parameters: error and options
};

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/auth", cors(corsOptionsDelegate), authRouter);
app.use("/flag", flagRoute);
app.use("/healthcheck", healthRoute);

module.exports = app;
