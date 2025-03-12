import express from 'express';
import { messageToChat } from './src/message.js';
import { supabase } from './src/lib/supabase.js';

// eslint-disable-next-line no-undef
process.loadEnvFile();

// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3100;

const app = express();

let appToSend;
// let contador = 1;

app.get('/iniciar-bot', async (req, res) => {
  console.log('iniciando bot en /iniciar-bot');
  console.log('iniciando scrapping..');
  appToSend = await messageToChat();

  res.json({
    message: 'server on, scrapping every 12 hours',
  });
});

app.get('/detener-bot', async (req, res) => {
  console.log('deteniendo bot en /detener-bot');
  appToSend.stop();
  res.json({ message: 'server off' });
});

app.get('/get-data', async (req, res) => {
  console.log('obteniendo datos de /get-data');
  const { data } = await supabase.from('Elements').select('*');
  res.json({ data });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
