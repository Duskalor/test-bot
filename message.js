import cron from 'node-cron';
import { getData } from './extractData.js';
// process.loadEnvFile();

const TOKEN_BOT = process.env.TOKEN_BOT;

export const messageToChat = (time = 10, contador) => {
  let value = time;
  if (value < 10) value = 10;
  console.log(`con intervalo de ${value} segundos.`);
  return cron.schedule(`*/${value} * * * * *`, async () => {
    const text = await getData();

    console.log(`scrapping terminado nro ${contador}`);
    console.log(`enviando datos a telegram nro ${contador}`);
    const response = await fetch(
      `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage?chat_id=1974797847&text=${encodeURIComponent(
        text
      )}`
    );

    if (response.ok) {
      console.log(`datos enviados a telegram exitosamente nro ${contador}`);
      contador++;
    } else {
      console.log('error enviando datos a telegram');
    }
  });
};
