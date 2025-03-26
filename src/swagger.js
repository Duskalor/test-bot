// swagger.js
import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Remaju Scraping API',
    version: '1.0.0',
    description: 'API para automatizar y obtener datos de Remaju.',
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
  // eslint-disable-next-line no-undef
  apis: [`${process.cwd()}/src/routes/*.js`],
};

export const swaggerSpec = swaggerJSDoc(options);
