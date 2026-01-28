const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const errorMiddleware = require('./shared/errors/error.middleware');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swagger');

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*"
}))


app.use('/api', routes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(errorMiddleware);

module.exports = app;
