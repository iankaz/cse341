const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'A RESTful API for managing contacts',
    },
    servers: [
      {
        url: 'https://cse341-rlcp.onrender.com',
        description: 'Production server (Render)',
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec; 