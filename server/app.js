const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./auth');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(auth());

// Mount main router.
app.use('/api/v1', router);

// Handle non-existing routes.
app.use((req, res, next) => res.status(404).end());

module.exports = app;
