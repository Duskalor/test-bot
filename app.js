import express from 'express';
import { messageToChat } from './message.js';

// process.loadEnvFile();

const PORT = process.env.PORT || 3100;

const app = express();

let appToSend;
let contador = 1;

app.get('/iniciar-bot', async (req, res) => {
  console.log('iniciando bot en /iniciar-bot');
  const { q } = req.query;
  console.log(`iniciando scrapping.. nro ${contador}`);
  appToSend = messageToChat(q, contador);

  res.json({
    message: q ? `server on with interval of ${q} seconds` : 'server on',
  });
});

app.get('/detener-bot', async (req, res) => {
  console.log('deteniendo bot en /detener-bot');
  appToSend.stop();
  res.json({ message: 'server off' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
