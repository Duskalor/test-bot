import cron from 'node-cron';
// import { getData } from './extractData.js';

// process.loadEnvFile();
import { chromium } from 'playwright';
import { getRemajuData } from './remaju.js';
import { saveDatabase } from './SaveDatabase.js';
// eslint-disable-next-line no-undef
const TOKEN_BOT = process.env.TOKEN_BOT;

const newContext = async () => {
  const browser = await chromium.launch({
    headless: true,
  });
  return await browser.newContext({
    userAgent:
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/109.0',
  });
};
const FilterDatos = 'PRIMERA';

export const messageToChat = async () => {
  console.log(`con intervalo de ${12} horas.`);
  const context = await newContext();
  // '0 */12 * * *';

  return cron.schedule('0 */12 * * *', async () => {
    try {
      const dataDB = await getRemajuData(context);
      if (!dataDB) {
        return console.log('error al obtener datos');
      }
      await saveDatabase(dataDB);
      console.log('scrapping terminado');

      const TerceraConvocatoriaDatos = dataDB.filter((item) =>
        item.title.includes(FilterDatos)
      );

      if (TerceraConvocatoriaDatos > 0) {
        const DatosTelegram = TerceraConvocatoriaDatos.slice(0, 5).map(
          (item) => {
            const text = `${item.title}\n\n${item.type}\n\n${item.location}\n\n${item.description}\n\n${item.price.currency} ${item.price.amount}\n\n`;
            return fetch(
              `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage?chat_id=1974797847&text=${encodeURIComponent(
                text
              )}`
            );
          }
        );

        console.log('enviando datos a telegram !!');
        await Promise.all(DatosTelegram);
      }
    } catch (error) {
      console.log(error);
      console.log('error en el scrapping');
    }
  });
};
