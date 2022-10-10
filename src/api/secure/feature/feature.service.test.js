/* eslint-disable arrow-body-style */
/* eslint-disable no-unused-expressions */
const { expect } = require('chai');
const sinon = require('sinon');
const dbSource = require('@softrams/nodejs-oracle-connector');
const oecSource = require('@softrams/nodejs-mysql-connector');
const featureService = require('./feature.service');

describe('Feature.Service.Tests', () => {
  describe('Get Contracts API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();

    // Before each
    before(async () => {
      // Prepare Stubs
      sandbox.stub(dbSource, 'execute').resolves([
        {
          CONTRACT_ID: 'H5009',
          CONTRACT_NAME: 'REGENCE BLUESHIELD',
          CONTRACT_STATUS: 'A',
          JOINT_VENTURE_FLAG: '0',
        },
      ]);
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', async () => {
      const results = await featureService.retrieveECMContracts();
      expect(results).to.be.an('array');
      expect(results.length).to.be.equal(1);
    });
  });

  describe('Get Contracts(Alt) API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();

    // Before each
    before(async () => {
      // Prepare Stubs
      sandbox.stub(dbSource, 'execute').resolves([
        {
          CONTRACT_ID: 'H5009',
          CONTRACT_NAME: 'REGENCE BLUESHIELD',
          CONTRACT_STATUS: 'A',
          JOINT_VENTURE_FLAG: '0',
        },
      ]);
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', async () => {
      const results = await featureService.retrieveECMContractsAlternate();
      expect(results).to.be.an('array');
      expect(results.length).to.be.equal(1);
    });
  });

  describe('Get Service Categories API : Custom Errors', () => {
    // Global variables
    const sandbox = sinon.createSandbox();

    // Before each
    before(async () => {
      // Prepare Stubs
      sandbox.stub(dbSource, 'execute').throws('Database Internal Error');
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return an exception', async () => {
      try {
        await featureService.retrieveECMContractsAlternate();
        expect(true).to.be.equal(false);
      } catch (err) {
        console.log('Cause error:', err);
        expect(err.name).to.be.equal('Error');
      }
    });
  });

  describe('Get Service Categories API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();

    // Before each
    before(async () => {
      // Prepare Stubs
      sandbox.stub(dbSource, 'execute').resolves([
        {
          SERVICE_CATEGORY_ID: '1',
          TITLE: 'Inpatient Hospital Services',
          SUBCATEGORY: 'N',
          DESCRIPTION: 'See subcategories',
          ADDLDESCRIPTION: '',
        },
      ]);
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return valid values', async () => {
      const results = await featureService.getServiceCategories();
      expect(results).to.be.an('array');
      expect(results.length).to.be.equal(1);
    });
  });

  describe('Get Service Categories API : Custom Errors', () => {
    // Global variables
    const sandbox = sinon.createSandbox();

    // Before each
    before(async () => {
      // Prepare Stubs
      sandbox.stub(dbSource, 'execute').throws('Database Internal Error');
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return an exception', async () => {
      try {
        await featureService.getServiceCategories();
        expect(true).to.be.equal(false);
      } catch (err) {
        console.log('Cause error:', err);
        expect(err.name).to.be.equal('Error');
      }
    });
  });

  describe('Get OEC Stats API', () => {
    // Global variables
    const sandbox = sinon.createSandbox();

    // Before each
    before(async () => {
      // Prepare Stubs
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

    it('should return valid values', async () => {
      const results = await featureService.getOECStats();
      expect(results).to.be.an('array');
      expect(results.length).to.be.equal(1);
    });
  });

  describe('Get OEC Stats API : Custom Errors', () => {
    // Global variables
    const sandbox = sinon.createSandbox();

    // Before each
    before(async () => {
      // Prepare Stubs
      sandbox.stub(oecSource, 'execute').throws('Database Internal Error');
    });

    after(() => {
      // completely restore all fakes created through the sandbox
      sandbox.restore();
    });

    it('should return an exception', async () => {
      try {
        await featureService.getOECStats();
        expect(true).to.be.equal(false);
      } catch (err) {
        console.log('Cause error:', err);
        expect(err.name).to.be.equal('Error');
      }
    });
  });
});
