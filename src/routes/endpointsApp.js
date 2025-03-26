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
 * tags:
 *   - name: Bot
 *     description: Rutas para controlar el bot de scrapping
 *   - name: Datos
 *     description: Rutas para obtener datos de la base de datos
 *   - name: Scraping
 *     description: Rutas relacionadas con scraping
 *   - name: Notificación
 *     description: Rutas para notificaciones y envío de datos
 *   - name: Pruebas
 *     description: Rutas de prueba
 */

/**
 * @swagger
 * /api/bot/start:
 *   get:
 *     tags:
 *       - Bot
 *     summary: Inicia el bot de scrapping
 *     description: Inicia el bot que hace scrapping cada 12 horas
 *     responses:
 *       200:
 *         description: Bot iniciado
 */
route.get('/bot/start', async (req, res) => {
  serverApp = await Scrapping();
  res.json({ message: 'server on, scrapping every 12 hours' });
});

/**
 * @swagger
 * /api/bot/stop:
 *   get:
 *     tags:
 *       - Bot
 *     summary: Detiene el bot de scrapping
 *     description: Detiene el bot que hace scrapping cada 12 horas
 *     responses:
 *       200:
 *         description: Bot detenido
 */
route.get('/bot/stop', async (req, res) => {
  serverApp.botPrice.stop();
  serverApp.botScrap.stop();
  res.json({ message: 'server off' });
});

/**
 * @swagger
 * /api/data:
 *   get:
 *     tags:
 *       - Datos
 *     summary: Obtiene datos de la base de datos
 *     description: Retorna datos de la tabla Elements
 *     responses:
 *       200:
 *         description: Datos obtenidos exitosamente
 */
route.get('/data', cacheMiddleware, async (req, res) => {
  const { data } = await getDatabase(tablesDB.Elements);
  res.json({ data });
});

/**
 * @swagger
 * /api/scraping/remaju:
 *   get:
 *     tags:
 *       - Scraping
 *     summary: Realiza scraping de Remaju
 *     description: Obtiene datos de Remaju y los guarda en la base de datos
 *     responses:
 *       200:
 *         description: Scraping de Remaju completado
 */
route.get('/scraping/remaju', async (req, res) => {
  const context = await newContext();
  const dataDB = await getRemajuData(context);
  await saveDatabase(dataDB);
  await sendTelegram(dataDB);
  res.json({ msg: 'iniciando test - remaju' });
});

/**
 * @swagger
 * /api/scraping/prices:
 *   get:
 *     tags:
 *       - Scraping
 *     summary: Obtener y guardar precios
 *     description: Obtiene los precios y los guarda en la base de datos
 *     responses:
 *       200:
 *         description: Precios obtenidos y guardados
 */
route.get('/scraping/prices', async (req, res) => {
  const context = await newContext();
  const prices = await getPrices(context);
  await saveDatabasePrices(prices);
  res.json({ prices });
});

/**
 * @swagger
 * /api/notification/telegram:
 *   get:
 *     tags:
 *       - Notificación
 *     summary: Enviar datos por Telegram
 *     description: Envía datos de la tabla Elements a Telegram
 *     responses:
 *       200:
 *         description: Datos enviados exitosamente
 */
route.get('/notification/telegram', cacheMiddleware, async (req, res) => {
  const { data } = await getDatabase(tablesDB.Elements);
  await sendTelegram(data);
  res.json({ text: 'ok' });
});

/**
 * @swagger
 * /api/test:
 *   get:
 *     tags:
 *       - Pruebas
 *     summary: Ruta de prueba
 *     description: Muestra un mensaje de prueba
 *     responses:
 *       200:
 *         description: hola mundo
 */
route.get('/test', (req, res) => {
  res.json({ msg: 'hola mundo' });
});
