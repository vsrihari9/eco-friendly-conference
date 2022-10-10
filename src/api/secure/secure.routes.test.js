/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const JWTGenerator = require('../shared/utils/JWTGenerator');
const routes = require('../shared/utils/AppRoutes');
const app = require('../../index');

const expiredToken =
  'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.' +
  'eyJpYXQiOjE1OTAyNzkxODUsImV4cCI6MTU5MDI4MDk4NSwiYXVkIjoiIiwiaXNzIjoiaHBtcy5jbXMuZ292In0.' +
  'AlVFjsGAWKmFbbv66i7J7C1Ra-i6oBsfcUdQqWSUnqduvDFQ3b2MAvDrMoE54X-IvSR6u1VazIc7p3xYCZOxSQ';

describe('Mandatory Input Validation Checks : Ensure mandatory validators for each request', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (r.route.startsWith('/v1/') && !r.route.startsWith('/v1/public/')) {
      it(`Route ${r.method} ${r.route} should have input validator`, () => {
        // More than one handler, indicates a middleware function attached
        // other than the request handler. This will ensure at least there is
        // some middleware, even if its not necessarily input validator
        expect(r.stack.length).to.be.greaterThan(1);
      });
    }
  });
});

//  #region GET Method Checks

// GET Method Checks
// 1. Reject without a token
describe('Authorization : Ensure rejection without token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'GET'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return (
          request(app)
            .get(`${r.route}`)
            //  .set('Authorization', `Bearer ${authBearerToken}`)
            .expect(httpStatus.UNAUTHORIZED)
        );
      });
    }
  });
});

// GET Method Checks
// 2. Reject expired tokens
describe('Authorization : Ensure rejection with expired token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'GET'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .get(`${r.route}`)
          .set('Authorization', `Bearer ${expiredToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// GET Method Checks
// 3. Reject malformed tokens
describe('Authorization : Ensure rejection without valid token', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';
  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'GET'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .get(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}.x`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// GET methods
// 4. Reject unexpected parameters
describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'GET'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .get(`${r.route}?dummy=x`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

//  #endregion

//  #region POST Method Checks

// POST Method Checks
// Reject requests without a token
describe('Authorization : Ensure rejection without token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'POST'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return (
          request(app)
            .post(`${r.route}`)
            //  .set('Authorization', `Bearer ${authBearerToken}`)
            .expect(httpStatus.UNAUTHORIZED)
        );
      });
    }
  });
});

// POST Method Checks
// Reject invalid tokens
describe('Authorization : Ensure rejection without valid token', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';
  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'POST'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .post(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}.x`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// POST
// Reject expired tokens
describe('Authorization : Ensure rejection with expired token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'POST'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .post(`${r.route}`)
          .set('Authorization', `Bearer ${expiredToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// POST methods
// Reject unexpected parameters in Query String

describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'POST'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .post(`${r.route}?dummy=x`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// POST Dummy element in body
// Reject unexpected parameters in body
describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'POST'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .post(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .send({ dummy: 'Y' })
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// #endregion

//  #region PUT Method Checks

// PUT Method Checks
// Reject requests without a token
describe('Authorization : Ensure rejection without token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PUT'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return (
          request(app)
            .put(`${r.route}`)
            //  .set('Authorization', `Bearer ${authBearerToken}`)
            .expect(httpStatus.UNAUTHORIZED)
        );
      });
    }
  });
});

// PUT Method Checks
// Reject invalid tokens
describe('Authorization : Ensure rejection without valid token', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';
  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PUT'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .put(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}.x`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// PUT
// Reject expired tokens
describe('Authorization : Ensure rejection with expired token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PUT'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .put(`${r.route}`)
          .set('Authorization', `Bearer ${expiredToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// PUT methods
// Reject unexpected parameters in Query String

describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PUT'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .put(`${r.route}?dummy=x`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// PUT Dummy element in body
// Reject unexpected parameters in body
describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PUT'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .put(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .send({ dummy: 'Y' })
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// #endregion

//  #region PATCH Method Checks

// PATCH Method Checks
// Reject requests without a token
describe('Authorization : Ensure rejection without token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PATCH'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return (
          request(app)
            .patch(`${r.route}`)
            //  .set('Authorization', `Bearer ${authBearerToken}`)
            .expect(httpStatus.UNAUTHORIZED)
        );
      });
    }
  });
});

// PATCH Method Checks
// Reject invalid tokens
describe('Authorization : Ensure rejection without valid token', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';
  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PATCH'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .patch(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}.x`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// PATCH
// Reject expired tokens
describe('Authorization : Ensure rejection with expired token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PATCH'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .patch(`${r.route}`)
          .set('Authorization', `Bearer ${expiredToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// PATCH methods
// Reject unexpected parameters in Query String

describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PATCH'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .patch(`${r.route}?dummy=x`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// PATCH Dummy element in body
// Reject unexpected parameters in body
describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'PATCH'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .patch(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .send({ dummy: 'Y' })
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// #endregion

//  #region DELETE Method Checks

// DELETE Method Checks
// Reject requests without a token
describe('Authorization : Ensure rejection without token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'DELETE'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return (
          request(app)
            .delete(`${r.route}`)
            //  .set('Authorization', `Bearer ${authBearerToken}`)
            .expect(httpStatus.UNAUTHORIZED)
        );
      });
    }
  });
});

// DELETE Method Checks
// Reject invalid tokens
describe('Authorization : Ensure rejection without valid token', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';
  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'DELETE'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .delete(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}.x`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// DELETE
// Reject expired tokens
describe('Authorization : Ensure rejection with expired token', () => {
  const sandbox = sinon.createSandbox();
  before(() => {
    sandbox.restore();
  });

  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'DELETE'
    ) {
      it(`Route ${r.method} ${r.route} should fail with 401`, () => {
        return request(app)
          .delete(`${r.route}`)
          .set('Authorization', `Bearer ${expiredToken}`)
          .expect(httpStatus.UNAUTHORIZED);
      });
    }
  });
});

// DELETE methods
// Reject unexpected parameters in Query String

describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'DELETE'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .delete(`${r.route}?dummy=x`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// DELETE Dummy element in body
// Reject unexpected parameters in body
describe('Mandatory Input Validation Checks : Ensure unexpected parameters are rejected', () => {
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  before(async () => {
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.restore();
  });
  routes.forEach((r) => {
    if (
      r.route.startsWith('/v1/') &&
      !r.route.startsWith('/v1/public/') &&
      r.method === 'DELETE'
    ) {
      it(`Route ${r.method} ${r.route} should fail in input validation`, () => {
        return request(app)
          .delete(`${r.route}`)
          .set('Authorization', `Bearer ${authBearerToken}`)
          .send({ dummy: 'Y' })
          .expect(httpStatus.BAD_REQUEST)
          .then((res) => {
            expect(res.body.message).to.be.equal('Validation Failed');
            expect(res.body.errors.length).to.be.greaterThan(0);
          });
      });
    }
  });
});

// #endregion
