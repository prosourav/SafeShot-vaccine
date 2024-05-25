const conversationAdd = require('./conversationAdd');
const conversationGet = require('./conversationGet');
const messageAdd = require('./messageAdd');
const messageGet = require('./messageGet');
const getAdmin = require('./conversationAdminAdd');

module.exports = {
  conversationAdd,
  conversationGet,
  messageAdd,
  messageGet,
  getAdmin
};