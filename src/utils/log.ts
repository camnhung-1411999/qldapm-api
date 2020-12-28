import pino from 'pino';

require('dotenv').config();

const env = process.env.NODE_ENV || 'dev';

const logger = pino({
  safe: true,
  prettyPrint: env === 'dev',
});

export default logger;
