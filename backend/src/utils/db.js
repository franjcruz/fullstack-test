import mongoose from 'mongoose';

import logger from './logger';

// Conexión DB
let dbstring = 'mongodb://';

if (process.env.DB_USER) {
  dbstring = dbstring + process.env.DB_USER;
}
if (process.env.DB_PASSWORD) {
  dbstring = dbstring + ':' + process.env.DB_PASSWORD + '@';
}
if (process.env.DB_HOST) {
  dbstring = dbstring + process.env.DB_HOST;
}
if (process.env.DB_PORT) {
  dbstring = dbstring + ':' + process.env.DB_PORT;
}
if (process.env.DB_NAME) {
  dbstring = dbstring + '/' + process.env.DB_NAME;
}

mongoose.connect(dbstring, function(err) {
  if (err) {
    logger.error('No ha sido posible conectar a la base de datos: %s', dbstring);
    process.exit(1);
  }
  logger.info('Conectado a la base de datos.');
});
