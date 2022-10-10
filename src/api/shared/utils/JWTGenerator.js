const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const config = require('../../../config/vars.config');

const privateKEY = fs.readFileSync(
  path.resolve(__dirname, '../../../../keys/private.pem')
);

const signOptions = {
  issuer: 'hpms.cms.gov',
  audience: '',
  expiresIn: '30m',
  algorithm: 'RS256',
};

exports.generateJWT = async (payload) => {
  const jwtPayload = payload || {
    userId: 'XXXX',
    userinfo: {
      userAccessTypes: config.USER_ACCESS_TYPES,
    },
  };
  // For local testing, do not include audience
  signOptions.audience = '';
  return jwt.sign(jwtPayload, privateKEY, signOptions);
};
