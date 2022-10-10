const Joi = require('../../../config/validator.config');

module.exports = {
  // GET /v1/contracts
  get_contracts: {
    query: Joi.object({
      contract_status: Joi.string().length(1).valid('A', 'W'),
    }),
  },
  save_contracts: {
    query: Joi.object({}), // ** MANDATORY **
    headers: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(true), // allow additional headers
    body: Joi.object({
      contract_status: Joi.string().length(1).valid('A', 'W').required(),
    }),
  },
};
