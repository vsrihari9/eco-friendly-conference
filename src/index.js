const config = require('./config/vars.config');
const app = require('./config/express.config');

// listen to requests
app.listen(config.PORT, () => {
  console.info(`server started on port ${config.PORT} (${config.NODE_ENV})`);
});

// process.on('beforeExit', (code) => {
//   console.info('Process beforeExit event with code: ', code);
// });

// process.on('exit', (code) => {
//   console.info('Process exit event with code: ', code);
// });

/**
 * Exports express
 * @public
 */
module.exports = app;
