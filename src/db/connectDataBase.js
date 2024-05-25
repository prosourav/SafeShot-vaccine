require('dotenv').config();
const { default: mongoose } = require("mongoose");


let connectionUrl = process.env.DB_CONNECTION_URL;
connectionUrl = connectionUrl.replace('<username>', process.env.DB_USER_NAME);
connectionUrl = connectionUrl.replace('<password>', process.env.DB_PASSWORD);
// connectionUrl = `${connectionUrl}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`;


const connectDataBase = async () => {
  await mongoose.connect(connectionUrl, { dbName: process.env.DB_NAME });
  console.log('Database Connection Successful... 😌 ');
};

module.exports = connectDataBase;