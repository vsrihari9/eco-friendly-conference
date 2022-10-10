// const dataSource = require('../../shared/services/oracle-db-adapter.service');
const dataSource = require('@softrams/nodejs-oracle-connector');
const oecDataSource = require('@softrams/nodejs-mysql-connector');

const queries = require('./feature.service.queries');

exports.retrieveECMContracts = async (contractStatus = 'A') => {
  try {
    return await dataSource.execute(
      'oraECMSource',
      // Query
      `SELECT
          contract_id,
          contract_name,
          contract_status,
          joint_venture_flag
      FROM
          contract_management.contract_information
      WHERE
          ROWNUM <= 10
          AND joint_venture_flag =:flag
          AND contract_status =:status`,
      // Params
      { status: contractStatus, flag: 0 }
    );
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

exports.retrieveECMContractsAlternate = async (contractStatus = 'A') => {
  try {
    return await dataSource.execute(
      'oraECMSource',
      // Query
      queries.GET_ECM_CONTRACTS,
      // Params
      [0, contractStatus]
    );
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

exports.getServiceCategories = async () => {
  try {
    return await dataSource.execute(
      'oraECMSource',
      // Query
      queries.GET_SERVICE_CATEGORIES
      // Params
    );
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};

exports.getOECStats = async () => {
  try {
    return await oecDataSource.execute(
      'mysqlOECSource',
      // Query
      `SELECT 
          *
      FROM
          oec_db.oec_stats`
      // Params
    );
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
