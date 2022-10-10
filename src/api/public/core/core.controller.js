// const v1SpecFile = require('../../../../docs/v1/swagger.json');
const coreService = require('./core.service');

exports.healthCheckStatus = async (req, res, next) => {
  try {
    res.send(coreService.healthCheckStatus());
  } catch (err) {
    // Error Handling : Approach 1
    // Just pass error to middelware
    // next(new Error('Failed to retrieve healthcheck status'));

    // Error Handling: Approach 2
    // Explicitly send a response yourself
    res.status(500).json({
      message: 'Failed to retrieve healthcheck status',
    });
  }
};

// exports.apiSpecificationV1 = async (req, res) => {
//   res.send(v1SpecFile);
// };
