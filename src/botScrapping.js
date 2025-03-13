import cron from 'node-cron';

import { getRemajuData } from './remaju.js';
import { saveDatabase } from './SaveDatabase.js';
import { sendTelegram } from './services/sendTelegram.js';
import { newContext } from './lib/newContext.js';

export const botScrapping = async () => {
  console.log(`con intervalo de ${12} horas.`);
  const context = await newContext();

  return cron.schedule('*/5 * * * *', async () => {
    console.log('iniciando scrapping..');
    try {
      const dataDB = await getRemajuData(context);
      if (!dataDB) {
        return console.log('error al obtener datos');
      }
      await saveDatabase(dataDB);
      await sendTelegram(dataDB);
      console.log('scrapping terminado');
    } catch (error) {
      console.log(error);
      console.log('error en el scrapping');
    }
  });
};
