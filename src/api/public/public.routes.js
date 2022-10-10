const express = require('express');

const router = express.Router();

// Enable API Specification Route
// Default: Disabled in production environment
// if (process.env.NODE_ENV !== 'production') {
//   router.route('/api-spec').get(appController.apiSpecificationV1);
// }

module.exports = router;
