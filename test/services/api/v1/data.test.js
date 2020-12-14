const assert = require('assert');
const app = require('../../../../src/app');

describe('\'api/v1/data\' service', () => {
  it('registered the service', () => {
    const service = app.service('api/v1/data');

    assert.ok(service, 'Registered the service');
  });
});
