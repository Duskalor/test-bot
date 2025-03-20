import cron from 'node-cron';

import { getRemajuData } from './remaju.js';
import { saveDatabase } from './SaveDatabase.js';
import { sendTelegram } from './services/sendTelegram.js';
import { newContext } from './lib/newContext.js';
import { getPrices } from './lib/getPrices.js';
import { saveDatabasePrices } from './lib/savePrices.js';

export const Scrapping = async () => {
  console.log('intervalo de 1 dia remaju');
  console.log('intervalo de 12 horas precios');

  //'*/5 * * * *' cada 5 minutos
  // '0 0 */12 * * *' cada 12 horas
  //'0 0 */6 * * *' cada 6 horas
  // "0 0 0 * * *" cada dia

  const botPrice = cron.schedule('0 0 */6 * * *', async () => {
    console.log('iniciando scrapping..');
    const context = await newContext();
    try {
      console.log('obteniendo precios');
      const prices = await getPrices(context);
      if (!prices) return;
      console.log('guardando precios');
      await saveDatabasePrices(prices);
    } catch (error) {
      console.log(error);
    } finally {
      context.close();
    }
  });

  const botScrap = cron.schedule('0 0 0 * * *', async () => {
    console.log('iniciando scrapping..');
    const context = await newContext();

    try {
      const dataDB = await getRemajuData(context);
      if (dataDB.length === 0) {
        return console.log('error al obtener datos');
      }
      await saveDatabase(dataDB);
      await sendTelegram(dataDB);
      console.log('scrapping terminado');
    } catch (error) {
      console.log(error);
      console.log('error en el scrapping');
    } finally {
      context.close();
    }
  });

  return {
    botPrice,
    botScrap,
  };
};
