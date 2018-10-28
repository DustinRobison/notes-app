'use strict';

var SwaggerExpress = require('swagger-express-mw');
var express = require('express');
var app = express();
module.exports = app; // for testing

var db = require('./db').initializeDb();


// Set swagger config
var config = {
  appRoot: __dirname // required config
};

// Start express with swagger bagpipes
SwaggerExpress.create(config, function(err, swaggerExpress) {
  if (err) { throw err; }

  app.use('/', express.static('./public'));   // Local react app
  app.use('/api', express.static('./api/public')); // Set to run swagger UI

  // install middleware
  swaggerExpress.register(app);

  var port = process.env.PORT || 10010;
  app.listen(port);

});
