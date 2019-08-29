import 'winston-daily-rotate-file';

import fs from 'fs';
import winston from 'winston';

const tsFormat = () => new Date().toISOString();
const logDir = process.env.LOGGING_DIR || 'logs';
const logLevel = process.env.LOGGING_LEVEL || 'info';

// Crear directorio de logs si no existe
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

/**
 * Crear nueva instancia de winston logger.
 */
const logger = new winston.Logger({
  transports: [
    new winston.transports.Console({
      timestamp: tsFormat,
      colorize: true,
      level: 'info'
    }),
    new winston.transports.DailyRotateFile({
      filename: `${logDir}/-debug.log`,
      timestamp: tsFormat,
      datePattern: 'yyyy-MM-dd',
      prepend: true,
      level: logLevel
    })
  ]
});

export default logger;
