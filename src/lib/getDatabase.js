import { supabase } from './supabase.js';

export const getDatabase = async () => {
  return await supabase.from('Elements').select('*');
};
