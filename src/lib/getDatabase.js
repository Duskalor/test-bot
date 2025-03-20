import { supabase } from './supabase.js';

export const getDatabase = async (tabla) => {
  return await supabase.from(tabla).select('*');
};
