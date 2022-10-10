const featureService = require('./feature.service');

exports.getECMContracts = async (req, res) => {
  try {
    const contractStatus = req.query.contract_status
      ? req.query.contract_status
      : 'A';
    const results = await featureService.retrieveECMContracts(contractStatus);

    // Any additional processing of results
    // or other business logic
    res.send(results.rows);
  } catch (err) {
    console.error('Error in getECMContracts:', err);
    res.status(500).json({
      message: 'Failed to fetch ECM Contracts',
    });
  }
};

exports.saveECMContracts = async (req, res) => {
  try {
    const contractStatus = req.body.contract_status;
    const results = await featureService.retrieveECMContracts(contractStatus);

    // Any additional processing of results
    // or other business logic
    res.send(results.rows);
  } catch (err) {
    console.error('Error in getECMContracts:', err);
    res.status(500).json({
      message: 'Failed to fetch ECM Contracts',
    });
  }
};

exports.getECMContractsAlt = async (req, res) => {
  try {
    const contractStatus = req.query.contract_status
      ? req.query.contract_status
      : 'W';
    const results = await featureService.retrieveECMContractsAlternate(
      contractStatus
    );

    // Any additional processing of results
    // or other business logic

    res.send(results.rows);
  } catch (err) {
    console.error('Error in getECMContractsAlt:', err);
    res.status(500).json({
      message: 'Failed to fetch ECM Contracts',
    });
  }
};

exports.getServiceCategories = async (req, res) => {
  try {
    const results = await featureService.getServiceCategories();

    // Any additional processing of results
    // or other business logic

    res.send(results.rows);
  } catch (err) {
    console.error('Error in getServiceCategories:', err);
    res.status(500).json({
      message: 'Failed to fetch service categories',
    });
  }
};

exports.getOECStats = async (req, res) => {
  try {
    const results = await featureService.getOECStats();

    // Any additional processing of results
    // or other business logic

    res.send(results);
  } catch (err) {
    console.error('Error in getOECStats:', err);
    res.status(500).json({
      message: 'Failed to fetch OEC stats',
    });
  }
};
