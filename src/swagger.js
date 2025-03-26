// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de scrapping Remaju',
    version: '1.0.0',
    description: 'Documentación de mi API Remaju',
  },
  servers: [
    {
      url: 'http://localhost:3100/api',
      description: 'Servidor de desarrollo',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/endpointsApp.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
