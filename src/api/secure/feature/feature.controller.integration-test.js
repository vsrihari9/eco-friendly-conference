/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const dbSource = require('@softrams/nodejs-oracle-connector');
const app = require('../../../index');

const JWTGenerator = require('../../shared/utils/JWTGenerator');

describe('Feature.Controller.Tests', () => {
  describe('Get Contracts Controller API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', () => {
      return request(app)
        .get('/v1/contracts')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it('should return 400', () => {
      return request(app)
        .get('/v1/contracts?contract_status=X')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.be.equal('Validation Failed');
          expect(res.body.errors.length).to.be.greaterThan(0);
        });
    });
  });

  describe('Get Contracts Alt Controller API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', () => {
      return request(app)
        .get('/v1/contracts-alt')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it('should return 400', () => {
      return request(app)
        .get('/v1/contracts-alt?contract_status=X')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.be.equal('Validation Failed');
          expect(res.body.errors.length).to.be.greaterThan(0);
        });
    });
  });

  describe('Get Service Categories Controller API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', () => {
      return request(app)
        .get('/v1/service-categories')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it('should return 400', () => {
      return request(app)
        .get('/v1/service-categories?dummy=X')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.be.equal('Validation Failed');
          expect(res.body.errors.length).to.be.greaterThan(0);
        });
    });
  });

  describe('Get OEC Stats Controller API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', () => {
      return request(app)
        .get('/v1/oec-stats')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it('should return 400', () => {
      return request(app)
        .get('/v1/oec-stats?dummy=X')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.be.equal('Validation Failed');
          expect(res.body.errors.length).to.be.greaterThan(0);
        });
    });
  });

  describe('Get Contracts Controller API : Custom Errors', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
      sandbox.stub(dbSource, 'execute').throws('Database Internal Error');
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return custom error message', () => {
      return request(app)
        .get('/v1/contracts')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.be.not.equal('Database Internal Error');
        });
    });
  });
});
