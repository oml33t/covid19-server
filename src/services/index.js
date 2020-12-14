const apiV1Data = require('./api/v1/data/data.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(apiV1Data);
};
