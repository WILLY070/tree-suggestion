require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://willykavevamuia_db_user:iWpQUluDBAVgQPaM@cluster0.zi8vgh4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
  SOILGRIDS_BASE: process.env.SOILGRIDS_BASE || 'https://rest.isric.org/gridded-data'
};
