const express = require('express');
const appController = require('./core.controller');

const router = express.Router();

router.route('/healthcheck').get(appController.healthCheckStatus);

module.exports = router;
