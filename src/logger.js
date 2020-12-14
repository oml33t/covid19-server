const {
  createLogger,
  format,
  transports
} = require('winston');
const {
  combine,
  splat,
  timestamp,
  printf
} = format;

const myFormat = printf(({
  level,
  message,
  timestamp,
  ...metadata
}) => {
  let msg = `⚡ ${timestamp} [${level}] : ${message} `;
  if (metadata && JSON.stringify(metadata) != '{}') {
    msg += JSON.stringify(metadata);
  }
  return msg;
});

const logger = createLogger({
  level: 'debug',
  format: combine(
    format.colorize(),
    splat(),
    timestamp(),
    myFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.File({
      filename: 'combined.log'
    })
  ]
});

module.exports = logger;
