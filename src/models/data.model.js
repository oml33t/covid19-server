// api/v1/data-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const modelName = 'data';
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const schema = new Schema({
    SNo: { type: Number, required: true },
    ObservationDate: { type: String },
    'Province/State': { type: String },
    'Country/Region': { type: String },
    'Last Update': { type: String },
    'Confirmed': { type: Number },
    'Deaths': { type: Number },
    'Recovered': { type: Number },
  }, {
    timestamps: true
  });

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    mongooseClient.deleteModel(modelName);
  }
  return mongooseClient.model(modelName, schema);

};
