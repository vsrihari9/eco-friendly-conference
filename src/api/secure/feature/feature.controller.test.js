/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const request = require('supertest');
const httpStatus = require('http-status');
const { expect } = require('chai');
const sinon = require('sinon');
const dbSource = require('@softrams/nodejs-oracle-connector');
const oecSource = require('@softrams/nodejs-mysql-connector');

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
      sandbox.stub(dbSource, 'execute').resolves({
        rows: [
          {
            CONTRACT_ID: 'H5009',
            CONTRACT_NAME: 'REGENCE BLUESHIELD',
            CONTRACT_STATUS: 'A',
            JOINT_VENTURE_FLAG: '0',
          },
        ],
      });
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

    it('should return valid values', () => {
      return request(app)
        .get('/v1/contracts?contract_status=W')
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

describe('Feature.Controller.Tests', () => {
  describe('POST Contracts Controller API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
      sandbox.stub(dbSource, 'execute').resolves({
        rows: [
          {
            CONTRACT_ID: 'H5009',
            CONTRACT_NAME: 'REGENCE BLUESHIELD',
            CONTRACT_STATUS: 'A',
            JOINT_VENTURE_FLAG: '0',
          },
        ],
      });
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', () => {
      return request(app)
        .post('/v1/contracts')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .send({ contract_status: 'A' })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.length).to.be.greaterThan(0);
        });
    });

    it('should return 400', () => {
      return request(app)
        .post('/v1/contracts?contract_status=X')
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
        .post('/v1/contracts')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .send({ contract_status: 'A' })
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.be.not.equal('Database Internal Error');
        });
    });
  });
});

describe('Feature.Controller.Tests', () => {
  describe('Get Contracts Controller API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
      sandbox.stub(dbSource, 'execute').resolves({
        rows: [
          {
            CONTRACT_ID: 'H5009',
            CONTRACT_NAME: 'REGENCE BLUESHIELD',
            CONTRACT_STATUS: 'A',
            JOINT_VENTURE_FLAG: '0',
          },
        ],
      });
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

    it('should return valid values', () => {
      return request(app)
        .get('/v1/contracts-alt?contract_status=A')
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
        .get('/v1/contracts-alt')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.be.not.equal('Database Internal Error');
        });
    });
  });
});

describe('Feature.Controller.Tests', () => {
  describe('Get Service Categories Controller API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
      sandbox.stub(dbSource, 'execute').resolves({
        rows: [
          {
            SERVICE_CATEGORY_ID: '1',
            TITLE: 'Inpatient Hospital Services',
            SUBCATEGORY: 'N',
            DESCRIPTION: 'See subcategories',
            ADDLDESCRIPTION: '',
          },
        ],
      });
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
        .get('/v1/service-categories?contract_status=X')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.be.equal('Validation Failed');
          expect(res.body.errors.length).to.be.greaterThan(0);
        });
    });
  });
  describe('Get Service Categories Controller API : Custom Errors', () => {
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
        .get('/v1/service-categories')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.be.not.equal('Database Internal Error');
        });
    });
  });
});

describe('Feature.Controller.Tests', () => {
  describe('Get OEC Stats API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
      sandbox.stub(oecSource, 'execute').resolves([
        {
          CNTRCT_ID: 'H0022',
          CNTRCT_YEAR: '2019',
          ENRLMT_FIL_DT: '2019-12-04T06:00:00.000Z',
          ENRLMT_DWNLDED: 1,
          ENRLMT_NOT_DWNLDED: 0,
          DLNQNT_ENRLMTS: 0,
          CREATD_DT: '2019-12-10T19:18:32.000Z',
          CREATD_BY: 'TEST',
          LAST_UPDTD_DT: '2019-12-12T09:00:00.000Z',
          LAST_UPDTD_BY: 'OECSYS',
        },
      ]);
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
        .get('/v1/oec-stats?contract_status=X')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.BAD_REQUEST)
        .then((res) => {
          expect(res.body.message).to.be.equal('Validation Failed');
          expect(res.body.errors.length).to.be.greaterThan(0);
        });
    });
  });
  describe('Get OEC Stats API : Custom Errors', () => {
    // Global variables
    const sandbox = sinon.createSandbox();
    let authBearerToken = ''; //

    // Before each
    before(async () => {
      // Prepare Stubs
      authBearerToken = await JWTGenerator.generateJWT();
      sandbox.stub(oecSource, 'execute').throws('Database Internal Error');
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return custom error message', () => {
      return request(app)
        .get('/v1/oec-stats')
        .set('Authorization', `Bearer ${authBearerToken}`)
        .expect(httpStatus.INTERNAL_SERVER_ERROR)
        .then((res) => {
          expect(res.body.message).to.be.not.equal('Database Internal Error');
        });
    });
  });
});
