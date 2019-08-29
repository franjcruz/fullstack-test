import './utils/_env';
import './utils/db';

import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import * as errorHandler from './middlewares/errorHandler';
import json from './middlewares/json';
import routes from './routes/routes';
import logger from './utils/logger';

const app = express();

const APP_PORT = process.env.APP_PORT || '3000';
const APP_HOST = process.env.APP_HOST || '0.0.0.0';

app.set('port', APP_PORT);
app.set('host', APP_HOST);

app.locals.title = process.env.APP_NAME;
app.locals.version = process.env.APP_VERSION;

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(errorHandler.bodyParser);
app.use(json);

// API Routes
app.use('/api', routes);

// Error Middlewares
app.use(errorHandler.genericErrorHandler);
app.use(errorHandler.methodNotAllowed);

app.listen(app.get('port'), app.get('host'), () => {
  logger.log('info', `Server started at http://${app.get('host')}:${app.get('port')}`);
});

export default app;
