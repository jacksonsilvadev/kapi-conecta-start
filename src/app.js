const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logMiddleware = require('./middleware/log.middleware');
const logger = require('./utils/logger');

const routes = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(logMiddleware);

app.use(routes);

app.use((error, request, response) => {
  logger.error(error);
  response.status(error.status || 500);
  return response.send({
    error: {
      mensagem: error.message
    },
  });
});

module.exports = app;
