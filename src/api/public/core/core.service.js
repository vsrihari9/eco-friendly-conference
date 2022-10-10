const config = require('../../../config/vars.config');

const startedTime = new Date();

exports.healthCheckStatus = () => {
  const upTime = (Date.now() - Number(startedTime)) / 1000;
  return {
    name: config.APP_NAME,
    status: 'Ready',
    version: config.APP_VERSION,
    started: startedTime.toISOString(),
    uptime: upTime,
    currentTime: new Date().toISOString(),
  };
};
