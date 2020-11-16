const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(logger("dev"));
app.use(bodyParser.json({ limit: "50mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

app.use(cors());

require("./server/routes")(app);
app.get("*", (req, res) =>
  res.status(200).send({
    message: "Welcome to the api.",
  })
);

module.exports = app;
