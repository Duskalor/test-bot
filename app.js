import 'dotenv/config';
import express from 'express';
import { getDatabase } from './src/lib/getDatabase.js';
import { sendTelegram } from './src/services/sendTelegram.js';
import { cacheMiddleware } from './src/midleware/cache.js';
import { Scrapping } from './src/Scrapping.js';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { tablesDB } from './src/utils/const.js';
import { newContext } from './src/lib/newContext.js';
import { getPrices } from './src/lib/getPrices.js';
import { saveDatabasePrices } from './src/lib/savePrices.js';
import { getRemajuData } from './src/remaju.js';

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3100;

const app = express();
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));
let serverApp;

app.get('/iniciar-bot', async (req, res) => {
  console.log('iniciando bot en /iniciar-bot');
  serverApp = await Scrapping();
  res.json({
    message: 'server on, scrapping every 12 hours',
  });
});

app.get('/detener-bot', async (req, res) => {
  console.log('deteniendo bot en /detener-bot');
  serverApp.botPrice.stop();
  serverApp.botScrap.stop();
  res.json({ message: 'server off' });
});

app.get('/get-data', cacheMiddleware, async (req, res) => {
  console.log('obteniendo datos de /get-data');
  const { data } = await getDatabase(tablesDB.Elements);
  res.json({ data });
});

app.get('/test-telegram', cacheMiddleware, async (req, res) => {
  const { data } = await getDatabase(tablesDB.Elements);
  await sendTelegram(data);
  return res.json({ text: 'ok' });
});

app.get('/test-price', async (req, res) => {
  const context = await newContext();
  const prices = await getPrices(context);
  await saveDatabasePrices(prices);
  console.log({ prices });
  res.json({ prices });
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

app.get('/test-remaju', async (req, res) => {
  console.log('probando scrapping ...');
  const context = await newContext();
  await getRemajuData(context);
  res.json({ msg: 'iniciando test - test-remaju' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
