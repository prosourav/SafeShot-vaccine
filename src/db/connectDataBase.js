require('dotenv').config();
const { default: mongoose } = require("mongoose");


let connectionUrl = process.env.DB_CONNECTION_URL;
connectionUrl = `${connectionUrl}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`;


const connectDataBase = async () => {
  await mongoose.connect(`mongodb://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@mongodb:27017/${process.env.DB_NAME}?authSource=admin`);  
};

module.exports = connectDataBase;