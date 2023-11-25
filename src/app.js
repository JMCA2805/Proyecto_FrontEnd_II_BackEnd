var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
const cron = require('node-cron');
const {enviarOferta} = require("./scripts/nodemailer")

///INICIALIZACIONES
var app = express();

// MIDDLEWARES
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

cron.schedule('0 8 * * *', () => {
  enviarOferta()
}) 

app.use(express.static(path.join(__dirname, "public")));

// ROUTES
const indexRuta = require("./routes/index");
const authRuta = require ("./routes/auth")

app.use("/", indexRuta);
app.use("/auth", authRuta);


module.exports = app;