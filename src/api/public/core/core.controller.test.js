/* eslint-disable no-useless-escape */
/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const app = require('../../../index');
const JWTGenerator = require('../../shared/utils/JWTGenerator');
const coreService = require('./core.service');

describe('App Controller API', () => {
  // Global variables
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  // Before each
  before(async () => {
    // Prepare Stubs
    authBearerToken = await JWTGenerator.generateJWT();
    console.info('JWT:', authBearerToken);
  });

  after(() => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('should return healthcheck', () => {
    return request(app)
      .get('/healthcheck')
      .set('Authorization', `Bearer ${authBearerToken}`)
      .expect(httpStatus.OK)
      .then((res) => {
        expect(res.body.status).to.be.equal('Ready');
      });
  });

  it('/notfound should return 404', () => {
    return request(app)
      .get('/notfound')
      .set('Authorization', `Bearer ${authBearerToken}`)
      .expect(httpStatus.NOT_FOUND);
  });

  it('/v1/notfound should return 404', () => {
    return request(app)
      .get('/v1/notfound')
      .set('Authorization', `Bearer ${authBearerToken}`)
      .expect(httpStatus.NOT_FOUND);
  });
});

describe('App Controller API : Error cases', () => {
  // Global variables
  const sandbox = sinon.createSandbox();
  let authBearerToken = '';

  // Before each
  before(async () => {
    // Prepare Stubs
    authBearerToken = await JWTGenerator.generateJWT();
    sandbox.stub(coreService, 'healthCheckStatus').throws('Error');
  });

  after(() => {
    // completely restore all fakes created through the sandbox
    sandbox.restore();
  });

  it('should return 500', () => {
    return request(app)
      .get('/healthcheck')
      .set('Authorization', `Bearer ${authBearerToken}`)
      .expect(httpStatus.INTERNAL_SERVER_ERROR);
  });
});
