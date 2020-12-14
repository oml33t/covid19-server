// Initializes the `api/v1/data` service on path `/api/v1/data`
const { Data } = require('./data.class');
const createModel = require('../../../../models/data.model');
const hooks = require('./data.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: {
      default: 1000,
      max: 200000
    }
  };

  // Initialize our service with any options it requires
  app.use('/api/v1/data', new Data(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('api/v1/data');

  service.hooks(hooks);
};
