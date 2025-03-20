import { tablesDB } from '../utils/const.js';
import { supabase } from './supabase.js';

export const saveDatabasePrices = async (precios) => {
  const compra = parseFloat(precios.compra.split('S/').pop());
  const venta = parseFloat(precios.venta.split('S/').pop());
  console.log({ compra, venta });
  if (!compra || !venta)
    return console.log('datos precio : compra o venta es undefined');

  const { error: ExchangeRateError } = await supabase
    .from(tablesDB.ExchangeRate)
    .insert({ compra, venta });

  if (ExchangeRateError)
    return console.error('Error al crear', ExchangeRateError);
  console.log('precios guardados');
};
