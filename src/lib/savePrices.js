import { tablesDB } from '../utils/const.js';
import { supabase } from './supabase.js';

export const saveDatabasePrices = async (precios) => {
  console.log({ precios });
  if (!precios.compra || !precios.venta)
    return console.log('datos precio compra o venta erroneo');
  const { error: ExchangeRateError } = await supabase
    .from(tablesDB.ExchangeRate)
    .insert({
      compra: parseFloat(precios.compra.split('S/').pop()),
      venta: parseFloat(precios.venta.split('S/').pop()),
    });

  if (ExchangeRateError)
    return console.error('Error al crear', ExchangeRateError);
  console.log('precios guardados');
};
