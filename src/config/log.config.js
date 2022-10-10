/* istanbul ignore file */
if (process.env.NODE_ENV === 'production') {
  // Allow : info, error, warn
  // Disable: log, debug, trace
  console.log = () => {};
  console.debug = () => {};
  console.trace = () => {};
}

function getLogMessage(args) {
  const prefix = global.REQUEST_ID ? `Req:${global.REQUEST_ID} ` : '';
  return `${prefix}${args.join('')}`;
}

const { log, debug, trace, info, warn, error } = console;
exports.initLogConfig = () => {
  console.error = (...args) => {
    error(getLogMessage(args));
  };
  console.warn = (...args) => {
    warn(getLogMessage(args));
  };
  console.info = (...args) => {
    info(getLogMessage(args));
  };
  console.trace = (...args) => {
    trace(getLogMessage(args));
  };
  console.debug = (...args) => {
    debug(getLogMessage(args));
  };
  console.log = (...args) => {
    log(getLogMessage(args));
  };
};
