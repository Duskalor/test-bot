import cron from 'node-cron';

import { getRemajuData } from './remaju.js';
import { saveDatabase } from './SaveDatabase.js';
import { sendTelegram } from './services/sendTelegram.js';
import { newContext } from './lib/newContext.js';

export const botScrapping = async () => {
  console.log(`con intervalo de ${12} horas.`);
  const context = await newContext();
  //'*/5 * * * *' cada 5 minutos
  // '0 0 */12 * * *' cada 12 horas
  //'0 0 */6 * * *' cada 6 horas

  return cron.schedule('0 0 */6 * * *', async () => {
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
