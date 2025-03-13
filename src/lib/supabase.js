import { createClient } from '@supabase/supabase-js';

// Usa variables de entorno para mayor seguridad
// eslint-disable-next-line no-undef
const SUPABASE_URL = process.env.SUPABASE_URL;
// eslint-disable-next-line no-undef
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false }, // No guardar sesiones en el servidor
});
