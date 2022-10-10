const express = require('express');

const { validate } = require('express-validation');

const validators = require('./feature/feature.schema.validators');

const featureController = require('./feature/feature.controller');

const authMiddleware = require('../shared/middleware/auth.middleware');

const router = express.Router();

router
  .route('/contracts')
  .get(
    validate(validators.get_contracts, { keyByField: true }),
    authMiddleware.RBAC('0000'),
    featureController.getECMContracts
  )
  .post(
    validate(validators.save_contracts, { keyByField: true }),
    authMiddleware.RBAC('0000', 'any'),
    featureController.saveECMContracts
  );

router
  .route('/contracts-alt')
  .get(
    validate(validators.get_contracts, { keyByField: true }),
    authMiddleware.RBAC(['0000', '0025'], 'all'),
    featureController.getECMContractsAlt
  );

router
  .route('/service-categories')
  .get(
    validate(validators.get_contracts, { keyByField: true }),
    featureController.getServiceCategories
  );

router
  .route('/oec-stats')
  .get(
    validate(validators.get_contracts, { keyByField: true }),
    featureController.getOECStats
  );

module.exports = router;
