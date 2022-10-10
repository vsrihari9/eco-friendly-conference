/* istanbul ignore file */
/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');
const bodyParser = require('body-parser');
const compress = require('compression');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

const oraConnector = require('@softrams/nodejs-oracle-connector');
const mysqlConnector = require('@softrams/nodejs-mysql-connector');

const appRoutes = require('../api/public/core/core.routes');
const v1PublicRoutes = require('../api/public/public.routes');
const v1SecureRoutes = require('../api/secure/secure.routes');
const swaggerSpec = require('../../docs/v1/predefined_spec.json');

const error = require('../api/shared/middleware/error.middleware');
const config = require('./vars.config');
const authorizers = require('../api/shared/middleware/auth.middleware');

const requestIDMiddleware = require('../api/shared/middleware/reqid.middleware');

const logger = require('./log.config');

logger.initLogConfig();

/**
 * Express instance
 * @public
 */

if (process.env.NODE_ENV === 'production') {
  // Allow : info, error, warn
  // Disable: log, debug, trace
  console.log = () => {};
  console.debug = () => {};
  console.trace = () => {};
}

// Init DB Connectors
oraConnector.init(config);
mysqlConnector.init(config);

const app = express();
let expressOasGenerator;

if (['integration'].includes(config.NODE_ENV)) {
  // eslint-disable-next-line global-require
  const validator = require('express-openapi-validator');
  new validator.OpenApiValidator({
    apiSpec: path.join(__dirname, '../../docs/v1/api.yaml'),
    validateRequests: true, // (default)
    validateResponses: true, // false by default
  }).installSync(app);
}

if (['development', 'test'].includes(config.NODE_ENV)) {
  // eslint-disable-next-line global-require
  expressOasGenerator = require('express-oas-generator');
  expressOasGenerator.handleResponses(app, {
    predefinedSpec: swaggerSpec,
    specOutputPath: './docs/v1/swagger.json',
    writeIntervalMs: 0,
    swaggerUiServePath: 'api-docs',
  });
}

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
if (config.NODE_ENV === 'production') {
  app.use(compress());
}

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());

// Request ID middleware
app.use(requestIDMiddleware.GenerateRequestID());

// mount api v1 routes
app.use('/', appRoutes);
app.use('/v1/public', v1PublicRoutes);
app.use('/v1', authorizers.JWT(), v1SecureRoutes);

// if error is not an instanceOf APIError, convert it.
app.use(error.converter);

// catch 404 and forward to error handler
// for proper API style error message on 404
if (config.NODE_ENV !== 'development') {
  app.use(error.notFound);
}

// error handler, send stacktrace only during development
app.use(error.handler);

if (['development', 'test'].includes(config.NODE_ENV)) {
  expressOasGenerator.handleRequests();
}

if (['development'].includes(config.NODE_ENV)) {
  // Generate JWT Token for use during development
  (async () => {
    // eslint-disable-next-line global-require
    const JWTGenerator = require('../api/shared/utils/JWTGenerator');
    console.log('JWT:', await JWTGenerator.generateJWT());
  })();
}

module.exports = app;
