// load environment variables
require('dotenv').config();

module.exports = {
  port: process.env.PORT || 4000,
  mongoUrl: process.env.MONGODB_URI
}
