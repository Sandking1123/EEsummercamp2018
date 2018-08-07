const express = require('express');
const router = require('./router');

const app = express();

// Mount main router.
app.use('/api/v1', router);

// Handle non-existing routes.
app.use((req, res, next) => res.status(404).end());

module.exports = app;
