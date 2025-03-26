import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import morgan from 'morgan';
import { swaggerSpec } from './swagger.js';
import swaggerUi from 'swagger-ui-express';
import { route } from './src/routes/endpointsApp.js';
// import { route } from './src/routes/endpointsApp.js';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3100;

const app = express();
app.use(cors());
app.use(helmet());
// app.use(morgan('combined'));

app.use('/api', route);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
