import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import { route } from './src/routes/endpointsApp.js';
import { swaggerSpec } from './src/swagger.js';
import morgan from 'morgan';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3100;
const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.use('/api', route);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
