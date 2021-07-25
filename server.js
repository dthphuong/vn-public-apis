/**
 * Created by FPO Co.,Ltd - Nov 2020
 * Website: https://fpo.vn
 * Email: contact@fpo.vn
 */
"use strict";

global.config = require("./config");
global._ = require("underscore");
var express = require("express"),
  limiter = require('./utils/Limiter'),
  fs = require('fs'),
  path = require('path'),
  cors = require('cors'),
  morgan = require('morgan'),
  Middleware = require('./utils/Middleware');
var app = express();

//#region Middleware
app.use(cors());
app.use(limiter.generalLimiter); // apply to all api
app.use('/provinces/*', limiter.mediumLimiter);
app.use('/districts/*', limiter.mediumLimiter);
app.use('/wards/*', limiter.mediumLimiter);

app.use(express.json({
  limit: "1mb"
}));
app.use(express.urlencoded({
  limit: "1mb",
  extended: true
}));

app.use(cors());
app.use(Middleware.parametersParser); // parse parameters in Query before processing

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'logs', 'access.log'), { flags: 'a' })
app.use(morgan(config.LogTemplate, { stream: accessLogStream }))

//#endregion

var routes = require("./routes");
routes.assignAPIRoutes(app);

app.listen(config.server.port);
console.log(`Server is listening on port ${config.server.port}`);
console.log(`Please access this URL to get started: ${config.server.base_url}:${config.server.port}`);