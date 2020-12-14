const chalk = require('chalk');

const logger = require('./logger');

const loggerStream = {
  write: (text) => {
    logger.info(text.trim());
  }
};

const morganFormat = (tokens, req, res) => {
  return [
    chalk.hex('#60E1E0').bold(tokens.method(req, res)),
    chalk.hex('#F25757').bold(tokens.status(req, res)),
    chalk.hex('#791E94').bold(`HTTP/${tokens['http-version'](req, res)}`),
    chalk.hex('#F6AE2D').bold(tokens.url(req, res)),
    chalk.hex('#084887').bold(tokens['response-time'](req, res) + ' ms'),
    chalk.hex('#69140E').bold(tokens['remote-addr'](req, res)),
    chalk.hex('#B33C86').bold(tokens['user-agent'](req, res)),
  ].join(' ');
};

module.exports = {
  loggerStream,
  morganFormat
};
