var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var cors = require('cors');
//var expressValidator = require('express-validator');

module.exports = () => {
  var app = express();

  app.set('secret', '76T06a004ead8bfI6548c05c55G190e147');

  //app.use('/uploads', express.static('uploads'));
  //app.use('/public/pdf', express.static('public/pdf'));
  //app.use('/public/imagem', express.static('public/imagem'));
  //app.use('/public/newsletter', express.static('public/newsletter'));

  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(cors());

  //app.use(expressValidator());

  consign()
    .include('controllers/usuarios.js')
    .then('controllers')
    .into(app);

  return app;
}