require('dotenv').config();
const fs = require('fs');
const config = JSON.parse(fs.readFileSync('config.json', 'utf8'));
console.log(config +"ini config")

module.exports = {
  // config.host= process.env.DB_HOST,
  // config.username= process.env.DB_USER,
  // config.password= process.env.DB_PASSWORD,
  // config.database= process.env.DB_NAME,
  // config.dialect= "mysql",
  PORT: process.env.DB_PORT
};
