require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI ,
  SOILGRIDS_BASE: process.env.SOILGRIDS_BASE || 'https://rest.isric.org/gridded-data'
};
