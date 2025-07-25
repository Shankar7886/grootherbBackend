// swagger.js (if you're using CommonJS)

const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Tree API',
      version: '1.0.0',
      description: 'Simple API for managing tree data',
    },
    servers: [
      {
        url: 'http://localhost:3000', // Update this if you change the port
      },
    ],
  },
  apis: ['./routes/*.js'], // Files containing Swagger annotations
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
