const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

const middlewares = [
  express.json({ limit: "20kb" }),
  cors(corsOptions),
  cookieParser(),
  helmet(),
  morgan("tiny"),
  fileUpload(),
];

module.exports = middlewares;
