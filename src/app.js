const express = require('express');
const { applyMiddleware } = require('./middleware/index');
const routes = require('./routes');

const handleGlobalError = require('./middleware/handleGlobalError');
const notFoundError = require('./middleware/notFoundError');

const app = express();

applyMiddleware(app);

app.get('/health', (_req, res) => res.status(200).json({ health: 'OK' }));
app.use(routes);
app.use('*', notFoundError);
app.use(handleGlobalError);

module.exports = app;