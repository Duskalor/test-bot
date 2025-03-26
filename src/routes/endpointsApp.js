import { Router } from 'express';
import { Scrapping } from '../Scrapping.js';
import { cacheMiddleware } from '../midleware/cache.js';
import { getDatabase } from '../lib/getDatabase.js';
import { tablesDB } from '../utils/const.js';
import { sendTelegram } from '../services/sendTelegram.js';
import { newContext } from '../lib/newContext.js';
import { getPrices } from '../lib/getPrices.js';
import { saveDatabasePrices } from '../lib/savePrices.js';
import { getRemajuData } from '../remaju.js';
import { saveDatabase } from '../SaveDatabase.js';
export const route = Router();

let serverApp;

/**
 * @swagger
 * /iniciar-bot:
 *   get:
 *     summary: Inicia el bot de scrapping
 *     description: Inicia el bot que hace scrapping cada 12 horas
 *     responses:
 *       200:
 *         description: Bot iniciado
 */
route.get('/iniciar-bot', async (req, res) => {
  console.log('iniciando bot en /iniciar-bot');
  serverApp = await Scrapping();
  res.json({
    message: 'server on, scrapping every 12 hours',
  });
});

/**
 * @swagger
 * /detener-bot:
 *   get:
 *     summary: Detiene el bot de scrapping
 *     description: Detiene el bot que hace scrapping cada 12 horas
 *     responses:
 *       200:
 *         description: Bot detenido
 */
route.get('/detener-bot', async (req, res) => {
  console.log('deteniendo bot en /detener-bot');
  serverApp.botPrice.stop();
  serverApp.botScrap.stop();
  res.json({ message: 'server off' });
});

/**
 * @swagger
 * /get-data:
 *   get:
 *     summary: Obtiene datos de la base de datos
 *     description: Retorna datos de la tabla Elements
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 */
route.get('/get-data', cacheMiddleware, async (req, res) => {
  console.log('obteniendo datos de /get-data');
  const { data } = await getDatabase(tablesDB.Elements);
  res.json({ data });
});

/**
 * @swagger
 * /test-telegram:
 *   get:
 *     summary: Enviar datos por Telegram
 *     description: Envía datos de la tabla Elements a Telegram
 *     responses:
 *       200:
 *         description: Datos enviados exitosamente
 */
route.get('/test-telegram', cacheMiddleware, async (req, res) => {
  const { data } = await getDatabase(tablesDB.Elements);
  await sendTelegram(data);
  return res.json({ text: 'ok' });
});

/**
 * @swagger
 * /test-price:
 *   get:
 *     summary: Obtener y guardar precios
 *     description: Obtiene los precios y los guarda en la base de datos
 *     responses:
 *       200:
 *         description: Precios obtenidos y guardados
 */
route.get('/test-price', async (req, res) => {
  const context = await newContext();
  const prices = await getPrices(context);
  await saveDatabasePrices(prices);
  console.log({ prices });
  res.json({ prices });
});

/**
 * @swagger
 * /test-remaju:
 *   get:
 *     summary: Realiza scrapping de Remaju
 *     description: Obtiene datos de Remaju y los guarda en la base de datos
 *     responses:
 *       200:
 *         description: Scrapping de Remaju completado
 */
route.get('/test-remaju', async (req, res) => {
  console.log('probando scrapping ...');
  const context = await newContext();
  const dataDB = await getRemajuData(context);
  await saveDatabase(dataDB);
  await sendTelegram(dataDB);
  res.json({ msg: 'iniciando test - test-remaju' });
});

/**
 * @swagger
 * /test:
 *   get:
 *     summary: Ruta de prueba
 *     description: Muestra un mensaje de prueba
 *     responses:
 *       200:
 *         description: hola mundo
 */
route.get('/test', (req, res) => {
  console.log('hola mundo');
  res.json({ msg: 'hola mundo' });
});

// Ejemplo comentado
// route.get('/insert-data', async (req, res) => {
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
