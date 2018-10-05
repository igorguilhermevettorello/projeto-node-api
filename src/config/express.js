var express = require("express");
var consign = require("consign");
var bodyParser = require("body-parser");
var cors = require("cors");

module.exports = function() {
  var app = express();

  app.set("secret", "76T06a004ead8bfI6548c05c55G19");
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cors());

  consign()
    .include("src/controllers/usuarios.js")
    .then("src/controllers")
    .into(app);

  return app;
};
