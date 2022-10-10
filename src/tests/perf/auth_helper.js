/* eslint-disable no-param-reassign */
const jwtGenerator = require('../../api/shared/utils/JWTGenerator');

exports.setupAuthToken = async (context, ee, next) => {
  context.vars.AUTH_TOKEN = await jwtGenerator.generateJWT();
  return next();
};
