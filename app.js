import cron from 'node-cron';

process.loadEnvFile();
const TOKEN_BOT = process.env.TOKEN_BOT;

cron.schedule('*/3 * * * * *', () => {
  fetch(
    `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage?chat_id=1974797847&text=${encodeURIComponent(
      'probando el test'
    )}`
  );
});
