import { convocatorias } from '../utils/const.js';

// eslint-disable-next-line no-undef
const TOKEN_BOT = process.env.TOKEN_BOT;

const FilterDatos = convocatorias.primera;

const Locate = {
  CUSCO: 'CUSCO',
  WANCHAQ: 'WANCHAQ',
};

const Moneda = {
  USD: '$',
  PEN: 'S/.',
};

export const sendTelegram = async (data) => {
  const TerceraConvocatoriaDatos = data.filter((item) => {
    return (
      item.title.includes(FilterDatos) &&
      Object.keys(Locate).some((L) => L === item.location)
    );
  });

  try {
    if (TerceraConvocatoriaDatos.length > 0) {
      const titulo = `📅 Fecha: ${new Date().toLocaleDateString('es-PE', {
        timeZone: 'America/Lima',
      })}  
⏰ Hora: ${new Date().toLocaleTimeString('es-PE', {
        timeZone: 'America/Lima',
      })}  

➖➖➖➖➖➖➖`;

      await fetch(
        `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage?chat_id=1974797847&text=${encodeURIComponent(
          titulo
        )}`
      );
      const DatosTelegram = TerceraConvocatoriaDatos.map((item) => {
        const text = `${item.title.toUpperCase()}\n\n🏷️ Tipo: ${
          item.type
        }\n📍 Ubicación: ${item.location}\n\n📝 Descripción:\n${
          item.description
        }\n\n💰 Precio: ${Moneda[item.price.currency]} ${item.price.amount}\n`;
        return fetch(
          `https://api.telegram.org/bot${TOKEN_BOT}/sendMessage?chat_id=1974797847&text=${encodeURIComponent(
            text
          )}`
        );
      });
      console.log('enviando datos a telegram!!');
      await Promise.all(DatosTelegram);
    } else {
      console.log(
        `No hay datos de ${FilterDatos} CONVOCATORIA para enviar a telegram`
      );
    }
  } catch (error) {
    console.log(error);
  }
};
