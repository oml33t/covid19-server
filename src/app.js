const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');

require('dotenv').config();

const logger = require('./logger');
const morganCustom = require('./morgan');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const mongoose = require('./mongoose');

const app = express(feathers());

// Morgan Express logging
app.use(morgan(morganCustom.morganFormat, {
  stream: morganCustom.loggerStream
}));

// Load app configuration
// @ts-ignore
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

app.use('/heartbeat', (req, res) => {
  if (req.headers.authorization !== process.env.ADMIN_KEY) {
    res.status(401).send();
    return;
  }
  res.send({
    uptime: process.uptime()
  });
});

// Set up Plugins and providers
app.configure(express.rest());

app.configure(mongoose);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({
  logger
}));

app.hooks(appHooks);

module.exports = app;
