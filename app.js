import 'dotenv/config';
import express from 'express';
import { getDatabase } from './src/lib/getDatabase.js';
import { sendTelegram } from './src/lib/sendTelegram.js';
import { cacheMiddleware } from './src/midleware/cache.js';
import { botScrapping } from './src/botScrapping.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3100;

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
let appToSend;

app.get('/iniciar-bot', async (req, res) => {
  console.log('iniciando bot en /iniciar-bot');
  appToSend = await botScrapping();
  res.json({
    message: 'server on, scrapping every 12 hours',
  });
});

app.get('/detener-bot', async (req, res) => {
  console.log('deteniendo bot en /detener-bot');
  appToSend.stop();
  res.json({ message: 'server off' });
});

app.get('/get-data', cacheMiddleware, async (req, res) => {
  console.log('obteniendo datos de /get-data');
  const { data } = await getDatabase();
  res.json({ data });
});

app.get('/test-telegram', cacheMiddleware, async (req, res) => {
  const { data } = await getDatabase();
  await sendTelegram(data);
  return res.json({ text: 'ok' });
});

// app.get('/insert-data', async (req, res) => {
//   const testdata = {
//     title: 'test',
//     type: 'test',
//     location: 'test',
//     ['Offer Date']: {
//       date: 'test',
//       hour: 'test',
//     },
//     process: 'test',
//     description: 'test',
//     price: {
//       currency: 'test',
//       amount: 'test',
//     },
//   };
//   await saveDatabase([testdata]);

//   res.json({ process: 'ok' });
// });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
