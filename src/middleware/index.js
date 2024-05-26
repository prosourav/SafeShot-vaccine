
const logger = require("morgan");
const express = require('express');
const requestIp = require('request-ip');
const cors = require('cors');


const applyMiddleware = (app) => {
  app.use(cors({
    origin: 'https://vaccine-portal-client.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Add other methods if needed
    // credentials: true, // If you're using credentials (e.g., cookies), set this to true
  }));

  app.use(express.json());
  app.use(requestIp.mw())
  app.use(logger("dev"));
  app.use((_req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://vaccine-portal-client.vercel.app')
    next()
  })
};

module.exports = {
  applyMiddleware
};