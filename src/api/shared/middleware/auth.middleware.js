/* eslint-disable no-else-return */
/* eslint-disable function-paren-newline */
/* eslint-disable implicit-arrow-linebreak */
/* istanbul ignore file */
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const config = require('../../../config/vars.config');

// Allowed Scopes for this service as an array of strings.
const serviceAllowedScopes = config.API_SCOPES;
const serviceAllowedAccessTypes = config.USER_ACCESS_TYPES;

const publicKEY = fs.readFileSync(
  path.resolve(__dirname, '../../../../keys/public.pem')
);

function validateJWT(token, aud = 'api.hpms.cms.gov') {
  return new Promise((resolve, reject) => {
    try {
      jwt.verify(
        token,
        publicKEY,
        {
          issuer: 'hpms.cms.gov',
          audience: aud,
          expiresIn: '30m',
          algorithm: 'RS256',
        },
        (err, payload) => {
          if (err) {
            reject(err);
          } else {
            resolve(payload);
          }
        }
      );
    } catch (err) {
      console.error('Failed to verify JWT Token', err);
      reject(err);
    }
  });
}

exports.JWT = (allowAnonymous = false) => async (req, res, next) => {
  const ipaddr =
    (req.headers['x-forwarded-for'] || '').split(',')[0] ||
    req.ip ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
  req.ipaddr = ipaddr;

  try {
    const start = process.hrtime();
    let userId = '[Anon]';

    let authToken = req.get('Authorization');

    let key = 'NA';
    let userType = 'Anon';

    if (authToken) {
      const extApiKeyID = req.get('X-API-CONSUMER-ID');
      const intApiKeyID = req.get('X-API-HPMSUSER-ID');
      let jwtPayLoad;

      // Check for Bearer Token
      // For backward compatibility, Bearer type is optional
      if (authToken.includes('Bearer ')) {
        authToken = authToken.replace('Bearer ', '').trim();
        req.headers.authorization = authToken;
      }

      if (extApiKeyID) {
        // HPMS Externa API Application/User
        jwtPayLoad = await validateJWT(authToken);

        key = crypto
          .publicDecrypt(publicKEY, Buffer.from(jwtPayLoad.key, 'base64'))
          .toString();

        if (extApiKeyID !== key) {
          console.error(
            `APP-SEC-EVENT: API Key does not match. Key: ${key} API Key: ${extApiKeyID} ${ipaddr} ${
              req.method
            } ${req.baseUrl + req.url}`
          );
          return res.status(401).json({ error: 'Invalid Authorization Token' });
        }

        // Check for Service Scopes
        const accessScopes = jwtPayLoad.scopes.split(',').map((x) => x.trim());
        if (!accessScopes.some((x) => serviceAllowedScopes.includes(x))) {
          console.error(
            `APP-SEC-EVENT: Invalid scopes for API Key: ${extApiKeyID} Scopes: ${accessScopes} ${ipaddr} ${
              req.method
            } ${req.baseUrl + req.url}`
          );

          return res.status(401).json({ error: 'Invalid Authorization Token' });
        }

        // Additional validation for HPMS Exterrnal Users
        // as per Module Restrictions etc.
        // TBD

        userId = jwtPayLoad.userId;
        userType = 'HPMS_API_EXT_USER';
      } else if (intApiKeyID) {
        // HPMS Intenal API Application/User
        jwtPayLoad = await validateJWT(authToken);

        key = crypto
          .publicDecrypt(publicKEY, Buffer.from(jwtPayLoad.key, 'base64'))
          .toString();

        if (intApiKeyID !== key) {
          console.error(
            `APP-SEC-EVENT: API Key does not match. Key: ${key} API Key: ${intApiKeyID} ${ipaddr} ${
              req.method
            } ${req.baseUrl + req.url}`
          );
          return res.status(401).json({ error: 'Invalid Authorization Token' });
        }

        // Check for Service Scopes
        const accessScopes = jwtPayLoad.scopes.split(',').map((x) => x.trim());
        if (!accessScopes.some((x) => serviceAllowedScopes.includes(x))) {
          console.error(
            `APP-SEC-EVENT: Invalid scopes for API Key: ${intApiKeyID} Scopes: ${accessScopes} ${ipaddr} ${
              req.method
            } ${req.baseUrl + req.url}`
          );
          return res.status(401).json({ error: 'Invalid Authorization Token' });
        }

        // Additional validation for HPMS Internal Users
        // TBD in Future Releases once ready to support APIs

        userId = jwtPayLoad.userId;
        userType = 'HPMS_API_INT_USER';
      } else {
        // Web API Consumer
        if (process.env.NODE_ENV !== 'production') {
          jwtPayLoad = await validateJWT(authToken, '');
        } else {
          jwtPayLoad = await validateJWT(authToken, ipaddr);
        }

        let allowedTypes = [];
        if (
          jwtPayLoad.userinfo &&
          jwtPayLoad.userinfo.userAccessTypes &&
          jwtPayLoad.userinfo.userAccessTypes.length > 0
        ) {
          allowedTypes = jwtPayLoad.userinfo.userAccessTypes.filter((t) =>
            serviceAllowedAccessTypes.includes(t)
          );
        }

        if (allowedTypes.length === 0) {
          console.error(
            `APP-SEC-EVENT: Attempt to access service with invalid accesstypes detected ${ipaddr} ${
              req.method
            } ${req.baseUrl + req.url}`
          );
          return res.status(401).json({ error: 'Invalid Authorization Token' });
        }

        userType = 'HPMS_API_WEB_USER';
        userId = jwtPayLoad.userId;
        key = userId;
      }

      req.userId = userId;
      req.jwt = jwtPayLoad;
      req.userType = userType;
    } else if (allowAnonymous) {
      // No Auth Token present.
      // Anonymous User
      userType = '[Anon]';
      userId = '[Anon]';
      key = 'NA';
    } else {
      console.error(
        `APP-SEC-EVENT: Attempt to anonymously access secure endpoint detected ${ipaddr} ${
          req.method
        } ${req.baseUrl + req.url}`
      );
      return res.status(401).json({ error: 'Anonymous access prohibited' });
    }

    res.once('finish', () => {
      const diff = process.hrtime(start);
      const ms = Math.round(diff[0] * 1e3 + diff[1] * 1e-6);
      console.info(
        `API-EVENT: ${userType} ${userId} ${key} ${ipaddr} ${req.method} ${
          res.statusCode
        } ${ms} ${req.baseUrl + req.url}`
      );
    });
    return next();
  } catch (error) {
    console.error(
      `APP-SEC-EVENT: Attempt to use an invalid token detected (${
        error.message
      }) ${ipaddr} ${req.method} ${req.baseUrl + req.url}`
    );
    // Do not return actual JWT validation or other internal error
    // Instead use a generic error, not to reveal, for better security
    return res.status(401).json({ error: 'Failed to validate authorization' });
  }
};

exports.RBAC = (accessTypes, matchType = 'any') => async (req, res, next) => {
  if (req.jwt && req.jwt.userinfo && req.jwt.userinfo.userAccessTypes) {
    const chkAccessTypes = Array.isArray(accessTypes)
      ? accessTypes
      : accessTypes.split(',').map((x) => x.trim());
    const reqUserAccessTypes = req.jwt.userinfo.userAccessTypes;
    let matchFound = false;
    if (matchType === 'any') {
      matchFound = chkAccessTypes.some((e) => reqUserAccessTypes.includes(e));
    } else if (matchType === 'all') {
      matchFound = chkAccessTypes.every((e) => reqUserAccessTypes.includes(e));
    }
    if (matchFound) {
      return next();
    } else {
      console.error(
        `APP-SEC-EVENT: RBAC check failed. Attempt to use an unauthorized API endpoint ${
          req.ipaddr
        } ${req.method} ${req.baseUrl + req.url}`
      );
      return res
        .status(401)
        .json({ error: 'Failed to validate authorization' });
    }
  } else {
    console.error(
      `APP-SEC-EVENT: Attempt to use an unauthorized API endpoint ${
        req.ipaddr
      } ${req.method} ${req.baseUrl + req.url}`
    );
    return res.status(401).json({ error: 'Failed to validate authorization' });
  }
};
