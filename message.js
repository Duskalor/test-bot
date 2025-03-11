import cron from 'node-cron';
process.loadEnvFile();
const TOKEN_BOT = process.env.TOKEN_BOT;

export const messageToChat = (text, time = 10) => {
  cron.schedule(`*/${time} * * * * *`, () => {
    fetch(
      `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage?chat_id=1974797847&text=${encodeURIComponent(
        text
      )}`
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
  });
};
