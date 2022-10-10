/* istanbul ignore file */
module.exports = {
  APP_ROOT_PREFIX: process.env.APP_ROOT_PREFIX || '',
  APP_NAME: process.env.APP_NAME || 'API Micro-Service',
  APP_VERSION: process.env.app_ver || '0.0',
  NODE_ENV: process.env.NODE_ENV || 'production',
  PORT: process.env.PORT || '3100',
  LOGTYPE: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  USER_ACCESS_TYPES: ['0000', '0025'],
  API_SCOPES: ['api_test', 'api_consumer'],
  DATASOURCES: {
    oraECMSource: {
      DB_HOST: 'hpms-oracle-test.ctjrbdbbvxb9.us-east-1.rds.amazonaws.com',
      DB_USER: '',
      DB_PASSWORD: '',
      DB_PORT: 1521,
      DB_DATABASE: 'HPMSTEST',
    },
    mysqlOECSource: {
      DB_HOST:
        'hpms-aurora-dev1.cluster-ctjrbdbbvxb9.us-east-1.rds.amazonaws.com',
      DB_USER: '',
      DB_PASSWORD: '',
      DB_PORT: 3306,
      DB_DATABASE: 'oec_db',
    },
  },
};
